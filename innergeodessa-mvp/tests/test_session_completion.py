from pathlib import Path
import sqlite3
import sys

from fastapi import HTTPException
import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app import session_completion
from app.database import CURRENT_BANK_VERSION, connect, initialize
from app.session_completion import complete_session_assessment
from legacy_fixture import create_legacy_database


ROOT = Path(__file__).resolve().parents[1] / "backend"
ITEMS_PATH = ROOT / "data" / "items.json"
SCHEMA_PATH = ROOT / "schema.sql"


@pytest.fixture
def database_path(tmp_path):
    path = tmp_path / "session-completion.db"
    create_legacy_database(path, SCHEMA_PATH, ITEMS_PATH)
    initialize(db_path=path, items_path=ITEMS_PATH)
    return path


def create_current_session(
    database_path,
    *,
    session_id="current-session",
    status="active",
    include_responses=True,
):
    with connect(database_path) as connection:
        connection.execute(
            """INSERT INTO sessions(
                 session_id, consent, language, started_at,
                 status, question_bank_version
               )
               VALUES (?, 1, 'en', ?, ?, ?)""",
            (
                session_id,
                "2026-01-03T00:00:00+00:00",
                status,
                CURRENT_BANK_VERSION,
            ),
        )
        connection.execute(
            """INSERT INTO session_question_items(
                 session_id, item_record_id, display_order
               )
               SELECT ?, item_record_id, master_order
               FROM question_bank_items
               WHERE question_bank_version=?""",
            (session_id, CURRENT_BANK_VERSION),
        )
        if include_responses:
            connection.execute(
                """INSERT INTO session_responses(
                     session_id, item_record_id, raw_value,
                     response_time_ms, answered_at
                   )
                   SELECT ?, item_record_id, 3, 1000, ?
                   FROM session_question_items
                   WHERE session_id=?""",
                (
                    session_id,
                    "2026-01-03T00:01:00+00:00",
                    session_id,
                ),
            )
    return session_id


def assert_http_exception(
    error,
    *,
    status_code,
    detail,
):
    assert error.value.status_code == status_code
    assert error.value.detail == detail


def test_complete_session_saves_result_and_marks_session_completed(
    database_path,
):
    session_id = create_current_session(database_path)

    with connect(database_path) as connection:
        result = complete_session_assessment(connection, session_id)

    assert result == {
        "type": "ESTJ",
        "scores": {"EI": 0, "SN": 0, "TF": 0, "JP": 0},
        "confidence": {
            "EI": 0.0,
            "SN": 0.0,
            "TF": 0.0,
            "JP": 0.0,
        },
        "answered": {"EI": 18, "SN": 18, "TF": 18, "JP": 18},
        "tie_rule": (
            "A zero score resolves to the first pole and must be "
            "reported as low differentiation."
        ),
    }
    with connect(database_path) as connection:
        session = connection.execute(
            "SELECT status, completed_at FROM sessions WHERE session_id=?",
            (session_id,),
        ).fetchone()
        saved_result = connection.execute(
            "SELECT personality_type FROM results WHERE session_id=?",
            (session_id,),
        ).fetchone()
    assert session["status"] == "completed"
    assert session["completed_at"]
    assert saved_result["personality_type"] == "ESTJ"


def test_complete_session_rejects_unknown_session(database_path):
    with pytest.raises(HTTPException) as error:
        with connect(database_path) as connection:
            complete_session_assessment(connection, "unknown-session")

    assert_http_exception(
        error,
        status_code=404,
        detail="Session not found.",
    )


@pytest.mark.parametrize("status", ["completed", "invalid"])
def test_complete_session_rejects_non_active_status(
    database_path,
    status,
):
    session_id = create_current_session(
        database_path,
        status=status,
    )

    with pytest.raises(HTTPException) as error:
        with connect(database_path) as connection:
            complete_session_assessment(connection, session_id)

    assert_http_exception(
        error,
        status_code=409,
        detail="Session is not active.",
    )


def test_complete_session_rejects_invalid_snapshot_count(database_path):
    session_id = create_current_session(database_path)
    with connect(database_path) as connection:
        connection.execute(
            """DELETE FROM session_question_items
               WHERE session_id=? AND display_order=72""",
            (session_id,),
        )

    with pytest.raises(HTTPException) as error:
        with connect(database_path) as connection:
            complete_session_assessment(connection, session_id)

    assert_http_exception(
        error,
        status_code=400,
        detail={
            "message": "Session question snapshot is invalid",
            "expected": 72,
            "actual": 71,
        },
    )


