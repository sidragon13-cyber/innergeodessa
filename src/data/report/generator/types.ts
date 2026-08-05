import type {
  PersonalityTypeCode,
} from "../../personality/types";
import type {
  DimensionCode,
  DimensionResult,
} from "../rules/types";
import type {
  GeneratedPersonalityReport,
  ReportAccess,
} from "../types";

export interface GeneratePersonalityReportInput {
  sessionId: string;
  personalityType: PersonalityTypeCode;
  dimensions: Record<DimensionCode, DimensionResult>;
  accessLevel: ReportAccess;
  generatedAt?: string;
}

export interface GeneratedReportMetadata {
  appliedRuleIds: string[];
  appliedRuleCount: number;
  sourceReportVersion: string;
  sourceContentVersion: string;
  sourceRuleVersion: string;
}

export interface GeneratedPersonalityReportResult
  extends GeneratedPersonalityReport {
  metadata: GeneratedReportMetadata;
}
