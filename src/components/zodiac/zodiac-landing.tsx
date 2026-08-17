"use client";

import {
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
import type {
  ZodiacSignLandingItem,
} from "@/data/i18n/zodiac";

import styles from "./zodiac-landing-v1.module.css";

function ZodiacWheel({
  label,
  signs,
}: {
  label: string;
  signs: readonly ZodiacSignLandingItem[];
}) {
  return (
    <div
      className={styles.zodiacWheel}
      aria-hidden="true"
    >
      <div className={styles.wheelOrbitOuter} />
      <div className={styles.wheelOrbitMiddle} />
      <div className={styles.wheelOrbitInner} />

      <div className={styles.wheelAxisVertical} />
      <div className={styles.wheelAxisHorizontal} />

      <div className={styles.wheelCenter}>
        <span className={styles.wheelCenterKicker}>
          INNERGEO
        </span>
        <strong>{label}</strong>
        <span className={styles.wheelCenterNote}>
          GOLDEN ZODIAC ATLAS
        </span>
      </div>

      {signs.map((sign, index) => {
        const angle =
          (index / signs.length) * Math.PI * 2 -
          Math.PI / 2;
        const radius = 43;
        const left =
          50 + Math.cos(angle) * radius;
        const top =
          50 + Math.sin(angle) * radius;

        return (
          <span
            className={styles.wheelSign}
            key={sign.code}
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
          >
            <span className={styles.wheelGlyph}>
              {sign.symbol}
            </span>
            <span className={styles.wheelCode}>
              {sign.code}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function ZodiacLanding() {
  const { locale } = useLocale();
  const dictionary =
    getZodiacLandingDictionary(locale);

  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <Container
        as="section"
        size="wide"
        className={styles.heroSection}
      >
        <div className={styles.heroCard}>
          <div
            className={`${styles.heroCopy} ${
              locale === "zh" ? styles.heroCopyZh : ""
            }`}
          >
            <p className={styles.eyebrow}>
              {dictionary.hero.eyebrow}
            </p>

            <h1>{dictionary.hero.title}</h1>

            <p className={styles.heroIntro}>
              {dictionary.hero.description}
            </p>

            <ul
              className={styles.heroMeta}
              aria-label={dictionary.hero.detailsLabel}
            >
              {dictionary.hero.details.map((detail, index) => (
                <li key={`hero-detail-${index}`}>
                  <span aria-hidden="true" />
                  {detail}
                </li>
              ))}
            </ul>

            <div className={styles.heroActions}>
              <a
                className={styles.primaryAction}
                href="/zodiac/test"
              >
                {dictionary.hero.primaryAction}
              </a>

              <a
                className={styles.secondaryAction}
                href="#signs"
              >
                {dictionary.hero.secondaryAction}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div
              className={styles.visualHalo}
              aria-hidden="true"
            />

            <ZodiacWheel
              label={dictionary.orbitLabel}
              signs={dictionary.signs.items}
            />
          </div>
        </div>
      </Container>

      <Container
        as="section"
        size="wide"
        className={styles.approachSection}
      >
        <div className={styles.approachCard}>
          <div className={styles.approachHeading}>
            <p className={styles.eyebrow}>
              {dictionary.approach.eyebrow}
            </p>

            <h2>{dictionary.approach.title}</h2>
          </div>

          <div className={styles.approachCopy}>
            {dictionary.approach.paragraphs.map(
              (paragraph, index) => (
                <p key={`approach-${index}`}>
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </div>
      </Container>

      <section
        className={styles.signsSection}
        id="signs"
      >
        <Container size="wide">
          <div className={styles.signsHeading}>
            <div>
              <p className={styles.eyebrow}>
                {dictionary.signs.eyebrow}
              </p>

              <h2>{dictionary.signs.title}</h2>
            </div>

            <p>{dictionary.signs.description}</p>
          </div>

          <div className={styles.signGrid}>
            {dictionary.signs.items.map((sign, index) => (
              <article
                className={styles.signCard}
                key={sign.code}
              >
                <div className={styles.signCardTop}>
                  <span className={styles.signIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.signCode}>
                    {sign.code}
                  </span>
                </div>

                <div
                  className={styles.signSymbol}
                  aria-hidden="true"
                >
                  {sign.symbol}
                </div>

                <div className={styles.signIdentity}>
                  <h3>{sign.name}</h3>
                  <p className={styles.signSecondaryName}>
                    {sign.secondaryName}
                  </p>
                  <p className={styles.signDates}>
                    {sign.dates}
                  </p>
                </div>

                <p className={styles.signTheme}>
                  {sign.theme}
                </p>

                <ul className={styles.signQualities}>
                  {sign.qualities.slice(0, 3).map(
                    (quality, qualityIndex) => (
                      <li
                        key={`${sign.code}-quality-${qualityIndex}`}
                      >
                        {quality}
                      </li>
                    ),
                  )}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container
        as="section"
        size="wide"
        className={styles.complexitySection}
      >
        <div className={styles.complexityHeader}>
          <div>
            <p className={styles.eyebrow}>
              {dictionary.complexity.eyebrow}
            </p>

            <h2>{dictionary.complexity.title}</h2>
          </div>

          <div className={styles.complexityIntro}>
            <p className={styles.complexityDescription}>
              {dictionary.complexity.description}
            </p>

            {dictionary.complexity.paragraphs.map(
              (paragraph, index) => (
                <p key={`complexity-${index}`}>
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </div>

        <div className={styles.anchorGrid}>
          {dictionary.complexity.anchors.map((anchor) => (
            <article
              className={styles.anchorCard}
              key={anchor.label}
            >
              <div
                className={styles.anchorSymbol}
                aria-hidden="true"
              >
                {anchor.symbol}
              </div>

              <h3>{anchor.label}</h3>

              <p>{anchor.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.traditionNote}>
          <span aria-hidden="true">✦</span>
          <p>{dictionary.complexity.traditionNote}</p>
        </div>
      </Container>

      <section className="zodiac-profile-preview">
        <Container>
          <div className="zodiac-profile-heading">
            <p className="eyebrow">
              {dictionary.profile.eyebrow}
            </p>
            <h2>{dictionary.profile.title}</h2>
            <p>{dictionary.profile.description}</p>
          </div>

          <ol>
            {dictionary.profile.items.map((item, index) => (
              <li key={`profile-item-${index}`}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container
        as="section"
        className="reflection-section"
      >
        <div className="reflection-heading">
          <p className="eyebrow">
            {dictionary.reflection.eyebrow}
          </p>
          <h2>{dictionary.reflection.title}</h2>
          <p>{dictionary.reflection.description}</p>
        </div>

        <div className="reflection-questions">
          {dictionary.reflection.questions.map(
            (question, index) => (
              <p key={`reflection-question-${index}`}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {question}
              </p>
            ),
          )}
        </div>
      </Container>

      <section className="culture-section">
        <Container className="culture-inner">
          <div>
            <p className="eyebrow">
              {dictionary.culture.eyebrow}
            </p>
            <h2>{dictionary.culture.title}</h2>
          </div>

          <div>
            {dictionary.culture.paragraphs.map(
              (paragraph, index) => (
                <p key={`culture-${index}`}>
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </Container>
      </section>

      <Container
        as="section"
        className="guardian-section"
      >
        <div className="guardian-copy">
          <p className="eyebrow">
            {dictionary.geodessa.eyebrow}
          </p>
          <h2>{dictionary.geodessa.title}</h2>
          <p>{dictionary.geodessa.description}</p>
          <p className="future-status">
            {dictionary.geodessa.status}
          </p>
        </div>

        <div
          className="guardian-concepts"
          aria-label={dictionary.geodessa.conceptsLabel}
        >
          {dictionary.geodessa.concepts.map((concept, index) => (
            <span key={`geodessa-concept-${index}`}>
              <i>
                {String(index + 1).padStart(2, "0")}
              </i>
              {concept}
            </span>
          ))}
        </div>
      </Container>

      <section className="zodiac-community">
        <Container className="zodiac-community-inner">
          <div>
            <p className="eyebrow">
              {dictionary.community.eyebrow}
            </p>
            <h2>{dictionary.community.title}</h2>
          </div>
          <p>{dictionary.community.description}</p>
        </Container>
      </section>

      <Container
        as="section"
        className="zodiac-disclaimer"
      >
        <div>
          <p className="eyebrow">
            {dictionary.responsibleUse.eyebrow}
          </p>
          <h2>{dictionary.responsibleUse.title}</h2>
        </div>
        <p>{dictionary.responsibleUse.description}</p>
      </Container>

      <section className="zodiac-final-cta">
        <Container>
          <p className="eyebrow">
            {dictionary.finalCta.eyebrow}
          </p>
          <h2>{dictionary.finalCta.title}</h2>
          <p className="zodiac-final-copy">
            {dictionary.finalCta.description}
          </p>
          <div className="zodiac-final-actions">
            <a
              className="primary-button light-primary"
              href="/zodiac/test"
            >
              {dictionary.finalCta.primaryAction}
            </a>
            <a
              className="secondary-link light-secondary"
              href="/career"
            >
              {dictionary.finalCta.careerAction} {" "}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="quiet-route-link"
              href="/personality"
            >
              {dictionary.finalCta.personalityAction}
            </a>
          </div>
        </Container>
      </section>

      <SiteFooter homePath="/" />
    </main>
  );
}
