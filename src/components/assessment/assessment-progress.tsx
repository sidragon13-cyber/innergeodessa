export interface AssessmentProgressProps {
  currentIndex: number;
  itemCount: number;
}

export function AssessmentProgress({
  currentIndex,
  itemCount,
}: AssessmentProgressProps) {
  const currentQuestion = currentIndex + 1;
  const progress = itemCount > 0
    ? (currentQuestion / itemCount) * 100
    : 0;

  return (
    <div className="mb-14">
      <div className="mb-3 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
        <span>Assessment progress</span>
        <span>
          {currentQuestion} / {itemCount}
        </span>
      </div>

      <div
        className="h-px overflow-hidden bg-black/15"
        role="progressbar"
        aria-label="Assessment progress"
        aria-valuemin={0}
        aria-valuemax={itemCount}
        aria-valuenow={Math.min(currentQuestion, itemCount)}
        aria-valuetext={`Question ${currentQuestion} of ${itemCount}`}
      >
        <div
          className="h-full bg-[#a64a2c] transition-[width] duration-300 ease-out"
          style={{
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
