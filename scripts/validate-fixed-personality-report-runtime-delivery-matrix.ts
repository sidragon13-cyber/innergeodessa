import assert from "node:assert/strict";

import type {
  PersonalityResultContract,
} from "../src/data/assessment/scoring/personality/schema";

import {
  buildFixedPersonalityReportFromAssessmentResult,
} from "../src/data/report/fixed-assets/fixed-report-adapter";

import {
  FIXED_PERSONALITY_REPORT_MARKDOWN,
} from "../src/data/report/fixed-assets/generated-report-markdown";

import {
  isFixedPersonalityReportDelivery,
  isFixedPersonalityReportPayload,
} from "../src/data/report/fixed-assets/fixed-report-client";

const LOCALES = [
  "zh",
  "en",
] as const;

const PERSONALITY_TYPES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

const PROFILES = [
  "A",
  "B",
  "C",
  "D",
] as const;

const SECTION_IDS = [
  "data-summary",
  "core-personality-profile",
  "thinking-decision-structure",
  "personal-dimension-structure",
  "core-traits-environment-blind-spots",
  "career-learning-relationship-fit",
  "future-environment-development",
  "opportunity-capability-map",
  "personal-future-map",
  "report-interpretation",
  "conclusion",
  "disclaimer",
  "appendix",
] as const;

const DIMENSIONS = [
  "EI",
  "SN",
  "TF",
  "JP",
] as const;

type Locale =
  (typeof LOCALES)[number];

type PersonalityType =
  (typeof PERSONALITY_TYPES)[number];

type Profile =
  (typeof PROFILES)[number];

type Dimension =
  (typeof DIMENSIONS)[number];

const PROFILE_FIXTURE = {
  A: {
    assessmentConfidence: 0.20,
    clarity: 20,
    band: "near-boundary",
  },
  B: {
    assessmentConfidence: 0.40,
    clarity: 40,
    band: "moderate-preference",
  },
  C: {
    assessmentConfidence: 0.60,
    clarity: 60,
    band: "clear-preference",
  },
  D: {
    assessmentConfidence: 0.80,
    clarity: 80,
    band: "highly-clear",
  },
} as const;

const SCORE_BY_DIRECTION = {
  E: 12,
  I: -12,
  N: 12,
  S: -12,
  F: 12,
  T: -12,
  J: 12,
  P: -12,
} as const;

function directionByDimension(
  type: PersonalityType,
): Readonly<Record<Dimension, string>> {
  const [
    ei,
    sn,
    tf,
    jp,
  ] = type;

  return {
    EI: ei,
    SN: sn,
    TF: tf,
    JP: jp,
  };
}

