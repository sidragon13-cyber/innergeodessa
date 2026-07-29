import {
  DIMENSION_CODES,
} from "../../rules";
import type {
  DimensionCode,
  ReportRuleDefinition,
} from "../../rules";
import { INFJ_COMPLETE_REPORT } from "../report";
import { INFJ_COMBINATION_RULES } from "./combination-rules";
import { INFJ_CONFIDENCE_RULES } from "./confidence-rules";
import { INFJ_DIMENSION_RULES } from "./dimension-rules";

export const INFJ_REPORT_RULES:
  readonly ReportRuleDefinition[] = [
    ...INFJ_DIMENSION_RULES,
    ...INFJ_CONFIDENCE_RULES,
    ...INFJ_COMBINATION_RULES,
  ];

export interface InfjRuleSetValidationResult {
  valid: boolean;
  errors: string[];
}

const REQUIRED_VARIANTS: Record<
  DimensionCode,
  readonly string[]
> = {
  EI: variants("I", "E"),
  SN: variants("S", "N"),
  TF: variants("F", "T"),
  JP: variants("J", "P"),
};

const REQUIRED_CONFIDENCE_RULE_IDS = [
  "infj-confidence-average-low",
  "infj-confidence-average-moderate",
  "infj-confidence-average-strong",
  "infj-confidence-average-very-strong",
  "infj-balanced-count-1",
  "infj-balanced-count-2",
  "infj-balanced-count-3",
] as const;

const REQUIRED_COMBINATION_RULE_IDS = [
  "infj-combination-private-meaning",
  "infj-combination-structured-guidance",
  "infj-combination-idealised-responsibility",
  "infj-combination-contextual-collaboration",
  "infj-combination-evidence-led-adaptation",
  "infj-combination-provisional-profile",
  "infj-combination-outward-guidance",
  "infj-combination-values-meaning",
] as const;

export function validateInfjRuleSet(
  rules: readonly ReportRuleDefinition[] =
    INFJ_REPORT_RULES,
): InfjRuleSetValidationResult {
  const errors: string[] = [];
  const ruleIds = new Set<string>();
  const blockIds = new Set<string>();
  const targetSlots = collectTargetSlots();

  if (rules.length !== 51) {
    errors.push(
      `INFJ rule set must contain 51 rules; found ${rules.length}.`,
    );
  }

  rules.forEach((rule) => {
    if (ruleIds.has(rule.id)) {
      errors.push(`Duplicate rule id "${rule.id}".`);
    }
    ruleIds.add(rule.id);

    if (rule.personalityType !== "INFJ") {
      errors.push(
        `Rule ${rule.id} personalityType must be INFJ.`,
      );
    }
    if (!rule.id.startsWith("infj-")) {
      errors.push(
        `Rule ${rule.id} must use the "infj-" prefix.`,
      );
    }
    if (!Number.isInteger(rule.priority)) {
      errors.push(
        `Rule ${rule.id} priority must be an integer.`,
      );
    }
    if (rule.conditions.length === 0) {
      errors.push(
        `Rule ${rule.id} must have at least one condition.`,
      );
    }
    if (rule.content.length === 0) {
      errors.push(
        `Rule ${rule.id} must have at least one content item.`,
      );
    }

    rule.content.forEach((content) => {
      if (blockIds.has(content.blockId)) {
        errors.push(
          `Duplicate rule content block id "${content.blockId}".`,
        );
      }
      blockIds.add(content.blockId);

      const slots = targetSlots.get(
        content.targetSectionId,
      );
      if (!slots) {
        errors.push(
          `Rule ${rule.id} target section "${content.targetSectionId}" does not exist.`,
        );
      } else if (!slots.has(content.targetSlotId)) {
        errors.push(
          `Rule ${rule.id} target slot "${content.targetSlotId}" does not exist in section "${content.targetSectionId}".`,
        );
      }
      if (!content.blockId.startsWith("infj-")) {
        errors.push(
          `Rule ${rule.id} block id must use the "infj-" prefix.`,
        );
      }
      if (!content.content.en?.trim()) {
        errors.push(
          `Rule ${rule.id} content must contain English text.`,
        );
      }
    });
  });

  validateDimensionCoverage(rules, errors);
  validateRequiredIds(
    ruleIds,
    REQUIRED_CONFIDENCE_RULE_IDS,
    "confidence",
    errors,
  );
  validateRequiredIds(
    ruleIds,
    REQUIRED_COMBINATION_RULE_IDS,
    "combination",
    errors,
  );

  return {
    valid: errors.length === 0,
    errors,
  };
}

function variants(
  first: string,
  second: string,
): readonly string[] {
  const bands = [
    "borderline",
    "moderate",
    "strong",
    "very-strong",
  ] as const;

  return [
    ...bands.map((band) => `variant-${first}-${band}`),
    "variant-X-balanced",
    ...bands.map((band) => `variant-${second}-${band}`),
  ];
}

function validateDimensionCoverage(
  rules: readonly ReportRuleDefinition[],
  errors: string[],
): void {
  DIMENSION_CODES.forEach((dimension) => {
    const dimensionRules = rules.filter(
      (rule) =>
        rule.tags?.includes(`dimension-${dimension}`),
    );
    const tags = new Set(
      dimensionRules.flatMap((rule) => rule.tags ?? []),
    );

    if (dimensionRules.length !== 9) {
      errors.push(
        `Dimension ${dimension} must have 9 variants; found ${dimensionRules.length}.`,
      );
    }
    REQUIRED_VARIANTS[dimension].forEach((variant) => {
      if (!tags.has(variant)) {
        errors.push(
          `Dimension ${dimension} is missing "${variant}".`,
        );
      }
    });
  });
}

function validateRequiredIds(
  actualIds: ReadonlySet<string>,
  requiredIds: readonly string[],
  group: string,
  errors: string[],
): void {
  requiredIds.forEach((id) => {
    if (!actualIds.has(id)) {
      errors.push(
        `INFJ ${group} rules are missing "${id}".`,
      );
    }
  });
}

function collectTargetSlots(): Map<string, Set<string>> {
  return new Map(
    INFJ_COMPLETE_REPORT.sections.map((section) => [
      section.id,
      new Set([
        ...(section.dynamicSlots ?? []).map(
          (slot) => slot.id,
        ),
        ...section.contentBlocks.flatMap(
          (contentBlock) =>
            (contentBlock.dynamicSlots ?? []).map(
              (slot) => slot.id,
            ),
        ),
      ]),
    ]),
  );
}
