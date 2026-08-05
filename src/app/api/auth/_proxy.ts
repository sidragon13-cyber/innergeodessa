const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ??
  "http://127.0.0.1:8000";

type ProxyAuthOptions = {
  backendPath: string;
  method: "GET" | "POST";
};

export async function proxyAuthRequest(
  request: Request,
  options: ProxyAuthOptions,
): Promise<Response> {
  try {
    const headers = new Headers();
    const contentType =
      request.headers.get("content-type");
    const cookie =
      request.headers.get("cookie");

    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    if (cookie) {
      headers.set("Cookie", cookie);
    }

    const requestBody =
      options.method === "POST"
        ? await request.text()
        : undefined;

    const backendResponse = await fetch(
      `${BACKEND_URL}${options.backendPath}`,
      {
        method: options.method,
        headers,
        body:
          requestBody &&
          requestBody.trim().length > 0
            ? requestBody
            : undefined,
        cache: "no-store",
      },
    );

    const responseBody =
      backendResponse.status === 204
        ? null
        : await backendResponse.text();

    const responseHeaders = new Headers();
    const backendContentType =
      backendResponse.headers.get(
        "content-type",
      );
    const setCookie =
      backendResponse.headers.get(
        "set-cookie",
      );

    if (backendContentType) {
      responseHeaders.set(
        "Content-Type",
        backendContentType,
      );
    }

    if (setCookie) {
      responseHeaders.set(
        "Set-Cookie",
        setCookie,
      );
    }

    responseHeaders.set(
      "Cache-Control",
      "no-store",
    );

    return new Response(responseBody, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    return Response.json(
      {
        detail:
          error instanceof Error
            ? error.message
            : "The authentication service is unavailable.",
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
