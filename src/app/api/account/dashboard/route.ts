const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ??
  "http://127.0.0.1:8000";

export async function GET(
  request: Request,
): Promise<Response> {
  try {
    const cookie =
      request.headers.get("cookie");

    const headers = new Headers();

    if (cookie) {
      headers.set("Cookie", cookie);
    }

    const backendResponse = await fetch(
      `${BACKEND_URL}/api/account/dashboard`,
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
          "The account dashboard service is temporarily unavailable.",
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
