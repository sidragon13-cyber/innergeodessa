import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  personalityQuestionBank,
  personalityQuestionSourceMappings,
} from "../src/data/assessment/questions/personality";

const CURRENT_BANK_VERSION = "personality-v2.0.0";
const DEFAULT_ITEMS_PATH = path.resolve(
  "innergeodessa-mvp/backend/data/items.json",
);

const DIMENSION_POLES = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"],
} as const;

type PersonalityDimension = keyof typeof DIMENSION_POLES;
type PersonalityPole =
  (typeof DIMENSION_POLES)[PersonalityDimension][number];

export interface PythonPersonalityItem {
  item_id: string;
  key: PersonalityPole;
  wording: string;
  dimension: PersonalityDimension;
  subdimension: string;
  form: string;
  pilot_order_within_dimension: number;
  master_order: number;
  language: "en";
  version: string;
  question_bank_version: typeof CURRENT_BANK_VERSION;
  status: "pilot";
  reverse_scored: boolean;
}

export interface PersonalityItemAuditIssue {
  kind:
    | "missing"
    | "extra"
    | "duplicate"
    | "dimension"
    | "key"
    | "wording"
    | "order"
    | "pole-balance"
    | "content";
  itemId?: string;
  message: string;
}

export interface PersonalityItemAuditResult {
  valid: boolean;
  issues: readonly PersonalityItemAuditIssue[];
}

interface HistoricalFields {
  subdimension: string;
  form: string;
}

export function buildPersonalityItems(
  historicalItems: readonly unknown[],
): readonly PythonPersonalityItem[] {
  const mappingsByQuestionId = new Map(
    personalityQuestionSourceMappings.map((mapping) => [
      mapping.questionId,
      mapping.sourceItemId,
    ]),
  );
  const historicalFields = createHistoricalFieldIndex(historicalItems);
  const dimensionOrders: Record<PersonalityDimension, number> = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  return Object.freeze(
    [...personalityQuestionBank]
      .sort((left, right) => left.order - right.order)
      .map((question) => {
        if (!isPersonalityDimension(question.dimension)) {
          throw new Error(
            `Unsupported personality dimension "${question.dimension}".`,
          );
        }

        const sourceItemId = mappingsByQuestionId.get(question.id);

        if (!sourceItemId) {
          throw new Error(
            `Missing source mapping for question "${question.id}".`,
          );
        }

        dimensionOrders[question.dimension] += 1;
        const preserved = historicalFields.get(sourceItemId);
        const [firstPole, secondPole] =
          DIMENSION_POLES[question.dimension];

        return Object.freeze({
          item_id: sourceItemId,
          key: question.reverseScored ? secondPole : firstPole,
          wording: question.prompt.en,
          dimension: question.dimension,
          subdimension:
            preserved?.subdimension ??
            parseSubdimension(sourceItemId),
          form: preserved?.form ?? "Agreement",
          pilot_order_within_dimension:
            dimensionOrders[question.dimension],
          master_order: question.order,
          language: "en",
          version: question.metadata.contentVersion,
          question_bank_version: CURRENT_BANK_VERSION,
          status: "pilot",
          reverse_scored: question.reverseScored,
        });
      }),
  );
}

export function serializePersonalityItems(
  items: readonly PythonPersonalityItem[],
): string {
  return `${JSON.stringify(items, null, 2)}\n`;
}

export function auditPersonalityItems(
  expected: readonly PythonPersonalityItem[],
  actual: readonly PythonPersonalityItem[],
): PersonalityItemAuditResult {
  const issues: PersonalityItemAuditIssue[] = [];
  const expectedById = indexItems(expected);
  const actualById = indexItems(actual, issues);

  for (const expectedItem of expected) {
    const actualItem = actualById.get(expectedItem.item_id);

    if (!actualItem) {
      issues.push({
        kind: "missing",
        itemId: expectedItem.item_id,
        message: `Missing item "${expectedItem.item_id}".`,
      });
      continue;
    }

    compareField("dimension", expectedItem, actualItem, issues);
    compareField("key", expectedItem, actualItem, issues);
    compareField("wording", expectedItem, actualItem, issues);
    compareField("master_order", expectedItem, actualItem, issues);

    if (JSON.stringify(expectedItem) !== JSON.stringify(actualItem)) {
      issues.push({
        kind: "content",
        itemId: expectedItem.item_id,
        message: `Item "${expectedItem.item_id}" differs from generated content.`,
      });
    }
  }

  for (const actualItem of actual) {
    if (!expectedById.has(actualItem.item_id)) {
      issues.push({
        kind: "extra",
        itemId: actualItem.item_id,
        message: `Unexpected item "${actualItem.item_id}".`,
      });
    }
  }

  validateUniqueOrders(actual, issues);
  validatePoleBalance(actual, issues);

  return {
    valid: issues.length === 0,
    issues: Object.freeze(issues),
  };
}

function createHistoricalFieldIndex(
  items: readonly unknown[],
): ReadonlyMap<string, HistoricalFields> {
  const fields = new Map<string, HistoricalFields>();

  for (const value of items) {
    if (!isRecord(value)) {
      continue;
    }

    const itemId = readNonEmptyString(value.item_id);
    const subdimension = readNonEmptyString(value.subdimension);
    const form = readNonEmptyString(value.form);

    if (itemId && subdimension && form && !fields.has(itemId)) {
      fields.set(itemId, { subdimension, form });
    }
  }

  return fields;
}

