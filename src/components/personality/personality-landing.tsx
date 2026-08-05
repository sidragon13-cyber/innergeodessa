"use client";

import {
  CompassMark,
  PrimaryButton,
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
  getPersonalityLandingDictionary,
} from "@/data/i18n";

function PersonalityContour() {
  const { locale } = useLocale();
  const dictionary =
    getPersonalityLandingDictionary(locale);

  return (
    <div
      className="personality-contour"
      aria-hidden="true"
    >
      <svg viewBox="0 0 620 560" fill="none">
        <path d="M-12 446c104-23 138-102 210-144 76-44 148-27 205-94 48-57 72-128 71-220" />
        <path d="M-2 493c117-23 162-105 234-150 74-46 139-39 197-98 62-64 89-144 86-245" />
        <path d="M23 540c122-31 179-108 247-152 72-47 129-48 187-100 73-66 105-160 102-288" />
        <path d="M118 560c85-44 127-100 188-138 66-41 117-48 171-96 80-71 119-179 116-326" />
        <circle cx="321" cy="275" r="126" />
        <circle cx="321" cy="275" r="76" />
      </svg>

      <div className="personality-compass">
        <CompassMark />
        <span>{dictionary.contourLabel}</span>
      </div>

      <span className="contour-code contour-code-one">
        E / I
      </span>
      <span className="contour-code contour-code-two">
        S / N
      </span>
      <span className="contour-code contour-code-three">
        T / F
      </span>
      <span className="contour-code contour-code-four">
        J / P
      </span>
    </div>
  );
}

export function PersonalityLanding() {
  const { locale } = useLocale();
  const dictionary =
    getPersonalityLandingDictionary(locale);

  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <Container
        as="section"
        size="full"
        className="personality-hero max-w-[1400px] px-0 sm:px-0 lg:px-0"
      >
        <div className="personality-hero-copy">
          <p className="eyebrow">
            {dictionary.hero.eyebrow}
          </p>

          <h1>
            {dictionary.hero.title}
          </h1>

          <p className="personality-intro">
            {dictionary.hero.description}
          </p>

          <ul
            className="assessment-meta"
            aria-label={dictionary.hero.detailsLabel}
          >
            {dictionary.hero.details.map((detail) => (
              <li key={detail}>
                {detail}
              </li>
            ))}
          </ul>

          <div className="personality-actions">
            <PrimaryButton href="/personality/test">
              {dictionary.hero.primaryAction}
            </PrimaryButton>

            <a
              className="secondary-link"
              href="#dimensions"
            >
              {dictionary.hero.secondaryAction}{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <PersonalityContour />
      </Container>

      <Container
        as="section"
        id="dimensions"
        className="dimensions-section"
      >
        <div className="personality-section-heading">
          <p className="eyebrow">
            {dictionary.dimensions.eyebrow}
          </p>

          <h2>
            {dictionary.dimensions.title}
          </h2>

          <p>
            {dictionary.dimensions.description}
          </p>
        </div>

        <div className="dimension-list">
          {dictionary.dimensions.items.map(
            (dimension) => (
              <article
                className="dimension-row"
                key={dimension.number}
              >
                <span className="dimension-number">
                  {dimension.number}
                </span>

                <div className="dimension-name">
                  <p>{dimension.name}</p>
                  <h3>{dimension.spectrum}</h3>
                </div>

                <p className="dimension-description">
                  {dimension.description}
                </p>

                <div
                  className="dimension-initials"
                  aria-hidden="true"
                >
                  <span>{dimension.initials[0]}</span>
                  <i />
                  <span>{dimension.initials[1]}</span>
                </div>
              </article>
            ),
          )}
        </div>
      </Container>

      <section className="result-section">
        <Container className="result-inner">
          <div className="result-heading">
            <p className="eyebrow">
              {dictionary.result.eyebrow}
            </p>

            <h2>
              {dictionary.result.title}
            </h2>

            <p>
              {dictionary.result.description}
            </p>
          </div>

          <ol className="result-list">
            {dictionary.result.items.map(
              (detail, index) => (
                <li key={detail}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {detail}
                </li>
              ),
            )}
          </ol>

          <p className="result-note">
            {dictionary.result.note}
          </p>
        </Container>
      </section>

      <Container
        as="section"
        className="guidance-section"
      >
        <div className="guidance-heading">
          <p className="eyebrow">
            {dictionary.guidance.eyebrow}
          </p>

          <h2>
            {dictionary.guidance.title}
          </h2>
        </div>

        <div className="guidance-grid">
          {dictionary.guidance.items.map(
            (item, index) => (
              <article key={item}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{item}</p>
              </article>
            ),
          )}
        </div>
      </Container>

      <section className="limitation-section">
        <Container className="limitation-inner">
          <div>
            <p className="eyebrow">
              {dictionary.limitations.eyebrow}
            </p>

            <h2>
              {dictionary.limitations.title}
            </h2>
          </div>

          <ul>
            {dictionary.limitations.items.map(
              (limitation) => (
                <li key={limitation}>
                  {limitation}
                </li>
              ),
            )}
          </ul>
        </Container>
      </section>

      <section
        className="personality-final-cta"
        id="assessment"
      >
        <Container>
          <CompassMark />

          <p className="eyebrow">
            {dictionary.finalCta.eyebrow}
          </p>

          <h2>
            {dictionary.finalCta.title}
          </h2>

          <PrimaryButton href="/personality/test">
            {dictionary.finalCta.action}
          </PrimaryButton>

          <p className="final-cta-note">
            {dictionary.finalCta.note}
          </p>
        </Container>
      </section>

      <SiteFooter homePath="/" />
    </main>
  );
}
