"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  fetchRiasecResult,
  generateCareerReportSections,
  getRiasecDimensionProfile,
  isRiasecResultContract,
  type RiasecResultContract,
} from "@/data/career";

import {
  ReportHeader,
  ReportMetadata,
  ReportPrintButton,
  ReportShell,
  ReportState,
} from "@/components/report";

type LoadStatus = "loading" | "ready" | "error";

function createAnchor(order: number, id: string): string {
  return `career-report-${String(order).padStart(2, "0")}-${id}`;
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function CareerReportPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const [status, setStatus] = useState<LoadStatus>("loading");
  const [result, setResult] =
    useState<RiasecResultContract | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

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
            const cached: unknown = JSON.parse(cachedValue);

            if (
              isRiasecResultContract(cached) &&
              cached.sessionId === sessionId
            ) {
              sessionStorage.setItem(storageKey, cachedValue);
              localStorage.setItem(storageKey, cachedValue);
              setResult(cached);
              setStatus("ready");
              return;
            }
          } catch {
            sessionStorage.removeItem(storageKey);
            localStorage.removeItem(storageKey);
          }
        }

        const fetchedResult = await fetchRiasecResult(sessionId);

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
            : "The career report could not be loaded.",
        );
        setStatus("error");
      }
    }

    void loadResult();

    return () => {
      active = false;
    };
  }, [sessionId]);

  const sections = useMemo(
    () => (result ? generateCareerReportSections(result) : []),
    [result],
  );

  if (status === "loading") {
    return (
      <ReportState
        eyebrow="Career Interest Report"
        title="Preparing your detailed career report…"
        message="Loading your completed RIASEC result and generating the report."
        actions={[
          {
            href: `/career/result/${sessionId}`,
            label: "Back to result",
          },
          {
            href: "/career/test",
            label: "New assessment",
            variant: "secondary",
          },
        ]}
      />
    );
  }

  if (status === "error" || !result) {
    return (
      <ReportState
        eyebrow="Career Interest Report"
        title="Your career report could not be loaded."
        message={
          errorMessage ||
          "The completed career result is unavailable."
        }
        actions={[
          {
            href: `/career/result/${sessionId}`,
            label: "Back to result",
          },
          {
            href: "/career/test",
            label: "New assessment",
            variant: "secondary",
          },
        ]}
      />
    );
  }

  const topThree = result.ranking.slice(0, 3);
  const topNames = topThree
    .map((dimension) => getRiasecDimensionProfile(dimension).name)
    .join(" · ");

  return (
    <ReportShell>
        <ReportHeader
          eyebrow="InnerGeodessa Complete Career Interest Report"
          subtitle="RIASEC professional report"
          title={result.code}
          description={
            <>
              <p className="text-xl font-semibold text-[#26372d]">
                {topNames}
              </p>

              <p className="mt-4">
                A detailed interpretation of your six career-interest
                dimensions, preferred work environment, career fields,
                skills, risks, and next actions.
              </p>
            </>
          }
          metadata={
            <ReportMetadata
              items={[
                {
                  label: "Completed",
                  value: formatDate(result.completedAt),
                },
                {
                  label: "Question bank",
                  value: result.questionBankVersion,
                },
                {
                  label: "Session",
                  value: `${sessionId.slice(0, 8)}…`,
                },
              ]}
            />
          }
          actions={<ReportPrintButton />}
        />

        <nav
          id="career-report-table-of-contents"
          aria-label="Career report table of contents"
          className="report-table-of-contents mt-10 border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9"
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            Table of contents
          </h2>

          <p className="mt-3 leading-7 text-[#596158]">
            Navigate directly to any section of your report.
          </p>

          <ol className="mt-7 grid gap-px bg-[#d8d2c6] sm:grid-cols-2">
            {sections.map((section) => (
              <li key={section.id} className="bg-[#f7f4ec]">
                <a
                  href={`#${createAnchor(
                    section.order,
                    section.id,
                  )}`}
                  className="grid min-h-16 grid-cols-[auto_1fr] items-center gap-4 px-4 py-3"
                >
                  <span className="text-xs font-bold tabular-nums tracking-[0.12em] text-[#7c684d]">
                    {String(section.order).padStart(2, "0")}
                  </span>

                  <span className="font-semibold">
                    {section.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="personality-report-sections mt-12 space-y-12">
          {sections.map((section) => (
            <section
              key={section.id}
              id={createAnchor(section.order, section.id)}
              className="personality-report-section border border-[#c8c2b5] bg-[#f7f4ec]"
            >
              <header className="personality-report-section-header report-print-section-heading-group border-b border-[#d8d2c6] p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                  Section {section.order}
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  {section.title}
                </h2>

                <p className="mt-4 max-w-4xl leading-7 text-[#596158]">
                  {section.description}
                </p>
              </header>

              <div className="divide-y divide-[#d8d2c6]">
                {section.blocks.map((block) => (
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
                      {block.content}
                    </p>
                  </article>
                ))}
              </div>

              <div className="report-back-to-contents report-interactive-only border-t border-[#d8d2c6] px-7 py-5 md:px-9">
                <a
                  href="#career-report-table-of-contents"
                  className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d746b] underline underline-offset-4"
                >
                  Back to contents
                </a>
              </div>
            </section>
          ))}
        </div>

        <div className="report-interactive-only mt-12 flex flex-wrap gap-4 border-t border-[#c8c2b5] pt-8">
          <Link
            href={`/career/result/${sessionId}`}
            className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
          >
            Back to career result
          </Link>

          <Link
            href="/career"
            className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em]"
          >
            Career overview
          </Link>
        </div>
    </ReportShell>
  );
}
