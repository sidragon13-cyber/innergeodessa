from __future__ import annotations

import argparse
import os
import shutil
import sqlite3
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from scripts.database_backup import verify_database


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DATABASE_PATH = (
    PROJECT_ROOT / "backend" / "innergeodessa.db"
)


def restore_database(
    backup_path: Path,
    database_path: Path,
    *,
    force: bool = False,
) -> Path | None:
    backup_path = backup_path.resolve()
    database_path = database_path.resolve()

    if not backup_path.is_file():
        raise FileNotFoundError(
            f"Backup does not exist: {backup_path}"
        )

    verify_database(backup_path)

    if database_path.exists() and not force:
        raise FileExistsError(
            "Target database already exists. "
            "Use --force to replace it."
        )

    database_path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    rollback_path: Path | None = None

    if database_path.exists():
        timestamp = datetime.now(
            timezone.utc,
        ).strftime("%Y%m%dT%H%M%SZ")

        rollback_path = database_path.with_name(
            f"{database_path.stem}-pre-restore-"
            f"{timestamp}{database_path.suffix}"
        )

        shutil.copy2(
            database_path,
            rollback_path,
        )

        verify_database(rollback_path)

    temporary_file = tempfile.NamedTemporaryFile(
        prefix="innergeo-restore-",
        suffix=".db",
        dir=database_path.parent,
        delete=False,
    )

    temporary_path = Path(temporary_file.name)
    temporary_file.close()

    try:
        with sqlite3.connect(backup_path) as source:
            with sqlite3.connect(temporary_path) as destination:
                source.backup(destination)

        verify_database(temporary_path)

        os.replace(
            temporary_path,
            database_path,
        )

        verify_database(database_path)
    except Exception:
        temporary_path.unlink(
            missing_ok=True,
        )
        raise

    return rollback_path


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Safely restore an InnerGeo SQLite database backup."
        ),
    )

    parser.add_argument(
        "backup",
        type=Path,
    )

    parser.add_argument(
        "--database",
        type=Path,
        default=DEFAULT_DATABASE_PATH,
    )

    parser.add_argument(
        "--force",
        action="store_true",
    )

    arguments = parser.parse_args()

    rollback_path = restore_database(
        arguments.backup,
        arguments.database,
        force=arguments.force,
    )

    print(f"Database restored: {arguments.database.resolve()}")

    if rollback_path is not None:
        print(f"Pre-restore rollback copy: {rollback_path}")


if __name__ == "__main__":
    main()
