import {
  zodiacSigns,
  type ZodiacSign,
} from "../types";

import type {
  ZodiacBenchmarkPointCode,
} from "./benchmark-cases";

export type ZodiacBenchmarkEvidenceSource =
  | "astro-com"
  | "timepassages"
  | "cafe-astrology"
  | "manual-reference";

export interface ZodiacBenchmarkEvidencePosition {
  sign: ZodiacSign;
  degree: number;
  minute: number;
  second: number;
  absoluteLongitude: number;
  toleranceDegrees: number;
}

export interface ZodiacBenchmarkEvidenceRecord {
  caseId: string;
  source: ZodiacBenchmarkEvidenceSource;
  checkedAt: string;
  sourceLabel: string;
  evidenceNote: string;
  settings: {
    zodiacType: string;
    coordinateMode: string;
    houseSystem: string;
    daylightSavingApplied: boolean;
    displayedLocation: string;
    displayedUtcOffset: string;
  };
  utcDateTime: string;
  offsetMinutes: number;
  positions: Readonly<
    Record<
      ZodiacBenchmarkPointCode,
      ZodiacBenchmarkEvidencePosition
    >
  >;
}

function assertIntegerInRange(
  value: number,
  minimum: number,
  maximum: number,
  label: string,
): void {
  if (
    !Number.isInteger(value) ||
    value < minimum ||
    value > maximum
  ) {
    throw new RangeError(
      `${label} must be an integer from ${minimum} to ${maximum}.`,
    );
  }
}

export function zodiacPositionToAbsoluteLongitude(
  sign: ZodiacSign,
  degree: number,
  minute: number,
  second: number,
): number {
  const signIndex = zodiacSigns.indexOf(sign);

  if (signIndex < 0) {
    throw new RangeError(
      `Unsupported Zodiac sign: ${String(sign)}.`,
    );
  }

  assertIntegerInRange(degree, 0, 29, "degree");
  assertIntegerInRange(minute, 0, 59, "minute");
  assertIntegerInRange(second, 0, 59, "second");

  const absoluteLongitude =
    signIndex * 30 +
    degree +
    minute / 60 +
    second / 3600;

  if (!Number.isFinite(absoluteLongitude)) {
    throw new TypeError(
      "Absolute longitude must be finite.",
    );
  }

  return absoluteLongitude;
}

export const ZODIAC_BENCHMARK_EVIDENCE:
  readonly ZodiacBenchmarkEvidenceRecord[] = [];
