import type { ReactNode } from "react";

import { ReportContentBlock } from "./report-content-block";

export interface ReportSectionBlock {
  id: string;
  label: ReactNode;
  title?: ReactNode;
  content: ReactNode;
  contentWidthClassName?: string;
}

export interface ReportSectionProps {
  id: string;
  order: number;
  sectionLabel?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  blocks: readonly ReportSectionBlock[];
  tableOfContentsId: string;
  backToContentsLabel?: ReactNode;
}

export function ReportSection({
  id,
  order,
  sectionLabel = `Section ${order}`,
  title,
  description,
  badge,
  blocks,
  tableOfContentsId,
  backToContentsLabel = "Back to contents",
}: ReportSectionProps) {
  return (
    <section
      id={id}
      className="personality-report-section border border-[#c8c2b5] bg-[#f7f4ec]"
    >
      <header className="personality-report-section-header report-print-section-heading-group border-b border-[#d8d2c6] p-7 md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="ig-label text-[var(--color-text-muted)]">
            {sectionLabel}
          </p>

          {badge ? (
            <p className="ig-label text-[var(--color-accent)]">{badge}</p>
          ) : null}
        </div>

        <h2 className="ig-heading-2 mt-4">{title}</h2>

        {description ? (
          <div className="ig-body ig-reading-width mt-4 text-[var(--color-text-secondary)]">
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
            contentWidthClassName={block.contentWidthClassName}
          >
            {block.content}
          </ReportContentBlock>
        ))}
      </div>

      <div className="report-back-to-contents report-interactive-only border-t border-[#d8d2c6] px-7 py-5 md:px-9">
        <a
          href={`#${tableOfContentsId}`}
          className="ig-label inline-flex min-h-10 items-center text-[var(--color-text-muted)] underline decoration-[var(--color-border-strong)] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
        >
          {backToContentsLabel}
        </a>
      </div>
    </section>
  );
}
