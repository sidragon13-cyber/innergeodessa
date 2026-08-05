from datetime import timedelta
from pathlib import Path
import uuid

import pytest
from fastapi.testclient import TestClient

from backend.app import main
from backend.app.auth import generate_token, hash_token, utc_now
from backend.app.database import connect, initialize
from backend.app.routers import account as account_router
from backend.app.routers import session as session_router


ROOT = Path(__file__).resolve().parents[1]
ITEMS_PATH = ROOT / "backend" / "data" / "items.json"
RIASEC_ITEMS_PATH = ROOT / "backend" / "data" / "riasec-items.json"


@pytest.fixture()
def client_and_database(tmp_path, monkeypatch):
    database_path = tmp_path / "account-claim.db"

    initialize(
        db_path=database_path,
        items_path=ITEMS_PATH,
        riasec_items_path=RIASEC_ITEMS_PATH,
    )

    connection_factory = lambda: connect(database_path)

    monkeypatch.setattr(
        session_router,
        "connect",
        connection_factory,
    )
    monkeypatch.setattr(
        account_router,
        "connect",
        connection_factory,
    )

    import backend.app.auth_context as auth_context

    monkeypatch.setattr(
        auth_context,
        "connect",
        connection_factory,
    )
    monkeypatch.setattr(main, "initialize", lambda: None)

    with TestClient(main.app) as client:
        yield client, database_path


def create_user_session(
    database_path,
    *,
    verified=True,
):
    user_id = str(uuid.uuid4())
    auth_session_id = str(uuid.uuid4())
    session_token = generate_token()
    now = utc_now()
    verified_at = now.isoformat() if verified else None

    with connect(database_path) as conn:
        conn.execute(
            """INSERT INTO users(
                 user_id,
                 email,
                 email_normalized,
                 nickname,
                 password_hash,
                 email_verified_at,
                 status,
                 created_at,
                 updated_at
               ) VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?)""",
            (
                user_id,
                f"{user_id}@example.com",
                f"{user_id}@example.com",
                "AnonymousUser",
                "test-password-hash",
                verified_at,
                now.isoformat(),
                now.isoformat(),
            ),
        )
        conn.execute(
            """INSERT INTO auth_sessions(
                 auth_session_id,
                 user_id,
                 token_hash,
                 created_at,
                 expires_at
               ) VALUES (?, ?, ?, ?, ?)""",
            (
                auth_session_id,
                user_id,
                hash_token(session_token),
                now.isoformat(),
                (now + timedelta(days=1)).isoformat(),
            ),
        )

    return user_id, session_token


def create_completed_assessment(client, database_path):
    created = client.post(
        "/api/sessions",
        json={
            "consent": True,
            "language": "en",
            "module": "personality",
        },
    )

    assert created.status_code == 200

    payload = created.json()
    completed_at = utc_now().isoformat()

    with connect(database_path) as conn:
        conn.execute(
            """UPDATE sessions
               SET status='completed',
                   completed_at=?
               WHERE session_id=?""",
            (
                completed_at,
                payload["session_id"],
            ),
        )

    return payload


def test_claim_requires_authentication(client_and_database):
    client, database_path = client_and_database
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert response.status_code == 401


def test_claim_requires_verified_email(client_and_database):
    client, database_path = client_and_database
    _user_id, token = create_user_session(
        database_path,
        verified=False,
    )
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", token)

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert response.status_code == 403


def test_verified_user_can_claim_completed_session(
    client_and_database,
):
    client, database_path = client_and_database
    user_id, token = create_user_session(database_path)
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", token)

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert response.status_code == 200
    assert response.json()["resourceId"] == assessment["session_id"]
    assert response.json()["module"] == "personality"
    assert response.json()["status"] == "saved"

    with connect(database_path) as conn:
        row = conn.execute(
            """SELECT owner_user_id,
                      claim_secret_hash,
                      claimed_at
               FROM sessions
               WHERE session_id=?""",
            (assessment["session_id"],),
        ).fetchone()

    assert row["owner_user_id"] == user_id
    assert row["claim_secret_hash"] is None
    assert row["claimed_at"] is not None


def test_wrong_claim_secret_is_rejected(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(database_path)
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", token)

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": generate_token(),
        },
    )

    assert response.status_code == 403


def test_same_user_claim_is_idempotent(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(database_path)
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", token)

    first = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )
    second = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert first.status_code == 200
    assert second.status_code == 200
    assert second.json()["resourceId"] == assessment["session_id"]


def test_other_user_cannot_claim_owned_session(
    client_and_database,
):
    client, database_path = client_and_database
    _first_user, first_token = create_user_session(database_path)
    _second_user, second_token = create_user_session(database_path)
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", first_token)
    first = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )
    assert first.status_code == 200

    client.cookies.set("innergeo_session", second_token)
    second = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert second.status_code == 409


def test_active_session_cannot_be_claimed(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(database_path)

    created = client.post(
        "/api/sessions",
        json={
            "consent": True,
            "language": "en",
            "module": "personality",
        },
    )

    client.cookies.set("innergeo_session", token)

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": created.json()["session_id"],
            "claimSecret": created.json()["claim_secret"],
        },
    )

    assert response.status_code == 409
PYcat > innergeodessa-mvp/tests/test_account_claim_session.py <<'PY'
from datetime import timedelta
from pathlib import Path
import uuid

