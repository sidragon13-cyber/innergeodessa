# InnerGeo Kids — Gate 15B Answers Persistence V1

**Status:** Implemented — Verification Pending

**Foundation Checkpoint:** `ddee5369478256b0d589d2df7bd802876ca4f763`

**Response Contract:** `KIDS-RESPONSE-V1`

**Scoring Version:** `KIDS-SCORING-V1`

---

## Scope

Gate 15B enables persistence of Kids assessment responses through:

`PUT /api/sessions/{session_id}/answers`

This gate does not enable Kids completion, scoring, result retrieval, payment, or production frontend integration.

---

## K68 Response Contract

K68 accepts only:

`1 / 3 / 5`

K68 must reject:

`2 / 4`

No interpolation, remapping, normalization, or silent conversion is allowed.

---

## K912 Response Contract

K912 accepts:

`1 / 2 / 3 / 4 / 5`

---

## Persistence

Responses are written to:

`kids_session_responses`

Each response is associated with:

- `session_id`
- frozen snapshot `item_record_id`
- `raw_value`
- optional `response_time_ms`
- `answered_at`

The existing unique key:

`(session_id, item_record_id)`

continues to provide answer upsert semantics.

---

## Snapshot Isolation

An answer may only be persisted if the item belongs to the frozen snapshot for that session.

Lookup is constrained by:

- `session_id`
- `source_item_id`
- `session.form`
- `session.question_bank_version`

An item outside the session snapshot must return 404.

---

## Gate Boundary

After Gate 15B:

- Kids session start: enabled
- Kids snapshot creation: enabled
- Kids items read: enabled
- Kids answers persistence: enabled
- Kids completion: still locked
- Kids scoring/result: still locked
- Payment V1: untouched
