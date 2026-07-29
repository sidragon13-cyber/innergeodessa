import type {
  PersonalityTypeCode,
} from "../../../personality/types";
import type {
  ReportRuleDefinition,
} from "../../rules";

export function createTemplateConfidenceRules(
  personalityType: PersonalityTypeCode,
): readonly ReportRuleDefinition[] {
  const prefix = personalityType.toLowerCase();

  return [
    averageRule(personalityType, prefix, "low", 15, 0, 15),
    averageRule(
      personalityType,
      prefix,
      "moderate",
      25,
      16,
      40,
    ),
    averageRule(
      personalityType,
      prefix,
      "strong",
      35,
      41,
      70,
    ),
    averageRule(
      personalityType,
      prefix,
      "very-strong",
      45,
      71,
      100,
    ),
    balancedRule(personalityType, prefix, 1, 110),
    balancedRule(personalityType, prefix, 2, 120),
    balancedRule(personalityType, prefix, 3, 130),
  ];
}

function averageRule(
  personalityType: PersonalityTypeCode,
  prefix: string,
  band: string,
  priority: number,
  minimum: number,
  maximum: number,
): ReportRuleDefinition {
  const id = `${prefix}-confidence-average-${band}`;

  return {
    id,
    personalityType,
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
    content: [{
      targetSectionId: "dimension-results",
      targetSlotId: `${prefix}-overall-confidence`,
      blockId: `${id}-block`,
      blockType: "guidance",
      title: {
        en: `[REPLACE: ${band} average confidence title]`,
      },
      content: {
        en: `[REPLACE: responsible ${band} confidence interpretation.]`,
      },
    }],
    exclusiveGroup: `${prefix}-average-confidence`,
    tags: ["confidence", "average-confidence"],
  };
}

function balancedRule(
  personalityType: PersonalityTypeCode,
  prefix: string,
  minimum: number,
  priority: number,
): ReportRuleDefinition {
  const id = `${prefix}-balanced-count-${minimum}`;

  return {
    id,
    personalityType,
    priority,
    conditions: [{
      kind: "aggregate",
      metric: "balanced-count",
      operator: "gte",
      value: minimum,
    }],
    content: [{
      targetSectionId: "core-personality-pattern",
      targetSlotId: `${prefix}-balanced-dimensions`,
      blockId: `${id}-block`,
      blockType: "analysis",
      title: {
        en: `[REPLACE: ${minimum}+ balanced dimensions title]`,
      },
      content: {
        en: `[REPLACE: responsible balanced-dimension interpretation.]`,
      },
    }],
    exclusiveGroup: `${prefix}-balanced-count`,
    tags: ["confidence", "balanced-count"],
  };
}
