from __future__ import annotations

import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.scoring import Item, score_assessment


ITEMS_PATH = Path(__file__).resolve().parents[1] / "data" / "items.json"


def main() -> None:
    payload = json.load(sys.stdin)
    assessments = payload.get("assessments")
    if not isinstance(assessments, list):
        raise ValueError("assessments must be a list")

    raw_items = json.loads(ITEMS_PATH.read_text(encoding="utf-8"))
    items = [
        Item(item["item_id"], item["dimension"], item["key"])
        for item in raw_items
    ]
    results = [
        score_assessment(items, responses)
        for responses in assessments
    ]
    json.dump(results, sys.stdout, separators=(",", ":"))


if __name__ == "__main__":
    main()
