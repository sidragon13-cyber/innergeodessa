"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  AstrologyResultContract,
  ZodiacPosition,
  ZodiacSign,
} from "@/data/zodiac";

type ResultStatus =
  | "loading"
  | "ready"
  | "error";

type DisplayPosition = {
  id: string;
  symbol: string;
  label: string;
  category: string;
  meaning: string;
  keywords: readonly string[];
  position: ZodiacPosition;
  retrograde?: boolean;
};

const SIGN_NAMES:
  Readonly<Record<ZodiacSign, string>> = {
    aries: "Aries",
    taurus: "Taurus",
    gemini: "Gemini",
    cancer: "Cancer",
    leo: "Leo",
    virgo: "Virgo",
    libra: "Libra",
    scorpio: "Scorpio",
    sagittarius: "Sagittarius",
    capricorn: "Capricorn",
    aquarius: "Aquarius",
    pisces: "Pisces",
  };

const POSITION_DETAILS = {
  sun: {
    symbol: "☉",
    label: "Sun",
    category: "Core Identity",
    meaning:
      "The Sun represents identity, purpose, vitality, and the direction through which a person develops a stronger sense of self.",
    keywords: [
      "Identity",
      "Purpose",
      "Vitality",
      "Self-expression",
    ],
  },

  moon: {
    symbol: "☽",
    label: "Moon",
    category: "Inner World",
    meaning:
      "The Moon represents emotional patterns, instinctive responses, security needs, memory, and the private inner world.",
    keywords: [
      "Emotion",
      "Instinct",
      "Security",
      "Inner needs",
    ],
  },

  mercury: {
    symbol: "☿",
    label: "Mercury",
    category: "Personal Planet",
    meaning:
      "Mercury represents thinking, communication, learning, perception, reasoning, and the exchange of information.",
    keywords: [
      "Thinking",
      "Communication",
      "Learning",
      "Perception",
    ],
  },

  venus: {
    symbol: "♀",
    label: "Venus",
    category: "Personal Planet",
    meaning:
      "Venus represents attraction, values, relationships, aesthetics, pleasure, and the way harmony is created.",
    keywords: [
      "Values",
      "Relationships",
      "Attraction",
      "Harmony",
    ],
  },

  mars: {
    symbol: "♂",
    label: "Mars",
    category: "Personal Planet",
    meaning:
      "Mars represents action, drive, courage, assertion, effort, conflict response, and the pursuit of desired outcomes.",
    keywords: [
      "Action",
      "Drive",
      "Courage",
      "Assertion",
    ],
  },

  ascendant: {
    symbol: "ASC",
    label: "Ascendant",
    category: "Chart Angle",
    meaning:
      "The Ascendant is the zodiac point rising on the eastern horizon. It relates to approach, presentation, orientation, and first engagement with life.",
    keywords: [
      "Approach",
      "Presentation",
      "Orientation",
      "First impression",
    ],
  },

  descendant: {
    symbol: "DSC",
    label: "Descendant",
    category: "Chart Angle",
    meaning:
      "The Descendant is opposite the Ascendant. It relates symbolically to partnership, encounter, projection, and qualities recognised through others.",
    keywords: [
      "Partnership",
      "Encounter",
      "Others",
      "Projection",
    ],
  },

  midheaven: {
    symbol: "MC",
    label: "Midheaven",
    category: "Chart Angle",
    meaning:
      "The Midheaven is the upper meridian point of the chart. It relates symbolically to public direction, contribution, visibility, and long-term development.",
    keywords: [
      "Direction",
      "Contribution",
      "Visibility",
      "Public role",
    ],
  },

  imumCoeli: {
    symbol: "IC",
    label: "Imum Coeli",
    category: "Chart Angle",
    meaning:
      "The Imum Coeli is opposite the Midheaven. It relates symbolically to foundations, private life, belonging, roots, and the inner base of development.",
    keywords: [
      "Foundations",
      "Roots",
      "Belonging",
      "Private life",
    ],
  },
} as const;

