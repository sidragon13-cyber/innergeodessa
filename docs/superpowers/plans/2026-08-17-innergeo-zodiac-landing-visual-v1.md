# InnerGeo Zodiac Landing Visual V1 Implementation Plan

> For agentic workers: implement this plan task-by-task with a verification gate between tasks.

**Goal:** Rebuild `/zodiac` into the approved Golden Zodiac Atlas experience while preserving all Zodiac calculation, result, report, payment, account, backend and database behavior.

**Architecture:** Keep the existing `ZodiacLanding` component and Zodiac dictionary as the product boundary. Move the new landing presentation into a dedicated CSS Module, reduce the page to the approved nine-section structure, replace the legacy compass/orbit visual with a Golden Zodiac Wheel, and validate locally before production.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, existing InnerGeo Container/UI primitives and locale dictionary system.

## Global Constraints

- Scope: `/zodiac` landing page only.
- Design: Golden Zodiac Atlas.
- Shared colors: Warm Ivory / White, Deep Indigo, Champagne Gold.
- Zodiac may use approximately 10–15% gold visual presence.
- All 12 zodiac symbols must remain clear and recognizable.
- No purple galaxy background.
- No glow-heavy mystical interface.
- No deterministic fortune-telling language.
- Zodiac remains symbolic/cultural exploration, not a scientific personality assessment.
- Remove the dedicated Geodessa / Guardian Stone landing section.
- Remove the Future Community landing section.
- Remove Career and Personality secondary actions from the Final CTA.
- Preserve Zodiac calculations, astronomy, ascendant, timezone, result contracts, reports, entitlement, accounts, backend and database.
- Do not modify production before local approval.
- Required QA: Desktop English, Desktop Chinese, Mobile 390 × 844.
- New styles belong in `src/components/zodiac/zodiac-landing-v1.module.css`.
- Do not expand legacy Zodiac CSS in `src/app/globals.css` unless verified evidence requires a minimal exception.

## File Map

Create:

- `src/components/zodiac/zodiac-landing-v1.module.css`
  - Owns all Zodiac Landing V1 layout, Golden Zodiac Wheel, sign grid, responsive design and gold hierarchy.

Modify:

- `src/components/zodiac/zodiac-landing.tsx`
  - Owns final nine-section composition, semantic structure, CTA routing and Golden Zodiac Wheel markup.

- `src/data/i18n/zodiac.ts`
  - Owns concise English/Chinese landing copy and current product boundaries.

Modify only if verified necessary:

- `src/app/zodiac/page.tsx`
  - Metadata only.

Do not modify:

- `src/data/zodiac/calculation/**`
- `src/data/zodiac/birth-contract.ts`
- `src/data/zodiac/result-contract.ts`
- `src/data/zodiac/report/**`
- payment entitlement code
- account code
- backend
- database
- production server

---

# Task 1: Establish Zodiac V1 Copy Foundation

**Files**

- Modify: `src/data/i18n/zodiac.ts`
- Read only: `src/components/zodiac/zodiac-landing.tsx`

**Deliverable**

Final bilingual copy contract for the approved nine-section landing page.

- [ ] Step 1: Inspect current `src/data/i18n/zodiac.ts`.
- [ ] Step 2: Preserve existing 12-sign data and responsible-use boundaries.
- [ ] Step 3: Refine copy for Hero, Approach, Signs, Beyond the Sun Sign, Birth Chart Includes, Reflection, Culture, Responsible Use and Final CTA.
- [ ] Step 4: Remove active landing copy for Geodessa and Future Community.
- [ ] Step 5: Make the Final CTA single-action only.
- [ ] Step 6: Run `npm run typecheck`.
- [ ] Step 7: Run `git diff --check`.
- [ ] Step 8: Review only the Zodiac dictionary diff.
- [ ] Step 9: Commit as `copy(zodiac): refine landing exploration language`.

Acceptance:

- English and Chinese remain complete.
- No deterministic or scientific-equivalence claims.
- No unrelated dictionary changes.

---

# Task 2: Rebuild Hero with Golden Zodiac Wheel

**Files**

- Modify: `src/components/zodiac/zodiac-landing.tsx`
- Create: `src/components/zodiac/zodiac-landing-v1.module.css`

**Deliverable**

Bounded two-column Hero with the Golden Zodiac Wheel.

- [ ] Step 1: Import `zodiac-landing-v1.module.css`.
- [ ] Step 2: Replace the legacy Hero with `Container size="wide"` and a bounded V1 Hero card.
- [ ] Step 3: Keep copy/actions on the left and Zodiac visual on the right.
- [ ] Step 4: Primary CTA routes to `/zodiac/test`.
- [ ] Step 5: Secondary CTA links to `#signs`.
- [ ] Step 6: Replace the old compass mark with 12 zodiac symbols around restrained orbit geometry.
- [ ] Step 7: Center the visual on `SUN · MOON · RISING` / `太阳 · 月亮 · 上升`.
- [ ] Step 8: Add Warm Ivory, Deep Indigo and Champagne Gold scoped styles.
- [ ] Step 9: Run `npm run typecheck`.
- [ ] Step 10: Run `git diff --check`.
- [ ] Step 11: Commit as `style(zodiac): rebuild landing hero`.

