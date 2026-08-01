import {
  ZODIAC_BENCHMARK_CASES,
  ZODIAC_BENCHMARK_EVIDENCE,
  calculateBirthChart,
  convertLocalBirthTimeToUtc,
  zodiacBenchmarkPointCodes,
  zodiacPositionToAbsoluteLongitude,
  type ZodiacBenchmarkEvidenceSource,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertThrows(
  action: () => void,
  message: string,
): void {
  let threw = false;

  try {
    action();
  } catch {
    threw = true;
  }

  assert(threw, message);
}

const firstBatchCaseIds = [
  "johannesburg-standard-time",
  "london-summer-time",
  "new-york-summer-time",
] as const;

const allowedCaseIds = new Set<string>(
  firstBatchCaseIds,
);

const allowedSources = new Set<ZodiacBenchmarkEvidenceSource>([
  "astro-seek",
  "astro-com",
  "timepassages",
  "cafe-astrology",
  "manual-reference",
]);

const requiredTolerances = {
  sun: 0.05,
  moon: 0.1,
  mercury: 0.05,
  venus: 0.05,
  mars: 0.05,
  ascendant: 0.15,
  midheaven: 0.15,
} as const;

assert(
  zodiacPositionToAbsoluteLongitude(
    "aries",
    0,
    0,
    0,
  ) === 0,
  "Aries must begin at 0° absolute longitude.",
);
assert(
  zodiacPositionToAbsoluteLongitude(
    "taurus",
    1,
    30,
    0,
  ) === 31.5,
  "Taurus degree-minute conversion is invalid.",
);
assert(
  zodiacPositionToAbsoluteLongitude(
    "pisces",
    29,
    59,
    59,
  ) < 360,
  "Pisces must remain below 360° absolute longitude.",
);
assertThrows(
  () =>
    zodiacPositionToAbsoluteLongitude(
      "aries",
      30,
      0,
      0,
    ),
  "Degree 30 must be rejected.",
);
assertThrows(
  () =>
    zodiacPositionToAbsoluteLongitude(
      "aries",
      0,
      60,
      0,
    ),
  "Minute 60 must be rejected.",
);
assertThrows(
  () =>
    zodiacPositionToAbsoluteLongitude(
      "aries",
      0,
      0,
      60,
    ),
  "Second 60 must be rejected.",
);
assertThrows(
  () =>
    zodiacPositionToAbsoluteLongitude(
      "not-a-sign" as "aries",
      0,
      0,
      0,
    ),
  "Unsupported Zodiac signs must be rejected.",
);

function shortestAngularDistance(
  first: number,
  second: number,
): number {
  const difference =
    Math.abs(
      ((first - second) % 360 + 360) % 360,
    );

  return Math.min(difference, 360 - difference);
}

const benchmarkById = new Map(
  ZODIAC_BENCHMARK_CASES.map((benchmark) => [
    benchmark.id,
    benchmark,
  ]),
);

const duplicateKeys = new Set<string>();
const verifiedSources = new Set<ZodiacBenchmarkEvidenceSource>();
const passingSourcesByCaseId = new Map<string, Set<ZodiacBenchmarkEvidenceSource>>();
const comparisonRows: Array<Record<string, string | number>> = [];
const comparisonFailures: string[] = [];

for (const evidence of ZODIAC_BENCHMARK_EVIDENCE) {
  const benchmark = benchmarkById.get(evidence.caseId);

  assert(
    benchmark !== undefined,
    `Unknown benchmark case ID: ${evidence.caseId}.`,
  );
  assert(
    allowedCaseIds.has(evidence.caseId),
    `${evidence.caseId} is not part of the first evidence batch.`,
  );
  assert(
    allowedSources.has(evidence.source),
    `Invalid evidence source for ${evidence.caseId}: ${evidence.source}.`,
  );

  const checkedAt = new Date(evidence.checkedAt);
  assert(
    !Number.isNaN(checkedAt.getTime()) &&
      checkedAt.toISOString() === evidence.checkedAt,
    `${evidence.caseId} checkedAt must be a canonical ISO date string.`,
  );

  const duplicateKey = `${evidence.caseId}:${evidence.source}`;
  assert(
    !duplicateKeys.has(duplicateKey),
    `Duplicate evidence record: ${duplicateKey}.`,
  );
  duplicateKeys.add(duplicateKey);

  assert(
    evidence.displayPrecision === "minute" ||
      evidence.displayPrecision === "second",
    `${evidence.caseId} has an invalid display precision.`,
  );

  const time = benchmark.input.time;
  const timeZone = benchmark.input.timeZone;
  assert(time !== null, `${evidence.caseId} requires a birth time.`);
  assert(timeZone !== null, `${evidence.caseId} requires a time zone.`);

  const conversion = convertLocalBirthTimeToUtc(
    benchmark.input.date,
    time,
    timeZone,
  );
  const chart = calculateBirthChart(benchmark.input, {
    calculatedAt: new Date("2026-08-01T12:00:00.000Z"),
  });

  assert(
    evidence.utcDateTime === conversion.utcDateTime,
    `${evidence.caseId} UTC time mismatch.`,
  );
  assert(
    evidence.offsetMinutes === conversion.offsetMinutes,
    `${evidence.caseId} UTC offset mismatch.`,
  );

  for (const pointCode of zodiacBenchmarkPointCodes) {
    const external = evidence.positions[pointCode];
    assert(
      external !== undefined,
      `${evidence.caseId} is missing ${pointCode}.`,
    );

    const convertedLongitude = zodiacPositionToAbsoluteLongitude(
      external.sign,
      external.degree,
      external.minute,
      external.second,
    );
    assert(
      Math.abs(
        external.absoluteLongitude - convertedLongitude,
      ) <= 0.000001,
      `${evidence.caseId} ${pointCode} absolute longitude does not match its degree-minute-second value.`,
    );
    assert(
      external.toleranceDegrees ===
        requiredTolerances[pointCode],
      `${evidence.caseId} ${pointCode} tolerance must be ${requiredTolerances[pointCode]}°.`,
    );

    const internal =
      pointCode === "ascendant"
        ? chart.angles.ascendant.zodiac
        : pointCode === "midheaven"
          ? chart.angles.midheaven.zodiac
          : chart.planets[pointCode].zodiac;

    const angularDifference = shortestAngularDistance(
      internal.absoluteLongitude,
      external.absoluteLongitude,
    );
    const quantizationAllowance =
      evidence.displayPrecision === "minute"
        ? 1 / 120
        : 1 / 7200;
    const effectiveThreshold =
      external.toleranceDegrees + quantizationAllowance;
    const longitudePassed = angularDifference <= effectiveThreshold;
    const signPassed = internal.sign === external.sign;
    const passed = signPassed && longitudePassed;

    comparisonRows.push({
      caseId: evidence.caseId,
      source: evidence.source,
      point: pointCode,
      internal: internal.absoluteLongitude,
      external: external.absoluteLongitude,
      difference: angularDifference,
      baseTolerance: external.toleranceDegrees,
      quantizationAllowance,
      effectiveThreshold,
      result: passed ? "PASS" : "FAIL",
    });

    if (!signPassed) {
      comparisonFailures.push(
        `${evidence.caseId} ${pointCode} sign mismatch: expected ${external.sign}, received ${internal.sign}.`,
      );
    }

    if (!longitudePassed) {
      comparisonFailures.push(
        `${evidence.caseId} ${pointCode} differs by ${angularDifference}°, exceeding ${effectiveThreshold}°.`,
      );
    }
  }

  const passingSources =
    passingSourcesByCaseId.get(evidence.caseId) ??
    new Set<ZodiacBenchmarkEvidenceSource>();
  passingSources.add(evidence.source);
  passingSourcesByCaseId.set(evidence.caseId, passingSources);
  verifiedSources.add(evidence.source);
}

const verifiedCaseCount = [...passingSourcesByCaseId.values()].filter(
  (sources) => sources.size >= 2,
).length;

if (comparisonRows.length > 0) {
  console.table(comparisonRows);
}

assert(
  comparisonFailures.length === 0,
  comparisonFailures.join("\n"),
);

console.log("Zodiac benchmark evidence validation passed.");
console.log(
  `Evidence records completed: ${ZODIAC_BENCHMARK_EVIDENCE.length}`,
);
console.log(
  `Verified cases: ${verifiedCaseCount}/${firstBatchCaseIds.length}`,
);
console.log(`Verified sources: ${verifiedSources.size}`);
