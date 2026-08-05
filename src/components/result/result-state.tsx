import type {
  ReactNode,
} from "react";

import {
  Container,
} from "@/components/ui";

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
    <main className="min-h-screen bg-[#efede5] py-20 text-[#26372d]">
      <Container size="content">
        <section className="border border-[#c8c2b5] bg-[#f7f4ec] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight">
            {title}
          </h1>

          <div className="mt-5 leading-7 text-[#596158]">
            {message}
          </div>

          {actions.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <a
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className={[
                    "inline-flex min-h-12 items-center justify-center px-6",
                    "text-xs font-bold uppercase tracking-[0.14em]",
                    "transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34483a]",
                    action.variant === "secondary"
                      ? "border border-[#34483a] hover:bg-[#34483a] hover:text-[#f1eee5]"
                      : "bg-[#34483a] text-[#f1eee5] hover:bg-[#a64a2c]",
                  ].join(" ")}
                >
                  {action.label}
                </a>
              ))}
            </div>
          ) : null}
        </section>
      </Container>
    </main>
  );
}
