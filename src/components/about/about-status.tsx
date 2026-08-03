"use client";

import {
  useLocale,
} from "@/components/locale";
import {
  getAboutDictionary,
} from "@/data/i18n";

export function AboutStatus() {
  const { locale } = useLocale();
  const dictionary = getAboutDictionary(locale);
  const status = dictionary.status;

  return (
    <section className="status-section">
      <div className="status-inner shell">
        <div className="status-heading">
          <p className="eyebrow">
            {status.eyebrow}
          </p>

          <h2>
            {status.title}
          </h2>

          <p>
            {status.description}
          </p>
        </div>

        <div className="status-columns">
          <div>
            <h3>
              {status.availableTitle}
            </h3>

            <ul>
              {status.availableItems.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>
              {status.unavailableTitle}
            </h3>

            <ul>
              {status.unavailableItems.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
