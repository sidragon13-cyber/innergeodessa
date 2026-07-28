import assert from "node:assert/strict";

import {
  analyseDimension,
  analyseRuleInput,
  ISFJ_REPORT_RULES,
  matchesRule,
  selectReportRules,
  selectRulesForSlot,
  validateIsfjRuleSet,
} from "../src/data/report";
import type {
  DimensionCode,
  DimensionResult,
  ReportRuleDefinition,
  ReportRuleInput,
} from "../src/data/report";

function input(
  values: Partial<
    Record<
      "EI" | "SN" | "TF" | "JP",
      readonly [number, number]
    >
  > = {},
  personalityType: ReportRuleInput["personalityType"] = "ISFJ",
): ReportRuleInput {
  const dimensions: Record<
    DimensionCode,
    DimensionResult
  > = {
    EI: { dimension: "EI" as const, score: -10, confidence: 30 },
    SN: { dimension: "SN" as const, score: -10, confidence: 30 },
    TF: { dimension: "TF" as const, score: -10, confidence: 30 },
    JP: { dimension: "JP" as const, score: -10, confidence: 30 },
  };

  for (const dimension of ["EI", "SN", "TF", "JP"] as const) {
    const value = values[dimension];
    if (value) {
      dimensions[dimension] = {
        dimension,
        score: value[0],
        confidence: value[1],
      };
    }
  }

  return { personalityType, dimensions };
}

assert.deepEqual(
  analyseDimension({
    dimension: "EI",
    score: 0,
    confidence: 90,
  }),
  {
    dimension: "EI",
    score: 0,
    confidence: 90,
    preference: "X",
    oppositePreference: "X",
    band: "balanced",
  },
);
assert.equal(
  analyseDimension({
    dimension: "EI",
    score: -1,
    confidence: 0,
  }).band,
  "borderline",
);
assert.equal(
  analyseDimension({
    dimension: "EI",
    score: -1,
    confidence: 10,
  }).preference,
  "I",
);
assert.equal(
  analyseDimension({
    dimension: "EI",
    score: 1,
    confidence: 10,
  }).preference,
  "E",
);
assert.deepEqual(
  [
    ["EI", "I", "E"],
    ["SN", "S", "N"],
    ["TF", "F", "T"],
    ["JP", "J", "P"],
  ].map(([dimension, negative, positive]) => [
    analyseDimension({
      dimension: dimension as DimensionCode,
      score: -1,
      confidence: 10,
    }).preference,
    analyseDimension({
      dimension: dimension as DimensionCode,
      score: 1,
      confidence: 10,
    }).preference,
    negative,
    positive,
  ]),
  [
    ["I", "E", "I", "E"],
    ["S", "N", "S", "N"],
    ["F", "T", "F", "T"],
    ["J", "P", "J", "P"],
  ],
);

assert.deepEqual(
  [1, 16, 41, 71].map((confidence) =>
    analyseDimension({
      dimension: "SN",
      score: -1,
      confidence,
    }).band,
  ),
  ["borderline", "moderate", "strong", "very-strong"],
);

assert.throws(() =>
  analyseRuleInput({
    personalityType: "ISFJ",
    dimensions: {
      EI: {
        dimension: "EI",
        score: -1,
        confidence: 10,
      },
      SN: {
        dimension: "SN",
        score: -1,
        confidence: 10,
      },
      TF: {
        dimension: "TF",
        score: -1,
        confidence: 10,
      },
    },
  } as unknown as ReportRuleInput),
);

const aggregate = analyseRuleInput(
  input({
    EI: [0, 0],
    SN: [-2, 10],
    TF: [2, 20],
    JP: [0, 30],
  }),
);
assert.equal(aggregate.averageConfidence, 15);
assert.equal(aggregate.lowConfidenceCount, 2);
assert.equal(aggregate.balancedCount, 2);

const genericRules: ReportRuleDefinition[] = [
  {
    id: "rule-b",
    personalityType: "ISFJ",
    priority: 10,
    conditions: [
      {
        kind: "dimension",
        dimension: "EI",
        preferences: ["I"],
      },
    ],
    content: [
      {
        targetSectionId: "dimension-results",
        targetSlotId: "slot",
        blockId: "block-b",
        blockType: "analysis",
        content: { en: "Matching content." },
      },
    ],
    exclusiveGroup: "generic",
  },
  {
    id: "rule-a",
    personalityType: "ISFJ",
    priority: 20,
    conditions: [
      {
        kind: "combination",
        all: [
          {
            kind: "dimension",
            dimension: "EI",
            preferences: ["I"],
          },
          {
            kind: "dimension",
            dimension: "SN",
            bands: ["moderate"],
          },
        ],
      },
    ],
    content: [
      {
        targetSectionId: "dimension-results",
        targetSlotId: "slot",
        blockId: "block-a",
        blockType: "analysis",
        content: { en: "Higher-priority matching content." },
      },
    ],
    exclusiveGroup: "generic",
  },
  {
    id: "rule-c",
    personalityType: "ENTJ",
    priority: 100,
    conditions: [
      {
        kind: "aggregate",
        metric: "average-confidence",
        operator: "gte",
        value: 0,
      },
    ],
    content: [
      {
        targetSectionId: "dimension-results",
        targetSlotId: "slot",
        blockId: "block-c",
        blockType: "analysis",
        content: { en: "Wrong personality type." },
      },
    ],
  },
];
const genericInput = analyseRuleInput(input());
assert.equal(matchesRule(genericRules[0], genericInput), true);
const rulesBeforeSelection = structuredClone(genericRules);
const genericSelected = selectReportRules(
  genericRules,
  genericInput,
);
assert.deepEqual(
  genericSelected.map((rule) => rule.ruleId),
  ["rule-a"],
);
assert.deepEqual(genericRules, rulesBeforeSelection);
assert.equal(
  selectRulesForSlot(
    genericSelected,
    "dimension-results",
    "slot",
  ).length,
  1,
);

