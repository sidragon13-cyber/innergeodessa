# InnerGeodessa Personality Question Bank Blueprint

| Field | Value |
| --- | --- |
| Document version | `1.0-draft` |
| Parent specification | `Personality Assessment Specification 1.0-draft` |
| Assessment | `Personality V1.0` |
| Status | Question-bank design blueprint |
| Intended language | English |
| Candidate-pool target | 120–144 items |
| Initial pilot-bank target | 72 items |
| Current validation status | Not validated |
| Last updated | 2026-07-23 |

> **Provisional status:** All item counts, ratios, context allocations, and selection thresholds in this blueprint remain provisional until editorial review, cognitive interviews, accessibility and cultural review, and pilot evidence are available.

## 1. Purpose of the blueprint

A question bank must not begin as an unstructured list. The blueprint creates traceability from the theoretical construct to each future item, balances all dimensions and subdimensions, prevents accidental duplication, controls social desirability and wording direction, and makes cultural and accessibility review operational.

It also prepares the bank for later item analysis, revision, reserve use, and retirement. It separates:

- **Candidate item pool:** 120–144 draft items created for review and pilot preparation.
- **Pilot question bank:** 72 selected and reviewed scored items used in structured testing.
- **Future production bank:** A bank approved only after pilot testing, analysis, revision, and review; its final size remains provisional.

The initial 72 items are not permanently validated production questions.

> **This blueprint defines what questions must measure before determining their final wording.**

## 2. Governing assessment model

The parent specification defines four continua:

- Extraversion ↔ Introversion (`EI`)
- Sensing ↔ Intuition (`SN`)
- Thinking ↔ Feeling (`TF`)
- Judging ↔ Perceiving (`JP`)

Neither pole is superior. A preference is not an ability, users retain access to both poles, and the four-letter pattern is only a summary. Items measure self-reported preferences and current tendencies. They must not primarily measure confidence, intelligence, morality, mental health, occupational status, social success, or performance.

This blueprint uses the 24 provisional subdimensions defined in section 5 of the parent specification. It does not alter their theory, scoring model, ethical boundaries, or intended use.

## 3. Candidate-pool strategy

The recommended initial pool contains:

- 30–36 candidates per main dimension.
- Approximately 5–6 candidates per subdimension.
- 120–144 candidates overall.

The pool exceeds the 72-item pilot bank because weak, ambiguous, inaccessible, culturally narrow, duplicative, contaminated, or poorly keyed items must be removable without leaving construct gaps. Cognitive interviews may show that wording fails, and later analysis may reveal weak discrimination or inadequate subdimension coverage.

Multiple formulations may target one construct. They must be grouped as alternatives in a stable item family, not placed together in the pilot merely to increase apparent consistency.

## 4. Pilot-bank allocation

The initial pilot bank contains 18 items per dimension, three per subdimension, and 72 scored items overall.

| Dimension | Six subdimensions | Candidate target | Pilot target | Preferred directional balance | Intended contexts |
| --- | --- | ---: | ---: | --- | --- |
| `EI` | energy renewal; processing mode; social breadth and depth; expression timing; stimulation preference; interaction initiation | 30–36 | 18 | About 9 E / 9 I | recovery, reflection, communication, social, daily life |
| `SN` | information focus; abstraction level; pattern recognition; learning orientation; time horizon; method and possibility preference | 30–36 | 18 | About 9 S / 9 N | information, learning, problem-solving, projects, daily life |
| `TF` | decision standard; fairness orientation; feedback style; conflict evaluation; interpersonal impact; value and principle weighting | 30–36 | 18 | About 9 T / 9 F | decision, feedback, conflict, group, project |
| `JP` | planning preference; closure preference; deadline behaviour; adaptability; environmental structure; decision pacing | 30–36 | 18 | About 9 J / 9 P | planning, change, decisions, projects, daily life |
| **Total** | **24 subdimensions** | **120–144** | **72** | **About 36 left / 36 right** | **Mixed** |

Exact symmetry is not required when it would weaken construct quality. Directional balance must be reviewed at dimension and subdimension levels. Final items must be interleaved rather than presented in dimension blocks.

## 5. Blueprint-unit model

```ts
type ItemBlueprintUnit = {
  blueprintId: string;
  dimension: "EI" | "SN" | "TF" | "JP";
  subdimension: string;
  targetPreference: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
  constructIntent: string;
  behaviouralContext:
    | "daily-life"
    | "learning"
    | "work-or-project"
    | "social"
    | "decision"
    | "planning"
    | "information"
    | "recovery"
    | "conflict"
    | "change";
  itemForm:
    | "behavioural-tendency"
    | "preference"
    | "scenario-response"
    | "comparative-preference"
    | "frequency-framed";
  wordingDirection: "direct" | "counter-keyed";
  socialDesirabilityRisk: "low" | "medium" | "high";
  culturalDependencyRisk: "low" | "medium" | "high";
  overlapRisks: string[];
  draftingNotes: string;
};
```

A blueprint unit is not a question. It defines the intended evidence, target pole, context, form, and risks that a future item writer must control.

## 6. Behavioural-context balance

Contexts should include everyday routines, individual reflection, group interaction, learning, problem-solving, planning, decision-making, feedback, change, project-like activity, communication, recovery, and stimulation.

No dimension may depend entirely on work or social examples. Items must remain intelligible to students, employed and self-employed adults, unemployed users, and people outside formal education. “Task” or “project” is preferred to narrow occupational language, and no single lifestyle may be assumed.

