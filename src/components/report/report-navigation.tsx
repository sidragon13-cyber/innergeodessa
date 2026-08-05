import Link from "next/link";

export interface ReportNavigationAction {
  href: string;
  label: string;
}

export interface ReportNavigationProps {
  primary: ReportNavigationAction;
  secondary: ReportNavigationAction;
}

export function ReportNavigation({
  primary,
  secondary,
}: ReportNavigationProps) {
  return (
    <div className="report-interactive-only mt-12 flex flex-col gap-4 border-t border-[#c8c2b5] pt-8 sm:flex-row">
      <Link
        href={primary.href}
        className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5] transition-colors hover:bg-[#a64a2c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34483a]"
      >
        {primary.label}
      </Link>

      <Link
        href={secondary.href}
        className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#34483a] hover:text-[#f1eee5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34483a]"
      >
        {secondary.label}
      </Link>
    </div>
  );
}
