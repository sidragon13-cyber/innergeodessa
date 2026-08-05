from datetime import timedelta
from pathlib import Path
import sys

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app import main
from app.auth import utc_now
from app.database import connect, initialize
from app.routers import auth as auth_router_module


ROOT = Path(__file__).resolve().parents[1] / "backend"
ITEMS_PATH = ROOT / "data" / "items.json"


@pytest.fixture
def client_and_database(tmp_path, monkeypatch):
    database_path = tmp_path / "auth-api.db"
    initialize(db_path=database_path, items_path=ITEMS_PATH)

    monkeypatch.setattr(
        auth_router_module,
        "connect",
        lambda: connect(database_path),
    )
    monkeypatch.setattr(main, "initialize", lambda: None)
    monkeypatch.setenv("INNERGEO_ENV", "test")
    monkeypatch.setenv("INNERGEO_COOKIE_SECURE", "false")
    monkeypatch.delenv("INNERGEO_AUTH_TEST_MODE", raising=False)

    with TestClient(main.app) as client:
        yield client, database_path, monkeypatch


def register(client, monkeypatch, email=" User@Example.com "):
    monkeypatch.setenv("INNERGEO_AUTH_TEST_MODE", "true")
    response = client.post(
        "/api/auth/register",
        json={
            "email": email,
            "nickname": " QuietRiver ",
            "password": "correct-horse-battery-staple",
        },
    )
    assert response.status_code == 201, response.text
    return response


def login(client, email="user@example.com", password=None):
    return client.post(
        "/api/auth/login",
        json={
            "email": email,
            "password": password or "correct-horse-battery-staple",
        },
    )


def test_register_normalizes_email_returns_safe_user_and_hides_token_by_default(
    client_and_database,
):
    client, database_path, _monkeypatch = client_and_database

    response = client.post(
        "/api/auth/register",
        json={
            "email": " User@Example.com ",
            "nickname": " QuietRiver ",
            "password": "correct-horse-battery-staple",
        },
    )

    assert response.status_code == 201
    body = response.json()
    assert "verificationToken" not in body
    assert body["user"] == {
        "userId": body["user"]["userId"],
        "email": "User@Example.com",
        "nickname": "QuietRiver",
        "emailVerified": False,
        "status": "active",
        "createdAt": body["user"]["createdAt"],
    }
    assert not {
        "email_normalized",
        "password_hash",
        "token_hash",
    }.intersection(body["user"])

    with connect(database_path) as connection:
        user = connection.execute(
            """SELECT email, email_normalized, password_hash
               FROM users"""
        ).fetchone()
        token_hash = connection.execute(
            "SELECT token_hash FROM email_verification_tokens"
        ).fetchone()["token_hash"]
    assert user["email"] == "User@Example.com"
    assert user["email_normalized"] == "user@example.com"
    assert user["password_hash"].startswith("scrypt$")
    assert "correct-horse-battery-staple" not in user["password_hash"]
    assert token_hash


def test_test_mode_returns_verification_token_and_database_keeps_only_hash(
    client_and_database,
):
    client, database_path, monkeypatch = client_and_database
    response = register(client, monkeypatch)
    token = response.json()["verificationToken"]

    with connect(database_path) as connection:
        stored = connection.execute(
            "SELECT token_hash FROM email_verification_tokens"
        ).fetchone()["token_hash"]

    assert token
    assert stored != token
    assert token not in stored


def test_duplicate_email_is_case_insensitive(client_and_database):
    client, _database_path, monkeypatch = client_and_database
    register(client, monkeypatch)

    duplicate = client.post(
        "/api/auth/register",
        json={
            "email": "USER@example.COM",
            "nickname": "SecondName",
            "password": "another-secure-password",
        },
    )

    assert duplicate.status_code == 409


@pytest.mark.parametrize(
    "payload",
    (
        {
            "email": "not-an-email",
            "nickname": "QuietRiver",
            "password": "correct-horse-battery-staple",
        },
        {
            "email": "user@example.com",
            "nickname": "x",
            "password": "correct-horse-battery-staple",
        },
        {
            "email": "user@example.com",
            "nickname": "QuietRiver",
            "password": "short",
        },
    ),
)
def test_register_rejects_invalid_input(client_and_database, payload):
    client, _database_path, _monkeypatch = client_and_database
    assert client.post("/api/auth/register", json=payload).status_code == 422


