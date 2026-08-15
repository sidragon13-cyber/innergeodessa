import type {
  PersonalityResultContract,
} from "../../assessment/scoring/personality/schema";

import {
  createReportDimensions,
} from "../generator/from-assessment-result";

import type {
  PersonalityReportLocale,
} from "../shared/preference-band-locale";

import {
  buildFixedPersonalityReportPayload,
  type FixedPersonalityReportPayload,
} from "./fixed-report-payload";

/**
 * Formal boundary between Assessment Result and fixed Premium Report delivery.
 *
 * Assessment owns:
 * - personality type
 * - scores
 * - confidence
 * - answered counts
 * - assessment/version metadata
 *
 * Report delivery owns:
 * - locale
 * - Preference Clarity bands
 * - Profile A/B/C/D routing
 * - fixed report asset resolution
 *
 * This adapter deliberately contains no entitlement, authentication,
 * persistence, UI, or report-content logic.
 */
export function buildFixedPersonalityReportFromAssessmentResult(
  result: PersonalityResultContract,
  locale: PersonalityReportLocale,
): FixedPersonalityReportPayload {
  return buildFixedPersonalityReportPayload(
    result.type,
    createReportDimensions(result),
    locale,
  );
}
