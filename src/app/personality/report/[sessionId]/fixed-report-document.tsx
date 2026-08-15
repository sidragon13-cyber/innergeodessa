import type {
  FixedPersonalityReportPayload,
} from "@/data/report/fixed-assets/fixed-report-payload";

import {
  FixedReportRichContent,
} from "@/components/report/fixed-report-rich-content";

import {
  ReportHeader as SharedReportHeader,
  ReportMetadata as SharedReportMetadata,
  ReportNavigation as SharedReportNavigation,
  ReportSection as SharedReportSection,
  ReportShell,
  ReportTableOfContents as SharedReportTableOfContents,
} from "@/components/report";

import {
  getPersonalityReportDictionary,
} from "@/data/i18n";

import type {
  SupportedLocale,
} from "@/data/shared";

import {
  PrintReportButton,
} from "./print-report-button";

import {
  ReportRecipientName,
} from "./report-recipient-name";

import {
  createReportSectionAnchor,
} from "./section-navigation";

export interface FixedReportDocumentProps {
  readonly locale:
    SupportedLocale;

  readonly sessionId:
    string;

  readonly generatedAt:
    string;

  readonly recipientName?:
    string;

  readonly report:
    FixedPersonalityReportPayload;
}

export function FixedReportDocument({
  locale,
  sessionId,
  generatedAt,
  recipientName,
  report,
}: FixedReportDocumentProps) {
  const dictionary =
    getPersonalityReportDictionary(
      locale,
    );

  const sections =
    report.sections.map(
      (section) => ({
        ...section,

        anchor:
          createReportSectionAnchor(
            section.order,
            section.id,
          ),
      }),
    );

  return (
    <ReportShell>
      <SharedReportHeader
        eyebrow={
          dictionary.header.eyebrow
        }
        subtitle={
          dictionary.header.subtitle
        }
        title={
          report.personalityType
        }
        description={
          <p>
            {
              dictionary.header
                .description
            }
          </p>
        }
        metadata={
          <div>
            <ReportRecipientName
              initialName={
                recipientName
              }
              locale={locale}
              sessionId={
                sessionId
              }
            />

            <SharedReportMetadata
              items={[
                {
                  label:
                    locale === "zh"
                      ? "报告版本"
                      : "Report version",

                  value:
                    report.schemaVersion,
                },

                {
                  label:
                    locale === "zh"
                      ? "报告配置"
                      : "Report profile",

                  value:
                    `Profile ${report.profile}`,
                },

                {
                  label:
                    dictionary
                      .metadata
                      .generated,

                  value:
                    formatGeneratedDate(
                      generatedAt,
                      dictionary
                        .metadata
                        .dateLocale,
                    ),
                },
              ]}
            />
          </div>
        }
        actions={
          <>
            <PrintReportButton
              locale={locale}
            />

            <p className="report-interactive-only report-print-guidance max-w-xs text-xs leading-5 text-[#6d746b] lg:text-right">
              {
                dictionary.header
                  .printGuidance
              }
            </p>
          </>
        }
      />

      <section className="fixed-personality-report-front-matter report-print-flow-block mt-10 border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9">
        <FixedReportRichContent
          blocks={
            report.frontMatter
          }
        />
      </section>

      <SharedReportTableOfContents
        id="report-table-of-contents"
        ariaLabel={
          dictionary.contents
            .ariaLabel
        }
        title={
          dictionary.contents.title
        }
        description={
          dictionary.contents
            .description
        }
        items={sections.map(
          (section) => ({
            id:
              section.id,

            anchor:
              section.anchor,

            order:
              section.order,

            title:
              section.sourceTitle,

            badge:
              dictionary.labels
                .premium,
          }),
        )}
      />

      <div className="personality-report-sections mt-12 space-y-12">
        {sections.map(
          (section) => (
            <SharedReportSection
              key={
                section.id
              }
              id={
                section.anchor
              }
              order={
                section.order
              }
              sectionLabel={
                locale === "zh"
                  ? `第 ${section.order} 部分`
                  : `Section ${section.order}`
              }
              title={
                section.sourceTitle
              }
              badge={
                dictionary.labels
                  .premium
              }
              tableOfContentsId="report-table-of-contents"
              backToContentsLabel={
                locale === "zh"
                  ? "返回目录"
                  : "Back to contents"
              }
              blocks={[
                {
                  id:
                    `${section.id}-fixed-content`,

                  label:
                    locale === "zh"
                      ? "报告正文"
                      : "Report content",

                  content: (
                    <FixedReportRichContent
                      blocks={
                        section.blocks
                      }
                    />
                  ),
                },
              ]}
            />
          ),
        )}
      </div>

      <SharedReportNavigation
        primary={{
          href:
            `/personality/result/${sessionId}`,

          label:
            dictionary.navigation
              .result,
        }}
        secondary={{
          href:
            "/personality",

          label:
            dictionary.navigation
              .overview,
        }}
      />
    </ReportShell>
  );
}

function formatGeneratedDate(
  value: string,
  locale: string,
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    locale,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}
