import type {
  PreferenceClarityBand,
} from "../shared/preference-clarity";
import {
  PERSONALITY_DIMENSION_ORDER,
  type PersonalityPreferenceBandVariables,
} from "./preference-band-variables";

export const PERSONALITY_REPORT_PROFILES = [
  "A",
  "B",
  "C",
  "D",
] as const;

export type PersonalityReportProfile =
  (typeof PERSONALITY_REPORT_PROFILES)[number];

const PROFILE_BY_MINIMUM_BAND = {
  "near-boundary": "A",
  "moderate-preference": "B",
  "clear-preference": "C",
  "highly-clear": "D",
} as const satisfies Readonly<
  Record<PreferenceClarityBand, PersonalityReportProfile>
>;

const BAND_RANK = {
  "near-boundary": 1,
  "moderate-preference": 2,
  "clear-preference": 3,
  "highly-clear": 4,
} as const satisfies Readonly<
  Record<PreferenceClarityBand, number>
>;

/**
 * Resolves the fixed customer-report profile from the four independent
 * preference-clarity bands.
 *
 * Profile routing is deterministic:
 *
 * A = at least one Near Boundary band
 * B = no Near Boundary, at least one Moderate Preference band
 * C = all bands at least Clear Preference, at least one Clear Preference
 * D = all four bands Highly Clear
 *
 * A/B/C/D are report interpretation paths only. They are not levels of
 * ability, maturity, quality, value, or psychological development.
 */
export function resolvePersonalityReportProfile(
  variables: PersonalityPreferenceBandVariables,
): PersonalityReportProfile {
  let minimumBand: PreferenceClarityBand | null = null;
  let minimumRank = Number.POSITIVE_INFINITY;

  for (const dimension of PERSONALITY_DIMENSION_ORDER) {
    const band = variables[dimension].band;
    const rank = BAND_RANK[band];

    if (rank < minimumRank) {
      minimumRank = rank;
      minimumBand = band;
    }
  }

  if (!minimumBand) {
    throw new Error(
      "Unable to resolve personality report profile from preference bands.",
    );
  }

  return PROFILE_BY_MINIMUM_BAND[minimumBand];
}
