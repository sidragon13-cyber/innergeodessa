import {
  createPersonalityAssessmentResult,
  PERSONALITY_DIMENSIONS,
  type PersonalityType,
} from "../src/data/assessment/personality";

import {
  personalityQuestionBank,
} from "../src/data/assessment/questions/personality/questions";

import type {
  AssessmentQuestion,
} from "../src/data/assessment/questions/schema";

import type {
  AssessmentResponse,
} from "../src/data/assessment/engine";

const VALID_PERSONALITY_TYPES = new Set<PersonalityType>([
  "ESTJ",
  "ESTP",
  "ESFJ",
  "ESFP",
  "ENTJ",
  "ENTP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISTP",
  "ISFJ",
  "ISFP",
  "INTJ",
  "INTP",
  "INFJ",
  "INFP",
]);

const issues: string[] = [];
let passedChecks = 0;

function pass(label: string): void {
  passedChecks += 1;
  console.log(`✓ ${label}`);
}

function fail(label: string, message: string): void {
  issues.push(`${label}: ${message}`);
  console.error(`✗ ${label}`);
  console.error(`  ${message}`);
}

function getMinimumValue(question: AssessmentQuestion): number {
  return Math.min(...question.options.map((option) => option.value));
}

function getMaximumValue(question: AssessmentQuestion): number {
  return Math.max(...question.options.map((option) => option.value));
}

function getMiddleValue(question: AssessmentQuestion): number {
  const values = question.options
    .map((option) => option.value)
    .sort((left, right) => left - right);

  return values[Math.floor(values.length / 2)];
}

function createResponses(
  getValue: (question: AssessmentQuestion) => number,
): readonly AssessmentResponse[] {
  return personalityQuestionBank.map((question) => ({
    questionId: question.id,
    value: getValue(question),
  }));
}

function validateSuccessfulResult(
  label: string,
  responses: readonly AssessmentResponse[],
  expectedType?: PersonalityType,
): PersonalityType | null {
  const result = createPersonalityAssessmentResult(
    personalityQuestionBank,
    responses,
  );

  if (!result.valid) {
    fail(
      label,
      result.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join("; "),
    );

    return null;
  }

  if (!VALID_PERSONALITY_TYPES.has(result.type)) {
    fail(label, `Invalid personality type "${result.type}".`);
    return null;
  }

  if (expectedType && result.type !== expectedType) {
    fail(
      label,
      `Expected "${expectedType}", received "${result.type}".`,
    );

    return result.type;
  }

  for (const dimension of PERSONALITY_DIMENSIONS) {
    const interpretation = result.dimensions[dimension];

    if (
      interpretation.firstPolePercentage +
        interpretation.secondPolePercentage !==
      100
    ) {
      fail(
        label,
        `${dimension} percentages do not total 100.`,
      );

      return result.type;
    }

    if (
      interpretation.preferredPercentage +
        interpretation.oppositePercentage !==
      100
    ) {
      fail(
        label,
        `${dimension} preferred percentages do not total 100.`,
      );

      return result.type;
    }

    const percentages = [
      interpretation.firstPolePercentage,
      interpretation.secondPolePercentage,
      interpretation.preferredPercentage,
      interpretation.oppositePercentage,
      interpretation.preferenceStrength,
    ];

    if (
      percentages.some(
        (percentage) =>
          !Number.isFinite(percentage) ||
          percentage < 0 ||
          percentage > 100,
      )
    ) {
      fail(
        label,
        `${dimension} contains an invalid percentage.`,
      );

      return result.type;
    }

    if (
      interpretation.aggregate.normalizedTotal <
        interpretation.aggregate.minimumPossibleTotal ||
      interpretation.aggregate.normalizedTotal >
        interpretation.aggregate.maximumPossibleTotal
    ) {
      fail(
        label,
        `${dimension} normalized score is outside its range.`,
      );

      return result.type;
    }
  }

  pass(label);
  return result.type;
}

function validateFailure(
  label: string,
  responses: readonly AssessmentResponse[],
): void {
  const result = createPersonalityAssessmentResult(
    personalityQuestionBank,
    responses,
  );

  if (result.valid) {
    fail(
      label,
      `Expected validation failure, received "${result.type}".`,
    );

    return;
  }

  if (result.issues.length === 0) {
    fail(label, "Failure result did not contain issues.");
    return;
  }

  pass(label);
}

console.log("");
console.log("========================================");
console.log("InnerGeodessa Personality Interpreter");
console.log("========================================");
console.log(`Questions    : ${personalityQuestionBank.length}`);
console.log("");