function storageKey(
  chartId: string,
): string {
  return `innergeodessa-zodiac-result-${chartId}`;
}

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isAstrologyResultContract(
  value: unknown,
): value is AstrologyResultContract {
  if (
    !isRecord(value) ||
    value.schemaVersion !== "1.0.0" ||
    value.module !== "zodiac" ||
    value.calculationType !==
      "natal-chart" ||
    !isRecord(value.input) ||
    !isRecord(value.planets) ||
    !isRecord(value.angles) ||
    !isRecord(value.engine)
  ) {
    return false;
  }

  const planets = value.planets;
  const angles = value.angles;

  return (
    isRecord(planets.sun) &&
    isRecord(planets.moon) &&
    isRecord(planets.mercury) &&
    isRecord(planets.venus) &&
    isRecord(planets.mars) &&
    isRecord(angles.ascendant) &&
    isRecord(angles.descendant) &&
    isRecord(angles.midheaven) &&
    isRecord(angles.imumCoeli)
  );
}

function readStoredResult(
  chartId: string,
): AstrologyResultContract | null {
  try {
    const key = storageKey(chartId);

    const raw =
      window.sessionStorage.getItem(key) ??
      window.localStorage.getItem(key);

    if (!raw) {
      return null;
    }

    const parsed: unknown =
      JSON.parse(raw);

    if (
      !isAstrologyResultContract(
        parsed,
      )
    ) {
      window.sessionStorage.removeItem(
        key,
      );

      window.localStorage.removeItem(
        key,
      );

      return null;
    }

    window.sessionStorage.setItem(
      key,
      raw,
    );

    return parsed;
  } catch {
    return null;
  }
}

function formatPosition(
  position: ZodiacPosition,
): string {
  return [
    `${position.degree}°`,
    `${position.minute}′`,
    `${position.second}″`,
  ].join(" ");
}

function formatDateTime(
  value: string | null,
): string {
  if (!value) {
    return "Unavailable";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "UTC",
    },
  ).format(date);
}

