import type {
  PartialAstrologyResultContract,
  ZodiacChartResult,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function acceptsChartResult(
  result: ZodiacChartResult,
): ZodiacChartResult {
  return result;
}

const partialShape:
  PartialAstrologyResultContract = {
    schemaVersion: "1.0.0",
    module: "zodiac",
    calculationType:
      "natal-chart-partial",
    calculatedAt:
      "2026-08-02T06:00:00.000Z",

    input: {
      localDateTime:
        "2026-07-30T12:00:00",
      utcDateTime:
        "2026-07-30T10:00:00.000Z",
      timeZone:
        "Africa/Johannesburg",
      latitude: -26.2041,
      longitude: 28.0473,
      timePrecision: "unknown",
    },

    planets: {} as
      PartialAstrologyResultContract[
        "planets"
      ],

    ascendant: null,
    angles: null,

    moonDailyRange: {
      startUtcDateTime:
        "2026-07-29T22:00:00.000Z",
      midpointUtcDateTime:
        "2026-07-30T10:00:00.000Z",
      endUtcDateTime:
        "2026-07-30T21:59:59.000Z",

      startPosition: {
        sign: "aquarius",
        absoluteLongitude: 310,
        degree: 10,
        minute: 0,
        second: 0,
      },

      midpointPosition: {
        sign: "aquarius",
        absoluteLongitude: 317,
        degree: 17,
        minute: 0,
        second: 0,
      },

      endPosition: {
        sign: "aquarius",
        absoluteLongitude: 323,
        degree: 23,
        minute: 0,
        second: 0,
      },

      angularTravelDegrees: 13,
      possibleSigns: [
        "aquarius",
      ],
    },

    limitations: [
      "Exact birth time was not supplied.",
      "Ascendant and chart angles are unavailable.",
    ],

    engine: {
      name: "Astronomy Engine",
      version: "2.1.19",
      ephemeris:
        "Astronomy Engine built-in geocentric ephemeris",
    },
  };

const accepted =
  acceptsChartResult(
    partialShape,
  );

assert(
  accepted.calculationType ===
    "natal-chart-partial",
  "Expected partial calculation type.",
);

assert(
  accepted.ascendant === null,
  "Partial chart must not contain an ascendant.",
);

assert(
  accepted.angles === null,
  "Partial chart must not contain chart angles.",
);

assert(
  accepted.input.timePrecision ===
    "unknown",
  "Partial chart must use unknown time precision.",
);

assert(
  accepted.moonDailyRange
    .possibleSigns.length >= 1,
  "Moon daily range requires at least one possible sign.",
);

console.log(
  "Zodiac partial result contract validation passed.",
);
