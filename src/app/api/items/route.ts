import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ?? "http://127.0.0.1:8000";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/items`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Backend returned HTTP ${response.status}`,
        },
        { status: 502 },
      );
    }

    const items = await response.json();

    return NextResponse.json({
      count: Array.isArray(items) ? items.length : 0,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load assessment items.",
      },
      { status: 503 },
    );
  }
}
