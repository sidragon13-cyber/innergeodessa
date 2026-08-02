import Link from "next/link";
import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

export type ButtonLinkVariant =
  | "primary"
  | "secondary"
  | "quiet";

export type ButtonLinkSize =
  | "default"
  | "large";

const VARIANT_CLASSES: Readonly<
  Record<ButtonLinkVariant, string>
> = {
  primary:
    "border border-[#a64a2c] bg-[#a64a2c] text-[#f1eee5] hover:border-[#34483a] hover:bg-[#34483a]",
  secondary:
    "border border-[#34483a] bg-transparent text-[#26372d] hover:bg-[#34483a] hover:text-[#f1eee5]",
  quiet:
    "border border-transparent bg-transparent text-[#26372d] underline decoration-[#a64a2c] underline-offset-4 hover:text-[#a64a2c]",
};

const SIZE_CLASSES: Readonly<
  Record<ButtonLinkSize, string>
> = {
  default: "min-h-12 px-5",
  large: "min-h-14 px-7",
};

export interface ButtonLinkProps
  extends Omit<
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
        "inline-flex items-center justify-center gap-5 text-xs font-bold uppercase tracking-[0.14em]",
        "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64a2c] focus-visible:ring-offset-2",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span>{children}</span>

      {showArrow ? (
        <span aria-hidden="true">→</span>
      ) : null}
    </Link>
  );
}
