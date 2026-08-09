"use client";

import { useLocale } from "@/components/locale";
import { ButtonLink } from "@/components/ui";

export interface ReportNavigationAction {
  href: string;
  label: string;
}

export interface ReportNavigationProps {
  primary: ReportNavigationAction;
  secondary: ReportNavigationAction;
}

export function ReportNavigation({
  primary,
  secondary,
}: ReportNavigationProps) {
  const { locale } = useLocale();

  return (
    <div className="report-interactive-only mt-12 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row">
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
