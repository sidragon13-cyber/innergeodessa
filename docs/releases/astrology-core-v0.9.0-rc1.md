# Astrology Core v0.9.0-rc.1

## Status

Release Candidate 1

Externally cross-checked on the first three benchmark cases.

Not yet fully certified for Public Beta accuracy claims.

## Stable Scope

- BirthDataInput contracts
- Birth-data validation
- IANA time-zone handling
- UTC conversion
- Astronomy Engine 2.1.19 adapter
- Tropical geocentric Sun
- Moon
- Mercury
- Venus
- Mars
- Retrograde flags
- Ascendant
- Descendant
- Midheaven
- Imum Coeli
- Unified AstrologyResultContract
- Birth chart API
- Browser storage
- Zodiac test page
- Zodiac result page
- 16-section report generator
- Professional report page
- Print / Save as PDF
- Internal benchmark fixtures
- External evidence workflow

## Coordinate-Frame Correction

The original issue was that the true ecliptic-of-date coordinate frame was incorrectly treated as the J2000 mean ecliptic.

The incorrect chain was:

`ecliptic-of-date → mislabeled ECL(J2000) → EQD → HOR`

The corrected chain is:

`ECT → EQJ → HOR`

Fixed-angle compensation is prohibited.

Johannesburg after the correction:

- ASC Sagittarius 19°11′33″
- MC Virgo 4°18′52″

Compared with Astro-Seek:

- ASC difference 0.009082°
- MC difference 0.002254°

Compared with Swiss Ephemeris:

- ASC difference 0.001473°
- MC difference 0.001421°

## External Verification

### Johannesburg

- Astro-Seek
- Astrodienst Swiss Ephemeris
- UTC+2
- Southern Hemisphere
- 7/7 points passed

### London

- Astro-Seek
- Astrodienst Swiss Ephemeris
- BST / UTC+1
- Northern Hemisphere
- West longitude
- 7/7 points passed

### New York

- Astro-Seek
- Astrodienst Swiss Ephemeris
- EDT / UTC-4
- UTC date rollover
- West longitude
- 7/7 points passed

Current statistics:

- Evidence records: 6
- Verified cases: 3/3
- Verified sources: 2
- Unresolved differences: 0

This is the first RC sample only. It is not the complete 20-case Public Beta certification.

## Stable Public API

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

## Core Freeze Rules

1. Existing result semantics must not change for new features.
2. The time-zone and UTC modules must not be bypassed.
3. Low-level planetary calculations must not be duplicated.
4. Houses, aspects, transits, and synastry must build on `AstrologyResultContract`.
5. Every core modification must run the complete Zodiac regression suite.
6. Coordinate-frame changes require an audit and external benchmark evidence.
7. Fixed-angle compensation is prohibited.
8. Tolerances must not be expanded to conceal failures.
9. Golden evidence must not be changed to accommodate new output.
10. Breaking changes must update `schemaVersion`.

## Known Limitations

- No Jupiter
- No Saturn
- No Uranus
- No Neptune
- No Pluto
- No houses
- No planetary aspects
- No lunar nodes
- No Chiron
- No SVG chart wheel
- No transits
- No synastry
- No composite chart
- Limited city list
- Browser-local storage only
- No user account persistence
- English report content only
- External benchmark coverage currently limited to 3 dual-source cases

## Public Beta Release Gate

Formal public accuracy certification still requires:

- At least 20 benchmark cases
- At least two independent sources
- At least three DST cases
- At least three Southern Hemisphere cases
- At least two historical time-zone cases
- At least one midnight UTC date rollover
- At least one high-latitude case
- Golden Dataset
- CI regression
- Accuracy statistics
- Validation whitepaper
- No unresolved difference above tolerance

## Next Stage

Without changing the core, prioritize:

1. Mobile QA
2. Print PDF QA
3. City search
4. Unknown birth-time mode
5. Privacy and terms integration
6. Error monitoring
7. Account persistence
8. Chinese interface architecture
