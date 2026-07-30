from __future__ import annotations
import json
import sqlite3
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "innergeodessa.db"
SCHEMA_PATH = ROOT / "schema.sql"
ITEMS_PATH = ROOT / "data" / "items.json"
RIASEC_ITEMS_PATH = ROOT / "data" / "riasec-items.json"

LEGACY_BANK_VERSION = "personality-legacy-v1"
CURRENT_BANK_VERSION = "personality-v1.0.0"
RIASEC_BANK_VERSION = "riasec-v0.1.0"


def connect(db_path: Path = DB_PATH) -> sqlite3.Connection:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn



def initialize(
    db_path: Path = DB_PATH,
    items_path: Path = ITEMS_PATH,
    riasec_items_path: Path = RIASEC_ITEMS_PATH,
) -> None:
    items = _load_current_items(items_path)
    riasec_items = _load_riasec_items(riasec_items_path)

    with connect(db_path) as conn:
        conn.execute("BEGIN IMMEDIATE")
        try:
            _apply_schema(conn)
            _ensure_session_version_column(conn)
            _ensure_session_module_column(conn)
            _register_question_banks(conn)
            _capture_legacy_items(conn)
            _backfill_legacy_sessions(conn)
            _create_missing_session_snapshots(conn)
            _migrate_legacy_responses(conn)
            _upsert_current_items(conn, items)
            _upsert_riasec_items(conn, riasec_items)
            _verify_migration(conn)
        except Exception:
            conn.rollback()
            raise
        else:
            conn.commit()


def _apply_schema(conn: sqlite3.Connection) -> None:
    statements = SCHEMA_PATH.read_text(encoding="utf-8").split(";")
    for statement in statements:
        if statement.strip():
            conn.execute(statement)


def _ensure_session_version_column(conn: sqlite3.Connection) -> None:
    columns = {
        row["name"]
        for row in conn.execute("PRAGMA table_info(sessions)").fetchall()
    }
    if "question_bank_version" not in columns:
        conn.execute(
            "ALTER TABLE sessions ADD COLUMN question_bank_version TEXT"
        )


def _ensure_session_module_column(conn: sqlite3.Connection) -> None:
    columns = {
        row["name"]
        for row in conn.execute("PRAGMA table_info(sessions)").fetchall()
    }
    if "module" not in columns:
        conn.execute(
            """ALTER TABLE sessions
               ADD COLUMN module TEXT NOT NULL DEFAULT 'personality'"""
        )


def _load_current_items(items_path: Path) -> list[dict]:
    parsed = json.loads(items_path.read_text(encoding="utf-8"))
    if not isinstance(parsed, list) or len(parsed) != 72:
        raise ValueError("Current personality items must contain exactly 72 rows")

    required = {
        "item_id",
        "dimension",
        "subdimension",
        "key",
        "form",
        "wording",
        "language",
        "version",
        "question_bank_version",
        "status",
        "master_order",
        "reverse_scored",
    }
    for index, item in enumerate(parsed):
        if not isinstance(item, dict) or not required.issubset(item):
            raise ValueError(f"Current personality item {index} is invalid")
        if item["question_bank_version"] != CURRENT_BANK_VERSION:
            raise ValueError(
                f"Current personality item {index} has an unexpected bank version"
            )
    return parsed


def _load_riasec_items(items_path: Path) -> list[dict]:
    parsed = json.loads(items_path.read_text(encoding="utf-8"))
    if not isinstance(parsed, list) or len(parsed) != 36:
        raise ValueError("RIASEC items must contain exactly 36 rows")

    required = {
        "source_item_id",
        "dimension",
        "wording",
        "master_order",
    }
    dimensions = {"R", "I", "A", "S", "E", "C"}
    for index, item in enumerate(parsed):
        if not isinstance(item, dict) or not required.issubset(item):
            raise ValueError(f"RIASEC item {index} is invalid")
        if item["dimension"] not in dimensions:
            raise ValueError(
                f"RIASEC item {index} has an invalid dimension"
            )
    return parsed


def _register_question_banks(conn: sqlite3.Connection) -> None:
    conn.execute(
        """INSERT INTO question_banks(question_bank_version, status)
           VALUES (?, 'retired')
           ON CONFLICT(question_bank_version) DO NOTHING""",
        (LEGACY_BANK_VERSION,),
    )
    conn.execute(
        """INSERT INTO question_banks(question_bank_version, status)
           VALUES (?, 'pilot')
           ON CONFLICT(question_bank_version) DO UPDATE SET
           status=excluded.status""",
        (CURRENT_BANK_VERSION,),
    )
    conn.execute(
        """INSERT INTO question_banks(question_bank_version, status)
           VALUES (?, 'draft')
           ON CONFLICT(question_bank_version) DO UPDATE SET
           status=excluded.status""",
        (RIASEC_BANK_VERSION,),
    )


def _capture_legacy_items(conn: sqlite3.Connection) -> None:
    conn.execute(
        """INSERT INTO question_bank_items(
             question_bank_version, source_item_id, dimension, subdimension,
             keyed_pole, form, wording, language, version, status,
             master_order, reverse_scored
           )
           SELECT ?, item_id, dimension, subdimension, keyed_pole, form,
                  wording, language, version, 'retired', master_order,
                  CASE
                    WHEN keyed_pole IN ('I','N','F','P') THEN 1
                    ELSE 0
                  END
           FROM items
           WHERE 1=1
           ON CONFLICT(question_bank_version, source_item_id) DO NOTHING""",
        (LEGACY_BANK_VERSION,),
    )


