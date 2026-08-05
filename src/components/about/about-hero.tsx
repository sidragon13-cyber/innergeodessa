"use client";

import {
  CompassMark,
  PrimaryButton,
} from "@/components/home";
import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

function AboutMap() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const map = dictionary.map;

  return (
    <div className="about-map" aria-hidden="true">
      <svg viewBox="0 0 640 640" fill="none">
        <path d="M-30 507c126-21 170-108 246-151 83-47 151-28 215-96 58-62 86-147 84-274" />
        <path d="M-5 562c143-25 193-113 270-158 78-46 142-37 205-99 70-69 103-167 101-305" />
        <path d="M78 640c103-53 153-116 219-154 72-41 126-48 183-102 83-78 124-195 119-384" />
        <circle cx="342" cy="315" r="165" />
        <circle cx="342" cy="315" r="96" />
      </svg>

      <div className="about-map-center">
        <CompassMark />
        <span>{map.centerLabel}</span>
      </div>

      <span className="about-map-label about-map-label-one">
        {map.identityLabel}
      </span>

      <span className="about-map-label about-map-label-two">
        {map.directionLabel}
      </span>

      <span className="about-map-label about-map-label-three">
        {map.growthLabel}
      </span>
    </div>
  );
}

export function AboutHero() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const hero = dictionary.hero;

  return (
    <section className="about-hero shell">
      <div className="about-hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>

        <h1>{hero.title}</h1>

        <p className="about-intro">
          {hero.description}
        </p>

        <ul
          className="assessment-meta"
          aria-label={hero.principlesLabel}
        >
          {hero.principles.map((principle) => (
            <li key={principle}>
              {principle}
            </li>
          ))}
        </ul>

        <div className="about-actions">
          <PrimaryButton href="#platform">
            {hero.primaryAction}
          </PrimaryButton>

          <a
            className="secondary-link"
            href="/personality"
          >
            {hero.secondaryAction}{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <AboutMap />
    </section>
  );
}
