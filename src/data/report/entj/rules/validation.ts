import { ENTJ_COMPLETE_REPORT } from "../report";
import {
  DIMENSION_CODES,
} from "../../rules";
import type {
  DimensionBand,
  DimensionCode,
  DimensionRuleCondition,
  PreferenceLetter,
  ReportRuleCondition,
  ReportRuleDefinition,
} from "../../rules";
import { ENTJ_COMBINATION_RULES } from "./combination-rules";
import { ENTJ_CONFIDENCE_RULES } from "./confidence-rules";
import { ENTJ_DIMENSION_RULES } from "./dimension-rules";

export const ENTJ_REPORT_RULES:
  readonly ReportRuleDefinition[] = [
    ...ENTJ_DIMENSION_RULES,
    ...ENTJ_CONFIDENCE_RULES,
    ...ENTJ_COMBINATION_RULES,
  ];

export interface EntjRuleSetValidationResult {
  valid: boolean;
  errors: string[];
}

const REQUIRED_VARIANTS: Record<
  DimensionCode,
  readonly string[]
> = {
  EI: [
    "variant-I-borderline",
    "variant-I-moderate",
    "variant-I-strong",
    "variant-I-very-strong",
    "variant-X-balanced",
    "variant-E-borderline",
    "variant-E-moderate",
    "variant-E-strong",
    "variant-E-very-strong",
  ],
  SN: [
    "variant-S-borderline",
    "variant-S-moderate",
    "variant-S-strong",
    "variant-S-very-strong",
    "variant-X-balanced",
    "variant-N-borderline",
    "variant-N-moderate",
    "variant-N-strong",
    "variant-N-very-strong",
  ],
  TF: [
    "variant-F-borderline",
    "variant-F-moderate",
    "variant-F-strong",
    "variant-F-very-strong",
    "variant-X-balanced",
    "variant-T-borderline",
    "variant-T-moderate",
    "variant-T-strong",
    "variant-T-very-strong",
  ],
  JP: [
    "variant-J-borderline",
    "variant-J-moderate",
    "variant-J-strong",
    "variant-J-very-strong",
    "variant-X-balanced",
    "variant-P-borderline",
    "variant-P-moderate",
    "variant-P-strong",
    "variant-P-very-strong",
  ],
};

const REQUIRED_AVERAGE_RULES = [
  {
    id: "entj-confidence-average-low",
    minimum: 0,
    maximum: 15,
  },
  {
    id: "entj-confidence-average-moderate",
    minimum: 16,
    maximum: 40,
  },
  {
    id: "entj-confidence-average-strong",
    minimum: 41,
    maximum: 70,
  },
  {
    id: "entj-confidence-average-very-strong",
    minimum: 71,
    maximum: 100,
  },
] as const;

const REQUIRED_BALANCED_RULES = [
  { id: "entj-balanced-count-1", minimum: 1 },
  { id: "entj-balanced-count-2", minimum: 2 },
  { id: "entj-balanced-count-3", minimum: 3 },
] as const;

const REQUIRED_COMBINATION_RULE_IDS = [
  "entj-combination-visible-command",
  "entj-combination-strategic-execution",
  "entj-combination-control-risk",
  "entj-combination-flexible-leadership",
  "entj-combination-adaptive-strategy",
  "entj-combination-provisional-profile",
  "entj-combination-private-strategy",
  "entj-combination-stakeholder-integration",
] as const;

const AGGREGATE_METRICS = [
  "average-confidence",
  "low-confidence-count",
  "balanced-count",
] as const;

const AGGREGATE_OPERATORS = [
  "eq",
  "gte",
  "lte",
] as const;

const PREFERENCE_LETTERS: readonly PreferenceLetter[] = [
  "E",
  "I",
  "S",
  "N",
  "T",
  "F",
  "J",
  "P",
  "X",
];

const DIMENSION_BANDS: readonly DimensionBand[] = [
  "balanced",
  "borderline",
  "moderate",
  "strong",
  "very-strong",
];

