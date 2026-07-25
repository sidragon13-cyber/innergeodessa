import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ?? "http://127.0.0.1:8000";

type RouteContext = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function POST(
  _request: Request,
  context: RouteContext,
) {
  try {
    const { sessionId } = await context.params;

    const response = await fetch(
      `${BACKEND_URL}/api/sessions/${sessionId}/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const text = await response.text();

    let data: unknown;

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {
        error: text || "Backend returned an invalid response.",
      };
    }

    if (!response.ok) {
      const backendError =
        typeof data === "object" &&
        data !== null &&
        "detail" in data
          ? String(data.detail)
          : `Backend returned HTTP ${response.status}`;

      return NextResponse.json(
        { error: backendError },
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
            : "Unable to complete the assessment.",
      },
      { status: 503 },
    );
  }
}
