# Personality Report Expansion Standard

## Purpose

This document defines the completion standard for adding a personality type to the complete-report system. A definition file or generator registry entry alone does not make a type complete. Completion requires meaningful content, compatible dynamic rules, successful generation, shared structural validation, and explicit frontend approval.

The existing report domain types remain authoritative. The expansion layer adds validation constants, a completeness validator, and an implementation manifest; it does not introduce a competing report model.

## Architecture sources

- Personality type codes: `src/data/personality/types.ts`
- Report domain contracts: `src/data/report/types.ts`
- Dynamic-rule contracts: `src/data/report/rules/types.ts`
- Canonical section source: `src/data/report/report-standard.ts`
- Expansion structure and validator: `src/data/report/personality-expansion-standard.ts`
- Definition registry: `src/data/report/generator/registry.ts`
- Rule registry: `src/data/report/generator/rule-registry.ts`
- Frontend eligibility: `src/data/report/generator/phase-one.ts`
- Implementation status: `src/data/report/personality-implementation-status.ts`

## Canonical complete-report structure

`COMPLETE_REPORT_SECTION_STANDARD` is derived from the existing verified 18-section standard. It freezes stable structural requirements without copying personality-specific prose.

| Order | Section ID | Required title | Access | Minimum blocks |
| ---: | --- | --- | --- | ---: |
| 01 | `report-identity` | Report Identity | free | 1 |
| 02 | `personality-overview` | Personality Overview | free | 1 |
| 03 | `dimension-results` | Dimension Results | free | 1 |
| 04 | `key-strengths` | Key Strengths | free | 1 |
| 05 | `growth-risks` | Growth Risks | free | 1 |
| 06 | `core-personality-pattern` | Core Personality Pattern | premium | 4 |
| 07 | `motivation-and-needs` | Motivation and Core Needs | premium | 4 |
| 08 | `information-processing` | Information Processing | premium | 4 |
| 09 | `decision-making` | Decision-Making Pattern | premium | 4 |
| 10 | `communication` | Communication and Conflict | premium | 4 |
| 11 | `teamwork-and-leadership` | Teamwork and Leadership | premium | 4 |
| 12 | `career-environment` | Career Environment | premium | 4 |
| 13 | `relationship-dynamics` | Relationship Dynamics | premium | 4 |
| 14 | `change-and-adaptation` | Change and Adaptation | premium | 4 |
| 15 | `stress-and-recovery` | Stress and Recovery | premium | 4 |
| 16 | `growth-roadmap` | Personal Growth Roadmap | premium | 4 |
| 17 | `ninety-day-action-plan` | 90-Day Action Plan | premium | 4 |
| 18 | `methodology` | Methodology and Interpretation Notes | premium | 4 |

Every definition must also provide a valid personality type, a meaningful report title, semantic report/content/rule versions, non-empty section descriptions, unique block and slot identifiers, supported block types, and meaningful body text. Obvious placeholders (`TODO`, `TBD`, `lorem ipsum`, and `coming soon`) fail validation.

Dynamic content must target an existing section and slot. A completed type must have a non-empty registered rule set and must produce an 18-section premium report with consistent applied-rule metadata.

## Completion levels

- `not_started`: no complete-report implementation has begun. A separate free personality profile may still exist.
- `content_in_progress`: the canonical scaffold exists, but personality-specific prose is incomplete or under review.
- `rules_in_progress`: the dynamic rule set is absent, incomplete, or under review.
- `domain_complete`: personality-specific prose and dynamic rules are complete, registered, and generator-compatible.
- `validated`: the shared completeness validator and required automated checks pass.
- `frontend_enabled`: the type is explicitly approved by the frontend eligibility gate.

`not_started` is exclusive. The two in-progress stages may coexist, but neither may coexist with `domain_complete`. A validated type must also be domain-complete, and a frontend-enabled type must be both domain-complete and validated. The implementation manifest records factual state only and does not control runtime eligibility.

Current status:

- ISFJ: `domain_complete`, `validated`, `frontend_enabled`
- ENTJ: `domain_complete`, `validated`, `frontend_enabled`
- ENTP: `content_in_progress`, `rules_in_progress`
- All other types: `not_started`

ENTP currently has a registered 18-section scaffold, but much of its prose is scaffold-derived and its rule set is empty. The generator can return its static scaffold, but ENTP is content-incomplete, rules-incomplete, not domain-complete, and not frontend-enabled.

## Remaining 14-type batch plan

ISFJ and ENTJ are already validated and frontend-enabled. The remaining types will be completed in the following batches without changing the canonical report architecture.

### Batch A — Analysts

- ENTP
- INTJ
- INTP

### Batch B — Diplomats

- INFJ
- INFP
- ENFJ
- ENFP

### Batch C — Sentinels

- ISTJ
- ESTJ
- ESFJ

