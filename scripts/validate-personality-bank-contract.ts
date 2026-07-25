import assert from "node:assert/strict";

import {
  personalityQuestionBank,
  validatePersonalityQuestionBank,
} from "../src/data/assessment/questions/personality";

assert.equal(validatePersonalityQuestionBank().valid, true);

const seventeenPerDimension = personalityQuestionBank.filter(
  (question) =>
    !["personality-069", "personality-070", "personality-071", "personality-072"]
      .includes(question.id),
);
assert.equal(
  validatePersonalityQuestionBank(seventeenPerDimension).valid,
  false,
);

const unbalancedDirection = personalityQuestionBank.map(
  (question) =>
    question.id === "personality-001"
      ? { ...question, reverseScored: true }
      : question,
);
const directionResult =
  validatePersonalityQuestionBank(unbalancedDirection);
assert.equal(directionResult.valid, false);
assert.ok(
  directionResult.issues.some(
    (issue) => issue.path === "dimensions.EI.forward",
  ),
);
assert.ok(
  directionResult.issues.some(
    (issue) => issue.path === "dimensions.EI.reverse",
  ),
);
