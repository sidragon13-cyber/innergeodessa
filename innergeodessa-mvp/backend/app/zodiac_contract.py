from __future__ import annotations

from datetime import datetime
import json
from typing import Any, Dict, Tuple


MAX_ZODIAC_RESULT_BYTES = 256_000

_REQUIRED_PLANETS = (
    "sun",
    "moon",
    "mercury",
    "venus",
    "mars",
)

_REQUIRED_ANGLES = (
    "ascendant",
    "descendant",
    "midheaven",
    "imumCoeli",
)


def _is_object(value: Any) -> bool:
    return isinstance(value, dict)


def _is_number(value: Any) -> bool:
    return (
        isinstance(value, (int, float))
        and not isinstance(value, bool)
    )


def _valid_iso_datetime(value: Any) -> bool:
    if not isinstance(value, str) or not value.strip():
        return False

    try:
        datetime.fromisoformat(
            value.replace("Z", "+00:00")
        )
    except ValueError:
        return False

    return True


def _valid_zodiac_position(value: Any) -> bool:
    return (
        _is_object(value)
        and isinstance(value.get("sign"), str)
        and bool(value["sign"].strip())
        and _is_number(value.get("absoluteLongitude"))
        and _is_number(value.get("degree"))
        and _is_number(value.get("minute"))
        and _is_number(value.get("second"))
    )


def _valid_planet(value: Any) -> bool:
    return (
        _is_object(value)
        and isinstance(value.get("body"), str)
        and _is_object(value.get("ecliptic"))
        and _valid_zodiac_position(value.get("zodiac"))
        and isinstance(value.get("retrograde"), bool)
    )


def _valid_angle(value: Any, expected_point: str) -> bool:
    return (
        _is_object(value)
        and value.get("point") == expected_point
        and _valid_zodiac_position(value.get("zodiac"))
    )


def validate_and_serialize_zodiac_result(
    value: Any,
) -> Tuple[str, str, str]:
    if not _is_object(value):
        raise ValueError(
            "The zodiac result must be a JSON object."
        )

    if value.get("schemaVersion") != "1.0.0":
        raise ValueError(
            "The zodiac result schema version is unsupported."
        )

    if value.get("module") != "zodiac":
        raise ValueError(
            "The zodiac result module is invalid."
        )

    if value.get("calculationType") != "natal-chart":
        raise ValueError(
            "The zodiac calculation type is invalid."
        )

    calculated_at = value.get("calculatedAt")

    if not _valid_iso_datetime(calculated_at):
        raise ValueError(
            "The zodiac calculation timestamp is invalid."
        )

    input_data = value.get("input")
    planets = value.get("planets")
    angles = value.get("angles")
    engine = value.get("engine")
    limitations = value.get("limitations")

    if not _is_object(input_data):
        raise ValueError(
            "The zodiac birth input is missing."
        )

    if not isinstance(
        input_data.get("localDateTime"),
        str,
    ):
        raise ValueError(
            "The zodiac local date and time is invalid."
        )

    if not _is_object(planets):
        raise ValueError(
            "The zodiac planetary positions are missing."
        )

    for planet in _REQUIRED_PLANETS:
        if not _valid_planet(planets.get(planet)):
            raise ValueError(
                f"The zodiac {planet} position is invalid."
            )

    if not _is_object(angles):
        raise ValueError(
            "The zodiac chart angles are missing."
        )

    expected_angle_points = {
        "ascendant": "ascendant",
        "descendant": "descendant",
        "midheaven": "midheaven",
        "imumCoeli": "imum-coeli",
    }

    for key in _REQUIRED_ANGLES:
        if not _valid_angle(
            angles.get(key),
            expected_angle_points[key],
        ):
            raise ValueError(
                f"The zodiac {key} angle is invalid."
            )

    if (
        not _is_object(engine)
        or not isinstance(engine.get("name"), str)
        or not isinstance(engine.get("version"), str)
        or not isinstance(engine.get("ephemeris"), str)
    ):
        raise ValueError(
            "The zodiac calculation engine is invalid."
        )

    if not isinstance(limitations, list):
        raise ValueError(
            "The zodiac limitations field is invalid."
        )

    serialized = json.dumps(
        value,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
        allow_nan=False,
    )

    if len(serialized.encode("utf-8")) > MAX_ZODIAC_RESULT_BYTES:
        raise ValueError(
            "The zodiac result is too large."
        )

    return (
        serialized,
        str(value["schemaVersion"]),
        str(calculated_at),
    )
