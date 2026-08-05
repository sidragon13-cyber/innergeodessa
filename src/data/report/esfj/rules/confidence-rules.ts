import type {
  ReportRuleDefinition,
} from "../../rules";

export const ESFJ_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "esfj-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the ESFJ result should be treated as a provisional working hypothesis. Neighbouring preferences may be similarly available, and role, culture, current stress, experience, language, or response style may substantially affect the visible pattern. Use the report to generate questions rather than defend a fixed identity. Compare each interpretation with repeated behaviour across settings, retain what produces useful recognition, and give greater weight to lived evidence where the type-level description does not fit.",
    ),
    averageRule(
      "esfj-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. Several ESFJ themes may be recognisable, while adjacent preferences remain readily available in ordinary situations. Interpersonal direction or decisiveness may appear strongly in one role and less visibly where trust, authority, energy, or expertise differs. Read the report for recurring tendencies rather than uniform behaviour. Notice which conditions bring each preference forward and whether the opposite approach reflects learned skill, contextual adaptation, or an equally natural option.",
    ),
    averageRule(
      "esfj-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences may appear with meaningful consistency across several familiar settings. This can make ESFJ themes a useful organising pattern, but consistency is not higher intelligence, maturity, ability, or coordination quality. Strong preferences can support repeatable strengths and repeatable blind spots. Use feedback, contradictory evidence, and opposite-preference strategies when the familiar approach produces excessive control, narrow consultation, weak adoption, or unsustainable effort.",
    ),
    averageRule(
      "esfj-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly consistent and readily available. This does not mean greater intelligence, competence, maturity, success, or coordination quality. A clear style can support decisive coordination, while overuse may make alternative evidence and working methods easier to dismiss. Preserve what works, seek feedback about recurring costs, and practise opposite approaches in low-risk situations before pressure makes the familiar response feel like the only valid option.",
    ),
    balancedRule(
      "esfj-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. The ESFJ pattern may remain useful, but that letter should not be treated as a fixed preference. Visible behaviour may change with role, community size, trust, task, energy, or environment. This flexibility can broaden interpersonal and interpersonal options rather than weaken the result. Give the balanced dimension its own contextual interpretation, and notice which conditions draw out each side before making assumptions about coordination, communication, or decision style.",
    ),
    balancedRule(
      "esfj-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced, so the result is likely to describe a more blended and context-sensitive pattern than a rigid four-letter label implies. The person may move between visible and private processing, conceptual and concrete evidence, different decision criteria, or structure and flexibility depending on circumstances. Use the ESFJ report as a framework for comparison, and give greater weight to repeated behaviour, shared values, capability, and situational evidence than to stereotypes attached to individual letters.",
    ),
    balancedRule(
      "esfj-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, making the ESFJ result highly provisional and sensitive to context. Multiple approaches may be similarly accessible, and small response changes could produce a neighbouring type code. This can support flexibility, but it reduces the usefulness of firm claims about how the person leads, decides, communicates, or adapts. Treat the report as a structured set of hypotheses, test each theme against lived evidence, and avoid making consequential choices from the four-letter result alone.",
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
    personalityType: "ESFJ",
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
        targetSlotId: "esfj-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title },
        content: { en: content },
      },
    ],
    exclusiveGroup: "esfj-average-confidence",
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
    personalityType: "ESFJ",
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
        targetSlotId: "esfj-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title },
        content: { en: content },
      },
    ],
    exclusiveGroup: "esfj-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
