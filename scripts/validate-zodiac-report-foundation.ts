import {
  ZODIAC_SIGN_NAMES,
  ZODIAC_SIGN_PROFILES,
  formatZodiacPosition,
  getZodiacSignProfile,
  getZodiacSignName,
  type ZodiacReportBlock,
  type ZodiacReportSection,
  type ZodiacSign,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const signs: readonly ZodiacSign[] = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

assert(
  Object.keys(
    ZODIAC_SIGN_PROFILES,
  ).length === 12,
  "Expected twelve Zodiac sign profiles.",
);

assert(
  Object.keys(
    ZODIAC_SIGN_NAMES,
  ).length === 12,
  "Expected twelve Zodiac sign names.",
);

for (const sign of signs) {
  const profile =
    getZodiacSignProfile(sign);

  assert(
    profile.sign === sign,
    `Profile sign mismatch for ${sign}.`,
  );

  assert(
    profile.name ===
      getZodiacSignName(sign),
    `Profile name mismatch for ${sign}.`,
  );

  assert(
    profile.orientation.length >= 80,
    `${sign} orientation is too short.`,
  );

  assert(
    profile.constructiveExpression
      .length >= 80,
    `${sign} constructive expression is too short.`,
  );

  assert(
    profile.possibleTension
      .length >= 80,
    `${sign} tension description is too short.`,
  );

  assert(
    profile.growthDirection
      .length >= 80,
    `${sign} growth direction is too short.`,
  );

  assert(
    profile.strengths.length >= 4,
    `${sign} requires at least four strengths.`,
  );

  assert(
    profile.risks.length >= 3,
    `${sign} requires at least three risks.`,
  );

  assert(
    profile.relationshipThemes
      .length >= 3,
    `${sign} requires relationship themes.`,
  );

  assert(
    profile.careerThemes
      .length >= 3,
    `${sign} requires career themes.`,
  );
}

const formatted =
  formatZodiacPosition({
    sign: "capricorn",
    absoluteLongitude: 280.5,
    degree: 10,
    minute: 30,
    second: 0,
  });

assert(
  formatted ===
    "Capricorn 10° 30′ 0″",
  "Unexpected Zodiac position formatting.",
);

const block:
  ZodiacReportBlock = {
    id: "test-block",
    type: "summary",
    title: "Test block",
    content: "Test content",
  };

const section:
  ZodiacReportSection = {
    id: "test-section",
    order: 1,
    title: "Test section",
    description:
      "Report contract validation.",
    blocks: [block],
  };

assert(
  section.blocks[0]?.type ===
    "summary",
  "Zodiac report block contract failed.",
);

console.log(
  "Zodiac report foundation validation passed.",
);

console.table(
  signs.map((sign) => {
    const profile =
      getZodiacSignProfile(sign);

    return {
      sign: profile.name,
      element: profile.element,
      modality: profile.modality,
      strengths:
        profile.strengths.length,
      risks:
        profile.risks.length,
    };
  }),
);
