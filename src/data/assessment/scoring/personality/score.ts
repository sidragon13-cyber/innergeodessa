import type { AssessmentResponse } from "../../engine";
import {
  createPersonalityAssessmentResult,
} from "../../personality";
import type { AssessmentQuestion } from "../../questions";
import {
  adaptPersonalityInterpretationToScoreContract,
} from "./adapter";
import type { PersonalityScoreContract } from "./schema";
import {
  validatePersonalityScoringInputs,
} from "./validation";

export function scorePersonalityAssessment(
  questions: readonly AssessmentQuestion[],
  responses: readonly AssessmentResponse[],
): PersonalityScoreContract {
  const validation =
    validatePersonalityScoringInputs(questions, responses);

  if (!validation.valid) {
    throw new Error(
      validation.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join("; "),
    );
  }

  const interpretation = createPersonalityAssessmentResult(
    questions,
    responses,
  );

  if (!interpretation.valid) {
    throw new Error(
      interpretation.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join("; "),
    );
  }

  return adaptPersonalityInterpretationToScoreContract(
    interpretation,
  );
}
