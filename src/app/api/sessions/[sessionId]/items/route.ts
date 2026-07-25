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
      `${BACKEND_URL}/api/sessions/${sessionId}/items`,
      { cache: "no-store" },
    );
    const data: unknown = await response.json();

    if (!response.ok) {
      const detail =
        typeof data === "object" &&
        data !== null &&
        "detail" in data
          ? String(data.detail)
          : `Backend returned HTTP ${response.status}`;

      return NextResponse.json(
        { error: detail },
        { status: response.status },
      );
    }

    return NextResponse.json({
      count: Array.isArray(data) ? data.length : 0,
      items: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load session assessment items.",
      },
      { status: 503 },
    );
  }
}
