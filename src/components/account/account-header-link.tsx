"use client";

import Link from "next/link";

import {
  useLocale,
} from "@/components/locale";
import {
  getAccountDictionary,
} from "@/data/i18n";

import {
  useAuth,
} from "./auth-provider";

export function AccountHeaderLink() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);
  const { status, user } = useAuth();

  return (
    <Link
      href="/account"
      aria-label={
        status === "loading"
          ? dictionary.header.loadingLabel
          : dictionary.header.accountLabel
      }
      className="min-w-[4.5rem] max-w-[8rem] justify-center truncate"
    >
      {status === "loading"
        ? "···"
        : status === "authenticated" && user
          ? user.nickname
          : dictionary.header.login}
    </Link>
  );
}
