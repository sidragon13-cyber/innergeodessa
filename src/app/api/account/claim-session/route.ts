const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ??
  "http://127.0.0.1:8000";

async function readBackendBody(
  response: Response,
): Promise<string | null> {
  if (response.status === 204) {
    return null;
  }

  const body = await response.text();
  return body.length > 0 ? body : null;
}

export async function POST(
  request: Request,
): Promise<Response> {
  try {
    const body = await request.text();
    const cookie = request.headers.get("cookie");

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (cookie) {
      headers.set("Cookie", cookie);
    }

    const backendResponse = await fetch(
      `${BACKEND_URL}/api/account/claim-session`,
      {
        method: "POST",
        headers,
        body,
        cache: "no-store",
      },
    );

    const responseBody =
      await readBackendBody(backendResponse);

    const responseHeaders = new Headers({
      "Cache-Control": "no-store",
    });

    const contentType =
      backendResponse.headers.get("content-type");

    if (contentType) {
      responseHeaders.set(
        "Content-Type",
        contentType,
      );
    }

    return new Response(responseBody, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      {
        detail:
          "The assessment saving service is temporarily unavailable.",
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
