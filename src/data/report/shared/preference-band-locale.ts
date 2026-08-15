import {
  resolvePreferenceBandVariable,
  type PreferenceDirection,
} from "./preference-band-content";
import {
  GLOBAL_PREFERENCE_BAND_CONTENT_EN,
  PREFERENCE_CLARITY_LABEL_EN,
} from "./preference-band-content-en";
import type {
  PreferenceClarityBand,
} from "./preference-clarity";

export type PersonalityReportLocale =
  | "en"
  | "zh";

export interface LocalizedPreferenceBandVariable {
  readonly direction: PreferenceDirection;
  readonly clarity: number;
  readonly band: PreferenceClarityBand;
  readonly bandLabel: string;
  readonly content: string;
}

/**
 * Resolve one Preference Clarity variable for report content.
 *
 * Locale affects presentation content only.
 * It does not affect:
 * - preference direction;
 * - clarity value;
 * - Band classification;
 * - Profile routing.
 */
export function resolvePreferenceBandVariableForLocale(
  direction: PreferenceDirection,
  clarity: number,
  locale: PersonalityReportLocale,
): LocalizedPreferenceBandVariable {
  const base =
    resolvePreferenceBandVariable(
      direction,
      clarity,
    );

  if (locale === "zh") {
    return {
      direction: base.direction,
      clarity: base.clarity,
      band: base.band,
      bandLabel: base.bandLabelZh,
      content: base.content,
    };
  }

  if (locale === "en") {
    return {
      direction: base.direction,
      clarity: base.clarity,
      band: base.band,
      bandLabel:
        PREFERENCE_CLARITY_LABEL_EN[
          base.band
        ],
      content:
        GLOBAL_PREFERENCE_BAND_CONTENT_EN[
          direction
        ][base.band],
    };
  }

  throw new TypeError(
    `Unsupported personality report locale: ${String(locale)}`,
  );
}
