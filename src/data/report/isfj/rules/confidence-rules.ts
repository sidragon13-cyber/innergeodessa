import type {
  ReportRuleDefinition,
} from "../../rules";

export const ISFJ_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "isfj-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the four-letter result should be interpreted cautiously. Adjacent preferences may appear often, and situational behaviour, current stress, language, or response style may have influenced the pattern. The ISFJ report can still be useful as a working hypothesis: compare each section with lived examples, retain what is consistently helpful, and treat mismatches as evidence rather than failure. Avoid forcing a rigid identity around a result whose dimensions currently show limited differentiation.",
    ),
    averageRule(
      "isfj-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. The ISFJ pattern is likely to be recognisable, while neighbouring preferences may remain accessible in ordinary situations. Some sections may fit strongly and others only under particular roles or relationships. Use the report to identify repeatable tendencies rather than expecting uniform behaviour. Practical reflection should ask when the preference appears, what conditions strengthen it, and whether an opposite approach is a learned skill, a contextual adaptation, or an equally natural option.",
    ),
    averageRule(
      "isfj-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences appear with meaningful consistency. The report's ISFJ themes may therefore provide a useful organising pattern across several contexts. Consistency does not remove flexibility, and it does not indicate greater ability. Strong preferences can support dependable strengths while also making certain blind spots easier to repeat. Use opposite-preference strategies deliberately when the usual approach is producing overload, narrow evidence, or avoidable conflict.",
    ),
    averageRule(
      "isfj-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly consistent and readily available. This does not mean greater ability, maturity, or a better personality result. A very clear style can make strengths dependable, but it can also increase the cost of overusing familiar strategies. Read the report for both capability and constraint: preserve what works, seek feedback about recurring blind spots, and practise opposite approaches in low-risk settings before they are required under pressure.",
    ),
    balancedRule(
      "isfj-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. This suggests meaningful flexibility in that area and reduces confidence in treating every letter of the four-letter code as a fixed preference. Behaviour may change with role, trust, task, or environment. Use the ISFJ pattern as a broad organising hypothesis while giving the balanced dimension its own contextual interpretation. Notice which conditions draw out each side and whether the shift is chosen, skilled, or driven by pressure.",
    ),
    balancedRule(
      "isfj-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced. The result may describe a blended and context-sensitive pattern rather than a sharply bounded type. This can support flexibility because several approaches are readily available, but it also means a rigid four-letter description may overstate consistency. Compare report themes with concrete settings and relationships over time. Give greater weight to repeated behaviour and personal values than to assumptions attached to any single letter.",
    ),
    balancedRule(
      "isfj-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, so the ISFJ label should be treated as provisional and highly context-sensitive. Multiple approaches may be similarly available, and small changes in responses could produce a neighbouring type code. This flexibility can be valuable, yet it reduces the usefulness of rigid type claims. Use the report as a structured set of questions, test each theme against lived evidence, and avoid making major decisions from the four-letter result alone.",
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
    personalityType: "ISFJ",
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
        targetSlotId: "isfj-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title },
        content: { en: content },
      },
    ],
    exclusiveGroup: "isfj-average-confidence",
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
    personalityType: "ISFJ",
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
        targetSlotId: "isfj-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title },
        content: { en: content },
      },
    ],
    exclusiveGroup: "isfj-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
