"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loadStoredOrRemoteZodiacChart,
  type AstrologyResultContract,
  type ZodiacPosition,
} from "@/data/zodiac";

import {
  useLocale,
} from "@/components/locale";
import {
  ResultHeader,
  ResultNavigation,
  ResultShell,
  ResultState,
} from "@/components/result";
import {
  getZodiacResultDictionary,
  type ZodiacResultDictionary,
} from "@/data/i18n";

type ResultStatus =
  | "loading"
  | "ready"
  | "error";

type ResultError =
  | "missingChartId"
  | "missingStoredChart";

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
  dateLocale: "en" | "zh-CN",
  unavailable: string,
): string {
  if (!value) {
    return unavailable;
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
    dateLocale,
    {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "UTC",
    },
  ).format(date);
}

function PositionCard({
  item,
  dictionary,
}: {
  item: DisplayPosition;
  dictionary: ZodiacResultDictionary;
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
            dictionary.signNames[
              item.position.sign
            ]
          }
        </p>

        <p className="mt-2 text-base font-medium text-[#58645d]">
          {formatPosition(
            item.position,
          )}
          {item.retrograde
            ? ` · ${dictionary.positionCard.retrograde}`
            : ""}
        </p>

        <p className="mt-2 text-xs text-[#7a847e]">
          {dictionary.positionCard.absoluteLongitude}:{" "}
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
  const { locale } = useLocale();
  const dictionary =
    getZodiacResultDictionary(locale);

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
    resultError,
    setResultError,
  ] = useState<ResultError | null>(null);

  useEffect(() => {
    if (!chartId) {
      setResultError("missingChartId");
      setStatus("error");
      return;
    }

    let active = true;

    async function loadChart(): Promise<void> {
      setStatus("loading");

      try {
        const loadedResult =
          await loadStoredOrRemoteZodiacChart(
            chartId,
          );

        if (!active) {
          return;
        }

        setResultError(null);
        setResult(loadedResult);
        setStatus("ready");
      } catch {
        if (!active) {
          return;
        }

        setResult(null);
        setResultError(
          "missingStoredChart",
        );
        setStatus("error");
      }
    }

    void loadChart();

    return () => {
      active = false;
    };
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
          ...dictionary.positions.sun,
          position:
            result.planets.sun
              .zodiac,
          retrograde:
            result.planets.sun
              .retrograde,
        },
        {
          id: "moon",
          ...dictionary.positions.moon,
          position:
            result.planets.moon
              .zodiac,
          retrograde:
            result.planets.moon
              .retrograde,
        },
        {
          id: "ascendant",
          ...dictionary.positions.ascendant,
          position:
            result.angles
              .ascendant.zodiac,
        },
      ];
    }, [dictionary.positions, result]);

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
          ...dictionary.positions.mercury,
          position:
            result.planets.mercury
              .zodiac,
          retrograde:
            result.planets.mercury
              .retrograde,
        },
        {
          id: "venus",
          ...dictionary.positions.venus,
          position:
            result.planets.venus
              .zodiac,
          retrograde:
            result.planets.venus
              .retrograde,
        },
        {
          id: "mars",
          ...dictionary.positions.mars,
          position:
            result.planets.mars
              .zodiac,
          retrograde:
            result.planets.mars
              .retrograde,
        },
      ];
    }, [dictionary.positions, result]);

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
          ...dictionary.positions.ascendant,
          position:
            result.angles
              .ascendant.zodiac,
        },
        {
          id: "descendant",
          ...dictionary.positions.descendant,
          position:
            result.angles
              .descendant.zodiac,
        },
        {
          id: "midheaven",
          ...dictionary.positions.midheaven,
          position:
            result.angles
              .midheaven.zodiac,
        },
        {
          id: "imum-coeli",
          ...dictionary.positions.imumCoeli,
          position:
            result.angles
              .imumCoeli.zodiac,
        },
      ];
    }, [dictionary.positions, result]);

  if (status === "loading") {
    return (
      <ResultState
        eyebrow={dictionary.state.birthChartProfile}
        title={dictionary.state.preparingTitle}
        message={dictionary.state.preparingMessage}
      />
    );
  }

  if (
    status === "error" ||
    !result
  ) {
    return (
      <ResultState
        eyebrow={dictionary.state.unavailableEyebrow}
        title={dictionary.state.unavailableTitle}
        message={
          resultError
            ? dictionary.state[resultError]
            : dictionary.state.fallbackUnavailable
        }
        actions={[
          {
            href: "/zodiac/test",
            label: dictionary.state.generateNewChart,
          },
        ]}
      />
    );
  }

  return (
    <ResultShell>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/zodiac"
            className="text-sm font-semibold text-[#68756d]"
          >
            ← {dictionary.navigation.zodiacIdentity}
          </Link>

          <Link
            href="/zodiac/test"
            className="rounded-full border border-[#b9b2a5] bg-white px-5 py-2.5 text-sm font-semibold"
          >
            {dictionary.navigation.createAnotherChart}
          </Link>
        </div>

        <ResultHeader
          eyebrow={dictionary.header.eyebrow}
          className="mt-12 border-0 bg-[#17231d] px-7 py-10 text-white sm:px-10 sm:py-14"
          title={
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
              {
                dictionary.signNames[
                  result.planets.sun
                    .zodiac.sign
                ]
              }
              {dictionary.header.title.sun}
              {dictionary.header.title.separator}
              {
                dictionary.signNames[
                  result.planets.moon
                    .zodiac.sign
                ]
              }
              {dictionary.header.title.moon}
              {dictionary.header.title.separator}
              {
                dictionary.signNames[
                  result.angles
                    .ascendant.zodiac
                    .sign
                ]
              }
              {dictionary.header.title.rising}
            </h1>
          }
          description={
            <p className="text-[#d8dfdb]">
              {dictionary.header.description}
            </p>
          }
          badges={
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 px-4 py-2 text-sm">
                {dictionary.header.badges.sun}:{" "}
                {
                  dictionary.signNames[
                    result.planets.sun
                      .zodiac.sign
                  ]
                }
              </span>

              <span className="bg-white/10 px-4 py-2 text-sm">
                {dictionary.header.badges.moon}:{" "}
                {
                  dictionary.signNames[
                    result.planets.moon
                      .zodiac.sign
                  ]
                }
              </span>

              <span className="bg-white/10 px-4 py-2 text-sm">
                {dictionary.header.badges.rising}:{" "}
                {
                  dictionary.signNames[
                    result.angles
                      .ascendant.zodiac
                      .sign
                  ]
                }
              </span>
            </div>
          }
        />

        <section className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            {dictionary.sections.coreIdentity}
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            {dictionary.sections.coreTitle}
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-[#58645d]">
            {dictionary.sections.coreDescription}
          </p>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {corePositions.map(
              (item) => (
                <PositionCard
                  key={item.id}
                  item={item}
                  dictionary={dictionary}
                />
              ),
            )}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            {dictionary.sections.personalPlanets}
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            {dictionary.sections.personalPlanetsTitle}
          </h2>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {personalPlanets.map(
              (item) => (
                <PositionCard
                  key={item.id}
                  item={item}
                  dictionary={dictionary}
                />
              ),
            )}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            {dictionary.sections.chartAngles}
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            {dictionary.sections.chartAnglesTitle}
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {chartAngles.map(
              (item) => (
                <PositionCard
                  key={item.id}
                  item={item}
                  dictionary={dictionary}
                />
              ),
            )}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-[#ddd8cd] bg-white p-7 shadow-sm sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a4f43]">
            {dictionary.calculation.title}
          </p>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a847e]">
                {dictionary.calculation.localBirthTime}
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
                {dictionary.calculation.utcTime}
              </p>

              <p className="mt-2 font-semibold">
                {formatDateTime(
                  result.input
                    .utcDateTime,
                  dictionary.calculation.dateLocale,
                  dictionary.calculation.unavailable,
                )}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a847e]">
                {dictionary.calculation.timeZone}
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
                {dictionary.calculation.coordinates}
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
                {dictionary.calculation.timePrecision}
              </p>

              <p className="mt-2 font-semibold capitalize">
                {
                  dictionary.calculation.precision[
                    result.input.timePrecision
                  ]
                }
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a847e]">
                {dictionary.calculation.calculationEngine}
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
                {dictionary.calculation.limitations}
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
            {dictionary.report.eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            {dictionary.report.title}
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-[#58645d]">
            {dictionary.report.description}
          </p>

          <Link
            href={`/zodiac/report/${chartId}`}
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#17231d] px-7 py-3 font-semibold text-white"
          >
            {dictionary.report.action}
          </Link>
        </section>

        <ResultNavigation
          primary={{
            href: "/zodiac/test",
            label: dictionary.navigation.createAnotherChart,
          }}
          secondary={{
            href: "/zodiac",
            label: dictionary.navigation.backToZodiacIdentity,
          }}
        />

        <footer className="mt-10 border-t border-[#d8d2c6] pt-8 text-sm leading-6 text-[#68756d]">
          {dictionary.responsibility}
        </footer>
    </ResultShell>
  );
}
