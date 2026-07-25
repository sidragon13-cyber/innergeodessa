import { personalityQuestionBank } from "../src/data/assessment/questions/personality/questions";
import { personalityQuestionSourceMappings } from "../src/data/assessment/questions/personality/source-mapping";

const EXPECTED_TOTAL = 72;
const EXPECTED_DIMENSIONS = ["EI", "SN", "TF", "JP"] as const;
const EXPECTED_PER_DIMENSION = 18;
const EXPECTED_REVERSE_PER_DIMENSION = 9;
const EXPECTED_OPTION_VALUES = [1, 2, 3, 4, 5];

type Dimension = (typeof EXPECTED_DIMENSIONS)[number];

interface ValidationIssue {
  path: string;
  message: string;
}

function addIssue(
  issues: ValidationIssue[],
  path: string,
  message: string,
): void {
  issues.push({ path, message });
}

function findDuplicates<T>(values: readonly T[]): T[] {
  const seen = new Set<T>();
  const duplicates = new Set<T>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    } else {
      seen.add(value);
    }
  }

  return [...duplicates];
}

function arraysEqual<T>(left: readonly T[], right: readonly T[]): boolean {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function validateQuestionBank(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (personalityQuestionBank.length !== EXPECTED_TOTAL) {
    addIssue(
      issues,
      "questionBank.length",
      `Expected ${EXPECTED_TOTAL} questions, found ${personalityQuestionBank.length}.`,
    );
  }

  if (personalityQuestionSourceMappings.length !== EXPECTED_TOTAL) {
    addIssue(
      issues,
      "sourceMappings.length",
      `Expected ${EXPECTED_TOTAL} source mappings, found ${personalityQuestionSourceMappings.length}.`,
    );
  }

  const duplicateIds = findDuplicates(
    personalityQuestionBank.map((question) => question.id),
  );
  for (const id of duplicateIds) {
    addIssue(issues, "question.id", `Duplicate question ID: ${id}.`);
  }

  const duplicateOrders = findDuplicates(
    personalityQuestionBank.map((question) => question.order),
  );
  for (const order of duplicateOrders) {
    addIssue(issues, "question.order", `Duplicate question order: ${order}.`);
  }

  const duplicateMappingQuestionIds = findDuplicates(
    personalityQuestionSourceMappings.map((mapping) => mapping.questionId),
  );
  for (const id of duplicateMappingQuestionIds) {
    addIssue(
      issues,
      "sourceMapping.questionId",
      `Duplicate mapped question ID: ${id}.`,
    );
  }

  const duplicateSourceItemIds = findDuplicates(
    personalityQuestionSourceMappings.map((mapping) => mapping.sourceItemId),
  );
  for (const id of duplicateSourceItemIds) {
    addIssue(
      issues,
      "sourceMapping.sourceItemId",
      `Duplicate source item ID: ${id}.`,
    );
  }

  const expectedOrders = Array.from(
    { length: EXPECTED_TOTAL },
    (_, index) => index + 1,
  );
  const actualOrders = personalityQuestionBank
    .map((question) => question.order)
    .sort((a, b) => a - b);

  if (!arraysEqual(actualOrders, expectedOrders)) {
    const actualOrderSet = new Set<number>(actualOrders);
    const missingOrders = expectedOrders.filter(
      (order) => !actualOrderSet.has(order),
    );

    addIssue(
      issues,
      "question.order",
      `Orders must be continuous from 1 to ${EXPECTED_TOTAL}. Missing: ${
        missingOrders.length > 0 ? missingOrders.join(", ") : "none"
      }.`,
    );
  }

  const expectedIds = Array.from(
    { length: EXPECTED_TOTAL },
    (_, index) => `personality-${String(index + 1).padStart(3, "0")}`,
  );
  const actualIdSet = new Set<string>(
    personalityQuestionBank.map((question) => question.id),
  );
  const missingIds = expectedIds.filter((id) => !actualIdSet.has(id));

  if (missingIds.length > 0) {
    addIssue(
      issues,
      "question.id",
      `Missing expected question IDs: ${missingIds.join(", ")}.`,
    );
  }

  const mappingQuestionIdSet = new Set(
    personalityQuestionSourceMappings.map((mapping) => mapping.questionId),
  );
  const unmappedQuestions = personalityQuestionBank
    .map((question) => question.id)
    .filter((id) => !mappingQuestionIdSet.has(id));

  if (unmappedQuestions.length > 0) {
    addIssue(
      issues,
      "sourceMapping",
      `Questions without source mappings: ${unmappedQuestions.join(", ")}.`,
    );
  }

  const questionIdSet = new Set(
    personalityQuestionBank.map((question) => question.id),
  );
  const orphanMappings = personalityQuestionSourceMappings
    .map((mapping) => mapping.questionId)
    .filter((id) => !questionIdSet.has(id));

  if (orphanMappings.length > 0) {
    addIssue(
      issues,
      "sourceMapping",
      `Mappings without matching questions: ${orphanMappings.join(", ")}.`,
    );
  }

  for (const dimension of EXPECTED_DIMENSIONS) {
    const questions = personalityQuestionBank.filter(
      (question) => question.dimension === dimension,
    );
    const reverseCount = questions.filter(
      (question) => question.reverseScored,
    ).length;
    const forwardCount = questions.length - reverseCount;

    if (questions.length !== EXPECTED_PER_DIMENSION) {
      addIssue(
        issues,
        `dimension.${dimension}`,
        `Expected ${EXPECTED_PER_DIMENSION} questions, found ${questions.length}.`,
      );
    }

    if (reverseCount !== EXPECTED_REVERSE_PER_DIMENSION) {
      addIssue(
        issues,
        `dimension.${dimension}.reverse`,
        `Expected ${EXPECTED_REVERSE_PER_DIMENSION} reverse-scored questions, found ${reverseCount}.`,
      );
    }

    if (forwardCount !== EXPECTED_REVERSE_PER_DIMENSION) {
      addIssue(
        issues,
        `dimension.${dimension}.forward`,
        `Expected ${EXPECTED_REVERSE_PER_DIMENSION} forward-scored questions, found ${forwardCount}.`,
      );
    }
  }

  personalityQuestionBank.forEach((question, index) => {
    const path = `question[${index}](${question.id})`;

    if (question.module !== "personality") {
      addIssue(
        issues,
        `${path}.module`,
        `Expected module "personality", found "${question.module}".`,
      );
    }

    if (!EXPECTED_DIMENSIONS.includes(question.dimension as Dimension)) {
      addIssue(
        issues,
        `${path}.dimension`,
        `Unsupported dimension: ${String(question.dimension)}.`,
      );
    }

    if (typeof question.reverseScored !== "boolean") {
      addIssue(
        issues,
        `${path}.reverseScored`,
        "reverseScored must be a boolean.",
      );
    }

    const englishPrompt = question.prompt.en.trim();
    const chinesePrompt = question.prompt.zh.trim();

    if (englishPrompt.length < 10) {
      addIssue(
        issues,
        `${path}.prompt.en`,
        "English prompt is empty or too short.",
      );
    }

    if (chinesePrompt.length < 5) {
      addIssue(
        issues,
        `${path}.prompt.zh`,
        "Chinese prompt is empty or too short.",
      );
    }

    if (englishPrompt === chinesePrompt) {
      addIssue(
        issues,
        `${path}.prompt`,
        "English and Chinese prompts must not be identical.",
      );
    }

    const optionValues = question.options.map((option) => option.value);
    if (!arraysEqual(optionValues, EXPECTED_OPTION_VALUES)) {
      addIssue(
        issues,
        `${path}.options`,
        `Option values must be exactly ${EXPECTED_OPTION_VALUES.join(", ")}.`,
      );
    }

    if (question.options.length !== EXPECTED_OPTION_VALUES.length) {
      addIssue(
        issues,
        `${path}.options`,
        `Expected ${EXPECTED_OPTION_VALUES.length} options, found ${question.options.length}.`,
      );
    }

    question.options.forEach((option, optionIndex) => {
      if (!option.label.en.trim()) {
        addIssue(
          issues,
          `${path}.options[${optionIndex}].label.en`,
          "English option label must not be empty.",
        );
      }

      if (!option.label.zh.trim()) {
        addIssue(
          issues,
          `${path}.options[${optionIndex}].label.zh`,
          "Chinese option label must not be empty.",
        );
      }
    });

    if (!question.metadata.contentVersion.trim()) {
      addIssue(
        issues,
        `${path}.metadata.contentVersion`,
        "contentVersion must not be empty.",
      );
    }
  });

  return issues;
}

function printSummary(): void {
  console.log("========================================");
  console.log("InnerGeodessa Personality Question Bank");
  console.log("========================================");
  console.log(`Questions : ${personalityQuestionBank.length}`);
  console.log(`Mappings  : ${personalityQuestionSourceMappings.length}`);
  console.log("");

  for (const dimension of EXPECTED_DIMENSIONS) {
    const questions = personalityQuestionBank.filter(
      (question) => question.dimension === dimension,
    );
    const reverse = questions.filter(
      (question) => question.reverseScored,
    ).length;
    const forward = questions.length - reverse;

    console.log(
      `${dimension} : ${questions.length} questions | ${forward} forward | ${reverse} reverse`,
    );
  }

  console.log("");
}

const issues = validateQuestionBank();

printSummary();

if (issues.length > 0) {
  console.error("FAIL");
  console.error("");

  for (const issue of issues) {
    console.error(`✗ ${issue.path}: ${issue.message}`);
  }

  console.error("");
  console.error(`${issues.length} validation issue(s) found.`);
  process.exit(1);
}

console.log("✓ Question count");
console.log("✓ Mapping count");
console.log("✓ Dimension balance");
console.log("✓ Reverse-score balance");
console.log("✓ Continuous orders");
console.log("✓ Continuous IDs");
console.log("✓ Complete source mappings");
console.log("✓ Unique IDs, orders, and source IDs");
console.log("✓ Prompt and option structure");
console.log("");
console.log(`PASS — ${personalityQuestionBank.length} questions validated.`);
