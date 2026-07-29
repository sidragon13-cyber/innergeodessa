import type {
  ReportRuleDefinition,
} from "../../rules";

export const ENFP_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "enfp-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the ENFP result should be treated as a provisional hypothesis. Neighbouring preferences may be similarly available, and role, culture, stress, experience, language, or response style may substantially affect the visible pattern. Use the report to generate questions about exploration and commitment rather than defend a label. Compare each interpretation with repeated behaviour across settings and give lived evidence priority where the description does not fit.",
    ),
    averageRule(
      "enfp-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. Several ENFP themes may be recognisable while adjacent preferences remain readily accessible. Possibility generation or verbal exploration may appear strongly in one context and less visibly where trust, expertise, energy, or responsibility differs. Read the report for recurring tendencies rather than uniform behaviour, and notice whether opposite approaches reflect learned skill, situational adaptation, or an equally natural option.",
    ),
    averageRule(
      "enfp-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences may appear consistently across several familiar settings. ENFP themes can therefore be a useful organising pattern, but consistency is not greater creativity, intelligence, maturity, or adaptability. Strong preferences can create repeatable strengths and blind spots. Use feedback and opposite-preference practices when exploration becomes diffusion, invitation reduces trust, or flexibility weakens completion.",
    ),
    averageRule(
      "enfp-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences may feel highly familiar across settings. This does not indicate greater originality, authenticity, competence, or future success. Energetic possibility-making can invite meaningful change, while overuse may scatter promises or turn another person's hesitation into a problem to reframe. Practise completion, quiet listening, and concrete follow-through before enthusiasm becomes the only response that feels alive.",
    ),
    balancedRule(
      "enfp-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. The ENFP pattern may remain useful, but that letter should not be treated as fixed. Behaviour may change with role, group size, trust, task, energy, or environment. This flexibility can broaden exploration and execution options rather than weaken the result. Notice which conditions draw out each side before making assumptions about sociability, abstraction, values, or spontaneity.",
    ),
    balancedRule(
      "enfp-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced, so the result is likely to describe a blended and context-sensitive pattern rather than a rigid four-letter identity. The person may shift between interactive and private exploration, imaginative and concrete evidence, different decision criteria, or openness and closure. Use the ENFP report as a comparison framework and give repeated behaviour, values, skill, and context more weight than type stereotypes.",
    ),
    balancedRule(
      "enfp-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, making the ENFP result highly provisional and sensitive to context. Multiple approaches may be similarly accessible, and small response changes could produce a neighbouring code. This may support flexibility, but it limits firm claims about how the person explores, decides, communicates, or completes work. Test each report theme against lived evidence and avoid consequential choices based on the type result alone.",
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
    personalityType: "ENFP",
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
        targetSlotId: "enfp-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title },
        content: { en: content },
      },
    ],
    exclusiveGroup: "enfp-average-confidence",
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
    personalityType: "ENFP",
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
        targetSlotId: "enfp-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title },
        content: { en: content },
      },
    ],
    exclusiveGroup: "enfp-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
