import type {
  PersonalityTypeCode,
} from "../personality/types";
import {
  getCompletePersonalityReport,
} from "./generator/registry";
import {
  getReportRules,
  hasReportRules,
} from "./generator/rule-registry";
import {
  CANONICAL_PERSONALITY_TYPES,
  PERSONALITY_IMPLEMENTATION_MANIFEST,
  validatePersonalityImplementationManifest,
} from "./personality-implementation-status";
import type {
  PersonalityImplementationStage,
  PersonalityImplementationStatus,
} from "./personality-implementation-status";
import {
  COMPLETE_REPORT_SECTION_STANDARD,
  validateCompletePersonalityDefinition,
} from "./personality-expansion-standard";
import type {
  ReportRuleDefinition,
} from "./rules";
import type {
  CompletePersonalityReportDefinition,
  ReportDynamicSlot,
} from "./types";

export type PersonalityBatchValidationSeverity =
  | "error"
  | "incomplete";

export interface PersonalityBatchValidationIssue {
  personalityType: string;
  path: string;
  message: string;
  severity: PersonalityBatchValidationSeverity;
}

export interface PersonalityTypeValidationResult {
  personalityType: PersonalityTypeCode;
  stages: readonly PersonalityImplementationStage[];
  valid: boolean;
  issues: PersonalityBatchValidationIssue[];
}

export interface PersonalityBatchValidationResult {
  valid: boolean;
  personalities: PersonalityTypeValidationResult[];
  issues: PersonalityBatchValidationIssue[];
}

interface RegisteredPersonalityImplementation {
  personalityType: PersonalityTypeCode;
  status: PersonalityImplementationStatus;
  definition: CompletePersonalityReportDefinition | null;
  rules: readonly ReportRuleDefinition[];
  rulesRegistered: boolean;
}

const DUPLICATION_EXEMPT_SECTION_IDS =
  new Set<string>(["methodology"]);

export function validatePersonalityTypes(
  personalityTypes: readonly PersonalityTypeCode[],
): PersonalityBatchValidationResult {
  const issues: PersonalityBatchValidationIssue[] = [];
  const requested = new Set<PersonalityTypeCode>();
  const implementations: RegisteredPersonalityImplementation[] =
    [];

  personalityTypes.forEach((personalityType, index) => {
    if (requested.has(personalityType)) {
      issues.push({
        personalityType,
        path: `personalityTypes[${index}]`,
        message: `duplicates selected personality type "${personalityType}".`,
        severity: "error",
      });
      return;
    }
    requested.add(personalityType);

    const status =
      PERSONALITY_IMPLEMENTATION_MANIFEST.find(
        (entry) =>
          entry.personalityType === personalityType,
      );
    if (!status) {
      issues.push({
        personalityType,
        path: "implementationManifest",
        message:
          "is missing from the implementation manifest.",
        severity: "error",
      });
      return;
    }

    implementations.push({
      personalityType,
      status,
      definition:
        getCompletePersonalityReport(personalityType),
      rules: getReportRules(personalityType),
      rulesRegistered: hasReportRules(personalityType),
    });
  });

  const perPersonalityIssues = new Map<
    PersonalityTypeCode,
    PersonalityBatchValidationIssue[]
  >();
  implementations.forEach((implementation) => {
    perPersonalityIssues.set(
      implementation.personalityType,
      validateRegisteredImplementation(implementation),
    );
  });

  for (const issue of validateCrossPersonalityConsistency(
    implementations,
  )) {
    const implementation = implementations.find(
      (candidate) =>
        candidate.personalityType ===
        issue.personalityType,
    );
    if (implementation) {
      perPersonalityIssues
        .get(implementation.personalityType)
        ?.push(issue);
    }
  }

  const personalities = implementations.map(
    (implementation) => {
      const personalityIssues =
        perPersonalityIssues.get(
          implementation.personalityType,
        ) ?? [];

      return {
        personalityType: implementation.personalityType,
        stages: implementation.status.stages,
        valid: !personalityIssues.some(
          (issue) => issue.severity === "error",
        ),
        issues: personalityIssues,
      };
    },
  );

  issues.push(
    ...personalities.flatMap(
      (personality) => personality.issues,
    ),
  );

  return {
    valid: !issues.some(
      (issue) => issue.severity === "error",
    ),
    personalities,
    issues,
  };
}

