import type { AssessmentQuestion } from "../questions/schema";
import { normalizeAssessmentResponses } from "./normalize";
import type {
  AssessmentAggregationResult,
  AssessmentDimensionAggregate,
  AssessmentEngineIssue,
  AssessmentResponse,
} from "./schema";

interface MutableDimensionAggregate {
  responseCount: number;
  rawTotal: number;
  normalizedTotal: number;
  minimumPossibleTotal: number;
  maximumPossibleTotal: number;
}

const EMPTY_DIMENSIONS: Readonly<
  Record<string, AssessmentDimensionAggregate>
> = Object.freeze({});

export function aggregateAssessmentDimensions(
  questions: readonly AssessmentQuestion[],
  responses: readonly AssessmentResponse[],
): AssessmentAggregationResult {
  const normalization = normalizeAssessmentResponses(questions, responses);

  if (!normalization.valid) {
    return {
      valid: false,
      dimensions: EMPTY_DIMENSIONS,
      issues: normalization.issues,
    };
  }

  const questionsById = new Map(
    questions.map((question) => [question.id, question]),
  );
  const dimensions = new Map<string, MutableDimensionAggregate>();

  for (const response of normalization.responses) {
    const question = questionsById.get(response.questionId);

    if (!question) {
      return createAggregationFailure(
        response.questionId,
        "A normalized response does not have a matching question.",
      );
    }

    const { minimum, maximum } = getOptionRange(question);
    const aggregate = dimensions.get(response.dimension) ??
      createEmptyAggregate();

    aggregate.responseCount += 1;
    aggregate.rawTotal += response.rawValue;
    aggregate.normalizedTotal += response.normalizedValue;
    aggregate.minimumPossibleTotal += minimum;
    aggregate.maximumPossibleTotal += maximum;
    dimensions.set(response.dimension, aggregate);
  }

  return {
    valid: true,
    dimensions: freezeDimensions(dimensions),
    issues: Object.freeze([]),
  };
}

function createEmptyAggregate(): MutableDimensionAggregate {
  return {
    responseCount: 0,
    rawTotal: 0,
    normalizedTotal: 0,
    minimumPossibleTotal: 0,
    maximumPossibleTotal: 0,
  };
}

function getOptionRange(
  question: AssessmentQuestion,
): { minimum: number; maximum: number } {
  let minimum = question.options[0].value;
  let maximum = question.options[0].value;

  question.options.forEach((option) => {
    minimum = Math.min(minimum, option.value);
    maximum = Math.max(maximum, option.value);
  });

  return { minimum, maximum };
}

function freezeDimensions(
  dimensions: ReadonlyMap<string, MutableDimensionAggregate>,
): Readonly<Record<string, AssessmentDimensionAggregate>> {
  const result: Record<string, AssessmentDimensionAggregate> = {};

  dimensions.forEach((aggregate, dimension) => {
    result[dimension] = Object.freeze({
      dimension,
      ...aggregate,
    });
  });

  return Object.freeze(result);
}

function createAggregationFailure(
  questionId: string,
  message: string,
): AssessmentAggregationResult {
  const issues: readonly AssessmentEngineIssue[] = Object.freeze([
    Object.freeze({
      path: `responses.${questionId}`,
      message,
    }),
  ]);

  return {
    valid: false,
    dimensions: EMPTY_DIMENSIONS,
    issues,
  };
}
