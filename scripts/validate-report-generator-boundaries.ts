import {
  generatePersonalityReport,
} from "../src/data/report";
import {
  ISFJ_REPORT_RULES,
} from "../src/data/report/isfj";
import {
  analyseRuleInput,
  selectReportRules,
} from "../src/data/report/rules";
import type {
  DimensionCode,
  DimensionResult,
  SelectedReportRule,
} from "../src/data/report/rules";

const validDimensions: Record<
  DimensionCode,
  DimensionResult
> = {
  EI: {
    dimension: "EI",
    score: -60,
    confidence: 75,
  },
  SN: {
    dimension: "SN",
    score: -55,
    confidence: 70,
  },
  TF: {
    dimension: "TF",
    score: -45,
    confidence: 65,
  },
  JP: {
    dimension: "JP",
    score: -50,
    confidence: 68,
  },
};

const balancedLowConfidenceDimensions: Record<
  DimensionCode,
  DimensionResult
> = {
  EI: {
    dimension: "EI",
    score: 0,
    confidence: 10,
  },
  SN: {
    dimension: "SN",
    score: 0,
    confidence: 10,
  },
  TF: {
    dimension: "TF",
    score: 0,
    confidence: 10,
  },
  JP: {
    dimension: "JP",
    score: -20,
    confidence: 10,
  },
};

let passedChecks = 0;

expectThrows(
  "Missing dimension rejected",
  () => {
    const incompleteDimensions = {
      EI: validDimensions.EI,
      SN: validDimensions.SN,
      TF: validDimensions.TF,
    } as unknown as Record<
      DimensionCode,
      DimensionResult
    >;

    generatePersonalityReport({
      sessionId: "missing-dimension-test",
      personalityType: "ISFJ",
      dimensions: incompleteDimensions,
      accessLevel: "free",
      generatedAt: "2026-07-28T00:00:00.000Z",
    });
  },
  TypeError,
  "Missing dimension result for JP.",
);

expectThrows(
  "Unregistered personality report rejected",
  () => {
    generatePersonalityReport({
      sessionId: "unregistered-report-test",
      personalityType: "ISTJ",
      dimensions: validDimensions,
      accessLevel: "free",
      generatedAt: "2026-07-28T00:00:00.000Z",
    });
  },
  Error,
  "Complete report is not available for personality type: ISTJ",
);

const analysedInput = analyseRuleInput({
  personalityType: "ISFJ",
  dimensions: balancedLowConfidenceDimensions,
});

check(
  "Balanced dimensions analysed correctly",
  analysedInput.balancedCount === 3 &&
    analysedInput.dimensions.EI.preference === "X" &&
    analysedInput.dimensions.SN.preference === "X" &&
    analysedInput.dimensions.TF.preference === "X",
  `Expected 3 balanced dimensions; found ${analysedInput.balancedCount}.`,
);

check(
  "Low-confidence dimensions counted correctly",
  analysedInput.lowConfidenceCount === 4,
  `Expected 4 low-confidence dimensions; found ${analysedInput.lowConfidenceCount}.`,
);

check(
  "Average confidence calculated correctly",
  analysedInput.averageConfidence === 10,
  `Expected average confidence 10; found ${analysedInput.averageConfidence}.`,
);

const selectedRules = selectReportRules(
  ISFJ_REPORT_RULES,
  analysedInput,
);

const selectedRuleIds = selectedRules.map(
  (rule) => rule.ruleId,
);

check(
  "Low average-confidence rule selected",
  selectedRuleIds.includes(
    "isfj-confidence-average-low",
  ),
  "Expected low average-confidence rule to be selected.",
);

check(
  "Highest balanced-count rule wins exclusive group",
  selectedRuleIds.includes(
    "isfj-balanced-count-3",
  ) &&
    !selectedRuleIds.includes(
      "isfj-balanced-count-1",
    ) &&
    !selectedRuleIds.includes(
      "isfj-balanced-count-2",
    ),
  "Balanced-count exclusive group did not select only the highest-priority matching rule.",
);

checkDimensionExclusiveGroup(
  selectedRules,
  "EI",
  "isfj-ei-balanced",
);

