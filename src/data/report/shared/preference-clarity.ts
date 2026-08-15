export type PreferenceClarityBand =
  | "near-boundary"
  | "moderate-preference"
  | "clear-preference"
  | "highly-clear";

export function resolvePreferenceClarityBand(
  clarity: number,
): PreferenceClarityBand {
  if (
    !Number.isFinite(clarity) ||
    clarity < 0 ||
    clarity > 100
  ) {
    throw new RangeError(
      "Preference clarity must be a finite number from 0 to 100.",
    );
  }

  if (clarity <= 25) {
    return "near-boundary";
  }
  if (clarity <= 50) {
    return "moderate-preference";
  }
  if (clarity <= 75) {
    return "clear-preference";
  }
  return "highly-clear";
}
