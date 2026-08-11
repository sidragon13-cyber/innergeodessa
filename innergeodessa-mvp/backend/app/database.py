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
KIDS_K68_ITEMS_PATH = ROOT / "data" / "kids-k68-items.json"
KIDS_K912_ITEMS_PATH = ROOT / "data" / "kids-k912-items.json"

LEGACY_BANK_VERSION = "personality-legacy-v1"
CURRENT_BANK_VERSION = "personality-v2.0.0"
RIASEC_BANK_VERSION = "riasec-v0.1.0"
KIDS_K68_BANK_VERSION = "KIDS-K68-RF-V1"
KIDS_K912_BANK_VERSION = "KIDS-K912-RF-V1"
KIDS_SCORING_VERSION = "KIDS-SCORING-V1"


def connect(db_path: Path = DB_PATH) -> sqlite3.Connection:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn



def initialize(
    db_path: Path = DB_PATH,
    items_path: Path = ITEMS_PATH,
    riasec_items_path: Path = RIASEC_ITEMS_PATH,
    kids_k68_items_path: Path = KIDS_K68_ITEMS_PATH,
    kids_k912_items_path: Path = KIDS_K912_ITEMS_PATH,
) -> None:
    items = _load_current_items(items_path)
    riasec_items = _load_riasec_items(riasec_items_path)
    kids_k68_items = _load_kids_items(
        kids_k68_items_path,
        expected_form="k68",
        expected_bank_version=KIDS_K68_BANK_VERSION,
        expected_count=32,
    )
    kids_k912_items = _load_kids_items(
        kids_k912_items_path,
        expected_form="k912",
        expected_bank_version=KIDS_K912_BANK_VERSION,
        expected_count=40,
    )

    with connect(db_path) as conn:
        conn.execute("BEGIN IMMEDIATE")
        try:
            _apply_schema(conn)

            _apply_migration(
                conn,
                migration_id="20260725_001_account_columns",
                description=(
                    "Add account password and assessment ownership columns."
                ),
                operation=lambda: (
                    _ensure_user_password_hash_column(conn),
                    _ensure_session_claim_columns(conn),
                ),
            )

            _apply_migration(
                conn,
                migration_id="20260725_002_session_versioning",
                description=(
                    "Add assessment module and question-bank version columns."
                ),
                operation=lambda: (
                    _ensure_session_version_column(conn),
                    _ensure_session_module_column(conn),
                ),
            )

            _apply_migration(
                conn,
                migration_id="20260810_004_kids_persistence_foundation",
                description=(
                    "Add Kids assessment form persistence foundation."
                ),
                operation=lambda: (
                    _ensure_session_form_column(conn),
                ),
            )

            _register_question_banks(conn)

            _apply_migration(
                conn,
                migration_id="20260725_003_legacy_assessment_data",
                description=(
                    "Capture legacy question items, version legacy sessions, "
                    "create immutable question snapshots, and migrate responses."
                ),
                operation=lambda: (
                    _capture_legacy_items(conn),
                    _backfill_legacy_sessions(conn),
                    _create_missing_session_snapshots(conn),
                    _migrate_legacy_responses(conn),
                ),
            )

            _upsert_current_items(conn, items)
            _upsert_riasec_items(conn, riasec_items)
            _upsert_kids_items(conn, kids_k68_items)
            _upsert_kids_items(conn, kids_k912_items)
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


def _apply_migration(
    conn: sqlite3.Connection,
    *,
    migration_id: str,
    description: str,
    operation,
) -> None:
    existing = conn.execute(
        """SELECT migration_id
           FROM schema_migrations
           WHERE migration_id=?""",
        (migration_id,),
    ).fetchone()

    if existing is not None:
        return

    operation()

    conn.execute(
        """INSERT INTO schema_migrations(
             migration_id,
             description
           ) VALUES (?, ?)""",
        (
            migration_id,
            description,
        ),
    )


