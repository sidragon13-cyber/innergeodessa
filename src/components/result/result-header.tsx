import type {
  ReactNode,
} from "react";

export interface ResultHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  badges?: ReactNode;
  className?: string;
}

export function ResultHeader({
  eyebrow,
  title,
  subtitle,
  description,
  metadata,
  badges,
  className = "",
}: ResultHeaderProps) {
  return (
    <header
      className={[
        "border-b border-[#c8c2b5] pb-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6d746b]">
        {eyebrow}
      </p>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          {subtitle ? (
            <div className="text-sm text-[#6d746b]">
              {subtitle}
            </div>
          ) : null}

          <div className="mt-3">
            {title}
          </div>

          {description ? (
            <div className="mt-5 max-w-3xl text-lg leading-8 text-[#596158]">
              {description}
            </div>
          ) : null}
        </div>

        {metadata ? (
          <div className="text-sm leading-7 text-[#6d746b] lg:text-right">
            {metadata}
          </div>
        ) : null}
      </div>

      {badges ? (
        <div className="mt-8">
          {badges}
        </div>
      ) : null}
    </header>
  );
}
