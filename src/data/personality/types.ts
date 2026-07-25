import type {
  ContentAccess,
  LocalizedStringList,
  LocalizedText,
} from "../shared";

export const personalityTypeCodes = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

export type PersonalityTypeCode =
  (typeof personalityTypeCodes)[number];

export type PersonalityTrait = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type PersonalityStrength = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type PersonalityGrowthRisk = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  growthAction: LocalizedText;
};

export type CareerGroup = {
  id: string;
  category: LocalizedText;
  description: LocalizedText;
  roles: LocalizedStringList;
};

export type PremiumSectionPreview = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  access: Extract<ContentAccess, "premium">;
};

export type PersonalityProfile = {
  schemaVersion: "1.0.0";
  type: PersonalityTypeCode;

  identity: {
    name: LocalizedText;
    shortName: LocalizedText;
    tagline: LocalizedText;
    keywords: LocalizedStringList;
  };

  overview: {
    headline: LocalizedText;
    paragraphs: Partial<Record<"en" | "zh", string[]>>;
    summary: LocalizedText;
    access: Extract<ContentAccess, "free">;
  };

  coreTraits: PersonalityTrait[];
  strengths: PersonalityStrength[];
  growthRisks: PersonalityGrowthRisk[];
  careerGroups: CareerGroup[];

  careerNotice: LocalizedText;

  premiumPreview: {
    headline: LocalizedText;
    introduction: LocalizedText;
    sections: PremiumSectionPreview[];
    callToAction: LocalizedText;
  };

  metadata: {
    assessmentModel: "MBTI_STYLE";
    contentVersion: string;
    reviewed: boolean;
    availableLocales: Array<"en" | "zh">;
  };
};
