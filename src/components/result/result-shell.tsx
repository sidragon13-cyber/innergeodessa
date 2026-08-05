import type {
  ReactNode,
} from "react";

import {
  Container,
} from "@/components/ui";

export interface ResultShellProps {
  children: ReactNode;
  className?: string;
}

export function ResultShell({
  children,
  className = "",
}: ResultShellProps) {
  return (
    <main
      className={[
        "min-h-screen bg-[#efede5] py-12 text-[#26372d] md:py-20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container
        size="wide"
        className="max-w-6xl"
      >
        {children}
      </Container>
    </main>
  );
}
