import type { AssessmentModule } from "../assessment/questions/schema";

export const KIDS_ASSESSMENT_MODULE =
  "kids" as const satisfies AssessmentModule;

export const KIDS_FORMS = [
  "k68",
  "k912",
] as const;

export type KidsForm =
  (typeof KIDS_FORMS)[number];

export const KIDS_DOMAINS = [
  "create",
  "discover",
  "build",
  "think",
  "connect",
  "lead",
  "move",
  "express",
] as const;

export type KidsDomain =
  (typeof KIDS_DOMAINS)[number];

export const KIDS_DOMAIN_LABELS = {
  create: "Create",
  discover: "Discover",
  build: "Build",
  think: "Think",
  connect: "Connect",
  lead: "Lead",
  move: "Move",
  express: "Express",
} as const satisfies Readonly<Record<KidsDomain, string>>;

export const KIDS_RELEASE_IDS = [
  "KIDS-K68-RF-V1",
  "KIDS-K912-RF-V1",
] as const;

export type KidsReleaseId =
  (typeof KIDS_RELEASE_IDS)[number];

export interface KidsReleaseFormConfig {
  readonly form: KidsForm;
  readonly releaseId: KidsReleaseId;
  readonly ageMin: number;
  readonly ageMax: number;
  readonly scoredItemCount: number;
  readonly scoredItemsPerDomain: number;
}

export const KIDS_RELEASE_FORMS = {
  k68: {
    form: "k68",
    releaseId: "KIDS-K68-RF-V1",
    ageMin: 6,
    ageMax: 8,
    scoredItemCount: 32,
    scoredItemsPerDomain: 4,
  },
  k912: {
    form: "k912",
    releaseId: "KIDS-K912-RF-V1",
    ageMin: 9,
    ageMax: 12,
    scoredItemCount: 40,
    scoredItemsPerDomain: 5,
  },
} as const satisfies Readonly<Record<KidsForm, KidsReleaseFormConfig>>;

export const KIDS_SCORING_VERSION = "KIDS-SCORING-V1" as const;

export const KIDS_RESPONSE_CONTRACT_VERSION =
  "KIDS-RESPONSE-V1" as const;

export type KidsResponseValue =
  | 1
  | 2
  | 3
  | 4
  | 5;

export interface KidsLocalizedText {
  readonly en: string;
  readonly zh: string;
}

export interface KidsResponseOption {
  readonly value: KidsResponseValue;
  readonly label: KidsLocalizedText;
}

export interface KidsResponseContract {
  readonly form: KidsForm;
  readonly values: readonly KidsResponseValue[];
  readonly prompt: KidsLocalizedText;
  readonly options: readonly KidsResponseOption[];
}

export const KIDS_RESPONSE_CONTRACTS = {
  k68: {
    form: "k68",
    values: [1, 3, 5],
    prompt: {
      en: "Would you like to try this?",
      zh: "你想试试看吗？",
    },
    options: [
      {
        value: 1,
        label: {
          en: "Not really",
          zh: "不太想试试",
        },
      },
      {
        value: 3,
        label: {
          en: "Not sure yet",
          zh: "还不确定",
        },
      },
      {
        value: 5,
        label: {
          en: "I'd like to try",
          zh: "很想试试",
        },
      },
    ],
  },
  k912: {
    form: "k912",
    values: [1, 2, 3, 4, 5],
    prompt: {
      en: "How interested are you?",
      zh: "你有多感兴趣？",
    },
    options: [
      {
        value: 1,
        label: {
          en: "Not interested",
          zh: "不感兴趣",
        },
      },
      {
        value: 2,
        label: {
          en: "A little interested",
          zh: "有一点兴趣",
        },
      },
      {
        value: 3,
        label: {
          en: "Maybe / Not sure",
          zh: "一般 / 不确定",
        },
      },
      {
        value: 4,
        label: {
          en: "Interested",
          zh: "感兴趣",
        },
      },
      {
        value: 5,
        label: {
          en: "Very interested",
          zh: "非常感兴趣",
        },
      },
    ],
  },
} as const satisfies Readonly<
  Record<KidsForm, KidsResponseContract>
>;

export function getKidsResponseContract(
  form: KidsForm,
): KidsResponseContract {
  return KIDS_RESPONSE_CONTRACTS[form];
}

export function isKidsResponseValueAllowed(
  form: KidsForm,
  value: number,
): value is KidsResponseValue {
  return (
    KIDS_RESPONSE_CONTRACTS[
      form
    ].values as readonly number[]
  ).includes(value);
}

export function getKidsReleaseForm(
  form: KidsForm,
): KidsReleaseFormConfig {
  return KIDS_RELEASE_FORMS[form];
}
