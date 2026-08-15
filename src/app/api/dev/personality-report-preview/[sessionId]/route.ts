import {
  isPersonalityResultContract,
} from "@/data/assessment/scoring/personality/schema";

import {
  buildFixedPersonalityReportFromAssessmentResult,
} from "@/data/report/fixed-assets/fixed-report-adapter";

const NO_STORE_HEADERS = {
  "Cache-Control":
    "private, no-store, max-age=0",
} as const;

const LOCAL_HOSTNAMES =
  new Set([
    "127.0.0.1",
    "localhost",
    "::1",
  ]);

interface RouteContext {
  params: Promise<{
    sessionId: string;
  }>;
}

export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const {
    sessionId,
  } = await context.params;

  if (
    !isLocalPreviewRuntime(
      request,
    )
  ) {
    return jsonResponse(
      {
        code:
          "preview-unavailable",
        detail:
          "Fixed report preview is available only in the local preview runtime.",
      },
      404,
    );
  }

  if (
    !sessionId.startsWith(
      "preview-",
    )
  ) {
    return jsonResponse(
      {
        code:
          "invalid-preview-session",
        detail:
          "The preview session is invalid.",
      },
      400,
    );
  }

  let input: unknown;

  try {
    input =
      await request.json();
  } catch {
    return jsonResponse(
      {
        code:
          "invalid-preview-result",
        detail:
          "The preview result is invalid.",
      },
      400,
    );
  }

  const previewRequest =
    typeof input === "object" &&
    input !== null
      ? input as {
          result?: unknown;
          locale?: unknown;
        }
      : null;

  const reportResult =
    previewRequest?.result;

  const reportLocale =
    previewRequest?.locale;

  if (
    !isPersonalityResultContract(
      reportResult,
    ) ||
    reportResult.sessionId !==
      sessionId ||
    reportResult.questionBankVersion !==
      "preview" ||
    (
      reportLocale !== "en" &&
      reportLocale !== "zh"
    )
  ) {
    return jsonResponse(
      {
        code:
          "invalid-preview-result",
        detail:
          "The preview report request does not satisfy the required result and locale contract.",
      },
      400,
    );
  }

  const payload =
    buildFixedPersonalityReportFromAssessmentResult(
      reportResult,
      reportLocale,
    );

  return jsonResponse(
    {
      sessionId:
        reportResult.sessionId,

      locale:
        reportLocale,

      generatedAt:
        reportResult.calculatedAt,

      report:
        payload,
    },
    200,
  );
}

function isLocalPreviewRuntime(
  request: Request,
): boolean {
  const requestHostname =
    new URL(
      request.url,
    ).hostname.toLowerCase();

  const runtimeHostname =
    process.env.HOSTNAME
      ?.trim()
      .toLowerCase();

  const requestIsLocal =
    LOCAL_HOSTNAMES.has(
      requestHostname,
    );

  const runtimeIsLocal =
    runtimeHostname
      ? LOCAL_HOSTNAMES.has(
          runtimeHostname,
        )
      : process.env.NODE_ENV !==
          "production";

  return (
    requestIsLocal &&
    runtimeIsLocal
  );
}

function jsonResponse(
  body: unknown,
  status: number,
): Response {
  return new Response(
    JSON.stringify(
      body,
    ),
    {
      status,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",
        ...NO_STORE_HEADERS,
      },
    },
  );
}
