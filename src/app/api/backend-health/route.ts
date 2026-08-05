import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ?? "http://127.0.0.1:8000";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/health`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          connected: false,
          error: `Backend returned HTTP ${response.status}`,
        },
        { status: 502 },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      connected: data.status === "ok",
      backend: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to connect to the backend.",
      },
      { status: 503 },
    );
  }
}
