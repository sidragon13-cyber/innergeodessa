# InnerGeo Career Landing Visual V1

**Status:** Approved Design  
**Date:** 2026-08-16  
**Product:** InnerGeo Career Interests  
**Route:** `/career`

---

# 1. Purpose

Career Landing Visual V1 redesigns the existing `/career` landing page into a
clearer, shorter and more professional career-interest exploration experience.

The redesign must preserve the existing Career Interests product and RIASEC
assessment system while improving:

- visual hierarchy;
- product positioning;
- reading comfort;
- assessment credibility;
- conversion into `/career/test`;
- consistency with the InnerGeo brand system.

The page should communicate one progression:

> Interest → Interest Structure → Pattern → Direction Exploration

The page must not present InnerGeo as deciding a career for the user.

---

# 2. Product Positioning

Career Interests is a structured interest-exploration assessment.

It is not:

- a job-matching engine;
- an ability test;
- an intelligence test;
- a qualification assessment;
- a hiring tool;
- a promise of future career success.

Its purpose is to help users identify activities, environments and problem
types that appear more naturally engaging, then use those signals as starting
points for further career exploration.

Core principle:

> Interests provide direction clues, not final decisions.

Chinese principle:

> 兴趣提供方向线索，而不是替用户作出职业决定。

---

# 3. Relationship to the InnerGeo Brand System

Career Landing V1 belongs to the same visual family as:

- InnerGeo Homepage;
- Personality Landing V1;
- Methodology & Use Boundaries.

Shared visual language:

- 1280px primary desktop content boundary;
- Deep Indigo;
- Champagne Gold;
- Warm Ivory;
- restrained borders;
- soft large radii;
- Source Serif 4 for display typography;
- Inter / existing CJK fallback stack for interface and body copy;
- generous but controlled spacing;
- professional digital-product composition.

Career must not visually duplicate Personality.

Personality emphasis:

> Understand

Career emphasis:

> Explore Direction

Career visual keywords:

> Clear · Structured · Directional · Warm · Measured

---

# 4. Scope

Career Landing Visual V1 may change:

- `/career` landing copy;
- `/career` landing markup;
- `/career` landing-specific presentation;
- Career landing responsive behavior;
- Career landing visual diagrams;
- Career landing methodology link.

Career Landing Visual V1 must not change:

- `/career/test` behavior;
- the 36-question assessment;
- question-bank content unless separately approved;
- RIASEC scoring;
- session creation;
- answer persistence;
- result contracts;
- result calculations;
- `/career/result/[sessionId]`;
- `/career/report/[sessionId]`;
- premium entitlement;
- payments;
- backend APIs;
- database behavior;
- production deployment.

No backend or production-server change is part of this design stage.

---

# 5. Information Architecture

Final page order:

1. Header
2. Hero + Career Interest Map
3. Why Interests Matter
4. RIASEC Six Dimensions
5. Interest Pattern
6. What You Will Receive
7. Answering Guidance
8. Use Boundaries
9. Final CTA
10. Footer

The existing standalone Future Profile module is removed.

The existing Beyond Job Titles concept is consolidated into Interest Pattern.

The existing Guidance and Disclaimer areas are redesigned as:

- Answering Guidance;
- compact Use Boundaries.

---

# 6. Hero

## 6.1 Layout

Desktop:

- 1280px bounded card;
- approximately 48% copy / 52% visual;
- left copy;
- right Career Interest Map;
- approximately 560px minimum visual height;
- 24px large radius;
- restrained Indigo border;
- Warm Ivory / white surface.

Responsive:

- stack vertically below tablet breakpoint;
- no horizontal overflow;
- CTA remains prominent;
- visual remains readable without requiring animation.

---

## 6.2 Hero Copy

### Chinese

Eyebrow:

> 职业兴趣探索

Title:

> 发现什么真正吸引你，  
> 再去探索适合的职业方向。

Description:

> 通过 36 道职业兴趣题目，观察你对不同活动、问题类型与工作环境的兴趣倾向，形成六个 RIASEC 维度的个人兴趣结构。

Metadata:

> 36 道题 · 约 5–8 分钟 · 无需注册即可开始

Primary CTA:

> 开始职业兴趣探索

Secondary action:

> 了解六个兴趣维度

### English

Eyebrow:

> Career Interest Assessment

Title:

> Discover what genuinely holds your interest, then explore possible career directions.

Description:

> Explore your interest across different activities, problem types and work environments through a 36-question RIASEC assessment.

Metadata:

> 36 questions · approximately 5–8 minutes · no account required to begin

Primary CTA:

> Start Career Interest Assessment

Secondary action:

> Explore the Six Interest Dimensions

---

# 7. Career Interest Map

The existing Compass-based Hero visual is removed.

The replacement is:

> Career Interest Map