def test_verify_email_succeeds_once(client_and_database):
    client, _database_path, monkeypatch = client_and_database
    token = register(client, monkeypatch).json()["verificationToken"]

    verified = client.post("/api/auth/verify-email", json={"token": token})
    repeated = client.post("/api/auth/verify-email", json={"token": token})

    assert verified.status_code == 200
    assert verified.json()["emailVerified"] is True
    assert repeated.status_code == 400


def test_expired_verification_token_is_rejected(client_and_database):
    client, database_path, monkeypatch = client_and_database
    token = register(client, monkeypatch).json()["verificationToken"]

    with connect(database_path) as connection:
        connection.execute(
            "UPDATE email_verification_tokens SET expires_at=?",
            ((utc_now() - timedelta(seconds=1)).isoformat(),),
        )

    assert client.post(
        "/api/auth/verify-email", json={"token": token}
    ).status_code == 400


def test_login_sets_http_only_cookie_and_me_returns_safe_user(
    client_and_database,
):
    client, database_path, monkeypatch = client_and_database
    register(client, monkeypatch)

    response = login(client)
    cookie = response.headers["set-cookie"]

    assert response.status_code == 200
    assert "innergeo_session=" in cookie
    assert "HttpOnly" in cookie
    assert "SameSite=lax" in cookie
    assert "Path=/" in cookie
    assert "Max-Age=2592000" in cookie
    assert response.json()["user"]["emailVerified"] is False

    me = client.get("/api/auth/me")
    assert me.status_code == 200
    assert set(me.json()) == {
        "userId",
        "email",
        "nickname",
        "emailVerified",
        "status",
        "createdAt",
    }
    with connect(database_path) as connection:
        assert connection.execute(
            "SELECT last_seen_at FROM auth_sessions"
        ).fetchone()["last_seen_at"] is not None


def test_unknown_email_and_wrong_password_share_unauthorized_response(
    client_and_database,
):
    client, _database_path, monkeypatch = client_and_database
    register(client, monkeypatch)

    unknown = login(client, email="missing@example.com")
    wrong = login(client, password="this-password-is-wrong")

    assert unknown.status_code == wrong.status_code == 401
    assert unknown.json() == wrong.json()


def test_me_requires_active_session(client_and_database):
    client, _database_path, _monkeypatch = client_and_database
    assert client.get("/api/auth/me").status_code == 401


def test_logout_revokes_session_and_clears_cookie(client_and_database):
    client, database_path, monkeypatch = client_and_database
    register(client, monkeypatch)
    login(client)
    session_token = client.cookies.get("innergeo_session")

    response = client.post("/api/auth/logout")

    assert response.status_code == 204
    assert "innergeo_session=" in response.headers["set-cookie"]
    assert "Max-Age=0" in response.headers["set-cookie"]
    with connect(database_path) as connection:
        revoked_at = connection.execute(
            "SELECT revoked_at FROM auth_sessions"
        ).fetchone()["revoked_at"]
    assert revoked_at is not None
    client.cookies.set("innergeo_session", session_token)
    assert client.get("/api/auth/me").status_code == 401
    assert client.post("/api/auth/logout").status_code == 204


def test_expired_session_cannot_access_me(client_and_database):
    client, database_path, monkeypatch = client_and_database
    register(client, monkeypatch)
    login(client)

    with connect(database_path) as connection:
        connection.execute(
            "UPDATE auth_sessions SET expires_at=?",
            ((utc_now() - timedelta(seconds=1)).isoformat(),),
        )

    assert client.get("/api/auth/me").status_code == 401


@pytest.mark.parametrize("status", ("disabled", "deleted"))
def test_non_active_user_cannot_login(client_and_database, status):
    client, database_path, monkeypatch = client_and_database
    register(client, monkeypatch)

    with connect(database_path) as connection:
        connection.execute("UPDATE users SET status=?", (status,))

    assert login(client).status_code == 401


def test_two_logins_create_distinct_token_hashes_without_plaintext_tokens(
    client_and_database,
):
    client, database_path, monkeypatch = client_and_database
    register(client, monkeypatch)

    assert login(client).status_code == 200
    first_token = client.cookies.get("innergeo_session")
    assert login(client).status_code == 200
    second_token = client.cookies.get("innergeo_session")

    with connect(database_path) as connection:
        hashes = [
            row["token_hash"]
            for row in connection.execute(
                "SELECT token_hash FROM auth_sessions ORDER BY created_at"
            )
        ]

    assert first_token != second_token
    assert len(hashes) == len(set(hashes)) == 2
    assert first_token not in hashes
    assert second_token not in hashes
