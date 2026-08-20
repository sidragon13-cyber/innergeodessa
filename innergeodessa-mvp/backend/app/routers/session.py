from __future__ import annotations

from datetime import datetime, timezone
import json
import uuid

from fastapi import APIRouter, HTTPException

from ..assessment_modules import get_assessment_module_config
from ..auth import generate_token, hash_token
from ..database import connect
from ..schemas.session import AnswerRequest, StartRequest
from ..scoring import TIE_RULE
from ..session_completion import complete_session_assessment


router = APIRouter()


@router.post("/api/sessions")
def start_session(payload: StartRequest):
    if not payload.consent:
        raise HTTPException(400, "Consent is required.")

    try:
        module_config = get_assessment_module_config(
            payload.module,
            payload.form,
        )
    except ValueError as error:
        raise HTTPException(400, str(error)) from error

    session_id = str(uuid.uuid4())
    claim_secret = generate_token()
    claim_secret_hash = hash_token(claim_secret)
    now = datetime.now(timezone.utc).isoformat()

    with connect() as conn:
        conn.execute(
            """INSERT INTO sessions(
                 session_id, consent, language, started_at,
                 question_bank_version, module, form,
                 claim_secret_hash
               )
               VALUES (?,1,?,?,?,?,?,?)""",
            (
                session_id,
                payload.language,
                now,
                module_config.question_bank_version,
                module_config.module,
                module_config.form,
                claim_secret_hash,
            ),
        )
        if module_config.module == "riasec":
            snapshot_table = "riasec_session_question_items"
            item_table = "riasec_question_items"
        elif module_config.module == "kids":
            snapshot_table = "kids_session_question_items"
            item_table = "kids_question_items"
        else:
            snapshot_table = "session_question_items"
            item_table = "question_bank_items"

        if module_config.module == "kids":
            conn.execute(
                f"""INSERT INTO {snapshot_table}(
                      session_id, item_record_id, display_order
                    )
                    SELECT ?, item_record_id, master_order
                    FROM {item_table}
                    WHERE question_bank_version=?
                      AND form=?""",
                (
                    session_id,
                    module_config.question_bank_version,
                    module_config.form,
                ),
            )
        else:
            conn.execute(
                f"""INSERT INTO {snapshot_table}(
                      session_id, item_record_id, display_order
                    )
                    SELECT ?, item_record_id, master_order
                    FROM {item_table}
                    WHERE question_bank_version=?""",
                (
                    session_id,
                    module_config.question_bank_version,
                ),
            )

        snapshot_count = conn.execute(
            f"""SELECT COUNT(*)
                FROM {snapshot_table}
                WHERE session_id=?""",
            (session_id,),
        ).fetchone()[0]

        if snapshot_count != module_config.expected_item_count:
            raise HTTPException(
                503,
                detail={
                    "message": (
                        "Assessment question bank is unavailable."
                    ),
                    "module": module_config.module,
                    "question_bank_version": (
                        module_config.question_bank_version
                    ),
                    "expected": module_config.expected_item_count,
                    "actual": snapshot_count,
                },
            )

    response = {
        "session_id": session_id,
        "claim_secret": claim_secret,
        "started_at": now,
        "module": module_config.module,
        "question_bank_version": (
            module_config.question_bank_version
        ),
    }

    if module_config.module == "kids":
        response["form"] = module_config.form

    return response