Purpose:

- visually introduce six RIASEC directions;
- communicate structure rather than mysticism;
- remain neutral before assessment completion;
- avoid implying that one dimension is already strongest.

Center label:

### Chinese

> 六个兴趣方向  
> 你的兴趣结构

### English

> SIX INTEREST DIRECTIONS  
> YOUR INTEREST PATTERN

Six visible nodes:

- R
- I
- A
- S
- E
- C

The visual must not:

- highlight a winner;
- display a score;
- simulate a user result;
- resemble a zodiac chart;
- use a CompassMark;
- suggest scientific precision beyond the assessment.

The preferred visual language is a structured directional / coordinate system
rather than an astrological ring.

---

# 8. Why Interests Matter

The current contextual explanation is retained conceptually but compressed.

## Chinese

Eyebrow:

> 为什么先理解兴趣

Title:

> 职业方向，不只是从职位名称开始。

Core message:

> 职业兴趣测评关注的，不是“哪一个职业最适合你”，而是哪些活动、问题与环境更容易让你愿意持续投入。

Supporting idea:

> 理解这些兴趣线索，可以帮助你更有方向地探索职业领域、工作环境与发展路径。

## English

Eyebrow:

> Why interests matter

Title:

> Career direction starts before the job title.

Core message:

> Career-interest assessment looks at the activities, problems and environments that tend to hold your attention—not at one job you are supposed to choose.

The module should be compact and visually secondary to Hero and RIASEC.

---

# 9. RIASEC Six Dimensions

This is the primary educational module of the Career landing page.

Layout:

- desktop: 3 × 2;
- tablet: 2 × 3 or single-column depending on available width;
- mobile: single-column;
- equal visual hierarchy;
- no preferred dimension.

Each card contains:

1. sequence number;
2. RIASEC code;
3. localized dimension name;
4. concise interest description;
5. 2–3 representative activity keywords.

The six dimensions remain:

- R — Realistic / 现实型
- I — Investigative / 研究型
- A — Artistic / 艺术型
- S — Social / 社会型
- E — Enterprising / 企业型
- C — Conventional / 常规型

Existing mature Career landing content should be reused wherever suitable.

Editorial changes may:

- shorten copy;
- remove repetition;
- convert examples into concise activity keywords;
- improve bilingual readability.

Editorial changes must not redefine the RIASEC theory.

Permanent principle:

> RIASEC dimensions describe interest directions, not ability rankings.

Chinese:

> RIASEC 描述的是兴趣方向，而不是能力排名。

---

# 10. Interest Pattern

Purpose:

Explain that Career Interests is not reduced to one highest dimension.

Eyebrow:

### Chinese
> 兴趣组合

### English
> Interest Pattern

Chinese title:

> 真正有价值的，不只是最高的一项兴趣。

English title:

> The most useful signal is often the pattern, not one highest score.

The module explains:

- all six dimensions form a profile;
- the Top 2–3 dimensions are often useful for exploration;
- combinations may point toward different activities, environments and roles;
- similar career fields may contain very different kinds of work.

---

# 11. Interest Pattern Examples

Examples are fixed educational examples.

They must not be presented as the visitor's result.

Preferred examples:

> I 研究型 + A 艺术型

and

> E 企业型 + S 社会型

English:

> Investigative + Artistic

and

> Enterprising + Social

The visual must clearly communicate:

> Example / 示例

Do not use:

> Your Combination / 你的组合

before assessment completion.

No personalized result is simulated on the landing page.

---

# 12. Beyond Job Titles Consolidation

The existing Beyond Job Titles content is not maintained as a standalone
large module.

Its useful concept is absorbed into Interest Pattern.

Core idea:

> The same career field can contain different activities, environments,
> problems and roles.

The page should encourage users to explore:

- type of activity;
- type of problem;
- work environment;
- collaboration style;
- role characteristics;

rather than relying only on job-title labels.

---

# 13. What You Will Receive

Use a bounded split-card system that belongs to the same family as Personality
without becoming an exact duplicate.

Preferred visual structure:

- left: Deep Indigo summary;
- right: Warm Ivory structured list;
- 24px radius;
- clear numbered hierarchy.

## Chinese

Eyebrow:

> 你的结果

Title:

> 完成测评后，  
> 你会看到自己的职业兴趣结构。

Description:

> 结果不是替你选择一个职业，而是整理出可以继续理解、比较和探索的兴趣线索。

Items:

1. 你的 RIASEC 兴趣代码
2. 六个兴趣维度的完整排序
3. 最突出的 2–3 个兴趣方向
4. 兴趣组合与可能的工作环境
5. 值得继续探索的职业领域
6. 可进一步查看的完整职业兴趣报告

## English

Title:

> See the structure behind your career interests.

Items:

