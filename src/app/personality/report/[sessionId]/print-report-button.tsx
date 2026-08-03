"use client";

import {
  ReportPrintButton as SharedReportPrintButton,
} from "@/components/report";
import {
  getPersonalityReportDictionary,
} from "@/data/i18n";
import type {
  SupportedLocale,
} from "@/data/shared";

export interface PrintReportButtonProps {
  locale: SupportedLocale;
}

export function PrintReportButton({
  locale,
}: PrintReportButtonProps) {
  const dictionary =
    getPersonalityReportDictionary(locale);

  return (
    <SharedReportPrintButton
      label={dictionary.print.label}
      guidance=""
    />
  );
}