| Dimension | Primary context coverage | Contexts to limit | Balance check |
| --- | --- | --- | --- |
| `EI` | recovery, reflection, communication, social, daily life | parties, public speaking, offices | Include solitary and interpersonal evidence without equating either with skill |
| `SN` | information, learning, problem-solving, daily tasks, projects | academic theory, specialist technology | Include practical and conceptual material accessible without expertise |
| `TF` | decisions, feedback, disagreements, shared tasks, daily trade-offs | management, formal disciplinary settings | Include low-stakes and relational contexts without morality cues |
| `JP` | routines, planning, deadlines, change, decisions, projects | salaried work schedules, travel privilege | Include constrained and self-directed contexts |

## 7. Item-form balance

| Form | Example only | Benefit | Risk |
| --- | --- | --- | --- |
| Behavioural tendency | “I usually organise my thoughts before speaking about a complex idea.” | Concrete and answerable | Behaviour may be role-driven |
| Preference statement | “I prefer having time alone after a highly social day.” | Directly names preference | Can become obvious or socially coded |
| Scenario response | “When plans change unexpectedly, I tend to adjust as I go rather than rebuild the entire plan first.” | Adds realistic context | Scenario may be culturally or economically narrow |
| Comparative preference | “I am more interested in possibilities than in confirming every practical detail first.” | Makes trade-off explicit | Can create a false opposition |
| Frequency-framed | “I often notice patterns before I can explain each individual detail.” | Anchors recurring behaviour | Frequency terms are interpreted inconsistently |

The pilot should contain a meaningful variety, without rigid percentages before drafting review. Comparative items require particular scrutiny. Forced-choice pairs are excluded from V1.0 unless separately approved because the parent specification requires a five-point agreement scale.

## 8. Wording-direction strategy

- **Keyed preference:** The pole supported by endorsement after scoring direction is applied.
- **Scoring direction:** Whether the centred response is used as entered or inverted.
- **Counter-keyed wording:** Wording deliberately oriented against the dominant phrasing pattern in a set.

An Introversion-keyed item is not automatically negative. Counter-keyed wording can use positive grammar. Negative grammar and reverse scoring are different properties. Avoid `not`, `rarely`, `hardly`, and double negatives where a positive construction is possible.

Approximately one-third of pilot items may be counter-keyed, consistent with the parent blueprint. This is provisional. Counter-keyed items should be distributed, not clustered, and no subdimension should depend solely on one direction. Comprehension takes priority over symmetry.

| Dimension | Direct target | Counter-keyed target | Total |
| --- | ---: | ---: | ---: |
| `EI` | 12 | 6 | 18 |
| `SN` | 12 | 6 | 18 |
| `TF` | 12 | 6 | 18 |
| `JP` | 12 | 6 | 18 |
| **Total** | **48** | **24** | **72** |

## 9. Social-desirability control

Risky contrasts include organised/careless, logical/emotional, sociable/isolated, imaginative/ordinary, flexible/unreliable, and practical/unrealistic.

Controls:

- Describe two legitimate processes rather than a virtue and a defect.
- Avoid praise, prestige, competence, productivity, and moral language.
- Do not frame one pole as active and the other as passive.
- Ask about process rather than identity.
- Use varied, low-stakes contexts.
- Review directional counterparts together.

| Dimension | Common desirability risk | Required correction |
| --- | --- | --- |
| `EI` | E as confident/popular; I as isolated | Measure energy, processing, stimulation, and initiation—not social success |
| `SN` | N as intelligent/creative; S as ordinary | Present detail and pattern as equally useful information preferences |
| `TF` | T as rational; F as kind or moral | Measure weighted criteria, not reasoning or goodness |
| `JP` | J as responsible; P as careless | Measure closure and adaptation, not reliability or competence |

## 10. Construct-overlap control

Speaking quickly may reflect confidence, language fluency, or cultural norms rather than EI. Planning may reflect anxiety, conscientiousness, job demands, or access to time rather than JP. Concern for others may reflect duty or desirability rather than TF. Interest in ideas may reflect education or exposure rather than SN.

Every blueprint and candidate review records:

| Field | Review question |
| --- | --- |
| Intended primary construct | What single subdimension should explain endorsement? |
| Likely secondary constructs | What else could plausibly drive the response? |
| Competing explanations | Could context, ability, culture, resources, or role explain it? |
| Wording adjustment | Can the preference be isolated more clearly? |
| Decision | Retain, revise, reserve, or reject? |

High-risk boundaries are EI/social confidence, SN/intelligence or education, TF/kindness or morality, and JP/conscientiousness or competence. High residual overlap after revision requires rejection or reserve status.

## 11. Extraversion–Introversion detailed blueprint

EI items must not measure social confidence, popularity, shyness, loneliness, or communication ability.

### 11.1 Energy renewal

**Definition:** Conditions that tend to restore usable energy. **Pole intents:** E—renewal through engagement or activity; I—renewal through solitude or reduced stimulation. **Evidence:** Chosen recovery after demanding activity. **Not evidence:** Loneliness, social access, fatigue caused by illness, or popularity. **Contexts:** recovery, daily life. **Confounds:** workload, caregiving, health, housing. **Risk:** medium desirability; medium cultural dependency. **Cultural note:** Quiet private space and discretionary social time cannot be assumed. **Targets:** 5–6 candidates; 3 pilot items; aim for both poles, with the third selected for coverage quality.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-EI-ENERGY-01` | E | Preference to regain energy through active engagement | recovery | preference | Separate energy from sociability |
| `BP-EI-ENERGY-02` | I | Preference for lower-input recovery | recovery | behavioural-tendency | Do not assume private space |
| `BP-EI-ENERGY-03` | E | Tendency to seek outward activity after sustained solitary focus | daily-life | scenario-response | Control for boredom and obligation |

### 11.2 Processing mode

**Definition:** Preferred route for developing thoughts. **Pole intents:** E—develop through interaction; I—develop internally before sharing. **Evidence:** Chosen sequence of thinking and expression. **Not evidence:** Verbal fluency, speed, correctness, or confidence. **Contexts:** communication, learning, decision. **Confounds:** language proficiency, safety, hierarchy. **Risk:** low-to-medium desirability; high cultural dependency. **Cultural note:** Speaking order and deference norms vary. **Targets:** 5–6 candidates; 3 pilot; both poles represented.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-EI-PROCESS-01` | E | Clarification through discussion | learning | behavioural-tendency | Avoid “better ideas” claim |
| `BP-EI-PROCESS-02` | I | Reflection before external expression | decision | preference | Avoid implying slowness |
| `BP-EI-PROCESS-03` | E | Early sharing of provisional thinking | work-or-project | scenario-response | Control for role expectations |

