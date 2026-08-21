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


def _read_unsaved_premium_button() -> str:
    source = RESULT_PAGE.read_text(encoding="utf-8")

    action_anchor = source.index(
        '.getElementById("kids-save-result")'
    )

    start = source.rfind(
        "<button",
        0,
        action_anchor,
    )

    if start == -1:
        raise AssertionError(
            "Unable to locate unsaved Kids premium CTA button."
        )

    end = source.index(
        "</button>",
        action_anchor,
    )

    return source[start:end]


def test_unsaved_kids_premium_cta_is_actionable():
    button = _read_unsaved_premium_button()

    assert "disabled" not in button, (
        "Unsaved Kids premium CTA must not be hard-disabled."
    )

    assert "onClick=" in button, (
        "Unsaved Kids premium CTA must have a click action."
    )


def test_unsaved_kids_premium_cta_shows_k68_price():
    button = _read_unsaved_premium_button()

    assert "$7.99" in button, (
        "K68 price must be visible before the result is saved."
    )


def test_unsaved_kids_premium_cta_shows_k912_price():
    button = _read_unsaved_premium_button()

    assert "$8.99" in button, (
        "K912 price must be visible before the result is saved."
    )


def test_unsaved_kids_premium_cta_targets_save_section():
    button = _read_unsaved_premium_button()

    assert (
        '.getElementById("kids-save-result")'
        in button
    )

    assert "scrollIntoView" in button
