import type {
  PersonalityTypeCode,
} from "../../../personality/types";
import type {
  DimensionRuleCondition,
  ReportRuleDefinition,
} from "../../rules";

const COMBINATIONS = [
  ["core-a", "core-personality-pattern", "combination-core"],
  ["core-b", "core-personality-pattern", "combination-core"],
  ["growth-a", "growth-roadmap", "combination-growth-risk"],
  ["growth-b", "growth-roadmap", "combination-growth-risk"],
  ["adaptation-a", "change-and-adaptation", "combination-adaptation"],
  ["adaptation-b", "change-and-adaptation", "combination-adaptation"],
  ["adjacent-a", "growth-roadmap", "combination-growth-risk"],
  ["adjacent-b", "change-and-adaptation", "combination-adaptation"],
] as const;

export function createTemplateCombinationRules(
  personalityType: PersonalityTypeCode,
): readonly ReportRuleDefinition[] {
  const prefix = personalityType.toLowerCase();

  return COMBINATIONS.map(
    ([suffix, sectionId, slotSuffix], index) => ({
      id: `${prefix}-combination-${suffix}`,
      personalityType,
      priority: 90 - index,
      conditions: [
        index === 5
          ? {
              kind: "aggregate" as const,
              metric: "low-confidence-count" as const,
              operator: "gte" as const,
              value: 3,
            }
          : {
              kind: "combination" as const,
              all: combinationConditions(index),
            },
      ],
      content: [{
        targetSectionId: sectionId,
        targetSlotId: `${prefix}-${slotSuffix}`,
        blockId: `${prefix}-combination-${suffix}-block`,
        blockType:
          sectionId === "growth-roadmap"
            ? "guidance" as const
            : "analysis" as const,
        title: {
          en: `[REPLACE: combination ${index + 1} title]`,
        },
        content: {
          en: `[REPLACE: original combination ${index + 1} interpretation and practical guidance.]`,
        },
      }],
      tags: ["combination"],
    }),
  );
}

function combinationConditions(
  index: number,
): DimensionRuleCondition[] {
  const pairs: readonly [
    DimensionRuleCondition,
    DimensionRuleCondition,
  ][] = [
    [dimension("EI", ["E"]), dimension("SN", ["N"])],
    [dimension("SN", ["N"]), dimension("JP", ["J"])],
    [dimension("TF", ["T"]), dimension("JP", ["J"])],
    [dimension("EI", ["I", "E", "X"]), dimension("TF", ["F", "T", "X"])],
    [dimension("SN", ["S", "N", "X"]), dimension("JP", ["J", "P", "X"])],
    [dimension("EI", ["I"]), dimension("SN", ["N"])],
    [dimension("EI", ["I"]), dimension("JP", ["P"])],
    [dimension("SN", ["N"]), dimension("TF", ["F"])],
  ];

  return [...pairs[index]];
}

function dimension(
  code: DimensionRuleCondition["dimension"],
  preferences: NonNullable<
    DimensionRuleCondition["preferences"]
  >,
): DimensionRuleCondition {
  return {
    kind: "dimension",
    dimension: code,
    preferences,
    bands: [
      "borderline",
      "moderate",
      "strong",
      "very-strong",
      "balanced",
    ],
  };
}
