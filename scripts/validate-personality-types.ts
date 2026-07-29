import fs from "node:fs";
import path from "node:path";

import {
  CANONICAL_PERSONALITY_TYPES,
  PERSONALITY_IMPLEMENTATION_MANIFEST,
  validateAllPersonalityTypes,
  validatePersonalityTypes,
} from "../src/data/report";
import type {
  PersonalityBatchValidationIssue,
  PersonalityBatchValidationResult,
} from "../src/data/report";
import type {
  PersonalityTypeCode,
} from "../src/data/personality/types";
import {
  getCompletePersonalityReport,
} from "../src/data/report/generator/registry";

const PERSONALITY_FAMILIES: Readonly<
  Record<string, readonly PersonalityTypeCode[]>
> = {
  analysts: ["ENTJ", "ENTP", "INTJ", "INTP"],
  diplomats: ["INFJ", "INFP", "ENFJ", "ENFP"],
  sentinels: ["ISTJ", "ESTJ", "ESFJ"],
  explorers: ["ISTP", "ISFP", "ESTP", "ESFP"],
};

const selection = parseSelection(process.argv.slice(2));
const validation = selection.all
  ? validateAllPersonalityTypes()
  : validatePersonalityTypes(selection.personalityTypes);
const sourceIssues = validateExportConventions(
  selection.personalityTypes,
);
const result = mergeIssues(validation, sourceIssues);

printResult(result);

if (!result.valid) {
  process.exitCode = 1;
}

function parseSelection(args: readonly string[]): {
  all: boolean;
  personalityTypes: readonly PersonalityTypeCode[];
} {
  if (args.length === 1 && args[0] === "--all") {
    return {
      all: true,
      personalityTypes: CANONICAL_PERSONALITY_TYPES,
    };
  }

  if (args[0] === "--family") {
    const family = args[1]?.toLowerCase();
    const personalityTypes = family
      ? PERSONALITY_FAMILIES[family]
      : undefined;
    if (!personalityTypes || args.length !== 2) {
      fail(
        `Unknown or missing personality family. Expected one of: ${Object.keys(
          PERSONALITY_FAMILIES,
        ).join(", ")}.`,
      );
    }
    return { all: false, personalityTypes };
  }

  if (args.length === 0) {
    fail(
      "Missing personality type. Use a canonical type such as ENTP.",
    );
  }

  const canonicalTypes = new Set<string>(
    CANONICAL_PERSONALITY_TYPES,
  );
  const personalityTypes = args.map((value) =>
    value.toUpperCase(),
  );
  const unsupported = personalityTypes.find(
    (value) => !canonicalTypes.has(value),
  );
  if (unsupported) {
    fail(`Unsupported personality type "${unsupported}".`);
  }

  return {
    all: false,
    personalityTypes: CANONICAL_PERSONALITY_TYPES.filter(
      (personalityType) =>
        personalityTypes.includes(personalityType),
    ),
  };
}

function validateExportConventions(
  personalityTypes: readonly PersonalityTypeCode[],
): PersonalityBatchValidationIssue[] {
  return personalityTypes.flatMap((personalityType) => {
    if (!getCompletePersonalityReport(personalityType)) {
      return [];
    }

    const lowerType = personalityType.toLowerCase();
    const directory = path.join(
      process.cwd(),
      "src/data/report",
      lowerType,
    );
    const indexSource = readSource(
      path.join(directory, "index.ts"),
    );
    const reportSource = readSource(
      path.join(directory, "report.ts"),
    );
    const ruleSource = [
      readSource(
        path.join(directory, "rules/index.ts"),
      ),
      readSource(
        path.join(directory, "rules/validation.ts"),
      ),
    ].join("\n");
    const definitionSymbol =
      `${personalityType}_COMPLETE_REPORT`;
    const rulesSymbol = `${personalityType}_REPORT_RULES`;
    const severity = getSeverity(personalityType);
    const issues: PersonalityBatchValidationIssue[] = [];

    validateExpectedSymbol(
      personalityType,
      "report.ts",
      definitionSymbol,
      reportSource,
      severity,
      issues,
    );
    validateExpectedSymbol(
      personalityType,
      "index.ts",
      definitionSymbol,
      indexSource,
      severity,
      issues,
    );
    validateExpectedSymbol(
      personalityType,
      "rules",
      rulesSymbol,
      ruleSource,
      severity,
      issues,
    );
    validateExpectedSymbol(
      personalityType,
      "index.ts",
      rulesSymbol,
      indexSource,
      severity,
      issues,
    );
    validateForeignSymbols(
      personalityType,
      `${reportSource}\n${ruleSource}\n${indexSource}`,
      severity,
      issues,
    );

    return issues;
  });
}

