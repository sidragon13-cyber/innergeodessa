"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutPlatform() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const platform = dictionary.platform;

  return (
    <section
      className="platform-section"
      id="platform"
    >
      <div className="shell">
        <div className="about-section-heading">
          <div>
            <p className="eyebrow">
              {platform.eyebrow}
            </p>

            <h2>
              {platform.title}
            </h2>
          </div>

          <p>
            {platform.description}
          </p>
        </div>

        <div className="platform-grid">
          {platform.parts.map((part) => (
            <article
              className="platform-card"
              key={part.code}
            >
              <div>
                <span
                  className="platform-code"
                  aria-hidden="true"
                >
                  {part.code}
                </span>

                <p>
                  {part.available
                    ? platform.currentAreaLabel
                    : platform.futureAreaLabel}
                </p>
              </div>

              <h3>
                {part.title}
              </h3>

              <p>
                {part.description}
              </p>

              <div className="platform-status">
                <span>
                  {part.status}
                </span>

                {part.href ? (
                  <a
                    href={part.href}
                    aria-label={`${platform.exploreLabel} ${part.title}`}
                  >
                    ↗
                  </a>
                ) : (
                  <i aria-hidden="true">—</i>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
