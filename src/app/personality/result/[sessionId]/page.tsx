"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSyncExternalStore } from "react";

import { getPersonalityProfile } from "@/data/personality";
import {
  getLocalizedStringList,
  getLocalizedText,
  type SupportedLocale,
} from "@/data/shared";

type PersonalityResult = {
  type?: string;
  scores?: {
    EI?: number;
    SN?: number;
    TF?: number;
    JP?: number;
  };
  confidence?: {
    EI?: number;
    SN?: number;
    TF?: number;
    JP?: number;
  };
  answered?: Record<string, unknown>;
  [key: string]: unknown;
};

const dimensionLabels = {
  EI: "Extraversion — Introversion",
  SN: "Sensing — Intuition",
  TF: "Thinking — Feeling",
  JP: "Judging — Perceiving",
} as const;

type DimensionKey = keyof typeof dimensionLabels;

const dimensions: DimensionKey[] = ["EI", "SN", "TF", "JP"];

function formatConfidence(value: number | undefined) {
  if (value === undefined) {
    return "—";
  }

  return `${Math.round(value * 100)}%`;
}

function subscribeToSessionStorage() {
  return () => {};
}

export default function PersonalityResultPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const locale: SupportedLocale = "en";
  const storageKey = `innergeodessa-result-${sessionId}`;

  const storedResult = useSyncExternalStore(
    subscribeToSessionStorage,
    () => sessionStorage.getItem(storageKey),
    () => null,
  );

  let result: PersonalityResult | null = null;

  if (storedResult) {
    try {
      result = JSON.parse(storedResult) as PersonalityResult;
    } catch {
      result = null;
    }
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-[#efede5] px-6 py-20 text-[#26372d]">
        <section className="mx-auto max-w-3xl border border-[#c8c2b5] bg-[#f7f4ec] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            Result unavailable
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            This result is not available in the current browser session.
          </h1>

          <p className="mt-5 leading-7 text-[#596158]">
            Complete a new personality assessment to generate a result.
          </p>

          <Link
            href="/personality/test"
            className="mt-8 inline-flex min-h-12 items-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
          >
            Start assessment
          </Link>
        </section>
      </main>
    );
  }

  const profile = getPersonalityProfile(result.type);

  const personalityName = profile
    ? getLocalizedText(profile.identity.name, locale)
    : "";

  const shortName = profile
    ? getLocalizedText(profile.identity.shortName, locale)
    : "";

  const tagline = profile
    ? getLocalizedText(profile.identity.tagline, locale)
    : "";

  const keywords = profile
    ? getLocalizedStringList(profile.identity.keywords, locale)
    : [];

  const overviewParagraphs = profile
    ? getLocalizedStringList(profile.overview.paragraphs, locale)
    : [];

  return (
    <main className="min-h-screen bg-[#efede5] px-6 py-12 text-[#26372d] md:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#c8c2b5] pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6d746b]">
            InnerGeodessa Personality Assessment
          </p>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm text-[#6d746b]">
                Your personality type
              </p>

              <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
                <h1 className="text-6xl font-semibold tracking-tight md:text-8xl">
                  {result.type ?? "—"}
                </h1>

                {personalityName && (
                  <p className="pb-2 text-2xl font-semibold text-[#4f5e53] md:text-3xl">
                    {personalityName}
                  </p>
                )}
              </div>

              {shortName && (
                <p className="mt-5 text-lg font-semibold">
                  {shortName}
                </p>
              )}

              {tagline && (
                <p className="mt-2 max-w-3xl text-lg leading-8 text-[#596158]">
                  {tagline}
                </p>
              )}
            </div>

            <div className="text-sm leading-7 text-[#6d746b] lg:text-right">
              <p>Assessment completed</p>
              <p>Session {sessionId.slice(0, 8)}…</p>
            </div>
          </div>

          {keywords.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="border border-[#c8c2b5] bg-[#f7f4ec] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </header>

        {profile ? (
          <>
            <section className="mt-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                  Personality Overview
                </p>

                <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                  {getLocalizedText(
                    profile.overview.headline,
                    locale,
                  )}
                </h2>
              </div>

              <div className="space-y-5 text-base leading-8 text-[#596158]">
                {overviewParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                <p className="border-l-2 border-[#34483a] pl-5 font-semibold text-[#26372d]">
                  {getLocalizedText(
                    profile.overview.summary,
                    locale,
                  )}
                </p>
              </div>
            </section>

            <section className="mt-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                Core Personality Traits
              </p>

              <div className="mt-5 grid gap-px border border-[#c8c2b5] bg-[#c8c2b5] md:grid-cols-2">
                {profile.coreTraits.map((trait) => (
                  <article
                    key={trait.id}
                    className="bg-[#f7f4ec] p-7 md:p-9"
                  >
                    <h3 className="text-xl font-semibold">
                      {getLocalizedText(trait.title, locale)}
                    </h3>

                    <p className="mt-4 leading-7 text-[#596158]">
                      {getLocalizedText(
                        trait.description,
                        locale,
                      )}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="mt-12 border border-[#c8c2b5] bg-[#f7f4ec] p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
              Profile in development
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Your assessment has been scored successfully.
            </h2>

            <p className="mt-5 max-w-3xl leading-7 text-[#596158]">
              The detailed English profile for this personality type is
              currently being prepared. Your dimension scores remain
              available below.
            </p>
          </section>
        )}

        <section className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            Dimension Overview
          </p>

          <div className="mt-5 grid gap-px border border-[#c8c2b5] bg-[#c8c2b5] md:grid-cols-2">
            {dimensions.map((dimension) => (
              <article
                key={dimension}
                className="bg-[#f7f4ec] p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-sm font-bold tracking-[0.12em]">
                      {dimension}
                    </p>

                    <h2 className="mt-2 text-lg font-semibold">
                      {dimensionLabels[dimension]}
                    </h2>
                  </div>

                  <p className="text-3xl font-semibold">
                    {result.scores?.[dimension] ?? "—"}
                  </p>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-[#d8d2c6] pt-4 text-sm">
                  <span className="text-[#6d746b]">
                    Confidence
                  </span>

                  <span className="font-semibold">
                    {formatConfidence(
                      result.confidence?.[dimension],
                    )}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {profile && (
          <>
            <section className="mt-14">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                    Key Strengths
                  </p>

                  <div className="mt-5 space-y-px border border-[#c8c2b5] bg-[#c8c2b5]">
                    {profile.strengths.map((strength) => (
                      <article
                        key={strength.id}
                        className="bg-[#f7f4ec] p-6"
                      >
                        <h3 className="font-semibold">
                          {getLocalizedText(
                            strength.title,
                            locale,
                          )}
                        </h3>

                        <p className="mt-3 leading-7 text-[#596158]">
                          {getLocalizedText(
                            strength.description,
                            locale,
                          )}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                    Growth Risks
                  </p>

                  <div className="mt-5 space-y-px border border-[#c8c2b5] bg-[#c8c2b5]">
                    {profile.growthRisks.map((risk) => (
                      <article
                        key={risk.id}
                        className="bg-[#f7f4ec] p-6"
                      >
                        <h3 className="font-semibold">
                          {getLocalizedText(
                            risk.title,
                            locale,
                          )}
                        </h3>

                        <p className="mt-3 leading-7 text-[#596158]">
                          {getLocalizedText(
                            risk.description,
                            locale,
                          )}
                        </p>

                        <div className="mt-4 border-l-2 border-[#8d7552] pl-4">
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7c684d]">
                            Development focus
                          </p>

                          <p className="mt-2 leading-7 text-[#596158]">
                            {getLocalizedText(
                              risk.growthAction,
                              locale,
                            )}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                Career Directions
              </p>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {profile.careerGroups.map((group) => {
                  const roles = getLocalizedStringList(
                    group.roles,
                    locale,
                  );

                  return (
                    <article
                      key={group.id}
                      className="border border-[#c8c2b5] bg-[#f7f4ec] p-7"
                    >
                      <h3 className="text-xl font-semibold">
                        {getLocalizedText(
                          group.category,
                          locale,
                        )}
                      </h3>

                      <p className="mt-4 leading-7 text-[#596158]">
                        {getLocalizedText(
                          group.description,
                          locale,
                        )}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {roles.map((role) => (
                          <span
                            key={role}
                            className="border border-[#d4cec1] px-3 py-2 text-sm"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>

              <p className="mt-6 max-w-4xl text-sm leading-7 text-[#6d746b]">
                {getLocalizedText(
                  profile.careerNotice,
                  locale,
                )}
              </p>
            </section>

            <section className="mt-16 border border-[#34483a] bg-[#34483a] p-8 text-[#f1eee5] md:p-12">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9d1c9]">
                    Premium Report
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                    {getLocalizedText(
                      profile.premiumPreview.headline,
                      locale,
                    )}
                  </h2>

                  <p className="mt-5 leading-7 text-[#d6ddd6]">
                    {getLocalizedText(
                      profile.premiumPreview.introduction,
                      locale,
                    )}
                  </p>

                  <button
                    type="button"
                    disabled
                    className="mt-8 inline-flex min-h-12 cursor-not-allowed items-center border border-[#aeb8af] px-6 text-xs font-bold uppercase tracking-[0.14em] opacity-70"
                  >
                    {getLocalizedText(
                      profile.premiumPreview.callToAction,
                      locale,
                    )}
                  </button>

                  <p className="mt-3 text-xs text-[#bdc7be]">
                    Premium reports will be introduced in a later
                    development stage.
                  </p>
                </div>

                <div className="grid gap-px bg-[#68786c] sm:grid-cols-2">
                  {profile.premiumPreview.sections.map(
                    (section) => (
                      <article
                        key={section.id}
                        className="bg-[#405448] p-6"
                      >
                        <h3 className="font-semibold">
                          {getLocalizedText(
                            section.title,
                            locale,
                          )}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-[#d6ddd6]">
                          {getLocalizedText(
                            section.description,
                            locale,
                          )}
                        </p>
                      </article>
                    ),
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/personality"
            className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em]"
          >
            Personality overview
          </Link>

          <Link
            href="/personality/test"
            className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
          >
            Take assessment again
          </Link>
        </div>
      </div>
    </main>
  );
}
