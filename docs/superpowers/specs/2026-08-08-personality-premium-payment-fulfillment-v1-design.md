# Personality Premium Payment Fulfillment V1 Design

## Scope

Complete one-time Paddle payment fulfillment for owned, completed Personality assessment sessions. Career, Zodiac, subscriptions, Paddle dashboard configuration, and alternative entitlement systems are out of scope.

## Architecture

The browser opens Paddle Checkout with the configured public price and exactly two custom-data fields: `module: "personality"` and `resourceId: <session id>`. The signed Paddle webhook remains at the Next.js boundary. After signature validation, a completed transaction is normalized and forwarded through `INNERGEODESSA_API_URL` to a FastAPI internal fulfillment route authenticated by a server-only shared secret.

FastAPI owns authorization and persistence. In one SQLite transaction it validates that the referenced resource is an existing completed Personality session with an owner, inserts the completed Paddle payment into the existing `payments` table, and upserts the existing `report_entitlements` row to `unlocked` for that owner. Unique provider event and transaction constraints provide idempotency; duplicate deliveries return success without duplicate rows, while conflicting reuse is rejected.

## Access Model

The full Personality report is rendered only after `/api/account/report-access/personality/{resourceId}` confirms that the current verified user owns the completed session and has an unlocked database entitlement. No access decision relies on `sessionStorage`. Anonymous users keep the free assessment/result experience but must sign in, verify, and claim a result before payment can fulfill.

## Error Handling

Invalid signatures are rejected by Next.js. Missing or malformed transaction data is rejected without calling FastAPI. FastAPI rejects an invalid internal secret, unsupported modules, absent/incomplete resources, and ownerless resources. A non-success FastAPI response causes the webhook route to return an error so Paddle can retry. Duplicate successful events return a normal success response.

## Tests

Focused FastAPI integration tests cover successful fulfillment, duplicate event and transaction delivery, invalid resources, ownerless resources, internal authentication, and locked versus unlocked report access. Final verification runs focused Python tests, TypeScript type checking, the production build, and `git diff --check`.
