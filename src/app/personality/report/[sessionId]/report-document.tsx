import type {
  GeneratedPersonalityReportResult,
} from "@/data/report";

import {
  ReportNavigation as SharedReportNavigation,
  ReportSection as SharedReportSection,
  ReportShell,
  ReportTableOfContents as SharedReportTableOfContents,
} from "@/components/report";
import {
  getLocalizedText,
  type SupportedLocale,
} from "@/data/shared";

import { ReportHeader } from "./report-header";
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
            <SharedReportSection
              key={section.id}
              id={anchor}
              order={section.order}
              title={title}
              description={
                getLocalizedText(
                  section.description,
                  locale,
                )
              }
              badge={section.access}
              tableOfContentsId="report-table-of-contents"
              blocks={section.contentBlocks.map(
                (contentBlock) => ({
                  id: contentBlock.id,
                  label: contentBlock.type,
                  title: contentBlock.title
                    ? getLocalizedText(
                        contentBlock.title,
                        locale,
                      )
                    : undefined,
                  content: getLocalizedText(
                    contentBlock.content,
                    locale,
                  ),
                }),
              )}
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
