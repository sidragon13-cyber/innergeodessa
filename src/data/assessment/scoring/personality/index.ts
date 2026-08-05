export {
  adaptPersonalityInterpretationToScoreContract,
  PERSONALITY_TIE_RULE,
} from "./adapter";
export {
  isPersonalityResultContract,
} from "./schema";
export {
  fetchPersonalityResult,
  PersonalityResultRequestError,
} from "./result-client";
export { scorePersonalityAssessment } from "./score";
export {
  validatePersonalityScoringInputs,
} from "./validation";

export type {
  PersonalityDimensionScores,
  PersonalityResultContract,
  PersonalityScoreContract,
} from "./schema";
export type {
  PersonalityScoringValidationResult,
} from "./validation";
