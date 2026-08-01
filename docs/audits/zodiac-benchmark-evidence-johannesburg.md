# Johannesburg Zodiac Benchmark Evidence

## Status

The Astro-Seek seven-point comparison **passes** after correcting the chart-angle coordinate frame and is now formally recorded in `ZODIAC_BENCHMARK_EVIDENCE`. Johannesburg dual-source verification remains **pending** because none of the attempted second sources supplied a complete, valid result with all required settings and seven points.

Checked on 2026-08-01. Internal validation passing does not constitute external certification.

## Benchmark input

| Field | Value |
| --- | --- |
| Case ID | `johannesburg-standard-time` |
| Local date and time | 2026-07-30 14:00:00 |
| Location | Johannesburg, South Africa |
| Benchmark coordinates | -26.2041, 28.0473 |
| IANA time zone | Africa/Johannesburg |
| Internal UTC offset | +02:00 / 120 minutes |
| Internal UTC | 2026-07-30T12:00:00.000Z |
| Zodiac | Tropical |
| Coordinate mode | Geocentric |

## Internal snapshot

| Point | Internal position | Absolute longitude |
| --- | --- | ---: |
| Sun | Leo 7°21′17″ | 127.35459916814347° |
| Moon | Aquarius 17°26′55″ | 317.448721565956° |
| Mercury | Cancer 18°25′43″ | 108.42851624965948° |
| Venus | Virgo 22°29′48″ | 172.49667498222266° |
| Mars | Gemini 22°03′12″ | 82.05346037875523° |
| Ascendant | Sagittarius 19°11′33″ | 259.19241560471085° |
| Midheaven | Virgo 4°18′52″ | 154.31441223213073° |

## Source attempts

### Astro.com / Astrodienst

- Official tool: Extended Chart Selection
- Page: `https://www.astro.com/cgi/genchart.cgi`
- Entered data: 30 July 2026, 14:00, Johannesburg, South Africa
- Atlas location shown: Johannesburg, South Africa, 26°15′S, 28°00′E
- Visible preliminary result: Sun in Leo; Moon in Aquarius
- Limitation: the official page required account registration before displaying the Ascendant and complete numerical positions
- Result: not usable as complete numerical evidence; no values were inferred from the internal snapshot

### TimePassages / AstroGraph

- Official tool: Your Free Birth Chart
- Page: `https://astrograph.com/birth-chart`
- Limitation: an email address is mandatory and submission creates a TimePassages account
- Result: no personal email or account was supplied; no chart result was generated

### Cafe Astrology

- Official tools attempted:
  - `https://cafeastrology.com/free-natal-chart-report.html`
  - `https://astro.cafeastrology.com/natal.php`
- Entered data: 30 July 2026, 14:00, Johannesburg
- Selected location: Johannesburg, South Africa (`-26.20`, `28.07`)
- Displayed input: 30 July 2026, 14:00 local time
- Displayed settings: Tropical zodiac and Placidus houses
- Displayed positions: Sun Leo 7°21′; Moon Aquarius 17°26′; Mercury Cancer 18°26′; Venus Virgo 22°30′; Mars Gemini 22°04′; Ascendant Sagittarius 19°13′; Midheaven Virgo 4°20′
- Display precision: whole arcminutes
- Limitation: the result did not explicitly display the derived UTC instant, UTC offset, DST state, or geocentric coordinate mode
- Result: not entered as formal evidence; missing settings were not inferred

### Astro-Seek

- Tool: Free Birth Chart Calculator
- Page: `https://horoscopes.astro-seek.com/birth-chart-horoscope-online`
- Reason for substitution: Astro.com required registration, TimePassages required an email/account, and Cafe Astrology's city lookup did not return a usable location
- Displayed local time: 30 July 2026, 14:00 SAST
- Displayed UT/GMT: 30 July 2026, 12:00
- Displayed location: Johannesburg, South Africa (ZA)
- Displayed coordinates: 26°12′S, 28°03′E
- Displayed UTC offset / DST: SAST implies UTC+02:00; no DST applied
- Zodiac: Tropical (default selected on the calculator)
- Coordinate mode: standard geocentric natal chart
- House system: Placidus
- Display precision: whole arcminutes; seconds were not displayed and were not guessed

#### Raw displayed positions