function parseSubdimension(sourceItemId: string): string {
  const parts = sourceItemId.split("-");
  return parts.length >= 4 && parts[2] ? parts[2] : "GENERAL";
}

function indexItems(
  items: readonly PythonPersonalityItem[],
  issues: PersonalityItemAuditIssue[] = [],
): ReadonlyMap<string, PythonPersonalityItem> {
  const itemsById = new Map<string, PythonPersonalityItem>();

  for (const item of items) {
    if (itemsById.has(item.item_id)) {
      issues.push({
        kind: "duplicate",
        itemId: item.item_id,
        message: `Duplicate item ID "${item.item_id}".`,
      });
    } else {
      itemsById.set(item.item_id, item);
    }
  }

  return itemsById;
}

function compareField(
  field: "dimension" | "key" | "wording" | "master_order",
  expected: PythonPersonalityItem,
  actual: PythonPersonalityItem,
  issues: PersonalityItemAuditIssue[],
): void {
  if (expected[field] === actual[field]) {
    return;
  }

  issues.push({
    kind: field === "master_order" ? "order" : field,
    itemId: expected.item_id,
    message:
      `Item "${expected.item_id}" has ${field} ${JSON.stringify(actual[field])}; ` +
      `expected ${JSON.stringify(expected[field])}.`,
  });
}

function validateUniqueOrders(
  items: readonly PythonPersonalityItem[],
  issues: PersonalityItemAuditIssue[],
): void {
  const orders = new Set<number>();

  for (const item of items) {
    if (orders.has(item.master_order)) {
      issues.push({
        kind: "duplicate",
        itemId: item.item_id,
        message: `Duplicate master_order ${item.master_order}.`,
      });
    }
    orders.add(item.master_order);
  }
}

function validatePoleBalance(
  items: readonly PythonPersonalityItem[],
  issues: PersonalityItemAuditIssue[],
): void {
  for (const dimension of Object.keys(
    DIMENSION_POLES,
  ) as PersonalityDimension[]) {
    const [firstPole, secondPole] = DIMENSION_POLES[dimension];
    const dimensionItems = items.filter(
      (item) => item.dimension === dimension,
    );
    const firstCount = dimensionItems.filter(
      (item) => item.key === firstPole,
    ).length;
    const secondCount = dimensionItems.filter(
      (item) => item.key === secondPole,
    ).length;

    if (
      dimensionItems.length !== 18 ||
      firstCount !== 9 ||
      secondCount !== 9
    ) {
      issues.push({
        kind: "pole-balance",
        message:
          `${dimension} must contain 18 items with 9 ${firstPole} and ` +
          `9 ${secondPole}; received ${dimensionItems.length}, ` +
          `${firstCount}, and ${secondCount}.`,
      });
    }
  }
}

function readItemsFile(filePath: string): readonly unknown[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const parsed: unknown = JSON.parse(
    fs.readFileSync(filePath, "utf8"),
  );

  if (!Array.isArray(parsed)) {
    throw new Error(`${filePath} must contain a JSON array.`);
  }

  return parsed;
}

function isPersonalityDimension(
  value: string,
): value is PersonalityDimension {
  return value in DIMENSION_POLES;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readNonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim()
    ? value.trim()
    : undefined;
}

function isPythonPersonalityItem(
  value: unknown,
): value is PythonPersonalityItem {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.item_id === "string" &&
    typeof value.key === "string" &&
    typeof value.wording === "string" &&
    typeof value.dimension === "string" &&
    typeof value.subdimension === "string" &&
    typeof value.form === "string" &&
    typeof value.pilot_order_within_dimension === "number" &&
    typeof value.master_order === "number" &&
    value.language === "en" &&
    typeof value.version === "string" &&
    value.question_bank_version === CURRENT_BANK_VERSION &&
    value.status === "pilot" &&
    typeof value.reverse_scored === "boolean"
  );
}

function runCli(): void {
  const checkOnly = process.argv.includes("--check");
  const existing = readItemsFile(DEFAULT_ITEMS_PATH);
  const expected = buildPersonalityItems(existing);

  if (checkOnly) {
    const actual = existing.filter(isPythonPersonalityItem);
    const audit = auditPersonalityItems(expected, actual);

    if (!audit.valid || actual.length !== existing.length) {
      for (const issue of audit.issues) {
        process.stderr.write(`[${issue.kind}] ${issue.message}\n`);
      }

      if (actual.length !== existing.length) {
        process.stderr.write(
          `[content] ${existing.length - actual.length} item(s) do not match the current item schema.\n`,
        );
      }

      process.exitCode = 1;
      return;
    }

    process.stdout.write(
      `Personality items are synchronized (${actual.length} items).\n`,
    );
    return;
  }

  fs.writeFileSync(
    DEFAULT_ITEMS_PATH,
    serializePersonalityItems(expected),
    "utf8",
  );
  process.stdout.write(
    `Wrote ${expected.length} items to ${DEFAULT_ITEMS_PATH}.\n`,
  );
}

const invokedPath = process.argv[1]
  ? path.resolve(process.argv[1])
  : "";

if (fileURLToPath(import.meta.url) === invokedPath) {
  runCli();
}
