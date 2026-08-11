from __future__ import annotations

from datetime import datetime, timezone
import json

from fastapi import HTTPException

from .database import LEGACY_BANK_VERSION
from .kids_scoring import KidsScoredItem, score_kids
from .riasec_scoring import RiasecItem, score_riasec
from .scoring import Item, score_assessment


def complete_session_assessment(conn, session_id: str):
    session = conn.execute(
        """SELECT status, question_bank_version, module, form
           FROM sessions WHERE session_id=?""",
        (session_id,),
    ).fetchone()
    if not session:
        raise HTTPException(404, "Session not found.")
    if session["status"] != "active":
        raise HTTPException(409, "Session is not active.")

    if session["module"] == "riasec":
        return _complete_riasec_session(conn, session_id)

    if session["module"] == "kids":
        return _complete_kids_session(
            conn,
            session_id,
            session,
        )

    if session["module"] != "personality":
        raise HTTPException(400, "Session module is not supported.")

    return _complete_personality_session(conn, session_id, session)


def _validate_kids_completion_preconditions(
    conn,
    session_id: str,
    session,
):
    form = session["form"]

    if form == "k68":
        expected_count = 32
        expected_bank_version = "KIDS-K68-RF-V1"
        allowed_values = {1, 3, 5}
    elif form == "k912":
        expected_count = 40
        expected_bank_version = "KIDS-K912-RF-V1"
        allowed_values = {1, 2, 3, 4, 5}
    else:
        raise HTTPException(
            500,
            "Kids session form is invalid.",
        )

    if session["question_bank_version"] != expected_bank_version:
        raise HTTPException(
            400,
            detail={
                "message": "Kids session release is invalid",
                "form": form,
                "expected": expected_bank_version,
                "actual": session["question_bank_version"],
            },
        )

    rows = conn.execute(
        """SELECT item.source_item_id AS item_id,
                  item.domain,
                  item.form,
                  item.question_bank_version,
                  snapshot.display_order,
                  response.raw_value
           FROM kids_session_question_items snapshot
           JOIN kids_question_items item
             ON item.item_record_id=snapshot.item_record_id
           LEFT JOIN kids_session_responses response
             ON response.session_id=snapshot.session_id
            AND response.item_record_id=snapshot.item_record_id
           WHERE snapshot.session_id=?
           ORDER BY snapshot.display_order""",
        (session_id,),
    ).fetchall()

    if len(rows) != expected_count:
        raise HTTPException(
            400,
            detail={
                "message": "Session question snapshot is invalid",
                "expected": expected_count,
                "actual": len(rows),
            },
        )

    if any(
        row["form"] != form
        or row["question_bank_version"] != expected_bank_version
        for row in rows
    ):
        raise HTTPException(
            400,
            "Kids session snapshot does not match its form/release.",
        )

    expected_orders = list(
        range(1, expected_count + 1)
    )

    actual_orders = [
        row["display_order"]
        for row in rows
    ]

    if actual_orders != expected_orders:
        raise HTTPException(
            400,
            "Kids session snapshot order is invalid.",
        )

    outside_snapshot_count = conn.execute(
        """SELECT COUNT(*)
           FROM kids_session_responses response
           LEFT JOIN kids_session_question_items snapshot
             ON snapshot.session_id=response.session_id
            AND snapshot.item_record_id=response.item_record_id
           WHERE response.session_id=?
             AND snapshot.item_record_id IS NULL""",
        (session_id,),
    ).fetchone()[0]

    if outside_snapshot_count:
        raise HTTPException(
            400,
            "Session contains responses outside its question snapshot.",
        )

    missing = [
        row["item_id"]
        for row in rows
        if row["raw_value"] is None
    ]

    if missing:
        raise HTTPException(
            400,
            detail={
                "message": "Assessment incomplete",
                "missing": missing,
                "expected": expected_count,
                "answered": expected_count - len(missing),
            },
        )

    invalid = [
        {
            "item_id": row["item_id"],
            "value": row["raw_value"],
        }
        for row in rows
        if row["raw_value"] not in allowed_values
    ]

    if invalid:
        raise HTTPException(
            400,
            detail={
                "message": "Session contains invalid Kids response values",
                "invalid": invalid,
            },
        )

    return rows



