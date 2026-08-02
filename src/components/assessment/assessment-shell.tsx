import type { ReactNode } from "react";

import {
  Container,
} from "@/components/ui";

import type {
  AssessmentViewStatus,
} from "./types";

export interface AssessmentShellProps {
  status: AssessmentViewStatus;
  errorMessage: string;
  currentIndex: number;
  itemCount: number;
  children: ReactNode;
}

function AssessmentStatusShell({
  eyebrow,
  title,
  message,
}: {
  eyebrow: string;
  title: string;
  message?: string;
}) {
  return (
    <main className="min-h-screen bg-[#f1eee5] text-[#20231d]">
      <Container
        size="content"
        className="flex min-h-screen flex-col justify-center py-20"
      >
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#a64a2c]">
          {eyebrow}
        </p>

        <h1 className="font-serif text-4xl font-normal leading-tight tracking-[-0.04em] md:text-5xl">
          {title}
        </h1>

        {message ? (
          <p className="mt-6 max-w-2xl text-base leading-8 text-black/65">
            {message}
          </p>
        ) : null}
      </Container>
    </main>
  );
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
      <AssessmentStatusShell
        eyebrow="Assessment"
        title="Loading your assessment…"
        message="Your questions and assessment session are being prepared."
      />
    );
  }

  if (status === "error") {
    return (
      <AssessmentStatusShell
        eyebrow="Unable to continue"
        title="The assessment could not be loaded."
        message={
          errorMessage ||
          "Please refresh the page and try again."
        }
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#f1eee5] text-[#20231d]">
      <header className="border-b border-black/20">
        <Container
          className="flex min-h-20 items-center justify-between gap-6"
        >
          <span className="font-serif text-xl font-bold tracking-[-0.04em]">
            Inner
            <span className="italic text-[#a64a2c]">
              Geo
            </span>
            dessa
          </span>

          <span className="text-right text-xs font-bold uppercase tracking-[0.16em]">
            Question {currentIndex + 1} of {itemCount}
          </span>
        </Container>
      </header>

      <Container
        as="section"
        size="content"
        className="py-16 md:py-24"
      >
        {children}
      </Container>
    </main>
  );
}
