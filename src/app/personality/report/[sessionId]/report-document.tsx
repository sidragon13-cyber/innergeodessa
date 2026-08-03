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
  getPersonalityReportDictionary,
} from "@/data/i18n";
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
  const dictionary =
    getPersonalityReportDictionary(locale);

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

  function getAccessLabel(access: string): string {
    return access === "premium"
      ? dictionary.labels.premium
      : dictionary.labels.free;
  }

  function getContentLabel(type: string): string {
    const normalized = type
      .replace(/[_\s]+/g, "-")
      .toLowerCase();

    if (normalized === "paragraph") {
      return dictionary.labels.paragraph;
    }

    if (
      normalized === "list" ||
      normalized === "bullet-list"
    ) {
      return dictionary.labels.list;
    }

    if (normalized === "callout") {
      return dictionary.labels.callout;
    }

    if (normalized === "table") {
      return dictionary.labels.table;
    }

    if (normalized === "quote") {
      return dictionary.labels.quote;
    }

    if (
      normalized === "action-plan" ||
      normalized === "actionplan"
    ) {
      return dictionary.labels.actionPlan;
    }

    return dictionary.labels.fallback(type);
  }

  return (
    <ReportShell>
      <ReportHeader
        appliedRuleCount={
          report.metadata.appliedRuleCount
        }
        generatedAt={report.generatedAt}
        locale={locale}
        personalityType={report.personalityType}
        recipientName={recipientName}
        sessionId={report.sessionId}
        version={report.version}
      />

      <SharedReportTableOfContents
        id="report-table-of-contents"
        ariaLabel={dictionary.contents.ariaLabel}
        title={dictionary.contents.title}
        description={dictionary.contents.description}
        items={navigationItems.map((item) => ({
          id: item.id,
          anchor: item.anchor,
          order: item.order,
          title: item.title,
          badge: getAccessLabel(item.access),
        }))}
      />

      <div className="personality-report-sections mt-12 space-y-12">
        {sections.map(({ section, title, anchor }) => (
          <SharedReportSection
            key={section.id}
            id={anchor}
            order={section.order}
            title={title}
            description={getLocalizedText(
              section.description,
              locale,
            )}
            badge={getAccessLabel(section.access)}
            tableOfContentsId="report-table-of-contents"
            blocks={section.contentBlocks.map(
              (contentBlock) => ({
                id: contentBlock.id,
                label: getContentLabel(
                  contentBlock.type,
                ),
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
          label: dictionary.navigation.result,
        }}
        secondary={{
          href: "/personality",
          label: dictionary.navigation.overview,
        }}
      />
    </ReportShell>
  );
}