### Batch D — Explorers

- ISTP
- ISFP
- ESTP
- ESFP

### Batch E — Release expansion

- Run all-16 validation.
- Review and expand frontend eligibility explicitly.
- Complete browser acceptance for every newly enabled type.
- Complete print acceptance for every newly enabled type.

For each personality implementation, the expected files or changes are:

- personality definition under `src/data/report/<type>/report.ts`
- dynamic rules under `src/data/report/<type>/rules/`
- registry and module export entries
- implementation manifest update
- validation fixtures only when a distinct boundary requires them

The following shared files should not normally change for each personality:

- report domain contracts
- canonical section standard
- report generator architecture
- frontend report template
- print CSS
- navigation components
- scoring and assessment contracts

Changes to these shared files require a separate architectural reason and review; adding personality prose alone is not such a reason.

## Per-personality state workflow

### A. Mark `content_in_progress`

Update only the implementation manifest before beginning personality-specific prose.

### B. Implement personality-specific report prose

Replace all scaffold-derived content, preserve the canonical section structure, and review identity references and type-prefixed IDs.

### C. Mark `rules_in_progress` when appropriate

Add this stage when dynamic-rule implementation begins or remains incomplete.

### D. Implement complete dynamic rules

Complete dimension, confidence, and combination rules with valid section and slot targets.

### E. Run single-type validation

Run the one-type command and resolve content, identity, export, rule-target, generator, and duplication errors.

### F. Mark `domain_complete`

Remove in-progress stages only after prose and rules are complete, registered, and generator-compatible.

### G. Run family and all-type validation

Validate the current batch and then the complete canonical registry to detect cross-personality conflicts.

### H. Mark `validated` only after all checks pass

Add `validated` only after single-type, family, all-type, typecheck, lint, and build checks pass. Frontend eligibility remains unchanged until Batch E.

## Batch validation commands

Validate one personality without editing a script:

```text
npm run validate:personality -- ENTP
```

Validate one planned family batch:

```text
npm run validate:personality-family -- analysts
npm run validate:personality-family -- diplomats
npm run validate:personality-family -- sentinels
npm run validate:personality-family -- explorers
```

Validate the complete canonical 16-type manifest:

```text
npm run validate:personality-all
```

The typed `validatePersonalityTypes([...])` API is also available for a selected list when a future batch does not match one of the documented families.

## Expansion checklist

### A. Domain implementation

- Start from the canonical section structure.
- Write and review personality-specific titles and prose; do not leave scaffold prose from another type.
- Preserve the 18 canonical IDs, order, access levels, and required titles.
- Use unique type-prefixed content block and dynamic slot IDs.
- Set semantic report, content, and rule versions.

### B. Dynamic rules

- Implement dimension, confidence, and combination rules appropriate to the type.
- Ensure every rule uses the correct personality type.
- Target only slots declared by the definition.
- Provide meaningful, non-placeholder dynamic content.
- Verify representative dimension and confidence boundaries.

### C. Generator validation

- Register the definition and rule set in their existing registries.
- Generate a premium report from representative dimension data.
- Confirm all 18 sections are present in order.
- Confirm applied-rule IDs and applied-rule count are consistent.

### D. Structural validation

- Run `validateCompletePersonalityDefinition`.
- Run the personality-specific tests where they exist.
- Run `npm run validate:personality-expansion`.
- Resolve every structured validation issue; do not waive empty or placeholder content.

### E. Frontend eligibility

- Mark the type `domain_complete` and `validated` in the manifest only after those facts are true.
- Review and change the explicit frontend eligibility gate separately.
- Add `frontend_enabled` only when the gate enables the same type.
- Confirm unavailable types still show the existing unavailable state.

### F. Browser acceptance

- Verify persisted and preview result loading.
- Review section order, content blocks, metadata, table of contents, anchors, navigation, recipient-name behaviour, and responsive layout.
- Confirm no unsupported type becomes visible accidentally.

### G. Print acceptance

- Review A4 portrait output using browser Print / Save as PDF.
- Check section headings, compact blocks, page breaks, metadata, table of contents, recipient name, and hidden interactive controls.
- Test with browser headers and footers disabled for the cleanest output.

### H. Commit and tag

- Keep each personality completion reviewable and isolated from unrelated work.
- Suggested completion commit: `feat(personality): complete ENTP report`
- Suggested completion tag: `personality-entp-complete`
- If frontend approval happens later, use a separate focused commit and tag.
- Create tags only after validation and review; this standardisation phase creates no tags.

## Required validation sequence

At minimum, run:

```text
npm run validate:personality-expansion
npm run typecheck
npm run lint
npm run build
git diff --check
```

Also run the full project `npm run validate` workflow and all report frontend, print, navigation, template, and recipient-name validators before frontend enablement.
