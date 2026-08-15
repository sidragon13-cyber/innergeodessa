import type {
  PersonalityTypeCode,
} from "../../personality/types";
import type {
  DimensionCode,
  DimensionResult,
} from "../rules/types";
import {
  resolvePreferenceBandVariable,
  type PreferenceBandVariable,
  type PreferenceDirection,
} from "../shared/preference-band-content";

export const PERSONALITY_DIMENSION_ORDER = [
  "EI",
  "SN",
  "TF",
  "JP",
] as const satisfies readonly DimensionCode[];

export type PersonalityPreferenceBandVariables = Readonly<
  Record<DimensionCode, PreferenceBandVariable>
>;

export function resolvePersonalityPreferenceBandVariables(
  personalityType: PersonalityTypeCode,
  dimensions: Record<DimensionCode, DimensionResult>,
): PersonalityPreferenceBandVariables {
  const directions = getPreferenceDirections(personalityType);

  return {
    EI: resolvePreferenceBandVariable(
      directions.EI,
      dimensions.EI.confidence,
    ),
    SN: resolvePreferenceBandVariable(
      directions.SN,
      dimensions.SN.confidence,
    ),
    TF: resolvePreferenceBandVariable(
      directions.TF,
      dimensions.TF.confidence,
    ),
    JP: resolvePreferenceBandVariable(
      directions.JP,
      dimensions.JP.confidence,
    ),
  };
}

function getPreferenceDirections(
  personalityType: PersonalityTypeCode,
): Readonly<Record<DimensionCode, PreferenceDirection>> {
  const [ei, sn, tf, jp] = personalityType;

  return {
    EI: assertPreferenceDirection(ei),
    SN: assertPreferenceDirection(sn),
    TF: assertPreferenceDirection(tf),
    JP: assertPreferenceDirection(jp),
  };
}

function assertPreferenceDirection(
  value: string,
): PreferenceDirection {
  if (
    value === "I" ||
    value === "E" ||
    value === "N" ||
    value === "S" ||
    value === "T" ||
    value === "F" ||
    value === "J" ||
    value === "P"
  ) {
    return value;
  }

  throw new TypeError(
    `Unsupported personality preference direction: ${value}`,
  );
}
