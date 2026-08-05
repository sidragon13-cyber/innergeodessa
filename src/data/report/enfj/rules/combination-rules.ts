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

export const ENFJ_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "enfj-combination-visible-guidance",
      90,
      [
        dimension("EI", ["E"], ["strong", "very-strong"]),
        dimension("TF", ["F"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "enfj-combination-care-structure",
      "Visible Encouragement and Relational Momentum",
      "Strong E and F preferences may make attention to people highly visible: needs are explored through conversation, shared purpose is articulated aloud, and energy is mobilised around collective development. This can strengthen belonging and momentum. A possible cost is that enthusiasm feels like pressure to agree or disclose. State the invitation and its limits, make dissent safe, and ask each person what participation they actually choose before interpreting warmth as commitment.",
    ),
    combinationRule(
      "enfj-combination-relational-development",
      89,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "enfj-combination-care-structure",
      "Long-Range Direction Into Development",
      "Strong N and J preferences may connect a future-oriented system view with structured planning, ownership, and closure. The person may define a long-range direction and rapidly translate it into priorities, governance, and measurable development. This can coordinate complex work, but the plan may become over-centralised or resistant to evidence that challenges the original model. Identify the assumptions beneath the strategy, assign local owners real decision authority, and establish review triggers that allow the structure to change when reality does.",
    ),
    combinationRule(
      "enfj-combination-overreach-risk",
      88,
      [
        dimension("TF", ["F"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "enfj-combination-boundary-risk",
      "Care, Commitment, and Over-Responsibility",
      "Strong F and J preferences may support dependable care, coordinated development, and follow-through on promises to a group. Under pressure, the ENFJ may take responsibility for morale, growth, and agreement that properly belongs to several people. This creates hidden workload and can limit others' agency. Separate support from ownership, ask what help is wanted, assign explicit decision rights, and allow discomfort that does not signal harm to remain part of another person's learning.",
    ),
    combinationRule(
      "enfj-combination-flexible-leadership",
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
      "enfj-combination-boundary-risk",
      "Leadership That Changes With Context",
      "Borderline or balanced EI and TF results suggest that visible leadership and decision criteria may shift with role, trust, culture, group size, and current demands. The person may coordinate publicly in one context, process privately in another, and move between objective standards and community consequences without contradiction. Use this flexibility consciously: name the role, evidence, and communication mode the situation requires rather than forcing a single image of how an ENFJ should lead.",
    ),
    combinationRule(
      "enfj-combination-adaptive-strategy",
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
      "enfj-combination-change-flexibility",
      "Relational Direction With Route Flexibility",
      "Borderline or balanced SN and JP results may combine relational thought with meaningful situational flexibility. The person can move between abstract direction and concrete evidence, using structure where consequences require it while allowing methods to evolve. This can strengthen change leadership because learning does not threaten the objective. Define the stable outcome, minimum safeguards, and review date, then allow local evidence to reshape sequencing or technique instead of treating every adjustment as loss of overreach.",
    ),
    aggregateCombinationRule(
      "enfj-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "enfj-combination-change-flexibility",
      "A Provisional, Blended ENFJ Profile",
      "Three or more low-confidence dimensions mean the ENFJ result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour may vary substantially with authority, culture, stress, expertise, and trust. The report remains useful as a set of hypotheses, but firm claims about leadership, care, sociability, or structure would exceed the evidence. Compare selected interpretations with repeated real situations, keep contradictory examples, and revisit the pattern if later evidence consistently supports a different explanation.",
    ),
    combinationRule(
      "enfj-combination-private-strategy",
      84,
      [
        dimension("JP", ["J"], ["strong", "very-strong"]),
        dimension("EI", ["I"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "enfj-combination-boundary-risk",
      "Private Strategy and Concentrated Ownership",
      "Strong J and I preferences may support concentrated relational work, careful private planning, and self-contained responsibility before visible action. The person can develop a coherent direction without requiring constant external processing. A risk is that consultation, delegation, and workload remain hidden until the plan is advanced or pressure is high. Share assumptions earlier, assign ownership before development begins, and schedule a challenge point where others can materially influence the strategy rather than merely react to a finished design.",
    ),
    combinationRule(
      "enfj-combination-community-integration",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "enfj-combination-change-flexibility",
      "Future Strategy With Community Integration",
      "N-leaning and F-leaning results may combine future-focused strategy with stronger attention to values, legitimacy, and community consequences. The person may still be decisive and results-oriented while treating human adoption as part of the system rather than a secondary communication task. This does not invalidate the ENFJ classification. Use the combination to identify who carries transition costs, involve affected groups in implementation design, and measure trust, capability, and sustained use alongside delivery milestones.",
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
    personalityType: "ENFJ",
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
    personalityType: "ENFJ",
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