1. Your RIASEC interest code
2. A complete ranking across all six dimensions
3. Your most prominent 2–3 interest directions
4. Interest combinations and possible work environments
5. Career fields worth further exploration
6. A complete Career Interest Report available for deeper review

Language must prefer:

- explore;
- consider;
- worth exploring;
- possible environments;

over deterministic language such as:

- perfect career;
- best career;
- you should become;
- guaranteed fit.

---

# 14. Answering Guidance

The existing Career guidance becomes four structured cards.

## Chinese

Eyebrow:

> 开始之前

Title:

> 按照真正吸引你的活动作答。

Description:

> 不需要选择更体面的职业答案，也不需要按照当前技能高低来判断自己的兴趣。

Cards:

### 01
> 回答“我感兴趣什么”

Use actual interest and curiosity rather than perceived prestige.

### 02
> 不要回答“什么职业更体面”

Do not optimize answers for social status or expected career image.

### 03
> 不要按当前技能高低作答

Interest and current skill level are different questions.

### 04
> 兴趣可以随着经历变化

Results reflect the current response pattern and may evolve with experience.

English copy should communicate the same concepts naturally rather than
translate word-for-word.

---

# 15. Use Boundaries

Guidance is immediately followed by one compact Use Boundary card.

Title:

### Chinese
> 如何使用这项测评

### English
> How to use this assessment

Three groups:

## 用于 / Use it for

- understanding interest directions;
- identifying activity preferences;
- considering environment preferences;
- generating career-exploration questions.

## 不用于 / Do not use it for

- hiring decisions;
- admissions decisions;
- professional qualification decisions;
- intelligence measurement;
- ability ranking;
- guaranteeing future career performance.

## 重要提醒 / Important reminder

Chinese:

> 兴趣不等于能力，兴趣方向也不等于唯一职业选择。

English:

> Interest is not the same as ability, and an interest direction is not a single career prescription.

Bottom action:

### Chinese
> 了解完整方法与使用边界 →

### English
> Explore the full methodology and use boundaries →

Destination:

`/methodology`

---

# 16. Future Profile

The current Future Profile module is removed from Career Landing V1.

Reason:

- it describes future cross-assessment functionality;
- the landing page should prioritize products available now;
- premature future-product messaging weakens perceived maturity;
- cross-assessment profiles can be designed later when the product is live.

Removal is limited to the landing-page presentation.

No underlying future architecture should be deleted solely because this
landing module is removed.

---

# 17. Final CTA

Final CTA has one primary purpose:

> Start the Career Interest Assessment.

No secondary Personality CTA is shown.

No CompassMark is shown.

## Chinese

Eyebrow:

> 职业兴趣探索

Title:

> 从兴趣开始，探索更适合自己的方向。

Primary CTA:

> 开始职业兴趣探索 →

Supporting information:

> 36 道题 · 约 5–8 分钟 · 无需注册即可开始

## English

Eyebrow:

> Career Interest Assessment

Title:

> Start with your interests. Explore possible directions from there.

Primary CTA:

> Start Career Interest Assessment →

Supporting information:

> 36 questions · approximately 5–8 minutes · no account required to begin

Visual treatment:

- Warm Ivory;
- restrained Indigo border;
- no oversized decorative icon;
- no second CTA;
- clear transition into shared InnerGeo footer.

---

# 18. Footer

Use the existing unified InnerGeo footer.

Career Landing V1 must not introduce a Career-specific footer implementation.

Footer changes are outside this feature unless a real integration bug is
discovered.

---

# 19. Typography and Readability

Career Landing V1 must preserve the readability lessons confirmed during the
Personality redesign.

Body content intended for actual reading must not be rendered as micro-copy.

Desktop guidance:

- primary body copy: approximately 14–16px;
- important explanatory card copy: approximately 14–15px;
- compact notes: approximately 12–12.5px minimum when practical;
- eyebrow / index labels may remain visually smaller.

Large whitespace must not be used as justification for undersized body text.

Chinese text must receive equal readability consideration to English text.

---

# 20. Width, Radius and Spacing

Primary major modules:

- desktop outer boundary: approximately 1280px;
- large card radius: approximately 24px;
- product / dimension card radius: approximately 20–22px;
- border: approximately 1–1.5px;
- major vertical module rhythm: approximately 72–104px depending on hierarchy.

Principle:

> Outer boundaries are unified; internal layouts may differ by module.

Do not force every Career section into the same internal grid.

---

# 21. Color System

Primary:

- Deep Indigo `#4A5878`

Signal:

- Champagne Gold `#C5A36A`

Background:

- Warm Ivory `#F3F0EA`

Text:

- primary approximately `#3D3A38`
- secondary approximately `#6F706F`

Gold should function primarily as:

- index;
- signal;
- micro-accent;
- directional marker.

