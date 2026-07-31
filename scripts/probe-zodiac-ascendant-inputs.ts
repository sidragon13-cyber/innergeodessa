import {
  SiderealTime,
} from "astronomy-engine";

import {
  convertLocalBirthTimeToUtc,
  normalizeLongitude,
} from "../src/data/zodiac";

const birthDate = {
  year: 2026,
  month: 7,
  day: 30,
};

const birthTime = {
  hour: 14,
  minute: 0,
  second: 0,
  precision: "exact" as const,
};

const location = {
  latitude: -26.2041,
  longitude: 28.0473,
};

const conversion =
  convertLocalBirthTimeToUtc(
    birthDate,
    birthTime,
    "Africa/Johannesburg",
  );

const gastHours =
  SiderealTime(conversion.utcDate);

const gastDegrees =
  gastHours * 15;

const localSiderealDegrees =
  normalizeLongitude(
    gastDegrees + location.longitude,
  );

const localSiderealHours =
  localSiderealDegrees / 15;

console.log({
  localDateTime:
    conversion.localDateTime,
  utcDateTime:
    conversion.utcDateTime,
  offsetMinutes:
    conversion.offsetMinutes,

  latitude:
    location.latitude,
  longitude:
    location.longitude,

  gastHours,
  gastDegrees,

  localSiderealHours,
  localSiderealDegrees,
});
