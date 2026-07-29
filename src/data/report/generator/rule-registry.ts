import type {
  PersonalityTypeCode,
} from "../../personality/types";
import {
  ENTP_REPORT_RULES,
} from "../entp";
import {
  ENTJ_REPORT_RULES,
} from "../entj";
import {
  ISFJ_REPORT_RULES,
} from "../isfj";
import {
  INTJ_REPORT_RULES,
} from "../intj";
import {
  INTP_REPORT_RULES,
} from "../intp";
import {
  INFJ_REPORT_RULES,
} from "../infj";
import {
  INFP_REPORT_RULES,
} from "../infp";
import {
  ENFJ_REPORT_RULES,
} from "../enfj";
import {
  ENFP_REPORT_RULES,
} from "../enfp";
import type {
  ReportRuleDefinition,
} from "../rules";

const REPORT_RULE_REGISTRY: Partial<
  Record<
    PersonalityTypeCode,
    readonly ReportRuleDefinition[]
  >
> = {
  ISFJ: ISFJ_REPORT_RULES,
  ENTJ: ENTJ_REPORT_RULES,
  ENTP: ENTP_REPORT_RULES,
  INTJ: INTJ_REPORT_RULES,
  INTP: INTP_REPORT_RULES,
  INFJ: INFJ_REPORT_RULES,
  INFP: INFP_REPORT_RULES,
  ENFJ: ENFJ_REPORT_RULES,
  ENFP: ENFP_REPORT_RULES,
};

export function getReportRules(
  personalityType: PersonalityTypeCode,
): readonly ReportRuleDefinition[] {
  return REPORT_RULE_REGISTRY[personalityType] ?? [];
}

export function hasReportRules(
  personalityType: PersonalityTypeCode,
): boolean {
  return personalityType in REPORT_RULE_REGISTRY;
}
