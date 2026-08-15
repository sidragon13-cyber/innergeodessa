import type {
  FixedPersonalityReportPayload,
} from "./fixed-report-payload";

import type {
  SupportedLocale,
} from "../../shared";

const SCHEMA_VERSION =
  "FIXED-PERSONALITY-REPORT-V1";

const SECTION_IDS = [
  "data-summary",
  "core-personality-profile",
  "thinking-decision-structure",
  "personal-dimension-structure",
  "core-traits-environment-blind-spots",
  "career-learning-relationship-fit",
  "future-environment-development",
  "opportunity-capability-map",
  "personal-future-map",
  "report-interpretation",
  "conclusion",
  "disclaimer",
  "appendix",
] as const;

const DIMENSIONS = [
  "EI",
  "SN",
  "TF",
  "JP",
] as const;

const BANDS = new Set([
  "near-boundary",
  "moderate-preference",
  "clear-preference",
  "highly-clear",
]);

export type FixedPersonalityReportErrorCode =
  | "invalid-request"
  | "authentication-required"
  | "report-locked"
  | "resource-not-found"
  | "access-error"
  | "result-error"
  | "invalid-result"
  | "service-unavailable"
  | "unknown";

export interface FixedPersonalityReportDelivery {
  readonly sessionId:
    string;

  readonly locale:
    SupportedLocale;

  readonly generatedAt:
    string;

  readonly report:
    FixedPersonalityReportPayload;
}

export class FixedPersonalityReportRequestError
  extends Error {
  readonly status: number;
  readonly code:
    FixedPersonalityReportErrorCode;

  constructor(
    message: string,
    status: number,
    code:
      FixedPersonalityReportErrorCode =
        "unknown",
  ) {
    super(message);

    this.name =
      "FixedPersonalityReportRequestError";

    this.status = status;
    this.code = code;
  }
}

