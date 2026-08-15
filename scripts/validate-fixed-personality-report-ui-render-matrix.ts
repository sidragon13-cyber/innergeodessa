import assert from "node:assert/strict";

import {
  createElement,
} from "react";

import {
  renderToStaticMarkup,
} from "react-dom/server";

import {
  LocaleProvider,
} from "../src/components/locale/locale-provider";

import {
  FixedReportDocument,
} from "../src/app/personality/report/[sessionId]/fixed-report-document";

import {
  createReportSectionAnchor,
} from "../src/app/personality/report/[sessionId]/section-navigation";

import type {
  PersonalityResultContract,
} from "../src/data/assessment/scoring/personality/schema";

import {
  buildFixedPersonalityReportFromAssessmentResult,
} from "../src/data/report/fixed-assets/fixed-report-adapter";

import type {
  FixedReportRichBlock,
} from "../src/data/report/fixed-assets/fixed-report-rich-content";

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

const LOCALES = [
  "zh",
  "en",
] as const;

const PROFILE_CONFIDENCE = {
  A: 0.2,
  B: 0.4,
  C: 0.6,
  D: 0.8,
} as const;

const EXPECTED_BLOCK_TYPES = [
  "paragraph",
  "heading",
  "unordered-list",
  "ordered-list",
  "blockquote",
  "table",
  "divider",
] as const;

type PersonalityType =
  (typeof PERSONALITY_TYPES)[number];

type ReportProfile =
  (typeof PROFILES)[number];

type ReportLocale =
  (typeof LOCALES)[number];

let runtimeRenders = 0;
let bilingualPairs = 0;
let renderedSections = 0;
let sectionBodySamples = 0;
let localePrintLabels = 0;

const seenBlockTypes =
  new Set<FixedReportRichBlock["type"]>();

