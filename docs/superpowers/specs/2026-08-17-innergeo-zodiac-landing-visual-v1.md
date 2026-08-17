# InnerGeo Zodiac Landing Visual V1

**Date:** 2026-08-17
**Status:** Approved Design
**Scope:** `/zodiac` landing page only
**Implementation mode:** Local first → QA → Production later

---

## 1. Product Role

Zodiac is not a fourth scientific assessment.

It is InnerGeo's primary symbolic exploration and high-frequency traffic entry.

Product architecture:

- Personality = Identity / Trust
- Career = Direction / Value
- Kids = Early Discovery
- Zodiac = Frequency / Traffic / Symbolic Exploration
- AI = Continuity / Retention

The Zodiac landing page should feel lighter and more exploratory than Personality
and Career while remaining part of the same InnerGeo design system.

---

## 2. Design Direction

Selected direction:

**Golden Zodiac Atlas**

Visual character:

- Calm
- Premium
- Warm
- Symbolic
- Structured
- Clear
- Exploratory

Shared InnerGeo language:

- 1280px primary content boundary
- Warm Ivory / White surfaces
- Deep Indigo structure
- Champagne Gold signal color
- Source Serif 4 display typography
- Inter UI/body typography
- soft borders
- restrained shadows
- rounded cards
- generous spacing

Zodiac-specific distinction:

- Gold visual presence may increase to approximately 10–15%
- Gold should concentrate around zodiac symbols, orbit geometry, labels,
  keywords, borders and interaction states
- no purple galaxy aesthetic
- no glowing mystical UI
- no fortune-telling visual language
- no excessive celestial decoration

---

## 3. Core Visual Principle

The 12 zodiac signs become the strongest visual identity area on the page.

Gold functions as:

- recognition
- hierarchy
- navigation cue
- symbolic identity
- visual focus

The user should immediately recognize Zodiac as a distinct InnerGeo
exploration experience.

---

## 4. Final Information Architecture

The landing page contains nine sections:

1. Hero — Golden Zodiac Wheel
2. How InnerGeo Approaches Zodiac
3. Meet the 12 Signs
4. Beyond the Sun Sign
5. What Your Birth Chart Includes
6. Reflection Prompts
7. Symbol · Story · Culture
8. Responsible Use
9. Final CTA

Then Site Footer.

Remove from Zodiac Landing V1:

- dedicated Geodessa / Guardian Stone module
- Future Community module
- duplicated long-form reflection content
- secondary Career and Personality actions from the Final CTA

---

## 5. Hero — Golden Zodiac Wheel

Use the established InnerGeo product-page structure:

- `Container size="wide"`
- approximately 1280px bounded card
- two-column desktop layout
- left = copy and actions
- right = Zodiac visual
- single-column mobile layout

Primary CTA:

**Create Your Birth Chart**

Secondary CTA:

**Explore the 12 Signs**

The secondary CTA scrolls to the signs section.

Replace the legacy compass/orbit presentation with a dedicated
**Golden Zodiac Wheel**.

Requirements:

- all 12 zodiac symbols visible
- symbols large enough to identify instantly
- Champagne Gold as dominant symbol color
- thin restrained orbital geometry
- no compass mark
- no glow
- no purple galaxy background

Center content:

**SUN · MOON · RISING**

Chinese:

**太阳 · 月亮 · 上升**

The Hero should immediately communicate that InnerGeo explores more than
a single sun sign.

---

## 6. How InnerGeo Approaches Zodiac

Use a compact bounded explanatory card.

Core message:

**A symbolic perspective, not a fixed definition.**

Explain that:

- zodiac can support reflection, culture and symbolic exploration
- one zodiac sign does not fully describe a person
- InnerGeo does not present zodiac as a scientific personality assessment

Do not duplicate the complete responsible-use disclaimer here.

---

## 7. Meet the 12 Signs

This is the page's strongest visual content block.

Desktop layout:

**4 × 3 grid**

Tablet:

- responsive two-column layout where appropriate

Mobile:

- one column or compact two-column layout only when legibility remains excellent

Each sign card contains:

- large gold zodiac symbol
- sign name
- localized sign name where appropriate
- date range
- two or three concise symbolic themes

Example content:

- ♈
- ARIES
- 白羊座
- Mar 21 – Apr 19
- Initiative · Energy

Card style:

- Warm Ivory or White surface
- soft gold-tinted border
- approximately 22px radius
- strong symbol hierarchy
- restrained copy

Hover and focus:

- slightly stronger gold symbol
- slightly stronger border
- no glow
- no dramatic animation

---

## 8. Beyond the Sun Sign

Headline:

**Your zodiac profile is more than one sign.**

Chinese:

**你的星座结构，不只是太阳星座。**

Present three primary symbolic anchors:

### Sun

Core identity themes.

### Moon

Emotional patterns and inner responses.

### Rising

How a person meets and presents to the world.

A short supporting line explains that a calculated birth chart brings
multiple symbolic perspectives together.

---

