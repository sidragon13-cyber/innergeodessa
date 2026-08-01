import {
  calculateChartAngles,
  convertLocalBirthTimeToUtc,
  normalizeLongitude,
} from "../src/data/zodiac";

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
    18,
  "Expected ascendant at 18° Sagittarius.",
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
