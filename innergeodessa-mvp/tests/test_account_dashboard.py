from datetime import timedelta
import json
from pathlib import Path
import uuid

import pytest
from fastapi.testclient import TestClient

from backend.app import main
from backend.app.auth import generate_token, hash_token, utc_now
from backend.app.database import connect, initialize
from backend.app.routers import account as account_router


ROOT = Path(__file__).resolve().parents[1]
ITEMS_PATH = ROOT / "backend" / "data" / "items.json"
RIASEC_ITEMS_PATH = ROOT / "backend" / "data" / "riasec-items.json"


@pytest.fixture()
def client_and_database(tmp_path, monkeypatch):
    database_path = tmp_path / "account-dashboard.db"

    initialize(
        db_path=database_path,
        items_path=ITEMS_PATH,
        riasec_items_path=RIASEC_ITEMS_PATH,
    )

    connection_factory = lambda: connect(database_path)

    monkeypatch.setattr(
        account_router,
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
    token = generate_token()
    now = utc_now()
    email = f"{user_id}@example.com"

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
                email,
                email,
                "DashboardUser",
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

    return user_id, token


def insert_personality_record(
    database_path,
    user_id,
    *,
    session_id,
    personality_type,
    timestamp,
):
    with connect(database_path) as conn:
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
                timestamp,
                timestamp,
                user_id,
                timestamp,
            ),
        )

        conn.execute(
            """INSERT INTO results(
                 session_id,
                 personality_type,
                 ei_score,
                 sn_score,
                 tf_score,
                 jp_score,
                 ei_confidence,
                 sn_confidence,
                 tf_confidence,
                 jp_confidence,
                 calculated_at
               ) VALUES (
                 ?, ?, 1, 1, 1, 1,
                 0.5, 0.5, 0.5, 0.5, ?
               )""",
            (
                session_id,
                personality_type,
                timestamp,
            ),
        )


def insert_career_record(
    database_path,
    user_id,
    *,
    session_id,
    code,
    timestamp,
):
    with connect(database_path) as conn:
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
                 'riasec-v0.1.0',
                 'riasec', ?, ?
               )""",
            (
                session_id,
                timestamp,
                timestamp,
                user_id,
                timestamp,
            ),
        )

        conn.execute(
            """INSERT INTO riasec_results(
                 session_id,
                 code,
                 scores_json,
                 percentages_json,
                 ranking_json,
                 answered_json,
                 calculated_at
               ) VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (
                session_id,
                code,
                json.dumps({}),
                json.dumps({}),
                json.dumps([]),
                json.dumps({}),
                timestamp,
            ),
        )


def insert_zodiac_record(
    database_path,
    user_id,
    *,
    chart_id,
    timestamp,
):
    with connect(database_path) as conn:
        conn.execute(
            """INSERT INTO zodiac_charts(
                 chart_id,
                 owner_user_id,
                 result_json,
                 schema_version,
                 calculated_at,
                 created_at,
                 updated_at,
                 claimed_at
               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                chart_id,
                user_id,
                "{}",
                "1.0.0",
                timestamp,
                timestamp,
                timestamp,
                timestamp,
            ),
        )


def test_dashboard_requires_authentication(
    client_and_database,
):
    client, _database_path = client_and_database

    response = client.get(
        "/api/account/dashboard",
    )

    assert response.status_code == 401


def test_unverified_user_can_view_empty_dashboard(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(
        database_path,
        verified=False,
    )

    client.cookies.set(
        "innergeo_session",
        token,
    )

    response = client.get(
        "/api/account/dashboard",
    )

    assert response.status_code == 200
    assert response.json() == {
        "personality": [],
        "career": [],
        "zodiac": [],
    }


def test_dashboard_returns_only_current_user_resources(
    client_and_database,
):
    client, database_path = client_and_database
    user_id, token = create_user_session(
        database_path,
    )
    other_user_id, _other_token = create_user_session(
        database_path,
    )

    insert_personality_record(
        database_path,
        user_id,
        session_id="personality-owned",
        personality_type="INTJ",
        timestamp="2026-08-05T09:00:00+00:00",
    )
    insert_personality_record(
        database_path,
        other_user_id,
        session_id="personality-other",
        personality_type="ENTP",
        timestamp="2026-08-05T10:00:00+00:00",
    )

    insert_career_record(
        database_path,
        user_id,
        session_id="career-owned",
        code="IAS",
        timestamp="2026-08-04T09:00:00+00:00",
    )

    insert_zodiac_record(
        database_path,
        user_id,
        chart_id="zodiac-owned",
        timestamp="2026-08-03T09:00:00+00:00",
    )

    client.cookies.set(
        "innergeo_session",
        token,
    )

    response = client.get(
        "/api/account/dashboard",
    )

    assert response.status_code == 200

    payload = response.json()

    assert payload["personality"] == [
        {
            "resourceId": "personality-owned",
            "type": "INTJ",
            "createdAt": "2026-08-05T09:00:00+00:00",
            "status": "saved",
        }
    ]

    assert payload["career"] == [
        {
            "resourceId": "career-owned",
            "code": "IAS",
            "createdAt": "2026-08-04T09:00:00+00:00",
            "status": "saved",
        }
    ]

    assert payload["zodiac"] == [
        {
            "resourceId": "zodiac-owned",
            "createdAt": "2026-08-03T09:00:00+00:00",
            "calculatedAt": "2026-08-03T09:00:00+00:00",
            "schemaVersion": "1.0.0",
            "status": "saved",
        }
    ]

    serialized = response.text

    assert "result_json" not in serialized
    assert "owner_user_id" not in serialized
    assert "claim_secret_hash" not in serialized
    assert "ENTP" not in serialized


def test_dashboard_orders_each_module_newest_first(
    client_and_database,
):
    client, database_path = client_and_database
    user_id, token = create_user_session(
        database_path,
    )

    insert_personality_record(
        database_path,
        user_id,
        session_id="older",
        personality_type="INTJ",
        timestamp="2026-08-01T09:00:00+00:00",
    )
    insert_personality_record(
        database_path,
        user_id,
        session_id="newer",
        personality_type="ENTJ",
        timestamp="2026-08-05T09:00:00+00:00",
    )

    client.cookies.set(
        "innergeo_session",
        token,
    )

    response = client.get(
        "/api/account/dashboard",
    )

    assert response.status_code == 200
    assert [
        item["resourceId"]
        for item in response.json()["personality"]
    ] == [
        "newer",
        "older",
    ]
