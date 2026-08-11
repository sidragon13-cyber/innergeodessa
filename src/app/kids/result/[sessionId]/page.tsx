"use client";

import { useParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/home";
import { useLocale } from "@/components/locale";
import {
  fetchKidsResult,
  type KidsResultContract,
} from "@/data/kids/result";

const DOMAIN_ORDER = [
  "create",
  "discover",
  "build",
  "think",
  "connect",
  "lead",
  "move",
  "express",
] as const;

const DOMAIN_NAMES = {
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

export default function KidsResultPage() {
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
                  ? "兴趣模式"
                  : "Interest Pattern"}
              </p>

              <p className="mt-3 font-serif text-2xl text-[#46354f]">
                {result.patternType}
              </p>

              <p className="mt-4 text-sm text-[#786e7c]">
                {result.ageForm} ·{" "}
                {result.scoringVersion}
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {DOMAIN_ORDER.map(
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
                          {
                            DOMAIN_NAMES[
                              domain
                            ][locale]
                          }
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
