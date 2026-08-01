import {
  mkdir,
  writeFile,
} from "node:fs/promises";
import {
  dirname,
  resolve,
} from "node:path";

import {
  ZODIAC_BENCHMARK_CASES,
  calculateBirthChart,
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

const firstBatchCaseIds = [
  "johannesburg-standard-time",
  "london-summer-time",
  "new-york-summer-time",
] as const;

const outputPath = resolve(
  "docs/audits/zodiac-benchmark-internal-snapshots.json",
);

const generatedAt = new Date().toISOString();
const benchmarkById = new Map(
  ZODIAC_BENCHMARK_CASES.map((benchmark) => [
    benchmark.id,
    benchmark,
  ]),
);

const snapshots = firstBatchCaseIds.map((caseId) => {
  const benchmark = benchmarkById.get(caseId);
  assert(benchmark !== undefined, `Missing benchmark case: ${caseId}.`);

  const time = benchmark.input.time;
  const location = benchmark.input.location;
  const timeZone = benchmark.input.timeZone;
  assert(time !== null, `${caseId} requires a birth time.`);
  assert(location !== null, `${caseId} requires a birth location.`);
  assert(timeZone !== null, `${caseId} requires a time zone.`);

  const conversion = convertLocalBirthTimeToUtc(
    benchmark.input.date,
    time,
    timeZone,
  );
  const chart = calculateBirthChart(benchmark.input, {
    calculatedAt: new Date(generatedAt),
  });

  const position = (
    zodiac: {
      sign: string;
      degree: number;
      minute: number;
      second: number;
      absoluteLongitude: number;
    },
  ) => ({
    sign: zodiac.sign,
    degree: zodiac.degree,
    minute: zodiac.minute,
    second: zodiac.second,
    absoluteLongitude: zodiac.absoluteLongitude,
  });

  return {
    caseId,
    description: benchmark.description,
    localDateTime: conversion.localDateTime,
    utcDateTime: conversion.utcDateTime,
    offsetMinutes: conversion.offsetMinutes,
    latitude: location.latitude,
    longitude: location.longitude,
    timeZone,
    positions: {
      sun: position(chart.planets.sun.zodiac),
      moon: position(chart.planets.moon.zodiac),
      mercury: position(chart.planets.mercury.zodiac),
      venus: position(chart.planets.venus.zodiac),
      mars: position(chart.planets.mars.zodiac),
      ascendant: position(chart.angles.ascendant.zodiac),
      midheaven: position(chart.angles.midheaven.zodiac),
    },
    engine: {
      name: chart.engine.name,
      version: chart.engine.version,
    },
    generatedAt,
  };
});

async function main(): Promise<void> {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(snapshots, null, 2)}\n`,
    "utf8",
  );

  console.log(`Wrote ${snapshots.length} Zodiac benchmark snapshots.`);
  console.log(outputPath);
  console.table(
    snapshots.map((snapshot) => ({
      caseId: snapshot.caseId,
      utcDateTime: snapshot.utcDateTime,
      offsetMinutes: snapshot.offsetMinutes,
      sun: snapshot.positions.sun.sign,
      moon: snapshot.positions.moon.sign,
      ascendant: snapshot.positions.ascendant.sign,
      midheaven: snapshot.positions.midheaven.sign,
    })),
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
