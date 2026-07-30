export interface AssessmentProgressProps {
  currentIndex: number;
  itemCount: number;
}

export function AssessmentProgress({
  currentIndex,
  itemCount,
}: AssessmentProgressProps) {
  const progress = ((currentIndex + 1) / itemCount) * 100;

  return (
    <div className="mb-14 h-px bg-black/15">
      <div
        className="h-px bg-[#a64a2c] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
