"use client";

import {
  useLocale,
} from "./locale-provider";

export interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({
  className = "",
}: LocaleSwitcherProps) {
  const {
    locale,
    setLocale,
  } = useLocale();

  return (
    <div
      className={[
        "inline-flex items-center border border-black/20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-label={
        locale === "zh"
          ? "语言选择"
          : "Language selection"
      }
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={[
          "min-h-10 px-4 text-xs font-bold uppercase tracking-[0.12em]",
          "transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34483a]",
          locale === "en"
            ? "bg-[#34483a] text-[#f1eee5]"
            : "hover:bg-black/5",
        ].join(" ")}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLocale("zh")}
        aria-pressed={locale === "zh"}
        className={[
          "min-h-10 border-l border-black/20 px-4 text-xs font-bold tracking-[0.12em]",
          "transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34483a]",
          locale === "zh"
            ? "bg-[#34483a] text-[#f1eee5]"
            : "hover:bg-black/5",
        ].join(" ")}
      >
        中文
      </button>
    </div>
  );
}
