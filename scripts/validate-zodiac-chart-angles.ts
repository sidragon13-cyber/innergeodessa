import {
  calculateChartAngles,
  convertLocalBirthTimeToUtc,
  normalizeLongitude,
} from "../src/data/zodiac";

import {
  Observer,
  Rotation_ECL_HOR,
} from "astronomy-engine";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function angularDistance(
  first: number,
  second: number,
): number {
  return Math.abs(
    (
      (
        second -
        first +
        540
      ) %
        360
    ) -
      180,
  );
}

const MINUTE_QUANTIZATION_DEGREES =
  1 / 120;

const CHART_ANGLE_TOLERANCE_DEGREES =
  0.15;

function assertAngleInvariants(
  label: string,
  utcDate: Date,
  latitude: number,
  longitude: number,
): void {
  const first = calculateChartAngles(
    utcDate,
    latitude,
    longitude,
  );

  const repeated = calculateChartAngles(
    utcDate,
    latitude,
    longitude,
  );

  const later = calculateChartAngles(
    new Date(
      utcDate.getTime() +
        5 * 60 * 1000,
    ),
    latitude,
    longitude,
  );

  for (const point of [
    first.ascendant,
    first.midheaven,
  ]) {
    assert(
      Number.isFinite(
        point.zodiac.absoluteLongitude,
      ) &&
        point.zodiac.absoluteLongitude >= 0 &&
        point.zodiac.absoluteLongitude < 360,
      `${label} ${point.point} must be finite and normalized.`,
    );
  }

  assert(
    angularDistance(
      first.ascendant.zodiac.absoluteLongitude,
      first.descendant.zodiac.absoluteLongitude,
    ) === 180,
    `${label} ASC/DSC must be exactly opposite.`,
  );

  assert(
    angularDistance(
      first.midheaven.zodiac.absoluteLongitude,
      first.imumCoeli.zodiac.absoluteLongitude,
    ) === 180,
    `${label} MC/IC must be exactly opposite.`,
  );

  assert(
    first.ascendant.zodiac.absoluteLongitude ===
      repeated.ascendant.zodiac.absoluteLongitude &&
      first.midheaven.zodiac.absoluteLongitude ===
        repeated.midheaven.zodiac.absoluteLongitude,
    `${label} angle calculation must be deterministic.`,
  );

  for (const point of [
    "ascendant",
    "midheaven",
  ] as const) {
    const movement = angularDistance(
      first[point].zodiac.absoluteLongitude,
      later[point].zodiac.absoluteLongitude,
    );

    assert(
      movement > 0 && movement < 5,
      `${label} ${point} must vary continuously over five minutes; moved ${movement}°.`,
    );
  }
}

function legacyFrameIntersections(
  utcDate: Date,
  latitude: number,
  longitude: number,
): {
  ascendant: readonly [number, number];
  midheaven: readonly [number, number];
} {
  const rotation = Rotation_ECL_HOR(
    utcDate,
    new Observer(
      latitude,
      longitude,
      0,
    ),
  );

  const solve = (
    planeAxis: 1 | 2,
  ): readonly [number, number] => {
    const first = normalizeLongitude(
      Math.atan2(
        -rotation.rot[0][planeAxis],
        rotation.rot[1][planeAxis],
      ) * 180 / Math.PI,
    );

    return [
      first,
      normalizeLongitude(first + 180),
    ];
  };

  return {
    ascendant: solve(2),
    midheaven: solve(1),
  };
}

function nearestCorrection(
  fixed: number,
  legacyCandidates:
    readonly [number, number],
): number {
  return Math.min(
    ...legacyCandidates.map(
      (candidate) =>
        angularDistance(
          candidate,
          fixed,
        ),
    ),
  );
}

const conversion =
  convertLocalBirthTimeToUtc(
    {
      year: 2026,
      month: 7,
      day: 30,
    },
    {
      hour: 14,
      minute: 0,
      second: 0,
      precision: "exact",
    },
    "Africa/Johannesburg",
  );

const angles =
  calculateChartAngles(
    conversion.utcDate,
    -26.2041,
    28.0473,
  );

const astroSeekAscendant =
  240 + 19 + 11 / 60;

const astroSeekMidheaven =
  150 + 4 + 19 / 60;

const effectiveExternalThreshold =
  CHART_ANGLE_TOLERANCE_DEGREES +
  MINUTE_QUANTIZATION_DEGREES;

assert(
  angularDistance(
    angles.ascendant.zodiac.absoluteLongitude,
    astroSeekAscendant,
  ) <= effectiveExternalThreshold,
  "Johannesburg Ascendant must agree with the Astro-Seek minute display within the configured tolerance and quantization allowance.",
);

assert(
  angularDistance(
    angles.midheaven.zodiac.absoluteLongitude,
    astroSeekMidheaven,
  ) <= effectiveExternalThreshold,
  "Johannesburg Midheaven must agree with the Astro-Seek minute display within the configured tolerance and quantization allowance.",
);

assert(
  angles.ascendant.point ===
    "ascendant",
  "Expected ascendant point.",
);

assert(
  angles.descendant.point ===
    "descendant",
  "Expected descendant point.",
);

assert(
  angles.midheaven.point ===
    "midheaven",
  "Expected Midheaven point.",
);

assert(
  angles.imumCoeli.point ===
    "imum-coeli",
  "Expected Imum Coeli point.",
);

assert(
  angles.ascendant.zodiac.sign ===
    "sagittarius",
  `Expected Sagittarius ascendant, received ${angles.ascendant.zodiac.sign}.`,
);