### 11.3 Social breadth and depth

**Definition:** Preferred distribution of social attention. **Pole intents:** E—breadth and varied contact; I—depth and selective contact. **Evidence:** Preferred pattern of interaction. **Not evidence:** Number of friends, popularity, attachment, or loneliness. **Contexts:** social, daily life. **Confounds:** opportunity, mobility, culture, life stage. **Risk:** high desirability; high cultural dependency. **Cultural note:** Family and community structures shape available breadth. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-EI-BREADTH-01` | E | Preference for varied interpersonal contact | social | preference | Do not count contacts |
| `BP-EI-BREADTH-02` | I | Preference to concentrate attention in fewer exchanges | social | behavioural-tendency | Avoid “close friends” moral cue |
| `BP-EI-BREADTH-03` | E | Comfort moving among several conversations | social | scenario-response | Avoid parties as the only context |

### 11.4 Expression timing

**Definition:** When developing thoughts are shared. **Pole intents:** E—earlier expression; I—considered expression. **Evidence:** Timing preference. **Not evidence:** intelligence, honesty, assertiveness, or response speed under pressure. **Contexts:** communication, project, learning. **Confounds:** power, language, preparation, safety. **Risk:** medium desirability; high cultural dependency. **Cultural note:** Directness and turn-taking norms vary. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-EI-EXPR-01` | E | Willingness to voice an idea while forming it | work-or-project | frequency-framed | Separate from confidence |
| `BP-EI-EXPR-02` | I | Preference to form an answer before speaking | communication | preference | Avoid “careful equals correct” |
| `BP-EI-EXPR-03` | I | Tendency to pause before contributing to complex discussion | learning | scenario-response | Control language processing |

### 11.5 Stimulation preference

**Definition:** Comfortable level of environmental input. **Pole intents:** E—more varied input; I—moderate or controlled input. **Evidence:** Chosen environment for ordinary engagement. **Not evidence:** sensory disability, anxiety, concentration ability, or health. **Contexts:** daily life, learning, project. **Confounds:** sensory sensitivity, access, task demands. **Risk:** low desirability; medium cultural dependency. **Cultural note:** Users may not control their environment. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-EI-STIM-01` | E | Preference for an active environment during routine activity | daily-life | preference | Avoid productivity claim |
| `BP-EI-STIM-02` | I | Preference for reduced external input during focus | learning | behavioural-tendency | Avoid diagnosing sensitivity |
| `BP-EI-STIM-03` | E | Tendency to seek variety after prolonged quiet | daily-life | scenario-response | Control for boredom |

### 11.6 Interaction initiation

**Definition:** Tendency to begin interpersonal engagement. **Pole intents:** E—readily initiates; I—responds selectively or after observation. **Evidence:** Preferred initiation timing. **Not evidence:** confidence, manners, leadership, or social skill. **Contexts:** social, communication, project. **Confounds:** hierarchy, safety, language, discrimination. **Risk:** high desirability; high cultural dependency. **Cultural note:** Initiation may be restricted by status norms. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-EI-INIT-01` | E | Tendency to begin low-stakes interaction | social | behavioural-tendency | Separate from confidence |
| `BP-EI-INIT-02` | I | Preference to observe before joining interaction | social | preference | Avoid passive framing |
| `BP-EI-INIT-03` | E | Readiness to open communication in a new group task | work-or-project | scenario-response | Control for assigned role |

## 12. Sensing–Intuition detailed blueprint

SN items must avoid intelligence, education, creativity, digital literacy, specialist knowledge, academic familiarity, and needlessly abstract vocabulary. Sensing is not unimaginative; Intuition is not impractical.

### 12.1 Information focus

**Definition:** Information most readily attended to. **Pole intents:** S—observable specifics; N—implications and inferred meaning. **Evidence:** Preferred first focus. **Not evidence:** memory, knowledge, or accuracy. **Contexts:** information, daily life, project. **Confounds:** expertise, task instructions. **Risk:** medium desirability; low-to-medium cultural dependency. **Cultural note:** Communication and teaching norms shape what is foregrounded. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-SN-FOCUS-01` | S | First attention to available facts | information | behavioural-tendency | Avoid “accurate” praise |
| `BP-SN-FOCUS-02` | N | First attention to implications | information | frequency-framed | Avoid intelligence cue |
| `BP-SN-FOCUS-03` | S | Preference to establish specifics before interpretation | work-or-project | comparative-preference | Avoid false exclusion |

### 12.2 Abstraction level

**Definition:** Preferred level for understanding material. **Pole intents:** S—concrete example; N—conceptual frame. **Evidence:** Preferred explanation route. **Not evidence:** education, vocabulary, or reasoning capacity. **Contexts:** learning, information. **Confounds:** familiarity and teaching quality. **Risk:** high desirability; medium cultural dependency. **Cultural note:** Exposure to formal abstract teaching varies. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-SN-ABSTRACT-01` | S | Preference for examples before generalisation | learning | preference | Do not imply simplicity |
| `BP-SN-ABSTRACT-02` | N | Preference for an organising concept before details | learning | preference | Use plain vocabulary |
| `BP-SN-ABSTRACT-03` | S | Tendency to connect explanation to observable application | information | behavioural-tendency | Avoid competence claim |

