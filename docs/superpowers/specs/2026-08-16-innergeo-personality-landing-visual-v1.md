# InnerGeo Personality Landing Visual V1

**Date:** 2026-08-16  
**Route:** `/personality`  
**Status:** Approved Design  
**Scope:** Personality assessment landing page only

---

## 1. Objective

Redesign the InnerGeo Personality assessment landing page so it becomes a direct visual and product extension of Homepage Visual V1.

The page must communicate:

- this is a structured personality-preference assessment;
- the assessment observes four continuous preference dimensions;
- results support self-understanding and further exploration;
- personality results are not intelligence, ability, diagnosis, or fixed identity;
- users can begin the assessment without unnecessary pressure.

The page must feel:

**Clear · Warm · Structured · Comfortable · Measured**

It must not look like:

- an entertainment personality quiz;
- an astrology page;
- a clinical psychology service;
- a traditional MBTI imitation page;
- a disconnected editorial microsite.

---

## 2. Design System

Reuse the approved Homepage Visual V1 system.

### Brand colors

- Deep Indigo: `#4A5878`
- Champagne Gold: `#C5A36A`
- Warm Ivory: `#F3F0EA`
- Text: `#3D3A38`
- Secondary text: `#6F706F`
- Surface: `#FFFFFF`

Gold remains a signal, not a surface.

### Geometry

Primary desktop content boundary:

**1280px / `size="wide"`**

Major functional modules should align to the same left and right geometry used by the homepage.

Large cards:

- radius approximately 24px;
- border approximately 1.5px;
- low-opacity Indigo border;
- subtle shadow only where useful.

### Typography

Continue Homepage V1 typography:

- Source Serif 4 for brand/display headings;
- Inter for UI/body;
- approved Chinese system font stack.

---

## 3. Page Architecture

Final page order:

1. Site Header
2. Personality Hero
3. Four Preference Dimensions
4. What You Will Receive
5. How to Answer
6. How to Use This Assessment
7. Final CTA
8. Site Footer

Existing assessment behavior, scoring, test routes, result routes, report routes, entitlement, payment, and backend logic are outside this visual scope.

---

## 4. Hero

### Purpose

Immediately explain what the assessment measures.

### Chinese direction

Eyebrow:

**人格探索**

Title:

**理解你的偏好模式，  
而不只是得到四个字母。**

Description:

**通过 72 道题观察你在能量获取、信息处理、决策和生活方式上的偏好，形成四个维度的个人偏好结构，并获得进一步解释。**

Metadata:

- 72 道题
- 约 8–12 分钟
- 无需注册即可开始

Primary CTA:

**开始人格探索 →**

Secondary CTA:

**了解四个维度 ↓**

### English direction

Eyebrow:

**Personality Assessment**

Title:

**Understand your preference patterns—  
not just a four-letter type.**

Description:

**Explore preferences across energy, information processing, decision-making and approach to daily life through a 72-question reflective assessment.**

### Layout

Desktop:

- 1280px bounded module;
- split layout;
- left = copy and CTA;
- right = Preference Map.

The Hero should no longer use the old compass/star visual.

---

## 5. Preference Map

Replace the current compass/orbit/star presentation.

The new visual represents four neutral preference axes:

- E — I
- S — N
- T — F
- J — P

Center label:

**YOUR PREFERENCE PATTERN**

Chinese:

**你的偏好结构**

Important:

- no preselected result;
- no indication that one side is better;
- no star or constellation metaphor;
- no astrology styling;
- no brain/head illustration;
- no ability or strength implication.

The visual should communicate:

> Personality is represented as a structure across four dimensions.

---

## 6. Four Preference Dimensions

Replace the long horizontal dimension rows with a clearer **2 × 2 card system** on desktop.

Section title:

Chinese:

**四个维度，构成你的偏好结构**

English:

**Four dimensions. One preference pattern.**

Supporting boundary:

**四个维度描述的是偏好方向，而不是能力高低；结果可能因情境、经历与人生阶段呈现不同程度的灵活性。**

Cards:

### 01 Energy

**外向 E — 内向 I**

Explain how the user tends to direct, gain and restore energy.

### 02 Information

**感觉 S — 直觉 N**

Explain how the user tends to notice, interpret and organize information.

### 03 Decisions

**思考 T — 情感 F**

Explain how the user tends to weigh logic, values and human impact.

### 04 Structure

**判断 J — 知觉 P**

Explain approach to planning, openness, structure and daily life.

