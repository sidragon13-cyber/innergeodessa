import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  CANONICAL_PERSONALITY_TYPES,
  COMPLETE_REPORT_SECTION_STANDARD,
  PERSONALITY_IMPLEMENTATION_MANIFEST,
  PERSONALITY_IMPLEMENTATION_STAGES,
  validateAllPersonalityTypes,
  validateCompletePersonalityDefinition,
  validatePersonalityImplementationManifest,
  validatePersonalityTypes,
} from "../src/data/report";
import {
  ENTP_COMPLETE_REPORT,
  ENTP_REPORT_RULES,
  validateEntpRuleSet,
} from "../src/data/report/entp";
import {
  ENTJ_COMPLETE_REPORT,
  ENTJ_REPORT_RULES,
} from "../src/data/report/entj";
import {
  ISFJ_COMPLETE_REPORT,
  ISFJ_REPORT_RULES,
} from "../src/data/report/isfj";
import {
  INTJ_COMPLETE_REPORT,
  INTJ_REPORT_RULES,
  validateIntjRuleSet,
} from "../src/data/report/intj";
import {
  INFJ_COMPLETE_REPORT,
  INFJ_REPORT_RULES,
  validateInfjRuleSet,
} from "../src/data/report/infj";
import {
  INFP_COMPLETE_REPORT,
  INFP_REPORT_RULES,
  validateInfpRuleSet,
} from "../src/data/report/infp";
import {
  ENFJ_COMPLETE_REPORT,
  ENFJ_REPORT_RULES,
  validateEnfjRuleSet,
} from "../src/data/report/enfj";
import {
  ENFP_COMPLETE_REPORT,
  ENFP_REPORT_RULES,
  validateEnfpRuleSet,
} from "../src/data/report/enfp";
import {
  ESTJ_COMPLETE_REPORT,
  ESTJ_REPORT_RULES,
  validateEstjRuleSet,
} from "../src/data/report/estj";
import {
  ESFJ_COMPLETE_REPORT,
  ESFJ_REPORT_RULES,
  validateEsfjRuleSet,
} from "../src/data/report/esfj";
import {
  INTP_COMPLETE_REPORT,
  INTP_REPORT_RULES,
  validateIntpRuleSet,
} from "../src/data/report/intp";
import {
  ISTJ_COMPLETE_REPORT,
  ISTJ_REPORT_RULES,
  validateIstjRuleSet,
} from "../src/data/report/istj";
import {
  personalityTypeCodes,
} from "../src/data/personality/types";
import {
  isPhaseOnePersonalityReportType,
} from "../src/data/report/generator/phase-one";
import {
  generatePersonalityReport,
} from "../src/data/report/generator/generate-report";

const expectedCanonicalTypes = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
] as const;

assert.equal(
  COMPLETE_REPORT_SECTION_STANDARD.length,
  18,
  "The canonical complete-report standard must contain 18 sections.",
);
assert.deepEqual(
  COMPLETE_REPORT_SECTION_STANDARD.map(
    (section) => section.order,
  ),
  Array.from({ length: 18 }, (_, index) => index + 1),
  "Canonical section order must be continuous from 1 to 18.",
);
assert.equal(
  new Set(
    COMPLETE_REPORT_SECTION_STANDARD.map(
      (section) => section.id,
    ),
  ).size,
  COMPLETE_REPORT_SECTION_STANDARD.length,
  "Canonical section ids must be unique.",
);

assert.equal(
  PERSONALITY_IMPLEMENTATION_MANIFEST.length,
  personalityTypeCodes.length,
  "The implementation manifest must contain all 16 personality types.",
);

assert.deepEqual(
  [...PERSONALITY_IMPLEMENTATION_MANIFEST]
    .map((entry) => entry.personalityType)
    .sort(),
  [...personalityTypeCodes].sort(),
  "Every personality type must appear exactly once in the implementation manifest.",
);
assert.deepEqual(
  [...CANONICAL_PERSONALITY_TYPES].sort(),
  [...expectedCanonicalTypes].sort(),
  "The canonical personality registry must contain exactly the expected 16 types.",
);

assert(
  !new Set<string>(
    PERSONALITY_IMPLEMENTATION_STAGES,
  ).has("in_progress"),
  'The generic "in_progress" stage must not remain in the status model.',
);

const entpStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "ENTP",
  );
assert.deepEqual(
  entpStatus?.stages,
  ["domain_complete", "validated"],
  "ENTP must be domain-complete and validated.",
);
const intjStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "INTJ",
  );
