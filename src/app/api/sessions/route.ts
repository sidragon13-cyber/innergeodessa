import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ?? "http://127.0.0.1:8000";

type SessionRequestBody = {
  consent?: boolean;
  language?: string;
  module?: string;
};

async function readRequestBody(
  request: Request,
): Promise<SessionRequestBody> {
  const rawBody = await request.text();

  if (!rawBody.trim()) {
    return {
      consent: true,
      language: "en",
      module: "personality",
    };
  }

  const parsed: unknown = JSON.parse(rawBody);

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    Array.isArray(parsed)
  ) {
    throw new Error("Invalid assessment session request.");
  }

  return parsed as SessionRequestBody;
}

async function readBackendPayload(
  response: Response,
): Promise<unknown> {
  const rawBody = await response.text();

  if (!rawBody.trim()) {
    return null;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return {
      detail: rawBody,
    };
  }
}

function getBackendError(
  data: unknown,
  status: number,
): string {
  if (
    typeof data === "object" &&
    data !== null &&
    "detail" in data &&
    typeof data.detail === "string"
  ) {
    return data.detail;
  }

  return `Backend returned HTTP ${status}`;
}

export async function POST(request: Request) {
  try {
    const body = await readRequestBody(request);

    const response = await fetch(
      `${BACKEND_URL}/api/sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const data = await readBackendPayload(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: getBackendError(data, response.status),
        },
        { status: response.status },
      );
    }

    if (data === null) {
      return NextResponse.json(
        {
          error:
            "The backend returned an empty session response.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create assessment session.",
      },
      { status: 503 },
    );
  }
}
