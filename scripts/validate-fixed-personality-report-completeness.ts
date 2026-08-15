import assert from "node:assert/strict";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import {
  join,
  relative,
} from "node:path";

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

const SOURCE_ROOT =
  "docs/assessment-professionalization/final-report";

const CANONICAL_FILENAME =
  /^InnerGeo_(INTJ|INTP|ENTJ|ENTP|INFJ|INFP|ENFJ|ENFP|ISTJ|ISFJ|ESTJ|ESFJ|ISTP|ISFP|ESTP|ESFP)_Profile_([ABCD])_FINAL_Customer_v1\.md$/;

type Locale =
  (typeof LOCALES)[number];

type PersonalityType =
  (typeof PERSONALITY_TYPES)[number];

type Profile =
  (typeof PROFILES)[number];

interface CanonicalSource {
  readonly locale: Locale;
  readonly personalityType:
    PersonalityType;
  readonly profile:
    Profile;
  readonly sourcePath: string;
}

function walkMarkdownFiles(
  directory: string,
): readonly string[] {
  const files: string[] = [];

  for (
    const entry
    of readdirSync(
      directory,
      {
        withFileTypes: true,
      },
    )
  ) {
    const path =
      join(
        directory,
        entry.name,
      );

    if (entry.isDirectory()) {
      files.push(
        ...walkMarkdownFiles(path),
      );

      continue;
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".md")
    ) {
      files.push(path);
    }
  }

  return files;
}

function classifyCanonicalSource(
  sourcePath: string,
): CanonicalSource | null {
  const fileName =
    sourcePath.split("/").at(-1);

  if (!fileName) {
    return null;
  }

  const match =
    CANONICAL_FILENAME.exec(
      fileName,
    );

  if (!match) {
    return null;
  }

  const personalityType =
    match[1] as PersonalityType;

  const profile =
    match[2] as Profile;

  const relativePath =
    relative(
      SOURCE_ROOT,
      sourcePath,
    ).replaceAll("\\", "/");

  const locale: Locale =
    relativePath.startsWith("en/")
      ? "en"
      : "zh";

  return {
    locale,
    personalityType,
    profile,
    sourcePath:
      sourcePath.replaceAll(
        "\\",
        "/",
      ),
  };
}

function combinationKey(
  locale: Locale,
  personalityType:
    PersonalityType,
  profile: Profile,
): string {
  return [
    locale,
    personalityType,
    profile,
  ].join("/");
}

console.log(
  "===== FIXED PERSONALITY REPORT COMPLETENESS =====",
);

assert.equal(
  existsSync(SOURCE_ROOT),
  true,
  "Canonical fixed-report source root must exist.",
);

const expectedCombinations =
  new Set<string>();

for (const locale of LOCALES) {
  for (
    const personalityType
    of PERSONALITY_TYPES
  ) {
    for (
      const profile
      of PROFILES
    ) {
      expectedCombinations.add(
        combinationKey(
          locale,
          personalityType,
          profile,
        ),
      );
    }
  }
}

assert.equal(
  expectedCombinations.size,
  128,
  "Canonical report matrix must contain exactly 128 combinations.",
);

const allMarkdownFiles =
  walkMarkdownFiles(
    SOURCE_ROOT,
  );

const physicalSources =
  allMarkdownFiles
    .map(
      classifyCanonicalSource,
    )
    .filter(
      (
        value,
      ): value is CanonicalSource =>
        value !== null,
    );

const physicalCombinations =
  new Map<
    string,
    CanonicalSource[]
  >();

for (
  const source
  of physicalSources
) {
  const key =
    combinationKey(
      source.locale,
      source.personalityType,
      source.profile,
    );

  const existing =
    physicalCombinations.get(
      key,
    ) ?? [];

  existing.push(source);

  physicalCombinations.set(
    key,
    existing,
  );
}

assert.equal(
  physicalSources.length,
  128,
  "Physical canonical source set must contain exactly 128 reports.",
);

assert.deepEqual(
  new Set(
    physicalCombinations.keys(),
  ),
  expectedCombinations,
  "Physical canonical source set must cover exactly zh/en × 16 types × A/B/C/D.",
);

for (
  const [
    key,
    sources,
  ] of physicalCombinations
) {
  assert.equal(
    sources.length,
    1,
    `Physical report combination must be unique: ${key}`,
  );

  const source =
    sources[0];

  assert.ok(
    statSync(
      source.sourcePath,
    ).size > 0,
    `Physical source report must not be empty: ${source.sourcePath}`,
  );
}

