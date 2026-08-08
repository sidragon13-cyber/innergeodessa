"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useLocale } from "@/components/locale";
import { Button, ButtonLink } from "@/components/ui";
import { getAccountDictionary } from "@/data/i18n";

import { getAuthErrorMessage } from "./auth-errors";
import { useAuth } from "./auth-provider";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordForm() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError(dictionary.errors.invalidEmail);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await forgotPassword(email.trim());
      setSent(true);
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError, dictionary));
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <Notice>
        <h2 className="ig-heading-2">{dictionary.forgot.successTitle}</h2>
        <p className="mt-4 leading-7 text-[#596158]">
          {dictionary.forgot.successDescription}
        </p>
        <ButtonLink href="/account/login" className="mt-7">
          {dictionary.forgot.backToLogin}
        </ButtonLink>
      </Notice>
    );
  }

  return (
    <form onSubmit={submit} className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9" noValidate>
      <label className="grid gap-2 text-sm font-semibold">
        {dictionary.fields.email}
        <input className="ig-input" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      {error ? <ErrorNotice>{error}</ErrorNotice> : null}
      <Button type="submit" loading={submitting} loadingLabel={dictionary.forgot.submitting} className="mt-7">
        {dictionary.forgot.submit}
      </Button>
      <p className="mt-6 text-sm text-[#596158]">
        <Link className="font-semibold underline" href="/account/login">{dictionary.forgot.backToLogin}</Link>
      </p>
    </form>
  );
}

export function ResetPasswordForm() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);
  const { resetPassword } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      setError(dictionary.errors.invalidToken);
      return;
    }
    if (password.length < 10 || password.length > 128) {
      setError(dictionary.errors.invalidPassword);
      return;
    }
    if (password !== confirmPassword) {
      setError(dictionary.errors.passwordMismatch);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await resetPassword(token, password);
      setComplete(true);
      setPassword("");
      setConfirmPassword("");
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError, dictionary));
    } finally {
      setSubmitting(false);
    }
  }

  if (complete) {
    return (
      <Notice>
        <h2 className="ig-heading-2">{dictionary.reset.successTitle}</h2>
        <p className="mt-4 leading-7 text-[#596158]">{dictionary.reset.successDescription}</p>
        <ButtonLink href="/account/login" className="mt-7">{dictionary.reset.login}</ButtonLink>
      </Notice>
    );
  }

  return (
    <form onSubmit={submit} className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9" noValidate>
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-semibold">
          {dictionary.fields.password}
          <input className="ig-input" type="password" autoComplete="new-password" minLength={10} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {dictionary.fields.confirmPassword}
          <input className="ig-input" type="password" autoComplete="new-password" minLength={10} maxLength={128} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
        </label>
      </div>
      {error ? <ErrorNotice>{error}</ErrorNotice> : null}
      <Button type="submit" loading={submitting} loadingLabel={dictionary.reset.submitting} className="mt-7">{dictionary.reset.submit}</Button>
    </form>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return <section className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9">{children}</section>;
}

function ErrorNotice({ children }: { children: React.ReactNode }) {
  return <p role="alert" className="mt-6 border border-[#b98073] bg-[#fff5f2] p-4 text-sm text-[#7f3e33]">{children}</p>;
}