function validateExpectedSymbol(
  personalityType: PersonalityTypeCode,
  pathLabel: string,
  symbol: string,
  source: string,
  severity: "error" | "incomplete",
  issues: PersonalityBatchValidationIssue[],
): void {
  if (!source.includes(symbol)) {
    issues.push({
      personalityType,
      path: `exports.${pathLabel}`,
      message: `must export owning personality symbol "${symbol}".`,
      severity,
    });
  }
}

function validateForeignSymbols(
  personalityType: PersonalityTypeCode,
  source: string,
  severity: "error" | "incomplete",
  issues: PersonalityBatchValidationIssue[],
): void {
  const matches = source.matchAll(
    /\b([A-Z]{4})_(?:COMPLETE_REPORT|REPORT_RULES)\b/g,
  );
  const foreignTypes = new Set<string>();

  for (const match of matches) {
    const symbolType = match[1];
    if (symbolType !== personalityType) {
      foreignTypes.add(symbolType);
    }
  }

  foreignTypes.forEach((foreignType) => {
    issues.push({
      personalityType,
      path: "exports",
      message: `contains exported personality symbol for "${foreignType}".`,
      severity,
    });
  });
}

function getSeverity(
  personalityType: PersonalityTypeCode,
): "error" | "incomplete" {
  const stages =
    PERSONALITY_IMPLEMENTATION_MANIFEST.find(
      (entry) =>
        entry.personalityType === personalityType,
    )?.stages ?? [];

  return stages.includes("domain_complete") ||
    stages.includes("validated") ||
    stages.includes("frontend_enabled")
    ? "error"
    : "incomplete";
}

function mergeIssues(
  validation: PersonalityBatchValidationResult,
  sourceIssues: readonly PersonalityBatchValidationIssue[],
): PersonalityBatchValidationResult {
  const personalities = validation.personalities.map(
    (personality) => {
      const matchingSourceIssues = sourceIssues.filter(
        (issue) =>
          issue.personalityType ===
          personality.personalityType,
      );
      const issues = [
        ...personality.issues,
        ...matchingSourceIssues,
      ];

      return {
        ...personality,
        valid: !issues.some(
          (issue) => issue.severity === "error",
        ),
        issues,
      };
    },
  );
  const issues = [
    ...validation.issues,
    ...sourceIssues,
  ];

  return {
    valid: !issues.some(
      (issue) => issue.severity === "error",
    ),
    personalities,
    issues,
  };
}

function printResult(
  result: PersonalityBatchValidationResult,
): void {
  console.log("Personality report implementation status");
  console.log("========================================");

  result.personalities.forEach((personality) => {
    console.log(
      `${personality.personalityType}: ${personality.stages.join(", ")}`,
    );
    personality.issues.forEach((issue) => {
      const marker =
        issue.severity === "error" ? "ERROR" : "INCOMPLETE";
      console.log(
        `  ${marker} ${issue.path}: ${issue.message}`,
      );
    });
  });

  if (result.valid) {
    console.log(
      "\nPASS — all selected implementation states are truthful and structurally valid.",
    );
  } else {
    console.error(
      "\nFAIL — personality implementation validation found errors.",
    );
  }
}

function readSource(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function fail(message: string): never {
  throw new Error(message);
}
