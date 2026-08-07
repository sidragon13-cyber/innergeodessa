"use client";

import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/home";
import { Container } from "@/components/ui";
import { useLocale } from "@/components/locale";
import { getAccountDictionary } from "@/data/i18n";

export function AccountFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);

  return (
    <>
      <SiteHeader homePath="/" />
      <main className="min-h-[70vh] bg-[#efede5] py-12 text-[#26372d] md:py-20">
        <Container size="content">
          <p className="ig-label text-[var(--color-accent)]">{eyebrow}</p>
          <h1 className="ig-heading-1 mt-4">{title}</h1>
          <p className="ig-body ig-reading-width mt-5 text-[var(--color-text-secondary)]">
            {description}
          </p>

          <div className="mt-10">{children}</div>

          <div className="ig-body-small mt-10 border-t border-[var(--color-border)] pt-7 text-[var(--color-text-muted)]">
            <p>{dictionary.shared.anonymousNote}</p>
            <p className="mt-3">{dictionary.shared.disclaimer}</p>
          </div>
        </Container>
      </main>
      <SiteFooter homePath="/" />
    </>
  );
}
