# InnerGeo Homepage Visual Design V1.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved InnerGeo Homepage Visual Design V1.0 while preserving all assessment, payment, report, backend, database, and production behavior.

**Architecture:** Keep the existing Next.js component architecture. Refactor only homepage presentation and shared brand presentation in small reviewable stages: design tokens and typography first, then wordmark/header, Hero, 3+1 Product Universe, trust/method, philosophy/journey, footer, and final responsive/bilingual acceptance.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, CSS custom properties, existing InnerGeo locale system.

## Global Constraints

- Approved specification: `docs/superpowers/specs/2026-08-16-innergeo-homepage-visual-design-v1.md`
- Brand statement: `Understand Yourself. Find Your Direction.`
- Chinese statement: `认识自己，找到更适合的方向。`
- Product architecture: `3 Structured Assessments + 1 Interest Exploration`
- Structured Assessments: Personality, Career Interests, Kids Interests
- Interest Exploration: Zodiac Interests
- Zodiac is a first-class strategic growth/SEO entry but is not presented as a Structured Assessment.
- Deep Indigo: `#4A5878`
- Champagne Gold: `#C5A36A`
- Warm Ivory: `#F3F0EA`
- Primary Text: `#3D3A38`
- Secondary Text: `#6F706F`
- Muted Text: `#8A8986`
- Surface: `#FFFFFF`
- Gold is a signal, not a surface.
- Remove unsupported homepage claims `1,000+` and `100,000+`.
- Remove seven-star, north-star, and constellation branding from the homepage.
- V1 logo is a typography-first `InnerGeo` wordmark.
- Hero visual language is Path / Node / Direction Map.
- Zodiac remains visually inside the InnerGeo system; no purple galaxy theme.
- No module-specific brand colors.
- No backend changes.
- No database changes.
- No scoring changes.
- No payment changes.
- No report-generation changes.
- No assessment-question or result-algorithm changes.
- No production deployment before local acceptance.
- Every task requires fresh verification before moving to the next task.

---

## Planned File Responsibilities

### `src/app/globals.css`
- Canonical semantic design tokens
- Base body typography
- Shared neutral, focus, and functional colors

### `src/app/brand-home.css`
- Homepage-specific visual system
- Header
- Hero
- Direction Map
- Product cards
- Zodiac panel
- Trust section
- Brand philosophy
- Final CTA
- Footer
- Responsive rules
- Removal/consolidation of legacy overrides

### `src/components/brand/brand-logo.tsx`
- Typography-first wordmark
- Removal of star divider
- Replacement Hero Direction Map visual

### `src/components/home.tsx`
- Header information architecture
- Hero structure
- Product Universe 3+1
- Trust/method presentation
- Philosophy/journey
- Final CTA
- Footer structure

### Existing i18n files under `src/data/i18n`
- Only approved EN/ZH homepage copy changes
- Existing locale architecture must be preserved

---

# Task 1: Design Tokens + Typography Foundation

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/brand-home.css`
- Modify `src/app/layout.tsx` only if an existing Next.js font-loading mechanism makes it necessary

**Produces:**
- One canonical InnerGeo color system
- One canonical homepage typography hierarchy
- No homepage structural redesign yet

- [ ] **Step 1: Verify clean baseline**

Run:

```bash
git status --short
git diff -- src/app/globals.css src/app/brand-home.css src/app/layout.tsxExpected: no code changes.

 Step 2: Consolidate approved design tokens

Target homepage tokens:

--brand-primary: #4A5878;
--brand-primary-dark: #394662;
--brand-primary-soft: #73809A;


--brand-gold: #C5A36A;
--brand-gold-dark: #A9864F;


--brand-background: #F3F0EA;
--brand-surface: #FFFFFF;
--brand-panel: #F8F6F1;


--brand-text: #3D3A38;
--brand-muted: #6F706F;
--brand-muted-soft: #8A8986;


--brand-border: rgba(74, 88, 120, 0.16);

Remove homepage dependence on forest-green / rust / purple legacy branding where those variables control the homepage.

Functional success/warning/error colors remain functional colors.

 Step 3: Establish typography hierarchy

Brand/editorial:

