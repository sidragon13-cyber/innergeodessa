import type {
  ReportRuleDefinition,
} from "../../rules";

export const ESFP_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "esfp-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the ESFP result should be treated as a provisional hypothesis. Neighbouring preferences may be similarly available, and role, culture, stress, experience, language, or response style may substantially affect the visible pattern. Use the report to generate questions about participation and commitment rather than defend a label. Compare each interpretation with repeated behaviour across settings and give lived evidence priority where the description does not fit.",
    ),
    averageRule(
      "esfp-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. Several ESFP themes may be recognisable while adjacent preferences remain readily accessible. Experience generation or verbal participation may appear strongly in one context and less visibly where trust, expertise, energy, or responsibility differs. Read the report for recurring tendencies rather than uniform behaviour, and notice whether opposite approaches reflect learned skill, situational adaptation, or an equally natural option.",
    ),
    averageRule(
      "esfp-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences may appear consistently across several familiar settings. ESFP themes can therefore be a useful organising pattern, but consistency is not greater creativity, intelligence, maturity, or adaptability. Strong preferences can create repeatable strengths and blind spots. Use feedback and opposite-preference practices when participation becomes diffusion, invitation reduces trust, or flexibility weakens completion.",
    ),
    averageRule(
      "esfp-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly familiar and readily available. This does not mean greater originality, competence, maturity, or immediate moment success. A clear exploratory style can support rapid learning, while overuse may make closure, routine evidence, emotional context, or sustained implementation easier to dismiss. Practise complementary approaches before pressure makes intellectual movement feel like the only valid response.",
    ),
    balancedRule(
      "esfp-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. The ESFP pattern may remain useful, but that letter should not be treated as fixed. Behaviour may change with role, group size, trust, task, energy, or environment. This flexibility can broaden participation and execution options rather than weaken the result. Notice which conditions draw out each side before making assumptions about sociability, abstraction, values, or spontaneity.",
    ),
    balancedRule(
      "esfp-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced, so the result is likely to describe a blended and context-sensitive pattern rather than a rigid four-letter identity. The ESFP participant may shift between interactive and private participation, imaginative and concrete evidence, different decision criteria, or openness and closure. Use the ESFP report as a comparison framework and give repeated behaviour, values, skill, and context more weight than type stereotypes.",
    ),
    balancedRule(
      "esfp-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, making the ESFP result highly provisional and sensitive to context. Multiple approaches may be similarly accessible, and small response changes could produce a neighbouring code. This may support flexibility, but it limits firm claims about how the ESFP participant explores, decides, communicates, or completes work. Test each report theme against lived evidence and avoid consequential choices based on the type result alone.",
    ),
  ];

function averageRule(
  id: string,
  priority: number,
  minimum: number,
  maximum: number,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "ESFP",
    priority,
    conditions: [
      {
        kind: "aggregate",
        metric: "average-confidence",
        operator: "gte",
        value: minimum,
      },
      {
        kind: "aggregate",
        metric: "average-confidence",
        operator: "lte",
        value: maximum,
      },
    ],
    content: [
      {
        targetSectionId: "dimension-results",
        targetSlotId: "esfp-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title },
        content: { en: content },
      },
    ],
    exclusiveGroup: "esfp-average-confidence",
    tags: ["confidence", "average-confidence"],
  };
}

function balancedRule(
  id: string,
  priority: number,
  minimum: number,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "ESFP",
    priority,
    conditions: [
      {
        kind: "aggregate",
        metric: "balanced-count",
        operator: "gte",
        value: minimum,
      },
    ],
    content: [
      {
        targetSectionId: "core-personality-pattern",
        targetSlotId: "esfp-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title },
        content: { en: content },
      },
    ],
    exclusiveGroup: "esfp-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
