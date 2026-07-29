# ADR-005: Validation-First Personality Expansion

**Status:** Accepted

## Context

Batch expansion risks wrong codes, incomplete registration, duplicate prose,
invalid targets, and accidental frontend release.

## Decision

Implement one personality at a time using a failing validation first. Require
individual, family, global, and manual audits before marking it validated or
creating an independent commit.

## Consequences

Failures remain local and content duplication is detected early. Manifest
stages remain truthful. Expansion takes deliberate review time, but reduces
cross-type defects and uncontrolled release.
