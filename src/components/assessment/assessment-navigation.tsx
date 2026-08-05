"use client";

import type { ReactNode } from "react";

import {
  useLocale,
} from "@/components/locale";
import {
  getAssessmentDictionary,
} from "@/data/i18n";

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
      <div className="mt-10 border-t border-black/20 pt-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className={[
              "inline-flex min-h-12 items-center justify-center justify-self-stretch border border-black/20 px-5",
              "text-xs font-bold uppercase tracking-[0.14em]",
              "transition-colors duration-200",
              "hover:border-[#34483a] hover:bg-[#34483a] hover:text-[#f1eee5]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64a2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f1eee5]",
              "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black/20 disabled:hover:bg-transparent disabled:hover:text-inherit",
              "md:justify-self-start",
            ].join(" ")}
          >
            <span aria-hidden="true">←</span>
            <span className="ml-2">
              {dictionary.navigation.previous}
            </span>
          </button>

          <div className="order-first text-center text-xs leading-5 text-black/50 md:order-none">
            <p>
              {dictionary.navigation.answeredCount(
                answeredCount,
                itemCount,
              )}
            </p>
            <p>
              {dictionary.navigation.sessionLabel(
                sessionId,
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onNext}
            disabled={
              !hasSelectedAnswer ||
              isSaving ||
              isComplete
            }
            className={[
              "inline-flex min-h-12 items-center justify-center justify-self-stretch bg-[#34483a] px-6",
              "text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]",
              "transition-colors duration-200",
              "hover:bg-[#a64a2c]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64a2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f1eee5]",
              "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-[#34483a]",
              "md:justify-self-end",
            ].join(" ")}
          >
            <span>{nextLabel}</span>

            {!isSaving &&
            !isComplete &&
            !isLastQuestion ? (
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            ) : null}
          </button>
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
              ? "text-[#34483a]"
              : "text-[#a64a2c]",
          ].join(" ")}
        >
          {saveMessage}
        </p>
      ) : null}
    </>
  );
}
