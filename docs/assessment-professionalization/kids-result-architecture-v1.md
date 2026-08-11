# InnerGeo Kids — Interest Map & Result Architecture V1.0

**Status:** Result Architecture Design
**Production Ready:** No
**Scoring Version:** `KIDS-SCORING-V1`
**Applies To:** `KIDS-K68-RF-V1` and `KIDS-K912-RF-V1`

---

## 1. Purpose

This document defines how InnerGeo Kids converts frozen scoring facts into an understandable Interest Map.

The result layer must not recalculate scoring logic.

It consumes the output of:

`KIDS-SCORING-V1`

and turns it into:

- child-friendly feedback;
- parent-facing interpretation;
- exploration suggestions;
- premium report inputs.

---

## 2. Core Result Principle

The result answers:

> What kinds of activities is this child currently more interested in exploring?

It does not answer:

> What is this child naturally best at?

or:

> What career should this child choose?

---

## 3. Eight-Domain Interest Map

Every completed result contains all eight domains:

1. Create
2. Discover
3. Build
4. Think
5. Connect
6. Lead
7. Move
8. Express

All eight remain visible.

No domain disappears because it ranks lower.

---

## 4. Domain Result Object

Each domain result should contain:

- domainId
- displayName
- rawScore
- normalisedScore
- rankPosition
- exactTie
- leadingClusterMember
- highlighted
- signalLabel
- shortDescription
- explorationExamples

The scoring engine supplies factual scoring fields.

The result layer supplies descriptive content.

---

## 5. Pattern Types

The result architecture supports four frozen scoring patterns:

### Clear Exploration Pattern

A clearer leading direction is currently visible.

### Blended Interest Pattern

Two or three interests form a meaningful leading combination.

### Broad Explorer

Interest is distributed broadly across multiple activity types.

### Emerging Explorer

The current result does not yet show strong or differentiated interest signals.

The result layer must preserve the exact pattern returned by the scoring engine.

---

## 6. Clear Exploration Pattern Result

Primary message:

> Some types of activities currently stand out more clearly in your child’s Interest Map.

Show:

- full 8-domain map;
- Leading Cluster;
- short explanation of each highlighted domain;
- combination interpretation where relevant;
- exploration suggestions.

Do not automatically call the highest domain:

“the child's strongest area.”

---

## 7. Blended Interest Pattern Result

Primary message:

> Several interests appear to work together rather than one interest standing alone.

Show:

- 2–3 highlighted domains;
- combined-interest explanation;
- examples of activities that combine those interests;
- full eight-domain Interest Map.

Examples:

Create + Express

may suggest enjoyment of:

- storytelling;
- visual communication;
- presentation;
- creative media.

Discover + Build

may suggest enjoyment of:

- testing;
- making;
- experimenting;
- improving physical solutions.

Combination examples are exploratory, not diagnostic.

---

## 8. Broad Explorer Result

Primary message:

> Your child currently appears open to many different kinds of activities.

Do not force:

- Top 1;
- Top 2;
- Top 3.

Show:

- full Interest Map;
- broad-pattern explanation;
- several varied exploration ideas;
- parent observation prompts.

Core recommendation:

continue broad exposure before narrowing.

---

## 9. Emerging Explorer Result

Primary message:

> Your child’s interests may still be developing or may not yet be clearly differentiated.

Do not display:

“low interest child.”

Do not imply:

lack of curiosity or potential.

Show:

- full Interest Map;
- Emerging Signals if returned by scoring;
- low-pressure exploration suggestions;
- parent observation prompts;
- recommendation to observe preferences over time.

---

## 10. Signal Language

Preferred domain language:

### Highlighted

- stronger current interest signal
- currently more drawn to
- stands out in the current Interest Map

### Middle-range

- part of the current interest mix
- moderately selected
- worth continuing to explore

### Lower-selected

- currently less prominent
- less frequently selected at this stage
- may benefit from more exposure before interpretation

Never use:

- weak
- poor
- bad
- unsuitable
- low ability

---

## 11. Result Hierarchy

Every result should follow this order:

### Layer 1 — Pattern

Clear / Blended / Broad / Emerging

### Layer 2 — Interest Map

All eight domains.

### Layer 3 — Highlighted Signals

Only when justified by scoring.

### Layer 4 — Interpretation

What the pattern may mean.

### Layer 5 — Exploration

What the child can try next.

### Layer 6 — Parent Observation

What adults can notice over time.

---

## 12. Free Result Architecture

The Free Result must be genuinely useful.

Recommended sections:

### 1. Your Interest Pattern

Short explanation of the overall pattern.

### 2. Your Interest Map

All eight domains.

### 3. Areas That Stand Out

Only when scoring supports highlighting.

### 4. What This Might Look Like

Simple examples of activities.

### 5. Try This Next

1–3 practical exploration ideas.

### 6. Important Note

Interest is not ability, talent, or destiny.

---

## 13. Premium Parent Report Architecture

