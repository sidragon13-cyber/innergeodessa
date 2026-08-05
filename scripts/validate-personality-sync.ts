import assert from "node:assert/strict";

import {
  auditPersonalityItems,
  buildPersonalityItems,
  serializePersonalityItems,
  type PythonPersonalityItem,
} from "./sync-personality-items";

const items = buildPersonalityItems([]);

assert.equal(items.length, 72);
assert.equal(new Set(items.map((item) => item.item_id)).size, 72);
assert.deepEqual(
  items.map((item) => item.master_order),
  Array.from({ length: 72 }, (_, index) => index + 1),
);

for (const [dimension, poles] of Object.entries({
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"],
})) {
  const dimensionItems = items.filter(
    (item) => item.dimension === dimension,
  );

  assert.equal(dimensionItems.length, 18);
  assert.equal(
    dimensionItems.filter((item) => item.key === poles[0]).length,
    9,
  );
  assert.equal(
    dimensionItems.filter((item) => item.key === poles[1]).length,
    9,
  );
}

assert.ok(
  items.every(
    (item) =>
      item.question_bank_version === "personality-v2.0.0" &&
      item.status === "pilot",
  ),
);

const firstSerialization = serializePersonalityItems(items);
const secondSerialization = serializePersonalityItems(
  buildPersonalityItems([]),
);
assert.equal(firstSerialization, secondSerialization);

const validAudit = auditPersonalityItems(items, items);
assert.equal(validAudit.valid, true);
assert.deepEqual(validAudit.issues, []);

const invalidItems: readonly PythonPersonalityItem[] = [
  ...items.slice(0, -1),
  {
    ...items[0],
    master_order: 72,
    key: "I",
    wording: "Changed wording",
  },
];
const invalidAudit = auditPersonalityItems(items, invalidItems);
assert.equal(invalidAudit.valid, false);
assert.ok(
  invalidAudit.issues.some((issue) => issue.kind === "missing"),
);
assert.ok(
  invalidAudit.issues.some((issue) => issue.kind === "duplicate"),
);
assert.ok(
  invalidAudit.issues.some((issue) => issue.kind === "pole-balance"),
);
