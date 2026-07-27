from __future__ import annotations

from datetime import datetime, timezone

from fastapi import HTTPException

from .database import LEGACY_BANK_VERSION
from .scoring import Item, score_assessment


def complete_session_assessment(conn, session_id: str):
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
