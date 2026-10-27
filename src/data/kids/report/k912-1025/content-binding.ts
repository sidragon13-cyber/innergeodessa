import source from "./generated-k912-1025-assets.json";

export const K912_1025_SLOT_IDS = [
  "P1_RESULT",
  "P1_SUMMARY",
  "P3_PROFILE",
  "P3_EVIDENCE",
  "P3_RELATION",
  "P4_INTEREST",
  "P5_ACTIVITY",
  "P6_PLAN",
  "P7_OBSERVATION",
] as const;

export type K912SlotId = typeof K912_1025_SLOT_IDS[number];

export type K912GapCode = "G00" | "G10" | "G20" | "G30";

export interface K912ContentSelection {
  readonly group: string;
  readonly gap: number;
  readonly gapCode: K912GapCode;
}

type VariableAsset = {
  readonly approval: string;
  readonly content: {
    readonly slots?: Record<string, unknown>;
    readonly P1_RESULT?: unknown;
  };
};

type FixedAsset = {
  readonly source: string;
  readonly sha256: string;
  readonly paragraphs: readonly string[];
};

const assets = source as {
  version: string;
  fixed70: Record<string, FixedAsset>;
  variable30: Record<string, VariableAsset>;
};

export class K912ContentBindingError extends Error {}

export const K912_1025_DOMAINS = [
  "think", "discover", "build",
  "create", "connect", "move",
] as const;

export type K912Domain =
  typeof K912_1025_DOMAINS[number];

export interface K912VerifiedResult {
  readonly scores: Readonly<Record<K912Domain, number>>;
  readonly ranking: readonly K912Domain[];
}

const domainLabels: Record<K912Domain, string> = {
  think: "思考",
  discover: "探索",
  build: "构建",
  create: "创造",
  connect: "联结",
  move: "行动",
};

export function resolveK912VerifiedTokens(
  result: K912VerifiedResult,
): Readonly<Record<string, string>> {
  const domains = K912_1025_DOMAINS;

  if (
    result.ranking.length !== domains.length ||
    new Set(result.ranking).size !== domains.length ||
    domains.some(d => !result.ranking.includes(d)) ||
    domains.some(d =>
      !Number.isInteger(result.scores[d]) ||
      result.scores[d] < 0 ||
      result.scores[d] > 100
    )
  ) {
    throw new K912ContentBindingError(
      "Invalid K912 verified result",
    );
  }

  for (let i = 1; i < result.ranking.length; i++) {
    if (
      result.scores[result.ranking[i - 1]] <
      result.scores[result.ranking[i]]
    ) {
      throw new K912ContentBindingError(
        "K912 ranking does not match scores",
      );
    }
  }

  const first = result.ranking[0];
  const second = result.ranking[1];
  const third = result.ranking[2];
  const thirdScore = result.scores[third];
  const secondScore = result.scores[second];

  // The third score level can contain multiple tied domains.
  // A tie with second place must not be described as
  // a separate, uniquely ranked third interest.
  const thirdLevel = result.ranking.filter(
    domain => result.scores[domain] === thirdScore,
  );

  const thirdLabel = thirdLevel
    .map(domain => domainLabels[domain])
    .join("、");

  const tokens: Record<string, string> = {
    top_gap: String(
      result.scores[first] - result.scores[second]
    ),
    third_label: thirdLabel,
    third_score: String(thirdScore),
  };

  // Existing G00 prose may describe a separate third level.
  // Reject it when second and third are tied.
// Tie eligibility is checked after the verified Top2 pair is known.

  for (const domain of domains) {
    tokens[`score.${domain}`] =
      String(result.scores[domain]);
  }

  return tokens;
}

export function interpolateK912ApprovedText(
  template: string,
  tokens: Readonly<Record<string, string>>,
): string {
  const output = template.replace(
    /\{\{([^{}]+)\}\}/g,
    (_match, rawKey: string) => {
      const key = rawKey.trim();

      if (!Object.prototype.hasOwnProperty.call(tokens, key)) {
        throw new K912ContentBindingError(
          `Unknown K912 content token: ${key}`,
        );
      }

      return tokens[key];
    },
  );

  if (/\{\{|\}\}/.test(output)) {
    throw new K912ContentBindingError(
      "Unresolved K912 content token",
    );
  }

  return output;
}

export function resolveK912GapCode(gap: number): K912GapCode {
  if (!Number.isInteger(gap) || gap < 0) {
    throw new K912ContentBindingError("Invalid K912 score gap");
  }
  if (gap <= 5) return "G00";
  if (gap <= 15) return "G10";
  if (gap <= 25) return "G20";
  return "G30";
}

