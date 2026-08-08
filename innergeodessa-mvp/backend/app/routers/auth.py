from __future__ import annotations

import sqlite3
import logging
import uuid

from fastapi import APIRouter, BackgroundTasks, HTTPException, Request, Response, status

from ..auth import (
    AUTH_EMAIL_REQUEST_COOLDOWN,
    COOKIE_NAME,
    PASSWORD_RESET_TOKEN_DURATION,
    SESSION_DURATION,
    SESSION_MAX_AGE_SECONDS,
    VERIFICATION_TOKEN_DURATION,
    auth_test_mode_enabled,
    cookie_options,
    generate_token,
    hash_password,
    hash_token,
    normalize_email,
    parse_utc,
    utc_now,
    verify_password,
)
from ..auth_context import get_current_user
from ..database import connect
from ..email import (
    EmailDeliveryError,
    send_password_reset_email,
    send_verification_email,
)
from ..schemas.auth import (
    AuthUserResponse,
    EmailRequest,
    GenericEmailResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    VerifyEmailRequest,
)


router = APIRouter(prefix="/api/auth", tags=["auth"])

INVALID_CREDENTIALS = "Invalid email or password."
DUMMY_PASSWORD_HASH = hash_password("innergeo-dummy-password-value")
GENERIC_EMAIL_MESSAGE = (
    "If the account is eligible, an email has been sent."
)
logger = logging.getLogger(__name__)


def _auth_user(row) -> AuthUserResponse:
    return AuthUserResponse(
        userId=row["user_id"],
        email=row["email"],
        nickname=row["nickname"],
        emailVerified=row["email_verified_at"] is not None,
        status=row["status"],
        createdAt=row["created_at"],
    )


def _send_verification_safely(*, email: str, token: str) -> None:
    try:
        send_verification_email(email=email, token=token)
    except EmailDeliveryError:
        logger.warning("Transactional verification email delivery failed.")


def _send_password_reset_safely(*, email: str, token: str) -> None:
    try:
        send_password_reset_email(email=email, token=token)
    except EmailDeliveryError:
        logger.warning("Transactional password reset email delivery failed.")


@router.post(
    "/register",
    response_model=RegisterResponse,
    response_model_exclude_none=True,
    status_code=status.HTTP_201_CREATED,
)
def register(payload: RegisterRequest) -> RegisterResponse:
    now = utc_now()
    user_id = str(uuid.uuid4())
    verification_id = str(uuid.uuid4())
    verification_token = generate_token()
    password_hash = hash_password(payload.password)

    try:
        with connect() as conn:
            conn.execute(
                """INSERT INTO users(
                     user_id, email, email_normalized, nickname,
                     password_hash, created_at, updated_at
                   ) VALUES (?, ?, ?, ?, ?, ?, ?)""",
                (
                    user_id,
                    payload.email,
                    normalize_email(payload.email),
                    payload.nickname,
                    password_hash,
                    now.isoformat(),
                    now.isoformat(),
                ),
            )
            conn.execute(
                """INSERT INTO email_verification_tokens(
                     verification_id, user_id, token_hash,
                     created_at, expires_at
                   ) VALUES (?, ?, ?, ?, ?)""",
                (
                    verification_id,
                    user_id,
                    hash_token(verification_token),
                    now.isoformat(),
                    (now + VERIFICATION_TOKEN_DURATION).isoformat(),
                ),
            )
            user = conn.execute(
                "SELECT * FROM users WHERE user_id=?",
                (user_id,),
            ).fetchone()
    except sqlite3.IntegrityError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        ) from error

    response = RegisterResponse(
        user=_auth_user(user),
        verificationToken=(
            verification_token if auth_test_mode_enabled() else None
        ),
    )
    try:
        send_verification_email(
            email=user["email"],
            token=verification_token,
        )
    except EmailDeliveryError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "Your account was created, but the verification email could "
                "not be sent. Please use resend verification later."
            ),
        ) from error
    return response


