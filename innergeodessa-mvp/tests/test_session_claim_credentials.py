from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from backend.app import main
from backend.app.auth import hash_token
from backend.app.database import connect, initialize
from backend.app.routers import session as session_router


ROOT = Path(__file__).resolve().parents[1]
ITEMS_PATH = ROOT / "backend" / "data" / "items.json"
RIASEC_ITEMS_PATH = ROOT / "backend" / "data" / "riasec-items.json"


@pytest.fixture()
def client_and_database(tmp_path, monkeypatch):
    database_path = tmp_path / "claim-credentials.db"

    initialize(
        db_path=database_path,
        items_path=ITEMS_PATH,
        riasec_items_path=RIASEC_ITEMS_PATH,
    )

    monkeypatch.setattr(
        session_router,
        "connect",
        lambda: connect(database_path),
    )
    monkeypatch.setattr(main, "initialize", lambda: None)

    with TestClient(main.app) as client:
        yield client, database_path


@pytest.mark.parametrize(
    ("module", "expected_module"),
    [
        ("personality", "personality"),
        ("riasec", "riasec"),
    ],
)
def test_session_creation_issues_hashed_claim_credential(
    client_and_database,
    module,
    expected_module,
):
    client, database_path = client_and_database

    response = client.post(
        "/api/sessions",
        json={
            "consent": True,
            "language": "en",
            "module": module,
        },
    )

    assert response.status_code == 200

    payload = response.json()
    session_id = payload["session_id"]
    claim_secret = payload["claim_secret"]

    assert payload["module"] == expected_module
    assert isinstance(claim_secret, str)
    assert len(claim_secret) >= 32

    with connect(database_path) as conn:
        row = conn.execute(
            """SELECT claim_secret_hash
               FROM sessions
               WHERE session_id=?""",
            (session_id,),
        ).fetchone()

    assert row is not None
    assert row["claim_secret_hash"] == hash_token(claim_secret)
    assert row["claim_secret_hash"] != claim_secret


def test_claim_secret_is_not_exposed_by_session_items(
    client_and_database,
):
    client, _database_path = client_and_database

    created = client.post(
        "/api/sessions",
        json={
            "consent": True,
            "language": "en",
            "module": "personality",
        },
    )

    assert created.status_code == 200
    session_id = created.json()["session_id"]

    items = client.get(
        f"/api/sessions/{session_id}/items",
    )

    assert items.status_code == 200
    assert "claim_secret" not in items.text
    assert "claim_secret_hash" not in items.text
