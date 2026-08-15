import {
  isPersonalityResultContract,
} from "@/data/assessment/scoring/personality/schema";

import {
  createReportDimensions,
} from "@/data/report/generator/from-assessment-result";

import {
  buildFixedPersonalityReportPayload,
} from "@/data/report/fixed-assets/fixed-report-payload";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ??
  "http://127.0.0.1:8000";

const NO_STORE_HEADERS = {
  "Cache-Control":
    "private, no-store, max-age=0",
} as const;

type FixedReportApiErrorCode =
  | "invalid-request"
  | "authentication-required"
  | "report-locked"
  | "resource-not-found"
  | "access-error"
  | "result-error"
  | "invalid-result"
  | "service-unavailable";

interface RouteContext {
  params: Promise<{
    sessionId: string;
  }>;
}

export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  try {
    const {
      sessionId,
    } = await context.params;

    if (!sessionId) {
      return errorResponse(
        "invalid-request",
        "The personality report request is invalid.",
        400,
      );
    }

    const backendHeaders =
      createBackendHeaders(
        request,
      );

    /**
     * Security gate:
     *
     * Do NOT load the assessment result or any premium
     * report content until the existing backend has
     * confirmed:
     *
     * - authenticated user
     * - verified email
     * - session ownership
     * - unlocked entitlement
     */
    const accessResponse =
      await fetch(
        `${BACKEND_URL}/api/account/report-access/personality/${encodeURIComponent(
          sessionId,
        )}`,
        {
          method: "GET",
          headers:
            backendHeaders,
          cache: "no-store",
        },
      );

    const accessData =
      await readJsonResponse(
        accessResponse,
      );

    if (!accessResponse.ok) {
      return errorResponse(
        getAccessErrorCode(
          accessResponse.status,
        ),
        getBackendDetail(
          accessData,
          "Unable to verify report access.",
        ),
        accessResponse.status,
      );
    }

    if (
      !isUnlockedPersonalityReportAccess(
        accessData,
        sessionId,
      )
    ) {
      return errorResponse(
        "report-locked",
        "The complete personality report is not unlocked.",
        403,
      );
    }

    /**
     * Only after the entitlement gate succeeds
     * may the route load the persisted result.
     */
    const resultResponse =
      await fetch(
        `${BACKEND_URL}/api/sessions/${encodeURIComponent(
          sessionId,
        )}/result`,
        {
          method: "GET",
          headers:
            backendHeaders,
          cache: "no-store",
        },
      );

    const resultData =
      await readJsonResponse(
        resultResponse,
      );

    if (!resultResponse.ok) {
      return errorResponse(
        resultResponse.status === 404
          ? "resource-not-found"
          : "result-error",
        getBackendDetail(
          resultData,
          "Unable to load the personality result.",
        ),
        resultResponse.status,
      );
    }

    if (
      !isPersonalityResultContract(
        resultData,
      ) ||
      resultData.sessionId !==
        sessionId
    ) {
      return errorResponse(
        "invalid-result",
        "The personality result service returned an invalid response.",
        502,
      );
    }

    const payload =
      buildFixedPersonalityReportPayload(
        resultData.type,
        createReportDimensions(
          resultData,
        ),
      );

    return jsonResponse(
      {
        sessionId:
          resultData.sessionId,

        locale:
          resultData.language,

        generatedAt:
          resultData.calculatedAt,

        report:
          payload,
      },
      200,
    );
  } catch {
    return errorResponse(
      "service-unavailable",
      "The personality report service is temporarily unavailable.",
      503,
    );
  }
}

function getAccessErrorCode(
  status: number,
): FixedReportApiErrorCode {
  if (
    status === 401 ||
    status === 403
  ) {
    return "authentication-required";
  }

  if (status === 404) {
    return "resource-not-found";
  }

  return "access-error";
}

function errorResponse(
  code: FixedReportApiErrorCode,
  detail: string,
  status: number,
): Response {
  return jsonResponse(
    {
      code,
      detail,
    },
    status,
  );
}

function createBackendHeaders(
  request: Request,
): Headers {
  const headers =
    new Headers();

  const cookie =
    request.headers.get(
      "cookie",
    );

  if (cookie) {
    headers.set(
      "Cookie",
      cookie,
    );
  }

  return headers;
}

async function readJsonResponse(
  response: Response,
): Promise<unknown> {
  const text =
    await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(
      text,
    ) as unknown;
  } catch {
    return null;
  }
}

function isUnlockedPersonalityReportAccess(
  value: unknown,
  sessionId: string,
): boolean {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const record =
    value as Record<
      string,
      unknown
    >;

  return (
    record.module ===
      "personality" &&
    record.resourceId ===
      sessionId &&
    record.authenticated ===
      true &&
    record.emailVerified ===
      true &&
    record.ownsResource ===
      true &&
    record.entitlementStatus ===
      "unlocked" &&
    record.canViewFullReport ===
      true
  );
}

function getBackendDetail(
  value: unknown,
  fallback: string,
): string {
  if (
    typeof value === "object" &&
    value !== null &&
    "detail" in value &&
    typeof (
      value as {
        detail?: unknown;
      }
    ).detail === "string"
  ) {
    const detail =
      (
        value as {
          detail: string;
        }
      ).detail.trim();

    if (detail) {
      return detail;
    }
  }

  return fallback;
}

function jsonResponse(
  body: unknown,
  status: number,
): Response {
  return Response.json(
    body,
    {
      status,
      headers:
        NO_STORE_HEADERS,
    },
  );
}