### 12.3 Pattern recognition

**Definition:** Preferred way of organising signals. **Pole intents:** S—component detail; N—cross-cutting pattern. **Evidence:** Attention sequence when both are available. **Not evidence:** visual acuity, memory, intelligence, or creativity. **Contexts:** information, problem-solving. **Confounds:** expertise and data presentation. **Risk:** high desirability; low cultural dependency. **Cultural note:** Familiarity with the subject can determine which patterns are visible. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-SN-PATTERN-01` | S | Preference to inspect components before linking them | information | behavioural-tendency | Avoid “careful” praise |
| `BP-SN-PATTERN-02` | N | Tendency to connect separated signals | information | frequency-framed | Avoid “insightful” label |
| `BP-SN-PATTERN-03` | N | Preference to identify a theme before accounting for each detail | problem-solving | comparative-preference | Control false opposition |

### 12.4 Learning orientation

**Definition:** Preferred route into unfamiliar material. **Pole intents:** S—sequential practice; N—conceptual exploration. **Evidence:** Chosen starting route. **Not evidence:** attainment, schooling, literacy, or speed. **Contexts:** learning, daily tasks. **Confounds:** prior education, teacher, resources. **Risk:** medium desirability; high cultural dependency. **Cultural note:** Learning opportunities and instructional traditions differ widely. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-SN-LEARN-01` | S | Preference to learn through demonstrated steps | learning | preference | Avoid formal classroom assumption |
| `BP-SN-LEARN-02` | N | Preference to explore the underlying idea | learning | preference | Avoid academic language |
| `BP-SN-LEARN-03` | S | Tendency to practise a known sequence before varying it | daily-life | scenario-response | Do not measure caution |

### 12.5 Time horizon

**Definition:** Temporal frame most readily considered. **Pole intents:** S—present and precedent; N—future possibility. **Evidence:** Preferred informational horizon. **Not evidence:** ambition, hope, realism, or planning skill. **Contexts:** decision, project, daily life. **Confounds:** instability, age, resources. **Risk:** high desirability; high cultural dependency. **Cultural note:** Economic stability and family obligations can constrain time horizon. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-SN-TIME-01` | S | Preference to begin from current conditions | decision | behavioural-tendency | Avoid “realistic” praise |
| `BP-SN-TIME-02` | N | Tendency to consider emerging possibilities | work-or-project | frequency-framed | Avoid ambition cue |
| `BP-SN-TIME-03` | S | Reliance on relevant precedent when choosing a method | decision | preference | Do not imply rigidity |

### 12.6 Method and possibility preference

**Definition:** Relationship with established and alternative methods. **Pole intents:** S—refine demonstrated method; N—generate alternatives. **Evidence:** Preferred approach when either is viable. **Not evidence:** innovation ability, compliance, or practical competence. **Contexts:** problem-solving, project, daily life. **Confounds:** risk, authority, resources. **Risk:** high desirability; medium cultural dependency. **Cultural note:** Authority and innovation norms affect whether alternatives can be expressed. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-SN-METHOD-01` | S | Preference to improve a method that works | work-or-project | preference | Avoid “safe” framing |
| `BP-SN-METHOD-02` | N | Preference to explore multiple possible methods | problem-solving | behavioural-tendency | Avoid creativity praise |
| `BP-SN-METHOD-03` | S | Tendency to test application before expanding alternatives | daily-life | scenario-response | Control risk aversion |

## 13. Thinking–Feeling detailed blueprint

TF items must control for kindness, empathy ability, emotional regulation, morality, gender stereotypes, professional roles, conflict avoidance, and cultural politeness. Thinking is not cold; Feeling is not irrational.

### 13.1 Decision standard

**Definition:** Criteria foregrounded in choice. **Pole intents:** T—impersonal consistency; F—values and people. **Evidence:** Relative weighting where both criteria are legitimate. **Not evidence:** reasoning ability or compassion. **Contexts:** decision, project. **Confounds:** policy, power, stakes. **Risk:** high desirability; medium cultural dependency. **Cultural note:** Collective and individual decision norms affect stated criteria. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-TF-STANDARD-01` | T | Preference for a consistent rule | decision | preference | Avoid “objective” praise |
| `BP-TF-STANDARD-02` | F | Preference to weigh individual impact | decision | behavioural-tendency | Avoid kindness cue |
| `BP-TF-STANDARD-03` | T | Tendency to test whether reasoning applies across cases | work-or-project | scenario-response | Do not measure intelligence |

### 13.2 Fairness orientation

**Definition:** Preferred interpretation of fair treatment. **Pole intents:** T—comparable standard; F—contextual equity. **Evidence:** Chosen fairness frame. **Not evidence:** morality, legality, generosity, or political belief. **Contexts:** decision, daily life. **Confounds:** ideology, role, law. **Risk:** high desirability; high cultural dependency. **Cultural note:** Fairness concepts vary across communities and institutions. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-TF-FAIR-01` | T | Preference for the same stated criterion | decision | preference | Avoid moral verdict |
| `BP-TF-FAIR-02` | F | Preference to account for relevant circumstances | decision | preference | Avoid generosity framing |
| `BP-TF-FAIR-03` | T | Tendency to compare treatment across cases | daily-life | behavioural-tendency | Keep scenario low-stakes |

### 13.3 Feedback style

