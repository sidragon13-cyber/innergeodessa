"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutPurpose() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const purpose = dictionary.purpose;

  return (
    <section className="about-purpose shell">
      <div>
        <p className="eyebrow">
          {purpose.eyebrow}
        </p>

        <h2>
          {purpose.title}
        </h2>
      </div>

      <div className="about-purpose-copy">
        {purpose.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
