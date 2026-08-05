import {
  STATIC_LOCATION_RECORDS,
} from "@/shared/location";

import type {
  BirthLocation,
} from "./birth-contract";

export interface ZodiacLocationOption {
  id: string;
  label: string;
  location: BirthLocation;
  timeZone: string;
}

/**
 * Backward-compatible projection of the shared location catalog.
 * New location-search consumers should import from @/shared/location.
 */
export const ZODIAC_LOCATION_OPTIONS:
  readonly ZodiacLocationOption[] = Object.freeze(
    STATIC_LOCATION_RECORDS.map((record) => ({
      id: record.id,
      label: record.displayName,
      location: {
        displayName: record.displayName,
        city: record.city,
        region: record.region,
        countryCode: record.countryCode,
        latitude: record.latitude,
        longitude: record.longitude,
      },
      timeZone: record.timeZone,
    })),
  );

export function getZodiacLocationOption(
  id: string,
): ZodiacLocationOption | undefined {
  return ZODIAC_LOCATION_OPTIONS.find((option) => option.id === id);
}
