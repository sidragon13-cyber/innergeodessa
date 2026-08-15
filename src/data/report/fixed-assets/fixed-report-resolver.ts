import type {
  PersonalityTypeCode,
} from "../../personality/types";
import type {
  DimensionCode,
  DimensionResult,
} from "../rules/types";
import {
  resolvePersonalityPreferenceBandVariables,
  type PersonalityPreferenceBandVariables,
} from "../generator/preference-band-variables";
import {
  resolvePersonalityReportProfile,
  type PersonalityReportProfile,
} from "../generator/profile-resolver";
import {
  resolvePreferenceBandVariableForLocale,
  type PersonalityReportLocale,
} from "../shared/preference-band-locale";
import {
  FIXED_PERSONALITY_REPORT_MARKDOWN,
} from "./generated-report-markdown";

export interface ResolvedFixedPersonalityReport {
  readonly personalityType: PersonalityTypeCode;
  readonly profile: PersonalityReportProfile;
  readonly sourcePath: string;
  readonly sourceSha256: string;
  readonly preferenceBandVariables:
    PersonalityPreferenceBandVariables;
  readonly markdown: string;
}

/**
 * Resolves exactly one audited fixed personality report.
 *
 * This module is intentionally NOT exported from the public
 * src/data/report barrel. Production usage must remain on the
 * protected server report path so the complete premium asset
 * registry is not bundled into the browser.
 */
export function resolveFixedPersonalityReport(
  personalityType: PersonalityTypeCode,
  dimensions: Record<DimensionCode, DimensionResult>,
  locale: PersonalityReportLocale = "zh",
): ResolvedFixedPersonalityReport {
  const preferenceBandVariables =
    resolvePersonalityPreferenceBandVariables(
      personalityType,
      dimensions,
    );

  const profile =
    resolvePersonalityReportProfile(
      preferenceBandVariables,
    );

  const asset =
    FIXED_PERSONALITY_REPORT_MARKDOWN[
      locale
    ][personalityType][profile];

  const markdown = substituteReportVariables(
    asset.markdown,
    preferenceBandVariables,
    locale,
  );

  assertResolvedReportIdentity(
    markdown,
    personalityType,
    profile,
    locale,
  );

  assertNoUnresolvedVariables(markdown);

  return {
    personalityType,
    profile,
    sourcePath: asset.sourcePath,
    sourceSha256: asset.sha256,
    preferenceBandVariables,
    markdown,
  };
}

function substituteReportVariables(
  markdown: string,
  variables: PersonalityPreferenceBandVariables,
  locale: PersonalityReportLocale,
): string {
  let resolved = markdown;

  for (const dimension of [
    "EI",
    "SN",
    "TF",
    "JP",
  ] as const satisfies readonly DimensionCode[]) {
    const variable = variables[dimension];
    const direction = variable.direction;

    const localizedVariable =
      resolvePreferenceBandVariableForLocale(
        direction,
        variable.clarity,
        locale,
      );

    const replacements: Readonly<
      Record<string, string>
    > = {
      [`{{${direction}_SCORE}}`]:
        formatClarity(variable.clarity),

      [`{{${direction}_BAND_CN}}`]:
        localizedVariable.bandLabel,

      [`{{${direction}_BAND_EN}}`]:
        localizedVariable.bandLabel,

      [`{{${direction}_BAND_BLOCK}}`]:
        localizedVariable.content,
    };

    for (const [
      placeholder,
      replacement,
    ] of Object.entries(replacements)) {
      resolved = resolved
        .split(placeholder)
        .join(replacement);
    }
  }

  return resolved;
}

function formatClarity(
  clarity: number,
): string {
  if (!Number.isFinite(clarity)) {
    throw new TypeError(
      "Preference clarity must be finite.",
    );
  }

  return Number(
    clarity.toFixed(2),
  ).toString();
}

function assertResolvedReportIdentity(
  markdown: string,
  personalityType: PersonalityTypeCode,
  profile: PersonalityReportProfile,
  locale: PersonalityReportLocale,
): void {
  const expectedTitle =
    locale === "zh"
      ? `InnerGeo ${personalityType} 专业人格报告`
      : `InnerGeo ${personalityType} Professional Personality Report`;

  if (
    !markdown.includes(
      expectedTitle,
    )
  ) {
    throw new Error(
      `Resolved report identity mismatch: ${personalityType}`,
    );
  }

  if (
    !markdown.includes(
      `Profile ${profile} —`,
    )
  ) {
    throw new Error(
      `Resolved report profile mismatch: ${personalityType}-${profile}`,
    );
  }
}

function assertNoUnresolvedVariables(
  markdown: string,
): void {
  const unresolved =
    markdown.match(
      /\{\{[A-Z]+_(?:SCORE|BAND_CN|BAND_EN|BAND_BLOCK)\}\}/g,
    );

  if (unresolved?.length) {
    throw new Error(
      `Unresolved fixed report variables: ${[
        ...new Set(unresolved),
      ].join(", ")}`,
    );
  }
}
