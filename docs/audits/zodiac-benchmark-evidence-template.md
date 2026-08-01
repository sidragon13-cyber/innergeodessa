# Zodiac Benchmark Evidence Template: First Batch

Use this template to collect auditable external evidence for the first three Zodiac benchmark cases. Do not enter a value unless the external platform displays it clearly and its settings have been confirmed.

Internal validation passing does not constitute external certification.

## Required external settings

- Zodiac: **Tropical Zodiac**
- Coordinate mode: **Geocentric**
- House system: record the exact selected system; use the same system when comparing ASC and MC across sources
- Location: confirm the displayed city and coordinates match the case
- Time: confirm local civil time, DST state, displayed UTC offset, and resulting UTC instant
- Precision: do not guess seconds from a blurred screenshot
- Minute-only platforms: record the displayed minute precision and do not fabricate seconds
- Unconfirmed fields: leave them `pending`

## Case inputs

### johannesburg-standard-time

| Field | Value |
| --- | --- |
| Date | 2026-07-30 |
| Local time | 14:00:00 |
| City | Johannesburg, South Africa |
| Coordinates | 26.2041° S, 28.0473° E |
| Latitude / longitude | -26.2041, 28.0473 |
| IANA time zone | Africa/Johannesburg |
| Internal UTC | 2026-07-30T12:00:00.000Z |
| Internal UTC offset | +02:00 (120 minutes) |
| Expected DST state | Disabled |

### london-summer-time

| Field | Value |
| --- | --- |
| Date | 2000-07-01 |
| Local time | 18:45:00 |
| City | London, United Kingdom |
| Coordinates | 51.5074° N, 0.1278° W |
| Latitude / longitude | 51.5074, -0.1278 |
| IANA time zone | Europe/London |
| Internal UTC | 2000-07-01T17:45:00.000Z |
| Internal UTC offset | +01:00 (60 minutes) |
| Expected DST state | Enabled (British Summer Time) |

### new-york-summer-time

| Field | Value |
| --- | --- |
| Date | 1985-08-20 |
| Local time | 23:50:00 |
| City | New York, United States |
| Coordinates | 40.7128° N, 74.0060° W |
| Latitude / longitude | 40.7128, -74.0060 |
| IANA time zone | America/New_York |
| Internal UTC | 1985-08-21T03:50:00.000Z |
| Internal UTC offset | -04:00 (-240 minutes) |
| Expected DST state | Enabled (Eastern Daylight Time) |

## Evidence record

Create one copy of this section for each case and external source.

| Metadata | Recorded value |
| --- | --- |
| Case ID | pending |
| Source key | pending |
| Source name / version | pending |
| Verification date (ISO) | pending |
| Evidence note or screenshot location | pending |
| Tropical Zodiac confirmed | pending |
| Geocentric confirmed | pending |
| House system | pending |
| Displayed location | pending |
| Displayed coordinates | pending |
| DST enabled | pending |
| Displayed UTC offset | pending |
| Derived UTC time | pending |

| Point | Sign | Degree | Minute | Second | Absolute longitude | Display precision / note |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Sun | pending | pending | pending | pending | pending | pending |
| Moon | pending | pending | pending | pending | pending | pending |
| Mercury | pending | pending | pending | pending | pending | pending |
| Venus | pending | pending | pending | pending | pending | pending |
| Mars | pending | pending | pending | pending | pending | pending |
| Ascendant (ASC) | pending | pending | pending | pending | pending | pending |
| Midheaven (MC) | pending | pending | pending | pending | pending | pending |

## Platform entry checklists

### Astro.com

- [ ] Select the correct case date, local time, and city
- [ ] Confirm Tropical Zodiac and Geocentric positions
- [ ] Record the selected house system
- [ ] Confirm DST and displayed UTC offset
- [ ] Capture the result page or record a durable evidence note
- [ ] Transcribe only the precision visibly supplied by the platform

### TimePassages

- [ ] Select the correct case date, local time, and city
- [ ] Confirm Tropical Zodiac and Geocentric positions
- [ ] Record the selected house system
- [ ] Confirm DST and displayed UTC offset
- [ ] Capture the result page or record a durable evidence note
- [ ] Transcribe only the precision visibly supplied by the platform

### Cafe Astrology

- [ ] Select the correct case date, local time, and city
- [ ] Confirm Tropical Zodiac and Geocentric positions
- [ ] Record the selected house system
- [ ] Confirm DST and displayed UTC offset
- [ ] Capture the result page or record a durable evidence note
- [ ] Transcribe only the precision visibly supplied by the platform

### Documented ephemeris or manual reference

- [ ] Record the title, edition or version, page/table, and calculation method
- [ ] Confirm Tropical Zodiac and Geocentric positions
- [ ] Document how UTC, DST, longitude, ASC, and MC were derived
- [ ] Preserve calculation notes or a scan reference
- [ ] Record only the precision supported by the source and method

## Difference investigation checklist

- [ ] Reconfirm the local date and time, including seconds
- [ ] Reconfirm the city coordinates and longitude sign
- [ ] Reconfirm the IANA time-zone history for the case date
- [ ] Reconfirm DST and the displayed UTC offset
- [ ] Reconfirm that the UTC date did not cross midnight incorrectly
- [ ] Reconfirm Tropical rather than Sidereal Zodiac
- [ ] Reconfirm Geocentric rather than Topocentric coordinates
- [ ] Reconfirm the house system used for ASC and MC
- [ ] Check whether the source rounds to whole minutes
- [ ] Compare absolute longitudes using the shortest angular distance across 0°/360°
- [ ] Document any difference above tolerance; do not increase tolerance to hide it
- [ ] Keep unresolved or unreadable fields `pending`
