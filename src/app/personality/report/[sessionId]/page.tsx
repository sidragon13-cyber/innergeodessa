"use client";

import Link from "next/link";
import {
  useParams,
} from "next/navigation";

import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import {
  isPersonalityResultContract,
  type PersonalityResultContract,
} from "@/data/assessment/scoring/personality";

import {
  useLocale,
} from "@/components/locale";

import {
  getPersonalityReportDictionary,
} from "@/data/i18n";

import {
  fetchFixedPersonalityReport,
  FixedPersonalityReportRequestError,
  isFixedPersonalityReportDelivery,
  type FixedPersonalityReportDelivery,
} from "@/data/report/fixed-assets/fixed-report-client";

import {
  FixedReportDocument,
} from "./fixed-report-document";

type FixedReportLoadState =
  | "loading"
  | "ready"
  | "locked"
  | "unauthenticated"
  | "not-found"
  | "error";

function readCachedResult(
  storedResult:
    string | null,
  sessionId:
    string,
): PersonalityResultContract | null {
  if (!storedResult) {
    return null;
  }

  try {
    const parsed: unknown =
      JSON.parse(
        storedResult,
      );

    return (
      isPersonalityResultContract(
        parsed,
      ) &&
      parsed.sessionId ===
        sessionId
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
  const params =
    useParams<{
      sessionId: string;
    }>();

  const sessionId =
    params.sessionId;

  const {
    locale,
  } = useLocale();

  const storageKey =
    `innergeodessa-result-${sessionId}`;

  const storedResult =
    useSyncExternalStore(
      subscribeToSessionStorage,
      () =>
        sessionStorage.getItem(
          storageKey,
        ),
      () => null,
    );

  const cachedResult =
    readCachedResult(
      storedResult,
      sessionId,
    );

  const isPreviewSession =
    sessionId.startsWith(
      "preview-",
    );

  const previewResult =
    isPreviewSession &&
    cachedResult?.questionBankVersion ===
      "preview"
      ? cachedResult
      : null;

  const [
    delivery,
    setDelivery,
  ] =
    useState<FixedPersonalityReportDelivery | null>(
      null,
    );

  const [
    loadState,
    setLoadState,
  ] =
    useState<FixedReportLoadState>(
      "loading",
    );

  useEffect(() => {
    let cancelled =
      false;

    setDelivery(null);
    setLoadState(
      "loading",
    );

    async function loadReport() {
      try {
        let nextDelivery:
          FixedPersonalityReportDelivery;

        if (isPreviewSession) {
          if (!previewResult) {
            if (!cancelled) {
              setLoadState(
                "error",
              );
            }

            return;
          }

          const response =
            await fetch(
              `/api/dev/personality-report-preview/${encodeURIComponent(
                sessionId,
              )}`,
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body:
                  JSON.stringify(
                    previewResult,
                  ),
                cache: "no-store",
              },
            );

          const body: unknown =
            await response
              .json()
              .catch(
                () => null,
              );

          if (
            !response.ok ||
            !isFixedPersonalityReportDelivery(
              body,
            ) ||
            body.sessionId !==
              sessionId
          ) {
            throw new Error(
              "Unable to load fixed personality preview.",
            );
          }

          nextDelivery =
            body;
        } else {
          nextDelivery =
            await fetchFixedPersonalityReport(
              sessionId,
            );
        }

        if (cancelled) {
          return;
        }

        setDelivery(
          nextDelivery,
        );

        setLoadState(
          "ready",
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        setDelivery(null);

        if (
          !isPreviewSession &&
          error instanceof
            FixedPersonalityReportRequestError
        ) {
          if (
            error.code ===
              "authentication-required"
          ) {
            setLoadState(
              "unauthenticated",
            );

            return;
          }

          if (
            error.code ===
              "report-locked"
          ) {
            setLoadState(
              "locked",
            );

            return;
          }

          if (
            error.code ===
              "resource-not-found"
          ) {
            setLoadState(
              "not-found",
            );

            return;
          }
        }

        setLoadState(
          "error",
        );
      }
    }

    void loadReport();

    return () => {
      cancelled =
        true;
    };
  }, [
    isPreviewSession,
    sessionId,
    storedResult,
  ]);

  const reportLocale =
    delivery?.locale ??
    locale;

  const dictionary =
    getPersonalityReportDictionary(
      reportLocale,
    );

  if (
    loadState === "loading"
  ) {
    return (
      <ReportState
        label={
          reportLocale === "zh"
            ? "正在加载报告"
            : "Loading report"
        }
        title={
          reportLocale === "zh"
            ? "正在验证并准备完整报告"
            : "Preparing your complete report"
        }
        message={
          reportLocale === "zh"
            ? "请稍候，我们正在验证报告权限并加载你的完整人格报告。"
            : "Please wait while we verify access and load your complete personality report."
        }
        sessionId={
          sessionId
        }
        resultLabel={
          dictionary.states.actions
            .result
        }
        overviewLabel={
          dictionary.states.actions
            .overview
        }
      />
    );
  }

  if (
    loadState ===
    "unauthenticated"
  ) {
    return (
      <ReportState
        label={
          reportLocale === "zh"
            ? "需要账户验证"
            : "Account required"
        }
        title={
          reportLocale === "zh"
            ? "请登录并完成邮箱验证"
            : "Sign in and verify your email"
        }
        message={
          reportLocale === "zh"
            ? "高级报告仅向已登录并完成邮箱验证、且拥有该测评结果的用户开放。"
            : "Premium reports are available only to signed-in, email-verified users who own this assessment result."
        }
        sessionId={
          sessionId
        }
        resultLabel={
          dictionary.states.actions
            .result
        }
        overviewLabel={
          dictionary.states.actions
            .overview
        }
      />
    );
  }

  if (
    loadState === "locked"
  ) {
    return (
      <ReportState
        label={
          reportLocale === "zh"
            ? "高级报告"
            : "Premium report"
        }
        title={
          reportLocale === "zh"
            ? "完整报告尚未解锁"
            : "Your full report is not unlocked yet"
        }
        message={
          reportLocale === "zh"
            ? "你仍然可以查看免费结果。购买高级报告后，此页面将开放完整内容、打印和 PDF 权限。"
            : "You can continue viewing your free result. After purchasing the premium report, this page will unlock the full report, printing, and PDF access."
        }
        sessionId={
          sessionId
        }
        resultLabel={
          dictionary.states.actions
            .result
        }
        overviewLabel={
          dictionary.states.actions
            .overview
        }
      />
    );
  }

  if (
    loadState ===
    "not-found"
  ) {
    return (
      <ReportState
        label={
          dictionary.states
            .notFound.label
        }
        title={
          dictionary.states
            .notFound.title
        }
        message={
          dictionary.states
            .notFound.message
        }
        sessionId={
          sessionId
        }
        resultLabel={
          dictionary.states.actions
            .result
        }
        overviewLabel={
          dictionary.states.actions
            .overview
        }
      />
    );
  }

  if (
    loadState === "error" ||
    !delivery
  ) {
    return (
      <ReportState
        label={
          reportLocale === "zh"
            ? "报告加载失败"
            : "Report unavailable"
        }
        title={
          reportLocale === "zh"
            ? "暂时无法加载完整报告"
            : "We could not load your complete report"
        }
        message={
          reportLocale === "zh"
            ? "请稍后重新尝试。你的测评结果不会因此受到影响。"
            : "Please try again shortly. Your assessment result is not affected."
        }
        sessionId={
          sessionId
        }
        resultLabel={
          dictionary.states.actions
            .result
        }
        overviewLabel={
          dictionary.states.actions
            .overview
        }
      />
    );
  }

  return (
    <FixedReportDocument
      locale={
        delivery.locale
      }
      sessionId={
        delivery.sessionId
      }
      generatedAt={
        delivery.generatedAt
      }
      report={
        delivery.report
      }
    />
  );
}
