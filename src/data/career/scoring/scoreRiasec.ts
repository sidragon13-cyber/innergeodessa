import {
  RIASEC_DIMENSIONS,
  type RiasecAnswer,
  type RiasecDimension,
  type RiasecPercentages,
  type RiasecRankedDimension,
  type RiasecResult,
  type RiasecScores,
  type ScoreRiasecInput,
} from "../types";

const EXPECTED_QUESTION_COUNT = 36;
const QUESTIONS_PER_DIMENSION = 6;
const MIN_VALUE = 1;
const MAX_VALUE = 5;

const DIMENSION_ORDER = new Map<RiasecDimension, number>(
  RIASEC_DIMENSIONS.map((dimension, index) => [
    dimension,
    index,
  ]),
);

function createEmptyScores(): RiasecScores {
  return {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };
}

function validateAnswers(
  answers: readonly RiasecAnswer[],
): void {
  if (answers.length !== EXPECTED_QUESTION_COUNT) {
    throw new Error(
      `RIASEC scoring requires exactly ${EXPECTED_QUESTION_COUNT} answers.`,
    );
  }

  const ids = new Set<string>();
  const orders = new Set<number>();
  const counts = createEmptyScores();

  for (const answer of answers) {
    if (!answer.questionId.trim()) {
      throw new Error(
        "RIASEC answer questionId cannot be empty.",
      );
    }

    if (ids.has(answer.questionId)) {
      throw new Error(
        `Duplicate RIASEC questionId: ${answer.questionId}`,
      );
    }

    ids.add(answer.questionId);

    if (
      !Number.isInteger(answer.order) ||
      answer.order < 1 ||
      answer.order > EXPECTED_QUESTION_COUNT
    ) {
      throw new Error(
        `Invalid RIASEC question order: ${answer.order}`,
      );
    }

    if (orders.has(answer.order)) {
      throw new Error(
        `Duplicate RIASEC question order: ${answer.order}`,
      );
    }

    orders.add(answer.order);

    if (
      !RIASEC_DIMENSIONS.includes(answer.dimension)
    ) {
      throw new Error(
        `Unknown RIASEC dimension: ${String(
          answer.dimension,
        )}`,
      );
    }

    if (
      !Number.isInteger(answer.value) ||
      answer.value < MIN_VALUE ||
      answer.value > MAX_VALUE
    ) {
      throw new Error(
        `RIASEC answer value must be an integer from ${MIN_VALUE} to ${MAX_VALUE}.`,
      );
    }

    counts[answer.dimension] += 1;
  }

  for (const dimension of RIASEC_DIMENSIONS) {
    if (
      counts[dimension] !==
      QUESTIONS_PER_DIMENSION
    ) {
      throw new Error(
        `RIASEC dimension ${dimension} requires exactly ${QUESTIONS_PER_DIMENSION} answers.`,
      );
    }
  }

  for (
    let order = 1;
    order <= EXPECTED_QUESTION_COUNT;
    order += 1
  ) {
    if (!orders.has(order)) {
      throw new Error(
        `Missing RIASEC question order: ${order}`,
      );
    }
  }
}

function calculatePercentages(
  scores: RiasecScores,
): RiasecPercentages {
  const minimumScore =
    QUESTIONS_PER_DIMENSION * MIN_VALUE;
  const maximumScore =
    QUESTIONS_PER_DIMENSION * MAX_VALUE;
  const range = maximumScore - minimumScore;

  return Object.fromEntries(
    RIASEC_DIMENSIONS.map((dimension) => {
      const percentage =
        ((scores[dimension] - minimumScore) /
          range) *
        100;

      return [
        dimension,
        Math.round(percentage),
      ];
    }),
  ) as RiasecPercentages;
}

function createRanking(
  scores: RiasecScores,
  percentages: RiasecPercentages,
): RiasecRankedDimension[] {
  return RIASEC_DIMENSIONS.map((dimension) => ({
    dimension,
    score: scores[dimension],
    percentage: percentages[dimension],
    rank: 0,
  }))
    .sort((left, right) => {
      const scoreDifference =
        right.score - left.score;

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return (
        (DIMENSION_ORDER.get(left.dimension) ?? 0) -
        (DIMENSION_ORDER.get(right.dimension) ?? 0)
      );
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
}

export function scoreRiasec(
  input: ScoreRiasecInput,
): RiasecResult {
  const {
    answers,
    questionBankVersion,
    completedAt = new Date().toISOString(),
  } = input;

  if (!questionBankVersion.trim()) {
    throw new Error(
      "RIASEC questionBankVersion is required.",
    );
  }

  validateAnswers(answers);

  const scores = createEmptyScores();

  for (const answer of answers) {
    scores[answer.dimension] += answer.value;
  }

  const percentages =
    calculatePercentages(scores);

  const ranking = createRanking(
    scores,
    percentages,
  );

  const [
    first,
    second,
    third,
    fourth,
  ] = ranking;

  if (!first || !second || !third || !fourth) {
    throw new Error(
      "RIASEC ranking could not be generated.",
    );
  }

  return {
    code: [
      first.dimension,
      second.dimension,
      third.dimension,
    ].join(""),
    scores,
    percentages,
    ranking,
    primary: first.dimension,
    secondary: second.dimension,
    tertiary: third.dimension,
    scoreGaps: {
      firstToSecond:
        first.score - second.score,
      secondToThird:
        second.score - third.score,
      thirdToFourth:
        third.score - fourth.score,
    },
    answeredCount: answers.length,
    completedAt,
    questionBankVersion,
  };
}
