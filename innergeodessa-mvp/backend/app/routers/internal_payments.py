from __future__ import annotations

import hmac
import os

from fastapi import APIRouter, Header, HTTPException, status

from ..database import connect
from ..payment_fulfillment import (
    FulfillmentConflictError,
    InvalidResourceError,
    ResourceNotFoundError,
    UnsupportedResourceModuleError,
    fulfill_paddle_payment,
)
from ..schemas.payment import (
    PaddleFulfillmentRequest,
    PaddleFulfillmentResponse,
)


router = APIRouter(prefix="/api/internal/payments", tags=["internal-payments"])


def _require_internal_secret(supplied_secret: str) -> None:
    configured_secret = os.environ.get("INNERGEODESSA_INTERNAL_API_SECRET", "")
    if not configured_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Internal payment fulfillment is not configured.",
        )
    if not supplied_secret or not hmac.compare_digest(supplied_secret, configured_secret):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid internal service credential.",
        )


@router.post(
    "/paddle/fulfill",
    response_model=PaddleFulfillmentResponse,
)
def fulfill_paddle_transaction(
    payload: PaddleFulfillmentRequest,
    internal_secret: str = Header(default="", alias="X-InnerGeo-Internal-Secret"),
) -> PaddleFulfillmentResponse:
    _require_internal_secret(internal_secret)

    try:
        with connect() as conn:
            result = fulfill_paddle_payment(conn, payload)
    except ResourceNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error)) from error
    except UnsupportedResourceModuleError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error)) from error
    except InvalidResourceError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(error)) from error
    except FulfillmentConflictError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(error)) from error

    return PaddleFulfillmentResponse(
        status=result.status,
        paymentId=result.payment_id,
        entitlementStatus="unlocked",
    )
