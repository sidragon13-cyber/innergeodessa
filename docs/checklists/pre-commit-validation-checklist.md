# Pre-Commit Validation Checklist

## Automated

- [ ] `npm run validate`
- [ ] `npm run validate:personality-expansion`
- [ ] `npm run validate:personality-all`
- [ ] Relevant individual and family validation commands
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `git diff --check`

## Manual

- [ ] Report count is 18 sections and exactly 70 blocks.
- [ ] Rule count is 36 + 7 + 8 = 51.
- [ ] No wrong code, prefix, target, placeholder, Chinese text, or copied block.
- [ ] Methodology contains responsible non-clinical language.
- [ ] Manifest stages describe reality.
- [ ] Frontend gate changed only with explicit release approval.
- [ ] No scoring, assessment, API, database, authentication, payment, or email
      change unless explicitly in scope.

## Git

- [ ] Review `git status --short --untracked-files=all`.
- [ ] Review `git diff --name-only` and `git diff --stat`.
- [ ] Exclude databases, environments, caches, logs, build output, and temp files.
- [ ] Present an explicit staging list for approval.
- [ ] Never use `git add .` or `git add -A`.
- [ ] Review cached name/status and stat before committing.
