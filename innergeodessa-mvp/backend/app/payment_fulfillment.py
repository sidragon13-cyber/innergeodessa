from __future__ import annotations

from dataclasses import dataclass
import sqlite3
import uuid

from .auth import utc_now
from .schemas.payment import PaddleFulfillmentRequest


class FulfillmentError(Exception):
    pass


class ResourceNotFoundError(FulfillmentError):
    pass


class InvalidResourceError(FulfillmentError):
    pass


class UnsupportedResourceModuleError(FulfillmentError):
    pass


class FulfillmentConflictError(FulfillmentError):
    pass


@dataclass(frozen=True)
class FulfillmentResult:
    status: str
    payment_id: str


def _matches_existing_payment(
    payment: sqlite3.Row,
    payload: PaddleFulfillmentRequest,
    user_id: str,
) -> bool:
    return (
        payment["provider_transaction_id"] == payload.providerTransactionId
        and payment["user_id"] == user_id
        and payment["module"] == payload.module
        and payment["resource_id"] == payload.resourceId
        and payment["product_code"] == payload.productCode
        and payment["provider_price_id"] == payload.providerPriceId
        and payment["currency"] == payload.currency.upper()
        and payment["amount"] == payload.amount
        and payment["tax_amount"] == payload.taxAmount
        and payment["status"] == "completed"
    )


def fulfill_paddle_payment(
    conn: sqlite3.Connection,
    payload: PaddleFulfillmentRequest,
) -> FulfillmentResult:
    conn.execute("BEGIN IMMEDIATE")

    resource = conn.execute(
        """SELECT session_id, module, status, owner_user_id
           FROM sessions
           WHERE session_id=?""",
        (payload.resourceId,),
    ).fetchone()

    if resource is None:
        raise ResourceNotFoundError("The assessment resource was not found.")
    if resource["module"] != "personality":
        raise UnsupportedResourceModuleError(
            "The payment resource is not a Personality session."
        )
    if resource["status"] != "completed":
        raise InvalidResourceError("The Personality session is not completed.")
    if not resource["owner_user_id"]:
        raise InvalidResourceError("The Personality session has no owner.")

    user_id = resource["owner_user_id"]
    existing = conn.execute(
        """SELECT * FROM payments
           WHERE provider='paddle'
             AND (provider_event_id=? OR provider_transaction_id=?)""",
        (payload.providerEventId, payload.providerTransactionId),
    ).fetchall()

    if existing:
        if len(existing) != 1 or not _matches_existing_payment(existing[0], payload, user_id):
            raise FulfillmentConflictError(
                "The Paddle event or transaction conflicts with an existing payment."
            )
        return FulfillmentResult(
            status="already_fulfilled",
            payment_id=existing[0]["payment_id"],
        )

    now = utc_now().isoformat()
    payment_id = str(uuid.uuid4())
    entitlement_id = str(uuid.uuid4())

    conn.execute(
        """INSERT INTO payments(
             payment_id, provider, provider_event_id,
             provider_transaction_id, user_id, module, resource_id,
             product_code, provider_price_id, currency, amount,
             tax_amount, status, created_at, completed_at
           ) VALUES (
             ?, 'paddle', ?, ?, ?, 'personality', ?, ?, ?, ?, ?, ?,
             'completed', ?, ?
           )""",
        (
            payment_id,
            payload.providerEventId,
            payload.providerTransactionId,
            user_id,
            payload.resourceId,
            payload.productCode,
            payload.providerPriceId,
            payload.currency.upper(),
            payload.amount,
            payload.taxAmount,
            now,
            payload.completedAt.isoformat(),
        ),
    )

    conn.execute(
        """INSERT INTO report_entitlements(
             entitlement_id, user_id, module, resource_id, status,
             payment_provider, payment_reference, created_at,
             updated_at, unlocked_at, revoked_at
           ) VALUES (
             ?, ?, 'personality', ?, 'unlocked', 'paddle', ?, ?, ?, ?, NULL
           )
           ON CONFLICT(user_id, module, resource_id) DO UPDATE SET
             status='unlocked',
             payment_provider='paddle',
             payment_reference=excluded.payment_reference,
             updated_at=excluded.updated_at,
             unlocked_at=excluded.unlocked_at,
             revoked_at=NULL""",
        (
            entitlement_id,
            user_id,
            payload.resourceId,
            payload.providerTransactionId,
            now,
            now,
            now,
        ),
    )

    return FulfillmentResult(status="fulfilled", payment_id=payment_id)
