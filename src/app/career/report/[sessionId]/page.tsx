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
  ReportSection,
  ReportShell,
  ReportState,
  ReportTableOfContents,
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

        <ReportTableOfContents
          id="career-report-table-of-contents"
          ariaLabel="Career report table of contents"
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
              tableOfContentsId="career-report-table-of-contents"
              blocks={section.blocks.map((block) => ({
                id: block.id,
                label: block.type,
                title: block.title,
                content: block.content,
              }))}
            />
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
