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
  return (
    <div className="grid gap-3">
      {options.map((option) => {
        const selected = selectedValue === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={(event) =>
              onSelect(option.value, event.timeStamp)
            }
            className={`flex min-h-16 items-center justify-between border px-5 text-left transition ${
              selected
                ? "border-[#a64a2c] bg-[#a64a2c] text-[#f1eee5]"
                : "border-black/20 hover:border-[#a64a2c]"
            }`}
          >
            <span>{option.label}</span>
            <span className="text-sm">{option.value}</span>
          </button>
        );
      })}
    </div>
  );
}
