from __future__ import annotations

from datetime import timedelta
from pathlib import Path
import sys

import pytest
from fastapi.testclient import TestClient


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app import main
from app.auth import hash_token, utc_now
from app.database import connect, initialize
from app.email import service as email_service
from app.routers import auth as auth_router_module


ROOT = Path(__file__).resolve().parents[1] / "backend"
ITEMS_PATH = ROOT / "data" / "items.json"
PASSWORD = "correct-horse-battery-staple"
NEW_PASSWORD = "new-correct-horse-battery-staple"


@pytest.fixture
def recovery_client(tmp_path, monkeypatch):
    database_path = tmp_path / "auth-recovery.db"
    initialize(db_path=database_path, items_path=ITEMS_PATH)
    sent = {"verification": [], "reset": []}

    monkeypatch.setattr(auth_router_module, "connect", lambda: connect(database_path))
    monkeypatch.setattr(main, "initialize", lambda: None)
    monkeypatch.setenv("INNERGEO_ENV", "test")
    monkeypatch.setenv("INNERGEO_AUTH_TEST_MODE", "true")
    monkeypatch.setenv("INNERGEO_COOKIE_SECURE", "false")
    monkeypatch.setattr(
        auth_router_module,
        "send_verification_email",
        lambda *, email, token: sent["verification"].append((email, token)),
        raising=False,
    )
    monkeypatch.setattr(
        auth_router_module,
        "send_password_reset_email",
        lambda *, email, token: sent["reset"].append((email, token)),
        raising=False,
    )

    with TestClient(main.app) as client:
        yield client, database_path, monkeypatch, sent


def register(client, email="user@example.com"):
    return client.post(
        "/api/auth/register",
        json={"email": email, "nickname": "QuietRiver", "password": PASSWORD},
    )


def test_registration_sends_verification_and_stores_only_hash(recovery_client):
    client, database_path, _monkeypatch, sent = recovery_client

    response = register(client)

    assert response.status_code == 201
    token = response.json()["verificationToken"]
    assert sent["verification"] == [("user@example.com", token)]
    with connect(database_path) as conn:
        stored = conn.execute(
            "SELECT token_hash FROM email_verification_tokens"
        ).fetchone()["token_hash"]
    assert stored == hash_token(token)
    assert stored != token


def test_registration_delivery_failure_preserves_account_and_token(recovery_client):
    client, database_path, monkeypatch, _sent = recovery_client

    def fail_delivery(**_kwargs):
        raise auth_router_module.EmailDeliveryError("delivery failed")

    monkeypatch.setattr(auth_router_module, "send_verification_email", fail_delivery)

    response = register(client)

    assert response.status_code == 503
    with connect(database_path) as conn:
        assert conn.execute("SELECT COUNT(*) FROM users").fetchone()[0] == 1
        token = conn.execute(
            "SELECT consumed_at FROM email_verification_tokens"
        ).fetchone()
    assert token["consumed_at"] is None


def test_resend_is_generic_replaces_token_and_enforces_attempt_cooldown(recovery_client):
    client, database_path, _monkeypatch, sent = recovery_client
    first_token = register(client).json()["verificationToken"]

    with connect(database_path) as conn:
        conn.execute(
            "UPDATE email_verification_tokens SET created_at=?",
            ((utc_now() - timedelta(minutes=10)).isoformat(),),
        )

    response = client.post(
        "/api/auth/resend-verification", json={"email": "USER@example.com"}
    )
    repeated = client.post(
        "/api/auth/resend-verification", json={"email": "user@example.com"}
    )

    assert response.status_code == repeated.status_code == 202
    assert response.json()["message"] == repeated.json()["message"]
    next_token = response.json()["verificationToken"]
    assert next_token != first_token
    assert "verificationToken" not in repeated.json()
    assert sent["verification"][-1] == ("user@example.com", next_token)
    with connect(database_path) as conn:
        assert conn.execute(
            "SELECT COUNT(*) FROM email_verification_tokens"
        ).fetchone()[0] == 2