checkDimensionExclusiveGroup(
  selectedRules,
  "SN",
  "isfj-sn-balanced",
);

checkDimensionExclusiveGroup(
  selectedRules,
  "TF",
  "isfj-tf-balanced",
);

checkDimensionExclusiveGroup(
  selectedRules,
  "JP",
  "isfj-jp-j-borderline",
);

const freeReport = generatePersonalityReport({
  sessionId: "boundary-free-report",
  personalityType: "ISFJ",
  dimensions: balancedLowConfidenceDimensions,
  accessLevel: "free",
  generatedAt: "2026-07-28T00:00:00.000Z",
});

const premiumReport = generatePersonalityReport({
  sessionId: "boundary-premium-report",
  personalityType: "ISFJ",
  dimensions: balancedLowConfidenceDimensions,
  accessLevel: "premium",
  generatedAt: "2026-07-28T00:00:00.000Z",
});

check(
  "Free report contains only free sections",
  freeReport.sections.length === 5 &&
    freeReport.sections.every(
      (section) => section.access === "free",
    ),
  "Free report contains an unexpected section.",
);

check(
  "Premium report contains complete section set",
  premiumReport.sections.length === 18 &&
    premiumReport.sections.some(
      (section) => section.access === "premium",
    ),
  "Premium report does not contain the complete section set.",
);

const premiumOnlyRuleIds = [
  "isfj-balanced-count-3",
  "isfj-combination-flexible-social-decisions",
  "isfj-combination-situational-structure",
  "isfj-combination-provisional-profile",
];

check(
  "Free metadata excludes premium-only rules",
  premiumOnlyRuleIds.every(
    (ruleId) =>
      !freeReport.metadata.appliedRuleIds.includes(
        ruleId,
      ),
  ),
  "Free report metadata contains a rule applied only to premium sections.",
);

check(
  "Premium metadata includes premium rules",
  premiumOnlyRuleIds.every(
    (ruleId) =>
      premiumReport.metadata.appliedRuleIds.includes(
        ruleId,
      ),
  ),
  "Premium report is missing an expected premium rule.",
);

check(
  "Applied-rule metadata remains consistent",
  freeReport.metadata.appliedRuleCount ===
    freeReport.metadata.appliedRuleIds.length &&
    premiumReport.metadata.appliedRuleCount ===
      premiumReport.metadata.appliedRuleIds.length,
  "Applied-rule count does not match applied-rule IDs.",
);

console.log("");
console.log(
  `PASS — ${passedChecks} report generator boundary checks passed.`,
);

function checkDimensionExclusiveGroup(
  selectedRules: readonly SelectedReportRule[],
  dimension: DimensionCode,
  expectedRuleId: string,
): void {
  const prefix =
    `isfj-${dimension.toLowerCase()}-`;

  const dimensionRules = selectedRules.filter(
    (rule) => rule.ruleId.startsWith(prefix),
  );

  check(
    `${dimension} exclusive group selects one rule`,
    dimensionRules.length === 1 &&
      dimensionRules[0]?.ruleId === expectedRuleId,
    `Expected ${expectedRuleId}; received ${
      dimensionRules
        .map((rule) => rule.ruleId)
        .join(", ") || "none"
    }.`,
  );
}

function check(
  label: string,
  condition: boolean,
  message: string,
): void {
  assert(condition, `${label}: ${message}`);
  passedChecks += 1;
  console.log(`✓ ${label}`);
}

function expectThrows(
  label: string,
  operation: () => unknown,
  expectedErrorType: new (...args: never[]) => Error,
  expectedMessage: string,
): void {
  try {
    operation();
  } catch (error: unknown) {
    assert(
      error instanceof expectedErrorType,
      `${label}: expected ${expectedErrorType.name}, received ${
        error instanceof Error
          ? error.constructor.name
          : typeof error
      }.`,
    );

    assert(
      error.message === expectedMessage,
      `${label}: unexpected error message.\nExpected: ${expectedMessage}\nReceived: ${error.message}`,
    );

    passedChecks += 1;
    console.log(`✓ ${label}`);
    return;
  }

  throw new Error(
    `${label}: expected an error, but no error was thrown.`,
  );
}

function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
