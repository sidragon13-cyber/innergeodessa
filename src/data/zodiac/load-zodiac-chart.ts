import type {
  AstrologyResultContract,
} from "./result-contract";
import {
  isAstrologyResultContract,
  readStoredZodiacChart,
  writeStoredZodiacChart,
} from "./storage";

type ZodiacChartDetailResponse = {
  resourceId: string;
  module: "zodiac";
  result: AstrologyResultContract;
  savedAt: string;
};

export class ZodiacChartLoadError extends Error {
  readonly status: number;

  constructor(
    message: string,
    status: number,
  ) {
    super(message);
    this.name = "ZodiacChartLoadError";
    this.status = status;
  }
}

function isZodiacChartDetailResponse(
  value: unknown,
  expectedChartId: string,
): value is ZodiacChartDetailResponse {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const record =
    value as Record<string, unknown>;

  return (
    record.resourceId === expectedChartId &&
    record.module === "zodiac" &&
    typeof record.savedAt === "string" &&
    isAstrologyResultContract(
      record.result,
    )
  );
}

export async function loadStoredOrRemoteZodiacChart(
  chartId: string,
): Promise<AstrologyResultContract> {
  const storedResult =
    readStoredZodiacChart(chartId);

  if (storedResult) {
    return storedResult;
  }

  let response: Response;

  try {
    response = await fetch(
      `/api/account/zodiac-charts/${encodeURIComponent(
        chartId,
      )}`,
      {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      },
    );
  } catch {
    throw new ZodiacChartLoadError(
      "The saved zodiac chart service is unavailable.",
      503,
    );
  }

  if (!response.ok) {
    throw new ZodiacChartLoadError(
      response.status === 401
        ? "Authentication is required."
        : response.status === 404
          ? "The saved zodiac chart was not found."
          : "The saved zodiac chart could not be loaded.",
      response.status,
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new ZodiacChartLoadError(
      "The saved zodiac chart response is invalid.",
      502,
    );
  }

  if (
    !isZodiacChartDetailResponse(
      payload,
      chartId,
    )
  ) {
    throw new ZodiacChartLoadError(
      "The saved zodiac chart contract is invalid.",
      502,
    );
  }

  writeStoredZodiacChart(
    chartId,
    payload.result,
  );

  return payload.result;
}
