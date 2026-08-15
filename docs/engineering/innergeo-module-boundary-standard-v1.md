# InnerGeo Module Boundary & Engineering Standard V1

**Status:** Active engineering governance standard
**Protected baseline:** Personality Chinese Fixed Reports, commit `6ff16c3`

## 1. Core Principle

InnerGeo follows one governing architectural principle:

> Modules are independent; contracts connect them.

Shared infrastructure does not mean shared scientific interpretation. A module may consume an approved shared contract, but it must retain ownership of its business semantics, scoring assumptions, interpretation rules, content, and validation evidence.

The required engineering sequence is:

> Local failure → local diagnosis → local modification → local validation → boundary validation.

## 2. Platform Modules

The platform is governed as the following dependency layers:

| Module | Responsibility |
| --- | --- |
| M00 Platform Foundation | Runtime, repository conventions, shared utilities, and foundational engineering contracts |
| M10 Assessment Core | Reusable assessment lifecycle infrastructure without domain-specific scientific meaning |
| M20 Personality | Personality questions, scoring, result interpretation, and domain contracts |
| M30 Career | Career/RIASEC questions, scoring, result interpretation, and domain contracts |
| M40 Kids | Kids assessment questions, scoring, result interpretation, and age-specific domain contracts |
| M50 Zodiac | Zodiac inputs, calculation, interpretation, and domain contracts |
| M60 Report Content & Locale | Report structures, fixed content assets, locale-specific content, and content validation |
| M70 Report Delivery | Authorized payload construction, serialization, rendering, print, and delivery |
| M80 Commercial | Accounts, ownership, entitlements, payments, and provider integrations |
| M90 Presentation | Routes, page composition, shared UI, visual design, and accessibility |
| M100 Release & Validation | Module gates, boundary validation, protected baselines, and release evidence |

This is a dependency model, not permission for every later module to import every earlier implementation. Connections must use the narrowest approved public contract.

## 3. Four Assessment Domains

Personality, Career, Kids, and Zodiac are conceptually independent assessment domains. They may share lifecycle infrastructure, typed result envelopes, locale utilities, and presentation primitives, but they must not directly reuse one another's business-specific scoring or interpretation semantics.

Direct cross-assessment business imports are forbidden by default. Any future exception requires an explicit architecture decision, a documented contract, ownership, and boundary validation.

## 4. Standard Assessment Lifecycle

The standard lifecycle is:

1. create a session using an explicit assessment domain and locale;
2. collect and validate domain-owned answers or inputs;
3. execute domain-owned scoring or calculation;
4. persist a typed result contract;
5. resolve domain-owned interpretation/report content;
6. authorize any protected delivery through account and entitlement contracts;
7. render the authorized payload without recalculating the assessment;
8. validate the changed module and its dependency boundaries.

Shared lifecycle steps may be implemented once. Domain meaning must remain owned by the relevant assessment module.

## 5. Core Processing Boundary

Assessment scoring, calculation, profile routing, and interpretation belong to their domain processing layer. Frontend pages and report renderers must not calculate assessment results or reconstruct domain scoring.

Processing must be deterministic for the same validated input unless a domain standard explicitly defines otherwise. Presentation state, payment state, browser storage, and visual layout must not influence scoring or interpretation.

## 6. Chinese and English Content Boundary

Chinese and English report content are independent content assets that share a structural contract. English content changes must not alter Chinese report content, and Chinese content changes must not alter English report content.

Shared IDs, schemas, section order, and renderer contracts may be common. Translation or editorial work in one locale must be reviewed and validated as a locale-specific change; it must not silently regenerate, overwrite, or semantically rewrite the other locale.

## 7. Report Delivery Boundary

M70 is a renderer and delivery layer, not a scoring layer. It may receive a validated persisted result, resolve an approved report payload, enforce delivery constraints, and render browser/print output. It must not score answers, change dimension results, select a different assessment identity, or infer new scientific meaning.

Premium fixed-report source assets remain server-side. Browser code may consume only the approved serializable delivery contract and client-safe validation/types.

## 8. Commercial Boundary

Accounts, ownership, entitlements, checkout, provider webhooks, and payment records belong to M80. Payment is connected to assessment/report delivery through authenticated resource ownership and entitlement/access contracts, not through assessment semantics.

Assessment processing must not import payment-provider implementations. A payment event may unlock an already identified report resource; it must not change scoring, interpretation, profile routing, or report content.

## 9. Presentation Boundary

M90 presents typed domain and delivery contracts. Visual redesign, component refactoring, responsive behavior, print styling, and navigation changes cannot modify scoring or interpretation.