Acceptance:

- No compass mark.
- No glow.
- No purple galaxy styling.
- All 12 symbols remain visible.

---

# Task 3: Build the Golden 12-Sign Identity Grid

**Files**

- Modify: `src/components/zodiac/zodiac-landing.tsx`
- Modify: `src/components/zodiac/zodiac-landing-v1.module.css`

**Deliverable**

Strong 4 × 3 desktop sign grid.

- [ ] Step 1: Reuse existing Zodiac sign data.
- [ ] Step 2: Rebuild `#signs` as the primary visual identity section.
- [ ] Step 3: Desktop uses four columns and three rows.
- [ ] Step 4: Each card shows a large gold sign symbol, name, date range and concise themes.
- [ ] Step 5: Use soft gold-tinted borders and approximately 22px radius.
- [ ] Step 6: Hover/focus may strengthen gold and border only.
- [ ] Step 7: Verify all Aries through Pisces entries remain present.
- [ ] Step 8: Run `npm run typecheck`.
- [ ] Step 9: Run `git diff --check`.
- [ ] Step 10: Commit as `style(zodiac): establish golden sign atlas`.

Acceptance:

- Exactly 12 signs.
- Symbols are immediately recognizable.
- No decorative overload.

---

# Task 4: Clarify Zodiac Model — Approach and Sun / Moon / Rising

**Files**

- Modify: `src/components/zodiac/zodiac-landing.tsx`
- Modify: `src/components/zodiac/zodiac-landing-v1.module.css`

**Deliverable**

Compact Approach section and clear Sun/Moon/Rising section.

- [ ] Step 1: Rebuild Approach around the message `A symbolic perspective, not a fixed definition`.
- [ ] Step 2: Keep Approach visually quiet and compact.
- [ ] Step 3: Rebuild Beyond the Sun Sign around Sun, Moon and Rising.
- [ ] Step 4: Give each anchor one concise explanation.
- [ ] Step 5: Use restrained gold iconography.
- [ ] Step 6: Verify no scientific-equivalence or deterministic claims.
- [ ] Step 7: Run `npm run typecheck`.
- [ ] Step 8: Commit as `style(zodiac): clarify symbolic profile structure`.

Acceptance:

- User can understand why a birth chart is more than one sun sign.
- Scientific boundary remains clear.

---

# Task 5: Reframe Birth-Chart Value and Consolidate Reflection / Culture

**Files**

- Modify: `src/components/zodiac/zodiac-landing.tsx`
- Modify: `src/components/zodiac/zodiac-landing-v1.module.css`

**Deliverable**

Concrete chart value plus compact reflection and culture content.

- [ ] Step 1: Replace old Profile Preview presentation with current birth-chart deliverables.
- [ ] Step 2: Include only outputs the existing product actually provides.
- [ ] Step 3: Present Sun Sign, Moon Sign, Rising Sign, planetary placements, birth-time context and complete symbolic report where supported.
- [ ] Step 4: Compress Reflection into three concise prompts.
- [ ] Step 5: Rebuild Culture as a secondary `Symbol · Story · Culture` editorial strip.
- [ ] Step 6: Keep these sections visually subordinate to Hero and 12 Signs.
- [ ] Step 7: Run `npm run typecheck`.
- [ ] Step 8: Run `git diff --check`.
- [ ] Step 9: Commit as `style(zodiac): refine chart value and reflection`.

Acceptance:

- Current product value is clear.
- No future/unavailable deliverable is promised.

---

# Task 6: Remove Obsolete Landing Modules and Consolidate Boundaries

**Files**

- Modify: `src/components/zodiac/zodiac-landing.tsx`
- Modify: `src/components/zodiac/zodiac-landing-v1.module.css`

**Deliverable**

No Geodessa or Future Community module; compact Responsible Use section.

- [ ] Step 1: Remove the Geodessa / Guardian Stone section from Zodiac landing only.
- [ ] Step 2: Remove the Future Community section completely.
- [ ] Step 3: Do not replace either section with a coming-soon placeholder.
- [ ] Step 4: Rebuild Responsible Use into `Use it for`, `Do not use it for`, and `Remember`.
- [ ] Step 5: Add `/methodology` as the boundary-information route.
- [ ] Step 6: Verify no Geodessa, Guardian, future-status or community landing markup remains.
- [ ] Step 7: Run `npm run typecheck`.
- [ ] Step 8: Commit as `refactor(zodiac): consolidate landing boundaries`.

Acceptance:

- InnerGeo brand positioning is clear.
- Only currently usable Zodiac capabilities are promoted.

---

# Task 7: Simplify Final Conversion

**Files**

