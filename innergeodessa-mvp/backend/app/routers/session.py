from __future__ import annotations

from datetime import datetime, timezone
import uuid

from fastapi import APIRouter, HTTPException

from ..assessment_modules import get_assessment_module_config
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
        module_config = get_assessment_module_config(payload.module)
    except ValueError as error:
        raise HTTPException(400, str(error)) from error

    session_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()

    with connect() as conn:
        conn.execute(
            """INSERT INTO sessions(
                 session_id, consent, language, started_at,
                 question_bank_version
               )
               VALUES (?,1,?,?,?)""",
            (
                session_id,
                payload.language,
                now,
                module_config.question_bank_version,
            ),
        )
        conn.execute(
            """INSERT INTO session_question_items(
                 session_id, item_record_id, display_order
               )
               SELECT ?, item_record_id, master_order
               FROM question_bank_items
               WHERE question_bank_version=?""",
            (
                session_id,
                module_config.question_bank_version,
            ),
        )

        snapshot_count = conn.execute(
            """SELECT COUNT(*)
               FROM session_question_items
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

    return {
        "session_id": session_id,
        "started_at": now,
        "module": module_config.module,
        "question_bank_version": (
            module_config.question_bank_version
        ),
    }


@router.get("/api/sessions/{session_id}/items")
def get_session_items(session_id: str):
    with connect() as conn:
        session = conn.execute(
            "SELECT question_bank_version FROM sessions WHERE session_id=?",
            (session_id,),
        ).fetchone()
        if not session:
            raise HTTPException(404, "Session not found.")

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
    return [dict(row) for row in rows]


@router.get("/api/sessions/{session_id}/result")
def get_session_result(session_id: str):
    with connect() as conn:
        session = conn.execute(
            """SELECT status, question_bank_version, completed_at
               FROM sessions
               WHERE session_id=?""",
            (session_id,),
        ).fetchone()
        if not session:
            raise HTTPException(404, "Session not found.")
        if session["status"] != "completed":
            raise HTTPException(409, "Session is not completed.")

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
        if not result:
            raise HTTPException(
                500,
                "Completed session result is missing.",
            )

    return {
        "sessionId": session_id,
        "status": "completed",
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
        session = conn.execute("SELECT status FROM sessions WHERE session_id=?", (session_id,)).fetchone()
        if not session:
            raise HTTPException(404, "Session not found.")
        if session["status"] != "active":
            raise HTTPException(409, "Session is not active.")
        item = conn.execute(
            """SELECT sqi.item_record_id
               FROM session_question_items sqi
               JOIN question_bank_items qbi
                 ON qbi.item_record_id=sqi.item_record_id
               WHERE sqi.session_id=? AND qbi.source_item_id=?""",
            (session_id, payload.item_id),
        ).fetchone()
        if not item:
            raise HTTPException(
                404,
                "Item is not part of this session's question snapshot.",
            )
        conn.execute(
            """INSERT INTO session_responses(
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
