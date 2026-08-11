export {
  KIDS_ASSESSMENT_MODULE,
  KIDS_DOMAINS,
  KIDS_DOMAIN_LABELS,
  KIDS_FORMS,
  KIDS_RELEASE_FORMS,
  KIDS_RELEASE_IDS,
  KIDS_SCORING_VERSION,
  getKidsReleaseForm,
} from "./schema";

export type {
  KidsDomain,
  KidsForm,
  KidsReleaseFormConfig,
  KidsReleaseId,
} from "./schema";

export {
  createKidsRuntimeQuestionId,
  getExpectedKidsReleaseId,
  validateKidsQuestionIdentity,
} from "./question-contract";

export type {
  KidsQuestionContract,
  KidsRuntimeQuestionId,
} from "./question-contract";

export {
  KIDS_VISUAL_SUPPORT_LEVELS,
  hasKidsVisualAsset,
} from "./visual-contract";

export type {
  KidsNoVisualBinding,
  KidsVisualAssetBinding,
  KidsVisualBinding,
  KidsVisualSupport,
} from "./visual-contract";

export {
  K68_PRESENTATION_ORDER_SHA256,
  K68_QUESTION_COUNT,
  K68_QUESTION_DATA_SHA256,
  K68_RELEASE_ID,
  K912_PRESENTATION_ORDER_SHA256,
  K912_QUESTION_COUNT,
  K912_QUESTION_DATA_SHA256,
  K912_RELEASE_ID,
  k68Questions,
  k912Questions,
} from "./questions";

export {
  KIDS_QUESTION_FORM_REGISTRY,
  getKidsQuestionFormDefinition,
  getKidsQuestionsForForm,
  validateKidsQuestionFormRegistry,
} from "./form-registry";

export type {
  KidsQuestionFormDefinition,
  KidsQuestionFormRegistryValidationResult,
} from "./form-registry";
