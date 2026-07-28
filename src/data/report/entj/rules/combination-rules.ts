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

export const ENTJ_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "entj-combination-visible-command",
      90,
      [
        dimension("EI", ["E"], ["strong", "very-strong"]),
        dimension("TF", ["T"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "entj-combination-care-structure",
      "Visible Direction and Rapid Coordination",
      "Strong E and T preferences may produce a visibly directive style: ideas are tested through discussion, conclusions are stated clearly, and people or resources are mobilised around an objective. This can create momentum and make accountability easier to see. A possible cost is that the conclusion arrives before others understand the reasoning or contribute relevant evidence. State the logic and uncertainty behind the direction, then invite challenge from people closest to implementation before converting alignment into action.",
    ),
    combinationRule(
      "entj-combination-strategic-execution",
      89,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "entj-combination-care-structure",
      "Long-Range Direction Into Execution",
      "Strong N and J preferences may connect a future-oriented system view with structured planning, ownership, and closure. The person may define a long-range direction and rapidly translate it into priorities, governance, and measurable execution. This can coordinate complex work, but the plan may become over-centralised or resistant to evidence that challenges the original model. Identify the assumptions beneath the strategy, assign local owners real decision authority, and establish review triggers that allow the structure to change when reality does.",
    ),
    combinationRule(
      "entj-combination-control-risk",
      88,
      [
        dimension("TF", ["T"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "entj-combination-boundary-risk",
      "Standards, Ownership, and Control",
      "Strong T and J preferences may support clear standards, decisive ownership, and disciplined follow-through. Under pressure, the same combination can make tighter control feel like the most rational response to uncertainty or weak execution. Responsibility may be taken back from others before capability has time to develop, creating dependence and hidden workload. Separate outcomes from methods, delegate explicit decision rights, and use agreed review points so genuine risk is managed without treating personal supervision as the default source of trust.",
    ),
    combinationRule(
      "entj-combination-flexible-leadership",
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
      "entj-combination-boundary-risk",
      "Leadership That Changes With Context",
      "Borderline or balanced EI and TF results suggest that visible leadership and decision criteria may shift with role, trust, culture, group size, and current demands. The person may coordinate publicly in one context, process privately in another, and move between objective standards and stakeholder consequences without contradiction. Use this flexibility consciously: name the role, evidence, and communication mode the situation requires rather than forcing a single image of how an ENTJ should lead.",
    ),
    combinationRule(
      "entj-combination-adaptive-strategy",
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
      "entj-combination-change-flexibility",
      "Strategic Direction With Route Flexibility",
      "Borderline or balanced SN and JP results may combine strategic thought with meaningful situational flexibility. The person can move between abstract direction and concrete evidence, using structure where consequences require it while allowing methods to evolve. This can strengthen change leadership because learning does not threaten the objective. Define the stable outcome, minimum safeguards, and review date, then allow local evidence to reshape sequencing or technique instead of treating every adjustment as loss of control.",
    ),
    aggregateCombinationRule(
      "entj-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "entj-combination-change-flexibility",
      "A Provisional, Blended ENTJ Profile",
      "Three or more low-confidence dimensions mean the ENTJ result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour may vary substantially with authority, culture, stress, expertise, and trust. The report remains useful as a set of hypotheses, but firm claims about leadership, logic, sociability, or structure would exceed the evidence. Compare selected interpretations with repeated real situations, keep contradictory examples, and revisit the pattern if later evidence consistently supports a different explanation.",
    ),
    combinationRule(
      "entj-combination-private-strategy",
      84,
      [
        dimension("JP", ["J"], ["strong", "very-strong"]),
        dimension("EI", ["I"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "entj-combination-boundary-risk",
      "Private Strategy and Concentrated Ownership",
      "Strong J and I preferences may support concentrated strategic work, careful private planning, and self-contained responsibility before visible action. The person can develop a coherent direction without requiring constant external processing. A risk is that consultation, delegation, and workload remain hidden until the plan is advanced or pressure is high. Share assumptions earlier, assign ownership before execution begins, and schedule a challenge point where others can materially influence the strategy rather than merely react to a finished design.",
    ),
    combinationRule(
      "entj-combination-stakeholder-integration",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "entj-combination-change-flexibility",
      "Future Strategy With Stakeholder Integration",
      "N-leaning and F-leaning results may combine future-focused strategy with stronger attention to values, legitimacy, and stakeholder consequences. The person may still be decisive and results-oriented while treating human adoption as part of the system rather than a secondary communication task. This does not invalidate the ENTJ classification. Use the combination to identify who carries transition costs, involve affected groups in implementation design, and measure trust, capability, and sustained use alongside delivery milestones.",
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
    personalityType: "ENTJ",
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
    personalityType: "ENTJ",
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
