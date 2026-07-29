import type {
  PersonalityTypeCode,
} from "../../../personality/types";
import type {
  ReportRuleDefinition,
} from "../../rules";
import {
  createTemplateCombinationRules,
} from "./combination-rules";
import {
  createTemplateConfidenceRules,
} from "./confidence-rules";
import {
  createTemplateDimensionRules,
} from "./dimension-rules";

export {
  createTemplateCombinationRules,
} from "./combination-rules";
export {
  createTemplateConfidenceRules,
} from "./confidence-rules";
export {
  createTemplateDimensionRules,
} from "./dimension-rules";
export {
  validatePersonalityRuleTemplate,
} from "./validation";

export type {
  TemplateRuleValidationResult,
} from "./validation";

export function createPersonalityRuleTemplate(
  personalityType: PersonalityTypeCode,
): readonly ReportRuleDefinition[] {
  return [
    ...createTemplateDimensionRules(personalityType),
    ...createTemplateConfidenceRules(personalityType),
    ...createTemplateCombinationRules(personalityType),
  ];
}
