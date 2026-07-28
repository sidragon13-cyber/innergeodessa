"use client";

export function PrintReportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#34483a] hover:text-[#f1eee5]"
    >
      PRINT / SAVE AS PDF
    </button>
  );
}