**Definition:** Preferred emphasis when giving critique. **Pole intents:** T—direct issue focus; F—relationally attuned delivery. **Evidence:** Communication emphasis. **Not evidence:** honesty, politeness, empathy ability, or management skill. **Contexts:** feedback, communication, project. **Confounds:** hierarchy, culture, safety. **Risk:** high desirability; high cultural dependency. **Cultural note:** Directness, face, status, and politeness norms differ. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-TF-FEEDBACK-01` | T | Preference to state the issue plainly | work-or-project | preference | Do not imply harshness |
| `BP-TF-FEEDBACK-02` | F | Preference to shape delivery around reception | communication | behavioural-tendency | Do not imply avoidance |
| `BP-TF-FEEDBACK-03` | T | Tendency to separate critique from relationship | feedback | scenario-response | Avoid “professional” cue |

### 13.4 Conflict evaluation

**Definition:** Information foregrounded in disagreement. **Pole intents:** T—argument coherence; F—needs and relationships. **Evidence:** Preferred first evaluation. **Not evidence:** aggression, avoidance, regulation, or conflict skill. **Contexts:** conflict, decision. **Confounds:** threat, power, trauma, politeness. **Risk:** high desirability; high cultural dependency. **Cultural note:** Open disagreement is not equally safe or acceptable in all contexts. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-TF-CONFLICT-01` | T | First attention to reasoning in disagreement | conflict | behavioural-tendency | Do not reward debate skill |
| `BP-TF-CONFLICT-02` | F | First attention to affected needs and trust | conflict | behavioural-tendency | Avoid kindness claim |
| `BP-TF-CONFLICT-03` | T | Preference to clarify positions before repairing tone | conflict | comparative-preference | Use carefully; false opposition risk |

### 13.5 Interpersonal impact

**Definition:** Weight given to relational consequences. **Pole intents:** T—impact considered after consistency; F—impact central to evaluation. **Evidence:** Relative decision weight. **Not evidence:** empathy ability, attachment, kindness, or popularity. **Contexts:** decision, group, project. **Confounds:** role duty, dependence, consequences. **Risk:** high desirability; high cultural dependency. **Cultural note:** Interdependence and role obligations shape relational weighting. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-TF-IMPACT-01` | T | Preference to establish a defensible decision before adjusting delivery | decision | scenario-response | Avoid uncaring framing |
| `BP-TF-IMPACT-02` | F | Tendency to include relationship effects in the decision itself | work-or-project | behavioural-tendency | Avoid moral praise |
| `BP-TF-IMPACT-03` | F | Preference to preserve trust when options are otherwise comparable | decision | preference | Control social desirability |

### 13.6 Value and principle weighting

**Definition:** How general principles and personal values enter judgement. **Pole intents:** T—transferable principle; F—personally held and human value. **Evidence:** Preferred justification. **Not evidence:** moral character, ideology, or ethical sophistication. **Contexts:** decision, reflection. **Confounds:** religion, politics, professional code. **Risk:** high desirability; high cultural dependency. **Cultural note:** Values language must not privilege one moral or religious tradition. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-TF-VALUE-01` | T | Preference for a principle applicable across cases | decision | preference | Avoid “rational” label |
| `BP-TF-VALUE-02` | F | Preference for alignment with human values | decision | preference | Avoid moral superiority |
| `BP-TF-VALUE-03` | T | Tendency to explain choices through consistent criteria | reflection | behavioural-tendency | Do not assess articulation skill |

## 14. Judging–Perceiving detailed blueprint

JP items must control for conscientiousness, executive functioning, anxiety, disability, work demands, caregiving, economic instability, and access to time or resources. Judging is not responsible; Perceiving is not careless.

### 14.1 Planning preference

**Definition:** Desired amount of advance organisation. **Pole intents:** J—planned sequence; P—adaptive outline. **Evidence:** Preferred planning level when choice exists. **Not evidence:** reliability, productivity, or access to time. **Contexts:** planning, project, daily life. **Confounds:** obligations, anxiety, executive function. **Risk:** high desirability; high cultural dependency. **Cultural note:** Planning freedom and schedule control cannot be assumed. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-JP-PLAN-01` | J | Preference to define steps before starting | planning | preference | Avoid competence language |
| `BP-JP-PLAN-02` | P | Preference for a flexible outline | work-or-project | preference | Avoid careless framing |
| `BP-JP-PLAN-03` | J | Tendency to establish milestones early | work-or-project | behavioural-tendency | Control role demands |

### 14.2 Closure preference

**Definition:** Comfort with settled versus open matters. **Pole intents:** J—settled direction; P—options remain open. **Evidence:** Preferred point of closure. **Not evidence:** decisiveness ability, anxiety, or commitment. **Contexts:** decision, planning. **Confounds:** stakes, reversibility, information. **Risk:** medium desirability; medium cultural dependency. **Cultural note:** Authority and shared decision structures affect who can close a matter. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-JP-CLOSURE-01` | J | Relief or preference when direction is settled | decision | frequency-framed | Avoid anxiety inference |
| `BP-JP-CLOSURE-02` | P | Preference to retain viable alternatives | decision | preference | Avoid indecision framing |
| `BP-JP-CLOSURE-03` | J | Tendency to close one choice before opening another | planning | behavioural-tendency | Do not imply efficiency |

### 14.3 Deadline behaviour

