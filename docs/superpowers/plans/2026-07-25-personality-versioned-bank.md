# Personality Versioned Question Bank Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Safely unify the TypeScript and Python personality banks and scoring
contracts without deleting or invalidating existing SQLite data.

**Architecture:** Preserve all legacy tables and rows, add version-aware item,
snapshot, and response tables, and route runtime operations through immutable
session snapshots. Generate the current Python bank from TypeScript and verify
cross-language scoring parity.

**Tech Stack:** TypeScript 5, tsx, Next.js 16 route handlers, Python 3,
FastAPI, SQLite, pytest.

## Global Constraints

- Do not drop tables or delete sessions, responses, results, or legacy items.
- Do not use `INSERT OR REPLACE`.
- Keep Python as the production scorer.
- Do not change question IDs or source mappings.
- All generation and randomized validation must be deterministic.
- Do not add runtime dependencies.
- Do not commit automatically.

---

### Task 1: Synchronization RED and generator

**Files:**
- Create: `scripts/sync-personality-items.ts`
- Create: `scripts/validate-personality-sync.ts`
- Modify: `package.json`

**Interfaces:**
- Produces `buildPersonalityItems()` and `auditPersonalityItems()`.
- CLI supports write mode and `--check`.

- [ ] Write validation assertions for 72 items, four 18-item dimensions,
  9/9 poles, unique source IDs, continuous order, deterministic output, and
  mismatch detection.
- [ ] Run the validation and confirm it fails because the generator is absent.
- [ ] Implement deterministic transformation from questions and mappings.
- [ ] Preserve old `subdimension` and `form` by source ID, with documented
  `GENERAL`/`Agreement` fallbacks.
- [ ] Run validation and write the current generated JSON.
- [ ] Run `--check` twice and confirm no file changes.

### Task 2: Strict TypeScript bank validation

**Files:**
- Modify: `src/data/assessment/questions/personality/validation.ts`
- Modify: `scripts/validate-question-bank.ts`

**Interfaces:**
- `validatePersonalityQuestionBank()` requires exactly 72 total, 18 per
  dimension, and 9 forward plus 9 reverse per dimension.

- [ ] Add failing assertions for 71/73 total, 17/19 dimension totals, and
  8/10 direction splits.
- [ ] Run and confirm the new assertions fail.
- [ ] Split count and direction validation into focused helpers.
- [ ] Run question-bank and sync validation.

### Task 3: Python scorer safety

**Files:**
- Modify: `innergeodessa-mvp/tests/test_scoring.py`
- Modify: `innergeodessa-mvp/backend/app/scoring.py`
- Create: `innergeodessa-mvp/backend/requirements-dev.txt`

**Interfaces:**
- `score_assessment(items, responses)` validates the complete 72-item bank and
  returns the existing result contract.

- [ ] Add failing tests for missing/extra responses, bool, string, float,
  0/6, duplicate item IDs, invalid dimension/key, wrong count/distribution,
  confidence bounds, and exact tie/extreme results.
- [ ] Install/use pytest and confirm failures against current scorer.
- [ ] Add explicit input and bank validation without changing valid scoring.
- [ ] Run the full Python scoring suite.

### Task 4: Additive versioned database migration

**Files:**
- Modify: `innergeodessa-mvp/backend/schema.sql`
- Modify: `innergeodessa-mvp/backend/app/database.py`
- Create: `innergeodessa-mvp/tests/test_database_migration.py`

**Interfaces:**
- `initialize(db_path=..., items_path=...)` supports safe test copies.
- Produces versioned banks, item records, snapshots, and response links.

- [ ] Copy the real database to a temporary path in a failing migration test.
- [ ] Assert preservation of 72/21/246/3 legacy counts, 1,512 legacy snapshot
  rows, 246 migrated response links, and zero foreign-key errors.
- [ ] Assert 24 overlapping source IDs have two distinct internal records.
- [ ] Implement additive schema and transactional idempotent migration.
- [ ] Verify repeated initialization does not change counts.
- [ ] Run migration tests only against temporary copies.

### Task 5: Session-bound API and snapshot flow

**Files:**
- Modify: `innergeodessa-mvp/backend/app/main.py`
- Modify: `src/app/api/sessions/route.ts`
- Create: `src/app/api/sessions/[sessionId]/items/route.ts`
- Modify: `src/app/personality/test/page.tsx`
- Create: `innergeodessa-mvp/tests/test_session_flow.py`

**Interfaces:**
- `GET /api/sessions/{session_id}/items`
- Session creation writes current version and 72 snapshot rows.
- Answer and complete operations resolve exclusively through the snapshot.

- [ ] Add failing API tests for legacy/current item isolation, cross-version
  answer rejection, completeness, old active completion, and new completion.
- [ ] Implement transactionally created current sessions and snapshots.
- [ ] Implement session-bound item loading.
- [ ] Route answer storage and completion through version-aware tables.
- [ ] Update the Next.js proxy and test page to load items after session
  creation from the bound endpoint.
- [ ] Run Python API tests and Next.js typecheck.

### Task 6: TypeScript production contract and parity

**Files:**
- Implement: `src/data/assessment/scoring/personality/schema.ts`
- Implement: `src/data/assessment/scoring/personality/validation.ts`
- Implement: `src/data/assessment/scoring/personality/score.ts`
- Implement: `src/data/assessment/scoring/personality/adapter.ts`
- Create: `innergeodessa-mvp/backend/app/scoring_cli.py`
- Create: `scripts/validate-personality-parity.ts`
- Modify: `scripts/validate-personality-interpreter.ts`

**Interfaces:**
- TypeScript returns `type`, `scores`, `confidence`, `answered`, `tie_rule`.
- Python CLI accepts items/responses JSON and returns the same contract.

- [ ] Add parity cases for uniform 1–5 answers, maximum positive/negative,
  all 16 types, and fixed-seed random cases.
- [ ] Confirm parity fails before the TypeScript adapter exists.
- [ ] Implement canonical TypeScript score conversion without changing the
  existing Interpreter presentation contract.
- [ ] Replace nondeterministic Interpreter random generation with fixed seed.
- [ ] Run parity and Interpreter validation.

### Task 7: Real database migration and full verification

**Files:**
- Modify generated: `innergeodessa-mvp/backend/data/items.json`
- Modify: `package.json`

**Interfaces:**
- Unified npm scripts for bank validation, sync check, parity, and typecheck.

- [ ] Back up/copy the real database and run the migration verification on the
  copy.
- [ ] Run initialization against the real database only after copy checks pass.
- [ ] Verify legacy counts, current counts, snapshots, response links,
  completed results, active sessions, orphans, and `PRAGMA foreign_key_check`.
- [ ] Run sync check, TypeScript validators, Python tests, parity, lint,
  typecheck, and production build.
- [ ] Run `git status --short` and `git diff --stat` without committing.