def test_complete_session_rejects_response_outside_snapshot(database_path):
    session_id = create_current_session(database_path)
    with connect(database_path) as connection:
        legacy_item_record_id = connection.execute(
            """SELECT item_record_id
               FROM question_bank_items
               WHERE question_bank_version='personality-legacy-v1'
                 AND source_item_id NOT IN (
                   SELECT source_item_id
                   FROM question_bank_items
                   WHERE question_bank_version=?
                 )
               ORDER BY master_order
               LIMIT 1""",
            (CURRENT_BANK_VERSION,),
        ).fetchone()[0]
        connection.execute(
            """INSERT INTO session_responses(
                 session_id, item_record_id, raw_value,
                 response_time_ms, answered_at
               )
               VALUES (?, ?, 3, 1000, ?)""",
            (
                session_id,
                legacy_item_record_id,
                "2026-01-03T00:02:00+00:00",
            ),
        )

    with pytest.raises(HTTPException) as error:
        with connect(database_path) as connection:
            complete_session_assessment(connection, session_id)

    assert_http_exception(
        error,
        status_code=400,
        detail=(
            "Session contains responses outside its question snapshot."
        ),
    )


def test_complete_session_rejects_missing_response(database_path):
    session_id = create_current_session(database_path)
    with connect(database_path) as connection:
        missing_item_id = connection.execute(
            """SELECT qbi.source_item_id
               FROM session_question_items sqi
               JOIN question_bank_items qbi
                 ON qbi.item_record_id=sqi.item_record_id
               WHERE sqi.session_id=? AND sqi.display_order=72""",
            (session_id,),
        ).fetchone()[0]
        connection.execute(
            """DELETE FROM session_responses
               WHERE session_id=? AND item_record_id=(
                 SELECT item_record_id
                 FROM session_question_items
                 WHERE session_id=? AND display_order=72
               )""",
            (session_id, session_id),
        )

    with pytest.raises(HTTPException) as error:
        with connect(database_path) as connection:
            complete_session_assessment(connection, session_id)

    assert_http_exception(
        error,
        status_code=400,
        detail={
            "message": "Assessment incomplete",
            "missing": [missing_item_id],
        },
    )


def test_complete_session_propagates_scoring_error_without_writes(
    database_path,
    monkeypatch,
):
    session_id = create_current_session(database_path)

    def reject_scoring(*_args, **_kwargs):
        raise ValueError("Scoring rejected fixture")

    monkeypatch.setattr(
        session_completion,
        "score_assessment",
        reject_scoring,
    )

    with pytest.raises(ValueError, match="Scoring rejected fixture"):
        with connect(database_path) as connection:
            complete_session_assessment(connection, session_id)

    with connect(database_path) as connection:
        result_count = connection.execute(
            "SELECT COUNT(*) FROM results WHERE session_id=?",
            (session_id,),
        ).fetchone()[0]
        status = connection.execute(
            "SELECT status FROM sessions WHERE session_id=?",
            (session_id,),
        ).fetchone()[0]
    assert result_count == 0
    assert status == "active"


@pytest.mark.parametrize(
    "trigger_sql",
    [
        """CREATE TRIGGER fail_result_insert
           BEFORE INSERT ON results
           BEGIN
             SELECT RAISE(ABORT, 'result insert failed');
           END""",
        """CREATE TRIGGER fail_session_completion
           BEFORE UPDATE OF status ON sessions
           WHEN NEW.status='completed'
           BEGIN
             SELECT RAISE(ABORT, 'session update failed');
           END""",
    ],
)
def test_complete_session_rolls_back_failed_persistence(
    database_path,
    trigger_sql,
):
    session_id = create_current_session(database_path)
    with connect(database_path) as connection:
        connection.execute(trigger_sql)

    with pytest.raises(sqlite3.IntegrityError):
        with connect(database_path) as connection:
            complete_session_assessment(connection, session_id)

    with connect(database_path) as connection:
        result_count = connection.execute(
            "SELECT COUNT(*) FROM results WHERE session_id=?",
            (session_id,),
        ).fetchone()[0]
        session = connection.execute(
            "SELECT status, completed_at FROM sessions WHERE session_id=?",
            (session_id,),
        ).fetchone()
    assert result_count == 0
    assert session["status"] == "active"
    assert session["completed_at"] is None
