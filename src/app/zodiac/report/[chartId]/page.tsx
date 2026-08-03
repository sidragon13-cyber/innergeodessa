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
  ReportPrintButton,
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
          eyebrow="InnerGeodessa Complete Zodiac Birth Chart Report"
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
          {sections.map(
            (section) => (
              <section
                key={section.id}
                id={createAnchor(
                  section.order,
                  section.id,
                )}
                className="personality-report-section border border-[#c8c2b5] bg-[#f7f4ec]"
              >
                <header className="personality-report-section-header report-print-section-heading-group border-b border-[#d8d2c6] p-7 md:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                    Section{" "}
                    {section.order}
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold">
                    {section.title}
                  </h2>

                  <p className="mt-4 max-w-4xl leading-7 text-[#596158]">
                    {
                      section.description
                    }
                  </p>
                </header>

                <div className="divide-y divide-[#d8d2c6]">
                  {section.blocks.map(
                    (block) => (
                      <article
                        key={block.id}
                        className="personality-report-content-block report-print-flow-block p-7 md:p-9"
                      >
                        <div className="report-print-content-heading-group">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7c684d]">
                            {block.type}
                          </p>

                          <h3 className="mt-3 text-xl font-semibold">
                            {block.title}
                          </h3>
                        </div>

                        <p className="mt-4 max-w-4xl whitespace-pre-line leading-8 text-[#596158]">
                          {
                            block.content
                          }
                        </p>
                      </article>
                    ),
                  )}
                </div>

                <div className="report-back-to-contents report-interactive-only border-t border-[#d8d2c6] px-7 py-5 md:px-9">
                  <a
                    href="#zodiac-report-table-of-contents"
                    className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d746b] underline underline-offset-4"
                  >
                    Back to contents
                  </a>
                </div>
              </section>
            ),
          )}
        </div>

        <div className="report-interactive-only mt-12 flex flex-wrap gap-4 border-t border-[#c8c2b5] pt-8">
          <Link
            href={`/zodiac/result/${chartId}`}
            className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
          >
            Back to Zodiac result
          </Link>

          <Link
            href="/zodiac/test"
            className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em]"
          >
            Create another chart
          </Link>
        </div>

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
