from __future__ import annotations

import re
from typing import Optional

from pydantic import BaseModel, Field, field_validator


EMAIL_PATTERN = re.compile(
    r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
)


def _validated_email(value: str) -> str:
    trimmed = value.strip()
    if len(trimmed) > 254 or not EMAIL_PATTERN.fullmatch(trimmed):
        raise ValueError("A valid email address is required.")
    return trimmed


class RegisterRequest(BaseModel):
    email: str
    nickname: str
    password: str = Field(min_length=10, max_length=128)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        return _validated_email(value)

    @field_validator("nickname")
    @classmethod
    def validate_nickname(cls, value: str) -> str:
        trimmed = value.strip()
        if not 2 <= len(trimmed) <= 40:
            raise ValueError("Nickname must contain 2 to 40 characters.")
        return trimmed


class VerifyEmailRequest(BaseModel):
    token: str = Field(min_length=1, max_length=512)


class LoginRequest(BaseModel):
    email: str
    password: str = Field(min_length=1, max_length=128)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        return _validated_email(value)


class AuthUserResponse(BaseModel):
    userId: str
    email: str
    nickname: str
    emailVerified: bool
    status: str
    createdAt: str


class RegisterResponse(BaseModel):
    user: AuthUserResponse
    verificationToken: Optional[str] = None


class LoginResponse(BaseModel):
    user: AuthUserResponse
