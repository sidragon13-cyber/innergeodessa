"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button, ButtonLink } from "@/components/ui";
import { useLocale } from "@/components/locale";
import { getAccountDictionary } from "@/data/i18n";

import { getAuthErrorMessage } from "./auth-errors";
import { useAuth, type RegisterResult } from "./auth-provider";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INPUT_CLASS = "ig-input";

export function RegisterForm() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);
  const { status, register } = useAuth();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<RegisterResult | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    const trimmedNickname = nickname.trim();
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setErrorMessage(dictionary.errors.invalidEmail);
      return;
    }
    if (trimmedNickname.length < 2 || trimmedNickname.length > 40) {
      setErrorMessage(dictionary.errors.invalidNickname);
      return;
    }
    if (password.length < 10 || password.length > 128) {
      setErrorMessage(dictionary.errors.invalidPassword);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(dictionary.errors.passwordMismatch);
      return;
    }

    setSubmitting(true);
    try {
      setResult(
        await register({
          email: trimmedEmail,
          nickname: trimmedNickname,
          password,
        }),
      );
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, dictionary));
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return <AccountNotice>{dictionary.shared.loading}</AccountNotice>;
  }

  if (status === "authenticated") {
    return (
      <AccountNotice>
        <p>{dictionary.register.alreadyAuthenticated}</p>
        <ButtonLink href="/account" className="mt-5">
          {dictionary.shared.accountHome}
        </ButtonLink>
      </AccountNotice>
    );
  }

  if (result) {
    const developmentVerificationHref =
      process.env.NODE_ENV !== "production" && result.verificationToken
        ? `/account/verify-email?token=${encodeURIComponent(
            result.verificationToken,
          )}`
        : null;

    return (
      <section className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a64a2c]">
          {dictionary.register.successEyebrow}
        </p>
        <h2 className="ig-heading-2 mt-3">
          {dictionary.register.successTitle}
        </h2>
        <p className="mt-4 leading-7 text-[#596158]">
          {dictionary.register.successDescription}
        </p>
        <p className="mt-5 font-semibold text-[#8a4f43]">
          {dictionary.register.unverified}
        </p>
        <p className="mt-2 leading-7 text-[#596158]">
          {dictionary.register.emailServicePending}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href="/account/login">
            {dictionary.register.goToLogin}
          </ButtonLink>
          <ButtonLink href="/account/verify-email" variant="secondary">
            {dictionary.register.goToVerification}
          </ButtonLink>
          {developmentVerificationHref ? (
            <ButtonLink href={developmentVerificationHref} variant="quiet">
              {dictionary.register.developmentVerification}
            </ButtonLink>
          ) : null}
        </div>
      </section>
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
          {dictionary.fields.nickname}
          <input
            className={INPUT_CLASS}
            type="text"
            autoComplete="nickname"
            minLength={2}
            maxLength={40}
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {dictionary.fields.password}
          <input
            className={INPUT_CLASS}
            type="password"
            autoComplete="new-password"
            minLength={10}
            maxLength={128}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {dictionary.fields.confirmPassword}
          <input
            className={INPUT_CLASS}
            type="password"
            autoComplete="new-password"
            minLength={10}
            maxLength={128}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </label>
      </div>

      {errorMessage ? <AccountError>{errorMessage}</AccountError> : null}

      <Button
        type="submit"
        loading={submitting}
        loadingLabel={dictionary.register.submitting}
        className="mt-7"
      >
        {dictionary.register.submit}
      </Button>

      <p className="mt-6 text-sm text-[#596158]">
        {dictionary.register.haveAccount}{" "}
        <Link className="font-semibold underline" href="/account/login">
          {dictionary.register.login}
        </Link>
      </p>
    </form>
  );
}

function AccountNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 leading-7 md:p-9">
      {children}
    </div>
  );
}

function AccountError({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="mt-6 border border-[#b98073] bg-[#fff5f2] p-4 text-sm text-[#7f3e33]"
    >
      {children}
    </p>
  );
}
