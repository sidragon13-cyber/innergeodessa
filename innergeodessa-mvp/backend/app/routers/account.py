from __future__ import annotations

import hmac
import json

from fastapi import APIRouter, HTTPException, Request, status

from ..auth import hash_token, utc_now
from ..auth_context import (
    get_current_user,
    require_verified_user,
)
from ..database import connect
from ..schemas.account import (
    AccountDashboardResponse,
    CareerDashboardItem,
    ClaimedAssessmentResponse,
    ClaimSessionRequest,
    PersonalityDashboardItem,
    ReportAccessResponse,
    SavedZodiacChartResponse,
    SaveZodiacChartRequest,
    ZodiacChartDetailResponse,
    ZodiacDashboardItem,
)
from ..zodiac_contract import (
    validate_and_serialize_zodiac_result,
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
    user = require_verified_user(
        request,
        connection_factory=connect,
    )
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



@router.post(
    "/zodiac-charts",
    response_model=SavedZodiacChartResponse,
)
def save_zodiac_chart(
    payload: SaveZodiacChartRequest,
    request: Request,
) -> SavedZodiacChartResponse:
    user = require_verified_user(
        request,
        connection_factory=connect,
    )
    user_id = user["user_id"]

    try:
        (
            result_json,
            schema_version,
            calculated_at,
        ) = validate_and_serialize_zodiac_result(
            payload.result
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(error),
        ) from error

    now = utc_now().isoformat()

    with connect() as conn:
        existing = conn.execute(
            """SELECT owner_user_id,
                      result_json,
                      created_at,
                      updated_at
               FROM zodiac_charts
               WHERE chart_id=?""",
            (payload.chartId,),
        ).fetchone()

        if existing is not None:
            if existing["owner_user_id"] != user_id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=(
                        "This zodiac chart already belongs "
                        "to another account."
                    ),
                )

            if existing["result_json"] != result_json:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=(
                        "This chart ID is already associated "
                        "with different zodiac data."
                    ),
                )

            return SavedZodiacChartResponse(
                resourceId=payload.chartId,
                module="zodiac",
                status="saved",
                savedAt=(
                    existing["updated_at"]
                    or existing["created_at"]
                ),
            )

        conn.execute(
            """INSERT INTO zodiac_charts(
                 chart_id,
                 owner_user_id,
                 claim_secret_hash,
                 result_json,
                 schema_version,
                 calculated_at,
                 created_at,
                 updated_at,
                 claimed_at
               ) VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?)""",
            (
                payload.chartId,
                user_id,
                result_json,
                schema_version,
                calculated_at,
                now,
                now,
                now,
            ),
        )

    return SavedZodiacChartResponse(
        resourceId=payload.chartId,
        module="zodiac",
        status="saved",
        savedAt=now,
    )



@router.get(
    "/dashboard",
    response_model=AccountDashboardResponse,
)
def get_account_dashboard(
    request: Request,
) -> AccountDashboardResponse:
    user = get_current_user(
        request,
        connection_factory=connect,
    )
    user_id = user["user_id"]

    with connect() as conn:
        personality_rows = conn.execute(
            """SELECT session.session_id,
                      result.personality_type,
                      COALESCE(
                        session.claimed_at,
                        session.completed_at,
                        session.started_at
                      ) AS created_at
               FROM sessions session
               JOIN results result
                 ON result.session_id=session.session_id
               WHERE session.owner_user_id=?
                 AND session.module='personality'
                 AND session.status='completed'
               ORDER BY created_at DESC,
                        session.session_id DESC""",
            (user_id,),
        ).fetchall()

        career_rows = conn.execute(
            """SELECT session.session_id,
                      result.code,
                      COALESCE(
                        session.claimed_at,
                        session.completed_at,
                        session.started_at
                      ) AS created_at
               FROM sessions session
               JOIN riasec_results result
                 ON result.session_id=session.session_id
               WHERE session.owner_user_id=?
                 AND session.module='riasec'
                 AND session.status='completed'
               ORDER BY created_at DESC,
                        session.session_id DESC""",
            (user_id,),
        ).fetchall()

        zodiac_rows = conn.execute(
            """SELECT chart_id,
                      schema_version,
                      calculated_at,
                      COALESCE(
                        claimed_at,
                        updated_at,
                        created_at
                      ) AS created_at
               FROM zodiac_charts
               WHERE owner_user_id=?
               ORDER BY created_at DESC,
                        chart_id DESC""",
            (user_id,),
        ).fetchall()

    return AccountDashboardResponse(
        personality=[
            PersonalityDashboardItem(
                resourceId=row["session_id"],
                type=row["personality_type"],
                createdAt=row["created_at"],
                status="saved",
            )
            for row in personality_rows
        ],
        career=[
            CareerDashboardItem(
                resourceId=row["session_id"],
                code=row["code"],
                createdAt=row["created_at"],
                status="saved",
            )
            for row in career_rows
        ],
        zodiac=[
            ZodiacDashboardItem(
                resourceId=row["chart_id"],
                createdAt=row["created_at"],
                calculatedAt=row["calculated_at"],
                schemaVersion=row["schema_version"],
                status="saved",
            )
            for row in zodiac_rows
        ],
    )



