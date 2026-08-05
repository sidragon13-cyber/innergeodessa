from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class ClaimSessionRequest(BaseModel):
    sessionId: str = Field(min_length=1, max_length=128)
    claimSecret: str = Field(min_length=32, max_length=512)


class ClaimedAssessmentResponse(BaseModel):
    resourceId: str
    module: Literal["personality", "career"]
    status: Literal["saved"]
    claimedAt: str


class SaveZodiacChartRequest(BaseModel):
    chartId: str = Field(min_length=1, max_length=128)
    result: dict


class SavedZodiacChartResponse(BaseModel):
    resourceId: str
    module: Literal["zodiac"]
    status: Literal["saved"]
    savedAt: str
