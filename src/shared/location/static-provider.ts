import type {
  LocationProvider,
} from "./provider";
import {
  rankLocationRecords,
} from "./search";
import type {
  LocationRecord,
} from "./types";

export const STATIC_LOCATION_RECORDS: readonly LocationRecord[] =
  Object.freeze([
    {
      id: "johannesburg-za",
      displayName: "Johannesburg, South Africa",
      city: "Johannesburg",
      region: "Gauteng",
      country: "South Africa",
      countryCode: "ZA",
      latitude: -26.2041,
      longitude: 28.0473,
      timeZone: "Africa/Johannesburg",
      aliases: ["Joburg", "Jozi"],
    },
    {
      id: "cape-town-za",
      displayName: "Cape Town, South Africa",
      city: "Cape Town",
      region: "Western Cape",
      country: "South Africa",
      countryCode: "ZA",
      latitude: -33.9249,
      longitude: 18.4241,
      timeZone: "Africa/Johannesburg",
      aliases: ["Cape"],
    },
    {
      id: "durban-za",
      displayName: "Durban, South Africa",
      city: "Durban",
      region: "KwaZulu-Natal",
      country: "South Africa",
      countryCode: "ZA",
      latitude: -29.8587,
      longitude: 31.0218,
      timeZone: "Africa/Johannesburg",
      aliases: [],
    },
    {
      id: "pretoria-za",
      displayName: "Pretoria, South Africa",
      city: "Pretoria",
      region: "Gauteng",
      country: "South Africa",
      countryCode: "ZA",
      latitude: -25.7479,
      longitude: 28.2293,
      timeZone: "Africa/Johannesburg",
      aliases: ["Tshwane"],
    },
    {
      id: "london-gb",
      displayName: "London, United Kingdom",
      city: "London",
      region: "England",
      country: "United Kingdom",
      countryCode: "GB",
      latitude: 51.5074,
      longitude: -0.1278,
      timeZone: "Europe/London",
      aliases: ["London UK"],
    },
    {
      id: "new-york-us",
      displayName: "New York, United States",
      city: "New York",
      region: "New York",
      country: "United States",
      countryCode: "US",
      latitude: 40.7128,
      longitude: -74.006,
      timeZone: "America/New_York",
      aliases: ["NYC", "New York City"],
    },
    {
      id: "los-angeles-us",
      displayName: "Los Angeles, United States",
      city: "Los Angeles",
      region: "California",
      country: "United States",
      countryCode: "US",
      latitude: 34.0522,
      longitude: -118.2437,
      timeZone: "America/Los_Angeles",
      aliases: ["LA"],
    },
    {
      id: "beijing-cn",
      displayName: "Beijing, China",
      city: "Beijing",
      region: "Beijing",
      country: "China",
      countryCode: "CN",
      latitude: 39.9042,
      longitude: 116.4074,
      timeZone: "Asia/Shanghai",
      aliases: ["Peking"],
    },
    {
      id: "shanghai-cn",
      displayName: "Shanghai, China",
      city: "Shanghai",
      region: "Shanghai",
      country: "China",
      countryCode: "CN",
      latitude: 31.2304,
      longitude: 121.4737,
      timeZone: "Asia/Shanghai",
      aliases: [],
    },
    {
      id: "sydney-au",
      displayName: "Sydney, Australia",
      city: "Sydney",
      region: "New South Wales",
      country: "Australia",
      countryCode: "AU",
      latitude: -33.8688,
      longitude: 151.2093,
      timeZone: "Australia/Sydney",
      aliases: [],
    },
    {
      id: "singapore-sg",
      displayName: "Singapore, Singapore",
      city: "Singapore",
      region: "Singapore",
      country: "Singapore",
      countryCode: "SG",
      latitude: 1.3521,
      longitude: 103.8198,
      timeZone: "Asia/Singapore",
      aliases: ["Singapore City"],
    },
  ] satisfies readonly LocationRecord[]);

export class StaticLocationProvider implements LocationProvider {
  constructor(
    private readonly locations: readonly LocationRecord[] =
      STATIC_LOCATION_RECORDS,
  ) {}

  async search(query: string): Promise<readonly LocationRecord[]> {
    return rankLocationRecords(this.locations, query);
  }

  async findById(id: string): Promise<LocationRecord | undefined> {
    return this.locations.find((location) => location.id === id);
  }

  async list(): Promise<readonly LocationRecord[]> {
    return this.locations;
  }
}

export const staticLocationProvider = new StaticLocationProvider();