@router.post("/verify-email", response_model=AuthUserResponse)
def verify_email(payload: VerifyEmailRequest) -> AuthUserResponse:
    now = utc_now()

    with connect() as conn:
        record = conn.execute(
            """SELECT token.verification_id, token.expires_at,
                      token.consumed_at, user.*
               FROM email_verification_tokens token
               JOIN users user ON user.user_id=token.user_id
               WHERE token.token_hash=?""",
            (hash_token(payload.token),),
        ).fetchone()

        if (
            record is None
            or record["consumed_at"] is not None
            or parse_utc(record["expires_at"]) <= now
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The verification token is invalid or expired.",
            )

        conn.execute(
            """UPDATE users
               SET email_verified_at=?, updated_at=?
               WHERE user_id=?""",
            (now.isoformat(), now.isoformat(), record["user_id"]),
        )
        conn.execute(
            """UPDATE email_verification_tokens
               SET consumed_at=?
               WHERE user_id=? AND consumed_at IS NULL""",
            (now.isoformat(), record["user_id"]),
        )
        user = conn.execute(
            "SELECT * FROM users WHERE user_id=?",
            (record["user_id"],),
        ).fetchone()

    return _auth_user(user)


@router.post(
    "/resend-verification",
    response_model=GenericEmailResponse,
    response_model_exclude_none=True,
    status_code=status.HTTP_202_ACCEPTED,
)
def resend_verification(
    payload: EmailRequest,
    background_tasks: BackgroundTasks,
) -> GenericEmailResponse:
    now = utc_now()
    raw_token = None
    email = None
    with connect() as conn:
        conn.execute("BEGIN IMMEDIATE")
        user = conn.execute(
            "SELECT * FROM users WHERE email_normalized=?",
            (normalize_email(payload.email),),
        ).fetchone()
        if user is not None and user["status"] == "active" and user["email_verified_at"] is None:
            latest = conn.execute(
                """SELECT created_at FROM email_verification_tokens
                   WHERE user_id=? ORDER BY created_at DESC LIMIT 1""",
                (user["user_id"],),
            ).fetchone()
            cooling_down = latest is not None and (
                parse_utc(latest["created_at"]) + AUTH_EMAIL_REQUEST_COOLDOWN > now
            )
            if not cooling_down:
                raw_token = generate_token()
                email = user["email"]
                conn.execute(
                    """INSERT INTO email_verification_tokens(
                         verification_id, user_id, token_hash, created_at, expires_at
                       ) VALUES (?, ?, ?, ?, ?)""",
                    (
                        str(uuid.uuid4()), user["user_id"], hash_token(raw_token),
                        now.isoformat(), (now + VERIFICATION_TOKEN_DURATION).isoformat(),
                    ),
                )
    if raw_token and email:
        background_tasks.add_task(
            _send_verification_safely,
            email=email,
            token=raw_token,
        )
    return GenericEmailResponse(
        message=GENERIC_EMAIL_MESSAGE,
        verificationToken=(raw_token if raw_token and auth_test_mode_enabled() else None),
    )


@router.post(
    "/forgot-password",
    response_model=GenericEmailResponse,
    response_model_exclude_none=True,
    status_code=status.HTTP_202_ACCEPTED,
)
def forgot_password(
    payload: EmailRequest,
    background_tasks: BackgroundTasks,
) -> GenericEmailResponse:
    now = utc_now()
    raw_token = None
    email = None
    with connect() as conn:
        conn.execute("BEGIN IMMEDIATE")
        user = conn.execute(
            "SELECT * FROM users WHERE email_normalized=?",
            (normalize_email(payload.email),),
        ).fetchone()
        if user is not None and user["status"] == "active":
            latest = conn.execute(
                """SELECT created_at FROM password_reset_tokens
                   WHERE user_id=? ORDER BY created_at DESC LIMIT 1""",
                (user["user_id"],),
            ).fetchone()
            cooling_down = latest is not None and (
                parse_utc(latest["created_at"]) + AUTH_EMAIL_REQUEST_COOLDOWN > now
            )
            if not cooling_down:
                raw_token = generate_token()
                email = user["email"]
                conn.execute(
                    """INSERT INTO password_reset_tokens(
                         reset_id, user_id, token_hash, created_at, expires_at
                       ) VALUES (?, ?, ?, ?, ?)""",
                    (
                        str(uuid.uuid4()), user["user_id"], hash_token(raw_token),
                        now.isoformat(), (now + PASSWORD_RESET_TOKEN_DURATION).isoformat(),
                    ),
                )
    if raw_token and email:
        background_tasks.add_task(
            _send_password_reset_safely,
            email=email,
            token=raw_token,
        )
    return GenericEmailResponse(
        message=GENERIC_EMAIL_MESSAGE,
        resetToken=(raw_token if raw_token and auth_test_mode_enabled() else None),
    )


