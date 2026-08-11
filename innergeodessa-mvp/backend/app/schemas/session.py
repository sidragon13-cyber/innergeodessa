from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, Field, StrictInt


class StartRequest(BaseModel):
    consent: bool
    language: str = "en"
    module: Optional[str] = None
    form: Optional[str] = None


class AnswerRequest(BaseModel):
    item_id: str
    value: StrictInt = Field(ge=1, le=5)
    response_time_ms: Optional[int] = Field(default=None, ge=0)
