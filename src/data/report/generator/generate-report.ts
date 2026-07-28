import {
  analyseRuleInput,
  selectReportRules,
} from "../rules";
import type {
  SelectedReportRule,
} from "../rules";
import type {
  ReportContentBlock,
  ReportDynamicSlot,
} from "../types";
import {
  getCompletePersonalityReport,
} from "./registry";
import {
  getReportRules,
} from "./rule-registry";
import type {
  GeneratePersonalityReportInput,
  GeneratedPersonalityReportResult,
} from "./types";

export function generatePersonalityReport(
  input: GeneratePersonalityReportInput,
): GeneratedPersonalityReportResult {
  const reportDefinition = getCompletePersonalityReport(
    input.personalityType,
  );

  if (!reportDefinition) {
    throw new Error(
      `Complete report is not available for personality type: ${input.personalityType}`,
    );
  }

  const analysedInput = analyseRuleInput({
    personalityType: input.personalityType,
    dimensions: input.dimensions,
  });

  const selectedRules = selectReportRules(
    getReportRules(input.personalityType),
    analysedInput,
  );

  const appliedRuleIds = new Set<string>();

  const sections = reportDefinition.sections
    .filter(
      (section) =>
        input.accessLevel === "premium" ||
        section.access === "free",
    )
    .map((section) => {
      const contentBlocks =
        section.contentBlocks.flatMap(
          (contentBlock) => [
            cloneContentBlock(contentBlock),
            ...createBlocksForSlots(
              section.id,
              contentBlock.dynamicSlots,
              selectedRules,
              appliedRuleIds,
            ),
          ],
        );

      contentBlocks.push(
        ...createBlocksForSlots(
          section.id,
          section.dynamicSlots,
          selectedRules,
          appliedRuleIds,
        ),
      );

      return {
        id: section.id,
        order: section.order,
        category: section.category,
        access: section.access,
        title: {
          ...section.title,
        },
        description: {
          ...section.description,
        },
        contentBlocks,
      };
    },
  );

  const generatedAt =
    input.generatedAt ?? new Date().toISOString();

  const appliedRuleIdList = [...appliedRuleIds];

  return {
    sessionId: input.sessionId,
    personalityType: reportDefinition.personalityType,
    version: {
      ...reportDefinition.version,
    },
    accessLevel: input.accessLevel,
    sections,
    generatedAt,
    metadata: {
      appliedRuleIds: appliedRuleIdList,
      appliedRuleCount: appliedRuleIdList.length,
      sourceReportVersion:
        reportDefinition.version.reportVersion,
      sourceContentVersion:
        reportDefinition.version.contentVersion,
      sourceRuleVersion:
        reportDefinition.version.ruleVersion,
    },
  };
}

function createBlocksForSlots(
  sectionId: string,
  slots: readonly ReportDynamicSlot[] | undefined,
  selectedRules: readonly SelectedReportRule[],
  appliedRuleIds: Set<string>,
): ReportContentBlock[] {
  if (!slots?.length) {
    return [];
  }

  return slots.flatMap((slot) =>
    selectedRules.flatMap((rule) =>
      rule.content
        .filter(
          (content) =>
            content.targetSectionId === sectionId &&
            content.targetSlotId === slot.id,
        )
        .map((content) => {
          appliedRuleIds.add(rule.ruleId);

          return {
            id: content.blockId,
            type: content.blockType,
            title: content.title
              ? { ...content.title }
              : undefined,
            content: {
              ...content.content,
            },
          };
        }),
    ),
  );
}

function cloneContentBlock(
  contentBlock: ReportContentBlock,
): ReportContentBlock {
  return {
    ...contentBlock,
    title: contentBlock.title
      ? { ...contentBlock.title }
      : undefined,
    content: {
      ...contentBlock.content,
    },
    dynamicSlots: contentBlock.dynamicSlots?.map(
      (slot) => ({
        ...slot,
        dimensions: slot.dimensions
          ? [...slot.dimensions]
          : undefined,
        ruleIds: slot.ruleIds
          ? [...slot.ruleIds]
          : undefined,
      }),
    ),
    ruleReferences:
      contentBlock.ruleReferences?.map(
        (reference) => ({
          ...reference,
        }),
      ),
  };
}
