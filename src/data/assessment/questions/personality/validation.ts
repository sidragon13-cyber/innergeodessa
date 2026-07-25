import type { AssessmentQuestion } from "../schema";
import { validateAssessmentQuestionBank } from "../validation";
import { personalityQuestionBank } from "./questions";
import {
  personalityQuestionSourceMappings,
  validatePersonalityQuestionSourceMappings,
} from "./source-mapping";

export type PersonalityDimension =
  | "EI"
  | "SN"
  | "TF"
  | "JP";

export interface PersonalityQuestionBankValidationIssue {
  path: string;
  message: string;
}

export interface PersonalityQuestionBankValidationResult {
  valid: boolean;
  issues: PersonalityQuestionBankValidationIssue[];
  summary: {
    total: number;
    dimensions: Record<
      PersonalityDimension,
      {
        total: number;
        forward: number;
        reverse: number;
      }
    >;
  };
}

const PERSONALITY_DIMENSIONS: readonly PersonalityDimension[] = [
  "EI",
  "SN",
  "TF",
  "JP",
];

const PERSONALITY_QUESTION_ID = /^personality-(\d{3})$/;
const EXPECTED_QUESTION_COUNT = 72;
const EXPECTED_DIMENSION_COUNT = 18;
const EXPECTED_DIRECTION_COUNT = 9;

export function validatePersonalityQuestionBank(
  questions: readonly AssessmentQuestion[] =
    personalityQuestionBank,
): PersonalityQuestionBankValidationResult {
  const issues: PersonalityQuestionBankValidationIssue[] = [
    ...validateAssessmentQuestionBank(questions).issues,
  ];
  const summary = createSummary(questions);

  validateQuestionFields(questions, issues);
  validateTotalQuestionCount(summary, issues);
  validateDimensionQuestionCounts(summary, issues);
  validateDimensionDirectionBalance(summary, issues);
  validateSourceMappings(questions, issues);

  return {
    valid: issues.length === 0,
    issues,
    summary,
  };
}

function createSummary(
  questions: readonly AssessmentQuestion[],
): PersonalityQuestionBankValidationResult["summary"] {
  const dimensions = {
    EI: createEmptyDimensionSummary(),
    SN: createEmptyDimensionSummary(),
    TF: createEmptyDimensionSummary(),
    JP: createEmptyDimensionSummary(),
  };

  for (const question of questions) {
    if (!isPersonalityDimension(question.dimension)) {
      continue;
    }

    const dimension = dimensions[question.dimension];
    dimension.total += 1;

    if (question.reverseScored) {
      dimension.reverse += 1;
    } else {
      dimension.forward += 1;
    }
  }

  return {
    total: questions.length,
    dimensions,
  };
}

function createEmptyDimensionSummary(): {
  total: number;
  forward: number;
  reverse: number;
} {
  return {
    total: 0,
    forward: 0,
    reverse: 0,
  };
}

function validateQuestionFields(
  questions: readonly AssessmentQuestion[],
  issues: PersonalityQuestionBankValidationIssue[],
): void {
  questions.forEach((question, index) => {
    const path = `questions[${index}]`;

    if (question.module !== "personality") {
      addIssue(
        issues,
        `${path}.module`,
        `${path}.module must be "personality".`,
      );
    }

    if (!isPersonalityDimension(question.dimension)) {
      addIssue(
        issues,
        `${path}.dimension`,
        `${path}.dimension must be one of: ${PERSONALITY_DIMENSIONS.join(", ")}.`,
      );
    }

    validateQuestionId(question, path, issues);
  });
}

function validateQuestionId(
  question: AssessmentQuestion,
  questionPath: string,
  issues: PersonalityQuestionBankValidationIssue[],
): void {
  const path = `${questionPath}.id`;
  const match = PERSONALITY_QUESTION_ID.exec(question.id);

  if (!match) {
    addIssue(
      issues,
      path,
      `${path} must use the format "personality-001".`,
    );
    return;
  }

  const idNumber = Number(match[1]);

  if (idNumber !== question.order) {
    addIssue(
      issues,
      path,
      `${path} number ${idNumber} does not match order ${question.order}.`,
    );
  }
}

function validateTotalQuestionCount(
  summary: PersonalityQuestionBankValidationResult["summary"],
  issues: PersonalityQuestionBankValidationIssue[],
): void {
  if (summary.total !== EXPECTED_QUESTION_COUNT) {
    addIssue(
      issues,
      "questions",
      `questions must contain exactly ${EXPECTED_QUESTION_COUNT} personality questions; received ${summary.total}.`,
    );
  }
}

function validateDimensionQuestionCounts(
  summary: PersonalityQuestionBankValidationResult["summary"],
  issues: PersonalityQuestionBankValidationIssue[],
): void {
  for (const dimension of PERSONALITY_DIMENSIONS) {
    const dimensionSummary = summary.dimensions[dimension];

    if (dimensionSummary.total !== EXPECTED_DIMENSION_COUNT) {
      addIssue(
        issues,
        `dimensions.${dimension}`,
        `dimensions.${dimension} must contain exactly ${EXPECTED_DIMENSION_COUNT} questions; received ${dimensionSummary.total}.`,
      );
    }
  }
}

function validateDimensionDirectionBalance(
  summary: PersonalityQuestionBankValidationResult["summary"],
  issues: PersonalityQuestionBankValidationIssue[],
): void {
  for (const dimension of PERSONALITY_DIMENSIONS) {
    const dimensionSummary = summary.dimensions[dimension];

    if (dimensionSummary.forward !== EXPECTED_DIRECTION_COUNT) {
      addIssue(
        issues,
        `dimensions.${dimension}.forward`,
        `dimensions.${dimension}.forward must contain exactly ${EXPECTED_DIRECTION_COUNT} questions; received ${dimensionSummary.forward}.`,
      );
    }

    if (dimensionSummary.reverse !== EXPECTED_DIRECTION_COUNT) {
      addIssue(
        issues,
        `dimensions.${dimension}.reverse`,
        `dimensions.${dimension}.reverse must contain exactly ${EXPECTED_DIRECTION_COUNT} questions; received ${dimensionSummary.reverse}.`,
      );
    }
  }
}

function validateSourceMappings(
  questions: readonly AssessmentQuestion[],
  issues: PersonalityQuestionBankValidationIssue[],
): void {
  if (personalityQuestionSourceMappings.length !== questions.length) {
    addIssue(
      issues,
      "sourceMappings",
      `sourceMappings must contain ${questions.length} mappings; received ${personalityQuestionSourceMappings.length}.`,
    );
  }

  const mappingResult =
    validatePersonalityQuestionSourceMappings(
      personalityQuestionSourceMappings,
      questions,
    );

  for (const issue of mappingResult.issues) {
    addIssue(
      issues,
      `sourceMappings.${issue.path}`,
      `sourceMappings.${issue.message}`,
    );
  }
}

function isPersonalityDimension(
  value: string,
): value is PersonalityDimension {
  return PERSONALITY_DIMENSIONS.some(
    (dimension) => dimension === value,
  );
}

function addIssue(
  issues: PersonalityQuestionBankValidationIssue[],
  path: string,
  message: string,
): void {
  issues.push({ path, message });
}
