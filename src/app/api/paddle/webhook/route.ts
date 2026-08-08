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
  const expectedPriceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;

  if (!internalSecret || !expectedPriceId) {
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

    if (module !== "personality") {
      throw new InvalidFulfillmentEventError("Unsupported payment module");
    }

    const priceIds = transaction.items.map((item) => item.price?.id);

    if (priceIds.length !== 1 || priceIds[0] !== expectedPriceId) {
      throw new InvalidFulfillmentEventError("Unexpected Paddle price");
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
          productCode: "personality-premium-report-v1",
          providerPriceId: priceIds[0],
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
