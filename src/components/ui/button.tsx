import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";

export type ButtonSize = "default" | "large";

const VARIANT_CLASSES: Readonly<Record<ButtonVariant, string>> = {
  primary:
    "border border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:border-[var(--color-primary-hover)] hover:bg-[var(--color-primary-hover)] active:border-[var(--color-primary-active)] active:bg-[var(--color-primary-active)]",
  secondary:
    "border border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] active:bg-[var(--color-primary-active)] active:text-[var(--color-on-primary)]",
  quiet:
    "border border-transparent bg-transparent text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-1 underline-offset-4 hover:text-[var(--color-accent-hover)]",
  danger:
    "border border-[var(--color-danger)] bg-[var(--color-danger)] text-white hover:brightness-90 active:brightness-75",
};

const SIZE_CLASSES: Readonly<Record<ButtonSize, string>> = {
  default: "min-h-12 px-5",
  large: "min-h-14 px-7",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  showArrow?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className = "",
  disabled = false,
  loading = false,
  loadingLabel,
  showArrow = false,
  size = "default",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        "inline-flex items-center justify-center gap-4 rounded-[2px] text-xs font-bold uppercase tracking-[0.14em]",
        "transition-[background-color,border-color,color,transform,filter] duration-200 ease-out",
        "hover:-translate-y-px active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
        "disabled:cursor-not-allowed disabled:border-[var(--color-disabled-background)] disabled:bg-[var(--color-disabled-background)] disabled:text-[var(--color-disabled-text)] disabled:opacity-100 disabled:hover:translate-y-0",
        className,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}

      <span>{loading && loadingLabel ? loadingLabel : children}</span>

      {showArrow && !loading ? <span aria-hidden="true">→</span> : null}
    </button>
  );
}