@router.get("/api/sessions/{session_id}/items")
def get_session_items(session_id: str):
    with connect() as conn:
        session = conn.execute(
            """SELECT question_bank_version, module, form
               FROM sessions WHERE session_id=?""",
            (session_id,),
        ).fetchone()
        if not session:
            raise HTTPException(404, "Session not found.")

        if session["module"] == "riasec":
            rows = conn.execute(
                """SELECT item.source_item_id AS item_id,
                          item.dimension,
                          item.wording,
                          snapshot.display_order AS master_order,
                          item.question_bank_version
                   FROM riasec_session_question_items snapshot
                   JOIN riasec_question_items item
                     ON item.item_record_id=snapshot.item_record_id
                   WHERE snapshot.session_id=?
                   ORDER BY snapshot.display_order""",
                (session_id,),
            ).fetchall()
        elif session["module"] == "personality":
            rows = conn.execute(
                """SELECT qbi.source_item_id AS item_id,
                          qbi.dimension,
                          qbi.subdimension,
                          qbi.keyed_pole,
                          qbi.form,
                          qbi.wording,
                          sqi.display_order AS master_order,
                          qbi.question_bank_version
                   FROM session_question_items sqi
                   JOIN question_bank_items qbi
                     ON qbi.item_record_id=sqi.item_record_id
                   WHERE sqi.session_id=?
                   ORDER BY sqi.display_order""",
                (session_id,),
            ).fetchall()
        elif session["module"] == "kids":
            rows = conn.execute(
                """SELECT item.source_item_id AS item_id,
                          item.form,
                          item.domain,
                          item.wording_en,
                          item.wording_zh,
                          item.visual_support,
                          item.display_asset_path AS visual_asset_path,
                          snapshot.display_order AS master_order,
                          item.question_bank_version
                   FROM kids_session_question_items snapshot
                   JOIN kids_question_items item
                     ON item.item_record_id=snapshot.item_record_id
                   WHERE snapshot.session_id=?
                     AND item.form=?
                     AND item.question_bank_version=?
                   ORDER BY snapshot.display_order""",
                (
                    session_id,
                    session["form"],
                    session["question_bank_version"],
                ),
            ).fetchall()
        else:
            raise HTTPException(400, "Session module is not supported.")
    return [dict(row) for row in rows]


