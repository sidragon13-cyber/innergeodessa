import type { ReactNode } from "react";

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
      className={["border-b border-[#c8c2b5] pb-10", className]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="ig-label text-[var(--color-text-muted)]">{eyebrow}</p>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          {subtitle ? (
            <div className="ig-body-small text-[var(--color-text-muted)]">
              {subtitle}
            </div>
          ) : null}

          <div className="mt-3">{title}</div>

          {description ? (
            <div className="ig-body-large ig-reading-width mt-5 text-[var(--color-text-secondary)]">
              {description}
            </div>
          ) : null}
        </div>

        {metadata ? (
          <div className="ig-body-small text-[var(--color-text-muted)] lg:text-right">
            {metadata}
          </div>
        ) : null}
      </div>

      {badges ? <div className="mt-8">{badges}</div> : null}
    </header>
  );
}
