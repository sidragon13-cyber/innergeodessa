# ADR-002: Separate Frontend Release Whitelist

**Status:** Accepted

## Context

Generator readiness does not imply content, product, or commercial approval
for user-facing release.

## Decision

Keep frontend availability in an explicit allowlist independent from report
and rule registries. Track `frontend_enabled` separately from
`domain_complete` and `validated`.

## Consequences

Backend/domain expansion cannot accidentally release a report. Each frontend
release requires its own review and tests. Registry presence must never be
used as the UI gate.
