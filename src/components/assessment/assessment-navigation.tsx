"use client";

import type { ReactNode } from "react";

import { useLocale } from "@/components/locale";
import { Button } from "@/components/ui";
import { getAssessmentDictionary } from "@/data/i18n";

export interface AssessmentNavigationProps {
  answeredCount: number;
  itemCount: number;
  sessionId: string;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  hasSelectedAnswer: boolean;
  isSaving: boolean;
  isComplete: boolean;
  saveMessage: string;
  completionContent?: ReactNode;
  onPrevious: () => void;
  onNext: () => void;
}

export function AssessmentNavigation({
  answeredCount,
  itemCount,
  sessionId,
  isFirstQuestion,
  isLastQuestion,
  hasSelectedAnswer,
  isSaving,
  isComplete,
  saveMessage,
  completionContent,
  onPrevious,
  onNext,
}: AssessmentNavigationProps) {
  const { locale } = useLocale();
  const dictionary = getAssessmentDictionary(locale);

  const nextLabel = isSaving
    ? isLastQuestion
      ? dictionary.navigation.generatingResult
      : dictionary.navigation.saving
    : isComplete
      ? dictionary.navigation.assessmentComplete
      : isLastQuestion
        ? dictionary.navigation.saveFinalAnswer
        : dictionary.navigation.nextQuestion;

  return (
    <>
      <div className="mt-10 border-t border-[var(--color-border)] pt-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <Button
            type="button"
            variant="secondary"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="justify-self-stretch md:justify-self-start"
          >
            <span aria-hidden="true">←</span>
            <span className="ml-2">{dictionary.navigation.previous}</span>
          </Button>

          <div className="order-first text-center text-xs leading-5 text-[var(--color-text-muted)] md:order-none">
            <p>
              {dictionary.navigation.answeredCount(answeredCount, itemCount)}
            </p>
            <p>{dictionary.navigation.sessionLabel(sessionId)}</p>
          </div>

          <Button
            type="button"
            onClick={onNext}
            disabled={!hasSelectedAnswer || isSaving || isComplete}
            className="justify-self-stretch md:justify-self-end"
          >
            <span>{nextLabel}</span>

            {!isSaving && !isComplete && !isLastQuestion ? (
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            ) : null}
          </Button>
        </div>
      </div>

      {completionContent}

      {saveMessage ? (
        <p
          role="status"
          aria-live="polite"
          className={[
            "mt-5 text-center text-sm leading-6",
            saveMessage.startsWith("Final")
              ? "text-[var(--color-primary)]"
              : "text-[var(--color-accent)]",
          ].join(" ")}
        >
          {saveMessage}
        </p>
      ) : null}
    </>
  );
}
