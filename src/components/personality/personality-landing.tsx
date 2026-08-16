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

import styles from "./personality-landing-v1.module.css";

function PersonalityPreferenceMap({
  kicker,
  label,
  dimensions,
}: {
  kicker: string;
  label: string;
  dimensions: readonly {
    number: string;
    name: string;
    spectrum: string;
    description: string;
    initials: readonly [string, string];
  }[];
}) {
  return (
    <div
      className={styles.preferenceMap}
      aria-hidden="true"
    >
      <div className={styles.preferenceMapField}>
        <div className={styles.preferenceAxes}>
          {dimensions.map((dimension) => (
            <div
              className={styles.preferenceAxis}
              key={dimension.number}
            >
              <span className={styles.axisInitial}>
                {dimension.initials[0]}
              </span>

              <div className={styles.axisTrack}>
                <i />
              </div>

              <span className={styles.axisInitial}>
                {dimension.initials[1]}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.preferenceCenter}>
          <span>{kicker}</span>
          <strong>{label}</strong>
        </div>
      </div>
    </div>
  );
}

export function PersonalityLanding() {
  const { locale } = useLocale();
  const dictionary =
    getPersonalityLandingDictionary(locale);

  const isZh =
    String(locale).toLowerCase().startsWith("zh");

  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <Container
        as="section"
        size="wide"
        className={`${styles.hero} px-0 sm:px-0 lg:px-0`}
      >
        <div
          className={`${styles.heroCopy} ${
            isZh ? styles.heroCopyZh : ""
          }`}
        >
          <p className={styles.eyebrow}>
            {dictionary.hero.eyebrow}
          </p>

          <h1>
            {dictionary.hero.title}
          </h1>

          <p className={styles.intro}>
            {dictionary.hero.description}
          </p>

          <ul
            className={styles.meta}
            aria-label={dictionary.hero.detailsLabel}
          >
            {dictionary.hero.details.map((detail) => (
              <li key={detail}>
                {detail}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <PrimaryButton href="/personality/test">
              {dictionary.hero.primaryAction}
            </PrimaryButton>

            <a
              className={styles.secondaryLink}
              href="#dimensions"
            >
              {dictionary.hero.secondaryAction}{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <PersonalityPreferenceMap
          kicker={
            isZh
              ? "四个偏好维度"
              : "Four preference dimensions"
          }
          label={
            isZh
              ? "你的偏好结构"
              : "YOUR PREFERENCE PATTERN"
          }
          dimensions={dictionary.dimensions.items}
        />
      </Container>

      <Container
        as="section"
        id="dimensions"
        size="wide"
        className={styles.dimensionsSection}
      >
        <div className={styles.dimensionsHeading}>
          <div>
            <p className={styles.eyebrow}>
              {dictionary.dimensions.eyebrow}
            </p>

            <h2>
              {dictionary.dimensions.title}
            </h2>
          </div>

          <p className={styles.dimensionsBoundary}>
            {dictionary.dimensions.description}
          </p>
        </div>

        <div className={styles.dimensionGrid}>
          {dictionary.dimensions.items.map(
            (dimension) => (
              <article
                className={styles.dimensionCard}
                key={dimension.number}
              >
                <div className={styles.dimensionCardTop}>
                  <span className={styles.dimensionNumber}>
                    {dimension.number}
                  </span>

                  <span className={styles.dimensionName}>
                    {dimension.name}
                  </span>
                </div>

                <h3>{dimension.spectrum}</h3>

                <p className={styles.dimensionDescription}>
                  {dimension.description}
                </p>

                <div
                  className={styles.dimensionCardAxis}
                  aria-hidden="true"
                >
                  <span>{dimension.initials[0]}</span>

                  <div className={styles.dimensionCardTrack}>
                    <i />
                  </div>

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
