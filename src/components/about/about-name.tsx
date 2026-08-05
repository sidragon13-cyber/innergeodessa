"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutName() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const name = dictionary.name;

  return (
    <section className="name-section">
      <div className="name-inner shell">
        <div className="name-heading">
          <p className="eyebrow">
            {name.eyebrow}
          </p>

          <h2>
            {name.title}
          </h2>

          <p>
            {name.disclaimer}
          </p>
        </div>

        <div className="name-parts">
          {name.parts.map((part) => (
            <article key={part.number}>
              <span>
                {part.number}
              </span>

              <h3>
                {part.title}
              </h3>

              <p>
                {part.description}
              </p>
            </article>
          ))}
        </div>

        <p className="name-summary">
          {name.summary}
        </p>
      </div>
    </section>
  );
}
