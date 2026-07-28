import {
  DIMENSION_CODES,
} from "./types";
import type {
  AnalysedDimension,
  AnalysedRuleInput,
  DimensionBand,
  DimensionCode,
  DimensionResult,
  PreferenceLetter,
  ReportRuleInput,
} from "./types";

const PREFERENCES: Record<
  DimensionCode,
  readonly [PreferenceLetter, PreferenceLetter]
> = {
  EI: ["I", "E"],
  SN: ["S", "N"],
  TF: ["F", "T"],
  JP: ["J", "P"],
};

export function analyseDimension(
  result: DimensionResult,
): AnalysedDimension {
  validateDimensionResult(result);

  if (result.score === 0) {
    return {
      ...result,
      preference: "X",
      oppositePreference: "X",
      band: "balanced",
    };
  }

  const [negativePreference, positivePreference] =
    PREFERENCES[result.dimension];
  const preference =
    result.score < 0
      ? negativePreference
      : positivePreference;
  const oppositePreference =
    result.score < 0
      ? positivePreference
      : negativePreference;

  return {
    ...result,
    preference,
    oppositePreference,
    band: confidenceBand(result.confidence),
  };
}

export function analyseRuleInput(
  input: ReportRuleInput,
): AnalysedRuleInput {
  const analysedEntries = DIMENSION_CODES.map(
    (dimension) => {
      const result = input.dimensions?.[dimension];
      if (!result) {
        throw new TypeError(
          `Missing dimension result for ${dimension}.`,
        );
      }
      if (result.dimension !== dimension) {
        throw new TypeError(
          `Dimension key ${dimension} does not match embedded dimension ${result.dimension}.`,
        );
      }
      return [dimension, analyseDimension(result)] as const;
    },
  );

  const dimensions = Object.fromEntries(
    analysedEntries,
  ) as Record<DimensionCode, AnalysedDimension>;
  const dimensionValues = Object.values(dimensions);

  return {
    personalityType: input.personalityType,
    dimensions,
    averageConfidence:
      dimensionValues.reduce(
        (total, dimension) =>
          total + dimension.confidence,
        0,
      ) / DIMENSION_CODES.length,
    lowConfidenceCount: dimensionValues.filter(
      (dimension) => dimension.confidence <= 15,
    ).length,
    balancedCount: dimensionValues.filter(
      (dimension) => dimension.preference === "X",
    ).length,
  };
}

function confidenceBand(confidence: number): DimensionBand {
  if (confidence <= 15) {
    return "borderline";
  }
  if (confidence <= 40) {
    return "moderate";
  }
  if (confidence <= 70) {
    return "strong";
  }
  return "very-strong";
}

function validateDimensionResult(
  result: DimensionResult,
): void {
  if (!DIMENSION_CODES.includes(result.dimension)) {
    throw new TypeError(
      `Unsupported dimension "${result.dimension}".`,
    );
  }
  if (!Number.isFinite(result.score)) {
    throw new TypeError(
      `${result.dimension} score must be finite.`,
    );
  }
  if (
    !Number.isFinite(result.confidence) ||
    result.confidence < 0 ||
    result.confidence > 100
  ) {
    throw new RangeError(
      `${result.dimension} confidence must be between 0 and 100.`,
    );
  }
}
