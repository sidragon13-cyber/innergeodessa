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

import { ReportDocument } from "./report-document";

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

  return (
    <ReportDocument
      locale="en"
      report={report}
    />
  );
}
