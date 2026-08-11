import type {
  AssessmentModule,
  AssessmentQuestion,
  AssessmentQuestionMetadata,
  AssessmentQuestionStatus,
  RequiredLocalizedText,
} from "./schema";

export interface QuestionValidationIssue {
  path: string;
  message: string;
}

export interface QuestionValidationResult {
  valid: boolean;
  issues: QuestionValidationIssue[];
}

const ASSESSMENT_MODULES: readonly AssessmentModule[] = [
  "personality",
  "riasec",
  "zodiac",
  "kids",
];

const QUESTION_STATUSES: readonly AssessmentQuestionStatus[] = [
  "draft",
  "review",
  "published",
  "retired",
];

const LOWERCASE_KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SIMPLE_SEMANTIC_VERSION = /^\d+\.\d+\.\d+$/;

export function validateAssessmentQuestion(
  question: AssessmentQuestion,
): QuestionValidationResult {
  const issues: QuestionValidationIssue[] = [];

  validateQuestion(question, "", issues);

  return createResult(issues);
}

export function validateAssessmentQuestionBank(
  questions: readonly AssessmentQuestion[],
): QuestionValidationResult {
  const issues: QuestionValidationIssue[] = [];

  if (questions.length === 0) {
    addIssue(
      issues,
      "questions",
      "questions must contain at least one question.",
    );
  }

  questions.forEach((question, index) => {
    validateQuestion(question, `questions[${index}]`, issues);
  });

  validateUniqueQuestionIds(questions, issues);
  validateUniqueModuleOrders(questions, issues);

  return createResult(issues);
}

function validateQuestion(
  question: AssessmentQuestion,
  basePath: string,
  issues: QuestionValidationIssue[],
): void {
  validateId(question.id, question.module, basePath, issues);
  validateModule(question.module, basePath, issues);
  validateOrder(question.order, basePath, issues);
  validateNonEmptyString(
    question.dimension,
    joinPath(basePath, "dimension"),
    issues,
  );
  validateBoolean(
    question.reverseScored,
    joinPath(basePath, "reverseScored"),
    issues,
  );
  validateLocalizedText(question.prompt, "prompt", basePath, issues);
  validateOptions(question.options, basePath, issues);
  validateMetadata(question.metadata, basePath, issues);
}

function validateId(
  id: string,
  module: AssessmentModule,
  basePath: string,
  issues: QuestionValidationIssue[],
): void {
  const path = joinPath(basePath, "id");

  if (!isNonEmptyString(id)) {
    addIssue(issues, path, `${path} must not be empty.`);
    return;
  }

  if (!LOWERCASE_KEBAB_CASE.test(id)) {
    addIssue(
      issues,
      path,
      `${path} must use lowercase kebab-case; received "${id}".`,
    );
  }

  if (isAssessmentModule(module) && !id.startsWith(`${module}-`)) {
    addIssue(
      issues,
      path,
      `${path} must start with "${module}-".`,
    );
  }
}

function validateModule(
  module: AssessmentModule,
  basePath: string,
  issues: QuestionValidationIssue[],
): void {
  const path = joinPath(basePath, "module");

  if (!isAssessmentModule(module)) {
    addIssue(
      issues,
      path,
      `${path} must be one of: ${ASSESSMENT_MODULES.join(", ")}.`,
    );
  }
}

function validateOrder(
  order: number,
  basePath: string,
  issues: QuestionValidationIssue[],
): void {
  const path = joinPath(basePath, "order");

  if (!Number.isInteger(order) || order <= 0) {
    addIssue(
      issues,
      path,
      `${path} must be an integer greater than 0.`,
    );
  }
}

function validateLocalizedText(
  value: RequiredLocalizedText,
  field: string,
  basePath: string,
  issues: QuestionValidationIssue[],
): void {
  const path = joinPath(basePath, field);
  const enValid = validateNonEmptyString(value?.en, `${path}.en`, issues);
  const zhValid = validateNonEmptyString(value?.zh, `${path}.zh`, issues);

  if (
    enValid &&
    zhValid &&
    value.en.trim() === value.zh.trim()
  ) {
    addIssue(
      issues,
      path,
      `${path}.en and ${path}.zh must not be identical.`,
    );
  }
}

function validateOptions(
  options: AssessmentQuestion["options"],
  basePath: string,
  issues: QuestionValidationIssue[],
): void {
  const path = joinPath(basePath, "options");

  if (!Array.isArray(options) || options.length < 2) {
    addIssue(
      issues,
      path,
      `${path} must contain at least 2 options.`,
    );
  }

  if (!Array.isArray(options)) {
    return;
  }

  const seenValues = new Map<number, number>();

  options.forEach((option, index) => {
    const optionPath = `${path}[${index}]`;

    if (!Number.isFinite(option.value)) {
      addIssue(
        issues,
        `${optionPath}.value`,
        `${optionPath}.value must be a finite number.`,
      );
    }

    const firstIndex = seenValues.get(option.value);

    if (firstIndex !== undefined) {
      addIssue(
        issues,
        `${optionPath}.value`,
        `${optionPath}.value duplicates ${path}[${firstIndex}].value.`,
      );
    } else {
      seenValues.set(option.value, index);
    }

    validateLocalizedText(
      option.label,
      `options[${index}].label`,
      basePath,
      issues,
    );
  });
}

