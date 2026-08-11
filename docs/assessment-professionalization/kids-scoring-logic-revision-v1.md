# InnerGeo Kids — Scoring Logic Revision V1.0

**Scoring Version:** `KIDS-SCORING-V1`
**Status:** Deterministic Logic Defined — Boundary Testing Required
**Production Ready:** No

---

## 1. Purpose

This document resolves the four scoring-logic findings identified in:

`kids-scoring-logic-audit-v1.md`

The revised model defines deterministic rules for:

- overall signal level;
- differentiation;
- leading clusters;
- exact ties;
- near ties;
- pattern type;
- highlighted domains.

---

## 2. Input

For each completed assessment, calculate eight normalised domain scores:

- Create
- Discover
- Build
- Think
- Connect
- Lead
- Move
- Express

Each score is on a 0–100 scale.

Let the scores sorted from highest to lowest be:

S1 >= S2 >= S3 >= ... >= S8

Also calculate:

- Mean = average of all eight domain scores
- Max = S1
- Min = S8
- Spread = Max - Min
- Gap12 = S1 - S2
- Gap23 = S2 - S3
- Gap34 = S3 - S4

Exact score equality remains a true tie.

---

## 3. Overall Interest Signal

Overall signal is based on the eight-domain mean.

### Low Overall Signal

Mean < 45

### Moderate Overall Signal

45 <= Mean < 65

### High Overall Signal

Mean >= 65

These ranges are provisional until pilot data exists.

They are used only for pattern classification, not for labelling a child as high or low ability.

---

## 4. Differentiation Level

Differentiation is based primarily on total spread.

### Low Differentiation

Spread <= 20

### Moderate Differentiation

20 < Spread < 35

### High Differentiation

Spread >= 35

These thresholds are provisional.

---

## 5. Near-Tie Rule

Two domains are considered a near tie when:

absolute score difference <= 10 points.

Exact ties are a special case of near ties.

The system must preserve the actual numeric scores.

Near tie does not mean equal score.

It means the domains belong to the same interpretive cluster for V1.

---

## 6. Leading Cluster

Starting from the highest-scoring domain:

include additional domains while each next domain remains within 10 points of S1.

Formally:

Leading Cluster
=
all domains where:

Score >= S1 - 10

This cluster may contain:

- 1 domain;
- 2 domains;
- 3 domains;
- 4 or more domains.

No arbitrary Top 3 limit is imposed.

---

## 7. Leading-Cluster Separation

After identifying the Leading Cluster:

find the highest-scoring domain outside the cluster.

Calculate:

Cluster Gap
=
lowest score inside Leading Cluster
-
highest score outside Leading Cluster

If every domain belongs to the Leading Cluster:

Cluster Gap is not applicable.

A cluster is considered clearly separated when:

Cluster Gap >= 15 points.

---

## 8. Pattern Classification Order

Evaluate patterns in this exact order:

1. Emerging Explorer
2. Broad Explorer
3. Blended Interest Pattern
4. Clear Exploration Pattern

The first matching rule becomes the final pattern.

This guarantees deterministic output.

---

## 9. Emerging Explorer

Classify as:

**Emerging Explorer**

when:

Mean < 45

AND

Max < 60

Interpretation:

Current interest signals are generally limited, uncertain, or still emerging.

Possible reasons may include:

- limited exposure;
- uncertainty;
- cautious response style;
- developmental change;
- not yet encountering preferred activities.

Do not interpret as lack of ability or potential.

### Highlighted Domains

None by default.

If one or more domains are >= 10 points above the Mean, they may be shown as:

**Emerging Signals**

not Top Domains.

---

## 10. Broad Explorer

Classify as:

**Broad Explorer**

when:

Mean >= 45

AND

Spread <= 20

AND

at least 5 domains are within 10 points of S1.

Interpretation:

The child currently shows relatively broad attraction across many activity types.

### Highlighted Domains

Do not force a ranked Top 3.

Primary result should display the broad Interest Map.

Optional secondary display may note all domains within 10 points of S1.

---

## 11. Blended Interest Pattern

Classify as:

**Blended Interest Pattern**

when:

- Leading Cluster contains 2 or 3 domains;

AND

- each domain in the cluster is within 10 points of S1;

AND

- Cluster Gap >= 15.

Interpretation:

Two or three interests currently form a meaningful leading combination.

### Highlighted Domains

All domains in the Leading Cluster.

Maximum expected V1 highlighted domains for Blended:

3.

---

## 12. Clear Exploration Pattern

Classify as:

**Clear Exploration Pattern**

when none of the previous three rules match.

This includes cases where:

### Case A

Leading Cluster contains 1 domain.

### Case B

Leading Cluster contains 2–3 domains but Cluster Gap < 15.

### Case C

Leading Cluster contains 4 or more domains but the overall profile is not sufficiently broad to qualify as Broad Explorer.