@router.post("/reset-password", response_model=ResetPasswordResponse)
def reset_password(payload: ResetPasswordRequest) -> ResetPasswordResponse:
    now = utc_now()
    with connect() as conn:
        conn.execute("BEGIN IMMEDIATE")
        record = conn.execute(
            """SELECT token.reset_id, token.expires_at, token.used_at, user.user_id
               FROM password_reset_tokens token
               JOIN users user ON user.user_id=token.user_id
               WHERE token.token_hash=? AND user.status='active'""",
            (hash_token(payload.token),),
        ).fetchone()
        if record is None or record["used_at"] is not None or parse_utc(record["expires_at"]) <= now:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The password reset token is invalid or expired.",
            )
        updated = conn.execute(
            """UPDATE password_reset_tokens SET used_at=?
               WHERE reset_id=? AND used_at IS NULL""",
            (now.isoformat(), record["reset_id"]),
        )
        if updated.rowcount != 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The password reset token is invalid or expired.",
            )
        conn.execute(
            """UPDATE password_reset_tokens SET used_at=?
               WHERE user_id=? AND used_at IS NULL""",
            (now.isoformat(), record["user_id"]),
        )
        conn.execute(
            "UPDATE users SET password_hash=?, updated_at=? WHERE user_id=?",
            (hash_password(payload.password), now.isoformat(), record["user_id"]),
        )
        conn.execute(
            """UPDATE auth_sessions SET revoked_at=?
               WHERE user_id=? AND revoked_at IS NULL""",
            (now.isoformat(), record["user_id"]),
        )
    return ResetPasswordResponse(message="Your password has been reset.")


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest, response: Response) -> LoginResponse:
    with connect() as conn:
        user = conn.execute(
            "SELECT * FROM users WHERE email_normalized=?",
            (normalize_email(payload.email),),
        ).fetchone()

        password_matches = verify_password(
            payload.password,
            user["password_hash"] if user else DUMMY_PASSWORD_HASH,
        )
        if (
            user is None
            or not password_matches
            or user["status"] != "active"
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=INVALID_CREDENTIALS,
            )

        now = utc_now()
        session_token = generate_token()
        conn.execute(
            """INSERT INTO auth_sessions(
                 auth_session_id, user_id, token_hash,
                 created_at, expires_at
               ) VALUES (?, ?, ?, ?, ?)""",
            (
                str(uuid.uuid4()),
                user["user_id"],
                hash_token(session_token),
                now.isoformat(),
                (now + SESSION_DURATION).isoformat(),
            ),
        )

    response.set_cookie(
        value=session_token,
        max_age=SESSION_MAX_AGE_SECONDS,
        **cookie_options(),
    )
    return LoginResponse(user=_auth_user(user))


@router.get("/me", response_model=AuthUserResponse)
def me(request: Request) -> AuthUserResponse:
    return _auth_user(
        get_current_user(
            request,
            connection_factory=connect,
        )
    )


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(request: Request, response: Response) -> None:
    session_token = request.cookies.get(COOKIE_NAME)
    if session_token:
        with connect() as conn:
            conn.execute(
                """UPDATE auth_sessions SET revoked_at=?
                   WHERE token_hash=? AND revoked_at IS NULL""",
                (utc_now().isoformat(), hash_token(session_token)),
            )

    response.delete_cookie(**cookie_options())
