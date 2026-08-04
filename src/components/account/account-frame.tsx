"use client";

import type {
  ReactNode,
} from "react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/home";
import {
  Container,
} from "@/components/ui";
import {
  useLocale,
} from "@/components/locale";
import {
  getAccountDictionary,
} from "@/data/i18n";

export function AccountFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);

  return (
    <>
      <SiteHeader homePath="/" />
      <main className="min-h-[70vh] bg-[#efede5] py-14 text-[#26372d] md:py-20">
        <Container size="content">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a64a2c]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#596158]">
            {description}
          </p>

          <div className="mt-10">{children}</div>

          <div className="mt-10 border-t border-[#c8c2b5] pt-7 text-sm leading-6 text-[#6d746b]">
            <p>{dictionary.shared.anonymousNote}</p>
            <p className="mt-3">{dictionary.shared.disclaimer}</p>
          </div>
        </Container>
      </main>
      <SiteFooter homePath="/" />
    </>
  );
}
