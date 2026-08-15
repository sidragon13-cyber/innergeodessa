"use client";

import Link from "next/link";
import {
  useParams,
  useSearchParams,
} from "next/navigation";
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
import { getPersonalityProfile } from "@/data/personality";
import {
  getLocalizedStringList,
  getLocalizedText,
} from "@/data/shared";

import {
  ResultHeader,
  ResultNavigation,
  ResultShell,
  ResultState,
} from "@/components/result";
import {
  SaveAssessmentResult,
} from "@/components/account";
import { PaddleCheckoutButton } from "@/components/payment/paddle-checkout-button";
import {
  useLocale,
} from "@/components/locale";
import {
  getPersonalityResultDictionary,
} from "@/data/i18n";
import {
  createReportDimensions,
} from "@/data/report/generator/from-assessment-result";
import {
  resolvePersonalityPreferenceBandVariables,
} from "@/data/report/generator/preference-band-variables";
import {
  resolvePersonalityReportProfile,
  type PersonalityReportProfile,
} from "@/data/report/generator/profile-resolver";

type DimensionKey =
  | "EI"
  | "SN"
  | "TF"
  | "JP";

const dimensions: DimensionKey[] = ["EI", "SN", "TF", "JP"];

const REPORT_PROFILE_PRESENTATION: Record<
  PersonalityReportProfile,
  {
    name: string;
    developmentTheme: string;
  }
> = {
  A: {
    name: "Boundary-Aware Preference Profile｜边界感知偏好路径",
    developmentTheme: "Explore & Validate｜探索与验证",
  },
  B: {
    name: "Moderate Preference Profile｜温和偏好路径",
    developmentTheme: "Clarify & Experiment｜澄清与实验",
  },
  C: {
    name: "Clear Preference Profile｜明显偏好路径",
    developmentTheme: "Apply & Develop｜应用与发展",
  },
  D: {
    name: "Highly Clear Preference Profile｜高度清晰偏好路径",
    developmentTheme: "Expand & Balance｜扩展与平衡",
  },
};

function formatConfidence(value: number | undefined) {
  if (value === undefined) {
    return "—";
  }

  return `${Math.round(value * 100)}%`;
}

type ResultLoadState =
  | "loading"
  | "ready"
  | "not-found"
  | "not-completed"
  | "error";

type PremiumAccessState =
  | "loading"
  | "owned-locked"
  | "unlocked"
  | "unavailable";

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

