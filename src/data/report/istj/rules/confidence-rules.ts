import type {
  ReportRuleDefinition,
} from "../../rules";
import { localizeIstjRule } from "../localization";

export const ISTJ_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "istj-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the ISTJ result should be treated as a provisional hypothesis. Neighbouring preferences may be similarly available, and role, culture, strain, experience, language, or response style may substantially affect the visible pattern. Use the report to test questions about working plans and independence rather than defend a fixed identity. Give repeated lived evidence priority where the type-level description does not fit.",
    ),
    averageRule(
      "istj-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. Several ISTJ themes may be recognisable while adjacent preferences remain readily accessible. Long-range procedure or private processing may be visible in one role and less prominent where trust, authority, energy, or expertise differs. Read the report for recurring tendencies rather than uniform behaviour, and notice whether opposite approaches reflect context, developed skill, or an equally natural option.",
    ),
    averageRule(
      "istj-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences may appear consistently across several familiar settings. ISTJ themes can therefore organise reflection, but consistency is not greater intelligence, maturity, operational ability, or competence. Strong preferences can create repeatable strengths and blind spots. Use disconfirming evidence and complementary practices when independence becomes isolation, coherence becomes certainty, or quality becomes delay.",
    ),
    averageRule(
      "istj-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly familiar and readily available. This does not mean greater continuity awareness, competence, maturity, or success. A clear operational style can support concentration, while overuse may make collaboration, current detail, emotional evidence, or iterative release easier to dismiss. Practise complementary approaches before pressure makes the private model feel like the only credible route.",
    ),
    balancedRule(
      "istj-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. The ISTJ pattern may remain useful, but that letter should not be treated as fixed. Behaviour may adjustment with role, trust, task, energy, or environment. This flexibility can broaden operational and relational options rather than weaken the result. Notice which conditions draw out each side before making assumptions about privacy, generalisation, criteria, or structure.",
    ),
    balancedRule(
      "istj-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced, so the result is likely to describe a blended and context-sensitive pattern. The person may move between private and visible processing, abstract and concrete evidence, different judgement criteria, or structure and flexibility depending on circumstances. Use the ISTJ report as a comparison framework and give repeated behaviour, values, capability, and situational evidence more weight than stereotypes.",
    ),
    balancedRule(
      "istj-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, making the ISTJ result highly provisional and sensitive to context. Multiple approaches may be similarly accessible, and small response adjustments could produce a neighbouring code. This may support flexibility, but it limits firm claims about how the person strategises, decides, communicates, or plans. Test each theme against lived evidence and avoid consequential choices based on the type result alone.",
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
  const localized = localizeIstjRule(`${id}-block`);
  return {
    id,
    personalityType: "ISTJ",
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
        targetSlotId: "istj-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title, zh: localized.title },
        content: { en: content, zh: localized.content },
      },
    ],
    exclusiveGroup: "istj-average-confidence",
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
  const localized = localizeIstjRule(`${id}-block`);
  return {
    id,
    personalityType: "ISTJ",
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
        targetSlotId: "istj-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title, zh: localized.title },
        content: { en: content, zh: localized.content },
      },
    ],
    exclusiveGroup: "istj-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
