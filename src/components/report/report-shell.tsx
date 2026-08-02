import type {
  ReactNode,
} from "react";

import {
  Container,
} from "@/components/ui";

export interface ReportShellProps {
  children: ReactNode;
  className?: string;
}

export function ReportShell({
  children,
  className = "",
}: ReportShellProps) {
  return (
    <main
      className={[
        "personality-report min-h-screen bg-[#efede5] py-12 text-[#26372d] md:py-20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container
        size="wide"
        className="personality-report-container max-w-6xl"
      >
        {children}
      </Container>
    </main>
  );
}
