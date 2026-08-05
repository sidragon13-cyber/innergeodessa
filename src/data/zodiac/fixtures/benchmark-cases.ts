import type {
  BirthDataInput,
} from "../birth-contract";

import type {
  ZodiacSign,
} from "../types";

export const zodiacBenchmarkPointCodes = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "ascendant",
  "midheaven",
] as const;

export type ZodiacBenchmarkPointCode =
  (typeof zodiacBenchmarkPointCodes)[number];

export interface ZodiacBenchmarkPosition {
  sign: ZodiacSign;
  absoluteLongitude: number;

  /**
   * Maximum accepted difference from the external
   * reference longitude, measured in decimal degrees.
   */
  toleranceDegrees: number;
}

export interface ZodiacBenchmarkReference {
  source:
    | "astro-com"
    | "timepassages"
    | "cafe-astrology"
    | "manual-reference";

  checkedAt: string;
  notes?: string;

  utcDateTime: string;
  offsetMinutes: number;

  positions: Partial<
    Record<
      ZodiacBenchmarkPointCode,
      ZodiacBenchmarkPosition
    >
  >;
}

export interface ZodiacBenchmarkCase {
  id: string;
  description: string;
  coverage: readonly string[];
  input: BirthDataInput;

  /**
   * Remains null until the case has been manually
   * checked against an external reference platform.
   */
  reference: ZodiacBenchmarkReference | null;
}

