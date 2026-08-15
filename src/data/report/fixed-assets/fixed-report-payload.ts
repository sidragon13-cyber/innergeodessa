import type {
  PersonalityTypeCode,
} from "../../personality/types";

import type {
  DimensionCode,
  DimensionResult,
} from "../rules/types";

import type {
  PreferenceClarityBand,
} from "../shared/preference-clarity";

import type {
  PersonalityPreferenceBandVariables,
} from "../generator/preference-band-variables";

import type {
  PersonalityReportProfile,
} from "../generator/profile-resolver";

import {
  resolveFixedPersonalityReport,
} from "./fixed-report-resolver";

import {
  parseFixedReportMarkdown,
  type FixedReportRichBlock,
} from "./fixed-report-rich-content";

import {
  adaptFixedReportSections,
  type FixedReportSection,
} from "./fixed-report-section-adapter";

export const FIXED_PERSONALITY_REPORT_SCHEMA_VERSION =
  "FIXED-PERSONALITY-REPORT-V1" as const;

type PreferenceDirection =
  PersonalityPreferenceBandVariables[
    DimensionCode
  ]["direction"];

export interface FixedReportPreferenceBandSummary {
  readonly direction:
    PreferenceDirection;

  readonly clarity:
    number;

  readonly band:
    PreferenceClarityBand;

  readonly bandLabelZh:
    string;
}

export type FixedReportPreferenceBandSummaries =
  Readonly<
    Record<
      DimensionCode,
      FixedReportPreferenceBandSummary
    >
  >;

export interface FixedPersonalityReportPayload {
  readonly schemaVersion:
    typeof FIXED_PERSONALITY_REPORT_SCHEMA_VERSION;

  readonly personalityType:
    PersonalityTypeCode;

  readonly profile:
    PersonalityReportProfile;

  /**
   * Integrity identity for the audited source report.
   * Internal filesystem paths are deliberately not exposed.
   */
  readonly sourceSha256:
    string;

  readonly preferenceBands:
    FixedReportPreferenceBandSummaries;

  /**
   * Identity / Profile / Report Theme /
   * Development Theme content appearing
   * before Data Summary.
   */
  readonly frontMatter:
    readonly FixedReportRichBlock[];

  /**
   * Exactly 13 canonical sections:
   * Data Summary
   * M01–M09
   * Conclusion
   * Disclaimer
   * Appendix
   */
  readonly sections:
    readonly FixedReportSection[];
}

/**
 * Builds exactly one serializable premium report payload.
 *
 * The returned object contains:
 * - one personality type
 * - one resolved Profile A/B/C/D
 * - one audited report
 * - substituted preference data
 * - structured report content
 *
 * It deliberately does NOT return:
 * - raw Markdown
 * - the 64-report asset registry
 * - internal source paths
 * - React elements
 */
export function buildFixedPersonalityReportPayload(
  personalityType:
    PersonalityTypeCode,

  dimensions:
    Record<
      DimensionCode,
      DimensionResult
    >,
): FixedPersonalityReportPayload {
  const resolved =
    resolveFixedPersonalityReport(
      personalityType,
      dimensions,
    );

  const richDocument =
    parseFixedReportMarkdown(
      resolved.markdown,
    );

  const sectionDocument =
    adaptFixedReportSections(
      richDocument,
    );

  return {
    schemaVersion:
      FIXED_PERSONALITY_REPORT_SCHEMA_VERSION,

    personalityType:
      resolved.personalityType,

    profile:
      resolved.profile,

    sourceSha256:
      resolved.sourceSha256,

    preferenceBands: {
      EI: summarizeBand(
        resolved
          .preferenceBandVariables
          .EI,
      ),

      SN: summarizeBand(
        resolved
          .preferenceBandVariables
          .SN,
      ),

      TF: summarizeBand(
        resolved
          .preferenceBandVariables
          .TF,
      ),

      JP: summarizeBand(
        resolved
          .preferenceBandVariables
          .JP,
      ),
    },

    frontMatter:
      sectionDocument.frontMatter,

    sections:
      sectionDocument.sections,
  };
}

function summarizeBand(
  variable:
    PersonalityPreferenceBandVariables[
      DimensionCode
    ],
): FixedReportPreferenceBandSummary {
  return {
    direction:
      variable.direction,

    clarity:
      variable.clarity,

    band:
      variable.band,

    bandLabelZh:
      variable.bandLabelZh,
  };
}
