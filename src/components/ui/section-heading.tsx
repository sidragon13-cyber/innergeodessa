import type {
  ElementType,
  ReactNode,
} from "react";

export interface SectionHeadingProps {
  align?: "left" | "center";
  description?: ReactNode;
  eyebrow?: ReactNode;
  level?: 1 | 2 | 3;
  title: ReactNode;
  className?: string;
}

const HEADING_TAGS: Readonly<
  Record<1 | 2 | 3, ElementType>
> = {
  1: "h1",
  2: "h2",
  3: "h3",
};

export function SectionHeading({
  align = "left",
  className = "",
  description,
  eyebrow,
  level = 2,
  title,
}: SectionHeadingProps) {
  const Heading = HEADING_TAGS[level];

  return (
    <div
      className={[
        "max-w-3xl",
        align === "center"
          ? "mx-auto text-center"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
          {eyebrow}
        </p>
      ) : null}

      <Heading className="font-serif text-4xl font-normal leading-tight tracking-[-0.04em] text-[#20231d] sm:text-5xl lg:text-6xl">
        {title}
      </Heading>

      {description ? (
        <div className="mt-5 text-base leading-8 text-[#596158]">
          {description}
        </div>
      ) : null}
    </div>
  );
}
