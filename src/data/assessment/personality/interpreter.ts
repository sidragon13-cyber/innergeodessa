import {
  aggregateAssessmentDimensions,
  type AssessmentAggregationResult,
  type AssessmentDimensionAggregate,
  type AssessmentEngineIssue,
  type AssessmentResponse,
} from "../engine";

import type { AssessmentQuestion } from "../questions/schema";

import {
  PERSONALITY_DIMENSIONS,
  type PersonalityDimension,
  type PersonalityDimensionInterpretation,
  type PersonalityInterpretationFailure,
  type PersonalityInterpretationResult,
  type PersonalityInterpretationSuccess,
  type PersonalityPole,
  type PersonalityType,
} from "./schema";

const DIMENSION_POLES = Object.freeze({
  EI: Object.freeze(["E", "I"]),
  SN: Object.freeze(["S", "N"]),
  TF: Object.freeze(["T", "F"]),
  JP: Object.freeze(["J", "P"]),
} satisfies Readonly<
  Record<
    PersonalityDimension,
    readonly [PersonalityPole, PersonalityPole]
  >
>);

/**
 * Centralized deterministic tie policy.
 *
 * An exact midpoint currently resolves to the first pole:
 * EI → E
 * SN → S
 * TF → T
 * JP → J
 *
 * This policy can be changed later without modifying the scoring engine.
 */
const TIE_BREAK_POLES = Object.freeze({
  EI: "E",
  SN: "S",
  TF: "T",
  JP: "J",
} satisfies Readonly<
  Record<PersonalityDimension, PersonalityPole>
>);

const EMPTY_DIMENSIONS = Object.freeze({});

export function createPersonalityAssessmentResult(
  questions: readonly AssessmentQuestion[],
  responses: readonly AssessmentResponse[],
): PersonalityInterpretationResult {
  const aggregation = aggregateAssessmentDimensions(
    questions,
    responses,
  );

  return interpretPersonalityAggregation(aggregation);
}

export function interpretPersonalityAggregation(
  aggregation: AssessmentAggregationResult,
): PersonalityInterpretationResult {
  if (!aggregation.valid) {
    return createFailure(aggregation.issues);
  }

  const issues: AssessmentEngineIssue[] = [];
  const interpretedDimensions: Partial<
    Record<
      PersonalityDimension,
      PersonalityDimensionInterpretation
    >
  > = {};

  validateUnexpectedDimensions(
    aggregation.dimensions,
    issues,
  );

  for (const dimension of PERSONALITY_DIMENSIONS) {
    const aggregate = aggregation.dimensions[dimension];

    if (!aggregate) {
      addIssue(
        issues,
        `dimensions.${dimension}`,
        `Missing required personality dimension "${dimension}".`,
      );
      continue;
    }

    const interpretation = interpretPersonalityDimension(
      dimension,
      aggregate,
      issues,
    );

    if (interpretation) {
      interpretedDimensions[dimension] = interpretation;
    }
  }

  if (issues.length > 0) {
    return createFailure(
      issues,
      Object.freeze(interpretedDimensions),
    );
  }

  if (!hasAllPersonalityDimensions(interpretedDimensions)) {
    return createFailure([
      {
        path: "dimensions",
        message:
          "Unable to create a complete personality interpretation.",
      },
    ]);
  }

  const dimensions = Object.freeze({
    EI: interpretedDimensions.EI,
    SN: interpretedDimensions.SN,
    TF: interpretedDimensions.TF,
    JP: interpretedDimensions.JP,
  });

  const type = determinePersonalityType(dimensions);

  const result: PersonalityInterpretationSuccess = {
    valid: true,
    type,
    dimensions,
    issues: Object.freeze([]),
  };

  return Object.freeze(result);
}