// All middle answers must follow the centralized tie rule.
const middleResponses = createResponses(getMiddleValue);

validateSuccessfulResult(
  "Tie-breaking policy",
  middleResponses,
  "ESTJ",
);

// Extreme raw responses must remain valid even with reverse scoring.
validateSuccessfulResult(
  "All minimum responses",
  createResponses(getMinimumValue),
);

validateSuccessfulResult(
  "All maximum responses",
  createResponses(getMaximumValue),
);

// Explicitly choose the normalized direction required for a type.
function createResponsesForType(
  type: PersonalityType,
): readonly AssessmentResponse[] {
  const targetPoleByDimension = {
    EI: type[0],
    SN: type[1],
    TF: type[2],
    JP: type[3],
  } as const;

  return personalityQuestionBank.map((question) => {
    const targetPole =
      targetPoleByDimension[
        question.dimension as keyof typeof targetPoleByDimension
      ];

    const firstPole = question.dimension[0];
    const wantsHighNormalizedScore = targetPole === firstPole;

    const normalizedValue = wantsHighNormalizedScore
      ? getMaximumValue(question)
      : getMinimumValue(question);

    const rawValue = question.reverseScored
      ? getMinimumValue(question) +
        getMaximumValue(question) -
        normalizedValue
      : normalizedValue;

    return {
      questionId: question.id,
      value: rawValue,
    };
  });
}

for (const type of VALID_PERSONALITY_TYPES) {
  validateSuccessfulResult(
    `Generate ${type}`,
    createResponsesForType(type),
    type,
  );
}

// Missing response.
validateFailure(
  "Missing response rejected",
  middleResponses.slice(0, -1),
);

// Duplicate response.
validateFailure(
  "Duplicate response rejected",
  [
    ...middleResponses,
    middleResponses[0],
  ],
);

// Unknown question ID.
validateFailure(
  "Unknown question rejected",
  [
    ...middleResponses.slice(1),
    {
      questionId: "personality-999",
      value: 3,
    },
  ],
);

// Invalid option value.
validateFailure(
  "Invalid option value rejected",
  middleResponses.map((response, index) =>
    index === 0
      ? {
          ...response,
          value: 999,
        }
      : response,
  ),
);

// Non-finite answer.
validateFailure(
  "Non-finite value rejected",
  middleResponses.map((response, index) =>
    index === 0
      ? {
          ...response,
          value: Number.NaN,
        }
      : response,
  ),
);

// Randomized stress testing.
const RANDOM_TEST_COUNT = 1000;
const generatedTypes = new Set<PersonalityType>();

for (let index = 0; index < RANDOM_TEST_COUNT; index += 1) {
  const responses = personalityQuestionBank.map((question) => {
    const option =
      question.options[
        Math.floor(Math.random() * question.options.length)
      ];

    return {
      questionId: question.id,
      value: option.value,
    };
  });

  const result = createPersonalityAssessmentResult(
    personalityQuestionBank,
    responses,
  );

  if (!result.valid) {
    fail(
      "Random stress test",
      `Assessment ${index + 1} failed validation.`,
    );

    break;
  }

  if (!VALID_PERSONALITY_TYPES.has(result.type)) {
    fail(
      "Random stress test",
      `Assessment ${index + 1} generated invalid type "${result.type}".`,
    );

    break;
  }

  generatedTypes.add(result.type);

  for (const dimension of PERSONALITY_DIMENSIONS) {
    const interpreted = result.dimensions[dimension];

    if (
      interpreted.firstPolePercentage +
        interpreted.secondPolePercentage !==
      100
    ) {
      fail(
        "Random stress test",
        `Assessment ${index + 1}, ${dimension} does not total 100%.`,
      );

      break;
    }
  }
}

if (!issues.some((issue) => issue.startsWith("Random stress test"))) {
  pass(`${RANDOM_TEST_COUNT} randomized assessments`);
}

if (generatedTypes.size === VALID_PERSONALITY_TYPES.size) {
  pass("Random coverage includes all 16 types");
} else {
  console.log(
    `ℹ Random coverage generated ${generatedTypes.size}/16 types.`,
  );
  console.log(
    "  Deterministic generation already verified all 16 types.",
  );
}

console.log("");
console.log("========================================");

if (issues.length > 0) {
  console.error(`FAIL — ${issues.length} issue(s) found.`);
  console.error("");

  issues.forEach((issue, index) => {
    console.error(`${index + 1}. ${issue}`);
  });

  console.log("========================================");
  process.exitCode = 1;
} else {
  console.log(`${passedChecks} checks passed.`);
  console.log("PASS — Personality interpreter validated.");
  console.log("========================================");
}
