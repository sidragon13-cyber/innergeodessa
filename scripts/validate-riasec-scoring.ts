import assert from "node:assert/strict";

import {
  RIASEC_DIMENSIONS,
  scoreRiasec,
  type RiasecAnswer,
  type RiasecDimension,
} from "../src/data/career";

function buildAnswers(
  values: Partial<
    Record<RiasecDimension, number>
  > = {},
): RiasecAnswer[] {
  const answers: RiasecAnswer[] = [];
  let order = 1;

  for (const dimension of RIASEC_DIMENSIONS) {
    const value = values[dimension] ?? 3;

    for (let index = 1; index <= 6; index += 1) {
      answers.push({
        questionId:
          `riasec-${dimension.toLowerCase()}-${String(
            index,
          ).padStart(2, "0")}`,
        dimension,
        value,
        order,
      });

      order += 1;
    }
  }

  return answers;
}

function expectError(
  callback: () => unknown,
  expectedMessage: string,
): void {
  assert.throws(
    callback,
    (error: unknown) =>
      error instanceof Error &&
      error.message.includes(expectedMessage),
  );
}

const dominantResult = scoreRiasec({
  answers: buildAnswers({
    R: 2,
    I: 5,
    A: 4,
    S: 3,
    E: 1,
    C: 2,
  }),
  questionBankVersion: "riasec-v0.1.0",
  completedAt: "2026-07-30T00:00:00.000Z",
});

assert.equal(dominantResult.code, "IAS");
assert.equal(dominantResult.primary, "I");
assert.equal(dominantResult.secondary, "A");
assert.equal(dominantResult.tertiary, "S");
assert.deepEqual(dominantResult.scores, {
  R: 12,
  I: 30,
  A: 24,
  S: 18,
  E: 6,
  C: 12,
});
assert.deepEqual(
  dominantResult.percentages,
  {
    R: 25,
    I: 100,
    A: 75,
    S: 50,
    E: 0,
    C: 25,
  },
);
assert.deepEqual(
  dominantResult.scoreGaps,
  {
    firstToSecond: 6,
    secondToThird: 6,
    thirdToFourth: 6,
  },
);
assert.equal(
  dominantResult.answeredCount,
  36,
);

const tieResult = scoreRiasec({
  answers: buildAnswers(),
  questionBankVersion: "riasec-v0.1.0",
});

assert.equal(tieResult.code, "RIA");
assert.deepEqual(
  tieResult.ranking.map(
    (entry) => entry.dimension,
  ),
  ["R", "I", "A", "S", "E", "C"],
);

expectError(
  () =>
    scoreRiasec({
      answers: buildAnswers().slice(0, 35),
      questionBankVersion: "riasec-v0.1.0",
    }),
  "exactly 36 answers",
);

const invalidValue = buildAnswers();
invalidValue[0] = {
  ...invalidValue[0],
  value: 6,
};

expectError(
  () =>
    scoreRiasec({
      answers: invalidValue,
      questionBankVersion: "riasec-v0.1.0",
    }),
  "integer from 1 to 5",
);

const duplicateId = buildAnswers();
duplicateId[1] = {
  ...duplicateId[1],
  questionId: duplicateId[0].questionId,
};

expectError(
  () =>
    scoreRiasec({
      answers: duplicateId,
      questionBankVersion: "riasec-v0.1.0",
    }),
  "Duplicate RIASEC questionId",
);

const wrongDistribution = buildAnswers();
wrongDistribution[0] = {
  ...wrongDistribution[0],
  dimension: "I",
};

expectError(
  () =>
    scoreRiasec({
      answers: wrongDistribution,
      questionBankVersion: "riasec-v0.1.0",
    }),
  "requires exactly 6 answers",
);

expectError(
  () =>
    scoreRiasec({
      answers: buildAnswers(),
      questionBankVersion: " ",
    }),
  "questionBankVersion is required",
);

console.log(
  "PASS — RIASEC scoring contract validated.",
);
