# InnerGeo Personality Landing Visual V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/personality` as a professional structured-assessment landing page that visually belongs to InnerGeo Homepage Visual V1 while preserving all existing personality assessment behavior.

**Architecture:** Keep the existing `/personality` route and `PersonalityLanding` component boundary. Replace legacy personality-specific presentation with an isolated CSS Module and updated bilingual landing-page copy. Do not modify scoring, test questions, session behavior, result generation, report generation, entitlement, payment, backend, or production infrastructure.

**Tech Stack:** Next.js 16 App Router, React, TypeScript, CSS Modules, existing InnerGeo locale dictionaries and shared SiteHeader / SiteFooter / PrimaryButton components.

## Global Constraints

- Route remains `/personality`.
- Test CTA remains `/personality/test`.
- Primary desktop content boundary is 1280px.
- Visual language: Clear · Warm · Structured · Comfortable · Measured.
- Brand colors: Deep Indigo `#4A5878`, Champagne Gold `#C5A36A`, Warm Ivory `#F3F0EA`.
- Gold is a signal, not a surface.
- Personality results describe preferences, not abilities.
- Personality results describe patterns, not fixed identity.
- Personality supports exploration, not prediction.
- Personality assessment is for self-reflection, not diagnosis.
- Remove compass, star, constellation and astrology-like visual language from the personality landing page.
- Do not modify `src/app/globals.css`.
- Do not modify existing Homepage V1 files unless evidence proves a shared regression.
- Do not modify personality scoring, questions, answers, sessions, results, professional reports, report rules, payment, entitlement, backend, database, or production infrastructure.
- Existing frozen MBTI commercial-loop behavior must remain unchanged.
- Every implementation task follows: RED contract → minimal implementation → typecheck/diff check → browser QA → user acceptance → commit.
- No production deployment during local implementation.

---

## File Structure

### Existing files to modify

- `src/components/personality/personality-landing.tsx`
  - Owns `/personality` landing-page structure.
  - Removes legacy `CompassMark` usage.
  - Adds Preference Map markup.
  - Converts dimensions to card presentation.
  - Adds structured result, guidance, boundary and final CTA markup.

- `src/data/i18n/personality.ts`
  - Owns all English and Chinese personality landing copy.
  - Updates Hero, dimensions, result, guidance, limitations and final CTA language.
  - Adds only presentation-copy fields required by the landing page.

### New file

- `src/components/personality/personality-landing-v1.module.css`
  - Owns Personality Landing Visual V1 presentation.
  - Uses existing brand CSS variables.
  - Keeps all new personality visual rules isolated from legacy `globals.css`.
  - Implements desktop, tablet and mobile behavior.

### Files explicitly protected

- `src/app/globals.css`
- personality assessment/test logic
- personality scoring logic
- personality result pages
- personality report pages
- professional report data/rules
- backend files
- payment and entitlement files

---

# Task 1: Landing Copy Foundation

**Files:**
- Modify: `src/data/i18n/personality.ts`

**Interfaces:**
- Consumes: existing `PersonalityLandingDictionary`
- Produces: bilingual copy consumed by `PersonalityLanding`

## Copy contract

### Hero

English:

- Eyebrow: `Personality Assessment`
- Title: `Understand your preference patterns—not just a four-letter type.`
- Description: `Explore preferences across energy, information processing, decision-making and approach to daily life through a 72-question reflective assessment.`
- Details:
  - `72 questions`
  - `Approximately 8–12 minutes`
  - `No account required to begin`
- Primary CTA: `Start Personality Assessment`
- Secondary CTA: `Explore the Four Dimensions`

Chinese:

- Eyebrow: `人格探索`
- Title: `理解你的偏好模式，而不只是得到四个字母。`
- Description: `通过 72 道题观察你在能量获取、信息处理、决策和生活方式上的偏好，形成四个维度的个人偏好结构，并获得进一步解释。`
- Details:
  - `72 道题`
  - `约 8–12 分钟`
  - `无需注册即可开始`
- Primary CTA: `开始人格探索`
- Secondary CTA: `了解四个维度`

### Dimensions

English title:

`Four dimensions. One preference pattern.`

Chinese title:

`四个维度，构成你的偏好结构`

