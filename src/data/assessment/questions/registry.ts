import type {
  AssessmentModule,
  AssessmentQuestion,
} from "./schema";
import { personalityQuestionBank } from "./personality";
import { riasecQuestionBank } from "./riasec";
import {
  validateAssessmentQuestionBank,
} from "./validation";
import type {
  QuestionValidationResult,
} from "./validation";

export type AssessmentQuestionBank =
  readonly AssessmentQuestion[];

export type AssessmentQuestionBankRegistry =
  Partial<Record<AssessmentModule, AssessmentQuestionBank>>;

export interface RegisteredQuestionBankValidation {
  valid: boolean;
  modules: Partial<
    Record<AssessmentModule, QuestionValidationResult>
  >;
}

const ASSESSMENT_MODULES: readonly AssessmentModule[] = [
  "personality",
  "riasec",
  "zodiac",
];

const EMPTY_QUESTION_BANK: AssessmentQuestionBank =
  Object.freeze([]);

export const assessmentQuestionBanks:
  AssessmentQuestionBankRegistry =
    freezeQuestionBankRegistry({
      personality: personalityQuestionBank,
      riasec: riasecQuestionBank,
    });

export function getAssessmentQuestionBank(
  module: AssessmentModule,
): AssessmentQuestionBank {
  return assessmentQuestionBanks[module] ?? EMPTY_QUESTION_BANK;
}

export function hasAssessmentQuestionBank(
  module: AssessmentModule,
): boolean {
  return getAssessmentQuestionBank(module).length > 0;
}

export function validateRegisteredQuestionBank(
  module: AssessmentModule,
): QuestionValidationResult {
  if (!hasAssessmentQuestionBank(module)) {
    return {
      valid: false,
      issues: [
        {
          path: module,
          message: `${module} has not registered a question bank.`,
        },
      ],
    };
  }

  return validateAssessmentQuestionBank(
    getAssessmentQuestionBank(module),
  );
}

export function validateAllRegisteredQuestionBanks():
  RegisteredQuestionBankValidation {
  const modules: RegisteredQuestionBankValidation["modules"] = {};

  for (const assessmentModule of ASSESSMENT_MODULES) {
    if (
      !Object.hasOwn(
        assessmentQuestionBanks,
        assessmentModule,
      )
    ) {
      continue;
    }

    modules[assessmentModule] =
      validateRegisteredQuestionBank(assessmentModule);
  }

  return {
    valid: Object.values(modules).every(
      (result) => result.valid,
    ),
    modules,
  };
}

function freezeQuestionBankRegistry(
  registry: AssessmentQuestionBankRegistry,
): AssessmentQuestionBankRegistry {
  const frozenRegistry: AssessmentQuestionBankRegistry = {};

  for (const assessmentModule of ASSESSMENT_MODULES) {
    const questionBank = registry[assessmentModule];

    if (questionBank) {
      frozenRegistry[assessmentModule] =
        Object.freeze([...questionBank]);
    }
  }

  return Object.freeze(frozenRegistry);
}
