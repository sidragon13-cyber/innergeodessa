import {
  zodiacSigns,
  type ZodiacSign,
} from "../types";

import type {
  ZodiacBenchmarkPointCode,
} from "./benchmark-cases";

export type ZodiacBenchmarkEvidenceSource =
  | "astro-seek"
  | "swiss-ephemeris"
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
  displayPrecision: "minute" | "second";
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

function evidencePosition(
  sign: ZodiacSign,
  degree: number,
  minute: number,
  second: number,
  toleranceDegrees: number,
): ZodiacBenchmarkEvidencePosition {
  return {
    sign,
    degree,
    minute,
    second,
    absoluteLongitude: zodiacPositionToAbsoluteLongitude(
      sign,
      degree,
      minute,
      second,
    ),
    toleranceDegrees,
  };
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
  readonly ZodiacBenchmarkEvidenceRecord[] = [
    {
      caseId: "johannesburg-standard-time",
      source: "astro-seek",
      checkedAt: "2026-08-01T12:00:00.000Z",
      sourceLabel: "Astro-Seek Free Birth Chart Calculator",
      displayPrecision: "minute",
      evidenceNote:
        "Astro-Seek displayed positions to whole arcminutes only. Seconds were unavailable, so second is recorded as 0 solely for longitude conversion; the validator applies the minute-display quantization allowance.",
      settings: {
        zodiacType: "Tropical",
        coordinateMode: "Geocentric",
        houseSystem: "Placidus",
        daylightSavingApplied: false,
        displayedLocation:
          "Johannesburg, South Africa (26°12′S, 28°03′E)",
        displayedUtcOffset: "UTC+02:00 / SAST",
      },
      utcDateTime: "2026-07-30T12:00:00.000Z",
      offsetMinutes: 120,
      positions: {
        sun: evidencePosition("leo", 7, 21, 0, 0.05),
        moon: evidencePosition("aquarius", 17, 26, 0, 0.1),
        mercury: evidencePosition("cancer", 18, 25, 0, 0.05),
        venus: evidencePosition("virgo", 22, 29, 0, 0.05),
        mars: evidencePosition("gemini", 22, 3, 0, 0.05),
        ascendant: evidencePosition(
          "sagittarius",
          19,
          11,
          0,
          0.15,
        ),
        midheaven: evidencePosition("virgo", 4, 19, 0, 0.15),
      },
    },
    {
      caseId: "johannesburg-standard-time",
      source: "swiss-ephemeris",
      checkedAt: "2026-08-01T13:04:11.000Z",
      sourceLabel: "Astrodienst Swiss Ephemeris swetest",
      displayPrecision: "second",
      evidenceNote:
        "Astrodienst official online swetest 2.10.03, using compressed Swiss Ephemeris DE441 (-eswe), tropical geocentric positions from explicit UTC input; Placidus was used only for ASC and MC. The complete command and raw output are recorded in docs/audits/evidence/zodiac-johannesburg-swiss-ephemeris-command.txt.",
      settings: {
        zodiacType: "Tropical",
        coordinateMode: "Geocentric",
        houseSystem: "Placidus",
        daylightSavingApplied: false,
        displayedLocation:
          "Longitude 28.047300°E, latitude 26.204100°S",
        displayedUtcOffset: "UTC+02:00 / 120 minutes",
      },
      utcDateTime: "2026-07-30T12:00:00.000Z",
      offsetMinutes: 120,
      positions: {
        sun: evidencePosition("leo", 7, 21, 18, 0.05),
        moon: evidencePosition("aquarius", 17, 26, 53, 0.1),
        mercury: evidencePosition("cancer", 18, 25, 46, 0.05),
        venus: evidencePosition("virgo", 22, 29, 50, 0.05),
        mars: evidencePosition("gemini", 22, 3, 13, 0.05),
        ascendant: evidencePosition(
          "sagittarius",
          19,
          11,
          38,
          0.15,
        ),
        midheaven: evidencePosition("virgo", 4, 18, 57, 0.15),
      },
    },
    {
      caseId: "london-summer-time",
      source: "astro-seek",
      checkedAt: "2026-08-01T13:26:49.000Z",
      sourceLabel: "Astro-Seek Free Birth Chart Calculator",
      displayPrecision: "minute",
      evidenceNote:
        "Astro-Seek displayed the London chart to whole arcminutes only. Seconds were unavailable, so second is recorded as 0 solely for longitude conversion; the validator applies the minute-display quantization allowance.",
      settings: {
        zodiacType: "Tropical",
        coordinateMode: "Geocentric",
        houseSystem: "Placidus",
        daylightSavingApplied: true,
        displayedLocation:
          "London, United Kingdom (51°30′N, 0°08′W)",
        displayedUtcOffset:
          "GMT+00:00 with DST observed / UTC+01:00 BST",
      },
      utcDateTime: "2000-07-01T17:45:00.000Z",
      offsetMinutes: 60,
      positions: {
        sun: evidencePosition("cancer", 10, 10, 0, 0.05),
        moon: evidencePosition("cancer", 9, 14, 0, 0.1),
        mercury: evidencePosition("cancer", 17, 31, 0, 0.05),
        venus: evidencePosition("cancer", 15, 44, 0, 0.05),
        mars: evidencePosition("cancer", 10, 8, 0, 0.05),
        ascendant: evidencePosition(
          "sagittarius",
          8,
          1,
          0,
          0.15,
        ),
        midheaven: evidencePosition("libra", 6, 44, 0, 0.15),
      },
    },
    {
      caseId: "london-summer-time",
      source: "swiss-ephemeris",
      checkedAt: "2026-08-01T13:26:49.000Z",
      sourceLabel: "Astrodienst Swiss Ephemeris swetest",
      displayPrecision: "second",
      evidenceNote:
        "Astrodienst official online swetest 2.10.03, using compressed Swiss Ephemeris DE441 (-eswe), tropical geocentric positions from explicit UTC input; Placidus was used only for ASC and MC. The complete London command and raw output are recorded in docs/audits/evidence/zodiac-london-swiss-ephemeris-command.txt.",
      settings: {
        zodiacType: "Tropical",
        coordinateMode: "Geocentric",
        houseSystem: "Placidus",
        daylightSavingApplied: true,
        displayedLocation:
          "Longitude 0.127800°W, latitude 51.507400°N",
        displayedUtcOffset: "UTC+01:00 / 60 minutes BST",
      },
      utcDateTime: "2000-07-01T17:45:00.000Z",
      offsetMinutes: 60,
      positions: {
        sun: evidencePosition("cancer", 10, 10, 21, 0.05),
        moon: evidencePosition("cancer", 9, 14, 1, 0.1),
        mercury: evidencePosition("cancer", 17, 31, 12, 0.05),
        venus: evidencePosition("cancer", 15, 44, 42, 0.05),
        mars: evidencePosition("cancer", 10, 8, 57, 0.05),
        ascendant: evidencePosition(
          "sagittarius",
          8,
          1,
          52,
          0.15,
        ),
        midheaven: evidencePosition("libra", 6, 45, 24, 0.15),
      },
    },
    {
      caseId: "new-york-summer-time",
      source: "astro-seek",
      checkedAt: "2026-08-01T13:40:10.000Z",
      sourceLabel: "Astro-Seek Free Birth Chart Calculator",
      displayPrecision: "minute",
      evidenceNote:
        "Astro-Seek displayed the New York chart to whole arcminutes only. Seconds were unavailable, so second is recorded as 0 solely for longitude conversion; the validator applies the minute-display quantization allowance.",
      settings: {
        zodiacType: "Tropical",
        coordinateMode: "Geocentric",
        houseSystem: "Placidus",
        daylightSavingApplied: true,
        displayedLocation:
          "New York, United States (40°43′N, 74°00′W)",
        displayedUtcOffset:
          "GMT-05:00 with DST observed / UTC-04:00 EDT",
      },
      utcDateTime: "1985-08-21T03:50:00.000Z",
      offsetMinutes: -240,
      positions: {
        sun: evidencePosition("leo", 28, 2, 0, 0.05),
        moon: evidencePosition("scorpio", 1, 10, 0, 0.1),
        mercury: evidencePosition("leo", 13, 13, 0, 0.05),
        venus: evidencePosition("cancer", 21, 45, 0, 0.05),
        mars: evidencePosition("leo", 17, 20, 0, 0.05),
        ascendant: evidencePosition("gemini", 4, 10, 0, 0.15),
        midheaven: evidencePosition(
          "aquarius",
          10,
          27,
          0,
          0.15,
        ),
      },
    },
    {
      caseId: "new-york-summer-time",
      source: "swiss-ephemeris",
      checkedAt: "2026-08-01T13:40:10.000Z",
      sourceLabel: "Astrodienst Swiss Ephemeris swetest",
      displayPrecision: "second",
      evidenceNote:
        "Astrodienst official online swetest 2.10.03, using compressed Swiss Ephemeris DE441 (-eswe), tropical geocentric positions from explicit UTC input; Placidus was used only for ASC and MC. The complete New York command and raw output are recorded in docs/audits/evidence/zodiac-new-york-swiss-ephemeris-command.txt.",
      settings: {
        zodiacType: "Tropical",
        coordinateMode: "Geocentric",
        houseSystem: "Placidus",
        daylightSavingApplied: true,
        displayedLocation:
          "Longitude 74.006000°W, latitude 40.712800°N",
        displayedUtcOffset: "UTC-04:00 / -240 minutes EDT",
      },
      utcDateTime: "1985-08-21T03:50:00.000Z",
      offsetMinutes: -240,
      positions: {
        sun: evidencePosition("leo", 28, 2, 32, 0.05),
        moon: evidencePosition("scorpio", 1, 10, 51, 0.1),
        mercury: evidencePosition("leo", 13, 13, 0, 0.05),
        venus: evidencePosition("cancer", 21, 45, 12, 0.05),
        mars: evidencePosition("leo", 17, 20, 8, 0.05),
        ascendant: evidencePosition("gemini", 4, 10, 12, 0.15),
        midheaven: evidencePosition(
          "aquarius",
          10,
          27,
          42,
          0.15,
        ),
      },
    },
  ];
