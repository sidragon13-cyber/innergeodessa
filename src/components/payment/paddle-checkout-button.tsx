"use client";

import { useState } from "react";
import {
  CheckoutEventNames,
  initializePaddle,
  type Paddle,
} from "@paddle/paddle-js";

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
  label = "Buy Premium Report — $7.99",
  onCompleted,
}: {
  resourceId: string;
  module?: "personality" | "career" | "zodiac";
  className?: string;
  label?: string;
  onCompleted?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    const priceId =
      module === "personality"
        ? process.env.NEXT_PUBLIC_PADDLE_PERSONALITY_PRICE_ID
        : module === "career"
          ? process.env.NEXT_PUBLIC_PADDLE_CAREER_PRICE_ID
          : process.env.NEXT_PUBLIC_PADDLE_ZODIAC_PRICE_ID;

    if (!priceId) {
      console.error(`Missing Paddle price ID for ${module}`);
      return;
    }

    try {
      setLoading(true);

      const paddle = await getPaddle();

      if (!paddle) {
        throw new Error("Paddle failed to initialize");
      }

      paddle.Update({
        eventCallback: (event) => {
          if (
            event.name ===
            CheckoutEventNames.CHECKOUT_COMPLETED
          ) {
            onCompleted?.();
          }
        },
      });

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
