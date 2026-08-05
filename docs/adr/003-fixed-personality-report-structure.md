# ADR-003: Fixed Personality Report Structure

**Status:** Accepted

## Context

Long-form reports need consistent generation, rendering, navigation, print,
comparison, and validation while preserving personality-specific prose.

## Decision

Every complete personality report uses 18 canonical ordered sections and
exactly 70 ordered static content blocks. Current content is English-only and
methodology must state that the report is not a clinical diagnosis.

## Consequences

Rendering and validation remain uniform. Content authors work within a clear
contract. Structural changes require a versioned architecture decision rather
than an isolated personality edit. These counts are personality-domain
constants, not global assessment constants.
