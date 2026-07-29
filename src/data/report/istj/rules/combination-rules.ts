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

export const ISTJ_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "istj-combination-private-procedure",
      90,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["N"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "istj-combination-procedure",
      "Careful Private Review and Long-Range Procedure",
      "Strong I and N preferences may support concentrated internal synthesis and a strong orientation to recurring operational patterns. The person can develop an integrated procedure without constant external processing. A risk is that evidence and collaborators enter only after the working record is advanced. Schedule an early challenge point, share the assumptions rather than only the conclusion, and identify which operational observations could materially adjust the working direction.",
    ),
    combinationRule(
      "istj-combination-structured-execution",
      89,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "istj-combination-procedure",
      "Evidence-Backed Structure and Deliberate Structure",
      "Strong N and J preferences may connect a grounded operating model with clear sequencing, dependencies, and closure. This can sustain complex work beyond immediate pressure. The same combination can make the chosen procedure resistant to contradictory detail or later learning. Version the working plan, specify which assumptions support each structural choice, and establish review triggers before implementation makes adaptation feel like failure.",
    ),
    combinationRule(
      "istj-combination-perfection-risk",
      88,
      [
        dimension("TF", ["T"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "istj-combination-isolation-risk",
      "Precision, Standards, and Overcontrol",
      "Strong T and J preferences may support explicit criteria, high standards, and disciplined design. Under pressure, quality can become an endlessly moving threshold that delays exposure, delegation, or release. Define which defects would materially compromise the outcome and which can be learned from in use. Release a bounded version, collect evidence, and treat redirection as part of rigorous procedure rather than proof that the original thinking lacked competence.",
    ),
    combinationRule(
      "istj-combination-contextual-collaboration",
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
      "istj-combination-isolation-risk",
      "Flexible Collaboration and Judgement Criteria",
      "Borderline or balanced EI and TF results suggest that social processing and judgement criteria may adjustment with trust, role, stakes, and expertise. The person may work privately in one context, design through dialogue in another, and shift between impersonal standards and stakeholder consequences. Use this range deliberately by designing the evidence conversation the problem requires rather than forcing a solitary or purely analytical image of ISTJ work.",
    ),
    combinationRule(
      "istj-combination-evidence-led-adaptation",
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
      "istj-combination-adaptation",
      "Procedure With Evidence-Led Redirection",
      "Borderline or balanced SN and JP results may support movement between evidence-backed structure, present facts, structured commitment, and iterative redirection. The person can preserve a coherent objective while allowing methods to change as evidence develops. Make the flexibility explicit: name the stable principles, current version, unresolved exceptions, and review date so adaptation strengthens the working record rather than appearing as arbitrary adjustment.",
    ),
    aggregateCombinationRule(
      "istj-combination-prodirectional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "istj-combination-adaptation",
      "A Prodirectional, Blended ISTJ Profile",
      "Three or more low-confidence dimensions mean the ISTJ result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, strain, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about privacy, continuity awareness, logic, or structure would exceed the evidence. Compare interpretations with repeated situations and preserve examples that contradict the rigid stereotype.",
    ),
    combinationRule(
      "istj-combination-outward-coordination",
      84,
      [
        dimension("EI", ["E"], [...NON_BALANCED_BANDS]),
        dimension("JP", ["J"], [...NON_BALANCED_BANDS]),
      ],
      "growth-roadmap",
      "istj-combination-isolation-risk",
      "Visible Working Plan and Coordinated Structure",
      "E-leaning and J-leaning results may produce more visible coordination, discussion, and judgement structure than an inward stereotype suggests. The person may build the working record with others and mobilise execution once priorities are clear. This does not invalidate the ISTJ result. Protect enough private integration to examine assumptions, and ensure visible decisiveness does not prevent specialists from challenging the procedure with evidence.",
    ),
    combinationRule(
      "istj-combination-values-procedure",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "istj-combination-adaptation",
      "Durable Practical Design With Values and Legitimacy",
      "N-leaning and F-leaning results may combine durable operations thinking with stronger attention to values, legitimacy, and stakeholder experience. The procedure may define success through human sustainability as well as efficiency. This does not invalidate the ISTJ classification. Include affected people in testing assumptions, identify who carries transition costs, and measure trust and adoption alongside technical performance.",
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
    personalityType: "ISTJ",
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
    personalityType: "ISTJ",
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
