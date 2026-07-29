import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
  validateCompletePersonalityReportStandard,
} from "../report-standard";
import type {
  CompletePersonalityReportDefinition,
  ReportDynamicSlot,
} from "../types";
import { ENFJ_COMPLETE_REPORT } from "./report";

export interface EnfjReportValidationResult {
  valid: boolean;
  errors: string[];
}

const REQUIRED_ACTION_PHASE_IDS = [
  "enfj-action-days-1-30",
  "enfj-action-days-31-60",
  "enfj-action-days-61-90",
] as const;

export function validateEnfjCompleteReport(
  report: CompletePersonalityReportDefinition =
    ENFJ_COMPLETE_REPORT,
): EnfjReportValidationResult {
  const errors: string[] = [];

  if (report.personalityType !== "ENFJ") {
    errors.push(
      `personalityType must be ENFJ; found "${report.personalityType}".`,
    );
  }

  if (
    report.sections.length !==
    COMPLETE_PERSONALITY_REPORT_STANDARD.length
  ) {
    errors.push(
      "ENFJ report must contain all 18 canonical sections.",
    );
  }

  const standardValidation =
    validateCompletePersonalityReportStandard(report.sections);
  errors.push(
    ...standardValidation.errors.map(
      (error) => `Canonical standard: ${error}`,
    ),
  );

  validateCanonicalAlignment(report, errors);
  validateContentBlocks(report, errors);
  validateDynamicSlots(report, errors);
  validateActionPlan(report, errors);
  validateMethodology(report, errors);

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateCanonicalAlignment(
  report: CompletePersonalityReportDefinition,
  errors: string[],
): void {
  COMPLETE_PERSONALITY_REPORT_STANDARD.forEach(
    (canonicalSection, index) => {
      const section = report.sections[index];
      if (!section) {
        errors.push(
          `Missing canonical section "${canonicalSection.id}" at order ${canonicalSection.order}.`,
        );
        return;
      }

      if (section.order !== canonicalSection.order) {
        errors.push(
          `Section at index ${index} order must match canonical order ${canonicalSection.order}.`,
        );
      }
      if (section.id !== canonicalSection.id) {
        errors.push(
          `Section at order ${canonicalSection.order} id must match canonical id "${canonicalSection.id}".`,
        );
      }
      if (section.category !== canonicalSection.category) {
        errors.push(
          `Section ${section.id} category must match canonical category "${canonicalSection.category}".`,
        );
      }
      if (section.access !== canonicalSection.access) {
        errors.push(
          `Section ${section.id} access must match canonical access "${canonicalSection.access}".`,
        );
      }
    },
  );
}

function validateContentBlocks(
  report: CompletePersonalityReportDefinition,
  errors: string[],
): void {
  const blockIds = new Set<string>();

  report.sections.forEach((section, index) => {
    const canonicalSection =
      COMPLETE_PERSONALITY_REPORT_STANDARD[index];
    const isPremium = canonicalSection?.access === "premium";

    if (isPremium && section.contentBlocks.length < 4) {
      errors.push(
        `Premium section ${section.id} must contain at least 4 content blocks.`,
      );
    }

    if (
      isPremium &&
      !section.contentBlocks.some(
        (block) =>
          block.type === "analysis" ||
          block.type === "summary",
      )
    ) {
      errors.push(
        `Premium section ${section.id} must include an analysis or summary block.`,
      );
    }

    if (
      isPremium &&
      !section.contentBlocks.some(
        (block) =>
          block.type === "risk" ||
          block.type === "guidance",
      )
    ) {
      errors.push(
        `Premium section ${section.id} must include a risk or guidance block.`,
      );
    }

    section.contentBlocks.forEach((block) => {
      if (blockIds.has(block.id)) {
        errors.push(
          `Duplicate content block id "${block.id}".`,
        );
      }
      blockIds.add(block.id);

      if (!block.content.en?.trim()) {
        errors.push(
          `Content block ${block.id} must contain English text.`,
        );
      }
    });
  });
}

function validateDynamicSlots(
  report: CompletePersonalityReportDefinition,
  errors: string[],
): void {
  const slotIds = new Set<string>();

  report.sections.forEach((section) => {
    const slots: ReportDynamicSlot[] = [
      ...(section.dynamicSlots ?? []),
      ...section.contentBlocks.flatMap(
        (block) => block.dynamicSlots ?? [],
      ),
    ];

    slots.forEach((slot) => {
      if (slotIds.has(slot.id)) {
        errors.push(
          `Duplicate dynamic slot id "${slot.id}".`,
        );
      }
      slotIds.add(slot.id);
    });
  });
}

function validateActionPlan(
  report: CompletePersonalityReportDefinition,
  errors: string[],
): void {
  const actionPlan = report.sections.find(
    (section) => section.id === "ninety-day-action-plan",
  );
  const blockIds = new Set(
    actionPlan?.contentBlocks.map((block) => block.id) ?? [],
  );

  REQUIRED_ACTION_PHASE_IDS.forEach((phaseId) => {
    if (!blockIds.has(phaseId)) {
      errors.push(
        `90-day action plan must include phase "${phaseId}".`,
      );
    }
  });
}

function validateMethodology(
  report: CompletePersonalityReportDefinition,
  errors: string[],
): void {
  const methodology = report.sections.find(
    (section) => section.id === "methodology",
  );
  const methodologyText = methodology?.contentBlocks
    .map((block) => block.content.en ?? "")
    .join(" ")
    .toLowerCase() ?? "";

  if (!methodologyText.includes("not a clinical diagnosis")) {
    errors.push(
      "Methodology must include a non-clinical limitation statement.",
    );
  }
}
