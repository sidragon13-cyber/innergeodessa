from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
import uuid
from dataclasses import dataclass


PAYSTACK_INITIALIZE_URL = "https://api.paystack.co/transaction/initialize"


class PaystackConfigurationError(RuntimeError):
    pass


class PaystackRequestError(RuntimeError):
    pass


@dataclass(frozen=True)
class PaystackInitializeResult:
    authorization_url: str
    access_code: str
    reference: str


def create_reference() -> str:
    return f"innergeo-{uuid.uuid4().hex}"


def initialize_transaction(
    *,
    email: str,
    amount: int,
    currency: str,
    reference: str,
    callback_url: str,
    metadata: dict,
) -> PaystackInitializeResult:
    secret_key = os.getenv("PAYSTACK_SECRET_KEY", "").strip()

    if not secret_key:
        raise PaystackConfigurationError(
            "Paystack payment initialization is not configured."
        )

    payload = json.dumps(
        {
            "email": email,
            "amount": str(amount),
            "currency": currency,
            "reference": reference,
            "callback_url": callback_url,
            "metadata": json.dumps(metadata),
        }
    ).encode("utf-8")

    request = urllib.request.Request(
        PAYSTACK_INITIALIZE_URL,
        data=payload,
        method="POST",
        headers={
            "Authorization": f"Bearer {secret_key}",
            "Content-Type": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            body = json.loads(response.read().decode("utf-8"))
    except (
        urllib.error.HTTPError,
        urllib.error.URLError,
        TimeoutError,
        json.JSONDecodeError,
    ) as error:
        raise PaystackRequestError(
            "Paystack transaction initialization failed."
        ) from error

    if not body.get("status"):
        raise PaystackRequestError(
            "Paystack transaction initialization failed."
        )

    data = body.get("data") or {}

    authorization_url = data.get("authorization_url")
    access_code = data.get("access_code")
    returned_reference = data.get("reference")

    if not all(
        [
            authorization_url,
            access_code,
            returned_reference,
        ]
    ):
        raise PaystackRequestError(
            "Paystack returned an incomplete initialization response."
        )

    return PaystackInitializeResult(
        authorization_url=authorization_url,
        access_code=access_code,
        reference=returned_reference,
    )
