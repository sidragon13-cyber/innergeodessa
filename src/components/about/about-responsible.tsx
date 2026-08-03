"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutResponsible() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const responsible = dictionary.responsible;

  return (
    <section className="responsible-section shell">
      <div>
        <p className="eyebrow">
          {responsible.eyebrow}
        </p>

        <h2>
          {responsible.title}
        </h2>

        <p>
          {responsible.description}
        </p>
      </div>

      <div className="responsible-list">
        {responsible.items.map((item, index) => (
          <span key={item}>
            <i>
              {String(index + 1).padStart(2, "0")}
            </i>

            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
