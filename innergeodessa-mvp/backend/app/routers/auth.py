from __future__ import annotations

import sqlite3
import uuid

from fastapi import APIRouter, HTTPException, Request, Response, status

from ..auth import (
    COOKIE_NAME,
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
from ..database import connect
from ..schemas.auth import (
    AuthUserResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyEmailRequest,
)


router = APIRouter(prefix="/api/auth", tags=["auth"])

INVALID_CREDENTIALS = "Invalid email or password."
DUMMY_PASSWORD_HASH = hash_password("innergeo-dummy-password-value")


def _auth_user(row) -> AuthUserResponse:
    return AuthUserResponse(
        userId=row["user_id"],
        email=row["email"],
        nickname=row["nickname"],
        emailVerified=row["email_verified_at"] is not None,
        status=row["status"],
        createdAt=row["created_at"],
    )


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

    return RegisterResponse(
        user=_auth_user(user),
        verificationToken=(
            verification_token if auth_test_mode_enabled() else None
        ),
    )


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
               WHERE verification_id=?""",
            (now.isoformat(), record["verification_id"]),
        )
        user = conn.execute(
            "SELECT * FROM users WHERE user_id=?",
            (record["user_id"],),
        ).fetchone()

    return _auth_user(user)


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
    session_token = request.cookies.get(COOKIE_NAME)
    if not session_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication is required.",
        )

    now = utc_now()
    with connect() as conn:
        session = conn.execute(
            """SELECT auth.auth_session_id, auth.expires_at,
                      auth.revoked_at, user.*
               FROM auth_sessions auth
               JOIN users user ON user.user_id=auth.user_id
               WHERE auth.token_hash=?""",
            (hash_token(session_token),),
        ).fetchone()
        if (
            session is None
            or session["revoked_at"] is not None
            or parse_utc(session["expires_at"]) <= now
            or session["status"] != "active"
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication is required.",
            )

        conn.execute(
            """UPDATE auth_sessions SET last_seen_at=?
               WHERE auth_session_id=?""",
            (now.isoformat(), session["auth_session_id"]),
        )

    return _auth_user(session)


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
