# ADR-004: Fixed Dynamic Rule Structure

**Status:** Accepted

## Context

Reports need predictable personalisation coverage across dimensions,
confidence, and interacting preferences.

## Decision

Every complete personality rule set contains 36 dimension rules, 7 confidence
rules, and 8 combination rules: exactly 51. Rules target declared slots and
preserve applied-rule metadata.

## Consequences

Coverage is comparable and mechanically verifiable. Rule authors must provide
all variants before completion. The 36/7/8 inventory belongs to this
personality engine and must not be copied automatically to another assessment.
