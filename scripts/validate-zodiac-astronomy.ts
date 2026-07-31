import {
  calculateCorePlanetPositions,
  createZodiacPosition,
  signedAngularDifference,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertClose(
  actual: number,
  expected: number,
  tolerance: number,
  message: string,
): void {
  const difference =
    Math.abs(actual - expected);

  assert(
    difference <= tolerance,
    `${message} Expected ${expected}, received ${actual}.`,
  );
}

const calculationTime =
  new Date("2026-07-30T12:00:00.000Z");

const planets =
  calculateCorePlanetPositions(
    calculationTime,
  );

assert(
  Object.keys(planets).length === 5,
  "Expected exactly five core planets.",
);

assertClose(
  planets.sun.ecliptic.longitude,
  127.35459916814347,
  0.000001,
  "Unexpected Sun longitude.",
);

assertClose(
  planets.moon.ecliptic.longitude,
  317.448721565956,
  0.000001,
  "Unexpected Moon longitude.",
);

assertClose(
  planets.mercury.ecliptic.longitude,
  108.42851624965948,
  0.000001,
  "Unexpected Mercury longitude.",
);

assertClose(
  planets.venus.ecliptic.longitude,
  172.49667498222263,
  0.000001,
  "Unexpected Venus longitude.",
);

assertClose(
  planets.mars.ecliptic.longitude,
  82.05346037875522,
  0.000001,
  "Unexpected Mars longitude.",
);

assert(
  planets.sun.zodiac.sign === "leo",
  "Sun should be in Leo.",
);

assert(
  planets.moon.zodiac.sign ===
    "aquarius",
  "Moon should be in Aquarius.",
);

assert(
  planets.mercury.zodiac.sign ===
    "cancer",
  "Mercury should be in Cancer.",
);

assert(
  planets.venus.zodiac.sign ===
    "virgo",
  "Venus should be in Virgo.",
);

assert(
  planets.mars.zodiac.sign ===
    "gemini",
  "Mars should be in Gemini.",
);

assert(
  planets.sun.retrograde === false,
  "Sun must never be marked retrograde.",
);

assert(
  planets.moon.retrograde === false,
  "Moon must never be marked retrograde.",
);

const ariesBoundary =
  createZodiacPosition(0);

assert(
  ariesBoundary.sign === "aries" &&
    ariesBoundary.degree === 0,
  "Zero longitude must be Aries 0 degrees.",
);

const piscesBoundary =
  createZodiacPosition(359.999);

assert(
  piscesBoundary.sign === "pisces",
  "359.999 degrees must be Pisces.",
);

assert(
  signedAngularDifference(
    359,
    1,
  ) === 2,
  "359 to 1 degrees must be positive 2 degrees.",
);

assert(
  signedAngularDifference(
    1,
    359,
  ) === -2,
  "1 to 359 degrees must be negative 2 degrees.",
);

for (
  const [body, position]
  of Object.entries(planets)
) {
  assert(
    position.ecliptic.longitude >= 0 &&
      position.ecliptic.longitude < 360,
    `${body} longitude must be normalized.`,
  );

  assert(
    position.zodiac.degree >= 0 &&
      position.zodiac.degree < 30,
    `${body} sign degree must be between 0 and 29.`,
  );

  assert(
    position.zodiac.minute >= 0 &&
      position.zodiac.minute < 60,
    `${body} minute must be valid.`,
  );

  assert(
    position.zodiac.second >= 0 &&
      position.zodiac.second < 60,
    `${body} second must be valid.`,
  );
}

console.log(
  "Zodiac astronomy adapter validation passed.",
);

console.table(
  Object.values(planets).map(
    (position) => ({
      body: position.body,
      sign: position.zodiac.sign,
      degree: position.zodiac.degree,
      minute: position.zodiac.minute,
      second: position.zodiac.second,
      longitude:
        position.ecliptic.longitude,
      retrograde:
        position.retrograde,
    }),
  ),
);
