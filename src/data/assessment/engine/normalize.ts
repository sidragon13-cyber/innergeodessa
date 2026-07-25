import type { AssessmentQuestion } from "../questions/schema";
import type {
  AssessmentEngineIssue,
  AssessmentNormalizationResult,
  AssessmentResponse,
  NormalizedAssessmentResponse,
} from "./schema";
import { validateAssessmentResponses } from "./validation";

const EMPTY_RESPONSES: readonly NormalizedAssessmentResponse[] =
  Object.freeze([]);

export function normalizeAssessmentResponses(
  questions: readonly AssessmentQuestion[],
  responses: readonly AssessmentResponse[],
): AssessmentNormalizationResult {
  const validation = validateAssessmentResponses(questions, responses);

  if (!validation.valid) {
    return {
      valid: false,
      responses: EMPTY_RESPONSES,
      issues: validation.issues,
    };
  }

  const responsesByQuestionId = new Map(
    responses.map((response) => [response.questionId, response]),
  );
  const normalizedResponses: NormalizedAssessmentResponse[] = [];

  for (const question of questions) {
    const response = responsesByQuestionId.get(question.id);

    if (!response) {
      return createNormalizationFailure(
        question.id,
        "A validated question is missing its response.",
      );
    }

    const { minimum, maximum } = getOptionRange(question);
    normalizedResponses.push(Object.freeze({
      questionId: question.id,
      module: question.module,
      dimension: question.dimension,
      rawValue: response.value,
      normalizedValue: question.reverseScored
        ? minimum + maximum - response.value
        : response.value,
      reverseScored: question.reverseScored,
    }));
  }

  return {
    valid: true,
    responses: Object.freeze(normalizedResponses),
    issues: Object.freeze([]),
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

function createNormalizationFailure(
  questionId: string,
  message: string,
): AssessmentNormalizationResult {
  const issues: readonly AssessmentEngineIssue[] = Object.freeze([
    Object.freeze({
      path: `questions.${questionId}`,
      message,
    }),
  ]);

  return {
    valid: false,
    responses: EMPTY_RESPONSES,
    issues,
  };
}