@router.get(
    "/zodiac-charts/{chart_id}",
    response_model=ZodiacChartDetailResponse,
)
def get_zodiac_chart(
    chart_id: str,
    request: Request,
) -> ZodiacChartDetailResponse:
    user = get_current_user(
        request,
        connection_factory=connect,
    )
    user_id = user["user_id"]

    with connect() as conn:
        row = conn.execute(
            """SELECT chart_id,
                      result_json,
                      created_at,
                      updated_at,
                      claimed_at
               FROM zodiac_charts
               WHERE chart_id=?
                 AND owner_user_id=?""",
            (
                chart_id,
                user_id,
            ),
        ).fetchone()

    if row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zodiac chart not found.",
        )

    try:
        parsed_result = json.loads(
            row["result_json"]
        )

        (
            normalized_result,
            _schema_version,
            _calculated_at,
        ) = validate_and_serialize_zodiac_result(
            parsed_result
        )
    except (
        json.JSONDecodeError,
        TypeError,
        ValueError,
    ) as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "The saved zodiac chart data is invalid."
            ),
        ) from error

    if normalized_result != row["result_json"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "The saved zodiac chart data is not canonical."
            ),
        )

    saved_at = (
        row["claimed_at"]
        or row["updated_at"]
        or row["created_at"]
    )

    return ZodiacChartDetailResponse(
        resourceId=row["chart_id"],
        module="zodiac",
        result=parsed_result,
        savedAt=saved_at,
    )



@router.get(
    "/report-access/{module}/{resource_id}",
    response_model=ReportAccessResponse,
)
def get_report_access(
    module: str,
    resource_id: str,
    request: Request,
) -> ReportAccessResponse:
    if module not in {
        "personality",
        "career",
        "zodiac",
    }:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The report module is not supported.",
        )

    user = require_verified_user(
        request,
        connection_factory=connect,
    )
    user_id = user["user_id"]

    with connect() as conn:
        if module == "zodiac":
            resource = conn.execute(
                """SELECT chart_id
                   FROM zodiac_charts
                   WHERE chart_id=?
                     AND owner_user_id=?""",
                (
                    resource_id,
                    user_id,
                ),
            ).fetchone()
        else:
            internal_module = (
                "personality"
                if module == "personality"
                else "riasec"
            )

            resource = conn.execute(
                """SELECT session_id
                   FROM sessions
                   WHERE session_id=?
                     AND owner_user_id=?
                     AND module=?
                     AND status='completed'""",
                (
                    resource_id,
                    user_id,
                    internal_module,
                ),
            ).fetchone()

        if resource is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="The saved assessment resource was not found.",
            )

        entitlement = conn.execute(
            """SELECT status
               FROM report_entitlements
               WHERE user_id=?
                 AND module=?
                 AND resource_id=?""",
            (
                user_id,
                module,
                resource_id,
            ),
        ).fetchone()

    entitlement_status = (
        entitlement["status"]
        if entitlement is not None
        else None
    )

    unlocked = (
        entitlement_status == "unlocked"
    )

    return ReportAccessResponse(
        module=module,
        resourceId=resource_id,
        authenticated=True,
        emailVerified=True,
        ownsResource=True,
        entitlementStatus=entitlement_status,
        canViewFullReport=unlocked,
        canPrint=unlocked,
        canDownloadPdf=unlocked,
    )