Source Serif 4 if available through the approved project font-loading path
Otherwise use the closest technically safe serif already supported by the project until font-loading is explicitly added

UI/body:

Inter if available through the approved project font-loading path
Otherwise use the existing modern sans fallback without adding an unnecessary dependency

Chinese fallback:

"PingFang SC",
"Hiragino Sans GB",
"Microsoft YaHei",
"Noto Sans CJK SC",
sans-serif

Desktop targets:

Wordmark      28–30px
Hero H1       64–72px
Section H2    42–48px
Card H3       25–28px
Lead          18px
Body          16px
Secondary     14px
Eyebrow       11px
Button        14px
Navigation    13px

Hero heading:

font-weight: 400;
line-height: 1.08;
letter-spacing: -0.025em;
 Step 4: Static verification

Run:

npx tsc --noEmit
git diff --check
git diff -- src/app/globals.css src/app/brand-home.css src/app/layout.tsx

Expected:

TypeScript PASS
diff check PASS
scope limited to approved presentation files
 Step 5: Browser acceptance

Check:

homepage loads
EN readable
ZH readable
no text clipping
no horizontal overflow
header remains functional
no application behavior changed
 Step 6: Commit
git add src/app/globals.css src/app/brand-home.css src/app/layout.tsx
git commit -m "style(home): establish visual design foundation"

Only include layout.tsx if it actually changed.

Task 2: Wordmark + Header

Files:

Modify: src/components/brand/brand-logo.tsx
Modify: src/components/home.tsx
Modify: src/app/brand-home.css

Produces:

Clean InnerGeo wordmark
Frozen navigation architecture
 Remove visible brand-name-divider, dots, lines, star divider, and constellation-derived logo decoration.
 Preserve BrandLogo as the shared brand component.
 Visible V1 mark becomes InnerGeo.
 Header target: Assessments | Zodiac | About | Pricing | Account | Language.
 Assessments represents Personality / Career Interests / Kids Interests.
 Zodiac remains independent from Assessments.

Verification:

npx tsc --noEmit
git diff --check

Browser checks:

desktop
mobile
EN
ZH
Account
locale switcher

Commit:

git commit -m "style(home): refine wordmark and navigation"
Task 3: Hero + Direction Map

Files:

Modify: src/components/brand/brand-logo.tsx
Modify: src/components/home.tsx
Modify: src/app/brand-home.css
Modify only the relevant existing i18n source for approved Hero copy

Produces:

Brand-first Hero
No astrology-like main-brand visual
New Direction Map
 Hero copy uses the approved brand direction:
EN
Understand Yourself.
Find Your Direction.


ZH
认识自己，
找到更适合的方向。
 Primary CTA:
Start Exploring
开始探索
 Remove Hero use of:
North Star
seven-star constellation
cosmic-blueprint framing
Three perspectives · One evolving self
 Replace with:
paths
nodes
coordinate relationships
subtle contour lines
one restrained Champagne Gold direction point

Desktop target:

Hero height ≈ 620–660px
Copy ≈ 48%
Visual ≈ 52%

Verification:

npx tsc --noEmit
git diff --check

Browser QA:

EN
ZH
desktop
mobile
no clipped visual nodes

Commit:

git commit -m "style(home): redesign hero direction experience"
Task 4: Product Universe — 3 + 1

Files:

Modify: src/components/home.tsx
Modify: src/app/brand-home.css
Modify relevant existing i18n strings only where required

Produces:

Four high-exposure products
Two clear categories
Structured Assessments

Three equal cards:

Personality
Career Interests
Kids Interests

Shared rules:

White surface
Warm neutral border
≈18px radius
32–38px padding
Minimal shadow
2–3px maximum hover lift
No module-specific brand colors
Interest Exploration

Immediately after the three cards:

Interest Exploration
Zodiac Interests
星座兴趣探索

Requirements:

high visibility
wider dedicated panel
same Indigo / Gold / Ivory system
restrained orbit/curve/point language allowed
no purple galaxy treatment

Verification:

all four products visible early
3+1 categorization immediately understandable
Zodiac is not visually hidden
all links resolve correctly

Commit:

git commit -m "style(home): establish four-product universe"
Task 5: Trust / Method — Remove Unsupported Metrics

Files:

