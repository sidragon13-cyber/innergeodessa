# Zodiac External Benchmark Plan

## Current status

Benchmark framework established. External reference values are still pending manual verification; every fixture reference remains `null` until a result has been checked against a real external source.

Internal validation passing does not constitute external accuracy certification.

## Comparison scope

Each completed external reference will compare:

- Sun
- Moon
- Mercury
- Venus
- Mars
- Ascendant
- Midheaven
- UTC time
- UTC offset

## Planned external sources

References will be collected and documented from:

- Astro.com
- TimePassages
- Cafe Astrology
- A documented ephemeris or manual reference

No external value will be added without a traceable manual check.

## Initial tolerances

| Point | Maximum difference |
| --- | ---: |
| Sun | 0.05° |
| Mercury | 0.05° |
| Venus | 0.05° |
| Mars | 0.05° |
| Moon | 0.10° |
| Ascendant | 0.15° |
| Midheaven | 0.15° |

Angular comparisons must use the shortest distance around the 0°/360° boundary.

## Public Beta gate

Before Public Beta, the external benchmark set must meet all of the following requirements:

- At least 20 cases
- At least two independent external sources
- At least three daylight-saving-time cases
- At least three Southern Hemisphere cases
- At least two historical-time-zone cases
- At least one midnight date-boundary case
- At least one high-latitude case
- No unresolved difference exceeding its defined tolerance

The fixture validation script provides repeatable internal consistency checks and a place to record verified references. It does not replace manual external verification, source documentation, or review of discrepancies.