def test_failed_resend_delivery_still_enters_cooldown(recovery_client):
    client, database_path, monkeypatch, sent = recovery_client
    register(client)
    with connect(database_path) as conn:
        conn.execute(
            "UPDATE email_verification_tokens SET created_at=?",
            ((utc_now() - timedelta(minutes=10)).isoformat(),),
        )

    attempts = 0

    def fail_delivery(**_kwargs):
        nonlocal attempts
        attempts += 1
        raise auth_router_module.EmailDeliveryError("delivery failed")

    monkeypatch.setattr(auth_router_module, "send_verification_email", fail_delivery)
    first = client.post(
        "/api/auth/resend-verification", json={"email": "user@example.com"}
    )
    second = client.post(
        "/api/auth/resend-verification", json={"email": "user@example.com"}
    )

    assert first.status_code == second.status_code == 202
    assert first.json()["message"] == second.json()["message"]
    assert attempts == 1
    assert sent["verification"]


def test_resend_for_unknown_and_verified_accounts_is_generic(recovery_client):
    client, _database_path, _monkeypatch, sent = recovery_client
    token = register(client).json()["verificationToken"]
    assert client.post("/api/auth/verify-email", json={"token": token}).status_code == 200

    verified = client.post(
        "/api/auth/resend-verification", json={"email": "user@example.com"}
    )
    unknown = client.post(
        "/api/auth/resend-verification", json={"email": "missing@example.com"}
    )

    assert verified.status_code == unknown.status_code == 202
    assert verified.json() == unknown.json()
    assert len(sent["verification"]) == 1


def test_forgot_password_is_generic_and_stores_hashed_token(recovery_client):
    client, database_path, _monkeypatch, sent = recovery_client
    register(client)

    existing = client.post(
        "/api/auth/forgot-password", json={"email": "user@example.com"}
    )
    unknown = client.post(
        "/api/auth/forgot-password", json={"email": "missing@example.com"}
    )

    assert existing.status_code == unknown.status_code == 202
    assert existing.json()["message"] == unknown.json()["message"]
    token = existing.json()["resetToken"]
    assert "resetToken" not in unknown.json()
    assert sent["reset"] == [("user@example.com", token)]
    with connect(database_path) as conn:
        stored = conn.execute(
            "SELECT token_hash FROM password_reset_tokens"
        ).fetchone()["token_hash"]
    assert stored == hash_token(token)
    assert token not in stored


def test_production_recovery_responses_hide_raw_tokens(recovery_client):
    client, database_path, monkeypatch, _sent = recovery_client
    register(client)
    with connect(database_path) as conn:
        conn.execute(
            "UPDATE email_verification_tokens SET created_at=?",
            ((utc_now() - timedelta(minutes=10)).isoformat(),),
        )
    monkeypatch.setenv("INNERGEO_ENV", "production")
    monkeypatch.delenv("INNERGEO_AUTH_TEST_MODE", raising=False)

    resend = client.post(
        "/api/auth/resend-verification", json={"email": "user@example.com"}
    )
    forgot = client.post(
        "/api/auth/forgot-password", json={"email": "user@example.com"}
    )

    assert resend.status_code == forgot.status_code == 202
    assert "verificationToken" not in resend.json()
    assert "resetToken" not in forgot.json()


