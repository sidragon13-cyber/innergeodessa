import {
  calculateBirthChart,
  generateZodiacReportSections,
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

const sections =
  generateZodiacReportSections(
    chart,
  );

assert(
  sections.length === 16,
  `Expected 16 report sections, received ${sections.length}.`,
);

assert(
  sections.every(
    (section, index) =>
      section.order ===
      index + 1,
  ),
  "Report section order must be continuous.",
);

assert(
  new Set(
    sections.map(
      (section) =>
        section.id,
    ),
  ).size === sections.length,
  "Report section IDs must be unique.",
);

const blocks =
  sections.flatMap(
    (section) =>
      section.blocks,
  );

assert(
  blocks.length >= 35,
  "Expected at least 35 report blocks.",
);

assert(
  new Set(
    blocks.map(
      (block) =>
        block.id,
    ),
  ).size === blocks.length,
  "Report block IDs must be unique.",
);

assert(
  blocks.every(
    (block) =>
      block.title.trim().length >
        0 &&
      block.content.trim().length >=
        80,
  ),
  "Every report block requires a title and substantive content.",
);

assert(
  sections[2]?.title ===
    "Sun Profile",
  "Expected Sun Profile as section 3.",
);

assert(
  sections[3]?.title ===
    "Moon Profile",
  "Expected Moon Profile as section 4.",
);

assert(
  sections[4]?.title ===
    "Rising Sign",
  "Expected Rising Sign as section 5.",
);

assert(
  sections[8]?.title ===
    "Chart Angles",
  "Expected Chart Angles as section 9.",
);

assert(
  sections[15]?.title ===
    "Methodology and Limitations",
  "Expected methodology as section 16.",
);

const reportText =
  blocks
    .map(
      (block) =>
        block.content,
    )
    .join("\n");

for (
  const requiredPhrase
  of [
    "Leo",
    "Aquarius",
    "Sagittarius",
    "Cancer",
    "Virgo",
    "Gemini",
    "Astronomy Engine",
  ]
) {
  assert(
    reportText.includes(
      requiredPhrase,
    ),
    `Expected report to contain ${requiredPhrase}.`,
  );
}

for (
  const prohibitedPhrase
  of [
    "you definitely are",
    "your destiny is",
    "this proves",
    "you will certainly",
  ]
) {
  assert(
    !reportText
      .toLowerCase()
      .includes(
        prohibitedPhrase,
      ),
    `Report contains prohibited deterministic language: ${prohibitedPhrase}.`,
  );
}

console.log(
  "Zodiac report generator validation passed.",
);

console.table(
  sections.map(
    (section) => ({
      order:
        section.order,
      id:
        section.id,
      title:
        section.title,
      blocks:
        section.blocks.length,
    }),
  ),
);
