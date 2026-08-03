"use client";

import {
  CompassMark,
  SiteFooter,
  SiteHeader,
} from "@/components/home";
import {
  useLocale,
} from "@/components/locale";
import {
  Container,
} from "@/components/ui";
import {
  getZodiacLandingDictionary,
} from "@/data/i18n";

export function ZodiacLanding() {
  const { locale } = useLocale();
  const dictionary =
    getZodiacLandingDictionary(locale);

  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <Container
        as="section"
        size="full"
        className="zodiac-hero max-w-[1400px] px-0 sm:px-0 lg:px-0"
      >
        <div className="zodiac-hero-copy">
          <p className="eyebrow">
            {dictionary.hero.eyebrow}
          </p>

          <h1>{dictionary.hero.title}</h1>

          <p className="zodiac-intro">
            {dictionary.hero.description}
          </p>

          <div className="zodiac-actions">
            <a
              className="primary-button"
              href="/zodiac/test"
            >
              {dictionary.hero.primaryAction}
            </a>

            <a
              className="secondary-link"
              href="#signs"
            >
              {dictionary.hero.secondaryAction}{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div
          className="zodiac-orbit"
          aria-hidden="true"
        >
          <svg viewBox="0 0 640 640" fill="none">
            <circle cx="320" cy="320" r="248" />
            <circle cx="320" cy="320" r="184" />
            <circle cx="320" cy="320" r="106" />
            <path d="M320 22v596M22 320h596M109 109l422 422M531 109 109 531" />
          </svg>

          <div className="zodiac-orbit-center">
            <CompassMark />
            <span>
              {locale === "zh"
                ? "自我映照"
                : "Reflection"}
            </span>
          </div>
        </div>
      </Container>

      <SiteFooter homePath="/" />
    </main>
  );
}
