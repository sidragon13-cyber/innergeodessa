"use client";

import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/home";
import { useLocale } from "@/components/locale";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: {
    en: string;
    zh: string;
  };
  title: {
    en: string;
    zh: string;
  };
  intro: {
    en: string;
    zh: string;
  };
  updated?: string;
  sections: {
    en: readonly LegalSection[];
    zh: readonly LegalSection[];
  };
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated = "8 August 2026",
  sections,
}: LegalPageProps) {
  const { locale } = useLocale();

  const copy = {
    eyebrow: eyebrow[locale],
    title: title[locale],
    intro: intro[locale],
    sections: sections[locale],
  };

  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <section className="legal-hero">
        <div className="legal-shell">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="legal-intro">{copy.intro}</p>
          <p className="legal-updated">
            {locale === "zh" ? "最后更新：" : "Last updated: "}
            {updated}
          </p>
        </div>
      </section>

      <section className="legal-content">
        <div className="legal-shell legal-document">
          {copy.sections.map((section) => (
            <section key={section.title} className="legal-section">
              <h2>{section.title}</h2>
              <div className="legal-section-content">{section.content}</div>
            </section>
          ))}
        </div>
      </section>

      <SiteFooter homePath="/" />
    </main>
  );
}
