import type {
  ReactNode,
} from "react";

import {
  ReportContentBlock,
} from "./report-content-block";

export interface ReportSectionBlock {
  id: string;
  label: ReactNode;
  title?: ReactNode;
  content: ReactNode;
}

export interface ReportSectionProps {
  id: string;
  order: number;
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  blocks: readonly ReportSectionBlock[];
  tableOfContentsId: string;
}

export function ReportSection({
  id,
  order,
  title,
  description,
  badge,
  blocks,
  tableOfContentsId,
}: ReportSectionProps) {
  return (
    <section
      id={id}
      className="personality-report-section border border-[#c8c2b5] bg-[#f7f4ec]"
    >
      <header className="personality-report-section-header report-print-section-heading-group border-b border-[#d8d2c6] p-7 md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            Section {order}
          </p>

          {badge ? (
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7c684d]">
              {badge}
            </p>
          ) : null}
        </div>

        <h2 className="mt-4 text-3xl font-semibold">
          {title}
        </h2>

        {description ? (
          <div className="mt-4 max-w-4xl leading-7 text-[#596158]">
            {description}
          </div>
        ) : null}
      </header>

      <div className="divide-y divide-[#d8d2c6]">
        {blocks.map((block) => (
          <ReportContentBlock
            key={block.id}
            label={block.label}
            title={block.title}
          >
            {block.content}
          </ReportContentBlock>
        ))}
      </div>

      <div className="report-back-to-contents report-interactive-only border-t border-[#d8d2c6] px-7 py-5 md:px-9">
        <a
          href={`#${tableOfContentsId}`}
          className="inline-flex min-h-10 items-center text-xs font-bold uppercase tracking-[0.14em] text-[#6d746b] underline decoration-[#a8a194] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34483a]"
        >
          Back to contents
        </a>
      </div>
    </section>
  );
}