def _ensure_session_version_column(conn: sqlite3.Connection) -> None:
    columns = {
        row["name"]
        for row in conn.execute("PRAGMA table_info(sessions)").fetchall()
    }
    if "question_bank_version" not in columns:
        conn.execute(
            "ALTER TABLE sessions ADD COLUMN question_bank_version TEXT"
        )


def _ensure_user_password_hash_column(conn: sqlite3.Connection) -> None:
    columns = {
        row["name"]
        for row in conn.execute("PRAGMA table_info(users)").fetchall()
    }
    if "password_hash" not in columns:
        conn.execute("ALTER TABLE users ADD COLUMN password_hash TEXT")


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


def _ensure_session_form_column(conn: sqlite3.Connection) -> None:
    columns = {
        row["name"]
        for row in conn.execute(
            "PRAGMA table_info(sessions)"
        ).fetchall()
    }
    if "form" not in columns:
        conn.execute(
            "ALTER TABLE sessions ADD COLUMN form TEXT"
        )


def _ensure_session_claim_columns(conn: sqlite3.Connection) -> None:
    columns = {
        row["name"]
        for row in conn.execute("PRAGMA table_info(sessions)").fetchall()
    }
    if "owner_user_id" not in columns:
        conn.execute(
            """ALTER TABLE sessions
               ADD COLUMN owner_user_id TEXT
               REFERENCES users(user_id) ON DELETE SET NULL"""
        )
    if "claim_secret_hash" not in columns:
        conn.execute(
            "ALTER TABLE sessions ADD COLUMN claim_secret_hash TEXT"
        )
    if "claimed_at" not in columns:
        conn.execute("ALTER TABLE sessions ADD COLUMN claimed_at TEXT")


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
    conn.execute(
        """INSERT INTO question_banks(question_bank_version, status)
           VALUES (?, 'frozen')
           ON CONFLICT(question_bank_version) DO UPDATE SET
           status=excluded.status""",
        (KIDS_K68_BANK_VERSION,),
    )
    conn.execute(
        """INSERT INTO question_banks(question_bank_version, status)
           VALUES (?, 'frozen')
           ON CONFLICT(question_bank_version) DO UPDATE SET
           status=excluded.status""",
        (KIDS_K912_BANK_VERSION,),
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


def _load_kids_items(
    items_path: Path,
    *,
    expected_form: str,
    expected_bank_version: str,
    expected_count: int,
) -> list[dict]:
    parsed = json.loads(
        items_path.read_text(encoding="utf-8")
    )

    if not isinstance(parsed, list):
        raise ValueError("Kids items must be a list")

    if len(parsed) != expected_count:
        raise ValueError(
            f"{expected_form} Kids items must contain "
            f"exactly {expected_count} rows"
        )

    required_keys = {
        "question_bank_version",
        "form",
        "source_item_id",
        "domain",
        "wording_en",
        "wording_zh",
        "visual_support",
        "master_asset_path",
        "display_asset_path",
        "scoring_version",
        "status",
        "master_order",
    }

    allowed_domains = {
        "create",
        "discover",
        "build",
        "think",
        "connect",
        "lead",
        "move",
        "express",
    }

    allowed_visual_support = {
        "none",
        "required",
        "helpful",
    }

    source_ids: set[str] = set()
    orders: set[int] = set()
    domain_counts: dict[str, int] = {}

    for index, item in enumerate(parsed, start=1):
        if not isinstance(item, dict):
            raise ValueError(
                f"Kids item {index} must be an object"
            )

        if set(item.keys()) != required_keys:
            raise ValueError(
                f"Kids item {index} has an invalid schema"
            )

        if item["question_bank_version"] != expected_bank_version:
            raise ValueError(
                f"Kids item {index} has an unexpected bank version"
            )

        if item["form"] != expected_form:
            raise ValueError(
                f"Kids item {index} has an unexpected form"
            )

        if item["scoring_version"] != KIDS_SCORING_VERSION:
            raise ValueError(
                f"Kids item {index} has an unexpected scoring version"
            )

        if item["status"] != "frozen":
            raise ValueError(
                f"Kids item {index} must be frozen"
            )

        source_item_id = item["source_item_id"]

        if (
            not isinstance(source_item_id, str)
            or not source_item_id
            or source_item_id in source_ids
        ):
            raise ValueError(
                f"Kids item {index} has an invalid source ID"
            )

        source_ids.add(source_item_id)

        domain = item["domain"]

        if domain not in allowed_domains:
            raise ValueError(
                f"Kids item {index} has an invalid domain"
            )

        domain_counts[domain] = (
            domain_counts.get(domain, 0) + 1
        )

        master_order = item["master_order"]

        if (
            not isinstance(master_order, int)
            or isinstance(master_order, bool)
            or master_order < 1
            or master_order > expected_count
            or master_order in orders
        ):
            raise ValueError(
                f"Kids item {index} has an invalid master order"
            )

        orders.add(master_order)

        if (
            not isinstance(item["wording_en"], str)
            or not item["wording_en"].strip()
            or not isinstance(item["wording_zh"], str)
            or not item["wording_zh"].strip()
        ):
            raise ValueError(
                f"Kids item {index} has invalid wording"
            )

        visual_support = item["visual_support"]

        if visual_support not in allowed_visual_support:
            raise ValueError(
                f"Kids item {index} has invalid visual support"
            )

        master_path = item["master_asset_path"]
        display_path = item["display_asset_path"]

        if visual_support == "none":
            if (
                master_path is not None
                or display_path is not None
            ):
                raise ValueError(
                    f"Kids item {index} has unexpected visual paths"
                )
        else:
            if (
                not isinstance(master_path, str)
                or not master_path
                or not isinstance(display_path, str)
                or not display_path
            ):
                raise ValueError(
                    f"Kids item {index} is missing visual paths"
                )

    if orders != set(range(1, expected_count + 1)):
        raise ValueError(
            f"{expected_form} Kids item order is incomplete"
        )

    expected_per_domain = (
        4
        if expected_form == "k68"
        else 5
    )

    if (
        len(domain_counts) != 8
        or any(
            count != expected_per_domain
            for count in domain_counts.values()
        )
    ):
        raise ValueError(
            f"{expected_form} Kids domain distribution is invalid"
        )

    return parsed


def _upsert_kids_items(
    conn: sqlite3.Connection,
    items: list[dict],
) -> None:
    conn.executemany(
        """INSERT INTO kids_question_items(
             question_bank_version,
             form,
             source_item_id,
             domain,
             wording_en,
             wording_zh,
             visual_support,
             master_asset_path,
             display_asset_path,
             scoring_version,
             status,
             master_order
           )
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(
             question_bank_version,
             source_item_id
           ) DO UPDATE SET
             form=excluded.form,
             domain=excluded.domain,
             wording_en=excluded.wording_en,
             wording_zh=excluded.wording_zh,
             visual_support=excluded.visual_support,
             master_asset_path=excluded.master_asset_path,
             display_asset_path=excluded.display_asset_path,
             scoring_version=excluded.scoring_version,
             status=excluded.status,
             master_order=excluded.master_order""",
        [
            (
                item["question_bank_version"],
                item["form"],
                item["source_item_id"],
                item["domain"],
                item["wording_en"],
                item["wording_zh"],
                item["visual_support"],
                item["master_asset_path"],
                item["display_asset_path"],
                item["scoring_version"],
                item["status"],
                item["master_order"],
            )
            for item in items
        ],
    )


def _verify_migration(conn: sqlite3.Connection) -> None:
    required_tables = {
        "schema_migrations",
        "users",
        "auth_sessions",
        "email_verification_tokens",
        "password_reset_tokens",
        "zodiac_charts",
        "report_entitlements",
        "payments",
        "kids_question_items",
        "kids_session_question_items",
        "kids_session_responses",
    }
    tables = {
        row["name"]
        for row in conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        ).fetchall()
    }
    missing_tables = required_tables - tables
    if missing_tables:
        raise ValueError(
            "Database is missing required account tables: "
            + ", ".join(sorted(missing_tables))
        )

    required_indexes = {
        "idx_auth_sessions_user_id",
        "idx_auth_sessions_expires_at",
        "idx_auth_sessions_revoked_at",
        "idx_email_verification_tokens_user_created",
        "idx_password_reset_tokens_user_created",
        "idx_password_reset_tokens_expires_at",
        "idx_report_entitlements_user_id",
        "idx_report_entitlements_module_resource",
        "idx_report_entitlements_status",
        "idx_payments_user_id",
        "idx_payments_resource",
        "idx_payments_status",
        "idx_payments_provider_transaction",
    }
    indexes = {
        row["name"]
        for row in conn.execute(
            "SELECT name FROM sqlite_master WHERE type='index'"
        ).fetchall()
    }
    missing_indexes = required_indexes - indexes
    if missing_indexes:
        raise ValueError(
            "Database is missing required account indexes: "
            + ", ".join(sorted(missing_indexes))
        )

    session_columns = {
        row["name"]
        for row in conn.execute("PRAGMA table_info(sessions)").fetchall()
    }
    missing_session_columns = {
        "owner_user_id",
        "claim_secret_hash",
        "claimed_at",
        "form",
    } - session_columns
    if missing_session_columns:
        raise ValueError(
            "Sessions is missing required claim columns: "
            + ", ".join(sorted(missing_session_columns))
        )

    user_columns = {
        row["name"]
        for row in conn.execute("PRAGMA table_info(users)").fetchall()
    }
    if "password_hash" not in user_columns:
        raise ValueError("Users is missing the password hash column")

    unversioned_sessions = conn.execute(
        """SELECT COUNT(*) FROM sessions
           WHERE question_bank_version IS NULL
              OR trim(question_bank_version)=''"""
    ).fetchone()[0]
    if unversioned_sessions:
        raise ValueError("Every session must have a question bank version")

    invalid_session_contracts = conn.execute(
        """SELECT COUNT(*) FROM sessions
           WHERE module IS NULL
              OR module NOT IN ('personality', 'riasec', 'kids')
              OR (
                   module='kids'
                   AND (
                     form IS NULL
                     OR form NOT IN ('k68', 'k912')
                   )
                 )
              OR (
                   module IN ('personality', 'riasec')
                   AND form IS NOT NULL
                 )"""
    ).fetchone()[0]
    if invalid_session_contracts:
        raise ValueError(
            "Every session must have a supported module/form contract"
        )

    invalid_kids_session_banks = conn.execute(
        """SELECT COUNT(*) FROM sessions
           WHERE module='kids'
             AND (
               (form='k68' AND question_bank_version<>?)
               OR
               (form='k912' AND question_bank_version<>?)
             )""",
        (
            KIDS_K68_BANK_VERSION,
            KIDS_K912_BANK_VERSION,
        ),
    ).fetchone()[0]
    if invalid_kids_session_banks:
        raise ValueError(
            "Kids sessions must use the question bank for their form"
        )

    kids_k68_count = conn.execute(
        """SELECT COUNT(*)
           FROM kids_question_items
           WHERE question_bank_version=?
             AND form='k68'""",
        (KIDS_K68_BANK_VERSION,),
    ).fetchone()[0]

    if kids_k68_count != 32:
        raise ValueError(
            "K68 question bank must contain exactly 32 items"
        )

    kids_k912_count = conn.execute(
        """SELECT COUNT(*)
           FROM kids_question_items
           WHERE question_bank_version=?
             AND form='k912'""",
        (KIDS_K912_BANK_VERSION,),
    ).fetchone()[0]

    if kids_k912_count != 40:
        raise ValueError(
            "K912 question bank must contain exactly 40 items"
        )

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
