import type {
  PersonalityTypeCode,
} from "../../personality/types";
import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
  COMPLETE_PERSONALITY_REPORT_VERSION,
} from "../report-standard";
import type {
  CompletePersonalityReportDefinition,
  ReportContentBlock,
  ReportDynamicSlot,
} from "../types";

const BLOCK_COUNTS = [
  1, 1, 1, 1, 1,
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  6, 4,
] as const;

/**
 * Copy this module into a real personality directory, replace every
 * `[REPLACE: ...]` value, then export a concrete report constant.
 * This factory deliberately does not contain a real personality code.
 */
export function createPersonalityReportTemplate(
  personalityType: PersonalityTypeCode,
): CompletePersonalityReportDefinition {
  const prefix = personalityType.toLowerCase();

  return {
    personalityType,
    version: {
      ...COMPLETE_PERSONALITY_REPORT_VERSION,
    },
    title: {
      en: `[REPLACE: ${personalityType} complete report title]`,
    },
    sections: COMPLETE_PERSONALITY_REPORT_STANDARD.map(
      (standard, index) => ({
        id: standard.id,
        order: standard.order,
        category: standard.category,
        access: standard.access,
        title: { ...standard.title },
        description: { ...standard.description },
        contentBlocks: createContentBlocks(
          prefix,
          standard.id,
          BLOCK_COUNTS[index],
        ),
      }),
    ),
  };
}

function createContentBlocks(
  prefix: string,
  sectionId: string,
  count: number,
): ReportContentBlock[] {
  return Array.from({ length: count }, (_, index) => {
    const blockNumber = index + 1;
    const methodologyStatement =
      sectionId === "methodology" && index === 0
        ? "This report is not a clinical diagnosis. [REPLACE: add complete methodology and responsible-use language.]"
        : `[REPLACE: original ${sectionId} content block ${blockNumber}.]`;
    const dynamicSlots = getDynamicSlots(
      prefix,
      sectionId,
      index,
    );

    return {
      id: `${prefix}-${sectionId}-block-${blockNumber}`,
      type: getBlockType(sectionId, index),
      title: {
        en: `[REPLACE: ${sectionId} block ${blockNumber} title]`,
      },
      content: { en: methodologyStatement },
      ...(dynamicSlots ? { dynamicSlots } : {}),
    };
  });
}

function getBlockType(
  sectionId: string,
  index: number,
): ReportContentBlock["type"] {
  if (sectionId === "ninety-day-action-plan") {
    return index < 3 ? "action" : "guidance";
  }
  if (sectionId === "methodology") {
    return index === 0 ? "analysis" : "evidence";
  }

  const premiumTypes: ReportContentBlock["type"][] = [
    "summary",
    "analysis",
    "strength",
    "risk",
    "guidance",
  ];
  return premiumTypes[index] ?? "summary";
}

function getDynamicSlots(
  prefix: string,
  sectionId: string,
  index: number,
): ReportDynamicSlot[] | undefined {
  if (index !== 0) {
    return undefined;
  }
  if (sectionId === "dimension-results") {
    return [
      dimensionSlot(prefix, "ei", "EI"),
      dimensionSlot(prefix, "sn", "SN"),
      dimensionSlot(prefix, "tf", "TF"),
      dimensionSlot(prefix, "jp", "JP"),
      {
        id: `${prefix}-overall-confidence`,
        source: "confidence",
        dimensions: ["EI", "SN", "TF", "JP"],
      },
    ];
  }
  if (sectionId === "core-personality-pattern") {
    return [
      {
        id: `${prefix}-combination-core`,
        source: "combination",
        dimensions: ["EI", "SN", "TF", "JP"],
      },
      {
        id: `${prefix}-balanced-dimensions`,
        source: "confidence",
        dimensions: ["EI", "SN", "TF", "JP"],
      },
    ];
  }
  if (sectionId === "change-and-adaptation") {
    return [{
      id: `${prefix}-combination-adaptation`,
      source: "combination",
      dimensions: ["EI", "SN", "TF", "JP"],
    }];
  }
  if (sectionId === "growth-roadmap") {
    return [{
      id: `${prefix}-combination-growth-risk`,
      source: "combination",
      dimensions: ["EI", "SN", "TF", "JP"],
    }];
  }
  return undefined;
}

function dimensionSlot(
  prefix: string,
  suffix: string,
  dimension: "EI" | "SN" | "TF" | "JP",
): ReportDynamicSlot {
  return {
    id: `${prefix}-${suffix}-dimension`,
    source: "dimension",
    dimensions: [dimension],
  };
}
