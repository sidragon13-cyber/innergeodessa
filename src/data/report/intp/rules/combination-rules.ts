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

export const INTP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "intp-combination-private-model",
      90,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["N"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "intp-combination-model",
      "Private Synthesis and Deep Conceptual Modelling",
      "Strong I and N preferences may support concentrated internal synthesis and a strong orientation to future system patterns. The person can develop an integrated conceptual model without constant external processing. A risk is that evidence and collaborators enter only after the model is advanced. Schedule an early challenge point, share the assumptions rather than only the conclusion, and identify which operational observations could materially change the future direction.",
    ),
    combinationRule(
      "intp-combination-analytical-openness",
      89,
      [
        dimension("TF", ["T"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "intp-combination-model",
      "Analytical Precision and Open-Ended Inquiry",
      "Strong T and P preferences may combine exacting internal logic with a willingness to keep several explanations available. This can uncover hidden assumptions and prevent premature closure. The same combination can delay action while the person continues refining distinctions or exploring exceptions. Define what the next decision actually requires, test the strongest current model with a bounded experiment, and preserve unresolved questions for a later revision rather than solving all of them before movement.",
    ),
    combinationRule(
      "intp-combination-analysis-paralysis",
      88,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "intp-combination-isolation-risk",
      "Private Inquiry and Analysis Paralysis",
      "Strong I and P preferences may protect uninterrupted thought and allow a model to evolve without social pressure for early closure. Under pressure, however, private exploration can become an indefinitely expanding problem space. The person may postpone exposure until every exception is understood. Choose one falsifiable question, share the current reasoning with a trusted critic, and release a bounded test whose evidence can improve the model more efficiently than additional solitary analysis.",
    ),
    combinationRule(
      "intp-combination-contextual-collaboration",
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
      "intp-combination-isolation-risk",
      "Flexible Collaboration and Decision Criteria",
      "Borderline or balanced EI and TF results suggest that social processing and decision criteria may change with trust, role, stakes, and expertise. The person may work privately in one context, refine ideas through dialogue in another, and shift between impersonal standards and stakeholder consequences. Use this range deliberately by designing the evidence conversation the problem requires rather than forcing a solitary or purely analytical image of INTP work.",
    ),
    combinationRule(
      "intp-combination-evidence-led-adaptation",
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
      "intp-combination-adaptation",
      "Conceptual Models With Evidence-Led Revision",
      "Borderline or balanced SN and JP results may support movement between abstract models, present facts, provisional action, and iterative revision. The person can preserve a coherent question while allowing explanations and methods to change as evidence develops. Make the flexibility explicit: name the current hypothesis, unresolved anomalies, next test, and review point so adaptation strengthens understanding rather than appearing as arbitrary change.",
    ),
    aggregateCombinationRule(
      "intp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "intp-combination-adaptation",
      "A Provisional, Blended INTP Profile",
      "Three or more low-confidence dimensions mean the INTP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about privacy, foresight, logic, or structure would exceed the evidence. Compare interpretations with repeated situations and preserve examples that contradict the conceptual stereotype.",
    ),
    combinationRule(
      "intp-combination-outward-experiment",
      84,
      [
        dimension("EI", ["E"], [...NON_BALANCED_BANDS]),
        dimension("JP", ["P"], [...NON_BALANCED_BANDS]),
      ],
      "growth-roadmap",
      "intp-combination-isolation-risk",
      "Visible Inquiry and Collaborative Experimentation",
      "E-leaning and P-leaning results may produce more visible ideation, discussion, and experimentation than an inward stereotype suggests. The person may refine models through live challenge and move rapidly between promising possibilities. This does not invalidate the INTP result. Protect enough private integration to test logical coherence, and use a written experiment boundary so collaborative exploration produces evidence instead of an expanding stream of unclosed alternatives.",
    ),
    combinationRule(
      "intp-combination-values-model",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "intp-combination-adaptation",
      "Deep Design With Values and Legitimacy",
      "N-leaning and F-leaning results may combine future systems thinking with stronger attention to values, legitimacy, and stakeholder experience. The conceptual model may define success through human sustainability as well as efficiency. This does not invalidate the INTP classification. Include affected people in testing assumptions, identify who carries transition costs, and measure trust and adoption alongside technical performance.",
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
    personalityType: "INTP",
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
    personalityType: "INTP",
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
