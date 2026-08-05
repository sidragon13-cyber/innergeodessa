# InnerGeodessa EI Pilot Administration Package

| Field | Value |
| --- | --- |
| Assessment | Personality — Extraversion–Introversion |
| Pilot items | 18 |
| Response scale | Five-point agreement scale |
| Intended use | Research pilot and item analysis only |
| Validation status | Experimental; not for diagnosis, hiring, admission or high-stakes decisions |
| Source form | `personality-pilot-items-ei-v1.2.md` |
| Prepared date | 2026-07-23 |

## 1. Pilot objective

This pilot tests whether the 18 EI items are understandable, balanced, sufficiently variable and directionally consistent. It is designed to identify weak, redundant, biased or frequently misunderstood items before any production release.

The pilot does not assign a final personality type. Individual scores must not be presented as validated psychological conclusions.

## 2. Recommended pilot sample

- Minimum operational target: 150 completed responses.
- Preferred target: 250–400 completed responses when subgroup comparisons are planned.
- Recruit across more than one age band, language background and work or study context.
- Avoid collecting a sample dominated by one friendship group, company team or single classroom.
- Record assessment language and first language so wording effects can be reviewed.

These are planning targets rather than guarantees of psychometric adequacy. Final analysis must report the actual sample size and composition.

## 3. Participant information and consent

### Participant-facing text

You are invited to take part in a research pilot for an experimental personality questionnaire. The questionnaire contains 18 statements and should take approximately 4–7 minutes.

Your responses will be used to evaluate whether the questions are clear, balanced and statistically useful. This is not a clinical assessment and it will not provide a validated diagnosis or final personality classification.

Participation is voluntary. You may stop at any time before submitting. Do not provide your name, identity number, employer number or other direct identifying information. Anonymous response data may be analysed in aggregate to improve the questionnaire.

By selecting “I agree” and continuing, you confirm that you understand the purpose of the pilot and voluntarily consent to participate.

### Required consent field

- `CONSENT = 1`: I agree to participate.
- `CONSENT = 0`: I do not agree. End the questionnaire without collecting item responses.

## 4. Participant instructions

Read each statement and choose the response that best describes your usual preference or tendency. Answer according to how you generally are, not how you think you should be. There are no right or wrong answers.

| Response | Code |
| --- | ---: |
| Strongly disagree | 1 |
| Disagree | 2 |
| Neither agree nor disagree | 3 |
| Agree | 4 |
| Strongly agree | 5 |

Require one response per item. Do not show E/I keys, subdimension names or score calculations to participants.

## 5. Pilot questionnaire

| No. | Item ID | Statement |
| ---: | --- | --- |
| 1 | `P-EI-PROCESS-001` | Discussing a new idea with someone often helps me understand my own thinking more clearly. |
| 2 | `P-EI-ENERGY-003` | After spending a long time interacting with others, I prefer a period with fewer conversations or activities. |
| 3 | `P-EI-STIMULATION-002` | I prefer having some activity around me while I work on a routine task. |
| 4 | `P-EI-INITIATION-005` | When an activity is already under way, I usually wait for an opening before joining. |
| 5 | `P-EI-BREADTH-002` | In shared settings, I tend to divide my attention among several people. |
| 6 | `P-EI-EXPRESSION-003` | I prefer to form my thoughts before expressing them on a complex topic. |
| 7 | `P-EI-ENERGY-002` | After a long quiet period, becoming active again usually helps restore my energy. |
| 8 | `P-EI-PROCESS-003` | Before deciding what I think, I prefer time to consider the information on my own. |
| 9 | `P-EI-BREADTH-005` | When several conversations are available, I prefer moving between them. |
| 10 | `P-EI-STIMULATION-003` | I prefer a low-activity setting when I need to think something through. |
| 11 | `P-EI-INITIATION-003` | At the start of a shared task, I tend to ask others for their first thoughts. |
| 12 | `P-EI-ENERGY-004` | Between demanding activities, I usually restore my energy by spending some quiet time. |
| 13 | `P-EI-EXPRESSION-001` | I often share an idea while I am still working out its details. |
| 14 | `P-EI-BREADTH-003` | I prefer giving sustained attention to one or two conversations at a time. |
| 15 | `P-EI-STIMULATION-005` | I often enjoy settings where several things are happening at once. |
| 16 | `P-EI-EXPRESSION-004` | When I am still forming an answer, I prefer to wait briefly before expressing it. |
| 17 | `P-EI-PROCESS-005` | When a task is unclear, I usually make sense of it by talking through possible approaches with someone. |
| 18 | `P-EI-INITIATION-006` | In a new shared task, I prefer some context before asking others for input. |