Presentation may format values and choose localized labels already authorized by a contract. It must not recreate business decisions that belong to assessment, report resolution, or commercial access.

## 10. Dependency Rule

Dependencies flow through explicit contracts and approved shared layers. The default rules are:

- assessment domains do not import another assessment domain's business implementation;
- domain code may import shared infrastructure that contains no foreign domain semantics;
- report content may use shared report contracts but not payment/provider implementations;
- report renderers consume report payloads and must not import scoring implementations;
- commercial code identifies resources through ownership/access contracts and must not interpret assessment results;
- presentation imports public contracts rather than private server assets;
- reverse dependencies and circular domain dependencies are forbidden.

## 11. Change Levels

Every task must identify its change level:

1. **Local content/presentation:** one owned asset or view; validate locally and confirm structural contracts.
2. **Module behavior:** domain logic or a module public contract; require focused tests plus module validation.
3. **Boundary change:** dependency direction, shared contract, delivery, or commercial connection; require affected-module and boundary validation.
4. **Platform/release change:** shared lifecycle, release gate, or protected baseline; require an explicit plan, broad evidence, and release approval.

The declared level does not reduce testing. If implementation crosses a higher boundary, the task must stop and be re-scoped.

## 12. Passed Module Lock

A passed module is a protected baseline. It cannot be opportunistically reformatted, regenerated, renamed, or refactored by an unrelated task. Changes require explicit scope, local evidence, boundary evidence, and a new approved baseline.

The current protected baseline is **Personality Chinese Fixed Reports** at commit `6ff16c3`, including:

- 64 Chinese fixed reports;
- Preference Clarity;
- the four Band boundaries;
- Profile A/B/C/D routing;
- fixed report payload;
- fixed renderer;
- Chinese print/PDF behavior;
- Premium server-side asset isolation.

This governance task does not modify that baseline.

## 13. Failure Isolation

Failures must be diagnosed at the smallest owning boundary. A Personality content failure is not repaired in Career, a rendering failure is not repaired by changing scoring, and a payment failure is not repaired by changing report interpretation.

When the cause crosses a contract, record the failing producer, contract, and consumer separately. Do not broaden a local fix until evidence proves the boundary itself is defective.

## 14. Module Availability

Module availability and feature switches should eventually have one centralized, auditable source of truth instead of scattered route, component, or data-layer checks. Availability is a release decision and must remain separate from domain completeness.

Implementing or migrating feature switches is explicitly outside this standard's initial governance task.

## 15. Validation Architecture

Validation follows the dependency structure:

1. focused unit/content validation for the changed artifact;
2. owning-module validation;
3. contract validation for producers and consumers;
4. machine-executable module-boundary validation;
5. release/build/browser/PDF validation only when the change reaches those layers.

Boundary validators should be deterministic, explicit, narrow, and audit-friendly. They must protect real contracts rather than speculative directory preferences. Approved exceptions must be documented and encoded deliberately; silent exceptions are forbidden.

## 16. Git and Release Discipline

- Inspect branch, HEAD, status, instructions, and protected baselines before editing.
- Preserve unrelated tracked and untracked worktree changes.
- Never use broad staging such as `git add .` for scoped work.
- Do not reset, restore, clean, checkout, stash, or overwrite unrelated work.
- Review diffs by explicit task path.
- Keep the index empty unless the user explicitly authorizes staging.
- Do not commit, push, deploy, or change release state without explicit authorization.
- Release evidence must identify the exact code/content version and commands run.

## 17. Required Task Header

Engineering tasks that can affect a module or boundary must state:

- repository and branch;
- module owner and change level;
- goal and non-goals;
- allowed files and protected files;
- affected contracts and dependency direction;
- protected baseline, if any;
- required focused, module, and boundary validation;
- Git permissions: stage, commit, push, and deploy;
- stop conditions for newly discovered architecture violations.

Missing scope or ownership is a reason to pause before mutation, not permission to infer a broader task.

## 18. Current Roadmap

The governance roadmap is:

1. formalize module ownership and dependency rules;
2. enforce direct cross-assessment and high-value delivery boundaries;
3. add focused boundary checks only when a real contract needs protection;
4. centralize module availability through a separately reviewed architecture task;
5. continue locale-asset independence and protected report delivery;
6. preserve passed modules while each domain evolves through its own validation gates.

This roadmap does not authorize a platform refactor or feature-switch implementation.

## 19. Governing Rule

When speed, convenience, or reuse conflicts with module ownership, use the contract boundary:

> Modules are independent; contracts connect them. Diagnose and modify locally, validate the owning module, then validate the boundary.
