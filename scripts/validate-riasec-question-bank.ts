import { riasecQuestionBank } from "../src/data/assessment/questions/riasec";
import {
  validateRegisteredQuestionBank,
} from "../src/data/assessment/questions/registry";

const DIMENSIONS = ["R", "I", "A", "S", "E", "C"] as const;
const EXPECTED_TOTAL = 36;
const EXPECTED_PER_DIMENSION = 6;

function fail(message: string): never {
  console.error(`✗ ${message}`);
  process.exit(1);
}

console.log("");
console.log("========================================");
console.log("InnerGeodessa RIASEC Question Bank");
console.log("========================================");

const genericValidation = validateRegisteredQuestionBank("riasec");

if (!genericValidation.valid) {
  for (const issue of genericValidation.issues) {
    console.error(`✗ ${issue.path}: ${issue.message}`);
  }

  fail("Generic question-bank validation failed.");
}

if (riasecQuestionBank.length !== EXPECTED_TOTAL) {
  fail(
    `Expected ${EXPECTED_TOTAL} questions, received ${riasecQuestionBank.length}.`,
  );
}

const ids = new Set<string>();
const orders = new Set<number>();
const dimensionCounts = new Map<string, number>();

for (const question of riasecQuestionBank) {
  if (question.module !== "riasec") {
    fail(
      `Question "${question.id}" has invalid module "${question.module}".`,
    );
  }

  if (
    !DIMENSIONS.includes(
      question.dimension as (typeof DIMENSIONS)[number],
    )
  ) {
    fail(
      `Question "${question.id}" has unsupported dimension "${question.dimension}".`,
    );
  }

  if (ids.has(question.id)) {
    fail(`Duplicate question ID "${question.id}".`);
  }

  if (orders.has(question.order)) {
    fail(`Duplicate question order "${question.order}".`);
  }

  ids.add(question.id);
  orders.add(question.order);

  dimensionCounts.set(
    question.dimension,
    (dimensionCounts.get(question.dimension) ?? 0) + 1,
  );

  if (question.reverseScored) {
    fail(
      `Question "${question.id}" must not use reverse scoring in RIASEC V0.1.`,
    );
  }

  if (question.options.length !== 5) {
    fail(`Question "${question.id}" must have exactly five options.`);
  }

  const optionValues = question.options.map(
    (option) => option.value,
  );

  if (optionValues.join(",") !== "1,2,3,4,5") {
    fail(
      `Question "${question.id}" must use values 1,2,3,4,5.`,
    );
  }

  if (!question.prompt.en.trim() || !question.prompt.zh.trim()) {
    fail(`Question "${question.id}" is missing bilingual text.`);
  }

  if (question.metadata.contentVersion !== "0.1.0") {
    fail(
      `Question "${question.id}" has invalid content version.`,
    );
  }

  if (question.metadata.status !== "draft") {
    fail(
      `Question "${question.id}" must remain draft in V0.1.`,
    );
  }

  if (question.metadata.reviewed !== false) {
    fail(
      `Question "${question.id}" must remain unreviewed in V0.1.`,
    );
  }
}

for (const dimension of DIMENSIONS) {
  const count = dimensionCounts.get(dimension) ?? 0;

  if (count !== EXPECTED_PER_DIMENSION) {
    fail(
      `${dimension} must contain ${EXPECTED_PER_DIMENSION} questions; received ${count}.`,
    );
  }
}

const actualOrders = [...orders].sort(
  (first, second) => first - second,
);

const expectedOrders = Array.from(
  { length: EXPECTED_TOTAL },
  (_, index) => index + 1,
);

if (
  actualOrders.length !== expectedOrders.length ||
  actualOrders.some(
    (order, index) => order !== expectedOrders[index],
  )
) {
  fail("Question orders must be continuous from 1 to 36.");
}

console.log(`Questions : ${riasecQuestionBank.length}`);
console.log(`Dimensions: ${DIMENSIONS.length}`);
console.log("");

for (const dimension of DIMENSIONS) {
  console.log(
    `${dimension} : ${dimensionCounts.get(dimension)} questions`,
  );
}

console.log("");
console.log("✓ Generic question-bank contract");
console.log("✓ Total question count");
console.log("✓ Six-dimension balance");
console.log("✓ Unique IDs");
console.log("✓ Continuous orders");
console.log("✓ Bilingual prompts");
console.log("✓ Five-option interest scale");
console.log("✓ RIASEC module assignment");
console.log("✓ V0.1 draft metadata");
console.log("");
console.log("PASS — 36 RIASEC questions validated.");
