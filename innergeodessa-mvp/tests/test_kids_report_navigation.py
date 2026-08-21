from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]

K68_DOCUMENT = (
    ROOT
    / "src"
    / "app"
    / "kids"
    / "report"
    / "[sessionId]"
    / "professional-report-document.tsx"
)

K912_DOCUMENT = (
    ROOT
    / "src"
    / "app"
    / "kids"
    / "report"
    / "[sessionId]"
    / "k912-professional-report-document.tsx"
)


def test_k68_full_report_has_standard_bottom_navigation():
    source = K68_DOCUMENT.read_text(encoding="utf-8")

    assert "ReportNavigation" in source, (
        "K68 full report must use the shared report navigation."
    )

    assert "/kids/result/" in source, (
        "K68 navigation must return to the free Kids result."
    )

    assert 'href: "/kids"' in source, (
        "K68 navigation must link to the Kids overview."
    )


def test_k912_full_report_has_standard_bottom_navigation():
    source = K912_DOCUMENT.read_text(encoding="utf-8")

    assert "ReportNavigation" in source, (
        "K912 full report must use the shared report navigation."
    )

    assert "/kids/result/" in source, (
        "K912 navigation must return to the free Kids result."
    )

    assert 'href: "/kids"' in source, (
        "K912 navigation must link to the Kids overview."
    )


def test_kids_navigation_has_bilingual_labels():
    k68 = K68_DOCUMENT.read_text(encoding="utf-8")
    k912 = K912_DOCUMENT.read_text(encoding="utf-8")

    for source in (k68, k912):
        assert "Back to free result" in source
        assert "Kids overview" in source
        assert "返回免费结果" in source
        assert "儿童测评首页" in source