assert(
  angles.ascendant.zodiac.degree ===
    19,
  "Expected ascendant at 19° Sagittarius.",
);

assert(
  angles.descendant.zodiac.sign ===
    "gemini",
  `Expected Gemini descendant, received ${angles.descendant.zodiac.sign}.`,
);

assert(
  angularDistance(
    angles.ascendant.zodiac
      .absoluteLongitude,
    angles.descendant.zodiac
      .absoluteLongitude,
  ) === 180,
  "Ascendant and Descendant must be exactly opposite.",
);

assert(
  angularDistance(
    angles.midheaven.zodiac
      .absoluteLongitude,
    angles.imumCoeli.zodiac
      .absoluteLongitude,
  ) === 180,
  "Midheaven and Imum Coeli must be exactly opposite.",
);

assert(
  angles.midheaven.zodiac.sign ===
    "virgo",
  `Expected Virgo Midheaven, received ${angles.midheaven.zodiac.sign}.`,
);

assert(
  angles.imumCoeli.zodiac.sign ===
    "pisces",
  `Expected Pisces Imum Coeli, received ${angles.imumCoeli.zodiac.sign}.`,
);

for (
  const [name, position]
  of Object.entries(angles)
) {
  assert(
    position.zodiac
      .absoluteLongitude >= 0 &&
      position.zodiac
        .absoluteLongitude < 360,
    `${name} longitude must be normalized.`,
  );

  assert(
    position.zodiac.degree >= 0 &&
      position.zodiac.degree < 30,
    `${name} degree must be between 0 and 29.`,
  );

  assert(
    position.zodiac.minute >= 0 &&
      position.zodiac.minute < 60,
    `${name} minute must be valid.`,
  );

  assert(
    position.zodiac.second >= 0 &&
      position.zodiac.second < 60,
    `${name} second must be valid.`,
  );
}

assert(
  normalizeLongitude(
    angles.ascendant.zodiac
      .absoluteLongitude +
      180,
  ) ===
    angles.descendant.zodiac
      .absoluteLongitude,
  "Descendant must derive deterministically from Ascendant.",
);

assert(
  normalizeLongitude(
    angles.midheaven.zodiac
      .absoluteLongitude +
      180,
  ) ===
    angles.imumCoeli.zodiac
      .absoluteLongitude,
  "Imum Coeli must derive deterministically from Midheaven.",
);

console.log(
  "Zodiac chart angles validation passed.",
);

console.table([
  {
    point: "ASC",
    sign:
      angles.ascendant.zodiac.sign,
    degree:
      angles.ascendant.zodiac.degree,
    minute:
      angles.ascendant.zodiac.minute,
    second:
      angles.ascendant.zodiac.second,
    longitude:
      angles.ascendant.zodiac
        .absoluteLongitude,
  },
  {
    point: "DSC",
    sign:
      angles.descendant.zodiac.sign,
    degree:
      angles.descendant.zodiac.degree,
    minute:
      angles.descendant.zodiac.minute,
    second:
      angles.descendant.zodiac.second,
    longitude:
      angles.descendant.zodiac
        .absoluteLongitude,
  },
  {
    point: "MC",
    sign:
      angles.midheaven.zodiac.sign,
    degree:
      angles.midheaven.zodiac.degree,
    minute:
      angles.midheaven.zodiac.minute,
    second:
      angles.midheaven.zodiac.second,
    longitude:
      angles.midheaven.zodiac
        .absoluteLongitude,
  },
  {
    point: "IC",
    sign:
      angles.imumCoeli.zodiac.sign,
    degree:
      angles.imumCoeli.zodiac.degree,
    minute:
      angles.imumCoeli.zodiac.minute,
    second:
      angles.imumCoeli.zodiac.second,
    longitude:
      angles.imumCoeli.zodiac
        .absoluteLongitude,
  },
]);

assertAngleInvariants(
  "Johannesburg",
  conversion.utcDate,
  -26.2041,
  28.0473,
);

assertAngleInvariants(
  "London",
  new Date("2000-07-01T17:45:00.000Z"),
  51.5074,
  -0.1278,
);

assertAngleInvariants(
  "New York",
  new Date("1985-08-21T03:50:00.000Z"),
  40.7128,
  -74.006,
);

const frameRegressionCases = [
  {
    utcDate: conversion.utcDate,
    latitude: -26.2041,
    longitude: 28.0473,
  },
  {
    utcDate:
      new Date("2000-07-01T17:45:00.000Z"),
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    utcDate:
      new Date("1985-08-21T03:50:00.000Z"),
    latitude: 40.7128,
    longitude: -74.006,
  },
] as const;

const frameCorrections =
  frameRegressionCases.flatMap(
    (testCase) => {
      const fixed = calculateChartAngles(
        testCase.utcDate,
        testCase.latitude,
        testCase.longitude,
      );

      const legacy = legacyFrameIntersections(
        testCase.utcDate,
        testCase.latitude,
        testCase.longitude,
      );

      return [
        nearestCorrection(
          fixed.ascendant.zodiac.absoluteLongitude,
          legacy.ascendant,
        ),
        nearestCorrection(
          fixed.midheaven.zodiac.absoluteLongitude,
          legacy.midheaven,
        ),
      ];
    },
  );

assert(
  Math.max(...frameCorrections) -
    Math.min(...frameCorrections) >
      0.1,
  "Coordinate-frame correction must vary by epoch and must not be a fixed 0.36° offset.",
);
