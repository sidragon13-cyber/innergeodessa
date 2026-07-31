import type {
  BirthTimePrecision,
  ZodiacLocale,
} from "./types";

export interface BirthDate {
  year: number;
  month: number;
  day: number;
}

export interface BirthTime {
  hour: number;
  minute: number;
  second: number;
  precision: BirthTimePrecision;
}

export interface BirthLocation {
  displayName: string;
  city: string | null;
  region: string | null;
  countryCode: string;
  latitude: number;
  longitude: number;
}

export interface BirthDataInput {
  date: BirthDate;
  time: BirthTime | null;
  location: BirthLocation | null;

  /**
   * IANA time-zone identifier, for example:
   * "Africa/Johannesburg".
   */
  timeZone: string | null;

  locale: ZodiacLocale;
}

export interface NormalizedBirthData {
  localDateTime: string;
  utcDateTime: string | null;
  date: BirthDate;
  time: BirthTime | null;
  location: BirthLocation | null;
  timeZone: string | null;
  locale: ZodiacLocale;
}
