# InnerGeodessa Architecture and Product Decisions

## D-001 — Python Is the Production Scoring Source

Status:
Accepted

Decision:
The Python scoring engine remains the single production scoring source.

Reason:
One production authority prevents scoring drift and preserves the validated result path.

Do Not:
Create a second independent production scoring implementation.

## D-002 — Preserve Versioned Question Banks and Session Snapshots

Status:
Accepted

Decision:
Question-bank versions and session question snapshots must remain part of the assessment architecture.

Reason:
Each session must retain the exact question set and scoring semantics assigned when it was created.

Do Not:
Allow a new question bank to change historical or active sessions.

## D-003 — Complete the Personality MVP Before RIASEC

Status:
Accepted

Decision:
Close the personality assessment MVP before implementing RIASEC.

Reason:
Finishing one complete assessment flow reduces product and validation risk.

Do Not:
Develop two production scoring systems at the same time.

## D-004 — Anonymous Testing Before Mandatory Registration

Status:
Accepted

Decision:
The assessment remains usable anonymously before mandatory account registration is introduced.

Reason:
The current priority is validating and closing the assessment experience without adding identity-system friction.

Do Not:
Make a user account mandatory in the current stage.

## D-005 — Supabase Is a Future Candidate

Status:
Accepted

Decision:
Supabase may be evaluated later but is not part of the current implemented architecture.

Reason:
The existing database and backend support the current MVP and should remain stable while product closure is the priority.

Do Not:
Migrate the current database or backend to Supabase during the present stage.

## D-006 — ContentAccess Is a Content-Tier Label

Status:
Accepted

Decision:
`ContentAccess` currently labels content as `free` or `premium`.

Reason:
The current personality content system uses these values to describe content tiers, not to enforce server-side authorisation.

Do Not:
Treat `free` or `premium` as implemented server permissions.

## D-007 — Standardise Personality Content Before Migrating 14 Types

Status:
Accepted

Decision:
The personality content model and quality baseline must be standardised before the remaining 14 profiles are migrated.

Reason:
Freezing the structure first prevents inconsistent profiles and repeated rework.

Do Not:
Bulk-generate or bulk-migrate all remaining personality profiles before standardisation.

## D-008 — Result Retrieval Before Registry Implementation

Status:
Accepted

Decision:
Persistent result retrieval is the next implementation priority, ahead of a formal personality registry.

Reason:
Refreshing or reopening a completed result is a product-closure requirement, while the current index already provides minimum profile lookup.

Do Not:
Start the registry refactor before Stage 2.1 result persistence is complete.

## D-009 — Module Boundaries and Minimum Blast Radius

Status:
Accepted

Decision:
Change one module at a time and keep each change within the smallest practical boundary. Pages consume defined interfaces instead of containing scoring, payment, or database details.

Reason:
Small, isolated changes are easier to validate, review, and reverse.

Do Not:
Mix unrelated modules in one change or place scoring, payment, or database implementation details directly in pages.

## D-010 — Zone Separation and Controlled Interfaces

Status:
Accepted

Decision:
Keep public, test, scoring, report, identity, private, billing, and integration zones separate and connect them only through explicit interfaces.

Reason:
Controlled boundaries limit coupling and make security, testing, and future replacement safer.

Do Not:
Create implicit cross-zone dependencies or bypass defined interfaces.

## D-011 — Minimum Personal Data Collection

Status:
Accepted

Decision:
Future identity work should use an internal `userId`, use email for verification and notifications, and use a display name only for display.

Reason:
The product should collect only the personal data required to provide its service.

Do Not:
Collect unnecessary real-world identity information.

## D-012 — Git Is the Code Fact Layer

Status:
Accepted

Decision:
Committed repository state is the stable source of code truth. Each module should have an independent commit, and important steps must remain reversible.

Reason:
Git provides an auditable recovery point that does not depend on chat history or local memory.

Do Not:
Treat uncommitted work as stably completed or combine unrelated modules in a commit.

## D-013 — Keep the InnerGeodessa Project Name

Status:
Accepted

Decision:
The current project name remains InnerGeodessa.

Reason:
`InnerGeo` is only a candidate abbreviation and no formal rename has been approved or implemented.

Do Not:
Start a product or repository rename to InnerGeo without a separate accepted decision.

## D-014 — Prioritise Product Closure Over Infrastructure Expansion

Status:
Accepted

Decision:
The current priority is closing the personality MVP rather than expanding infrastructure.

Reason:
Result recovery and a complete user flow provide more immediate product value than speculative platform work.

Do Not:
Prioritise login, payment, AI, SaaS, or large-server infrastructure in the current stage.
