from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

TERMS = ROOT / "src/app/terms/page.tsx"
CONTACT = ROOT / "src/app/contact/page.tsx"
PRICING = ROOT / "src/app/pricing/page.tsx"
PRIVACY = ROOT / "src/app/privacy/page.tsx"


def test_business_identity_and_support_are_public():
    terms = TERMS.read_text()
    contact = CONTACT.read_text()

    assert "Kylin International Trading (Pty) Ltd" in terms
    assert "Kylin International Trading (Pty) Ltd" in contact
    assert "support@innergeo.app" in contact
    assert "+27 74 049 9999" in contact
    assert "tel:+27740499999" in contact


def test_paddle_merchant_of_record_language_is_present():
    terms = TERMS.read_text()

    assert "Paddle.com" in terms
    assert "Merchant of Record" in terms
    assert "seller of record" in terms


def test_live_paid_products_are_not_described_as_upcoming():
    pricing = PRICING.read_text()
    privacy = PRIVACY.read_text()
    terms = TERMS.read_text()

    forbidden = (
        "upcoming premium digital reports",
        "Premium reports and additional paid services will be introduced",
        "future paid services",
        "未来付费服务",
    )

    for phrase in forbidden:
        assert phrase not in pricing
        assert phrase not in privacy
        assert phrase not in terms


def test_current_pricing_and_free_zodiac_are_explicit():
    pricing = PRICING.read_text()

    assert "Personality Premium Report: USD $7.99" in pricing
    assert "Career Premium Report: USD $9.99" in pricing
    assert "Zodiac full report is free" in pricing
    assert "Zodiac Premium Report: USD $9.99" not in pricing
