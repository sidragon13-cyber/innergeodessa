"use client";

import {
  ReportHeader,
  ReportMetadata,
  ReportPrintButton,
  ReportSection,
  ReportShell,
  ReportTableOfContents,
} from "@/components/report";

import {
  FixedReportRichContent,
} from "@/components/report/fixed-report-rich-content";

import {
  useLocale,
} from "@/components/locale";

import {
  assembleK68ReportSections,
} from "@/data/kids/report/assembly";

import type {
  GeneratedK68ProfessionalReport,
  K68ProfessionalReportSectionId,
} from "@/data/kids/report/generator";

import type {
  K68ReportDomainId,
} from "@/data/kids/report/types";

const TABLE_OF_CONTENTS_ID =
  "kids-professional-report-table-of-contents";

const SECTION_TITLES: Readonly<
  Record<
    K68ProfessionalReportSectionId,
    {
      readonly en: string;
      readonly zh: string;
    }
  >
> = {
  "report-identity": {
    en: "Report Identity",
    zh: "报告说明",
  },

  "parent-executive-summary": {
    en: "Parent Executive Summary",
    zh: "家长执行摘要",
  },

  "six-domain-interest-map": {
    en: "Six-Domain Interest Map",
    zh: "六维兴趣地图",
  },

  "current-interest-pattern": {
    en: "Current Interest Pattern",
    zh: "当前兴趣结构",
  },

  "highlighted-interest-signals": {
    en: "Highlighted Interest Signals",
    zh: "重点兴趣信号",
  },

  "behavior-evidence": {
    en: "Behavior Evidence",
    zh: "行为证据",
  },

  "interest-combination": {
    en: "Interest Combination",
    zh: "兴趣组合",
  },

  "broader-interest-context": {
    en: "Broader Interest Context",
    zh: "更广泛的兴趣背景",
  },

  "exploration-environment": {
    en: "Exploration Environment",
    zh: "探索环境",
  },

  "what-to-explore-next": {
    en: "What to Explore Next",
    zh: "下一步探索什么",
  },

  "parent-observation-plan": {
    en: "Parent Observation Plan",
    zh: "家长观察计划",
  },

  "methodology-and-boundaries": {
    en: "Methodology & Boundaries",
    zh: "方法与边界",
  },
};

const DOMAIN_LABELS: Readonly<
  Record<
    K68ReportDomainId,
    {
      readonly en: string;
      readonly zh: string;
    }
  >
> = {
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
};

export interface K68ProfessionalReportDocumentProps {
  readonly report:
    GeneratedK68ProfessionalReport;
}

