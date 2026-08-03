"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutBoundaries() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const boundaries = dictionary.boundaries;

  return (
    <section className="boundaries-section shell">
      <div className="boundaries-heading">
        <p className="eyebrow">
          {boundaries.eyebrow}
        </p>

        <h2>
          {boundaries.title}
        </h2>

        <p>
          {boundaries.description}
        </p>
      </div>

      <ul>
        {boundaries.items.map((boundary, index) => (
          <li key={boundary}>
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            {boundary}
          </li>
        ))}
      </ul>
    </section>
  );
}
