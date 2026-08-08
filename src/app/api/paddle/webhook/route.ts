import { NextResponse } from "next/server";
import { EventName, Paddle } from "@paddle/paddle-node-sdk";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("paddle-signature") ?? "";
  const rawBody = await request.text();

  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing PADDLE_WEBHOOK_SECRET");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  try {
    const paddle = new Paddle("");

    const event = await paddle.webhooks.unmarshal(
      rawBody,
      webhookSecret,
      signature,
    );

    switch (event.eventType) {
      case EventName.TransactionCompleted:
        console.log("PADDLE_TRANSACTION_COMPLETED", event.data);
        break;

      default:
        console.log("PADDLE_EVENT", event.eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Invalid Paddle webhook signature", error);

    return new NextResponse("Invalid signature", {
      status: 400,
    });
  }
}
