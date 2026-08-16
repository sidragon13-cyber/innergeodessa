"use client";

import Link from "next/link";

import styles from "./career-landing-v1.module.css";

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

function CareerInterestMap() {
  const { locale } = useLocale();
  const dictionary =
    getCareerLandingDictionary(locale);

  const nodePositions = [
    styles.mapNodeTopLeft,
    styles.mapNodeTopRight,
    styles.mapNodeMiddleLeft,
    styles.mapNodeMiddleRight,
    styles.mapNodeBottomLeft,
    styles.mapNodeBottomRight,
  ];

  return (
    <div
      className={styles.careerInterestMap}
      aria-hidden="true"
    >
      <div className={styles.mapGrid} />

      <div className={styles.mapCenter}>
        <span>
          {locale === "zh"
            ? "六个兴趣方向"
            : "SIX INTEREST DIRECTIONS"}
        </span>

        <strong>
          {locale === "zh"
            ? "你的兴趣结构"
            : "YOUR INTEREST PATTERN"}
        </strong>
      </div>

      {dictionary.dimensions.items.map(
        (dimension, index) => (
          <div
            className={`${styles.mapNode} ${nodePositions[index]}`}
            key={dimension.code}
          >
            <b>{dimension.code}</b>
            <span>{dimension.title}</span>
          </div>
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
        size="wide"
        className={styles.hero}
      >
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">
              {dictionary.hero.eyebrow}
            </p>

            <h1
              className={`${styles.heroTitle} ${
                locale === "en" ? styles.heroTitleEn : ""
              }`}
            >
              {dictionary.hero.title}
            </h1>

            <p className={styles.heroIntro}>
              {dictionary.hero.description}
            </p>

            <ul
              className={styles.heroMeta}
              aria-label={dictionary.hero.detailsLabel}
            >
              {dictionary.hero.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            <div className={styles.heroActions}>
              <CareerAction>
                {dictionary.hero.primaryAction}
              </CareerAction>

              <a
                className={styles.secondaryAction}
                href="#riasec"
              >
                {dictionary.hero.secondaryAction}{" "}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <CareerInterestMap />
          </div>
        </div>
      </Container>

      <Container
        as="section"
        size="wide"
        className={styles.contextSection}
      >
        <div className={styles.contextGrid}>
          <div className={styles.contextHeading}>
            <p className="eyebrow">
              {dictionary.context.eyebrow}
            </p>

            <h2>{dictionary.context.title}</h2>
          </div>

          <div className={styles.contextCopy}>
            {dictionary.context.paragraphs.map(
              (paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ),
            )}
          </div>
        </div>
      </Container>

      <section
        className={styles.riasecSection}
        id="riasec"
      >
        <Container size="wide">
          <div className={styles.riasecHeader}>
            <div>
              <p className="eyebrow">
                {dictionary.dimensions.eyebrow}
              </p>

              <h2>{dictionary.dimensions.title}</h2>
            </div>

            <p className={styles.riasecBoundary}>
              {dictionary.dimensions.description}
            </p>
          </div>

          <div className={styles.riasecGrid}>
            {dimensions.map((dimension, index) => (
              <article
                className={styles.riasecCard}
                key={dimension.code}
              >
                <div className={styles.riasecCardTop}>
                  <span>0{index + 1}</span>

                  <strong aria-hidden="true">
                    {dimension.code}
                  </strong>
                </div>

                <div className={styles.riasecCardBody}>
                  <h3>{dimension.title}</h3>
                  <p>{dimension.theme}</p>
                </div>

                <ul className={styles.riasecKeywords}>
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
        size="wide"
        className={styles.patternSection}
      >
        <div className={styles.patternGrid}>
          <div className={styles.patternHeading}>
            <p className="eyebrow">
              {dictionary.pattern.eyebrow}
            </p>

            <h2>{dictionary.pattern.title}</h2>
          </div>

          <div className={styles.patternContent}>
            <p className={styles.patternLead}>
              {dictionary.pattern.paragraphs[0]}
            </p>

            <div
              className={styles.patternExamples}
              aria-label={dictionary.pattern.exampleLabel}
            >
              <article className={styles.patternExample}>
                <span className={styles.exampleLabel}>
                  {dictionary.pattern.exampleLabel}
                </span>

                <div className={styles.exampleCombination}>
                  <strong>I</strong>
                  <span>{dimensions[1].title}</span>
                  <i aria-hidden="true">+</i>
                  <strong>A</strong>
                  <span>{dimensions[2].title}</span>
                </div>
              </article>

              <article className={styles.patternExample}>
                <span className={styles.exampleLabel}>
                  {dictionary.pattern.exampleLabel}
                </span>

                <div className={styles.exampleCombination}>
                  <strong>E</strong>
                  <span>{dimensions[4].title}</span>
                  <i aria-hidden="true">+</i>
                  <strong>S</strong>
                  <span>{dimensions[3].title}</span>
                </div>
              </article>
            </div>

            <p className={styles.patternNote}>
              {dictionary.pattern.paragraphs[1]}
            </p>
          </div>
        </div>
      </Container>

      <Container
        as="section"
        size="wide"
        className={styles.resultSection}
      >
        <div className={styles.resultCard}>
          <div className={styles.resultSummary}>
            <p className="eyebrow">
              {dictionary.resultPreview.eyebrow}
            </p>

            <h2>{dictionary.resultPreview.title}</h2>

            <p className={styles.resultDescription}>
              {dictionary.resultPreview.description}
            </p>
          </div>

          <div className={styles.resultDetails}>
            <ol className={styles.resultList}>
              {dictionary.resultPreview.items.map(
                (item, index) => (
                  <li key={item}>
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p>{item}</p>
                  </li>
                ),
              )}
            </ol>
          </div>
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
