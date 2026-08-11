# InnerGeo Kids — Gate 15A Items Read V1

**Status:** Implemented — Verification Pending

**Foundation Checkpoint:** `ddee5369478256b0d589d2df7bd802876ca4f763`

**K68 Release:** `KIDS-K68-RF-V1`

**K912 Release:** `KIDS-K912-RF-V1`

**Response Contract:** `KIDS-RESPONSE-V1`

**Scoring Version:** `KIDS-SCORING-V1`

---

## Scope

Gate 15A enables read-only retrieval of the frozen Kids session question snapshot through:

`GET /api/sessions/{session_id}/items`

This gate does not enable Kids answer persistence, completion, scoring, results, payment, or production frontend integration.

---

## Snapshot Source

Kids items must be read from:

`kids_session_question_items`

joined to:

`kids_question_items`

The master bank must not be queried as an unsnapshotted assessment source.

Returned ordering is determined by:

`kids_session_question_items.display_order`

---

## Response Fields

Each Kids item exposes:

- `item_id`
- `form`
- `domain`
- `wording_en`
- `wording_zh`
- `visual_support`
- `visual_asset_path`
- `master_order`
- `question_bank_version`

The public item response does not expose:

- database `item_record_id`
- `master_asset_path`
- `scoring_version`

`visual_asset_path` is sourced from the frozen item's `display_asset_path`.

For `visual_support = none`, `visual_asset_path` must be null.

---

## Form / Release Isolation

The session snapshot read must remain constrained by the session's:

- `form`
- `question_bank_version`

K68 sessions may only return `k68 / KIDS-K68-RF-V1` items.

K912 sessions may only return `k912 / KIDS-K912-RF-V1` items.

---

## Expected Counts

K68:

`32`

K912:

`40`

Existing regressions:

Personality:

`72`

RIASEC:

`36`

---

## Gate Boundary

After Gate 15A:

- Kids session start: enabled
- Kids snapshot creation: enabled
- Kids items read: enabled
- Kids answers: still locked
- Kids completion: still locked
- Kids result/scoring: still locked
- Payment V1: untouched
