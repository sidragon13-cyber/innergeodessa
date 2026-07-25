import type { AssessmentQuestion } from "../questions/schema";
import { validateAssessmentQuestionBank } from "../questions/validation";
import type {
  AssessmentEngineIssue,
  AssessmentResponse,
} from "./schema";

export interface AssessmentResponseValidationResult {
  valid: boolean;
  issues: readonly AssessmentEngineIssue[];
}

export function validateAssessmentResponses(
  questions: readonly AssessmentQuestion[],
  responses: readonly AssessmentResponse[],
): AssessmentResponseValidationResult {
  const issues: AssessmentEngineIssue[] = [
    ...validateAssessmentQuestionBank(questions).issues,
  ];
  const questionsById = createQuestionIndex(questions);

  validateResponseCollection(responses, questionsById, issues);
  validateResponseCompleteness(questions, responses, issues);

  return {
    valid: issues.length === 0,
    issues: Object.freeze(issues),
  };
}

function createQuestionIndex(
  questions: readonly AssessmentQuestion[],
): ReadonlyMap<string, AssessmentQuestion> {
  const questionsById = new Map<string, AssessmentQuestion>();

  questions.forEach((question) => {
    if (!questionsById.has(question.id)) {
      questionsById.set(question.id, question);
    }
  });

  return questionsById;
}

function validateResponseCollection(
  responses: readonly AssessmentResponse[],
  questionsById: ReadonlyMap<string, AssessmentQuestion>,
  issues: AssessmentEngineIssue[],
): void {
  if (responses.length === 0) {
    addIssue(
      issues,
      "responses",
      "responses must contain at least one response.",
    );
  }

  const firstResponseIndexByQuestionId = new Map<string, number>();

  responses.forEach((response, index) => {
    const basePath = `responses[${index}]`;

    validateResponseQuestionId(
      response.questionId,
      basePath,
      questionsById,
      firstResponseIndexByQuestionId,
      index,
      issues,
    );
    validateResponseValue(response, basePath, questionsById, issues);
  });
}

function validateResponseQuestionId(
  questionId: string,
  basePath: string,
  questionsById: ReadonlyMap<string, AssessmentQuestion>,
  firstResponseIndexByQuestionId: Map<string, number>,
  index: number,
  issues: AssessmentEngineIssue[],
): void {
  const path = `${basePath}.questionId`;

  if (questionId.trim().length === 0) {
    addIssue(issues, path, `${path} must not be empty.`);
    return;
  }

  if (!questionsById.has(questionId)) {
    addIssue(
      issues,
      path,
      `${path} must reference a question in the supplied question bank.`,
    );
  }

  const firstIndex = firstResponseIndexByQuestionId.get(questionId);

  if (firstIndex !== undefined) {
    addIssue(
      issues,
      path,
      `${path} duplicates responses[${firstIndex}].questionId.`,
    );
  } else {
    firstResponseIndexByQuestionId.set(questionId, index);
  }
}

function validateResponseValue(
  response: AssessmentResponse,
  basePath: string,
  questionsById: ReadonlyMap<string, AssessmentQuestion>,
  issues: AssessmentEngineIssue[],
): void {
  const path = `${basePath}.value`;

  if (!Number.isFinite(response.value)) {
    addIssue(issues, path, `${path} must be a finite number.`);
    return;
  }

  const question = questionsById.get(response.questionId);

  if (
    question &&
    !question.options.some((option) => option.value === response.value)
  ) {
    addIssue(
      issues,
      path,
      `${path} must match an option value for question "${response.questionId}".`,
    );
  }
}

function validateResponseCompleteness(
  questions: readonly AssessmentQuestion[],
  responses: readonly AssessmentResponse[],
  issues: AssessmentEngineIssue[],
): void {
  const responseCounts = new Map<string, number>();

  responses.forEach((response) => {
    responseCounts.set(
      response.questionId,
      (responseCounts.get(response.questionId) ?? 0) + 1,
    );
  });

  questions.forEach((question, index) => {
    if ((responseCounts.get(question.id) ?? 0) === 0) {
      addIssue(
        issues,
        `questions[${index}].id`,
        `Question "${question.id}" must have exactly one response.`,
      );
    }
  });
}

function addIssue(
  issues: AssessmentEngineIssue[],
  path: string,
  message: string,
): void {
  issues.push({ path, message });
}
