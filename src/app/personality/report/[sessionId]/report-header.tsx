import type {
  GeneratedPersonalityReportResult,
} from "@/data/report";

import { PrintReportButton } from "./print-report-button";
import { ReportMetadata } from "./report-metadata";

export interface ReportHeaderProps {
  appliedRuleCount: number;
  generatedAt: string;
  personalityType:
    GeneratedPersonalityReportResult["personalityType"];
  version: GeneratedPersonalityReportResult["version"];
}

export function ReportHeader({
  appliedRuleCount,
  generatedAt,
  personalityType,
  version,
}: ReportHeaderProps) {
  return (
    <header className="personality-report-header border-b border-[#c8c2b5] pb-10">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6d746b]">
        InnerGeodessa Complete Personality Report
      </p>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm text-[#6d746b]">
            Premium report
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
            {personalityType}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#596158]">
            A contextual report generated from your persisted
            dimension scores and confidence pattern.
          </p>
        </div>

        <div>
          <ReportMetadata
            appliedRuleCount={appliedRuleCount}
            generatedAt={generatedAt}
            version={version}
          />

          <div className="report-interactive-only mt-6 flex flex-col items-start gap-3 lg:items-end">
            <PrintReportButton />

            <p className="report-interactive-only report-print-guidance max-w-xs text-xs leading-5 text-[#6d746b] lg:text-right">
              For a clean PDF, disable browser headers and
              footers in the print dialog.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
