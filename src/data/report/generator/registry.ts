import type {
  PersonalityTypeCode,
} from "../../personality/types";
import {
  ISFJ_COMPLETE_REPORT,
} from "../isfj";
import type {
  CompletePersonalityReportDefinition,
} from "../types";

const COMPLETE_REPORT_REGISTRY: Partial<
  Record<
    PersonalityTypeCode,
    CompletePersonalityReportDefinition
  >
> = {
  ISFJ: ISFJ_COMPLETE_REPORT,
};

export function getCompletePersonalityReport(
  personalityType: PersonalityTypeCode,
): CompletePersonalityReportDefinition | null {
  return COMPLETE_REPORT_REGISTRY[personalityType] ?? null;
}

export function hasCompletePersonalityReport(
  personalityType: PersonalityTypeCode,
): boolean {
  return personalityType in COMPLETE_REPORT_REGISTRY;
}
