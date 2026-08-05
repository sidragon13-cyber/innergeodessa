# ADR-001: Registry-Based Report Discovery

**Status:** Accepted

## Context

Complete reports and rules must be discoverable by canonical personality type
without switches, implicit directory scanning, or frontend coupling.

## Decision

Use explicit typed registries for report definitions and rule sets. A module
is available to the generator only after both registry entries are added.

## Consequences

Discovery is deterministic and auditable. Missing integration fails
validation. Templates and unfinished directories remain inert. Adding a
module requires deliberate registry edits.