export async function fetchFixedPersonalityReport(
  sessionId: string,
  locale: SupportedLocale,
): Promise<FixedPersonalityReportDelivery> {
  const response =
    await fetch(
      `/api/account/personality-report/${encodeURIComponent(
        sessionId,
      )}?locale=${encodeURIComponent(locale)}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

  const data: unknown =
    await readJson(response);

  if (!response.ok) {
    throw new FixedPersonalityReportRequestError(
      getErrorMessage(data),
      response.status,
      getErrorCode(data),
    );
  }

  if (
    !isFixedPersonalityReportDelivery(
      data,
    ) ||
    data.sessionId !==
      sessionId
  ) {
    throw new FixedPersonalityReportRequestError(
      "The report service returned an invalid response.",
      502,
      "invalid-result",
    );
  }

  return data;
}

export function isFixedPersonalityReportDelivery(
  value: unknown,
): value is FixedPersonalityReportDelivery {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNonEmptyString(
      value.sessionId,
    ) &&
    (
      value.locale === "en" ||
      value.locale === "zh"
    ) &&
    isNonEmptyString(
      value.generatedAt,
    ) &&
    isFixedPersonalityReportPayload(
      value.report,
    )
  );
}

export function isFixedPersonalityReportPayload(
  value: unknown,
): value is FixedPersonalityReportPayload {
  if (!isRecord(value)) {
    return false;
  }

  if (
    value.schemaVersion !==
      SCHEMA_VERSION ||
    !isPersonalityType(
      value.personalityType,
    ) ||
    !isProfile(
      value.profile,
    ) ||
    !isSha256(
      value.sourceSha256,
    ) ||
    !isPreferenceBands(
      value.preferenceBands,
      value.personalityType,
    ) ||
    !isRichBlockArray(
      value.frontMatter,
      true,
    ) ||
    !isCanonicalSections(
      value.sections,
    )
  ) {
    return false;
  }

  return true;
}

async function readJson(
  response: Response,
): Promise<unknown> {
  const text =
    await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(
      text,
    ) as unknown;
  } catch {
    return null;
  }
}

function getErrorCode(
  value: unknown,
): FixedPersonalityReportErrorCode {
  if (
    isRecord(value) &&
    typeof value.code === "string"
  ) {
    switch (value.code) {
      case "invalid-request":
      case "authentication-required":
      case "report-locked":
      case "resource-not-found":
      case "access-error":
      case "result-error":
      case "invalid-result":
      case "service-unavailable":
        return value.code;
    }
  }

  return "unknown";
}

function getErrorMessage(
  value: unknown,
): string {
  if (
    isRecord(value) &&
    typeof value.detail ===
      "string" &&
    value.detail.trim()
  ) {
    return value.detail.trim();
  }

  return "Unable to load the complete personality report.";
}

function isCanonicalSections(
  value: unknown,
): boolean {
  if (
    !Array.isArray(value) ||
    value.length !==
      SECTION_IDS.length
  ) {
    return false;
  }

  return value.every(
    (
      section,
      index,
    ) => {
      if (!isRecord(section)) {
        return false;
      }

      const expectedId =
        SECTION_IDS[index];

      return (
        section.id ===
          expectedId &&
        section.order ===
          index + 1 &&
        typeof section.sourceTitle ===
          "string" &&
        section.sourceTitle.trim()
          .length > 0 &&
        isRichBlockArray(
          section.blocks,
          true,
        )
      );
    },
  );
}

function isPreferenceBands(
  value: unknown,
  personalityType: string,
): boolean {
  if (!isRecord(value)) {
    return false;
  }

  for (
    let index = 0;
    index < DIMENSIONS.length;
    index += 1
  ) {
    const dimension =
      DIMENSIONS[index];

    const band =
      value[dimension];

    if (!isRecord(band)) {
      return false;
    }

    const direction =
      personalityType[index];

    if (
      band.direction !==
        direction ||
      !isFiniteNumber(
        band.clarity,
      ) ||
      band.clarity < 0 ||
      band.clarity > 100 ||
      typeof band.band !==
        "string" ||
      !BANDS.has(
        band.band,
      ) ||
      typeof band.bandLabelZh !==
        "string" ||
      !band.bandLabelZh.trim()
    ) {
      return false;
    }
  }

  return true;
}

function isRichBlockArray(
  value: unknown,
  requireNonEmpty: boolean,
): boolean {
  if (!Array.isArray(value)) {
    return false;
  }

  if (
    requireNonEmpty &&
    value.length === 0
  ) {
    return false;
  }

  return value.every(
    isRichBlock,
  );
}

function isRichBlock(
  value: unknown,
): boolean {
  if (!isRecord(value)) {
    return false;
  }

  switch (value.type) {
    case "paragraph":
      return isNonEmptyString(
        value.text,
      );

    case "heading":
      return (
        (
          value.level === 1 ||
          value.level === 2 ||
          value.level === 3
        ) &&
        isNonEmptyString(
          value.text,
        )
      );

    case "unordered-list":
    case "ordered-list":
      return (
        Array.isArray(
          value.items,
        ) &&
        value.items.length > 0 &&
        value.items.every(
          isNonEmptyString,
        )
      );

    case "blockquote":
      return isNonEmptyString(
        value.text,
      );

    case "table":
      return isTableBlock(
        value,
      );

    case "divider":
      return true;

    default:
      return false;
  }
}

function isTableBlock(
  value: Record<
    string,
    unknown
  >,
): boolean {
  const header =
    value.header;

  const alignments =
    value.alignments;

  const rows =
    value.rows;

  if (
    !Array.isArray(
      header,
    ) ||
    header.length === 0 ||
    !header.every(
      (cell) =>
        typeof cell ===
        "string",
    ) ||
    !Array.isArray(
      alignments,
    ) ||
    alignments.length !==
      header.length ||
    !alignments.every(
      (alignment) =>
        alignment === null ||
        alignment === "left" ||
        alignment === "center" ||
        alignment === "right",
    ) ||
    !Array.isArray(
      rows,
    )
  ) {
    return false;
  }

  return rows.every(
    (row) =>
      Array.isArray(row) &&
      row.length ===
        header.length &&
      row.every(
        (cell) =>
          typeof cell ===
          "string",
      ),
  );
}

function isPersonalityType(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    /^[EI][SN][TF][JP]$/.test(
      value,
    )
  );
}

function isProfile(
  value: unknown,
): boolean {
  return (
    value === "A" ||
    value === "B" ||
    value === "C" ||
    value === "D"
  );
}

function isSha256(
  value: unknown,
): boolean {
  return (
    typeof value === "string" &&
    /^[a-f0-9]{64}$/i.test(
      value,
    )
  );
}

function isRecord(
  value: unknown,
): value is Record<
  string,
  unknown
> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

function isNonEmptyString(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function isFiniteNumber(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value)
  );
}
