"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  defaultLocale,
  normalizeLocale,
  type SupportedLocale,
} from "@/data/shared";

const LOCALE_STORAGE_KEY = "innergeo-locale";

type LocaleContextValue = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
};

const LocaleContext =
  createContext<LocaleContextValue | null>(null);

export interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({
  children,
}: LocaleProviderProps) {
  const [locale, setLocaleState] =
    useState<SupportedLocale>(defaultLocale);

  useEffect(() => {
    let active = true;

    const storedLocale =
      window.localStorage.getItem(LOCALE_STORAGE_KEY);

    const browserLocale =
      window.navigator.language
        .toLowerCase()
        .startsWith("zh")
        ? "zh"
        : defaultLocale;

    const initialLocale =
      normalizeLocale(storedLocale ?? browserLocale);

    queueMicrotask(() => {
      if (active) {
        setLocaleState(initialLocale);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const setLocale = useCallback(
    (nextLocale: SupportedLocale) => {
      window.localStorage.setItem(
        LOCALE_STORAGE_KEY,
        nextLocale,
      );
      setLocaleState(nextLocale);
    },
    [],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error(
      "useLocale must be used inside LocaleProvider.",
    );
  }

  return context;
}
