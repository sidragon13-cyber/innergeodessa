import type {
  PersonalityTypeCode,
} from "../personality/types";
import {
  personalityTypeCodes,
} from "../personality/types";
import {
  generatePersonalityReport,
} from "./generator/generate-report";
import {
  getCompletePersonalityReport,
} from "./generator/registry";
import {
  getReportRules,
} from "./generator/rule-registry";
import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
} from "./report-standard";
import type {
  DimensionCode,
  DimensionResult,
  ReportRuleDefinition,
} from "./rules";
import type {
  CompletePersonalityReportDefinition,
  ReportContentBlock,
  ReportContentBlockType,
  ReportDynamicSlot,
  ReportSectionDefinition,
} from "./types";

const SIMPLE_VERSION_PATTERN = /^\d+\.\d+\.\d+$/;
const KEBAB_CASE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PLACEHOLDER_PATTERN =
  /\b(?:todo|tbd|lorem ipsum|coming soon)\b/i;
const MINIMUM_TITLE_LENGTH = 3;
const MINIMUM_DESCRIPTION_LENGTH = 20;
const MINIMUM_BODY_LENGTH = 40;

const REPORT_CONTENT_BLOCK_TYPES:
  readonly ReportContentBlockType[] = [
    "summary",
    "analysis",
    "evidence",
    "strength",
    "risk",
    "guidance",
    "example",
    "reflection",
    "action",
  ];

export interface CompleteReportSectionStandardEntry {
  order: number;
  id: string;
  title: string;
  access: "free" | "premium";
  contentRequired: true;
  minimumContentBlockCount: number;
}

export const COMPLETE_REPORT_SECTION_STANDARD:
  readonly CompleteReportSectionStandardEntry[] =
  Object.freeze(
    COMPLETE_PERSONALITY_REPORT_STANDARD.map((section) =>
      Object.freeze({
        order: section.order,
        id: section.id,
        title: section.title.en ?? "",
        access: section.access,
        contentRequired: true as const,
        minimumContentBlockCount:
          section.access === "premium" ? 4 : 1,
      }),
    ),
  );

export interface CompletePersonalityValidationIssue {
  personalityType: PersonalityTypeCode;
  path: string;
  message: string;
}

interface PendingPersonalityValidationIssue {
  path: string;
  message: string;
}

export interface CompletePersonalityValidationResult {
  valid: boolean;
  issues: CompletePersonalityValidationIssue[];
}

export function validateCompletePersonalityDefinition(
  personalityType: PersonalityTypeCode,
  definition: CompletePersonalityReportDefinition,
  rules: readonly ReportRuleDefinition[],
): CompletePersonalityValidationResult {
  const issues: PendingPersonalityValidationIssue[] = [];

  validateDefinitionIdentity(
    personalityType,
    definition,
    issues,
  );
  validateIdentityTypeReferences(
    personalityType,
    definition,
    issues,
  );
  validateVersions(definition, issues);
  validateSections(definition, issues);
  validateRules(personalityType, definition, rules, issues);
  validateGeneratorCompatibility(
    personalityType,
    definition,
    rules,
    issues,
  );

  return {
    valid: issues.length === 0,
    issues: issues.map((issue) => ({
      personalityType,
      ...issue,
    })),
  };
}

function validateDefinitionIdentity(
  personalityType: PersonalityTypeCode,
  definition: CompletePersonalityReportDefinition,
  issues: PendingPersonalityValidationIssue[],
): void {
  if (definition.personalityType !== personalityType) {
    addIssue(
      issues,
      "personalityType",
      `must be "${personalityType}"; found "${definition.personalityType}".`,
    );
  }

  validateText(
    "title",
    definition.title.en,
    MINIMUM_TITLE_LENGTH,
    issues,
  );
}

