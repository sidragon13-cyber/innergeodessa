import type { ReactNode } from "react";

import type { AssessmentViewStatus } from "./types";

export interface AssessmentShellProps {
  status: AssessmentViewStatus;
  errorMessage: string;
  currentIndex: number;
  itemCount: number;
  children: ReactNode;
}

export function AssessmentShell({
  status,
  errorMessage,
  currentIndex,
  itemCount,
  children,
}: AssessmentShellProps) {
  if (status === "loading") {
    return (
      <main className="min-h-screen p-20">
        <h1 className="text-4xl">Loading assessment…</h1>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen p-20">
        <h1 className="mb-4 text-4xl">Unable to load assessment</h1>
        <p>{errorMessage}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1eee5] text-[#20231d]">
      <header className="border-b border-black/20">
        <div className="mx-auto flex min-h-20 w-[min(100%-40px,1000px)] items-center justify-between">
          <span className="font-serif text-xl font-bold">
            Inner<span className="italic text-[#a64a2c]">Geodessa</span>
          </span>

          <span className="text-xs font-bold uppercase tracking-[0.16em]">
            Question {currentIndex + 1} of {itemCount}
          </span>
        </div>
      </header>

      <section className="mx-auto w-[min(100%-40px,760px)] py-16 md:py-24">
        {children}
      </section>
    </main>
  );
}
