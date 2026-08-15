import assert from "node:assert/strict";
import {
  createHash,
} from "node:crypto";
import {
  readFileSync,
} from "node:fs";

import {
  FIXED_PERSONALITY_REPORT_MARKDOWN,
} from "../src/data/report/fixed-assets/generated-report-markdown";

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

type Locale =
  (typeof LOCALES)[number];

type PersonalityType =
  (typeof PERSONALITY_TYPES)[number];

type Profile =
  (typeof PROFILES)[number];

function expectedSourcePath(
  locale: Locale,
  personalityType: PersonalityType,
  profile: Profile,
): string {
  const directory =
    personalityType.toLowerCase();

  const file =
    `InnerGeo_${personalityType}_Profile_${profile}_FINAL_Customer_v1.md`;

  return locale === "en"
    ? `docs/assessment-professionalization/final-report/en/${directory}/${file}`
    : `docs/assessment-professionalization/final-report/${directory}/${file}`;
}

function sha256(
  value: string,
): string {
  return createHash(
    "sha256",
  )
    .update(
      value,
      "utf8",
    )
    .digest(
      "hex",
    );
}

function expectedTitle(
  locale: Locale,
  personalityType: PersonalityType,
): string {
  return locale === "zh"
    ? `InnerGeo ${personalityType} 专业人格报告`
    : `InnerGeo ${personalityType} Professional Personality Report`;
}

console.log(
  "===== FIXED PERSONALITY REPORT ASSET INTEGRITY =====",
);

let checked = 0;

const sourcePaths =
  new Set<string>();

const sourceHashes =
  new Map<
    string,
    string
  >();

for (const locale of LOCALES) {
  for (
    const personalityType
    of PERSONALITY_TYPES
  ) {
    for (
      const profile
      of PROFILES
    ) {
      const key =
        `${locale}/${personalityType}/${profile}`;

      const asset =
        FIXED_PERSONALITY_REPORT_MARKDOWN[
          locale
        ][
          personalityType
        ][
          profile
        ];

      const expectedPath =
        expectedSourcePath(
          locale,
          personalityType,
          profile,
        );

      assert.equal(
        asset.sourcePath,
        expectedPath,
        `Registry sourcePath identity mismatch: ${key}`,
      );

      assert.equal(
        sourcePaths.has(
          asset.sourcePath,
        ),
        false,
        `Registry sourcePath reused by multiple report identities: ${asset.sourcePath}`,
      );

      sourcePaths.add(
        asset.sourcePath,
      );

      const physicalMarkdown =
        readFileSync(
          asset.sourcePath,
          "utf8",
        );

      assert.equal(
        asset.markdown,
        physicalMarkdown,
        `Embedded runtime Markdown must exactly equal physical source: ${key}`,
      );

      const physicalSha =
        sha256(
          physicalMarkdown,
        );

      assert.equal(
        asset.sha256,
        physicalSha,
        `Registry SHA-256 must match physical source content: ${key}`,
      );

      assert.equal(
        sha256(
          asset.markdown,
        ),
        asset.sha256,
        `Embedded runtime Markdown SHA-256 must match registry SHA: ${key}`,
      );

      assert.equal(
        sourceHashes.has(
          asset.sourcePath,
        ),
        false,
        `Source path hash record duplicated unexpectedly: ${asset.sourcePath}`,
      );

      sourceHashes.set(
        asset.sourcePath,
        physicalSha,
      );

      assert.ok(
        physicalMarkdown.includes(
          expectedTitle(
            locale,
            personalityType,
          ),
        ),
        `Report title identity mismatch: ${key}`,
      );

      assert.ok(
        physicalMarkdown.includes(
          `Profile ${profile} —`,
        ),
        `Report Profile identity mismatch: ${key}`,
      );

      const profileHeadings =
        physicalMarkdown
          .split("\n")
          .filter(
            line =>
              /^## Profile [ABCD] — /.test(
                line,
              ),
          );

      assert.equal(
        profileHeadings.length,
        1,
        `Report must contain exactly one canonical Profile identity heading: ${key}`,
      );

      assert.match(
        profileHeadings[0] ?? "",
        new RegExp(
          `^## Profile ${profile} — `,
        ),
        `Canonical Profile identity heading mismatch: ${key}`,
      );

      if (locale === "en") {
        assert.equal(
          asset.sourcePath.startsWith(
            "docs/assessment-professionalization/final-report/en/",
          ),
          true,
          `English report must resolve from /en/ source tree: ${key}`,
        );
      } else {
        assert.equal(
          asset.sourcePath.startsWith(
            "docs/assessment-professionalization/final-report/en/",
          ),
          false,
          `Chinese report must not resolve from /en/ source tree: ${key}`,
        );
      }

      checked += 1;
    }
  }
}

assert.equal(
  checked,
  128,
  "Asset-integrity validator must inspect exactly 128 report identities.",
);

assert.equal(
  sourcePaths.size,
  128,
  "All 128 report identities must use unique source paths.",
);

assert.equal(
  sourceHashes.size,
  128,
  "All 128 report identities must have independently verified source hashes.",
);

console.log(
  "TYPE_PROFILE_LOCALE_MAPPING=PASS",
);

console.log(
  "SOURCE_PATH_IDENTITY=PASS",
);

console.log(
  "EMBEDDED_MARKDOWN_PARITY=PASS",
);

console.log(
  "SOURCE_SHA256=PASS",
);

console.log(
  "REPORT_IDENTITY_MARKERS=PASS",
);

console.log(
  "REPORTS_CHECKED=128",
);

console.log(
  "===== FIXED PERSONALITY REPORT ASSET INTEGRITY PASS =====",
);
