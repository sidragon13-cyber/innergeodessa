import type {
  ReactNode,
} from "react";

export interface ReportTableOfContentsItem {
  id: string;
  anchor: string;
  order: number;
  title: ReactNode;
  badge?: ReactNode;
}

export interface ReportTableOfContentsProps {
  id: string;
  ariaLabel: string;
  items: readonly ReportTableOfContentsItem[];
  title?: ReactNode;
  description?: ReactNode;
}

export function ReportTableOfContents({
  id,
  ariaLabel,
  items,
  title = "Table of contents",
  description = "Navigate directly to any section of your report.",
}: ReportTableOfContentsProps) {
  return (
    <nav
      id={id}
      aria-label={ariaLabel}
      className="report-table-of-contents mt-10 border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9"
    >
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
        {title}
      </h2>

      {description ? (
        <div className="mt-3 leading-7 text-[#596158]">
          {description}
        </div>
      ) : null}

      <ol className="mt-7 grid gap-px bg-[#d8d2c6] sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-[#f7f4ec]"
          >
            <a
              href={`#${item.anchor}`}
              className="grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#34483a]"
            >
              <span className="text-xs font-bold tabular-nums tracking-[0.12em] text-[#7c684d]">
                {String(item.order).padStart(2, "0")}
              </span>

              <span className="font-semibold">
                {item.title}
              </span>

              {item.badge ? (
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#6d746b]">
                  {item.badge}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
