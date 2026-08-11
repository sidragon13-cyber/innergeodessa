# InnerGeo Kids Response Contract V1

**Status:** Frozen  
**Contract ID:** `KIDS-RESPONSE-V1`  
**Scoring Version:** `KIDS-SCORING-V1`  
**Effective Date:** 2026-08-10

---

## 1. Purpose

This document is the canonical administration-response contract for InnerGeo Kids Interest Discovery.

The response format is age-adapted while the canonical scoring space remains 1–5.

This contract does not change the frozen question banks, presentation order, domain architecture, visual mappings, or scoring version.

---

## 2. K68 · Ages 6–8

K68 uses a child-friendly three-choice response format.

| Raw Value | English | 中文 |
|---|---|---|
| 1 | Not really | 不太想试试 |
| 3 | Not sure yet | 还不确定 |
| 5 | I'd like to try | 很想试试 |

Prompt:

- English: `Would you like to try this?`
- 中文：`你想试试看吗？`

Allowed stored raw values:

`1 / 3 / 5`

Values `2` and `4` are not valid K68 responses.

---

## 3. K912 · Ages 9–12

K912 uses a five-choice interest-intensity format.

| Raw Value | English | 中文 |
|---|---|---|
| 1 | Not interested | 不感兴趣 |
| 2 | A little interested | 有一点兴趣 |
| 3 | Maybe / Not sure | 一般 / 不确定 |
| 4 | Interested | 感兴趣 |
| 5 | Very interested | 非常感兴趣 |

Prompt:

- English: `How interested are you?`
- 中文：`你有多感兴趣？`

Allowed stored raw values:

`1 / 2 / 3 / 4 / 5`

---

## 4. Canonical Scoring Space

Both forms use the same canonical numeric scoring space:

`1–5`

K68 does not interpolate hidden values. It simply uses three anchors within that common scoring space:

`1 / 3 / 5`

K912 uses every integer anchor:

`1 / 2 / 3 / 4 / 5`

No reverse scoring is introduced.

No silent imputation is permitted.

All scored items must be answered before final scoring.

---

## 5. Version Boundaries

`KIDS-K68-RF-V1` and `KIDS-K912-RF-V1` identify the frozen item/form releases.

`KIDS-RESPONSE-V1` identifies the administration response contract.

`KIDS-SCORING-V1` identifies the canonical scoring architecture.

These are separate version boundaries and must not be conflated.

---

## 6. Backend Runtime Boundary

The current generic `AnswerRequest` may continue to accept integer values from 1 through 5 because Personality and RIASEC share that request schema and Kids answer persistence is not yet enabled.

When the Kids answer route is implemented, runtime validation must inspect the session form:

- `k68` → accept only `1, 3, 5`
- `k912` → accept only `1, 2, 3, 4, 5`

K68 values `2` and `4` must be rejected rather than normalized or silently converted.

---

## 7. Source of Truth

The executable frontend source of truth is:

`src/data/kids/schema.ts`

The development preview must consume this contract rather than maintain its own response-option definitions.

---

## 8. Freeze Statement

As of 2026-08-10:

- K68 response architecture: **3 choices**
- K912 response architecture: **5 choices**
- Canonical scoring space: **1–5**
- Scoring version: **KIDS-SCORING-V1**
- Response contract: **KIDS-RESPONSE-V1**

Any future change requires a formal response-contract revision.
