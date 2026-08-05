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
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6d746b]">
        {eyebrow}
      </p>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          {subtitle ? (
            <div className="text-sm text-[#6d746b]">
              {subtitle}
            </div>
          ) : null}

          <h1 className="mt-3 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            {title}
          </h1>

          {description ? (
            <div className="mt-5 max-w-3xl text-lg leading-8 text-[#596158]">
              {description}
            </div>
          ) : null}
        </div>

        {metadata || actions ? (
          <div className="report-print-compact-block text-sm leading-6 text-[#6d746b] lg:text-right">
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
