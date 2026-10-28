"use client";

import {
  ReportHeader,
  ReportMetadata,
  ReportNavigation,
  ReportPrintButton,
  ReportSection,
  ReportShell,
  ReportTableOfContents,
} from "@/components/report";
import { useLocale } from "@/components/locale";
import {
  assembleK912ReportChapters,
  type AssembledK912ReportBlock,
  type AssembledK912ReportSection,
} from "@/data/kids/report/k912/assembly";
import { assembleK912Content1025 } from "@/data/kids/report/k912-1025/runtime-assembly";
import group01Tables from "@/data/kids/report/k912-1025/group01-restored-tables.json";
import { K912_DOMAIN_LABELS } from "@/data/kids/report/k912/types";
import type { GeneratedK912ProfessionalReport } from "@/data/kids/report/k912/generator";

const TABLE_OF_CONTENTS_ID =
  "k912-professional-report-table-of-contents";

export function K912ProfessionalComparisonGrid({
  left,
  right,
}: {
  readonly left: AssembledK912ReportBlock;
  readonly right: AssembledK912ReportBlock;
}) {
  const renderPanel = (
    block: AssembledK912ReportBlock,
    tone: "support" | "reduce",
  ) => (
    <article
      data-k912-comparison-panel={tone}
      className={[
        "border border-[#d8d2c6] bg-[#fbfaf6] p-5 md:p-6",
        tone === "support"
          ? "border-t-4 border-t-[#9a8463]"
          : "border-t-4 border-t-[#8b8378]",
      ].join(" ")}
    >
      {block.title ? (
        <h3 className="text-lg font-semibold leading-7 text-[var(--color-text)]">
          {block.title}
        </h3>
      ) : null}

      {block.paragraphs.length ? (
        <div className="mt-4 space-y-3">
          {block.paragraphs.map((paragraph, index) => (
            <p
              key={`${block.id}-comparison-p-${index}`}
              className="leading-7 text-[var(--color-text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {block.items.length ? (
        <ul className="mt-5 space-y-3">
          {block.items.map((item, index) => (
            <li
              key={`${block.id}-comparison-i-${index}`}
              className="grid grid-cols-[auto_1fr] gap-3 leading-7"
            >
              <span
                aria-hidden="true"
                className={[
                  "mt-[0.65rem] h-1.5 w-1.5 rounded-full",
                  tone === "support"
                    ? "bg-[#9a8463]"
                    : "bg-[#8b8378]",
                ].join(" ")}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );

  return (
    <div
      data-k912-layout="comparison"
      className="grid gap-4 lg:grid-cols-2"
    >
      {renderPanel(left, "support")}
      {renderPanel(right, "reduce")}
    </div>
  );
}

export function K912ProfessionalEvidenceMatrix({
  facetBlock,
  evidenceBlock,
}: {
  readonly facetBlock: AssembledK912ReportBlock;
  readonly evidenceBlock: AssembledK912ReportBlock;
}) {
  const facetLines = facetBlock.items
    .flatMap((item) => item.split(/\r?\n/))
    .map((line) => line.trim())
    .filter(Boolean);

  const zhHeaderIndex = facetLines.findIndex(
    (line) => line === "中文",
  );

  const facetIntro =
    zhHeaderIndex > 0
      ? facetLines.slice(0, zhHeaderIndex)
      : [];

  const facetBody =
    zhHeaderIndex >= 0
      ? facetLines.slice(
          facetLines[zhHeaderIndex + 1] === "内容含义"
            ? zhHeaderIndex + 2
            : zhHeaderIndex + 1,
        )
      : facetLines;

  const facetEntries: {
    readonly title: string;
    readonly description: string;
  }[] = [];

  /*
   * Authored B02 content uses:
   * Facet name
   * Facet explanation
   * repeated seven times.
   *
   * The fallback also supports test/runtime items where each
   * item contains its own title + explanation.
   */
  for (let index = 0; index < facetBody.length; index += 2) {
    facetEntries.push({
      title: facetBody[index] ?? "",
      description: facetBody[index + 1] ?? "",
    });
  }

  const evidenceItems = evidenceBlock.items
    .flatMap((item) => {
      const trimmed = item.trim();

      return trimmed ? [trimmed] : [];
    });

  return (
    <div
      data-k912-layout="evidence-matrix"
      className="grid gap-5 lg:grid-cols-2"
    >
      <section
        data-k912-evidence-role="facet"
        className="border border-[#d8d2c6] bg-[#fbfaf6]"
      >
        <header className="border-b border-[#d8d2c6] px-5 py-5 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
            Professional Structure
          </p>

          {facetBlock.title ? (
            <h3 className="mt-2 text-lg font-semibold leading-7 text-[var(--color-text)]">
              {facetBlock.title}
            </h3>
          ) : null}

          {facetIntro.length ? (
            <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              {facetIntro.map((line, index) => (
                <p key={`${facetBlock.id}-intro-${index}`}>
                  {line}
                </p>
              ))}
            </div>
          ) : null}
        </header>

        <div className="divide-y divide-[#e3ddd2]">
          {facetEntries.map((entry, index) => (
            <article
              key={`${facetBlock.id}-facet-${index}`}
              className="grid grid-cols-[2rem_1fr] gap-3 px-5 py-4 md:px-6"
            >
              <div className="pt-0.5 font-serif text-lg text-[#9a8463]">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <h4 className="font-semibold leading-6 text-[var(--color-text)]">
                  {entry.title}
                </h4>

                {entry.description ? (
                  <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {entry.description}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        data-k912-evidence-role="response"
        className="border border-[#c8c2b5] bg-[#f7f4ec]"
      >
        <header className="border-b border-[#d8d2c6] px-5 py-5 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
            Response Evidence
          </p>

          {evidenceBlock.title ? (
            <h3 className="mt-2 text-lg font-semibold leading-7 text-[var(--color-text)]">
              {evidenceBlock.title}
            </h3>
          ) : null}

          {evidenceBlock.paragraphs.length ? (
            <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              {evidenceBlock.paragraphs.map(
                (paragraph, index) => (
                  <p
                    key={`${evidenceBlock.id}-intro-${index}`}
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          ) : null}
        </header>

        <div className="grid gap-3 p-5 md:p-6">
          {evidenceItems.map((item, index) => {
            const parts = item
              .split("｜")
              .map((part) => part.trim())
              .filter(Boolean);

            const hasStructuredParts =
              parts.length >= 3;

            return (
              <article
                key={`${evidenceBlock.id}-response-${index}`}
                className="border border-[#d8d2c6] bg-[#fbfaf6] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#c8c2b5] font-serif text-sm text-[#7c684d]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    {hasStructuredParts ? (
                      <>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-semibold text-[var(--color-text)]">
                            {parts[0]}
                          </span>

                          <span className="text-[#9a8463]">
                            {parts[1]}
                          </span>

                          <span className="ml-auto whitespace-nowrap text-sm font-semibold tabular-nums text-[var(--color-text)]">
                            {parts.slice(2).join(" ｜ ")}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="leading-7 text-[var(--color-text)]">
                        {item}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </section>
    </div>
  );
}

export function K912ProfessionalActionPath({
  quick,
  mini,
  deep,
}: {
  readonly quick: AssembledK912ReportBlock;
  readonly mini: AssembledK912ReportBlock;
  readonly deep: AssembledK912ReportBlock;
}) {
  const stages = [
    {
      key: "quick",
      order: "01",
      eyebrow: "Quick Exploration",
      timeframe: "Now",
      block: quick,
    },
    {
      key: "mini",
      order: "02",
      eyebrow: "Mini Project",
      timeframe: "1–2 Weeks",
      block: mini,
    },
    {
      key: "deep",
      order: "03",
      eyebrow: "Deeper Exploration",
      timeframe: "4–8 Weeks",
      block: deep,
    },
  ] as const;

  return (
    <div
      data-k912-layout="action-path"
      className="grid gap-4 lg:grid-cols-3"
    >
      {stages.map((stage) => (
        <article
          key={stage.key}
          data-k912-action-stage={stage.key}
          className="relative flex h-full flex-col border border-[#d8d2c6] bg-[#fbfaf6] p-5 md:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="font-serif text-3xl leading-none text-[#9a8463]">
              {stage.order}
            </span>

            <span className="text-right text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              {stage.timeframe}
            </span>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
              {stage.eyebrow}
            </p>

            {stage.block.title ? (
              <h3 className="mt-2 text-lg font-semibold leading-7 text-[var(--color-text)]">
                {stage.block.title}
              </h3>
            ) : null}
          </div>

          {stage.block.paragraphs.length ? (
            <div className="mt-5 space-y-3 text-[var(--color-text-secondary)]">
              {stage.block.paragraphs.map(
                (paragraph, index) => (
                  <p
                    key={`${stage.block.id}-action-p-${index}`}
                    className="leading-7"
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          ) : null}

          {stage.block.items.length ? (
            <ul className="mt-5 space-y-3">
              {stage.block.items.map((item, index) => (
                <li
                  key={`${stage.block.id}-action-i-${index}`}
                  className="grid grid-cols-[auto_1fr] gap-3 leading-7"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-[#9a8463]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto pt-6">
            <div className="border-t border-[#e3ddd2] pt-4 text-xs leading-5 text-[var(--color-text-muted)]">
              {stage.key === "quick"
                ? "用于快速验证：孩子是否愿意主动开始并继续。"
                : stage.key === "mini"
                  ? "用于观察持续性：兴趣是否能够跨数天重复出现。"
                  : "用于观察深化：兴趣是否会在反馈、困难和迭代中继续发展。"}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function K912ProfessionalObservationPlan({
  blocks,
  locale,
}: {
  readonly blocks: readonly AssembledK912ReportBlock[];
  readonly locale: "zh" | "en";
}) {
  const isZh = locale === "zh";
  const splitItems = (
    block: AssembledK912ReportBlock,
  ) =>
    block.items
      .flatMap((item) => item.split(/\r?\n/))
      .map((item) => item.trim())
      .filter(Boolean);

  const findBlock = (
    prefix: "combination" | "primary" | "secondary",
    role: "child" | "parent",
  ) =>
    blocks.find((block) => {
      const expectedKind =
        role === "child"
          ? "reflection"
          : "observation";

      return (
        block.id.startsWith(`${prefix}-`) &&
        block.kind === expectedKind
      );
    });

  const renderRoleCard = (
    role: "child" | "parent",
    block: AssembledK912ReportBlock,
  ) => {
    const items = splitItems(block);

    return (
      <article
        data-k912-observation-role={role}
        className="p-5 md:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
          {role === "child"
            ? "Child Reflection"
            : "Parent Observation"}
        </p>

        {block.title ? (
          <h4 className="mt-3 text-lg font-semibold leading-7 text-[var(--color-text)]">
            {block.title}
          </h4>
        ) : null}

        {block.paragraphs.length ? (
          <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            {block.paragraphs.map(
              (paragraph, index) => (
                <p
                  key={`${block.id}-observation-p-${index}`}
                  className="whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ),
            )}
          </div>
        ) : null}

        {items.length ? (
          <ol className="mt-4 space-y-3">
            {items.map((item, index) => (
              <li
                key={`${block.id}-observation-i-${index}`}
                className="grid grid-cols-[1.75rem_1fr] gap-3 text-sm leading-6"
              >
                <span className="flex h-7 w-7 items-center justify-center border border-[#d8d2c6] font-serif text-xs text-[#7c684d]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="pt-0.5">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        ) : null}
      </article>
    );
  };

  const layers = [
    {
      key: "combination" as const,
      order: "01",
      label: isZh ? "当前兴趣组合" : "Current Interest Combination",
    },
    {
      key: "primary" as const,
      order: "02",
      label: isZh ? "第一兴趣方向" : "Primary Interest Direction",
    },
    {
      key: "secondary" as const,
      order: "03",
      label: isZh ? "第二兴趣方向" : "Secondary Interest Direction",
    },
  ];

  return (
    <div
      data-k912-layout="observation-plan"
      className="space-y-5"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border border-[#d8d2c6] bg-[#fbfaf6] px-5 py-5 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
            Child Reflection
          </p>

          <h3 className="mt-2 text-xl font-semibold leading-8 text-[var(--color-text)]">
            {isZh ? "孩子反思" : "Child Reflection"}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            {isZh
              ? "帮助孩子用自己的语言理解当前兴趣，而不是接受一个固定标签。"
              : "Help the child understand current interests in their own words rather than accepting a fixed label."}
          </p>
        </section>

        <section className="border border-[#d8d2c6] bg-[#fbfaf6] px-5 py-5 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
            Parent Observation
          </p>

          <h3 className="mt-2 text-xl font-semibold leading-8 text-[var(--color-text)]">
            {isZh ? "家长观察" : "Parent Observation"}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            {isZh
              ? "关注真实活动中是否持续出现主动选择、重复参与和继续探索。"
              : "Notice whether voluntary choice, repeated participation, and continued exploration appear consistently in real activities."}
          </p>
        </section>
      </div>

      {layers.map((layer) => {
        const childBlock = findBlock(
          layer.key,
          "child",
        );

        const parentBlock = findBlock(
          layer.key,
          "parent",
        );

        if (!childBlock && !parentBlock) {
          return null;
        }

        return (
          <section
            key={layer.key}
            data-k912-observation-layer={layer.key}
            className="border border-[#d8d2c6] bg-[#fbfaf6]"
          >
            <header className="border-b border-[#d8d2c6] px-5 py-4 md:px-6">
              <div className="flex items-center gap-4">
                <div className="font-serif text-2xl leading-none text-[#9a8463]">
                  {layer.order}
                </div>

                <h3 className="text-lg font-semibold leading-7 text-[var(--color-text)]">
                  {layer.label}
                </h3>
              </div>
            </header>

            <div className="grid divide-y divide-[#e3ddd2] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              {childBlock
                ? renderRoleCard(
                    "child",
                    childBlock,
                  )
                : (
                    <div
                      data-k912-observation-role="child"
                      className="p-5 md:p-6"
                    />
                  )}

              {parentBlock
                ? renderRoleCard(
                    "parent",
                    parentBlock,
                  )
                : (
                    <div
                      data-k912-observation-role="parent"
                      className="p-5 md:p-6"
                    />
                  )}
            </div>
          </section>
        );
      })}
    </div>
  );
}


export function K912ProfessionalMethodFramework({
  blocks,
  locale,
}: {
  readonly blocks: readonly AssembledK912ReportBlock[];
  readonly locale: "zh" | "en";
}) {
  const isZh = locale === "zh";
  const methodBlocks = blocks.filter(
    (block) =>
      block.kind !== "boundary" &&
      !block.id.includes("common-misread"),
  );

  const misreadBlocks = blocks.filter(
    (block) =>
      block.id.includes("common-misread"),
  );

  const boundaryBlocks = blocks.filter(
    (block) =>
      block.kind === "boundary" &&
      !block.id.includes("common-misread"),
  );

  const renderContent = (
    block: AssembledK912ReportBlock,
  ) => (
    <>
      {block.title ? (
        <h3 className="text-lg font-semibold leading-7 text-[var(--color-text)]">
          {block.title}
        </h3>
      ) : null}

      {block.paragraphs.length ? (
        <div className="mt-4 space-y-3">
          {block.paragraphs.map(
            (paragraph, index) => (
              <p
                key={`${block.id}-method-p-${index}`}
                className="whitespace-pre-line leading-7 text-[var(--color-text-secondary)]"
              >
                {paragraph}
              </p>
            ),
          )}
        </div>
      ) : null}

      {block.items.length ? (
        <ul className="mt-4 space-y-3">
          {block.items
            .flatMap((item) =>
              item
                .split(/\r?\n/)
                .map((line) => line.trim())
                .filter(Boolean),
            )
            .map((item, index) => (
              <li
                key={`${block.id}-method-i-${index}`}
                className="grid grid-cols-[auto_1fr] gap-3 leading-7"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-[#9a8463]"
                />

                <span>{item}</span>
              </li>
            ))}
        </ul>
      ) : null}
    </>
  );

  return (
    <div
      data-k912-layout="method-framework"
      className="space-y-5"
    >
      {methodBlocks.length ? (
        <section
          data-k912-method-role="method"
          className="border border-[#c8c2b5] bg-[#fbfaf6]"
        >
          <header className="border-b border-[#d8d2c6] px-5 py-5 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
              Method
            </p>

            <h3 className="mt-2 text-xl font-semibold leading-8 text-[var(--color-text)]">
              {isZh ? "报告如何形成" : "How the report is assembled"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              {isZh
                ? "从真实回答、固定评分到结果解释，核心步骤保持可追溯和可复现。"
                : "From real responses and fixed scoring to result interpretation, the core steps remain traceable and reproducible."}
            </p>
          </header>

          <div className="divide-y divide-[#e3ddd2]">
            {methodBlocks.map((block, index) => (
              <article
                key={block.id}
                className="grid gap-4 px-5 py-5 md:grid-cols-[3rem_1fr] md:px-6"
              >
                <div className="font-serif text-2xl leading-none text-[#9a8463]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  {renderContent(block)}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {misreadBlocks.length ? (
        <section
          data-k912-method-role="misread"
          className="border border-[#c8c2b5] border-l-4 border-l-[#9a8463] bg-[#f7f4ec] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
            Common Misreads
          </p>

          <div className="mt-3">
            {misreadBlocks.map((block) => (
              <article
                key={block.id}
                className="mt-4 first:mt-0"
              >
                {renderContent(block)}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {boundaryBlocks.length ? (
        <section
          data-k912-method-role="boundary"
        >
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
              Interpretation Boundaries
            </p>

            <h3 className="mt-2 text-xl font-semibold leading-8 text-[var(--color-text)]">
              {isZh ? "结果应当怎样使用" : "How to use the result"}
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
              {isZh
                ? "以下边界用于防止把当前兴趣结果误解为能力、天赋、人格或未来方向的结论。"
                : "These boundaries prevent current interest results from being mistaken for conclusions about ability, talent, personality, or future direction."}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {boundaryBlocks.map((block, index) => (
              <article
                key={block.id}
                className={[
                  "border border-[#d8d2c6] bg-[#fbfaf6] p-5 md:p-6",
                  block.id === "global-boundary"
                    ? "lg:col-span-2"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 font-serif text-2xl leading-none text-[#9a8463]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    {renderContent(block)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function K912ProfessionalExecutiveSummary({
  combination,
  meaning,
  childQuestion,
  primary,
  secondary,
}: {
  readonly combination: AssembledK912ReportBlock;
  readonly meaning: AssembledK912ReportBlock;
  readonly childQuestion: AssembledK912ReportBlock;
  readonly primary: {
    readonly label: string;
    readonly score: number;
  };
  readonly secondary: {
    readonly label: string;
    readonly score: number;
  };
}) {
  const renderTextBlock = (
    block: AssembledK912ReportBlock,
  ) => (
    <>
      {block.title ? (
        <h3 className="text-lg font-semibold leading-7 text-[var(--color-text)]">
          {block.title}
        </h3>
      ) : null}

      {block.paragraphs.length ? (
        <div className="mt-3 space-y-3">
          {block.paragraphs.map((paragraph, index) => (
            <p
              key={`${block.id}-summary-p-${index}`}
              className="whitespace-pre-line leading-7 text-[var(--color-text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {block.items.length ? (
        <ul className="mt-4 space-y-3">
          {block.items.map((item, index) => (
            <li
              key={`${block.id}-summary-i-${index}`}
              className="grid grid-cols-[auto_1fr] gap-3 leading-7"
            >
              <span
                aria-hidden="true"
                className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-[#9a8463]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  return (
    <div
      data-k912-layout="executive-summary"
      className="space-y-5"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <article
          data-k912-summary-role="primary"
          className="border border-[#c8c2b5] border-t-4 border-t-[#9a8463] bg-[#fbfaf6] p-5 md:p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
            Primary Interest
          </p>

          <div className="mt-5 flex items-end justify-between gap-5">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">
                当前第一兴趣
              </p>

              <h3 className="mt-2 text-2xl font-semibold leading-8 text-[var(--color-text)]">
                {primary.label}
              </h3>
            </div>

            <div className="font-serif text-5xl leading-none tabular-nums text-[#7c684d]">
              {Math.round(primary.score)}
            </div>
          </div>
        </article>

        <article
          data-k912-summary-role="secondary"
          className="border border-[#c8c2b5] border-t-4 border-t-[#8b8378] bg-[#fbfaf6] p-5 md:p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
            Secondary Interest
          </p>

          <div className="mt-5 flex items-end justify-between gap-5">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">
                当前第二兴趣
              </p>

              <h3 className="mt-2 text-2xl font-semibold leading-8 text-[var(--color-text)]">
                {secondary.label}
              </h3>
            </div>

            <div className="font-serif text-5xl leading-none tabular-nums text-[#7c684d]">
              {Math.round(secondary.score)}
            </div>
          </div>
        </article>
      </div>

      <article className="border border-[#c8c2b5] bg-[#f7f4ec] p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
          Current Interest Combination
        </p>

        <div className="mt-3">
          {renderTextBlock(combination)}
        </div>
      </article>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="border border-[#d8d2c6] bg-[#fbfaf6] p-5 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
            What To Notice
          </p>

          {renderTextBlock(meaning)}
        </article>

        <article className="border border-[#d8d2c6] bg-[#fbfaf6] p-5 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
            Child Reflection
          </p>

          {renderTextBlock(childQuestion)}
        </article>
      </div>
    </div>
  );
}

export function K912ProfessionalInterestMap({
  domains,
  scaleNote,
  locale,
}: {
  readonly domains: readonly {
    readonly id: string;
    readonly label: string;
    readonly rank: number;
    readonly score: number;
    readonly rawScore: number;
    readonly role: "primary" | "secondary" | "background";
  }[];
  readonly scaleNote: string;
  readonly locale: "zh" | "en";
}) {
  const isZh = locale === "zh";

  const roleLabel = (
    role: "primary" | "secondary" | "background",
  ) => {
    if (role === "primary") {
      return isZh ? "当前第一兴趣" : "Current Primary Interest";
    }

    if (role === "secondary") {
      return isZh ? "当前第二兴趣" : "Current Secondary Interest";
    }

    return isZh ? "背景信号" : "Background Signal";
  };

  return (
    <div
      data-k912-layout="interest-map"
      className="border border-[#c8c2b5] bg-[#fbfaf6]"
    >
      <header className="border-b border-[#d8d2c6] px-5 py-5 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
          Six-Domain Interest Map
        </p>

        <h3 className="mt-2 text-xl font-semibold leading-8 text-[var(--color-text)]">
          {isZh ? "当前兴趣地图" : "Current Interest Map"}
        </h3>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
          {isZh
            ? "六个方向需要放在同一张结构图中比较。分数表示本次测试中各兴趣方向的相对位置，而不是六种儿童类型。"
            : "The six directions should be compared within one profile. Scores show their relative position in this assessment, not six child types."}
        </p>
      </header>

      <div className="divide-y divide-[#e3ddd2]">
        {domains.map((domain) => {
          const width = Math.max(
            0,
            Math.min(100, Math.round(domain.score)),
          );

          const isPrimary =
            domain.role === "primary";

          const isSecondary =
            domain.role === "secondary";

          return (
            <article
              key={domain.id}
              data-k912-interest-role={domain.role}
              className={[
                "px-5 py-5 md:px-6",
                isPrimary
                  ? "bg-[#f7f4ec]"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="grid gap-4 md:grid-cols-[3rem_8rem_1fr_5rem] md:items-center">
                <div className="font-serif text-2xl leading-none text-[#9a8463]">
                  #{domain.rank}
                </div>

                <div>
                  <h4 className="text-lg font-semibold leading-7 text-[var(--color-text)]">
                    {domain.label}
                  </h4>

                  <p
                    className={[
                      "mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]",
                      isPrimary || isSecondary
                        ? "text-[#7c684d]"
                        : "text-[var(--color-text-muted)]",
                    ].join(" ")}
                  >
                    {roleLabel(domain.role)}
                  </p>
                </div>

                <div>
                  <div className="h-3 overflow-hidden bg-[#e5e0d6]">
                    <div
                      aria-hidden="true"
                      className={[
                        "h-full",
                        isPrimary
                          ? "bg-[#9a8463]"
                          : isSecondary
                            ? "bg-[#8b8378]"
                            : "bg-[#b9b1a4]",
                      ].join(" ")}
                      style={{
                        width: `${width}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-4 text-xs leading-5 text-[var(--color-text-muted)]">
                    <span>0</span>

                    <span>
                      {isZh
                        ? `原始分 ${domain.rawScore} / 35`
                        : `Raw score ${domain.rawScore} / 35`}
                    </span>

                    <span>100</span>
                  </div>
                </div>

                <div className="md:text-right">
                  <div className="font-serif text-3xl leading-none tabular-nums text-[var(--color-text)]">
                    {Math.round(domain.score)}
                  </div>

                  <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                    / 100
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <footer className="border-t border-[#d8d2c6] px-5 py-4 md:px-6">
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
          {scaleNote}
        </p>
      </footer>
    </div>
  );
}

export function K912ProfessionalInterestStructure({
  pattern,
  primary,
  secondary,
  third,
  firstSecondGap,
  secondThirdGap,
  overallSpread,
  locale,
}: {
  readonly pattern: AssembledK912ReportBlock;
  readonly primary: {
    readonly label: string;
    readonly score: number;
  };
  readonly secondary: {
    readonly label: string;
    readonly score: number;
  };
  readonly third: {
    readonly label: string;
    readonly score: number;
  };
  readonly firstSecondGap: number;
  readonly secondThirdGap: number;
  readonly overallSpread: number;
  readonly locale: "zh" | "en";
}) {
  const isZh = locale === "zh";

  const resultCards = [
    {
      role: "primary" as const,
      order: "01",
      eyebrow: isZh
        ? "当前第一兴趣"
        : "Current Primary Interest",
      label: primary.label,
      score: primary.score,
    },
    {
      role: "secondary" as const,
      order: "02",
      eyebrow: isZh
        ? "当前第二兴趣"
        : "Current Secondary Interest",
      label: secondary.label,
      score: secondary.score,
    },
    {
      role: "third" as const,
      order: "03",
      eyebrow: isZh
        ? "第三兴趣背景"
        : "Third Interest Context",
      label: third.label,
      score: third.score,
    },
  ];

  const metrics = [
    {
      label: isZh
        ? "第一与第二"
        : "First–Second",
      value: firstSecondGap,
      description: isZh
        ? "观察当前两个主要兴趣方向之间的区分程度。"
        : "Shows the current separation between the two leading interests.",
    },
    {
      label: isZh
        ? "第二与第三"
        : "Second–Third",
      value: secondThirdGap,
      description: isZh
        ? "观察第二兴趣与后续兴趣背景之间的距离。"
        : "Shows the distance between the second interest and the next background signal.",
    },
    {
      label: isZh
        ? "六维整体跨度"
        : "Overall Six-Domain Spread",
      value: overallSpread,
      description: isZh
        ? "观察六个兴趣方向在本次测试中的整体分布范围。"
        : "Shows the overall distribution range across all six interests.",
    },
  ];

  return (
    <div
      data-k912-layout="interest-structure"
      className="space-y-5"
    >
      <article className="border border-[#c8c2b5] bg-[#f7f4ec] p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c684d]">
          Current Interest Structure
        </p>

        {pattern.title ? (
          <h3 className="mt-3 text-xl font-semibold leading-8 text-[var(--color-text)]">
            {pattern.title}
          </h3>
        ) : null}

        {pattern.paragraphs.length ? (
          <div className="mt-3 max-w-3xl space-y-3">
            {pattern.paragraphs.map((paragraph, index) => (
              <p
                key={`${pattern.id}-structure-p-${index}`}
                className="leading-7 text-[var(--color-text-secondary)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </article>

      <div className="grid gap-4 lg:grid-cols-3">
        {resultCards.map((card) => (
          <article
            key={card.role}
            data-k912-structure-role={card.role}
            className={[
              "border border-[#c8c2b5] bg-[#fbfaf6] p-5 md:p-6",
              card.role === "primary"
                ? "border-t-4 border-t-[#9a8463]"
                : card.role === "secondary"
                  ? "border-t-4 border-t-[#8b8378]"
                  : "border-t-4 border-t-[#b9b1a4]",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-xl leading-none text-[#9a8463]">
                  {card.order}
                </p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                  {card.eyebrow}
                </p>

                <h4 className="mt-2 text-xl font-semibold leading-8 text-[var(--color-text)]">
                  {card.label}
                </h4>
              </div>

              <div className="font-serif text-4xl leading-none tabular-nums text-[#7c684d]">
                {Math.round(card.score)}
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden bg-[#e5e0d6]">
              <div
                aria-hidden="true"
                className={[
                  "h-full",
                  card.role === "primary"
                    ? "bg-[#9a8463]"
                    : card.role === "secondary"
                      ? "bg-[#8b8378]"
                      : "bg-[#b9b1a4]",
                ].join(" ")}
                style={{
                  width: `${Math.max(
                    0,
                    Math.min(
                      100,
                      Math.round(card.score),
                    ),
                  )}%`,
                }}
              />
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <article
            key={metric.label}
            className="border border-[#d8d2c6] bg-[#fbfaf6] p-5 md:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7c684d]">
              {String(index + 1).padStart(2, "0")}
            </p>

            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--color-text)]">
              {metric.label}
            </p>

            <div className="mt-3 font-serif text-4xl leading-none tabular-nums text-[#7c684d]">
              {metric.value.toFixed(1)}
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
              {metric.description}
            </p>
          </article>
        ))}
      </div>

      <div className="border-l-4 border-[#9a8463] bg-[#f7f4ec] px-5 py-4">
        <p className="max-w-4xl text-sm leading-6 text-[var(--color-text-secondary)]">
          {isZh
            ? "这些分数与差距用于描述本次测试中的当前兴趣结构。它们不表示能力高低，也不建立孩子长期或永久的兴趣层级。"
            : "These scores and gaps describe the current interest structure in this test. They do not represent ability levels or establish a long-term or permanent hierarchy of interests."}
        </p>
      </div>
    </div>
  );
}

function K912Block({
  block,
}: {
  readonly block: AssembledK912ReportBlock;
}) {
  const title = block.title ? (
    <h3 className="text-lg font-semibold leading-7 text-[var(--color-text)]">
      {block.title}
    </h3>
  ) : null;

  const paragraphs = block.paragraphs.length ? (
    <div className="space-y-3">
      {block.paragraphs.map((paragraph, index) => (
        <p
          key={`${block.id}-p-${index}`}
          className="whitespace-pre-line leading-8"
        >
          {paragraph}
        </p>
      ))}
    </div>
  ) : null;

  const items = block.items.length ? (
    <ul className="space-y-2 pl-5">
      {block.items.map((item, index) => (
        <li
          key={`${block.id}-i-${index}`}
          className="list-disc leading-7"
        >
          {item}
        </li>
      ))}
    </ul>
  ) : null;

  if (block.kind === "callout") {
    return (
      <div
        data-k912-block-kind="callout"
        className="border-l-4 border-[#9a8463] bg-[#f7f4ec] px-6 py-5"
      >
        <div className="space-y-4">
          {title}
          {paragraphs}
          {items}
        </div>
      </div>
    );
  }

  if (block.kind === "evidence") {
    return (
      <div
        data-k912-block-kind="evidence"
        className="space-y-4"
      >
        {title}
        {paragraphs}
        {block.items.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {block.items.map((item, index) => (
              <div
                key={`${block.id}-e-${index}`}
                className="border border-[#d8d2c6] bg-[#fbfaf6] p-4 leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (block.kind === "project") {
    return (
      <div
        data-k912-block-kind="project"
        className="border border-[#c8c2b5] bg-[#fbfaf6] p-5"
      >
        <div className="space-y-4">
          {title}
          {paragraphs}
          {items}
        </div>
      </div>
    );
  }

  if (
    block.kind === "reflection" ||
    block.kind === "observation"
  ) {
    return (
      <div
        data-k912-block-kind={block.kind}
        className="border border-[#d8d2c6] p-5"
      >
        <div className="space-y-4">
          {title}
          {paragraphs}
          {items}
        </div>
      </div>
    );
  }

  if (block.kind === "boundary") {
    return (
      <div
        data-k912-block-kind="boundary"
        className="border-t border-[#c8c2b5] pt-5 text-sm text-[var(--color-text-muted)]"
      >
        <div className="space-y-4">
          {title}
          {paragraphs}
          {items}
        </div>
      </div>
    );
  }

  if (block.kind === "bullet-list") {
    return (
      <div
        data-k912-block-kind="bullet-list"
        className="space-y-4"
      >
        {title}
        {paragraphs}
        {items}
      </div>
    );
  }

  return (
    <div
      data-k912-block-kind={block.kind}
      className="ig-reading-width space-y-4"
    >
      {title}
      {paragraphs}
      {items}
    </div>
  );
}

function K912SectionBlockLayout({
  section,
  primary,
  secondary,
  interestMapDomains,
  third,
  firstSecondGap,
  secondThirdGap,
  overallSpread,
  locale,
}: {
  readonly section: AssembledK912ReportSection;
  readonly primary: {
    readonly label: string;
    readonly score: number;
  };
  readonly secondary: {
    readonly label: string;
    readonly score: number;
  };
  readonly third: {
    readonly label: string;
    readonly score: number;
  };
  readonly firstSecondGap: number;
  readonly secondThirdGap: number;
  readonly overallSpread: number;
  readonly locale: "zh" | "en";
  readonly interestMapDomains: readonly {
    readonly id: string;
    readonly label: string;
    readonly rank: number;
    readonly score: number;
    readonly rawScore: number;
    readonly role: "primary" | "secondary" | "background";
  }[];
}) {
  /*
   * Section 04:
   * Current Interest Structure.
   */
  const interestPattern = section.blocks.find(
    (block) =>
      block.id === "interest-pattern",
  );

  const interestGaps = section.blocks.find(
    (block) =>
      block.id === "interest-gaps",
  );

  if (
    interestPattern &&
    interestGaps
  ) {
    return (
      <K912ProfessionalInterestStructure
        pattern={interestPattern}
        primary={primary}
        secondary={secondary}
        third={third}
        firstSecondGap={firstSecondGap}
        secondThirdGap={secondThirdGap}
        overallSpread={overallSpread}
        locale={locale}
      />
    );
  }

  /*
   * Section 03:
   * Six-Domain Interest Map.
   */
  const sixDomainRanking = section.blocks.find(
    (block) =>
      block.id === "six-domain-ranking",
  );

  const sixDomainScale = section.blocks.find(
    (block) =>
      block.id === "six-domain-scale",
  );

  if (
    sixDomainRanking &&
    sixDomainScale
  ) {
    return (
      <K912ProfessionalInterestMap
        domains={interestMapDomains}
        scaleNote={
          sixDomainScale.paragraphs[0] ?? ""
        }
        locale={locale}
      />
    );
  }

  /*
   * Section 02:
   * Parent & Child Executive Summary.
   */
  const executiveCombination = section.blocks.find(
    (block) =>
      block.id === "executive-combination",
  );

  const executiveMeaning = section.blocks.find(
    (block) =>
      block.id === "executive-meaning",
  );

  const executiveChildQuestion = section.blocks.find(
    (block) =>
      block.id === "executive-child-question",
  );

  if (
    executiveCombination &&
    executiveMeaning &&
    executiveChildQuestion
  ) {
    return (
      <K912ProfessionalExecutiveSummary
        combination={executiveCombination}
        meaning={executiveMeaning}
        childQuestion={executiveChildQuestion}
        primary={primary}
        secondary={secondary}
      />
    );
  }

  /*
   * Section 12:
   * Method & Interpretation Framework.
   */
  const hasCommonMisreads = section.blocks.some(
    (block) =>
      block.id === "primary-common-misreads",
  );

  const hasPrimaryBoundary = section.blocks.some(
    (block) =>
      block.id === "primary-boundary",
  );

  const hasCombinationBoundary = section.blocks.some(
    (block) =>
      block.id === "combination-boundary",
  );

  if (
    hasCommonMisreads &&
    hasPrimaryBoundary &&
    hasCombinationBoundary
  ) {
    return (
      <K912ProfessionalMethodFramework
        blocks={section.blocks}
        locale={locale}
      />
    );
  }

  /*
   * Section 11:
   * Parent & Child Observation Plan.
   */
  const hasCombinationReflection = section.blocks.some(
    (block) =>
      block.id === "combination-child-reflection",
  );

  const hasCombinationObservation = section.blocks.some(
    (block) =>
      block.id === "combination-parent-observation",
  );

  if (
    hasCombinationReflection &&
    hasCombinationObservation
  ) {
    const observationBlocks = section.blocks.filter(
      (block) =>
        block.kind === "reflection" ||
        block.kind === "observation",
    );

    const remainingBlocks = section.blocks.filter(
      (block) =>
        block.kind !== "reflection" &&
        block.kind !== "observation",
    );

    return (
      <>
        <K912ProfessionalObservationPlan
          blocks={observationBlocks}
          locale={locale}
        />

        {remainingBlocks.map((block) => (
          <K912Block
            key={block.id}
            block={block}
          />
        ))}
      </>
    );
  }

  /*
   * Section 10:
   * Quick → Mini → Deep professional exploration path.
   */
  const quickExploration = section.blocks.find(
    (block) => block.id === "quick-exploration",
  );

  const miniProject = section.blocks.find(
    (block) => block.id === "mini-project",
  );

  const deeperExploration = section.blocks.find(
    (block) => block.id === "deeper-exploration",
  );

  if (
    quickExploration &&
    miniProject &&
    deeperExploration
  ) {
    const remainingBlocks = section.blocks.filter(
      (block) =>
        block.id !== "quick-exploration" &&
        block.id !== "mini-project" &&
        block.id !== "deeper-exploration",
    );

    return (
      <>
        <K912ProfessionalActionPath
          quick={quickExploration}
          mini={miniProject}
          deep={deeperExploration}
        />

        {remainingBlocks.map((block) => (
          <K912Block
            key={block.id}
            block={block}
          />
        ))}
      </>
    );
  }

  /*
   * Section 06:
   * B02 Facet Structure + persisted response evidence.
   */
  const facetCoverage = section.blocks.find(
    (block) => block.id === "primary-facet-coverage",
  );

  const selectedEvidence = section.blocks.find(
    (block) => block.id === "selected-facet-evidence",
  );

  if (facetCoverage && selectedEvidence) {
    const remainingBlocks = section.blocks.filter(
      (block) =>
        block.id !== "primary-facet-coverage" &&
        block.id !== "selected-facet-evidence",
    );

    return (
      <>
        <K912ProfessionalEvidenceMatrix
          facetBlock={facetCoverage}
          evidenceBlock={selectedEvidence}
        />

        {remainingBlocks.map((block) => (
          <K912Block
            key={block.id}
            block={block}
          />
        ))}
      </>
    );
  }

  /*
   * Section 05:
   * engagement vs lower-engagement comparison.
   */
  const engagement = section.blocks.find(
    (block) => block.id === "primary-engagement",
  );

  const lowerEngagement = section.blocks.find(
    (block) => block.id === "primary-lower-engagement",
  );

  if (engagement && lowerEngagement) {
    const remainingBlocks = section.blocks.filter(
      (block) =>
        block.id !== "primary-engagement" &&
        block.id !== "primary-lower-engagement",
    );

    return (
      <>
        {remainingBlocks.map((block) => (
          <K912Block
            key={block.id}
            block={block}
          />
        ))}

        <K912ProfessionalComparisonGrid
          left={engagement}
          right={lowerEngagement}
        />
      </>
    );
  }

  return (
    <>
      {section.blocks.map((block) => (
        <K912Block
          key={block.id}
          block={block}
        />
      ))}
    </>
  );
}

function K912SectionUsesFullWidth(
  section: AssembledK912ReportSection,
): boolean {
  const blockIds = new Set(
    section.blocks.map((block) => block.id),
  );

  const isInterestStructure =
    blockIds.has("interest-pattern") &&
    blockIds.has("interest-gaps");

  const isInterestMap =
    blockIds.has("six-domain-ranking") &&
    blockIds.has("six-domain-scale");

  const isExecutiveSummary =
    blockIds.has("executive-combination") &&
    blockIds.has("executive-meaning") &&
    blockIds.has("executive-child-question");

  const isPrimaryComparison =
    blockIds.has("primary-engagement") &&
    blockIds.has("primary-lower-engagement");

  const isEvidenceMatrix =
    blockIds.has("primary-facet-coverage") &&
    blockIds.has("selected-facet-evidence");

  const isActionPath =
    blockIds.has("quick-exploration") &&
    blockIds.has("mini-project") &&
    blockIds.has("deeper-exploration");

  const isObservationPlan =
    blockIds.has("combination-child-reflection") &&
    blockIds.has("combination-parent-observation");

  const isMethodFramework =
    blockIds.has("primary-common-misreads") &&
    blockIds.has("primary-boundary") &&
    blockIds.has("combination-boundary");

  return (
    isInterestStructure ||
    isInterestMap ||
    isExecutiveSummary ||
    isPrimaryComparison ||
    isEvidenceMatrix ||
    isActionPath ||
    isObservationPlan ||
    isMethodFramework
  );
}


type K9121025DisplayBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "table"; rows: string[][] };

// Tables are reconstructed from this group's exact authoritative text, never Group01 cells.
function restoreK9121025ChapterTables(group: string, chapter: number, paragraphs: readonly string[]): K9121025DisplayBlock[] {
  const definitions = group === "01"
    ? group01Tables.tables.filter(t => Number(t.chapter) === chapter).map(t => ({ lines: t.sourceLines, rows: t.rows }))
    : (() => {
      const headers: Record<number, { cells: string[]; rowCount: number }> = {
        3: { cells: ["日常体验", "可持续的爱好", "开放项目与进一步探索"], rowCount: 2 },
        4: { cells: ["活动资源", "对应过程", "推荐理由与观察目标"], rowCount: 4 },
        5: { cells: ["时间阶段", "家长提供的选择", "可观察的过程"], rowCount: 5 },
      };
      const def = headers[chapter];
      if (!def) return [];
      const found: { lines: string[]; rows: string[][] }[] = [];
      paragraphs.forEach((_, i) => {
        if (!def.cells.every((cell, offset) => paragraphs[i + offset] === cell)) return;
        const lines = paragraphs.slice(i, i + def.cells.length * def.rowCount);
        if (lines.length !== def.cells.length * def.rowCount || lines.some(line => !line.trim())) throw new Error(`Group ${group}: incomplete table in chapter ${chapter}`);
        const rows = Array.from({ length: def.rowCount }, (_, row) => lines.slice(row * def.cells.length, (row + 1) * def.cells.length));
        found.push({ lines, rows });
      });
      if (found.length !== (chapter === 3 ? 2 : 1)) throw new Error(`Group ${group}: missing source table in chapter ${chapter}`);
      return found;
    })();
  const matches = new Map<number, { lines: readonly string[]; rows: string[][] }>();
  for (const definition of definitions) {
    const positions: number[] = [];
    for (let i = 0; i <= paragraphs.length - definition.lines.length; i++) {
      if (definition.lines.every((line, j) => line === paragraphs[i + j])) positions.push(i);
    }
    if (positions.length !== 1) throw new Error(`Group ${group}: table in chapter ${chapter} requires one exact match, got ${positions.length}`);
    const index = positions[0];
    for (const [other, table] of matches) if (index < other + table.lines.length && other < index + definition.lines.length) throw new Error(`Group ${group}: overlapping tables`);
    matches.set(index, definition);
  }
  const blocks: K9121025DisplayBlock[] = [];
  for (let i = 0; i < paragraphs.length;) {
    const table = matches.get(i);
    if (table) { blocks.push({ kind: "table", rows: table.rows }); i += table.lines.length; }
    else { blocks.push({ kind: "paragraph", text: paragraphs[i++] }); }
  }
  return blocks;
}

function K9121025ReportDocument({ report }: { readonly report: GeneratedK912ProfessionalReport }) {
  let assembled: ReturnType<typeof assembleK912Content1025>;
  let chapters: (ReturnType<typeof assembleK912Content1025>["chapters"][number] & {
    displayBlocks: K9121025DisplayBlock[];
  })[];
  try {
    assembled = assembleK912Content1025(report.facts);
    chapters = assembled.chapters.map(chapter => ({
      ...chapter,
      displayBlocks: restoreK9121025ChapterTables(assembled.group, chapter.number, chapter.paragraphs),
    }));
  } catch {
    // Let the existing framework error boundary handle failure; never present legacy
    // content as 1025 or expose source paths, tokens, or session data in an error.
    throw new Error("K912报告暂时无法显示，请稍后重试。");
  }
  const { scores, ranking } = report.facts;
  const rankLabel = (domain: (typeof ranking)[number]) => {
    const rank = 1 + ranking.filter(other => scores[other] > scores[domain]).length;
    const tied = ranking.filter(other => scores[other] === scores[domain]).length > 1;
    return `${tied ? "并列" : ""}第${rank}位`;
  };
  return (
    <main className="k912-print-layout min-h-screen bg-[#eaf2f9] text-[#213b56]">
      {/* K912_PRINT_LAYOUT_V1 */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;

            @top-left {
              content: "INNERGEO KIDS";
              color: #164374;
              font-size: 9pt;
              padding-left: 2mm;
              padding-right: 2mm;
              background: #f1f7fc;
              border-bottom: 0.25mm solid #b8d7ec;
            }

            @top-right {
              content: "K912 儿童兴趣测试报告";
              color: #426c90;
              font-size: 8pt;
              padding-left: 2mm;
              padding-right: 2mm;
              background: #f1f7fc;
              border-bottom: 0.25mm solid #b8d7ec;
            }

            @bottom-left {
              content: "更懂自己，生活更美好。";
              color: #6487a8;
              font-size: 8pt;
              padding-left: 2mm;
              border-top: 0.25mm solid #b8d7ec;
            }

            @bottom-right {
              content: counter(page, decimal-leading-zero);
              color: #164374;
              font-size: 8pt;
              padding-right: 2mm;
              border-top: 0.25mm solid #b8d7ec;
            }
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .k912-print-layout {
            background: white !important;
            color: #213b56 !important;
          }

          .k912-print-layout > div {
            max-width: none !important;
            padding: 0 !important;
          }

          .k912-print-layout header {
            min-height: 0 !important;
            height: 255mm !important;
            margin: 0 !important;
            padding: 18mm !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            break-after: page !important;
            box-sizing: border-box !important;
          }

          .k912-print-layout section {
            margin: 0 0 5mm !important;
            padding: 0 !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            break-before: auto !important;
            break-inside: auto !important;
          }


          .k912-print-layout section h2 {
            font-size: 16pt !important;
            line-height: 1.4 !important;
            margin-bottom: 5mm !important;
            break-after: avoid !important;
          }

          .k912-print-layout section h3 {
            font-size: 11pt !important;
            line-height: 1.4 !important;
            margin-top: 5mm !important;
            margin-bottom: 2mm !important;
            break-after: avoid !important;
          }

          .k912-print-layout section p {
            font-size: 9.5pt !important;
            line-height: 1.55 !important;
            margin: 0 !important;
            orphans: 3;
            widows: 3;
          }

          .k912-print-layout section .space-y-4 {
            row-gap: 2.5mm !important;
          }

          /* K912 GROUP01 / BODY TYPOGRAPHY V1 */
          .k912-print-layout section h2 {
            color: #164374 !important;
            font-weight: 700 !important;
            padding-bottom: 2mm !important;
            border-bottom: 0.3mm solid #c5dcec !important;
          }

          .k912-print-layout section h3 {
            color: #24577f !important;
            font-weight: 650 !important;
          }

          .k912-print-layout section table {
            width: 100% !important;
            border-collapse: collapse !important;
            break-inside: avoid !important;
          }

          .k912-print-layout section thead {
            display: table-header-group;
          }

          .k912-print-layout section tr {
            break-inside: avoid !important;
          }
        }
      `}</style>
      <div className="mx-auto max-w-4xl px-5 py-12">
        <div className="mb-6 print:hidden">
          <ReportPrintButton label="打印 / 保存 PDF" guidance="使用浏览器打印功能打印或保存本报告。" />
        </div>
                  {/* K912_G4A_COMPLETE_QA_COVER */}
          <header className="relative mb-10 isolate overflow-hidden rounded-[24px] border border-[#bfd8ec] bg-gradient-to-b from-white via-[#edf7ff] to-[#d9ecfc] p-8 shadow-sm print:break-after-page print:rounded-none print:shadow-none">

            {/* K912 COVER VISUAL: decorative only; no report data */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[230px] overflow-hidden">
              <svg
                viewBox="0 0 900 270"
                preserveAspectRatio="xMidYMid slice"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient id="k912-cover-sky" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="65%" stopColor="#e5f3ff" />
                    <stop offset="100%" stopColor="#b9d9f5" />
                  </linearGradient>
                  <linearGradient id="k912-cover-mountain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7eafe0" />
                    <stop offset="100%" stopColor="#d8ebfa" />
                  </linearGradient>
                </defs>
                <rect width="900" height="270" fill="url(#k912-cover-sky)" />
                <circle cx="775" cy="56" r="42" fill="#fff8e9" opacity=".75" />
                <path d="M390 250 L590 65 L680 162 L755 50 L900 245 Z"
                      fill="url(#k912-cover-mountain)" />
                <path d="M545 110 L590 65 L624 126 L593 113 L578 128 Z"
                      fill="#ffffff" opacity=".95" />
                <path d="M714 108 L755 50 L805 126 L763 108 L748 120 Z"
                      fill="#ffffff" opacity=".95" />
                <path d="M290 270 L505 150 L645 245 L760 156 L900 260 L900 270 Z"
                      fill="#b8d8f0" opacity=".65" />
                <path d="M0 255 Q220 207 425 258 T900 246 L900 270 L0 270 Z"
                      fill="#e9f5ff" opacity=".8" />
              </svg>
            </div>

            <div className="relative z-10">
              <p className="text-xs font-bold tracking-[0.2em] text-[#547fa5]">
                INNERGEO KIDS · K912
              </p>
              <p className="mt-1 text-xs text-[#547fa5]">
                更懂自己，生活更美好。
              </p>

              <h1 className="mt-5 text-[27px] font-bold leading-tight text-[#164374]">
                K912 儿童兴趣测试报告
              </h1>

              <p className="mt-3 border-b border-[#8eb4d1] pb-4 text-sm text-[#426c90]">
                9–12 岁儿童｜六维兴趣发展与个性化探索分析
              </p>

              <p className="mt-4 rounded-md bg-[#e7f1fa] px-3 py-2 text-xs font-semibold text-[#29587c]">
                InnerGeo Kids · {assembled.contentVersion}
              </p>

              <p className="mt-4 text-xs leading-6 text-[#456985]">
                本报告通过六维兴趣得分、兴趣组合分析与适龄活动建议，
                帮助家长理解孩子当前的活动参与偏好。
                分数不代表智力、能力或未来职业倾向。
              </p>

              <h2 className="mt-5 text-base font-bold text-[#164374]">
                当前兴趣概览｜六维结果
              </h2>

              <table className="mt-2 w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#dceaf6] text-[#164374]">
                    <th className="border border-[#b8d1e5] px-3 py-2 text-left">
                      兴趣领域
                    </th>
                    <th className="border border-[#b8d1e5] px-3 py-2 text-left">
                      本次得分
                    </th>
                    <th className="border border-[#b8d1e5] px-3 py-2 text-left">
                      名次
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((domain, index) => (
                    <tr key={domain} className={index % 2 === 0 ? "bg-white/80" : "bg-[#e7f1fa]/80"}>
                      <td className="border border-[#b8d1e5] px-3 py-1.5">
                        {K912_DOMAIN_LABELS[domain].zh}
                      </td>
                      <td className="border border-[#b8d1e5] px-3 py-1.5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#dceaf6]">
                            <div
                              className="h-full rounded-full bg-[#398bd2]"
                              style={{
                                width: `${scores[domain as keyof typeof scores]}%`,
                              }}
                            />
                          </div>
                          <span className="w-8 text-right font-semibold text-[#164374]">
                            {scores[domain as keyof typeof scores]}
                          </span>
                        </div>
                      </td>
                      <td className="border border-[#b8d1e5] px-3 py-1.5">
                        {rankLabel(domain)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2 className="mt-5 text-base font-bold text-[#164374]">
                主要兴趣结构｜个性化摘要
              </h2>

              <p className="mt-2 border-l-[3px] border-[#79a9cc] bg-white/80 px-3 py-2 text-xs leading-6 text-[#365a79]">
                {assembled.slots.P1_SUMMARY}
              </p>

              <h2 className="mt-5 text-base font-bold text-[#164374]">
                报告目录
              </h2>

              <nav id={TABLE_OF_CONTENTS_ID} aria-label="K912专业报告目录" className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
                {assembled.chapters.map(chapter => (
                  <a key={chapter.number} href={`#k912-1025-${chapter.number}`} className="text-xs leading-5 text-[#365a79]">
                    {String(chapter.number).padStart(2, "0")} · {chapter.title.replace(/^0[1-8]\s*[｜|]\s*/, "")}
                  </a>
                ))}
              </nav>
            </div>

            <div aria-hidden="true" className="pointer-events-none mt-4 h-16">
              <svg viewBox="0 0 1000 150" preserveAspectRatio="none" className="h-full w-full">
                <path d="M0 135 L150 55 L250 110 L380 15 L540 130 L700 35 L840 120 L1000 55 L1000 150 L0 150Z" fill="#bfd5e8"/>
                <path d="M0 145 L180 105 L350 145 L530 75 L720 140 L1000 100 L1000 150 L0 150Z" fill="#8fb5d2"/>
              </svg>
            </div>
          </header>

{chapters.map((heading) => {
          const blocks = heading.displayBlocks;

          return (
            <section
              key={heading.number}
                id={`k912-1025-${heading.number}`}
                data-k912-chapter={heading.number}
              className="mb-8 rounded-[24px] border border-[#d9e6f2] bg-white p-8 shadow-sm print:break-before-auto print:rounded-none print:border-0 print:shadow-none"
            >
              <div className="mb-6 h-1 w-20 rounded-full bg-[#7aa7c9]" />
              <h2 className="mb-7 text-2xl font-semibold">
                {heading.title}
              </h2>

              <div className="space-y-4">
                {blocks.map((block, index) => {
                  if (block.kind === "table") {
                    return (
                      <table
                        key={`table-${index}`}
                        className="my-5 w-full border-collapse text-left text-sm print:break-inside-avoid"
                      >
                        <thead>
                          <tr className="bg-[#e8f2fa]">
                            {block.rows[0].map((cell, i) => (
                              <th key={i} className="border border-[#c7ddeb] p-3 text-[#244d70]">
                                {cell}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className="border border-[#c7ddeb] p-3 align-top leading-6"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    );
                  }

                  const text = block.text;
                  const isSubheading =
                    /^\d+\.\d+\s*[｜|.]?/.test(text) ||
                    /^(日常体验|可持续的爱好|开放项目与进一步探索|家长观察|活动资源)$/.test(text);

                  return isSubheading ? (
                    <h3 key={index} className="mt-7 border-l-[3px] border-[#79a9cc] pl-4 text-base font-semibold leading-7 text-[#244d70]">
                      {text}
                    </h3>
                  ) : (
                    <p key={index} className="text-sm leading-8 text-[#38536c]">
                      {text}
                    </p>
                  );
                })}
              </div>

              <a href={`#${TABLE_OF_CONTENTS_ID}`} className="mt-6 inline-block text-sm text-[#426c90] print:hidden">返回目录</a>

            </section>
          );
        })}
        <div className="print:hidden">
          <ReportNavigation
            primary={{ href: `/kids/result/${report.facts.sessionId}`, label: "返回免费结果" }}
            secondary={{ href: "/kids", label: "儿童测评首页" }}
          />
        </div>
      </div>
    </main>
  );
}

export function K912ProfessionalReportDocument({
  report,
}: {
  readonly report: GeneratedK912ProfessionalReport;
}) {
  const { locale } = useLocale();

  const reportLocale = locale === "zh" ? "zh" : "en";
  const isZh = reportLocale === "zh";

  if (isZh) return <K9121025ReportDocument report={report} />;

  const chapters = assembleK912ReportChapters(report, reportLocale);

  const primary = report.combination.primary;
  const secondary = report.combination.secondary;

  return (
    <ReportShell className="k912-professional-report">
      <ReportHeader
        eyebrow="InnerGeo Kids · K912"
        subtitle={
          isZh
            ? "家长与孩子专业报告"
            : "Parent & Child Professional Report"
        }
        title={
          isZh
            ? "兴趣探索与发展指南"
            : "Interest Exploration & Development Guide"
        }
        description={
          isZh
            ? "本报告依据孩子对42项活动的当前兴趣回应，结合六个领域与真实侧面证据，生成当前兴趣结构、主要兴趣方向、兴趣组合以及下一步探索建议。它不判断能力、天赋、人格或未来职业。"
            : "This report uses 42 current-interest responses, six interest domains and real facet evidence to build a current interest structure, primary-interest interpretation, interest combination and next-step exploration guidance. It does not judge ability, talent, personality or future career."
        }
        metadata={
          <ReportMetadata
            items={[
              {
                label: isZh ? "题库" : "Question bank",
                value: report.facts.questionBankVersion,
              },
              {
                label: isZh ? "评分" : "Scoring",
                value: report.facts.scoringVersion,
              },
              {
                label: isZh ? "报告" : "Report",
                value: report.reportVersion,
              },
              {
                label: isZh ? "测试记录" : "Session",
                value: `${report.facts.sessionId.slice(0, 8)}…`,
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
                ? "使用浏览器打印功能打印或保存本报告。"
                : "Use your browser print function to print or save this report."
            }
          />
        }
      />

      <section
        data-k912-layout="report-snapshot"
        className="mt-10 border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9"
      >
        <p className="ig-label text-[var(--color-text-muted)]">
          {isZh
            ? "当前第一兴趣 × 第二兴趣"
            : "Current Primary × Secondary Interest"}
        </p>

        <h2 className="ig-heading-2 mt-3">
          {K912_DOMAIN_LABELS[primary][reportLocale]}
          {" + "}
          {K912_DOMAIN_LABELS[secondary][reportLocale]}
        </h2>

        <div className="mt-7 grid gap-px bg-[#d8d2c6] sm:grid-cols-2 lg:grid-cols-3">
          {report.facts.ranking.map((domain, index) => (
            <article
              key={domain}
              className="bg-[#f7f4ec] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6d746b]">
                #{index + 1}
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                {K912_DOMAIN_LABELS[domain][reportLocale]}
              </h3>

              <p className="mt-4 font-serif text-3xl">
                {Math.round(report.facts.scores[domain])}
              </p>

              <p className="mt-2 text-xs text-[#6d746b]">
                {isZh
                  ? `原始分 ${report.facts.rawScores[domain]} / 35`
                  : `Raw ${report.facts.rawScores[domain]} / 35`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <ReportTableOfContents
        id={TABLE_OF_CONTENTS_ID}
        ariaLabel={
          isZh
            ? "K912专业报告目录"
            : "K912 Professional Report table of contents"
        }
        items={chapters.map((chapter, index) => ({
          id: chapter.id,
          anchor: chapter.id,
          order: index + 1,
          title: chapter.title,
        }))}
        title={isZh ? "报告目录" : "Table of Contents"}
        description={
          isZh
            ? "八个章节依次解释测试结果、主要兴趣、真实证据、兴趣组合、探索方向以及亲子观察。"
            : "Eight chapters move from results and primary interest through real evidence, interest combination, exploration and parent-child observation."
        }
      />

      <div className="personality-report-sections mt-10 space-y-10">
        {chapters.map((chapter, index) => (
          <ReportSection
            key={chapter.id}
            id={chapter.id}
            order={index + 1}
            sectionLabel={
              isZh
                ? `第 ${String(index + 1).padStart(2, "0")} 章`
                : `Chapter ${String(index + 1).padStart(2, "0")}`
            }
            title={chapter.title}
            blocks={chapter.sections.map((section) => ({
                id: `${section.id}-content`,
                title: section.title !== chapter.title ? section.title : undefined,
                label: isZh
                  ? "专业解读"
                  : "Professional Interpretation",
                contentWidthClassName:
                  K912SectionUsesFullWidth(section)
                    ? "max-w-none"
                    : undefined,
                content: (
                  <div className="space-y-6" data-k912-section-id={section.id}>
                    {section.blocks.length
                      ? (
                          <K912SectionBlockLayout
                            section={section}
                            primary={{
                              label:
                                K912_DOMAIN_LABELS[primary][reportLocale],
                              score:
                                report.facts.scores[primary],
                            }}
                            secondary={{
                              label:
                                K912_DOMAIN_LABELS[secondary][reportLocale],
                              score:
                                report.facts.scores[secondary],
                            }}
                            interestMapDomains={
                              report.facts.ranking.map(
                                (domain, rankIndex) => ({
                                  id: domain,
                                  label:
                                    K912_DOMAIN_LABELS[domain][reportLocale],
                                  rank: rankIndex + 1,
                                  score:
                                    report.facts.scores[domain],
                                  rawScore:
                                    report.facts.rawScores[domain],
                                  role:
                                    domain === primary
                                      ? "primary"
                                      : domain === secondary
                                        ? "secondary"
                                        : "background",
                                }),
                              )
                            }
                            third={{
                              label:
                                K912_DOMAIN_LABELS[
                                  report.facts.ranking[2] ?? secondary
                                ][reportLocale],
                              score:
                                report.facts.scores[
                                  report.facts.ranking[2] ?? secondary
                                ],
                            }}
                            firstSecondGap={
                              report.facts.firstSecondGap
                            }
                            secondThirdGap={
                              report.facts.secondThirdGap
                            }
                            overallSpread={
                              report.facts.overallSpread
                            }
                            locale={reportLocale}
                          />
                        )
                      : section.paragraphs.map(
                          (paragraph, paragraphIndex) => (
                            <p
                              key={`${section.id}-${paragraphIndex}`}
                              className="leading-8"
                            >
                              {paragraph}
                            </p>
                          ),
                        )}
                  </div>
                ),
              }))}
            tableOfContentsId={TABLE_OF_CONTENTS_ID}
            backToContentsLabel={
              isZh ? "返回目录" : "Back to contents"
            }
          />
        ))}
      </div>

      <footer className="mt-12 border-t border-[#c8c2b5] pt-7 text-sm leading-7 text-[#6d746b]">
        <p>InnerGeo Kids · {report.reportVersion}</p>
        <p>
          {isZh ? "测试记录" : "Session"}{" "}
          {report.facts.sessionId}
        </p>
      </footer>

      <ReportNavigation
        primary={{
          href: `/kids/result/${report.facts.sessionId}`,
          label: isZh
            ? "返回免费结果"
            : "Back to free result",
        }}
        secondary={{
          href: "/kids",
          label: isZh
            ? "儿童测评首页"
            : "Kids overview",
        }}
      />
    </ReportShell>
  );
}
