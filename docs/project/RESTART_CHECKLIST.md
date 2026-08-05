# InnerGeodessa Restart Checklist

## 1. Enter Repository

```bash
cd /Users/dupei/Documents/Jinlong/Web/innergeodessa
```

## 2. Confirm Git Baseline

```bash
git status --short --branch
git log --oneline -5
```

Expected Stage 2.0 baseline:

- Branch: `work/personality-system-audit`
- Latest stable commit before Stage 2.0: `d1be3bd`

Do not discard, overwrite, or combine unexpected local changes.

## 3. Read the Project Continuity Documents

Read in this order:

1. `docs/project/CURRENT_STATUS.md`
2. `docs/project/DECISIONS.md`
3. `docs/project/RESTART_CHECKLIST.md`

Use repository state as the source of truth if a document and committed code differ.

## 4. Confirm the Current Stage and Next Task

Current stage:

```text
Stage 2 — Personality MVP Closure
```

Next exact task:

```text
Stage 2.1 — Result Persistence
```

Before implementation, confirm that the allowed and forbidden scope in `CURRENT_STATUS.md` still matches the requested task.

## 5. Inspect the Relevant Existing Modules

For Stage 2.1, inspect:

```text
src/app/personality/result/[sessionId]/page.tsx
src/app/personality/test/page.tsx
src/app/api/sessions/[sessionId]/complete/route.ts
innergeodessa-mvp/backend/app/main.py
innergeodessa-mvp/backend/app/database.py
innergeodessa-mvp/backend/schema.sql
```

Also inspect focused tests and shared assessment contracts before proposing changes.

## 6. Verify Available Project Commands

```bash
node -e 'const p=require("./package.json"); console.log(p.scripts)'
```

Do not invent validation commands that are not present in `package.json`.

## 7. Establish a Clean Validation Baseline

Run the validation commands relevant to the intended module:

```bash
npm run validate
npm run test:python
npm run typecheck
npm run lint
npm run build
git diff --check
```

Record any pre-existing warning separately. Do not change unrelated architecture only to remove a non-blocking warning.

## 8. Keep the Change Isolated

- Work on one module at a time.
- Do not mix unrelated UI, content, scoring, database, or infrastructure changes.
- Preserve the Python production scoring source.
- Preserve question-bank versions and session snapshots.
- Do not modify forbidden Stage 2.1 scope.

## 9. Validate Before Declaring Completion

Re-run the focused tests first, followed by the applicable full validation baseline. Inspect:

```bash
git diff --check
git status --short
git diff --stat
```

Confirm that only intended files changed and that no database, cache, environment, build output, or temporary file is included.

## 10. Commit Only an Independently Complete Module

- Review the exact file list before staging.
- Stage explicit paths; do not use `git add .` or `git add -A`.
- Use one focused commit for the completed module.
- Do not push until the commit and validation results have been reviewed.
- Update project continuity documents only when committed repository facts or accepted decisions change.
