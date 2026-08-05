import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

type SectionSpacing =
  | "compact"
  | "default"
  | "large";

const SPACING_CLASSES: Readonly<
  Record<SectionSpacing, string>
> = {
  compact: "py-12 md:py-16",
  default: "py-16 md:py-24",
  large: "py-20 md:py-32",
};

export interface SectionProps<
  T extends ElementType = "section",
> {
  as?: T;
  children: ReactNode;
  className?: string;
  spacing?: SectionSpacing;
}

export function Section<
  T extends ElementType = "section",
>({
  as,
  children,
  className = "",
  spacing = "default",
  ...props
}: SectionProps<T> &
  Omit<
    ComponentPropsWithoutRef<T>,
    keyof SectionProps<T>
  >) {
  const Component = as ?? "section";

  return (
    <Component
      className={[
        SPACING_CLASSES[spacing],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
