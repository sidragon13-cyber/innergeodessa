from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel, Field


class ClaimSessionRequest(BaseModel):
    sessionId: str = Field(min_length=1, max_length=128)
    claimSecret: str = Field(min_length=32, max_length=512)


class ClaimedAssessmentResponse(BaseModel):
    resourceId: str
    module: Literal["personality", "career", "kids"]
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


class PersonalityDashboardItem(BaseModel):
    resourceId: str
    type: str
    createdAt: str
    status: Literal["saved"]


class CareerDashboardItem(BaseModel):
    resourceId: str
    code: str
    createdAt: str
    status: Literal["saved"]


class KidsDashboardItem(BaseModel):
    resourceId: str
    form: str
    createdAt: str
    status: Literal["saved"]


class ZodiacDashboardItem(BaseModel):
    resourceId: str
    createdAt: str
    calculatedAt: str
    schemaVersion: str
    status: Literal["saved"]


class AccountDashboardResponse(BaseModel):
    personality: list[PersonalityDashboardItem]
    career: list[CareerDashboardItem]
    kids: list[KidsDashboardItem]
    zodiac: list[ZodiacDashboardItem]


class ZodiacChartDetailResponse(BaseModel):
    resourceId: str
    module: Literal["zodiac"]
    result: dict
    savedAt: str


class ReportAccessResponse(BaseModel):
    module: Literal[
        "personality",
        "career",
        "zodiac",
        "kids",
    ]
    resourceId: str
    authenticated: Literal[True]
    emailVerified: Literal[True]
    ownsResource: Literal[True]
    entitlementStatus: Optional[
        Literal[
            "pending",
            "unlocked",
            "revoked",
            "refunded",
        ]
    ]
    canViewFullReport: bool
    canPrint: bool
    canDownloadPdf: bool
