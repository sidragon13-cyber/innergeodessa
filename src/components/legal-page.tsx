"use client";

import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/home";
import { useLocale } from "@/components/locale";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LocalizedText = {
  en: string;
  zh: string;
};

type LocalizedLines = {
  en: readonly string[];
  zh: readonly string[];
};

type LegalPageProps = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  titleLines?: LocalizedLines;
  intro: LocalizedText;
  updated?: string | LocalizedText;
  pageClassName?: string;
  sections: {
    en: readonly LegalSection[];
    zh: readonly LegalSection[];
  };
};

export function LegalPage({
  eyebrow,
  title,
  titleLines,
  intro,
  updated = "8 August 2026",
  pageClassName,
  sections,
}: LegalPageProps) {
  const { locale } = useLocale();

  const copy = {
    eyebrow: eyebrow[locale],
    title: title[locale],
    titleLines: titleLines?.[locale],
    intro: intro[locale],
    updated:
      typeof updated === "string"
        ? updated
        : updated[locale],
    sections: sections[locale],
  };

  return (
    <main
      id="top"
      className={pageClassName}
    >
      <SiteHeader homePath="/" />

      <section className="legal-hero">
        <div className="legal-shell">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>
            {copy.titleLines
              ? copy.titleLines.map((line) => (
                  <span
                    key={line}
                    className="legal-title-line"
                  >
                    {line}
                  </span>
                ))
              : copy.title}
          </h1>
          <p className="legal-intro">{copy.intro}</p>
          <p className="legal-updated">
            {locale === "zh" ? "最后更新：" : "Last updated: "}
            {copy.updated}
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