**Definition:** Preferred distribution of work across available time. **Pole intents:** J—earlier progression; P—deadline-responsive progression. **Evidence:** Preferred pacing under comparable control. **Not evidence:** lateness, reliability, executive function, or workload. **Contexts:** project, daily task. **Confounds:** multiple jobs, caregiving, disability, deadline design. **Risk:** very high desirability; very high cultural dependency. **Cultural note:** Time autonomy, resources, and competing obligations vary substantially. **Targets:** 5–6 candidates; 3 pilot; both poles; reserve extra alternatives.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-JP-DEADLINE-01` | J | Preference to make steady early progress | work-or-project | preference | Do not imply completion success |
| `BP-JP-DEADLINE-02` | P | Preference for concentrated later effort when time remains | work-or-project | behavioural-tendency | Avoid procrastination label |
| `BP-JP-DEADLINE-03` | P | Tendency to adjust pacing as the endpoint approaches | daily-life | scenario-response | Control external constraints |

### 14.4 Adaptability

**Definition:** Relationship with changes to intended action. **Pole intents:** J—plan continuity; P—active reconfiguration. **Evidence:** Preferred response to non-emergency change. **Not evidence:** resilience, competence, trauma response, or obedience. **Contexts:** change, project, daily life. **Confounds:** consequences, authority, safety. **Risk:** high desirability; high cultural dependency. **Cultural note:** Users may have unequal authority to accept or resist change. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-JP-ADAPT-01` | J | Preference to preserve agreed direction where possible | change | preference | Avoid rigidity framing |
| `BP-JP-ADAPT-02` | P | Readiness to reconfigure around new information | change | behavioural-tendency | Avoid resilience praise |
| `BP-JP-ADAPT-03` | J | Tendency to assess change against the existing plan first | work-or-project | scenario-response | Control risk level |

### 14.5 Environmental structure

