export {
  adaptPersonalityInterpretationToScoreContract,
  PERSONALITY_TIE_RULE,
} from "./adapter";
export { scorePersonalityAssessment } from "./score";
export {
  validatePersonalityScoringInputs,
} from "./validation";

export type {
  PersonalityDimensionScores,
  PersonalityScoreContract,
} from "./schema";
export type {
  PersonalityScoringValidationResult,
} from "./validation";
