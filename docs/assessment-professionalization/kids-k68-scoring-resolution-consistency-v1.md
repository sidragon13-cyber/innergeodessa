# InnerGeo Kids — K68 Scoring Resolution Consistency V1

**Date:** 2026-08-11

**Status:** Consistency Correction

**Response Contract:** `KIDS-RESPONSE-V1`

**Scoring Version:** `KIDS-SCORING-V1`

**Release Form:** `KIDS-K68-RF-V1`

---

## 1. Purpose

This record resolves a discrete-score inconsistency identified before engineering implementation of the Kids scoring engine.

The correction aligns the derived K68 score resolution with the already frozen K68 response contract.

It does not change the V1 normalisation formula or pattern thresholds.

---

## 2. K68 Response Space

K68 contains four scored items per domain.

Under `KIDS-RESPONSE-V1`, each item accepts only:

`1 / 3 / 5`

The system must not generate or persist intermediate response values `2` or `4`.

No interpolation is permitted.

---

## 3. Raw Domain Score Resolution

With four K68 items and response values `1 / 3 / 5`, the attainable raw domain totals are:

`4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20`

Therefore:

- minimum raw score = `4`
- maximum raw score = `20`
- raw-score increment = `2`

---

## 4. Normalised Domain Score Resolution

The frozen formula remains:

`((Raw Score - Minimum Possible Score) / (Maximum Possible Score - Minimum Possible Score)) × 100`

For K68 this becomes:

`((Raw Score - 4) / 16) × 100`

The attainable normalised scores are therefore:

`0 / 12.5 / 25 / 37.5 / 50 / 62.5 / 75 / 87.5 / 100`

The true K68 discrete normalised increment is:

**12.5 points**

The previous 6.25-point statement was inconsistent with the frozen K68 response contract.

---

## 5. Frozen Rules That Do Not Change

This correction does not change:

- raw scoring;
- normalisation formula;
- 0–100 result scale;
- Emerging Explorer thresholds;
- Broad Explorer thresholds;
- 10-point near-tie threshold;
- Leading Cluster rule;
- 15-point Cluster Gap threshold;
- classification precedence;
- highlighted-domain rules;
- exact-tie preservation;
- unrounded internal classification.

Therefore the active scoring version remains:

`KIDS-SCORING-V1`

---

## 6. K68 Leading Cluster Consequence

The frozen Leading Cluster rule is:

`Score >= S1 - 10`

The minimum difference between two distinct attainable K68 normalised scores is:

`12.5`

Therefore two K68 domains with different scores cannot both fall within the 10-point Leading Cluster window.

A K68 multi-domain Leading Cluster requires exact ties at the highest score.

This is accepted as deterministic V1 behaviour.

No threshold is changed without pilot evidence.

---

## 7. K68 Broad Explorer Consequence

Broad Explorer requires at least five domains within 10 points of S1.

Because distinct K68 score levels differ by at least 12.5 points, those qualifying domains must share the same highest score.

This is a mathematical consequence of the frozen response scale and frozen threshold.

---

## 8. K68 Blended Pattern Consequence

A K68 two-domain or three-domain Leading Cluster requires exact ties among those leading domains.

The frozen Cluster Gap threshold remains:

`>= 15`

K68 score differences occur in increments of 12.5 points.

Therefore the first attainable clearly separated Cluster Gap above the 15-point threshold is:

`25`

---

## 9. Corrected K68 Boundary Case

A realizable K68 normalised score vector is:

`75 / 75 / 50 / 50 / 37.5 / 37.5 / 25 / 25`

Derived facts:

- Mean = `46.875`
- Spread = `50`
- Leading Cluster size = `2`
- Leading Cluster = `75 / 75`
- Cluster Gap = `25`
- four exact tied score groups are present

Classification:

**Blended Interest Pattern**

The boundary-test table may display Mean as `46.88`.

Classification must use the unrounded value `46.875`.

---

## 10. Engineering Requirement

The executable Kids scoring engine must:

- consume stored canonical raw values;
- never invent K68 intermediate responses;
- never interpolate K68 responses;
- preserve full internal scoring precision;
- preserve exact ties;
- derive Leading Cluster deterministically;
- classify using unrounded values;
- expose rounded values only as presentation data when required.

---

## 11. Change-Control Decision

This correction fixes a mathematically incorrect derived resolution statement.

It does not modify:

- the response contract;
- scoring input values;
- scoring formula;
- thresholds;
- pattern definitions;
- classification order.

No new scoring version is required.

`KIDS-SCORING-V1` remains frozen.