function PositionCard({
  item,
}: {
  item: DisplayPosition;
}) {
  return (
    <article className="rounded-[1.75rem] border border-[#ddd8cd] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            {item.category}
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-[#17231d]">
            {item.label}
          </h3>
        </div>

        <div className="flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#17231d] px-3 text-lg font-semibold text-white">
          {item.symbol}
        </div>
      </div>

      <div className="mt-7 rounded-2xl bg-[#f7f4ee] p-5">
        <p className="text-2xl font-semibold text-[#17231d]">
          {
            SIGN_NAMES[
              item.position.sign
            ]
          }
        </p>

        <p className="mt-2 text-base font-medium text-[#58645d]">
          {formatPosition(
            item.position,
          )}
          {item.retrograde
            ? " · Retrograde"
            : ""}
        </p>

        <p className="mt-2 text-xs text-[#7a847e]">
          Absolute longitude:{" "}
          {item.position.absoluteLongitude.toFixed(
            6,
          )}
          °
        </p>
      </div>

      <p className="mt-6 text-sm leading-7 text-[#58645d]">
        {item.meaning}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.keywords.map(
          (keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-[#d8d2c6] bg-[#fbfaf7] px-3 py-1 text-xs font-medium text-[#58645d]"
            >
              {keyword}
            </span>
          ),
        )}
      </div>
    </article>
  );
}

export default function ZodiacResultPage() {
  const params =
    useParams<{
      chartId: string;
    }>();

  const chartId =
    params.chartId;

  const [status, setStatus] =
    useState<ResultStatus>(
      "loading",
    );

  const [result, setResult] =
    useState<
      AstrologyResultContract | null
    >(null);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  useEffect(() => {
    if (!chartId) {
      setErrorMessage(
        "The birth chart ID is missing.",
      );

      setStatus("error");
      return;
    }

    const storedResult =
      readStoredResult(chartId);

    if (!storedResult) {
      setErrorMessage(
        "This chart is no longer available in this browser. Generate a new birth chart to continue.",
      );

      setStatus("error");
      return;
    }

    setResult(storedResult);
    setStatus("ready");
  }, [chartId]);

  const corePositions =
    useMemo<
      DisplayPosition[]
    >(() => {
      if (!result) {
        return [];
      }

      return [
        {
          id: "sun",
          ...POSITION_DETAILS.sun,
          position:
            result.planets.sun
              .zodiac,
          retrograde:
            result.planets.sun
              .retrograde,
        },
        {
          id: "moon",
          ...POSITION_DETAILS.moon,
          position:
            result.planets.moon
              .zodiac,
          retrograde:
            result.planets.moon
              .retrograde,
        },
        {
          id: "ascendant",
          ...POSITION_DETAILS.ascendant,
          position:
            result.angles
              .ascendant.zodiac,
        },
      ];
    }, [result]);

  const personalPlanets =
    useMemo<
      DisplayPosition[]
    >(() => {
      if (!result) {
        return [];
      }

      return [
        {
          id: "mercury",
          ...POSITION_DETAILS.mercury,
          position:
            result.planets.mercury
              .zodiac,
          retrograde:
            result.planets.mercury
              .retrograde,
        },
        {
          id: "venus",
          ...POSITION_DETAILS.venus,
          position:
            result.planets.venus
              .zodiac,
          retrograde:
            result.planets.venus
              .retrograde,
        },
        {
          id: "mars",
          ...POSITION_DETAILS.mars,
          position:
            result.planets.mars
              .zodiac,
          retrograde:
            result.planets.mars
              .retrograde,
        },
      ];
    }, [result]);

  const chartAngles =
    useMemo<
      DisplayPosition[]
    >(() => {
      if (!result) {
        return [];
      }

      return [
        {
          id: "ascendant",
          ...POSITION_DETAILS.ascendant,
          position:
            result.angles
              .ascendant.zodiac,
        },
        {
          id: "descendant",
          ...POSITION_DETAILS.descendant,
          position:
            result.angles
              .descendant.zodiac,
        },
        {
          id: "midheaven",
          ...POSITION_DETAILS.midheaven,
          position:
            result.angles
              .midheaven.zodiac,
        },
        {
          id: "imum-coeli",
          ...POSITION_DETAILS.imumCoeli,
          position:
            result.angles
              .imumCoeli.zodiac,
        },
      ];
    }, [result]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-[#f7f4ee] px-6 py-20 text-[#17231d]">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            Birth Chart Profile
          </p>

          <h1 className="mt-4 text-4xl font-semibold">
            Preparing your chart…
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#58645d]">
            Your planetary positions
            and chart angles are being
            loaded.
          </p>
        </div>
      </main>
    );
  }

  if (
    status === "error" ||
    !result
  ) {
    return (
      <main className="min-h-screen bg-[#f7f4ee] px-6 py-20 text-[#17231d]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#ddd8cd] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            Chart unavailable
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            We could not load this
            birth chart.
          </h1>

          <p className="mt-4 leading-7 text-[#58645d]">
            {errorMessage}
          </p>

          <Link
            href="/zodiac/test"
            className="mt-8 inline-flex rounded-full bg-[#17231d] px-6 py-3 font-semibold text-white"
          >
            Generate a new chart
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-6 py-14 text-[#17231d]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/zodiac"
            className="text-sm font-semibold text-[#68756d]"
          >
            ← Zodiac Identity
          </Link>

          <Link
            href="/zodiac/test"
            className="rounded-full border border-[#b9b2a5] bg-white px-5 py-2.5 text-sm font-semibold"
          >
            Create another chart
          </Link>
        </div>

        <header className="mt-12 rounded-[2.25rem] bg-[#17231d] px-7 py-10 text-white sm:px-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d9b7aa]">
            Your Birth Chart
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            {
              SIGN_NAMES[
                result.planets.sun
                  .zodiac.sign
              ]
            }{" "}
            Sun,{" "}
            {
              SIGN_NAMES[
                result.planets.moon
                  .zodiac.sign
              ]
            }{" "}
            Moon,{" "}
            {
              SIGN_NAMES[
                result.angles
                  .ascendant.zodiac
                  .sign
              ]
            }{" "}
            Rising
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#d8dfdb]">
            This page presents the
            astronomical positions used
            by the InnerGeodessa Zodiac
            system. Interpretive reports
            will build on these verified
            chart coordinates.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
              Sun:{" "}
              {
                SIGN_NAMES[
                  result.planets.sun
                    .zodiac.sign
                ]
              }
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
              Moon:{" "}
              {
                SIGN_NAMES[
                  result.planets.moon
                    .zodiac.sign
                ]
              }
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
              Rising:{" "}
              {
                SIGN_NAMES[
                  result.angles
                    .ascendant.zodiac
                    .sign
                ]
              }
            </span>
          </div>
        </header>

        <section className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            Core Identity
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Your central chart pattern
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-[#58645d]">
            The Sun, Moon, and Ascendant
            are often used as the first
            orientation points when
            reading a natal chart.
          </p>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {corePositions.map(
              (item) => (
                <PositionCard
                  key={item.id}
                  item={item}
                />
              ),
            )}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            Personal Planets
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Thinking, relating, and
            taking action
          </h2>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {personalPlanets.map(
              (item) => (
                <PositionCard
                  key={item.id}
                  item={item}
                />
              ),
            )}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            Chart Angles
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            The four structural axes
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {chartAngles.map(
              (item) => (
                <PositionCard
                  key={item.id}
                  item={item}
                />
              ),
            )}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-[#ddd8cd] bg-white p-7 shadow-sm sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            Calculation Details
          </p>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a847e]">
                Local birth time
              </p>

              <p className="mt-2 font-semibold">
                {
                  result.input
                    .localDateTime
                }
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a847e]">
                UTC time
              </p>

              <p className="mt-2 font-semibold">
                {formatDateTime(
                  result.input
                    .utcDateTime,
                )}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a847e]">
                Time zone
              </p>

              <p className="mt-2 font-semibold">
                {
                  result.input
                    .timeZone
                }
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a847e]">
                Coordinates
              </p>

              <p className="mt-2 font-semibold">
                {
                  result.input
                    .latitude
                }
                ,{" "}
                {
                  result.input
                    .longitude
                }
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a847e]">
                Time precision
              </p>

              <p className="mt-2 font-semibold capitalize">
                {
                  result.input
                    .timePrecision
                }
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a847e]">
                Calculation engine
              </p>

              <p className="mt-2 font-semibold">
                {result.engine.name}{" "}
                {result.engine.version}
              </p>
            </div>
          </div>

          {result.limitations.length >
          0 ? (
            <div className="mt-8 rounded-2xl border border-[#d8c7a8] bg-[#fffaf0] p-5">
              <p className="font-semibold">
                Calculation limitations
              </p>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#665d4e]">
                {result.limitations.map(
                  (limitation) => (
                    <li key={limitation}>
                      • {limitation}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="mt-16 rounded-[2rem] bg-[#e7ddd0] p-7 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            Next Stage
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Your detailed Zodiac report
            is the next layer.
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-[#58645d]">
            The professional report will
            combine these positions into
            structured sections covering
            identity, emotional patterns,
            communication, relationships,
            motivation, chart angles,
            strengths, challenges, and
            development themes.
          </p>
        </section>

        <footer className="mt-14 border-t border-[#d8d2c6] pt-8 text-sm leading-6 text-[#68756d]">
          Astrology content is intended
          for reflection, culture, and
          entertainment. It is not
          scientific, medical, legal,
          financial, or psychological
          advice.
        </footer>
      </div>
    </main>
  );
}
