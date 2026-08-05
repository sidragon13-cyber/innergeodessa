# Personality Versioned Question Bank Design

## Goal

Make the TypeScript personality question bank and source mapping the sole
authoritative content source while preserving every existing SQLite session,
response, result, and legacy item. Python remains the production scorer.

## Authoritative Sources

- Question content and ordering:
  `src/data/assessment/questions/personality/questions.ts`
- Direction:
  `question.dimension` and `question.reverseScored`
- Historical source ID:
  `src/data/assessment/questions/personality/source-mapping.ts`
- Generated current Python runtime bank:
  `innergeodessa-mvp/backend/data/items.json`

Versions:

- Existing Python bank: `personality-legacy-v1`
- Current TypeScript bank: `personality-v1.0.0`

## Non-destructive Database Model

The existing `items`, `responses`, `sessions`, and `results` tables stay in
place. No table is dropped and no historical row is deleted or replaced.

Add:

- `question_banks`
  - one row per version
- `question_bank_items`
  - internal `item_record_id` primary key
  - `source_item_id` is the business/source identifier
  - unique `(question_bank_version, source_item_id)`
  - unique `(question_bank_version, master_order)`
- `session_question_items`
  - immutable session snapshot linking a session to exact item records and
    display order
- `session_responses`
  - version-aware response records referencing `item_record_id`

Add nullable-at-SQL-level `sessions.question_bank_version`, backfill every
existing session to `personality-legacy-v1`, and enforce non-empty values in
application writes and migration verification. SQLite cannot safely add a
`NOT NULL` column with the required historical backfill in one non-destructive
statement.

The 24 overlapping source IDs are stored as separate versioned
`question_bank_items` records with distinct `item_record_id` values. The
legacy record is never updated from the current generated bank.

## Migration

Initialization runs inside one transaction:

1. Create additive tables and indexes.
2. Add `sessions.question_bank_version` if absent.
3. Capture the existing 72 `items` rows as `personality-legacy-v1`.
4. Backfill all existing sessions to the legacy version.
5. Create 72 legacy snapshot rows for each existing session.
6. Copy all existing `responses` into `session_responses`, resolving them to
   legacy item records.
7. Load the generated current 72 items into `personality-v1.0.0` with
   `INSERT ... ON CONFLICT ... DO UPDATE`.
8. Never update legacy item records from current generated data.
9. Verify counts, missing links, duplicate order, and foreign keys before
   commit.

Repeated initialization is idempotent.

## Runtime Flow

Creating a session explicitly stores `personality-v1.0.0` and inserts its 72
snapshot rows in the same transaction.

`GET /api/sessions/{sessionId}/items` reads only the session snapshot.

Saving an answer:

1. Requires an active session.
2. Resolves the source item ID through that session's snapshot.
3. Rejects items outside the snapshot or another bank version.
4. Upserts into `session_responses`.

Completing a session:

1. Loads the session and its snapshot.
2. Requires exactly 72 snapshot items.
3. Loads version-aware responses.
4. Rejects missing, extra, duplicate, invalid, or cross-version data.
5. Scores the exact snapshot.
6. Writes the existing result contract and marks the session complete.

The original tables remain available for historical inspection. Existing
completed results remain unchanged.

## Scoring Contract

Both implementations use:

```text
center = 3
forward = answer - 3
reverse = 3 - answer
score > 0 => first pole
score < 0 => second pole
score == 0 => first pole
confidence = abs(score) / (answered * 2)
```

The TypeScript production-contract adapter returns `type`, `scores`,
`confidence`, `answered`, and `tie_rule`. Existing Interpreter
`preferenceStrength` remains a separate 0–100 presentation measure.

## Synchronization

`scripts/sync-personality-items.ts` deterministically creates the current
version JSON. It preserves historical `subdimension` and `form` when an old
source ID exists; otherwise it derives `subdimension` from the source ID and
uses `Agreement`.

`--check` never writes. It compares the expected and actual bank and exits 1
with missing, extra, duplicate, dimension, key, wording, order, and pole
distribution summaries.

## Testing

- Strict TypeScript bank validation: 72 total, 18 per dimension, 9/9 direction.
- Sync determinism and `--check`.
- Python scorer input safety and exact expected results.
- Migration on a temporary database copy before touching the real database.
- Pre/post counts, foreign keys, orphan checks, idempotent initialization.
- Existing completed result unchanged.
- Existing active session sees and completes its legacy snapshot.
- New session sees and completes the current snapshot.
- Fixed-seed TypeScript/Python parity covering uniform answers, extremes,
  all 16 types, and deterministic randomized cases.
- Lint, typecheck, build, and all validation commands.

