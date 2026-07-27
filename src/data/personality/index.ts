import { enfjProfile } from "./enfj";
import { enfpProfile } from "./enfp";
import { entjProfile } from "./entj";
import { entpProfile } from "./entp";
import { esfjProfile } from "./esfj";
import { esfpProfile } from "./esfp";
import { estjProfile } from "./estj";
import { estpProfile } from "./estp";
import { infjProfile } from "./infj";
import { infpProfile } from "./infp";
import { intjProfile } from "./intj";
import { intpProfile } from "./intp";
import { isfjProfile } from "./isfj";
import { isfpProfile } from "./isfp";
import { istjProfile } from "./istj";
import { istpProfile } from "./istp";

import type {
  PersonalityProfile,
  PersonalityTypeCode,
} from "./types";

export const personalityProfiles: Record<
  PersonalityTypeCode,
  PersonalityProfile
> = {
  INTJ: intjProfile,
  INTP: intpProfile,
  ENTJ: entjProfile,
  ENTP: entpProfile,
  INFJ: infjProfile,
  INFP: infpProfile,
  ENFJ: enfjProfile,
  ENFP: enfpProfile,
  ISTJ: istjProfile,
  ISFJ: isfjProfile,
  ESTJ: estjProfile,
  ESFJ: esfjProfile,
  ISTP: istpProfile,
  ISFP: isfpProfile,
  ESTP: estpProfile,
  ESFP: esfpProfile,
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
