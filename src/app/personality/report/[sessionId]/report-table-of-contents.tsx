import type {
  ReportAccess,
} from "@/data/report";

export interface ReportSectionNavigationItem {
  access: ReportAccess;
  anchor: string;
  id: string;
  order: number;
  title: string;
}

export interface ReportTableOfContentsProps {
  items: readonly ReportSectionNavigationItem[];
}

export function ReportTableOfContents({
  items,
}: ReportTableOfContentsProps) {
  return (
    <nav
      id="report-table-of-contents"
      aria-label="Report table of contents"
      className="report-table-of-contents mt-10 border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9"
    >
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
        Table of contents
      </h2>

      <p className="mt-3 leading-7 text-[#596158]">
        Navigate directly to any section of your report.
      </p>

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

              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#6d746b]">
                {item.access}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
