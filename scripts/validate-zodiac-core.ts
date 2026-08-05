import {
  astrologyBodyCodes,
  chartPointCodes,
  longitudeToZodiacSign,
  normalizeLongitude,
  validateBirthDataInput,
  zodiacSignDefinitions,
  zodiacSigns,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

assert(
  zodiacSigns.length === 12,
  "Expected exactly 12 zodiac signs.",
);

assert(
  astrologyBodyCodes.length === 5,
  "Expected five V1 astrology bodies.",
);

assert(
  chartPointCodes.includes("ascendant"),
  "Ascendant must be registered as a chart point.",
);

assert(
  Object.keys(zodiacSignDefinitions).length === 12,
  "Every zodiac sign must have a definition.",
);

const longitudeCases = [
  [0, "aries"],
  [29.999999, "aries"],
  [30, "taurus"],
  [59.999999, "taurus"],
  [60, "gemini"],
  [89.999999, "gemini"],
  [90, "cancer"],
  [119.999999, "cancer"],
  [120, "leo"],
  [149.999999, "leo"],
  [150, "virgo"],
  [179.999999, "virgo"],
  [180, "libra"],
  [209.999999, "libra"],
  [210, "scorpio"],
  [239.999999, "scorpio"],
  [240, "sagittarius"],
  [269.999999, "sagittarius"],
  [270, "capricorn"],
  [299.999999, "capricorn"],
  [300, "aquarius"],
  [329.999999, "aquarius"],
  [330, "pisces"],
  [359.999999, "pisces"],
  [360, "aries"],
  [-30, "pisces"],
] as const;

for (const [longitude, expected] of longitudeCases) {
  assert(
    longitudeToZodiacSign(longitude) === expected,
    `Longitude ${longitude} should resolve to ${expected}.`,
  );
}

assert(
  normalizeLongitude(360) === 0,
  "360 degrees must normalize to zero.",
);

assert(
  normalizeLongitude(-1) === 359,
  "-1 degree must normalize to 359.",
);

const validInput = validateBirthDataInput({
  date: {
    year: 1990,
    month: 6,
    day: 15,
  },
  time: {
    hour: 14,
    minute: 30,
    second: 0,
    precision: "exact",
  },
  location: {
    displayName: "Johannesburg, South Africa",
    city: "Johannesburg",
    region: "Gauteng",
    countryCode: "ZA",
    latitude: -26.2041,
    longitude: 28.0473,
  },
  timeZone: "Africa/Johannesburg",
  locale: "en",
});

assert(
  validInput.valid,
  `Expected valid birth input: ${JSON.stringify(
    validInput.issues,
  )}`,
);

const invalidLeapDate = validateBirthDataInput({
  date: {
    year: 2023,
    month: 2,
    day: 29,
  },
  time: null,
  location: null,
  timeZone: null,
  locale: "en",
});

assert(
  !invalidLeapDate.valid,
  "29 February 2023 must be rejected.",
);

const validLeapDate = validateBirthDataInput({
  date: {
    year: 2024,
    month: 2,
    day: 29,
  },
  time: null,
  location: null,
  timeZone: null,
  locale: "zh",
});

assert(
  validLeapDate.valid,
  "29 February 2024 must be accepted.",
);

console.log(
  "Zodiac core validation passed.",
);