function getFailureState(error: unknown): ResultLoadState {
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

export default function PersonalityResultPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;
  const { locale } = useLocale();
  const searchParams = useSearchParams();
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
    useState<ResultLoadState>("loading");
  const [premiumAccess, setPremiumAccess] =
    useState<PremiumAccessState>("loading");
  const [
    premiumAccessRevision,
    setPremiumAccessRevision,
  ] = useState(0);

  const isPreviewSession =
    sessionId.startsWith("preview-");

  useEffect(() => {
    if (isPreviewSession) {
      setPremiumAccess("unlocked");
      return;
    }

    let cancelled = false;

    async function loadPremiumAccess() {
      try {
        const response = await fetch(
          `/api/account/report-access/personality/${encodeURIComponent(
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
  }, [
    isPreviewSession,
    sessionId,
    premiumAccessRevision,
  ]);

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

  const requestedLocale =
    searchParams.get("locale");

  const resultLocale =
    requestedLocale === "en" ||
    requestedLocale === "zh"
      ? requestedLocale
      : locale;

  const dictionary =
    getPersonalityResultDictionary(resultLocale);

  if (loadState === "loading" && !displayResult) {
    return (
      <ResultState
        eyebrow={dictionary.states.loading.eyebrow}
        title={dictionary.states.loading.title}
        message={dictionary.states.loading.message}
      />
    );
  }

  if (loadState === "not-found") {
    return (
      <ResultState
        eyebrow={dictionary.states.notFound.eyebrow}
        title={dictionary.states.notFound.title}
        message={dictionary.states.notFound.message}
        actions={[
          {
            href: "/personality/test",
            label: dictionary.states.error.action,
          },
        ]}
      />
    );
  }

  if (loadState === "not-completed") {
    return (
      <ResultState
        eyebrow={dictionary.states.notCompleted.eyebrow}
        title={dictionary.states.notCompleted.title}
        message={dictionary.states.notCompleted.message}
        actions={[
          {
            href: "/personality/test",
            label: dictionary.states.notCompleted.action,
          },
        ]}
      />
    );
  }

  if (loadState === "error" || !displayResult) {
    return (
      <ResultState
        eyebrow={dictionary.states.error.eyebrow}
        title={dictionary.states.error.title}
        message={dictionary.states.error.message}
        actions={[
          {
            href: "/personality/test",
            label: "Start assessment",
          },
        ]}
      />
    );
  }

  const profile = getPersonalityProfile(displayResult.type);

  const reportDimensions =
    createReportDimensions(displayResult);

  const reportBandVariables =
    resolvePersonalityPreferenceBandVariables(
      displayResult.type,
      reportDimensions,
    );

  const reportProfile =
    resolvePersonalityReportProfile(
      reportBandVariables,
    );

  const reportProfilePresentation =
    REPORT_PROFILE_PRESENTATION[
      reportProfile
    ];

  const personalityName = profile
    ? getLocalizedText(profile.identity.name, resultLocale)
    : "";

  const shortName = profile
    ? getLocalizedText(profile.identity.shortName, resultLocale)
    : "";

  const tagline = profile
    ? getLocalizedText(profile.identity.tagline, resultLocale)
    : "";

  const keywords = profile
    ? getLocalizedStringList(profile.identity.keywords, resultLocale)
    : [];

  const overviewParagraphs = profile
    ? getLocalizedStringList(profile.overview.paragraphs, resultLocale)
    : [];

  return (
    <ResultShell>
        <ResultHeader
          eyebrow={dictionary.header.eyebrow}
          subtitle={dictionary.header.subtitle}
          title={
            <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
              <h1 className="text-6xl font-semibold tracking-tight md:text-8xl">
                {displayResult.type}
              </h1>

              {personalityName ? (
                <p className="pb-2 text-2xl font-semibold text-[#4f5e53] md:text-3xl">
                  {personalityName}
                </p>
              ) : null}
            </div>
          }
          description={
            <>
              {shortName ? (
                <p className="font-semibold text-[#26372d]">
                  {shortName}
                </p>
              ) : null}

              {tagline ? (
                <p className={shortName ? "mt-2" : ""}>
                  {tagline}
                </p>
              ) : null}
            </>
          }
          metadata={
            <>
              <p>{dictionary.header.completed}</p>
              <p>
                {dictionary.header.sessionLabel}{" "}
                {sessionId.slice(0, 8)}…
              </p>
            </>
          }
          badges={
            keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="border border-[#c8c2b5] bg-[#f7f4ec] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : null
          }
        />

        <section className="mt-8 border border-[#c8c2b5] bg-[#f7f4ec] p-5 md:flex md:items-center md:justify-between md:gap-10 md:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d746b]">
              Report Profile｜报告解释路径
            </p>

            <p className="mt-2 text-xl font-semibold text-[#26372d]">
              Profile {reportProfile}
            </p>

            <p className="mt-1 text-sm leading-6 text-[#596158]">
              {reportProfilePresentation.name}
            </p>
          </div>

          <div className="mt-5 border-t border-[#d4cec1] pt-5 md:mt-0 md:min-w-[300px] md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d746b]">
              Development Theme｜发展主题
            </p>

            <p className="mt-2 font-semibold text-[#26372d]">
              {reportProfilePresentation.developmentTheme}
            </p>

            <p className="mt-2 text-xs leading-5 text-[#6d746b]">
              {resultLocale === "zh"
                ? "Profile 用于选择报告解释路径，不代表能力、成熟度或人格等级。"
                : "Profile selects the report interpretation path; it is not a level of ability, maturity, or personality quality."}
            </p>
          </div>
        </section>

        {profile ? (
          <>
            <section className="mt-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                  {dictionary.sections.overview}
                </p>

                <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                  {getLocalizedText(
                    profile.overview.headline,
                    resultLocale,
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
                    resultLocale,
                  )}
                </p>
              </div>
            </section>

            <section className="mt-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                {dictionary.sections.coreTraits}
              </p>

              <div className="mt-5 grid gap-px border border-[#c8c2b5] bg-[#c8c2b5] md:grid-cols-2">
                {profile.coreTraits.map((trait) => (
                  <article
                    key={trait.id}
                    className="bg-[#f7f4ec] p-7 md:p-9"
                  >
                    <h3 className="text-xl font-semibold">
                      {getLocalizedText(trait.title, resultLocale)}
                    </h3>

                    <p className="mt-4 leading-7 text-[#596158]">
                      {getLocalizedText(
                        trait.description,
                        resultLocale,
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
              {dictionary.sections.profileInDevelopment}
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              {dictionary.sections.scoredSuccessfully}
            </h2>

            <p className="mt-5 max-w-3xl leading-7 text-[#596158]">
              {dictionary.sections.profileInDevelopmentMessage}
            </p>
          </section>
        )}

        <section className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            {dictionary.sections.dimensionOverview}
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
                      {dictionary.dimensions[dimension]}
                    </h2>
                  </div>

                  <p className="text-3xl font-semibold">
                    {displayResult.scores[dimension]}
                  </p>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-[#d8d2c6] pt-4 text-sm">
                  <span className="text-[#6d746b]">
                    {dictionary.sections.confidence}
                  </span>

                  <span className="font-semibold">
                    {formatConfidence(
                      displayResult.confidence[dimension],
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
                    {dictionary.sections.strengths}
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
                            resultLocale,
                          )}
                        </h3>

                        <p className="mt-3 leading-7 text-[#596158]">
                          {getLocalizedText(
                            strength.description,
                            resultLocale,
                          )}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
                    {dictionary.sections.growthRisks}
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
                            resultLocale,
                          )}
                        </h3>

                        <p className="mt-3 leading-7 text-[#596158]">
                          {getLocalizedText(
                            risk.description,
                            resultLocale,
                          )}
                        </p>

                        <div className="mt-4 border-l-2 border-[#8d7552] pl-4">
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7c684d]">
                            {dictionary.sections.developmentFocus}
                          </p>

                          <p className="mt-2 leading-7 text-[#596158]">
                            {getLocalizedText(
                              risk.growthAction,
                              resultLocale,
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
                {dictionary.sections.careerDirections}
              </p>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {profile.careerGroups.map((group) => {
                  const roles = getLocalizedStringList(
                    group.roles,
                    resultLocale,
                  );

                  return (
                    <article
                      key={group.id}
                      className="border border-[#c8c2b5] bg-[#f7f4ec] p-7"
                    >
                      <h3 className="text-xl font-semibold">
                        {getLocalizedText(
                          group.category,
                          resultLocale,
                        )}
                      </h3>

                      <p className="mt-4 leading-7 text-[#596158]">
                        {getLocalizedText(
                          group.description,
                          resultLocale,
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
                  resultLocale,
                )}
              </p>
            </section>

            <section className="mt-16 border border-[#34483a] bg-[#34483a] p-8 text-[#f1eee5] md:p-12">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9d1c9]">
                    {dictionary.sections.premiumReport}
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                    {getLocalizedText(
                      profile.premiumPreview.headline,
                      resultLocale,
                    )}
                  </h2>

                  <p className="mt-5 leading-7 text-[#d6ddd6]">
                    {getLocalizedText(
                      profile.premiumPreview.introduction,
                      resultLocale,
                    )}
                  </p>

                  {premiumAccess === "owned-locked" ? (
                    <>
                      <PaddleCheckoutButton
                        resourceId={sessionId}
                        label={dictionary.premium.viewCompleteReport(
                          displayResult.type,
                        )}
                        className="mt-8 inline-flex min-h-12 items-center border border-[#aeb8af] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#f1eee5] hover:text-[#34483a] disabled:cursor-wait disabled:opacity-70"
                      />
                      <p className="mt-3 max-w-xl text-sm leading-6 text-[#c9d1c9]">
                        {resultLocale === "zh"
                          ? "基础测试可随时免费重测。每次新的完整报告需单独购买；已购买报告永久保留。"
                          : "Free retakes anytime. Each new Premium Report is purchased separately; previously purchased reports remain available permanently."}
                      </p>
                    </>
                  ) : premiumAccess === "unlocked" ? (
                    <Link
                      href={`/personality/report/${sessionId}`}
                      className="mt-8 inline-flex min-h-12 items-center border border-[#aeb8af] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#f1eee5] hover:text-[#34483a]"
                    >
                      {dictionary.premium.viewCompleteReport(
                        displayResult.type,
                      )}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="mt-8 inline-flex min-h-12 cursor-not-allowed items-center border border-[#aeb8af] px-6 text-xs font-bold uppercase tracking-[0.14em] opacity-70"
                    >
                      {getLocalizedText(
                        profile.premiumPreview.callToAction,
                        resultLocale,
                      )}
                    </button>
                  )}

                  <SaveAssessmentResult
                    module="personality"
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
                            resultLocale,
                          )}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-[#d6ddd6]">
                          {getLocalizedText(
                            section.description,
                            resultLocale,
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

        <ResultNavigation
          className="mt-12"
          primary={{
            href: "/personality/test",
            label:
              resultLocale === "zh"
                ? "重新进行人格测评"
                : "Retake personality assessment",
          }}
          secondary={{
            href: "/personality",
            label:
              resultLocale === "zh"
                ? "返回人格测评首页"
                : "Personality overview",
          }}
        />
    </ResultShell>
  );
}
