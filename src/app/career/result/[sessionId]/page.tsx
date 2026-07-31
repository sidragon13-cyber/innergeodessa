"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  fetchRiasecResult,
  getRiasecDimensionProfile,
  isRiasecResultContract,
  type RiasecDimension,
  type RiasecResultContract,
} from "@/data/career";

type ResultStatus = "loading" | "ready" | "error";

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

function readCachedResult(
  sessionId: string,
): RiasecResultContract | null {
  try {
    const cachedValue = window.sessionStorage.getItem(
      `innergeodessa-career-result-${sessionId}`,
    );

    if (!cachedValue) {
      return null;
    }

    const parsed: unknown = JSON.parse(cachedValue);

    if (
      !isRiasecResultContract(parsed) ||
      parsed.sessionId !== sessionId
    ) {
      window.sessionStorage.removeItem(
        `innergeodessa-career-result-${sessionId}`,
      );
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export default function CareerResultPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const [status, setStatus] = useState<ResultStatus>("loading");
  const [result, setResult] =
    useState<RiasecResultContract | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadResult() {
      if (!sessionId) {
        setStatus("error");
        setErrorMessage("The assessment session ID is missing.");
        return;
      }

      const cachedResult = readCachedResult(sessionId);

      if (cachedResult) {
        setResult(cachedResult);
        setStatus("ready");
        return;
      }

      try {
        const fetchedResult = await fetchRiasecResult(sessionId);

        if (!active) {
          return;
        }

        const storageKey =
          `innergeodessa-career-result-${sessionId}`;
        const serializedResult = JSON.stringify(fetchedResult);

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
            : "The career result could not be loaded.",
        );
        setStatus("error");
      }
    }

    void loadResult();

    return () => {
      active = false;
    };
  }, [sessionId]);

  const totalAnswered = useMemo(() => {
    if (!result) {
      return 0;
    }

    return Object.values(result.answered).reduce(
      (total, count) => total + count,
      0,
    );
  }, [result]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-[#f7f4ee] px-6 py-20 text-[#17231d]">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#68756d]">
            Career Interest Assessment
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            Preparing your result…
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#58645d]">
            Your six career-interest dimensions are being loaded.
          </p>
        </div>
      </main>
    );
  }

  if (status === "error" || !result) {
    return (
      <main className="min-h-screen bg-[#f7f4ee] px-6 py-20 text-[#17231d]">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#ddd8cd] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            Result unavailable
          </p>
          <h1 className="mt-4 text-3xl font-semibold">
            We could not load this career result.
          </h1>
          <p className="mt-4 leading-7 text-[#58645d]">
            {errorMessage}
          </p>
          <Link
            href="/career/test"
            className="mt-8 inline-flex rounded-full bg-[#17231d] px-6 py-3 font-semibold text-white"
          >
            Start a new assessment
          </Link>
        </div>
      </main>
    );
  }

  const topThree = result.ranking.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-6 py-16 text-[#17231d]">
      <div className="mx-auto max-w-6xl">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#68756d]">
            Career Interest Assessment
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Your Career Interest Code
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#58645d]">
                Your result reflects the activities, environments, and
                kinds of work that currently attract your interest.
              </p>
            </div>

            <div className="rounded-3xl border border-[#d5d0c4] bg-white px-10 py-7 text-center shadow-sm">
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#68756d]">
                RIASEC code
              </span>
              <strong className="mt-2 block text-6xl tracking-[0.12em]">
                {result.code}
              </strong>
            </div>
          </div>
        </header>

        <section className="mt-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#68756d]">
              Your strongest interests
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Top three dimensions
            </h2>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {topThree.map((dimension, index) => {
              const profile =
                getRiasecDimensionProfile(dimension);

              return (
                <article
                  key={dimension}
                  className="rounded-3xl border border-[#ddd8cd] bg-white p-7 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#68756d]">
                      Rank {index + 1}
                    </span>
                    <span className="text-3xl font-semibold">
                      {dimension}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">
                    {profile.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#68756d]">
                    {profile.chineseName}
                  </p>
                  <p className="mt-4 leading-7 text-[#58645d]">
                    {profile.description}
                  </p>

                  <div className="mt-6 border-t border-[#ebe7df] pt-5">
                    <p className="text-3xl font-semibold">
                      {Math.round(result.percentages[dimension])}%
                    </p>
                    <p className="mt-1 text-sm text-[#68756d]">
                      Score {result.scores[dimension]}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-[#ddd8cd] bg-white p-7 shadow-sm sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#68756d]">
            Full profile
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            All six interest dimensions
          </h2>

          <div className="mt-8 space-y-6">
            {result.ranking.map((dimension) => {
              const profile =
                getRiasecDimensionProfile(dimension);
              const percentage = Math.round(
                result.percentages[dimension],
              );

              return (
                <div key={dimension}>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {dimension} · {profile.name}
                      </p>
                      <p className="mt-1 text-sm text-[#68756d]">
                        {profile.chineseName} · {profile.shortLabel}
                      </p>
                    </div>

                    <p className="font-semibold">
                      {percentage}% · Score{" "}
                      {result.scores[dimension]}
                    </p>
                  </div>

                  <div
                    className="mt-3 h-3 overflow-hidden rounded-full bg-[#ebe7df]"
                    aria-label={`${profile.name}: ${percentage}%`}
                  >
                    <div
                      className="h-full rounded-full bg-[#355947]"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, percentage),
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-[#ddd8cd] bg-white p-6">
            <p className="text-sm text-[#68756d]">Questions answered</p>
            <p className="mt-2 text-2xl font-semibold">
              {totalAnswered}
            </p>
          </div>

          <div className="rounded-2xl border border-[#ddd8cd] bg-white p-6">
            <p className="text-sm text-[#68756d]">
              Question bank version
            </p>
            <p className="mt-2 break-words text-lg font-semibold">
              {result.questionBankVersion}
            </p>
          </div>

          <div className="rounded-2xl border border-[#ddd8cd] bg-white p-6">
            <p className="text-sm text-[#68756d]">Completed</p>
            <p className="mt-2 text-lg font-semibold">
              {formatDate(result.completedAt)}
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-[#34483a] p-8 text-[#f1eee5] sm:p-10 print:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c7d0c8]">
            Detailed Career Report
          </p>

          <h2 className="mt-4 text-3xl font-semibold">
            Explore your complete {result.code} career profile
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-[#d6ddd6]">
            Review your interest combination, work style, preferred
            environment, strengths, development risks, career fields,
            example roles, skills roadmap, and 90-day action plan.
          </p>

          <Link
            href={`/career/report/${sessionId}`}
            className="mt-8 inline-flex min-h-12 items-center border border-[#aeb8af] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5] transition-colors hover:bg-[#f1eee5] hover:text-[#34483a]"
          >
            View complete {result.code} career report
          </Link>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#17231d] px-7 py-3 font-semibold"
          >
            <span className="text-[#f7f4ee]">Save as PDF</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#17231d] bg-white px-7 py-3 font-semibold text-[#17231d]"
          >
            Print report
          </button>

          <Link
            href="/career/test"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#17231d] px-7 py-3 font-semibold"
          >
            <span className="text-[#f7f4ee]">Retake assessment</span>
          </Link>

          <Link
            href="/career"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#aaa69d] bg-transparent px-7 py-3 font-semibold text-[#17231d]"
          >
            Back to career overview
          </Link>
        </div>
      </div>
    </main>
  );
}
