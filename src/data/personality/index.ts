import { entjProfile } from "./entj";
import { intjProfile } from "./intj";

import type {
  PersonalityProfile,
  PersonalityTypeCode,
} from "./types";

export const personalityProfiles: Partial<
  Record<PersonalityTypeCode, PersonalityProfile>
> = {
  ENTJ: entjProfile,
  INTJ: intjProfile,
};

export function getPersonalityProfile(
  type: string | null | undefined,
): PersonalityProfile | null {
  if (!type) {
    return null;
  }

  const normalisedType =
    type.trim().toUpperCase() as PersonalityTypeCode;

  return personalityProfiles[normalisedType] ?? null;
}

export { personalityTypeCodes } from "./types";

export type {
  CareerGroup,
  PersonalityGrowthRisk,
  PersonalityProfile,
  PersonalityStrength,
  PersonalityTrait,
  PersonalityTypeCode,
  PremiumSectionPreview,
} from "./types";
