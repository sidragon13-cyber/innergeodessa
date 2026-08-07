import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonLinkVariant = "primary" | "secondary" | "quiet";

export type ButtonLinkSize = "default" | "large";

const VARIANT_CLASSES: Readonly<Record<ButtonLinkVariant, string>> = {
  primary: "ig-button-primary",
  secondary: "ig-button-secondary",
  quiet: "ig-button-quiet underline decoration-1 underline-offset-4",
};

const SIZE_CLASSES: Readonly<Record<ButtonLinkSize, string>> = {
  default: "min-h-12 px-5",
  large: "min-h-14 px-7",
};

export interface ButtonLinkProps extends Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "className"
> {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
  size?: ButtonLinkSize;
  variant?: ButtonLinkVariant;
}

export function ButtonLink({
  children,
  className = "",
  showArrow = false,
  size = "default",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={[
        "inline-flex items-center justify-center gap-5 rounded-[2px] text-xs font-bold uppercase tracking-[0.14em]",
        "transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
        className,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span>{children}</span>

      {showArrow ? <span aria-hidden="true">→</span> : null}
    </Link>
  );
}
