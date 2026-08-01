import {
  BirthChartCalculationError,
  calculateBirthChart,
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

function expectCalculationError(
  callback: () => unknown,
  expectedPath: string,
): void {
  try {
    callback();
  } catch (error) {
    assert(
      error instanceof
        BirthChartCalculationError,
      "Expected BirthChartCalculationError.",
    );

    assert(
      error.issues.some(
        (issue) =>
          issue.path === expectedPath,
      ),
      `Expected a validation issue at ${expectedPath}.`,
    );

    return;
  }

  throw new Error(
    "Expected chart calculation to fail.",
  );
}

const exactInput: BirthDataInput = {
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

const fixedCalculatedAt =
  new Date(
    "2026-07-31T12:00:00.000Z",
  );

const result =
  calculateBirthChart(
    exactInput,
    {
      calculatedAt:
        fixedCalculatedAt,
    },
  );

assert(
  result.schemaVersion ===
    "1.0.0",
  "Unexpected result schema version.",
);

assert(
  result.module === "zodiac",
  "Expected zodiac module.",
);

assert(
  result.calculationType ===
    "natal-chart",
  "Expected natal-chart calculation type.",
);

assert(
  result.calculatedAt ===
    fixedCalculatedAt.toISOString(),
  "Expected deterministic calculatedAt value.",
);

assert(
  result.input.localDateTime ===
    "2026-07-30T14:00:00",
  "Unexpected normalized local date-time.",
);

assert(
  result.input.utcDateTime ===
    "2026-07-30T12:00:00.000Z",
  "Unexpected UTC date-time.",
);

assert(
  result.input.timeZone ===
    "Africa/Johannesburg",
  "Unexpected result time zone.",
);

assert(
  result.input.latitude ===
    -26.2041,
  "Unexpected latitude.",
);

assert(
  result.input.longitude ===
    28.0473,
  "Unexpected longitude.",
);

assert(
  result.input.timePrecision ===
    "exact",
  "Unexpected time precision.",
);

assert(
  result.planets.sun.zodiac.sign ===
    "leo",
  "Expected Sun in Leo.",
);

assert(
  result.planets.moon.zodiac.sign ===
    "aquarius",
  "Expected Moon in Aquarius.",
);

assert(
  result.planets.mercury.zodiac.sign ===
    "cancer",
  "Expected Mercury in Cancer.",
);

assert(
  result.planets.venus.zodiac.sign ===
    "virgo",
  "Expected Venus in Virgo.",
);

assert(
  result.planets.mars.zodiac.sign ===
    "gemini",
  "Expected Mars in Gemini.",
);

assert(
  result.ascendant !== null,
  "Expected an ascendant.",
);

assert(
  result.ascendant.zodiac.sign ===
    "sagittarius",
  "Expected Sagittarius ascendant.",
);

assert(
  result.ascendant.zodiac.degree ===
    19,
  "Expected ascendant at 19° Sagittarius.",
);

assert(
  result.angles.ascendant ===
    result.ascendant,
  "Legacy ascendant must reference angles.ascendant.",
);

assert(
  result.angles.descendant.zodiac.sign ===
    "gemini",
  "Expected Gemini descendant.",
);

assert(
  result.angles.midheaven.zodiac.sign ===
    "virgo",
  "Expected Virgo Midheaven.",
);

assert(
  result.angles.midheaven.zodiac.degree ===
    4,
  "Expected Midheaven at 4° Virgo.",
);

assert(
  result.angles.imumCoeli.zodiac.sign ===
    "pisces",
  "Expected Pisces Imum Coeli.",
);

assert(
  result.angles.imumCoeli.zodiac.degree ===
    4,
  "Expected Imum Coeli at 4° Pisces.",
);

assert(
  result.limitations.length ===
    0,
  "Exact input should have no limitations.",
);

assert(
  result.engine.name ===
    "Astronomy Engine",
  "Unexpected astronomy engine name.",
);

assert(
  result.engine.version ===
    "2.1.19",
  "Unexpected astronomy engine version.",
);

expectCalculationError(
  () =>
    calculateBirthChart({
      ...exactInput,
      time: null,
    }),
  "time",
);

expectCalculationError(
  () =>
    calculateBirthChart({
      ...exactInput,
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        precision: "unknown",
      },
    }),
  "time.precision",
);

expectCalculationError(
  () =>
    calculateBirthChart({
      ...exactInput,
      location: null,
    }),
  "location",
);

expectCalculationError(
  () =>
    calculateBirthChart({
      ...exactInput,
      timeZone: null,
    }),
  "timeZone",
);

const approximateResult =
  calculateBirthChart(
    {
      ...exactInput,
      time: {
        ...exactInput.time!,
        precision: "approximate",
      },
    },
    {
      calculatedAt:
        fixedCalculatedAt,
    },
  );

assert(
  approximateResult.limitations
    .length === 1,
  "Approximate time should produce one limitation.",
);

assert(
  approximateResult.limitations[0]
    .includes("approximate"),
  "Expected approximate-time limitation.",
);

try {
  calculateBirthChart(
    exactInput,
    {
      calculatedAt:
        new Date(
          Number.NaN,
        ),
    },
  );

  throw new Error(
    "Expected invalid calculatedAt to fail.",
  );
} catch (error) {
  assert(
    error instanceof TypeError,
    "Expected TypeError for invalid calculatedAt.",
  );
}

console.log(
  "Zodiac chart calculator validation passed.",
);

console.log({
  localDateTime:
    result.input.localDateTime,

  utcDateTime:
    result.input.utcDateTime,

  sun:
    result.planets.sun.zodiac,

  moon:
    result.planets.moon.zodiac,

  ascendant:
    result.ascendant.zodiac,

  engine:
    result.engine,
});
