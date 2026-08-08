from __future__ import annotations

import json
import os
from urllib import error, parse, request


RESEND_EMAIL_ENDPOINT = "https://api.resend.com/emails"


class EmailDeliveryError(RuntimeError):
    pass


def _configuration() -> tuple[str, str, str] | None:
    api_key = os.getenv("INNERGEO_EMAIL_API_KEY", "").strip()
    sender = os.getenv("INNERGEO_EMAIL_SENDER", "").strip()
    public_url = os.getenv("INNERGEO_PUBLIC_APP_URL", "").strip().rstrip("/")
    environment = os.getenv("INNERGEO_ENV", "development").casefold()

    if environment in {"test", "testing"} and not (api_key or sender or public_url):
        return None
    if not api_key or not sender or not public_url:
        raise EmailDeliveryError("Transactional email is not configured.")

    parsed_url = parse.urlparse(public_url)
    if not parsed_url.netloc or parsed_url.scheme not in {"http", "https"}:
        raise EmailDeliveryError("The public application URL is invalid.")
    if environment == "production" and parsed_url.scheme != "https":
        raise EmailDeliveryError("Production email links require HTTPS.")
    return api_key, sender, public_url


def _send(*, email: str, subject: str, text: str, html: str) -> None:
    configured = _configuration()
    if configured is None:
        return
    api_key, sender, _public_url = configured
    body = json.dumps(
        {
            "from": sender,
            "to": [email],
            "subject": subject,
            "text": text,
            "html": html,
        }
    ).encode("utf-8")
    outbound = request.Request(
        RESEND_EMAIL_ENDPOINT,
        data=body,
        method="POST",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "InnerGeo/1.0",
        },
    )
    try:
        with request.urlopen(outbound, timeout=10) as response:
            if not 200 <= response.status < 300:
                raise EmailDeliveryError("Transactional email delivery failed.")
    except (error.HTTPError, error.URLError, TimeoutError, OSError) as exc:
        raise EmailDeliveryError("Transactional email delivery failed.") from exc


def _link(path: str, token: str) -> str:
    configured = _configuration()
    if configured is None:
        return f"http://testserver{path}?{parse.urlencode({'token': token})}"
    return f"{configured[2]}{path}?{parse.urlencode({'token': token})}"


def send_verification_email(*, email: str, token: str) -> None:
    link = _link("/account/verify-email", token)
    _send(
        email=email,
        subject="Verify your InnerGeo email",
        text=f"Verify your InnerGeo email by opening this link: {link}",
        html=(
            "<p>Verify your InnerGeo email by opening the secure link below.</p>"
            f'<p><a href="{link}">Verify email</a></p>'
        ),
    )


def send_password_reset_email(*, email: str, token: str) -> None:
    link = _link("/account/reset-password", token)
    _send(
        email=email,
        subject="Reset your InnerGeo password",
        text=f"Reset your InnerGeo password by opening this link: {link}",
        html=(
            "<p>Reset your InnerGeo password by opening the secure link below.</p>"
            f'<p><a href="{link}">Reset password</a></p>'
        ),
    )
