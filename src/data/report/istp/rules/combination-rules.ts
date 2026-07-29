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

export const ISTP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "istp-combination-private-experiment",
      90,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["S"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "istp-combination-experiment",
      "Careful Private Review and Long-Range Experiment",
      "Strong I and N preferences may support concentrated internal synthesis and a strong orientation to recurring operational patterns. The ISTP practitioner can develop an integrated experiment without constant external processing. A risk is that evidence and collaborators enter only after the working diagnosis is advanced. Schedule an early challenge point, share the assumptions rather than only the conclusion, and identify which operational observations could materially change the working direction.",
    ),
    combinationRule(
      "istp-combination-structured-execution",
      89,
      [
        dimension("SN", ["S"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "istp-combination-experiment",
      "Evidence-Backed Flexibility and Deliberate Flexibility",
      "Strong S and J preferences may connect a grounded operating model with clear sequencing, dependencies, and closure. This hands-on approach can sustain complex work beyond immediate pressure. The same combination can make the chosen experiment resistant to contradictory detail or later learning. Version the working plan, specify which assumptions support each structural choice, and establish review triggers before implementation makes adaptation feel like failure.",
    ),
    combinationRule(
      "istp-combination-perfection-risk",
      88,
      [
        dimension("TF", ["T"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "istp-combination-isolation-risk",
      "Precision, Standards, and Overcontrol",
      "Strong T and J preferences may support explicit criteria, high standards, and disciplined design. Under pressure, quality can become an endlessly moving threshold that delays exposure, delegation, or release. Define which defects would materially compromise the outcome and which can be learned from in use. Release a bounded version, collect evidence, and treat redirection as part of rigorous experiment rather than proof that the original thinking lacked competence.",
    ),
    combinationRule(
      "istp-combination-contextual-collaboration",
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
      "istp-combination-isolation-risk",
      "Flexible Collaboration and Judgement Criteria",
      "Borderline or balanced EI and TF results suggest that social processing and judgement criteria may change with trust, role, stakes, and expertise. The ISTP practitioner may work privately in one context, design through dialogue in another, and shift between impersonal standards and stakeholder consequences. Use this range deliberately by designing the evidence conversation the problem requires rather than forcing a solitary or purely analytical image of ISTP work.",
    ),
    combinationRule(
      "istp-combination-evidence-led-adaptation",
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
      "istp-combination-adaptation",
      "Experiment With Evidence-Led Redirection",
      "Borderline or balanced SN and JP results may support movement between evidence-backed flexibility, present facts, structured commitment, and iterative redirection. The ISTP practitioner can preserve a coherent objective while allowing methods to adjustment as evidence develops. Make the flexibility explicit: name the stable principles, current version, unresolved exceptions, and review date so adaptation strengthens the working diagnosis rather than appearing as arbitrary change.",
    ),
    aggregateCombinationRule(
      "istp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "istp-combination-adaptation",
      "A Provisional, Blended ISTP Profile",
      "Three or more low-confidence dimensions mean the ISTP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, strain, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about privacy, adaptability awareness, logic, or flexibility would exceed the evidence. Compare interpretations with repeated situations and preserve examples that contradict the rigid stereotype.",
    ),
    combinationRule(
      "istp-combination-outward-coordination",
      84,
      [
        dimension("EI", ["E"], [...NON_BALANCED_BANDS]),
        dimension("JP", ["P"], [...NON_BALANCED_BANDS]),
      ],
      "growth-roadmap",
      "istp-combination-isolation-risk",
      "Visible Working Plan and Coordinated Flexibility",
      "E-leaning and P-leaning results may produce more visible coordination, discussion, and judgement flexibility than an inward stereotype suggests. The ISTP practitioner may build the working diagnosis with others and mobilise execution once priorities are clear. This does not invalidate the ISTP result. Protect enough private integration to examine assumptions, and ensure visible decisiveness does not prevent specialists from challenging the experiment with evidence.",
    ),
    combinationRule(
      "istp-combination-values-experiment",
      83,
      [
        dimension("SN", ["S"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "istp-combination-adaptation",
      "Durable Practical Design With Values and Legitimacy",
      "S-leaning and F-leaning results may combine durable operations thinking with stronger attention to values, legitimacy, and stakeholder experience. The experiment may define success through human sustainability as well as efficiency. This does not invalidate the ISTP classification. Include affected people in testing assumptions, identify who carries transition costs, and measure trust and adoption alongside technical performance.",
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
    personalityType: "ISTP",
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
    personalityType: "ISTP",
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
