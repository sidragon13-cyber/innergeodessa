# London Zodiac Benchmark Evidence

## Status

The Astro-Seek and Astrodienst Swiss Ephemeris `swetest` comparisons both pass for `london-summer-time`. Both sources independently confirm the required UTC conversion and all seven positions within the existing tolerances, so London satisfies the dual-source evidence rule.

Checked on 2026-08-01. Internal validation passing alone does not constitute external certification.

## Benchmark input and internal snapshot

| Field | Value |
| --- | --- |
| Case ID | `london-summer-time` |
| Local date and time | 2000-07-01 18:45:00 BST |
| Location | London, United Kingdom |
| Benchmark coordinates | 51.5074, -0.1278 |
| IANA time zone | Europe/London |
| DST | British Summer Time, observed |
| UTC offset | +01:00 / 60 minutes |
| UTC | 2000-07-01T17:45:00.000Z |
| Zodiac | Tropical |
| Coordinate mode | Geocentric |
| Houses | Placidus for ASC and MC |

| Point | Internal position | Absolute longitude |
| --- | --- | ---: |
| Sun | Cancer 10°10′21″ | 100.17252175333414° |
| Moon | Cancer 9°14′01″ | 99.2337165245134° |
| Mercury | Cancer 17°31′06″ | 107.51846266410689° |
| Venus | Cancer 15°44′42″ | 105.7450177282584° |
| Mars | Cancer 10°08′58″ | 100.14945309617144° |
| Ascendant | Sagittarius 8°01′50″ | 248.03050979743193° |
| Midheaven | Libra 6°45′21″ | 186.7557950023106° |

## Source 1: Astro-Seek

- Tool: Free Birth Chart Calculator
- Input displayed: 1 July 2000, 18:45 local time
- Time settings displayed: `GMT+00:00` with manual DST observed
- UT displayed: 1 July 2000, 17:45
- Coordinates displayed: 51°30′N, 0°08′W
- Zodiac: Tropical
- Coordinate mode: standard geocentric natal chart
- House system: Placidus
- Display precision: whole arcminutes; seconds were not displayed

| Point | Raw position | Internal longitude | External longitude | Difference | Base tolerance | Display allowance | Effective threshold | Result |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Sun | Cancer 10°10′ | 100.172522° | 100.166667° | 0.005855° | 0.050000° | 0.008333° | 0.058333° | PASS |
| Moon | Cancer 9°14′ | 99.233717° | 99.233333° | 0.000383° | 0.100000° | 0.008333° | 0.108333° | PASS |
| Mercury | Cancer 17°31′ | 107.518463° | 107.516667° | 0.001796° | 0.050000° | 0.008333° | 0.058333° | PASS |
| Venus | Cancer 15°44′ | 105.745018° | 105.733333° | 0.011684° | 0.050000° | 0.008333° | 0.058333° | PASS |
| Mars | Cancer 10°08′ | 100.149453° | 100.133333° | 0.016120° | 0.050000° | 0.008333° | 0.058333° | PASS |
| Ascendant | Sagittarius 8°01′ | 248.030510° | 248.016667° | 0.013843° | 0.150000° | 0.008333° | 0.158333° | PASS |
| Midheaven | Libra 6°44′ | 186.755795° | 186.733333° | 0.022462° | 0.150000° | 0.008333° | 0.158333° | PASS |

Seconds are recorded as `0` solely for longitude conversion. The separate minute-display allowance is applied by the validator.

## Source 2: Astrodienst Swiss Ephemeris swetest

- Official tool: `https://www.astro.com/swisseph/swetest.htm?lang=e`
- Version: `swetest` 2.10.03
- Ephemeris mode: compressed DE441 (`-eswe`)
- Input: 1 July 2000, `-utc17:45:00`, longitude -0.1278°, latitude 51.5074°
- Zodiac and coordinates: Tropical and geocentric defaults
- Houses: `P`, Placidus, used only for ASC and MC
- Display precision: whole arcseconds (`-roundsec`); display allowance is 0°

```text
/ulb/swetest -b1.7.2000 -n1 -s1 -fPLZ -p01234 -eswe -utc17:45:00 -roundsec -house-0.1278,51.5074,P
```

The official help defines `-house[long,lat,hsys]`, with positive longitude for east. The negative London longitude is therefore supplied as `-0.1278`; the output explicitly confirms `geo. long -0.127800, lat 51.507400`.

| Point | Raw position | Internal longitude | External longitude | Difference | Base tolerance | Display allowance | Effective threshold | Result |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Sun | Cancer 10°10′21″ | 100.172522° | 100.172500° | 0.000022° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Moon | Cancer 9°14′01″ | 99.233717° | 99.233611° | 0.000105° | 0.100000° | 0.000000° | 0.100000° | PASS |
| Mercury | Cancer 17°31′12″ | 107.518463° | 107.520000° | 0.001537° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Venus | Cancer 15°44′42″ | 105.745018° | 105.745000° | 0.000018° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Mars | Cancer 10°08′57″ | 100.149453° | 100.149167° | 0.000286° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Ascendant | Sagittarius 8°01′52″ | 248.030510° | 248.031111° | 0.000601° | 0.150000° | 0.000000° | 0.150000° | PASS |
| Midheaven | Libra 6°45′24″ | 186.755795° | 186.756667° | 0.000872° | 0.150000° | 0.000000° | 0.150000° | PASS |

The complete command, result metadata, stdout, HTTP retrieval stderr, and exit code are preserved in `docs/audits/evidence/zodiac-london-swiss-ephemeris-command.txt`.

## Conclusion

- Astro-Seek and Astrodienst `swetest` are recorded as two distinct sources.
- All fourteen source-point comparisons pass without changing a base tolerance.
- London now satisfies the two-source evidence requirement.
- With Johannesburg already verified, the evidence workflow should report 4 records, 2/3 verified cases, and 2 verified sources.
