"use client";

import Link from "next/link";

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
  getCareerLandingDictionary,
} from "@/data/i18n";

function CareerAction({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Link
      href="/career/test"
      className="primary-button"
    >
      {children}
    </Link>
  );
}

function CareerMap() {
  const { locale } = useLocale();
  const dictionary =
    getCareerLandingDictionary(locale);

  return (
    <div className="career-map" aria-hidden="true">
      <svg viewBox="0 0 620 620" fill="none">
        <circle cx="310" cy="310" r="224" />
        <circle cx="310" cy="310" r="162" />
        <circle cx="310" cy="310" r="96" />
        <path d="M310 36v548M36 310h548M116 116l388 388M504 116 116 504" />
      </svg>

      <div className="career-map-center">
        <CompassMark />
        <span>{dictionary.mapLabel}</span>
      </div>

      {dictionary.dimensions.items.map(
        (dimension, index) => (
          <span
            className={`career-map-code career-map-code-${index + 1}`}
            key={dimension.code}
          >
            {dimension.code}
          </span>
        ),
      )}
    </div>
  );
}

export function CareerLanding() {
  const { locale } = useLocale();
  const dictionary =
    getCareerLandingDictionary(locale);

  const dimensions = dictionary.dimensions.items;

  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <Container
        as="section"
        size="full"
        className="career-hero max-w-[1400px] px-0 sm:px-0 lg:px-0"
      >
        <div className="career-hero-copy">
          <p className="eyebrow">
            {dictionary.hero.eyebrow}
          </p>

          <h1>{dictionary.hero.title}</h1>

          <p className="career-intro">
            {dictionary.hero.description}
          </p>

          <ul
            className="assessment-meta"
            aria-label={dictionary.hero.detailsLabel}
          >
            {dictionary.hero.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>

          <div className="career-actions">
            <CareerAction>
              {dictionary.hero.primaryAction}
            </CareerAction>

            <a
              className="secondary-link"
              href="#riasec"
            >
              {dictionary.hero.secondaryAction}{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <CareerMap />
      </Container>

      <Container
        as="section"
        className="career-context"
      >
        <div className="career-context-heading">
          <p className="eyebrow">
            {dictionary.context.eyebrow}
          </p>
          <h2>{dictionary.context.title}</h2>
        </div>

        <div className="career-context-copy">
          {dictionary.context.paragraphs.map(
            (paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ),
          )}
        </div>
      </Container>

      <section
        className="riasec-section"
        id="riasec"
      >
        <Container>
          <div className="career-section-heading">
            <div>
              <p className="eyebrow">
                {dictionary.dimensions.eyebrow}
              </p>
              <h2>{dictionary.dimensions.title}</h2>
            </div>

            <p>{dictionary.dimensions.description}</p>
          </div>

          <div className="riasec-grid">
            {dimensions.map((dimension, index) => (
              <article
                className="riasec-card"
                key={dimension.code}
              >
                <div className="riasec-card-top">
                  <span>0{index + 1}</span>
                  <strong aria-hidden="true">
                    {dimension.code}
                  </strong>
                </div>

                <h3>{dimension.title}</h3>
                <p>{dimension.theme}</p>

                <ul>
                  {dimension.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container
        as="section"
        className="interest-pattern"
      >
        <div className="interest-pattern-heading">
          <p className="eyebrow">
            {dictionary.pattern.eyebrow}
          </p>
          <h2>{dictionary.pattern.title}</h2>
        </div>

        <div className="pattern-body">
          <p>{dictionary.pattern.paragraphs[0]}</p>

          <div
            className="pattern-examples"
            aria-label={dictionary.pattern.exampleLabel}
          >
            <span>{dimensions[1].title}</span>
            <i>+</i>
            <span>{dimensions[2].title}</span>
            <em>{dictionary.pattern.orLabel}</em>
            <span>{dimensions[4].title}</span>
            <i>+</i>
            <span>{dimensions[3].title}</span>
          </div>

          <p>{dictionary.pattern.paragraphs[1]}</p>
        </div>
      </Container>

      <section className="career-results">
        <Container className="career-results-inner">
          <div className="career-results-heading">
            <p className="eyebrow">
              {dictionary.resultPreview.eyebrow}
            </p>
            <h2>{dictionary.resultPreview.title}</h2>
            <p>{dictionary.resultPreview.description}</p>
          </div>

          <ol>
            {dictionary.resultPreview.items.map(
              (item, index) => (
                <li key={item}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ),
            )}
          </ol>
        </Container>
      </section>

      <Container
        as="section"
        className="beyond-section"
      >
        <div className="beyond-heading">
          <p className="eyebrow">
            {dictionary.beyond.eyebrow}
          </p>
          <h2>{dictionary.beyond.title}</h2>
        </div>

        <div className="beyond-grid">
          {dictionary.beyond.paragraphs.map(
            (paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ),
          )}
        </div>
      </Container>

      <section className="career-guidance">
        <Container>
          <div className="career-section-heading">
            <div>
              <p className="eyebrow">
                {dictionary.guidance.eyebrow}
              </p>
              <h2>{dictionary.guidance.title}</h2>
            </div>

            <p>{dictionary.guidance.description}</p>
          </div>

          <div className="career-guidance-grid">
            {dictionary.guidance.items.map(
              (item, index) => (
                <article key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </article>
              ),
            )}
          </div>
        </Container>
      </section>

      <section className="career-disclaimer">
        <Container className="career-disclaimer-inner">
          <div>
            <p className="eyebrow">
              {dictionary.disclaimer.eyebrow}
            </p>
            <h2>{dictionary.disclaimer.title}</h2>
          </div>

          <div>
            {dictionary.disclaimer.paragraphs.map(
              (paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ),
            )}

            <p className="disclaimer-source">
              {dictionary.disclaimer.source}
            </p>
          </div>
        </Container>
      </section>

      <Container
        as="section"
        className="future-profile"
      >
        <div className="future-profile-copy">
          <p className="eyebrow">
            {dictionary.futureProfile.eyebrow}
          </p>
          <h2>{dictionary.futureProfile.title}</h2>
          <p>{dictionary.futureProfile.description}</p>
        </div>

        <div
          className="future-profile-map"
          aria-hidden="true"
        >
          {dictionary.futureProfile.labels.map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
          <CompassMark />
        </div>
      </Container>

      <section className="career-final-cta">
        <Container>
          <p className="eyebrow">
            {dictionary.finalCta.eyebrow}
          </p>

          <h2>{dictionary.finalCta.title}</h2>

          <p className="career-final-copy">
            {dictionary.finalCta.description}
          </p>

          <div className="career-final-actions">
            <CareerAction>
              {dictionary.finalCta.primaryAction}
            </CareerAction>

            <a
              className="secondary-link light-secondary"
              href="/personality"
            >
              {dictionary.finalCta.secondaryAction}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Container>
      </section>

      <SiteFooter homePath="/" />
    </main>
  );
}
