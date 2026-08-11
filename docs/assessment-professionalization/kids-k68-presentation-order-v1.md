# InnerGeo Kids — K68 Presentation Order V1

**Status:** Frozen
**Release Form ID:** `KIDS-K68-RF-V1`
**Age Band:** 6–8
**Scored Items:** 32
**Presentation Order Policy:** Deterministic 4-round domain interleave
**Order SHA256:** `3bf75ecd63959501f06942f8b1b19db9a1f52476ce2d7d7ff01fd2abad1c695b`

---

## 1. Purpose

The K68 Release Form defines selected membership but does not define final production presentation order.

This document freezes the presentation order used by the production assessment.

---

## 2. Interleaving Rule

The 32 selected items are presented as four rounds.

Each round contains one item from every Kids domain.

The starting domain moves forward by one canonical domain position per round.

Within each domain, the original Release Form selected-item order is preserved.

---

## 3. Frozen Presentation Order

| Order | Round | Domain | Item ID | Visual Support |
|---:|---:|---|---|---|
| 1 | 1 | Create | `K68-CREATE-01` | required |
| 2 | 1 | Discover | `K68-DISCOVER-01` | helpful |
| 3 | 1 | Build | `K68-BUILD-01` | required |
| 4 | 1 | Think | `K68-THINK-01` | required |
| 5 | 1 | Connect | `K68-CONNECT-01` | none |
| 6 | 1 | Lead | `K68-LEAD-01` | helpful |
| 7 | 1 | Move | `K68-MOVE-01` | helpful |
| 8 | 1 | Express | `K68-EXPRESS-01` | helpful |
| 9 | 2 | Discover | `K68-DISCOVER-02` | none |
| 10 | 2 | Build | `K68-BUILD-02` | required |
| 11 | 2 | Think | `K68-THINK-02` | required |
| 12 | 2 | Connect | `K68-CONNECT-02` | none |
| 13 | 2 | Lead | `K68-LEAD-02` | none |
| 14 | 2 | Move | `K68-MOVE-03` | helpful |
| 15 | 2 | Express | `K68-EXPRESS-02` | helpful |
| 16 | 2 | Create | `K68-CREATE-02` | none |
| 17 | 3 | Build | `K68-BUILD-03` | helpful |
| 18 | 3 | Think | `K68-THINK-03` | none |
| 19 | 3 | Connect | `K68-CONNECT-03` | helpful |
| 20 | 3 | Lead | `K68-LEAD-04` | helpful |
| 21 | 3 | Move | `K68-MOVE-05` | required |
| 22 | 3 | Express | `K68-EXPRESS-03` | helpful |
| 23 | 3 | Create | `K68-CREATE-04` | required |
| 24 | 3 | Discover | `K68-DISCOVER-03` | required |
| 25 | 4 | Think | `K68-THINK-04` | helpful |
| 26 | 4 | Connect | `K68-CONNECT-05` | none |
| 27 | 4 | Lead | `K68-LEAD-05` | none |
| 28 | 4 | Move | `K68-MOVE-06` | helpful |
| 29 | 4 | Express | `K68-EXPRESS-05` | none |
| 30 | 4 | Create | `K68-CREATE-05` | required |
| 31 | 4 | Discover | `K68-DISCOVER-04` | none |
| 32 | 4 | Build | `K68-BUILD-06` | required |

---

## 4. Verification

- Total items: **32 / 32**
- Unique item IDs: **32 / 32**
- Domains: **8 / 8**
- Items per domain: **4 / 4**
- Adjacent same-domain items: **0**
- Within-domain selected-item order: **Preserved**
- Required visual items: **10 / 10**
- Helpful visual items: **12 / 12**
- No-visual items: **10 / 10**
- Maximum consecutive no-visual items: **2**

---

## 5. Source Authority

- Membership: `kids-age6-8-release-form-v1.md`
- Required visual mapping: `kids-k68-required-asset-manifest-v1.md`
- Helpful visual mapping: `kids-k68-helpful-asset-manifest-v1.md`

This file owns presentation order only. It does not redefine question wording, scoring, domain membership, or visual mapping.

---

## 6. Freeze Rule

Production K68 question data must use this order exactly.

Any future order change requires a new version and a new SHA256 digest.