def _complete_kids_session(
    conn,
    session_id: str,
    session,
):
    rows = _validate_kids_completion_preconditions(
        conn,
        session_id,
        session,
    )

    try:
        result = score_kids(
            form=session["form"],
            question_bank_version=(
                session["question_bank_version"]
            ),
            items=[
                KidsScoredItem(
                    item_id=row["item_id"],
                    domain=row["domain"],
                    raw_value=row["raw_value"],
                )
                for row in rows
            ],
        )
    except ValueError as error:
        raise HTTPException(
            500,
            detail={
                "message": (
                    "Kids scoring input failed "
                    "internal validation"
                ),
                "reason": str(error),
            },
        ) from error

    now = datetime.now(
        timezone.utc
    ).isoformat()

    result_json = json.dumps(
        result,
        ensure_ascii=False,
        separators=(",", ":"),
        allow_nan=False,
    )

    conn.execute(
        """INSERT INTO kids_results(
             session_id,
             result_json,
             scoring_version,
             calculated_at
           )
           VALUES (?, ?, ?, ?)
           ON CONFLICT(session_id) DO UPDATE SET
             result_json=excluded.result_json,
             scoring_version=excluded.scoring_version,
             calculated_at=excluded.calculated_at""",
        (
            session_id,
            result_json,
            result["scoringVersion"],
            now,
        ),
    )

    conn.execute(
        """UPDATE sessions
           SET completed_at=?,
               status='completed'
           WHERE session_id=?""",
        (
            now,
            session_id,
        ),
    )

    return result


def _complete_personality_session(conn, session_id: str, session):
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


def _complete_riasec_session(conn, session_id: str):
    rows = conn.execute(
        """SELECT item.source_item_id AS item_id,
                  item.dimension,
                  snapshot.display_order,
                  response.raw_value
           FROM riasec_session_question_items snapshot
           JOIN riasec_question_items item
             ON item.item_record_id=snapshot.item_record_id
           LEFT JOIN riasec_session_responses response
             ON response.session_id=snapshot.session_id
            AND response.item_record_id=snapshot.item_record_id
           WHERE snapshot.session_id=?
           ORDER BY snapshot.display_order""",
        (session_id,),
    ).fetchall()
    if len(rows) != 36:
        raise HTTPException(
            400,
            detail={
                "message": "Session question snapshot is invalid",
                "expected": 36,
                "actual": len(rows),
            },
        )

    outside_snapshot_count = conn.execute(
        """SELECT COUNT(*)
           FROM riasec_session_responses response
           LEFT JOIN riasec_session_question_items snapshot
             ON snapshot.session_id=response.session_id
            AND snapshot.item_record_id=response.item_record_id
           WHERE response.session_id=?
             AND snapshot.item_record_id IS NULL""",
        (session_id,),
    ).fetchone()[0]
    if outside_snapshot_count:
        raise HTTPException(
            400,
            "Session contains responses outside its question snapshot.",
        )

    missing = [row["item_id"] for row in rows if row["raw_value"] is None]
    if missing:
        raise HTTPException(
            400,
            detail={
                "message": "Assessment incomplete",
                "missing": missing,
            },
        )

    result = score_riasec(
        [
            RiasecItem(
                row["item_id"],
                row["dimension"],
                row["display_order"],
            )
            for row in rows
        ],
        {row["item_id"]: row["raw_value"] for row in rows},
    )
    now = datetime.now(timezone.utc).isoformat()
    conn.execute(
        """INSERT INTO riasec_results(
             session_id, code, scores_json, percentages_json,
             ranking_json, answered_json, calculated_at
           )
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(session_id) DO UPDATE SET
             code=excluded.code,
             scores_json=excluded.scores_json,
             percentages_json=excluded.percentages_json,
             ranking_json=excluded.ranking_json,
             answered_json=excluded.answered_json,
             calculated_at=excluded.calculated_at""",
        (
            session_id,
            result["code"],
            json.dumps(result["scores"], separators=(",", ":")),
            json.dumps(result["percentages"], separators=(",", ":")),
            json.dumps(result["ranking"], separators=(",", ":")),
            json.dumps(result["answered"], separators=(",", ":")),
            now,
        ),
    )
    conn.execute(
        "UPDATE sessions SET completed_at=?, status='completed' WHERE session_id=?",
        (now, session_id),
    )
    return result
