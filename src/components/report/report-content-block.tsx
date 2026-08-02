import type {
  ReactNode,
} from "react";

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
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7c684d]">
          {label}
        </p>

        {title ? (
          <h3 className="mt-3 text-xl font-semibold">
            {title}
          </h3>
        ) : null}
      </div>

      <div className="mt-4 max-w-4xl whitespace-pre-line leading-8 text-[#596158]">
        {children}
      </div>
    </article>
  );
}
