import {
  generatePersonalityReport,
  hasCompletePersonalityReport,
} from "../src/data/report";
import type {
  DimensionCode,
  DimensionResult,
} from "../src/data/report";

const dimensions: Record<
  DimensionCode,
  DimensionResult
> = {
  EI: {
    dimension: "EI",
    score: 60,
    confidence: 75,
  },
  SN: {
    dimension: "SN",
    score: 55,
    confidence: 70,
  },
  TF: {
    dimension: "TF",
    score: 45,
    confidence: 65,
  },
  JP: {
    dimension: "JP",
    score: 50,
    confidence: 68,
  },
};

assert(
  hasCompletePersonalityReport("ENTJ"),
  "ENTJ complete report must be registered.",
);

const freeReport = generatePersonalityReport({
  sessionId: "entj-free-generator-test",
  personalityType: "ENTJ",
  dimensions,
  accessLevel: "free",
  generatedAt: "2026-07-28T00:00:00.000Z",
});

const premiumReport = generatePersonalityReport({
  sessionId: "entj-premium-generator-test",
  personalityType: "ENTJ",
  dimensions,
  accessLevel: "premium",
  generatedAt: "2026-07-28T00:00:00.000Z",
});

assert(
  freeReport.personalityType === "ENTJ",
  `Expected ENTJ free report; found ${freeReport.personalityType}.`,
);

assert(
  premiumReport.personalityType === "ENTJ",
  `Expected ENTJ premium report; found ${premiumReport.personalityType}.`,
);

assert(
  freeReport.sections.length === 5,
  `ENTJ free report must contain 5 sections; found ${freeReport.sections.length}.`,
);

assert(
  premiumReport.sections.length === 18,
  `ENTJ premium report must contain 18 sections; found ${premiumReport.sections.length}.`,
);

assert(
  freeReport.sections.every(
    (section) => section.access === "free",
  ),
  "ENTJ free report contains a premium section.",
);

assert(
  premiumReport.sections.some(
    (section) => section.access === "premium",
  ),
  "ENTJ premium report does not contain premium sections.",
);

assert(
  freeReport.metadata.appliedRuleCount === 0 &&
    freeReport.metadata.appliedRuleIds.length === 0,
  "ENTJ free report must not apply rules.",
);

assert(
  premiumReport.metadata.appliedRuleCount === 0 &&
    premiumReport.metadata.appliedRuleIds.length === 0,
  "ENTJ premium report must not apply rules.",
);

console.log("ENTJ report generator validation passed.");
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
