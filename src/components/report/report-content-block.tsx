import type { ReactNode } from "react";

export interface ReportContentBlockProps {
  label: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ReportContentBlock({
  label,
  title,
  children,
  className = "",
}: ReportContentBlockProps) {
  return (
    <article
      className={[
        "personality-report-content-block report-print-flow-block p-7 md:p-9",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="report-print-content-heading-group">
        <p className="ig-label text-[var(--color-accent)]">{label}</p>

        {title ? <h3 className="ig-heading-3 mt-3">{title}</h3> : null}
      </div>

      <div className="ig-body ig-reading-width mt-4 whitespace-pre-line text-[var(--color-text-secondary)]">
        {children}
      </div>
    </article>
  );
}
