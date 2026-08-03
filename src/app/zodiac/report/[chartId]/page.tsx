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
  ReportState,
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
    <main className="personality-report min-h-screen bg-[#efede5] px-6 py-12 text-[#26372d] md:py-20">
      <div className="personality-report-container mx-auto max-w-6xl">
        <header className="personality-report-header border-b border-[#c8c2b5] pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6d746b]">
            InnerGeodessa Complete Zodiac Birth Chart Report
          </p>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm text-[#6d746b]">
                Professional symbolic
                birth chart report
              </p>

              <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
                {sunName} Sun
                <br />
                {moonName} Moon
                <br />
                {risingName} Rising
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#596158]">
                A structured interpretation
                of your calculated planetary
                positions, personal planets,
                chart angles, potential
                strengths, development risks,
                relationship themes, career
                prompts, and reflection plan.
              </p>
            </div>

            <div className="report-print-compact-block text-sm leading-6 text-[#6d746b] lg:text-right">
              <p>
                Calculated:{" "}
                {formatCalculatedAt(
                  result.calculatedAt,
                )}
              </p>

              <p>
                Local birth time:{" "}
                {
                  result.input
                    .localDateTime
                }
              </p>

              <p>
                Time zone:{" "}
                {
                  result.input
                    .timeZone
                }
              </p>

              <p>
                Chart:{" "}
                {chartId.slice(
                  0,
                  8,
                )}
                …
              </p>

              <button
                type="button"
                onClick={() =>
                  window.print()
                }
                className="report-interactive-only mt-6 inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#34483a] hover:text-[#f1eee5]"
              >
                Print / Save as PDF
              </button>

              <p className="report-interactive-only mt-3 max-w-xs text-xs leading-5">
                Disable browser headers
                and footers for a cleaner
                PDF.
              </p>
            </div>
          </div>
        </header>

        <nav
          id="zodiac-report-table-of-contents"
          aria-label="Zodiac report table of contents"
          className="report-table-of-contents mt-10 border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9"
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            Table of contents
          </h2>

          <p className="mt-3 leading-7 text-[#596158]">
            Navigate directly to any
            section of your report.
          </p>

          <ol className="mt-7 grid gap-px bg-[#d8d2c6] sm:grid-cols-2">
            {sections.map(
              (section) => (
                <li
                  key={section.id}
                  className="bg-[#f7f4ec]"
                >
                  <a
                    href={`#${createAnchor(
                      section.order,
                      section.id,
                    )}`}
                    className="grid min-h-16 grid-cols-[auto_1fr] items-center gap-4 px-4 py-3"
                  >
                    <span className="text-xs font-bold tabular-nums tracking-[0.12em] text-[#7c684d]">
                      {String(
                        section.order,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span className="font-semibold">
                      {section.title}
                    </span>
                  </a>
                </li>
              ),
            )}
          </ol>
        </nav>

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
      </div>
    </main>
  );
}
