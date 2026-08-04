from pathlib import Path
import sqlite3
import sys

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app.database import connect, initialize
from legacy_fixture import create_legacy_database


ROOT = Path(__file__).resolve().parents[1] / "backend"
ITEMS_PATH = ROOT / "data" / "items.json"
SCHEMA_PATH = ROOT / "schema.sql"

EXPECTED_TABLES = {
    "users",
    "auth_sessions",
    "email_verification_tokens",
    "zodiac_charts",
    "report_entitlements",
}

EXPECTED_INDEXES = {
    "idx_auth_sessions_user_id",
    "idx_auth_sessions_expires_at",
    "idx_auth_sessions_revoked_at",
    "idx_report_entitlements_user_id",
    "idx_report_entitlements_module_resource",
    "idx_report_entitlements_status",
}


def table_names(connection):
    return {
        row[0]
        for row in connection.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )
    }


def index_names(connection):
    return {
        row[0]
        for row in connection.execute(
            "SELECT name FROM sqlite_master WHERE type='index'"
        )
    }


def insert_user(connection, user_id="user-1", email="User@Example.com"):
    connection.execute(
        """INSERT INTO users(
             user_id, email, email_normalized, nickname,
             created_at, updated_at
           ) VALUES (?, ?, ?, 'Anonymous Voyager', ?, ?)""",
        (
            user_id,
            email,
            email.casefold(),
            "2026-08-04T00:00:00Z",
            "2026-08-04T00:00:00Z",
        ),
    )


def test_empty_database_initialization_creates_account_schema_idempotently(
    tmp_path,
):
    database_path = tmp_path / "account-schema.db"

    initialize(db_path=database_path, items_path=ITEMS_PATH)
    initialize(db_path=database_path, items_path=ITEMS_PATH)

    with connect(database_path) as connection:
        assert EXPECTED_TABLES.issubset(table_names(connection))
        assert EXPECTED_INDEXES.issubset(index_names(connection))
        assert {
            row[1]
            for row in connection.execute("PRAGMA table_info(sessions)")
        }.issuperset(
            {"owner_user_id", "claim_secret_hash", "claimed_at"}
        )
        assert connection.execute("PRAGMA foreign_keys").fetchone()[0] == 1
        assert connection.execute("PRAGMA foreign_key_check").fetchall() == []


def test_legacy_database_upgrade_preserves_assessment_data_and_adds_claim_fields(
    tmp_path,
):
    database_path = tmp_path / "legacy-account-upgrade.db"
    create_legacy_database(database_path, SCHEMA_PATH, ITEMS_PATH)

    with sqlite3.connect(database_path) as connection:
        sessions_before = connection.execute(
            """SELECT session_id, consent, language, started_at,
                      completed_at, status
               FROM sessions ORDER BY session_id"""
        ).fetchall()
        responses_before = connection.execute(
            "SELECT * FROM responses ORDER BY session_id, item_id"
        ).fetchall()
        results_before = connection.execute(
            "SELECT * FROM results ORDER BY session_id"
        ).fetchall()

    initialize(db_path=database_path, items_path=ITEMS_PATH)

    with sqlite3.connect(database_path) as connection:
        connection.execute("PRAGMA foreign_keys = ON")
        assert connection.execute(
            """SELECT session_id, consent, language, started_at,
                      completed_at, status
               FROM sessions ORDER BY session_id"""
        ).fetchall() == sessions_before
        assert connection.execute(
            "SELECT * FROM responses ORDER BY session_id, item_id"
        ).fetchall() == responses_before
        assert connection.execute(
            "SELECT * FROM results ORDER BY session_id"
        ).fetchall() == results_before
        assert connection.execute(
            """SELECT COUNT(*) FROM sessions
               WHERE owner_user_id IS NULL
                 AND claim_secret_hash IS NULL
                 AND claimed_at IS NULL"""
        ).fetchone()[0] == len(sessions_before)
        assert connection.execute("PRAGMA foreign_key_check").fetchall() == []


