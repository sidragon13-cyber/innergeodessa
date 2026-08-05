import type {
  AstrologyBodyCode,
  ZodiacSign,
} from "../../types";

export type ZodiacKnowledgeCategory =
  | "identity"
  | "strength"
  | "challenge"
  | "communication"
  | "career"
  | "relationship"
  | "growth";

export interface PlanetSignKnowledge {
  /**
   * Stable machine-readable identifier.
   * Example: "sun-aries".
   */
  id: string;

  /**
   * Planet or astrological body being interpreted.
   */
  planet: AstrologyBodyCode;

  /**
   * Zodiac sign occupied by the planet.
   */
  sign: ZodiacSign;

  /**
   * Short concepts used by report and narrative layers.
   */
  keywords: readonly string[];

  /**
   * Core interpretation of this planet-sign placement.
   */
  identity: readonly string[];

  strengths: readonly string[];

  challenges: readonly string[];

  communication: readonly string[];

  career: readonly string[];

  relationships: readonly string[];

  growth: readonly string[];
}

export type PlanetSignKnowledgeMap =
  Readonly<
    Partial<
      Record<
        ZodiacSign,
        PlanetSignKnowledge
      >
    >
  >;
