import type {
  BirthDataInput,
} from "../birth-contract";

import type {
  AstrologyResultContract,
} from "../result-contract";

import type {
  ZodiacValidationIssue,
} from "../validation";

import {
  validateBirthDataInput,
} from "../validation";

import {
  calculateCorePlanetPositions,
} from "./astronomy-engine-adapter";

import {
  calculateAscendant,
} from "./ascendant";

import {
  convertLocalBirthTimeToUtc,
} from "./timezone";

const RESULT_SCHEMA_VERSION = "1.0.0" as const;

const ENGINE_METADATA = Object.freeze({
  name: "Astronomy Engine",
  version: "2.1.19",
  ephemeris:
    "Astronomy Engine built-in geocentric ephemeris",
});

export interface BirthChartCalculationOptions {
  /**
   * Allows deterministic testing.
   *
   * Production callers normally omit this value.
   */
  calculatedAt?: Date;
}

export class BirthChartCalculationError extends Error {
  readonly issues: readonly ZodiacValidationIssue[];

  constructor(
    issues: readonly ZodiacValidationIssue[],
  ) {
    super(
      issues
        .map(
          (issue) =>
            `${issue.path}: ${issue.message}`,
        )
        .join("; "),
    );

    this.name =
      "BirthChartCalculationError";

    this.issues =
      Object.freeze(
        issues.map(
          (issue) =>
            Object.freeze({
              ...issue,
            }),
        ),
      );
  }
}

function appendIssueUnlessPathExists(
  issues: ZodiacValidationIssue[],
  issue: ZodiacValidationIssue,
): void {
  if (
    issues.some(
      (existingIssue) =>
        existingIssue.path === issue.path,
    )
  ) {
    return;
  }

  issues.push(issue);
}

function validateCompleteChartInput(
  input: BirthDataInput,
): readonly ZodiacValidationIssue[] {
  const validation =
    validateBirthDataInput(input);

  const issues: ZodiacValidationIssue[] = [
    ...validation.issues,
  ];

  if (!input.time) {
    appendIssueUnlessPathExists(
      issues,
      {
        path: "time",
        message:
          "A birth time is required to calculate a complete natal chart.",
      },
    );
  }

  if (
    input.time?.precision ===
    "unknown"
  ) {
    appendIssueUnlessPathExists(
      issues,
      {
        path: "time.precision",
        message:
          "An unknown birth time cannot produce an exact UTC instant.",
      },
    );
  }

  if (!input.location) {
    appendIssueUnlessPathExists(
      issues,
      {
        path: "location",
        message:
          "A birth location is required to calculate a complete natal chart.",
      },
    );
  }

  if (!input.timeZone) {
    appendIssueUnlessPathExists(
      issues,
      {
        path: "timeZone",
        message:
          "An IANA time zone is required to calculate a complete natal chart.",
      },
    );
  }

  return issues;
}

function validateCalculatedAt(
  calculatedAt: Date,
): void {
  if (
    !(calculatedAt instanceof Date) ||
    Number.isNaN(
      calculatedAt.getTime(),
    )
  ) {
    throw new TypeError(
      "calculatedAt must be a valid Date.",
    );
  }
}

function createLimitations(
  input: BirthDataInput,
): readonly string[] {
  const limitations: string[] = [];

  if (
    input.time?.precision ===
    "approximate"
  ) {
    limitations.push(
      "The supplied birth time is approximate; the ascendant and fast-moving chart positions may be less precise.",
    );
  }

  return Object.freeze(
    limitations,
  );
}

export function calculateBirthChart(
  input: BirthDataInput,
  options: BirthChartCalculationOptions = {},
): AstrologyResultContract {
  const issues =
    validateCompleteChartInput(
      input,
    );

  if (issues.length > 0) {
    throw new BirthChartCalculationError(
      issues,
    );
  }

  /*
   * The validation above guarantees these values exist.
   * These local aliases preserve strict TypeScript narrowing.
   */
  const time = input.time;
  const location = input.location;
  const timeZone = input.timeZone;

  if (
    !time ||
    !location ||
    !timeZone
  ) {
    throw new Error(
      "Validated chart input unexpectedly contained incomplete birth data.",
    );
  }

  const calculatedAt =
    options.calculatedAt ??
    new Date();

  validateCalculatedAt(
    calculatedAt,
  );

  const conversion =
    convertLocalBirthTimeToUtc(
      input.date,
      time,
      timeZone,
    );

  const planets =
    calculateCorePlanetPositions(
      conversion.utcDate,
    );

  const ascendant =
    calculateAscendant(
      conversion.utcDate,
      location.latitude,
      location.longitude,
    );

  return Object.freeze({
    schemaVersion:
      RESULT_SCHEMA_VERSION,

    module: "zodiac",
    calculationType:
      "natal-chart",

    calculatedAt:
      calculatedAt.toISOString(),

    input: Object.freeze({
      localDateTime:
        conversion.localDateTime,

      utcDateTime:
        conversion.utcDateTime,

      timeZone:
        conversion.timeZone,

      latitude:
        location.latitude,

      longitude:
        location.longitude,

      timePrecision:
        time.precision,
    }),

    planets,
    ascendant,

    limitations:
      createLimitations(input),

    engine:
      ENGINE_METADATA,
  });
}
