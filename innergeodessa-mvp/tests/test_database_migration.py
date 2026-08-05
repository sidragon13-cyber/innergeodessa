import json
from pathlib import Path
import sqlite3
import sys

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app.database import initialize
from legacy_fixture import (
    LEGACY_ITEM_COUNT,
    OVERLAPPING_SOURCE_ID_COUNT,
    create_legacy_database,
)


ROOT = Path(__file__).resolve().parents[1] / "backend"
ITEMS_PATH = ROOT / "data" / "items.json"
SCHEMA_PATH = ROOT / "schema.sql"


def fetch_value(connection, sql, parameters=()):
    row = connection.execute(sql, parameters).fetchone()
    return row[0]


def collect_counts(connection):
    return {
        table: fetch_value(connection, f"SELECT COUNT(*) FROM {table}")
        for table in (
            "items",
            "sessions",
            "responses",
            "results",
            "question_banks",
            "question_bank_items",
            "session_question_items",
            "session_responses",
        )
    }


def collect_legacy_rows(connection):
    return {
        "items": connection.execute(
            "SELECT * FROM items ORDER BY item_id"
        ).fetchall(),
        "sessions": connection.execute(
            """SELECT session_id, consent, language, started_at,
                      completed_at, status
               FROM sessions ORDER BY session_id"""
        ).fetchall(),
        "responses": connection.execute(
            """SELECT * FROM responses
               ORDER BY session_id, item_id"""
        ).fetchall(),
        "results": connection.execute(
            "SELECT * FROM results ORDER BY session_id"
        ).fetchall(),
    }


def test_non_destructive_versioned_migration_is_idempotent(tmp_path):
    database_path = tmp_path / "migration.db"
    create_legacy_database(
        database_path,
        SCHEMA_PATH,
        ITEMS_PATH,
    )

    with sqlite3.connect(database_path) as connection:
        before_legacy_rows = collect_legacy_rows(connection)

    initialize(db_path=database_path, items_path=ITEMS_PATH)

    with sqlite3.connect(database_path) as connection:
        counts = collect_counts(connection)
        assert counts == {
            "items": LEGACY_ITEM_COUNT,
            "sessions": 2,
            "responses": 2,
            "results": 1,
            "question_banks": 3,
            "question_bank_items": LEGACY_ITEM_COUNT + 72,
            "session_question_items": 2 * LEGACY_ITEM_COUNT,
            "session_responses": 2,
        }
        assert collect_legacy_rows(connection) == before_legacy_rows

        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM sessions "
            "WHERE question_bank_version='personality-legacy-v1'",
        ) == 2
        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM sessions "
            "WHERE question_bank_version IS NULL "
            "OR trim(question_bank_version)=''",
        ) == 0
        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM question_bank_items "
            "WHERE question_bank_version='personality-legacy-v1'",
        ) == LEGACY_ITEM_COUNT
        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM question_bank_items "
            "WHERE question_bank_version='personality-v2.0.0'",
        ) == 72
        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM ("
            "SELECT source_item_id FROM question_bank_items "
            "GROUP BY source_item_id HAVING COUNT(*)=2"
            ")",
        ) == OVERLAPPING_SOURCE_ID_COUNT
        assert connection.execute(
            """SELECT session_id, COUNT(*)
               FROM session_question_items
               GROUP BY session_id
               ORDER BY session_id"""
        ).fetchall() == [
            ("legacy-active-session", LEGACY_ITEM_COUNT),
            ("legacy-completed-session", LEGACY_ITEM_COUNT),
        ]
        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM session_responses sr "
            "LEFT JOIN question_bank_items qbi "
            "ON qbi.item_record_id=sr.item_record_id "
            "WHERE qbi.item_record_id IS NULL",
        ) == 0
        assert connection.execute("PRAGMA foreign_key_check").fetchall() == []
        assert collect_legacy_rows(connection) == before_legacy_rows

    initialize(db_path=database_path, items_path=ITEMS_PATH)

    with sqlite3.connect(database_path) as connection:
        assert collect_counts(connection) == counts
        assert connection.execute("PRAGMA foreign_key_check").fetchall() == []


def test_generated_bank_declares_current_version():
    items = json.loads(ITEMS_PATH.read_text(encoding="utf-8"))

    assert len(items) == 72
    assert {
        item["question_bank_version"] for item in items
    } == {"personality-v2.0.0"}


def test_failed_migration_rolls_back_schema_and_data(tmp_path):
    database_path = tmp_path / "failed-migration.db"
    invalid_items_path = tmp_path / "invalid-items.json"
    legacy_schema = SCHEMA_PATH.read_text(encoding="utf-8").split(
        "CREATE TABLE IF NOT EXISTS question_banks",
        maxsplit=1,
    )[0]
    with sqlite3.connect(database_path) as connection:
        connection.executescript(legacy_schema)
    invalid_items_path.write_text("[]", encoding="utf-8")

    with pytest.raises(ValueError):
        initialize(
            db_path=database_path,
            items_path=invalid_items_path,
        )

    with sqlite3.connect(database_path) as connection:
        table_names = {
            row[0]
            for row in connection.execute(
                "SELECT name FROM sqlite_master WHERE type='table'"
            )
        }
        session_columns = {
            row[1]
            for row in connection.execute(
                "PRAGMA table_info(sessions)"
            )
        }

        assert "question_banks" not in table_names
        assert "question_bank_version" not in session_columns


def test_legacy_migration_adds_riasec_persistence_idempotently(
    tmp_path,
):
    database_path = tmp_path / "riasec-migration.db"
    create_legacy_database(
        database_path,
        SCHEMA_PATH,
        ITEMS_PATH,
    )

    initialize(db_path=database_path, items_path=ITEMS_PATH)
    initialize(db_path=database_path, items_path=ITEMS_PATH)

    with sqlite3.connect(database_path) as connection:
        tables = {
            row[0]
            for row in connection.execute(
                "SELECT name FROM sqlite_master WHERE type='table'"
            )
        }
        assert {
            "riasec_question_items",
            "riasec_session_question_items",
            "riasec_session_responses",
            "riasec_results",
        }.issubset(tables)
        assert fetch_value(
            connection,
            """SELECT COUNT(*) FROM question_banks
               WHERE question_bank_version='riasec-v0.1.0'""",
        ) == 1
        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM riasec_question_items",
        ) == 36
        assert fetch_value(
            connection,
            """SELECT COUNT(*) FROM sessions
               WHERE module='personality'""",
        ) == 2
        assert connection.execute(
            "PRAGMA foreign_key_check"
        ).fetchall() == []
