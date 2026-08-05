import {
  DIMENSION_CODES,
} from "../../rules";
import type {
  DimensionCode,
  ReportRuleDefinition,
} from "../../rules";
import { ISFP_COMPLETE_REPORT } from "../report";
import { ISFP_COMBINATION_RULES } from "./combination-rules";
import { ISFP_CONFIDENCE_RULES } from "./confidence-rules";
import { ISFP_DIMENSION_RULES } from "./dimension-rules";

export const ISFP_REPORT_RULES:
  readonly ReportRuleDefinition[] = [
    ...ISFP_DIMENSION_RULES,
    ...ISFP_CONFIDENCE_RULES,
    ...ISFP_COMBINATION_RULES,
  ];

export interface IsfpRuleSetValidationResult {
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
  "isfp-confidence-average-low",
  "isfp-confidence-average-moderate",
  "isfp-confidence-average-strong",
  "isfp-confidence-average-very-strong",
  "isfp-balanced-count-1",
  "isfp-balanced-count-2",
  "isfp-balanced-count-3",
] as const;

const REQUIRED_COMBINATION_RULE_IDS = [
  "isfp-combination-private-expression",
  "isfp-combination-values-openness",
  "isfp-combination-reflection-paralysis",
  "isfp-combination-contextual-collaboration",
  "isfp-combination-evidence-led-adaptation",
  "isfp-combination-provisional-profile",
  "isfp-combination-outward-experiment",
  "isfp-combination-values-expression",
] as const;

export function validateIsfpRuleSet(
  rules: readonly ReportRuleDefinition[] =
    ISFP_REPORT_RULES,
): IsfpRuleSetValidationResult {
  const errors: string[] = [];
  const ruleIds = new Set<string>();
  const blockIds = new Set<string>();
  const targetSlots = collectTargetSlots();

  if (rules.length !== 51) {
    errors.push(
      `ISFP rule set must contain 51 rules; found ${rules.length}.`,
    );
  }

  rules.forEach((rule) => {
    if (ruleIds.has(rule.id)) {
      errors.push(`Duplicate rule id "${rule.id}".`);
    }
    ruleIds.add(rule.id);

    if (rule.personalityType !== "ISFP") {
      errors.push(
        `Rule ${rule.id} personalityType must be ISFP.`,
      );
    }
    if (!rule.id.startsWith("isfp-")) {
      errors.push(
        `Rule ${rule.id} must use the "isfp-" prefix.`,
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
      if (!content.blockId.startsWith("isfp-")) {
        errors.push(
          `Rule ${rule.id} block id must use the "isfp-" prefix.`,
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
        `ISFP ${group} rules are missing "${id}".`,
      );
    }
  });
}

function collectTargetSlots(): Map<string, Set<string>> {
  return new Map(
    ISFP_COMPLETE_REPORT.sections.map((section) => [
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
