# InnerGeo Kids — Unified Scoring Architecture V1.0

**Status:** Scoring Design Standard
**Production Ready:** No
**Applies To:** KIDS-K68-RF-V1 and KIDS-K912-RF-V1

---

## 1. Purpose

This scoring architecture defines how InnerGeo Kids converts item responses into an eight-domain Interest Map.

The scoring system must remain:

- transparent;
- deterministic;
- age-appropriate;
- domain-balanced;
- reproducible;
- explainable to parents;
- resistant to false precision.

The system must not imply that a small score difference represents a meaningful fixed difference in the child.

---

## 2. Domains

The scoring model contains eight domains:

1. Create
2. Discover
3. Build
4. Think
5. Connect
6. Lead
7. Move
8. Express

No domain is inherently better than another.

---

## 3. Release Form Structure

### Ages 6–8

Release Form:

`KIDS-K68-RF-V1`

Scored items:

32

Structure:

4 items × 8 domains

### Ages 9–12

Release Form:

`KIDS-K912-RF-V1`

Scored items:

40

Structure:

5 items × 8 domains

Each domain has equal item count within its age form.

---

## 4. Response Scale

Recommended V1 internal scoring:

1 = Not interested / Not for me
2 = A little interested
3 = Maybe / Neutral interest
4 = Interested
5 = Very interested / Would really like to try

Child-facing wording may differ by age.

The numerical scale remains internal.

---

## 5. Ages 6–8 Response Presentation

Recommended child-facing presentation:

1 — Not for me
2 — Maybe not
3 — Maybe
4 — Sounds fun
5 — I really want to try

Visual response controls may use simple icons or faces, but the visual design must not make higher values appear morally or emotionally better.

---

## 6. Ages 9–12 Response Presentation

Recommended wording:

1 — Not interested
2 — A little interested
3 — Maybe
4 — Interested
5 — Very interested

The response should measure attraction to the activity, not confidence in ability.

---

## 7. Raw Domain Score

For each domain:

Raw Score
=
sum of all scored item responses in that domain.

### K68

4 items per domain.

Minimum raw domain score:

4

Maximum raw domain score:

20

### K912

5 items per domain.

Minimum raw domain score:

5

Maximum raw domain score:

25

---

## 8. Normalised Domain Score

To compare age forms using the same result architecture, convert each raw score to a 0–100 scale.

Formula:

Normalised Score
=
((Raw Score - Minimum Possible Score)
/
(Maximum Possible Score - Minimum Possible Score))
× 100

### K68 Example

Raw score:

16

Minimum:

4

Maximum:

20

Normalised:

((16 - 4) / 16) × 100
=
75

### K912 Example

Raw score:

20

Minimum:

5

Maximum:

25

Normalised:

((20 - 5) / 20) × 100
=
75

Both represent the same relative level on their respective forms.

---

## 9. Domain Ranking

After normalisation, rank all eight domains from highest to lowest.

Ranking is descriptive.

It does not automatically determine a Top 3 result.

The system must preserve:

- exact scores;
- ranking;
- ties;
- score gaps.

---

## 10. Exact Ties

Exact ties must remain visible as ties.

Do not resolve ties by a fixed domain order for interpretive purposes.

Example:

Create: 75
Discover: 75

The result must preserve:

Create = Discover

not:

Create > Discover

A deterministic internal order may be used only for rendering stability, but it must not create interpretive priority.

---

## 11. Score Gaps

Calculate:

- first-second gap;
- second-third gap;
- third-fourth gap;
- highest-lowest spread;
- standard deviation or equivalent spread indicator if later required.

V1 should primarily use simple score gaps and total spread.

---

## 12. Result Pattern Types

The system should classify the overall Interest Map into one of four primary pattern types.

### A. Clear Exploration Pattern

Use when:

- one or several domains are meaningfully higher;
- separation from lower domains is clear enough to justify highlighted exploration areas.

Interpretation:

The child currently shows stronger attraction toward a smaller set of activity types.

Do not call this a fixed strength or talent profile.

---

### B. Blended Interest Pattern

Use when:

- several leading domains are close;
- combinations appear more informative than a single leading domain.

Interpretation:

The child may enjoy activities that combine multiple interests.

Example:

Create + Express

or

Discover + Build

---

### C. Broad Explorer

Use when:

- many domains are similarly high;
- differentiation is low;
- the child appears interested in many kinds of activities.

Interpretation:

This is a valid result.

Do not force a Top 3.

A broad profile may indicate a good stage for wide exploration.

---

### D. Emerging Explorer

Use when:

- domain scores are generally low or moderate;
- no clear pattern emerges;
- responses may reflect limited exposure, uncertainty, developmental change, or cautious responding.

Interpretation:

The result should encourage low-pressure exposure to different activities.

Do not interpret this as lack of interest, ability, or potential.

---

## 13. Initial Pattern Thresholds

Thresholds are provisional until pilot data exists.

For V1 design purposes:

### Broad Explorer Candidate

Possible when:

- highest-lowest spread <= 20 points;
- and at least five domains fall within 10 points of the highest score.

### Blended Pattern Candidate

Possible when:

- top two or top three domains are within 10 points;
- but lower domains show more separation.

### Clear Pattern Candidate

Possible when:

- leading domain or domain cluster is separated from the next meaningful group by >= 15 points.