def test_account_and_entitlement_unique_and_check_constraints(tmp_path):
    database_path = tmp_path / "account-constraints.db"
    initialize(db_path=database_path, items_path=ITEMS_PATH)

    with connect(database_path) as connection:
        insert_user(connection)

        with pytest.raises(sqlite3.IntegrityError):
            insert_user(
                connection,
                user_id="user-2",
                email="user@example.com",
            )

        connection.execute(
            """INSERT INTO report_entitlements(
                 entitlement_id, user_id, module, resource_id,
                 created_at, updated_at
               ) VALUES ('entitlement-1', 'user-1', 'zodiac', 'chart-1', ?, ?)""",
            ("2026-08-04T00:00:00Z", "2026-08-04T00:00:00Z"),
        )

        with pytest.raises(sqlite3.IntegrityError):
            connection.execute(
                """INSERT INTO report_entitlements(
                     entitlement_id, user_id, module, resource_id,
                     created_at, updated_at
                   ) VALUES ('entitlement-2', 'user-1', 'zodiac',
                             'chart-1', ?, ?)""",
                ("2026-08-04T00:00:00Z", "2026-08-04T00:00:00Z"),
            )

        for entitlement_id, module, status in (
            ("invalid-module", "unknown", "pending"),
            ("invalid-status", "zodiac", "unknown"),
        ):
            with pytest.raises(sqlite3.IntegrityError):
                connection.execute(
                    """INSERT INTO report_entitlements(
                         entitlement_id, user_id, module, resource_id,
                         status, created_at, updated_at
                       ) VALUES (?, 'user-1', ?, ?, ?, ?, ?)""",
                    (
                        entitlement_id,
                        module,
                        entitlement_id,
                        status,
                        "2026-08-04T00:00:00Z",
                        "2026-08-04T00:00:00Z",
                    ),
                )


def test_user_deletion_cascades_private_records_and_detaches_resources(
    tmp_path,
):
    database_path = tmp_path / "account-deletion.db"
    initialize(db_path=database_path, items_path=ITEMS_PATH)

    with connect(database_path) as connection:
        insert_user(connection)
        connection.execute(
            """INSERT INTO auth_sessions(
                 auth_session_id, user_id, token_hash,
                 created_at, expires_at
               ) VALUES ('auth-1', 'user-1', 'auth-hash', ?, ?)""",
            ("2026-08-04T00:00:00Z", "2026-09-04T00:00:00Z"),
        )
        connection.execute(
            """INSERT INTO email_verification_tokens(
                 verification_id, user_id, token_hash,
                 created_at, expires_at
               ) VALUES ('verify-1', 'user-1', 'verify-hash', ?, ?)""",
            ("2026-08-04T00:00:00Z", "2026-08-05T00:00:00Z"),
        )
        connection.execute(
            """INSERT INTO report_entitlements(
                 entitlement_id, user_id, module, resource_id,
                 status, created_at, updated_at
               ) VALUES ('entitlement-1', 'user-1', 'personality',
                         'session-1', 'unlocked', ?, ?)""",
            ("2026-08-04T00:00:00Z", "2026-08-04T00:00:00Z"),
        )
        connection.execute(
            """INSERT INTO sessions(
                 session_id, consent, language, module, started_at,
                 status, owner_user_id
               ) VALUES ('session-owned', 1, 'en', 'personality', ?,
                         'active', 'user-1')""",
            ("2026-08-04T00:00:00Z",),
        )
        connection.execute(
            """INSERT INTO zodiac_charts(
                 chart_id, owner_user_id, result_json, schema_version,
                 calculated_at, created_at, updated_at
               ) VALUES ('chart-owned', 'user-1', '{}', '1', ?, ?, ?)""",
            (
                "2026-08-04T00:00:00Z",
                "2026-08-04T00:00:00Z",
                "2026-08-04T00:00:00Z",
            ),
        )

        connection.execute("DELETE FROM users WHERE user_id='user-1'")

        for table in (
            "auth_sessions",
            "email_verification_tokens",
            "report_entitlements",
        ):
            assert connection.execute(
                f"SELECT COUNT(*) FROM {table}"
            ).fetchone()[0] == 0
        assert connection.execute(
            "SELECT owner_user_id FROM sessions WHERE session_id='session-owned'"
        ).fetchone()[0] is None
        assert connection.execute(
            "SELECT owner_user_id FROM zodiac_charts WHERE chart_id='chart-owned'"
        ).fetchone()[0] is None
        assert connection.execute("PRAGMA foreign_key_check").fetchall() == []
