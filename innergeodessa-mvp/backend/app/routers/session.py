from __future__ import annotations

from datetime import datetime, timezone
import uuid

from fastapi import APIRouter, HTTPException

from ..database import (
    CURRENT_BANK_VERSION,
    LEGACY_BANK_VERSION,
    connect,
)
from ..schemas.session import AnswerRequest, StartRequest
from ..scoring import Item, TIE_RULE, score_assessment


router = APIRouter()


@router.post("/api/sessions")
def start_session(payload: StartRequest):
    if not payload.consent:
        raise HTTPException(400, "Consent is required.")
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
                CURRENT_BANK_VERSION,
            ),
        )
        conn.execute(
            """INSERT INTO session_question_items(
                 session_id, item_record_id, display_order
               )
               SELECT ?, item_record_id, master_order
               FROM question_bank_items
               WHERE question_bank_version=?""",
            (session_id, CURRENT_BANK_VERSION),
        )
        snapshot_count = conn.execute(
            "SELECT COUNT(*) FROM session_question_items WHERE session_id=?",
            (session_id,),
        ).fetchone()[0]
        if snapshot_count != 72:
            raise HTTPException(
                503,
                "Current personality question bank is unavailable.",
            )
    return {
        "session_id": session_id,
        "started_at": now,
        "question_bank_version": CURRENT_BANK_VERSION,
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
        session = conn.execute(
            "SELECT status, question_bank_version FROM sessions WHERE session_id=?",
            (session_id,),
        ).fetchone()
        if not session:
            raise HTTPException(404, "Session not found.")
        if session["status"] != "active":
            raise HTTPException(409, "Session is not active.")

        rows = conn.execute(
            """SELECT qbi.source_item_id AS item_id,
                      qbi.dimension,
                      qbi.keyed_pole,
                      sr.raw_value
               FROM session_question_items sqi
               JOIN question_bank_items qbi
                 ON qbi.item_record_id=sqi.item_record_id
               LEFT JOIN session_responses sr
                 ON sr.session_id=sqi.session_id
                AND sr.item_record_id=sqi.item_record_id
               WHERE sqi.session_id=?
               ORDER BY sqi.display_order""",
            (session_id,),
        ).fetchall()
        if len(rows) != 72:
            raise HTTPException(
                400,
                detail={
                    "message": "Session question snapshot is invalid",
                    "expected": 72,
                    "actual": len(rows),
                },
            )

        outside_snapshot_count = conn.execute(
            """SELECT COUNT(*)
               FROM session_responses sr
               LEFT JOIN session_question_items sqi
                 ON sqi.session_id=sr.session_id
                AND sqi.item_record_id=sr.item_record_id
               WHERE sr.session_id=? AND sqi.item_record_id IS NULL""",
            (session_id,),
        ).fetchone()[0]
        if outside_snapshot_count:
            raise HTTPException(
                400,
                "Session contains responses outside its question snapshot.",
            )

        missing = [r["item_id"] for r in rows if r["raw_value"] is None]
        if missing:
            raise HTTPException(400, detail={"message": "Assessment incomplete", "missing": missing})
        result = score_assessment(
            [Item(r["item_id"], r["dimension"], r["keyed_pole"]) for r in rows],
            {r["item_id"]: r["raw_value"] for r in rows},
            require_balanced_poles=(
                session["question_bank_version"] != LEGACY_BANK_VERSION
            ),
        )
        now = datetime.now(timezone.utc).isoformat()
        s, c = result["scores"], result["confidence"]
        conn.execute(
            """INSERT INTO results
               (session_id, personality_type, ei_score, sn_score, tf_score, jp_score,
                ei_confidence, sn_confidence, tf_confidence, jp_confidence, calculated_at)
               VALUES (?,?,?,?,?,?,?,?,?,?,?)
               ON CONFLICT(session_id) DO UPDATE SET
                 personality_type=excluded.personality_type,
                 ei_score=excluded.ei_score,
                 sn_score=excluded.sn_score,
                 tf_score=excluded.tf_score,
                 jp_score=excluded.jp_score,
                 ei_confidence=excluded.ei_confidence,
                 sn_confidence=excluded.sn_confidence,
                 tf_confidence=excluded.tf_confidence,
                 jp_confidence=excluded.jp_confidence,
                 calculated_at=excluded.calculated_at""",
            (session_id, result["type"], s["EI"], s["SN"], s["TF"], s["JP"],
             c["EI"], c["SN"], c["TF"], c["JP"], now),
        )
        conn.execute(
            "UPDATE sessions SET completed_at=?, status='completed' WHERE session_id=?",
            (now, session_id),
        )
    return result
