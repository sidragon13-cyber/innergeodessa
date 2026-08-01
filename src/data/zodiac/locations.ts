import type {
  BirthLocation,
} from "./birth-contract";

export interface ZodiacLocationOption {
  id: string;
  label: string;
  location: BirthLocation;
  timeZone: string;
}

export const ZODIAC_LOCATION_OPTIONS:
  readonly ZodiacLocationOption[] = Object.freeze([
    {
      id: "johannesburg-za",
      label: "Johannesburg, South Africa",
      location: {
        displayName:
          "Johannesburg, South Africa",
        city: "Johannesburg",
        region: "Gauteng",
        countryCode: "ZA",
        latitude: -26.2041,
        longitude: 28.0473,
      },
      timeZone: "Africa/Johannesburg",
    },
    {
      id: "cape-town-za",
      label: "Cape Town, South Africa",
      location: {
        displayName:
          "Cape Town, South Africa",
        city: "Cape Town",
        region: "Western Cape",
        countryCode: "ZA",
        latitude: -33.9249,
        longitude: 18.4241,
      },
      timeZone: "Africa/Johannesburg",
    },
    {
      id: "durban-za",
      label: "Durban, South Africa",
      location: {
        displayName:
          "Durban, South Africa",
        city: "Durban",
        region: "KwaZulu-Natal",
        countryCode: "ZA",
        latitude: -29.8587,
        longitude: 31.0218,
      },
      timeZone: "Africa/Johannesburg",
    },
    {
      id: "pretoria-za",
      label: "Pretoria, South Africa",
      location: {
        displayName:
          "Pretoria, South Africa",
        city: "Pretoria",
        region: "Gauteng",
        countryCode: "ZA",
        latitude: -25.7479,
        longitude: 28.2293,
      },
      timeZone: "Africa/Johannesburg",
    },
    {
      id: "london-gb",
      label: "London, United Kingdom",
      location: {
        displayName:
          "London, United Kingdom",
        city: "London",
        region: "England",
        countryCode: "GB",
        latitude: 51.5074,
        longitude: -0.1278,
      },
      timeZone: "Europe/London",
    },
    {
      id: "new-york-us",
      label: "New York, United States",
      location: {
        displayName:
          "New York, United States",
        city: "New York",
        region: "New York",
        countryCode: "US",
        latitude: 40.7128,
        longitude: -74.006,
      },
      timeZone: "America/New_York",
    },
    {
      id: "los-angeles-us",
      label: "Los Angeles, United States",
      location: {
        displayName:
          "Los Angeles, United States",
        city: "Los Angeles",
        region: "California",
        countryCode: "US",
        latitude: 34.0522,
        longitude: -118.2437,
      },
      timeZone: "America/Los_Angeles",
    },
    {
      id: "beijing-cn",
      label: "Beijing, China",
      location: {
        displayName:
          "Beijing, China",
        city: "Beijing",
        region: "Beijing",
        countryCode: "CN",
        latitude: 39.9042,
        longitude: 116.4074,
      },
      timeZone: "Asia/Shanghai",
    },
    {
      id: "shanghai-cn",
      label: "Shanghai, China",
      location: {
        displayName:
          "Shanghai, China",
        city: "Shanghai",
        region: "Shanghai",
        countryCode: "CN",
        latitude: 31.2304,
        longitude: 121.4737,
      },
      timeZone: "Asia/Shanghai",
    },
    {
      id: "sydney-au",
      label: "Sydney, Australia",
      location: {
        displayName:
          "Sydney, Australia",
        city: "Sydney",
        region: "New South Wales",
        countryCode: "AU",
        latitude: -33.8688,
        longitude: 151.2093,
      },
      timeZone: "Australia/Sydney",
    },
  ]);

export function getZodiacLocationOption(
  id: string,
): ZodiacLocationOption | undefined {
  return ZODIAC_LOCATION_OPTIONS.find(
    (option) => option.id === id,
  );
}
