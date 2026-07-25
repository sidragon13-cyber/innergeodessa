import type { SupportedLocale } from "../../shared/localization";

export type AssessmentModule =
  | "personality"
  | "riasec"
  | "zodiac";

export type AssessmentQuestionStatus =
  | "draft"
  | "review"
  | "published"
  | "retired";

export type AssessmentQuestionId = string;

export type RequiredLocalizedText = Record<
  SupportedLocale,
  string
>;

export interface AssessmentOption {
  value: number;
  label: RequiredLocalizedText;
}

export interface AssessmentQuestionMetadata {
  contentVersion: string;
  status: AssessmentQuestionStatus;
  reviewed: boolean;
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
}

export interface AssessmentQuestion {
  id: AssessmentQuestionId;
  module: AssessmentModule;
  order: number;
  dimension: string;
  reverseScored: boolean;
  prompt: RequiredLocalizedText;
  options: readonly AssessmentOption[];
  metadata: AssessmentQuestionMetadata;
}
