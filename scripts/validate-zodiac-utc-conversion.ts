import {
  LocalTimeConversionError,
  convertLocalBirthTimeToUtc,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function exactTime(
  hour: number,
  minute: number,
  second = 0,
) {
  return {
    hour,
    minute,
    second,
    precision: "exact" as const,
  };
}

const johannesburg =
  convertLocalBirthTimeToUtc(
    {
      year: 2026,
      month: 7,
      day: 30,
    },
    exactTime(14, 0),
    "Africa/Johannesburg",
  );

assert(
  johannesburg.utcDateTime ===
    "2026-07-30T12:00:00.000Z",
  `Unexpected Johannesburg UTC time: ${johannesburg.utcDateTime}`,
);

assert(
  johannesburg.offsetMinutes === 120,
  "Johannesburg offset must be UTC+02:00.",
);

const newYorkWinter =
  convertLocalBirthTimeToUtc(
    {
      year: 2026,
      month: 1,
      day: 15,
    },
    exactTime(7, 0),
    "America/New_York",
  );

assert(
  newYorkWinter.utcDateTime ===
    "2026-01-15T12:00:00.000Z",
  "New York winter conversion failed.",
);

assert(
  newYorkWinter.offsetMinutes === -300,
  "New York winter offset must be UTC-05:00.",
);

const newYorkSummer =
  convertLocalBirthTimeToUtc(
    {
      year: 2026,
      month: 7,
      day: 15,
    },
    exactTime(8, 0),
    "America/New_York",
  );

assert(
  newYorkSummer.utcDateTime ===
    "2026-07-15T12:00:00.000Z",
  "New York summer conversion failed.",
);

assert(
  newYorkSummer.offsetMinutes === -240,
  "New York summer offset must be UTC-04:00.",
);

let nonexistentRejected = false;

try {
  convertLocalBirthTimeToUtc(
    {
      year: 2026,
      month: 3,
      day: 8,
    },
    exactTime(2, 30),
    "America/New_York",
  );
} catch (error) {
  nonexistentRejected =
    error instanceof
      LocalTimeConversionError &&
    error.code ===
      "nonexistent-local-time";
}

assert(
  nonexistentRejected,
  "A nonexistent DST local time must be rejected.",
);

let ambiguousRejected = false;

try {
  convertLocalBirthTimeToUtc(
    {
      year: 2026,
      month: 11,
      day: 1,
    },
    exactTime(1, 30),
    "America/New_York",
  );
} catch (error) {
  ambiguousRejected =
    error instanceof
      LocalTimeConversionError &&
    error.code ===
      "ambiguous-local-time";
}

assert(
  ambiguousRejected,
  "An ambiguous DST local time must be rejected.",
);

console.log(
  "Zodiac UTC conversion validation passed.",
);
