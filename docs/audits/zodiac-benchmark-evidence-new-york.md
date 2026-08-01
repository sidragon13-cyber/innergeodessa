# New York Zodiac Benchmark Evidence

## Status

The Astro-Seek and Astrodienst Swiss Ephemeris `swetest` comparisons both pass for `new-york-summer-time`. Both sources independently confirm the EDT-to-UTC conversion and all seven positions within the existing tolerances, so New York satisfies the dual-source evidence rule.

Checked on 2026-08-01. Internal validation passing alone does not constitute external certification.

## Benchmark input and internal snapshot

| Field | Value |
| --- | --- |
| Case ID | `new-york-summer-time` |
| Local date and time | 1985-08-20 23:50:00 EDT |
| Location | New York, United States |
| Benchmark coordinates | 40.7128, -74.006 |
| IANA time zone | America/New_York |
| DST | Eastern Daylight Time, observed |
| UTC offset | -04:00 / -240 minutes |
| UTC | 1985-08-21T03:50:00.000Z |
| Zodiac | Tropical |
| Coordinate mode | Geocentric |
| Houses | Placidus for ASC and MC |
| Engine | Astronomy Engine 2.1.19 |

The latest generated snapshot confirms that 23:50 EDT plus four hours crosses the UTC date boundary to 03:50 on 21 August 1985.

| Point | Internal position | Absolute longitude |
| --- | --- | ---: |
| Sun | Leo 28°02′32″ | 148.04219390730356° |
| Moon | Scorpio 1°10′51″ | 211.18090253383366° |
| Mercury | Leo 13°12′54″ | 133.2150991370019° |
| Venus | Cancer 21°45′13″ | 111.75354207266673° |
| Mars | Leo 17°20′08″ | 137.3356687406515° |
| Ascendant | Gemini 4°10′04″ | 64.1676680282792° |
| Midheaven | Aquarius 10°27′35″ | 310.4596744464342° |

## Source 1: Astro-Seek

- Tool: Free Birth Chart Calculator
- Input displayed: 20 August 1985, 23:50 local time
- Time settings displayed: `GMT-05:00` with manual DST observed, equivalent to EDT / UTC-04:00
- UT displayed: 21 August 1985, 03:50
- Coordinates displayed: 40°43′N, 74°00′W
- Zodiac: Tropical
- Coordinate mode: standard geocentric natal chart
- House system: Placidus
- Display precision: whole arcminutes; seconds were not displayed

| Point | Raw position | Internal longitude | External longitude | Difference | Base tolerance | Display allowance | Effective threshold | Result |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Sun | Leo 28°02′ | 148.042194° | 148.033333° | 0.008861° | 0.050000° | 0.008333° | 0.058333° | PASS |
| Moon | Scorpio 1°10′ | 211.180903° | 211.166667° | 0.014236° | 0.100000° | 0.008333° | 0.108333° | PASS |
| Mercury | Leo 13°13′ | 133.215099° | 133.216667° | 0.001568° | 0.050000° | 0.008333° | 0.058333° | PASS |
| Venus | Cancer 21°45′ | 111.753542° | 111.750000° | 0.003542° | 0.050000° | 0.008333° | 0.058333° | PASS |
| Mars | Leo 17°20′ | 137.335669° | 137.333333° | 0.002335° | 0.050000° | 0.008333° | 0.058333° | PASS |
| Ascendant | Gemini 4°10′ | 64.167668° | 64.166667° | 0.001001° | 0.150000° | 0.008333° | 0.158333° | PASS |
| Midheaven | Aquarius 10°27′ | 310.459674° | 310.450000° | 0.009674° | 0.150000° | 0.008333° | 0.158333° | PASS |

Seconds are recorded as `0` solely for longitude conversion. The separate minute-display allowance is applied by the validator. Astro-Seek did not revert to a default chart: its result page explicitly displayed the New York date, local time, UT, DST, coordinates, and Placidus settings above.

## Source 2: Astrodienst Swiss Ephemeris swetest

- Official tool: `https://www.astro.com/swisseph/swetest.htm?lang=e`
- Version: `swetest` 2.10.03
- Ephemeris mode: compressed DE441 (`-eswe`)
- Input: 21 August 1985, `-utc03:50:00`, longitude -74.006°, latitude 40.7128°
- Zodiac and coordinates: Tropical and geocentric defaults
- Houses: `P`, Placidus, used only for ASC and MC
- Display precision: whole arcseconds (`-roundsec`); display allowance is 0°

```text
/ulb/swetest -b21.8.1985 -n1 -s1 -fPLZ -p01234 -eswe -utc03:50:00 -roundsec -house-74.006,40.7128,P
```

The official help defines `-house[long,lat,hsys]`, with positive longitude for east. The negative New York longitude is therefore supplied as `-74.006`; the output explicitly confirms `geo. long -74.006000, lat 40.712800`.

| Point | Raw position | Internal longitude | External longitude | Difference | Base tolerance | Display allowance | Effective threshold | Result |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Sun | Leo 28°02′32″ | 148.042194° | 148.042222° | 0.000028° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Moon | Scorpio 1°10′51″ | 211.180903° | 211.180833° | 0.000069° | 0.100000° | 0.000000° | 0.100000° | PASS |
| Mercury | Leo 13°13′00″ | 133.215099° | 133.216667° | 0.001568° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Venus | Cancer 21°45′12″ | 111.753542° | 111.753333° | 0.000209° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Mars | Leo 17°20′08″ | 137.335669° | 137.335556° | 0.000113° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Ascendant | Gemini 4°10′12″ | 64.167668° | 64.170000° | 0.002332° | 0.150000° | 0.000000° | 0.150000° | PASS |
| Midheaven | Aquarius 10°27′42″ | 310.459674° | 310.461667° | 0.001992° | 0.150000° | 0.000000° | 0.150000° | PASS |

The complete command, result metadata, stdout, HTTP retrieval stderr, and exit code are preserved in `docs/audits/evidence/zodiac-new-york-swiss-ephemeris-command.txt`.

## Independence and conclusion

- Astro-Seek and Astrodienst `swetest` are recorded as two distinct external sources with independently transcribed output.
- All fourteen source-point comparisons pass without changing a base tolerance.
- UTC date rollover, EDT, DST, and the west-longitude negative sign are explicitly confirmed.
- New York now satisfies the two-source evidence requirement.
- With Johannesburg and London already verified, the evidence workflow should report 6 records, 3/3 verified cases, and 2 verified sources.
- No unresolved discrepancy remains for this first three-case benchmark set. Broader Public Beta coverage and external certification requirements remain separate follow-up work.