Modify: src/components/brand/brand-logo.tsx only if BrandTrustStrip still lives there
Modify: src/components/home.tsx
Modify: src/app/brand-home.css

Produces:

No unsupported social-proof numbers
Trust based on method, depth, and boundaries
 Remove homepage presentation of:
1,000+
100,000+
unsupported organization/participant claims
 Do not replace them with other unsupported numbers.

Use three trust pillars:

Structured
结构化探索


In Depth
深入解释


Clear Boundaries
边界清晰

Verification:

grep -RniE '100,000\+|1,000\+' src/components src/app
npx tsc --noEmit
git diff --check

Expected:

no unsupported homepage trust metric remains

Commit:

git commit -m "style(home): rebuild trust around methodology"
Task 6: Brand Philosophy + Direction Journey + Final CTA

Files:

Modify: src/components/home.tsx
Modify: src/app/brand-home.css
Modify relevant existing i18n source

Produces:

Human layer
Guided journey
Calm final conversion point

Approved Chinese direction:

发现你的热爱，让努力更有方向。


兴趣是最好的老师。


InnerGeo 不替你做决定，
只帮助你更清楚地看见自己。

Journey:

Explore
→ Understand
→ Find Direction

Final CTA direction:

你的方向，不需要一次全部想明白。
从一次探索开始。

Rules:

generous whitespace
no gamification
no exaggerated conversion styling
primary CTA uses Deep Indigo

Verification:

npx tsc --noEmit
git diff --check

Commit:

git commit -m "style(home): add guided exploration journey"
Task 7: Footer

Files:

Modify: src/components/home.tsx
Modify: src/app/brand-home.css

Produces:

Clean Deep Indigo footer
No legacy celestial/purple decoration

Remove:

purple gradients
glowing celestial arc
star-divider branding
duplicate legacy cleanup overrides after consolidation

Target structure:

Brand
InnerGeo
Understand Yourself. Find Your Direction.


Assessments
Personality
Career Interests
Kids Interests


Explore
Zodiac


Company
About
Contact
Pricing


Legal
Privacy
Terms
Refund Policy

Verification:

npx tsc --noEmit
git diff --check

Commit:

git commit -m "style(home): simplify footer architecture"
Task 8: Homepage Visual V1 Local Acceptance Gate

Files:

Modify only files proven necessary by QA

Produces:

Final local acceptance evidence

Static verification:

npx tsc --noEmit
git diff --check

Production-build verification:

use the repository's existing frontend production build command
exit code must be 0

Desktop QA:

Header
Wordmark
Hero
Direction Map
Personality
Career Interests
Kids Interests
Zodiac Interests
Trust / Method
Brand Philosophy
Direction Journey
Final CTA
Footer

Mobile QA:

no horizontal overflow
readable Hero
usable navigation
correct card stacking
Zodiac remains high visibility
usable CTAs
correct footer wrapping

Bilingual QA:

English
中文
heading wrapping
card heights
navigation
CTA labels
Hero balance
footer layout

Scope verification:

git diff --name-only

Must not contain changes to:

backend
database
payment
scoring
assessment algorithms
report-generation logic
production infrastructure

Final acceptance requires fresh evidence for:

DESIGN_SPEC_MATCH=PASS
TYPECHECK=PASS
BUILD=PASS
DESKTOP_QA=PASS
MOBILE_QA=PASS
EN_QA=PASS
ZH_QA=PASS
SCOPE_CHECK=PASS
LOCAL_ACCEPTANCE=PASS

Production deployment is a separate gate.

Implementation Order
1. Design Tokens + Typography
2. Wordmark + Header
3. Hero + Direction Map
4. Product Universe 3+1
5. Trust / Method
6. Brand Philosophy + Direction Journey + Final CTA
7. Footer
8. Responsive + Bilingual + Build + Browser Acceptance

Do not combine multiple tasks into one unreviewed implementation batch.

Explicit Non-Goals

Homepage Visual Design V1 must not alter:

assessment scoring
assessment question sets
result algorithms
report-generation logic
payment logic
entitlements
authentication behavior
database schema
backend APIs
production containers
Zodiac coordinate calculation
Zodiac report calculation
Kids assessment logic
Personality assessment logic
Career assessment logic
