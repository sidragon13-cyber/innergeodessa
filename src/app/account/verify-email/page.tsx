"use client";

import {
  Suspense,
} from "react";

import {
  AccountFrame,
  VerifyEmailForm,
} from "@/components/account";
import {
  useLocale,
} from "@/components/locale";
import {
  getAccountDictionary,
} from "@/data/i18n";

export default function VerifyEmailPage() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);

  return (
    <AccountFrame
      eyebrow={dictionary.verification.eyebrow}
      title={dictionary.verification.title}
      description={dictionary.verification.description}
    >
      <Suspense fallback={<p>{dictionary.shared.loading}</p>}>
        <VerifyEmailForm />
      </Suspense>
    </AccountFrame>
  );
}
