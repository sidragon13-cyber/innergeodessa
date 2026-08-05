import type {
  AggregateRuleCondition,
  AnalysedRuleInput,
  DimensionRuleCondition,
  ReportRuleCondition,
  ReportRuleDefinition,
  SelectedReportRule,
} from "./types";

export function matchesRule(
  rule: ReportRuleDefinition,
  analysedInput: AnalysedRuleInput,
): boolean {
  return (
    rule.personalityType === analysedInput.personalityType &&
    rule.conditions.every((condition) =>
      matchesCondition(condition, analysedInput),
    )
  );
}

export function selectReportRules(
  rules: readonly ReportRuleDefinition[],
  analysedInput: AnalysedRuleInput,
): SelectedReportRule[] {
  const matchingRules = rules
    .filter((rule) => matchesRule(rule, analysedInput))
    .slice()
    .sort(
      (left, right) =>
        right.priority - left.priority ||
        left.id.localeCompare(right.id),
    );
  const selectedGroups = new Set<string>();
  const selected: SelectedReportRule[] = [];

  for (const rule of matchingRules) {
    if (
      rule.exclusiveGroup &&
      selectedGroups.has(rule.exclusiveGroup)
    ) {
      continue;
    }
    if (rule.exclusiveGroup) {
      selectedGroups.add(rule.exclusiveGroup);
    }
    selected.push({
      ruleId: rule.id,
      priority: rule.priority,
      content: [...rule.content],
      matchedConditions: [...rule.conditions],
    });
  }

  return selected;
}

export function selectRulesForSlot(
  selectedRules: readonly SelectedReportRule[],
  targetSectionId: string,
  targetSlotId: string,
): SelectedReportRule[] {
  return selectedRules.filter((rule) =>
    rule.content.some(
      (content) =>
        content.targetSectionId === targetSectionId &&
        content.targetSlotId === targetSlotId,
    ),
  );
}

function matchesCondition(
  condition: ReportRuleCondition,
  input: AnalysedRuleInput,
): boolean {
  if (condition.kind === "dimension") {
    return matchesDimensionCondition(condition, input);
  }
  if (condition.kind === "aggregate") {
    return matchesAggregateCondition(condition, input);
  }
  return condition.all.every((item) =>
    matchesDimensionCondition(item, input),
  );
}

function matchesDimensionCondition(
  condition: DimensionRuleCondition,
  input: AnalysedRuleInput,
): boolean {
  const dimension = input.dimensions[condition.dimension];

  return (
    (!condition.preferences ||
      condition.preferences.includes(
        dimension.preference,
      )) &&
    (!condition.bands ||
      condition.bands.includes(dimension.band)) &&
    (condition.minConfidence === undefined ||
      dimension.confidence >= condition.minConfidence) &&
    (condition.maxConfidence === undefined ||
      dimension.confidence <= condition.maxConfidence)
  );
}

function matchesAggregateCondition(
  condition: AggregateRuleCondition,
  input: AnalysedRuleInput,
): boolean {
  const actual =
    condition.metric === "average-confidence"
      ? input.averageConfidence
      : condition.metric === "low-confidence-count"
        ? input.lowConfidenceCount
        : input.balancedCount;

  if (condition.operator === "eq") {
    return actual === condition.value;
  }
  if (condition.operator === "gte") {
    return actual >= condition.value;
  }
  return actual <= condition.value;
}
