import type { ReactNode } from "react";

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
  return (
    <>
      <div className="mt-10 flex items-center justify-between border-t border-black/20 pt-8">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className="min-h-12 px-5 text-xs font-bold uppercase tracking-[0.14em] disabled:opacity-30"
        >
          ← Previous
        </button>

        <div className="text-center text-xs text-black/50">
          <p>
            Answered {answeredCount} of {itemCount}
          </p>
          <p className="mt-1">
            Session {sessionId.slice(0, 8)}…
          </p>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!hasSelectedAnswer || isSaving || isComplete}
          className="min-h-12 bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5] disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isSaving
            ? isLastQuestion
              ? "Generating result…"
              : "Saving…"
            : isComplete
              ? "Assessment complete"
              : isLastQuestion
                ? "Save final answer"
                : "Next question →"}
        </button>
      </div>

      {completionContent}

      {saveMessage && (
        <p
          className={`mt-5 text-center text-sm ${
            saveMessage.startsWith("Final")
              ? "text-[#34483a]"
              : "text-[#a64a2c]"
          }`}
        >
          {saveMessage}
        </p>
      )}
    </>
  );
}
