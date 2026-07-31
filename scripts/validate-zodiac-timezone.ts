function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function getTimeZoneParts(
  date: Date,
  timeZone: string,
): Record<string, string> {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  return Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
}

function getOffsetMinutes(
  date: Date,
  timeZone: string,
): number {
  const parts = getTimeZoneParts(date, timeZone);

  const representedAsUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );

  return Math.round(
    (representedAsUtc - date.getTime()) / 60_000,
  );
}

const johannesburgWinter = new Date(
  "2026-07-30T12:00:00.000Z",
);

assert(
  getOffsetMinutes(
    johannesburgWinter,
    "Africa/Johannesburg",
  ) === 120,
  "Johannesburg should resolve to UTC+02:00.",
);

const newYorkWinter = new Date(
  "2026-01-15T12:00:00.000Z",
);

const newYorkSummer = new Date(
  "2026-07-15T12:00:00.000Z",
);

assert(
  getOffsetMinutes(
    newYorkWinter,
    "America/New_York",
  ) === -300,
  "New York winter offset should be UTC-05:00.",
);

assert(
  getOffsetMinutes(
    newYorkSummer,
    "America/New_York",
  ) === -240,
  "New York summer offset should be UTC-04:00.",
);

const invalidTimeZone = "Africa/NotARealCity";

let invalidRejected = false;

try {
  getOffsetMinutes(
    new Date(),
    invalidTimeZone,
  );
} catch {
  invalidRejected = true;
}

assert(
  invalidRejected,
  "Invalid IANA time zones must be rejected.",
);

console.log(
  "Zodiac timezone environment validation passed.",
);
