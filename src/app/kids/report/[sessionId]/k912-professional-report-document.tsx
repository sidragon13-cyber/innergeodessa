"use client";

import {
  ReportHeader,
  ReportMetadata,
  ReportPrintButton,
  ReportSection,
  ReportShell,
  ReportTableOfContents,
} from "@/components/report";
import { useLocale } from "@/components/locale";
import {
  assembleK912ReportSections,
  type AssembledK912ReportBlock,
  type AssembledK912ReportSection,
} from "@/data/kids/report/k912/assembly";
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

export function K912ProfessionalReportDocument({
  report,
}: {
  readonly report: GeneratedK912ProfessionalReport;
}) {
  const { locale } = useLocale();

  const reportLocale = locale === "zh" ? "zh" : "en";
  const isZh = reportLocale === "zh";

  const sections = assembleK912ReportSections(
    report,
    reportLocale,
  );

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
        items={sections.map((section, index) => ({
          id: section.id,
          anchor: section.id,
          order: index + 1,
          title: section.title,
        }))}
        title={isZh ? "报告目录" : "Table of Contents"}
        description={
          isZh
            ? "十二个部分依次解释测试结果、主要兴趣、真实证据、兴趣组合、探索方向以及亲子观察。"
            : "Twelve sections move from results and primary interest through real evidence, interest combination, exploration and parent-child observation."
        }
      />

      <div className="personality-report-sections mt-10 space-y-10">
        {sections.map((section, index) => (
          <ReportSection
            key={section.id}
            id={section.id}
            order={index + 1}
            sectionLabel={
              isZh
                ? `第 ${String(index + 1).padStart(2, "0")} 部分`
                : `Section ${String(index + 1).padStart(2, "0")}`
            }
            title={section.title}
            blocks={[
              {
                id: `${section.id}-content`,
                label: isZh
                  ? "专业解读"
                  : "Professional Interpretation",
                contentWidthClassName:
                  K912SectionUsesFullWidth(section)
                    ? "max-w-none"
                    : undefined,
                content: (
                  <div className="space-y-6">
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
              },
            ]}
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
    </ReportShell>
  );
}
