import type {
  AssessmentDimensionAggregate,
  AssessmentEngineIssue,
} from "../engine";

export const PERSONALITY_DIMENSIONS = [
  "EI",
  "SN",
  "TF",
  "JP",
] as const;

export type PersonalityDimension =
  (typeof PERSONALITY_DIMENSIONS)[number];

export type PersonalityPole =
  | "E"
  | "I"
  | "S"
  | "N"
  | "T"
  | "F"
  | "J"
  | "P";

export type PersonalityType =
  `${"E" | "I"}${"S" | "N"}${"T" | "F"}${"J" | "P"}`;

export interface PersonalityDimensionInterpretation {
  dimension: PersonalityDimension;

  firstPole: PersonalityPole;
  secondPole: PersonalityPole;

  preferredPole: PersonalityPole;
  oppositePole: PersonalityPole;

  firstPolePercentage: number;
  secondPolePercentage: number;

  preferredPercentage: number;
  oppositePercentage: number;
  preferenceStrength: number;

  tied: boolean;

  aggregate: AssessmentDimensionAggregate;
}

export interface PersonalityInterpretationSuccess {
  valid: true;
  type: PersonalityType;
  dimensions: Readonly<
    Record<
      PersonalityDimension,
      PersonalityDimensionInterpretation
    >
  >;
  issues: readonly [];
}

export interface PersonalityInterpretationFailure {
  valid: false;
  type: null;
  dimensions: Readonly<
    Partial<
      Record<
        PersonalityDimension,
        PersonalityDimensionInterpretation
      >
    >
  >;
  issues: readonly AssessmentEngineIssue[];
}

export type PersonalityInterpretationResult =
  | PersonalityInterpretationSuccess
  | PersonalityInterpretationFailure;
