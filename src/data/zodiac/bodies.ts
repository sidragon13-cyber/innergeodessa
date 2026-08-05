import type {
  AstrologyBodyCode,
  ChartPointCode,
} from "./types";

export interface AstrologyBodyDefinition {
  id: AstrologyBodyCode;
  category: "luminary" | "personal-planet";
  supportsRetrograde: boolean;
}

export interface ChartPointDefinition {
  id: ChartPointCode;
  category:
    | AstrologyBodyDefinition["category"]
    | "angle";
}

export const astrologyBodies: Readonly<
  Record<AstrologyBodyCode, AstrologyBodyDefinition>
> = Object.freeze({
  sun: {
    id: "sun",
    category: "luminary",
    supportsRetrograde: false,
  },
  moon: {
    id: "moon",
    category: "luminary",
    supportsRetrograde: false,
  },
  mercury: {
    id: "mercury",
    category: "personal-planet",
    supportsRetrograde: true,
  },
  venus: {
    id: "venus",
    category: "personal-planet",
    supportsRetrograde: true,
  },
  mars: {
    id: "mars",
    category: "personal-planet",
    supportsRetrograde: true,
  },
});

export const chartPoints: Readonly<
  Record<ChartPointCode, ChartPointDefinition>
> = Object.freeze({
  sun: {
    id: "sun",
    category: "luminary",
  },
  moon: {
    id: "moon",
    category: "luminary",
  },
  mercury: {
    id: "mercury",
    category: "personal-planet",
  },
  venus: {
    id: "venus",
    category: "personal-planet",
  },
  mars: {
    id: "mars",
    category: "personal-planet",
  },
  ascendant: {
    id: "ascendant",
    category: "angle",
  },
});
