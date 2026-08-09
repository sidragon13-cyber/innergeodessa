"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  SaveAssessmentResult,
} from "@/components/account";
import {
  PaddleCheckoutButton,
} from "@/components/payment/paddle-checkout-button";
import {
  ResultHeader,
  ResultNavigation,
  ResultShell,
  ResultState,
} from "@/components/result";
import {
  useLocale,
} from "@/components/locale";
import {
  fetchRiasecResult,
  isRiasecResultContract,
  type RiasecResultContract,
} from "@/data/career";
import {
  getCareerResultDictionary,
} from "@/data/i18n";

type ResultStatus =
  | "loading"
  | "ready"
  | "error";

type PremiumAccessState =
  | "loading"
  | "owned-locked"
  | "unlocked"
  | "unavailable";

function formatDate(
  value: string,
  locale: string,
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function readCachedResult(
  sessionId: string,
): RiasecResultContract | null {
  try {
    const storageKey =
      `innergeodessa-career-result-${sessionId}`;

    const cachedValue =
      window.sessionStorage.getItem(storageKey) ??
      window.localStorage.getItem(storageKey);

    if (!cachedValue) {
      return null;
    }

    const parsed: unknown =
      JSON.parse(cachedValue);

    if (
      !isRiasecResultContract(parsed) ||
      parsed.sessionId !== sessionId
    ) {
      window.sessionStorage.removeItem(
        storageKey,
      );
      window.localStorage.removeItem(
        storageKey,
      );

      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export default function CareerResultPage() {
  const params =
    useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const { locale } = useLocale();
  const dictionary =
    getCareerResultDictionary(locale);

  const [status, setStatus] =
    useState<ResultStatus>("loading");
  const [result, setResult] =
    useState<RiasecResultContract | null>(
      null,
    );
  const [errorMessage, setErrorMessage] =
    useState("");
  const [premiumAccess, setPremiumAccess] =
    useState<PremiumAccessState>("loading");

  useEffect(() => {
    let active = true;

    async function loadResult() {
      if (!sessionId) {
        setStatus("error");
        setErrorMessage(
          dictionary.errors.missingSession,
        );
        return;
      }

      const cachedResult =
        readCachedResult(sessionId);

      if (cachedResult) {
        setResult(cachedResult);
        setStatus("ready");
        return;
      }

      try {
        const fetchedResult =
          await fetchRiasecResult(sessionId);

        if (!active) {
          return;
        }

        const storageKey =
          `innergeodessa-career-result-${sessionId}`;
        const serializedResult =
          JSON.stringify(fetchedResult);

        window.sessionStorage.setItem(
          storageKey,
          serializedResult,
        );
        window.localStorage.setItem(
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
            : dictionary.errors.loadResult,
        );
        setStatus("error");
      }
    }

    void loadResult();

    return () => {
      active = false;
    };
  }, [sessionId, dictionary]);

  useEffect(() => {
    let cancelled = false;

    async function loadPremiumAccess() {
      try {
        const response = await fetch(
          `/api/account/report-access/career/${encodeURIComponent(
            sessionId,
          )}`,
          { cache: "no-store" },
        );

        if (cancelled) {
          return;
        }

        if (!response.ok) {
          setPremiumAccess("unavailable");
          return;
        }

        const access = (await response.json()) as {
          canViewFullReport?: boolean;
        };

        setPremiumAccess(
          access.canViewFullReport
            ? "unlocked"
            : "owned-locked",
        );
      } catch {
        if (!cancelled) {
          setPremiumAccess("unavailable");
        }
      }
    }

    void loadPremiumAccess();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const totalAnswered = useMemo(() => {
    if (!result) {
      return 0;
    }

    return Object.values(
      result.answered,
    ).reduce(
      (total, count) => total + count,
      0,
    );
  }, [result]);

  if (status === "loading") {
    return (
      <ResultState
        eyebrow={
          dictionary.states.loading.eyebrow
        }
        title={
          dictionary.states.loading.title
        }
        message={
          dictionary.states.loading.message
        }
      />
    );
  }

  if (status === "error" || !result) {
    return (
      <ResultState
        eyebrow={
          dictionary.states.error.eyebrow
        }
        title={
          dictionary.states.error.title
        }
        message={
          errorMessage ||
          dictionary.states.error
            .fallbackMessage
        }
        actions={[
          {
            href: "/career/test",
            label:
              dictionary.states.error.action,
          },
        ]}
      />
    );
  }

  const topThree =
    result.ranking.slice(0, 3);

  return (
    <ResultShell>
      <ResultHeader
        eyebrow={dictionary.header.eyebrow}
        title={
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {dictionary.header.title}
          </h1>
        }
        description={
          <p>{dictionary.header.description}</p>
        }
        metadata={
          <div className="border border-[#d5d0c4] bg-[#f7f4ec] px-10 py-7 text-center">
            <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#68756d]">
              {dictionary.header.codeLabel}
            </span>

            <strong className="mt-2 block text-6xl tracking-[0.12em] text-[#26372d]">
              {result.code}
            </strong>
          </div>
        }
      />

      <section className="mt-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#68756d]">
            {dictionary.topInterests.eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            {dictionary.topInterests.title}
          </h2>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {topThree.map(
            (dimension, index) => {
              const profile =
                dictionary.dimensions[
                  dimension
                ];

              return (
                <article
                  key={dimension}
                  className="rounded-3xl border border-[#ddd8cd] bg-white p-7 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#68756d]">
                      {dictionary.topInterests.rank(
                        index + 1,
                      )}
                    </span>

                    <span className="text-3xl font-semibold">
                      {dimension}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">
                    {profile.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-[#68756d]">
                    {profile.secondaryName}
                  </p>

                  <p className="mt-4 leading-7 text-[#58645d]">
                    {profile.description}
                  </p>

                  <div className="mt-6 border-t border-[#ebe7df] pt-5">
                    <p className="text-3xl font-semibold">
                      {Math.round(
                        result.percentages[
                          dimension
                        ],
                      )}
                      %
                    </p>

                    <p className="mt-1 text-sm text-[#68756d]">
                      {dictionary.topInterests.score(
                        result.scores[
                          dimension
                        ],
                      )}
                    </p>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-[#ddd8cd] bg-white p-7 shadow-sm sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#68756d]">
          {dictionary.fullProfile.eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-semibold">
          {dictionary.fullProfile.title}
        </h2>

        <div className="mt-8 space-y-6">
          {result.ranking.map(
            (dimension) => {
              const profile =
                dictionary.dimensions[
                  dimension
                ];
              const percentage = Math.round(
                result.percentages[
                  dimension
                ],
              );

              return (
                <div key={dimension}>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {dimension} ·{" "}
                        {profile.name}
                      </p>

                      <p className="mt-1 text-sm text-[#68756d]">
                        {profile.secondaryName} ·{" "}
                        {profile.shortLabel}
                      </p>
                    </div>

                    <p className="font-semibold">
                      {dictionary.fullProfile.score(
                        percentage,
                        result.scores[
                          dimension
                        ],
                      )}
                    </p>
                  </div>

                  <div
                    className="mt-3 h-3 overflow-hidden rounded-full bg-[#ebe7df]"
                    aria-label={dictionary.fullProfile.ariaLabel(
                      profile.name,
                      percentage,
                    )}
                  >
                    <div
                      className="h-full rounded-full bg-[#355947]"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(
                            100,
                            percentage,
                          ),
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#ddd8cd] bg-white p-6">
          <p className="text-sm text-[#68756d]">
            {
              dictionary.summary
                .questionsAnswered
            }
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {totalAnswered}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ddd8cd] bg-white p-6">
          <p className="text-sm text-[#68756d]">
            {
              dictionary.summary
                .questionBankVersion
            }
          </p>

          <p className="mt-2 break-words text-lg font-semibold">
            {result.questionBankVersion}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ddd8cd] bg-white p-6">
          <p className="text-sm text-[#68756d]">
            {dictionary.summary.completed}
          </p>

          <p className="mt-2 text-lg font-semibold">
            {formatDate(
              result.completedAt,
              dictionary.dateLocale,
            )}
          </p>
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-[#34483a] p-8 text-[#f1eee5] sm:p-10 print:hidden">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c7d0c8]">
          {dictionary.report.eyebrow}
        </p>

        <h2 className="mt-4 text-3xl font-semibold">
          {dictionary.report.title(
            result.code,
          )}
        </h2>

        <p className="mt-5 max-w-3xl leading-8 text-[#d6ddd6]">
          {dictionary.report.description}
        </p>

        {premiumAccess === "owned-locked" ? (
          <>
            <PaddleCheckoutButton
              module="career"
              resourceId={sessionId}
              label={
                locale === "zh"
                  ? "购买完整职业报告 — $9.99"
                  : "Buy Full Career Report — $9.99"
              }
              className="mt-8 inline-flex min-h-12 items-center border border-[#aeb8af] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5] transition-colors hover:bg-[#f1eee5] hover:text-[#34483a] disabled:cursor-wait disabled:opacity-70"
            />
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#d6ddd6]">
              {locale === "zh"
                ? "基础测试可随时免费重测。每次新的完整报告需单独购买；已购买报告永久保留。"
                : "Free retakes anytime. Each new Premium Report is purchased separately; previously purchased reports remain available permanently."}
            </p>
          </>
        ) : premiumAccess === "unlocked" ? (
          <Link
            href={`/career/report/${sessionId}`}
            className="mt-8 inline-flex min-h-12 items-center border border-[#aeb8af] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5] transition-colors hover:bg-[#f1eee5] hover:text-[#34483a]"
          >
            {dictionary.report.action(
              result.code,
            )}
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-8 inline-flex min-h-12 cursor-not-allowed items-center border border-[#aeb8af] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5] opacity-70"
          >
            {locale === "zh"
              ? "正在确认报告权限"
              : "Checking report access"}
          </button>
        )}

        <SaveAssessmentResult
          module="career"
          sessionId={sessionId}
          className="mt-8"
        />
      </section>

      <div className="mt-10 print:hidden">
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
          >
            {dictionary.print.savePdf}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#26372d]"
          >
            {dictionary.print.printReport}
          </button>
        </div>

        <ResultNavigation
          className="mt-6"
          primary={{
            href: "/career/test",
            label:
              dictionary.navigation.retake,
          }}
          secondary={{
            href: "/career",
            label:
              dictionary.navigation.overview,
          }}
        />
      </div>
    </ResultShell>
  );
}
