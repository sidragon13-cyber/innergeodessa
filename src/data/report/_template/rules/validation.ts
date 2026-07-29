import type {
  CompletePersonalityReportDefinition,
} from "../../types";
import type {
  ReportRuleDefinition,
} from "../../rules";

export interface TemplateRuleValidationResult {
  valid: boolean;
  errors: string[];
}

export function validatePersonalityRuleTemplate(
  rules: readonly ReportRuleDefinition[],
  report: CompletePersonalityReportDefinition,
): TemplateRuleValidationResult {
  const errors: string[] = [];
  const ruleIds = new Set<string>();
  const blockIds = new Set<string>();
  const targets = collectTargets(report);

  if (rules.length !== 51) {
    errors.push(
      `Rule set must contain exactly 51 rules; found ${rules.length}.`,
    );
  }
  if (
    rules.some(
      (rule) =>
        rule.personalityType !== report.personalityType,
    )
  ) {
    errors.push(
      "Every rule must match the report personality type.",
    );
  }

  rules.forEach((rule) => {
    if (ruleIds.has(rule.id)) {
      errors.push(`Duplicate rule id "${rule.id}".`);
    }
    ruleIds.add(rule.id);

    rule.content.forEach((content) => {
      if (blockIds.has(content.blockId)) {
        errors.push(
          `Duplicate rule block id "${content.blockId}".`,
        );
      }
      blockIds.add(content.blockId);

      if (
        !targets
          .get(content.targetSectionId)
          ?.has(content.targetSlotId)
      ) {
        errors.push(
          `Unknown target ${content.targetSectionId}.${content.targetSlotId}.`,
        );
      }
      if (!content.content.en?.trim()) {
        errors.push(
          `Rule "${rule.id}" must contain English content.`,
        );
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

function collectTargets(
  report: CompletePersonalityReportDefinition,
): Map<string, Set<string>> {
  return new Map(
    report.sections.map((section) => [
      section.id,
      new Set([
        ...(section.dynamicSlots ?? []).map(
          (slot) => slot.id,
        ),
        ...section.contentBlocks.flatMap(
          (block) =>
            (block.dynamicSlots ?? []).map(
              (slot) => slot.id,
            ),
        ),
      ]),
    ]),
  );
}
