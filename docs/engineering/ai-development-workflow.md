# AI Development Workflow

## Required sequence

```text
Read standards
→ copy _template
→ define personality positioning
→ implement report
→ implement rules
→ integrate registries
→ update manifest
→ run individual validation
→ run family validation
→ run global validation
→ manual audit
→ independent commit
```

## Working rules

Before editing, inspect canonical types, one completed module, registries,
manifest, validation scripts, and the frontend gate. Treat completed prose as
evidence of depth—not as text to transform or reuse.

Write a failing expansion or single-type validation before registering a new
module. Complete one personality at a time. After each personality, run
typecheck, single-type validation, and expansion validation so errors remain
local.

Define positioning before prose. Maintain a vocabulary sheet for strengths,
risks, motivations, decisions, relationships, stress, and development. Search
for copied blocks, wrong codes, mechanical replacements, placeholder text,
and unsupported clinical claims.

AI-generated drafts require human editorial review. Passing exact-duplicate
checks does not prove conceptual originality or psychometric validity.

## Scope control

Do not combine personality expansion with scoring, frontend redesign,
database, API, payment, authentication, email, or i18n work. Do not make a
type frontend-visible merely because its generator is complete.

Use precise path-based Git review. Never stage with `git add .` during a
multi-phase worktree. Do not commit until the complete phase passes all
required checks.
