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
  useLocale,
} from "@/components/locale";
import {
  getPersonalityReportDictionary,
} from "@/data/i18n";

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
  resultLabel,
  overviewLabel,
}: {
  label: string;
  title: string;
  message: string;
  sessionId: string;
  resultLabel: string;
  overviewLabel: string;
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
            {resultLabel}
          </Link>

          <Link
            href="/personality"
            className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em]"
          >
            {overviewLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function PersonalityReportPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;
  const { locale } = useLocale();
  const dictionary =
    getPersonalityReportDictionary(locale);
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
        label={dictionary.states.loading.label}
        title={dictionary.states.loading.title}
        message={dictionary.states.loading.message}
        sessionId={sessionId}
        resultLabel={dictionary.states.actions.result}
        overviewLabel={dictionary.states.actions.overview}
      />
    );
  }

  if (loadState === "not-found") {
    return (
      <ReportState
        label={dictionary.states.notFound.label}
        title={dictionary.states.notFound.title}
        message={dictionary.states.notFound.message}
        sessionId={sessionId}
        resultLabel={dictionary.states.actions.result}
        overviewLabel={dictionary.states.actions.overview}
      />
    );
  }

  if (loadState === "not-completed") {
    return (
      <ReportState
        label={dictionary.states.notCompleted.label}
        title={dictionary.states.notCompleted.title}
        message={dictionary.states.notCompleted.message}
        sessionId={sessionId}
        resultLabel={dictionary.states.actions.result}
        overviewLabel={dictionary.states.actions.overview}
      />
    );
  }

  if (loadState === "error" || !displayResult) {
    return (
      <ReportState
        label={dictionary.states.error.label}
        title={dictionary.states.error.title}
        message={dictionary.states.error.message}
        sessionId={sessionId}
        resultLabel={dictionary.states.actions.result}
        overviewLabel={dictionary.states.actions.overview}
      />
    );
  }

  if (!isPhaseOnePersonalityReportType(displayResult.type)) {
    return (
      <ReportState
        label={dictionary.states.unavailable.label}
        title={dictionary.states.unavailable.title(
          displayResult.type,
        )}
        message={dictionary.states.unavailable.message}
        sessionId={sessionId}
        resultLabel={dictionary.states.actions.result}
        overviewLabel={dictionary.states.actions.overview}
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
        label={dictionary.states.generationError.label}
        title={dictionary.states.generationError.title}
        message={dictionary.states.generationError.message}
        sessionId={sessionId}
        resultLabel={dictionary.states.actions.result}
        overviewLabel={dictionary.states.actions.overview}
      />
    );
  }

  return (
    <ReportDocument
      locale={locale}
      report={report}
    />
  );
}
