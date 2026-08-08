# Personality Premium Payment Fulfillment V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Securely fulfill one-time Paddle purchases into durable Personality report entitlements.

**Architecture:** Next.js verifies Paddle signatures and forwards normalized completed-transaction data over an authenticated internal boundary. FastAPI validates resource ownership state and atomically writes the existing payments and report_entitlements tables.

**Tech Stack:** Next.js 16 Route Handlers, React 19 client components, Paddle Billing SDK, FastAPI, Pydantic, SQLite, pytest.

## Global Constraints

- Reuse `report_entitlements` and the existing SQLite database.
- Personality only; no Career, Zodiac, or subscription payment behavior.
- Never authorize from client-supplied user identity.
- Preserve anonymous free assessment behavior.
- Do not commit, push, deploy, or modify Paddle dashboard configuration.

---

### Task 1: Backend fulfillment contract and transaction

**Files:**
- Create: `innergeodessa-mvp/backend/app/schemas/payment.py`
- Create: `innergeodessa-mvp/backend/app/payment_fulfillment.py`
- Create: `innergeodessa-mvp/backend/app/routers/internal_payments.py`
- Modify: `innergeodessa-mvp/backend/app/routers/__init__.py`
- Modify: `innergeodessa-mvp/backend/app/main.py`
- Test: `innergeodessa-mvp/tests/test_payment_fulfillment.py`

**Interfaces:**
- Consumes a normalized Paddle completed-transaction payload and `X-InnerGeo-Internal-Secret`.
- Produces `{status: "fulfilled" | "already_fulfilled", paymentId, entitlementStatus: "unlocked"}`.

- [ ] Write tests for success, duplicate event, duplicate transaction, invalid resource, ownerless resource, and invalid secret.
- [ ] Run the focused test file and confirm failures are caused by the missing route/service.
- [ ] Implement strict Pydantic input, constant-time internal-secret validation, resource validation, atomic payment insert, and entitlement upsert.
- [ ] Run the focused tests and confirm they pass.

### Task 2: Checkout resource context and webhook forwarding

**Files:**
- Modify: `src/components/payment/paddle-checkout-button.tsx`
- Modify: `src/app/personality/result/[sessionId]/page.tsx`
- Modify: `src/app/api/paddle/webhook/route.ts`

**Interfaces:**
- Checkout accepts optional Personality resource context and sends only `module` and `resourceId` in custom data.
- The webhook forwards event ID, transaction ID, resource context, product/price, currency, amount, tax, and completion time to FastAPI.

- [ ] Add resource-context props to the checkout component and use them in the Personality result CTA.
- [ ] Normalize only validated `transaction.completed` events and authenticate the FastAPI request with the server-only secret.
- [ ] Return a retryable error when fulfillment fails and success for non-target Paddle events.
- [ ] Run TypeScript type checking and correct contract mismatches.

### Task 3: Complete report gating and verification

**Files:**
- Modify: `src/app/personality/report/[sessionId]/page.tsx`
- Modify: `innergeodessa-mvp/backend/app/database.py`
- Test: `innergeodessa-mvp/tests/test_report_access.py`

**Interfaces:**
- Full report rendering depends exclusively on the authenticated database access response.

- [ ] Ensure locked, unauthenticated, unavailable, and unlocked states cannot leak premium content.
- [ ] Verify locked and unlocked access tests, including persistence across a fresh login session.
- [ ] Remove duplicate database-governance verification entries without changing the payments schema.
- [ ] Run all focused Python tests, `npm run typecheck`, `npm run build`, and `git diff --check`.
