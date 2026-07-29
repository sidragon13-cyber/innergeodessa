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

export const ISFP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "isfp-combination-private-expression",
      90,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["S"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "isfp-combination-expression",
      "Private Synthesis and Deep Values-Grounded Authentic Contribution-Making",
      "Strong I and N preferences may support concentrated internal synthesis and a strong orientation to concrete patterns. The ISFP contributor can develop an integrated crafted response without constant external processing. A risk is that evidence and collaborators enter only after the expression is advanced. Schedule an early challenge point, share the assumptions rather than only the conclusion, and identify which operational observations could materially change the practical direction.",
    ),
    combinationRule(
      "isfp-combination-values-openness",
      89,
      [
        dimension("TF", ["F"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "isfp-combination-expression",
      "Values Congruence and Open-Ended Craft",
      "Strong F and P preferences may combine close attention to personal congruence with willingness to keep several meaningful possibilities open. This values-grounded craft can protect authenticity and sensory awareness. The same combination can delay action when no option expresses every value without compromise. Name the value that matters most in the present decision, choose a reversible expression of it, and preserve other possibilities for later rather than requiring one choice to represent the whole self.",
    ),
    combinationRule(
      "isfp-combination-reflection-paralysis",
      88,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "isfp-combination-isolation-risk",
      "Private Craft and Reflection Paralysis",
      "Strong I and P preferences may protect uninterrupted thought and allow an expression to evolve without social pressure for early closure. Under pressure, however, private craft can become an indefinitely expanding problem space. The ISFP contributor may postpone exposure until every exception is understood. Choose one falsifiable question, share the current reasoning with a trusted critic, and release a bounded test whose evidence can improve the expression more efficiently than additional solitary reflection.",
    ),
    combinationRule(
      "isfp-combination-contextual-collaboration",
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
      "isfp-combination-isolation-risk",
      "Flexible Collaboration and Decision Convictions",
      "Borderline or balanced EI and TF results suggest that social processing and decision convictions may change with trust, role, stakes, and expertise. The ISFP contributor may work privately in one context, refine ideas through dialogue in another, and shift between impersonal standards and stakeholder consequences. Use this range deliberately by designing the evidence conversation the problem requires rather than forcing a solitary or purely reflective image of ISFP work.",
    ),
    combinationRule(
      "isfp-combination-evidence-led-adaptation",
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
      "isfp-combination-adaptation",
      "Crafted Responses With Evidence-Led Revision",
      "Borderline or balanced SN and JP results may support movement between abstract expressions, present facts, provisional action, and iterative revision. The ISFP contributor can preserve a coherent question while allowing explanations and methods to change as evidence develops. Make the flexibility explicit: name the current hypothesis, unresolved anomalies, next test, and review point so adaptation strengthens understanding rather than appearing as arbitrary change.",
    ),
    aggregateCombinationRule(
      "isfp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "isfp-combination-adaptation",
      "A Provisional, Blended ISFP Profile",
      "Three or more low-confidence dimensions mean the ISFP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about privacy, foresight, values, or structure would exceed the evidence. Compare interpretations with repeated situations and preserve examples that contradict the values-grounded stereotype.",
    ),
    combinationRule(
      "isfp-combination-outward-experiment",
      84,
      [
        dimension("EI", ["E"], [...NON_BALANCED_BANDS]),
        dimension("JP", ["P"], [...NON_BALANCED_BANDS]),
      ],
      "growth-roadmap",
      "isfp-combination-isolation-risk",
      "Visible Craft and Collaborative Experimentation",
      "E-leaning and P-leaning results may produce more visible ideation, discussion, and experimentation than an inward stereotype suggests. The ISFP contributor may refine expressions through live challenge and move rapidly between promising possibilities. This does not invalidate the ISFP result. Protect enough private integration to test logical coherence, and use a written experiment boundary so collaborative craft produces evidence instead of an expanding stream of unclosed alternatives.",
    ),
    combinationRule(
      "isfp-combination-values-expression",
      83,
      [
        dimension("SN", ["S"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "isfp-combination-adaptation",
      "Deep Design With Values and Legitimacy",
      "S-leaning and F-leaning results may combine immediate context systems thinking with stronger attention to values, legitimacy, and stakeholder experience. The crafted response may define success through human sustainability as well as efficiency. This does not invalidate the ISFP classification. Include affected people in testing assumptions, identify who carries transition costs, and measure trust and adoption alongside technical performance.",
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
    personalityType: "ISFP",
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
    personalityType: "ISFP",
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
