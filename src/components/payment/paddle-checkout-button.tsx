"use client";

import { useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddlePromise: Promise<Paddle | undefined> | null = null;

function getPaddle() {
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  const environment = process.env.NEXT_PUBLIC_PADDLE_ENV;

  if (!token) {
    throw new Error("Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN");
  }

  if (!paddlePromise) {
    paddlePromise = initializePaddle({
      token,
      environment: environment === "sandbox" ? "sandbox" : "production",
    });
  }

  return paddlePromise;
}

export function PaddleCheckoutButton({
  resourceId,
  module = "personality",
  className = "legal-purchase-button",
  label = "Buy Premium Report — $6.99",
}: {
  resourceId: string;
  module?: "personality" | "career" | "zodiac";
  className?: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;

    if (!priceId) {
      console.error("Missing NEXT_PUBLIC_PADDLE_PRICE_ID");
      return;
    }

    try {
      setLoading(true);

      const paddle = await getPaddle();

      if (!paddle) {
        throw new Error("Paddle failed to initialize");
      }

      paddle.Checkout.open({
        items: [
          {
            priceId,
            quantity: 1,
          },
        ],
        customData: {
          module,
          resourceId,
        },
      });
    } catch (error) {
      console.error("Unable to open Paddle checkout", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? "Opening checkout..." : label}
    </button>
  );
}