for (
  const personalityType
  of PERSONALITY_TYPES
) {
  for (
    const profile
    of PROFILES
  ) {
    const pairProfiles:
      ReportProfile[] = [];

    for (
      const locale
      of LOCALES
    ) {
      const result =
        createAssessmentFixture(
          personalityType,
          profile,
        );

      const report =
        buildFixedPersonalityReportFromAssessmentResult(
          result,
          locale,
        );

      assert.equal(
        report.personalityType,
        personalityType,
        `${locale}/${personalityType}/${profile}: personality type changed before UI render`,
      );

      assert.equal(
        report.profile,
        profile,
        `${locale}/${personalityType}/${profile}: unexpected report profile`,
      );

      assert.equal(
        report.sections.length,
        13,
        `${locale}/${personalityType}/${profile}: canonical 13-section payload missing`,
      );

      pairProfiles.push(
        report.profile,
      );

      const html =
        renderToStaticMarkup(
          createElement(
            LocaleProvider,
            null,
            createElement(
              FixedReportDocument,
              {
                locale,

                sessionId:
                  result.sessionId,

                generatedAt:
                  "2026-08-15T12:00:02.000Z",

                recipientName:
                  "InnerGeo UI Contract",

                report,
              },
            ),
          ),
        );

      const visibleText =
        normalizeComparableText(
          htmlToVisibleText(
            html,
          ),
        );

      assert.ok(
        html.length > 10_000,
        `${locale}/${personalityType}/${profile}: rendered document unexpectedly small`,
      );

      assert.ok(
        html.includes(
          'id="report-table-of-contents"',
        ),
        `${locale}/${personalityType}/${profile}: table of contents missing`,
      );

      assert.ok(
        html.includes(
          "fixed-personality-report-front-matter",
        ),
        `${locale}/${personalityType}/${profile}: front matter container missing`,
      );

      assert.ok(
        html.includes(
          "fixed-report-rich-content",
        ),
        `${locale}/${personalityType}/${profile}: rich-content renderer missing`,
      );

      assert.ok(
        visibleText.includes(
          normalizeComparableText(
            personalityType,
          ),
        ),
        `${locale}/${personalityType}/${profile}: personality type missing from rendered UI`,
      );

      assert.ok(
        visibleText.includes(
          normalizeComparableText(
            `Profile ${profile}`,
          ),
        ),
        `${locale}/${personalityType}/${profile}: profile identity missing from rendered UI`,
      );

      validateFrontMatter(
        report.frontMatter,
        visibleText,
        `${locale}/${personalityType}/${profile}`,
      );

      for (
        const section
        of report.sections
      ) {
        const anchor =
          createReportSectionAnchor(
            section.order,
            section.id,
          );

        assert.equal(
          countOccurrences(
            html,
            `id="${anchor}"`,
          ),
          1,
          `${locale}/${personalityType}/${profile}/${section.id}: section anchor must render exactly once`,
        );

        assert.ok(
          visibleText.includes(
            normalizeComparableText(
              section.sourceTitle,
            ),
          ),
          `${locale}/${personalityType}/${profile}/${section.id}: section title missing after HTML entity decoding`,
        );

        const samples =
          collectSectionBodySamples(
            section.blocks,
          );

        assert.ok(
          samples.length > 0,
          `${locale}/${personalityType}/${profile}/${section.id}: no renderable body sample`,
        );

        for (
          const sample
          of samples
        ) {
          assert.ok(
            visibleText.includes(
              normalizeComparableText(
                sample,
              ),
            ),
            `${locale}/${personalityType}/${profile}/${section.id}: body content missing from rendered UI`,
          );

          sectionBodySamples += 1;
        }

        for (
          const block
          of section.blocks
        ) {
          seenBlockTypes.add(
            block.type,
          );
        }

        renderedSections += 1;
      }

      for (
        const block
        of report.frontMatter
      ) {
        seenBlockTypes.add(
          block.type,
        );
      }

      validateRichBlockElementCoverage(
        report.frontMatter,
        report.sections.flatMap(
          section =>
            section.blocks,
        ),
        html,
        `${locale}/${personalityType}/${profile}`,
      );

      assert.equal(
        /\{\{[A-Z]+_(?:SCORE|BAND_CN|BAND_EN|BAND_BLOCK)\}\}/u
          .test(
            htmlToVisibleText(
              html,
            ),
          ),
        false,
        `${locale}/${personalityType}/${profile}: unresolved report variable reached React UI`,
      );

      if (
        locale === "zh"
      ) {
        assert.ok(
          visibleText.includes(
            normalizeComparableText(
              "打印 / 保存为 PDF",
            ),
          ),
          `${personalityType}/${profile}/zh: localized print label missing`,
        );
      } else {
        assert.ok(
          visibleText.includes(
            normalizeComparableText(
              "Print / Save as PDF",
            ),
          ),
          `${personalityType}/${profile}/en: localized print label missing`,
        );
      }

      localePrintLabels += 1;
      runtimeRenders += 1;

      console.log(
        [
          `PAIR=${personalityType}-${profile}`,
          `LOCALE=${locale}`,
          `HTML=${html.length}`,
          "SECTIONS=13",
          "RENDER=PASS",
        ].join(" | "),
      );
    }

    assert.deepEqual(
      pairProfiles,
      [
        profile,
        profile,
      ],
      `${personalityType}/${profile}: locale changed report profile`,
    );

    bilingualPairs += 1;
  }
}

assert.equal(
  runtimeRenders,
  128,
  "Expected exactly 128 language-specific React UI renders.",
);

assert.equal(
  bilingualPairs,
  64,
  "Expected exactly 64 corresponding bilingual Type/Profile pairs.",
);

assert.equal(
  renderedSections,
  128 * 13,
  "Expected all canonical sections across all 128 renders.",
);

assert.equal(
  localePrintLabels,
  128,
  "Expected localized print label validation on all 128 renders.",
);

assert.ok(
  sectionBodySamples >=
    128 * 13,
  "Every rendered section must contribute body-content evidence.",
);

assert.deepEqual(
  [
    ...seenBlockTypes,
  ].sort(),
  [
    ...EXPECTED_BLOCK_TYPES,
  ].sort(),
  "The 128-report UI matrix must exercise every fixed rich-block type.",
);

