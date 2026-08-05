"use client";

import Link from "next/link";
import {
  useRouter,
} from "next/navigation";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocale,
} from "@/components/locale";
import {
  getZodiacTestDictionary,
} from "@/data/i18n";
import {
  writeStoredZodiacChart,
  type BirthDataInput,
  type ZodiacChartApiResponse,
} from "@/data/zodiac";
import type {
  SupportedLocale,
} from "@/data/shared";
import {
  searchLocations,
  STATIC_LOCATION_RECORDS,
  type LocationRecord,
} from "@/shared/location";

type FormStatus =
  | "idle"
  | "submitting"
  | "error";

const currentYear =
  new Date().getFullYear();

function createYearOptions(): number[] {
  const years: number[] = [];

  for (
    let year = currentYear;
    year >= 1900;
    year -= 1
  ) {
    years.push(year);
  }

  return years;
}

const yearOptions =
  createYearOptions();

export default function ZodiacTestPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const dictionary =
    getZodiacTestDictionary(locale);

  const [year, setYear] =
    useState("1990");

  const [month, setMonth] =
    useState("1");

  const [day, setDay] =
    useState("1");

  const [hour, setHour] =
    useState("12");

  const [minute, setMinute] =
    useState("0");

  const [
    timePrecision,
    setTimePrecision,
  ] = useState<
    "exact" | "approximate"
  >("exact");

  const [locationQuery, setLocationQuery] = useState(
    STATIC_LOCATION_RECORDS[0]?.displayName ?? "",
  );

  const [selectedLocation, setSelectedLocation] =
    useState<LocationRecord | null>(
      STATIC_LOCATION_RECORDS[0] ?? null,
    );

  const [locationResults, setLocationResults] =
    useState<readonly LocationRecord[]>([]);

  const [isLocationSearchOpen, setIsLocationSearchOpen] =
    useState(false);

  const [reportLocale, setReportLocale] =
    useState<SupportedLocale>(locale);

  const reportLocaleWasChanged =
    useRef(false);

  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  useEffect(() => {
    if (!reportLocaleWasChanged.current) {
      setReportLocale(locale);
    }
  }, [locale]);

  useEffect(() => {
    let active = true;

    if (!locationQuery.trim()) {
      queueMicrotask(() => {
        if (active) {
          setLocationResults([]);
        }
      });

      return () => {
        active = false;
      };
    }

    void searchLocations(locationQuery).then((results) => {
      if (active) {
        setLocationResults(results.slice(0, 8));
      }
    });

    return () => {
      active = false;
    };
  }, [locationQuery]);

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    if (!selectedLocation) {
      setStatus("error");
      setErrorMessage(
        dictionary.errors.invalidBirthCity,
      );
      return;
    }

    const input: BirthDataInput = {
      date: {
        year: Number(year),
        month: Number(month),
        day: Number(day),
      },

      time: {
        hour: Number(hour),
        minute: Number(minute),
        second: 0,
        precision:
          timePrecision,
      },

      location: {
        displayName: selectedLocation.displayName,
        city: selectedLocation.city,
        region: selectedLocation.region,
        countryCode: selectedLocation.countryCode,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      },

      timeZone:
        selectedLocation.timeZone,

      locale: reportLocale,
    };

    let apiErrorMessage: string | null = null;

    try {
      const response = await fetch(
        "/api/zodiac/chart",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(input),
        },
      );

      const data:
        ZodiacChartApiResponse =
        await response.json();

      if (
        !response.ok ||
        !data.ok
      ) {
        const details =
          !data.ok &&
          data.issues?.length
            ? ` ${data.issues
                .map(
                  (issue) =>
                    issue.message,
                )
                .join(" ")}`
            : "";

        apiErrorMessage = `${
            !data.ok
              ? data.error
              : dictionary.errors.chartGenerationFailed
          }${details}`;

        throw new Error(apiErrorMessage);
      }

      writeStoredZodiacChart(
        data.chartId,
        data.result,
      );

      router.push(
        `/zodiac/result/${data.chartId}`,
      );
    } catch {
      setStatus("error");
      setErrorMessage(
        apiErrorMessage ??
          dictionary.errors.chartGenerationFailed,
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-6 py-14 text-[#17231d]">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/zodiac"
          className="text-sm font-semibold text-[#68756d]"
        >
          ← {dictionary.backToZodiac}
        </Link>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8a4f43]">
            {dictionary.eyebrow}
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            {dictionary.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#58645d]">
            {dictionary.description}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[2rem] border border-[#ddd8cd] bg-white p-6 shadow-sm sm:p-9"
        >
          <section>
            <h2 className="text-xl font-semibold">
              {dictionary.birthDate}
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  {dictionary.year}
                </span>
                <select
                  value={year}
                  onChange={(event) =>
                    setYear(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-[#cfc9bd] bg-white px-4 py-3"
                >
                  {yearOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  {dictionary.month}
                </span>
                <select
                  value={month}
                  onChange={(event) =>
                    setMonth(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-[#cfc9bd] bg-white px-4 py-3"
                >
                  {dictionary.months.map(
                    (
                      option,
                      index,
                    ) => (
                      <option
                        key={option}
                        value={index + 1}
                      >
                        {option}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  {dictionary.day}
                </span>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(event) =>
                    setDay(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-[#cfc9bd] bg-white px-4 py-3"
                />
              </label>
            </div>
          </section>

          <section className="mt-9 border-t border-[#ece7dc] pt-9">
            <h2 className="text-xl font-semibold">
              {dictionary.birthTime}
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  {dictionary.hour}
                </span>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hour}
                  onChange={(event) =>
                    setHour(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-[#cfc9bd] bg-white px-4 py-3"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  {dictionary.minute}
                </span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minute}
                  onChange={(event) =>
                    setMinute(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-[#cfc9bd] bg-white px-4 py-3"
                />
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className="text-sm font-semibold">
                {dictionary.timeAccuracy}
              </legend>

              <div className="mt-3 flex flex-wrap gap-5">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="precision"
                    value="exact"
                    checked={
                      timePrecision ===
                      "exact"
                    }
                    onChange={() =>
                      setTimePrecision(
                        "exact",
                      )
                    }
                  />
                  {dictionary.exactTime}
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="precision"
                    value="approximate"
                    checked={
                      timePrecision ===
                      "approximate"
                    }
                    onChange={() =>
                      setTimePrecision(
                        "approximate",
                      )
                    }
                  />
                  {dictionary.approximateTime}
                </label>
              </div>
            </fieldset>
          </section>

          <section className="mt-9 border-t border-[#ece7dc] pt-9">
            <h2 className="text-xl font-semibold">
              {dictionary.birthCity}
            </h2>

            <div className="relative mt-5 grid gap-2">
              <label
                htmlFor="birth-city-search"
                className="text-sm font-semibold"
              >
                {dictionary.city}
              </label>

              <input
                id="birth-city-search"
                type="search"
                value={locationQuery}
                placeholder={dictionary.citySearchPlaceholder}
                autoComplete="off"
                role="combobox"
                aria-expanded={isLocationSearchOpen}
                aria-controls="location-search-results"
                aria-autocomplete="list"
                onFocus={() => setIsLocationSearchOpen(true)}
                onChange={(event) => {
                  setLocationQuery(event.target.value);
                  setSelectedLocation(null);
                  setIsLocationSearchOpen(true);
                }}
                className="rounded-xl border border-[#cfc9bd] bg-white px-4 py-3"
              />

              {isLocationSearchOpen && locationQuery.trim() ? (
                <div
                  id="location-search-results"
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-10 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-[#cfc9bd] bg-white p-2 shadow-lg"
                >
                  {locationResults.length > 0 ? (
                    locationResults.map((location) => (
                      <button
                        key={location.id}
                        type="button"
                        role="option"
                        aria-selected={selectedLocation?.id === location.id}
                        onClick={() => {
                          setSelectedLocation(location);
                          setLocationQuery(location.displayName);
                          setIsLocationSearchOpen(false);
                        }}
                        className="block w-full rounded-xl px-3 py-3 text-left hover:bg-[#f7f4ee] focus:bg-[#f7f4ee]"
                      >
                        <span className="block font-semibold">
                          {location.displayName}
                        </span>
                        <span className="mt-1 block text-xs text-[#68756d]">
                          {location.region} · {location.timeZone}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-4 text-sm text-[#68756d]">
                      {dictionary.noMatchingCities}
                    </p>
                  )}
                </div>
              ) : null}
            </div>

            {selectedLocation ? (
              <div className="mt-4 rounded-2xl bg-[#f7f4ee] p-4 text-sm leading-6 text-[#58645d]">
                <p>
                  {dictionary.timeZone}:{" "}
                  {
                    selectedLocation.timeZone
                  }
                </p>
                <p>
                  {dictionary.coordinates}:{" "}
                  {
                    selectedLocation.latitude
                  }
                  ,{" "}
                  {
                    selectedLocation.longitude
                  }
                </p>
              </div>
            ) : null}
          </section>

          <section className="mt-9 border-t border-[#ece7dc] pt-9">
            <h2 className="text-xl font-semibold">
              {dictionary.reportLanguage}
            </h2>

            <div className="mt-4 flex flex-wrap gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reportLocale"
                  value="en"
                  checked={reportLocale === "en"}
                  onChange={() => {
                    reportLocaleWasChanged.current = true;
                    setReportLocale("en");
                  }}
                />
                {dictionary.english}
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reportLocale"
                  value="zh"
                  checked={reportLocale === "zh"}
                  onChange={() => {
                    reportLocaleWasChanged.current = true;
                    setReportLocale("zh");
                  }}
                />
                {dictionary.chinese}
              </label>
            </div>
          </section>

          {status === "error" ? (
            <div className="mt-7 rounded-2xl border border-[#d6aaa0] bg-[#fff5f2] p-4 text-sm leading-6 text-[#7f3e33]">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={
                status ===
                "submitting"
              }
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#17231d] px-7 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting"
                ? dictionary.calculating
                : dictionary.generateBirthChart}
            </button>

            <p className="max-w-xl text-sm leading-6 text-[#68756d]">
              {dictionary.disclaimer}
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