@router.get("/api/sessions/{session_id}/result")
def get_session_result(session_id: str):
    with connect() as conn:
        session = conn.execute(
            """SELECT status, question_bank_version, completed_at,
                      module, form, language
               FROM sessions
               WHERE session_id=?""",
            (session_id,),
        ).fetchone()
        if not session:
            raise HTTPException(404, "Session not found.")
        if session["status"] != "completed":
            raise HTTPException(409, "Session is not completed.")

        if session["module"] == "riasec":
            result = conn.execute(
                """SELECT code, scores_json, percentages_json,
                          ranking_json, answered_json, calculated_at
                   FROM riasec_results
                   WHERE session_id=?""",
                (session_id,),
            ).fetchone()
        elif session["module"] == "personality":
            result = conn.execute(
                """SELECT personality_type,
                          ei_score, sn_score, tf_score, jp_score,
                          ei_confidence, sn_confidence,
                          tf_confidence, jp_confidence,
                          calculated_at
                   FROM results
                   WHERE session_id=?""",
                (session_id,),
            ).fetchone()
        elif session["module"] == "kids":
            result = conn.execute(
                """SELECT result_json,
                          scoring_version,
                          calculated_at
                   FROM kids_results
                   WHERE session_id=?""",
                (session_id,),
            ).fetchone()
        else:
            raise HTTPException(400, "Session module is not supported.")
        if not result:
            raise HTTPException(
                500,
                "Completed session result is missing.",
            )

    if session["module"] == "kids":
        try:
            persisted = json.loads(
                result["result_json"]
            )
        except (
            json.JSONDecodeError,
            TypeError,
        ) as error:
            raise HTTPException(
                500,
                "Completed Kids session result is invalid.",
            ) from error

        if not isinstance(
            persisted,
            dict,
        ):
            raise HTTPException(
                500,
                "Completed Kids session result is invalid.",
            )

        if session["form"] == "k68":
            if (
                session["question_bank_version"]
                == "KIDS-K68-RF-V2"
            ):
                expected_scoring_version = "KIDS-SCORING-V2"
            elif (
                session["question_bank_version"]
                == "KIDS-K68-RF-V1"
            ):
                expected_scoring_version = "KIDS-SCORING-V1"
            else:
                raise HTTPException(
                    500,
                    "Completed Kids session release is invalid.",
                )
        elif session["form"] == "k912":
            if (
                session["question_bank_version"]
                != "KIDS-K912-RF-V2"
            ):
                raise HTTPException(
                    500,
                    "Completed Kids session release is invalid.",
                )
            expected_scoring_version = "KIDS-SCORING-V2"
        else:
            raise HTTPException(
                500,
                "Completed Kids session form is invalid.",
            )

        if (
            result["scoring_version"]
            != expected_scoring_version
            or persisted.get(
                "scoringVersion"
            )
            != expected_scoring_version
        ):
            raise HTTPException(
                500,
                "Completed Kids session scoring version is invalid.",
            )

        if (
            persisted.get(
                "questionBankVersion"
            )
            != session[
                "question_bank_version"
            ]
            or persisted.get(
                "releaseFormVersion"
            )
            != session[
                "question_bank_version"
            ]
        ):
            raise HTTPException(
                500,
                "Completed Kids session release is invalid.",
            )

        if session["form"] == "k68":
            expected_age_form = "K68"
        elif session["form"] == "k912":
            expected_age_form = "K912"
        else:
            raise HTTPException(
                500,
                "Completed Kids session form is invalid.",
            )

        if (
            persisted.get(
                "ageForm"
            )
            != expected_age_form
        ):
            raise HTTPException(
                500,
                "Completed Kids session age form is invalid.",
            )

        expected_domain_result_count = 6

        domain_results = persisted.get(
            "domainResults"
        )

        if (
            not isinstance(
                domain_results,
                list,
            )
            or len(domain_results)
            != expected_domain_result_count
        ):
            raise HTTPException(
                500,
                "Completed Kids session domain result is invalid.",
            )

        payload = {
            "resultId": session_id,
            **persisted,
            "sessionId": session_id,
            "module": "kids",
            "status": "completed",
            "completedAt": (
                session["completed_at"]
            ),
            "calculatedAt": (
                result["calculated_at"]
            ),
        }

        if session["form"] in {"k68", "k912"}:
            with connect() as response_conn:
                response_rows = response_conn.execute(
                    """SELECT item.source_item_id AS item_id,
                              item.domain,
                              snapshot.display_order,
                              response.raw_value
                       FROM kids_session_question_items snapshot
                       JOIN kids_question_items item
                         ON item.item_record_id=snapshot.item_record_id
                       JOIN kids_session_responses response
                         ON response.session_id=snapshot.session_id
                        AND response.item_record_id=snapshot.item_record_id
                       WHERE snapshot.session_id=?
                       ORDER BY snapshot.display_order""",
                    (session_id,),
                ).fetchall()

            expected_response_count = (
                30 if session["form"] == "k68" else 42
            )

            if len(response_rows) != expected_response_count:
                raise HTTPException(
                    500,
                    "Completed Kids V2 session evidence is invalid.",
                )

            payload["itemResponses"] = [
                {
                    "itemId": row["item_id"],
                    "domain": row["domain"],
                    "displayOrder": row["display_order"],
                    "rawValue": row["raw_value"],
                }
                for row in response_rows
            ]

        return payload

    if session["module"] == "riasec":
        try:
            scores = json.loads(result["scores_json"])
            percentages = json.loads(result["percentages_json"])
            ranking = json.loads(result["ranking_json"])
            answered = json.loads(result["answered_json"])
        except (json.JSONDecodeError, TypeError) as error:
            raise HTTPException(
                500,
                "Completed session result is invalid.",
            ) from error

        return {
            "sessionId": session_id,
            "module": "riasec",
            "status": "completed",
            "code": result["code"],
            "scores": scores,
            "percentages": percentages,
            "ranking": ranking,
            "answered": answered,
            "questionBankVersion": session["question_bank_version"],
            "completedAt": session["completed_at"],
            "calculatedAt": result["calculated_at"],
        }

    return {
        "sessionId": session_id,
        "status": "completed",
        "language": session["language"],
        "type": result["personality_type"],
        "scores": {
            "EI": result["ei_score"],
            "SN": result["sn_score"],
            "TF": result["tf_score"],
            "JP": result["jp_score"],
        },
        "confidence": {
            "EI": result["ei_confidence"],
            "SN": result["sn_confidence"],
            "TF": result["tf_confidence"],
            "JP": result["jp_confidence"],
        },
        "answered": {
            "EI": 18,
            "SN": 18,
            "TF": 18,
            "JP": 18,
        },
        "tie_rule": TIE_RULE,
        "questionBankVersion": session["question_bank_version"],
        "completedAt": session["completed_at"],
        "calculatedAt": result["calculated_at"],
    }


