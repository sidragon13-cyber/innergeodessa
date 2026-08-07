"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button, ButtonLink } from "@/components/ui";
import { useLocale } from "@/components/locale";
import { getAccountDictionary } from "@/data/i18n";

import { getAuthErrorMessage } from "./auth-errors";
import { useAuth } from "./auth-provider";

const INPUT_CLASS = "ig-input";

export function LoginForm() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);
  const { status, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      const requestedPath = searchParams.get("next");
      const destination =
        requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
          ? requestedPath
          : "/account";
      router.replace(destination);
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, dictionary));
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return <Notice>{dictionary.shared.loading}</Notice>;
  }
  if (status === "authenticated") {
    return (
      <Notice>
        <p>{dictionary.login.alreadyAuthenticated}</p>
        <ButtonLink href="/account" className="mt-5">
          {dictionary.login.enterAccount}
        </ButtonLink>
      </Notice>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9"
      noValidate
    >
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-semibold">
          {dictionary.fields.email}
          <input
            className={INPUT_CLASS}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {dictionary.fields.password}
          <input
            className={INPUT_CLASS}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
      </div>

      {errorMessage ? (
        <p
          role="alert"
          className="mt-6 border border-[#b98073] bg-[#fff5f2] p-4 text-sm text-[#7f3e33]"
        >
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        loading={submitting}
        loadingLabel={dictionary.login.submitting}
        className="mt-7"
      >
        {dictionary.login.submit}
      </Button>

      <p className="mt-6 text-sm text-[#596158]">
        {dictionary.login.noAccount}{" "}
        <Link className="font-semibold underline" href="/account/register">
          {dictionary.login.register}
        </Link>
      </p>
    </form>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 leading-7 md:p-9">
      {children}
    </div>
  );
}
