import type {
  PersonalityTypeCode,
} from "../../personality/types";

export type PhaseOnePersonalityReportType =
  | "ISFJ"
  | "ENTJ";

export function isPhaseOnePersonalityReportType(
  personalityType: PersonalityTypeCode,
): personalityType is PhaseOnePersonalityReportType {
  return (
    personalityType === "ISFJ" ||
    personalityType === "ENTJ"
  );
}
