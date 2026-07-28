import type {
  PersonalityTypeCode,
} from "../../personality/types";
import type { LocalizedText } from "../../shared";
import type {
  ReportContentBlockType,
} from "../types";

export const DIMENSION_CODES = [
  "EI",
  "SN",
  "TF",
  "JP",
] as const;

export type DimensionCode =
  (typeof DIMENSION_CODES)[number];

export interface DimensionResult {
  dimension: DimensionCode;
  score: number;
  confidence: number;
}

export interface ReportRuleInput {
  personalityType: PersonalityTypeCode;
  dimensions: Record<DimensionCode, DimensionResult>;
}

export type DimensionBand =
  | "balanced"
  | "borderline"
  | "moderate"
  | "strong"
  | "very-strong";

export type PreferenceLetter =
  | "E"
  | "I"
  | "S"
  | "N"
  | "T"
  | "F"
  | "J"
  | "P"
  | "X";

export interface AnalysedDimension extends DimensionResult {
  preference: PreferenceLetter;
  oppositePreference: PreferenceLetter;
  band: DimensionBand;
}

export interface AnalysedRuleInput {
  personalityType: PersonalityTypeCode;
  dimensions: Record<DimensionCode, AnalysedDimension>;
  averageConfidence: number;
  lowConfidenceCount: number;
  balancedCount: number;
}

export type RulePriority = number;

export interface ReportRuleContent {
  targetSectionId: string;
  targetSlotId: string;
  blockId: string;
  blockType: ReportContentBlockType;
  content: LocalizedText;
  title?: LocalizedText;
}

export interface DimensionRuleCondition {
  kind: "dimension";
  dimension: DimensionCode;
  preferences?: PreferenceLetter[];
  bands?: DimensionBand[];
  minConfidence?: number;
  maxConfidence?: number;
}

export interface AggregateRuleCondition {
  kind: "aggregate";
  metric:
    | "average-confidence"
    | "low-confidence-count"
    | "balanced-count";
  operator: "eq" | "gte" | "lte";
  value: number;
}

export interface CombinationRuleCondition {
  kind: "combination";
  all: DimensionRuleCondition[];
}

export type ReportRuleCondition =
  | DimensionRuleCondition
  | AggregateRuleCondition
  | CombinationRuleCondition;

export interface ReportRuleDefinition {
  id: string;
  personalityType: PersonalityTypeCode;
  priority: RulePriority;
  conditions: ReportRuleCondition[];
  content: ReportRuleContent[];
  exclusiveGroup?: string;
  tags?: string[];
}

export interface SelectedReportRule {
  ruleId: string;
  priority: RulePriority;
  content: ReportRuleContent[];
  matchedConditions: ReportRuleCondition[];
}
