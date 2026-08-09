import type {
  ReportRuleDefinition,
} from "../../rules";
import { localizeInfpRule } from "../localization";

export const INFP_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "infp-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the INFP result should be treated as a provisional hypothesis. Neighbouring preferences may be similarly available, and role, culture, stress, experience, language, or response style may substantially affect the visible pattern. Use the report to test questions about exploration and independence rather than defend a fixed identity. Give repeated lived evidence priority where the type-level description does not fit.",
    ),
    averageRule(
      "infp-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. Several INFP themes may be recognisable while adjacent preferences remain readily accessible. Long-range values-led narrative or private processing may be visible in one role and less prominent where trust, authority, energy, or expertise differs. Read the report for recurring tendencies rather than uniform behaviour, and notice whether opposite approaches reflect context, developed skill, or an equally natural option.",
    ),
    averageRule(
      "infp-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences may appear consistently across several familiar settings. INFP themes can therefore organise reflection, but consistency is not greater intelligence, maturity, values-led ability, or competence. Strong preferences can create repeatable strengths and blind spots. Use disconfirming evidence and complementary practices when independence becomes isolation, coherence becomes certainty, or quality becomes delay.",
    ),
    averageRule(
      "infp-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly familiar and readily available. This does not mean greater foresight, competence, maturity, or success. A clear values-led style can support concentration, while overuse may make collaboration, current detail, emotional evidence, or iterative release easier to dismiss. Practise complementary approaches before pressure makes the private narrative feel like the only credible route.",
    ),
    balancedRule(
      "infp-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. The INFP pattern may remain useful, but that letter should not be treated as fixed. Behaviour may change with role, trust, task, energy, or environment. This flexibility can broaden values-led and relational options rather than weaken the result. Notice which conditions draw out each side before making assumptions about privacy, abstraction, convictions, or structure.",
    ),
    balancedRule(
      "infp-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced, so the result is likely to describe a blended and context-sensitive pattern. The person may move between private and visible processing, abstract and concrete evidence, different decision convictions, or structure and flexibility depending on circumstances. Use the INFP report as a comparison framework and give repeated behaviour, values, capability, and situational evidence more weight than stereotypes.",
    ),
    balancedRule(
      "infp-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, making the INFP result highly provisional and sensitive to context. Multiple approaches may be similarly accessible, and small response changes could produce a neighbouring code. This may support flexibility, but it limits firm claims about how the person strategises, decides, communicates, or plans. Test each theme against lived evidence and avoid consequential choices based on the type result alone.",
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
  const localized = localizeInfpRule(`${id}-block`);
  return {
    id,
    personalityType: "INFP",
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
        targetSlotId: "infp-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title, zh: localized.title }, content: { en: content, zh: localized.content },
      },
    ],
    exclusiveGroup: "infp-average-confidence",
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
  const localized = localizeInfpRule(`${id}-block`);
  return {
    id,
    personalityType: "INFP",
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
        targetSlotId: "infp-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title, zh: localized.title }, content: { en: content, zh: localized.content },
      },
    ],
    exclusiveGroup: "infp-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