const ruleSetValidation = validateIsfjRuleSet();
assert.equal(ruleSetValidation.valid, true);
assert.deepEqual(ruleSetValidation.errors, []);

const declaredSlots = new Set([
  "dimension-results:isfj-ei-strength",
  "dimension-results:isfj-sn-boundary",
  "dimension-results:isfj-tf-boundary",
  "dimension-results:isfj-jp-boundary",
  "dimension-results:isfj-overall-confidence",
  "core-personality-pattern:isfj-combination-care-structure",
  "core-personality-pattern:isfj-balanced-dimensions",
  "growth-roadmap:isfj-combination-boundary-risk",
  "change-and-adaptation:isfj-combination-change-flexibility",
]);
ISFJ_REPORT_RULES.flatMap((rule) => rule.content).forEach(
  (content) => {
    assert.ok(
      declaredSlots.has(
        `${content.targetSectionId}:${content.targetSlotId}`,
      ),
    );
  },
);

const dimensionRules = ISFJ_REPORT_RULES.filter(
  (rule) => rule.tags?.includes("dimension"),
);
for (const dimension of ["EI", "SN", "TF", "JP"] as const) {
  assert.equal(
    dimensionRules.filter(
      (rule) => rule.tags?.includes(`dimension-${dimension}`),
    ).length,
    9,
  );
}

function selectedIds(
  values: Parameters<typeof input>[0],
): string[] {
  return selectReportRules(
    ISFJ_REPORT_RULES,
    analyseRuleInput(input(values)),
  ).map((rule) => rule.ruleId);
}

assert.ok(
  selectedIds({ EI: [-20, 60] }).includes(
    "isfj-ei-i-strong",
  ),
);
assert.ok(
  selectedIds({ EI: [0, 80] }).includes(
    "isfj-ei-balanced",
  ),
);
assert.ok(
  selectedIds({ SN: [20, 60] }).includes(
    "isfj-sn-n-strong",
  ),
);

const lowConfidenceRules = selectReportRules(
  ISFJ_REPORT_RULES,
  analyseRuleInput(
    input({
      EI: [-1, 10],
      SN: [-1, 10],
      TF: [-1, 10],
      JP: [-1, 10],
    }),
  ),
);
assert.ok(
  lowConfidenceRules.some(
    (rule) => rule.ruleId === "isfj-confidence-average-low",
  ),
);

const highConfidenceRules = selectReportRules(
  ISFJ_REPORT_RULES,
  analyseRuleInput(
    input({
      EI: [-10, 80],
      SN: [-10, 80],
      TF: [-10, 80],
      JP: [-10, 80],
    }),
  ),
);
const highConfidenceText = highConfidenceRules
  .flatMap((rule) => rule.content)
  .map((content) => content.content.en ?? "")
  .join(" ");
assert.match(
  highConfidenceText,
  /does not (?:indicate|mean) greater ability/i,
);

assert.ok(
  selectedIds({
    EI: [0, 60],
    SN: [0, 60],
    TF: [0, 60],
    JP: [-5, 60],
  }).includes("isfj-balanced-count-3"),
);
assert.ok(
  selectedIds({
    EI: [-20, 60],
    TF: [-20, 60],
  }).includes("isfj-combination-quiet-support"),
);
assert.ok(
  selectedIds({
    SN: [-20, 60],
    JP: [-20, 60],
  }).includes("isfj-combination-care-structure"),
);
assert.ok(
  selectedIds({
    TF: [-20, 60],
    JP: [-20, 60],
  }).includes("isfj-combination-boundary-risk"),
);
assert.ok(
  selectedIds({
    SN: [-1, 10],
    JP: [-1, 10],
  }).includes("isfj-combination-situational-structure"),
);

const duplicateIds = structuredClone(ISFJ_REPORT_RULES);
duplicateIds[1].id = duplicateIds[0].id;
assert.ok(
  validateIsfjRuleSet(duplicateIds).errors.some(
    (error) => error.includes("Duplicate rule id"),
  ),
);

const missingSlot = structuredClone(ISFJ_REPORT_RULES);
missingSlot[0].content[0].targetSlotId = "missing-slot";
assert.ok(
  validateIsfjRuleSet(missingSlot).errors.some(
    (error) => error.includes("does not exist"),
  ),
);

const invalidConfidence = structuredClone(ISFJ_REPORT_RULES);
const dimensionCondition = invalidConfidence[0].conditions.find(
  (condition) => condition.kind === "dimension",
);
assert.ok(dimensionCondition?.kind === "dimension");
dimensionCondition.minConfidence = 101;
assert.ok(
  validateIsfjRuleSet(invalidConfidence).errors.some(
    (error) => error.includes("confidence bounds"),
  ),
);
