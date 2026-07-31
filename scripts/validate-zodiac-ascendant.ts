import {
  calculateAscendant,
  convertLocalBirthTimeToUtc,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
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

const ascendant =
  calculateAscendant(
    conversion.utcDate,
    -26.2041,
    28.0473,
  );

assert(
  ascendant.point ===
    "ascendant",
  "Expected an ascendant chart point.",
);

assert(
  ascendant.zodiac.sign ===
    "sagittarius",
  `Expected Sagittarius ascendant, received ${ascendant.zodiac.sign}.`,
);

assert(
  ascendant.zodiac.degree >= 18 &&
    ascendant.zodiac.degree <= 20,
  `Expected ascendant near 19° Sagittarius, received ${
    ascendant.zodiac.degree
  }° ${
    ascendant.zodiac.minute
  }′ ${
    ascendant.zodiac.second
  }″.`,
);

assert(
  ascendant.zodiac.absoluteLongitude >=
    0 &&
    ascendant.zodiac.absoluteLongitude <
      360,
  "Ascendant longitude must be normalized.",
);

console.log(
  "Zodiac ascendant validation passed.",
);

console.log({
  sign: ascendant.zodiac.sign,
  degree: ascendant.zodiac.degree,
  minute: ascendant.zodiac.minute,
  second: ascendant.zodiac.second,
  absoluteLongitude:
    ascendant.zodiac
      .absoluteLongitude,
});
