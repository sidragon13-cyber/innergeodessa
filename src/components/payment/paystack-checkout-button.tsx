"use client";

import {
  useState,
  type ButtonHTMLAttributes,
} from "react";

type PaystackModule =
  | "personality"
  | "career"
  | "kids";

type PaystackCheckoutButtonProps = {
  module?: PaystackModule;
  resourceId: string;
  label?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
>;

export function PaystackCheckoutButton({
  module = "personality",
  resourceId,
  label = "Buy Premium Report",
  disabled,
  ...buttonProps
}: PaystackCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    null,
  );

  async function handleCheckout() {
    if (loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/payments/paystack/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            module,
            resourceId,
          }),
        },
      );

      const payload = await response.json();

      if (
        !response.ok ||
        typeof payload.authorizationUrl !== "string"
      ) {
        throw new Error(
          payload?.detail ??
            "Unable to start payment.",
        );
      }

      window.location.assign(
        payload.authorizationUrl,
      );
    } catch (checkoutError) {
      console.error(checkoutError);

      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start payment.",
      );

      setLoading(false);
    }
  }

  return (
    <>
      <button
        {...buttonProps}
        type="button"
        disabled={disabled || loading}
        onClick={handleCheckout}
      >
        {loading ? "Redirecting…" : label}
      </button>

      {error ? (
        <p className="mt-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
    </>
  );
}