export function bindK912Content1025(
  selection: K912ContentSelection,
) {
  const gapCode = resolveK912GapCode(selection.gap);

  if (selection.gapCode !== gapCode) {
    throw new K912ContentBindingError(
      "K912 gap selection mismatch",
    );
  }

  const fixed = assets.fixed70[selection.group];
  const variable =
    assets.variable30[`${selection.group}-${gapCode}`];

  if (!fixed || !variable) {
    throw new K912ContentBindingError(
      "Missing approved K912-1025 report asset",
    );
  }

  if (
    variable.approval !== "APPROVED" &&
    !(process.env.NODE_ENV === "development" && ["01", "02"].includes(selection.group))
  ) {
    throw new K912ContentBindingError(
      "K912-1025 content is not approved for runtime",
    );
  }

  const slots: Record<K912SlotId, unknown> =
    {} as Record<K912SlotId, unknown>;

  for (const id of K912_1025_SLOT_IDS) {
    const content =
      id === "P1_RESULT"
        ? (variable.content.P1_RESULT === undefined
            ? "runtime_verified_scores_only"
            : variable.content.P1_RESULT)
        : variable.content.slots?.[id];

    if (
      content === undefined ||
      (content === null && id !== "P3_EVIDENCE")
    ) {
      throw new K912ContentBindingError(
        `Missing K912-1025 slot: ${id}`,
      );
    }

    slots[id] =
      id === "P3_EVIDENCE" && content === "" ? null : content;
  }

  return {
    version: "K912-1025" as const,
    selection,
    fixed70: fixed.paragraphs,
    slots,
    source: fixed.source,
    sha256: fixed.sha256,
  };
}


/**
 * K912-1025 / TASK 1M
 *
 * Uses already verified report facts.
 * Does not calculate questionnaire scores.
 * Does not authorize or approve content assets.
 */
export function renderK912VerifiedSlots1025(
  slots: Readonly<Record<string, unknown>>,
  result: K912VerifiedResult,
  selection: {
    readonly gapCode: "G00" | "G10" | "G20" | "G30";
  },
  expectedPair: readonly [K912Domain, K912Domain],
): Readonly<Record<string, string | null>> {
  const tokens = resolveK912VerifiedTokens(result);

  const first = result.ranking[0];
  const second = result.ranking[1];
  const actualPair = [first, second];

  if (
    new Set(expectedPair).size !== 2 ||
    !expectedPair.every(
      domain => actualPair.includes(domain),
    )
  ) {
    throw new K912ContentBindingError(
      "K912 group does not match verified Top2",
    );
  }

  // Only Group01's separately reviewed prose may use a second-place tie.

  const third = result.ranking[2];

  if (

    result.scores[second] === result.scores[third] &&

    (

      result.scores[first] === result.scores[second] ||

      !expectedPair.includes("think") ||

      !expectedPair.includes("discover")

    )

  ) {

    throw new K912ContentBindingError(

      "K912 second/third tie requires separately approved prose",

    );

  }


  const gap = result.scores[first] - result.scores[second];

  const actualGapCode =
    gap <= 5 ? "G00" :
    gap <= 15 ? "G10" :
    gap <= 25 ? "G20" : "G30";

  if (selection.gapCode !== actualGapCode) {
    throw new K912ContentBindingError(
      "K912 gap tier does not match verified scores",
    );
  }

  const requiredSlots = [
    "P1_RESULT",
    "P1_SUMMARY",
    "P3_PROFILE",
    "P3_EVIDENCE",
    "P3_RELATION",
    "P4_INTEREST",
    "P5_ACTIVITY",
    "P6_PLAN",
    "P7_OBSERVATION",
  ] as const;

  const output: Record<string, string | null> = {};

  for (const slot of requiredSlots) {
    const value = slots[slot];

    if (slot === "P3_EVIDENCE" && value == null) {
      output[slot] = null;
      continue;
    }

    if (typeof value !== "string" || !value.trim()) {
      throw new K912ContentBindingError(
        `Invalid K912 slot: ${slot}`,
      );
    }

    if (slot === "P1_RESULT") {
      if (value !== "runtime_verified_scores_only") {
        throw new K912ContentBindingError(
          "P1_RESULT must use verified runtime scores",
        );
      }
      output[slot] = null;
      continue;
    }

    output[slot] = interpolateK912ApprovedText(
      value,
      tokens,
    );
  }

  return output;
}
