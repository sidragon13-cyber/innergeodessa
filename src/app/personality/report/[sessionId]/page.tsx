"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import {
  fetchPersonalityResult,
  isPersonalityResultContract,
  PersonalityResultRequestError,
  type PersonalityResultContract,
} from "@/data/assessment/scoring/personality";
import {
  createReportDimensions,
  generatePersonalityReport,
  isPhaseOnePersonalityReportType,
} from "@/data/report";
import {
  getLocalizedText,
  type SupportedLocale,
} from "@/data/shared";

import { PrintReportButton } from "./print-report-button";
import { createReportSectionAnchor } from "./section-navigation";

type ReportLoadState =
  | "loading"
  | "ready"
  | "not-found"
  | "not-completed"
  | "error";

function readCachedResult(
  storedResult: string | null,
  sessionId: string,
): PersonalityResultContract | null {
  if (!storedResult) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(storedResult);

    return (
      isPersonalityResultContract(parsed) &&
      parsed.sessionId === sessionId
    )
      ? parsed
      : null;
  } catch {
    return null;
  }
}

function subscribeToSessionStorage() {
  return () => {};
}

function getFailureState(error: unknown): ReportLoadState {
  if (error instanceof PersonalityResultRequestError) {
    if (error.status === 404) {
      return "not-found";
    }

    if (error.status === 409) {
      return "not-completed";
    }
  }

  return "error";
}

function formatGeneratedDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function ReportState({
  label,
  title,
  message,
  sessionId,
}: {
  label: string;
  title: string;
  message: string;
  sessionId: string;
}) {
  return (
    <main className="min-h-screen bg-[#efede5] px-6 py-20 text-[#26372d]">
      <section className="mx-auto max-w-3xl border border-[#c8c2b5] bg-[#f7f4ec] p-8 md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
          {label}
        </p>

        <h1 className="mt-4 text-3xl font-semibold">
          {title}
        </h1>

        <p className="mt-5 leading-7 text-[#596158]">
          {message}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/personality/result/${sessionId}`}
            className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
          >
            Free result
          </Link>

          <Link
            href="/personality"
            className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em]"
          >
            Personality overview
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function PersonalityReportPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;
  const locale: SupportedLocale = "en";
  const storageKey = `innergeodessa-result-${sessionId}`;
  const storedResult = useSyncExternalStore(
    subscribeToSessionStorage,
    () => sessionStorage.getItem(storageKey),
    () => null,
  );
  const cachedResult = readCachedResult(
    storedResult,
    sessionId,
  );
  const [result, setResult] =
    useState<PersonalityResultContract | null>(null);
  const [loadState, setLoadState] =
    useState<ReportLoadState>("loading");

  useEffect(() => {
    const previewResult = readCachedResult(
      sessionStorage.getItem(storageKey),
      sessionId,
    );

    if (
      sessionId.startsWith("preview-") &&
      previewResult?.questionBankVersion === "preview"
    ) {
      return;
    }

    let cancelled = false;

    async function loadPersistedResult() {
      try {
        const persistedResult =
          await fetchPersonalityResult(sessionId);

        if (cancelled) {
          return;
        }

        setResult(persistedResult);
        setLoadState("ready");
        sessionStorage.setItem(
          storageKey,
          JSON.stringify(persistedResult),
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        setResult(null);
        setLoadState(getFailureState(error));
      }
    }

    loadPersistedResult();

    return () => {
      cancelled = true;
    };
  }, [sessionId, storageKey]);

  const displayResult = result ?? cachedResult;

  if (loadState === "loading" && !displayResult) {
    return (
      <ReportState
        label="Loading report"
        title="Loading your complete personality report…"
        message="Retrieving the completed assessment from the result service."
        sessionId={sessionId}
      />
    );
  }

  if (loadState === "not-found") {
    return (
      <ReportState
        label="Result not found"
        title="This report could not be found."
        message="Check the result link or complete a new personality assessment."
        sessionId={sessionId}
      />
    );
  }

  if (loadState === "not-completed") {
    return (
      <ReportState
        label="Assessment not completed"
        title="This assessment has not been completed."
        message="Return to the assessment and answer all questions before viewing the report."
        sessionId={sessionId}
      />
    );
  }

  if (loadState === "error" || !displayResult) {
    return (
      <ReportState
        label="Unable to load report"
        title="Your report could not be loaded."
        message="The result service is temporarily unavailable. Please try again later."
        sessionId={sessionId}
      />
    );
  }

  if (!isPhaseOnePersonalityReportType(displayResult.type)) {
    return (
      <ReportState
        label="Complete report unavailable"
        title={`${displayResult.type} complete reports are not available in Phase 1.`}
        message="Your free personality result remains available. Complete reports currently support ISFJ and ENTJ while the remaining personality reports complete validation."
        sessionId={sessionId}
      />
    );
  }

  let report;

  try {
    report = generatePersonalityReport({
      sessionId,
      personalityType: displayResult.type,
      dimensions: createReportDimensions(displayResult),
      accessLevel: "premium",
      generatedAt: displayResult.calculatedAt,
    });
  } catch {
    return (
      <ReportState
        label="Unable to generate report"
        title="Your complete report could not be generated."
        message="Your persisted free result is still available. Please try the complete report again later."
        sessionId={sessionId}
      />
    );
  }

  const orderedSections = [...report.sections].sort(
    (left, right) => left.order - right.order,
  );
  const navigationSections = orderedSections.map(
    (section) => ({
      section,
      title: getLocalizedText(section.title, locale),
      anchor: createReportSectionAnchor(
        section.order,
        section.id,
      ),
    }),
  );

  return (
    <main className="personality-report min-h-screen bg-[#efede5] px-6 py-12 text-[#26372d] md:py-20">
      <div className="personality-report-container mx-auto max-w-6xl">
        <header className="personality-report-header border-b border-[#c8c2b5] pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6d746b]">
            InnerGeodessa Complete Personality Report
          </p>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm text-[#6d746b]">
                Premium report
              </p>

              <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
                {report.personalityType}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#596158]">
                A contextual report generated from your persisted
                dimension scores and confidence pattern.
              </p>
            </div>

            <div>
              <dl className="report-print-compact-block grid grid-cols-[auto_auto] gap-x-5 gap-y-1 text-sm leading-6 text-[#6d746b] lg:text-right">
                <dt>Report</dt>
                <dd>{report.version.reportVersion}</dd>
                <dt>Content</dt>
                <dd>{report.version.contentVersion}</dd>
                <dt>Rules</dt>
                <dd>{report.version.ruleVersion}</dd>
                <dt>Applied rules</dt>
                <dd>{report.metadata.appliedRuleCount}</dd>
                <dt>Generated</dt>
                <dd>
                  {formatGeneratedDate(report.generatedAt)}
                </dd>
              </dl>

              <div className="report-interactive-only mt-6 flex flex-col items-start gap-3 lg:items-end">
                <PrintReportButton />

                <p className="report-interactive-only report-print-guidance max-w-xs text-xs leading-5 text-[#6d746b] lg:text-right">
                  For a clean PDF, disable browser headers and
                  footers in the print dialog.
                </p>
              </div>
            </div>
          </div>
        </header>

        <nav
          id="report-table-of-contents"
          aria-label="Report table of contents"
          className="report-table-of-contents mt-10 border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9"
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            Table of contents
          </h2>

          <p className="mt-3 leading-7 text-[#596158]">
            Navigate directly to any section of your report.
          </p>

          <ol className="mt-7 grid gap-px bg-[#d8d2c6] sm:grid-cols-2">
            {navigationSections.map(
              ({ section, title, anchor }) => (
                <li
                  key={section.id}
                  className="bg-[#f7f4ec]"
                >
                  <a
                    href={`#${anchor}`}
                    className="grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#34483a]"
                  >
                    <span className="text-xs font-bold tabular-nums tracking-[0.12em] text-[#7c684d]">
                      {String(section.order).padStart(2, "0")}
                    </span>

                    <span className="font-semibold">
                      {title}
                    </span>

                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#6d746b]">
                      {section.access}
                    </span>
                  </a>
                </li>
              ),
            )}
          </ol>
        </nav>

        <div className="personality-report-sections mt-12 space-y-12">
          {navigationSections.map(
            ({ section, title, anchor }) => (
              <section
                key={section.id}
                id={anchor}
                className="personality-report-section border border-[#c8c2b5] bg-[#f7f4ec]"
              >
                <header className="personality-report-section-header report-print-section-heading-group border-b border-[#d8d2c6] p-7 md:p-9">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                      Section {section.order}
                    </p>

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7c684d]">
                      {section.access}
                    </p>
                  </div>

                  <h2 className="mt-4 text-3xl font-semibold">
                    {title}
                  </h2>

                  <p className="mt-4 max-w-4xl leading-7 text-[#596158]">
                    {getLocalizedText(
                      section.description,
                      locale,
                    )}
                  </p>
                </header>

                <div className="divide-y divide-[#d8d2c6]">
                  {section.contentBlocks.map((contentBlock) => (
                    <article
                      key={contentBlock.id}
                      className="personality-report-content-block report-print-flow-block p-7 md:p-9"
                    >
                      <div className="report-print-content-heading-group">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7c684d]">
                          {contentBlock.type}
                        </p>

                        {contentBlock.title && (
                          <h3 className="mt-3 text-xl font-semibold">
                            {getLocalizedText(
                              contentBlock.title,
                              locale,
                            )}
                          </h3>
                        )}
                      </div>

                      <p className="mt-4 max-w-4xl whitespace-pre-line leading-8 text-[#596158]">
                        {getLocalizedText(
                          contentBlock.content,
                          locale,
                        )}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="report-back-to-contents report-interactive-only border-t border-[#d8d2c6] px-7 py-5 md:px-9">
                  <a
                    href="#report-table-of-contents"
                    className="inline-flex min-h-10 items-center text-xs font-bold uppercase tracking-[0.14em] text-[#6d746b] underline decoration-[#a8a194] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34483a]"
                  >
                    Back to contents
                  </a>
                </div>
              </section>
            ),
          )}
        </div>

        <div className="report-interactive-only mt-12 flex flex-col gap-4 border-t border-[#c8c2b5] pt-8 sm:flex-row">
          <Link
            href={`/personality/result/${sessionId}`}
            className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
          >
            Back to free result
          </Link>

          <Link
            href="/personality"
            className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em]"
          >
            Personality overview
          </Link>
        </div>
      </div>
    </main>
  );
}
