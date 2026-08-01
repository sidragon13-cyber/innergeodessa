# Zodiac Chart Angle Coordinate Audit

## Finding

The former Ascendant and Midheaven calculations mixed true ecliptic-of-date longitudes with Astronomy Engine's J2000 mean-ecliptic `ECL` frame. This was a coordinate-frame defect, not a UTC, time-zone, planetary ephemeris, or zodiac-sign conversion defect.

## Former data flow

Both angle solvers created the candidate vector `[cos(lambda), sin(lambda), 0]`. The returned `lambda` was treated as a tropical longitude of date, but the vector was passed directly to `Rotation_ECL_HOR()`.

- ASC: candidate longitude intended as ecliptic of date -> vector implicitly labelled `ECL` -> `Rotation_ECL_HOR` -> solve `HOR.z = 0` -> choose the eastern (`HOR.y < 0`) intersection.
- MC: candidate longitude intended as ecliptic of date -> vector implicitly labelled `ECL` -> `Rotation_ECL_HOR` -> solve `HOR.y = 0` -> choose the upper (`HOR.z > 0`) intersection.

Astronomy Engine documents and implements `Rotation_ECL_HOR` as `ECL -> EQD -> HOR`, where `ECL` is the J2000 mean ecliptic, `EQD` is the true equator of date, and `HOR` is the observer's horizontal frame. Therefore the vector's actual semantic frame did not match the rotation's required source frame.

## Frame definitions verified in Astronomy Engine 2.1.19

- `ECL`: J2000 mean ecliptic, based on the J2000 mean equator/ecliptic orientation.
- `EQJ`: J2000 mean equatorial frame.
- `EQD`: true equatorial frame of the requested date; the implementation combines precession and nutation.
- `ECT`: true ecliptic of date, measured from the true equinox of the requested date.
- `HOR`: observer-local horizontal frame (`x = north`, `y = west`, `z = zenith`).

The package implementation confirms that `Rotation_ECL_HOR` combines `Rotation_ECL_EQD(time)` followed by `Rotation_EQD_HOR(time, observer)`. It separately provides `Rotation_ECT_EQJ(time)` for the true-ecliptic-of-date source frame used by the chart's tropical longitudes.

## Why the Johannesburg discrepancy matched an epoch error

For 2026-07-30T12:00:00Z, interpreting longitude-of-date as J2000 ECL displaced the Ascendant by 0.371663° and the Midheaven by 0.374414° relative to the corrected frame chain. The observed Astro-Seek discrepancies were 0.362581° and 0.376668° respectively. The similar date-dependent displacement on both angles, while planetary longitudes agreed closely, is consistent with a missing ecliptic/equinox-of-date transformation.

## Correction

The shared production chain is now:

`true ecliptic of date (ECT) candidate -> Rotation_ECT_EQJ(time) -> EQJ -> Rotation_EQJ_HOR(time, observer) -> HOR`

`CombineRotation` composes those two official matrices. ASC and MC use the same resulting ECT-to-HOR matrix; only the geometric intersection plane and selection rule differ. DSC remains exactly ASC + 180° and IC remains exactly MC + 180°, with all returned positions still created by `createZodiacPosition()`.

No precession constant or empirical longitude offset was added. A fixed correction would only hide the frame mismatch, would not track epoch-dependent precession/nutation, and would fail across dates and locations.
