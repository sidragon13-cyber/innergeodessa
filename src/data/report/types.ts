import type {
  PersonalityTypeCode,
} from "../personality/types";
import type { LocalizedText } from "../shared";

export interface ReportVersion {
  reportVersion: string;
  contentVersion: string;
  ruleVersion: string;
}

export type ReportAccess = "free" | "premium";

export type ReportSectionCategory =
  | "identity"
  | "overview"
  | "dimensions"
  | "strengths"
  | "growth-risks"
  | "core-pattern"
  | "motivation"
  | "information-processing"
  | "decision-making"
  | "communication"
  | "teamwork-leadership"
  | "career"
  | "relationships"
  | "change-adaptation"
  | "stress-recovery"
  | "growth-roadmap"
  | "action-plan"
  | "methodology";

export type ReportContentBlockType =
  | "summary"
  | "analysis"
  | "evidence"
  | "strength"
  | "risk"
  | "guidance"
  | "example"
  | "reflection"
  | "action";

export interface ReportRuleReference {
  ruleId: string;
  required: boolean;
}

export type ReportDimension = "EI" | "SN" | "TF" | "JP";

export interface ReportDynamicSlot {
  id: string;
  source:
    | "dimension"
    | "confidence"
    | "combination"
    | "response-pattern";
  dimensions?: ReportDimension[];
  ruleIds?: string[];
}

export interface ReportContentBlock {
  id: string;
  type: ReportContentBlockType;
  title?: LocalizedText;
  content: LocalizedText;
  dynamicSlots?: ReportDynamicSlot[];
  ruleReferences?: ReportRuleReference[];
}

export interface ReportSectionDefinition {
  id: string;
  order: number;
  category: ReportSectionCategory;
  access: ReportAccess;
  title: LocalizedText;
  description: LocalizedText;
  contentBlocks: ReportContentBlock[];
  dynamicSlots?: ReportDynamicSlot[];
  ruleReferences?: ReportRuleReference[];
}

export interface CompletePersonalityReportDefinition {
  personalityType: PersonalityTypeCode;
  version: ReportVersion;
  title: LocalizedText;
  sections: ReportSectionDefinition[];
}

export interface GeneratedReportSection {
  id: string;
  order: number;
  category: ReportSectionCategory;
  access: ReportAccess;
  title: LocalizedText;
  description: LocalizedText;
  contentBlocks: ReportContentBlock[];
}

export interface GeneratedPersonalityReport {
  sessionId: string;
  personalityType: PersonalityTypeCode;
  version: ReportVersion;
  accessLevel: ReportAccess;
  sections: GeneratedReportSection[];
  generatedAt: string;
}
