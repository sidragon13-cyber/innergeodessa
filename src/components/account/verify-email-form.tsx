"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button, ButtonLink } from "@/components/ui";
import { useLocale } from "@/components/locale";
import { getAccountDictionary } from "@/data/i18n";

import { getAuthErrorMessage } from "./auth-errors";
import { useAuth } from "./auth-provider";

export function VerifyEmailForm() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);
  const searchParams = useSearchParams();
  const { verifyEmail } = useAuth();
  const [token, setToken] = useState(() => searchParams.get("token") ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    if (!token.trim()) {
      setErrorMessage(dictionary.errors.invalidToken);
      return;
    }
    setSubmitting(true);
    try {
      await verifyEmail(token.trim());
      setToken("");
      setVerified(true);
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, dictionary));
    } finally {
      setSubmitting(false);
    }
  }

  if (verified) {
    return (
      <section className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a64a2c]">
          {dictionary.verification.successEyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold">
          {dictionary.verification.successTitle}
        </h2>
        <p className="mt-4 leading-7 text-[#596158]">
          {dictionary.verification.successDescription}
        </p>
        <ButtonLink href="/account" className="mt-7">
          {dictionary.verification.goToAccount}
        </ButtonLink>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9"
      noValidate
    >
      <p className="mb-5 leading-7 text-[#596158]">
        {searchParams.get("token")
          ? dictionary.verification.tokenFromLink
          : dictionary.verification.manualInstruction}
      </p>
      <label className="grid gap-2 text-sm font-semibold">
        {dictionary.fields.verificationToken}
        <input
          className="ig-input"
          type="text"
          autoComplete="off"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          required
        />
      </label>

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
        loadingLabel={dictionary.verification.submitting}
        className="mt-7"
      >
        {dictionary.verification.submit}
      </Button>
    </form>
  );
}