**Definition:** Desired external order and predictability. **Pole intents:** J—defined structure; P—flexible environment. **Evidence:** Preference where environmental choice exists. **Not evidence:** cleanliness, competence, disability, or housing conditions. **Contexts:** daily life, learning, project. **Confounds:** shared space, resources, sensory needs. **Risk:** high desirability; very high cultural dependency. **Cultural note:** Private space and control of shared environments cannot be assumed. **Targets:** 5–6 candidates; 3 pilot; both poles.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-JP-ENV-01` | J | Preference for predictable arrangement | daily-life | preference | Do not ask about tidiness |
| `BP-JP-ENV-02` | P | Comfort changing arrangements as needs shift | learning | behavioural-tendency | Avoid disorder implication |
| `BP-JP-ENV-03` | J | Tendency to define an external structure before a task | work-or-project | scenario-response | Control for required procedure |

### 14.6 Decision pacing

**Definition:** Preferred point for commitment. **Pole intents:** J—earlier commitment once criteria are met; P—later commitment for more information. **Evidence:** Timing preference with reversible ordinary choices. **Not evidence:** intelligence, confidence, anxiety, or decisiveness skill. **Contexts:** decision, planning. **Confounds:** risk, scarcity, authority. **Risk:** medium desirability; high cultural dependency. **Cultural note:** Choice availability and collective decision norms affect pacing. **Targets:** 5–6 candidates; 3 pilot; balanced intent.

| Blueprint ID | Target | Construct intent | Context | Form | Risk notes |
| --- | --- | --- | --- | --- | --- |
| `BP-JP-PACE-01` | J | Preference to commit once criteria are sufficient | decision | preference | Avoid confidence cue |
| `BP-JP-PACE-02` | P | Preference to gather more information before commitment | decision | preference | Avoid indecision cue |
| `BP-JP-PACE-03` | J | Tendency to choose direction to enable next steps | planning | behavioural-tendency | Do not imply productivity |

## 15. Candidate-item drafting batches

1. **Construct-pure:** Simple, direct units with one subdimension, low context complexity, and low desirability risk.
2. **Varied-context:** Alternative contexts spanning learning, social, project, and daily life.
3. **Counter-keyed alternatives:** Opposite-direction formulations using positive grammar where possible.
4. **Scenario alternatives:** Realistic situations independent of wealth, occupation, family structure, or specialist knowledge.
5. **Replacement reserve:** Additional candidates for high-risk or weakly represented subdimensions.

Writers may create several alternatives for one blueprint unit, but they must remain linked through an item family.

## 16. Item-family system

An item family contains candidate formulations aimed at substantially the same construct:

```text
Family: EI-ENERGY-GROUP-01
├── Candidate A
├── Candidate B
└── Candidate C
```

Normally only one close variant enters the 72-item pilot. Near duplicates may inflate apparent internal consistency and must not be included merely for that purpose. Families remain available during review; rejected wording remains archived. Family IDs remain stable.

```ts
type ItemFamily = {
  familyId: "EI-ENERGY-GROUP-01";
  blueprintIds: ["BP-EI-ENERGY-01"];
  constructIntent: "renewal through outward engagement";
  candidateItemIds: ["P-EI-ENERGY-001", "P-EI-ENERGY-002"];
  preferredCandidateId?: "P-EI-ENERGY-001";
  familyStatus: "draft" | "review" | "pilot-selected" | "archived";
  overlapNotes: string[];
};
```

## 17. Reading-level and language controls

First-release items use plain international English, concise sentences, familiar vocabulary, few idioms, no regional slang, no complex metaphors, no unnecessary psychological terms, clear pronouns, and no advanced workplace vocabulary or US-only/UK-only references.

Manual checklist:

- [ ] One clear proposition.
- [ ] Familiar words with no unnecessary abstraction.
- [ ] No idiom, slang, metaphor, or regional reference.
- [ ] Pronouns and referents are unambiguous.
- [ ] No specialist workplace or academic knowledge.
- [ ] Frequency and comparison terms have a clear frame.
- [ ] Wording preserves both poles as legitimate.
- [ ] Meaning remains stable when read aloud.

No reading-grade score is claimed. Automated readability tools may support review but cannot replace construct, cultural, or accessibility review.

## 18. Cultural-review framework

Review for South African and broader international use must ask:

- Does the item assume individualistic behaviour or unrestricted personal choice?
- Does it treat direct speech as universally normal?
- Does it assume control over work, study, schedule, or environment?
- Does it assume access to quiet private space or regular group socialising?
- Does it assume planning freedom, formal schooling, stable income, or technology?
- Does it interpret respect, hierarchy, or politeness through one culture?
- Could language proficiency alter the apparent preference?
- Could economic, family, community, or caregiving obligations override preference?

Review should include varied local and international perspectives where feasible. Cultural neutrality cannot be achieved through wording alone; pilot evidence remains necessary.

## 19. Accessibility and cognitive-load review

Each item must contain one proposition, avoid unnecessary subordinate clauses and double negatives, use clear response labels, and support screen-reader-compatible numbering. The future interface must provide plain errors, answer review, persistent answers during navigation, mobile-readable text, no colour-only meaning, no time pressure, and no forced rapid scrolling.

Review flags:

| Flag | Trigger |
| --- | --- |
| Memory burden | Requires recalling many events or a distant exact frequency |
| Abstract-language burden | Depends on specialised or highly conceptual vocabulary |
| Scenario complexity | Contains several actors, conditions, or decisions |
| Emotional discomfort | Invites distressing or sensitive disclosure |
| Ambiguity | Supports materially different interpretations |
| Reading fatigue | Is unnecessarily long or syntactically dense |

Medium and high flags require revision or a documented justification before pilot selection.

## 20. Sensitive-content boundaries

Items must not request or indirectly infer medical or mental-health diagnoses, trauma, sexual history, religion, political affiliation, criminal history, income, immigration status, highly personal family conflict, or protected characteristics.

Items must not confuse preferences with depression, social anxiety, attention difficulties, autism, trauma responses, chronic illness, financial pressure, or unsafe living conditions. Such factors may influence responses and must not be interpreted through a personality label.

## 21. Duplicate and redundancy review

Potentially overlapping pairs are compared on construct, context, wording, keyed pole, behavioural evidence, and likely response process.

| Classification | Meaning | Action |
| --- | --- | --- |
| Intentional coverage | Distinct evidence for the same subdimension | Retain if both add coverage |
| Useful contextual variation | Same intent tested in meaningfully different contexts | Keep candidates; select carefully |
| Near duplicate | Similar wording and response process | Keep one in pilot |
| Construct contamination | Another construct can dominate | Revise or reject |
| Contradictory wording | Responses may conflict because the propositions differ | Clarify intent and key |
| Unnecessary repetition | Adds burden without information | Reject or reserve |

The 72-item pilot should contain few very similar formulations, even when they belong to different families.

## 22. Pilot-bank selection rules

Selection must confirm all subdimensions, directional and context balance, item-form variety, readability, cultural and accessibility review, controlled desirability, low overlap, no near duplicates, verified scoring keys, emotional safety, and a plausible 8–12-minute completion length.

An independent reviewer must verify keyed preference and scoring direction against the parent scoring model.

| Rating | Meaning |
| --- | --- |
| Retain | Meets construct and review requirements; eligible for pilot |
| Retain with revision | Construct is useful; specified wording or metadata change required |
| Reserve | Useful alternative or replacement, not selected for current pilot |
| Reject | Unacceptable ambiguity, contamination, duplication, safety, or bias |

The rubric uses no statistical performance criterion before data exists.

## 23. Question-order blueprint

The earliest pilot should use one reviewed fixed order. It must:

- Interleave all four dimensions.
- Avoid long runs of one keyed pole.
- Separate close family variants and similar contexts.
- Avoid clusters of counter-keyed or cognitively demanding items.
- Begin with clear, low-risk items.
- Distribute reflective items rather than leaving them all to the end.
- Keep scoring independent from visual grouping.

Controlled alternate forms may be considered after implementation and analysis. Free randomisation is not recommended initially because it complicates debugging, editorial review, and comparison.

## 24. Attention and response-quality items

Obvious instructions such as “Select Agree for this question” may break trust, feel punitive, disadvantage users with reading or accessibility needs, and create false invalidation while measuring no personality construct.

The provisional V1.0 direction is to rely on respectful response-pattern indicators from the parent specification rather than trick questions. Any dedicated attention item requires explicit construct, accessibility, ethics, and reporting review. It must never automatically label a person deceptive or invalidate a result. This remains an open decision.

## 25. Candidate-item metadata

```ts
type PersonalityCandidateItem = {
  id: string;
  familyId: string;
  blueprintId: string;
  assessmentId: "personality-v1";
  itemVersion: number;
  language: "en";
  dimension: "EI" | "SN" | "TF" | "JP";
  subdimension: string;
  keyedPreference: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
  scoringDirection: "ascending" | "descending";
  wordingType: "direct" | "counter-keyed";
  itemForm:
    | "behavioural-tendency"
    | "preference"
    | "scenario-response"
    | "comparative-preference"
    | "frequency-framed";
  behaviouralContext: string;
  text: string;
  socialDesirabilityRisk: "low" | "medium" | "high";
  culturalDependencyRisk: "low" | "medium" | "high";
  accessibilityRisk: "low" | "medium" | "high";
  status:
    | "draft"
    | "editorial-review"
    | "bias-review"
    | "cognitive-review"
    | "pilot-candidate"
    | "pilot-active"
    | "reserve"
    | "rejected"
    | "retired";
  reviewNotes: string[];
};
```

Added fields serve these purposes:

| Field | Purpose |
| --- | --- |
| `familyId` | Links alternative formulations |
| `blueprintId` | Traces the candidate to construct intent |
| `itemVersion` | Records wording revision without changing stable ID |
| `itemForm` | Supports form balance and review |
| `behaviouralContext` | Supports context distribution |
| Three risk fields | Make desirability, cultural, and accessibility review explicit |
| Expanded `status` | Controls the draft-to-pilot lifecycle without erasing history |
| `reviewNotes` | Preserves decisions, concerns, and required revisions |

The parent definitions of keyed preference, scoring direction, wording type, stable item IDs, and version increments remain authoritative.

## 26. Review worksheet

```markdown
### Candidate-item review