export function interpretPersonalityDimension(
  dimension: PersonalityDimension,
  aggregate: AssessmentDimensionAggregate,
  issues: AssessmentEngineIssue[] = [],
): PersonalityDimensionInterpretation | null {
  const path = `dimensions.${dimension}`;

  if (aggregate.dimension !== dimension) {
    addIssue(
      issues,
      `${path}.dimension`,
      `Expected dimension "${dimension}", found "${aggregate.dimension}".`,
    );

    return null;
  }

  if (
    !Number.isInteger(aggregate.responseCount) ||
    aggregate.responseCount <= 0
  ) {
    addIssue(
      issues,
      `${path}.responseCount`,
      "responseCount must be a positive integer.",
    );
  }

  if (
    !Number.isFinite(aggregate.minimumPossibleTotal) ||
    !Number.isFinite(aggregate.maximumPossibleTotal) ||
    aggregate.maximumPossibleTotal <=
      aggregate.minimumPossibleTotal
  ) {
    addIssue(
      issues,
      path,
      "The dimension must have a valid possible score range.",
    );

    return null;
  }

  if (!Number.isFinite(aggregate.normalizedTotal)) {
    addIssue(
      issues,
      `${path}.normalizedTotal`,
      "normalizedTotal must be a finite number.",
    );

    return null;
  }

  if (
    aggregate.normalizedTotal <
      aggregate.minimumPossibleTotal ||
    aggregate.normalizedTotal >
      aggregate.maximumPossibleTotal
  ) {
    addIssue(
      issues,
      `${path}.normalizedTotal`,
      "normalizedTotal must be within the possible score range.",
    );

    return null;
  }

  const [firstPole, secondPole] =
    DIMENSION_POLES[dimension];

  const scoreRange =
    aggregate.maximumPossibleTotal -
    aggregate.minimumPossibleTotal;

  const scorePosition =
    aggregate.normalizedTotal -
    aggregate.minimumPossibleTotal;

  const firstPoleRatio = scorePosition / scoreRange;

  const firstPolePercentage = Math.round(
    firstPoleRatio * 100,
  );

  const secondPolePercentage =
    100 - firstPolePercentage;

  const midpoint =
    aggregate.minimumPossibleTotal +
    scoreRange / 2;

  const tied =
    aggregate.normalizedTotal === midpoint;

  const preferredPole = tied
    ? TIE_BREAK_POLES[dimension]
    : aggregate.normalizedTotal > midpoint
      ? firstPole
      : secondPole;

  const oppositePole =
    preferredPole === firstPole
      ? secondPole
      : firstPole;

  const preferredPercentage =
    preferredPole === firstPole
      ? firstPolePercentage
      : secondPolePercentage;

  const oppositePercentage =
    100 - preferredPercentage;

  const interpretation: PersonalityDimensionInterpretation = {
    dimension,
    firstPole,
    secondPole,
    preferredPole,
    oppositePole,
    firstPolePercentage,
    secondPolePercentage,
    preferredPercentage,
    oppositePercentage,
    preferenceStrength: Math.abs(
      firstPolePercentage - secondPolePercentage,
    ),
    tied,
    aggregate,
  };

  return Object.freeze(interpretation);
}

export function determinePersonalityType(
  dimensions: Readonly<
    Record<
      PersonalityDimension,
      PersonalityDimensionInterpretation
    >
  >,
): PersonalityType {
  return [
    dimensions.EI.preferredPole,
    dimensions.SN.preferredPole,
    dimensions.TF.preferredPole,
    dimensions.JP.preferredPole,
  ].join("") as PersonalityType;
}

function validateUnexpectedDimensions(
  dimensions: Readonly<
    Record<string, AssessmentDimensionAggregate>
  >,
  issues: AssessmentEngineIssue[],
): void {
  Object.keys(dimensions).forEach((dimension) => {
    if (
      !PERSONALITY_DIMENSIONS.includes(
        dimension as PersonalityDimension,
      )
    ) {
      addIssue(
        issues,
        `dimensions.${dimension}`,
        `Unsupported personality dimension "${dimension}".`,
      );
    }
  });
}

function hasAllPersonalityDimensions(
  dimensions: Partial<
    Record<
      PersonalityDimension,
      PersonalityDimensionInterpretation
    >
  >,
): dimensions is Record<
  PersonalityDimension,
  PersonalityDimensionInterpretation
> {
  return PERSONALITY_DIMENSIONS.every(
    (dimension) => dimensions[dimension] !== undefined,
  );
}

function createFailure(
  issues: readonly AssessmentEngineIssue[],
  dimensions: PersonalityInterpretationFailure["dimensions"] =
    EMPTY_DIMENSIONS,
): PersonalityInterpretationFailure {
  return Object.freeze({
    valid: false,
    type: null,
    dimensions,
    issues: Object.freeze(
      issues.map((issue) => Object.freeze({ ...issue })),
    ),
  });
}

function addIssue(
  issues: AssessmentEngineIssue[],
  path: string,
  message: string,
): void {
  issues.push({ path, message });
}