export function validateAllPersonalityTypes():
  PersonalityBatchValidationResult {
  const result = validatePersonalityTypes(
    CANONICAL_PERSONALITY_TYPES,
  );
  const manifestValidation =
    validatePersonalityImplementationManifest();
  const manifestIssues: PersonalityBatchValidationIssue[] =
    manifestValidation.issues.map((issue) => ({
      ...issue,
      severity: "error",
    }));
  const issues = [...manifestIssues, ...result.issues];

  return {
    valid: !issues.some(
      (issue) => issue.severity === "error",
    ),
    personalities: result.personalities,
    issues,
  };
}

function validateRegisteredImplementation(
  implementation: RegisteredPersonalityImplementation,
): PersonalityBatchValidationIssue[] {
  const {
    personalityType,
    status,
    definition,
    rules,
    rulesRegistered,
  } = implementation;
  const issues: PersonalityBatchValidationIssue[] = [];
  const complete = isComplete(status.stages);
  const inProgress = isInProgress(status.stages);
  const severity: PersonalityBatchValidationSeverity =
    complete ? "error" : "incomplete";

  if (status.stages.includes("not_started")) {
    if (definition || rulesRegistered) {
      issues.push({
        personalityType,
        path: "implementationStatus",
        message:
          'is marked "not_started" but has a registered report definition or rule set.',
        severity: "error",
      });
    }
    return issues;
  }

  if (inProgress) {
    issues.push({
      personalityType,
      path: "implementationStatus",
      message: `is truthfully incomplete at stages: ${status.stages.join(", ")}.`,
      severity: "incomplete",
    });
  }

  if (!definition) {
    issues.push({
      personalityType,
      path: "definition",
      message:
        "does not have a registered complete-report definition.",
      severity,
    });
    return issues;
  }

  validateInternalReferences(
    personalityType,
    definition,
    rules,
    severity,
    issues,
  );

  if (complete) {
    const completeValidation =
      validateCompletePersonalityDefinition(
        personalityType,
        definition,
        rules,
      );
    issues.push(
      ...completeValidation.issues.map((issue) => ({
        ...issue,
        severity: "error" as const,
      })),
    );
  } else {
    validateKnownIncompleteStructure(
      personalityType,
      definition,
      issues,
    );
    if (!rulesRegistered) {
      issues.push({
        personalityType,
        path: "rules",
        message:
          "has no registered rule-set entry while rules are in progress.",
        severity: "incomplete",
      });
    } else if (rules.length === 0) {
      issues.push({
        personalityType,
        path: "rules",
        message:
          "has a registered but empty dynamic rule set.",
        severity: "incomplete",
      });
    }
  }

  return issues;
}

function validateKnownIncompleteStructure(
  personalityType: PersonalityTypeCode,
  definition: CompletePersonalityReportDefinition,
  issues: PersonalityBatchValidationIssue[],
): void {
  if (
    definition.sections.length !==
    COMPLETE_REPORT_SECTION_STANDARD.length
  ) {
    issues.push({
      personalityType,
      path: "sections",
      message: `in-progress definition must retain ${COMPLETE_REPORT_SECTION_STANDARD.length} scaffold sections; found ${definition.sections.length}.`,
      severity: "incomplete",
    });
  }

  definition.sections.forEach((section, index) => {
    const standard =
      COMPLETE_REPORT_SECTION_STANDARD[index];
    if (
      !standard ||
      section.id !== standard.id ||
      section.order !== standard.order ||
      section.access !== standard.access
    ) {
      issues.push({
        personalityType,
        path: `sections[${index}]`,
        message:
          "does not match the known canonical scaffold structure.",
        severity: "incomplete",
      });
    }
  });
}

