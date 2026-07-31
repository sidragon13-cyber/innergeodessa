export const zodiacSigns = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const;

export type ZodiacSign = (typeof zodiacSigns)[number];

export const zodiacElements = [
  "fire",
  "earth",
  "air",
  "water",
] as const;

export type ZodiacElement =
  (typeof zodiacElements)[number];

export const zodiacModalities = [
  "cardinal",
  "fixed",
  "mutable",
] as const;

export type ZodiacModality =
  (typeof zodiacModalities)[number];

export const astrologyBodyCodes = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
] as const;

export type AstrologyBodyCode =
  (typeof astrologyBodyCodes)[number];

export const chartPointCodes = [
  ...astrologyBodyCodes,
  "ascendant",
] as const;

export type ChartPointCode =
  (typeof chartPointCodes)[number];

export const birthTimePrecisions = [
  "exact",
  "approximate",
  "unknown",
] as const;

export type BirthTimePrecision =
  (typeof birthTimePrecisions)[number];

export const supportedZodiacLocales = [
  "en",
  "zh",
] as const;

export type ZodiacLocale =
  (typeof supportedZodiacLocales)[number];
