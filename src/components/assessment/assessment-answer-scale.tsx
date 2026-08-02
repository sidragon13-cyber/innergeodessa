import type {
  AssessmentAnswerOption,
} from "./types";

export interface AssessmentAnswerScaleProps {
  options: readonly AssessmentAnswerOption[];
  selectedValue: number | undefined;
  onSelect: (
    value: number,
    eventTimeStamp: number,
  ) => void;
}

export function AssessmentAnswerScale({
  options,
  selectedValue,
  onSelect,
}: AssessmentAnswerScaleProps) {
  return (
    <div
      className="grid gap-3"
      role="radiogroup"
      aria-label="Answer options"
    >
      {options.map((option) => {
        const selected =
          selectedValue === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={(event) =>
              onSelect(
                option.value,
                event.timeStamp,
              )
            }
            className={[
              "group flex min-h-16 w-full items-center justify-between gap-6 border px-5 py-4 text-left",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64a2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f1eee5]",
              selected
                ? "border-[#a64a2c] bg-[#a64a2c] text-[#f1eee5]"
                : "border-black/20 bg-transparent text-[#20231d] hover:border-[#a64a2c] hover:bg-white/30",
            ].join(" ")}
          >
            <span className="text-base leading-6">
              {option.label}
            </span>

            <span
              className={[
                "flex h-8 min-w-8 items-center justify-center border text-xs font-bold",
                selected
                  ? "border-[#f1eee5]/60"
                  : "border-black/20 text-black/55 group-hover:border-[#a64a2c]",
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
