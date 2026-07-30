import {
  RIASEC_DIMENSIONS,
  type RiasecDimension,
  type RiasecPercentages,
  type RiasecScores,
} from "./types";

export interface RiasecResultContract {
  sessionId: string;
  module: "riasec";
  status: "completed";
  code: string;
  scores: RiasecScores;
  percentages: RiasecPercentages;
  ranking: RiasecDimension[];
  answered: RiasecScores;
  questionBankVersion: string;
  completedAt: string;
  calculatedAt: string;
}

export function isRiasecResultContract(
  value: unknown,
): value is RiasecResultContract {
  if (
    !isRecord(value) ||
    !isNonEmptyString(value.sessionId) ||
    value.module !== "riasec" ||
    value.status !== "completed" ||
    !isNonEmptyString(value.code) ||
    !isDimensionRecord(value.scores, isFiniteNumber) ||
    !isDimensionRecord(
      value.percentages,
      isValidPercentage,
    ) ||
    !isRanking(value.ranking) ||
    !isDimensionRecord(
      value.answered,
      isNonNegativeInteger,
    ) ||
    !isNonEmptyString(value.questionBankVersion) ||
    !isNonEmptyString(value.completedAt) ||
    !isNonEmptyString(value.calculatedAt)
  ) {
    return false;
  }

  return value.code === value.ranking.slice(0, 3).join("");
}

function isRanking(value: unknown): value is RiasecDimension[] {
  return (
    Array.isArray(value) &&
    value.length === RIASEC_DIMENSIONS.length &&
    value.every(isRiasecDimension) &&
    new Set(value).size === RIASEC_DIMENSIONS.length
  );
}

function isDimensionRecord(
  value: unknown,
  validateValue: (entry: unknown) => boolean,
): boolean {
  return (
    isRecord(value) &&
    RIASEC_DIMENSIONS.every((dimension) =>
      validateValue(value[dimension]),
    )
  );
}

function isRiasecDimension(
  value: unknown,
): value is RiasecDimension {
  return (
    typeof value === "string" &&
    RIASEC_DIMENSIONS.some((dimension) => dimension === value)
  );
}

function isFiniteNumber(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value);
}

function isValidPercentage(value: unknown): boolean {
  return (
    isFiniteNumber(value) &&
    typeof value === "number" &&
    value >= 0 &&
    value <= 100
  );
}

function isNonNegativeInteger(value: unknown): boolean {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