function createResult(
  type: PersonalityType,
  profile: Profile,
): PersonalityResultContract {
  const directions =
    directionByDimension(type);

  const confidence =
    PROFILE_FIXTURE[
      profile
    ].assessmentConfidence;

  return {
    sessionId:
      `runtime-${type.toLowerCase()}-${profile.toLowerCase()}`,

    status: "completed",

    type,

    scores: {
      EI:
        SCORE_BY_DIRECTION[
          directions.EI as keyof typeof SCORE_BY_DIRECTION
        ],
      SN:
        SCORE_BY_DIRECTION[
          directions.SN as keyof typeof SCORE_BY_DIRECTION
        ],
      TF:
        SCORE_BY_DIRECTION[
          directions.TF as keyof typeof SCORE_BY_DIRECTION
        ],
      JP:
        SCORE_BY_DIRECTION[
          directions.JP as keyof typeof SCORE_BY_DIRECTION
        ],
    },

    confidence: {
      EI: confidence,
      SN: confidence,
      TF: confidence,
      JP: confidence,
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
}

function combinationKey(
  locale: Locale,
  type: PersonalityType,
  profile: Profile,
): string {
  return `${locale}/${type}/${profile}`;
}

console.log(
  "===== FIXED PERSONALITY REPORT 128 RUNTIME DELIVERY MATRIX =====",
);

const combinations =
  new Set<string>();

let adapterPayloads = 0;
let clientPayloads = 0;
let clientDeliveries = 0;
let profileRoutes = 0;
let variableSubstitutions = 0;
let sourceSelections = 0;
let canonicalStructures = 0;
let localeContentChecks = 0;
let bilingualPairs = 0;
let bilingualProfileParity = 0;
let bilingualPreferenceParity = 0;
let bilingualSourcePairs = 0;

for (
  const type
  of PERSONALITY_TYPES
) {
  const directions =
    directionByDimension(type);

  for (
    const profile
    of PROFILES
  ) {
    const fixture =
      PROFILE_FIXTURE[
        profile
      ];

    const result =
      createResult(
        type,
        profile,
      );

    const payloadByLocale =
      new Map<
        Locale,
        ReturnType<
          typeof buildFixedPersonalityReportFromAssessmentResult
        >
      >();

    for (
      const locale
      of LOCALES
    ) {
      const key =
        combinationKey(
          locale,
          type,
          profile,
        );

      assert.equal(
        combinations.has(key),
        false,
        `Duplicate runtime matrix combination: ${key}`,
      );

      combinations.add(key);

      const payload =
        buildFixedPersonalityReportFromAssessmentResult(
          result,
          locale,
        );

      adapterPayloads += 1;

      assert.equal(
        isFixedPersonalityReportPayload(
          payload,
        ),
        true,
        `Client payload validator rejected runtime payload: ${key}`,
      );

      clientPayloads += 1;

      assert.equal(
        payload.personalityType,
        type,
        `Runtime personality type mismatch: ${key}`,
      );

      assert.equal(
        payload.profile,
        profile,
        `Runtime Profile routing mismatch: ${key}`,
      );

      profileRoutes += 1;

      const expectedAsset =
        FIXED_PERSONALITY_REPORT_MARKDOWN[
          locale
        ][
          type
        ][
          profile
        ];

      assert.equal(
        payload.sourceSha256,
        expectedAsset.sha256,
        `Runtime source SHA selection mismatch: ${key}`,
      );

      sourceSelections += 1;

      for (
        const dimension
        of DIMENSIONS
      ) {
        const band =
          payload.preferenceBands[
            dimension
          ];

        assert.equal(
          band.direction,
          directions[
            dimension
          ],
          `Runtime preference direction mismatch: ${key}/${dimension}`,
        );

        assert.equal(
          band.clarity,
          fixture.clarity,
          `Assessment confidence → report clarity conversion mismatch: ${key}/${dimension}`,
        );

        assert.equal(
          band.band,
          fixture.band,
          `Runtime clarity band mismatch: ${key}/${dimension}`,
        );
      }

      const payloadJson =
        JSON.stringify(
          payload,
        );

      assert.equal(
        /\{\{[A-Z]+_(?:SCORE|BAND_CN|BAND_EN|BAND_BLOCK)\}\}/
          .test(
            payloadJson,
          ),
        false,
        `Runtime payload contains unresolved report variables: ${key}`,
      );

      assert.equal(
        "markdown" in payload,
        false,
        `Runtime payload must not expose raw Markdown: ${key}`,
      );

      assert.equal(
        "sourcePath" in payload,
        false,
        `Runtime payload must not expose sourcePath: ${key}`,
      );

      variableSubstitutions += 1;

      assert.ok(
        payload.frontMatter.length > 0,
        `Runtime payload front matter empty: ${key}`,
      );

      assert.equal(
        payload.sections.length,
        13,
        `Runtime payload must contain exactly 13 sections: ${key}`,
      );

      assert.deepEqual(
        payload.sections.map(
          section =>
            section.id,
        ),
        [...SECTION_IDS],
        `Runtime canonical section identity/order mismatch: ${key}`,
      );

      for (
        const section
        of payload.sections
      ) {
        assert.ok(
          section.blocks.length > 0,
          `Runtime section has no content blocks: ${key}/${section.id}`,
        );
      }

      canonicalStructures += 1;

      const renderedContent =
        JSON.stringify({
          frontMatter:
            payload.frontMatter,
          sections:
            payload.sections,
        });

      if (
        locale === "en"
      ) {
        assert.equal(
          /[\u3400-\u4dbf\u4e00-\u9fff]/u
            .test(
              renderedContent,
            ),
          false,
          `English runtime report contains Chinese content: ${key}`,
        );
      } else {
        assert.equal(
          /[\u3400-\u4dbf\u4e00-\u9fff]/u
            .test(
              renderedContent,
            ),
          true,
          `Chinese runtime report contains no Chinese content: ${key}`,
        );
      }

      localeContentChecks += 1;

      const delivery = {
        sessionId:
          result.sessionId,
        locale,
        generatedAt:
          "2026-08-15T12:00:02.000Z",
        report:
          payload,
      };

      assert.equal(
        isFixedPersonalityReportDelivery(
          delivery,
        ),
        true,
        `Client delivery validator rejected runtime delivery: ${key}`,
      );

      clientDeliveries += 1;

      payloadByLocale.set(
        locale,
        payload,
      );
    }

    const zhPayload =
      payloadByLocale.get(
        "zh",
      );

    const enPayload =
      payloadByLocale.get(
        "en",
      );

    assert.ok(
      zhPayload &&
      enPayload,
      `Both locales must exist for ${type}/${profile}`,
    );

    assert.equal(
      zhPayload.profile,
      enPayload.profile,
      `Locale must not alter Profile routing: ${type}/${profile}`,
    );

    assert.deepEqual(
      zhPayload.preferenceBands,
      enPayload.preferenceBands,
      `Locale must not alter preference direction/clarity/bands: ${type}/${profile}`,
    );

    assert.equal(
      zhPayload.personalityType,
      enPayload.personalityType,
      `Bilingual pair must preserve one personality identity: ${type}/${profile}`,
    );

    assert.equal(
      zhPayload.profile,
      enPayload.profile,
      `Bilingual pair must preserve one Profile identity: ${type}/${profile}`,
    );

    bilingualProfileParity += 1;

    assert.deepEqual(
      zhPayload.preferenceBands,
      enPayload.preferenceBands,
      `Bilingual pair must preserve identical assessment-derived preference data: ${type}/${profile}`,
    );

    bilingualPreferenceParity += 1;

    assert.notEqual(
      zhPayload.sourceSha256,
      enPayload.sourceSha256,
      `Bilingual pair must resolve distinct zh/en audited source assets: ${type}/${profile}`,
    );

    bilingualSourcePairs += 1;
    bilingualPairs += 1;
  }
}

assert.equal(
  combinations.size,
  128,
  "Runtime delivery matrix must contain exactly 128 unique combinations.",
);

assert.equal(
  adapterPayloads,
  128,
);

assert.equal(
  clientPayloads,
  128,
);

assert.equal(
  clientDeliveries,
  128,
);

assert.equal(
  profileRoutes,
  128,
);

assert.equal(
  variableSubstitutions,
  128,
);

assert.equal(
  sourceSelections,
  128,
);

assert.equal(
  canonicalStructures,
  128,
);

assert.equal(
  localeContentChecks,
  128,
);

assert.equal(
  bilingualPairs,
  64,
  "16 personality types × 4 profiles must produce exactly 64 bilingual report pairs.",
);

assert.equal(
  bilingualProfileParity,
  64,
  "All 64 bilingual pairs must preserve identical Type/Profile identity.",
);

assert.equal(
  bilingualPreferenceParity,
  64,
  "All 64 bilingual pairs must preserve identical assessment-derived preference data.",
);

assert.equal(
  bilingualSourcePairs,
  64,
  "All 64 bilingual pairs must resolve separate audited zh/en source assets.",
);

console.log(
  "ASSESSMENT_TO_ADAPTER_128=PASS",
);

console.log(
  "PROFILE_ROUTING_128=PASS",
);

console.log(
  "CONFIDENCE_TO_CLARITY_128=PASS",
);

console.log(
  "VARIABLE_SUBSTITUTION_128=PASS",
);

console.log(
  "SOURCE_SELECTION_128=PASS",
);

console.log(
  "CANONICAL_13_SECTIONS_128=PASS",
);

console.log(
  "CLIENT_PAYLOAD_VALIDATION_128=PASS",
);

console.log(
  "CLIENT_DELIVERY_VALIDATION_128=PASS",
);

console.log(
  "LOCALE_CONTENT_128=PASS",
);

console.log(
  "LOCALE_DOES_NOT_CHANGE_PROFILE=PASS",
);

console.log(
  "BILINGUAL_PAIR_IDENTITY_64=PASS",
);

console.log(
  "BILINGUAL_PAIR_PREFERENCE_PARITY_64=PASS",
);

console.log(
  "BILINGUAL_PAIR_SOURCE_PARITY_64=PASS",
);

console.log(
  "BILINGUAL_PAIRS=64",
);

console.log(
  "RUNTIME_COMBINATIONS=128",
);

console.log(
  "===== FIXED PERSONALITY REPORT 128 RUNTIME DELIVERY MATRIX PASS =====",
);
