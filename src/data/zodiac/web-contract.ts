import type {
  AstrologyResultContract,
} from "./result-contract";

import type {
  ZodiacValidationIssue,
} from "./validation";

export interface ZodiacChartSuccessResponse {
  ok: true;
  chartId: string;
  result: AstrologyResultContract;
}

export interface ZodiacChartErrorResponse {
  ok: false;
  error: string;
  issues?: readonly ZodiacValidationIssue[];
}

export type ZodiacChartApiResponse =
  | ZodiacChartSuccessResponse
  | ZodiacChartErrorResponse;
