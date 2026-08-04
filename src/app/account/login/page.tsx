"use client";

import {
  Suspense,
} from "react";

import {
  AccountFrame,
  LoginForm,
} from "@/components/account";
import {
  useLocale,
} from "@/components/locale";
import {
  getAccountDictionary,
} from "@/data/i18n";

export default function LoginPage() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);

  return (
    <AccountFrame
      eyebrow={dictionary.login.eyebrow}
      title={dictionary.login.title}
      description={dictionary.login.description}
    >
      <Suspense fallback={<p>{dictionary.shared.loading}</p>}>
        <LoginForm />
      </Suspense>
    </AccountFrame>
  );
}
