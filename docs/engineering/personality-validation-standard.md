# Personality Validation Standard

## Validation layers

Validation is cumulative:

1. **Report validator** — personality code, canonical alignment, 18 sections,
   exactly 70 blocks, unique IDs and slots, English content, action phases,
   and non-clinical methodology.
2. **Rule validator** — exactly 51 rules, 36/7/8 coverage, unique IDs,
   personality prefixes, conditions, priorities, English content, and valid
   section/slot targets.
3. **Single-type validator** — registry, rule registry, exports, manifest
   truthfulness, report generation, and completed-stage requirements.
4. **Family validator** — all family members plus cross-personality duplicate
   section and block detection.
5. **Global validator** — all canonical types, including truthful
   `not_started` entries.
6. **Frontend validator** — release whitelist remains independent from domain
   completeness.

Validators must be deterministic, read-only, and return actionable paths or
throw only inside CLI validation scripts. They must not mutate report data.

## Required commands

During implementation run:

```bash
npm run validate:personality -- <TYPE>
npm run validate:personality-family -- <family>
npm run validate:personality-expansion
npm run validate:personality-all
```

Before handoff run:

```bash
npm run validate
npm run typecheck
npm run lint
npm run build
git diff --check
```

Also run the report frontend, print, navigation, template, and recipient-name
validators when the main `validate` workflow does not already include them.

## Manual audit

Automation does not replace review. Confirm:

- no wrong personality code or prefix;
- no Chinese content in the current English-only contract;
- no duplicated complete section or full content block;
- positioning remains distinct;
- rule guidance matches its conditions and target;
- methodology is responsible and non-clinical;
- completed reports and unrelated systems have no diff;
- frontend availability did not change accidentally.

Only after automated and manual validation may the manifest add `validated`.
