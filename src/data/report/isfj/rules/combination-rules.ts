import type {
  DimensionRuleCondition,
  ReportRuleDefinition,
} from "../../rules";

export const ISFJ_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "isfj-combination-quiet-support",
      90,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("TF", ["F"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "isfj-combination-care-structure",
      "Quiet Support and Private Needs",
      "Strong I and F preferences can combine into a quiet support pattern: the person may process privately, notice relational needs, and express care through thoughtful action rather than public discussion. This can create deep trust in a small number of dependable relationships. A possible cost is that personal needs remain unspoken while attention stays focused on others. Schedule private recovery before overload, and translate one internal concern into a direct request while it is still specific and manageable.",
    ),
    combinationRule(
      "isfj-combination-care-structure",
      89,
      [
        dimension("SN", ["S"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "isfj-combination-care-structure",
      "Continuity Through Detail and Structure",
      "Strong S and J preferences can support dependable execution through concrete evidence, remembered precedent, planning, and follow-through. The person may be especially effective at preserving service quality and preventing practical details from being lost. The same combination can turn established duties into rigid obligations, even when conditions have changed. Keep the desired outcome stable while reviewing whether the current routine remains necessary, fairly owned, and supported by current evidence over time.",
    ),
    combinationRule(
      "isfj-combination-boundary-risk",
      88,
      [
        dimension("TF", ["F"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "isfj-combination-boundary-risk",
      "Responsibility Toward People",
      "Strong F and J preferences may make relational responsibility feel both personally meaningful and morally binding. The person can become highly dependable because care is translated into plans and completed commitments. Risk rises when disappointing someone feels worse than exceeding personal capacity, leading to over-commitment or delayed limits. Before agreeing, separate compassion from ownership: confirm what the other person needs, what you can sustainably provide, and which responsibility should be shared or declined.",
    ),
    combinationRule(
      "isfj-combination-flexible-social-decisions",
      87,
      [
        dimension("EI", ["I", "E", "X"], ["borderline", "balanced"]),
        dimension("TF", ["F", "T", "X"], ["borderline", "balanced"]),
      ],
      "growth-roadmap",
      "isfj-combination-boundary-risk",
      "Flexible Style by Role and Trust",
      "Borderline or balanced EI and TF results suggest that both social expression and decision criteria may shift with role, trust, and context. The person may coordinate visibly in one setting, process privately in another, and move between relational and analytical reasoning without contradiction. This flexibility is useful when it is conscious. Name which role and criterion are active before a difficult decision so adaptation does not become automatic accommodation or leave personal preferences unclear.",
    ),
    combinationRule(
      "isfj-combination-situational-structure",
      86,
      [
        dimension("SN", ["S", "N", "X"], ["borderline", "balanced"]),
        dimension("JP", ["J", "P", "X"], ["borderline", "balanced"]),
      ],
      "change-and-adaptation",
      "isfj-combination-change-flexibility",
      "Practical and Situationally Adaptable",
      "Borderline or balanced SN and JP results may combine practical grounding with situational flexibility. The person can use concrete evidence without insisting on precedent and can add structure when consequences require it without organising every task in advance. This supports adaptation, especially when expectations and minimum standards remain clear. Use explicit decision points: define what must stay reliable, what can remain open, and when new evidence will trigger a change in approach.",
    ),
    aggregateCombinationRule(
      "isfj-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "isfj-combination-change-flexibility",
      "A Provisional, Blended Profile",
      "Three or more low-confidence dimensions indicate that the type result should be read as provisional and blended. Situational behaviour, response style, or genuinely accessible neighbouring preferences may be shaping the code. The report remains useful when treated as a set of hypotheses rather than a fixed portrait. Compare selected rules with repeated real-world examples, avoid using the result to close options, and revisit interpretation if later evidence consistently supports a different pattern.",
    ),
    combinationRule(
      "isfj-combination-private-planning",
      84,
      [
        dimension("JP", ["J"], ["strong", "very-strong"]),
        dimension("EI", ["I"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "isfj-combination-boundary-risk",
      "Private Planning and Self-Contained Duty",
      "Strong J and I preferences may support careful private planning and self-contained responsibility. The person can prepare thoroughly and sustain commitments without requiring frequent external direction. A risk is waiting too long to request help because the plan, concern, and workload remain internal. Make ownership visible before execution begins, schedule a check-in before the pressure point, and ask for a specific contribution rather than presenting a problem only after every independent option has been exhausted.",
    ),
    combinationRule(
      "isfj-combination-possibility-adaptation",
      83,
      [
        dimension("SN", ["N"], [
          "borderline",
          "moderate",
          "strong",
          "very-strong",
        ]),
        dimension("JP", ["P"], [
          "borderline",
          "moderate",
          "strong",
          "very-strong",
        ]),
      ],
      "change-and-adaptation",
      "isfj-combination-change-flexibility",
      "Possibility and Adaptation Within Responsibility",
      "N-leaning and P-leaning results may bring greater openness to themes, possibilities, and changing routes within a responsibility-oriented ISFJ profile. The person may preserve commitment to people and outcomes while experimenting more readily with how those outcomes are achieved. This does not imply mistyping. The practical opportunity is to pair exploration with clear minimum standards, short review cycles, and evidence about who benefits over time, so flexibility remains purposeful rather than diffuse.",
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
    personalityType: "ISFJ",
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
    personalityType: "ISFJ",
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
