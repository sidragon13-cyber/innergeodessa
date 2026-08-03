import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ??
  "http://127.0.0.1:8000";

type SupportedAssessmentModule =
  | "personality"
  | "riasec";

function resolveAssessmentModule(
  value: string | null,
): SupportedAssessmentModule {
  if (value === null || value === "personality") {
    return "personality";
  }

  if (value === "career" || value === "riasec") {
    return "riasec";
  }

  throw new Error(
    `Unsupported assessment module: "${value}"`,
  );
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const module = resolveAssessmentModule(
      requestUrl.searchParams.get("module"),
    );

    const backendUrl = new URL(
      "/api/items",
      BACKEND_URL,
    );

    backendUrl.searchParams.set(
      "module",
      module,
    );

    const response = await fetch(
      backendUrl,
      {
        cache: "no-store",
      },
    );

    const data: unknown =
      await response.json();

    if (!response.ok) {
      const detail =
        typeof data === "object" &&
        data !== null &&
        "detail" in data
          ? String(data.detail)
          : `Backend returned HTTP ${response.status}`;

      return NextResponse.json(
        {
          error: detail,
        },
        {
          status: response.status,
        },
      );
    }

    const items =
      Array.isArray(data)
        ? data
        : typeof data === "object" &&
            data !== null &&
            "items" in data &&
            Array.isArray(data.items)
          ? data.items
          : [];

    return NextResponse.json({
      module,
      count: items.length,
      items,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load assessment items.";

    const status = message.startsWith(
      "Unsupported assessment module:",
    )
      ? 400
      : 503;

    return NextResponse.json(
      {
        error: message,
      },
      {
        status,
      },
    );
  }
}
