"use client";

import {
  useParams,
} from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLocale,
} from "@/components/locale";
import {
  ReportHeader,
  ReportIdentityGate,
  ReportMetadata,
  ReportNavigation,
  ReportPrintButton,
  ReportSection,
  ReportShell,
  ReportState,
  ReportTableOfContents,
} from "@/components/report";
import {
  fetchRiasecResult,
  generateCareerReportSections,
  generateCareerReportSectionsZh,
  isRiasecResultContract,
  type RiasecResultContract,
} from "@/data/career";
import {
  getCareerReportDictionary,
} from "@/data/i18n";

type LoadStatus =
  | "loading"
  | "ready"
  | "error";

type AccessState =
  | "loading"
  | "unlocked"
  | "locked"
  | "unauthenticated"
  | "error";

function createAnchor(
  order: number,
  id: string,
): string {
  return `career-report-${String(
    order,
  ).padStart(2, "0")}-${id}`;
}

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

export default function CareerReportPage() {
  const params =
    useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const { locale } = useLocale();
  const dictionary =
    getCareerReportDictionary(locale);

  const [status, setStatus] =
    useState<LoadStatus>("loading");
  const [result, setResult] =
    useState<RiasecResultContract | null>(
      null,
    );
  const [errorMessage, setErrorMessage] =
    useState("");
  const [accessState, setAccessState] =
    useState<AccessState>("loading");

  useEffect(() => {
    let active = true;

    async function loadResult() {
      try {
        const storageKey =
          `innergeodessa-career-result-${sessionId}`;

        const cachedValue =
          sessionStorage.getItem(storageKey) ??
          localStorage.getItem(storageKey);

        if (cachedValue) {
          try {
            const cached: unknown =
              JSON.parse(cachedValue);

            if (
              isRiasecResultContract(cached) &&
              cached.sessionId === sessionId
            ) {
              sessionStorage.setItem(
                storageKey,
                cachedValue,
              );
              localStorage.setItem(
                storageKey,
                cachedValue,
              );

              setResult(cached);
              setStatus("ready");
              return;
            }
          } catch {
            sessionStorage.removeItem(
              storageKey,
            );
            localStorage.removeItem(
              storageKey,
            );
          }
        }

        const fetchedResult =
          await fetchRiasecResult(sessionId);

        if (!active) {
          return;
        }

        const serializedResult =
          JSON.stringify(fetchedResult);

        sessionStorage.setItem(
          storageKey,
          serializedResult,
        );
        localStorage.setItem(
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
            : dictionary.errors.loadReport,
        );
        setStatus("error");
      }
    }

    void loadResult();

    return () => {
      active = false;
    };
  }, [
    sessionId,
    dictionary.errors.loadReport,
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadReportAccess() {
      try {
        const response = await fetch(
          `/api/account/report-access/career/${encodeURIComponent(
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

        if (
          response.status === 401 ||
          response.status === 403
        ) {
          setAccessState("unauthenticated");
          return;
        }

        if (!response.ok) {
          setAccessState("error");
          return;
        }

        const access = (await response.json()) as {
          canViewFullReport?: boolean;
        };

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

    void loadReportAccess();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const sections = useMemo(() => {
    if (!result) {
      return [];
    }

    return locale === "zh"
      ? generateCareerReportSectionsZh(
          result,
        )
      : generateCareerReportSections(
          result,
        );
  }, [locale, result]);

  if (status === "loading") {
    return (
      <ReportState
        eyebrow={
          dictionary.states.loading.eyebrow
        }
        title={
          dictionary.states.loading.title
        }
        message={
          dictionary.states.loading.message
        }
        actions={[
          {
            href: `/career/result/${sessionId}`,
            label:
              dictionary.states.actions.result,
          },
          {
            href: "/career/test",
            label:
              dictionary.states.actions
                .newAssessment,
            variant: "secondary",
          },
        ]}
      />
    );
  }

  if (status === "error" || !result) {
    return (
      <ReportState
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
            href: `/career/result/${sessionId}`,
            label:
              dictionary.states.actions.result,
          },
          {
            href: "/career/test",
            label:
              dictionary.states.actions
                .newAssessment,
            variant: "secondary",
          },
        ]}
      />
    );
  }

  if (accessState === "loading") {
    return (
      <ReportState
        eyebrow={
          locale === "zh"
            ? "正在验证访问权限"
            : "Checking access"
        }
        title={
          locale === "zh"
            ? "正在确认职业报告权限"
            : "Confirming career report access"
        }
        message={
          locale === "zh"
            ? "请稍候，我们正在确认此完整职业报告是否已经解锁。"
            : "Please wait while we confirm whether this full career report is unlocked."
        }
        actions={[
          {
            href: `/career/result/${sessionId}`,
            label:
              locale === "zh"
                ? "返回职业测试结果"
                : "Back to career result",
          },
        ]}
      />
    );
  }

  if (accessState === "unauthenticated") {
    return (
      <ReportState
        eyebrow={
          locale === "zh"
            ? "需要账户验证"
            : "Account required"
        }
        title={
          locale === "zh"
            ? "请登录并完成邮箱验证"
            : "Sign in and verify your email"
        }
        message={
          locale === "zh"
            ? "完整职业报告仅向已登录、完成邮箱验证并拥有该测试结果的用户开放。"
            : "Full career reports are available only to signed-in, email-verified users who own this assessment result."
        }
        actions={[
          {
            href: `/career/result/${sessionId}`,
            label:
              locale === "zh"
                ? "返回职业测试结果"
                : "Back to career result",
          },
        ]}
      />
    );
  }

  if (accessState === "locked") {
    return (
      <ReportState
        eyebrow={
          locale === "zh"
            ? "高级职业报告"
            : "Premium career report"
        }
        title={
          locale === "zh"
            ? "完整职业报告尚未解锁"
            : "Your full career report is not unlocked yet"
        }
        message={
          locale === "zh"
            ? "你仍然可以查看免费职业测试结果。购买完整职业报告后，此页面将开放完整内容、打印和 PDF 权限。"
            : "You can continue viewing your free career result. After purchasing the full report, this page will unlock the complete content, printing, and PDF access."
        }
        actions={[
          {
            href: `/career/result/${sessionId}`,
            label:
              locale === "zh"
                ? "返回结果并购买完整报告"
                : "Back to result and purchase report",
          },
        ]}
      />
    );
  }

  if (accessState === "error") {
    return (
      <ReportState
        eyebrow={
          locale === "zh"
            ? "访问检查失败"
            : "Access check unavailable"
        }
        title={
          locale === "zh"
            ? "暂时无法确认报告权限"
            : "We could not confirm report access"
        }
        message={
          locale === "zh"
            ? "请稍后重新尝试。你的职业测试结果不会受到影响。"
            : "Please try again shortly. Your career assessment result is not affected."
        }
        actions={[
          {
            href: `/career/result/${sessionId}`,
            label:
              locale === "zh"
                ? "返回职业测试结果"
                : "Back to career result",
          },
        ]}
      />
    );
  }

  const topNames = result.ranking
    .slice(0, 3)
    .map(
      (dimension) =>
        dictionary.dimensionNames[
          dimension
        ],
    )
    .join(" · ");

  return (
    <ReportIdentityGate
      returnTo={`/career/report/${sessionId}`}
    >
      <ReportShell>
      <ReportHeader
        eyebrow={dictionary.header.eyebrow}
        subtitle={
          dictionary.header.subtitle
        }
        title={result.code}
        description={
          <>
            <p className="text-xl font-semibold text-[#26372d]">
              {topNames}
            </p>

            <p className="mt-4">
              {dictionary.header.description}
            </p>
          </>
        }
        metadata={
          <ReportMetadata
            items={[
              {
                label:
                  dictionary.header.completed,
                value: formatDate(
                  result.completedAt,
                  dictionary.dateLocale,
                ),
              },
              {
                label:
                  dictionary.header
                    .questionBank,
                value:
                  result.questionBankVersion,
              },
              {
                label:
                  dictionary.header.session,
                value: `${sessionId.slice(
                  0,
                  8,
                )}…`,
              },
            ]}
          />
        }
        actions={
          <ReportPrintButton
            label={dictionary.header.print}
          />
        }
      />

      <ReportTableOfContents
        id="career-report-table-of-contents"
        ariaLabel={
          dictionary.contents.ariaLabel
        }
        title={dictionary.contents.title}
        description={
          dictionary.contents.description
        }
        items={sections.map((section) => ({
          id: section.id,
          anchor: createAnchor(
            section.order,
            section.id,
          ),
          order: section.order,
          title: section.title,
        }))}
      />

      <div className="personality-report-sections mt-12 space-y-12">
        {sections.map((section) => (
          <ReportSection
            key={section.id}
            id={createAnchor(
              section.order,
              section.id,
            )}
            order={section.order}
            title={section.title}
            description={
              section.description
            }
            tableOfContentsId="career-report-table-of-contents"
            blocks={section.blocks.map(
              (block) => ({
                id: block.id,
                label:
                  dictionary.blockLabels[
                    block.type
                  ],
                title: block.title,
                content: block.content,
              }),
            )}
          />
        ))}
      </div>

      <ReportNavigation
        primary={{
          href: `/career/result/${sessionId}`,
          label:
            dictionary.navigation.result,
        }}
        secondary={{
          href: "/career",
          label:
            dictionary.navigation.overview,
        }}
      />
      </ReportShell>
    </ReportIdentityGate>
  );
}
