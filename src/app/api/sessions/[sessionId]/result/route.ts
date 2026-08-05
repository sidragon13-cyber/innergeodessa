import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ?? "http://127.0.0.1:8000";

type RouteContext = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  try {
    const { sessionId } = await context.params;
    const response = await fetch(
      `${BACKEND_URL}/api/sessions/${encodeURIComponent(sessionId)}/result`,
      { cache: "no-store" },
    );
    const text = await response.text();

    let data: unknown;

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: getBackendError(data, response.status) },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load result.",
      },
      { status: 503 },
    );
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
