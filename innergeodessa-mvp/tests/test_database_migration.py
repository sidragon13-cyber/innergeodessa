import json
from pathlib import Path
import shutil
import sqlite3
import sys

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app.database import initialize


ROOT = Path(__file__).resolve().parents[1] / "backend"
SOURCE_DB = ROOT / "innergeodessa.db"
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


def test_non_destructive_versioned_migration_is_idempotent(tmp_path):
    database_path = tmp_path / "migration.db"
    shutil.copy2(SOURCE_DB, database_path)

    with sqlite3.connect(database_path) as connection:
        before_results = connection.execute(
            "SELECT * FROM results ORDER BY session_id"
        ).fetchall()

    initialize(db_path=database_path, items_path=ITEMS_PATH)

    with sqlite3.connect(database_path) as connection:
        counts = collect_counts(connection)
        assert counts == {
            "items": 72,
            "sessions": 21,
            "responses": 246,
            "results": 3,
            "question_banks": 2,
            "question_bank_items": 144,
            "session_question_items": 1512,
            "session_responses": 246,
        }

        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM sessions "
            "WHERE question_bank_version='personality-legacy-v1'",
        ) == 21
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
        ) == 72
        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM question_bank_items "
            "WHERE question_bank_version='personality-v1.0.0'",
        ) == 72
        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM ("
            "SELECT source_item_id FROM question_bank_items "
            "GROUP BY source_item_id HAVING COUNT(*)=2"
            ")",
        ) == 24
        assert fetch_value(
            connection,
            "SELECT COUNT(*) FROM session_responses sr "
            "LEFT JOIN question_bank_items qbi "
            "ON qbi.item_record_id=sr.item_record_id "
            "WHERE qbi.item_record_id IS NULL",
        ) == 0
        assert connection.execute("PRAGMA foreign_key_check").fetchall() == []
        assert connection.execute(
            "SELECT * FROM results ORDER BY session_id"
        ).fetchall() == before_results

    initialize(db_path=database_path, items_path=ITEMS_PATH)

    with sqlite3.connect(database_path) as connection:
        assert collect_counts(connection) == counts
        assert connection.execute("PRAGMA foreign_key_check").fetchall() == []


def test_generated_bank_declares_current_version():
    items = json.loads(ITEMS_PATH.read_text(encoding="utf-8"))

    assert len(items) == 72
    assert {
        item["question_bank_version"] for item in items
    } == {"personality-v1.0.0"}


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
