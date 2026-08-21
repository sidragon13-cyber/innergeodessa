"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ResultHeader,
  ResultNavigation,
  ResultShell,
} from "@/components/result";
import {
  buildK68ReportFacts,
} from "@/data/kids/report/facts";
import {
  generateK68ProfessionalReport,
} from "@/data/kids/report/generator";
import {
  buildK68BasicReport,
} from "@/data/kids/report/basic-report";
import { buildK912ReportFacts } from "@/data/kids/report/k912/facts";
import { generateK912ProfessionalReport } from "@/data/kids/report/k912/generator";
import { buildK912BasicReport } from "@/data/kids/report/k912/basic-report";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/home";
import { useLocale } from "@/components/locale";
import { SaveAssessmentResult } from "@/components/account";
import type { SaveAssessmentResultHandle } from "@/components/account/save-assessment-result";
import { PaddleCheckoutButton } from "@/components/payment/paddle-checkout-button";
import {
  fetchKidsResult,
  type KidsResultContract,
} from "@/data/kids/result";

const LEGACY_DOMAIN_ORDER = [
  "create",
  "discover",
  "build",
  "think",
  "connect",
  "lead",
  "move",
  "express",
] as const;

const K68_V2_DOMAIN_ORDER = [
  "think",
  "discover",
  "build",
  "create",
  "connect",
  "move",
] as const;

const LEGACY_DOMAIN_NAMES = {
  create: {
    en: "Create",
    zh: "创造",
  },
  discover: {
    en: "Discover",
    zh: "发现",
  },
  build: {
    en: "Build",
    zh: "建造",
  },
  think: {
    en: "Think",
    zh: "思考",
  },
  connect: {
    en: "Connect",
    zh: "连接",
  },
  lead: {
    en: "Lead",
    zh: "引领",
  },
  move: {
    en: "Move",
    zh: "行动",
  },
  express: {
    en: "Express",
    zh: "表达",
  },
} as const;

const K68_V2_DOMAIN_NAMES = {
  think: {
    en: "Think",
    zh: "思考",
  },
  discover: {
    en: "Discover",
    zh: "探索",
  },
  build: {
    en: "Build",
    zh: "构建",
  },
  create: {
    en: "Create",
    zh: "创造表达",
  },
  connect: {
    en: "Connect",
    zh: "联结合作",
  },
  move: {
    en: "Move",
    zh: "行动体验",
  },
} as const;

type ResultDomainId =
  keyof typeof LEGACY_DOMAIN_NAMES;

type PremiumAccessState =
  | "loading"
  | "owned-locked"
  | "unlocked"
  | "unavailable";

function normaliseDomainId(
  domainId: string,
): string {
  return domainId
    .trim()
    .toLowerCase();
}

function resolveScores(
  result: KidsResultContract,
): Record<string, number> {
  return result.domainResults.reduce<
    Record<string, number>
  >(
    (scores, domain) => {
      scores[
        normaliseDomainId(
          domain.domainId,
        )
      ] = domain.normalisedScore;

      return scores;
    },
    {},
  );
}

function isK68V2Result(
  result: KidsResultContract,
): boolean {
  return (
    result.ageForm === "K68" &&
    result.questionBankVersion ===
      "KIDS-K68-RF-V2" &&
    result.releaseFormVersion ===
      "KIDS-K68-RF-V2" &&
    result.scoringVersion ===
      "KIDS-SCORING-V2"
  );
}

function isK912V2Result(
  result: KidsResultContract,
): boolean {
  return (
    result.ageForm === "K912" &&
    result.questionBankVersion === "KIDS-K912-RF-V2" &&
    result.releaseFormVersion === "KIDS-K912-RF-V2" &&
    result.scoringVersion === "KIDS-SCORING-V2"
  );
}

function resolveDomainOrder(
  result: KidsResultContract,
): readonly ResultDomainId[] {
  return isK68V2Result(result) || isK912V2Result(result)
    ? K68_V2_DOMAIN_ORDER
    : LEGACY_DOMAIN_ORDER;
}

