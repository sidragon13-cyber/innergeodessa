# Personality Module Boundaries

## Required module layout

```text
src/data/report/<type>/
├── index.ts
├── report.ts
├── validation.ts
└── rules/
    ├── index.ts
    ├── dimension-rules.ts
    ├── confidence-rules.ts
    ├── combination-rules.ts
    └── validation.ts
```

`index.ts` exports the complete report, report validator, three rule groups,
combined rule set, rule validator, and their public result types.

## Integration points

A completed module is integrated explicitly:

1. report definition in `generator/registry.ts`;
2. combined rules in `generator/rule-registry.ts`;
3. public symbols in `src/data/report/index.ts`;
4. truthful stages in `personality-implementation-status.ts`;
5. strict definition and rule validation in the expansion validator.

No directory scanning or naming convention implicitly registers a module.
`_template` is therefore inert unless a developer incorrectly adds it to a
registry.

## Dependency direction

```text
personality module
  ├─> shared report types and canonical standard
  ├─> shared rule types and matching semantics
  └─> its own report for target-slot validation

generator
  ├─> report registry
  └─> rule registry
```

Personality modules must not depend on pages, React, API routes, databases,
assessment scoring, payment, email, or authentication. The generator may
consume assessment result dimensions, but report modules do not calculate
them.

## Global versus domain-specific rules

Global Web App principles include typed boundaries, deterministic behaviour,
explicit registration, pure validation, accessible frontend states, and
tests isolated from mutable data.

Personality-specific rules include the four EI/SN/TF/JP dimensions, 16 type
codes, 18-section report, 70-block inventory, and 51-rule inventory. These
constants must not be imposed on RIASEC or another assessment. Reuse the
architectural ideas—registries, versioning, validation, release gates—not the
personality domain counts or meanings.
