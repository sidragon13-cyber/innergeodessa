from copy import deepcopy
from datetime import timedelta
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
    database_path = tmp_path / "account-zodiac.db"

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
    session_token = generate_token()
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
                "AnonymousUser",
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
                hash_token(session_token),
                now.isoformat(),
                (now + timedelta(days=1)).isoformat(),
            ),
        )

    return user_id, session_token


def valid_zodiac_result():
    def zodiac_position(sign, longitude):
        return {
            "sign": sign,
            "absoluteLongitude": longitude,
            "degree": int(longitude % 30),
            "minute": 0,
            "second": 0,
        }

    def planet(body, sign, longitude):
        return {
            "body": body,
            "ecliptic": {
                "longitude": longitude,
                "latitude": 0,
                "distance": 1,
            },
            "zodiac": zodiac_position(
                sign,
                longitude,
            ),
            "retrograde": False,
        }

    def angle(point, sign, longitude):
        return {
            "point": point,
            "zodiac": zodiac_position(
                sign,
                longitude,
            ),
        }

    return {
        "schemaVersion": "1.0.0",
        "module": "zodiac",
        "calculationType": "natal-chart",
        "calculatedAt": "2026-08-05T08:00:00+00:00",
        "input": {
            "localDateTime": "1990-01-01T12:00:00",
            "utcDateTime": "1990-01-01T10:00:00+00:00",
            "timeZone": "Africa/Johannesburg",
            "latitude": -26.2041,
            "longitude": 28.0473,
            "timePrecision": "exact",
        },
        "planets": {
            "sun": planet("sun", "capricorn", 280),
            "moon": planet("moon", "pisces", 340),
            "mercury": planet("mercury", "capricorn", 275),
            "venus": planet("venus", "aquarius", 310),
            "mars": planet("mars", "sagittarius", 250),
        },
        "angles": {
            "ascendant": angle(
                "ascendant",
                "aries",
                10,
            ),
            "descendant": angle(
                "descendant",
                "libra",
                190,
            ),
            "midheaven": angle(
                "midheaven",
                "capricorn",
                280,
            ),
            "imumCoeli": angle(
                "imum-coeli",
                "cancer",
                100,
            ),
        },
        "engine": {
            "name": "InnerGeo Zodiac Engine",
            "version": "1.0.0",
            "ephemeris": "test-fixture",
        },
        "limitations": [],
    }


def save_chart(
    client,
    chart_id,
    result=None,
):
    return client.post(
        "/api/account/zodiac-charts",
        json={
            "chartId": chart_id,
            "result": (
                result
                if result is not None
                else valid_zodiac_result()
            ),
        },
    )


def test_zodiac_save_requires_authentication(
    client_and_database,
):
    client, _database_path = client_and_database

    response = save_chart(
        client,
        str(uuid.uuid4()),
    )

    assert response.status_code == 401


def test_zodiac_save_requires_verified_email(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(
        database_path,
        verified=False,
    )

    client.cookies.set("innergeo_session", token)

    response = save_chart(
        client,
        str(uuid.uuid4()),
    )

    assert response.status_code == 403


def test_verified_user_can_save_zodiac_chart(
    client_and_database,
):
    client, database_path = client_and_database
    user_id, token = create_user_session(
        database_path,
    )
    chart_id = str(uuid.uuid4())

    client.cookies.set("innergeo_session", token)

    response = save_chart(
        client,
        chart_id,
    )

    assert response.status_code == 200
    assert response.json()["resourceId"] == chart_id
    assert response.json()["module"] == "zodiac"
    assert response.json()["status"] == "saved"

    with connect(database_path) as conn:
        row = conn.execute(
            """SELECT owner_user_id,
                      result_json,
                      schema_version,
                      calculated_at,
                      claimed_at
               FROM zodiac_charts
               WHERE chart_id=?""",
            (chart_id,),
        ).fetchone()

    assert row is not None
    assert row["owner_user_id"] == user_id
    assert row["schema_version"] == "1.0.0"
    assert row["calculated_at"] == (
        "2026-08-05T08:00:00+00:00"
    )
    assert row["claimed_at"] is not None
    assert "\n" not in row["result_json"]


def test_same_user_repeat_save_is_idempotent(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(
        database_path,
    )
    chart_id = str(uuid.uuid4())
    result = valid_zodiac_result()

    client.cookies.set("innergeo_session", token)

    first = save_chart(
        client,
        chart_id,
        result,
    )
    second = save_chart(
        client,
        chart_id,
        result,
    )

    assert first.status_code == 200
    assert second.status_code == 200
    assert second.json()["resourceId"] == chart_id


def test_same_chart_id_with_different_result_conflicts(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(
        database_path,
    )
    chart_id = str(uuid.uuid4())
    first_result = valid_zodiac_result()
    second_result = deepcopy(first_result)
    second_result["planets"]["sun"]["retrograde"] = True

    client.cookies.set("innergeo_session", token)

    assert save_chart(
        client,
        chart_id,
        first_result,
    ).status_code == 200

    response = save_chart(
        client,
        chart_id,
        second_result,
    )

    assert response.status_code == 409


def test_other_user_cannot_take_existing_chart(
    client_and_database,
):
    client, database_path = client_and_database
    _first_user, first_token = create_user_session(
        database_path,
    )
    _second_user, second_token = create_user_session(
        database_path,
    )
    chart_id = str(uuid.uuid4())

    client.cookies.set(
        "innergeo_session",
        first_token,
    )
    assert save_chart(
        client,
        chart_id,
    ).status_code == 200

    client.cookies.set(
        "innergeo_session",
        second_token,
    )

    response = save_chart(
        client,
        chart_id,
    )

    assert response.status_code == 409


@pytest.mark.parametrize(
    "mutator",
    [
        lambda result: result.update(
            {"schemaVersion": "2.0.0"}
        ),
        lambda result: result.update(
            {"module": "personality"}
        ),
        lambda result: result.update(
            {"calculatedAt": "not-a-date"}
        ),
        lambda result: result.pop("planets"),
        lambda result: result["angles"].pop(
            "ascendant"
        ),
    ],
)
def test_invalid_zodiac_contract_is_rejected(
    client_and_database,
    mutator,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(
        database_path,
    )
    result = valid_zodiac_result()
    mutator(result)

    client.cookies.set("innergeo_session", token)

    response = save_chart(
        client,
        str(uuid.uuid4()),
        result,
    )

    assert response.status_code == 422


def test_oversized_zodiac_result_is_rejected(
    client_and_database,
):
    client, database_path = client_and_database
    _user_id, token = create_user_session(
        database_path,
    )
    result = valid_zodiac_result()
    result["limitations"] = [
        "x" * 260_000,
    ]

    client.cookies.set("innergeo_session", token)

    response = save_chart(
        client,
        str(uuid.uuid4()),
        result,
    )

    assert response.status_code == 422