console.log();
console.log(
  "===== FIXED PERSONALITY REPORT UI RENDER MATRIX =====",
);
console.log(
  "ASSESSMENT_TO_FIXED_REPORT_TO_REACT_UI_128=PASS",
);
console.log(
  "PROFILE_IDENTITY_UI_128=PASS",
);
console.log(
  "HTML_ENTITY_AWARE_SECTION_TITLES_128=PASS",
);
console.log(
  "CANONICAL_SECTION_ANCHORS_1664=PASS",
);
console.log(
  "SECTION_BODY_RENDER_COVERAGE_128=PASS",
);
console.log(
  "RICH_BLOCK_ELEMENT_COVERAGE=PASS",
);
console.log(
  "VARIABLE_SUBSTITUTION_TO_UI_128=PASS",
);
console.log(
  "LOCALIZED_PRINT_LABEL_UI_128=PASS",
);
console.log(
  "BILINGUAL_UI_PAIR_IDENTITY_64=PASS",
);
console.log(
  `RICH_BLOCK_TYPES=${seenBlockTypes.size}/7`,
);
console.log(
  `SECTION_BODY_SAMPLES=${sectionBodySamples}`,
);
console.log(
  `BILINGUAL_PAIRS=${bilingualPairs}`,
);
console.log(
  `RUNTIME_UI_RENDERS=${runtimeRenders}`,
);
console.log(
  "FIXED_PERSONALITY_REPORT_UI_RENDER_MATRIX=PASS",
);

function createAssessmentFixture(
  personalityType: PersonalityType,
  profile: ReportProfile,
): PersonalityResultContract {
  const confidence =
    PROFILE_CONFIDENCE[
      profile
    ];

  return {
    sessionId:
      `ui-${personalityType.toLowerCase()}-${profile.toLowerCase()}`,

    status:
      "completed",

    type:
      personalityType,

    scores: {
      EI:
        personalityType[0] === "E"
          ? 12
          : -12,

      SN:
        personalityType[1] === "N"
          ? 12
          : -12,

      TF:
        personalityType[2] === "F"
          ? 12
          : -12,

      JP:
        personalityType[3] === "J"
          ? 12
          : -12,
    },

    confidence: {
      EI:
        confidence,

      SN:
        confidence,

      TF:
        confidence,

      JP:
        confidence,
    },

    answered: {
      EI: 18,
      SN: 18,
      TF: 18,
      JP: 18,
    },

    tie_rule:
      "neutral",

    questionBankVersion:
      "personality-v1.0.0",

    completedAt:
      "2026-08-15T12:00:00.000Z",

    calculatedAt:
      "2026-08-15T12:00:01.000Z",
  };
}

function validateFrontMatter(
  blocks:
    readonly FixedReportRichBlock[],
  visibleText: string,
  context: string,
): void {
  assert.ok(
    blocks.length > 0,
    `${context}: front matter payload empty`,
  );

  const samples =
    collectBlockSamples(
      blocks[0]!,
    );

  assert.ok(
    samples.length > 0,
    `${context}: front matter has no visible sample`,
  );

  assert.ok(
    visibleText.includes(
      normalizeComparableText(
        samples[0]!,
      ),
    ),
    `${context}: front matter content missing from rendered UI`,
  );
}

function collectSectionBodySamples(
  blocks:
    readonly FixedReportRichBlock[],
): string[] {
  const contentBlocks =
    blocks.filter(
      block =>
        collectBlockSamples(
          block,
        ).length > 0,
    );

  if (
    contentBlocks.length === 0
  ) {
    return [];
  }

  const indexes =
    new Set<number>([
      0,
      Math.floor(
        contentBlocks.length / 2,
      ),
      contentBlocks.length - 1,
    ]);

  const samples:
    string[] = [];

  for (
    const index
    of indexes
  ) {
    const block =
      contentBlocks[index];

    if (!block) {
      continue;
    }

    const blockSamples =
      collectBlockSamples(
        block,
      );

    if (
      blockSamples[0]
    ) {
      samples.push(
        blockSamples[0],
      );
    }
  }

  return samples;
}

