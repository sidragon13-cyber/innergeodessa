import {
  ZODIAC_BENCHMARK_CASES,
  calculateBirthChart,
  convertLocalBirthTimeToUtc,
  zodiacBenchmarkPointCodes,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function shortestAngularDistance(
  first: number,
  second: number,
): number {
  const difference =
    Math.abs(
      ((first - second) % 360 + 360) %
        360,
    );

  return Math.min(
    difference,
    360 - difference,
  );
}

assert(
  ZODIAC_BENCHMARK_CASES.length >= 10,
  "Expected at least ten Zodiac benchmark cases.",
);

assert(
  new Set(
    ZODIAC_BENCHMARK_CASES.map(
      (benchmark) => benchmark.id,
    ),
  ).size ===
    ZODIAC_BENCHMARK_CASES.length,
  "Benchmark case IDs must be unique.",
);

let externallyVerifiedCount = 0;

const tableRows =
  ZODIAC_BENCHMARK_CASES.map(
    (benchmark) => {
      const time =
        benchmark.input.time;

      const location =
        benchmark.input.location;

      const timeZone =
        benchmark.input.timeZone;

      assert(
        time !== null,
        `${benchmark.id} requires a birth time.`,
      );

      assert(
        location !== null,
        `${benchmark.id} requires a birth location.`,
      );

      assert(
        timeZone !== null,
        `${benchmark.id} requires a time zone.`,
      );

      const conversion =
        convertLocalBirthTimeToUtc(
          benchmark.input.date,
          time,
          timeZone,
        );

      const chart =
        calculateBirthChart(
          benchmark.input,
          {
            calculatedAt:
              new Date(
                "2026-08-01T12:00:00.000Z",
              ),
          },
        );

      assert(
        chart.input.utcDateTime ===
          conversion.utcDateTime,
        `${benchmark.id} chart UTC does not match direct conversion.`,
      );

      assert(
        chart.input.latitude ===
          location.latitude,
        `${benchmark.id} latitude mismatch.`,
      );

      assert(
        chart.input.longitude ===
          location.longitude,
        `${benchmark.id} longitude mismatch.`,
      );

      assert(
        Object.values(
          chart.planets,
        ).every(
          (planet) =>
            Number.isFinite(
              planet.zodiac
                .absoluteLongitude,
            ) &&
            planet.zodiac
              .absoluteLongitude >= 0 &&
            planet.zodiac
              .absoluteLongitude < 360,
        ),
        `${benchmark.id} contains an invalid planet longitude.`,
      );

      assert(
        Number.isFinite(
          chart.angles.ascendant
            .zodiac.absoluteLongitude,
        ),
        `${benchmark.id} ascendant is invalid.`,
      );

      assert(
        Number.isFinite(
          chart.angles.midheaven
            .zodiac.absoluteLongitude,
        ),
        `${benchmark.id} Midheaven is invalid.`,
      );

      const reference =
        benchmark.reference;

      if (reference) {
        externallyVerifiedCount += 1;

        assert(
          reference.utcDateTime ===
            conversion.utcDateTime,
          `${benchmark.id} external UTC reference mismatch.`,
        );

        assert(
          reference.offsetMinutes ===
            conversion.offsetMinutes,
          `${benchmark.id} external UTC offset mismatch.`,
        );

        for (
          const pointCode
          of zodiacBenchmarkPointCodes
        ) {
          const expected =
            reference.positions[
              pointCode
            ];

          if (!expected) {
            continue;
          }

          const actual =
            pointCode === "ascendant"
              ? chart.angles
                  .ascendant.zodiac
              : pointCode === "midheaven"
                ? chart.angles
                    .midheaven.zodiac
                : chart.planets[
                    pointCode
                  ].zodiac;

          assert(
            actual.sign ===
              expected.sign,
            `${benchmark.id} ${pointCode} sign mismatch: expected ${expected.sign}, received ${actual.sign}.`,
          );

          const difference =
            shortestAngularDistance(
              actual.absoluteLongitude,
              expected.absoluteLongitude,
            );

          assert(
            difference <=
              expected.toleranceDegrees,
            `${benchmark.id} ${pointCode} differs by ${difference}°, exceeding ${expected.toleranceDegrees}°.`,
          );
        }
      }

      return {
        id: benchmark.id,
        utc:
          conversion.utcDateTime,
        offsetMinutes:
          conversion.offsetMinutes,
        sun:
          chart.planets.sun
            .zodiac.sign,
        moon:
          chart.planets.moon
            .zodiac.sign,
        ascendant:
          chart.angles.ascendant
            .zodiac.sign,
        midheaven:
          chart.angles.midheaven
            .zodiac.sign,
        external:
          reference
            ? reference.source
            : "pending",
      };
    },
  );

console.log(
  "Zodiac benchmark fixture validation passed.",
);

console.log(
  `External references completed: ${externallyVerifiedCount}/${ZODIAC_BENCHMARK_CASES.length}`,
);

console.table(tableRows);
