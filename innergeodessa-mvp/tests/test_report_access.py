from __future__ import annotations

import importlib
import sqlite3
import sys
import uuid
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from legacy_fixture import create_legacy_database


TEST_ROOT = Path(__file__).resolve().parents[1]
BACKEND_ROOT = TEST_ROOT / "backend"
SCHEMA_PATH = BACKEND_ROOT / "schema.sql"
ITEMS_PATH = BACKEND_ROOT / "data" / "items.json"

sys.path.insert(0, str(BACKEND_ROOT))


def connect_database(
    database_path: Path,
) -> sqlite3.Connection:
    connection = sqlite3.connect(
        database_path,
    )
    connection.row_factory = sqlite3.Row
    connection.execute(
        "PRAGMA foreign_keys=ON"
    )
    return connection


@pytest.fixture
def client_and_database(
    tmp_path,
    monkeypatch,
):
    database_path = (
        tmp_path / "report-access.db"
    )

    create_legacy_database(
        database_path,
        SCHEMA_PATH,
        ITEMS_PATH,
    )

    database_module = importlib.import_module(
        "app.database"
    )

    database_module.initialize(database_path)
    auth_router = importlib.import_module(
        "app.routers.auth"
    )
    account_router = importlib.import_module(
        "app.routers.account"
    )
    auth_context = importlib.import_module(
        "app.auth_context"
    )

    connection_factory = lambda: connect_database(
        database_path
    )

    monkeypatch.setattr(
        database_module,
        "connect",
        connection_factory,
    )
    monkeypatch.setattr(
        auth_router,
        "connect",
        connection_factory,
    )
    monkeypatch.setattr(
        account_router,
        "connect",
        connection_factory,
    )
    monkeypatch.setattr(
        auth_context,
        "connect",
        connection_factory,
    )

    # Report-access integration tests need the one-time email
    # verification token. Production and normal development
    # responses continue to hide it.
    monkeypatch.setenv("INNERGEO_ENV", "test")
    monkeypatch.setenv("INNERGEO_AUTH_TEST_MODE", "true")
    monkeypatch.setenv("INNERGEO_COOKIE_SECURE", "false")

    main_module = importlib.import_module(
        "app.main"
    )

    return (
        TestClient(main_module.app),
        database_path,
    )



def create_verified_user(
    client: TestClient,
) -> str:
    unique = uuid.uuid4().hex
    email = f"report-{unique}@example.com"
    password = "InnerGeo-Test-Password-2026!"
    nickname = f"Explorer-{unique[:8]}"

    register_response = client.post(
        "/api/auth/register",
        json={
            "email": email,
            "nickname": nickname,
            "password": password,
        },
    )

    assert register_response.status_code == 201

    register_payload = register_response.json()
    verification_token = register_payload.get(
        "verificationToken"
    )

    assert verification_token

    verify_response = client.post(
        "/api/auth/verify-email",
        json={
            "token": verification_token,
        },
    )

    assert verify_response.status_code == 200

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": email,
            "password": password,
        },
    )

    assert login_response.status_code == 200

    user = login_response.json()["user"]

    assert user["emailVerified"] is True

    return user["userId"]


def seed_personality_resource(
    database_path: Path,
    user_id: str,
) -> str:
    session_id = str(uuid.uuid4())
    now = "2026-08-05T10:00:00+00:00"

    with connect_database(
        database_path
    ) as conn:
        conn.execute(
            """INSERT INTO sessions(
                 session_id,
                 consent,
                 language,
                 started_at,
                 completed_at,
                 status,
                 question_bank_version,
                 module,
                 owner_user_id,
                 claimed_at
               ) VALUES (
                 ?, 1, 'en', ?, ?, 'completed',
                 'personality-v1.0.0',
                 'personality', ?, ?
               )""",
            (
                session_id,
                now,
                now,
                user_id,
                now,
            ),
        )

    return session_id


def test_report_access_requires_authentication(
    client_and_database,
):
    client, _database_path = (
        client_and_database
    )

    response = client.get(
        "/api/account/report-access/"
        f"personality/{uuid.uuid4()}",
    )

    assert response.status_code == 401


def test_verified_owner_without_entitlement_is_locked(
    client_and_database,
):
    client, database_path = (
        client_and_database
    )
    user_id = create_verified_user(client)
    resource_id = seed_personality_resource(
        database_path,
        user_id,
    )


    response = client.get(
        "/api/account/report-access/"
        f"personality/{resource_id}",
    )

    assert response.status_code == 200
    assert response.json() == {
        "module": "personality",
        "resourceId": resource_id,
        "authenticated": True,
        "emailVerified": True,
        "ownsResource": True,
        "entitlementStatus": None,
        "canViewFullReport": False,
        "canPrint": False,
        "canDownloadPdf": False,
    }

def test_unlocked_entitlement_allows_report(
    client_and_database,
):
    client, database_path = (
        client_and_database
    )
    user_id = create_verified_user(client)
    resource_id = seed_personality_resource(
        database_path,
        user_id,
    )
    now = "2026-08-05T10:00:00+00:00"

    with connect_database(
        database_path
    ) as conn:
        conn.execute(
            """INSERT INTO report_entitlements(
                 entitlement_id,
                 user_id,
                 module,
                 resource_id,
                 status,
                 created_at,
                 updated_at,
                 unlocked_at
               ) VALUES (
                 ?, ?, 'personality', ?,
                 'unlocked', ?, ?, ?
               )""",
            (
                str(uuid.uuid4()),
                user_id,
                resource_id,
                now,
                now,
                now,
            ),
        )


    response = client.get(
        "/api/account/report-access/"
        f"personality/{resource_id}",
    )

    assert response.status_code == 200

    payload = response.json()

    assert payload["entitlementStatus"] == "unlocked"
    assert payload["canViewFullReport"] is True
    assert payload["canPrint"] is True
    assert payload["canDownloadPdf"] is True

    with connect_database(database_path) as conn:
        email = conn.execute(
            "SELECT email FROM users WHERE user_id=?",
            (user_id,),
        ).fetchone()["email"]

    assert client.post("/api/auth/logout").status_code == 204
    assert client.post(
        "/api/auth/login",
        json={
            "email": email,
            "password": "InnerGeo-Test-Password-2026!",
        },
    ).status_code == 200

    restored = client.get(
        "/api/account/report-access/"
        f"personality/{resource_id}",
    )

    assert restored.status_code == 200
    assert restored.json()["canViewFullReport"] is True

def test_other_users_resource_returns_not_found(
    client_and_database,
):
    client, database_path = (
        client_and_database
    )
    owner_id = create_verified_user(client)

    resource_id = seed_personality_resource(
        database_path,
        owner_id,
    )


    create_verified_user(client)

    response = client.get(
        "/api/account/report-access/"
        f"personality/{resource_id}",
    )

    assert response.status_code == 404

def test_invalid_report_module_is_rejected(
    client_and_database,
):
    client, database_path = (
        client_and_database
    )
    create_verified_user(client)


    response = client.get(
        "/api/account/report-access/"
        f"invalid/{uuid.uuid4()}",
    )

    assert response.status_code == 400
