"use client";

import {
  AccountDashboard,
  AccountFrame,
} from "@/components/account";
import {
  useLocale,
} from "@/components/locale";
import {
  getAccountDictionary,
} from "@/data/i18n";

export default function AccountPage() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);

  return (
    <AccountFrame
      eyebrow={dictionary.dashboard.eyebrow}
      title={dictionary.dashboard.title}
      description={dictionary.dashboard.description}
    >
      <AccountDashboard />
    </AccountFrame>
  );
}