assert.deepEqual(
  intjStatus?.stages,
  ["domain_complete", "validated"],
  "INTJ must be domain-complete and validated.",
);
const intpStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "INTP",
  );
assert.deepEqual(
  intpStatus?.stages,
  ["domain_complete", "validated"],
  "INTP must be domain-complete and validated.",
);
const infjStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "INFJ",
  );
assert.deepEqual(
  infjStatus?.stages,
  ["domain_complete", "validated"],
  "INFJ must be domain-complete and validated.",
);
const infpStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "INFP",
  );
assert.deepEqual(
  infpStatus?.stages,
  ["domain_complete", "validated"],
  "INFP must be domain-complete and validated.",
);
const enfjStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "ENFJ",
  );
assert.deepEqual(
  enfjStatus?.stages,
  ["domain_complete", "validated"],
  "ENFJ must be domain-complete and validated.",
);
const enfpStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "ENFP",
  );
assert.deepEqual(
  enfpStatus?.stages,
  ["domain_complete", "validated"],
  "ENFP must be domain-complete and validated.",
);
const istjStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "ISTJ",
  );
assert.deepEqual(
  istjStatus?.stages,
  ["domain_complete", "validated"],
  "ISTJ must be domain-complete and validated.",
);
const estjStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "ESTJ",
  );
assert.deepEqual(
  estjStatus?.stages,
  ["domain_complete", "validated"],
  "ESTJ must be domain-complete and validated.",
);
const esfjStatus =
  PERSONALITY_IMPLEMENTATION_MANIFEST.find(
    (entry) => entry.personalityType === "ESFJ",
  );
assert.deepEqual(
  esfjStatus?.stages,
  ["domain_complete", "validated"],
  "ESFJ must be domain-complete and validated.",
);

const manifestValidation =
  validatePersonalityImplementationManifest();
assert.equal(
  manifestValidation.valid,
  true,
  manifestValidation.issues
    .map(
      (issue) =>
        `${issue.personalityType} ${issue.path}: ${issue.message}`,
    )
    .join("\n"),
);

const malformedManifestValidation =
  validatePersonalityImplementationManifest([
    ...PERSONALITY_IMPLEMENTATION_MANIFEST.filter(
      (entry) => entry.personalityType !== "ESFP",
    ),
    {
      personalityType: "ISFJ",
      stages: ["validated"],
    },
    {
      personalityType: "ABCD",
      stages: ["not_started"],
    },
  ]);
assert(
  !malformedManifestValidation.valid &&
    malformedManifestValidation.issues.some(
      (issue) =>
        issue.personalityType === "ISFJ" &&
        issue.message.includes("duplicate"),
    ) &&
    malformedManifestValidation.issues.some(
      (issue) =>
        issue.personalityType === "ESFP" &&
        issue.message.includes("missing"),
    ) &&
    malformedManifestValidation.issues.some(
      (issue) =>
        issue.personalityType === "ABCD" &&
        issue.message.includes("unsupported"),
    ),
  "Manifest validation must detect duplicate, missing, and unsupported personality types.",
);

for (const [definition, rules] of [
  [ISFJ_COMPLETE_REPORT, ISFJ_REPORT_RULES],
  [ENTJ_COMPLETE_REPORT, ENTJ_REPORT_RULES],
  [ENTP_COMPLETE_REPORT, ENTP_REPORT_RULES],
  [INTJ_COMPLETE_REPORT, INTJ_REPORT_RULES],
  [INTP_COMPLETE_REPORT, INTP_REPORT_RULES],
  [INFJ_COMPLETE_REPORT, INFJ_REPORT_RULES],
  [INFP_COMPLETE_REPORT, INFP_REPORT_RULES],
  [ENFJ_COMPLETE_REPORT, ENFJ_REPORT_RULES],
  [ENFP_COMPLETE_REPORT, ENFP_REPORT_RULES],
  [ISTJ_COMPLETE_REPORT, ISTJ_REPORT_RULES],
  [ESTJ_COMPLETE_REPORT, ESTJ_REPORT_RULES],
  [ESFJ_COMPLETE_REPORT, ESFJ_REPORT_RULES],
] as const) {
  const validation = validateCompletePersonalityDefinition(
    definition.personalityType,
    definition,
    rules,
  );

  assert.equal(
    validation.valid,
    true,
    `${definition.personalityType} must satisfy the complete-personality standard:\n${validation.issues
      .map((issue) => `${issue.path}: ${issue.message}`)
      .join("\n")}`,
  );
  assert(
    validation.issues.every(
      (issue) =>
        issue.personalityType ===
        definition.personalityType,
    ),
    "Single-personality issues must identify their owning personality type.",
  );
}

