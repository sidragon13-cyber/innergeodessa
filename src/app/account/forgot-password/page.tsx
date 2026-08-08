"use client";

import { AccountFrame, ForgotPasswordForm } from "@/components/account";
import { useLocale } from "@/components/locale";
import { getAccountDictionary } from "@/data/i18n";

export default function ForgotPasswordPage() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);
  return (
    <AccountFrame eyebrow={dictionary.forgot.eyebrow} title={dictionary.forgot.title} description={dictionary.forgot.description}>
      <ForgotPasswordForm />
    </AccountFrame>
  );
}