export const ZODIAC_BENCHMARK_CASES:
  readonly ZodiacBenchmarkCase[] = Object.freeze([
    {
      id: "johannesburg-standard-time",
      description:
        "Southern Hemisphere baseline with a stable UTC+2 time zone.",
      coverage: [
        "Southern Hemisphere",
        "Africa",
        "UTC+2",
        "planet positions",
        "ascendant",
        "midheaven",
      ],
      input: {
        date: {
          year: 2026,
          month: 7,
          day: 30,
        },
        time: {
          hour: 14,
          minute: 0,
          second: 0,
          precision: "exact",
        },
        location: {
          displayName:
            "Johannesburg, South Africa",
          city: "Johannesburg",
          region: "Gauteng",
          countryCode: "ZA",
          latitude: -26.2041,
          longitude: 28.0473,
        },
        timeZone:
          "Africa/Johannesburg",
        locale: "en",
      },
      reference: null,
    },

    {
      id: "beijing-east-longitude",
      description:
        "Northern Hemisphere case in East Asia using China Standard Time.",
      coverage: [
        "Northern Hemisphere",
        "East longitude",
        "UTC+8",
        "Asia",
      ],
      input: {
        date: {
          year: 1990,
          month: 6,
          day: 15,
        },
        time: {
          hour: 9,
          minute: 30,
          second: 0,
          precision: "exact",
        },
        location: {
          displayName:
            "Beijing, China",
          city: "Beijing",
          region: "Beijing",
          countryCode: "CN",
          latitude: 39.9042,
          longitude: 116.4074,
        },
        timeZone:
          "Asia/Shanghai",
        locale: "en",
      },
      reference: null,
    },

    {
      id: "london-summer-time",
      description:
        "European daylight-saving case during British Summer Time.",
      coverage: [
        "Northern Hemisphere",
        "Europe",
        "daylight saving time",
        "near Greenwich",
      ],
      input: {
        date: {
          year: 2000,
          month: 7,
          day: 1,
        },
        time: {
          hour: 18,
          minute: 45,
          second: 0,
          precision: "exact",
        },
        location: {
          displayName:
            "London, United Kingdom",
          city: "London",
          region: "England",
          countryCode: "GB",
          latitude: 51.5074,
          longitude: -0.1278,
        },
        timeZone:
          "Europe/London",
        locale: "en",
      },
      reference: null,
    },

    {
      id: "new-york-summer-time",
      description:
        "North American daylight-saving case using Eastern Daylight Time.",
      coverage: [
        "Northern Hemisphere",
        "West longitude",
        "North America",
        "daylight saving time",
      ],
      input: {
        date: {
          year: 1985,
          month: 8,
          day: 20,
        },
        time: {
          hour: 23,
          minute: 50,
          second: 0,
          precision: "exact",
        },
        location: {
          displayName:
            "New York, United States",
          city: "New York",
          region: "New York",
          countryCode: "US",
          latitude: 40.7128,
          longitude: -74.006,
        },
        timeZone:
          "America/New_York",
        locale: "en",
      },
      reference: null,
    },

    {
      id: "sydney-southern-dst",
      description:
        "Southern Hemisphere daylight-saving case in Australia.",
      coverage: [
        "Southern Hemisphere",
        "East longitude",
        "Australia",
        "daylight saving time",
      ],
      input: {
        date: {
          year: 2010,
          month: 1,
          day: 10,
        },
        time: {
          hour: 6,
          minute: 15,
          second: 0,
          precision: "exact",
        },
        location: {
          displayName:
            "Sydney, Australia",
          city: "Sydney",
          region: "New South Wales",
          countryCode: "AU",
          latitude: -33.8688,
          longitude: 151.2093,
        },
        timeZone:
          "Australia/Sydney",
        locale: "en",
      },
      reference: null,
    },

    {
      id: "midnight-date-boundary",
      description:
        "Birth time close to midnight to verify local-date and UTC-date boundaries.",
      coverage: [
        "midnight boundary",
        "UTC date rollover",
        "calendar conversion",
      ],
      input: {
        date: {
          year: 2024,
          month: 12,
          day: 31,
        },
        time: {
          hour: 23,
          minute: 58,
          second: 30,
          precision: "exact",
        },
        location: {
          displayName:
            "Cape Town, South Africa",
          city: "Cape Town",
          region: "Western Cape",
          countryCode: "ZA",
          latitude: -33.9249,
          longitude: 18.4241,
        },
        timeZone:
          "Africa/Johannesburg",
        locale: "en",
      },
      reference: null,
    },

    {
      id: "pre-2000-historical-timezone",
      description:
        "Historical date intended to expose time-zone database or ephemeris assumptions.",
      coverage: [
        "historical date",
        "time-zone history",
        "pre-2000 ephemeris",
      ],
      input: {
        date: {
          year: 1965,
          month: 3,
          day: 28,
        },
        time: {
          hour: 2,
          minute: 30,
          second: 0,
          precision: "exact",
        },
        location: {
          displayName:
            "London, United Kingdom",
          city: "London",
          region: "England",
          countryCode: "GB",
          latitude: 51.5074,
          longitude: -0.1278,
        },
        timeZone:
          "Europe/London",
        locale: "en",
      },
      reference: null,
    },

    {
      id: "high-latitude-oslo",
      description:
        "Higher-latitude European case for testing chart-angle stability.",
      coverage: [
        "high latitude",
        "Northern Europe",
        "ascendant stability",
        "midheaven stability",
      ],
      input: {
        date: {
          year: 1995,
          month: 11,
          day: 5,
        },
        time: {
          hour: 4,
          minute: 20,
          second: 0,
          precision: "exact",
        },
        location: {
          displayName:
            "Oslo, Norway",
          city: "Oslo",
          region: "Oslo",
          countryCode: "NO",
          latitude: 59.9139,
          longitude: 10.7522,
        },
        timeZone:
          "Europe/Oslo",
        locale: "en",
      },
      reference: null,
    },

    {
      id: "western-hemisphere-los-angeles",
      description:
        "Western North American case with a substantial negative longitude.",
      coverage: [
        "West longitude",
        "North America",
        "Pacific time",
        "planet positions",
        "chart angles",
      ],
      input: {
        date: {
          year: 1978,
          month: 2,
          day: 14,
        },
        time: {
          hour: 12,
          minute: 0,
          second: 0,
          precision: "exact",
        },
        location: {
          displayName:
            "Los Angeles, United States",
          city: "Los Angeles",
          region: "California",
          countryCode: "US",
          latitude: 34.0522,
          longitude: -118.2437,
        },
        timeZone:
          "America/Los_Angeles",
        locale: "en",
      },
      reference: null,
    },

    {
      id: "equatorial-singapore",
      description:
        "Near-equatorial case intended to test chart-angle calculations away from mid-latitudes.",
      coverage: [
        "near equator",
        "Southeast Asia",
        "UTC+8",
        "chart angles",
      ],
      input: {
        date: {
          year: 2005,
          month: 9,
          day: 9,
        },
        time: {
          hour: 9,
          minute: 9,
          second: 9,
          precision: "exact",
        },
        location: {
          displayName:
            "Singapore",
          city: "Singapore",
          region: "Singapore",
          countryCode: "SG",
          latitude: 1.3521,
          longitude: 103.8198,
        },
        timeZone:
          "Asia/Singapore",
        locale: "en",
      },
      reference: null,
    },
  ]);
