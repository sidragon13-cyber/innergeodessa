"use client";

import { Button } from "@/components/ui";

export interface ReportPrintButtonProps {
  label: string;
  guidance?: string;
}

export function ReportPrintButton({
  label,
  guidance = "",
}: ReportPrintButtonProps) {
  return (
    <div className="report-interactive-only">
      <Button type="button" variant="secondary" onClick={() => window.print()}>
        {label}
      </Button>

      {guidance ? (
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)]">
          {guidance}
        </p>
      ) : null}
    </div>
  );
}
