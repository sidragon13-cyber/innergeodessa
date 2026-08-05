"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLocale,
} from "@/components/locale";
import {
  getAccountDictionary,
} from "@/data/i18n";

import {
  useAuth,
} from "./auth-provider";

type AssessmentModule =
  | "personality"
  | "career";

type SaveState =
  | "idle"
  | "saving"
  | "saved"
  | "error";

type ClaimResponse = {
  resourceId?: string;
  module?: AssessmentModule;
  status?: "saved";
  claimedAt?: string;
  detail?: unknown;
};

export interface SaveAssessmentResultProps {
  module: AssessmentModule;
  sessionId: string;
  className?: string;
}

function getClaimStorageKey(
  module: AssessmentModule,
  sessionId: string,
): string {
  return `innergeo-claim:${module}:${sessionId}`;
}

function getSavedStorageKey(
  module: AssessmentModule,
  sessionId: string,
): string {
  return `innergeo-saved:${module}:${sessionId}`;
}

function readErrorMessage(
  payload: ClaimResponse | null,
  fallback: string,
): string {
  if (
    payload &&
    typeof payload.detail === "string" &&
    payload.detail.trim()
  ) {
    return payload.detail;
  }

  return fallback;
}

export function SaveAssessmentResult({
  module,
  sessionId,
  className = "",
}: SaveAssessmentResultProps) {
  const {
    status: authStatus,
    user,
  } = useAuth();
  const {
    locale,
  } = useLocale();
  const dictionary =
    getAccountDictionary(locale).ownership;

  const [saveState, setSaveState] =
    useState<SaveState>("idle");
  const [claimSecret, setClaimSecret] =
    useState<string | null>(null);
  const [errorMessage, setErrorMessage] =
    useState("");

  const resultPath = useMemo(
    () =>
      module === "personality"
        ? `/personality/result/${sessionId}`
        : `/career/result/${sessionId}`,
    [module, sessionId],
  );

  const loginHref =
    `/account/login?next=${encodeURIComponent(resultPath)}`;

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    let active = true;

    const saved =
      window.localStorage.getItem(
        getSavedStorageKey(module, sessionId),
      ) === "saved";

    const storedClaimSecret =
      saved
        ? null
        : window.sessionStorage.getItem(
            getClaimStorageKey(module, sessionId),
          );

    queueMicrotask(() => {
      if (!active) {
        return;
      }

      setSaveState(saved ? "saved" : "idle");
      setClaimSecret(storedClaimSecret);
    });

    return () => {
      active = false;
    };
  }, [module, sessionId]);

  async function saveResult(): Promise<void> {
    if (
      authStatus !== "authenticated" ||
      !user?.emailVerified ||
      !claimSecret ||
      saveState === "saving"
    ) {
      return;
    }

    setSaveState("saving");
    setErrorMessage("");

    try {
      const response = await fetch(
        "/api/account/claim-session",
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            claimSecret,
          }),
        },
      );

      let payload: ClaimResponse | null = null;

      try {
        payload =
          (await response.json()) as ClaimResponse;
      } catch {
        payload = null;
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            dictionary.loginRequired,
          );
        }

        if (response.status === 403) {
          throw new Error(
            user?.emailVerified
              ? dictionary.invalidCredential
              : dictionary.verificationRequired,
          );
        }

        throw new Error(
          readErrorMessage(
            payload,
            dictionary.error,
          ),
        );
      }

      if (
        payload?.status !== "saved" ||
        payload.resourceId !== sessionId
      ) {
        throw new Error(dictionary.error);
      }

      window.sessionStorage.removeItem(
        getClaimStorageKey(module, sessionId),
      );
      window.localStorage.setItem(
        getSavedStorageKey(module, sessionId),
        "saved",
      );

      setClaimSecret(null);
      setSaveState("saved");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : dictionary.error,
      );
      setSaveState("error");
    }
  }

  return (
    <aside
      className={`rounded-2xl border border-[#d8d2c6] bg-[#fbfaf7] p-5 text-[#26372d] ${className}`}
      aria-live="polite"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b5d4d]">
        {dictionary.eyebrow}
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        {saveState === "saved"
          ? dictionary.savedTitle
          : dictionary.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#657068]">
        {saveState === "saved"
          ? dictionary.savedDescription
          : dictionary.description}
      </p>

      {authStatus === "loading" ? (
        <p className="mt-4 text-sm font-semibold text-[#657068]">
          {dictionary.checkingAccount}
        </p>
      ) : null}

      {authStatus === "unauthenticated" ? (
        <Link
          href={loginHref}
          className="mt-5 inline-flex min-h-11 items-center justify-center border border-[#34483a] px-5 text-xs font-bold uppercase tracking-[0.13em] transition-colors hover:bg-[#34483a] hover:text-white"
        >
          {dictionary.loginAction}
        </Link>
      ) : null}

      {authStatus === "authenticated" &&
      user &&
      !user.emailVerified ? (
        <div className="mt-4">
          <p className="text-sm leading-6 text-[#8a4f43]">
            {dictionary.verificationRequired}
          </p>

          <Link
            href="/account/verify-email"
            className="mt-4 inline-flex min-h-11 items-center justify-center border border-[#34483a] px-5 text-xs font-bold uppercase tracking-[0.13em] transition-colors hover:bg-[#34483a] hover:text-white"
          >
            {dictionary.verificationAction}
          </Link>
        </div>
      ) : null}

      {authStatus === "authenticated" &&
      user?.emailVerified &&
      saveState !== "saved" &&
      !claimSecret ? (
        <p className="mt-4 text-sm leading-6 text-[#8a4f43]">
          {dictionary.missingCredential}
        </p>
      ) : null}

      {authStatus === "authenticated" &&
      user?.emailVerified &&
      claimSecret &&
      saveState !== "saved" ? (
        <button
          type="button"
          onClick={() => void saveResult()}
          disabled={saveState === "saving"}
          className="mt-5 inline-flex min-h-11 items-center justify-center bg-[#34483a] px-5 text-xs font-bold uppercase tracking-[0.13em] text-white disabled:cursor-wait disabled:opacity-65"
        >
          {saveState === "saving"
            ? dictionary.saving
            : saveState === "error"
              ? dictionary.retry
              : dictionary.save}
        </button>
      ) : null}

      {saveState === "error" && errorMessage ? (
        <p
          className="mt-4 text-sm leading-6 text-[#8a4f43]"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </aside>
  );
}
