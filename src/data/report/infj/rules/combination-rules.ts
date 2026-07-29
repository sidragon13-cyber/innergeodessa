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

export const INFJ_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "infj-combination-private-meaning",
      90,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["N"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "infj-combination-meaning",
      "Private Synthesis and Long-Range Meaning Framework",
      "Strong I and N preferences may support concentrated internal synthesis and a strong orientation to future system patterns. The person can develop an integrated meaning framework without constant external processing. A risk is that evidence and collaborators enter only after the model is advanced. Schedule an early challenge point, share the assumptions rather than only the conclusion, and identify which operational observations could materially change the future direction.",
    ),
    combinationRule(
      "infj-combination-structured-guidance",
      89,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "infj-combination-meaning",
      "Future Meaning Framework and Deliberate Structure",
      "Strong N and J preferences may connect a long-range system model with clear sequencing, dependencies, and closure. This can sustain complex work beyond immediate pressure. The same combination can make the chosen meaning framework resistant to contradictory detail or later learning. Version the guidance, specify which assumptions support each structural choice, and establish review triggers before implementation makes adaptation feel like failure.",
    ),
    combinationRule(
      "infj-combination-idealised-responsibility",
      88,
      [
        dimension("TF", ["F"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "infj-combination-isolation-risk",
      "Purpose, Care, and Idealised Responsibility",
      "Strong F and J preferences may connect care for people with a strong sense of how a meaningful outcome should unfold. Under pressure, responsibility can expand until the INFJ feels accountable for everyone's development, harmony, or understanding. Name which contribution is genuinely yours, ask others to choose their part, and accept a humane outcome that is good enough. Shared agency protects purpose better than carrying an ideal alone.",
    ),
    combinationRule(
      "infj-combination-contextual-collaboration",
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
      "infj-combination-isolation-risk",
      "Flexible Collaboration and Decision Values and Consequences",
      "Borderline or balanced EI and TF results suggest that social processing and decision values and consequences may change with trust, role, stakes, and expertise. The person may work privately in one context, architect through dialogue in another, and shift between impersonal standards and stakeholder consequences. Use this range deliberately by designing the evidence conversation the problem requires rather than forcing a solitary or purely reflective image of INFJ work.",
    ),
    combinationRule(
      "infj-combination-evidence-led-adaptation",
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
      "infj-combination-adaptation",
      "Meaning Framework With Evidence-Led Revision",
      "Borderline or balanced SN and JP results may support movement between future meaning framework, present facts, structured commitment, and iterative revision. The person can preserve a coherent objective while allowing methods to change as evidence develops. Make the flexibility explicit: name the stable principles, current version, unresolved anomalies, and review date so adaptation strengthens the model rather than appearing as arbitrary change.",
    ),
    aggregateCombinationRule(
      "infj-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "infj-combination-adaptation",
      "A Provisional, Blended INFJ Profile",
      "Three or more low-confidence dimensions mean the INFJ result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about privacy, foresight, coherence, or structure would exceed the evidence. Compare interpretations with repeated situations and preserve examples that contradict the purposeful stereotype.",
    ),
    combinationRule(
      "infj-combination-outward-guidance",
      84,
      [
        dimension("EI", ["E"], [...NON_BALANCED_BANDS]),
        dimension("JP", ["J"], [...NON_BALANCED_BANDS]),
      ],
      "growth-roadmap",
      "infj-combination-isolation-risk",
      "Visible Guidance and Coordinated Structure",
      "E-leaning and J-leaning results may produce more visible coordination, discussion, and decision structure than an inward stereotype suggests. The person may build the model with others and mobilise execution once priorities are clear. This does not invalidate the INFJ result. Protect enough private integration to examine assumptions, and ensure visible decisiveness does not prevent specialists from challenging the meaning framework with evidence.",
    ),
    combinationRule(
      "infj-combination-values-meaning",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "infj-combination-adaptation",
      "Long-Range Design With Values and Legitimacy",
      "N-leaning and F-leaning results may combine future systems thinking with stronger attention to values, legitimacy, and stakeholder experience. The meaning framework may define success through human sustainability as well as efficiency. This does not invalidate the INFJ classification. Include affected people in testing assumptions, identify who carries transition costs, and measure trust and adoption alongside technical performance.",
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
    personalityType: "INFJ",
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
    personalityType: "INFJ",
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
