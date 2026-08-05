import type {
  AstrologyResultContract,
  ZodiacChartApiResponse,
  ZodiacChartErrorResponse,
  ZodiacChartSuccessResponse,
} from "../src/data/zodiac";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const placeholderResult =
  {} as AstrologyResultContract;

const success:
  ZodiacChartSuccessResponse = {
    ok: true,
    chartId: "chart-test-id",
    result: placeholderResult,
  };

const failure:
  ZodiacChartErrorResponse = {
    ok: false,
    error: "Invalid input.",
    issues: [
      {
        path: "timeZone",
        message:
          "A time zone is required.",
      },
    ],
  };

const responses:
  ZodiacChartApiResponse[] = [
    success,
    failure,
  ];

assert(
  responses[0]?.ok === true,
  "Success response must use ok: true.",
);

assert(
  responses[1]?.ok === false,
  "Error response must use ok: false.",
);

assert(
  success.chartId.length > 0,
  "Success response requires a chart ID.",
);

assert(
  failure.issues?.[0]?.path ===
    "timeZone",
  "Error response must preserve validation issues.",
);

console.log(
  "Zodiac web contract validation passed.",
);
