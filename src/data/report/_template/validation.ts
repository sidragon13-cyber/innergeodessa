import {
  validateCompletePersonalityReportStandard,
} from "../report-standard";
import type {
  CompletePersonalityReportDefinition,
} from "../types";

export interface TemplateReportValidationResult {
  valid: boolean;
  errors: string[];
}

export function validatePersonalityReportTemplate(
  report: CompletePersonalityReportDefinition,
): TemplateReportValidationResult {
  const errors = [
    ...validateCompletePersonalityReportStandard(
      report.sections,
    ).errors,
  ];
  const blocks = report.sections.flatMap(
    (section) => section.contentBlocks,
  );

  if (blocks.length !== 70) {
    errors.push(
      `Report must contain exactly 70 content blocks; found ${blocks.length}.`,
    );
  }
  if (
    blocks.some(
      (block) => !block.content.en?.trim(),
    )
  ) {
    errors.push(
      "Every content block must contain English content.",
    );
  }

  const methodology = report.sections.find(
    (section) => section.id === "methodology",
  );
  const methodologyText =
    methodology?.contentBlocks
      .map((block) => block.content.en ?? "")
      .join(" ")
      .toLowerCase() ?? "";

  if (!methodologyText.includes("not a clinical diagnosis")) {
    errors.push(
      "Methodology must contain the non-clinical limitation statement.",
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
