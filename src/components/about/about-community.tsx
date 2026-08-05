"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutCommunity() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const community = dictionary.community;

  return (
    <section className="about-community">
      <div className="about-community-inner shell">
        <div>
          <p className="eyebrow">
            {community.eyebrow}
          </p>

          <h2>
            {community.title}
          </h2>
        </div>

        <div>
          {community.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          ))}

          <p className="community-status">
            {community.status}
          </p>
        </div>
      </div>
    </section>
  );
}