## 9. What Your Birth Chart Includes

Reframe the previous Zodiac Profile Preview as a concrete result-value section.

Possible outputs include:

- Sun Sign
- Moon Sign
- Rising Sign
- planetary placements
- birth-time context
- complete symbolic report

The user should understand clearly what the current product produces.

This section should also make future commercial deliverables easier to understand.

---

## 10. Reflection Prompts

Reflection should no longer occupy a large standalone section.

Use a compact three-prompt presentation, for example:

- What themes feel familiar?
- What feels different from how you see yourself?
- What would you like to explore further?

Purpose:

Encourage reflection rather than passive acceptance of labels.

---

## 11. Symbol · Story · Culture

Retain cultural context but reduce its visual weight.

Use a compact editorial strip built around:

- Symbol
- Story
- Culture

Purpose:

Clarify that Zodiac belongs to symbolic and cultural self-exploration.

This section must not overpower the primary product journey.

---

## 12. Geodessa Removal

Remove the dedicated Geodessa / Guardian Stone module from the Zodiac landing page.

Reason:

- Zodiac is now a primary InnerGeo strategic entry
- InnerGeo brand purpose must remain clear
- Geodessa remains a separate brand and IP asset
- cross-brand relationships may be reconsidered later

This change does not remove or alter the Geodessa project itself.

---

## 13. Future Community Removal

Remove the current Future Community section from the Zodiac landing page.

Do not advertise unavailable community functionality as part of the current
landing experience.

Zodiac Landing V1 should communicate what users can use now.

---

## 14. Responsible Use

Use the compact boundary-card model established on Career.

### Use it for

- reflection
- culture
- symbolic exploration
- personal curiosity

### Do not use it for

- psychological diagnosis
- medical decisions
- financial decisions
- employment decisions
- deterministic predictions

### Remember

Important personal decisions require real evidence, individual circumstances
and qualified professional advice where appropriate.

Include:

**Explore Methodology & Use Boundaries →**

Route:

`/methodology`

---

## 15. Final CTA

Replace the legacy multi-action Final CTA with one bounded conversion card.

Primary message:

**Begin with your birth chart. Explore another perspective on yourself.**

Chinese:

**从你的出生星盘开始，探索理解自己的另一种视角。**

Single CTA:

**Create Your Birth Chart**

Remove Career and Personality secondary links from this landing-page CTA.

Cross-product conversion should occur later in the Zodiac result experience.

---

## 16. Copy Principles

Zodiac copy should remain:

- reflective
- non-deterministic
- culturally aware
- symbolic
- concise
- user-centered

Avoid:

- prediction certainty
- destiny claims
- healing claims
- scientific-equivalence claims
- deterministic career or relationship conclusions

Preserve the existing responsible-use boundary.

---

## 17. CSS and Architecture

Create:

`src/components/zodiac/zodiac-landing-v1.module.css`

Primary implementation files:

- `src/components/zodiac/zodiac-landing.tsx`
- `src/components/zodiac/zodiac-landing-v1.module.css`
- `src/data/i18n/zodiac.ts`

Page metadata may be adjusted only when required for consistency:

- `src/app/zodiac/page.tsx`

Do not modify global Zodiac CSS unless verified evidence shows a conflict
that cannot be isolated cleanly.

No changes to:

- Zodiac calculation engine
- astronomy calculations
- ascendant calculations
- timezone logic
- result contracts
- report generator
- payment entitlement
- account logic
- backend
- database

---

## 18. Responsive Standard

Required local QA:

### Desktop

1280px+ master layout.

### Mobile

390 × 844.

Verify:

- no horizontal overflow
- Golden Zodiac Wheel remains legible
- all 12 signs remain identifiable
- signs do not become decorative noise
- headings wrap cleanly
- CTA remains clear
- gold remains restrained and readable
- no clipped symbols
- no unexpected layout shift

---

## 19. Implementation Sequence

1. Copy foundation
2. Hero + Golden Zodiac Wheel
3. How InnerGeo Approaches Zodiac
4. Meet the 12 Signs
5. Beyond the Sun Sign
6. Birth Chart Includes
7. Reflection + Culture consolidation
8. Remove Geodessa + Future Community
9. Responsible Use
10. Final CTA
11. Responsive refinement
12. Typecheck
13. Build
14. Desktop English QA
15. Desktop Chinese QA
16. Mobile QA
17. Commit implementation
18. Production only after local approval

---

## 20. Success Criteria

Zodiac Landing V1 is complete when:

- it visibly belongs to the same InnerGeo family as Personality and Career
- it has its own stronger symbolic identity
- all 12 zodiac symbols are clear and visually memorable
- Champagne Gold is meaningfully stronger without becoming excessive
- the page is shorter and easier to scan
- future and unavailable concepts are removed
- Geodessa no longer competes with InnerGeo positioning
- Zodiac remains clearly separated from scientific assessments
- the primary conversion is Create Your Birth Chart
- desktop and mobile QA pass
- no backend, payment, report-engine or calculation behavior changes
