"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutProfile() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const profile = dictionary.profile;

  return (
    <section className="integrated-profile shell">
      <div className="integrated-profile-copy">
        <p className="eyebrow">
          {profile.eyebrow}
        </p>

        <h2>
          {profile.title}
        </h2>

        <p>
          {profile.description}
        </p>

        <p className="future-status">
          {profile.status}
        </p>
      </div>

      <div className="profile-layer-list">
        {profile.layers.map((layer, index) => (
          <span key={layer}>
            <i>
              {String(index + 1).padStart(2, "0")}
            </i>

            {layer}
          </span>
        ))}
      </div>
    </section>
  );
}
