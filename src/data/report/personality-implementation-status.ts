import type {
  PersonalityTypeCode,
} from "../personality/types";
import {
  personalityTypeCodes,
} from "../personality/types";

export const PERSONALITY_IMPLEMENTATION_STAGES = [
  "not_started",
  "content_in_progress",
  "rules_in_progress",
  "domain_complete",
  "validated",
  "frontend_enabled",
] as const;

export type PersonalityImplementationStage =
  (typeof PERSONALITY_IMPLEMENTATION_STAGES)[number];

export interface PersonalityImplementationStatus {
  personalityType: PersonalityTypeCode;
  stages: readonly PersonalityImplementationStage[];
}

export interface PersonalityManifestValidationIssue {
  personalityType: string;
  path: string;
  message: string;
}

export interface PersonalityManifestValidationResult {
  valid: boolean;
  issues: PersonalityManifestValidationIssue[];
}

export interface PersonalityImplementationManifestEntry {
  personalityType: string;
  stages: readonly string[];
}

export const CANONICAL_PERSONALITY_TYPES:
  readonly PersonalityTypeCode[] = Object.freeze([
    ...personalityTypeCodes,
  ]);

export const PERSONALITY_IMPLEMENTATION_MANIFEST:
  readonly PersonalityImplementationStatus[] =
  Object.freeze([
    entry("INTJ", ["domain_complete", "validated"]),
    entry("INTP", ["domain_complete", "validated"]),
    entry("ENTJ", [
      "domain_complete",
      "validated",
      "frontend_enabled",
    ]),
    entry("ENTP", ["domain_complete", "validated"]),
    entry("INFJ", ["not_started"]),
    entry("INFP", ["not_started"]),
    entry("ENFJ", ["not_started"]),
    entry("ENFP", ["not_started"]),
    entry("ISTJ", ["not_started"]),
    entry("ISFJ", [
      "domain_complete",
      "validated",
      "frontend_enabled",
    ]),
    entry("ESTJ", ["not_started"]),
    entry("ESFJ", ["not_started"]),
    entry("ISTP", ["not_started"]),
    entry("ISFP", ["not_started"]),
    entry("ESTP", ["not_started"]),
    entry("ESFP", ["not_started"]),
  ]);

export function validatePersonalityImplementationManifest(
  manifest: readonly PersonalityImplementationManifestEntry[] =
    PERSONALITY_IMPLEMENTATION_MANIFEST,
): PersonalityManifestValidationResult {
  const issues: PersonalityManifestValidationIssue[] = [];
  const canonicalTypes = new Set<string>(
    CANONICAL_PERSONALITY_TYPES,
  );
  const counts = new Map<string, number>();
  const validStages = new Set<string>(
    PERSONALITY_IMPLEMENTATION_STAGES,
  );

  manifest.forEach((item, index) => {
    const path = `manifest[${index}]`;
    const count =
      (counts.get(item.personalityType) ?? 0) + 1;
    counts.set(item.personalityType, count);

    if (!canonicalTypes.has(item.personalityType)) {
      addManifestIssue(
        issues,
        item.personalityType,
        `${path}.personalityType`,
        `contains unsupported personality type "${item.personalityType}".`,
      );
    }
    if (count > 1) {
      addManifestIssue(
        issues,
        item.personalityType,
        `${path}.personalityType`,
        `duplicates personality type "${item.personalityType}".`,
      );
    }

    validateStages(item, path, validStages, issues);
  });

  CANONICAL_PERSONALITY_TYPES.forEach(
    (personalityType) => {
      if (!counts.has(personalityType)) {
        addManifestIssue(
          issues,
          personalityType,
          "manifest",
          `is missing canonical personality type "${personalityType}".`,
        );
      }
    },
  );

  if (manifest.length !== CANONICAL_PERSONALITY_TYPES.length) {
    addManifestIssue(
      issues,
      "manifest",
      "manifest",
      `must contain exactly ${CANONICAL_PERSONALITY_TYPES.length} entries; found ${manifest.length}.`,
    );
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

function entry(
  personalityType: PersonalityTypeCode,
  stages: readonly PersonalityImplementationStage[],
): PersonalityImplementationStatus {
  return Object.freeze({
    personalityType,
    stages: Object.freeze([...stages]),
  });
}

function validateStages(
  item: PersonalityImplementationManifestEntry,
  path: string,
  validStages: ReadonlySet<string>,
  issues: PersonalityManifestValidationIssue[],
): void {
  const stages = new Set(item.stages);

  if (item.stages.length === 0) {
    addManifestIssue(
      issues,
      item.personalityType,
      `${path}.stages`,
      "must contain at least one implementation stage.",
    );
  }
  if (stages.size !== item.stages.length) {
    addManifestIssue(
      issues,
      item.personalityType,
      `${path}.stages`,
      "must not contain duplicate stages.",
    );
  }

  item.stages.forEach((stage, stageIndex) => {
    if (!validStages.has(stage)) {
      addManifestIssue(
        issues,
        item.personalityType,
        `${path}.stages[${stageIndex}]`,
        `contains unsupported implementation stage "${stage}".`,
      );
    }
  });

  const notStarted = stages.has("not_started");
  const inProgress =
    stages.has("content_in_progress") ||
    stages.has("rules_in_progress");
  const domainComplete = stages.has("domain_complete");
  const validated = stages.has("validated");
  const frontendEnabled = stages.has("frontend_enabled");

  if (notStarted && stages.size > 1) {
    addManifestIssue(
      issues,
      item.personalityType,
      `${path}.stages`,
      '"not_started" must be the only stage when present.',
    );
  }
  if (inProgress && domainComplete) {
    addManifestIssue(
      issues,
      item.personalityType,
      `${path}.stages`,
      "in-progress stages cannot coexist with domain_complete.",
    );
  }
  if (validated && !domainComplete) {
    addManifestIssue(
      issues,
      item.personalityType,
      `${path}.stages`,
      "validated requires domain_complete.",
    );
  }
  if (
    frontendEnabled &&
    (!domainComplete || !validated)
  ) {
    addManifestIssue(
      issues,
      item.personalityType,
      `${path}.stages`,
      "frontend_enabled requires domain_complete and validated.",
    );
  }
}

function addManifestIssue(
  issues: PersonalityManifestValidationIssue[],
  personalityType: string,
  path: string,
  message: string,
): void {
  issues.push({
    personalityType,
    path,
    message,
  });
}
