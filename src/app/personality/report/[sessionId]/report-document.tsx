import type {
  GeneratedPersonalityReportResult,
} from "@/data/report";

import {
  ReportNavigation as SharedReportNavigation,
  ReportShell,
  ReportTableOfContents as SharedReportTableOfContents,
} from "@/components/report";
import {
  getLocalizedText,
  type SupportedLocale,
} from "@/data/shared";

import { ReportHeader } from "./report-header";
import { ReportSection } from "./report-section";
import type {
  ReportSectionNavigationItem,
} from "./report-table-of-contents";
import { createReportSectionAnchor } from "./section-navigation";

export interface ReportDocumentProps {
  locale: SupportedLocale;
  recipientName?: string;
  report: GeneratedPersonalityReportResult;
}

export function ReportDocument({
  locale,
  recipientName,
  report,
}: ReportDocumentProps) {
  const sections = [...report.sections]
    .sort((left, right) => left.order - right.order)
    .map((section) => ({
      section,
      title: getLocalizedText(section.title, locale),
      anchor: createReportSectionAnchor(
        section.order,
        section.id,
      ),
    }));
  const navigationItems: ReportSectionNavigationItem[] =
    sections.map(({ section, title, anchor }) => ({
      access: section.access,
      anchor,
      id: section.id,
      order: section.order,
      title,
    }));

  return (
    <ReportShell>
        <ReportHeader
          appliedRuleCount={
            report.metadata.appliedRuleCount
          }
          generatedAt={report.generatedAt}
          personalityType={report.personalityType}
          recipientName={recipientName}
          sessionId={report.sessionId}
          version={report.version}
        />

        <SharedReportTableOfContents
          id="report-table-of-contents"
          ariaLabel="Report table of contents"
          items={navigationItems.map((item) => ({
            id: item.id,
            anchor: item.anchor,
            order: item.order,
            title: item.title,
            badge: item.access,
          }))}
        />

        <div className="personality-report-sections mt-12 space-y-12">
          {sections.map(({ section, title, anchor }) => (
            <ReportSection
              key={section.id}
              anchor={anchor}
              locale={locale}
              section={section}
              title={title}
            />
          ))}
        </div>

        <SharedReportNavigation
          primary={{
            href: `/personality/result/${report.sessionId}`,
            label: "Back to free result",
          }}
          secondary={{
            href: "/personality",
            label: "Personality overview",
          }}
        />
    </ReportShell>
  );
}
