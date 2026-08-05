from pathlib import Path
import sys

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app import main
from app.database import connect, initialize
from app.routers import session as session_router_module
from legacy_fixture import create_legacy_database


ROOT = Path(__file__).resolve().parents[1] / "backend"
ITEMS_PATH = ROOT / "data" / "items.json"
SCHEMA_PATH = ROOT / "schema.sql"
RIASEC_DIMENSIONS = ("R", "I", "A", "S", "E", "C")


@pytest.fixture
def client_and_database(tmp_path, monkeypatch):
    database_path = tmp_path / "riasec-session-flow.db"
    create_legacy_database(database_path, SCHEMA_PATH, ITEMS_PATH)
    initialize(db_path=database_path, items_path=ITEMS_PATH)

    monkeypatch.setattr(
        session_router_module,
        "connect",
        lambda: connect(database_path),
    )
    monkeypatch.setattr(main, "initialize", lambda: None)

    with TestClient(main.app) as client:
        yield client, database_path


def start_riasec_session(client):
    response = client.post(
        "/api/sessions",
        json={
            "consent": True,
            "language": "en",
            "module": "riasec",
        },
    )
    assert response.status_code == 200, response.text
    session = response.json()
    assert session["module"] == "riasec"
    assert session["question_bank_version"] == "riasec-v0.1.0"
    return session


def answer_items(client, session_id, items, value=3):
    for item in items:
        response = client.put(
            f"/api/sessions/{session_id}/answers",
            json={
                "item_id": item["item_id"],
                "value": value,
                "response_time_ms": 250,
            },
        )
        assert response.status_code == 200, response.text


def test_riasec_session_returns_snapshot_and_saves_answers(
    client_and_database,
):
    client, database_path = client_and_database
    session = start_riasec_session(client)

    response = client.get(
        f"/api/sessions/{session['session_id']}/items"
    )
    assert response.status_code == 200
    items = response.json()
    assert len(items) == 36
    assert {item["dimension"] for item in items} == set(
        RIASEC_DIMENSIONS
    )
    assert {
        item["question_bank_version"] for item in items
    } == {"riasec-v0.1.0"}

    first_answer = client.put(
        f"/api/sessions/{session['session_id']}/answers",
        json={
            "item_id": items[0]["item_id"],
            "value": 5,
            "response_time_ms": 321,
        },
    )
    assert first_answer.status_code == 200
    assert first_answer.json() == {"saved": True}

    with connect(database_path) as connection:
        saved = connection.execute(
            """SELECT raw_value, response_time_ms
               FROM riasec_session_responses
               WHERE session_id=?""",
            (session["session_id"],),
        ).fetchone()
    assert dict(saved) == {
        "raw_value": 5,
        "response_time_ms": 321,
    }


def test_incomplete_riasec_session_cannot_complete(
    client_and_database,
):
    client, _database_path = client_and_database
    session = start_riasec_session(client)

    response = client.post(
        f"/api/sessions/{session['session_id']}/complete"
    )

    assert response.status_code == 400
    assert response.json()["detail"]["message"] == "Assessment incomplete"
    assert len(response.json()["detail"]["missing"]) == 36


def test_completed_riasec_result_is_persisted_and_stable(
    client_and_database,
):
    client, database_path = client_and_database
    session = start_riasec_session(client)
    items = client.get(
        f"/api/sessions/{session['session_id']}/items"
    ).json()
    answer_items(client, session["session_id"], items)

    completed = client.post(
        f"/api/sessions/{session['session_id']}/complete"
    )
    assert completed.status_code == 200, completed.text
    assert completed.json()["code"] == "RIA"

    first_result = client.get(
        f"/api/sessions/{session['session_id']}/result"
    )
    assert first_result.status_code == 200, first_result.text
    result = first_result.json()
    assert result == {
        "sessionId": session["session_id"],
        "module": "riasec",
        "status": "completed",
        "code": "RIA",
        "scores": {dimension: 18 for dimension in RIASEC_DIMENSIONS},
        "percentages": {
            dimension: 50 for dimension in RIASEC_DIMENSIONS
        },
        "ranking": list(RIASEC_DIMENSIONS),
        "answered": {dimension: 6 for dimension in RIASEC_DIMENSIONS},
        "questionBankVersion": "riasec-v0.1.0",
        "completedAt": result["completedAt"],
        "calculatedAt": result["calculatedAt"],
    }
    assert result["code"] == "".join(result["ranking"][:3])
    assert set(result["ranking"]) == set(RIASEC_DIMENSIONS)
    assert all(
        0 <= percentage <= 100
        for percentage in result["percentages"].values()
    )

    with connect(database_path) as connection:
        persisted_count = connection.execute(
            """SELECT COUNT(*) FROM riasec_results
               WHERE session_id=?""",
            (session["session_id"],),
        ).fetchone()[0]
    assert persisted_count == 1

    second_result = client.get(
        f"/api/sessions/{session['session_id']}/result"
    )
    assert second_result.status_code == 200
    assert second_result.json() == result


def test_completed_riasec_session_without_result_returns_error(
    client_and_database,
):
    client, database_path = client_and_database
    session = start_riasec_session(client)
    items = client.get(
        f"/api/sessions/{session['session_id']}/items"
    ).json()
    answer_items(client, session["session_id"], items)
    assert client.post(
        f"/api/sessions/{session['session_id']}/complete"
    ).status_code == 200

    with connect(database_path) as connection:
        connection.execute(
            "DELETE FROM riasec_results WHERE session_id=?",
            (session["session_id"],),
        )

    response = client.get(
        f"/api/sessions/{session['session_id']}/result"
    )
    assert response.status_code == 500
    assert response.json() == {
        "detail": "Completed session result is missing."
    }


def test_riasec_session_cannot_be_completed_twice(
    client_and_database,
):
    client, _database_path = client_and_database
    session = start_riasec_session(client)
    items = client.get(
        f"/api/sessions/{session['session_id']}/items"
    ).json()
    answer_items(client, session["session_id"], items)
    assert client.post(
        f"/api/sessions/{session['session_id']}/complete"
    ).status_code == 200

    repeated = client.post(
        f"/api/sessions/{session['session_id']}/complete"
    )
    assert repeated.status_code == 409
    assert repeated.json() == {
        "detail": "Session is not active."
    }


def test_result_lookup_rejects_session_module_mismatch(
    client_and_database,
):
    client, database_path = client_and_database
    session = start_riasec_session(client)
    items = client.get(
        f"/api/sessions/{session['session_id']}/items"
    ).json()
    answer_items(client, session["session_id"], items)
    assert client.post(
        f"/api/sessions/{session['session_id']}/complete"
    ).status_code == 200

    with connect(database_path) as connection:
        connection.execute(
            """UPDATE sessions SET module='personality'
               WHERE session_id=?""",
            (session["session_id"],),
        )

    response = client.get(
        f"/api/sessions/{session['session_id']}/result"
    )
    assert response.status_code == 500
    assert response.json() == {
        "detail": "Completed session result is missing."
    }
