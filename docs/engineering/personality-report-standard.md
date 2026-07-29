# Personality Report Standard

## Scope

This standard applies only to complete MBTI-style personality reports in
`src/data/report/<type>/`. It is not a generic assessment-report standard and
must not be copied unchanged to RIASEC, zodiac, or future instruments.

## Fixed contract

Every production personality report must:

- implement `CompletePersonalityReportDefinition`;
- use one canonical `PersonalityTypeCode`;
- use the shared report, content, and rule version fields;
- contain the 18 canonical sections from `report-standard.ts`, in order;
- contain exactly 70 ordered static content blocks;
- contain one block in each of sections 1–5, five in sections 6–16, six in
  section 17, and four in section 18;
- preserve canonical section IDs, categories, access levels, and order;
- use unique personality-prefixed block and dynamic-slot IDs;
- provide non-empty English titles and content;
- contain no Chinese content in the current frozen version;
- state in methodology that the report is not a clinical diagnosis.

The first five sections are `free`; all 18 are available to a generated
`premium` report. Access describes report composition, not payment,
authentication, or entitlement.

## Content requirements

Define a distinct positioning sentence before drafting. Each section must
express that positioning through original vocabulary, examples, risks, and
guidance. Similar dimension letters do not justify copied sections.

Premium sections must include analytical or summary content and practical
risk or guidance content. The 90-day plan must contain three chronological
phases plus review and implementation guidance. Methodology must explain
limits, traceability, and responsible use.

Never claim diagnosis, intelligence, capability, scientific certainty, career
fitness, or guaranteed behaviour. Describe preferences as contextual
hypotheses and acknowledge culture, role, experience, trust, stress, and
balanced dimensions.

## Dynamic slots

Static definitions own slot placement. Rules may add blocks only to declared
slots. A complete report normally declares:

- four dimension slots and one confidence slot in `dimension-results`;
- a combination slot and balanced-dimensions slot in
  `core-personality-pattern`;
- combination slots for adaptation and growth risk.

Slot names are personality-prefixed and must remain stable for the report
version.

## Evidence

ISFJ, ENTJ, ENTP, INTJ, INTP, INFJ, INFP, ENFJ, and ENFP demonstrate this
contract. They are evidence, not copy sources. Use `_template` for structure.
