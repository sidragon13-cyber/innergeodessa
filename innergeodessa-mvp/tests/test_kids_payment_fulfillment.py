from __future__ import annotations

import sqlite3
import sys
import uuid
from pathlib import Path

import pytest

TEST_ROOT = Path(__file__).resolve().parents[1]
BACKEND_ROOT = TEST_ROOT / "backend"
ITEMS_PATH = BACKEND_ROOT / "data" / "items.json"

sys.path.insert(0, str(BACKEND_ROOT))

from app.database import initialize
from app.payment_fulfillment import (
    InvalidResourceError,
    fulfill_paddle_payment,
)
from app.schemas.payment import PaddleFulfillmentRequest


def connect_database(path: Path) -> sqlite3.Connection:
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def seed_user(conn: sqlite3.Connection) -> str:
    user_id = str(uuid.uuid4())
    now = "2026-08-21T10:00:00+00:00"

    conn.execute(
        """INSERT INTO users(
             user_id, email, email_normalized, nickname,
             password_hash, email_verified_at, status,
             created_at, updated_at
           ) VALUES (?, ?, ?, 'Explorer', 'hash', ?, 'active', ?, ?)""",
        (
            user_id,
            f"{user_id}@example.com",
            f"{user_id}@example.com",
            now,
            now,
            now,
        ),
    )

    return user_id


def seed_kids_session(
    conn: sqlite3.Connection,
    *,
    user_id: str,
    form: str,
) -> str:
    session_id = str(uuid.uuid4())
    now = "2026-08-21T10:00:00+00:00"
    bank = (
        "KIDS-K68-RF-V2"
        if form == "k68"
        else "KIDS-K912-RF-V2"
    )

    conn.execute(
        """INSERT INTO sessions(
             session_id, consent, language, module, form,
             started_at, completed_at, status,
             question_bank_version, owner_user_id, claimed_at
           ) VALUES (
             ?, 1, 'en', 'kids', ?, ?, ?, 'completed', ?, ?, ?
           )""",
        (
            session_id,
            form,
            now,
            now,
            bank,
            user_id,
            now,
        ),
    )

    return session_id


def payload(
    session_id: str,
    *,
    form: str,
    product_code: str | None = None,
) -> PaddleFulfillmentRequest:
    is_k68 = form == "k68"

    return PaddleFulfillmentRequest(
        providerEventId=f"evt-{uuid.uuid4()}",
        providerTransactionId=f"txn-{uuid.uuid4()}",
        module="kids",
        resourceId=session_id,
        productCode=product_code
        or (
            "kids-k68-premium-report-v1"
            if is_k68
            else "kids-k912-premium-report-v1"
        ),
        providerPriceId="pri-k68-test" if is_k68 else "pri-k912-test",
        currency="USD",
        amount=799 if is_k68 else 899,
        taxAmount=0,
        completedAt="2026-08-21T10:05:00+00:00",
    )


@pytest.mark.parametrize(
    ("form", "expected_product", "expected_amount"),
    [
        ("k68", "kids-k68-premium-report-v1", 799),
        ("k912", "kids-k912-premium-report-v1", 899),
    ],
)
def test_kids_fulfillment_unlocks_entitlement(
    tmp_path,
    form,
    expected_product,
    expected_amount,
):
    db_path = tmp_path / f"{form}.db"
    initialize(db_path, items_path=ITEMS_PATH)

    with connect_database(db_path) as conn:
        user_id = seed_user(conn)
        session_id = seed_kids_session(
            conn,
            user_id=user_id,
            form=form,
        )
        conn.commit()

        result = fulfill_paddle_payment(
            conn,
            payload(session_id, form=form),
        )
        conn.commit()

        assert result.status == "fulfilled"

        payment = conn.execute(
            """SELECT *
               FROM payments
               WHERE resource_id=?""",
            (session_id,),
        ).fetchone()

        entitlement = conn.execute(
            """SELECT *
               FROM report_entitlements
               WHERE module='kids'
                 AND resource_id=?""",
            (session_id,),
        ).fetchone()

        assert payment is not None
        assert payment["module"] == "kids"
        assert payment["product_code"] == expected_product
        assert payment["amount"] == expected_amount
        assert payment["status"] == "completed"

        assert entitlement is not None
        assert entitlement["user_id"] == user_id
        assert entitlement["status"] == "unlocked"
        assert entitlement["payment_provider"] == "paddle"


@pytest.mark.parametrize(
    ("form", "wrong_product"),
    [
        ("k68", "kids-k912-premium-report-v1"),
        ("k912", "kids-k68-premium-report-v1"),
    ],
)
def test_kids_fulfillment_rejects_cross_form_product(
    tmp_path,
    form,
    wrong_product,
):
    db_path = tmp_path / f"{form}-wrong.db"
    initialize(db_path, items_path=ITEMS_PATH)

    with connect_database(db_path) as conn:
        user_id = seed_user(conn)
        session_id = seed_kids_session(
            conn,
            user_id=user_id,
            form=form,
        )
        conn.commit()

        with pytest.raises(InvalidResourceError):
            fulfill_paddle_payment(
                conn,
                payload(
                    session_id,
                    form=form,
                    product_code=wrong_product,
                ),
            )

        conn.rollback()

        assert conn.execute(
            """SELECT COUNT(*)
               FROM payments
               WHERE resource_id=?""",
            (session_id,),
        ).fetchone()[0] == 0

        assert conn.execute(
            """SELECT COUNT(*)
               FROM report_entitlements
               WHERE resource_id=?""",
            (session_id,),
        ).fetchone()[0] == 0
