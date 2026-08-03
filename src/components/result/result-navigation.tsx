import Link from "next/link";

export interface ResultNavigationAction {
  href: string;
  label: string;
}

export interface ResultNavigationProps {
  primary: ResultNavigationAction;
  secondary: ResultNavigationAction;
  className?: string;
}

export function ResultNavigation({
  primary,
  secondary,
  className = "",
}: ResultNavigationProps) {
  return (
    <div
      className={[
        "mt-10 flex flex-col gap-4 border-t border-[#c8c2b5] pt-8 print:hidden sm:flex-row",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Link
        href={primary.href}
        className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5] transition-colors hover:bg-[#a64a2c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34483a]"
      >
        {primary.label}
      </Link>

      <Link
        href={secondary.href}
        className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#34483a] hover:text-[#f1eee5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34483a]"
      >
        {secondary.label}
      </Link>
    </div>
  );
}
