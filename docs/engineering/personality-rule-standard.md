# Personality Rule Standard

## Fixed rule inventory

Every complete personality rule set contains exactly 51 rules:

- 36 dimension rules: nine variants for each of EI, SN, TF, and JP;
- 7 confidence rules: four average-confidence bands and three
  balanced-dimension thresholds;
- 8 combination rules.

The required dimension variants are both preferences at `borderline`,
`moderate`, `strong`, and `very-strong`, plus one exactly balanced variant.

## Rule contract

Every rule implements `ReportRuleDefinition` and must:

- use the same `personalityType` as its report;
- use a unique, lowercase, personality-prefixed rule ID;
- have an integer priority and at least one condition;
- produce at least one uniquely identified English content block;
- target an existing section and declared dynamic slot;
- use an exclusive group where only one confidence or dimension variant may
  win;
- include tags needed by dimension and coverage validation.

Dimension rules interpret strength without treating confidence as quality.
Confidence rules qualify the whole narrative. Combination rules add
personality-specific interactions and must not merely repeat dimension prose.

## Selection behaviour

Rule ordering is deterministic. Higher priority resolves exclusive groups.
Applied rule IDs are preserved in generated-report metadata for traceability.
Rules enrich a static report; they do not score the assessment or alter the
result type.

## Content boundaries

Rule prose must:

- remain original to the personality;
- state contextual uncertainty where appropriate;
- avoid diagnosis, capability claims, and stereotypes;
- pair interpretation with practical observation or guidance;
- remain meaningful when read after the target static block.

Do not import frontend, API, database, authentication, payment, or scoring
modules. The rule layer depends only on report/rule domain types and its own
report definition for target validation.

## Versioning

Changing rule wording, thresholds, priority, targeting, or matching semantics
requires reviewing `ruleVersion`. Changing a slot requires coordinated report
and rule migration. Never silently retarget a released rule version.