import pytest
from fastapi.testclient import TestClient

from backend.app import main
from backend.app.auth import generate_token, hash_token, utc_now
from backend.app.database import connect, initialize
from backend.app.routers import account as account_router
from backend.app.routers import session as session_router


ROOT = Path(__file__).resolve().parents[1]
ITEMS_PATH = ROOT / "backend" / "data" / "items.json"
RIASEC_ITEMS_PATH = ROOT / "backend" / "data" / "riasec-items.json"


@pytest.fixture()
def client_and_database(tmp_path, monkeypatch):
    database_path = tmp_path / "account-claim.db"

    initialize(
        db_path=database_path,
        items_path=ITEMS_PATH,
        riasec_items_path=RIASEC_ITEMS_PATH,
    )

    connection_factory = lambda: connect(database_path)

    monkeypatch.setattr(
        session_router,
        "connect",
        connection_factory,
    )
    monkeypatch.setattr(
        account_router,
        "connect",
        connection_factory,
    )

    import backend.app.auth_context as auth_context

    monkeypatch.setattr(
        auth_context,
        "connect",
        connection_factory,
    )
    monkeypatch.setattr(main, "initialize", lambda: None)

    with TestClient(main.app) as client:
        yield client, database_path


def create_user_session(
    database_path,
    *,
    verified=True,
):
    user_id = str(uuid.uuid4())
    auth_session_id = str(uuid.uuid4())
    session_token = generate_token()
    now = utc_now()
    verified_at = now.isoformat() if verified else None

    with connect(database_path) as conn:
        conn.execute(
            """INSERT INTO users(
                 user_id,
                 email,
                 email_normalized,
                 nickname,
                 password_hash,
                 email_verified_at,
                 status,
                 created_at,
                 updated_at
               ) VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?)""",
            (
                user_id,
                f"{user_id}@example.com",
                f"{user_id}@example.com",
                "AnonymousUser",
                "test-password-hash",
                verified_at,
                now.isoformat(),
                now.isoformat(),
            ),
        )
        conn.execute(
            """INSERT INTO auth_sessions(
                 auth_session_id,
                 user_id,
                 token_hash,
                 created_at,
                 expires_at
               ) VALUES (?, ?, ?, ?, ?)""",
            (
                auth_session_id,
                user_id,
                hash_token(session_token),
                now.isoformat(),
                (now + timedelta(days=1)).isoformat(),
            ),
        )

    return user_id, session_token


def create_completed_assessment(client, database_path):
    created = client.post(
        "/api/sessions",
        json={
            "consent": True,
            "language": "en",
            "module": "personality",
        },
    )

    assert created.status_code == 200

    payload = created.json()
    completed_at = utc_now().isoformat()

    with connect(database_path) as conn:
        conn.execute(
            """UPDATE sessions
               SET status='completed',
                   completed_at=?
               WHERE session_id=?""",
            (
                completed_at,
                payload["session_id"],
            ),
        )

    return payload


def test_claim_requires_authentication(client_and_database):
    client, database_path = client_and_database
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert response.status_code == 401


def test_claim_requires_verified_email(client_and_database):
    client, database_path = client_and_database
    _user_id, token = create_user_session(
        database_path,
        verified=False,
    )
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", token)

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert response.status_code == 403


def test_verified_user_can_claim_completed_session(
    client_and_database,
):
    client, database_path = client_and_database
    user_id, token = create_user_session(database_path)
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", token)

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert response.status_code == 200
    assert response.json()["resourceId"] == assessment["session_id"]
    assert response.json()["module"] == "personality"
    assert response.json()["status"] == "saved"

    with connect(database_path) as conn:
        row = conn.execute(
            """SELECT owner_user_id,
                      claim_secret_hash,
                      claimed_at
               FROM sessions
               WHERE session_id=?""",
            (assessment["session_id"],),
        ).fetchone()

    assert row["owner_user_id"] == user_id
    assert row["claim_secret_hash"] is None
    assert row["claimed_at"] is not None


def test_wrong_claim_secret_is_rejected(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(database_path)
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", token)

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": generate_token(),
        },
    )

    assert response.status_code == 403


def test_same_user_claim_is_idempotent(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(database_path)
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", token)

    first = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )
    second = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert first.status_code == 200
    assert second.status_code == 200
    assert second.json()["resourceId"] == assessment["session_id"]


def test_other_user_cannot_claim_owned_session(
    client_and_database,
):
    client, database_path = client_and_database
    _first_user, first_token = create_user_session(database_path)
    _second_user, second_token = create_user_session(database_path)
    assessment = create_completed_assessment(
        client,
        database_path,
    )

    client.cookies.set("innergeo_session", first_token)
    first = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )
    assert first.status_code == 200

    client.cookies.set("innergeo_session", second_token)
    second = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": assessment["session_id"],
            "claimSecret": assessment["claim_secret"],
        },
    )

    assert second.status_code == 409


def test_active_session_cannot_be_claimed(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(database_path)

    created = client.post(
        "/api/sessions",
        json={
            "consent": True,
            "language": "en",
            "module": "personality",
        },
    )

    client.cookies.set("innergeo_session", token)

    response = client.post(
        "/api/account/claim-session",
        json={
            "sessionId": created.json()["session_id"],
            "claimSecret": created.json()["claim_secret"],
        },
    )

    assert response.status_code == 409
