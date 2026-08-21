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


EXPECTED_K68_RELEASE_IDS = (
    "K68-CREATE-01",
    "K68-DISCOVER-01",
    "K68-BUILD-01",
    "K68-THINK-01",
    "K68-CONNECT-01",
    "K68-LEAD-01",
    "K68-MOVE-01",
    "K68-EXPRESS-01",
    "K68-DISCOVER-02",
    "K68-BUILD-02",
    "K68-THINK-02",
    "K68-CONNECT-02",
    "K68-EXPRESS-02",
    "K68-CREATE-02",
    "K68-BUILD-03",
    "K68-THINK-03",
    "K68-CONNECT-03",
    "K68-EXPRESS-03",
    "K68-CREATE-04",
    "K68-DISCOVER-03",
    "K68-THINK-04",
    "K68-LEAD-05",
    "K68-DISCOVER-04",
    "K68-BUILD-06",
    "K68-DISCOVER-06",
    "K68-MOVE-04",
    "K68-BUILD-05",
    "K68-CREATE-06",
    "K68-CONNECT-04",
    "K68-LEAD-03",
)


def test_k68_all_30_release_items_have_valid_runtime_visual_assets():
    items = json.loads(
        K68_JSON.read_text(encoding="utf-8")
    )

    assert len(items) == 30

    source_ids = [
        item["source_item_id"]
        for item in items
    ]

    assert tuple(source_ids) == EXPECTED_K68_RELEASE_IDS
    assert len(set(source_ids)) == 30

    orders = [
        item["master_order"]
        for item in items
    ]

    assert orders == list(range(1, 31))

    v2_display_count = 0

    for item in items:
        source_id = item["source_item_id"]
        support = item["visual_support"]
        master = item["master_asset_path"]
        display = item["display_asset_path"]

        assert (
            item["question_bank_version"]
            == "KIDS-K68-RF-V2"
        )

        assert (
            item["scoring_version"]
            == "KIDS-SCORING-V2"
        )

        assert item["form"] == "k68"

        assert support in {
            "required",
            "helpful",
        }, (
            f"{source_id}: "
            f"visual_support={support!r}"
        )

        assert isinstance(master, str) and master
        assert isinstance(display, str) and display

        assert master.startswith(
            "/assets/kids/k68/"
        ), (
            f"{source_id}: "
            f"unexpected master path {master}"
        )

        assert display.startswith(
            "/assets/kids/k68/"
        ), (
            f"{source_id}: "
            f"unexpected display path {display}"
        )

        # display_asset_path is the runtime asset sent
        # by the Kids session API to the frontend.
        display_disk = (
            PUBLIC_ROOT
            / display.lstrip("/")
        )

        assert display_disk.is_file(), (
            f"{source_id}: "
            f"runtime display asset missing "
            f"at {display_disk}"
        )

        if "/v2/web/" in display:
            v2_display_count += 1

            # RF-V2 keeps a canonical PNG master path
            # as metadata, while runtime delivery uses
            # the optimized WebP display asset.
            expected_master = (
                "/assets/kids/k68/v2/"
                f"{source_id}-v2.png"
            )

            expected_display = (
                "/assets/kids/k68/v2/web/"
                f"{source_id}-v2.webp"
            )

            assert master == expected_master
            assert display == expected_display

        else:
            # Legacy visual assets retained by RF-V2
            # use the same public PNG for master/display.
            expected = (
                "/assets/kids/k68/"
                f"{support}/"
                f"{source_id}-v1.png"
            )

            assert master == expected
            assert display == expected

    assert v2_display_count == 17
