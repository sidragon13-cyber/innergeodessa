from __future__ import annotations

from fastapi import HTTPException, Request, status

from .auth import COOKIE_NAME, hash_token, parse_utc, utc_now
from .database import connect


def get_current_user(
    request: Request,
    *,
    connection_factory=None,
):
    session_token = request.cookies.get(COOKIE_NAME)

    if not session_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication is required.",
        )

    now = utc_now()
    open_connection = connection_factory or connect

    with open_connection() as conn:
        session = conn.execute(
            """SELECT auth.auth_session_id,
                      auth.expires_at,
                      auth.revoked_at,
                      user.*
               FROM auth_sessions auth
               JOIN users user
                 ON user.user_id=auth.user_id
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
            """UPDATE auth_sessions
               SET last_seen_at=?
               WHERE auth_session_id=?""",
            (
                now.isoformat(),
                session["auth_session_id"],
            ),
        )

    return session


def require_verified_user(
    request: Request,
    *,
    connection_factory=None,
):
    user = get_current_user(
        request,
        connection_factory=connection_factory,
    )

    if user["email_verified_at"] is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email verification is required.",
        )

    return user
