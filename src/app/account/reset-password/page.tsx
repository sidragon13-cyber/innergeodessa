"use client";

import { Suspense } from "react";
import { AccountFrame, ResetPasswordForm } from "@/components/account";
import { useLocale } from "@/components/locale";
import { getAccountDictionary } from "@/data/i18n";

export default function ResetPasswordPage() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);
  return (
    <AccountFrame eyebrow={dictionary.reset.eyebrow} title={dictionary.reset.title} description={dictionary.reset.description}>
      <Suspense fallback={<p>{dictionary.shared.loading}</p>}><ResetPasswordForm /></Suspense>
    </AccountFrame>
  );
}
