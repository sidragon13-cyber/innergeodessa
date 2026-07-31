import type {
  ZodiacElement,
  ZodiacModality,
  ZodiacSign,
} from "./types";

export interface ZodiacSignDefinition {
  id: ZodiacSign;
  index: number;
  startLongitude: number;
  endLongitude: number;
  element: ZodiacElement;
  modality: ZodiacModality;
}

export const zodiacSignDefinitions: Readonly<
  Record<ZodiacSign, ZodiacSignDefinition>
> = Object.freeze({
  aries: {
    id: "aries",
    index: 0,
    startLongitude: 0,
    endLongitude: 30,
    element: "fire",
    modality: "cardinal",
  },
  taurus: {
    id: "taurus",
    index: 1,
    startLongitude: 30,
    endLongitude: 60,
    element: "earth",
    modality: "fixed",
  },
  gemini: {
    id: "gemini",
    index: 2,
    startLongitude: 60,
    endLongitude: 90,
    element: "air",
    modality: "mutable",
  },
  cancer: {
    id: "cancer",
    index: 3,
    startLongitude: 90,
    endLongitude: 120,
    element: "water",
    modality: "cardinal",
  },
  leo: {
    id: "leo",
    index: 4,
    startLongitude: 120,
    endLongitude: 150,
    element: "fire",
    modality: "fixed",
  },
  virgo: {
    id: "virgo",
    index: 5,
    startLongitude: 150,
    endLongitude: 180,
    element: "earth",
    modality: "mutable",
  },
  libra: {
    id: "libra",
    index: 6,
    startLongitude: 180,
    endLongitude: 210,
    element: "air",
    modality: "cardinal",
  },
  scorpio: {
    id: "scorpio",
    index: 7,
    startLongitude: 210,
    endLongitude: 240,
    element: "water",
    modality: "fixed",
  },
  sagittarius: {
    id: "sagittarius",
    index: 8,
    startLongitude: 240,
    endLongitude: 270,
    element: "fire",
    modality: "mutable",
  },
  capricorn: {
    id: "capricorn",
    index: 9,
    startLongitude: 270,
    endLongitude: 300,
    element: "earth",
    modality: "cardinal",
  },
  aquarius: {
    id: "aquarius",
    index: 10,
    startLongitude: 300,
    endLongitude: 330,
    element: "air",
    modality: "fixed",
  },
  pisces: {
    id: "pisces",
    index: 11,
    startLongitude: 330,
    endLongitude: 360,
    element: "water",
    modality: "mutable",
  },
});

export function normalizeLongitude(
  longitude: number,
): number {
  if (!Number.isFinite(longitude)) {
    throw new TypeError(
      "Longitude must be a finite number.",
    );
  }

  return ((longitude % 360) + 360) % 360;
}

export function longitudeToZodiacSign(
  longitude: number,
): ZodiacSign {
  const normalized = normalizeLongitude(longitude);
  const index = Math.floor(normalized / 30);

  return Object.values(zodiacSignDefinitions)[index].id;
}
