# InnerGeo Kids — Scoring Boundary Tests V1.0

**Scoring Version:** `KIDS-SCORING-V1`
**Status:** Boundary Tests Passed
**Test Cases:** 15
**Passed:** 15
**Failed:** 0

---

## Test Results

| Test | Result | Expected | Actual | Mean | Spread | Leading Cluster | Cluster Gap | Exact Ties |
|---|---|---|---|---:|---:|---:|---:|---:|
| T01 Emerging — low overall signal | PASS | Emerging Explorer | Emerging Explorer | 38.12 | 20 | 4 | 5 | 3 |
| T02 Broad — high similarity | PASS | Broad Explorer | Broad Explorer | 61.88 | 20 | 6 | 5 | 3 |
| T03 Blend — two-domain cluster | PASS | Blended Interest Pattern | Blended Interest Pattern | 56.25 | 50 | 2 | 20 | 0 |
| T04 Blend — three-domain cluster | PASS | Blended Interest Pattern | Blended Interest Pattern | 58.12 | 50 | 3 | 20 | 0 |
| T05 Clear — single leader | PASS | Clear Exploration Pattern | Clear Exploration Pattern | 59.38 | 50 | 1 | 20 | 0 |
| T06 Exact tie preserved | PASS | Blended Interest Pattern | Blended Interest Pattern | 55.62 | 45 | 2 | 20 | 1 |
| T07 Near tie exactly 10 | PASS | Blended Interest Pattern | Blended Interest Pattern | 50.62 | 50 | 2 | 15 | 0 |
| T08 Difference 11 leaves cluster | PASS | Clear Exploration Pattern | Clear Exploration Pattern | 50.5 | 50 | 1 | 11 | 0 |
| T09 Cluster gap exactly 15 | PASS | Blended Interest Pattern | Blended Interest Pattern | 56.88 | 50 | 2 | 15 | 0 |
| T10 Four-domain leading cluster | PASS | Clear Exploration Pattern | Clear Exploration Pattern | 62.5 | 55 | 4 | 15 | 1 |
| T11 K68 discrete 12.5 increments | PASS | Blended Interest Pattern | Blended Interest Pattern | 46.88 | 50 | 2 | 25 | 4 |
| T12 K912 discrete 5-point increments | PASS | Blended Interest Pattern | Blended Interest Pattern | 55.62 | 50 | 2 | 15 | 0 |
| T13 Mean exactly 45 — not Emerging | PASS | Broad Explorer | Broad Explorer | 45 | 15 | 6 | 5 | 11 |
| T14 Max exactly 60 — not Emerging | PASS | Clear Exploration Pattern | Clear Exploration Pattern | 38.75 | 35 | 1 | 15 | 2 |
| T15 All eight almost equal | PASS | Broad Explorer | Broad Explorer | 70.62 | 10 | 8 | N/A | 7 |

---

## Boundary Coverage

- Emerging Explorer
- Broad Explorer
- Blended Interest Pattern
- Clear Exploration Pattern
- Exact ties
- 10-point near-tie boundary
- 11-point cluster exclusion
- 15-point cluster-gap boundary
- Four-domain leading cluster
- K68 12.5-point discrete score increments
- K912 5-point discrete score increments
- Mean = 45 boundary
- Max = 60 boundary
- Near-equal eight-domain profile

## Release Gate

**Scoring Logic Freeze:** ELIGIBLE

All defined V1 boundary cases passed.

The scoring logic may proceed to formal freeze.

<!-- KIDS-RESPONSE-CONTRACT-V1 -->
## Response Boundary Expectations — 2026-08-10

These response boundaries are governed by `KIDS-RESPONSE-V1`.

When Kids answer persistence is enabled:

K68 valid values:

`1 / 3 / 5`

K68 invalid values include:

`2 / 4 / values outside 1–5 / non-integers`

K912 valid values:

`1 / 2 / 3 / 4 / 5`

Validation must be based on `session.form`; invalid values must be rejected, not normalized.
