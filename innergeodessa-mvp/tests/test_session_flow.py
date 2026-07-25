from pathlib import Path
import shutil
import sys

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app import main
from app.database import connect, initialize


ROOT = Path(__file__).resolve().parents[1] / "backend"
SOURCE_DB = ROOT / "innergeodessa.db"
ITEMS_PATH = ROOT / "data" / "items.json"


@pytest.fixture
def client_and_database(tmp_path, monkeypatch):
    database_path = tmp_path / "session-flow.db"
    shutil.copy2(SOURCE_DB, database_path)
    initialize(db_path=database_path, items_path=ITEMS_PATH)

    monkeypatch.setattr(main, "connect", lambda: connect(database_path))
    monkeypatch.setattr(main, "initialize", lambda: None)

    with TestClient(main.app) as client:
        yield client, database_path


def get_active_legacy_session(database_path):
    with connect(database_path) as connection:
        return connection.execute(
            "SELECT session_id FROM sessions "
            "WHERE status='active' "
            "AND question_bank_version='personality-legacy-v1' "
            "ORDER BY started_at LIMIT 1"
        ).fetchone()["session_id"]


def answer_all(client, session_id, items, value=3):
    for item in items:
        response = client.put(
            f"/api/sessions/{session_id}/answers",
            json={"item_id": item["item_id"], "value": value},
        )
        assert response.status_code == 200, response.text


def test_legacy_active_session_uses_legacy_snapshot_and_can_complete(
    client_and_database,
):
    client, database_path = client_and_database
    session_id = get_active_legacy_session(database_path)

    items_response = client.get(f"/api/sessions/{session_id}/items")
    assert items_response.status_code == 200
    items = items_response.json()
    assert len(items) == 72
    assert {
        item["question_bank_version"] for item in items
    } == {"personality-legacy-v1"}

    with connect(database_path) as connection:
        current_only_item = connection.execute(
            """SELECT current.source_item_id
               FROM question_bank_items current
               LEFT JOIN question_bank_items legacy
                 ON legacy.question_bank_version='personality-legacy-v1'
                AND legacy.source_item_id=current.source_item_id
               WHERE current.question_bank_version='personality-v1.0.0'
                 AND legacy.item_record_id IS NULL
               ORDER BY current.master_order LIMIT 1"""
        ).fetchone()["source_item_id"]

    rejected = client.put(
        f"/api/sessions/{session_id}/answers",
        json={"item_id": current_only_item, "value": 3},
    )
    assert rejected.status_code == 404

    answer_all(client, session_id, items)
    result = client.post(f"/api/sessions/{session_id}/complete")
    assert result.status_code == 200
    assert result.json()["type"] == "ESTJ"


def test_new_session_uses_current_snapshot_and_can_complete(
    client_and_database,
):
    client, database_path = client_and_database

    session_response = client.post(
        "/api/sessions",
        json={"consent": True, "language": "en"},
    )
    assert session_response.status_code == 200
    session = session_response.json()
    assert session["question_bank_version"] == "personality-v1.0.0"

    items_response = client.get(
        f"/api/sessions/{session['session_id']}/items"
    )
    assert items_response.status_code == 200
    items = items_response.json()
    assert len(items) == 72
    assert {
        item["question_bank_version"] for item in items
    } == {"personality-v1.0.0"}

    answer_all(client, session["session_id"], items)
    result = client.post(
        f"/api/sessions/{session['session_id']}/complete"
    )
    assert result.status_code == 200
    assert result.json() == {
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
        assert connection.execute(
            "SELECT COUNT(*) FROM session_question_items WHERE session_id=?",
            (session["session_id"],),
        ).fetchone()[0] == 72


@pytest.mark.parametrize("value", ["3", 3.0, True, False, 0, 6])
def test_answer_api_rejects_non_strict_or_out_of_range_values(
    client_and_database,
    value,
):
    client, _database_path = client_and_database
    session = client.post(
        "/api/sessions",
        json={"consent": True, "language": "en"},
    ).json()
    item = client.get(
        f"/api/sessions/{session['session_id']}/items"
    ).json()[0]

    response = client.put(
        f"/api/sessions/{session['session_id']}/answers",
        json={"item_id": item["item_id"], "value": value},
    )

    assert response.status_code == 422