function resolveDomainName(
  result: KidsResultContract,
  domain: ResultDomainId,
  locale: "en" | "zh",
): string {
  if (
    (isK68V2Result(result) || isK912V2Result(result)) &&
    domain in K68_V2_DOMAIN_NAMES
  ) {
    const labels =
      K68_V2_DOMAIN_NAMES[
        domain as keyof typeof K68_V2_DOMAIN_NAMES
      ];

    return labels[locale];
  }

  return LEGACY_DOMAIN_NAMES[
    domain
  ][locale];
}

const POST_PAYMENT_ACCESS_RETRY_DELAYS_MS = [
  0,
  1000,
  2500,
  5000,
] as const;

export default function KidsResultPage() {
  const saveResultRef =
    useRef<SaveAssessmentResultHandle>(null);

  const params =
    useParams<{
      sessionId: string;
    }>();

  const sessionId =
    params.sessionId;

  const { locale } = useLocale();
  const isZh = locale === "zh";

  const [result, setResult] =
    useState<KidsResultContract | null>(
      null,
    );

  const [error, setError] =
    useState("");

  const [premiumAccess, setPremiumAccess] =
    useState<PremiumAccessState>("loading");
  const [
    premiumAccessRevision,
    setPremiumAccessRevision,
  ] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadPremiumAccess() {
      if (!sessionId) {
        if (!cancelled) {
          setPremiumAccess("unavailable");
        }
        return;
      }

      try {
        const response = await fetch(
          `/api/account/report-access/kids/${encodeURIComponent(
            sessionId,
          )}`,
          {
            cache: "no-store",
          },
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
          access.canViewFullReport ? "unlocked" : "owned-locked",
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
  }, [premiumAccessRevision, sessionId]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const persisted =
          await fetchKidsResult(
            sessionId,
          );

        if (active) {
          setResult(persisted);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load the Kids result.",
          );
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [sessionId]);

  const scores = useMemo(
    () =>
      result
        ? resolveScores(result)
        : {},
    [result],
  );

  const highlightedDomains =
    useMemo(() => {
      if (!result) {
        return new Set<string>();
      }

      return new Set(
        result.highlightedDomains.map(
          normaliseDomainId,
        ),
      );
    }, [result]);

  const domainOrder = useMemo(
    () =>
      result
        ? resolveDomainOrder(result)
        : LEGACY_DOMAIN_ORDER,
    [result],
  );

  if (error) {
    return (
      <>
        <SiteHeader />
        <main className="grid min-h-[70vh] place-items-center bg-[#fbf8f3] px-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a64a2c]">
              InnerGeo Kids
            </p>

            <h1 className="mt-5 font-serif text-4xl text-[#34283b]">
              {isZh
                ? "无法读取兴趣地图"
                : "Unable to load the Interest Map"}
            </h1>

            <p className="mt-6 leading-7 text-[#716776]">
              {error}
            </p>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (!result) {
    return (
      <>
        <SiteHeader />
        <main className="grid min-h-[70vh] place-items-center bg-[#fbf8f3] px-6">
          <p className="font-serif text-3xl text-[#493a50]">
            {isZh
              ? "正在生成兴趣地图…"
              : "Loading the Interest Map…"}
          </p>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (isK68V2Result(result) || isK912V2Result(result)) {
    const basicReport = isK68V2Result(result)
      ? (() => {
          const facts = buildK68ReportFacts(result);
          const report = generateK68ProfessionalReport(facts);
          return buildK68BasicReport({ facts, report, locale });
        })()
      : (() => {
          const facts = buildK912ReportFacts(result);
          const report = generateK912ProfessionalReport(facts);
          return buildK912BasicReport({ facts, report, locale });
        })();

    const leadingDimensions =
      [...basicReport.dimensions]
        .sort(
          (left, right) =>
            left.rank - right.rank,
        )
        .slice(0, 2);

    const premiumPreviewFallbackTitles =
      isZh
        ? [
            "行为证据",
            "完整六维结构",
            "兴趣组合",
            "探索环境",
            "参与方式",
            "家长观察计划",
            "下一步探索",
            "方法与边界",
          ]
        : [
            "Behaviour Evidence",
            "Full Six-Domain Structure",
            "Interest Combination",
            "Exploration Environment",
            "Engagement Pattern",
            "Parent Observation Plan",
            "What to Explore Next",
            "Methodology & Boundaries",
          ];

    return (
      <ResultShell className="bg-[#fbf8f3] text-[#312938]">
        <ResultHeader
          eyebrow={
            isZh
              ? "INNERGEO KIDS · 儿童兴趣探索测评"
              : "INNERGEO KIDS · INTEREST EXPLORATION"
          }
          subtitle={
            isZh
              ? "孩子当前的兴趣方向"
              : "Current Interest Direction"
          }
          title={
            <div>
              <h1 className="text-5xl font-semibold tracking-[-0.045em] text-[#4f3b59] md:text-7xl">
                {basicReport.identity.title}
              </h1>

              <p className="mt-4 text-lg font-semibold text-[#765884]">
                {basicReport.identity.subtitle}
              </p>
            </div>
          }
          description={
            <>
              <p>
                {isZh
                  ? "这份基础报告呈现孩子现阶段更容易产生兴趣、好奇和主动参与的方向。"
                  : "This basic report shows the directions that currently attract more interest, curiosity, and active participation."}
              </p>

              <p className="mt-2">
                {isZh
                  ? "它不是能力排名，也不是未来职业结论。"
                  : "It is not an ability ranking or a prediction of future career outcomes."}
              </p>
            </>
          }
          metadata={
            <>
              <p>
                {isZh
                  ? "测评已完成"
                  : "Assessment completed"}
              </p>

              <p>
                {isZh
                  ? "会话"
                  : "Session"}{" "}
                {sessionId.slice(0, 8)}…
              </p>
            </>
          }
          badges={
            basicReport.identity.keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {basicReport.identity.keywords.map(
                  (keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-[#d6c5dd] bg-[#f7f0f9] px-4 py-2 text-xs font-semibold text-[#6c4e78]"
                    >
                      {keyword}
                    </span>
                  ),
                )}
              </div>
            ) : null
          }
        />

        <section className="mt-8 rounded-[28px] border border-[#ddcfe2] bg-[#f7f0f9] p-6 md:flex md:items-center md:justify-between md:gap-10 md:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a568f]">
              {isZh
                ? "当前兴趣概览"
                : "Current Interest Profile"}
            </p>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#7a568f]">
              {isZh
                ? "兴趣解释路径"
                : "Interest Profile"}
            </p>

            <p className="mt-2 text-xl font-semibold text-[#4f3b59]">
              {basicReport.interpretationProfile.name}
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69606c]">
              {basicReport.interpretationProfile.description}
            </p>
          </div>

          <div className="mt-6 border-t border-[#d8c9de] pt-6 md:mt-0 md:min-w-[310px] md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a568f]">
              {isZh
                ? "探索主题"
                : "Exploration Theme"}
            </p>

            <p className="mt-2 font-semibold text-[#4f3b59]">
              {
                basicReport
                  .interpretationProfile
                  .explorationTheme
                  .name
              }
            </p>

            <p className="mt-2 text-xs leading-5 text-[#746b77]">
              {
                basicReport
                  .interpretationProfile
                  .explorationTheme
                  .description
              }
            </p>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
              {isZh
                ? "兴趣概览"
                : "Interest Overview"}
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#4f3b59] md:text-4xl">
              {basicReport.overview.headline}
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#625966]">
            {basicReport.overview.paragraphs.map(
              (paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ),
            )}

            <p className="border-l-2 border-[#8c659d] pl-5 font-semibold text-[#4f3b59]">
              {basicReport.overview.summary}
            </p>
          </div>
        </section>

        <section className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
            {isZh
              ? "核心兴趣表现"
              : "Core Interest Patterns"}
          </p>

          <p className="mt-2 text-sm text-[#786d7b]">
            {isZh
              ? "核心兴趣信号"
              : "Core Interest Signals"}
          </p>

          <div className="mt-5 grid gap-px overflow-hidden rounded-[28px] border border-[#dacdde] bg-[#dacdde] md:grid-cols-2">
            {basicReport.coreSignals.map(
              (signal, index) => (
                <article
                  key={`${signal.title}-${index}`}
                  className="bg-[#fbf8f3] p-7 md:p-8"
                >
                  {signal.title ? (
                    <h3 className="text-xl font-semibold text-[#4f3b59]">
                      {signal.title}
                    </h3>
                  ) : null}

                  <p
                    className={[
                      signal.title
                        ? "mt-4"
                        : "",
                      "leading-7 text-[#625966]",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {signal.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
                {isZh
                  ? "六维兴趣概览"
                  : "Six-Domain Overview"}
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4f3b59]">
                {isZh
                  ? "六个方向的当前兴趣分布"
                  : "Current interest distribution across six domains"}
              </h2>
            </div>

            <p className="text-sm text-[#786d7b]">
              {isZh
                ? "主要兴趣组合"
                : "Primary Interest Combination"}
              ：{" "}
              <strong className="text-[#4f3b59]">
                {basicReport.identity.title}
              </strong>
            </p>
          </div>

          <div className="mt-5 grid gap-px overflow-hidden rounded-[28px] border border-[#dacdde] bg-[#dacdde] md:grid-cols-2 lg:grid-cols-3">
            {basicReport.dimensions.map(
              (dimension) => {
                const leading =
                  dimension.rank <= 2;

                return (
                  <article
                    key={dimension.id}
                    className={[
                      "bg-[#fbf8f3] p-6 md:p-7",
                      leading
                        ? "shadow-[inset_0_3px_0_#9b72ac]"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <h3 className="font-semibold text-[#4f3b59]">
                          {dimension.title}
                        </h3>

                        <p className="mt-2 text-xs font-semibold text-[#846c8e]">
                          {isZh
                            ? `当前排序 #${dimension.rank}`
                            : `Current rank #${dimension.rank}`}
                        </p>
                      </div>

                      <p className="text-3xl font-semibold text-[#4f3b59]">
                        {Math.round(
                          dimension.score,
                        )}
                      </p>
                    </div>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#ebe3ed]">
                      <div
                        className="h-full rounded-full bg-[#825d93]"
                        style={{
                          width: `${dimension.score}%`,
                        }}
                      />
                    </div>

                    <p className="mt-5 text-sm leading-6 text-[#625966]">
                      {dimension.description}
                    </p>
                  </article>
                );
              },
            )}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
              {isZh
                ? "当前兴趣组合"
                : "Current Interest Combination"}
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#4f3b59] md:text-4xl">
              {basicReport.combinationInsight.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#786d7b]">
              {isZh
                ? "理解两个最明显兴趣方向如何共同出现。"
                : "How the two most visible interest directions may work together."}
            </p>
          </div>

          <div className="rounded-[28px] border border-[#dacdde] bg-[#f7f0f9] p-7 md:p-9">
            <div className="space-y-5 text-base leading-8 text-[#625966]">
              {basicReport.combinationInsight.paragraphs.map(
                (paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                ),
              )}

              <p className="border-l-2 border-[#8c659d] pl-5 font-semibold text-[#4f3b59]">
                {basicReport.combinationInsight.summary}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
                {isZh
                  ? "更容易投入的活动方式"
                  : "Ways the Child May Engage More Easily"}
              </p>

              <div className="mt-5 space-y-px overflow-hidden rounded-[28px] border border-[#dacdde] bg-[#dacdde]">
                {basicReport.engagementPatterns.map(
                  (pattern, index) => (
                    <article
                      key={`${pattern.title}-${index}`}
                      className="bg-[#fbf8f3] p-6"
                    >
                      {pattern.title ? (
                        <h3 className="font-semibold text-[#4f3b59]">
                          {pattern.title}
                        </h3>
                      ) : null}

                      <p
                        className={[
                          pattern.title
                            ? "mt-3"
                            : "",
                          "leading-7 text-[#625966]",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {pattern.description}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
                {isZh
                  ? "家长观察重点"
                  : "Parent Observation Focus"}
              </p>

              <div className="mt-5 space-y-px overflow-hidden rounded-[28px] border border-[#dacdde] bg-[#dacdde]">
                {basicReport.parentObservation.map(
                  (item, index) => (
                    <article
                      key={`${item.title}-${index}`}
                      className="bg-[#fbf8f3] p-6"
                    >
                      {item.title ? (
                        <h3 className="font-semibold text-[#4f3b59]">
                          {item.title}
                        </h3>
                      ) : null}

                      <p
                        className={[
                          item.title
                            ? "mt-3"
                            : "",
                          "leading-7 text-[#625966]",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {item.description}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
            {isZh
              ? "下一步探索方向"
              : "What to Explore Next"}
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {basicReport.explorationDirections.map(
              (direction, index) => (
                <article
                  key={`${direction.title}-${index}`}
                  className="rounded-[28px] border border-[#dacdde] bg-[#f7f0f9] p-7"
                >
                  {direction.title ? (
                    <h3 className="text-xl font-semibold text-[#4f3b59]">
                      {direction.title}
                    </h3>
                  ) : null}

                  <p
                    className={[
                      direction.title
                        ? "mt-4"
                        : "",
                      "leading-7 text-[#625966]",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {direction.description}
                  </p>
                </article>
              ),
            )}
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-[#786d7b]">
            {isZh
              ? "兴趣结果应作为安排下一步体验和观察的参考，而不应被视为能力、天赋或未来发展的固定边界。"
              : "Interest results should guide the next experiences and observations, not define fixed limits on ability, talent, or future development."}
          </p>
        </section>

        <section className="mt-16 overflow-hidden rounded-[28px] border border-[#5f456f] bg-[#5f456f] text-[#fbf8fc]">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="p-8 md:p-11">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e1d4e6]">
                {isZh
                  ? "完整专业报告"
                  : "Professional Report"}
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                {basicReport.premiumPreview.headline}
              </h2>

              <p className="mt-5 leading-7 text-[#eee6f1]">
                {
                  basicReport
                    .premiumPreview
                    .introduction
                }
              </p>

              {premiumAccess === "unlocked" ? (
                <Link
                  href={`/kids/report/${sessionId}`}
                  className="mt-8 inline-flex min-h-12 items-center rounded-full border border-[#dfd1e4] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-[#5f456f]"
                >
                  {isZh
                    ? "查看完整专业报告"
                    : "View Professional Report"}
                </Link>
              ) : premiumAccess === "owned-locked" ? (
                <PaddleCheckoutButton
                  module="kids"
                  resourceId={sessionId}
                  kidsForm={result.ageForm}
                  onCompleted={() => {
                    setPremiumAccess("loading");

                    for (
                      const delay of
                      POST_PAYMENT_ACCESS_RETRY_DELAYS_MS
                    ) {
                      window.setTimeout(() => {
                        setPremiumAccessRevision(
                          (revision) => revision + 1,
                        );
                      }, delay);
                    }
                  }}
                  label={
                    isZh
                      ? result.ageForm === "K68"
                        ? "解锁完整专业报告 — $7.99"
                        : "解锁完整专业报告 — $8.99"
                      : result.ageForm === "K68"
                        ? "Unlock Professional Report — $7.99"
                        : "Unlock Professional Report — $8.99"
                  }
                  className="mt-8 inline-flex min-h-12 items-center rounded-full border border-[#dfd1e4] px-10 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-[#5f456f] disabled:cursor-wait disabled:opacity-70"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => saveResultRef.current?.save()}
                  className="mt-8 inline-flex min-h-12 items-center rounded-full border border-[#dfd1e4] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-[#5f456f]"
                >
                  {premiumAccess === "loading"
                    ? isZh
                      ? "正在确认报告权限"
                      : "Checking Report Access"
                    : isZh
                      ? result.ageForm === "K68"
                        ? "保存结果以解锁完整专业报告 — $7.99"
                        : "保存结果以解锁完整专业报告 — $8.99"
                      : result.ageForm === "K68"
                        ? "Save Result to Unlock — $7.99"
                        : "Save Result to Unlock — $8.99"}
                </button>
              )}

              <div id="kids-save-result">
                <SaveAssessmentResult
                  ref={saveResultRef}
                  module="kids"
                  sessionId={sessionId}
                  className="mt-8"
                  onSaved={() => {
                    setPremiumAccess("loading");
                    setPremiumAccessRevision(
                      (revision) => revision + 1,
                    );
                  }}
                />
              </div>
            </div>

            <div className="grid gap-px bg-[#80678b] sm:grid-cols-2">
              {basicReport.premiumPreview.sections.map(
                (section, index) => (
                  <article
                    key={section.id}
                    className="bg-[#6a5076] p-6"
                  >
                    <h3 className="font-semibold">
                      {section.title ||
                        premiumPreviewFallbackTitles[
                          index
                        ]}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#e7ddea]">
                      {section.description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <ResultNavigation
          className="mt-12"
          primary={{
            href: "/kids/test",
            label: isZh
              ? "重新进行兴趣测试"
              : "Retake Kids assessment",
          }}
          secondary={{
            href: "/kids",
            label: isZh
              ? "返回儿童兴趣测试"
              : "Kids assessment overview",
          }}
        />
      </ResultShell>
    );
  }

  return (
    <>
      <SiteHeader />

      <main className="bg-[#fbf8f3] text-[#312938]">
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
            InnerGeo Kids · Interest Map
          </p>

          <div className="mt-5 grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <h1 className="font-serif text-4xl font-normal leading-[1.08] tracking-[-0.04em] md:text-6xl">
                {isZh
                  ? "孩子的兴趣地图"
                  : "Your Child’s Interest Map"}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#6b626f]">
                {isZh
                  ? "这不是能力排名，也不是未来职业结论。它记录的是当前更容易产生兴趣、好奇和主动尝试的方向。"
                  : "This is not an ability ranking or a career conclusion. It reflects the areas that currently attract more curiosity, interest, and willingness to try."}
              </p>
            </div>

            <div className="rounded-3xl border border-[#ded5e2] bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9985a2]">
                {isZh
                  ? "测试信息"
                  : "Assessment Details"}
              </p>

              <p className="mt-3 font-serif text-2xl text-[#46354f]">
                {result.ageForm}
              </p>

              <p className="mt-4 text-sm text-[#786e7c]">
                {result.scoringVersion}
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {domainOrder.map(
              (domain) => {
                const value =
                  typeof scores[domain] ===
                  "number"
                    ? scores[domain]
                    : 0;

                const highlighted =
                  highlightedDomains.has(
                    domain,
                  );

                return (
                  <article
                    key={domain}
                    className={[
                      "rounded-[24px] border bg-white p-6 md:p-7",
                      highlighted
                        ? "border-[#ad91ba] shadow-[0_12px_35px_rgba(85,57,97,0.08)]"
                        : "border-[#e1dae3]",
                    ].join(" ")}
                  >
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a8da0]">
                          {resolveDomainName(
                            result,
                            domain,
                            locale,
                          )}
                        </p>

                        {highlighted ? (
                          <p className="mt-2 text-xs font-semibold text-[#7a568f]">
                            {isZh
                              ? "主要兴趣信号"
                              : "Leading interest signal"}
                          </p>
                        ) : null}
                      </div>

                      <strong className="font-serif text-3xl font-normal text-[#4b3954]">
                        {Math.round(
                          value,
                        )}
                      </strong>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#eee8ef]">
                      <div
                        className="h-full rounded-full bg-[#79598a]"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              value,
                            ),
                          )}%`,
                        }}
                      />
                    </div>
                  </article>
                );
              },
            )}
          </div>

          <section className="mt-14 rounded-[28px] border border-[#ded5e2] bg-[#f4eef5] p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#80648d]">
              Discover → Explore → Cultivate
            </p>

            <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em]">
              {isZh
                ? "下一步不是给孩子贴标签，而是提供更多尝试机会。"
                : "The next step is not to label the child. It is to create more opportunities to explore."}
            </h2>

            <p className="mt-5 max-w-4xl leading-8 text-[#6c626f]">
              {isZh
                ? "优先从排名靠前和持续出现兴趣信号的方向开始，安排低压力、可重复的小型体验。观察兴趣是否持续，再决定是否进一步培养。"
                : "Begin with the areas showing the strongest and most persistent interest signals. Offer small, low-pressure experiences, observe whether the interest continues, and only then decide what is worth cultivating further."}
            </p>
          </section>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/kids"
              className="rounded-full bg-[#5f456f] px-7 py-3 text-sm font-bold text-white"
            >
              {isZh
                ? "重新选择年龄段"
                : "Start another Kids assessment"}
            </a>

            <a
              href="/"
              className="rounded-full border border-[#d4cad6] px-7 py-3 text-sm font-bold text-[#594d5f]"
            >
              {isZh
                ? "返回首页"
                : "Return home"}
            </a>
          </div>

          <p className="mt-8 text-xs leading-6 text-[#958b98]">
            Session {sessionId.slice(0, 8)}… ·{" "}
            {result.questionBankVersion}
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
