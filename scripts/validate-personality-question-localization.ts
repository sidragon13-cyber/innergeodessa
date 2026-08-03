import {
  getQuestionIdBySourceItemId,
  personalityQuestionBank,
  personalityQuestionSourceMappings,
  validatePersonalityQuestionSourceMappings,
} from "../src/data/assessment/questions/personality";

const EXPECTED_QUESTION_COUNT = 72;

assert(
  personalityQuestionBank.length ===
    EXPECTED_QUESTION_COUNT,
  `Expected ${EXPECTED_QUESTION_COUNT} personality questions, received ${personalityQuestionBank.length}.`,
);

assert(
  personalityQuestionSourceMappings.length ===
    EXPECTED_QUESTION_COUNT,
  `Expected ${EXPECTED_QUESTION_COUNT} personality source mappings, received ${personalityQuestionSourceMappings.length}.`,
);

const mappingValidation =
  validatePersonalityQuestionSourceMappings();

assert(
  mappingValidation.valid,
  `Personality source mappings are invalid:\n${mappingValidation.issues
    .map(
      (issue) =>
        `${issue.path}: ${issue.message}`,
    )
    .join("\n")}`,
);

const questionById = new Map(
  personalityQuestionBank.map((question) => [
    question.id,
    question,
  ]),
);

for (const mapping of personalityQuestionSourceMappings) {
  const resolvedQuestionId =
    getQuestionIdBySourceItemId(
      mapping.sourceItemId,
    );

  assert(
    resolvedQuestionId === mapping.questionId,
    `Source item ${mapping.sourceItemId} did not resolve to ${mapping.questionId}.`,
  );

  const question = questionById.get(
    mapping.questionId,
  );

  assert(
    question,
    `Mapped question ${mapping.questionId} does not exist.`,
  );

  assert(
    question.prompt.en.trim().length > 0,
    `${mapping.questionId} is missing English wording.`,
  );

  assert(
    question.prompt.zh.trim().length > 0,
    `${mapping.questionId} is missing Chinese wording.`,
  );

  assert(
    question.order >= 1 &&
      question.order <=
        EXPECTED_QUESTION_COUNT,
    `${mapping.questionId} has an invalid order.`,
  );
}

const uniqueOrders = new Set(
  personalityQuestionBank.map(
    (question) => question.order,
  ),
);

assert(
  uniqueOrders.size === EXPECTED_QUESTION_COUNT,
  "Personality question orders must be unique.",
);

console.log(
  "Personality question localization validation passed.",
);
console.log(
  `Questions: ${personalityQuestionBank.length}`,
);
console.log(
  `Mappings: ${personalityQuestionSourceMappings.length}`,
);
console.log("Locales: en, zh");

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