@router.put("/api/sessions/{session_id}/answers")
def save_answer(session_id: str, payload: AnswerRequest):
    now = datetime.now(timezone.utc).isoformat()
    with connect() as conn:
        session = conn.execute(
            """SELECT status, module, form, question_bank_version
               FROM sessions
               WHERE session_id=?""",
            (session_id,),
        ).fetchone()
        if not session:
            raise HTTPException(404, "Session not found.")
        if session["status"] != "active":
            raise HTTPException(409, "Session is not active.")
        if session["module"] == "riasec":
            item = conn.execute(
                """SELECT snapshot.item_record_id
                   FROM riasec_session_question_items snapshot
                   JOIN riasec_question_items item
                     ON item.item_record_id=snapshot.item_record_id
                   WHERE snapshot.session_id=?
                     AND item.source_item_id=?""",
                (session_id, payload.item_id),
            ).fetchone()
            response_table = "riasec_session_responses"
        elif session["module"] == "personality":
            item = conn.execute(
                """SELECT sqi.item_record_id
                   FROM session_question_items sqi
                   JOIN question_bank_items qbi
                     ON qbi.item_record_id=sqi.item_record_id
                   WHERE sqi.session_id=? AND qbi.source_item_id=?""",
                (session_id, payload.item_id),
            ).fetchone()
            response_table = "session_responses"
        elif session["module"] == "kids":
            if session["form"] == "k68":
                allowed_values = {1, 3, 5}
            elif session["form"] == "k912":
                allowed_values = {1, 2, 3, 4, 5}
            else:
                raise HTTPException(
                    500,
                    "Kids session form is invalid.",
                )

            if payload.value not in allowed_values:
                raise HTTPException(
                    400,
                    "Response value is not allowed for this Kids form.",
                )

            item = conn.execute(
                """SELECT snapshot.item_record_id
                   FROM kids_session_question_items snapshot
                   JOIN kids_question_items item
                     ON item.item_record_id=snapshot.item_record_id
                   WHERE snapshot.session_id=?
                     AND item.source_item_id=?
                     AND item.form=?
                     AND item.question_bank_version=?""",
                (
                    session_id,
                    payload.item_id,
                    session["form"],
                    session["question_bank_version"],
                ),
            ).fetchone()

            response_table = "kids_session_responses"
        else:
            raise HTTPException(400, "Session module is not supported.")
        if not item:
            raise HTTPException(
                404,
                "Item is not part of this session's question snapshot.",
            )
        conn.execute(
            f"""INSERT INTO {response_table}(
                  session_id, item_record_id, raw_value,
                  response_time_ms, answered_at
                )
                VALUES (?,?,?,?,?)
                ON CONFLICT(session_id,item_record_id) DO UPDATE SET
                raw_value=excluded.raw_value,
                response_time_ms=excluded.response_time_ms,
                answered_at=excluded.answered_at""",
            (
                session_id,
                item["item_record_id"],
                payload.value,
                payload.response_time_ms,
                now,
            ),
        )
    return {"saved": True}


@router.post("/api/sessions/{session_id}/complete")
def complete_session(session_id: str):
    with connect() as conn:
        return complete_session_assessment(conn, session_id)
