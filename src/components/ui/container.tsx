import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

type ContainerSize =
  | "content"
  | "wide"
  | "full";

const SIZE_CLASSES: Readonly<
  Record<ContainerSize, string>
> = {
  content: "max-w-4xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

export interface ContainerProps<
  T extends ElementType = "div",
> {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
}

export function Container<
  T extends ElementType = "div",
>({
  as,
  children,
  className = "",
  size = "wide",
  ...props
}: ContainerProps<T> &
  Omit<
    ComponentPropsWithoutRef<T>,
    keyof ContainerProps<T>
  >) {
  const Component = as ?? "div";

  return (
    <Component
      className={[
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        SIZE_CLASSES[size],
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