Interpretation must reflect actual score structure rather than forcing a single dominant domain.

### Highlighted Domains

Use the Leading Cluster.

If the cluster contains more than 3 domains:

show up to 4 highlighted exploration areas in the full report.

The Free Result may summarise the leading pattern without forcing ranking language.

---

## 13. Exact Tie Handling

Example:

Create = 80
Discover = 80
Build = 65

Create and Discover remain exactly tied.

The system must not internally promote one as interpretively first.

Stable rendering order may use fixed IDs only for display consistency.

The report must state that the two domains are tied.

---

## 14. Near-Tie Handling

Example:

Create = 80
Discover = 75

They belong to the same leading cluster.

The system may describe them as:

closely grouped leading interests.

It must not state that the 5-point difference represents a meaningful superiority.

---

## 15. Highlighted Domain Rules

### Emerging Explorer

Default:

0 highlighted domains.

Optional:

Emerging Signals.

### Broad Explorer

No forced Top 3.

Display the broad pattern.

### Blended Interest Pattern

Highlight:

2–3 domains.

### Clear Exploration Pattern

Highlight:

the full Leading Cluster.

Typical:

1–3 domains.

Possible:

4 domains.

---

## 16. Lower Domains

Domains outside the Leading Cluster remain part of the Interest Map.

They must not be labelled:

- weak;
- poor;
- unsuitable;
- low ability.

Preferred language:

- less selected at this stage;
- currently less prominent;
- lower current interest signal.

---

## 17. Discrete Score Compatibility

K68 domain-score increments:

12.5 points.

K912 domain-score increments:

5 points.

All classification rules use:

- >=
- <=
- <
- >

rather than requiring exact threshold equality.

Implementation should preserve full internal precision.

UI may round values for display.

---

## 18. Rounding Rule

Internal scoring:

retain full precision.

Classification:

use unrounded internal scores.

UI display:

may round to nearest whole number.

Do not classify using rounded display values.

---

## 19. Pattern Examples

### Example A — Emerging Explorer

Scores:

45, 40, 40, 35, 35, 30, 30, 25

Mean:

35

Max:

45

Result:

Emerging Explorer

---

### Example B — Broad Explorer

Scores:

80, 80, 75, 75, 75, 70, 70, 65

Mean:

73.75

Spread:

15

Domains within 10 of S1:

7

Result:

Broad Explorer

---

### Example C — Blended Interest Pattern

Scores:

85, 80, 60, 55, 50, 45, 40, 35

Leading Cluster:

85, 80

Cluster Gap:

20

Result:

Blended Interest Pattern

---

### Example D — Clear Exploration Pattern

Scores:

90, 70, 65, 60, 55, 50, 45, 40

Leading Cluster:

90

Result:

Clear Exploration Pattern

---

### Example E — Near-Tied Three-Domain Blend

Scores:

85, 80, 75, 55, 50, 45, 40, 35

Leading Cluster:

85, 80, 75

Cluster Gap:

20

Result:

Blended Interest Pattern

---

## 20. Classification Pseudocode

```text
calculate scores
sort scores descending

mean = average(scores)
spread = max(scores) - min(scores)

leadingCluster =
all domains with score >= max(scores) - 10

if mean < 45 and max(scores) < 60:
    pattern = EMERGING

else if mean >= 45
    and spread <= 20
    and count(scores >= max(scores) - 10) >= 5:
    pattern = BROAD

else:
    clusterGap = calculateClusterGap()

    if size(leadingCluster) in [2, 3]
        and clusterGap >= 15:
        pattern = BLENDED

    else:
        pattern = CLEAR21. Determinism Requirement

For identical input scores:

the classifier must always return:

identical patternType;
identical leadingCluster;
identical highlightedDomains;
identical tie metadata.

No report-content layer may independently recalculate the pattern.

22. Single Source of Truth

The scoring engine creates the scoring facts.

Free Result and Premium Parent Report consume those facts.

They must not independently infer:

ranking;
ties;
clusters;
pattern type.

This prevents report inconsistency.

23. Validation Requirement

Before freeze, boundary tests must include:

exact ties;
5-point near ties;
10-point near ties;
15-point separation;
low mean / low spread;
high mean / low spread;
2-domain cluster;
3-domain cluster;
4-domain cluster;
all eight nearly equal;
K68 discrete scores;
K912 discrete scores.
24. Current Status

The four audit findings are now logically resolved:

P1-01 Pattern overlap:
Resolved through explicit classification order and signal/differentiation rules.

P1-02 Blended ambiguity:
Resolved through deterministic Leading Cluster and Cluster Gap rules.

P1-03 Discrete resolution:
Resolved through inequality-based classification using unrounded scores.

P1-04 Highlight membership:
Resolved through explicit pattern-specific highlighted-domain rules.

Next gate:

Boundary Test Cases
→
Scoring Logic Freeze
→
Result Architecture