- Modify: `src/components/zodiac/zodiac-landing.tsx`
- Modify: `src/components/zodiac/zodiac-landing-v1.module.css`

**Deliverable**

One bounded Final CTA with one action.

- [ ] Step 1: Remove Career CTA from the Zodiac Final CTA.
- [ ] Step 2: Remove Personality CTA from the Zodiac Final CTA.
- [ ] Step 3: Keep only `/zodiac/test`.
- [ ] Step 4: Use the localized Create Your Birth Chart action.
- [ ] Step 5: Match the InnerGeo V1 bounded-card visual language.
- [ ] Step 6: Run `npm run typecheck`.
- [ ] Step 7: Commit as `style(zodiac): simplify final conversion`.

Acceptance:

- One conversion objective only.
- Cross-product conversion is not handled here.

---

# Task 8: Responsive and Legacy-Isolation Pass

**Files**

- Modify: `src/components/zodiac/zodiac-landing-v1.module.css`
- Modify only if needed: `src/components/zodiac/zodiac-landing.tsx`
- Read only by default: `src/app/globals.css`

**Deliverable**

Stable desktop and mobile V1 layout with scoped styles.

- [ ] Step 1: Desktop Hero remains two-column.
- [ ] Step 2: Desktop signs remain 4 × 3.
- [ ] Step 3: Tablet layout adapts cleanly.
- [ ] Step 4: Mobile 390 × 844 stacks Hero into one column.
- [ ] Step 5: Zodiac Wheel remains readable on mobile.
- [ ] Step 6: Sign cards remain clear without horizontal overflow.
- [ ] Step 7: Buttons remain comfortably tappable.
- [ ] Step 8: Verify new composition no longer depends on unnecessary legacy Zodiac landing classes.
- [ ] Step 9: Do not delete legacy global CSS during this task.
- [ ] Step 10: Run `npm run typecheck`.
- [ ] Step 11: Commit as `style(zodiac): complete responsive landing v1`.

Acceptance:

- No horizontal overflow.
- No clipped zodiac symbols.
- No broad global CSS cleanup.

---

# Task 9: Local Build and Regression Gate

**Files**

No intended source modification.

**Deliverable**

Verified local build with protected systems untouched.

- [ ] Step 1: Confirm worktree is clean.
- [ ] Step 2: Run `npm run typecheck`.
- [ ] Step 3: Run `npm run build`.
- [ ] Step 4: Compare changed files from the design-spec baseline.
- [ ] Step 5: Confirm changes are limited to the implementation plan, Zodiac landing component, Zodiac CSS Module, Zodiac landing dictionary, and metadata only if explicitly necessary.
- [ ] Step 6: Confirm nothing changed under `src/data/zodiac/calculation/`.
- [ ] Step 7: Confirm nothing changed under `src/data/zodiac/report/`.
- [ ] Step 8: Confirm backend is unchanged.
- [ ] Step 9: Confirm database is unchanged.
- [ ] Step 10: Run final `git diff --check`.

Acceptance:

- TYPECHECK=PASS
- BUILD=PASS
- BACKEND_CHANGED=NO
- DATABASE_CHANGED=NO
- PAYMENT_CHANGED=NO
- PRODUCTION_CHANGED=NO

---

# Task 10: Browser Visual QA Gate

**Files**

Modify only when visual evidence identifies a specific defect.

**Deliverable**

Locally accepted Zodiac Landing Visual V1.

- [ ] Step 1: Start the established local application.
- [ ] Step 2: Open `http://127.0.0.1:3100/zodiac`.
- [ ] Step 3: Perform Desktop English QA.
- [ ] Step 4: Verify Golden Zodiac Wheel and all 12 signs.
- [ ] Step 5: Verify gold is stronger but restrained.
- [ ] Step 6: Verify no Geodessa module.
- [ ] Step 7: Verify no Future Community module.
- [ ] Step 8: Verify Final CTA contains one action.
- [ ] Step 9: Perform Desktop Chinese QA.
- [ ] Step 10: Verify Chinese wrapping and zodiac labels.
- [ ] Step 11: Perform Mobile 390 × 844 QA.
- [ ] Step 12: Verify no horizontal overflow or clipped symbols.
- [ ] Step 13: Apply only evidence-directed fixes.
- [ ] Step 14: Re-run typecheck after any fix.
- [ ] Step 15: Re-check the affected viewport.

Final required evidence:

- ZODIAC_DESKTOP_EN=PASS
- ZODIAC_DESKTOP_ZH=PASS
- ZODIAC_MOBILE=PASS
- TYPECHECK=PASS
- BUILD=PASS
- BACKEND_CHANGED=NO
- DATABASE_CHANGED=NO
- PAYMENT_CHANGED=NO
- PRODUCTION_CHANGED=NO
- ZODIAC_LANDING_VISUAL_V1_LOCAL=PASS

Production deployment is explicitly outside this implementation plan until user approval after local QA.
