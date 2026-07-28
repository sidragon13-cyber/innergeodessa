import assert from "node:assert/strict";

import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
  ISFJ_COMPLETE_REPORT,
  validateIsfjCompleteReport,
} from "../src/data/report";
import type {
  CompletePersonalityReportDefinition,
} from "../src/data/report";

function copyReport(): CompletePersonalityReportDefinition {
  return structuredClone(ISFJ_COMPLETE_REPORT);
}

const validation = validateIsfjCompleteReport();
assert.equal(validation.valid, true);
assert.deepEqual(validation.errors, []);

assert.equal(ISFJ_COMPLETE_REPORT.sections.length, 18);
assert.deepEqual(
  ISFJ_COMPLETE_REPORT.sections.map((section) => ({
    id: section.id,
    order: section.order,
    category: section.category,
    access: section.access,
  })),
  COMPLETE_PERSONALITY_REPORT_STANDARD.map((section) => ({
    id: section.id,
    order: section.order,
    category: section.category,
    access: section.access,
  })),
);

const premiumSections = ISFJ_COMPLETE_REPORT.sections.filter(
  (section) => section.access === "premium",
);
assert.equal(premiumSections.length, 13);
assert.ok(
  premiumSections.every(
    (section) => section.contentBlocks.length >= 4,
  ),
);
assert.ok(
  premiumSections.flatMap(
    (section) => section.contentBlocks,
  ).every((block) => Boolean(block.content.en?.trim())),
);

const blockIds = ISFJ_COMPLETE_REPORT.sections.flatMap(
  (section) => section.contentBlocks.map((block) => block.id),
);
assert.equal(new Set(blockIds).size, blockIds.length);

const dynamicSlotIds = ISFJ_COMPLETE_REPORT.sections.flatMap(
  (section) => [
    ...(section.dynamicSlots ?? []).map((slot) => slot.id),
    ...section.contentBlocks.flatMap(
      (block) =>
        (block.dynamicSlots ?? []).map((slot) => slot.id),
    ),
  ],
);
assert.equal(
  new Set(dynamicSlotIds).size,
  dynamicSlotIds.length,
);

const missingSection = copyReport();
missingSection.sections.splice(5, 1);
assert.ok(
  validateIsfjCompleteReport(missingSection).errors.some(
    (error) => error.includes("18 canonical sections"),
  ),
);

const accessMismatch = copyReport();
accessMismatch.sections[5].access = "free";
assert.ok(
  validateIsfjCompleteReport(accessMismatch).errors.some(
    (error) => error.includes("access must match"),
  ),
);

const shortPremiumSection = copyReport();
shortPremiumSection.sections[5].contentBlocks =
  shortPremiumSection.sections[5].contentBlocks.slice(0, 3);
assert.ok(
  validateIsfjCompleteReport(
    shortPremiumSection,
  ).errors.some(
    (error) => error.includes("at least 4 content blocks"),
  ),
);

const duplicateBlockIds = copyReport();
duplicateBlockIds.sections[6].contentBlocks[0].id =
  duplicateBlockIds.sections[5].contentBlocks[0].id;
assert.ok(
  validateIsfjCompleteReport(duplicateBlockIds).errors.some(
    (error) => error.includes("Duplicate content block id"),
  ),
);

const missingDisclaimer = copyReport();
const methodology = missingDisclaimer.sections.find(
  (section) => section.id === "methodology",
);
assert.ok(methodology);
methodology.contentBlocks = methodology.contentBlocks.map(
  (block) => ({
    ...block,
    content: {
      ...block.content,
      en: block.content.en?.replace(
        "not a clinical diagnosis",
        "a reflective resource",
      ),
    },
  }),
);
assert.ok(
  validateIsfjCompleteReport(missingDisclaimer).errors.some(
    (error) => error.includes("non-clinical limitation"),
  ),
);

const actionPlan = ISFJ_COMPLETE_REPORT.sections.find(
  (section) => section.id === "ninety-day-action-plan",
);
assert.ok(actionPlan);
assert.ok(
  [
    "isfj-action-days-1-30",
    "isfj-action-days-31-60",
    "isfj-action-days-61-90",
  ].every((id) =>
    actionPlan.contentBlocks.some((block) => block.id === id),
  ),
);
