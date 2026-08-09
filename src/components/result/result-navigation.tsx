"use client";

import { useLocale } from "@/components/locale";
import { ButtonLink } from "@/components/ui";

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
  const { locale } = useLocale();

  return (
    <div
      className={[
        "mt-10 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 print:hidden sm:flex-row",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ButtonLink href={primary.href}>{primary.label}</ButtonLink>

      <ButtonLink href={secondary.href} variant="secondary">
        {secondary.label}
      </ButtonLink>

      <ButtonLink href="/" variant="quiet">
        {locale === "zh" ? "首页" : "Home"}
      </ButtonLink>
    </div>
  );
}