function validateIdentityTypeReferences(
  personalityType: PersonalityTypeCode,
  definition: CompletePersonalityReportDefinition,
  issues: PendingPersonalityValidationIssue[],
): void {
  const identity = definition.sections.find(
    (section) => section.id === "report-identity",
  );
  const identityText = [
    definition.title.en,
    identity?.description.en,
    ...(identity?.contentBlocks ?? []).flatMap(
      (block) => [
        block.title?.en,
        block.content.en,
      ],
    ),
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  personalityTypeCodes.forEach((otherType) => {
    if (
      otherType !== personalityType &&
      new RegExp(`\\b${otherType}\\b`).test(identityText)
    ) {
      addIssue(
        issues,
        "definition.reportIdentity",
        `must not identify another personality type "${otherType}".`,
      );
    }
  });
}

function validateVersions(
  definition: CompletePersonalityReportDefinition,
  issues: PendingPersonalityValidationIssue[],
): void {
  for (const key of [
    "reportVersion",
    "contentVersion",
    "ruleVersion",
  ] as const) {
    const version = definition.version[key];
    if (!SIMPLE_VERSION_PATTERN.test(version)) {
      addIssue(
        issues,
        `version.${key}`,
        `must use semantic version format such as "1.0.0"; found "${version}".`,
      );
    }
  }
}

function validateSections(
  definition: CompletePersonalityReportDefinition,
  issues: PendingPersonalityValidationIssue[],
): void {
  const sectionIds = new Set<string>();
  const sectionOrders = new Set<number>();
  const blockIds = new Set<string>();
  const slotIds = new Set<string>();

  if (
    definition.sections.length !==
    COMPLETE_REPORT_SECTION_STANDARD.length
  ) {
    addIssue(
      issues,
      "sections",
      `must contain exactly ${COMPLETE_REPORT_SECTION_STANDARD.length} canonical sections; found ${definition.sections.length}.`,
    );
  }

  definition.sections.forEach((section, index) => {
    const path = `sections[${index}]`;
    const standard =
      COMPLETE_REPORT_SECTION_STANDARD[index];

    validateSectionIdentity(
      section,
      standard,
      path,
      sectionIds,
      sectionOrders,
      issues,
    );
    validateSectionContent(
      section,
      standard,
      path,
      blockIds,
      slotIds,
      issues,
    );
  });

  COMPLETE_REPORT_SECTION_STANDARD.forEach((standard) => {
    if (!sectionIds.has(standard.id)) {
      addIssue(
        issues,
        `sections.${standard.id}`,
        `canonical section "${standard.id}" is missing.`,
      );
    }
  });
}

function validateSectionIdentity(
  section: ReportSectionDefinition,
  standard: CompleteReportSectionStandardEntry | undefined,
  path: string,
  sectionIds: Set<string>,
  sectionOrders: Set<number>,
  issues: PendingPersonalityValidationIssue[],
): void {
  if (sectionIds.has(section.id)) {
    addIssue(
      issues,
      `${path}.id`,
      `duplicates section id "${section.id}".`,
    );
  }
  sectionIds.add(section.id);

  if (sectionOrders.has(section.order)) {
    addIssue(
      issues,
      `${path}.order`,
      `duplicates section order ${section.order}.`,
    );
  }
  sectionOrders.add(section.order);

  if (!KEBAB_CASE_PATTERN.test(section.id)) {
    addIssue(
      issues,
      `${path}.id`,
      "must use lowercase kebab-case.",
    );
  }

  if (standard) {
    if (section.order !== standard.order) {
      addIssue(
        issues,
        `${path}.order`,
        `must be ${standard.order}; found ${section.order}.`,
      );
    }
    if (section.id !== standard.id) {
      addIssue(
        issues,
        `${path}.id`,
        `must be canonical id "${standard.id}"; found "${section.id}".`,
      );
    }
    if (section.access !== standard.access) {
      addIssue(
        issues,
        `${path}.access`,
        `must be "${standard.access}"; found "${section.access}".`,
      );
    }
    if (section.title.en !== standard.title) {
      addIssue(
        issues,
        `${path}.title.en`,
        `must use canonical title "${standard.title}".`,
      );
    }
  }

  validateText(
    `${path}.title.en`,
    section.title.en,
    MINIMUM_TITLE_LENGTH,
    issues,
  );
  validateText(
    `${path}.description.en`,
    section.description.en,
    MINIMUM_DESCRIPTION_LENGTH,
    issues,
  );
}

function validateSectionContent(
  section: ReportSectionDefinition,
  standard: CompleteReportSectionStandardEntry | undefined,
  path: string,
  blockIds: Set<string>,
  slotIds: Set<string>,
  issues: PendingPersonalityValidationIssue[],
): void {
  const minimum = standard?.minimumContentBlockCount ?? 1;
  if (section.contentBlocks.length < minimum) {
    addIssue(
      issues,
      `${path}.contentBlocks`,
      `must contain at least ${minimum} meaningful content block${minimum === 1 ? "" : "s"}; found ${section.contentBlocks.length}.`,
    );
  }

  section.contentBlocks.forEach((block, blockIndex) =>
    validateContentBlock(
      block,
      `${path}.contentBlocks[${blockIndex}]`,
      blockIds,
      slotIds,
      issues,
    ),
  );

  validateSlots(
    section.dynamicSlots,
    `${path}.dynamicSlots`,
    slotIds,
    issues,
  );
}

function validateContentBlock(
  block: ReportContentBlock,
  path: string,
  blockIds: Set<string>,
  slotIds: Set<string>,
  issues: PendingPersonalityValidationIssue[],
): void {
  if (blockIds.has(block.id)) {
    addIssue(
      issues,
      `${path}.id`,
      `duplicates content block id "${block.id}".`,
    );
  }
  blockIds.add(block.id);

  if (!KEBAB_CASE_PATTERN.test(block.id)) {
    addIssue(
      issues,
      `${path}.id`,
      "must use lowercase kebab-case.",
    );
  }

  if (!REPORT_CONTENT_BLOCK_TYPES.includes(block.type)) {
    addIssue(
      issues,
      `${path}.type`,
      `contains unsupported content-block type "${block.type}".`,
    );
  }

  validateText(
    `${path}.title.en`,
    block.title?.en,
    MINIMUM_TITLE_LENGTH,
    issues,
  );
  validateText(
    `${path}.content.en`,
    block.content.en,
    MINIMUM_BODY_LENGTH,
    issues,
  );
  validateSlots(
    block.dynamicSlots,
    `${path}.dynamicSlots`,
    slotIds,
    issues,
  );
}

function validateSlots(
  slots: readonly ReportDynamicSlot[] | undefined,
  path: string,
  slotIds: Set<string>,
  issues: PendingPersonalityValidationIssue[],
): void {
  slots?.forEach((slot, index) => {
    if (slotIds.has(slot.id)) {
      addIssue(
        issues,
        `${path}[${index}].id`,
        `duplicates dynamic slot id "${slot.id}".`,
      );
    }
    slotIds.add(slot.id);
  });
}

function validateRules(
  personalityType: PersonalityTypeCode,
  definition: CompletePersonalityReportDefinition,
  rules: readonly ReportRuleDefinition[],
  issues: PendingPersonalityValidationIssue[],
): void {
  const ruleIds = new Set<string>();
  const ruleBlockIds = new Set<string>();
  const targetSlots = collectTargetSlots(definition);

  if (rules.length === 0) {
    addIssue(
      issues,
      "rules",
      "must contain a complete dynamic rule set.",
    );
  }

  rules.forEach((rule, ruleIndex) => {
    const path = `rules[${ruleIndex}]`;

    if (ruleIds.has(rule.id)) {
      addIssue(
        issues,
        `${path}.id`,
        `duplicates rule id "${rule.id}".`,
      );
    }
    ruleIds.add(rule.id);

    if (rule.personalityType !== personalityType) {
      addIssue(
        issues,
        `${path}.personalityType`,
        `must be "${personalityType}"; found "${rule.personalityType}".`,
      );
    }
    if (!Number.isInteger(rule.priority)) {
      addIssue(
        issues,
        `${path}.priority`,
        "must be an integer.",
      );
    }
    if (rule.conditions.length === 0) {
      addIssue(
        issues,
        `${path}.conditions`,
        "must contain at least one condition.",
      );
    }
    if (rule.content.length === 0) {
      addIssue(
        issues,
        `${path}.content`,
        "must contain at least one content item.",
      );
    }

    rule.content.forEach((content, contentIndex) => {
      const contentPath =
        `${path}.content[${contentIndex}]`;
      const slots = targetSlots.get(
        content.targetSectionId,
      );

      if (!slots) {
        addIssue(
          issues,
          `${contentPath}.targetSectionId`,
          `references unknown section "${content.targetSectionId}".`,
        );
      } else if (!slots.has(content.targetSlotId)) {
        addIssue(
          issues,
          `${contentPath}.targetSlotId`,
          `references unknown slot "${content.targetSlotId}" in section "${content.targetSectionId}".`,
        );
      }

      if (ruleBlockIds.has(content.blockId)) {
        addIssue(
          issues,
          `${contentPath}.blockId`,
          `duplicates dynamic content block id "${content.blockId}".`,
        );
      }
      ruleBlockIds.add(content.blockId);

      if (
        !REPORT_CONTENT_BLOCK_TYPES.includes(
          content.blockType,
        )
      ) {
        addIssue(
          issues,
          `${contentPath}.blockType`,
          `contains unsupported content-block type "${content.blockType}".`,
        );
      }

      if (content.title) {
        validateText(
          `${contentPath}.title.en`,
          content.title.en,
          MINIMUM_TITLE_LENGTH,
          issues,
        );
      }
      validateText(
        `${contentPath}.content.en`,
        content.content.en,
        MINIMUM_BODY_LENGTH,
        issues,
      );
    });
  });
}

function validateGeneratorCompatibility(
  personalityType: PersonalityTypeCode,
  definition: CompletePersonalityReportDefinition,
  rules: readonly ReportRuleDefinition[],
  issues: PendingPersonalityValidationIssue[],
): void {
  if (
    getCompletePersonalityReport(personalityType) !==
    definition
  ) {
    addIssue(
      issues,
      "generator.definition",
      "must be the definition registered with the report generator.",
    );
    return;
  }

  if (getReportRules(personalityType) !== rules) {
    addIssue(
      issues,
      "generator.rules",
      "must be the rule set registered with the report generator.",
    );
    return;
  }

  try {
    const generated = generatePersonalityReport({
      sessionId:
        `complete-${personalityType.toLowerCase()}-validation`,
      personalityType,
      dimensions: createValidationDimensions(),
      accessLevel: "premium",
      generatedAt: "2026-07-28T00:00:00.000Z",
    });

    if (
      generated.sections.length !==
      COMPLETE_REPORT_SECTION_STANDARD.length
    ) {
      addIssue(
        issues,
        "generator.sections",
        `must generate ${COMPLETE_REPORT_SECTION_STANDARD.length} sections; found ${generated.sections.length}.`,
      );
    }
    if (
      rules.length > 0 &&
      generated.metadata.appliedRuleCount === 0
    ) {
      addIssue(
        issues,
        "generator.metadata.appliedRuleCount",
        "must demonstrate compatible applied-rule metadata.",
      );
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "unknown generator error";
    addIssue(
      issues,
      "generator",
      `could not generate a complete report: ${message}.`,
    );
  }
}

function collectTargetSlots(
  definition: CompletePersonalityReportDefinition,
): Map<string, Set<string>> {
  return new Map(
    definition.sections.map((section) => [
      section.id,
      new Set([
        ...(section.dynamicSlots ?? []).map(
          (slot) => slot.id,
        ),
        ...section.contentBlocks.flatMap((block) =>
          (block.dynamicSlots ?? []).map(
            (slot) => slot.id,
          ),
        ),
      ]),
    ]),
  );
}

function createValidationDimensions(): Record<
  DimensionCode,
  DimensionResult
> {
  return {
    EI: { dimension: "EI", score: 50, confidence: 80 },
    SN: { dimension: "SN", score: 50, confidence: 80 },
    TF: { dimension: "TF", score: 50, confidence: 80 },
    JP: { dimension: "JP", score: 50, confidence: 80 },
  };
}

function validateText(
  path: string,
  value: string | undefined,
  minimumLength: number,
  issues: PendingPersonalityValidationIssue[],
): void {
  const text = value?.trim() ?? "";

  if (!text) {
    addIssue(issues, path, "must not be empty.");
    return;
  }
  if (text.length < minimumLength) {
    addIssue(
      issues,
      path,
      `must contain at least ${minimumLength} meaningful characters.`,
    );
  }
  if (PLACEHOLDER_PATTERN.test(text)) {
    addIssue(
      issues,
      path,
      "must not contain placeholder text.",
    );
  }
}

function addIssue(
  issues: PendingPersonalityValidationIssue[],
  path: string,
  message: string,
): void {
  issues.push({ path, message });
}
