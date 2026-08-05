# Astrology Core Freeze

Version:
v0.9.0-rc.1

Status:
Release Candidate

Externally verified sample:
3 dual-source cases

Public Beta certification:
Pending

## Frozen implementation files

Do not modify directly:

- `calculation/astronomy-engine-adapter.ts`
- `calculation/timezone.ts`
- `calculation/ascendant.ts`
- `calculation/chart-angles.ts`
- `calculation/chart-calculator.ts`
- `result-contract.ts`

## Stable API

- `calculateBirthChart()`
- `convertLocalBirthTimeToUtc()`
- `calculateCorePlanetPositions()`
- `calculateAscendant()`
- `calculateChartAngles()`
- `generateZodiacReportSections()`
- `readStoredZodiacChart()`
- `writeStoredZodiacChart()`
- `removeStoredZodiacChart()`
- `AstrologyResultContract`
- `BirthDataInput`
- `ZodiacChartApiResponse`

## Change rules

- Create an audit before changing frozen core behavior.
- Add or update a benchmark before changing frozen core behavior.
- Run the complete Zodiac regression suite.
- Empirical or fixed-angle offsets are not allowed.
- Tolerances must not be expanded to conceal failures.
- Breaking changes must update `schemaVersion`.
