import type {
  BirthDate,
  BirthTime,
} from "../birth-contract";

export type LocalTimeConversionErrorCode =
  | "invalid-date"
  | "invalid-time-zone"
  | "nonexistent-local-time"
  | "ambiguous-local-time";

export class LocalTimeConversionError extends Error {
  readonly code: LocalTimeConversionErrorCode;

  constructor(
    code: LocalTimeConversionErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "LocalTimeConversionError";
    this.code = code;
  }
}

interface LocalDateTimeParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface UtcConversionResult {
  localDateTime: string;
  utcDateTime: string;
  utcDate: Date;
  timeZone: string;
  offsetMinutes: number;
}

function pad(
  value: number,
  length = 2,
): string {
  return String(value).padStart(length, "0");
}

function toLocalIsoString(
  parts: LocalDateTimeParts,
): string {
  return [
    `${pad(parts.year, 4)}-${pad(parts.month)}-${pad(parts.day)}`,
    `${pad(parts.hour)}:${pad(parts.minute)}:${pad(parts.second)}`,
  ].join("T");
}

function assertValidTimeZone(
  timeZone: string,
): void {
  try {
    new Intl.DateTimeFormat("en", {
      timeZone,
    }).format(new Date());
  } catch {
    throw new LocalTimeConversionError(
      "invalid-time-zone",
      `Invalid IANA time zone: ${timeZone}.`,
    );
  }
}

function getZonedParts(
  date: Date,
  timeZone: string,
): LocalDateTimeParts {
  const formatter =
    new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });

  const values =
    Object.fromEntries(
      formatter
        .formatToParts(date)
        .filter(
          (part) =>
            part.type !== "literal",
        )
        .map(
          (part) => [
            part.type,
            part.value,
          ],
        ),
    );

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

function partsEqual(
  left: LocalDateTimeParts,
  right: LocalDateTimeParts,
): boolean {
  return (
    left.year === right.year &&
    left.month === right.month &&
    left.day === right.day &&
    left.hour === right.hour &&
    left.minute === right.minute &&
    left.second === right.second
  );
}

function getOffsetMinutes(
  date: Date,
  timeZone: string,
): number {
  const parts =
    getZonedParts(date, timeZone);

  const representedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );

  return Math.round(
    (representedAsUtc - date.getTime()) /
      60_000,
  );
}

function createLocalParts(
  date: BirthDate,
  time: BirthTime,
): LocalDateTimeParts {
  return {
    year: date.year,
    month: date.month,
    day: date.day,
    hour: time.hour,
    minute: time.minute,
    second: time.second,
  };
}

function validateNaiveDate(
  parts: LocalDateTimeParts,
): number {
  const timestamp = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );

  const reconstructed =
    new Date(timestamp);

  const valid =
    reconstructed.getUTCFullYear() ===
      parts.year &&
    reconstructed.getUTCMonth() + 1 ===
      parts.month &&
    reconstructed.getUTCDate() ===
      parts.day &&
    reconstructed.getUTCHours() ===
      parts.hour &&
    reconstructed.getUTCMinutes() ===
      parts.minute &&
    reconstructed.getUTCSeconds() ===
      parts.second;

  if (!valid) {
    throw new LocalTimeConversionError(
      "invalid-date",
      "The supplied local date and time are invalid.",
    );
  }

  return timestamp;
}

function findMatchingUtcDates(
  parts: LocalDateTimeParts,
  timeZone: string,
): Date[] {
  const naiveTimestamp =
    validateNaiveDate(parts);

  const offsetSamples = new Set<number>();

  for (
    const hourDifference of [
      -48,
      -36,
      -24,
      -12,
      0,
      12,
      24,
      36,
      48,
    ]
  ) {
    const sampleDate = new Date(
      naiveTimestamp +
        hourDifference *
          60 *
          60 *
          1000,
    );

    offsetSamples.add(
      getOffsetMinutes(
        sampleDate,
        timeZone,
      ),
    );
  }

  const matchingDates: Date[] = [];

  for (const offset of offsetSamples) {
    const candidate = new Date(
      naiveTimestamp -
        offset * 60_000,
    );

    if (
      partsEqual(
        getZonedParts(
          candidate,
          timeZone,
        ),
        parts,
      )
    ) {
      matchingDates.push(candidate);
    }
  }

  const uniqueDates =
    new Map<number, Date>();

  for (const date of matchingDates) {
    uniqueDates.set(
      date.getTime(),
      date,
    );
  }

  return [...uniqueDates.values()].sort(
    (left, right) =>
      left.getTime() -
      right.getTime(),
  );
}

export function convertLocalBirthTimeToUtc(
  date: BirthDate,
  time: BirthTime,
  timeZone: string,
): UtcConversionResult {
  assertValidTimeZone(timeZone);

  if (time.precision === "unknown") {
    throw new LocalTimeConversionError(
      "invalid-date",
      "Unknown birth time cannot be converted to an exact UTC instant.",
    );
  }

  const localParts =
    createLocalParts(date, time);

  const candidates =
    findMatchingUtcDates(
      localParts,
      timeZone,
    );

  if (candidates.length === 0) {
    throw new LocalTimeConversionError(
      "nonexistent-local-time",
      `The local time ${toLocalIsoString(
        localParts,
      )} does not exist in ${timeZone}.`,
    );
  }

  if (candidates.length > 1) {
    throw new LocalTimeConversionError(
      "ambiguous-local-time",
      `The local time ${toLocalIsoString(
        localParts,
      )} occurs more than once in ${timeZone}.`,
    );
  }

  const utcDate = candidates[0];

  return {
    localDateTime:
      toLocalIsoString(localParts),
    utcDateTime:
      utcDate.toISOString(),
    utcDate,
    timeZone,
    offsetMinutes:
      getOffsetMinutes(
        utcDate,
        timeZone,
      ),
  };
}
