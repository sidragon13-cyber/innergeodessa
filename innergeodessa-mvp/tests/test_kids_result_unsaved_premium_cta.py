from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]

RESULT_PAGE = (
    ROOT
    / "src"
    / "app"
    / "kids"
    / "result"
    / "[sessionId]"
    / "page.tsx"
)

SAVE_COMPONENT = (
    ROOT
    / "src"
    / "components"
    / "account"
    / "save-assessment-result.tsx"
)


def test_save_component_exposes_imperative_save_handle():
    source = SAVE_COMPONENT.read_text(encoding="utf-8")

    assert "forwardRef" in source, (
        "SaveAssessmentResult must expose a ref handle "
        "so the parent CTA can trigger the real save action."
    )

    assert "useImperativeHandle" in source, (
        "SaveAssessmentResult must expose saveResult "
        "through an imperative handle."
    )

    assert "save:" in source, (
        "The imperative handle must expose a save action."
    )


def test_kids_result_uses_real_save_handle():
    source = RESULT_PAGE.read_text(encoding="utf-8")

    assert "saveResultRef" in source, (
        "Kids result page must hold a ref to SaveAssessmentResult."
    )

    assert "saveResultRef.current?.save()" in source, (
        "Unsaved premium CTA must call the real save action."
    )

    assert 'href="#kids-save-result"' not in source, (
        "The old anchor-only workaround must be removed."
    )


def test_prices_remain_visible_before_save():
    source = RESULT_PAGE.read_text(encoding="utf-8")

    assert "$7.99" in source
    assert "$8.99" in source
