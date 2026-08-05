"use client";

import {
  useState,
  useSyncExternalStore,
  type ChangeEvent,
} from "react";

import {
  getPersonalityReportDictionary,
} from "@/data/i18n";
import type {
  SupportedLocale,
} from "@/data/shared";

const RECIPIENT_NAME_MAX_LENGTH = 80;
const RECIPIENT_NAME_CHANGE_EVENT =
  "personality-report-recipient-name-change";

export interface ReportRecipientNameProps {
  initialName?: string;
  locale: SupportedLocale;
  sessionId: string;
}

export function ReportRecipientName({
  initialName,
  locale,
  sessionId,
}: ReportRecipientNameProps) {
  const dictionary =
    getPersonalityReportDictionary(locale);
  const storageKey =
    `personality-report-recipient-name:${sessionId}`;
  const safeInitialName =
    initialName?.slice(0, RECIPIENT_NAME_MAX_LENGTH) ?? "";
  const storedName = useSyncExternalStore(
    subscribeToRecipientName,
    () =>
      readStoredName(storageKey)?.slice(
        0,
        RECIPIENT_NAME_MAX_LENGTH,
      ) ?? safeInitialName,
    () => safeInitialName,
  );
  const [draft, setDraft] = useState<{
    storageKey: string;
    value: string;
  } | null>(null);
  const name =
    draft?.storageKey === storageKey
      ? draft.value
      : storedName;

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const nextName = event.target.value.slice(
      0,
      RECIPIENT_NAME_MAX_LENGTH,
    );

    setDraft({ storageKey, value: nextName });
    storeName(storageKey, nextName);
  }

  return (
    <div className="report-recipient-name report-print-compact-block mb-6">
      <label
        htmlFor="report-recipient-name"
        className="block text-xs font-bold uppercase tracking-[0.16em] text-[#6d746b]"
      >
        {dictionary.recipient.label}
      </label>

      <input
        id="report-recipient-name"
        name="report-recipient-name"
        type="text"
        autoComplete="name"
        aria-label={dictionary.recipient.inputAriaLabel}
        maxLength={80}
        value={name}
        onChange={handleChange}
        className="report-recipient-name-input mt-2 w-full min-w-0 border-0 border-b border-[#a8a194] bg-transparent px-0 py-2 text-lg text-[#26372d] focus-visible:border-[#34483a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34483a]"
      />

      <p
        aria-hidden="true"
        className="report-recipient-name-print"
      >
        {name.trim() ? name : "\u00a0"}
      </p>
    </div>
  );
}

function readStoredName(storageKey: string): string | undefined {
  try {
    return sessionStorage.getItem(storageKey) ?? undefined;
  } catch {
    return undefined;
  }
}

function storeName(storageKey: string, name: string) {
  try {
    sessionStorage.setItem(storageKey, name);
    window.dispatchEvent(
      new Event(RECIPIENT_NAME_CHANGE_EVENT),
    );
  } catch {
    return;
  }
}

function subscribeToRecipientName(
  onStoreChange: () => void,
) {
  window.addEventListener(
    RECIPIENT_NAME_CHANGE_EVENT,
    onStoreChange,
  );

  return () => {
    window.removeEventListener(
      RECIPIENT_NAME_CHANGE_EVENT,
      onStoreChange,
    );
  };
}
