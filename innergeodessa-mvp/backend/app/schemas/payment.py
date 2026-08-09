from __future__ import annotations

from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


class PaddleFulfillmentRequest(BaseModel):
    providerEventId: str = Field(min_length=1, max_length=128)
    providerTransactionId: str = Field(min_length=1, max_length=128)
    module: Literal["personality", "career", "zodiac"]
    resourceId: str = Field(min_length=1, max_length=128)
    productCode: Literal[
        "personality-premium-report-v1",
        "career-premium-report-v1",
        "zodiac-premium-report-v1",
    ]
    providerPriceId: Optional[str] = Field(default=None, max_length=128)
    currency: str = Field(min_length=3, max_length=3)
    amount: int = Field(ge=0)
    taxAmount: int = Field(ge=0)
    completedAt: datetime


class PaddleFulfillmentResponse(BaseModel):
    status: Literal["fulfilled", "already_fulfilled"]
    paymentId: str
    entitlementStatus: Literal["unlocked"]