export function validateEntjRuleSet(
  rules: readonly ReportRuleDefinition[] =
    ENTJ_REPORT_RULES,
): EntjRuleSetValidationResult {
  const errors: string[] = [];
  const ruleIds = new Set<string>();
  const blockIds = new Set<string>();
  const exclusivePriorities = new Map<
    string,
    Set<number>
  >();
  const targetSlots = collectTargetSlots();

  rules.forEach((rule) => {
    if (ruleIds.has(rule.id)) {
      errors.push(`Duplicate rule id "${rule.id}".`);
    }
    ruleIds.add(rule.id);

    if (rule.personalityType !== "ENTJ") {
      errors.push(
        `Rule ${rule.id} personalityType must be ENTJ.`,
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

    rule.conditions.forEach((condition) =>
      validateCondition(rule.id, condition, errors),
    );
    validateExclusivePriority(
      rule,
      exclusivePriorities,
      errors,
    );
    validateContent(
      rule,
      blockIds,
      targetSlots,
      errors,
    );
  });

  validateDimensionCoverage(rules, errors);
  validateConfidenceCoverage(rules, errors);
  validateCombinationCoverage(rules, ruleIds, errors);

  return {
    valid: errors.length === 0,
    errors,
  };
}

function collectTargetSlots(): Map<string, Set<string>> {
  return new Map(
    ENTJ_COMPLETE_REPORT.sections.map((section) => [
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

function validateCondition(
  ruleId: string,
  condition: ReportRuleCondition,
  errors: string[],
): void {
  if (condition.kind === "dimension") {
    validateDimensionCondition(ruleId, condition, errors);
    return;
  }
  if (condition.kind === "combination") {
    if (condition.all.length === 0) {
      errors.push(
        `Rule ${ruleId} combination condition must not be empty.`,
      );
    }
    condition.all.forEach((dimensionCondition) =>
      validateDimensionCondition(
        ruleId,
        dimensionCondition,
        errors,
      ),
    );
    return;
  }
  if (condition.kind !== "aggregate") {
    errors.push(
      `Rule ${ruleId} has an unsupported condition kind.`,
    );
    return;
  }

  if (!AGGREGATE_METRICS.includes(condition.metric)) {
    errors.push(
      `Rule ${ruleId} uses an invalid aggregate metric.`,
    );
  }
  if (!AGGREGATE_OPERATORS.includes(condition.operator)) {
    errors.push(
      `Rule ${ruleId} uses an invalid aggregate operator.`,
    );
  }
  if (!Number.isFinite(condition.value)) {
    errors.push(
      `Rule ${ruleId} aggregate condition value must be finite.`,
    );
    return;
  }
  if (
    condition.metric === "average-confidence" &&
    (condition.value < 0 || condition.value > 100)
  ) {
    errors.push(
      `Rule ${ruleId} has invalid confidence bounds.`,
    );
  }
  if (
    condition.metric !== "average-confidence" &&
    (!Number.isInteger(condition.value) ||
      condition.value < 0 ||
      condition.value > 4)
  ) {
    errors.push(
      `Rule ${ruleId} aggregate count must be an integer from 0 to 4.`,
    );
  }
}

function validateDimensionCondition(
  ruleId: string,
  condition: DimensionRuleCondition,
  errors: string[],
): void {
  if (!DIMENSION_CODES.includes(condition.dimension)) {
    errors.push(
      `Rule ${ruleId} uses invalid dimension "${condition.dimension}".`,
    );
  }
  if (
    condition.preferences &&
    (condition.preferences.length === 0 ||
      condition.preferences.some(
        (preference) =>
          !PREFERENCE_LETTERS.includes(preference),
      ))
  ) {
    errors.push(
      `Rule ${ruleId} uses invalid dimension preferences.`,
    );
  }
  if (
    condition.bands &&
    (condition.bands.length === 0 ||
      condition.bands.some(
        (band) => !DIMENSION_BANDS.includes(band),
      ))
  ) {
    errors.push(
      `Rule ${ruleId} uses invalid dimension bands.`,
    );
  }

  const minimum = condition.minConfidence ?? 0;
  const maximum = condition.maxConfidence ?? 100;
  if (
    !Number.isFinite(minimum) ||
    !Number.isFinite(maximum) ||
    minimum < 0 ||
    maximum > 100 ||
    minimum > maximum
  ) {
    errors.push(
      `Rule ${ruleId} has invalid confidence bounds.`,
    );
  }
}

function validateExclusivePriority(
  rule: ReportRuleDefinition,
  priorities: Map<string, Set<number>>,
  errors: string[],
): void {
  if (!rule.exclusiveGroup) {
    return;
  }

  const groupPriorities =
    priorities.get(rule.exclusiveGroup) ??
    new Set<number>();
  if (groupPriorities.has(rule.priority)) {
    errors.push(
      `Exclusive group ${rule.exclusiveGroup} must use unique priorities; duplicate ${rule.priority}.`,
    );
  }
  groupPriorities.add(rule.priority);
  priorities.set(rule.exclusiveGroup, groupPriorities);
}

function validateContent(
  rule: ReportRuleDefinition,
  blockIds: Set<string>,
  targetSlots: Map<string, Set<string>>,
  errors: string[],
): void {
  rule.content.forEach((content) => {
    if (blockIds.has(content.blockId)) {
      errors.push(
        `Duplicate rule content block id "${content.blockId}".`,
      );
    }
    blockIds.add(content.blockId);

    const slots = targetSlots.get(content.targetSectionId);
    if (!slots) {
      errors.push(
        `Rule ${rule.id} target section "${content.targetSectionId}" does not exist.`,
      );
    } else if (!slots.has(content.targetSlotId)) {
      errors.push(
        `Rule ${rule.id} target slot "${content.targetSlotId}" does not exist in section "${content.targetSectionId}".`,
      );
    }

    if (!content.content.en?.trim()) {
      errors.push(
        `Rule ${rule.id} content ${content.blockId} must contain English text.`,
      );
    }
  });
}

function validateDimensionCoverage(
  rules: readonly ReportRuleDefinition[],
  errors: string[],
): void {
  DIMENSION_CODES.forEach((dimension) => {
    const dimensionRules = rules.filter(
      (rule) =>
        rule.tags?.includes("dimension") &&
        rule.tags.includes(`dimension-${dimension}`),
    );
    const tags = new Set(
      dimensionRules.flatMap((rule) => rule.tags ?? []),
    );

    if (dimensionRules.length !== 9) {
      errors.push(
        `${dimension} must contain exactly nine dimension variants.`,
      );
    }
    REQUIRED_VARIANTS[dimension].forEach((variant) => {
      if (!tags.has(variant)) {
        errors.push(
          `${dimension} is missing required variant "${variant}".`,
        );
      }
    });
  });
}

function validateConfidenceCoverage(
  rules: readonly ReportRuleDefinition[],
  errors: string[],
): void {
  REQUIRED_AVERAGE_RULES.forEach(
    ({ id, minimum, maximum }) => {
      const rule = rules.find((candidate) => candidate.id === id);
      if (!rule) {
        errors.push(
          `Missing average-confidence rule "${id}".`,
        );
        return;
      }
      if (
        !hasAggregateCondition(
          rule,
          "average-confidence",
          "gte",
          minimum,
        ) ||
        !hasAggregateCondition(
          rule,
          "average-confidence",
          "lte",
          maximum,
        )
      ) {
        errors.push(
          `Average-confidence rule "${id}" must cover ${minimum}–${maximum}.`,
        );
      }
    },
  );

  REQUIRED_BALANCED_RULES.forEach(({ id, minimum }) => {
    const rule = rules.find((candidate) => candidate.id === id);
    if (!rule) {
      errors.push(
        `Missing balanced-count rule "${id}".`,
      );
      return;
    }
    if (
      !hasAggregateCondition(
        rule,
        "balanced-count",
        "gte",
        minimum,
      )
    ) {
      errors.push(
        `Balanced-count rule "${id}" must cover ${minimum} or more.`,
      );
    }
  });
}

function validateCombinationCoverage(
  rules: readonly ReportRuleDefinition[],
  ruleIds: Set<string>,
  errors: string[],
): void {
  const combinationCount = rules.filter(
    (rule) => rule.tags?.includes("combination"),
  ).length;
  if (combinationCount !== 8) {
    errors.push(
      `ENTJ rule set must contain exactly eight combination rules; found ${combinationCount}.`,
    );
  }
  REQUIRED_COMBINATION_RULE_IDS.forEach((ruleId) => {
    if (!ruleIds.has(ruleId)) {
      errors.push(
        `Missing required combination rule "${ruleId}".`,
      );
    }
  });
}

function hasAggregateCondition(
  rule: ReportRuleDefinition,
  metric: "average-confidence" | "balanced-count",
  operator: "gte" | "lte",
  value: number,
): boolean {
  return rule.conditions.some(
    (condition) =>
      condition.kind === "aggregate" &&
      condition.metric === metric &&
      condition.operator === operator &&
      condition.value === value,
  );
}
