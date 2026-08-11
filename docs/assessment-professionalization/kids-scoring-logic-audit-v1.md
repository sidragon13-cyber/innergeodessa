# InnerGeo Kids — Scoring Logic Audit V1.0

**Target:** `kids-scoring-architecture-v1.md`
**Scoring Version:** `KIDS-SCORING-V1`
**Status:** Audit Complete — Revision Required Before Freeze
**Production Ready:** No

---

## 1. Audit Conclusion

The current scoring architecture is structurally sound and suitable as a V1 foundation.

However, the provisional pattern-classification logic should not yet be frozen.

No P0 defect was identified.

Four scoring-definition issues require resolution before implementation.

---

## 2. Finding P1-01 — Pattern Rule Overlap

### Current Risk

A result can potentially satisfy more than one conceptual pattern.

Example:

- all domain scores are relatively close;
- highest score is below 55;
- highest-lowest spread is <= 20.

Such a profile could conceptually resemble both:

- Emerging Explorer;
- Broad Explorer.

The current priority order resolves the software decision, but does not fully separate the constructs.

### Required Resolution

Pattern definitions must distinguish:

- overall signal level;
- differentiation/spread.

Emerging should primarily represent weak or uncertain overall interest signals.

Broad should represent broad attraction across multiple domains.

---

## 3. Finding P1-02 — Blended Pattern Is Not Deterministic Enough

### Current Risk

Current wording includes:

> lower domains show more separation

This is interpretively understandable but not sufficiently deterministic for software.

Two engineers could implement different rules.

### Required Resolution

V1 must define an explicit gap rule between:

- the leading cluster;
- the next domain outside that cluster.

The same input must always return the same classification.

---

## 4. Finding P1-03 — Discrete Score Resolution

Normalised scores are not continuous.

### K68

Four items per domain.

Possible raw scores:

4–20.

Each raw-score step changes the normalised score by:

**6.25 points**

### K912

Five items per domain.

Possible raw scores:

5–25.

Each raw-score step changes the normalised score by:

**5 points**

Therefore thresholds such as:

10 points
15 points
20 points

must be interpreted against actually reachable score values.

Implementation must never rely on an exact threshold value being reachable in both forms.

Use deterministic inequality rules.

---

## 5. Finding P1-04 — Highlighted Domain Membership

The architecture currently stores:

`highlightedDomains`

but does not fully define membership.

V1 must explicitly determine:

- whether one, two, three, or more domains can be highlighted;
- how exact ties are handled;
- how near ties are handled;
- whether Broad Explorer has highlighted domains;
- whether Emerging Explorer has highlighted domains.

This must be resolved before Free Result and Premium Report architecture.

---

## 6. Validated Elements

The following parts of the current architecture pass this audit:

### PASS — Equal domain weighting

K68:

4 items × 8 domains.

K912:

5 items × 8 domains.

No hidden unequal domain weighting.

### PASS — Linear normalisation

0–100 normalisation is transparent and reproducible.

### PASS — Tie preservation

Exact ties are retained rather than broken for interpretation.

### PASS — No forced Top 3

The architecture correctly allows results without an artificial Top 3.

### PASS — Interest / ability separation

Interest scores are not interpreted as ability, talent, intelligence, or destiny.

### PASS — Missing-response principle

Missing responses are not silently converted to neutral responses.

### PASS — Versioning

Scoring changes require explicit scoring-version changes.

### PASS — Retake principle

A retake creates a new result rather than overwriting historical results.

---

## 7. Pattern Model Recommendation

The final V1 classifier should use two conceptual axes:

### Axis A — Overall Interest Signal

How high or low the domain scores are overall.

### Axis B — Differentiation

How strongly the domains separate from one another.

These two axes should determine:

- Emerging Explorer;
- Broad Explorer;
- Blended Interest Pattern;
- Clear Exploration Pattern.

This is more stable than interpreting ranking alone.

---

## 8. Implementation Requirement

Before `KIDS-SCORING-V1` is frozen, the architecture must define deterministic rules for:

1. Emerging detection;
2. Broad detection;
3. leading-cluster detection;
4. Blended detection;
5. Clear detection;
6. exact ties;
7. near ties;
8. highlighted-domain membership;
9. classification precedence.

No ambiguous prose rule should remain in production scoring logic.

---

## 9. Audit Status

| Area | Result |
|---|---|
| Domain weighting | PASS |
| Normalisation | PASS |
| Tie handling | PASS |
| No forced Top 3 | PASS |
| Pattern categories | PASS WITH REVISION |
| Pattern thresholds | REVISION REQUIRED |
| Highlight membership | REVISION REQUIRED |
| Age-form score resolution | PASS WITH IMPLEMENTATION NOTE |
| Interpretation boundaries | PASS |
| Version control | PASS |

---

## 10. Release Gate

Current state:

**Scoring Architecture Designed**

but not:

**Scoring Logic Frozen**

Required next step:

Scoring Logic Revision V1
→
Boundary Test Cases
→
Scoring Freeze
