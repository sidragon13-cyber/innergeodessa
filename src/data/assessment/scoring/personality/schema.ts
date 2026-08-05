import type {
  PersonalityDimension,
  PersonalityType,
} from "../../personality";

export type PersonalityDimensionScores = Readonly<
  Record<PersonalityDimension, number>
>;

export interface PersonalityScoreContract {
  type: PersonalityType;
  scores: PersonalityDimensionScores;
  confidence: PersonalityDimensionScores;
  answered: PersonalityDimensionScores;
  tie_rule: string;
}

export interface PersonalityResultContract
  extends PersonalityScoreContract {
  sessionId: string;
  status: "completed";
  questionBankVersion: string;
  completedAt: string;
  calculatedAt: string;
}

const DIMENSION_KEYS = ["EI", "SN", "TF", "JP"] as const;

export function isPersonalityResultContract(
  value: unknown,
): value is PersonalityResultContract {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNonEmptyString(value.sessionId) &&
    value.status === "completed" &&
    isPersonalityType(value.type) &&
    isDimensionRecord(value.scores, isFiniteNumber) &&
    isDimensionRecord(value.confidence, isConfidence) &&
    isDimensionRecord(
      value.answered,
      isNonNegativeInteger,
    ) &&
    isNonEmptyString(value.tie_rule) &&
    isNonEmptyString(value.questionBankVersion) &&
    isNonEmptyString(value.completedAt) &&
    isNonEmptyString(value.calculatedAt)
  );
}

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPersonalityType(
  value: unknown,
): value is PersonalityType {
  return (
    typeof value === "string" &&
    /^[EI][SN][TF][JP]$/.test(value)
  );
}

function isDimensionRecord(
  value: unknown,
  isValidValue: (item: unknown) => boolean,
): value is PersonalityDimensionScores {
  return (
    isRecord(value) &&
    DIMENSION_KEYS.every((key) =>
      isValidValue(value[key]),
    )
  );
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isConfidence(value: unknown): value is number {
  return (
    isFiniteNumber(value) &&
    value >= 0 &&
    value <= 1
  );
}

function isNonNegativeInteger(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0
  );
}
