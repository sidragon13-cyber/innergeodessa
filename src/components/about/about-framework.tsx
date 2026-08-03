"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutFramework() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const framework = dictionary.framework;

  return (
    <section className="growth-framework">
      <div className="shell">
        <div className="growth-heading">
          <p className="eyebrow">
            {framework.eyebrow}
          </p>

          <h2>
            {framework.title}
          </h2>
        </div>

        <div className="growth-grid">
          {framework.items.map((item) => (
            <article key={item.number}>
              <span>
                {item.number}
              </span>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <p className="growth-note">
          {framework.note}
        </p>
      </div>
    </section>
  );
}
