import type {
  ReportVersion,
} from "@/data/report";

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
  const items = [
    { label: "Report", value: version.reportVersion },
    { label: "Content", value: version.contentVersion },
    { label: "Rules", value: version.ruleVersion },
    {
      label: "Applied rules",
      value: String(appliedRuleCount),
    },
    {
      label: "Generated",
      value: formatGeneratedDate(generatedAt),
    },
  ] as const;

  return (
    <dl className="report-print-compact-block grid grid-cols-[auto_auto] gap-x-5 gap-y-1 text-sm leading-6 text-[#6d746b] lg:text-right">
      {items.map((item) => (
        <div
          key={item.label}
          className="contents"
        >
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function formatGeneratedDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
