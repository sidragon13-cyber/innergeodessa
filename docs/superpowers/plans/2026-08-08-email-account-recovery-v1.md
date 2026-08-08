# Email & Account Recovery V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver production email verification, verification resend, forgot password, and secure password reset using the existing authentication architecture.

**Architecture:** FastAPI owns token lifecycle and calls a small Resend-compatible email abstraction after committing request-attempt state. Next.js retains its proxy/client role, while SQLite remains the only datastore and existing AuthProvider/i18n patterns drive the UI.

**Tech Stack:** FastAPI, Pydantic, SQLite, Python standard-library HTTP, Next.js 16, React 19, pytest.

## Global Constraints

- Do not redesign authentication or touch Paddle/payment fulfillment.
- Store only token hashes and expose raw tokens only in guarded auth test mode.
- Cooldowns apply to request attempts, including failed provider delivery.
- Do not commit, push, deploy, or add real credentials.

---

### Task 1: Transactional email boundary

**Files:** Create `backend/app/email/__init__.py`, `backend/app/email/service.py`; test `tests/test_auth_recovery.py`.

- [ ] Write failing tests for verification/reset email link construction, provider calls, and provider failure behavior.
- [ ] Implement environment validation and Resend-compatible JSON delivery without logging sensitive values.
- [ ] Run focused tests to green.

### Task 2: Recovery schema and backend APIs

**Files:** Modify `backend/schema.sql`, `backend/app/database.py`, `backend/app/auth.py`, `backend/app/schemas/auth.py`, `backend/app/routers/auth.py`; test `tests/test_auth_api.py`, `tests/test_auth_recovery.py`.

- [ ] Write failing tests for production token hiding, resend lifecycle/cooldown, generic forgot responses, hashed reset storage, invalid/expired/used reset rejection, password replacement, and session revocation.
- [ ] Add password reset storage and migration verification.
- [ ] Implement attempt-based cooldown and atomic reset behavior.
- [ ] Run focused tests to green.

### Task 3: Next proxies, AuthProvider, and bilingual UI

**Files:** Create auth proxy routes and forgot/reset pages/forms; modify AuthProvider, login, verification, dashboard, account exports, and account dictionaries.

- [ ] Add same-origin proxy routes for all three APIs.
- [ ] Add AuthProvider methods and bilingual loading/success/error UI.
- [ ] Auto-submit emailed verification tokens and add resend controls.
- [ ] Run TypeScript typecheck to green.

### Task 4: Production configuration and verification

**Files:** Modify `deploy/compose.production.yml` and relevant documentation if present.

- [ ] Add required server-only backend email environment variables with no values.
- [ ] Run focused and full Python tests.
- [ ] Run typecheck, `git diff --check`, and webpack production build.
- [ ] Inspect the complete diff for payment changes, unrelated edits, and secrets.
