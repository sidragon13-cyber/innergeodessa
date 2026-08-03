import type {
  GeneratedPersonalityReportResult,
} from "@/data/report";

import {
  ReportHeader as SharedReportHeader,
} from "@/components/report";

import { PrintReportButton } from "./print-report-button";
import { ReportMetadata } from "./report-metadata";
import { ReportRecipientName } from "./report-recipient-name";

export interface ReportHeaderProps {
  appliedRuleCount: number;
  generatedAt: string;
  personalityType:
    GeneratedPersonalityReportResult["personalityType"];
  recipientName?: string;
  sessionId: string;
  version: GeneratedPersonalityReportResult["version"];
}

export function ReportHeader({
  appliedRuleCount,
  generatedAt,
  personalityType,
  recipientName,
  sessionId,
  version,
}: ReportHeaderProps) {
  return (
    <SharedReportHeader
      eyebrow="InnerGeo Complete Personality Report"
      subtitle="Premium report"
      title={personalityType}
      description={
        <p>
          A contextual report generated from your persisted
          dimension scores and confidence pattern.
        </p>
      }
      metadata={
        <div>
          <ReportRecipientName
            initialName={recipientName}
            sessionId={sessionId}
          />

          <ReportMetadata
            appliedRuleCount={appliedRuleCount}
            generatedAt={generatedAt}
            version={version}
          />
        </div>
      }
      actions={
        <>
          <PrintReportButton />

          <p className="report-print-guidance max-w-xs text-xs leading-5 text-[#6d746b] lg:text-right">
            For a clean PDF, disable browser headers and
            footers in the print dialog.
          </p>
        </>
      }
    />
  );
}
