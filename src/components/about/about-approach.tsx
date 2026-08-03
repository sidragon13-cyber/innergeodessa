"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutApproach() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const approach = dictionary.approach;

  return (
    <section className="approach-section shell">
      <div className="about-section-heading">
        <div>
          <p className="eyebrow">
            {approach.eyebrow}
          </p>

          <h2>
            {approach.title}
          </h2>
        </div>

        <p>
          {approach.description}
        </p>
      </div>

      <div className="approach-grid">
        {approach.principles.map((principle) => (
          <article key={principle.number}>
            <span>
              {principle.number}
            </span>

            <h3>
              {principle.title}
            </h3>

            <p>
              {principle.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
