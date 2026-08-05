import type {
  ReportVersion,
} from "@/data/report";
import type {
  SupportedLocale,
} from "@/data/shared";

import {
  ReportMetadata as SharedReportMetadata,
} from "@/components/report";
import {
  getPersonalityReportDictionary,
} from "@/data/i18n";

export interface ReportMetadataProps {
  appliedRuleCount: number;
  generatedAt: string;
  locale: SupportedLocale;
  version: ReportVersion;
}

export function ReportMetadata({
  appliedRuleCount,
  generatedAt,
  locale,
  version,
}: ReportMetadataProps) {
  const dictionary =
    getPersonalityReportDictionary(locale);

  return (
    <SharedReportMetadata
      items={[
        {
          label: dictionary.metadata.report,
          value: version.reportVersion,
        },
        {
          label: dictionary.metadata.content,
          value: version.contentVersion,
        },
        {
          label: dictionary.metadata.rules,
          value: version.ruleVersion,
        },
        {
          label: dictionary.metadata.appliedRules,
          value: String(appliedRuleCount),
        },
        {
          label: dictionary.metadata.generated,
          value: formatGeneratedDate(
            generatedAt,
            dictionary.metadata.dateLocale,
          ),
        },
      ]}
    />
  );
}

function formatGeneratedDate(
  value: string,
  locale: string,
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
