import json
from pathlib import Path
import sys

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))
from app.scoring import DIMENSIONS, Item, score_assessment

DATA = Path(__file__).resolve().parents[1] / "backend" / "data" / "items.json"
items_json = json.loads(DATA.read_text(encoding="utf-8"))
items = [Item(x["item_id"], x["dimension"], x["key"]) for x in items_json]


def responses_for(value):
    return {item.item_id: value for item in items}


def responses_for_pole(use_first):
    responses = {}
    for item in items:
        first, second = DIMENSIONS[item.dimension]
        wants_high = item.key == (first if use_first else second)
        responses[item.item_id] = 5 if wants_high else 1
    return responses


def test_neutral_tie_rule():
    result = score_assessment(items, responses_for(3))
    assert result["type"] == "ESTJ"
    assert result["scores"] == {"EI": 0, "SN": 0, "TF": 0, "JP": 0}
    assert result["confidence"] == {
        "EI": 0.0,
        "SN": 0.0,
        "TF": 0.0,
        "JP": 0.0,
    }


def test_balanced_bank_all_agree_and_disagree_tie():
    assert score_assessment(items, responses_for(5))["type"] == "ESTJ"
    assert score_assessment(items, responses_for(1))["type"] == "ESTJ"


def test_maximum_first_and_second_poles():
    first = score_assessment(items, responses_for_pole(True))
    second = score_assessment(items, responses_for_pole(False))

    assert first["type"] == "ESTJ"
    assert first["scores"] == {"EI": 36, "SN": 36, "TF": 36, "JP": 36}
    assert first["confidence"] == {
        "EI": 1.0,
        "SN": 1.0,
        "TF": 1.0,
        "JP": 1.0,
    }

    assert second["type"] == "INFP"
    assert second["scores"] == {
        "EI": -36,
        "SN": -36,
        "TF": -36,
        "JP": -36,
    }
    assert second["confidence"] == {
        "EI": 1.0,
        "SN": 1.0,
        "TF": 1.0,
        "JP": 1.0,
    }


@pytest.mark.parametrize("value", [0, 6, "3", 3.0, True, False])
def test_rejects_invalid_response_values(value):
    responses = responses_for(3)
    responses[items[0].item_id] = value

    with pytest.raises(ValueError):
        score_assessment(items, responses)


def test_rejects_missing_response():
    responses = responses_for(3)
    responses.pop(items[0].item_id)

    with pytest.raises(ValueError, match="Missing response"):
        score_assessment(items, responses)


def test_rejects_unknown_response_item():
    responses = responses_for(3)
    responses["UNKNOWN"] = 3

    with pytest.raises(ValueError, match="Unknown response item"):
        score_assessment(items, responses)


def test_rejects_duplicate_item_id():
    with pytest.raises(ValueError, match="Duplicate item_id"):
        score_assessment([*items, items[0]], responses_for(3))


def test_rejects_unknown_dimension():
    malformed = [
        Item(items[0].item_id, "XX", items[0].key),
        *items[1:],
    ]

    with pytest.raises(ValueError, match="Unsupported dimension"):
        score_assessment(malformed, responses_for(3))


def test_rejects_key_that_does_not_match_dimension():
    malformed = [
        Item(items[0].item_id, items[0].dimension, "S"),
        *items[1:],
    ]

    with pytest.raises(ValueError, match="Invalid key"):
        score_assessment(malformed, responses_for(3))


def test_rejects_wrong_question_count():
    with pytest.raises(ValueError, match="exactly 72"):
        score_assessment(items[:-1], responses_for(3))


def test_rejects_wrong_dimension_or_pole_distribution():
    first_ei_index = next(
        index
        for index, item in enumerate(items)
        if item.dimension == "EI" and item.key == "E"
    )
    malformed = list(items)
    original = malformed[first_ei_index]
    malformed[first_ei_index] = Item(
        original.item_id,
        original.dimension,
        "I",
    )

    with pytest.raises(ValueError, match="9 E and 9 I"):
        score_assessment(malformed, responses_for(3))


def test_answered_counts_and_confidence_range():
    result = score_assessment(items, responses_for_pole(True))

    assert result["answered"] == {
        "EI": 18,
        "SN": 18,
        "TF": 18,
        "JP": 18,
    }
    assert all(0.0 <= value <= 1.0 for value in result["confidence"].values())
