import type { ReactNode } from "react";

export interface ReportContentBlockProps {
  label: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  contentWidthClassName?: string;
}

export function ReportContentBlock({
  label,
  title,
  children,
  className = "",
  contentWidthClassName,
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

      <div
        className={[
          "ig-body mt-4 whitespace-pre-line text-[var(--color-text-secondary)]",
          contentWidthClassName ?? "ig-reading-width",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </article>
  );
}
