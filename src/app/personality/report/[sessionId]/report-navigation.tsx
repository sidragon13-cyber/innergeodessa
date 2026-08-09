"use client";

import Link from "next/link";

import { useLocale } from "@/components/locale";

export interface ReportNavigationProps {
  sessionId: string;
}

export function ReportNavigation({
  sessionId,
}: ReportNavigationProps) {
  const { locale } = useLocale();

  return (
    <div className="report-interactive-only mt-12 flex flex-col gap-4 border-t border-[#c8c2b5] pt-8 sm:flex-row">
      <Link
        href={`/personality/result/${sessionId}`}
        className="inline-flex min-h-12 items-center justify-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
      >
        {locale === "zh" ? "返回人格测试结果" : "Back to personality result"}
      </Link>

      <Link
        href="/personality"
        className="inline-flex min-h-12 items-center justify-center border border-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em]"
      >
        {locale === "zh" ? "人格测评首页" : "Personality overview"}
      </Link>

      <Link
        href="/"
        className="inline-flex min-h-12 items-center justify-center px-6 text-xs font-bold uppercase tracking-[0.14em]"
      >
        {locale === "zh" ? "首页" : "Home"}
      </Link>
    </div>
  );
}
