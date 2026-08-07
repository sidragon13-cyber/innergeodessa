import type { ReactNode } from "react";

import { ButtonLink, Container } from "@/components/ui";

export interface ResultStateAction {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}

export interface ResultStateProps {
  eyebrow: ReactNode;
  title: ReactNode;
  message: ReactNode;
  actions?: readonly ResultStateAction[];
}

export function ResultState({
  eyebrow,
  title,
  message,
  actions = [],
}: ResultStateProps) {
  return (
    <main className="min-h-screen bg-[var(--color-background)] py-20 text-[var(--color-text)]">
      <Container size="content">
        <section className="border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight">{title}</h1>

          <div className="mt-5 leading-7 text-[var(--color-text-secondary)]">
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