const frontendEnabledTypes =
  PERSONALITY_IMPLEMENTATION_MANIFEST
    .filter((entry) =>
      entry.stages.includes("frontend_enabled"),
    )
    .map((entry) => entry.personalityType);

assert.deepEqual(
  [...frontendEnabledTypes].sort(),
  personalityTypeCodes
    .filter(isPhaseOnePersonalityReportType)
    .sort(),
  "Frontend-enabled manifest entries must exactly match the Phase 1 whitelist.",
);

for (const entry of PERSONALITY_IMPLEMENTATION_MANIFEST) {
  assert(
    entry.stages.length > 0,
    `${entry.personalityType} must have at least one implementation stage.`,
  );
  assert.equal(
    new Set(entry.stages).size,
    entry.stages.length,
    `${entry.personalityType} must not repeat implementation stages.`,
  );
  assert(
    entry.stages.every((stage) =>
      PERSONALITY_IMPLEMENTATION_STAGES.includes(stage),
    ),
    `${entry.personalityType} contains an unsupported implementation stage.`,
  );

  if (entry.stages.includes("validated")) {
    assert(
      entry.stages.includes("domain_complete"),
      `${entry.personalityType} cannot be validated before domain completion.`,
    );
  }

  if (entry.stages.includes("frontend_enabled")) {
    assert(
      entry.stages.includes("domain_complete") &&
        entry.stages.includes("validated"),
      `${entry.personalityType} cannot be frontend-enabled before domain completion and validation.`,
    );
  }

  if (
    entry.stages.includes("domain_complete") ||
    entry.stages.includes("validated")
  ) {
    const report = generatePersonalityReport({
      sessionId: `expansion-${entry.personalityType.toLowerCase()}`,
      personalityType: entry.personalityType,
      dimensions: {
        EI: { dimension: "EI", score: 50, confidence: 80 },
        SN: { dimension: "SN", score: 50, confidence: 80 },
        TF: { dimension: "TF", score: 50, confidence: 80 },
        JP: { dimension: "JP", score: 50, confidence: 80 },
      },
      accessLevel: "premium",
      generatedAt: "2026-07-28T00:00:00.000Z",
    });

    assert.equal(
      report.sections.length,
      COMPLETE_REPORT_SECTION_STANDARD.length,
      `${entry.personalityType} must generate all canonical sections.`,
    );
  }
}

const selectedValidation = validatePersonalityTypes([
  "ISFJ",
  "ENTJ",
]);
assert.equal(
  selectedValidation.valid,
  true,
  "Selected-list validation must validate complete personalities.",
);
assert.equal(
  selectedValidation.personalities.length,
  2,
  "Selected-list validation must return one result per selected type.",
);

const allPersonalityValidation =
  validateAllPersonalityTypes();
assert.equal(
  allPersonalityValidation.valid,
  true,
  allPersonalityValidation.issues
    .filter((issue) => issue.severity === "error")
    .map(
      (issue) =>
        `${issue.personalityType} ${issue.path}: ${issue.message}`,
    )
    .join("\n"),
);
assert.equal(
  allPersonalityValidation.personalities.length,
  16,
  "All-personality validation must return all 16 canonical types.",
);
assert.equal(
  allPersonalityValidation.issues.filter(
    (issue) => issue.personalityType === "ENTP",
  ).length,
  0,
  "Completed ENTP content must not retain scaffold duplication or incomplete issues.",
);

const entpRuleValidation = validateEntpRuleSet();
assert.equal(
  entpRuleValidation.valid,
  true,
  entpRuleValidation.errors.join("\n"),
);
const intjRuleValidation = validateIntjRuleSet();
assert.equal(
  intjRuleValidation.valid,
  true,
  intjRuleValidation.errors.join("\n"),
);
const intpRuleValidation = validateIntpRuleSet();
assert.equal(
  intpRuleValidation.valid,
  true,
  intpRuleValidation.errors.join("\n"),
);
const infjRuleValidation = validateInfjRuleSet();
assert.equal(
  infjRuleValidation.valid,
  true,
  infjRuleValidation.errors.join("\n"),
);
const infpRuleValidation = validateInfpRuleSet();
assert.equal(
  infpRuleValidation.valid,
  true,
  infpRuleValidation.errors.join("\n"),
);
const enfjRuleValidation = validateEnfjRuleSet();
assert.equal(
  enfjRuleValidation.valid,
  true,
  enfjRuleValidation.errors.join("\n"),
);
const enfpRuleValidation = validateEnfpRuleSet();
assert.equal(
  enfpRuleValidation.valid,
  true,
  enfpRuleValidation.errors.join("\n"),
);
const istjRuleValidation = validateIstjRuleSet();
assert.equal(
  istjRuleValidation.valid,
  true,
  istjRuleValidation.errors.join("\n"),
);
const estjRuleValidation = validateEstjRuleSet();
assert.equal(
  estjRuleValidation.valid,
  true,
  estjRuleValidation.errors.join("\n"),
);
const esfjRuleValidation = validateEsfjRuleSet();
assert.equal(
  esfjRuleValidation.valid,
  true,
  esfjRuleValidation.errors.join("\n"),
);