### Emerging Explorer Candidate

Possible when:

- highest domain score < 55;
- and no meaningful separation exists.

These thresholds are provisional and must be reviewed after pilot data.

---

## 14. Threshold Priority Rule

Do not classify patterns using one rule only.

Suggested evaluation order:

1. Emerging Explorer
2. Broad Explorer
3. Blended Interest Pattern
4. Clear Exploration Pattern

This prevents the system from forcing a clear pattern when overall differentiation is weak.

---

## 15. Top Domain Display

Top domains may be shown only when the pattern supports meaningful differentiation.

### Clear Pattern

May display:

- Top 1
- Top 2
- Top 3

depending on score structure.

### Blended Pattern

Display:

- leading combination
- tied or near-tied domains

### Broad Explorer

Do not display a forced ranked Top 3 as the primary interpretation.

### Emerging Explorer

Do not display a strong hierarchy when signals are weak.

---

## 16. Interest Strength Language

Avoid:

- strongest ability
- best domain
- weakest domain
- bad at
- gifted
- talent score
- intelligence score

Preferred:

- stronger current interest signal
- currently more drawn to
- frequently selected
- emerging interest
- blended interest
- broad interest
- less selected at this stage

---

## 17. Lower-Ranked Domains

A lower-ranked domain means:

the child selected those activities less often or with lower interest relative to other domains at this time.

It does not mean:

- inability;
- weakness;
- unsuitability;
- lack of potential;
- permanent disinterest.

---

## 18. Interest Map Output Contract

The scoring result should preserve:

- ageForm
- assessmentVersion
- questionBankVersion
- releaseFormVersion
- domainRawScores
- domainNormalisedScores
- domainRanking
- exactTies
- firstSecondGap
- secondThirdGap
- thirdFourthGap
- highestLowestSpread
- patternType
- highlightedDomains
- blendedDomains
- scoringVersion

---

## 19. Example Result Object

Conceptual structure:

```text
ageForm: K912
releaseFormVersion: KIDS-K912-RF-V1

scores:
Create: 75
Discover: 85
Build: 80
Think: 85
Connect: 50
Lead: 45
Move: 55
Express: 60

ties:
Discover = Think

patternType:
Blended Interest Pattern

highlightedDomains:
Discover
Think
BuildThis is illustrative only.

20. No Fixed Tie-Break Priority

The Kids system must not repeat the adult Career deterministic interpretation problem.

A fixed domain order must never change:

equal evidence

into:

unequal interpretation.

Internal stable sorting may exist for software rendering only.

The report must preserve the tie.

21. Free Result Use

The Free Result may show:

Interest Map;
pattern type;
highlighted domains where justified;
short domain explanations;
one exploration suggestion per highlighted domain.

Free Result must remain useful.

22. Premium Report Use

The Premium Parent Report may use the same scoring facts to add:

deeper domain explanations;
combination interpretation;
current interest signals;
lower-selected domain context;
exploration style;
activity suggestions;
parent observation prompts;
three-month exploration plan;
longitudinal comparison in future versions.

Premium value must come from interpretation and actionability.

It must not use stronger certainty claims.

23. No Hidden Ability Score

V1 must not silently infer:

aptitude;
intelligence;
talent;
future career success;
academic potential

from interest scores.

If ability assessment is added in the future, it must be a separate construct with separate evidence and scoring.

24. Missing Responses

Production form should normally require all scored items to be answered.

If missing responses are ever allowed:

do not treat missing as neutral;
do not silently impute;
return incomplete status unless a documented scoring rule exists.

V1 recommendation:

require all scored items before final scoring.

25. Retakes

Retakes may be allowed.

Each completed assessment should create a new result resource.

Do not overwrite previous results.

Future longitudinal reporting may compare results over time.

Children's interests are expected to change.

Change is not inconsistency or failure.

26. Scoring Versioning

Initial scoring version:

KIDS-SCORING-V1

Any future change to:

response values;
normalisation;
pattern thresholds;
tie handling;
pattern classification

requires a new scoring version.

27. Validation Status

This scoring architecture may become:

Engineering Validated

after deterministic implementation and tests.

Professionally Reviewed

after construct, interpretation, fairness, and reporting review.

It is not:

Psychometrically Validated

until supported by appropriate real-sample evidence.

28. Pilot Data Review

After pilot data becomes available, review:

score distributions;
ceiling/floor effects;
domain correlations;
domain separation;
frequency of ties;
Broad Explorer frequency;
Emerging Explorer frequency;
item redundancy;
subgroup differences;
response-scale behaviour.

Thresholds must be adjusted only with documented evidence.

29. Core Scoring Principle

The system should answer:

What kinds of activities is this child currently more interested in exploring?

It should not answer:

What is this child destined to become?

The scoring system creates an Interest Map.

It does not create a permanent identity label.


<!-- KIDS-RESPONSE-CONTRACT-V1 -->
## Administration Layer Clarification — 2026-08-10

The response administration layer is defined by `KIDS-RESPONSE-V1`:

- K68 exposes values `1 / 3 / 5`.
- K912 exposes values `1 / 2 / 3 / 4 / 5`.

The scoring layer remains `KIDS-SCORING-V1` and consumes the stored canonical raw values without inventing intermediate K68 responses.
