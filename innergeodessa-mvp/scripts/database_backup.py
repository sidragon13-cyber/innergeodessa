from __future__ import annotations

import argparse
import hashlib
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DATABASE_PATH = (
    PROJECT_ROOT / "backend" / "innergeodessa.db"
)
DEFAULT_BACKUP_DIRECTORY = (
    PROJECT_ROOT / "backups" / "database"
)


def calculate_sha256(path: Path) -> str:
    digest = hashlib.sha256()

    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)

    return digest.hexdigest()


def verify_database(path: Path) -> None:
    with sqlite3.connect(path) as connection:
        integrity = connection.execute(
            "PRAGMA integrity_check"
        ).fetchone()[0]

        if integrity != "ok":
            raise RuntimeError(
                f"Database integrity check failed: {integrity}"
            )

        foreign_key_violations = connection.execute(
            "PRAGMA foreign_key_check"
        ).fetchall()

        if foreign_key_violations:
            raise RuntimeError(
                "Database contains foreign-key violations."
            )


def create_backup(
    database_path: Path,
    backup_directory: Path,
) -> tuple[Path, Path]:
    database_path = database_path.resolve()
    backup_directory = backup_directory.resolve()

    if not database_path.is_file():
        raise FileNotFoundError(
            f"Database does not exist: {database_path}"
        )

    verify_database(database_path)

    backup_directory.mkdir(
        parents=True,
        exist_ok=True,
    )

    timestamp = datetime.now(
        timezone.utc,
    ).strftime("%Y%m%dT%H%M%SZ")

    backup_path = (
        backup_directory
        / f"{database_path.stem}-{timestamp}.db"
    )

    counter = 1
    while backup_path.exists():
        backup_path = (
            backup_directory
            / f"{database_path.stem}-{timestamp}-{counter}.db"
        )
        counter += 1

    with sqlite3.connect(database_path) as source:
        with sqlite3.connect(backup_path) as destination:
            source.backup(destination)

    verify_database(backup_path)

    manifest_path = backup_path.with_suffix(
        backup_path.suffix + ".json"
    )

    manifest = {
        "schema_version": "1",
        "created_at": datetime.now(
            timezone.utc,
        ).isoformat(),
        "source_database": str(database_path),
        "backup_database": str(backup_path),
        "size_bytes": backup_path.stat().st_size,
        "sha256": calculate_sha256(backup_path),
        "integrity_check": "ok",
        "foreign_key_violations": 0,
    }

    manifest_path.write_text(
        json.dumps(
            manifest,
            indent=2,
            sort_keys=True,
        )
        + "\n",
        encoding="utf-8",
    )

    return backup_path, manifest_path


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Create a transactionally consistent InnerGeo SQLite backup."
        ),
    )

    parser.add_argument(
        "--database",
        type=Path,
        default=DEFAULT_DATABASE_PATH,
    )

    parser.add_argument(
        "--destination",
        type=Path,
        default=DEFAULT_BACKUP_DIRECTORY,
    )

    arguments = parser.parse_args()

    backup_path, manifest_path = create_backup(
        arguments.database,
        arguments.destination,
    )

    print(f"Backup created: {backup_path}")
    print(f"Manifest created: {manifest_path}")


if __name__ == "__main__":
    main()
