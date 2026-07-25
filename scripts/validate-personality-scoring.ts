import assert from "node:assert/strict";

import {
  scorePersonalityAssessment,
} from "../src/data/assessment/scoring/personality";
import {
  personalityQuestionBank,
} from "../src/data/assessment/questions/personality";

function responsesFor(value: number) {
  return personalityQuestionBank.map((question) => ({
    questionId: question.id,
    value,
  }));
}

const neutral = scorePersonalityAssessment(
  personalityQuestionBank,
  responsesFor(3),
);
assert.equal(neutral.type, "ESTJ");
assert.deepEqual(neutral.scores, {
  EI: 0,
  SN: 0,
  TF: 0,
  JP: 0,
});
assert.deepEqual(neutral.confidence, {
  EI: 0,
  SN: 0,
  TF: 0,
  JP: 0,
});
assert.deepEqual(neutral.answered, {
  EI: 18,
  SN: 18,
  TF: 18,
  JP: 18,
});

assert.equal(
  scorePersonalityAssessment(
    personalityQuestionBank,
    responsesFor(1),
  ).type,
  "ESTJ",
);
assert.equal(
  scorePersonalityAssessment(
    personalityQuestionBank,
    responsesFor(5),
  ).type,
  "ESTJ",
);
