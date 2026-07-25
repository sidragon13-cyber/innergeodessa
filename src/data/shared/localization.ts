export const supportedLocales = ["en", "zh"] as const;

export type SupportedLocale =
  (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "en";

export type LocalizedText = Partial<
  Record<SupportedLocale, string>
>;

export type LocalizedStringList = Partial<
  Record<SupportedLocale, string[]>
>;

export function normalizeLocale(
  locale: string | null | undefined,
): SupportedLocale {
  return locale === "zh" ? "zh" : defaultLocale;
}

export function getLocalizedText(
  content: LocalizedText,
  locale: SupportedLocale,
): string {
  return (
    content[locale] ??
    content[defaultLocale] ??
    ""
  );
}

export function getLocalizedStringList(
  content: LocalizedStringList,
  locale: SupportedLocale,
): string[] {
  return (
    content[locale] ??
    content[defaultLocale] ??
    []
  );
}
