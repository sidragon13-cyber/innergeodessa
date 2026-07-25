import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ?? "http://127.0.0.1:8000";

type RouteContext = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { sessionId } = await context.params;
    const body = await request.json();

    const response = await fetch(
      `${BACKEND_URL}/api/sessions/${sessionId}/answers`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.detail ?? `Backend returned HTTP ${response.status}`,
        },
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
            : "Unable to save the assessment answer.",
      },
      { status: 503 },
    );
  }
}
