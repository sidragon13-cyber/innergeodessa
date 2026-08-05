import {
  normalizeLocationSearchText,
} from "./normalization";
import type {
  LocationProvider,
} from "./provider";
import {
  staticLocationProvider,
} from "./static-provider";
import type {
  LocationRecord,
} from "./types";

function fieldScore(
  value: string,
  query: string,
): number | null {
  const normalized = normalizeLocationSearchText(value);

  if (normalized === query) {
    return 0;
  }

  if (normalized.startsWith(query)) {
    return 1;
  }

  if (normalized.includes(query)) {
    return 2;
  }

  return null;
}

export function rankLocationRecords(
  locations: readonly LocationRecord[],
  query: string,
): readonly LocationRecord[] {
  const normalizedQuery = normalizeLocationSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  return locations
    .map((location) => {
      const nameScore = Math.min(
        ...[location.city, location.displayName]
          .map((value) => fieldScore(value, normalizedQuery))
          .filter((score): score is number => score !== null),
      );
      const aliasScore = Math.min(
        ...location.aliases
          .map((value) => fieldScore(value, normalizedQuery))
          .filter((score): score is number => score !== null),
      );
      const countryScore = Math.min(
        ...[location.country, location.countryCode]
          .map((value) => fieldScore(value, normalizedQuery))
          .filter((score): score is number => score !== null),
      );
      const scores = [
        Number.isFinite(nameScore) ? nameScore : null,
        Number.isFinite(aliasScore) ? aliasScore + 10 : null,
        Number.isFinite(countryScore) ? countryScore + 20 : null,
      ].filter((score): score is number => score !== null);

      return {
        location,
        score: scores.length > 0 ? Math.min(...scores) : null,
      };
    })
    .filter(
      (entry): entry is { location: LocationRecord; score: number } =>
        entry.score !== null,
    )
    .sort(
      (first, second) =>
        first.score - second.score ||
        first.location.displayName.localeCompare(
          second.location.displayName,
        ),
    )
    .map(({ location }) => location);
}

export function searchLocations(
  query: string,
  provider: LocationProvider = staticLocationProvider,
): Promise<readonly LocationRecord[]> {
  return provider.search(query);
}
