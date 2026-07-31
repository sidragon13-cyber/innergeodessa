import {
  calculateAscendant,
  convertLocalBirthTimeToUtc,
} from "../src/data/zodiac";

const conversion =
  convertLocalBirthTimeToUtc(
    {
      year: 2026,
      month: 7,
      day: 30,
    },
    {
      hour: 14,
      minute: 0,
      second: 0,
      precision: "exact",
    },
    "Africa/Johannesburg",
  );

const ascendant =
  calculateAscendant(
    conversion.utcDate,
    -26.2041,
    28.0473,
  );

console.log({
  localDateTime:
    conversion.localDateTime,
  utcDateTime:
    conversion.utcDateTime,
  ascendant:
    ascendant.zodiac,
});
