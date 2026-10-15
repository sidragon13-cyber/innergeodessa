from __future__ import annotations

from datetime import timedelta
import importlib
import sqlite3
import sys
import uuid
from pathlib import Path

import pytest
from fastapi.testclient import TestClient


TEST_ROOT = Path(__file__).resolve().parents[1]
BACKEND_ROOT = TEST_ROOT / "backend"
ITEMS_PATH = BACKEND_ROOT / "data" / "items.json"

sys.path.insert(0, str(BACKEND_ROOT))

from app.auth import generate_token, hash_token, utc_now
from app.database import initialize


def connect_database(path: Path) -> sqlite3.Connection:
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


@pytest.fixture()
def client_and_database(tmp_path, monkeypatch):
    database_path = tmp_path / "paystack-initialize.db"

    initialize(
        db_path=database_path,
        items_path=ITEMS_PATH,
    )

    connection_factory = lambda: connect_database(database_path)

    database_module = importlib.import_module("app.database")
    monkeypatch.setattr(
        database_module,
        "connect",
        connection_factory,
    )

    router = importlib.import_module(
        "app.routers.paystack_payments"
    )
    monkeypatch.setattr(
        router,
        "connect",
        connection_factory,
    )

    main_module = importlib.import_module("app.main")
    monkeypatch.setattr(
        main_module,
        "initialize",
        lambda: None,
    )

    with TestClient(main_module.app) as client:
        yield client, database_path, router


def create_user_session(
    database_path,
    *,
    verified=True,
):
    user_id = str(uuid.uuid4())
    auth_session_id = str(uuid.uuid4())
    token = generate_token()
    now = utc_now()
    email = f"{user_id}@example.com"

    with connect_database(database_path) as conn:
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
                email,
                email,
                "PaystackUser",
                "test-password-hash",
                now.isoformat() if verified else None,
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
                hash_token(token),
                now.isoformat(),
                (now + timedelta(days=1)).isoformat(),
            ),
        )

    return user_id, email, token


def create_session(
    database_path,
    *,
    user_id,
    module,
    form=None,
):
    session_id = str(uuid.uuid4())
    now = utc_now().isoformat()

    with connect_database(database_path) as conn:
        conn.execute(
            """INSERT INTO sessions(
                 session_id,
                 consent,
                 language,
                 module,
                 form,
                 started_at,
                 completed_at,
                 status,
                 owner_user_id,
                 claimed_at
               ) VALUES (?, 1, 'en', ?, ?, ?, ?, 'completed', ?, ?)""",
            (
                session_id,
                module,
                form,
                now,
                now,
                user_id,
                now,
            ),
        )

    return session_id


def test_paystack_initialize_requires_authenticated_verified_user(
    client_and_database,
):
    client, _database_path, _router = client_and_database

    response = client.post(
        "/api/payments/paystack/initialize",
        json={
            "module": "personality",
            "resourceId": "session-test",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Authentication is required."


def test_paystack_initialize_rejects_unverified_user(
    client_and_database,
):
    client, database_path, _router = client_and_database

    user_id, _email, token = create_user_session(
        database_path,
        verified=False,
    )

    resource_id = create_session(
        database_path,
        user_id=user_id,
        module="personality",
    )

    client.cookies.set(
        "innergeo_session",
        token,
    )

    response = client.post(
        "/api/payments/paystack/initialize",
        json={
            "module": "personality",
            "resourceId": resource_id,
        },
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Email verification is required."


@pytest.mark.parametrize(
    (
        "request_module",
        "stored_module",
        "form",
        "expected_amount",
        "expected_product",
    ),
    [
        (
            "personality",
            "personality",
            None,
            14900,
            "personality-premium-report-v1",
        ),
        (
            "career",
            "riasec",
            None,
            17900,
            "career-premium-report-v1",
        ),
        (
            "kids",
            "kids",
            "k68",
            14900,
            "kids-k68-premium-report-v1",
        ),
        (
            "kids",
            "kids",
            "k912",
            16900,
            "kids-k912-premium-report-v1",
        ),
    ],
)
def test_paystack_initialize_uses_server_authoritative_zar_pricing(
    client_and_database,
    monkeypatch,
    request_module,
    stored_module,
    form,
    expected_amount,
    expected_product,
):
    client, database_path, router = client_and_database

    user_id, email, token = create_user_session(database_path)

    resource_id = create_session(
        database_path,
        user_id=user_id,
        module=stored_module,
        form=form,
    )

    captured = {}

    class Result:
        authorization_url = "https://checkout.paystack.com/test"
        access_code = "access-test"
        reference = "reference-test"

    def fake_initialize_transaction(**kwargs):
        captured.update(kwargs)
        return Result()

    monkeypatch.setattr(
        router,
        "initialize_transaction",
        fake_initialize_transaction,
    )

    client.cookies.set(
        "innergeo_session",
        token,
    )

    response = client.post(
        "/api/payments/paystack/initialize",
        json={
            "module": request_module,
            "resourceId": resource_id,
        },
    )

    assert response.status_code == 200

    assert response.json() == {
        "authorizationUrl": "https://checkout.paystack.com/test",
        "accessCode": "access-test",
        "reference": "reference-test",
    }

    assert captured["email"] == email
    assert captured["amount"] == expected_amount
    assert captured["currency"] == "ZAR"

    assert captured["metadata"]["module"] == request_module
    assert captured["metadata"]["resourceId"] == resource_id
    assert captured["metadata"]["productCode"] == expected_product


def test_paystack_initialize_does_not_accept_client_amount_or_currency(
    client_and_database,
):
    client, database_path, _router = client_and_database

    user_id, _email, token = create_user_session(database_path)

    resource_id = create_session(
        database_path,
        user_id=user_id,
        module="personality",
    )

    client.cookies.set(
        "innergeo_session",
        token,
    )

    response = client.post(
        "/api/payments/paystack/initialize",
        json={
            "module": "personality",
            "resourceId": resource_id,
            "amount": 1,
            "currency": "USD",
        },
    )

    assert response.status_code == 422
