import assert from "node:assert/strict";

import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
  validateCompletePersonalityReportStandard,
} from "../src/data/report";
import type {
  ReportSectionDefinition,
} from "../src/data/report";

const validation =
  validateCompletePersonalityReportStandard();

assert.equal(validation.valid, true);
assert.deepEqual(validation.errors, []);
assert.equal(COMPLETE_PERSONALITY_REPORT_STANDARD.length, 18);
assert.equal(
  COMPLETE_PERSONALITY_REPORT_STANDARD.filter(
    (section) => section.access === "free",
  ).length,
  5,
);
assert.equal(
  COMPLETE_PERSONALITY_REPORT_STANDARD.filter(
    (section) => section.access === "premium",
  ).length,
  13,
);
assert.deepEqual(
  COMPLETE_PERSONALITY_REPORT_STANDARD.map(
    (section) => section.order,
  ),
  Array.from({ length: 18 }, (_, index) => index + 1),
);
assert.equal(
  new Set(
    COMPLETE_PERSONALITY_REPORT_STANDARD.map(
      (section) => section.id,
    ),
  ).size,
  18,
);

function copyStandard(): ReportSectionDefinition[] {
  return COMPLETE_PERSONALITY_REPORT_STANDARD.map(
    (section) => ({
      ...section,
      title: { ...section.title },
      description: { ...section.description },
      contentBlocks: [...section.contentBlocks],
    }),
  );
}

const duplicateIds = copyStandard();
duplicateIds[1] = {
  ...duplicateIds[1],
  id: duplicateIds[0].id,
};
const duplicateIdValidation =
  validateCompletePersonalityReportStandard(duplicateIds);
assert.equal(duplicateIdValidation.valid, false);
assert.ok(
  duplicateIdValidation.errors.some(
    (error) => error.includes("duplicate section id"),
  ),
);

const invalidAccessOrdering = copyStandard();
invalidAccessOrdering[5] = {
  ...invalidAccessOrdering[5],
  access: "free",
};
const accessValidation =
  validateCompletePersonalityReportStandard(
    invalidAccessOrdering,
  );
assert.equal(accessValidation.valid, false);
assert.ok(
  accessValidation.errors.some(
    (error) => error.includes("must have premium access"),
  ),
);

const nonContinuousOrdering = copyStandard();
nonContinuousOrdering[8] = {
  ...nonContinuousOrdering[8],
  order: 20,
};
const orderValidation =
  validateCompletePersonalityReportStandard(
    nonContinuousOrdering,
  );
assert.equal(orderValidation.valid, false);
assert.ok(
  orderValidation.errors.some(
    (error) => error.includes("continuous"),
  ),
);
