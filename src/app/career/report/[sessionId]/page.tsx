"use client";

import {
  useParams,
} from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLocale,
} from "@/components/locale";
import {
  ReportHeader,
  ReportIdentityGate,
  ReportMetadata,
  ReportNavigation,
  ReportPrintButton,
  ReportSection,
  ReportShell,
  ReportState,
  ReportTableOfContents,
} from "@/components/report";
import {
  fetchRiasecResult,
  generateCareerReportSections,
  generateCareerReportSectionsZh,
  isRiasecResultContract,
  type RiasecResultContract,
} from "@/data/career";
import {
  getCareerReportDictionary,
} from "@/data/i18n";

type LoadStatus =
  | "loading"
  | "ready"
  | "error";

function createAnchor(
  order: number,
  id: string,
): string {
  return `career-report-${String(
    order,
  ).padStart(2, "0")}-${id}`;
}

function formatDate(
  value: string,
  locale: string,
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function CareerReportPage() {
  const params =
    useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const { locale } = useLocale();
  const dictionary =
    getCareerReportDictionary(locale);

  const [status, setStatus] =
    useState<LoadStatus>("loading");
  const [result, setResult] =
    useState<RiasecResultContract | null>(
      null,
    );
  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadResult() {
      try {
        const storageKey =
          `innergeodessa-career-result-${sessionId}`;

        const cachedValue =
          sessionStorage.getItem(storageKey) ??
          localStorage.getItem(storageKey);

        if (cachedValue) {
          try {
            const cached: unknown =
              JSON.parse(cachedValue);

            if (
              isRiasecResultContract(cached) &&
              cached.sessionId === sessionId
            ) {
              sessionStorage.setItem(
                storageKey,
                cachedValue,
              );
              localStorage.setItem(
                storageKey,
                cachedValue,
              );

              setResult(cached);
              setStatus("ready");
              return;
            }
          } catch {
            sessionStorage.removeItem(
              storageKey,
            );
            localStorage.removeItem(
              storageKey,
            );
          }
        }

        const fetchedResult =
          await fetchRiasecResult(sessionId);

        if (!active) {
          return;
        }

        const serializedResult =
          JSON.stringify(fetchedResult);

        sessionStorage.setItem(
          storageKey,
          serializedResult,
        );
        localStorage.setItem(
          storageKey,
          serializedResult,
        );

        setResult(fetchedResult);
        setStatus("ready");
      } catch (error) {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : dictionary.errors.loadReport,
        );
        setStatus("error");
      }
    }

    void loadResult();

    return () => {
      active = false;
    };
  }, [
    sessionId,
    dictionary.errors.loadReport,
  ]);

  const sections = useMemo(() => {
    if (!result) {
      return [];
    }

    return locale === "zh"
      ? generateCareerReportSectionsZh(
          result,
        )
      : generateCareerReportSections(
          result,
        );
  }, [locale, result]);

  if (status === "loading") {
    return (
      <ReportState
        eyebrow={
          dictionary.states.loading.eyebrow
        }
        title={
          dictionary.states.loading.title
        }
        message={
          dictionary.states.loading.message
        }
        actions={[
          {
            href: `/career/result/${sessionId}`,
            label:
              dictionary.states.actions.result,
          },
          {
            href: "/career/test",
            label:
              dictionary.states.actions
                .newAssessment,
            variant: "secondary",
          },
        ]}
      />
    );
  }

  if (status === "error" || !result) {
    return (
      <ReportState
        eyebrow={
          dictionary.states.error.eyebrow
        }
        title={
          dictionary.states.error.title
        }
        message={
          errorMessage ||
          dictionary.states.error
            .fallbackMessage
        }
        actions={[
          {
            href: `/career/result/${sessionId}`,
            label:
              dictionary.states.actions.result,
          },
          {
            href: "/career/test",
            label:
              dictionary.states.actions
                .newAssessment,
            variant: "secondary",
          },
        ]}
      />
    );
  }

  const topNames = result.ranking
    .slice(0, 3)
    .map(
      (dimension) =>
        dictionary.dimensionNames[
          dimension
        ],
    )
    .join(" · ");

  return (
    <ReportIdentityGate
      returnTo={`/career/report/${sessionId}`}
    >
      <ReportShell>
      <ReportHeader
        eyebrow={dictionary.header.eyebrow}
        subtitle={
          dictionary.header.subtitle
        }
        title={result.code}
        description={
          <>
            <p className="text-xl font-semibold text-[#26372d]">
              {topNames}
            </p>

            <p className="mt-4">
              {dictionary.header.description}
            </p>
          </>
        }
        metadata={
          <ReportMetadata
            items={[
              {
                label:
                  dictionary.header.completed,
                value: formatDate(
                  result.completedAt,
                  dictionary.dateLocale,
                ),
              },
              {
                label:
                  dictionary.header
                    .questionBank,
                value:
                  result.questionBankVersion,
              },
              {
                label:
                  dictionary.header.session,
                value: `${sessionId.slice(
                  0,
                  8,
                )}…`,
              },
            ]}
          />
        }
        actions={
          <ReportPrintButton
            label={dictionary.header.print}
          />
        }
      />

      <ReportTableOfContents
        id="career-report-table-of-contents"
        ariaLabel={
          dictionary.contents.ariaLabel
        }
        title={dictionary.contents.title}
        description={
          dictionary.contents.description
        }
        items={sections.map((section) => ({
          id: section.id,
          anchor: createAnchor(
            section.order,
            section.id,
          ),
          order: section.order,
          title: section.title,
        }))}
      />

      <div className="personality-report-sections mt-12 space-y-12">
        {sections.map((section) => (
          <ReportSection
            key={section.id}
            id={createAnchor(
              section.order,
              section.id,
            )}
            order={section.order}
            title={section.title}
            description={
              section.description
            }
            tableOfContentsId="career-report-table-of-contents"
            blocks={section.blocks.map(
              (block) => ({
                id: block.id,
                label:
                  dictionary.blockLabels[
                    block.type
                  ],
                title: block.title,
                content: block.content,
              }),
            )}
          />
        ))}
      </div>

      <ReportNavigation
        primary={{
          href: `/career/result/${sessionId}`,
          label:
            dictionary.navigation.result,
        }}
        secondary={{
          href: "/career",
          label:
            dictionary.navigation.overview,
        }}
      />
      </ReportShell>
    </ReportIdentityGate>
  );
}