const placeholderDefinition = {
  ...ISFJ_COMPLETE_REPORT,
  sections: ISFJ_COMPLETE_REPORT.sections.map(
    (section, sectionIndex) => ({
      ...section,
      contentBlocks: section.contentBlocks.map(
        (block, blockIndex) => ({
          ...block,
          content: {
            ...block.content,
            en:
              sectionIndex === 0 && blockIndex === 0
                ? "TODO: replace this placeholder with complete report content."
                : block.content.en,
          },
        }),
      ),
    }),
  ),
};
const placeholderValidation =
  validateCompletePersonalityDefinition(
    "ISFJ",
    placeholderDefinition,
    ISFJ_REPORT_RULES,
  );
assert(
  placeholderValidation.issues.some(
    (issue) =>
      issue.path ===
        "sections[0].contentBlocks[0].content.en" &&
      issue.message.includes("placeholder"),
  ),
  "The completeness validator must reject placeholder report content.",
);

const wrongIdentityDefinition = {
  ...ISFJ_COMPLETE_REPORT,
  sections: ISFJ_COMPLETE_REPORT.sections.map(
    (section) => ({
      ...section,
      contentBlocks: section.contentBlocks.map(
        (block, blockIndex) => ({
          ...block,
          content:
            section.id === "report-identity" &&
            blockIndex === 0
              ? {
                  ...block.content,
                  en: "This ENTJ complete report identity was accidentally copied into the ISFJ definition.",
                }
              : { ...block.content },
        }),
      ),
    }),
  ),
};
const wrongIdentityValidation =
  validateCompletePersonalityDefinition(
    "ISFJ",
    wrongIdentityDefinition,
    ISFJ_REPORT_RULES,
  );
assert(
  wrongIdentityValidation.issues.some(
    (issue) =>
      issue.path === "definition.reportIdentity" &&
      issue.message.includes("ENTJ"),
  ),
  "The completeness validator must reject another personality code in report identity content.",
);

const invalidTargetRules = ISFJ_REPORT_RULES.map(
  (rule, ruleIndex) => ({
    ...rule,
    content: rule.content.map(
      (content, contentIndex) => ({
        ...content,
        targetSectionId:
          ruleIndex === 0 && contentIndex === 0
            ? "unknown-section"
            : content.targetSectionId,
      }),
    ),
  }),
);
const invalidTargetValidation =
  validateCompletePersonalityDefinition(
    "ISFJ",
    ISFJ_COMPLETE_REPORT,
    invalidTargetRules,
  );
assert(
  invalidTargetValidation.issues.some(
    (issue) =>
      issue.path.endsWith(".targetSectionId") &&
      issue.message.includes("unknown section"),
  ),
  "The completeness validator must reject rules that target unknown sections.",
);

const documentation = fs.readFileSync(
  path.join(
    process.cwd(),
    "docs/personality-expansion-standard.md",
  ),
  "utf8",
);

for (const stage of [
  "A. Domain implementation",
  "B. Dynamic rules",
  "C. Generator validation",
  "D. Structural validation",
  "E. Frontend eligibility",
  "F. Browser acceptance",
  "G. Print acceptance",
  "H. Commit and tag",
]) {
  assert(
    documentation.includes(stage),
    `Expansion documentation must include "${stage}".`,
  );
}

for (const batch of [
  "Batch A — Analysts",
  "Batch B — Diplomats",
  "Batch C — Sentinels",
  "Batch D — Explorers",
  "Batch E — Release expansion",
]) {
  assert(
    documentation.includes(batch),
    `Expansion documentation must include "${batch}".`,
  );
}

for (const command of [
  "npm run validate:personality -- ENTP",
  "npm run validate:personality-family -- analysts",
  "npm run validate:personality-all",
]) {
  assert(
    documentation.includes(command),
    `Expansion documentation must include "${command}".`,
  );
}

console.log(
  "Personality expansion standard validation passed.",
);