## 6. Post-questionnaire comprehension check

Include the following research questions after the 18 items. These are not part of the EI score.

1. Were any statements difficult to understand? `Yes / No`
2. If yes, enter the item number and explain what was unclear. `Free text`
3. Did any two statements feel almost identical? `Yes / No`
4. If yes, enter the item numbers. `Free text`
5. Did any statement feel inappropriate for your culture, language or daily circumstances? `Yes / No`
6. If yes, enter the item number and explain why. `Free text`
7. Overall, how easy was the questionnaire to answer? `1 Very difficult — 5 Very easy`

## 7. Background fields

Collect only fields needed for item analysis:

- anonymous respondent ID;
- age band: `18–24`, `25–34`, `35–44`, `45–54`, `55+`, `prefer not to say`;
- country or region;
- first language;
- assessment language;
- current context: `student`, `employed`, `self-employed`, `not currently working`, `other`, `prefer not to say`;
- completion timestamp;
- total completion time in seconds, where available.

Do not collect names, identity numbers, phone numbers, precise home addresses or employer identifiers in the analysis dataset.

## 8. Administration controls

- Preserve the fixed 1–18 item order for the first pilot wave so local-dependency and order effects can be interpreted consistently.
- Present one item per screen or a clean vertical list; do not group items under EI subdimension headings.
- Do not provide a personality result immediately after submission.
- Prevent multiple submissions only through a privacy-preserving technical method where possible; do not add unnecessary identity collection.
- Record skipped answers and changed answers if the survey system supports them.
- Keep wording, punctuation and response anchors identical across all participants within the same language version.

## 9. Scoring and analysis key — researcher only

| No. | Item ID | Key | Signed EI transform |
| ---: | --- | --- | --- |
| 1 | `P-EI-PROCESS-001` | E | `raw - 3` |
| 2 | `P-EI-ENERGY-003` | I | `3 - raw` |
| 3 | `P-EI-STIMULATION-002` | E | `raw - 3` |
| 4 | `P-EI-INITIATION-005` | I | `3 - raw` |
| 5 | `P-EI-BREADTH-002` | E | `raw - 3` |
| 6 | `P-EI-EXPRESSION-003` | I | `3 - raw` |
| 7 | `P-EI-ENERGY-002` | E | `raw - 3` |
| 8 | `P-EI-PROCESS-003` | I | `3 - raw` |
| 9 | `P-EI-BREADTH-005` | E | `raw - 3` |
| 10 | `P-EI-STIMULATION-003` | I | `3 - raw` |
| 11 | `P-EI-INITIATION-003` | E | `raw - 3` |
| 12 | `P-EI-ENERGY-004` | I | `3 - raw` |
| 13 | `P-EI-EXPRESSION-001` | E | `raw - 3` |
| 14 | `P-EI-BREADTH-003` | I | `3 - raw` |
| 15 | `P-EI-STIMULATION-005` | E | `raw - 3` |
| 16 | `P-EI-EXPRESSION-004` | I | `3 - raw` |
| 17 | `P-EI-PROCESS-005` | E | `raw - 3` |
| 18 | `P-EI-INITIATION-006` | I | `3 - raw` |

The signed pilot total ranges from `-36` to `+36`. Positive values point toward E and negative values toward I, but no diagnostic or type threshold is authorised at the pilot stage.

## 10. Data quality rules

Flag rather than automatically delete responses that meet any of the following:

- consent not provided;
- more than two EI items missing;
- completion time below one third of the sample median;
- identical response across all 18 items;
- contradictory or nonsensical free-text feedback;
- duplicate technical identifier where duplication can be established without collecting personal identity.

Any exclusion rule applied after data collection must be documented with counts before and after exclusion.

## 11. Required analysis outputs

The pilot analysis report must include:

- sample composition and completion statistics;
- missingness and response distribution for every item;
- mean, standard deviation, skew and category frequencies;
- corrected item–total correlation;
- inter-item correlation matrix;
- subdimension correlations;
- internal-consistency estimates with confidence intervals where feasible;
- dimensionality analysis appropriate to ordinal item data;
- wording and comprehension feedback by item;
- subgroup or language checks where sample size permits;
- retain, revise, replace or remove decision for all 18 items.

## 12. Completion gate

The EI pilot stage is complete only when:

- the final survey matches this package;
- test submissions confirm correct item order and coding;
- the anonymous dataset exports successfully;
- at least the minimum operational response target is reached;
- item-level statistics and comprehension feedback are analysed;
- every item receives a documented decision supported by evidence.
