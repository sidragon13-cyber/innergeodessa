"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
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

type PersonalityHistoryItem = {
  resourceId: string;
  type: string;
  createdAt: string;
  status: "saved";
};

type CareerHistoryItem = {
  resourceId: string;
  code: string;
  createdAt: string;
  status: "saved";
};

type ZodiacHistoryItem = {
  resourceId: string;
  createdAt: string;
  calculatedAt: string;
  schemaVersion: string;
  status: "saved";
};

type DashboardResources = {
  personality: PersonalityHistoryItem[];
  career: CareerHistoryItem[];
  zodiac: ZodiacHistoryItem[];
};

type HistoryStatus =
  | "idle"
  | "loading"
  | "ready"
  | "error";

const emptyResources: DashboardResources = {
  personality: [],
  career: [],
  zodiac: [],
};

export function AccountDashboard() {
  const { locale } = useLocale();
  const dictionary =
    getAccountDictionary(locale);
  const {
    status,
    user,
    error,
    refreshUser,
    logout,
  } = useAuth();

  const [loggingOut, setLoggingOut] =
    useState(false);
  const [actionError, setActionError] =
    useState("");
  const [historyStatus, setHistoryStatus] =
    useState<HistoryStatus>("idle");
  const [resources, setResources] =
    useState<DashboardResources>(
      emptyResources,
    );

  const loadResources =
    useCallback(async (): Promise<void> => {
      setHistoryStatus("loading");

      try {
        const response = await fetch(
          "/api/account/dashboard",
          {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            "Dashboard request failed",
          );
        }

        const payload =
          (await response.json()) as DashboardResources;

        setResources(payload);
        setHistoryStatus("ready");
      } catch {
        setResources(emptyResources);
        setHistoryStatus("error");
      }
    }, []);

  useEffect(() => {
    if (
      status !== "authenticated" ||
      !user
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void loadResources();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [status, user, loadResources]);

  if (status === "loading") {
    return (
      <Notice>
        {dictionary.shared.loading}
      </Notice>
    );
  }

  if (error) {
    return (
      <Notice>
        <p role="alert">
          {
            dictionary.shared
              .serviceUnavailable
          }
        </p>

        <button
          type="button"
          className="mt-5 min-h-12 border border-[#34483a] px-5 text-xs font-bold uppercase tracking-[0.14em]"
          onClick={() =>
            void refreshUser()
          }
        >
          {dictionary.shared.retry}
        </button>
      </Notice>
    );
  }

  if (
    status === "unauthenticated" ||
    !user
  ) {
    return (
      <section className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9">
        <h2 className="text-3xl font-semibold">
          {
            dictionary.dashboard
              .loginRequiredTitle
          }
        </h2>

        <p className="mt-4 leading-7 text-[#596158]">
          {
            dictionary.dashboard
              .loginRequiredDescription
          }
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href="/account/login">
            {dictionary.dashboard.login}
          </ButtonLink>

          <ButtonLink
            href="/account/register"
            variant="secondary"
          >
            {dictionary.dashboard.register}
          </ButtonLink>
        </div>
      </section>
    );
  }

  const createdAt =
    formatAccountDate(
      user.createdAt,
      dictionary.dateLocale,
    );

  async function handleLogout() {
    setLoggingOut(true);
    setActionError("");

    try {
      await logout();
    } catch (requestError) {
      setActionError(
        getAuthErrorMessage(
          requestError,
          dictionary,
        ),
      );
    } finally {
      setLoggingOut(false);
    }
  }

  const totalRecords =
    resources.personality.length +
    resources.career.length +
    resources.zodiac.length;

  return (
    <div className="grid gap-10">
      <section className="border border-[#c8c2b5] bg-[#f7f4ec] p-7 md:p-9">
        <dl className="grid gap-6 md:grid-cols-2">
          <AccountField
            label={
              dictionary.dashboard.nickname
            }
            value={user.nickname}
          />

          <AccountField
            label={
              dictionary.dashboard.email
            }
            value={user.email}
          />

          <AccountField
            label={
              dictionary.dashboard
                .verificationStatus
            }
            value={
              user.emailVerified
                ? dictionary.dashboard
                    .verified
                : dictionary.dashboard
                    .unverified
            }
          />

          <AccountField
            label={
              dictionary.dashboard.createdAt
            }
            value={createdAt}
          />
        </dl>

        {!user.emailVerified ? (
          <div className="mt-8 border-l-4 border-[#a64a2c] bg-[#fff5f2] p-5">
            <p className="font-semibold text-[#7f3e33]">
              {
                dictionary.dashboard
                  .unverified
              }
            </p>

            <p className="mt-2 leading-7 text-[#596158]">
              {
                dictionary.dashboard
                  .unverifiedLimitation
              }
            </p>

            <ButtonLink
              href="/account/verify-email"
              className="mt-5"
            >
              {
                dictionary.dashboard
                  .verifyEmail
              }
            </ButtonLink>
          </div>
        ) : null}

        {actionError ? (
          <p
            role="alert"
            className="mt-6 text-sm text-[#7f3e33]"
          >
            {actionError}
          </p>
        ) : null}

        <button
          type="button"
          disabled={loggingOut}
          onClick={() =>
            void handleLogout()
          }
          className="mt-8 min-h-12 border border-[#34483a] px-5 text-xs font-bold uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loggingOut
            ? dictionary.dashboard
                .loggingOut
            : dictionary.dashboard.logout}
        </button>
      </section>

      <section>
        <h2 className="text-3xl font-semibold">
          {
            dictionary.dashboard.history
              .title
          }
        </h2>

        <p className="mt-3 leading-7 text-[#596158]">
          {
            dictionary.dashboard.history
              .description
          }
        </p>

        {historyStatus === "loading" ||
        historyStatus === "idle" ? (
          <Notice className="mt-6">
            {
              dictionary.dashboard.history
                .loading
            }
          </Notice>
        ) : null}

        {historyStatus === "error" ? (
          <Notice className="mt-6">
            <p role="alert">
              {
                dictionary.dashboard
                  .history.error
              }
            </p>

            <button
              type="button"
              onClick={() =>
                void loadResources()
              }
              className="mt-5 min-h-11 border border-[#34483a] px-5 text-xs font-bold uppercase tracking-[0.14em]"
            >
              {
                dictionary.dashboard
                  .history.retry
              }
            </button>
          </Notice>
        ) : null}

        {historyStatus === "ready" &&
        totalRecords === 0 ? (
          <Notice className="mt-6">
            {
              dictionary.dashboard.history
                .empty
            }
          </Notice>
        ) : null}

        {historyStatus === "ready" &&
        totalRecords > 0 ? (
          <div className="mt-7 grid gap-8">
            <HistoryGroup
              title={
                dictionary.dashboard.history
                  .personality
              }
              emptyLabel={
                dictionary.dashboard.history
                  .empty
              }
            >
              {resources.personality.map(
                (item) => (
                  <HistoryCard
                    key={item.resourceId}
                    title={item.type}
                    savedLabel={
                      dictionary.dashboard
                        .history.saved
                    }
                    dateLabel={formatAccountDate(
                      item.createdAt,
                      dictionary.dateLocale,
                    )}
                    href={`/personality/result/${item.resourceId}`}
                    actionLabel={
                      dictionary.dashboard
                        .history.openResult
                    }
                  />
                ),
              )}
            </HistoryGroup>

            <HistoryGroup
              title={
                dictionary.dashboard.history
                  .career
              }
              emptyLabel={
                dictionary.dashboard.history
                  .empty
              }
            >
              {resources.career.map(
                (item) => (
                  <HistoryCard
                    key={item.resourceId}
                    title={item.code}
                    savedLabel={
                      dictionary.dashboard
                        .history.saved
                    }
                    dateLabel={formatAccountDate(
                      item.createdAt,
                      dictionary.dateLocale,
                    )}
                    href={`/career/result/${item.resourceId}`}
                    actionLabel={
                      dictionary.dashboard
                        .history.openResult
                    }
                  />
                ),
              )}
            </HistoryGroup>

            <HistoryGroup
              title={
                dictionary.dashboard.history
                  .zodiac
              }
              emptyLabel={
                dictionary.dashboard.history
                  .empty
              }
            >
              {resources.zodiac.map(
                (item) => (
                  <HistoryCard
                    key={item.resourceId}
                    title={
                      dictionary.dashboard
                        .history.zodiac
                    }
                    savedLabel={
                      dictionary.dashboard
                        .history.saved
                    }
                    dateLabel={formatAccountDate(
                      item.createdAt,
                      dictionary.dateLocale,
                    )}
                    detail={`${dictionary.dashboard.history.schemaVersion}: ${item.schemaVersion}`}
                    href={`/zodiac/result/${item.resourceId}`}
                    actionLabel={
                      dictionary.dashboard
                        .history.openResult
                    }
                  />
                ),
              )}
            </HistoryGroup>
          </div>
        ) : null}
      </section>

      <section>
        <h2 className="text-3xl font-semibold">
          {
            dictionary.dashboard
              .upcomingTitle
          }
        </h2>

        <p className="mt-3 leading-7 text-[#596158]">
          {
            dictionary.dashboard
              .upcomingDescription
          }
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {dictionary.dashboard.modules
            .filter(
              (module) =>
                module.id !==
                "test-history",
            )
            .map((module) => (
              <article
                key={module.id}
                className="border border-[#c8c2b5] bg-[#f7f4ec] p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a64a2c]">
                  {
                    dictionary.dashboard
                      .nextPhase
                  }
                </p>

                <h3 className="mt-3 text-xl font-semibold">
                  {module.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#596158]">
                  {module.description}
                </p>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}

function HistoryGroup({
  title,
  emptyLabel,
  children,
}: {
  title: string;
  emptyLabel: string;
  children: React.ReactNode;
}) {
  const records =
    Array.isArray(children)
      ? children
      : [children];

  const visibleRecords =
    records.filter(Boolean);

  return (
    <section>
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      {visibleRecords.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {children}
        </div>
      ) : (
        <p className="mt-3 text-sm text-[#6d746b]">
          {emptyLabel}
        </p>
      )}
    </section>
  );
}

function HistoryCard({
  title,
  savedLabel,
  dateLabel,
  detail,
  href,
  actionLabel,
  unavailable,
}: {
  title: string;
  savedLabel: string;
  dateLabel: string;
  detail?: string;
  href?: string;
  actionLabel?: string;
  unavailable?: string;
}) {
  return (
    <article className="border border-[#c8c2b5] bg-[#f7f4ec] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a64a2c]">
        {savedLabel}
      </p>

      <h4 className="mt-3 text-2xl font-semibold">
        {title}
      </h4>

      <p className="mt-3 text-sm text-[#596158]">
        {dateLabel}
      </p>

      {detail ? (
        <p className="mt-2 text-xs text-[#6d746b]">
          {detail}
        </p>
      ) : null}

      {href && actionLabel ? (
        <Link
          href={href}
          className="mt-5 inline-flex min-h-11 items-center border border-[#34483a] px-5 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#34483a] hover:text-white"
        >
          {actionLabel}
        </Link>
      ) : null}

      {unavailable ? (
        <p className="mt-5 text-sm leading-6 text-[#7f3e33]">
          {unavailable}
        </p>
      ) : null}
    </article>
  );
}

function AccountField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d746b]">
        {label}
      </dt>

      <dd className="mt-2 break-words text-lg font-semibold">
        {value}
      </dd>
    </div>
  );
}

function Notice({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-[#c8c2b5] bg-[#f7f4ec] p-7 leading-7 md:p-9 ${className}`}
    >
      {children}
    </div>
  );
}

function formatAccountDate(
  value: string,
  dateLocale: "en" | "zh-CN",
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(
    dateLocale,
    {
      dateStyle: "medium",
    },
  ).format(date);
}
