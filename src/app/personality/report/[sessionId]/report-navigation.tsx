import Link from "next/link";

export interface ReportNavigationProps {
  sessionId: string;
}

export function ReportNavigation({
  sessionId,
}: ReportNavigationProps) {
  return (
    <div className="report-interactive-only mt-12 flex flex-col gap-4 border-t border-[#c8c2b5] pt-8 sm:flex-row">
      <Link
        href={`/personality/result/${sessionId}`}
        className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
      >
        Back to free result
      </Link>

      <Link
        href="/personality"
        className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em]"
      >
        Personality overview
      </Link>
    </div>
  );
}
