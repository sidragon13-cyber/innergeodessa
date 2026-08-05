from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable, Mapping

DIMENSIONS = {
    "EI": ("E", "I"),
    "SN": ("S", "N"),
    "TF": ("T", "F"),
    "JP": ("J", "P"),
}

TIE_RULE = (
    "A zero score resolves to the first pole and must be "
    "reported as low differentiation."
)

@dataclass(frozen=True)
class Item:
    item_id: str
    dimension: str
    key: str

def score_assessment(
    items: Iterable[Item],
    responses: Mapping[str, int],
    *,
    require_balanced_poles: bool = True,
) -> dict:
    item_list = list(items)
    _validate_items(item_list, require_balanced_poles)
    _validate_responses(item_list, responses)

    signed = {dimension: 0 for dimension in DIMENSIONS}
    answered = {dimension: 0 for dimension in DIMENSIONS}

    for item in item_list:
        raw = responses[item.item_id]

        first, second = DIMENSIONS[item.dimension]
        contribution = raw - 3 if item.key == first else 3 - raw
        signed[item.dimension] += contribution
        answered[item.dimension] += 1

    letters = []
    confidence = {}
    for dimension, (first, second) in DIMENSIONS.items():
        value = signed[dimension]
        letters.append(first if value >= 0 else second)
        max_abs = answered[dimension] * 2
        confidence[dimension] = round(abs(value) / max_abs, 4) if max_abs else 0.0

    return {
        "type": "".join(letters),
        "scores": signed,
        "confidence": confidence,
        "answered": answered,
        "tie_rule": TIE_RULE,
    }


def _validate_items(
    items: list[Item],
    require_balanced_poles: bool,
) -> None:
    item_ids: set[str] = set()

    for item in items:
        if not item.item_id:
            raise ValueError("item_id must not be empty")
        if item.item_id in item_ids:
            raise ValueError(f"Duplicate item_id: {item.item_id}")
        item_ids.add(item.item_id)

    if len(items) != 72:
        raise ValueError(
            f"Personality assessment must contain exactly 72 items; found {len(items)}"
        )

    pole_counts = {
        dimension: {first: 0, second: 0}
        for dimension, (first, second) in DIMENSIONS.items()
    }

    for item in items:
        if item.dimension not in DIMENSIONS:
            raise ValueError(f"Unsupported dimension: {item.dimension}")

        first, second = DIMENSIONS[item.dimension]
        if item.key not in (first, second):
            raise ValueError(
                f"Invalid key {item.key} for dimension {item.dimension}; "
                f"expected {first} or {second}"
            )

        pole_counts[item.dimension][item.key] += 1

    for dimension, (first, second) in DIMENSIONS.items():
        first_count = pole_counts[dimension][first]
        second_count = pole_counts[dimension][second]
        dimension_total = first_count + second_count
        if dimension_total != 18:
            raise ValueError(
                f"{dimension} must contain exactly 18 items; "
                f"found {dimension_total}"
            )
        if (
            require_balanced_poles
            and (first_count != 9 or second_count != 9)
        ):
            raise ValueError(
                f"{dimension} must contain 9 {first} and 9 {second} items; "
                f"found {first_count} and {second_count}"
            )


def _validate_responses(
    items: list[Item],
    responses: Mapping[str, int],
) -> None:
    item_ids = {item.item_id for item in items}
    response_ids = set(responses)

    unknown = sorted(response_ids - item_ids)
    if unknown:
        raise ValueError(f"Unknown response item: {unknown[0]}")

    missing = sorted(item_ids - response_ids)
    if missing:
        raise ValueError(f"Missing response for {missing[0]}")

    for item in items:
        raw = responses[item.item_id]
        if type(raw) is not int or raw not in (1, 2, 3, 4, 5):
            raise ValueError(
                f"Response for {item.item_id} must be an integer from 1-5"
            )
