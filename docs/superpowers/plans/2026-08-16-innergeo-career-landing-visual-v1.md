# InnerGeo Career Landing Visual V1 Implementation Plan

**Date:** 2026-08-16  
**Route:** `/career`  
**Design:** Professional Career Exploration Landing  
**Status:** Approved for implementation planning

---

# 1. Goal

Redesign the existing Career Interests landing page into a shorter,
clearer and more professional assessment entry experience.

The final journey is:

> Interest  
> → Interest Structure  
> → Interest Pattern  
> → Career Direction Exploration

The redesign must remain inside the existing InnerGeo product architecture.

---

# 2. Protected Behavior

The following behavior must not change:

- `/career/test`
- 36-question Career assessment
- RIASEC question bank
- session creation
- answer storage
- scoring
- RIASEC result contract
- `/career/result/[sessionId]`
- `/career/report/[sessionId]`
- report generation
- entitlement
- payment
- backend APIs
- database
- production infrastructure

Career Landing V1 is a landing-page presentation project only.

---

# 3. Expected Implementation Files

Primary files:

```text
src/components/career/career-landing.tsx
src/components/career/career-landing-v1.module.css
src/data/i18n/career.tsPossible metadata-only file if required:

src/app/career/page.tsx

Protected presentation file:

src/app/globals.css

Do not modify src/app/globals.css during normal implementation.

4. Engineering Method

Each visible task follows:

establish RED contract;
confirm expected failure;
make the smallest implementation;
run TypeScript validation;
run diff validation;
verify globals.css unchanged;
perform browser visual QA;
receive user acceptance;
commit only the relevant Career files.

No visible UI task is complete from static validation alone.

Task 1 — Career Landing Copy Foundation
Files

Modify:

src/data/i18n/career.ts
Objective

Update the core bilingual Career landing copy before structural redesign.

Do not change dictionary structure yet unless required for the approved copy.

Hero Chinese

Eyebrow:

职业兴趣探索

Title:

发现什么真正吸引你，再去探索适合的职业方向。

Description:

通过 36 道职业兴趣题目，观察你对不同活动、问题类型与工作环境的兴趣倾向，形成六个 RIASEC 维度的个人兴趣结构。

Metadata:

36 道题
约 5–8 分钟
无需注册即可开始

Primary action:

开始职业兴趣探索

Secondary action:

了解六个兴趣维度

Hero English

Eyebrow:

Career Interest Assessment

Title:

Discover what genuinely holds your interest, then explore possible career directions.

Description:

Explore your interest across different activities, problem types and work environments through a 36-question RIASEC assessment.

Metadata:

36 questions
approximately 5–8 minutes
no account required to begin

Primary action:

Start Career Interest Assessment

Secondary action:

Explore the Six Interest Dimensions

RED Contract

Verify that the complete new Hero copy is not yet present.

Expected:

RED_CONTRACT=FAIL_AS_EXPECTED
GREEN Validation

Run:

npm run typecheck
git diff --check

Expected:

TYPECHECK=PASS
DIFF_CHECK=PASS
Commit
copy(career): clarify landing exploration language
Task 2 — Hero + Career Interest Map
Files

Modify:

src/components/career/career-landing.tsx

Create:

src/components/career/career-landing-v1.module.css
Objective

Replace the existing Compass-based Career Hero with the approved
Career Interest Map.

Remove from Hero
CareerMap
Hero CompassMark
old circular compass representation
size="full"
max-w-[1400px]
legacy Career Hero presentation classes

Do not remove CompassMark usage elsewhere in the file until its own task.

New Hero

Use:

Container size="wide"

Primary geometry:

1280px
48% copy
52% visual
Career Interest Map

Center:

Chinese:

六个兴趣方向
你的兴趣结构

English:

SIX INTEREST DIRECTIONS
YOUR INTEREST PATTERN

Six neutral nodes:

R
I
A
S
E
C

No node is selected.

No score is shown.

No dimension is visually stronger.

No astrological visual treatment.

CSS

All new Career Landing V1 styling goes into:

career-landing-v1.module.css

Use the existing InnerGeo brand variables.

RED Contract

Confirm:

legacy CareerMap exists;
CompassMark exists in Hero;
Hero still uses full-width 1400px treatment;
Career Interest Map does not exist;
new CSS module does not exist.

Expected:

RED_CONTRACT=FAIL_AS_EXPECTED
Static Validation
npm run typecheck
git diff --check
git diff --quiet -- src/app/globals.css

Expected:

TYPECHECK=PASS
DIFF_CHECK=PASS
GLOBALS_UNCHANGED=PASS
Browser QA

Required before commit:

Chinese desktop Hero
English desktop Hero

Verify:

readable copy;
balanced 48/52 geometry;
map feels professional;
no astrology resemblance;
no simulated result;
CTA remains /career/test.
Commit
style(career): rebuild landing hero
Task 3 — Why Interests Matter
Files

Modify:

src/components/career/career-landing.tsx
src/components/career/career-landing-v1.module.css
src/data/i18n/career.ts
Objective

Compress the existing Career Context area into a concise bounded module.

Chinese

Eyebrow:

为什么先理解兴趣

Title:

职业方向，不只是从职位名称开始。

Core explanation:

职业兴趣测评关注的，不是“哪一个职业最适合你”，而是哪些活动、问题与环境更容易让你愿意持续投入。

Supporting message:

理解这些兴趣线索，可以帮助你更有方向地探索职业领域、工作环境与发展路径。

English

Title:

Career direction starts before the job title.

The section must clearly state:

Career Interests explores engagement signals;
it does not prescribe one correct occupation.
Layout

1280px bounded module.

Compact two-column or structured split layout.

This section remains visually smaller than Hero and RIASEC.

RED Contract

Confirm old career-context structure is still present and the new scoped
Career context classes are absent.

Validation

Typecheck, diff check, global CSS guard, Chinese and English desktop QA.

Commit
style(career): refine interest context
Task 4 — RIASEC Six Dimensions
Files

Modify:

src/components/career/career-landing.tsx
src/components/career/career-landing-v1.module.css
src/data/i18n/career.ts
Objective

Convert the existing RIASEC presentation into a professional 3 × 2 card system.

Desktop
R    I    A
S    E    C

Each card contains:

sequence number;
dimension code;
localized title;
concise explanation;
2–3 representative activity keywords.
Content

Reuse existing mature RIASEC content wherever possible.

Editorial work may:

shorten;
remove repetition;
turn examples into concise keywords.

Do not redefine RIASEC concepts.

Permanent Boundary

English:

RIASEC dimensions describe interest directions, not ability rankings.

Chinese:

RIASEC 描述的是兴趣方向，而不是能力排名。

Visual Rules
all six cards equal;
no selected state;
no ranking;
no stronger/weaker visual semantics;
Gold only as signal/index;
Indigo as structural color;
comfortable body copy approximately 14–15px.
Responsive

Desktop:

3 × 2

Tablet:

2 × 3 or single column according to available width

Mobile:

1 column
RED Contract

Confirm old riasec-grid / riasec-card presentation remains and new scoped
RIASEC card system is absent.

Validation

Typecheck, diff check, globals guard, Chinese desktop QA, English desktop QA.

Commit
style(career): structure riasec dimensions
Task 5 — Interest Pattern + Beyond Consolidation
Files

Modify:

src/components/career/career-landing.tsx
src/components/career/career-landing-v1.module.css
src/data/i18n/career.ts
Objective

Strengthen the Interest Pattern concept and absorb the useful content from
Beyond Job Titles.

The old standalone Beyond module is removed from the page.

Core Message

Chinese title:

真正有价值的，不只是最高的一项兴趣。

English title:

The most useful signal is often the pattern, not one highest score.

Explain:

all six dimensions form a profile;
Top 2–3 dimensions are often most useful for exploration;
combinations influence activities, roles and preferred environments;
similar career fields can contain very different work.
Fixed Educational Examples

Example 1:

I 研究型 + A 艺术型
Investigative + Artistic

Example 2:

E 企业型 + S 社会型
Enterprising + Social

The examples must clearly display:

示例
Example

Never display:

你的组合
Your Combination

before the user completes the assessment.

Beyond Consolidation

Remove the standalone beyond-section.

Absorb its useful ideas into Interest Pattern:

activity;
problem type;
environment;
role;
collaboration style.
RED Contract

Confirm:

old Interest Pattern exists;
old Beyond section exists;
new consolidated scoped structure does not exist.
Validation

Typecheck, diff check, globals guard, bilingual desktop QA.

Commit
style(career): clarify interest patterns
Task 6 — What You Will Receive
Files

Modify:

src/components/career/career-landing.tsx
src/components/career/career-landing-v1.module.css
src/data/i18n/career.ts
Objective

Replace the existing full-width Career Results block with a bounded result
preview card.

Layout

Desktop:

42% Deep Indigo
58% Warm Ivory / white

Use the same brand family as Personality without copying its exact component.

Chinese

Title:

完成测评后，你会看到自己的职业兴趣结构。

Description:

结果不是替你选择一个职业，而是整理出可以继续理解、比较和探索的兴趣线索。

Six items:

你的 RIASEC 兴趣代码
六个兴趣维度的完整排序
最突出的 2–3 个兴趣方向
兴趣组合与可能的工作环境
值得继续探索的职业领域
可进一步查看的完整职业兴趣报告
English

Title:

See the structure behind your career interests.

Six equivalent outputs.

Language Protection

Avoid deterministic language:

perfect career;
best career;
guaranteed fit;
you should become.

Prefer:

worth exploring;
possible;
consider;
investigate further.
RED Contract

Confirm old career-results presentation remains and new scoped result card
is absent.

Validation

Typecheck, diff check, globals guard, Chinese desktop QA, English desktop QA.

Commit
style(career): refine assessment outputs
Task 7 — Answering Guidance
Files

Modify:

src/data/i18n/career.ts
src/components/career/career-landing.tsx
src/components/career/career-landing-v1.module.css
Objective

Convert Career Guidance into four structured cards.

Chinese

Title:

按照真正吸引你的活动作答。

Description:

不需要选择更体面的职业答案，也不需要按照当前技能高低来判断自己的兴趣。

Cards:

01

回答“我感兴趣什么”

02

不要回答“什么职业更体面”

03

不要按当前技能高低作答

04

兴趣可以随着经历变化

Each card includes a concise explanatory description.

English

Use natural equivalent Career Interest language.

Do not translate mechanically.

RED Contract

Confirm old career-guidance-grid string presentation exists and structured
guidance cards do not yet exist.

Validation

Typecheck, diff check, globals guard, bilingual desktop QA.

Commit

May be combined with Task 8 after visual acceptance if both remain within the
same approved Guidance + Boundaries scope.

Task 8 — Use Boundaries
Files

Modify:

src/data/i18n/career.ts
src/components/career/career-landing.tsx
src/components/career/career-landing-v1.module.css
Objective

Replace the existing long Career Disclaimer section with a compact Use
Boundaries card.

Title

Chinese:

如何使用这项测评

English:

How to use this assessment

Groups
用于 / Use it for
interest directions;
activity preferences;
environment preferences;
career-exploration questions.
不用于 / Do not use it for
hiring decisions;
admission decisions;
professional qualification;
intelligence measurement;
ability ranking;
guaranteed future performance.
重要提醒 / Important reminder

Chinese:

兴趣不等于能力，兴趣方向也不等于唯一职业选择。

English:

Interest is not the same as ability, and an interest direction is not a single career prescription.

Methodology Action

Destination:

/methodology

Chinese:

了解完整方法与使用边界 →

English:

Explore the full methodology and use boundaries →

RED Contract

Confirm:

old career-disclaimer exists;
new boundary groups do not exist;
/methodology link is absent from Career landing.
Validation

Typecheck, diff check, global CSS guard.

Browser QA:

Chinese Guidance + Boundary
English Guidance + Boundary
Commit

Preferred combined commit:

refactor(career): clarify guidance and boundaries
Task 9 — Remove Future Profile + Rebuild Final CTA
Files

Modify:

src/components/career/career-landing.tsx
src/components/career/career-landing-v1.module.css
src/data/i18n/career.ts
Objective

Remove future-product messaging from Career landing and create one focused
final conversion action.

Remove
future-profile
future-profile-map
second CompassMark
future cross-assessment labels
secondary Personality CTA
legacy large full-width final CTA

Do not delete underlying future architecture outside the landing page.

Chinese Final CTA

Eyebrow:

职业兴趣探索

Title:

从兴趣开始，探索更适合自己的方向。

Primary CTA:

开始职业兴趣探索 →

Supporting copy:

36 道题 · 约 5–8 分钟 · 无需注册即可开始

English Final CTA

Eyebrow:

Career Interest Assessment

Title:

Start with your interests. Explore possible directions from there.

Primary CTA:

Start Career Interest Assessment →

Supporting copy:

36 questions · approximately 5–8 minutes · no account required to begin

Visual
1280px bounded;
Warm Ivory;
restrained Indigo border;
24px radius;
no CompassMark;
no second CTA;
clean transition to Footer.
RED Contract

Confirm:

Future Profile exists;
final secondary Personality CTA exists;
CompassMark remains outside Hero;
new scoped final CTA does not yet exist.
Validation

Typecheck, diff check, globals guard, bilingual desktop QA.

Commit
style(career): complete landing conversion path
Task 10 — Responsive Completion
Files

Modify only Career Landing V1 implementation files.

Primary Mobile Target
390 × 844
Requirements

Hero:

one column;
Career Interest Map below copy;
CTA fully visible.

Why Interests Matter:

stack naturally.

RIASEC:

single column;
no clipped labels;
body text readable.

Interest Pattern:

examples stack cleanly;
no simulated personal result.

Result Preview:

Indigo summary stacks above results.

Guidance:

four cards become one column.

Use Boundaries:

three groups become vertical.

Final CTA:

primary action remains visible;
no horizontal overflow.

Typography:

body copy remains readable;
Chinese characters do not clip;
English headings do not create pathological orphan lines.
Required QA
Chinese mobile 390 × 844
English mobile 390 × 844
Validation
npm run typecheck
git diff --check
git diff --quiet -- src/app/globals.css
Commit
style(career): complete responsive landing v1
Task 11 — Final Regression Gate
Scope Audit

Expected application implementation files:

src/components/career/career-landing.tsx
src/components/career/career-landing-v1.module.css
src/data/i18n/career.ts

src/app/career/page.tsx may only appear if metadata copy was explicitly
adjusted.

Any other application-code file requires explicit evidence before modification.

Functional Verification

Verify:

/career
/career/test
/methodology
/

Required behaviors:

Career landing loads;
Hero CTA routes to /career/test;
secondary Hero anchor reaches RIASEC;
methodology link works;
locale switching works;
Header remains functional;
Footer remains functional.
TypeScript

Run:

npm run typecheck

Expected:

PASS
Production Build

Run:

npm run build

Expected:

PASS
Diff Validation

Run:

git diff --check

Expected:

PASS
Global CSS Guard

Run:

git diff --quiet -- src/app/globals.css

Expected:

PASS
Visual Acceptance

Required:

Chinese desktop
English desktop
Chinese mobile 390 × 844
English mobile 390 × 844
Functional Protection Audit

Confirm no changes to:

Career test behavior;
question bank;
scoring;
result contract;
report generation;
backend;
payment;
entitlement.
Task 12 — Completion and Freeze

Career Landing Visual V1 is complete only after:

DESIGN SPEC = APPROVED
IMPLEMENTATION PLAN = APPROVED
TYPECHECK = PASS
BUILD = PASS
DIFF CHECK = PASS
GLOBALS CSS = UNCHANGED
ZH DESKTOP = PASS
EN DESKTOP = PASS
ZH MOBILE = PASS
EN MOBILE = PASS
CAREER TEST CTA = PASS
METHODOLOGY LINK = PASS
PRODUCTION SERVER CHANGED = NO

Final status:

CAREER LANDING VISUAL V1 = COMPLETE

Production deployment is a separate stage.

No production deployment occurs automatically when local Career Landing V1
is completed.

Implementation Sequence

The approved execution order is:

Task 1  Copy Foundation
Task 2  Hero + Career Interest Map
Task 3  Why Interests Matter
Task 4  RIASEC Six Dimensions
Task 5  Interest Pattern + Beyond Consolidation
Task 6  What You Will Receive
Task 7  Answering Guidance
Task 8  Use Boundaries
Task 9  Future Profile Removal + Final CTA
Task 10 Responsive Completion
Task 11 Final Regression Gate
Task 12 Completion / Freeze

Implementation must remain sequential.

Do not jump to later visible modules while an earlier module is waiting for
browser visual acceptance.