def _backfill_legacy_sessions(conn: sqlite3.Connection) -> None:
    conn.execute(
        """UPDATE sessions
           SET question_bank_version=?
           WHERE question_bank_version IS NULL
              OR trim(question_bank_version)=''""",
        (LEGACY_BANK_VERSION,),
    )


def _create_missing_session_snapshots(conn: sqlite3.Connection) -> None:
    conn.execute(
        """INSERT INTO session_question_items(
             session_id, item_record_id, display_order
           )
           SELECT s.session_id, qbi.item_record_id, qbi.master_order
           FROM sessions s
           JOIN question_bank_items qbi
             ON qbi.question_bank_version=s.question_bank_version
           WHERE 1=1
           ON CONFLICT(session_id, item_record_id) DO NOTHING"""
    )


def _migrate_legacy_responses(conn: sqlite3.Connection) -> None:
    conn.execute(
        """INSERT INTO session_responses(
             session_id, item_record_id, raw_value,
             response_time_ms, answered_at
           )
           SELECT r.session_id, sqi.item_record_id, r.raw_value,
                  r.response_time_ms, r.answered_at
           FROM responses r
           JOIN session_question_items sqi
             ON sqi.session_id=r.session_id
           JOIN question_bank_items qbi
             ON qbi.item_record_id=sqi.item_record_id
            AND qbi.source_item_id=r.item_id
           WHERE 1=1
           ON CONFLICT(session_id, item_record_id) DO UPDATE SET
             raw_value=excluded.raw_value,
             response_time_ms=excluded.response_time_ms,
             answered_at=excluded.answered_at"""
    )


def _upsert_current_items(
    conn: sqlite3.Connection,
    items: list[dict],
) -> None:
    conn.executemany(
        """INSERT INTO question_bank_items(
             question_bank_version, source_item_id, dimension, subdimension,
             keyed_pole, form, wording, language, version, status,
             master_order, reverse_scored
           )
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(question_bank_version, source_item_id) DO UPDATE SET
             dimension=excluded.dimension,
             subdimension=excluded.subdimension,
             keyed_pole=excluded.keyed_pole,
             form=excluded.form,
             wording=excluded.wording,
             language=excluded.language,
             version=excluded.version,
             status=excluded.status,
             master_order=excluded.master_order,
             reverse_scored=excluded.reverse_scored""",
        [
            (
                item["question_bank_version"],
                item["item_id"],
                item["dimension"],
                item["subdimension"],
                item["key"],
                item["form"],
                item["wording"],
                item["language"],
                item["version"],
                item["status"],
                item["master_order"],
                int(item["reverse_scored"]),
            )
            for item in items
        ],
    )


def _upsert_riasec_items(
    conn: sqlite3.Connection,
    items: list[dict],
) -> None:
    conn.executemany(
        """INSERT INTO riasec_question_items(
             question_bank_version, source_item_id, dimension,
             wording, language, version, status, master_order
           )
           VALUES (?, ?, ?, ?, 'en', '0.1.0', 'draft', ?)
           ON CONFLICT(question_bank_version, source_item_id) DO UPDATE SET
             dimension=excluded.dimension,
             wording=excluded.wording,
             language=excluded.language,
             version=excluded.version,
             status=excluded.status,
             master_order=excluded.master_order""",
        [
            (
                RIASEC_BANK_VERSION,
                item["source_item_id"],
                item["dimension"],
                item["wording"],
                item["master_order"],
            )
            for item in items
        ],
    )


def _verify_migration(conn: sqlite3.Connection) -> None:
    unversioned_sessions = conn.execute(
        """SELECT COUNT(*) FROM sessions
           WHERE question_bank_version IS NULL
              OR trim(question_bank_version)=''"""
    ).fetchone()[0]
    if unversioned_sessions:
        raise ValueError("Every session must have a question bank version")

    invalid_session_modules = conn.execute(
        """SELECT COUNT(*) FROM sessions
           WHERE module IS NULL
              OR module NOT IN ('personality', 'riasec')"""
    ).fetchone()[0]
    if invalid_session_modules:
        raise ValueError("Every session must have a supported module")

    orphaned_responses = conn.execute(
        """SELECT COUNT(*) FROM responses r
           LEFT JOIN question_bank_items qbi
             ON qbi.question_bank_version=?
            AND qbi.source_item_id=r.item_id
           LEFT JOIN session_responses sr
             ON sr.session_id=r.session_id
            AND sr.item_record_id=qbi.item_record_id
           WHERE sr.item_record_id IS NULL""",
        (LEGACY_BANK_VERSION,),
    ).fetchone()[0]
    if orphaned_responses:
        raise ValueError(
            f"Migration left {orphaned_responses} legacy responses unlinked"
        )

    foreign_key_errors = conn.execute(
        "PRAGMA foreign_key_check"
    ).fetchall()
    if foreign_key_errors:
        raise ValueError("Database contains foreign key errors after migration")

if __name__ == "__main__":
    initialize()
    print(f"Initialized {DB_PATH}")