console.log(
  "PHYSICAL_128=PASS",
);

const registryLocales =
  Object.keys(
    FIXED_PERSONALITY_REPORT_MARKDOWN,
  ).sort();

assert.deepEqual(
  registryLocales,
  [...LOCALES].sort(),
  "Runtime registry must expose exactly zh and en locales.",
);

const registryCombinations =
  new Set<string>();

const registrySourcePaths =
  new Set<string>();

for (const locale of LOCALES) {
  const localeRegistry =
    FIXED_PERSONALITY_REPORT_MARKDOWN[
      locale
    ];

  assert.deepEqual(
    Object.keys(
      localeRegistry,
    ).sort(),
    [...PERSONALITY_TYPES].sort(),
    `Registry locale ${locale} must contain exactly all 16 personality types.`,
  );

  for (
    const personalityType
    of PERSONALITY_TYPES
  ) {
    const typeRegistry =
      localeRegistry[
        personalityType
      ];

    assert.deepEqual(
      Object.keys(
        typeRegistry,
      ).sort(),
      [...PROFILES].sort(),
      `Registry ${locale}/${personalityType} must contain exactly Profiles A/B/C/D.`,
    );

    for (
      const profile
      of PROFILES
    ) {
      const asset =
        typeRegistry[
          profile
        ];

      const key =
        combinationKey(
          locale,
          personalityType,
          profile,
        );

      registryCombinations.add(
        key,
      );

      assert.equal(
        typeof asset.sourcePath,
        "string",
        `Registry sourcePath must be a string: ${key}`,
      );

      assert.ok(
        asset.sourcePath.length > 0,
        `Registry sourcePath must not be empty: ${key}`,
      );

      assert.equal(
        existsSync(
          asset.sourcePath,
        ),
        true,
        `Registry sourcePath must exist: ${key} -> ${asset.sourcePath}`,
      );

      assert.equal(
        registrySourcePaths.has(
          asset.sourcePath,
        ),
        false,
        `Registry sourcePath must be unique: ${asset.sourcePath}`,
      );

      registrySourcePaths.add(
        asset.sourcePath,
      );

      assert.equal(
        typeof asset.sha256,
        "string",
        `Registry sha256 must be a string: ${key}`,
      );

      assert.match(
        asset.sha256,
        /^[a-f0-9]{64}$/,
        `Registry sha256 must be a canonical SHA-256 digest: ${key}`,
      );

      assert.equal(
        typeof asset.markdown,
        "string",
        `Registry markdown must be a string: ${key}`,
      );

      assert.ok(
        asset.markdown.length > 0,
        `Registry markdown must not be empty: ${key}`,
      );
    }
  }
}

assert.equal(
  registryCombinations.size,
  128,
  "Runtime registry must contain exactly 128 unique report combinations.",
);

assert.deepEqual(
  registryCombinations,
  expectedCombinations,
  "Runtime registry must cover exactly zh/en × 16 types × A/B/C/D.",
);

assert.equal(
  registrySourcePaths.size,
  128,
  "Runtime registry must reference exactly 128 unique source paths.",
);

console.log(
  "REGISTRY_128=PASS",
);

const physicalSourcePaths =
  new Set(
    physicalSources.map(
      ({
        sourcePath,
      }) => sourcePath,
    ),
  );

assert.deepEqual(
  registrySourcePaths,
  physicalSourcePaths,
  "Runtime registry source paths must exactly equal the 128 canonical physical source reports.",
);

console.log(
  "SOURCE_REGISTRY_PARITY=PASS",
);

for (const locale of LOCALES) {
  const count =
    [...registryCombinations]
      .filter(
        key =>
          key.startsWith(
            `${locale}/`,
          ),
      )
      .length;

  assert.equal(
    count,
    64,
    `Locale ${locale} must contain exactly 64 fixed reports.`,
  );

  console.log(
    `${locale.toUpperCase()}_64=PASS`,
  );
}

const nonCanonicalMarkdown =
  allMarkdownFiles.filter(
    path =>
      classifyCanonicalSource(
        path,
      ) === null,
  );

console.log(
  `NON_CANONICAL_MD=${nonCanonicalMarkdown.length}`,
);

for (
  const path
  of nonCanonicalMarkdown
) {
  console.log(
    `NON_CANONICAL=${path}`,
  );
}

console.log(
  "EXPECTED_MATRIX=2×16×4=128",
);

console.log(
  "===== FIXED PERSONALITY REPORT COMPLETENESS PASS =====",
);
