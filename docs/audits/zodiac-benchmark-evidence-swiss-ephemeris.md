# Johannesburg Swiss Ephemeris Benchmark Evidence

## Status

The Astrodienst official online `swetest` result supplies the second independent source for `johannesburg-standard-time`. All seven required points pass their existing base tolerances with zero display allowance, so Johannesburg satisfies the two-source evidence rule together with Astro-Seek.

Checked on 2026-08-01. The complete command and unedited calculation output are preserved in `docs/audits/evidence/zodiac-johannesburg-swiss-ephemeris-command.txt`.

## Independence and tool source

Swiss Ephemeris is developed by Dieter Koch and Alois Treindl at Astrodienst. The official Astrodienst test page invokes `swetest` directly and identifies the selected ephemeris mode. It is independent from InnerGeodessa's Astronomy Engine implementation and is recorded separately from the Astro-Seek result.

| Field | Value |
| --- | --- |
| Official page | `https://www.astro.com/swisseph/swetest.htm?lang=e` |
| Tool | Astrodienst official online `swetest` |
| swetest version | 2.10.03 |
| Ephemeris mode | `-eswe`, compressed DE441 |
| Ephemeris files | Server-managed compressed DE441; individual filenames not exposed by the online interface |
| Date input | 30.07.2026 Gregorian |
| Time input | `-utc12:00:00` |
| Longitude | 28.0473° East |
| Latitude | -26.2041° |
| Zodiac | Tropical; default with no `-sid` option |
| Coordinate mode | Geocentric; default with no `-hel`, `-bary`, or `-topo` option |
| Houses | `P`, Placidus; used only for ASC and MC |
| Output | `-fPLZ -roundsec`, whole arcseconds |

The page reports `12:00:00.349 UT` after accepting the explicit `12:00:00 UTC` input. This is the tool's UTC-to-UT1 conversion, not a local-time conversion. The evidence contract retains the supplied UTC instant `2026-07-30T12:00:00.000Z` and offset `+120` minutes from the benchmark input; DST is not applied.

## Reproduction command

```text
/ulb/swetest -b30.7.2026 -n1 -s1 -fPLZ -p01234 -eswe -utc12:00:00 -roundsec -house28.0473,-26.2041,P
```

## Raw external values

| Point | Raw longitude | Zodiac position | Precision |
| --- | ---: | --- | --- |
| Sun | 127°21′18″ | Leo 7°21′18″ | second |
| Moon | 317°26′53″ | Aquarius 17°26′53″ | second |
| Mercury | 108°25′46″ | Cancer 18°25′46″ | second |
| Venus | 172°29′50″ | Virgo 22°29′50″ | second |
| Mars | 82°03′13″ | Gemini 22°03′13″ | second |
| Ascendant | 259°11′38″ | Sagittarius 19°11′38″ | second |
| Midheaven | 154°18′57″ | Virgo 4°18′57″ | second |

The absolute longitude is reconstructed from the displayed sign, degree, minute, and second: `signIndex × 30 + degree + minute / 60 + second / 3600`. Because `-roundsec` explicitly returns whole seconds, the evidence records those seconds exactly and applies the required `0°` display allowance.

## Comparison

| Point | Internal longitude | External longitude | Difference | Base tolerance | Display allowance | Effective threshold | Result |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Sun | 127.354599° | 127.355000° | 0.000401° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Moon | 317.448722° | 317.448056° | 0.000666° | 0.100000° | 0.000000° | 0.100000° | PASS |
| Mercury | 108.428516° | 108.429444° | 0.000928° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Venus | 172.496675° | 172.497222° | 0.000547° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Mars | 82.053460° | 82.053611° | 0.000151° | 0.050000° | 0.000000° | 0.050000° | PASS |
| Ascendant | 259.192416° | 259.193889° | 0.001473° | 0.150000° | 0.000000° | 0.150000° | PASS |
| Midheaven | 154.314412° | 154.315833° | 0.001421° | 0.150000° | 0.000000° | 0.150000° | PASS |

## Conclusion and limitations

- All signs match and all seven angular differences pass without expanding a tolerance.
- Astro-Seek and Astrodienst `swetest` count as two distinct external sources.
- The official online interface exposes its generated command and complete stdout but not the server-side process stderr or exit code. The separately recorded HTTP retrieval completed with empty stderr and exit code 0.
- The online interface manages its compressed DE441 files and does not disclose their individual server filenames.
- Johannesburg now satisfies the dual-source benchmark requirement. This single verified case does not by itself satisfy every Public Beta or RC-wide benchmark coverage requirement.
