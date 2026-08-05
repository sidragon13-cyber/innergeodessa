# Git Phase Workflow

## Phase isolation

Each phase should have a documented baseline commit and a bounded file list.
Keep unrelated local work out of the phase. If the worktree is already dirty,
record the existing paths before editing and preserve them.

## Review cycle

Before implementation:

```bash
git status --short --untracked-files=all
git diff --name-only
git diff --stat
```

Before staging:

```bash
git diff --check
git status --short --untracked-files=all
git diff --stat
```

Classify files as required, related-needing-review, or unrelated. Confirm no
database, environment, cache, build, log, editor, or temporary files.

Stage only explicit paths after human approval. Never use `git add .` or
`git add -A` for a personality phase. Then inspect:

```bash
git diff --cached --name-status
git diff --cached --stat
git status --short
```

## Commit boundary

One independently validated phase receives one focused Conventional Commit.
Do not mix content implementation, frontend release, scoring, or database
changes unless the approved phase explicitly spans them. Never commit merely
because individual checks passed; family, global, manual, and diff audits are
part of completion.
