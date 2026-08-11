# InnerGeo Kids — Scoring Freeze V1.0

**Scoring Version:** `KIDS-SCORING-V1`
**Status:** Scoring Logic Frozen
**Production Ready:** No
**Applies To:** `KIDS-K68-RF-V1` and `KIDS-K912-RF-V1`

---

## 1. Freeze Scope

This record freezes the V1 scoring logic for InnerGeo Kids.

The frozen scoring system includes:

- 1–5 item response scoring;
- equal domain weighting within each age form;
- raw domain scoring;
- 0–100 linear normalisation;
- exact tie preservation;
- near-tie logic;
- leading-cluster detection;
- cluster-gap calculation;
- Emerging Explorer classification;
- Broad Explorer classification;
- Blended Interest Pattern classification;
- Clear Exploration Pattern classification;
- highlighted-domain rules;
- unrounded internal classification;
- scoring version control.

---

## 2. Source Documents

### Scoring Architecture

`kids-scoring-architecture-v1.md`

SHA-256:

`7d07d83e0633e984d92f15de26babe3b28f2ffa1df31da53cda82fef9ae456bd`

### Scoring Logic Revision

`kids-scoring-logic-revision-v1.md`

SHA-256:

`b0581dc878d6db8e0349661d6b62bf182bf25440bb2bf86788f659f1328db6ac`

### Boundary Tests

`kids-scoring-boundary-tests-v1.md`

SHA-256:

`b4fed8bd93200ac6a4f1f59ccd27dace04bfd38fcb24bd881ff823c616a522c9`

---

## 3. Boundary Validation

Boundary Test Cases:

**15**

Passed:

**15**

Failed:

**0**

Validated cases include:

- Emerging Explorer;
- Broad Explorer;
- Blended Interest Pattern;
- Clear Exploration Pattern;
- exact ties;
- 10-point near-tie boundary;
- 11-point cluster exclusion;
- 15-point cluster-gap boundary;
- four-domain leading cluster;
- K68 12.5-point score increments;
- K912 5-point score increments;
- Mean = 45 boundary;
- Max = 60 boundary;
- near-equal eight-domain profile.

---

## 4. Frozen Core Rules

### Emerging Explorer

Mean < 45

AND

Max < 60

---

### Broad Explorer

Mean >= 45

AND

Spread <= 20

AND

at least five domains are within 10 points of S1.

---

### Leading Cluster

All domains where:

Score >= S1 - 10

---

### Blended Interest Pattern

Leading Cluster contains:

2 or 3 domains

AND

Cluster Gap >= 15.

---

### Clear Exploration Pattern

Used when the previous three classifications do not apply.

---

## 5. Tie Rule

Exact ties remain exact ties.

No fixed domain priority may convert equal evidence into unequal interpretation.

Stable software ordering is permitted only for deterministic rendering.

---

## 6. Precision Rule

Internal classification uses unrounded scores.

UI may display rounded values.

Displayed rounding must never alter classification.

---

## 7. Interpretation Boundary

The scoring system measures:

**current interest signals**

It does not measure:

- intelligence;
- ability;
- aptitude;
- talent;
- future success;
- fixed personality;
- destiny.

---

## 8. Change Control

Any future change to:

- response values;
- normalisation formula;
- near-tie threshold;
- leading-cluster rule;
- cluster-gap threshold;
- classification precedence;
- pattern thresholds;
- highlighted-domain rules

requires:

1. documented rationale;
2. new scoring version;
3. new boundary tests;
4. new freeze record.

`KIDS-SCORING-V1` must not be silently modified.

---

## 9. Current Validation Level

Engineering logic design:

**Validated at design/test-case level**

Professional scoring review:

**Completed for V1 architecture**

Psychometric validation:

**Not completed**

Real-sample pilot evidence is still required before any psychometric claim.

---

## 10. Production Gate

Scoring Logic:

**FROZEN**

Overall product:

**NOT YET PRODUCTION READY**

Remaining major stages:

Scoring Freeze
→
Interest Map / Result Architecture
→
Free Result
→
Premium Parent Report
→
Parent Guidance / Ethics / Privacy
→
Engineering Implementation
→
Pilot
→
Release Review

---

## 11. Freeze Principle

The frozen system should answer:

> What kinds of activities is this child currently more interested in exploring?

It must not answer:

> What will this child become?


<!-- KIDS-RESPONSE-CONTRACT-V1 -->
## Response-Scale Clarification — 2026-08-10

`KIDS-SCORING-V1` retains a canonical scoring space of `1–5`.

Administration differs by form:

- K68: `1 / 3 / 5`
- K912: `1 / 2 / 3 / 4 / 5`

K68 uses three anchors in the common scoring space. No interpolation, reverse scoring, or silent imputation is introduced.

The response contract is versioned separately as `KIDS-RESPONSE-V1`.

---

## 12. K68 Response-Resolution Consistency Correction — 2026-08-11

Before executable scoring implementation, the K68 discrete normalised resolution was corrected from an incompatible derived statement of `6.25` points to the mathematically attainable `12.5` points under `KIDS-RESPONSE-V1`.

No response values, scoring formula, thresholds, classification precedence, or scoring version changed.

Correction record:

`kids-k68-scoring-resolution-consistency-v1.md`

SHA-256:

`59f06f4bce7a5798a644391a9e318831dd61ec9df008ecad4e3313cd276f9aa3`

Current source-document hashes:

- Scoring Architecture: `7d07d83e0633e984d92f15de26babe3b28f2ffa1df31da53cda82fef9ae456bd`
- Scoring Logic Revision: `b0581dc878d6db8e0349661d6b62bf182bf25440bb2bf86788f659f1328db6ac`
- Boundary Tests: `b4fed8bd93200ac6a4f1f59ccd27dace04bfd38fcb24bd881ff823c616a522c9`

`KIDS-SCORING-V1` remains the active frozen scoring version.
