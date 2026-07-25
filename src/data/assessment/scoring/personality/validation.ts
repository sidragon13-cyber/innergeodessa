import type { AssessmentResponse } from "../../engine";
import { validateAssessmentResponses } from "../../engine";
import type { AssessmentQuestion } from "../../questions";
import { validatePersonalityQuestionBank } from "../../questions/personality";

export interface PersonalityScoringValidationResult {
  valid: boolean;
  issues: readonly {
    path: string;
    message: string;
  }[];
}

export function validatePersonalityScoringInputs(
  questions: readonly AssessmentQuestion[],
  responses: readonly AssessmentResponse[],
): PersonalityScoringValidationResult {
  const bankValidation =
    validatePersonalityQuestionBank(questions);
  const responseValidation =
    validateAssessmentResponses(questions, responses);
  const issues = Object.freeze([
    ...bankValidation.issues,
    ...responseValidation.issues,
  ]);

  return {
    valid: issues.length === 0,
    issues,
  };
}
