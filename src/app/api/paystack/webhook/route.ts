import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ??
  "http://127.0.0.1:8000";

const PRODUCTS = {
  "personality-premium-report-v1": {
    module: "personality",
    amount: 14900,
  },
  "career-premium-report-v1": {
    module: "career",
    amount: 17900,
  },
  "kids-k68-premium-report-v1": {
    module: "kids",
    amount: 14900,
  },
  "kids-k912-premium-report-v1": {
    module: "kids",
    amount: 16900,
  },
} as const;

type ProductCode = keyof typeof PRODUCTS;

function requiredString(
  value: unknown,
  field: string,
): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing ${field}`);
  }

  return value.trim();
}

function parseMetadata(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object") {
    return value as Record<string, unknown>;
  }

  if (typeof value === "string") {
    const parsed = JSON.parse(value);

    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, unknown>;
    }
  }

  throw new Error("Invalid Paystack metadata");
}

export async function POST(request: Request) {
  const secretKey =
    process.env.PAYSTACK_SECRET_KEY?.trim();

  const internalSecret =
    process.env.INNERGEODESSA_INTERNAL_API_SECRET?.trim();

  if (!secretKey || !internalSecret) {
    console.error("Missing Paystack payment configuration");

    return new NextResponse(
      "Payment configuration unavailable",
      { status: 500 },
    );
  }

  const rawBody = await request.text();
  const suppliedSignature =
    request.headers
      .get("x-paystack-signature")
      ?.trim()
      .toLowerCase() ?? "";

  const expectedSignature = createHmac(
    "sha512",
    secretKey,
  )
    .update(rawBody)
    .digest("hex");

  const suppliedBuffer = Buffer.from(
    suppliedSignature,
    "utf8",
  );
  const expectedBuffer = Buffer.from(
    expectedSignature,
    "utf8",
  );

  if (
    suppliedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(suppliedBuffer, expectedBuffer)
  ) {
    return new NextResponse(
      "Invalid signature",
      { status: 401 },
    );
  }

  let event: {
    event?: unknown;
    data?: Record<string, unknown>;
  };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return new NextResponse(
      "Invalid payload",
      { status: 400 },
    );
  }

  if (event.event !== "charge.success") {
    return NextResponse.json({
      received: true,
    });
  }

  try {
    const reference = requiredString(
      event.data?.reference,
      "reference",
    );

    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
        cache: "no-store",
      },
    );

    if (!verifyResponse.ok) {
      throw new Error(
        "Paystack verification request failed",
      );
    }

    const verifiedPayload = await verifyResponse.json();

    if (
      verifiedPayload?.status !== true ||
      verifiedPayload?.data?.status !== "success"
    ) {
      throw new Error(
        "Paystack transaction is not successful",
      );
    }

    const transaction = verifiedPayload.data;

    if (transaction.reference !== reference) {
      throw new Error(
        "Paystack reference mismatch",
      );
    }

    if (transaction.currency !== "ZAR") {
      throw new Error(
        "Unexpected Paystack currency",
      );
    }

    const metadata = parseMetadata(
      transaction.metadata,
    );

    const module = requiredString(
      metadata.module,
      "metadata.module",
    );

    const resourceId = requiredString(
      metadata.resourceId,
      "metadata.resourceId",
    );

    const productCode = requiredString(
      metadata.productCode,
      "metadata.productCode",
    ) as ProductCode;

    const product = PRODUCTS[productCode];

    if (!product) {
      throw new Error(
        "Unsupported Paystack product",
      );
    }

    if (module !== product.module) {
      throw new Error(
        "Paystack product module mismatch",
      );
    }

    if (transaction.amount !== product.amount) {
      throw new Error(
        "Paystack payment amount mismatch",
      );
    }

    const completedAt = requiredString(
      transaction.paid_at,
      "paid_at",
    );

    const fulfillmentResponse = await fetch(
      `${BACKEND_URL}/api/internal/payments/paystack/fulfill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-InnerGeo-Internal-Secret":
            internalSecret,
        },
        body: JSON.stringify({
          providerEventId:
            `charge.success:${reference}`,
          providerTransactionId:
            reference,
          module,
          resourceId,
          productCode,
          providerPriceId: null,
          currency: "ZAR",
          amount: product.amount,
          taxAmount: 0,
          completedAt,
        }),
        cache: "no-store",
      },
    );

    if (!fulfillmentResponse.ok) {
      const detail =
        await fulfillmentResponse.text();

      console.error(
        "Paystack fulfillment failed",
        {
          reference,
          status:
            fulfillmentResponse.status,
          detail,
        },
      );

      return new NextResponse(
        "Fulfillment failed",
        { status: 502 },
      );
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Invalid Paystack payment",
      error,
    );

    return new NextResponse(
      "Invalid payment",
      { status: 400 },
    );
  }
}