function validateInternalReferences(
  personalityType: PersonalityTypeCode,
  definition: CompletePersonalityReportDefinition,
  rules: readonly ReportRuleDefinition[],
  severity: PersonalityBatchValidationSeverity,
  issues: PersonalityBatchValidationIssue[],
): void {
  if (definition.personalityType !== personalityType) {
    issues.push({
      personalityType,
      path: "definition.personalityType",
      message: `registry key "${personalityType}" points to definition type "${definition.personalityType}".`,
      severity,
    });
  }

  validateIdentityReferences(
    personalityType,
    definition,
    severity,
    issues,
  );
  validateTypePrefixes(
    personalityType,
    definition,
    rules,
    severity,
    issues,
  );

  const targetSlots = collectTargetSlots(definition);
  rules.forEach((rule, ruleIndex) => {
    if (rule.personalityType !== personalityType) {
      issues.push({
        personalityType,
        path: `rules[${ruleIndex}].personalityType`,
        message: `must match owning personality "${personalityType}".`,
        severity,
      });
    }

    rule.content.forEach((content, contentIndex) => {
      const path = `rules[${ruleIndex}].content[${contentIndex}]`;
      const slots = targetSlots.get(
        content.targetSectionId,
      );
      if (!slots) {
        issues.push({
          personalityType,
          path: `${path}.targetSectionId`,
          message: `references unknown section "${content.targetSectionId}".`,
          severity,
        });
      } else if (!slots.has(content.targetSlotId)) {
        issues.push({
          personalityType,
          path: `${path}.targetSlotId`,
          message: `references unknown slot "${content.targetSlotId}".`,
          severity,
        });
      }
    });
  });
}

