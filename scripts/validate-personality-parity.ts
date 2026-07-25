import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";

import {
  scorePersonalityAssessment,
  type PersonalityScoreContract,
} from "../src/data/assessment/scoring/personality";
import {
  personalityQuestionBank,
  personalityQuestionSourceMappings,
} from "../src/data/assessment/questions/personality";
import type { PersonalityType } from "../src/data/assessment/personality";

const PYTHON = path.resolve(
  "innergeodessa-mvp/backend/.venv/bin/python",
);
const PYTHON_CLI = path.resolve(
  "innergeodessa-mvp/backend/app/scoring_cli.py",
);
const CONFIDENCE_TOLERANCE = 1e-4;
const TYPES: readonly PersonalityType[] = [
  "ESTJ", "ESTP", "ESFJ", "ESFP",
  "ENTJ", "ENTP", "ENFJ", "ENFP",
  "ISTJ", "ISTP", "ISFJ", "ISFP",
  "INTJ", "INTP", "INFJ", "INFP",
];

interface Case {
  label: string;
  values: readonly number[];
}

const sourceIdByQuestionId = new Map(
  personalityQuestionSourceMappings.map((mapping) => [
    mapping.questionId,
    mapping.sourceItemId,
  ]),
);

const cases: Case[] = [];

for (const value of [1, 2, 3, 4, 5]) {
  cases.push({
    label: `all-${value}`,
    values: personalityQuestionBank.map(() => value),
  });
}

cases.push({
  label: "maximum-first-poles",
  values: personalityQuestionBank.map((question) =>
    question.reverseScored ? 1 : 5,
  ),
});
cases.push({
  label: "maximum-second-poles",
  values: personalityQuestionBank.map((question) =>
    question.reverseScored ? 5 : 1,
  ),
});

for (const type of TYPES) {
  cases.push({
    label: `type-${type}`,
    values: personalityQuestionBank.map((question) => {
      const target = {
        EI: type[0],
        SN: type[1],
        TF: type[2],
        JP: type[3],
      }[question.dimension];
      const wantsFirstPole = target === question.dimension[0];

      if (wantsFirstPole) {
        return question.reverseScored ? 1 : 5;
      }

      return question.reverseScored ? 5 : 1;
    }),
  });
}

const random = createSeededRandom(0x1a2b3c4d);
for (let index = 0; index < 100; index += 1) {
  cases.push({
    label: `seeded-${index + 1}`,
    values: personalityQuestionBank.map(
      () => Math.floor(random() * 5) + 1,
    ),
  });
}

const typescriptResults = cases.map((testCase) =>
  scorePersonalityAssessment(
    personalityQuestionBank,
    personalityQuestionBank.map((question, index) => ({
      questionId: question.id,
      value: testCase.values[index],
    })),
  ),
);

const pythonInput = {
  assessments: cases.map((testCase) =>
    Object.fromEntries(
      personalityQuestionBank.map((question, index) => {
        const sourceItemId = sourceIdByQuestionId.get(question.id);
        assert.ok(sourceItemId);
        return [sourceItemId, testCase.values[index]];
      }),
    ),
  ),
};

const pythonOutput = execFileSync(
  PYTHON,
  [PYTHON_CLI],
  {
    input: JSON.stringify(pythonInput),
    encoding: "utf8",
  },
);
const parsed: unknown = JSON.parse(pythonOutput);
assert.ok(Array.isArray(parsed));
assert.equal(parsed.length, cases.length);

parsed.forEach((value, index) => {
  assertPythonContract(value);
  compareContracts(
    cases[index].label,
    typescriptResults[index],
    value,
  );
});

assert.equal(typescriptResults[2].type, "ESTJ");
assert.deepEqual(
  new Set(
    typescriptResults
      .slice(7, 7 + TYPES.length)
      .map((result) => result.type),
  ),
  new Set(TYPES),
);

function compareContracts(
  label: string,
  typescript: PersonalityScoreContract,
  python: PersonalityScoreContract,
): void {
  assert.equal(python.type, typescript.type, `${label}: type`);
  assert.deepEqual(python.scores, typescript.scores, `${label}: scores`);
  assert.deepEqual(
    python.answered,
    typescript.answered,
    `${label}: answered`,
  );
  assert.equal(
    python.tie_rule,
    typescript.tie_rule,
    `${label}: tie rule`,
  );

  for (const dimension of ["EI", "SN", "TF", "JP"] as const) {
    assert.ok(
      Math.abs(
        python.confidence[dimension] -
          typescript.confidence[dimension],
      ) <= CONFIDENCE_TOLERANCE,
      `${label}: ${dimension} confidence`,
    );
  }
}

function assertPythonContract(
  value: unknown,
): asserts value is PersonalityScoreContract {
  assert.ok(typeof value === "object" && value !== null);
  assert.ok("type" in value);
  assert.ok("scores" in value);
  assert.ok("confidence" in value);
  assert.ok("answered" in value);
  assert.ok("tie_rule" in value);
}

function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0;
    return state / 0x1_0000_0000;
  };
}
