import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  isRiasecResultContract,
  RIASEC_DIMENSIONS,
} from "../src/data/career";
import { riasecQuestionBank } from "../src/data/assessment/questions/riasec";

const dimensions = [...RIASEC_DIMENSIONS];
const validResult = {
  sessionId: "riasec-session",
  module: "riasec",
  status: "completed",
  code: "RIA",
  scores: { R: 18, I: 18, A: 18, S: 18, E: 18, C: 18 },
  percentages: { R: 50, I: 50, A: 50, S: 50, E: 50, C: 50 },
  ranking: dimensions,
  answered: { R: 6, I: 6, A: 6, S: 6, E: 6, C: 6 },
  questionBankVersion: "riasec-v0.1.0",
  completedAt: "2026-07-30T12:00:00+00:00",
  calculatedAt: "2026-07-30T12:00:00+00:00",
} as const;

assert.equal(isRiasecResultContract(validResult), true);
assert.equal(
  isRiasecResultContract({ ...validResult, module: "personality" }),
  false,
);
assert.equal(
  isRiasecResultContract({
    ...validResult,
    ranking: ["R", "I", "A", "S", "E", "E"],
  }),
  false,
);
assert.equal(
  isRiasecResultContract({
    ...validResult,
    percentages: { ...validResult.percentages, C: 101 },
  }),
  false,
);

const backendItems = JSON.parse(
  readFileSync(
    resolve(
      process.cwd(),
      "innergeodessa-mvp/backend/data/riasec-items.json",
    ),
    "utf8",
  ),
) as unknown;

assert.ok(Array.isArray(backendItems));
assert.deepEqual(
  backendItems,
  riasecQuestionBank.map((question) => ({
    source_item_id: question.id,
    dimension: question.dimension,
    wording: question.prompt.en,
    master_order: question.order,
  })),
  "The backend RIASEC runtime items must mirror the TypeScript question bank.",
);

const sessionRouterSource = readFileSync(
  resolve(
    process.cwd(),
    "innergeodessa-mvp/backend/app/routers/session.py",
  ),
  "utf8",
);
const schemaSource = readFileSync(
  resolve(process.cwd(), "innergeodessa-mvp/backend/schema.sql"),
  "utf8",
);

for (const contractField of [
  '"sessionId"',
  '"module"',
  '"status"',
  '"code"',
  '"scores"',
  '"percentages"',
  '"ranking"',
  '"answered"',
  '"questionBankVersion"',
  '"completedAt"',
  '"calculatedAt"',
] as const) {
  assert.ok(
    sessionRouterSource.includes(contractField),
    `Backend RIASEC result response must include ${contractField}.`,
  );
}

assert.match(schemaSource, /CREATE TABLE IF NOT EXISTS riasec_results/);

console.log("PASS — RIASEC result contract validated.");