No dimension is presented as superior.

---

## 7. What You Will Receive

Replace the current full-width dark section with a bounded **1280px split card**.

Visual:

- left: Deep Indigo;
- right: Warm Ivory / white;
- radius approximately 24px.

Left message:

**完成测评后，你会得到什么**

Supporting copy:

**不只是一个人格类型，而是一组可以继续理解和验证的偏好信息。**

Right-side output list:

1. 四字母偏好结果
2. 四个维度的具体倾向
3. 清晰度与边界解释
4. 优势与可能的盲点
5. 工作、学习与发展探索
6. 可进一步查看的完整数字报告

Important language boundary:

Do not imply that a personality result proves career suitability, leadership, intelligence, ability, success, or future outcomes.

Use wording such as:

**值得进一步探索的环境、方式和问题**

rather than deterministic career matching.

---

## 8. How to Answer

Retain the existing guidance concept but redesign it as a bounded structured module.

Title:

**按照你通常的状态作答**

Supporting copy:

**不需要选择“更好”的答案，也不需要猜测哪一种答案对应某个人格类型。**

Four guidance cards:

### 01
**按通常状态回答**

选择最接近日常行为的答案。

### 02
**不要回答“我应该是什么样”**

回答实际倾向，而不是理想形象。

### 03
**避免过度分析单道题**

依据通常经验作答，而不是寻找“正确答案”。

### 04
**没有好坏人格类型**

每个维度描述偏好，而不是价值、能力或成熟度。

---

## 9. How to Use This Assessment

The existing large “reflection, not diagnosis” section should become a compact professional boundary module.

Title:

**如何使用这项测评**

Three concise groups:

### 用于

理解偏好、观察重复模式、形成进一步探索的问题。

### 不用于

医学或心理诊断、智力测试、能力评级、招聘或录取决定。

### 重要提醒

人格结果反映的是当前回答所呈现的偏好结构，不代表固定不变的身份。

Include link:

**了解完整方法与使用边界 →**

Route:

`/methodology`

Do not repeat the entire Methodology page on this landing page.

---

## 10. Final CTA

Remove the old CompassMark.

Title direction:

**准备好开始了解自己的偏好模式了吗？**

Supporting metadata:

**72 道题 · 约 8–12 分钟 · 无需注册即可开始**

CTA:

**开始人格探索 →**

Visual:

- bounded 1280px;
- Warm Ivory / subtle surface;
- Indigo border;
- optional subtle path/coordinate signal;
- no compass/star/constellation graphic.

Then connect directly into the approved global Footer.

---

## 11. Responsive Behavior

Desktop:

- 1280px primary boundary;
- Hero split layout;
- four dimensions = 2 × 2;
- result module = split layout.

Tablet:

- sections may collapse to one or two columns according to available width;
- preserve readable hierarchy.

Mobile:

- safe horizontal gutter approximately 20px;
- Hero becomes single column;
- Preference Map moves below copy;
- cards become one column;
- CTA remains fully visible;
- no horizontal overflow;
- no clipped Chinese or English headings.

---

## 12. Content Integrity

The page must consistently communicate:

- preferences, not abilities;
- patterns, not fixed identity;
- exploration, not prediction;
- self-reflection, not diagnosis.

Personality results must not imply:

- intelligence;
- maturity;
- capability;
- professional qualification;
- guaranteed career fit;
- relationship compatibility;
- future success;
- medical or psychological diagnosis.

---

## 13. Scope Protection

This visual project may modify only what is necessary for the `/personality` landing experience and shared presentation components where justified.

Do not modify:

- personality scoring;
- test questions;
- answer storage;
- session logic;
- result generation;
- professional report generation;
- report rules;
- report content versions;
- entitlement;
- payment;
- backend;
- production infrastructure.

Existing frozen MBTI commercial-loop functionality must remain unchanged.

---

## 14. Acceptance Criteria

The design is accepted when:

- `/personality` visually belongs to the same product family as Homepage V1;
- all primary modules use a coherent 1280px geometry;
- old compass/star visual language is removed from this landing page;
- four preference dimensions are understandable without prior MBTI knowledge;
- Chinese and English content remain readable and balanced;
- page clearly distinguishes preferences from abilities;
- methodology boundary is visible but not overwhelming;
- desktop and mobile have no visual overflow;
- `/personality/test` CTA behavior remains unchanged;
- TypeScript passes;
- production build passes;
- no backend or production server changes occur during local implementation.