function validateMetadata(
  metadata: AssessmentQuestionMetadata,
  basePath: string,
  issues: QuestionValidationIssue[],
): void {
  const path = joinPath(basePath, "metadata");
  const contentVersionPath = `${path}.contentVersion`;

  if (validateNonEmptyString(
    metadata?.contentVersion,
    contentVersionPath,
    issues,
  ) && !SIMPLE_SEMANTIC_VERSION.test(metadata.contentVersion)) {
    addIssue(
      issues,
      contentVersionPath,
      `${contentVersionPath} must use semantic version format such as "1.0.0".`,
    );
  }

  if (!isQuestionStatus(metadata?.status)) {
    addIssue(
      issues,
      `${path}.status`,
      `${path}.status must be one of: ${QUESTION_STATUSES.join(", ")}.`,
    );
  }

  validateBoolean(metadata?.reviewed, `${path}.reviewed`, issues);

  if (metadata?.status === "published" && metadata.reviewed !== true) {
    addIssue(
      issues,
      `${path}.reviewed`,
      `${path}.reviewed must be true when ${path}.status is published.`,
    );
  }

  const createdAt = validateOptionalDate(
    metadata?.createdAt,
    `${path}.createdAt`,
    issues,
  );
  const updatedAt = validateOptionalDate(
    metadata?.updatedAt,
    `${path}.updatedAt`,
    issues,
  );

  if (
    createdAt !== undefined &&
    updatedAt !== undefined &&
    updatedAt < createdAt
  ) {
    addIssue(
      issues,
      `${path}.updatedAt`,
      `${path}.updatedAt must not be earlier than ${path}.createdAt.`,
    );
  }
}

function validateOptionalDate(
  value: string | undefined,
  path: string,
  issues: QuestionValidationIssue[],
): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  const timestamp = Date.parse(value);

  if (Number.isNaN(timestamp)) {
    addIssue(issues, path, `${path} must be a valid date string.`);
    return undefined;
  }

  return timestamp;
}

function validateUniqueQuestionIds(
  questions: readonly AssessmentQuestion[],
  issues: QuestionValidationIssue[],
): void {
  const firstIndexById = new Map<string, number>();

  questions.forEach((question, index) => {
    const firstIndex = firstIndexById.get(question.id);

    if (firstIndex !== undefined) {
      const path = `questions[${index}].id`;
      addIssue(
        issues,
        path,
        `${path} duplicates questions[${firstIndex}].id "${question.id}".`,
      );
    } else {
      firstIndexById.set(question.id, index);
    }
  });
}

function validateUniqueModuleOrders(
  questions: readonly AssessmentQuestion[],
  issues: QuestionValidationIssue[],
): void {
  const firstIndexByModuleOrder = new Map<string, number>();

  questions.forEach((question, index) => {
    const key = `${question.module}:${question.order}`;
    const firstIndex = firstIndexByModuleOrder.get(key);

    if (firstIndex !== undefined) {
      const path = `questions[${index}].order`;
      addIssue(
        issues,
        path,
        `${path} duplicates questions[${firstIndex}].order ${question.order} within module "${question.module}".`,
      );
    } else {
      firstIndexByModuleOrder.set(key, index);
    }
  });
}

function validateNonEmptyString(
  value: string,
  path: string,
  issues: QuestionValidationIssue[],
): boolean {
  if (!isNonEmptyString(value)) {
    addIssue(issues, path, `${path} must not be empty.`);
    return false;
  }

  return true;
}

function validateBoolean(
  value: boolean,
  path: string,
  issues: QuestionValidationIssue[],
): void {
  if (typeof value !== "boolean") {
    addIssue(issues, path, `${path} must be a boolean.`);
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isAssessmentModule(value: unknown): value is AssessmentModule {
  return ASSESSMENT_MODULES.some((module) => module === value);
}

function isQuestionStatus(
  value: unknown,
): value is AssessmentQuestionStatus {
  return QUESTION_STATUSES.some((status) => status === value);
}

function joinPath(basePath: string, field: string): string {
  return basePath ? `${basePath}.${field}` : field;
}

function addIssue(
  issues: QuestionValidationIssue[],
  path: string,
  message: string,
): void {
  issues.push({ path, message });
}

function createResult(
  issues: QuestionValidationIssue[],
): QuestionValidationResult {
  return {
    valid: issues.length === 0,
    issues,
  };
}
