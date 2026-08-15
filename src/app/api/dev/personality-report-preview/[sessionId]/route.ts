import {
  isPersonalityResultContract,
} from "@/data/assessment/scoring/personality/schema";

import {
  createReportDimensions,
} from "@/data/report/generator/from-assessment-result";

import {
  buildFixedPersonalityReportPayload,
} from "@/data/report/fixed-assets/fixed-report-payload";

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

  if (
    !isPersonalityResultContract(
      input,
    ) ||
    input.sessionId !==
      sessionId ||
    input.questionBankVersion !==
      "preview"
  ) {
    return jsonResponse(
      {
        code:
          "invalid-preview-result",
        detail:
          "The preview result does not satisfy the personality result contract.",
      },
      400,
    );
  }

  const payload =
    buildFixedPersonalityReportPayload(
      input.type,
      createReportDimensions(
        input,
      ),
      input.language,
    );

  return jsonResponse(
    {
      sessionId:
        input.sessionId,

      locale:
        input.language,

      generatedAt:
        input.calculatedAt,

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
