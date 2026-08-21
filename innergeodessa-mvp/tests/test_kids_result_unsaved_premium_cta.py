from pathlib import Path


RESULT_PAGE = (
    Path(__file__).resolve().parents[2]
    / "src"
    / "app"
    / "kids"
    / "result"
    / "[sessionId]"
    / "page.tsx"
)


def _read_unsaved_premium_cta() -> str:
    source = RESULT_PAGE.read_text(encoding="utf-8")

    end = source.index(
        '<div id="kids-save-result">'
    )

    start = source.rfind(
        ') : (',
        0,
        end,
    )

    if start == -1:
        raise AssertionError(
            "Unable to locate unsaved Kids premium CTA."
        )

    return source[start:end]


def test_unsaved_kids_premium_cta_is_real_link():
    cta = _read_unsaved_premium_cta()

    assert "<a" in cta, (
        "Unsaved Kids premium CTA must be a real link."
    )

    assert 'href="#kids-save-result"' in cta, (
        "Unsaved Kids premium CTA must link to the save section."
    )

    assert "<button" not in cta, (
        "Unsaved Kids premium CTA must not remain a JS-only button."
    )


def test_unsaved_kids_premium_cta_shows_prices():
    cta = _read_unsaved_premium_cta()

    assert "$7.99" in cta
    assert "$8.99" in cta