function collectBlockSamples(
  block: FixedReportRichBlock,
): string[] {
  switch (
    block.type
  ) {
    case "paragraph":
    case "heading":
    case "blockquote":
      return block.text.trim()
        ? [
            block.text,
          ]
        : [];

    case "unordered-list":
    case "ordered-list": {
      if (
        block.items.length === 0
      ) {
        return [];
      }

      return [
        block.items[0]!,
        block.items[
          block.items.length - 1
        ]!,
      ];
    }

    case "table": {
      const samples:
        string[] = [];

      if (
        block.header[0]
      ) {
        samples.push(
          block.header[0],
        );
      }

      const lastRow =
        block.rows[
          block.rows.length - 1
        ];

      if (
        lastRow &&
        lastRow.length > 0
      ) {
        samples.push(
          lastRow[
            lastRow.length - 1
          ]!,
        );
      }

      return samples;
    }

    case "divider":
      return [];
  }
}

function validateRichBlockElementCoverage(
  frontMatter:
    readonly FixedReportRichBlock[],
  sectionBlocks:
    readonly FixedReportRichBlock[],
  html: string,
  context: string,
): void {
  const types =
    new Set(
      [
        ...frontMatter,
        ...sectionBlocks,
      ].map(
        block =>
          block.type,
      ),
    );

  const requiredElementByType:
    Partial<
      Record<
        FixedReportRichBlock["type"],
        string
      >
    > = {
      paragraph:
        "<p",

      heading:
        "<h",

      "unordered-list":
        "<ul",

      "ordered-list":
        "<ol",

      blockquote:
        "<blockquote",

      table:
        "<table",

      divider:
        "<hr",
    };

  for (
    const type
    of types
  ) {
    const marker =
      requiredElementByType[
        type
      ];

    assert.ok(
      marker,
      `${context}: missing renderer marker mapping for ${type}`,
    );

    assert.ok(
      html.includes(
        marker,
      ),
      `${context}: payload contains ${type} but rendered HTML lacks ${marker}`,
    );
  }
}

function htmlToVisibleText(
  html: string,
): string {
  const withoutTags =
    html.replace(
      /<[^>]*>/gu,
      "",
    );

  return decodeHtmlEntities(
    withoutTags,
  );
}

function decodeHtmlEntities(
  value: string,
): string {
  return value.replace(
    /&(amp|lt|gt|quot|apos|#x[0-9a-f]+|#[0-9]+);/giu,
    (
      entity,
      token: string,
    ) => {
      const normalized =
        token.toLowerCase();

      switch (
        normalized
      ) {
        case "amp":
          return "&";

        case "lt":
          return "<";

        case "gt":
          return ">";

        case "quot":
          return '"';

        case "apos":
          return "'";

        default:
          if (
            normalized.startsWith(
              "#x",
            )
          ) {
            return String.fromCodePoint(
              Number.parseInt(
                normalized.slice(
                  2,
                ),
                16,
              ),
            );
          }

          if (
            normalized.startsWith(
              "#",
            )
          ) {
            return String.fromCodePoint(
              Number.parseInt(
                normalized.slice(
                  1,
                ),
                10,
              ),
            );
          }

          return entity;
      }
    },
  );
}

function normalizeComparableText(
  value: string,
): string {
  return value
    .replace(
      /[*`]/gu,
      "",
    )
    .replace(
      /\s+/gu,
      " ",
    )
    .trim();
}

function countOccurrences(
  value: string,
  needle: string,
): number {
  if (!needle) {
    return 0;
  }

  let count = 0;
  let offset = 0;

  while (true) {
    const index =
      value.indexOf(
        needle,
        offset,
      );

    if (
      index < 0
    ) {
      break;
    }

    count += 1;
    offset =
      index +
      needle.length;
  }

  return count;
}
