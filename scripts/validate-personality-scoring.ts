import assert from "node:assert/strict";

import {
  isPersonalityResultContract,
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

const persistedResult = {
  sessionId: "session-001",
  status: "completed",
  type: "INTJ",
  scores: { EI: -4, SN: -6, TF: 8, JP: 2 },
  confidence: { EI: 0.2, SN: 0.3, TF: 0.4, JP: 0.1 },
  answered: { EI: 18, SN: 18, TF: 18, JP: 18 },
  tie_rule:
    "A zero score resolves to the first pole and must be reported as low differentiation.",
  questionBankVersion: "personality-v1.0.0",
  completedAt: "2026-07-27T12:00:00+00:00",
  calculatedAt: "2026-07-27T12:00:00+00:00",
};

assert.equal(
  isPersonalityResultContract(persistedResult),
  true,
);
assert.equal(
  isPersonalityResultContract({
    ...persistedResult,
    type: "XXXX",
  }),
  false,
);
assert.equal(
  isPersonalityResultContract({
    ...persistedResult,
    confidence: {
      ...persistedResult.confidence,
      EI: 1.1,
    },
  }),
  false,
);
assert.equal(
  isPersonalityResultContract({
    ...persistedResult,
    answered: {
      ...persistedResult.answered,
      EI: 1.5,
    },
  }),
  false,
);
assert.equal(
  isPersonalityResultContract({
    ...persistedResult,
    sessionId: " ",
  }),
  false,
);
assert.equal(
  scorePersonalityAssessment(
    personalityQuestionBank,
    responsesFor(5),
  ).type,
  "ESTJ",
);