def test_resend_provider_receives_configured_verification_link(monkeypatch):
    captured = {}

    class Response:
        status = 200

        def __enter__(self):
            return self

        def __exit__(self, *_args):
            return False

    def fake_urlopen(outbound, timeout):
        captured["body"] = outbound.data.decode("utf-8")
        captured["authorization"] = outbound.get_header("Authorization")
        captured["content_type"] = outbound.get_header("Content-type")
        captured["user_agent"] = outbound.get_header("User-agent")
        captured["timeout"] = timeout
        return Response()

    monkeypatch.setenv("INNERGEO_ENV", "production")
    monkeypatch.setenv("INNERGEO_EMAIL_API_KEY", "provider-key-for-test")
    monkeypatch.setenv("INNERGEO_EMAIL_SENDER", "InnerGeo <mail@example.com>")
    monkeypatch.setenv("INNERGEO_PUBLIC_APP_URL", "https://innergeo.example")
    monkeypatch.setattr(email_service.request, "urlopen", fake_urlopen)

    email_service.send_verification_email(
        email="user@example.com",
        token="token with symbols/+",
    )

    assert "https://innergeo.example/account/verify-email?token=token+with+symbols%2F%2B" in captured["body"]
    assert captured["authorization"] == "Bearer provider-key-for-test"
    assert captured["content_type"] == "application/json"
    assert captured["user_agent"] == "InnerGeo/1.0"
    assert captured["timeout"] == 10


def test_failed_reset_delivery_still_enters_cooldown(recovery_client):
    client, _database_path, monkeypatch, _sent = recovery_client
    register(client)
    attempts = 0

    def fail_delivery(**_kwargs):
        nonlocal attempts
        attempts += 1
        raise auth_router_module.EmailDeliveryError("delivery failed")

    monkeypatch.setattr(auth_router_module, "send_password_reset_email", fail_delivery)
    first = client.post(
        "/api/auth/forgot-password", json={"email": "user@example.com"}
    )
    second = client.post(
        "/api/auth/forgot-password", json={"email": "user@example.com"}
    )

    assert first.status_code == second.status_code == 202
    assert first.json()["message"] == second.json()["message"]
    assert attempts == 1


def test_valid_reset_changes_password_consumes_token_and_revokes_sessions(recovery_client):
    client, database_path, _monkeypatch, _sent = recovery_client
    register(client)
    assert client.post(
        "/api/auth/login", json={"email": "user@example.com", "password": PASSWORD}
    ).status_code == 200
    forgot = client.post(
        "/api/auth/forgot-password", json={"email": "user@example.com"}
    )
    token = forgot.json()["resetToken"]

    reset = client.post(
        "/api/auth/reset-password",
        json={"token": token, "password": NEW_PASSWORD},
    )

    assert reset.status_code == 200
    assert client.get("/api/auth/me").status_code == 401
    assert client.post(
        "/api/auth/login", json={"email": "user@example.com", "password": PASSWORD}
    ).status_code == 401
    assert client.post(
        "/api/auth/login", json={"email": "user@example.com", "password": NEW_PASSWORD}
    ).status_code == 200
    with connect(database_path) as conn:
        reset_row = conn.execute(
            "SELECT used_at FROM password_reset_tokens"
        ).fetchone()
        revoked = conn.execute(
            "SELECT revoked_at FROM auth_sessions ORDER BY created_at LIMIT 1"
        ).fetchone()
    assert reset_row["used_at"] is not None
    assert revoked["revoked_at"] is not None
    assert client.post(
        "/api/auth/reset-password",
        json={"token": token, "password": "another-secure-password"},
    ).status_code == 400


def test_invalid_and_expired_reset_tokens_are_rejected(recovery_client):
    client, database_path, _monkeypatch, _sent = recovery_client
    register(client)
    forgot = client.post(
        "/api/auth/forgot-password", json={"email": "user@example.com"}
    )
    token = forgot.json()["resetToken"]
    with connect(database_path) as conn:
        conn.execute(
            "UPDATE password_reset_tokens SET expires_at=?",
            ((utc_now() - timedelta(seconds=1)).isoformat(),),
        )

    invalid = client.post(
        "/api/auth/reset-password",
        json={"token": "not-a-real-token", "password": NEW_PASSWORD},
    )
    expired = client.post(
        "/api/auth/reset-password",
        json={"token": token, "password": NEW_PASSWORD},
    )

    assert invalid.status_code == expired.status_code == 400
