"use client";

import {
  useState,
} from "react";

import {
  useLocale,
} from "@/components/locale";
import {
  ButtonLink,
} from "@/components/ui";
import {
  getAccountDictionary,
} from "@/data/i18n";

import {
  getAuthErrorMessage,
} from "./auth-errors";
import {
  useAuth,
} from "./auth-provider";

export function AccountDashboard() {
  const { locale } = useLocale();
  const dictionary = getAccountDictionary(locale);
  const { status, user, error, refreshUser, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [actionError, setActionError] = useState("");

  if (status === "loading") {
    return <Notice>{dictionary.shared.loading}</Notice>;
  }

  if (error) {
    return (
      <Notice>
        <p role="alert">{dictionary.shared.serviceUnavailable}</p>
        <button
          type="button"
          className="mt-5 min-h-12 border border-[#34483a] px-5 text-xs font-bold uppercase tracking-[0.14em]"
          onClick={() => void refreshUser()}
        >
          {dictionary.shared.retry}
        </button>
      </Notice>
    );
  }

  if (status === "unauthenticated" || !user) {
    return (
      <section className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9">
        <h2 className="text-3xl font-semibold">
          {dictionary.dashboard.loginRequiredTitle}
        </h2>
        <p className="mt-4 leading-7 text-[#596158]">
          {dictionary.dashboard.loginRequiredDescription}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href="/account/login">
            {dictionary.dashboard.login}
          </ButtonLink>
          <ButtonLink href="/account/register" variant="secondary">
            {dictionary.dashboard.register}
          </ButtonLink>
        </div>
      </section>
    );
  }

  const createdAt = formatAccountDate(user.createdAt, dictionary.dateLocale);

  async function handleLogout() {
    setLoggingOut(true);
    setActionError("");
    try {
      await logout();
    } catch (requestError) {
      setActionError(getAuthErrorMessage(requestError, dictionary));
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="grid gap-8">
      <section className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9">
        <dl className="grid gap-6 md:grid-cols-2">
          <AccountField
            label={dictionary.dashboard.nickname}
            value={user.nickname}
          />
          <AccountField
            label={dictionary.dashboard.email}
            value={user.email}
          />
          <AccountField
            label={dictionary.dashboard.verificationStatus}
            value={
              user.emailVerified
                ? dictionary.dashboard.verified
                : dictionary.dashboard.unverified
            }
          />
          <AccountField
            label={dictionary.dashboard.createdAt}
            value={createdAt}
          />
        </dl>

        {!user.emailVerified ? (
          <div className="mt-8 border-l-4 border-[#a64a2c] bg-[#fff5f2] p-5">
            <p className="font-semibold text-[#7f3e33]">
              {dictionary.dashboard.unverified}
            </p>
            <p className="mt-2 leading-7 text-[#596158]">
              {dictionary.dashboard.unverifiedLimitation}
            </p>
            <ButtonLink href="/account/verify-email" className="mt-5">
              {dictionary.dashboard.verifyEmail}
            </ButtonLink>
          </div>
        ) : null}

        {actionError ? (
          <p role="alert" className="mt-6 text-sm text-[#7f3e33]">
            {actionError}
          </p>
        ) : null}

        <button
          type="button"
          disabled={loggingOut}
          onClick={() => void handleLogout()}
          className="mt-8 min-h-12 border border-[#34483a] px-5 text-xs font-bold uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loggingOut
            ? dictionary.dashboard.loggingOut
            : dictionary.dashboard.logout}
        </button>
      </section>

      {user.emailVerified ? (
        <section>
          <h2 className="text-3xl font-semibold">
            {dictionary.dashboard.upcomingTitle}
          </h2>
          <p className="mt-3 leading-7 text-[#596158]">
            {dictionary.dashboard.upcomingDescription}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {dictionary.dashboard.modules.map((module) => (
              <article
                key={module.id}
                className="border border-[#c8c2b5] bg-[#f7f4ec] p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a64a2c]">
                  {dictionary.dashboard.nextPhase}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{module.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#596158]">
                  {module.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function AccountField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d746b]">
        {label}
      </dt>
      <dd className="mt-2 break-words text-lg font-semibold">{value}</dd>
    </div>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 leading-7 md:p-9">
      {children}
    </div>
  );
}

function formatAccountDate(value: string, dateLocale: "en" | "zh-CN") {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(dateLocale, {
    dateStyle: "medium",
  }).format(date);
}
