import type {
  PersonalityResultContract,
} from "../../assessment/scoring/personality";
import type {
  DimensionCode,
  DimensionResult,
} from "../rules";

export function createReportDimensions(
  result: PersonalityResultContract,
): Record<DimensionCode, DimensionResult> {
  return {
    EI: createDimensionResult("EI", result),
    SN: createDimensionResult("SN", result),
    TF: createDimensionResult("TF", result),
    JP: createDimensionResult("JP", result),
  };
}

function createDimensionResult(
  dimension: DimensionCode,
  result: PersonalityResultContract,
): DimensionResult {
  return {
    dimension,
    score: result.scores[dimension],
    confidence: roundPercentage(
      result.confidence[dimension],
    ),
  };
}

function roundPercentage(value: number): number {
  return Math.round(value * 10_000) / 100;
}
