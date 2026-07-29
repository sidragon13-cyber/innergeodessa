import type {
  PersonalityTypeCode,
} from "../../../personality/types";
import type {
  DimensionBand,
  DimensionCode,
  PreferenceLetter,
  ReportRuleDefinition,
} from "../../rules";

const BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const satisfies readonly DimensionBand[];

const DIMENSIONS = [
  ["EI", "I", "E", "ei"],
  ["SN", "S", "N", "sn"],
  ["TF", "F", "T", "tf"],
  ["JP", "J", "P", "jp"],
] as const satisfies readonly [
  DimensionCode,
  PreferenceLetter,
  PreferenceLetter,
  string,
][];

/**
 * Replace every placeholder sentence with personality-specific prose.
 * The generated shape is exactly four dimensions × nine variants.
 */
export function createTemplateDimensionRules(
  personalityType: PersonalityTypeCode,
): readonly ReportRuleDefinition[] {
  const prefix = personalityType.toLowerCase();

  return DIMENSIONS.flatMap(
    ([dimension, first, second, slotSuffix]) => [
      ...BANDS.map((band, index) =>
        directionalRule(
          personalityType,
          prefix,
          dimension,
          slotSuffix,
          first,
          band,
          160 + index * 10,
        ),
      ),
      balancedRule(
        personalityType,
        prefix,
        dimension,
        slotSuffix,
      ),
      ...BANDS.map((band, index) =>
        directionalRule(
          personalityType,
          prefix,
          dimension,
          slotSuffix,
          second,
          band,
          120 + index * 10,
        ),
      ),
    ],
  );
}

function directionalRule(
  personalityType: PersonalityTypeCode,
  prefix: string,
  dimension: DimensionCode,
  slotSuffix: string,
  preference: PreferenceLetter,
  band: (typeof BANDS)[number],
  priority: number,
): ReportRuleDefinition {
  const id =
    `${prefix}-${dimension.toLowerCase()}-${preference.toLowerCase()}-${band}`;

  return {
    id,
    personalityType,
    priority,
    conditions: [{
      kind: "dimension",
      dimension,
      preferences: [preference],
      bands: [band],
    }],
    content: [{
      targetSectionId: "dimension-results",
      targetSlotId: `${prefix}-${slotSuffix}-dimension`,
      blockId: `${id}-block`,
      blockType: "analysis",
      title: {
        en: `[REPLACE: ${dimension} ${preference} ${band} title]`,
      },
      content: {
        en: `[REPLACE: original ${dimension} ${preference} ${band} interpretation and guidance.]`,
      },
    }],
    exclusiveGroup: `${prefix}-dimension-${dimension}`,
    tags: [
      "dimension",
      `dimension-${dimension}`,
      `variant-${preference}-${band}`,
    ],
  };
}

function balancedRule(
  personalityType: PersonalityTypeCode,
  prefix: string,
  dimension: DimensionCode,
  slotSuffix: string,
): ReportRuleDefinition {
  const id =
    `${prefix}-${dimension.toLowerCase()}-balanced`;

  return {
    id,
    personalityType,
    priority: 200,
    conditions: [{
      kind: "dimension",
      dimension,
      preferences: ["X"],
      bands: ["balanced"],
    }],
    content: [{
      targetSectionId: "dimension-results",
      targetSlotId: `${prefix}-${slotSuffix}-dimension`,
      blockId: `${id}-block`,
      blockType: "analysis",
      title: {
        en: `[REPLACE: ${dimension} balanced title]`,
      },
      content: {
        en: `[REPLACE: original ${dimension} balanced interpretation and guidance.]`,
      },
    }],
    exclusiveGroup: `${prefix}-dimension-${dimension}`,
    tags: [
      "dimension",
      `dimension-${dimension}`,
      "variant-X-balanced",
    ],
  };
}
