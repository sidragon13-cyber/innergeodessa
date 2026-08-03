"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutFinalCta() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const finalCta = dictionary.finalCta;

  return (
    <section className="about-final-cta">
      <div className="shell">
        <p className="eyebrow">
          {finalCta.eyebrow}
        </p>

        <h2>
          {finalCta.title}
        </h2>

        <p>
          {finalCta.description}
        </p>

        <div className="about-final-actions">
          <a
            className="primary-button"
            href="/personality"
          >
            {finalCta.personalityAction}{" "}
            <span aria-hidden="true">↗</span>
          </a>

          <a
            className="secondary-link light-secondary"
            href="/career"
          >
            {finalCta.careerAction}{" "}
            <span aria-hidden="true">↗</span>
          </a>

          <a
            className="quiet-route-link"
            href="/zodiac"
          >
            {finalCta.zodiacAction}
          </a>
        </div>
      </div>
    </section>
  );
}
