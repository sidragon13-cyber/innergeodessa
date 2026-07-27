import json
from pathlib import Path
import sqlite3


ACTIVE_SESSION_ID = "legacy-active-session"
COMPLETED_SESSION_ID = "legacy-completed-session"
LEGACY_ITEM_COUNT = 72
OVERLAPPING_SOURCE_ID_COUNT = 2

DIMENSIONS = (
    ("EI", "E", "I"),
    ("SN", "S", "N"),
    ("TF", "T", "F"),
    ("JP", "J", "P"),
)


def create_legacy_database(
    database_path: Path,
    schema_path: Path,
    items_path: Path,
) -> None:
    legacy_schema = schema_path.read_text(encoding="utf-8").split(
        "CREATE TABLE IF NOT EXISTS question_banks",
        maxsplit=1,
    )[0]
    current_items = json.loads(
        items_path.read_text(encoding="utf-8")
    )
    overlapping_ids = [
        item["item_id"]
        for item in current_items[:OVERLAPPING_SOURCE_ID_COUNT]
    ]

    with sqlite3.connect(database_path) as connection:
        connection.executescript(legacy_schema)
        connection.executemany(
            """INSERT INTO items(
                 item_id, dimension, subdimension, keyed_pole,
                 form, wording, language, version, status,
                 master_order
               )
               VALUES (?, ?, 'FIXTURE', ?, 'Agreement', ?,
                       'en', 'legacy-v1', 'pilot', ?)""",
            _legacy_items(overlapping_ids),
        )
        connection.executemany(
            """INSERT INTO sessions(
                 session_id, consent, language, started_at,
                 completed_at, status
               )
               VALUES (?, 1, 'en', ?, ?, ?)""",
            (
                (
                    ACTIVE_SESSION_ID,
                    "2026-01-01T00:00:00+00:00",
                    None,
                    "active",
                ),
                (
                    COMPLETED_SESSION_ID,
                    "2026-01-02T00:00:00+00:00",
                    "2026-01-02T01:00:00+00:00",
                    "completed",
                ),
            ),
        )
        connection.executemany(
            """INSERT INTO responses(
                 session_id, item_id, raw_value,
                 response_time_ms, answered_at
               )
               VALUES (?, ?, ?, ?, ?)""",
            (
                (
                    ACTIVE_SESSION_ID,
                    overlapping_ids[0],
                    3,
                    1200,
                    "2026-01-01T00:01:00+00:00",
                ),
                (
                    COMPLETED_SESSION_ID,
                    overlapping_ids[1],
                    4,
                    900,
                    "2026-01-02T00:01:00+00:00",
                ),
            ),
        )
        connection.execute(
            """INSERT INTO results(
                 session_id, personality_type,
                 ei_score, sn_score, tf_score, jp_score,
                 ei_confidence, sn_confidence,
                 tf_confidence, jp_confidence,
                 calculated_at
               )
               VALUES (?, 'INTJ', -4, -6, 8, 2,
                       0.2, 0.3, 0.4, 0.1, ?)""",
            (
                COMPLETED_SESSION_ID,
                "2026-01-02T01:00:00+00:00",
            ),
        )


def _legacy_items(
    overlapping_ids: list[str],
) -> list[tuple[str, str, str, str, int]]:
    items: list[tuple[str, str, str, str, int]] = []

    for master_order in range(1, LEGACY_ITEM_COUNT + 1):
        dimension_index = (master_order - 1) % len(DIMENSIONS)
        item_number = (master_order - 1) // len(DIMENSIONS) + 1
        dimension, first_pole, second_pole = DIMENSIONS[
            dimension_index
        ]
        keyed_pole = (
            first_pole if item_number % 2 else second_pole
        )
        item_id = (
            overlapping_ids[master_order - 1]
            if master_order <= len(overlapping_ids)
            else f"LEGACY-{dimension}-{item_number:03d}"
        )
        items.append(
            (
                item_id,
                dimension,
                keyed_pole,
                f"Legacy fixture item {master_order}.",
                master_order,
            )
        )

    return items
