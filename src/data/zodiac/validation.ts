import type {
  BirthDataInput,
  BirthDate,
  BirthLocation,
  BirthTime,
} from "./birth-contract";

export interface ZodiacValidationIssue {
  path: string;
  message: string;
}

export interface ZodiacValidationResult {
  valid: boolean;
  issues: ZodiacValidationIssue[];
}

function isLeapYear(year: number): boolean {
  return (
    year % 4 === 0 &&
    (year % 100 !== 0 || year % 400 === 0)
  );
}

function daysInMonth(
  year: number,
  month: number,
): number {
  const monthLengths = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return monthLengths[month - 1] ?? 0;
}

export function validateBirthDate(
  date: BirthDate,
): ZodiacValidationIssue[] {
  const issues: ZodiacValidationIssue[] = [];

  if (
    !Number.isInteger(date.year) ||
    date.year < 1800 ||
    date.year > 2200
  ) {
    issues.push({
      path: "date.year",
      message:
        "Birth year must be an integer between 1800 and 2200.",
    });
  }

  if (
    !Number.isInteger(date.month) ||
    date.month < 1 ||
    date.month > 12
  ) {
    issues.push({
      path: "date.month",
      message:
        "Birth month must be an integer between 1 and 12.",
    });

    return issues;
  }

  const maximumDay = daysInMonth(
    date.year,
    date.month,
  );

  if (
    !Number.isInteger(date.day) ||
    date.day < 1 ||
    date.day > maximumDay
  ) {
    issues.push({
      path: "date.day",
      message:
        `Birth day must be between 1 and ${maximumDay}.`,
    });
  }

  return issues;
}

export function validateBirthTime(
  time: BirthTime,
): ZodiacValidationIssue[] {
  const issues: ZodiacValidationIssue[] = [];

  if (
    !Number.isInteger(time.hour) ||
    time.hour < 0 ||
    time.hour > 23
  ) {
    issues.push({
      path: "time.hour",
      message:
        "Birth hour must be an integer between 0 and 23.",
    });
  }

  if (
    !Number.isInteger(time.minute) ||
    time.minute < 0 ||
    time.minute > 59
  ) {
    issues.push({
      path: "time.minute",
      message:
        "Birth minute must be an integer between 0 and 59.",
    });
  }

  if (
    !Number.isInteger(time.second) ||
    time.second < 0 ||
    time.second > 59
  ) {
    issues.push({
      path: "time.second",
      message:
        "Birth second must be an integer between 0 and 59.",
    });
  }

  return issues;
}

export function validateBirthLocation(
  location: BirthLocation,
): ZodiacValidationIssue[] {
  const issues: ZodiacValidationIssue[] = [];

  if (
    !Number.isFinite(location.latitude) ||
    location.latitude < -90 ||
    location.latitude > 90
  ) {
    issues.push({
      path: "location.latitude",
      message:
        "Latitude must be between -90 and 90 degrees.",
    });
  }

  if (
    !Number.isFinite(location.longitude) ||
    location.longitude < -180 ||
    location.longitude > 180
  ) {
    issues.push({
      path: "location.longitude",
      message:
        "Longitude must be between -180 and 180 degrees.",
    });
  }

  if (
    !/^[A-Z]{2}$/.test(location.countryCode)
  ) {
    issues.push({
      path: "location.countryCode",
      message:
        "Country code must be a two-letter uppercase ISO code.",
    });
  }

  if (!location.displayName.trim()) {
    issues.push({
      path: "location.displayName",
      message:
        "Location display name is required.",
    });
  }

  return issues;
}

export function validateTimeZone(
  timeZone: string,
): ZodiacValidationIssue[] {
  try {
    new Intl.DateTimeFormat("en", {
      timeZone,
    }).format();

    return [];
  } catch {
    return [
      {
        path: "timeZone",
        message:
          "Time zone must be a valid IANA time-zone identifier.",
      },
    ];
  }
}

export function validateBirthDataInput(
  input: BirthDataInput,
): ZodiacValidationResult {
  const issues: ZodiacValidationIssue[] = [
    ...validateBirthDate(input.date),
  ];

  if (input.time) {
    issues.push(...validateBirthTime(input.time));
  }

  if (input.location) {
    issues.push(
      ...validateBirthLocation(input.location),
    );
  }

  if (input.timeZone) {
    issues.push(
      ...validateTimeZone(input.timeZone),
    );
  }

  if (input.time && !input.timeZone) {
    issues.push({
      path: "timeZone",
      message:
        "A time zone is required when a birth time is supplied.",
    });
  }

  if (
    input.time?.precision !== "unknown" &&
    input.time &&
    !input.location
  ) {
    issues.push({
      path: "location",
      message:
        "A birth location is required to calculate the ascendant.",
    });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
