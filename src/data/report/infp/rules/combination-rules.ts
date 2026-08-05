import type {
  DimensionRuleCondition,
  ReportRuleDefinition,
} from "../../rules";

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const INFP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "infp-combination-private-narrative",
      90,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["N"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "infp-combination-narrative",
      "Private Synthesis and Deep Values-Led Meaning-Making",
      "Strong I and N preferences may support concentrated internal synthesis and a strong orientation to future system patterns. The person can develop an integrated values-led narrative without constant external processing. A risk is that evidence and collaborators enter only after the narrative is advanced. Schedule an early challenge point, share the assumptions rather than only the conclusion, and identify which operational observations could materially change the future direction.",
    ),
    combinationRule(
      "infp-combination-values-openness",
      89,
      [
        dimension("TF", ["F"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "infp-combination-narrative",
      "Values Congruence and Open-Ended Exploration",
      "Strong F and P preferences may combine close attention to personal congruence with willingness to keep several meaningful possibilities open. This can protect authenticity and imagination. The same combination can delay action when no option expresses every value without compromise. Name the value that matters most in the present decision, choose a reversible expression of it, and preserve other possibilities for later rather than requiring one choice to represent the whole self.",
    ),
    combinationRule(
      "infp-combination-reflection-paralysis",
      88,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "infp-combination-isolation-risk",
      "Private Exploration and Reflection Paralysis",
      "Strong I and P preferences may protect uninterrupted thought and allow a narrative to evolve without social pressure for early closure. Under pressure, however, private exploration can become an indefinitely expanding problem space. The person may postpone exposure until every exception is understood. Choose one falsifiable question, share the current reasoning with a trusted critic, and release a bounded test whose evidence can improve the narrative more efficiently than additional solitary reflection.",
    ),
    combinationRule(
      "infp-combination-contextual-collaboration",
      87,
      [
        dimension("EI", ["I", "E", "X"], [
          "borderline",
          "balanced",
        ]),
        dimension("TF", ["F", "T", "X"], [
          "borderline",
          "balanced",
        ]),
      ],
      "growth-roadmap",
      "infp-combination-isolation-risk",
      "Flexible Collaboration and Decision Convictions",
      "Borderline or balanced EI and TF results suggest that social processing and decision convictions may change with trust, role, stakes, and expertise. The person may work privately in one context, refine ideas through dialogue in another, and shift between impersonal standards and stakeholder consequences. Use this range deliberately by designing the evidence conversation the problem requires rather than forcing a solitary or purely reflective image of INFP work.",
    ),
    combinationRule(
      "infp-combination-evidence-led-adaptation",
      86,
      [
        dimension("SN", ["S", "N", "X"], [
          "borderline",
          "balanced",
        ]),
        dimension("JP", ["J", "P", "X"], [
          "borderline",
          "balanced",
        ]),
      ],
      "change-and-adaptation",
      "infp-combination-adaptation",
      "Values-Led Narratives With Evidence-Led Revision",
      "Borderline or balanced SN and JP results may support movement between abstract narratives, present facts, provisional action, and iterative revision. The person can preserve a coherent question while allowing explanations and methods to change as evidence develops. Make the flexibility explicit: name the current hypothesis, unresolved anomalies, next test, and review point so adaptation strengthens understanding rather than appearing as arbitrary change.",
    ),
    aggregateCombinationRule(
      "infp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "infp-combination-adaptation",
      "A Provisional, Blended INFP Profile",
      "Three or more low-confidence dimensions mean the INFP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about privacy, foresight, values, or structure would exceed the evidence. Compare interpretations with repeated situations and preserve examples that contradict the values-led stereotype.",
    ),
    combinationRule(
      "infp-combination-outward-experiment",
      84,
      [
        dimension("EI", ["E"], [...NON_BALANCED_BANDS]),
        dimension("JP", ["P"], [...NON_BALANCED_BANDS]),
      ],
      "growth-roadmap",
      "infp-combination-isolation-risk",
      "Visible Exploration and Collaborative Experimentation",
      "E-leaning and P-leaning results may produce more visible ideation, discussion, and experimentation than an inward stereotype suggests. The person may refine narratives through live challenge and move rapidly between promising possibilities. This does not invalidate the INFP result. Protect enough private integration to test logical coherence, and use a written experiment boundary so collaborative exploration produces evidence instead of an expanding stream of unclosed alternatives.",
    ),
    combinationRule(
      "infp-combination-values-narrative",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "infp-combination-adaptation",
      "Deep Design With Values and Legitimacy",
      "N-leaning and F-leaning results may combine future systems thinking with stronger attention to values, legitimacy, and stakeholder experience. The values-led narrative may define success through human sustainability as well as efficiency. This does not invalidate the INFP classification. Include affected people in testing assumptions, identify who carries transition costs, and measure trust and adoption alongside technical performance.",
    ),
  ];

function dimension(
  dimensionCode: DimensionRuleCondition["dimension"],
  preferences: NonNullable<
    DimensionRuleCondition["preferences"]
  >,
  bands: NonNullable<DimensionRuleCondition["bands"]>,
): DimensionRuleCondition {
  return {
    kind: "dimension",
    dimension: dimensionCode,
    preferences,
    bands,
  };
}

function combinationRule(
  id: string,
  priority: number,
  all: DimensionRuleCondition[],
  targetSectionId: string,
  targetSlotId: string,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "INFP",
    priority,
    conditions: [{ kind: "combination", all }],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title },
        content: { en: content },
      },
    ],
    tags: ["combination"],
  };
}

function aggregateCombinationRule(
  id: string,
  priority: number,
  metric: "low-confidence-count",
  value: number,
  targetSectionId: string,
  targetSlotId: string,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "INFP",
    priority,
    conditions: [
      {
        kind: "aggregate",
        metric,
        operator: "gte",
        value,
      },
    ],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title },
        content: { en: content },
      },
    ],
    tags: ["combination"],
  };
}
