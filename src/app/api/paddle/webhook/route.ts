import { NextResponse } from "next/server";
import { EventName, Paddle } from "@paddle/paddle-node-sdk";

export const runtime = "nodejs";

const BACKEND_URL =
  process.env.INNERGEODESSA_API_URL ?? "http://127.0.0.1:8000";

class InvalidFulfillmentEventError extends Error {}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new InvalidFulfillmentEventError(`Missing ${field}`);
  }
  return value;
}

export async function POST(request: Request) {
  const signature = request.headers.get("paddle-signature") ?? "";
  const rawBody = await request.text();
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing PADDLE_WEBHOOK_SECRET");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  let event;

  try {
    const paddle = new Paddle("");
    event = await paddle.webhooks.unmarshal(rawBody, webhookSecret, signature);
  } catch (error) {
    console.error("Invalid Paddle webhook signature", error);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.eventType !== EventName.TransactionCompleted) {
    return NextResponse.json({ received: true });
  }

  const internalSecret = process.env.INNERGEODESSA_INTERNAL_API_SECRET;

  if (!internalSecret) {
    console.error("Missing payment fulfillment configuration");
    return new NextResponse("Fulfillment not configured", { status: 500 });
  }

  try {
    const transaction = event.data;
    const module = requiredString(
      transaction.customData?.module,
      "customData.module",
    );
    const resourceId = requiredString(
      transaction.customData?.resourceId,
      "customData.resourceId",
    );

    if (
      module !== "personality" &&
      module !== "career" &&
      module !== "zodiac" &&
      module !== "kids"
    ) {
      throw new InvalidFulfillmentEventError("Unsupported payment module");
    }

    const priceIds = transaction.items.map((item) => item.price?.id);

    if (priceIds.length !== 1) {
      throw new InvalidFulfillmentEventError("Unexpected Paddle price");
    }

    const providerPriceId = requiredString(
      priceIds[0],
      "transaction.items[0].price.id",
    );

    let productCode: string;

    if (module === "kids") {
      const k68PriceId =
        process.env.NEXT_PUBLIC_PADDLE_K68_PRICE_ID;
      const k912PriceId =
        process.env.NEXT_PUBLIC_PADDLE_K912_PRICE_ID;

      if (!k68PriceId || !k912PriceId) {
        throw new InvalidFulfillmentEventError(
          "Missing Paddle price configuration for kids",
        );
      }

      if (providerPriceId === k68PriceId) {
        productCode = "kids-k68-premium-report-v1";
      } else if (providerPriceId === k912PriceId) {
        productCode = "kids-k912-premium-report-v1";
      } else {
        throw new InvalidFulfillmentEventError(
          "Unexpected Paddle price",
        );
      }
    } else {
      const expectedPriceId =
        module === "personality"
          ? process.env.NEXT_PUBLIC_PADDLE_PERSONALITY_PRICE_ID
          : module === "career"
            ? process.env.NEXT_PUBLIC_PADDLE_CAREER_PRICE_ID
            : process.env.NEXT_PUBLIC_PADDLE_ZODIAC_PRICE_ID;

      if (!expectedPriceId) {
        throw new InvalidFulfillmentEventError(
          `Missing Paddle price configuration for ${module}`,
        );
      }

      if (providerPriceId !== expectedPriceId) {
        throw new InvalidFulfillmentEventError(
          "Unexpected Paddle price",
        );
      }

      productCode =
        module === "personality"
          ? "personality-premium-report-v1"
          : module === "career"
            ? "career-premium-report-v1"
            : "zodiac-premium-report-v1";
    }

    const totals = transaction.details?.totals;

    if (!totals) {
      throw new InvalidFulfillmentEventError("Missing transaction totals");
    }

    const amount = Number(totals.grandTotal);
    const taxAmount = Number(totals.tax);

    if (!Number.isSafeInteger(amount) || !Number.isSafeInteger(taxAmount)) {
      throw new InvalidFulfillmentEventError("Invalid transaction totals");
    }

    const fulfillmentResponse = await fetch(
      `${BACKEND_URL}/api/internal/payments/paddle/fulfill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-InnerGeo-Internal-Secret": internalSecret,
        },
        body: JSON.stringify({
          providerEventId: event.eventId,
          providerTransactionId: transaction.id,
          module,
          resourceId,
          productCode,
          providerPriceId,
          currency: transaction.currencyCode,
          amount,
          taxAmount,
          completedAt: event.occurredAt,
        }),
        cache: "no-store",
      },
    );

    if (!fulfillmentResponse.ok) {
      const detail = await fulfillmentResponse.text();
      console.error("FastAPI payment fulfillment failed", {
        status: fulfillmentResponse.status,
        detail,
        eventId: event.eventId,
      });
      return new NextResponse("Fulfillment failed", { status: 502 });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Invalid Paddle fulfillment event", error);
    return error instanceof InvalidFulfillmentEventError
      ? new NextResponse("Invalid fulfillment event", { status: 400 })
      : new NextResponse("Fulfillment unavailable", { status: 502 });
  }
}
