from __future__ import annotations

from datetime import datetime, timedelta, timezone
import base64
import ctypes
import ctypes.util
import hashlib
import hmac
import os
import secrets
from typing import Optional


COOKIE_NAME = "innergeo_session"
SESSION_DURATION = timedelta(days=30)
VERIFICATION_TOKEN_DURATION = timedelta(days=1)
PASSWORD_RESET_TOKEN_DURATION = timedelta(hours=1)
AUTH_EMAIL_REQUEST_COOLDOWN = timedelta(minutes=2)
SESSION_MAX_AGE_SECONDS = int(SESSION_DURATION.total_seconds())

SCRYPT_N = 2 ** 14
SCRYPT_R = 8
SCRYPT_P = 1
SCRYPT_DKLEN = 32


def normalize_email(email: str) -> str:
    return email.strip().casefold()


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = _derive_scrypt(
        password.encode("utf-8"),
        salt=salt,
        n=SCRYPT_N,
        r=SCRYPT_R,
        p=SCRYPT_P,
        dklen=SCRYPT_DKLEN,
    )
    salt_encoded = base64.urlsafe_b64encode(salt).decode("ascii")
    digest_encoded = base64.urlsafe_b64encode(digest).decode("ascii")
    return (
        f"scrypt$n={SCRYPT_N},r={SCRYPT_R},p={SCRYPT_P},"
        f"dklen={SCRYPT_DKLEN}${salt_encoded}${digest_encoded}"
    )


def verify_password(password: str, encoded_hash: Optional[str]) -> bool:
    if not encoded_hash:
        return False
    try:
        algorithm, parameters, salt_encoded, digest_encoded = (
            encoded_hash.split("$", maxsplit=3)
        )
        if algorithm != "scrypt":
            return False
        parsed = {
            key: int(value)
            for key, value in (
                item.split("=", maxsplit=1)
                for item in parameters.split(",")
            )
        }
        if parsed != {
            "n": SCRYPT_N,
            "r": SCRYPT_R,
            "p": SCRYPT_P,
            "dklen": SCRYPT_DKLEN,
        }:
            return False
        salt = base64.urlsafe_b64decode(salt_encoded.encode("ascii"))
        expected = base64.urlsafe_b64decode(
            digest_encoded.encode("ascii")
        )
        actual = _derive_scrypt(
            password.encode("utf-8"),
            salt=salt,
            n=parsed["n"],
            r=parsed["r"],
            p=parsed["p"],
            dklen=parsed["dklen"],
        )
    except (KeyError, TypeError, ValueError):
        return False
    return hmac.compare_digest(actual, expected)


def generate_token() -> str:
    return secrets.token_urlsafe(32)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def parse_utc(value: str) -> datetime:
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def auth_test_mode_enabled() -> bool:
    environment = os.getenv("INNERGEO_ENV", "development").casefold()
    return environment in {"test", "testing"} and _environment_flag(
        "INNERGEO_AUTH_TEST_MODE",
        default=False,
    )


def cookie_secure_enabled() -> bool:
    environment_default = (
        os.getenv("INNERGEO_ENV", "development").casefold()
        == "production"
    )
    configured = os.getenv("INNERGEO_COOKIE_SECURE")
    if configured is not None:
        return _parse_boolean(configured, default=environment_default)
    return environment_default


def cookie_options() -> dict:
    return {
        "key": COOKIE_NAME,
        "httponly": True,
        "secure": cookie_secure_enabled(),
        "samesite": "lax",
        "path": "/",
    }


def _environment_flag(name: str, default: bool) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return _parse_boolean(value, default=default)


def _parse_boolean(value: str, default: bool) -> bool:
    normalized = value.strip().casefold()
    if normalized in {"1", "true", "yes", "on"}:
        return True
    if normalized in {"0", "false", "no", "off"}:
        return False
    return default


def _derive_scrypt(
    password: bytes,
    *,
    salt: bytes,
    n: int,
    r: int,
    p: int,
    dklen: int,
) -> bytes:
    hashlib_scrypt = getattr(hashlib, "scrypt", None)
    if hashlib_scrypt is not None:
        return hashlib_scrypt(
            password,
            salt=salt,
            n=n,
            r=r,
            p=p,
            dklen=dklen,
        )

    library_path = ctypes.util.find_library("crypto")
    if not library_path:
        raise RuntimeError("A standard-library compatible scrypt backend is required")

    crypto = ctypes.CDLL(library_path)
    derive = crypto.EVP_PBE_scrypt
    derive.argtypes = (
        ctypes.c_char_p,
        ctypes.c_size_t,
        ctypes.c_char_p,
        ctypes.c_size_t,
        ctypes.c_uint64,
        ctypes.c_uint64,
        ctypes.c_uint64,
        ctypes.c_uint64,
        ctypes.POINTER(ctypes.c_ubyte),
        ctypes.c_size_t,
    )
    derive.restype = ctypes.c_int

    output = (ctypes.c_ubyte * dklen)()
    result = derive(
        password,
        len(password),
        salt,
        len(salt),
        n,
        r,
        p,
        0,
        output,
        dklen,
    )
    if result != 1:
        raise RuntimeError("The system scrypt backend failed")
    return bytes(output)
