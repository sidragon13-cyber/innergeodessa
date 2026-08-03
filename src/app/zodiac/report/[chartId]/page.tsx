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
  getZodiacSignName,
  readStoredZodiacChart,
  type AstrologyResultContract,
} from "@/data/zodiac";

import {
  ReportHeader,
  ReportMetadata,
  ReportNavigation,
  ReportPrintButton,
  ReportSection,
  ReportShell,
  ReportState,
  ReportTableOfContents,
} from "@/components/report";

type LoadStatus =
  | "loading"
  | "ready"
  | "error";

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
    "en",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

export default function ZodiacReportPage() {
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
    errorMessage,
    setErrorMessage,
  ] = useState("");

  useEffect(() => {
    if (!chartId) {
      setErrorMessage(
        "The birth chart ID is missing.",
      );

      setStatus("error");
      return;
    }

    const storedResult =
      readStoredZodiacChart(chartId);

    if (!storedResult) {
      setErrorMessage(
        "This chart is no longer available in this browser. Generate a new birth chart to continue.",
      );

      setStatus("error");
      return;
    }

    setResult(storedResult);
    setStatus("ready");
  }, [chartId]);

  const sections =
    useMemo(
      () =>
        result
          ? generateZodiacReportSections(
              result,
            )
          : [],
      [result],
    );

  if (status === "loading") {
    return (
      <ReportState
        eyebrow="Zodiac Birth Chart Report"
        title="Preparing your detailed Zodiac report…"
        message="Loading your calculated birth chart and generating the structured report."
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
            label: "Back to result",
          },
          {
            href: "/zodiac/test",
            label: "New birth chart",
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
        eyebrow="Zodiac Birth Chart Report"
        title="Your Zodiac report could not be loaded."
        message={
          errorMessage ||
          "The calculated birth chart is unavailable."
        }
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
            label: "Back to result",
          },
          {
            href: "/zodiac/test",
            label: "New birth chart",
            variant: "secondary",
          },
        ]}
      />
    );
  }

  const sunName =
    getZodiacSignName(
      result.planets.sun
        .zodiac.sign,
    );

  const moonName =
    getZodiacSignName(
      result.planets.moon
        .zodiac.sign,
    );

  const risingName =
    getZodiacSignName(
      result.angles.ascendant
        .zodiac.sign,
    );

  return (
    <ReportShell>
        <ReportHeader
          eyebrow="InnerGeo Complete Zodiac Birth Chart Report"
          subtitle="Professional symbolic birth chart report"
          title={
            <>
              {sunName} Sun
              <br />
              {moonName} Moon
              <br />
              {risingName} Rising
            </>
          }
          description={
            <p>
              A structured interpretation of your calculated planetary
              positions, personal planets, chart angles, potential strengths,
              development risks, relationship themes, career prompts, and
              reflection plan.
            </p>
          }
          metadata={
            <ReportMetadata
              items={[
                {
                  label: "Calculated",
                  value: formatCalculatedAt(
                    result.calculatedAt,
                  ),
                },
                {
                  label: "Local birth time",
                  value: result.input.localDateTime,
                },
                {
                  label: "Time zone",
                  value: result.input.timeZone,
                },
                {
                  label: "Chart",
                  value: `${chartId.slice(0, 8)}…`,
                },
              ]}
            />
          }
          actions={<ReportPrintButton />}
        />

        <ReportTableOfContents
          id="zodiac-report-table-of-contents"
          ariaLabel="Zodiac report table of contents"
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
                label: block.type,
                title: block.title,
                content: block.content,
              }))}
            />
          ))}
        </div>

        <ReportNavigation
          primary={{
            href: `/zodiac/result/${chartId}`,
            label: "Back to Zodiac result",
          }}
          secondary={{
            href: "/zodiac/test",
            label: "Create another chart",
          }}
        />

        <footer className="mt-12 border-t border-[#c8c2b5] pt-8 text-sm leading-6 text-[#6d746b]">
          Astrology content is intended
          for reflection, culture, and
          entertainment. It is not
          scientific, medical,
          psychological, legal,
          financial, educational, or
          employment advice.
        </footer>
    </ReportShell>
  );
}
