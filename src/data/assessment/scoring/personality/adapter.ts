import type {
  PersonalityDimension,
  PersonalityInterpretationSuccess,
} from "../../personality";
import {
  PERSONALITY_DIMENSIONS,
} from "../../personality";
import type {
  PersonalityDimensionScores,
  PersonalityScoreContract,
} from "./schema";

export const PERSONALITY_TIE_RULE =
  "A zero score resolves to the first pole and must be reported as low differentiation.";

export function adaptPersonalityInterpretationToScoreContract(
  interpretation: PersonalityInterpretationSuccess,
): PersonalityScoreContract {
  const scores = createDimensionRecord((dimension) => {
    const aggregate =
      interpretation.dimensions[dimension].aggregate;
    const midpoint =
      (aggregate.minimumPossibleTotal +
        aggregate.maximumPossibleTotal) /
      2;

    return aggregate.normalizedTotal - midpoint;
  });
  const confidence = createDimensionRecord((dimension) => {
    const aggregate =
      interpretation.dimensions[dimension].aggregate;
    const maximumAbsoluteScore =
      (aggregate.maximumPossibleTotal -
        aggregate.minimumPossibleTotal) /
      2;

    return maximumAbsoluteScore === 0
      ? 0
      : roundToFourDecimals(
          Math.abs(scores[dimension]) /
            maximumAbsoluteScore,
        );
  });
  const answered = createDimensionRecord(
    (dimension) =>
      interpretation.dimensions[dimension].aggregate
        .responseCount,
  );

  return Object.freeze({
    type: interpretation.type,
    scores,
    confidence,
    answered,
    tie_rule: PERSONALITY_TIE_RULE,
  });
}

function createDimensionRecord(
  getValue: (dimension: PersonalityDimension) => number,
): PersonalityDimensionScores {
  return Object.freeze({
    EI: getValue(PERSONALITY_DIMENSIONS[0]),
    SN: getValue(PERSONALITY_DIMENSIONS[1]),
    TF: getValue(PERSONALITY_DIMENSIONS[2]),
    JP: getValue(PERSONALITY_DIMENSIONS[3]),
  });
}

function roundToFourDecimals(value: number): number {
  return Math.round(value * 10_000) / 10_000;
}