export function K68ProfessionalReportDocument({
  report,
}: K68ProfessionalReportDocumentProps) {
  const {
    locale,
  } = useLocale();

  const reportLocale =
    locale === "zh"
      ? "zh"
      : "en";

  const assembledSections =
    assembleK68ReportSections(
      report,
      reportLocale,
    );

  const primaryDomains =
    report.primaryCombination.domains;

  const tableOfContentsItems =
    assembledSections.map(
      (
        section,
        index,
      ) => ({
        id:
          section.id,

        anchor:
          section.id,

        order:
          index + 1,

        title:
          SECTION_TITLES[
            section.id
          ][reportLocale],
      }),
    );

  const isZh =
    reportLocale === "zh";

  return (
    <ReportShell>
      <ReportHeader
        eyebrow="InnerGeo Kids"
        subtitle={
          isZh
            ? "专业家长报告"
            : "Professional Parent Report"
        }
        title={
          isZh
            ? "发现兴趣，而不是判断孩子"
            : "Discover Interests, Not Labels"
        }
        description={
          isZh ? (
            <>
              本报告根据孩子本次 K68
              30道活动偏好回答，
              从六个兴趣方向理解当前更值得继续探索的活动区域。
              结果反映的是现阶段兴趣信号，
              不是能力、人格、天赋或职业判断。
            </>
          ) : (
            <>
              This report is based on the child&apos;s
              30 K68 activity-preference responses.
              It uses six interest domains to identify
              which kinds of activities may currently
              be worth exploring further.
              The result reflects current interest signals,
              not ability, personality, talent,
              or a career conclusion.
            </>
          )
        }
        metadata={
          <ReportMetadata
            items={[
              {
                label:
                  isZh
                    ? "题库"
                    : "Question bank",

                value:
                  report.questionBankVersion,
              },

              {
                label:
                  isZh
                    ? "评分版本"
                    : "Scoring",

                value:
                  report.scoringVersion,
              },

              {
                label:
                  isZh
                    ? "报告版本"
                    : "Report",

                value:
                  report.reportVersion,
              },

              {
                label:
                  isZh
                    ? "测试记录"
                    : "Session",

                value:
                  `${report.sessionId.slice(
                    0,
                    8,
                  )}…`,
              },
            ]}
          />
        }
        actions={
          <ReportPrintButton
            label={
              isZh
                ? "打印 / 保存 PDF"
                : "Print / Save PDF"
            }
            guidance={
              isZh
                ? "使用浏览器打印功能，可以打印或保存本报告为 PDF。"
                : "Use your browser print function to print or save this report as a PDF."
            }
          />
        }
      />

      <section className="mt-10 border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9">
        <p className="ig-label text-[var(--color-text-muted)]">
          {isZh
            ? "当前兴趣概览"
            : "Current Interest Snapshot"}
        </p>

        <h2 className="ig-heading-2 mt-3">
          {isZh
            ? "六维兴趣概览"
            : "Six-Domain Interest Overview"}
        </h2>

        <div className="mt-7 grid gap-px bg-[#d8d2c6] sm:grid-cols-2 lg:grid-cols-3">
          {report.domainRanking.map(
            (
              domain,
              index,
            ) => (
              <article
                key={domain}
                className="bg-[#f7f4ec] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6d746b]">
                  #{index + 1}
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  {
                    DOMAIN_LABELS[
                      domain
                    ][reportLocale]
                  }
                </h3>

                <p className="mt-4 font-serif text-3xl">
                  {Math.round(
                    report.scores[
                      domain
                    ],
                  )}
                </p>
              </article>
            ),
          )}
        </div>

        <div className="mt-7 border-t border-[#d8d2c6] pt-6">
          <p className="ig-label text-[var(--color-text-muted)]">
            {isZh
              ? "主要兴趣组合"
              : "Primary Combination"}
          </p>

          <p className="mt-3 text-lg font-semibold">
            {
              DOMAIN_LABELS[
                primaryDomains[0]
              ][reportLocale]
            }

            {" + "}

            {
              DOMAIN_LABELS[
                primaryDomains[1]
              ][reportLocale]
            }
          </p>
        </div>
      </section>

      <ReportTableOfContents
        id={TABLE_OF_CONTENTS_ID}
        ariaLabel={
          isZh
            ? "儿童专业报告目录"
            : "Kids Professional Report table of contents"
        }
        items={
          tableOfContentsItems
        }
        title={
          isZh
            ? "报告目录"
            : "Table of Contents"
        }
        description={
          isZh
            ? "本报告共12个部分，从六维兴趣地图逐步进入行为信号、兴趣组合、探索建议与家长观察计划。"
            : "This report contains 12 sections covering the six-domain interest map, behavioural evidence, interest combinations, exploration guidance, and a parent observation plan."
        }
      />

      <div className="mt-10 space-y-10">
        {assembledSections.map(
          (
            section,
            index,
          ) => (
            <ReportSection
              key={
                section.id
              }
              id={
                section.id
              }
              order={
                index + 1
              }
              sectionLabel={
                isZh
                  ? `第 ${String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )} 部分`
                  : `Section ${String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}`
              }
              title={
                SECTION_TITLES[
                  section.id
                ][reportLocale]
              }
              blocks={[
                {
                  id:
                    `${section.id}-content`,

                  label:
                    isZh
                      ? "专业解读"
                      : "Professional Interpretation",

                  content: (
                    <FixedReportRichContent
                      blocks={
                        section.blocks
                      }
                    />
                  ),
                },
              ]}
              tableOfContentsId={
                TABLE_OF_CONTENTS_ID
              }
              backToContentsLabel={
                isZh
                  ? "返回目录"
                  : "Back to contents"
              }
            />
          ),
        )}
      </div>

      <footer className="mt-12 border-t border-[#c8c2b5] pt-7 text-sm leading-7 text-[#6d746b]">
        <p>
          InnerGeo Kids ·{" "}
          {report.reportVersion}
        </p>

        <p>
          {isZh
            ? "测试记录"
            : "Session"}{" "}
          {report.sessionId}
        </p>
      </footer>
    </ReportShell>
  );
}
