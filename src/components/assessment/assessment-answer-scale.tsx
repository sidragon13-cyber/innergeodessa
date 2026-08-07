"use client";

import { useLocale } from "@/components/locale";
import { getAssessmentDictionary } from "@/data/i18n";

import type { AssessmentAnswerOption } from "./types";

export interface AssessmentAnswerScaleProps {
  options: readonly AssessmentAnswerOption[];
  selectedValue: number | undefined;
  onSelect: (value: number, eventTimeStamp: number) => void;
}

export function AssessmentAnswerScale({
  options,
  selectedValue,
  onSelect,
}: AssessmentAnswerScaleProps) {
  const { locale } = useLocale();
  const dictionary = getAssessmentDictionary(locale);

  return (
    <div
      className="grid gap-3"
      role="radiogroup"
      aria-label={dictionary.answerScale.ariaLabel}
    >
      {options.map((option) => {
        const selected = selectedValue === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={(event) => onSelect(option.value, event.timeStamp)}
            className={[
              "group flex min-h-16 w-full items-center justify-between gap-6 border px-5 py-4 text-left",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
              selected
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-on-primary)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-raised)]",
            ].join(" ")}
          >
            <span className="text-base leading-6">{option.label}</span>

            <span
              className={[
                "flex h-8 min-w-8 items-center justify-center border text-xs font-bold",
                selected
                  ? "border-[rgba(248,245,237,0.55)] text-[var(--color-on-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-[var(--color-accent)]",
              ].join(" ")}
              aria-hidden="true"
            >
              {option.value}
            </span>
          </button>
        );
      })}
    </div>
  );
}
