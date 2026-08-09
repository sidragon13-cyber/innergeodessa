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

type ReportAccessState =
  | "loading"
  | "unlocked"
  | "locked"
  | "unauthenticated"
  | "error";

type ReportAccessResponse = {
  module: "personality" | "career" | "zodiac";
  resourceId: string;
  authenticated: true;
  emailVerified: true;
  ownsResource: true;
  entitlementStatus:
    | "pending"
    | "unlocked"
    | "revoked"
    | "refunded"
    | null;
  canViewFullReport: boolean;
  canPrint: boolean;
  canDownloadPdf: boolean;
};

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
  const [accessState, setAccessState] =
    useState<ReportAccessState>("loading");

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

  useEffect(() => {
    let cancelled = false;

    async function loadReportAccess() {
      try {
        const response = await fetch(
          `/api/account/report-access/personality/${encodeURIComponent(
            sessionId,
          )}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (cancelled) {
          return;
        }

        if (response.status === 401 || response.status === 403) {
          setAccessState("unauthenticated");
          return;
        }

        if (!response.ok) {
          setAccessState("error");
          return;
        }

        const access =
          (await response.json()) as ReportAccessResponse;

        setAccessState(
          access.canViewFullReport
            ? "unlocked"
            : "locked",
        );
      } catch {
        if (!cancelled) {
          setAccessState("error");
        }
      }
    }

    loadReportAccess();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

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

  if (accessState === "loading") {
    return (
      <ReportState
        label={locale === "zh" ? "正在验证访问权限" : "Checking access"}
        title={
          locale === "zh"
            ? "正在确认高级报告权限"
            : "Confirming premium report access"
        }
        message={
          locale === "zh"
            ? "请稍候，我们正在确认此报告是否已解锁。"
            : "Please wait while we confirm whether this report is unlocked."
        }
        sessionId={sessionId}
        resultLabel={dictionary.states.actions.result}
        overviewLabel={dictionary.states.actions.overview}
      />
    );
  }

  if (accessState === "unauthenticated") {
    return (
      <ReportState
        label={locale === "zh" ? "需要账户验证" : "Account required"}
        title={
          locale === "zh"
            ? "请登录并完成邮箱验证"
            : "Sign in and verify your email"
        }
        message={
          locale === "zh"
            ? "高级报告仅向已登录并完成邮箱验证、且拥有该测评结果的用户开放。"
            : "Premium reports are available only to signed-in, email-verified users who own this assessment result."
        }
        sessionId={sessionId}
        resultLabel={dictionary.states.actions.result}
        overviewLabel={dictionary.states.actions.overview}
      />
    );
  }

  if (accessState === "locked") {
    return (
      <ReportState
        label={locale === "zh" ? "高级报告" : "Premium report"}
        title={
          locale === "zh"
            ? "完整报告尚未解锁"
            : "Your full report is not unlocked yet"
        }
        message={
          locale === "zh"
            ? "你仍然可以查看免费结果。购买高级报告后，此页面将自动开放完整内容、打印和 PDF 下载权限。"
            : "You can continue viewing your free result. After purchasing the premium report, this page will unlock the full report, printing, and PDF access."
        }
        sessionId={sessionId}
        resultLabel={dictionary.states.actions.result}
        overviewLabel={dictionary.states.actions.overview}
      />
    );
  }

  if (accessState === "error") {
    return (
      <ReportState
        label={locale === "zh" ? "访问检查失败" : "Access check unavailable"}
        title={
          locale === "zh"
            ? "暂时无法确认报告权限"
            : "We could not confirm report access"
        }
        message={
          locale === "zh"
            ? "请稍后重新尝试。你的测评结果不会因此受到影响。"
            : "Please try again shortly. Your assessment result is not affected."
        }
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
      locale,
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
