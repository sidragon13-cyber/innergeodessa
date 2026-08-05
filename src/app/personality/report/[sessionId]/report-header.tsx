import type {
  GeneratedPersonalityReportResult,
} from "@/data/report";
import type {
  SupportedLocale,
} from "@/data/shared";

import {
  ReportHeader as SharedReportHeader,
} from "@/components/report";
import {
  getPersonalityReportDictionary,
} from "@/data/i18n";

import { PrintReportButton } from "./print-report-button";
import { ReportMetadata } from "./report-metadata";
import { ReportRecipientName } from "./report-recipient-name";

export interface ReportHeaderProps {
  appliedRuleCount: number;
  generatedAt: string;
  locale: SupportedLocale;
  personalityType:
    GeneratedPersonalityReportResult["personalityType"];
  recipientName?: string;
  sessionId: string;
  version: GeneratedPersonalityReportResult["version"];
}

export function ReportHeader({
  appliedRuleCount,
  generatedAt,
  locale,
  personalityType,
  recipientName,
  sessionId,
  version,
}: ReportHeaderProps) {
  const dictionary =
    getPersonalityReportDictionary(locale);

  return (
    <SharedReportHeader
      eyebrow={dictionary.header.eyebrow}
      subtitle={dictionary.header.subtitle}
      title={personalityType}
      description={
        <p>{dictionary.header.description}</p>
      }
      metadata={
        <div>
          <ReportRecipientName
            initialName={recipientName}
            locale={locale}
            sessionId={sessionId}
          />

          <ReportMetadata
            appliedRuleCount={appliedRuleCount}
            generatedAt={generatedAt}
            locale={locale}
            version={version}
          />
        </div>
      }
      actions={
        <>
          <PrintReportButton locale={locale} />

          <p className="report-interactive-only report-print-guidance max-w-xs text-xs leading-5 text-[#6d746b] lg:text-right">
            {dictionary.header.printGuidance}
          </p>
        </>
      }
    />
  );
}