Gold should not become a large background surface.

No purple galaxy treatment.

No mystic visual treatment.

---

# 22. Accessibility

The redesign must preserve or improve:

- semantic section hierarchy;
- keyboard-focus visibility;
- readable contrast;
- CTA accessibility;
- meaningful links;
- no information conveyed by color alone;
- decorative diagrams marked appropriately for assistive technology.

Career Interest Map is decorative and educational.

It must not expose false score semantics to screen readers.

---

# 23. Responsive Design

Required responsive acceptance includes:

- desktop English;
- desktop Chinese;
- mobile English;
- mobile Chinese.

Primary mobile target:

> 390 × 844

Requirements:

- no horizontal overflow;
- no clipped card content;
- no broken Chinese word layout;
- no unusably small body copy;
- RIASEC cards stack cleanly;
- Interest Pattern examples remain understandable;
- result split card stacks cleanly;
- Guidance cards stack cleanly;
- Use Boundaries stacks cleanly;
- CTA remains fully visible and tappable.

---

# 24. Protected Functional Behavior

The following behavior must remain unchanged:

- Hero primary CTA routes to `/career/test`;
- 36-question Career assessment remains unchanged;
- RIASEC question loading remains unchanged;
- session creation remains unchanged;
- answer saving remains unchanged;
- scoring remains unchanged;
- result generation remains unchanged;
- report generation remains unchanged;
- payment and entitlement remain unchanged.

Landing visual work must not modify:

- scoring functions;
- backend API contracts;
- database models;
- report generators;
- result contracts;
- payment configuration.

---

# 25. CSS Isolation

Career Landing Visual V1 should use a dedicated scoped CSS Module.

Preferred file:

`src/components/career/career-landing-v1.module.css`

The implementation should migrate redesigned Career landing presentation away
from old global Career landing selectors where practical.

Do not modify `src/app/globals.css` as part of the normal Career Landing V1
implementation.

Existing global styles may remain temporarily if they are still used by other
routes or until safe cleanup is separately approved.

---

# 26. Implementation Files

Expected primary files:

- `src/components/career/career-landing.tsx`
- `src/components/career/career-landing-v1.module.css`
- `src/data/i18n/career.ts`

Possible metadata-only adjustment:

- `src/app/career/page.tsx`

No other file should be modified without evidence that the approved landing
design requires it.

---

# 27. Visual Acceptance Criteria

Career Landing V1 is visually acceptable when:

1. Hero belongs clearly to the InnerGeo brand family.
2. Career does not look like a copy of Personality.
3. Career Interest Map does not resemble astrology.
4. Six RIASEC dimensions are visually equal.
5. Reading hierarchy remains comfortable in Chinese and English.
6. Page is materially shorter and more focused than the current version.
7. Interest Pattern explains combinations without simulating a user result.
8. Result Preview avoids deterministic career promises.
9. Guidance clearly separates interest from prestige and current skill.
10. Use Boundaries clearly state appropriate and inappropriate uses.
11. Future Profile no longer appears on the landing page.
12. Final CTA contains only one primary conversion action.
13. Shared Header and Footer remain visually consistent.
14. Desktop and mobile have no visible overflow.

---

# 28. Engineering Acceptance Criteria

Before Career Landing Visual V1 can be considered complete:

- TypeScript must pass;
- production build must pass;
- `git diff --check` must pass;
- `/career` renders in English;
- `/career` renders in Chinese;
- desktop browser visual QA passes;
- mobile browser visual QA at 390 × 844 passes;
- `/career/test` CTA behavior remains unchanged;
- no backend change is introduced;
- no production-server change occurs during local implementation.

Static checks alone are not sufficient for visible UI work.

Browser visual acceptance is mandatory before final implementation commits.

---

# 29. Non-Goals

Career Landing Visual V1 does not include:

- redesigning the Career test UI;
- redesigning Career results;
- redesigning the paid Career report;
- adding AI career recommendations;
- adding occupation databases;
- adding salary data;
- adding job listings;
- adding live labor-market data;
- adding cross-assessment profiles;
- changing RIASEC scoring;
- changing commercial pricing;
- changing payment behavior.

These require separate design and implementation cycles.

---

# 30. Final Design Decision

Career Landing Visual V1 adopts:

> Professional Career Exploration Landing

Core journey:

> Hero  
> → Why Interests Matter  
> → Six RIASEC Dimensions  
> → Interest Pattern  
> → What You Will Receive  
> → Answering Guidance  
> → Use Boundaries  
> → Final CTA

Core brand distinction:

> Personality helps users understand preference patterns.  
> Career helps users explore interest-driven directions.

Chinese:

> 人格探索帮助用户理解自己的偏好模式。  
> 职业兴趣帮助用户从兴趣出发探索可能的方向。