Boundary copy must state that dimensions describe preference directions rather than ability and may show flexibility across context, experience and life stage.

Dimension semantics remain:

1. Energy — Extraversion / Introversion
2. Information — Sensing / Intuition
3. Decisions — Thinking / Feeling
4. Structure — Judging / Perceiving

### Results

Chinese direction:

`完成测评后，你会得到什么`

Description:

`不只是一个人格类型，而是一组可以继续理解和验证的偏好信息。`

Six outputs:

1. 四字母偏好结果
2. 四个维度的具体倾向
3. 清晰度与边界解释
4. 优势与可能的盲点
5. 工作、学习与发展探索
6. 可进一步查看的完整数字报告

English must express the same scope without implying ability, career certainty or future success.

### Final CTA

Chinese:

- `准备好开始了解自己的偏好模式了吗？`
- `72 道题 · 约 8–12 分钟 · 无需注册即可开始`
- `开始人格探索`

English:

- `Ready to understand your preference patterns?`
- `72 questions · approximately 8–12 minutes · no account required to begin`
- `Start Personality Assessment`

- [ ] **Step 1: Run RED copy contract**

Use a Python contract that asserts the new Hero titles, dimensions title, six result outputs and final CTA do not already all exist.

Expected: `RED_CONTRACT=FAIL_AS_EXPECTED`.

- [ ] **Step 2: Update bilingual landing copy**

Modify only `src/data/i18n/personality.ts`.

Do not yet change the dictionary structure for guidance or limitations.

- [ ] **Step 3: Verify copy**

Run:

