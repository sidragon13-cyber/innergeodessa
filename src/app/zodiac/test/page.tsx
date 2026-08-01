"use client";

import Link from "next/link";
import {
  useRouter,
} from "next/navigation";
import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import {
  getZodiacLocationOption,
  writeStoredZodiacChart,
  ZODIAC_LOCATION_OPTIONS,
  type BirthDataInput,
  type ZodiacChartApiResponse,
} from "@/data/zodiac";

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

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ZodiacTestPage() {
  const router = useRouter();

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

  const [
    locationId,
    setLocationId,
  ] = useState(
    "johannesburg-za",
  );

  const [locale, setLocale] =
    useState<"en" | "zh">("en");

  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const selectedLocation =
    useMemo(
      () =>
        getZodiacLocationOption(
          locationId,
        ),
      [locationId],
    );

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
        "Please select a valid birth city.",
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

      location:
        selectedLocation.location,

      timeZone:
        selectedLocation.timeZone,

      locale,
    };

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

        throw new Error(
          `${
            !data.ok
              ? data.error
              : "The chart could not be generated."
          }${details}`,
        );
      }

      writeStoredZodiacChart(
        data.chartId,
        data.result,
      );

      router.push(
        `/zodiac/result/${data.chartId}`,
      );
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The chart could not be generated.",
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
          ← Back to Zodiac Identity
        </Link>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8a4f43]">
            Birth Chart Profile
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Enter your birth information
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#58645d]">
            Your date, local birth
            time, city, coordinates,
            and historical time zone
            are used to calculate your
            Sun, Moon, personal planets,
            Ascendant, and Midheaven.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[2rem] border border-[#ddd8cd] bg-white p-6 shadow-sm sm:p-9"
        >
          <section>
            <h2 className="text-xl font-semibold">
              Birth date
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  Year
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
                  Month
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
                  {monthOptions.map(
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
                  Day
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
              Birth time
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  Hour
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
                  Minute
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
                Time accuracy
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
                  Exact time
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
                  Approximate time
                </label>
              </div>
            </fieldset>
          </section>

          <section className="mt-9 border-t border-[#ece7dc] pt-9">
            <h2 className="text-xl font-semibold">
              Birth city
            </h2>

            <label className="mt-5 grid gap-2">
              <span className="text-sm font-semibold">
                City
              </span>

              <select
                value={locationId}
                onChange={(event) =>
                  setLocationId(
                    event.target.value,
                  )
                }
                className="rounded-xl border border-[#cfc9bd] bg-white px-4 py-3"
              >
                {ZODIAC_LOCATION_OPTIONS.map(
                  (option) => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.label}
                    </option>
                  ),
                )}
              </select>
            </label>

            {selectedLocation ? (
              <div className="mt-4 rounded-2xl bg-[#f7f4ee] p-4 text-sm leading-6 text-[#58645d]">
                <p>
                  Time zone:{" "}
                  {
                    selectedLocation.timeZone
                  }
                </p>
                <p>
                  Coordinates:{" "}
                  {
                    selectedLocation
                      .location.latitude
                  }
                  ,{" "}
                  {
                    selectedLocation
                      .location.longitude
                  }
                </p>
              </div>
            ) : null}
          </section>

          <section className="mt-9 border-t border-[#ece7dc] pt-9">
            <h2 className="text-xl font-semibold">
              Report language
            </h2>

            <div className="mt-4 flex flex-wrap gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="locale"
                  value="en"
                  checked={locale === "en"}
                  onChange={() =>
                    setLocale("en")
                  }
                />
                English
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="locale"
                  value="zh"
                  checked={locale === "zh"}
                  onChange={() =>
                    setLocale("zh")
                  }
                />
                中文
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
                ? "Calculating…"
                : "Generate Birth Chart"}
            </button>

            <p className="max-w-xl text-sm leading-6 text-[#68756d]">
              Astrology content is
              intended for reflection,
              culture, and entertainment.
              It is not scientific,
              medical, legal, financial,
              or psychological advice.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
