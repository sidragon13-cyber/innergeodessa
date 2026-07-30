from __future__ import annotations

from dataclasses import dataclass
from math import floor
from typing import Iterable, Mapping


RIASEC_DIMENSIONS = ("R", "I", "A", "S", "E", "C")
EXPECTED_ITEM_COUNT = 36
ITEMS_PER_DIMENSION = 6


@dataclass(frozen=True)
class RiasecItem:
    item_id: str
    dimension: str
    order: int


def score_riasec(
    items: Iterable[RiasecItem],
    responses: Mapping[str, int],
) -> dict:
    item_list = list(items)
    _validate_items(item_list)
    _validate_responses(item_list, responses)

    scores = {dimension: 0 for dimension in RIASEC_DIMENSIONS}
    answered = {dimension: 0 for dimension in RIASEC_DIMENSIONS}

    for item in item_list:
        scores[item.dimension] += responses[item.item_id]
        answered[item.dimension] += 1

    percentages = {
        dimension: _round_like_javascript(
            ((scores[dimension] - ITEMS_PER_DIMENSION) / 24) * 100
        )
        for dimension in RIASEC_DIMENSIONS
    }
    dimension_order = {
        dimension: index
        for index, dimension in enumerate(RIASEC_DIMENSIONS)
    }
    ranking = sorted(
        RIASEC_DIMENSIONS,
        key=lambda dimension: (
            -scores[dimension],
            dimension_order[dimension],
        ),
    )

    return {
        "code": "".join(ranking[:3]),
        "scores": scores,
        "percentages": percentages,
        "ranking": ranking,
        "answered": answered,
    }


def _round_like_javascript(value: float) -> int:
    return floor(value + 0.5)


def _validate_items(items: list[RiasecItem]) -> None:
    if len(items) != EXPECTED_ITEM_COUNT:
        raise ValueError(
            "RIASEC assessment must contain exactly "
            f"{EXPECTED_ITEM_COUNT} items; found {len(items)}"
        )

    item_ids: set[str] = set()
    orders: set[int] = set()
    counts = {dimension: 0 for dimension in RIASEC_DIMENSIONS}

    for item in items:
        if not item.item_id:
            raise ValueError("RIASEC item_id must not be empty")
        if item.item_id in item_ids:
            raise ValueError(f"Duplicate RIASEC item_id: {item.item_id}")
        if item.order in orders:
            raise ValueError(f"Duplicate RIASEC item order: {item.order}")
        if item.dimension not in RIASEC_DIMENSIONS:
            raise ValueError(
                f"Unsupported RIASEC dimension: {item.dimension}"
            )

        item_ids.add(item.item_id)
        orders.add(item.order)
        counts[item.dimension] += 1

    if orders != set(range(1, EXPECTED_ITEM_COUNT + 1)):
        raise ValueError("RIASEC item orders must be continuous from 1 to 36")

    for dimension in RIASEC_DIMENSIONS:
        if counts[dimension] != ITEMS_PER_DIMENSION:
            raise ValueError(
                f"RIASEC dimension {dimension} must contain exactly "
                f"{ITEMS_PER_DIMENSION} items"
            )


def _validate_responses(
    items: list[RiasecItem],
    responses: Mapping[str, int],
) -> None:
    item_ids = {item.item_id for item in items}
    response_ids = set(responses)

    unknown = sorted(response_ids - item_ids)
    if unknown:
        raise ValueError(f"Unknown RIASEC response item: {unknown[0]}")

    missing = sorted(item_ids - response_ids)
    if missing:
        raise ValueError(f"Missing RIASEC response for {missing[0]}")

    for item in items:
        value = responses[item.item_id]
        if type(value) is not int or value not in (1, 2, 3, 4, 5):
            raise ValueError(
                f"Response for {item.item_id} must be an integer from 1-5"
            )
