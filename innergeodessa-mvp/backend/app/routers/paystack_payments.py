from __future__ import annotations

import os
from typing import Literal

from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel, ConfigDict

from ..auth_context import require_verified_user
from ..database import connect
from ..paystack import (
    PaystackConfigurationError,
    PaystackRequestError,
    create_reference,
    initialize_transaction,
)


router = APIRouter(
    prefix="/api/payments/paystack",
    tags=["paystack-payments"],
)


class PaystackInitializeRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    module: Literal["personality", "career", "kids"]
    resourceId: str


class PaystackInitializeResponse(BaseModel):
    authorizationUrl: str
    accessCode: str
    reference: str


PRODUCTS = {
    "personality": {
        "product_code": "personality-premium-report-v1",
        "amount": 14900,
    },
    "career": {
        "product_code": "career-premium-report-v1",
        "amount": 17900,
    },
    "kids-k68": {
        "product_code": "kids-k68-premium-report-v1",
        "amount": 14900,
    },
    "kids-k912": {
        "product_code": "kids-k912-premium-report-v1",
        "amount": 16900,
    },
}


def _resolve_product(
    *,
    module: str,
    resource_id: str,
    user_id: str,
):
    with connect() as conn:
        row = conn.execute(
            """SELECT session_id, module, form, status, owner_user_id
               FROM sessions
               WHERE session_id=?""",
            (resource_id,),
        ).fetchone()

    if row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The assessment resource was not found.",
        )

    if row["owner_user_id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The assessment resource was not found.",
        )

    if row["status"] != "completed":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="The assessment resource is not completed.",
        )

    if module == "personality":
        if row["module"] != "personality":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The payment resource module does not match.",
            )
        return PRODUCTS["personality"]

    if module == "career":
        if row["module"] != "riasec":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The payment resource module does not match.",
            )
        return PRODUCTS["career"]

    if module == "kids":
        if row["module"] != "kids":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The payment resource module does not match.",
            )

        form = (row["form"] or "").lower()

        if form == "k68":
            return PRODUCTS["kids-k68"]

        if form == "k912":
            return PRODUCTS["kids-k912"]

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The Kids assessment form is not supported.",
        )

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="The payment module is not supported.",
    )


@router.post(
    "/initialize",
    response_model=PaystackInitializeResponse,
)
def initialize_paystack_payment(
    payload: PaystackInitializeRequest,
    request: Request,
) -> PaystackInitializeResponse:
    user = require_verified_user(
        request,
        connection_factory=connect,
    )

    product = _resolve_product(
        module=payload.module,
        resource_id=payload.resourceId,
        user_id=user["user_id"],
    )

    public_url = os.getenv(
        "INNERGEO_PUBLIC_APP_URL",
        "https://innergeo.app",
    ).rstrip("/")

    reference = create_reference()

    try:
        result = initialize_transaction(
            email=user["email"],
            amount=product["amount"],
            currency="ZAR",
            reference=reference,
            callback_url=(
                f"{public_url}/payment/paystack/callback"
            ),
            metadata={
                "module": payload.module,
                "resourceId": payload.resourceId,
                "productCode": product["product_code"],
            },
        )
    except PaystackConfigurationError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(error),
        ) from error
    except PaystackRequestError as error:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(error),
        ) from error

    return PaystackInitializeResponse(
        authorizationUrl=result.authorization_url,
        accessCode=result.access_code,
        reference=result.reference,
    )
