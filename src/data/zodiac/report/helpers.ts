import type {
  ZodiacPosition,
} from "../result-contract";

import type {
  ZodiacSign,
} from "../types";

export const ZODIAC_SIGN_NAMES:
  Readonly<Record<ZodiacSign, string>> =
  Object.freeze({
    aries: "Aries",
    taurus: "Taurus",
    gemini: "Gemini",
    cancer: "Cancer",
    leo: "Leo",
    virgo: "Virgo",
    libra: "Libra",
    scorpio: "Scorpio",
    sagittarius: "Sagittarius",
    capricorn: "Capricorn",
    aquarius: "Aquarius",
    pisces: "Pisces",
  });

export function getZodiacSignName(
  sign: ZodiacSign,
): string {
  return ZODIAC_SIGN_NAMES[sign];
}

export function formatZodiacPosition(
  position: ZodiacPosition,
): string {
  return `${getZodiacSignName(
    position.sign,
  )} ${position.degree}° ${position.minute}′ ${position.second}″`;
}

export function formatList(
  items: readonly string[],
): string {
  return items
    .map((item) => `• ${item}`)
    .join("\n");
}

export function joinNatural(
  items: readonly string[],
): string {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0] ?? "";
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items
    .slice(0, -1)
    .join(", ")}, and ${items.at(-1)}`;
}

export function unique(
  items: readonly string[],
): string[] {
  return [...new Set(items)];
}
