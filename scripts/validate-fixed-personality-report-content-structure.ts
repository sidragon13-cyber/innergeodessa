import assert from "node:assert/strict";

import {
  FIXED_PERSONALITY_REPORT_MARKDOWN,
} from "../src/data/report/fixed-assets/generated-report-markdown";

import {
  parseFixedReportMarkdown,
} from "../src/data/report/fixed-assets/fixed-report-rich-content";

import {
  adaptFixedReportSections,
  FIXED_REPORT_SECTION_IDS,
} from "../src/data/report/fixed-assets/fixed-report-section-adapter";

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

const EXPECTED_SECTION_IDS = [
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

type Locale =
  (typeof LOCALES)[number];

type PersonalityType =
  (typeof PERSONALITY_TYPES)[number];

type Profile =
  (typeof PROFILES)[number];

function reportKey(
  locale: Locale,
  personalityType: PersonalityType,
  profile: Profile,
): string {
  return `${locale}/${personalityType}/${profile}`;
}

function expectedPlaceholders(
  locale: Locale,
  personalityType: PersonalityType,
): readonly string[] {
  const bandSuffix =
    locale === "zh"
      ? "BAND_CN"
      : "BAND_EN";

  const directions =
    personalityType.split("");

  assert.equal(
    directions.length,
    4,
    `Personality type must contain exactly four preference directions: ${personalityType}`,
  );

  const placeholders: string[] = [];

  for (const direction of directions) {
    placeholders.push(
      `{{${direction}_SCORE}}`,
      `{{${direction}_${bandSuffix}}}`,
      `{{${direction}_BAND_BLOCK}}`,
    );
  }

  return placeholders.sort();
}

function extractSupportedPlaceholders(
  markdown: string,
): readonly string[] {
  return [
    ...new Set(
      markdown.match(
        /\{\{[A-Z]+_(?:SCORE|BAND_CN|BAND_EN|BAND_BLOCK)\}\}/g,
      ) ?? [],
    ),
  ].sort();
}

console.log(
  "===== FIXED PERSONALITY REPORT CONTENT STRUCTURE =====",
);

assert.deepEqual(
  FIXED_REPORT_SECTION_IDS,
  EXPECTED_SECTION_IDS,
  "Runtime canonical section IDs must remain the exact audited 13-section contract.",
);

console.log(
  "CANONICAL_SECTION_IDS=PASS",
);

let reportsChecked = 0;
let parsedReports = 0;
let adaptedReports = 0;
let frontMatterReports = 0;
let sectionCountReports = 0;
let nonEmptySectionReports = 0;
let placeholderReports = 0;

for (const locale of LOCALES) {
  for (
    const personalityType
    of PERSONALITY_TYPES
  ) {
    const expectedVariables =
      expectedPlaceholders(
        locale,
        personalityType,
      );

    assert.equal(
      expectedVariables.length,
      12,
      `Expected exactly 12 runtime variables for ${locale}/${personalityType}.`,
    );

    for (
      const profile
      of PROFILES
    ) {
      const key =
        reportKey(
          locale,
          personalityType,
          profile,
        );

      const asset =
        FIXED_PERSONALITY_REPORT_MARKDOWN[
          locale
        ][
          personalityType
        ][
          profile
        ];

      let richDocument;

      try {
        richDocument =
          parseFixedReportMarkdown(
            asset.markdown,
          );
      } catch (error) {
        throw new Error(
          `Markdown parser rejected canonical report ${key}: ${
            error instanceof Error
              ? error.message
              : String(error)
          }`,
        );
      }

      parsedReports += 1;

      assert.ok(
        richDocument.blocks.length > 0,
        `Parsed rich document must contain blocks: ${key}`,
      );

      let sectionDocument;

      try {
        sectionDocument =
          adaptFixedReportSections(
            richDocument,
          );
      } catch (error) {
        throw new Error(
          `Section adapter rejected canonical report ${key}: ${
            error instanceof Error
              ? error.message
              : String(error)
          }`,
        );
      }

      adaptedReports += 1;

      assert.ok(
        sectionDocument.frontMatter.length > 0,
        `Canonical report front matter must not be empty: ${key}`,
      );

      frontMatterReports += 1;

      assert.equal(
        sectionDocument.sections.length,
        13,
        `Canonical report must adapt to exactly 13 sections: ${key}`,
      );

      const actualIds =
        sectionDocument.sections.map(
          section => section.id,
        );

      assert.deepEqual(
        actualIds,
        [...EXPECTED_SECTION_IDS],
        `Canonical section IDs/order mismatch: ${key}`,
      );

      const actualOrders =
        sectionDocument.sections.map(
          section => section.order,
        );

      assert.deepEqual(
        actualOrders,
        [
          1, 2, 3, 4, 5, 6, 7,
          8, 9, 10, 11, 12, 13,
        ],
        `Canonical section order values must be 1–13: ${key}`,
      );

      sectionCountReports += 1;

      for (
        const section
        of sectionDocument.sections
      ) {
        assert.ok(
          section.sourceTitle.trim().length > 0,
          `Canonical section source title must not be empty: ${key}/${section.id}`,
        );

        assert.ok(
          section.blocks.length > 0,
          `Canonical section must contain content blocks: ${key}/${section.id}`,
        );
      }

      nonEmptySectionReports += 1;

      const actualVariables =
        extractSupportedPlaceholders(
          asset.markdown,
        );

      assert.equal(
        actualVariables.length,
        12,
        `Canonical report must contain exactly 12 unique supported runtime variables: ${key}`,
      );

      assert.deepEqual(
        actualVariables,
        expectedVariables,
        `Canonical report variable set must match its exact Type/Locale directions: ${key}`,
      );

      const allTemplateTokens =
        [
          ...new Set(
            asset.markdown.match(
              /\{\{[^{}]+\}\}/g,
            ) ?? [],
          ),
        ].sort();

      assert.deepEqual(
        allTemplateTokens,
        expectedVariables,
        `Canonical report must not contain unknown or cross-locale template variables: ${key}`,
      );

      placeholderReports += 1;
      reportsChecked += 1;
    }
  }
}

assert.equal(
  reportsChecked,
  128,
  "Content-structure contract must inspect exactly 128 reports.",
);

assert.equal(
  parsedReports,
  128,
  "All 128 reports must pass the production Markdown parser.",
);

assert.equal(
  adaptedReports,
  128,
  "All 128 reports must pass the canonical section adapter.",
);

assert.equal(
  frontMatterReports,
  128,
  "All 128 reports must contain non-empty front matter.",
);

assert.equal(
  sectionCountReports,
  128,
  "All 128 reports must produce exactly 13 canonical sections in order.",
);

assert.equal(
  nonEmptySectionReports,
  128,
  "All 128 reports must contain non-empty canonical sections.",
);

assert.equal(
  placeholderReports,
  128,
  "All 128 reports must contain the exact Type/Locale 12-variable contract.",
);

console.log(
  "PARSER_128=PASS",
);

console.log(
  "SECTION_ADAPTER_128=PASS",
);

console.log(
  "FRONT_MATTER_128=PASS",
);

console.log(
  "CANONICAL_13_SECTIONS_128=PASS",
);

console.log(
  "NON_EMPTY_SECTIONS_128=PASS",
);

console.log(
  "TYPE_LOCALE_VARIABLES_128=PASS",
);

console.log(
  "REPORTS_CHECKED=128",
);

console.log(
  "===== FIXED PERSONALITY REPORT CONTENT STRUCTURE PASS =====",
);