- Candidate ID:
- Family ID:
- Blueprint ID:
- Item version:
- Item text:
- Intended primary construct:
- Keyed preference:
- Scoring direction:
- Wording type:
- Primary interpretation:
- Possible alternative interpretation:
- Ability contamination: none / low / medium / high
- Morality or social-desirability bias: low / medium / high
- Cultural dependency: low / medium / high
- Accessibility or cognitive-load issues: low / medium / high
- Duplicate or family-overlap risk: none / low / medium / high
- Emotional sensitivity: none / low / medium / high
- Language clarity: clear / revise / reject
- Scoring key independently confirmed by:
- Reviewer decision: retain / retain with revision / reserve / reject
- Revision notes:
- Reviewer and date:
```

## 27. Cognitive-interview plan for questions

Before pilot release, conduct small cognitive-review rounds. Participants should vary in age, education, language background, occupation, and life context where feasible. No fixed sample is claimed sufficient for validation.

Ask:

- What does this question mean to you?
- How did you choose your answer?
- Which words were unclear?
- Did you think of a specific situation?
- Could your answer change across contexts?
- Did one answer feel more socially acceptable?
- Did the question assume something about your life?
- Did it feel like skill rather than preference?

Record findings by candidate ID and version, including interpretation, hesitation, context used, suggested wording, and resulting decision.

## 28. Future statistical-review map

Blueprint metadata supports later review of item response distributions, neutral and missing rates, item-total and inter-item correlations, subdimension coverage, internal consistency, dimensional structure, completion-time patterns, test-retest stability, differential item functioning, and language-version behaviour.

No outcome or target is claimed. The trace from item to family and blueprint enables a weak item to be replaced with an alternative that covers the same intent rather than removed blindly.

## 29. Question-bank versioning

| Artefact | Identifier |
| --- | --- |
| Blueprint | `pqb-blueprint-1.0-draft` |
| Candidate pool | `pcp-0.1.0` |
| Pilot bank | `pqb-0.9.0` |
| Future production bank | `pqb-1.0.0` |
| Individual item | Stable item ID plus integer `itemVersion` |
| Item family | Stable family ID |

Wording changes increment item versions; item and family IDs remain stable. Status changes are recorded as history rather than silently rewriting prior state. Pilot results retain the exact bank version. Retired items remain archived, and historical reports retain the bank version used.

Semantic version meanings follow the parent specification: patch for non-scoring wording or formatting correction, minor for compatible content or item revision, and major for construct, scoring, comparability, or interpretation change.

## 30. Deliverables after blueprint approval

1. Candidate-item drafting guide.
2. First candidate batch.
3. Editorial review log.
4. Bias and accessibility review.
5. Complete 120–144-item candidate pool.
6. Duplicate and overlap matrix.
7. 72-item pilot-bank selection.
8. Versioned pilot JSON.
9. Independent scoring-key check.
10. Assessment UI only after pilot structure approval.

> **The questionnaire interface should not be implemented before the pilot question bank and scoring keys have been reviewed.**

## 31. Open decisions

| Decision | Provisional direction | Why unresolved | Evidence or review required |
| --- | --- | --- | --- |
| Exact candidate-pool size | Draft toward 144; permit 120 if every subdimension has strong alternatives | High-risk constructs may need more reserve wording | Drafting yield and editorial review |
| Alternatives per family | Usually 2–3 | Needs vary by construct risk | Duplicate review and cognitive interviews |
| Direct/counter-keyed ratio | About 48/24 in pilot | Comprehension may outweigh symmetry | Editorial and cognitive review |
| Context targets | Use section 6 as a coverage guide, not quotas | Strong items may not distribute evenly | Coverage audit |
| Comparative items | Limited use | Artificial oppositions can distort response | Cognitive review |
| Frequency wording | Use selectively with ordinary time frames | Frequency terms vary by interpretation | Cognitive review |
| Dedicated attention checks | Exclude initially | Trust and accessibility costs may exceed value | Ethics and usability review |
| Pilot order | One reviewed fixed order | Alternate forms complicate early comparison | Pilot operations and later analysis |
| Reading-level measurement | Manual review first; tool-assisted check later | No tool or threshold selected | Accessibility and language review |
| English convention | Broad international English with South African review | Some conventions differ | Editorial style decision |
| Cognitive-interview recruitment | Seek varied age, education, language, occupation, and context | Feasible recruitment is unknown | Separate review protocol |
| Replacement reserve size | Retain at least one reviewed alternative per high-risk subdimension where possible | Candidate quality is unknown | Candidate-pool review |

No conflict with the parent specification was identified while drafting this blueprint.

## 32. Acceptance criteria

- [x] Covers all four dimensions and all 24 subdimensions.
- [x] Defines a 120–144-item candidate-pool strategy.
- [x] Defines the 72-item pilot allocation.
- [x] Defines blueprint units, contexts, item forms, and wording direction.
- [x] Defines desirability and construct-overlap controls.
- [x] Provides detailed blueprints and at least three units per subdimension.
- [x] Defines drafting batches and item families.
- [x] Defines language, cultural, accessibility, and sensitivity controls.
- [x] Defines duplicate review and pilot selection.
- [x] Defines question-order and response-quality principles.
- [x] Defines candidate metadata and a reusable review worksheet.
- [x] Defines cognitive review and future statistical mapping.
- [x] Defines versioning and next deliverables.
- [x] Contains no final production question bank.
- [x] Contains no unsupported validation claim.
