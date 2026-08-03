import type {
  ReportVersion,
} from "@/data/report";

import {
  ReportMetadata as SharedReportMetadata,
} from "@/components/report";

export interface ReportMetadataProps {
  appliedRuleCount: number;
  generatedAt: string;
  version: ReportVersion;
}

export function ReportMetadata({
  appliedRuleCount,
  generatedAt,
  version,
}: ReportMetadataProps) {
  return (
    <SharedReportMetadata
      items={[
        {
          label: "Report",
          value: version.reportVersion,
        },
        {
          label: "Content",
          value: version.contentVersion,
        },
        {
          label: "Rules",
          value: version.ruleVersion,
        },
        {
          label: "Applied rules",
          value: String(appliedRuleCount),
        },
        {
          label: "Generated",
          value: formatGeneratedDate(generatedAt),
        },
      ]}
    />
  );
}

function formatGeneratedDate(
  value: string,
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