function validateIdentityReferences(
  personalityType: PersonalityTypeCode,
  definition: CompletePersonalityReportDefinition,
  severity: PersonalityBatchValidationSeverity,
  issues: PersonalityBatchValidationIssue[],
): void {
  const identity = definition.sections.find(
    (section) => section.id === "report-identity",
  );
  const identityText = [
    definition.title.en,
    identity?.description.en,
    ...(
      identity?.contentBlocks ?? []
    ).flatMap((block) => [
      block.title?.en,
      block.content.en,
    ]),
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  for (const otherType of CANONICAL_PERSONALITY_TYPES) {
    if (
      otherType !== personalityType &&
      new RegExp(`\\b${otherType}\\b`).test(identityText)
    ) {
      issues.push({
        personalityType,
        path: "definition.reportIdentity",
        message: `incorrectly identifies another personality type "${otherType}".`,
        severity,
      });
    }
  }
}

function validateTypePrefixes(
  personalityType: PersonalityTypeCode,
  definition: CompletePersonalityReportDefinition,
  rules: readonly ReportRuleDefinition[],
  severity: PersonalityBatchValidationSeverity,
  issues: PersonalityBatchValidationIssue[],
): void {
  const prefix = `${personalityType.toLowerCase()}-`;

  definition.sections.forEach((section, sectionIndex) => {
    section.contentBlocks.forEach((block, blockIndex) => {
      if (!block.id.startsWith(prefix)) {
        issues.push({
          personalityType,
          path: `sections[${sectionIndex}].contentBlocks[${blockIndex}].id`,
          message: `must use owning personality prefix "${prefix}".`,
          severity,
        });
      }
    });

    const slots = collectSectionSlots(section);
    slots.forEach((slot, slotIndex) => {
      if (!slot.id.startsWith(prefix)) {
        issues.push({
          personalityType,
          path: `sections[${sectionIndex}].dynamicSlots[${slotIndex}].id`,
          message: `must use owning personality prefix "${prefix}".`,
          severity,
        });
      }
    });
  });

  rules.forEach((rule, ruleIndex) => {
    if (!rule.id.startsWith(prefix)) {
      issues.push({
        personalityType,
        path: `rules[${ruleIndex}].id`,
        message: `must use owning personality prefix "${prefix}".`,
        severity,
      });
    }
    rule.content.forEach((content, contentIndex) => {
      if (!content.blockId.startsWith(prefix)) {
        issues.push({
          personalityType,
          path: `rules[${ruleIndex}].content[${contentIndex}].blockId`,
          message: `must use owning personality prefix "${prefix}".`,
          severity,
        });
      }
    });
  });
}

function validateCrossPersonalityConsistency(
  implementations: readonly RegisteredPersonalityImplementation[],
): PersonalityBatchValidationIssue[] {
  const issues: PersonalityBatchValidationIssue[] = [];
  const withDefinitions = implementations.filter(
    (
      implementation,
    ): implementation is RegisteredPersonalityImplementation & {
      definition: CompletePersonalityReportDefinition;
    } => implementation.definition !== null,
  );

  for (
    let leftIndex = 0;
    leftIndex < withDefinitions.length;
    leftIndex += 1
  ) {
    for (
      let rightIndex = leftIndex + 1;
      rightIndex < withDefinitions.length;
      rightIndex += 1
    ) {
      compareImplementations(
        withDefinitions[leftIndex],
        withDefinitions[rightIndex],
        issues,
      );
    }
  }

  return issues;
}

function compareImplementations(
  left: RegisteredPersonalityImplementation & {
    definition: CompletePersonalityReportDefinition;
  },
  right: RegisteredPersonalityImplementation & {
    definition: CompletePersonalityReportDefinition;
  },
  issues: PersonalityBatchValidationIssue[],
): void {
  if (
    normalizeText(left.definition.title.en) ===
    normalizeText(right.definition.title.en)
  ) {
    addDuplicationIssue(
      left,
      right,
      "definition.title.en",
      "duplicates the complete report title",
      issues,
    );
  }

  left.definition.sections.forEach((leftSection) => {
    if (
      DUPLICATION_EXEMPT_SECTION_IDS.has(
        leftSection.id,
      )
    ) {
      return;
    }
    const rightSection = right.definition.sections.find(
      (section) => section.id === leftSection.id,
    );
    if (!rightSection) {
      return;
    }

    const leftBody = normalizeText(
      leftSection.contentBlocks
        .map((block) => block.content.en ?? "")
        .join("\n"),
    );
    const rightBody = normalizeText(
      rightSection.contentBlocks
        .map((block) => block.content.en ?? "")
        .join("\n"),
    );
    if (
      leftBody.length >= 40 &&
      leftBody === rightBody
    ) {
      addDuplicationIssue(
        left,
        right,
        `sections.${leftSection.id}`,
        `duplicates the full "${leftSection.id}" section body`,
        issues,
      );
    }

    leftSection.contentBlocks.forEach((leftBlock) => {
      const leftContent = normalizeText(
        leftBlock.content.en,
      );
      if (leftContent.length < 40) {
        return;
      }
      const duplicateBlock =
        rightSection.contentBlocks.find(
          (rightBlock) =>
            normalizeText(rightBlock.content.en) ===
            leftContent,
        );
      if (duplicateBlock) {
        addDuplicationIssue(
          left,
          right,
          `sections.${leftSection.id}.contentBlocks.${leftBlock.id}`,
          `duplicates full content block "${duplicateBlock.id}"`,
          issues,
        );
      }
    });
  });
}

function addDuplicationIssue(
  left: RegisteredPersonalityImplementation,
  right: RegisteredPersonalityImplementation,
  path: string,
  message: string,
  issues: PersonalityBatchValidationIssue[],
): void {
  const leftComplete = isComplete(left.status.stages);
  const rightComplete = isComplete(right.status.stages);

  if (!leftComplete && rightComplete) {
    issues.push({
      personalityType: left.personalityType,
      path,
      message: `${message} from ${right.personalityType}.`,
      severity: "incomplete",
    });
    return;
  }
  if (leftComplete && !rightComplete) {
    issues.push({
      personalityType: right.personalityType,
      path,
      message: `${message} from ${left.personalityType}.`,
      severity: "incomplete",
    });
    return;
  }

  const severity: PersonalityBatchValidationSeverity =
    leftComplete ? "error" : "incomplete";
  issues.push(
    {
      personalityType: left.personalityType,
      path,
      message: `${message} from ${right.personalityType}.`,
      severity,
    },
    {
      personalityType: right.personalityType,
      path,
      message: `${message} from ${left.personalityType}.`,
      severity,
    },
  );
}

function collectTargetSlots(
  definition: CompletePersonalityReportDefinition,
): Map<string, Set<string>> {
  return new Map(
    definition.sections.map((section) => [
      section.id,
      new Set(
        collectSectionSlots(section).map(
          (slot) => slot.id,
        ),
      ),
    ]),
  );
}

function collectSectionSlots(
  section: CompletePersonalityReportDefinition["sections"][number],
): ReportDynamicSlot[] {
  return [
    ...(section.dynamicSlots ?? []),
    ...section.contentBlocks.flatMap(
      (block) => block.dynamicSlots ?? [],
    ),
  ];
}

function isComplete(
  stages: readonly PersonalityImplementationStage[],
): boolean {
  return (
    stages.includes("domain_complete") ||
    stages.includes("validated") ||
    stages.includes("frontend_enabled")
  );
}

function isInProgress(
  stages: readonly PersonalityImplementationStage[],
): boolean {
  return (
    stages.includes("content_in_progress") ||
    stages.includes("rules_in_progress")
  );
}

function normalizeText(value: string | undefined): string {
  return (value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}
