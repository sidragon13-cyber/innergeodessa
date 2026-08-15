import assert from "node:assert/strict";
import {
  readFileSync,
} from "node:fs";

import type {
  PersonalityResultContract,
} from "../src/data/assessment/scoring/personality/schema";

import {
  buildFixedPersonalityReportFromAssessmentResult,
} from "../src/data/report/fixed-assets/fixed-report-adapter";

import {
  buildFixedPersonalityReportPayload,
} from "../src/data/report/fixed-assets/fixed-report-payload";

import {
  createReportDimensions,
} from "../src/data/report/generator/from-assessment-result";

const result: PersonalityResultContract = {
  sessionId: "adapter-contract-intj",
  status: "completed",
  type: "INTJ",

  scores: {
    EI: -20,
    SN: 30,
    TF: -45,
    JP: 60,
  },

  confidence: {
    EI: 0.4,
    SN: 0.9,
    TF: 0.9,
    JP: 0.9,
  },

  answered: {
    EI: 18,
    SN: 18,
    TF: 18,
    JP: 18,
  },

  tie_rule: "neutral",

  questionBankVersion:
    "personality-v1.0.0",

  completedAt:
    "2026-08-15T12:00:00.000Z",

  calculatedAt:
    "2026-08-15T12:00:01.000Z",
};

console.log(
  "===== FIXED PERSONALITY REPORT ADAPTER CONTRACT =====",
);

const zhAdapter =
  buildFixedPersonalityReportFromAssessmentResult(
    result,
    "zh",
  );

const zhDirect =
  buildFixedPersonalityReportPayload(
    result.type,
    createReportDimensions(result),
    "zh",
  );

assert.deepEqual(
  zhAdapter,
  zhDirect,
  "Adapter must preserve the existing Chinese fixed-report payload exactly.",
);

assert.equal(
  zhAdapter.personalityType,
  "INTJ",
  "Adapter must preserve the Assessment personality type.",
);

assert.equal(
  zhAdapter.profile,
  "B",
  "Adapter must preserve deterministic A/B/C/D profile routing.",
);

assert.equal(
  zhAdapter.sections.length,
  13,
  "Adapter must return the canonical 13-section fixed report payload.",
);

const enAdapter =
  buildFixedPersonalityReportFromAssessmentResult(
    result,
    "en",
  );

const enDirect =
  buildFixedPersonalityReportPayload(
    result.type,
    createReportDimensions(result),
    "en",
  );

assert.deepEqual(
  enAdapter,
  enDirect,
  "Adapter must preserve the existing English fixed-report payload exactly.",
);

assert.equal(
  enAdapter.personalityType,
  zhAdapter.personalityType,
  "Changing locale must not alter personality type.",
);

assert.equal(
  enAdapter.profile,
  zhAdapter.profile,
  "Changing locale must not alter Profile A/B/C/D routing.",
);

assert.notEqual(
  enAdapter.sourceSha256,
  zhAdapter.sourceSha256,
  "Chinese and English Adapter delivery must resolve their distinct audited assets.",
);

assert.equal(
  "language" in result,
  false,
  "Assessment Result must remain locale-free.",
);

console.log("ZH_ADAPTER=PASS");
console.log("EN_ADAPTER=PASS");
console.log("PROFILE_ROUTING=PASS");
console.log("ASSESSMENT_LOCALE_FREE=PASS");

const accountRoute =
  readFileSync(
    new URL(
      "../src/app/api/account/personality-report/[sessionId]/route.ts",
      import.meta.url,
    ),
    "utf8",
  );

const previewRoute =
  readFileSync(
    new URL(
      "../src/app/api/dev/personality-report-preview/[sessionId]/route.ts",
      import.meta.url,
    ),
    "utf8",
  );

for (
  const [
    routeName,
    routeSource,
  ] of [
    [
      "Account Report API",
      accountRoute,
    ],
    [
      "Preview Report API",
      previewRoute,
    ],
  ] as const
) {
  assert.match(
    routeSource,
    /buildFixedPersonalityReportFromAssessmentResult/,
    `${routeName} must use the formal fixed-report Adapter.`,
  );

  assert.doesNotMatch(
    routeSource,
    /buildFixedPersonalityReportPayload/,
    `${routeName} must not assemble the fixed-report payload directly.`,
  );

  assert.doesNotMatch(
    routeSource,
    /createReportDimensions/,
    `${routeName} must not perform Assessment-to-Report dimension adaptation directly.`,
  );
}

console.log("ACCOUNT_ADAPTER_INTEGRATION=PASS");
console.log("PREVIEW_ADAPTER_INTEGRATION=PASS");

console.log(
  "===== FIXED PERSONALITY REPORT ADAPTER CONTRACT PASS =====",
);
