import type { ReactNode } from "react";

import { ButtonLink, Container } from "@/components/ui";

export interface ReportStateAction {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}

export interface ReportStateProps {
  eyebrow: ReactNode;
  title: ReactNode;
  message: ReactNode;
  actions?: readonly ReportStateAction[];
}

export function ReportState({
  eyebrow,
  title,
  message,
  actions = [],
}: ReportStateProps) {
  return (
    <main className="min-h-screen bg-[var(--color-background)] py-20 text-[var(--color-text)]">
      <Container size="content">
        <section className="border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
          <p className="ig-label text-[var(--color-text-muted)]">{eyebrow}</p>

          <h1 className="ig-heading-2 mt-4">{title}</h1>

          <div className="ig-body ig-reading-width mt-5 text-[var(--color-text-secondary)]">
            {message}
          </div>

          {actions.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <ButtonLink
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  variant={
                    action.variant === "secondary" ? "secondary" : "primary"
                  }
                >
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </section>
      </Container>
    </main>
  );
}