| Point | Displayed position | Precision |
| --- | --- | --- |
| Sun | Leo 7°21′ | minute |
| Moon | Aquarius 17°26′ | minute |
| Mercury | Cancer 18°25′ | minute |
| Venus | Virgo 22°29′ | minute |
| Mars | Gemini 22°03′ | minute |
| Ascendant | Sagittarius 19°11′ | minute |
| Midheaven | Virgo 4°19′ | minute |

Source displays positions rounded or truncated to whole arcminutes; seconds are unavailable. Seconds are recorded as `0` solely for longitude conversion, with a separate 0.008333333° maximum minute-precision quantization allowance. This source is formally recorded as one evidence record.

#### Internal comparison

| Point | Internal longitude | External longitude | Difference | Base tolerance | Quantization allowance | Effective threshold | Result |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Sun | 127.354599° | 127.350000° | 0.004599° | 0.050000° | 0.008333° | 0.058333° | Pass |
| Moon | 317.448722° | 317.433333° | 0.015388° | 0.100000° | 0.008333° | 0.108333° | Pass |
| Mercury | 108.428516° | 108.416667° | 0.011850° | 0.050000° | 0.008333° | 0.058333° | Pass |
| Venus | 172.496675° | 172.483333° | 0.013342° | 0.050000° | 0.008333° | 0.058333° | Pass |
| Mars | 82.053460° | 82.050000° | 0.003460° | 0.050000° | 0.008333° | 0.058333° | Pass |
| Ascendant | 259.192416° | 259.183333° | 0.009082° | 0.150000° | 0.008333° | 0.158333° | Pass |
| Midheaven | 154.314412° | 154.316667° | 0.002254° | 0.150000° | 0.008333° | 0.158333° | Pass |

### ChartLiving

- Tool: Natal Chart Calculator
- Page: `https://chartliving.com/en/natal-chart-calculator`
- Declared calculation basis: Swiss Ephemeris, Tropical Zodiac, Placidus houses
- Entered data: 2026-07-30 14:00, Johannesburg, -26.2041, 28.0473, Africa/Johannesburg
- Limitation: the calculator did not enable chart calculation after its time-zone detection attempt in the current browser session
- Result: no chart result was generated

### Astrolium

- Tool: Astrology chart generator
- Page: `https://astrolium.com/tools/chart-generator`
- Declared calculation basis: Swiss Ephemeris, Tropical zodiac, Placidus houses, apparent geocentric coordinates, and historical time-zone rules
- Selected location: Johannesburg, South Africa; displayed coordinates 26°12′08″S, 28°02′37″E and offset `+02:00`
- Limitation: although the form visibly accepted 2026-07-30 14:00, chart submission repeatedly reset the calculation payload to the tool's 1990-08-22 12:00 default
- Result: the returned chart was for the wrong date and time and was discarded; none of its positions were recorded or used

## Findings and unresolved issues

- Before the fix, the internal angle values were Ascendant 258.820752° and Midheaven 153.939999°, differing from Astro-Seek by 0.362581° and 0.376668°.
- Root cause: the angle solvers treated a tropical true-ecliptic-of-date candidate vector as Astronomy Engine's J2000 mean-ecliptic `ECL` input to `Rotation_ECL_HOR()`.
- Fix: both ASC and MC now use the official matrix chain `ECT -> EQJ -> HOR`; no constant correction or expanded tolerance was introduced.
- Astro-Seek independently confirms the internal UTC instant and all seven displayed positions within the configured tolerance plus minute-display quantization allowance.
- The Astro-Seek city coordinates are rounded to whole arcminutes and differ slightly from the benchmark coordinates; the remaining 0.009082° ASC and 0.002254° MC differences are within the effective threshold.
- Evidence counts are 1 record, 0/3 verified cases, and 1 verified source. A single source cannot satisfy the two-source requirement.
- A second complete independent source is still required.
- Cafe Astrology supplied all seven minute-level positions but omitted explicit UTC, offset, DST, and geocentric settings, so it remains an audit-only attempt rather than formal evidence.
- Astrolium documented the required calculation basis and settings, but its submitted chart used the wrong date and time, so it remains an audit-only attempt rather than formal evidence.
- Recheck all seven positions against Astro.com, TimePassages, or another independent documented calculator using the exact benchmark date, time, coordinates, and Tropical/Geocentric settings.