Premium adds interpretation depth and actionability.

Recommended V1 sections:

1. Parent Executive Summary
2. Child’s Current Interest Pattern
3. Full Eight-Domain Interest Map
4. Highlighted Interest Signals
5. Interest Combination Analysis
6. Create Interpretation
7. Discover Interpretation
8. Build Interpretation
9. Think Interpretation
10. Connect Interpretation
11. Lead Interpretation
12. Move Interpretation
13. Express Interpretation
14. Exploration Environment
15. Activities to Try
16. Parent Observation Guide
17. 30-Day Exploration Plan
18. 3-Month Development & Review Plan

Premium report must use the same scoring facts as Free Result.

It may provide deeper interpretation.

It must not provide stronger certainty claims.

---

## 14. Age-Layer Adaptation

The underlying scoring facts remain structurally consistent.

Presentation differs by age.

### Ages 6–8

Prioritise:

- simple language;
- visual Interest Map;
- short explanations;
- activity examples;
- parent-supported reading.

### Ages 9–12

May include:

- slightly deeper explanations;
- combinations;
- self-reflection prompts;
- more independent activity suggestions.

---

## 15. Child-Facing vs Parent-Facing Content

### Child-Facing

Focus on:

- curiosity;
- activities;
- exploration;
- encouragement to try.

### Parent-Facing

Focus on:

- observation;
- exposure;
- environmental support;
- avoiding premature labels;
- recognising changing interests.

The parent report must not encourage adults to turn the result into a fixed identity.

---

## 16. Interest Combination Layer

Combination interpretation should exist only when supported by scoring.

Priority:

1. Blended Interest Pattern
2. Clear Pattern with multi-domain Leading Cluster

Combination content should explain:

how two or more interests may appear together in activities.

It should not create a new hidden personality type.

---

## 17. Activity Recommendation Model

Activity recommendations should be generated from:

Domain
+
Age Band
+
Pattern
+
Optional Domain Combination

Examples:

Create:

- make a poster;
- invent a character;
- redesign an everyday object.

Discover:

- observe changes;
- compare clues;
- test simple explanations.

Build:

- assemble;
- repair;
- construct;
- test physical designs.

Think:

- puzzles;
- patterns;
- strategy activities;
- classification.

Connect:

- help someone practise;
- explain;
- collaborate;
- listen and support.

Lead:

- organise a small project;
- coordinate roles;
- help a group begin.

Move:

- explore environments;
- move through activity stations;
- active outdoor discovery.

Express:

- stories;
- presentations;
- visual explanation;
- performance.

---

## 18. Recommendation Safety

Recommendations must avoid assumptions about:

- family income;
- access to specialised equipment;
- private schooling;
- travel;
- expensive lessons;
- physical ability.

Whenever possible include:

- free option;
- home option;
- school/community option.

---

## 19. Parent Observation Framework

Parents should observe:

### Attraction

Does the child voluntarily return to the activity?

### Attention

Does the child remain engaged?

### Curiosity

Does the child ask questions or explore further?

### Initiative

Does the child begin related activities independently?

### Variation

Does the child try different versions?

### Social Preference

Do they prefer doing it alone, together, or while helping others?

Observation is supplementary evidence.

It must not override the child’s responses automatically.

---

## 20. Longitudinal Principle

A single result is a snapshot.

Future retakes may show:

- stable interests;
- emerging interests;
- declining interests;
- broader exploration;
- narrowing interests.

Changes should be described as development.

Not inconsistency.

---

## 21. Result Data Contract

Recommended conceptual result object:

```text
resultId
userId
childProfileId
ageBand
assessmentVersion
questionBankVersion
releaseFormVersion
scoringVersion
completedAt

patternType

domainResults[
    domainId
    rawScore
    normalisedScore
    exactTie
    leadingClusterMember
    highlighted
]

leadingCluster
highlightedDomains
emergingSignals
exactTies

freeResultVersion
premiumReportVersion
```

---

## 22. Single Source of Truth

The scoring engine owns:

scores;
ties;
ranking;
Leading Cluster;
patternType;
highlighted-domain eligibility.

The result layer owns:

wording;
explanations;
exploration suggestions;
parent guidance.

The report layer must never independently alter scoring facts.

23. Commercial Boundary

Free result:

useful and complete enough to understand the Interest Map.

Premium report:

deeper interpretation
+
parent guidance
+
structured exploration plan.

Premium must not work by hiding essential scoring information.

24. Current Status

Completed:

Candidate Pools
→
Release Forms
→
Scoring Architecture
→
Scoring Logic
→
Boundary Tests
→
Scoring Freeze
→
Result Architecture Design

Next:

Free Result Content
→
Premium Parent Report Content
→
Parent Guidance / Ethics / Privacy
→
Engineering Mapping

25. Core Result Principle

InnerGeo Kids does not tell children:

This is who you are.

It helps them ask:

What kinds of things would I like to explore more?
