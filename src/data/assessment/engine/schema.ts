import type {
  AssessmentModule,
  AssessmentQuestion,
  AssessmentQuestionId,
} from "../questions/schema";

export interface AssessmentResponse {
  questionId: AssessmentQuestionId;
  value: number;
}

export interface NormalizedAssessmentResponse {
  questionId: AssessmentQuestionId;
  module: AssessmentModule;
  dimension: string;
  rawValue: number;
  normalizedValue: number;
  reverseScored: boolean;
}

export interface AssessmentDimensionAggregate {
  dimension: string;
  responseCount: number;
  rawTotal: number;
  normalizedTotal: number;
  minimumPossibleTotal: number;
  maximumPossibleTotal: number;
}

export interface AssessmentEngineIssue {
  path: string;
  message: string;
}

export interface AssessmentNormalizationResult {
  valid: boolean;
  responses: readonly NormalizedAssessmentResponse[];
  issues: readonly AssessmentEngineIssue[];
}

export interface AssessmentAggregationResult {
  valid: boolean;
  dimensions: Readonly<Record<string, AssessmentDimensionAggregate>>;
  issues: readonly AssessmentEngineIssue[];
}

export interface AssessmentEngineInput {
  module: AssessmentModule;
  questions: readonly AssessmentQuestion[];
  responses: readonly AssessmentResponse[];
}
