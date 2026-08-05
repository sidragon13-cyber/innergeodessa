from pathlib import Path
import sqlite3
import sys

sys.path.insert(
    0,
    str(Path(__file__).resolve().parents[1]),
)
sys.path.insert(
    0,
    str(Path(__file__).resolve().parents[1] / "backend"),
)

from app.database import initialize
from scripts.database_backup import (
    calculate_sha256,
    create_backup,
    verify_database,
)
from scripts.database_restore import restore_database


ROOT = Path(__file__).resolve().parents[1]
ITEMS_PATH = ROOT / "backend" / "data" / "items.json"

EXPECTED_MIGRATIONS = {
    "20260725_001_account_columns",
    "20260725_002_session_versioning",
    "20260725_003_legacy_assessment_data",
}


def test_initialization_records_explicit_migration_ledger(
    tmp_path,
):
    database_path = tmp_path / "migration-ledger.db"

    initialize(
        db_path=database_path,
        items_path=ITEMS_PATH,
    )
    initialize(
        db_path=database_path,
        items_path=ITEMS_PATH,
    )

    with sqlite3.connect(database_path) as connection:
        migrations = {
            row[0]
            for row in connection.execute(
                """SELECT migration_id
                   FROM schema_migrations"""
            ).fetchall()
        }

        assert EXPECTED_MIGRATIONS.issubset(migrations)

        duplicate_count = connection.execute(
            """SELECT COUNT(*)
               FROM (
                 SELECT migration_id
                 FROM schema_migrations
                 GROUP BY migration_id
                 HAVING COUNT(*) > 1
               )"""
        ).fetchone()[0]

        assert duplicate_count == 0
        assert connection.execute(
            "PRAGMA integrity_check"
        ).fetchone()[0] == "ok"
        assert connection.execute(
            "PRAGMA foreign_key_check"
        ).fetchall() == []


def test_database_backup_and_restore_round_trip(
    tmp_path,
):
    database_path = tmp_path / "source.db"
    backup_directory = tmp_path / "backups"
    restored_path = tmp_path / "restored.db"

    initialize(
        db_path=database_path,
        items_path=ITEMS_PATH,
    )

    with sqlite3.connect(database_path) as connection:
        connection.execute(
            """INSERT INTO users(
                 user_id,
                 email,
                 email_normalized,
                 nickname,
                 created_at,
                 updated_at
               ) VALUES (
                 'backup-user',
                 'backup@example.com',
                 'backup@example.com',
                 'Backup User',
                 '2026-08-05T00:00:00Z',
                 '2026-08-05T00:00:00Z'
               )"""
        )

    backup_path, manifest_path = create_backup(
        database_path,
        backup_directory,
    )

    assert backup_path.is_file()
    assert manifest_path.is_file()
    assert calculate_sha256(backup_path)
    verify_database(backup_path)

    rollback_path = restore_database(
        backup_path,
        restored_path,
    )

    assert rollback_path is None
    verify_database(restored_path)

    with sqlite3.connect(restored_path) as connection:
        restored_user = connection.execute(
            """SELECT email
               FROM users
               WHERE user_id='backup-user'"""
        ).fetchone()

        assert restored_user == (
            "backup@example.com",
        )


def test_forced_restore_preserves_pre_restore_copy(
    tmp_path,
):
    source_path = tmp_path / "source.db"
    target_path = tmp_path / "target.db"
    backup_directory = tmp_path / "backups"

    initialize(
        db_path=source_path,
        items_path=ITEMS_PATH,
    )
    initialize(
        db_path=target_path,
        items_path=ITEMS_PATH,
    )

    backup_path, _ = create_backup(
        source_path,
        backup_directory,
    )

    rollback_path = restore_database(
        backup_path,
        target_path,
        force=True,
    )

    assert rollback_path is not None
    assert rollback_path.is_file()

    verify_database(
        rollback_path,
    )
    verify_database(
        target_path,
    )
