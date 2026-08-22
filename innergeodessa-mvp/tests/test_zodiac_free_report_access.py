from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]

ACCOUNT_ROUTER = (
    ROOT
    / "innergeodessa-mvp"
    / "backend"
    / "app"
    / "routers"
    / "account.py"
)

ZODIAC_RESULT = (
    ROOT
    / "src"
    / "app"
    / "zodiac"
    / "result"
    / "[chartId]"
    / "page.tsx"
)

PRICING = (
    ROOT
    / "src"
    / "app"
    / "pricing"
    / "page.tsx"
)


ZODIAC_REPORT = (
    ROOT
    / "src"
    / "app"
    / "zodiac"
    / "report"
    / "[chartId]"
    / "page.tsx"
)


def test_zodiac_full_report_is_free_for_verified_chart_owner():
    source = ACCOUNT_ROUTER.read_text()

    assert 'module == "zodiac"' in source

    assert (
        'canViewFullReport=True'
        in source
        or 'can_view_full_report = True'
        in source
    )


def test_zodiac_result_has_no_paddle_checkout():
    source = ZODIAC_RESULT.read_text()

    assert "PaddleCheckoutButton" not in source
    assert "Buy Full Zodiac Report" not in source
    assert "购买完整星座报告" not in source
    assert "$9.99" not in source


def test_pricing_marks_zodiac_as_free():
    source = PRICING.read_text()

    assert "Zodiac Premium Report: USD $9.99" not in source
    assert "星座完整报告：USD $9.99" not in source

    assert (
        "Zodiac" in source
        and "Free" in source
    )


def test_zodiac_report_has_no_paid_unlock_copy():
    source = ZODIAC_REPORT.read_text()

    forbidden = (
        "Premium zodiac report",
        "高级星座报告",
        "Your full zodiac report is not unlocked yet",
        "完整星座报告尚未解锁",
        "After purchasing the full report",
        "购买完整星座报告后",
        "Back to result and purchase report",
        "返回结果并购买完整报告",
    )

    for phrase in forbidden:
        assert phrase not in source

    assert '"locked"' not in source
