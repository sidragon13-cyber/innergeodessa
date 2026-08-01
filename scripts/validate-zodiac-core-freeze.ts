import * as zodiac from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const stableFunctionExports = [
  "calculateBirthChart",
  "convertLocalBirthTimeToUtc",
  "calculateCorePlanetPositions",
  "calculateAscendant",
  "calculateChartAngles",
  "generateZodiacReportSections",
  "readStoredZodiacChart",
  "writeStoredZodiacChart",
  "removeStoredZodiacChart",
] as const;

for (const exportName of stableFunctionExports) {
  assert(
    typeof zodiac[exportName] === "function",
    `Expected ${exportName} to be exported as a function.`,
  );
}

const johannesburgCase =
  zodiac.ZODIAC_BENCHMARK_CASES.find(
    ({ id }) => id === "johannesburg-standard-time",
  );

assert(
  johannesburgCase,
  "Johannesburg benchmark fixture is required.",
);

const chart = zodiac.calculateBirthChart(
  johannesburgCase.input,
  {
    calculatedAt: new Date("2026-07-31T12:00:00.000Z"),
  },
);

assert(chart.schemaVersion === "1.0.0", "Unexpected schemaVersion.");
assert(chart.module === "zodiac", "Unexpected module.");
assert(
  chart.calculationType === "natal-chart",
  "Unexpected calculationType.",
);
assert(chart.planets.sun.zodiac.sign === "leo", "Expected Sun in Leo.");
assert(
  chart.planets.moon.zodiac.sign === "aquarius",
  "Expected Moon in Aquarius.",
);
assert(
  chart.angles.ascendant.zodiac.sign === "sagittarius",
  "Expected Sagittarius Ascendant.",
);
assert(
  chart.angles.midheaven.zodiac.sign === "virgo",
  "Expected Virgo Midheaven.",
);

const corePlanetCodes = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
] as const;

assert(
  corePlanetCodes.every((code) => chart.planets[code] !== undefined),
  "Expected all five core planets.",
);

const angleCodes = [
  "ascendant",
  "descendant",
  "midheaven",
  "imumCoeli",
] as const;

assert(
  angleCodes.every((code) => chart.angles[code] !== undefined),
  "Expected all four chart angles.",
);

function shortestAngularDistance(
  first: number,
  second: number,
): number {
  const difference = Math.abs(first - second) % 360;
  return Math.min(difference, 360 - difference);
}

assert(
  shortestAngularDistance(
    chart.angles.ascendant.zodiac.absoluteLongitude,
    chart.angles.descendant.zodiac.absoluteLongitude,
  ) === 180,
  "ASC and DSC must be exactly opposite.",
);
assert(
  shortestAngularDistance(
    chart.angles.midheaven.zodiac.absoluteLongitude,
    chart.angles.imumCoeli.zodiac.absoluteLongitude,
  ) === 180,
  "MC and IC must be exactly opposite.",
);
assert(
  chart.engine.name === "Astronomy Engine",
  "Unexpected engine name.",
);
assert(chart.engine.version === "2.1.19", "Unexpected engine version.");
assert(Array.isArray(chart.limitations), "Expected limitations array.");

const evidenceRecords = zodiac.ZODIAC_BENCHMARK_EVIDENCE;
const requiredSources = new Set([
  "astro-seek",
  "swiss-ephemeris",
]);
const evidenceSources = new Set<string>(
  evidenceRecords.map(({ source }) => source),
);
const evidenceByCase = new Map<string, Set<string>>();

for (const record of evidenceRecords) {
  const sources = evidenceByCase.get(record.caseId) ?? new Set<string>();
  sources.add(record.source);
  evidenceByCase.set(record.caseId, sources);
}

const verifiedCases = [...evidenceByCase.values()].filter(
  (sources) =>
    [...requiredSources].every((source) => sources.has(source)),
).length;

assert(evidenceRecords.length === 6, "Expected exactly 6 evidence records.");
assert(verifiedCases === 3, "Expected exactly 3 verified cases.");
assert(
  [...requiredSources].every((source) => evidenceSources.has(source)),
  "Expected Astro-Seek and Swiss Ephemeris evidence sources.",
);

console.log("Zodiac core freeze validation passed.");
console.log("Freeze version: v0.9.0-rc.1");
console.log(`Evidence records: ${evidenceRecords.length}`);
console.log(`Verified cases: ${verifiedCases}/3`);
console.log(`Verified sources: ${requiredSources.size}`);
