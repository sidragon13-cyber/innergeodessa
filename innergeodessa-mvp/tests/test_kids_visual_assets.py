import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]

K68_JSON = (
    REPO_ROOT
    / "innergeodessa-mvp"
    / "backend"
    / "data"
    / "kids-k68-items.json"
)

PUBLIC_ROOT = REPO_ROOT / "public"


NEW_VISUAL_SUPPORT = {
    "K68-CONNECT-01": "helpful",
    "K68-DISCOVER-02": "helpful",
    "K68-CONNECT-02": "helpful",
    "K68-LEAD-02": "helpful",
    "K68-CREATE-02": "helpful",
    "K68-THINK-03": "required",
    "K68-CONNECT-05": "helpful",
    "K68-LEAD-05": "helpful",
    "K68-EXPRESS-05": "helpful",
    "K68-DISCOVER-04": "helpful",
}


def test_k68_all_32_release_items_have_valid_visual_assets():
    items = json.loads(
        K68_JSON.read_text(encoding="utf-8")
    )

    assert len(items) == 32

    orders = [
        item["master_order"]
        for item in items
    ]
    assert orders == list(range(1, 33))

    for item in items:
        source_id = item["source_item_id"]
        support = item["visual_support"]
        master = item["master_asset_path"]
        display = item["display_asset_path"]

        assert support in {
            "required",
            "helpful",
        }, (
            f"{source_id}: visual_support={support!r}"
        )

        assert master, (
            f"{source_id}: master_asset_path missing"
        )

        assert display, (
            f"{source_id}: display_asset_path missing"
        )

        assert master == display, (
            f"{source_id}: K68 master/display "
            "paths must currently match"
        )

        expected_name = f"{source_id}-v1.png"

        assert Path(master).name == expected_name
        assert Path(display).name == expected_name

        expected_prefix = (
            "/assets/kids/k68/"
            f"{support}/"
        )

        assert master.startswith(
            expected_prefix
        ), (
            f"{source_id}: unexpected path "
            f"{master}"
        )

        disk_path = (
            PUBLIC_ROOT
            / master.removeprefix("/")
            .removeprefix("assets/")
        )

        # Public URL /assets/... maps to
        # repo public/assets/...
        disk_path = (
            PUBLIC_ROOT
            / master.lstrip("/")
        )

        assert disk_path.is_file(), (
            f"{source_id}: asset not found "
            f"at {disk_path}"
        )

    by_id = {
        item["source_item_id"]: item
        for item in items
    }

    for source_id, expected_support in (
        NEW_VISUAL_SUPPORT.items()
    ):
        assert (
            by_id[source_id]["visual_support"]
            == expected_support
        ), (
            f"{source_id}: expected "
            f"{expected_support}"
        )
