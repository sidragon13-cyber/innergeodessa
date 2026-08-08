from __future__ import annotations

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


def connect_database(database_path: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(database_path)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys=ON")
    return connection


@pytest.fixture
def client_and_database(tmp_path, monkeypatch):
    database_path = tmp_path / "payment-fulfillment.db"
    database_module = importlib.import_module("app.database")
    database_module.initialize(database_path, items_path=ITEMS_PATH)

    connection_factory = lambda: connect_database(database_path)
    monkeypatch.setattr(database_module, "connect", connection_factory)
    monkeypatch.setenv("INNERGEODESSA_INTERNAL_API_SECRET", "test-secret")

    internal_router = importlib.import_module("app.routers.internal_payments")
    monkeypatch.setattr(internal_router, "connect", connection_factory)

    main_module = importlib.import_module("app.main")
    return TestClient(main_module.app), database_path


def seed_user(database_path: Path) -> str:
    user_id = str(uuid.uuid4())
    now = "2026-08-08T10:00:00+00:00"
    with connect_database(database_path) as conn:
        conn.execute(
            """INSERT INTO users(
                 user_id, email, email_normalized, nickname,
                 password_hash, email_verified_at, status,
                 created_at, updated_at
               ) VALUES (?, ?, ?, 'Explorer', 'hash', ?, 'active', ?, ?)""",
            (user_id, f"{user_id}@example.com", f"{user_id}@example.com", now, now, now),
        )
    return user_id


def seed_session(
    database_path: Path,
    *,
    owner_user_id: str | None,
    module: str = "personality",
    status: str = "completed",
) -> str:
    session_id = str(uuid.uuid4())
    now = "2026-08-08T10:00:00+00:00"
    with connect_database(database_path) as conn:
        conn.execute(
            """INSERT INTO sessions(
                 session_id, consent, language, module, started_at,
                 completed_at, status, owner_user_id, claimed_at
               ) VALUES (?, 1, 'en', ?, ?, ?, ?, ?, ?)""",
            (
                session_id,
                module,
                now,
                now if status == "completed" else None,
                status,
                owner_user_id,
                now if owner_user_id else None,
            ),
        )
    return session_id


def fulfillment_payload(resource_id: str, *, event_id: str = "evt_1", transaction_id: str = "txn_1") -> dict:
    return {
        "providerEventId": event_id,
        "providerTransactionId": transaction_id,
        "module": "personality",
        "resourceId": resource_id,
        "productCode": "personality-premium-report-v1",
        "providerPriceId": "pri_test",
        "currency": "USD",
        "amount": 699,
        "taxAmount": 0,
        "completedAt": "2026-08-08T10:05:00+00:00",
    }


def fulfill(client: TestClient, payload: dict, *, secret: str = "test-secret"):
    return client.post(
        "/api/internal/payments/paddle/fulfill",
        json=payload,
        headers={"X-InnerGeo-Internal-Secret": secret},
    )


def test_successful_fulfillment_persists_payment_and_unlocks_existing_entitlement(
    client_and_database,
):
    client, database_path = client_and_database
    user_id = seed_user(database_path)
    resource_id = seed_session(database_path, owner_user_id=user_id)
    old_time = "2026-08-08T09:00:00+00:00"

    with connect_database(database_path) as conn:
        conn.execute(
            """INSERT INTO report_entitlements(
                 entitlement_id, user_id, module, resource_id, status,
                 created_at, updated_at
               ) VALUES (?, ?, 'personality', ?, 'pending', ?, ?)""",
            (str(uuid.uuid4()), user_id, resource_id, old_time, old_time),
        )

    response = fulfill(client, fulfillment_payload(resource_id))

    assert response.status_code == 200
    assert response.json()["status"] == "fulfilled"
    assert response.json()["entitlementStatus"] == "unlocked"

    with connect_database(database_path) as conn:
        payment = conn.execute("SELECT * FROM payments").fetchone()
        entitlement = conn.execute("SELECT * FROM report_entitlements").fetchone()

    assert payment["provider"] == "paddle"
    assert payment["provider_event_id"] == "evt_1"
    assert payment["provider_transaction_id"] == "txn_1"
    assert payment["user_id"] == user_id
    assert payment["module"] == "personality"
    assert payment["resource_id"] == resource_id
    assert payment["currency"] == "USD"
    assert payment["amount"] == 699
    assert payment["status"] == "completed"
    assert entitlement["status"] == "unlocked"
    assert entitlement["payment_provider"] == "paddle"
    assert entitlement["payment_reference"] == "txn_1"
    assert entitlement["unlocked_at"] is not None
    assert entitlement["created_at"] == old_time


def test_duplicate_event_and_transaction_are_idempotent(client_and_database):
    client, database_path = client_and_database
    user_id = seed_user(database_path)
    resource_id = seed_session(database_path, owner_user_id=user_id)

    first = fulfill(client, fulfillment_payload(resource_id))
    repeated_event = fulfill(client, fulfillment_payload(resource_id))
    repeated_transaction = fulfill(
        client,
        fulfillment_payload(resource_id, event_id="evt_2"),
    )

    assert first.status_code == 200
    assert repeated_event.status_code == 200
    assert repeated_event.json()["status"] == "already_fulfilled"
    assert repeated_transaction.status_code == 200
    assert repeated_transaction.json()["status"] == "already_fulfilled"

    with connect_database(database_path) as conn:
        assert conn.execute("SELECT COUNT(*) FROM payments").fetchone()[0] == 1
        assert conn.execute("SELECT COUNT(*) FROM report_entitlements").fetchone()[0] == 1


@pytest.mark.parametrize(
    ("resource_kind", "expected_status"),
    [("missing", 404), ("active", 409), ("career", 400)],
)
def test_invalid_resource_is_rejected(client_and_database, resource_kind, expected_status):
    client, database_path = client_and_database
    user_id = seed_user(database_path)

    if resource_kind == "missing":
        resource_id = str(uuid.uuid4())
    elif resource_kind == "active":
        resource_id = seed_session(database_path, owner_user_id=user_id, status="active")
    else:
        resource_id = seed_session(database_path, owner_user_id=user_id, module="riasec")

    response = fulfill(client, fulfillment_payload(resource_id))

    assert response.status_code == expected_status
    with connect_database(database_path) as conn:
        assert conn.execute("SELECT COUNT(*) FROM payments").fetchone()[0] == 0
        assert conn.execute("SELECT COUNT(*) FROM report_entitlements").fetchone()[0] == 0


def test_resource_without_owner_is_rejected(client_and_database):
    client, database_path = client_and_database
    resource_id = seed_session(database_path, owner_user_id=None)

    response = fulfill(client, fulfillment_payload(resource_id))

    assert response.status_code == 409
    with connect_database(database_path) as conn:
        assert conn.execute("SELECT COUNT(*) FROM payments").fetchone()[0] == 0


def test_internal_secret_is_required(client_and_database):
    client, database_path = client_and_database
    user_id = seed_user(database_path)
    resource_id = seed_session(database_path, owner_user_id=user_id)

    response = fulfill(client, fulfillment_payload(resource_id), secret="wrong")

    assert response.status_code == 401
    with connect_database(database_path) as conn:
        assert conn.execute("SELECT COUNT(*) FROM payments").fetchone()[0] == 0
