import type {
  ReactNode,
} from "react";

export interface ReportHeaderProps {
  eyebrow: ReactNode;
  subtitle?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  actions?: ReactNode;
}

export function ReportHeader({
  eyebrow,
  subtitle,
  title,
  description,
  metadata,
  actions,
}: ReportHeaderProps) {
  return (
    <header className="personality-report-header border-b border-[#c8c2b5] pb-10">
      <p className="ig-label text-[var(--color-text-muted)]">
        {eyebrow}
      </p>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          {subtitle ? (
            <div className="ig-body-small text-[var(--color-text-muted)]">
              {subtitle}
            </div>
          ) : null}

          <h1 className="ig-heading-1 mt-3">
            {title}
          </h1>

          {description ? (
            <div className="ig-body-large ig-reading-width mt-5 text-[var(--color-text-secondary)]">
              {description}
            </div>
          ) : null}
        </div>

        {metadata || actions ? (
          <div className="report-print-compact-block ig-body-small text-[var(--color-text-muted)] lg:text-right">
            {metadata}

            {actions ? (
              <div className="report-interactive-only mt-6 flex flex-col items-start gap-3 lg:items-end">
                {actions}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
