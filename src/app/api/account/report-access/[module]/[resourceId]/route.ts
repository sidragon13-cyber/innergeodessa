const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ??
  "http://127.0.0.1:8000";

const SUPPORTED_MODULES = new Set([
  "personality",
  "career",
  "zodiac",
]);

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      module: string;
      resourceId: string;
    }>;
  },
): Promise<Response> {
  try {
    const {
      module,
      resourceId,
    } = await context.params;

    if (
      !SUPPORTED_MODULES.has(module) ||
      !resourceId
    ) {
      return Response.json(
        {
          detail:
            "The report access request is invalid.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const cookie =
      request.headers.get("cookie");

    const headers = new Headers();

    if (cookie) {
      headers.set("Cookie", cookie);
    }

    const backendResponse = await fetch(
      `${BACKEND_URL}/api/account/report-access/${encodeURIComponent(
        module,
      )}/${encodeURIComponent(resourceId)}`,
      {
        method: "GET",
        headers,
        cache: "no-store",
      },
    );

    const body =
      backendResponse.status === 204
        ? null
        : await backendResponse.text();

    const responseHeaders =
      new Headers({
        "Cache-Control": "no-store",
      });

    const contentType =
      backendResponse.headers.get(
        "content-type",
      );

    if (contentType) {
      responseHeaders.set(
        "Content-Type",
        contentType,
      );
    }

    return new Response(body, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      {
        detail:
          "The report access service is temporarily unavailable.",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
