export interface ReportPrintButtonProps {
  label?: string;
  guidance?: string;
}

export function ReportPrintButton({
  label = "Print / Save as PDF",
  guidance = "Disable browser headers and footers for a cleaner PDF.",
}: ReportPrintButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#34483a] hover:text-[#f1eee5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34483a]"
      >
        {label}
      </button>

      {guidance ? (
        <p className="max-w-xs text-xs leading-5 text-[#6d746b] lg:text-right">
          {guidance}
        </p>
      ) : null}
    </>
  );
}
