import {
  calculateBirthChart,
  getZodiacChartStorageKey,
  isAstrologyResultContract,
} from "../src/data/zodiac";

import type {
  BirthDataInput,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const input: BirthDataInput = {
  date: {
    year: 2026,
    month: 7,
    day: 30,
  },
  time: {
    hour: 14,
    minute: 0,
    second: 0,
    precision: "exact",
  },
  location: {
    displayName:
      "Johannesburg, South Africa",
    city: "Johannesburg",
    region: "Gauteng",
    countryCode: "ZA",
    latitude: -26.2041,
    longitude: 28.0473,
  },
  timeZone:
    "Africa/Johannesburg",
  locale: "en",
};

const chart =
  calculateBirthChart(
    input,
    {
      calculatedAt:
        new Date(
          "2026-08-01T10:00:00.000Z",
        ),
    },
  );

assert(
  getZodiacChartStorageKey(
    "chart-123",
  ) ===
    "innergeodessa-zodiac-result-chart-123",
  "Unexpected Zodiac storage key.",
);

assert(
  isAstrologyResultContract(
    chart,
  ),
  "Valid chart must satisfy the result contract.",
);

assert(
  !isAstrologyResultContract(
    null,
  ),
  "Null must not satisfy the result contract.",
);

assert(
  !isAstrologyResultContract(
    {},
  ),
  "Empty object must not satisfy the result contract.",
);

assert(
  !isAstrologyResultContract({
    ...chart,
    module: "career",
  }),
  "Wrong module must be rejected.",
);

assert(
  !isAstrologyResultContract({
    ...chart,
    planets: {
      ...chart.planets,
      sun: null,
    },
  }),
  "Missing planet position must be rejected.",
);

assert(
  !isAstrologyResultContract({
    ...chart,
    angles: {
      ...chart.angles,
      midheaven: {
        point: "ascendant",
        zodiac:
          chart.angles
            .midheaven.zodiac,
      },
    },
  }),
  "Wrong angle point must be rejected.",
);

assert(
  !isAstrologyResultContract({
    ...chart,
    engine: {
      ...chart.engine,
      version: null,
    },
  }),
  "Invalid engine metadata must be rejected.",
);

console.log(
  "Zodiac storage and result validation passed.",
);
