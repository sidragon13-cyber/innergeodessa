"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import {
  useLocale,
} from "@/components/locale";
import {
  Container,
} from "@/components/ui";
import {
  getAssessmentDictionary,
} from "@/data/i18n";

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
  const { locale } = useLocale();
  const dictionary = getAssessmentDictionary(locale);
  const currentQuestion = currentIndex + 1;

  if (status === "loading") {
    return (
      <AssessmentStatusShell
        eyebrow={dictionary.shell.loadingEyebrow}
        title={dictionary.shell.loadingTitle}
        message={dictionary.shell.loadingMessage}
      />
    );
  }

  if (status === "error") {
    return (
      <AssessmentStatusShell
        eyebrow={dictionary.shell.errorEyebrow}
        title={dictionary.shell.errorTitle}
        message={
          errorMessage ||
          dictionary.shell.errorFallbackMessage
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
          <Link
            href="/"
            className="font-serif text-xl font-bold tracking-[-0.04em]"
          >
            Inner
            <span className="italic text-[#a64a2c]">
              Geo
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-[0.16em]"
            >
              {locale === "zh" ? "首页" : "Home"}
            </Link>

            <span className="text-right text-xs font-bold uppercase tracking-[0.16em]">
              {dictionary.shell.questionCounter(
                currentQuestion,
                itemCount,
              )}
            </span>
          </div>
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
