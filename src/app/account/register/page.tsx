"use client";

import { Suspense } from "react";

import {
  AccountFrame,
  RegisterForm,
} from "@/components/account";
import {
  useLocale,
} from "@/components/locale";
import {
  getAccountDictionary,
} from "@/data/i18n";

export default function RegisterPage() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);

  return (
    <AccountFrame
      eyebrow={dictionary.register.eyebrow}
      title={dictionary.register.title}
      description={dictionary.register.description}
    >
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </AccountFrame>
  );
}
