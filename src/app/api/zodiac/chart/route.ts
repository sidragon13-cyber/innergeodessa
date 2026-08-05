import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import {
  BirthChartCalculationError,
  calculateBirthChart,
  type BirthDataInput,
  type ZodiacChartApiResponse,
} from "@/data/zodiac";

export const runtime = "nodejs";

export async function POST(
  request: Request,
): Promise<
  NextResponse<ZodiacChartApiResponse>
> {
  try {
    const body: unknown =
      await request.json();

    if (!isBirthDataInput(body)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "The birth-chart request body is invalid.",
        },
        {
          status: 400,
        },
      );
    }

    const result =
      calculateBirthChart(body);

    return NextResponse.json(
      {
        ok: true,
        chartId: randomUUID(),
        result,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (
      error instanceof
        BirthChartCalculationError
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "The supplied birth information could not produce a complete natal chart.",
          issues: error.issues,
        },
        {
          status: 400,
        },
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "The request body must contain valid JSON.",
        },
        {
          status: 400,
        },
      );
    }

    console.error(
      "Zodiac chart calculation failed:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "The birth chart could not be calculated.",
      },
      {
        status: 500,
      },
    );
  }
}

function isBirthDataInput(
  value: unknown,
): value is BirthDataInput {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isRecord(value.date) &&
    (
      value.time === null ||
      isRecord(value.time)
    ) &&
    (
      value.location === null ||
      isRecord(value.location)
    ) &&
    (
      value.timeZone === null ||
      typeof value.timeZone ===
        "string"
    ) &&
    (
      value.locale === "en" ||
      value.locale === "zh"
    )
  );
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