```bash
npm run typecheck
git diff --checkExpected:

TYPECHECK=PASS
DIFF_CHECK=PASS
 Step 4: Commit after acceptance

Stage only:

src/data/i18n/personality.ts

Commit:

copy(personality): clarify landing assessment language
Task 2: Hero + Preference Map

Files:

Modify: src/components/personality/personality-landing.tsx
Create: src/components/personality/personality-landing-v1.module.css

Interfaces:

Consumes: Hero copy and dimension data from getPersonalityLandingDictionary
Produces: new bounded Hero and neutral four-axis Preference Map
Structural changes

Remove from personality landing:

CompassMark import
PersonalityContour
.personality-contour
.personality-compass
legacy orbit/contour Hero presentation

Create:

function PersonalityPreferenceMap(...)

The visual must contain four neutral axes:

E — I
S — N
T — F
J — P

Center concept:

English:

YOUR PREFERENCE PATTERN

Chinese:

你的偏好结构

No side is selected or emphasized.

Hero geometry

Desktop:

max width 1280px
two-column bounded card
approximately 48% copy / 52% visual
border 1.5px low-opacity Indigo
radius 24px
Warm Ivory / white surfaces
Deep Indigo / Champagne Gold accents

Typography should be materially smaller and more controlled than the legacy 78px Hero.

 Step 1: Run RED Hero contract

Check that:

CompassMark is still imported or rendered
PersonalityContour still exists
Preference Map does not exist
Hero is still size="full" or max-w-[1400px]

Expected: RED failure.

 Step 2: Create isolated CSS Module

Create:

src/components/personality/personality-landing-v1.module.css

It must use existing variables such as:

var(--brand-primary)
var(--brand-primary-dark)
var(--brand-gold)
var(--brand-gold-dark)
var(--brand-background)
var(--brand-surface)
var(--brand-text)
var(--brand-muted)
var(--brand-border)

Do not modify globals.css.

 Step 3: Rebuild Hero markup

Modify PersonalityLanding:

import CSS module
add page-scoped class
use Container size="wide"
remove old contour/compass
render PersonalityPreferenceMap
preserve /personality/test
preserve #dimensions
 Step 4: Static verification

Run:

npm run typecheck
git diff --check
git diff --quiet -- src/app/globals.css

Expected:

TYPECHECK=PASS
DIFF_CHECK=PASS
GLOBALS_UNCHANGED=PASS
 Step 5: Browser QA

Desktop Chinese first.

Verify:

1280px alignment
title does not dominate page
Preference Map communicates four dimensions
no compass/star visual
CTA works visually
no overflow

Then English desktop QA.

 Step 6: Commit after visual acceptance

Stage only:

src/components/personality/personality-landing.tsx
src/components/personality/personality-landing-v1.module.css

Commit:

style(personality): rebuild landing hero
Task 3: Four Preference Dimensions

Files:

Modify: src/components/personality/personality-landing.tsx
Modify: src/components/personality/personality-landing-v1.module.css

Interfaces:

Consumes: dictionary.dimensions.items
Produces: responsive 2 × 2 Preference Dimension card system
Desktop layout
01 Energy          02 Information
E ───── I          S ───── N


03 Decisions       04 Structure
T ───── F          J ───── P

Each card contains:

number
dimension name
spectrum
concise explanation
neutral initial-axis visual

No hover state may imply ranking, recommendation, score or result.

 Step 1: Run RED dimension contract

Check that legacy dimension-row presentation is still rendered and new grid/card classes are absent.

Expected: RED failure.

 Step 2: Convert markup to dimension cards

Keep the same dictionary data and semantics.

Do not introduce result scoring or selected-state logic.

 Step 3: Add 2 × 2 CSS

Desktop:

2 columns

Tablet/mobile:

1 column

Use:

1.5px Indigo border
radius about 22px
warm surface
Gold only for number/signal accents
 Step 4: Verify
npm run typecheck
git diff --check
git diff --quiet -- src/app/globals.css
 Step 5: Browser QA

Verify EN and ZH.

 Step 6: Commit after acceptance

Commit:

style(personality): structure preference dimensions
Task 4: What You Will Receive

Files:

Modify: src/components/personality/personality-landing.tsx
Modify: src/components/personality/personality-landing-v1.module.css

Interfaces:

Consumes: dictionary.result
Produces: bounded 1280px split results card
Layout

Left:

Deep Indigo
eyebrow
heading
concise description

Right:

Warm Ivory / white
six numbered result outputs

Remove the legacy full-browser-width dark result block.

The result list must not imply:

guaranteed career fit
intelligence
capability
leadership
success probability
future prediction
 Step 1: Run RED result-card contract
 Step 2: Rebuild bounded split result module
 Step 3: Add responsive styling
 Step 4: Run typecheck / diff check / globals guard
 Step 5: Browser QA
 Step 6: Commit after acceptance

Commit:

style(personality): refine assessment outputs
Task 5: Answering Guidance + Use Boundaries

Files:

Modify: src/data/i18n/personality.ts
Modify: src/components/personality/personality-landing.tsx
Modify: src/components/personality/personality-landing-v1.module.css

Interfaces:

Changes guidance.items from plain strings to structured objects
Replaces the current limitations list with three concise use-boundary groups and a methodology link
Guidance interface

Change guidance items to:

readonly {
  title: string;
  description: string;
}[];
Chinese guidance
按通常状态回答
选择最接近日常行为的答案。
不要回答“我应该是什么样”
回答实际倾向，而不是理想形象。
避免过度分析单道题
依据通常经验作答，而不是寻找“正确答案”。
没有好坏人格类型
每个维度描述偏好，而不是价值、能力或成熟度。

English must convey the same meaning naturally.

Boundary interface

Replace the old limitations array with:

limitations: {
  eyebrow: string;
  title: string;
  groups: readonly {
    label: string;
    description: string;
  }[];
  action: string;
}
Chinese groups

用于

理解偏好、观察重复模式、形成进一步探索的问题。

不用于

医学或心理诊断、智力测试、能力评级、招聘或录取决定。

重要提醒

人格结果反映的是当前回答所呈现的偏好结构，不代表固定不变的身份。

Link:

/methodology

CTA:

了解完整方法与使用边界 →

English must communicate the equivalent boundary.

 Step 1: Run RED structured-copy contract

Check old string-array interface and old limitations list still exist.

Expected: RED failure.

 Step 2: Update dictionary types and bilingual copy

Modify src/data/i18n/personality.ts.

 Step 3: Update rendering

Modify personality-landing.tsx to:

render four guidance cards
render three boundary groups
use Next Link for /methodology
 Step 4: Add bounded-card styling

Both sections remain within 1280px geometry.

The boundary module must be visually smaller than the Methodology page and must not read like a legal disclaimer wall.

 Step 5: Verify
npm run typecheck
git diff --check
git diff --quiet -- src/app/globals.css
 Step 6: Browser QA

Chinese first, then English.

 Step 7: Commit after acceptance

Commit:

refactor(personality): clarify guidance and boundaries
Task 6: Final CTA + Responsive Completion

Files:

Modify: src/components/personality/personality-landing.tsx
Modify: src/components/personality/personality-landing-v1.module.css

Interfaces:

Consumes: dictionary.finalCta
Produces: final bounded conversion card and complete responsive Personality V1 layout
Final CTA

Remove:

<CompassMark />

Final card:

1280px bounded
Warm Ivory / light surface
1.5px Indigo border
radius about 24px
no star
no compass
no constellation

Preserve:

/personality/test
Responsive acceptance
Desktop
1280px unified geometry
Hero split
dimensions 2 × 2
result split
guidance four cards
boundary compact
final CTA bounded
Tablet
Hero may become one column
dimensions may remain two columns where width allows
result module may stack
Mobile

Target first QA viewport:

390 × 844

Requirements:

approximately 20px page gutter
no horizontal overflow
Header remains functional
Hero becomes one column
Preference Map fits viewport
dimensions one column
result split stacks
guidance cards one column
boundary groups readable
CTA full-width where appropriate
Chinese and English headings do not clip
 Step 1: Run RED final-CTA contract
 Step 2: Remove final CompassMark and rebuild CTA
 Step 3: Complete 1050 / 900 / 700 / mobile responsive rules
 Step 4: Typecheck + diff check + globals guard
 Step 5: Chinese desktop QA
 Step 6: English desktop QA
 Step 7: Chinese mobile 390 × 844 QA
 Step 8: English mobile 390 × 844 QA
 Step 9: Commit after acceptance

Commit:

style(personality): complete landing responsive v1
Task 7: Final Regression Gate

Files:

Verify only unless a specific regression is found
Functional protections

Verify:

/personality loads
/personality/test CTA remains correct
secondary Hero link scrolls to dimensions
/methodology link works
locale switching still works
SiteHeader unchanged functionally
SiteFooter unchanged functionally
no scoring or result code changed
no backend file changed
no globals.css change
 Step 1: Scope audit

Expected personality implementation scope:

src/components/personality/personality-landing.tsx
src/components/personality/personality-landing-v1.module.css
src/data/i18n/personality.ts

Any additional application-code file must have explicit evidence and approval.

 Step 2: Typecheck
npm run typecheck

Expected:

PASS
 Step 3: Production build
npm run build

Expected:

PASS
 Step 4: Diff validation
git diff --check
git diff --quiet -- src/app/globals.css

Expected:

DIFF_CHECK=PASS
GLOBALS_UNCHANGED=PASS
 Step 5: Browser final acceptance

Verify:

Chinese desktop
English desktop
Chinese mobile
English mobile
 Step 6: Functional navigation QA

Verify:

/personality
/personality/test
/methodology
/
 Step 7: Final commit only after acceptance

Commit only Personality Landing V1 implementation files.

Do not include unrelated Homepage V1 worktree changes.

Suggested final integration commit if task commits have not already been made:

style(personality): complete landing visual v1
 Step 8: Freeze notification

Record:

PERSONALITY LANDING VISUAL V1 = COMPLETE
LOCAL QA = PASS
TYPECHECK = PASS
BUILD = PASS
PRODUCTION CHANGED = NO

Production deployment is a separate explicit stage and requires separate user approval.

Self-Review
Spec coverage
Hero redesign: Task 2
Preference Map: Task 2
1280px geometry: Tasks 2–6
four-dimensional 2 × 2 system: Task 3
bounded result module: Task 4
answering guidance: Task 5
compact methodology boundary: Task 5
final CTA without compass: Task 6
mobile responsive behavior: Task 6
bilingual QA: Tasks 2–7
scoring/report/payment/backend protection: Global Constraints + Task 7
Scope isolation

Implementation intentionally uses:

personality-landing-v1.module.css

instead of modifying:

src/app/globals.css
src/app/brand-home.css

This keeps Personality Landing V1 isolated from existing Homepage V1 worktree changes.

Placeholder scan

No unfinished markers or placeholder instructions are permitted.

Completion rule

No task is considered complete from static checks alone when it changes visible UI.

Browser visual acceptance is required before the corresponding implementation commit.

