from __future__ import annotations

import hmac

from fastapi import APIRouter, HTTPException, Request, status

from ..auth import hash_token, utc_now
from ..auth_context import require_verified_user
from ..database import connect
from ..schemas.account import (
    ClaimedAssessmentResponse,
    ClaimSessionRequest,
)


router = APIRouter(
    prefix="/api/account",
    tags=["account"],
)


def _public_module(module: str) -> str:
    if module == "personality":
        return "personality"
    if module == "riasec":
        return "career"

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="The assessment module is not supported.",
    )


@router.post(
    "/claim-session",
    response_model=ClaimedAssessmentResponse,
)
def claim_session(
    payload: ClaimSessionRequest,
    request: Request,
) -> ClaimedAssessmentResponse:
    user = require_verified_user(request)
    user_id = user["user_id"]
    supplied_hash = hash_token(payload.claimSecret)

    with connect() as conn:
        session = conn.execute(
            """SELECT session_id,
                      module,
                      status,
                      completed_at,
                      owner_user_id,
                      claim_secret_hash,
                      claimed_at
               FROM sessions
               WHERE session_id=?""",
            (payload.sessionId,),
        ).fetchone()

        if session is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Assessment session not found.",
            )

        public_module = _public_module(session["module"])

        if session["status"] != "completed":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Only completed assessments can be saved.",
            )

        if session["owner_user_id"] == user_id:
            claimed_at = session["claimed_at"] or session["completed_at"]

            return ClaimedAssessmentResponse(
                resourceId=session["session_id"],
                module=public_module,
                status="saved",
                claimedAt=claimed_at,
            )

        if session["owner_user_id"] is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This assessment already belongs to another account.",
            )

        stored_hash = session["claim_secret_hash"]

        if (
            not stored_hash
            or not hmac.compare_digest(
                supplied_hash,
                stored_hash,
            )
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="The assessment claim credential is invalid.",
            )

        claimed_at = utc_now().isoformat()

        cursor = conn.execute(
            """UPDATE sessions
               SET owner_user_id=?,
                   claimed_at=?,
                   claim_secret_hash=NULL
               WHERE session_id=?
                 AND owner_user_id IS NULL
                 AND claim_secret_hash=?""",
            (
                user_id,
                claimed_at,
                payload.sessionId,
                stored_hash,
            ),
        )

        if cursor.rowcount != 1:
            current = conn.execute(
                """SELECT owner_user_id, claimed_at
                   FROM sessions
                   WHERE session_id=?""",
                (payload.sessionId,),
            ).fetchone()

            if current and current["owner_user_id"] == user_id:
                return ClaimedAssessmentResponse(
                    resourceId=payload.sessionId,
                    module=public_module,
                    status="saved",
                    claimedAt=current["claimed_at"] or claimed_at,
                )

            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="The assessment could not be claimed.",
            )

    return ClaimedAssessmentResponse(
        resourceId=payload.sessionId,
        module=public_module,
        status="saved",
        claimedAt=claimed_at,
    )
