import {
  createReportDimensions,
  generatePersonalityReport,
  hasCompletePersonalityReport,
  isPhaseOnePersonalityReportType,
} from "../src/data/report";
import type {
  PersonalityResultContract,
} from "../src/data/assessment/scoring/personality";
import type {
  PersonalityType,
} from "../src/data/assessment/personality";
import {
  entjProfile,
} from "../src/data/personality/entj";
import {
  isfjProfile,
} from "../src/data/personality/isfj";

const baseScores = {
  EI: 12.345,
  SN: -42.5,
  TF: 0,
  JP: 78,
} as const;

const baseConfidence = {
  EI: 0.123456,
  SN: 0.5,
  TF: 0,
  JP: 1,
} as const;

const isfjResult = createResult("ISFJ");
const dimensions = createReportDimensions(isfjResult);

assert(
  dimensions.EI.score === baseScores.EI &&
    dimensions.SN.score === baseScores.SN &&
    dimensions.TF.score === baseScores.TF &&
    dimensions.JP.score === baseScores.JP,
  "Report dimension conversion must preserve signed scores.",
);

assert(
  dimensions.EI.confidence === 12.35 &&
    dimensions.SN.confidence === 50 &&
    dimensions.TF.confidence === 0 &&
    dimensions.JP.confidence === 100,
  "Report confidence must convert from 0–1 to 0–100 with at most two decimal places.",
);

assert(
  dimensions.EI.dimension === "EI" &&
    dimensions.SN.dimension === "SN" &&
    dimensions.TF.dimension === "TF" &&
    dimensions.JP.dimension === "JP",
  "Each converted result must embed its matching dimension code.",
);

assert(
  isPhaseOnePersonalityReportType("ISFJ"),
  "ISFJ must be available in Phase 1.",
);
assert(
  isPhaseOnePersonalityReportType("ENTJ"),
  "ENTJ must be available in Phase 1.",
);
assert(
  hasCompletePersonalityReport("ENTP") &&
    !isPhaseOnePersonalityReportType("ENTP"),
  "ENTP must remain unavailable in the Phase 1 frontend despite its generator registration.",
);

const phaseOneProfiles = [isfjProfile, entjProfile] as const;

for (const profile of phaseOneProfiles) {
  const expectedCallToAction =
    `VIEW COMPLETE ${profile.type} REPORT`;
  const callToAction = profile.premiumPreview.callToAction.en;

  assert(
    callToAction === expectedCallToAction,
    `${profile.type} must use the standard Phase 1 report call to action.`,
  );
  assert(
    !callToAction.toLowerCase().includes("unlock"),
    `${profile.type} Phase 1 call to action must not imply an unlock flow.`,
  );
}

const phaseOneFeatureCopy = phaseOneProfiles.flatMap(
  (profile) =>
    profile.premiumPreview.sections.flatMap((section) => [
      section.title.en,
      section.description.en,
    ]),
);

assert(
  !phaseOneFeatureCopy.includes("Complete PDF Report"),
  'Phase 1 feature copy must not contain "Complete PDF Report".',
);

const unsupportedTypes: PersonalityType[] = [
  "INTJ",
  "INTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISTP",
  "ISFP",
  "ESTJ",
  "ESTP",
  "ESFJ",
  "ESFP",
];

assert(
  unsupportedTypes.every(
    (type) => !isPhaseOnePersonalityReportType(type),
  ),
  "All personality types outside ISFJ and ENTJ must be unavailable in Phase 1.",
);

for (const personalityType of ["ISFJ", "ENTJ"] as const) {
  const result = createResult(personalityType);
  const report = generatePersonalityReport({
    sessionId: result.sessionId,
    personalityType,
    dimensions: createReportDimensions(result),
    accessLevel: "premium",
    generatedAt: result.calculatedAt,
  });

  assert(
    report.sections.length === 18,
    `${personalityType} premium report must contain all 18 sections.`,
  );
  assert(
    report.generatedAt === result.calculatedAt,
    `${personalityType} report must preserve calculatedAt as generatedAt.`,
  );
  assert(
    report.metadata.appliedRuleCount > 0 &&
      report.metadata.appliedRuleCount ===
        report.metadata.appliedRuleIds.length,
    `${personalityType} report must include consistent applied-rule metadata.`,
  );
}

function createResult(
  type: PersonalityType,
): PersonalityResultContract {
  return {
    sessionId: `frontend-${type.toLowerCase()}`,
    status: "completed",
    language: "en",
    type,
    scores: { ...baseScores },
    confidence: { ...baseConfidence },
    answered: {
      EI: 18,
      SN: 18,
      TF: 18,
      JP: 18,
    },
    tie_rule: "neutral",
    questionBankVersion: "personality-v1.0.0",
    completedAt: "2026-07-28T09:00:00.000Z",
    calculatedAt: "2026-07-28T09:00:01.000Z",
  };
}

function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
