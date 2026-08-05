"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  generateZodiacReportSections,
  generateZodiacReportSectionsZh,
  loadStoredOrRemoteZodiacChart,
  type AstrologyResultContract,
} from "@/data/zodiac";

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
  getZodiacReportDictionary,
} from "@/data/i18n";

type LoadStatus =
  | "loading"
  | "ready"
  | "error";

type LoadError =
  | "missingChartId"
  | "missingStoredChart";

function createAnchor(
  order: number,
  id: string,
): string {
  return `zodiac-report-${String(
    order,
  ).padStart(2, "0")}-${id}`;
}

function formatCalculatedAt(
  value: string,
  dateLocale: "en" | "zh-CN",
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
    dateLocale,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

export default function ZodiacReportPage() {
  const { locale } = useLocale();
  const dictionary =
    getZodiacReportDictionary(locale);

  const params =
    useParams<{
      chartId: string;
    }>();

  const chartId =
    params.chartId;

  const [status, setStatus] =
    useState<LoadStatus>(
      "loading",
    );

  const [result, setResult] =
    useState<
      AstrologyResultContract | null
    >(null);

  const [
    loadError,
    setLoadError,
  ] = useState<LoadError | null>(null);

  useEffect(() => {
    if (!chartId) {
      setLoadError("missingChartId");
      setStatus("error");
      return;
    }

    let active = true;

    async function loadChart(): Promise<void> {
      setStatus("loading");

      try {
        const loadedResult =
          await loadStoredOrRemoteZodiacChart(
            chartId,
          );

        if (!active) {
          return;
        }

        setLoadError(null);
        setResult(loadedResult);
        setStatus("ready");
      } catch {
        if (!active) {
          return;
        }

        setResult(null);
        setLoadError(
          "missingStoredChart",
        );
        setStatus("error");
      }
    }

    void loadChart();

    return () => {
      active = false;
    };
  }, [chartId]);

  const sections =
    useMemo(
      () =>
        result
          ? locale === "zh"
            ? generateZodiacReportSectionsZh(result)
            : generateZodiacReportSections(result)
          : [],
      [locale, result],
    );

  if (status === "loading") {
    return (
      <ReportState
        eyebrow={dictionary.loading.eyebrow}
        title={dictionary.loading.title}
        message={dictionary.loading.message}
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
            label: dictionary.navigation.backToResult,
          },
          {
            href: "/zodiac/test",
            label: dictionary.navigation.newBirthChart,
            variant: "secondary",
          },
        ]}
      />
    );
  }

  if (
    status === "error" ||
    !result
  ) {
    return (
      <ReportState
        eyebrow={dictionary.loading.eyebrow}
        title={dictionary.errors.unavailable}
        message={
          loadError
            ? dictionary.errors[loadError]
            : dictionary.errors.fallbackUnavailable
        }
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
            label: dictionary.navigation.backToResult,
          },
          {
            href: "/zodiac/test",
            label: dictionary.navigation.newBirthChart,
            variant: "secondary",
          },
        ]}
      />
    );
  }

  const sunName =
    dictionary.signNames[
      result.planets.sun.zodiac.sign
    ];

  const moonName =
    dictionary.signNames[
      result.planets.moon.zodiac.sign
    ];

  const risingName =
    dictionary.signNames[
      result.angles.ascendant.zodiac.sign
    ];

  return (
    <ReportIdentityGate
      returnTo={`/zodiac/report/${chartId}`}
    >
      <ReportShell>
        <ReportHeader
          eyebrow={dictionary.header.eyebrow}
          subtitle={dictionary.header.subtitle}
          title={
            <>
              {sunName}{dictionary.header.sun}
              <br />
              {moonName}{dictionary.header.moon}
              <br />
              {risingName}{dictionary.header.rising}
            </>
          }
          description={
            <p>
              {dictionary.header.description}
            </p>
          }
          metadata={
            <ReportMetadata
              items={[
                {
                  label: dictionary.header.calculated,
                  value: formatCalculatedAt(
                    result.calculatedAt,
                    dictionary.dateLocale,
                  ),
                },
                {
                  label: dictionary.header.localBirthTime,
                  value: result.input.localDateTime,
                },
                {
                  label: dictionary.header.timeZone,
                  value: result.input.timeZone,
                },
                {
                  label: dictionary.header.chart,
                  value: `${chartId.slice(0, 8)}…`,
                },
              ]}
            />
          }
          actions={
            <ReportPrintButton
              label={dictionary.header.print}
              guidance={dictionary.header.printGuidance}
            />
          }
        />

        <ReportTableOfContents
          id="zodiac-report-table-of-contents"
          ariaLabel={dictionary.tableOfContents.ariaLabel}
          title={dictionary.tableOfContents.title}
          description={dictionary.tableOfContents.description}
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
              description={section.description}
              tableOfContentsId="zodiac-report-table-of-contents"
              blocks={section.blocks.map((block) => ({
                id: block.id,
                label: dictionary.blockLabels[block.type],
                title: block.title,
                content: block.content,
              }))}
            />
          ))}
        </div>

        <ReportNavigation
          primary={{
            href: `/zodiac/result/${chartId}`,
            label: dictionary.navigation.backToZodiacResult,
          }}
          secondary={{
            href: "/zodiac/test",
            label: dictionary.navigation.createAnotherChart,
          }}
        />

        <footer className="mt-12 border-t border-[#c8c2b5] pt-8 text-sm leading-6 text-[#6d746b]">
          {dictionary.footer}
        </footer>
      </ReportShell>
    </ReportIdentityGate>
  );
}
