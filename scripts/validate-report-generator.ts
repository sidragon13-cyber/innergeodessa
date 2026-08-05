import {
  generatePersonalityReport,
} from "../src/data/report/generator/generate-report";
import type {
  DimensionCode,
  DimensionResult,
} from "../src/data/report/rules";

const dimensions: Record<
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

const freeReport = generatePersonalityReport({
  sessionId: "generator-free-validation",
  personalityType: "ISFJ",
  dimensions,
  accessLevel: "free",
  generatedAt: "2026-07-28T00:00:00.000Z",
});

const premiumReport = generatePersonalityReport({
  sessionId: "generator-premium-validation",
  personalityType: "ISFJ",
  dimensions,
  accessLevel: "premium",
  generatedAt: "2026-07-28T00:00:00.000Z",
});

assert(
  freeReport.sections.length === 5,
  `Free report must contain 5 sections; found ${freeReport.sections.length}.`,
);

assert(
  freeReport.sections.every(
    (section) => section.access === "free",
  ),
  "Free report contains a premium section.",
);

assert(
  premiumReport.sections.length === 18,
  `Premium report must contain 18 sections; found ${premiumReport.sections.length}.`,
);

assert(
  premiumReport.sections.some(
    (section) => section.access === "premium",
  ),
  "Premium report does not contain premium sections.",
);

assert(
  freeReport.metadata.appliedRuleCount ===
    freeReport.metadata.appliedRuleIds.length,
  "Free report applied-rule metadata is inconsistent.",
);

assert(
  premiumReport.metadata.appliedRuleCount ===
    premiumReport.metadata.appliedRuleIds.length,
  "Premium report applied-rule metadata is inconsistent.",
);

console.log("Report generator validation passed.");
console.log(
  `Free sections: ${freeReport.sections.length}`,
);
console.log(
  `Premium sections: ${premiumReport.sections.length}`,
);
console.log(
  `Free applied rules: ${freeReport.metadata.appliedRuleCount}`,
);
console.log(
  `Premium applied rules: ${premiumReport.metadata.appliedRuleCount}`,
);

function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
