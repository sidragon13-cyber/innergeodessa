"use client";

import { useParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  generateZodiacReportSections,
  generateZodiacReportSectionsZh,
  loadStoredOrRemoteZodiacChart,
  type AstrologyResultContract,
} from "@/data/zodiac";

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
  getZodiacReportDictionary,
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

type LoadError =
  | "missingChartId"
  | "missingStoredChart";

function createAnchor(
  order: number,
  id: string,
): string {
  return `zodiac-report-${String(
    order,
  ).padStart(2, "0")}-${id}`;
}

function formatCalculatedAt(
  value: string,
  dateLocale: "en" | "zh-CN",
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    dateLocale,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

export default function ZodiacReportPage() {
  const { locale } = useLocale();
  const dictionary =
    getZodiacReportDictionary(locale);

  const params =
    useParams<{
      chartId: string;
    }>();

  const chartId =
    params.chartId;

  const [status, setStatus] =
    useState<LoadStatus>(
      "loading",
    );

  const [result, setResult] =
    useState<
      AstrologyResultContract | null
    >(null);

  const [
    loadError,
    setLoadError,
  ] = useState<LoadError | null>(null);

  const [accessState, setAccessState] =
    useState<AccessState>("loading");

  useEffect(() => {
    if (!chartId) {
      return;
    }

    let active = true;

    async function loadChart(): Promise<void> {
      setStatus("loading");

      try {
        const loadedResult =
          await loadStoredOrRemoteZodiacChart(
            chartId,
          );

        if (!active) {
          return;
        }

        setLoadError(null);
        setResult(loadedResult);
        setStatus("ready");
      } catch {
        if (!active) {
          return;
        }

        setResult(null);
        setLoadError(
          "missingStoredChart",
        );
        setStatus("error");
      }
    }

    void loadChart();

    return () => {
      active = false;
    };
  }, [chartId]);

  useEffect(() => {
    if (!chartId) {
      return;
    }

    let cancelled = false;

    async function loadReportAccess() {
      try {
        const response = await fetch(
          `/api/account/report-access/zodiac/${encodeURIComponent(
            chartId,
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
  }, [chartId]);

  const displayStatus: LoadStatus =
    chartId ? status : "error";

  const displayLoadError: LoadError | null =
    chartId ? loadError : "missingChartId";

  const sections =
    useMemo(
      () =>
        result
          ? locale === "zh"
            ? generateZodiacReportSectionsZh(result)
            : generateZodiacReportSections(result)
          : [],
      [locale, result],
    );

  if (displayStatus === "loading") {
    return (
      <ReportState
        eyebrow={dictionary.loading.eyebrow}
        title={dictionary.loading.title}
        message={dictionary.loading.message}
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
            label: dictionary.navigation.backToResult,
          },
          {
            href: "/zodiac/test",
            label: dictionary.navigation.newBirthChart,
            variant: "secondary",
          },
        ]}
      />
    );
  }

  if (
    displayStatus === "error" ||
    !result
  ) {
    return (
      <ReportState
        eyebrow={dictionary.loading.eyebrow}
        title={dictionary.errors.unavailable}
        message={
          displayLoadError
            ? dictionary.errors[displayLoadError]
            : dictionary.errors.fallbackUnavailable
        }
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
            label: dictionary.navigation.backToResult,
          },
          {
            href: "/zodiac/test",
            label: dictionary.navigation.newBirthChart,
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
            ? "正在确认星座报告权限"
            : "Confirming zodiac report access"
        }
        message={
          locale === "zh"
            ? "请稍候，我们正在确认此完整星座报告是否已经解锁。"
            : "Please wait while we confirm whether this full zodiac report is unlocked."
        }
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
            label:
              locale === "zh"
                ? "返回星座结果"
                : "Back to zodiac result",
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
            ? "完整星座报告仅向已登录、完成邮箱验证并拥有该星盘的用户开放。"
            : "Full zodiac reports are available only to signed-in, email-verified users who own this chart."
        }
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
            label:
              locale === "zh"
                ? "返回星座结果"
                : "Back to zodiac result",
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
            ? "高级星座报告"
            : "Premium zodiac report"
        }
        title={
          locale === "zh"
            ? "完整星座报告尚未解锁"
            : "Your full zodiac report is not unlocked yet"
        }
        message={
          locale === "zh"
            ? "你仍然可以查看免费星座结果。购买完整星座报告后，此页面将开放完整内容、打印和 PDF 权限。"
            : "You can continue viewing your free zodiac result. After purchasing the full report, this page will unlock the complete content, printing, and PDF access."
        }
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
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
            ? "请稍后重新尝试。你的星座测试结果不会受到影响。"
            : "Please try again shortly. Your zodiac result is not affected."
        }
        actions={[
          {
            href: `/zodiac/result/${chartId}`,
            label:
              locale === "zh"
                ? "返回星座结果"
                : "Back to zodiac result",
          },
        ]}
      />
    );
  }

  const sunName =
    dictionary.signNames[
      result.planets.sun.zodiac.sign
    ];

  const moonName =
    dictionary.signNames[
      result.planets.moon.zodiac.sign
    ];

  const risingName =
    dictionary.signNames[
      result.angles.ascendant.zodiac.sign
    ];

  return (
    <ReportIdentityGate
      returnTo={`/zodiac/report/${chartId}`}
    >
      <ReportShell>
        <ReportHeader
          eyebrow={dictionary.header.eyebrow}
          subtitle={dictionary.header.subtitle}
          title={
            <>
              {sunName}{dictionary.header.sun}
              <br />
              {moonName}{dictionary.header.moon}
              <br />
              {risingName}{dictionary.header.rising}
            </>
          }
          description={
            <p>
              {dictionary.header.description}
            </p>
          }
          metadata={
            <ReportMetadata
              items={[
                {
                  label: dictionary.header.calculated,
                  value: formatCalculatedAt(
                    result.calculatedAt,
                    dictionary.dateLocale,
                  ),
                },
                {
                  label: dictionary.header.localBirthTime,
                  value: result.input.localDateTime,
                },
                {
                  label: dictionary.header.timeZone,
                  value: result.input.timeZone,
                },
                {
                  label: dictionary.header.chart,
                  value: `${chartId.slice(0, 8)}…`,
                },
              ]}
            />
          }
          actions={
            <ReportPrintButton
              label={dictionary.header.print}
              guidance={dictionary.header.printGuidance}
            />
          }
        />

        <ReportTableOfContents
          id="zodiac-report-table-of-contents"
          ariaLabel={dictionary.tableOfContents.ariaLabel}
          title={dictionary.tableOfContents.title}
          description={dictionary.tableOfContents.description}
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
              description={section.description}
              tableOfContentsId="zodiac-report-table-of-contents"
              blocks={section.blocks.map((block) => ({
                id: block.id,
                label: dictionary.blockLabels[block.type],
                title: block.title,
                content: block.content,
              }))}
            />
          ))}
        </div>

        <ReportNavigation
          primary={{
            href: `/zodiac/result/${chartId}`,
            label: dictionary.navigation.backToZodiacResult,
          }}
          secondary={{
            href: "/zodiac",
            label:
              locale === "zh"
                ? "返回星座首页"
                : "Zodiac overview",
          }}
        />

        <footer className="mt-12 border-t border-[#c8c2b5] pt-8 text-sm leading-6 text-[#6d746b]">
          {dictionary.footer}
        </footer>
      </ReportShell>
    </ReportIdentityGate>
  );
}
