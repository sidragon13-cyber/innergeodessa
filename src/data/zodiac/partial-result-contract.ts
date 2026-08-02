import type {
  AstrologyEngineMetadata,
  AstrologyResultContract,
  PlanetPosition,
  ZodiacPosition,
} from "./result-contract";

import type {
  AstrologyBodyCode,
  ZodiacSign,
} from "./types";

export interface MoonDailyRange {
  startUtcDateTime: string;
  midpointUtcDateTime: string;
  endUtcDateTime: string;

  startPosition: ZodiacPosition;
  midpointPosition: ZodiacPosition;
  endPosition: ZodiacPosition;

  angularTravelDegrees: number;
  possibleSigns: readonly ZodiacSign[];
}

export interface PartialAstrologyCalculationInput {
  /**
   * A technical local reference time used only to calculate
   * planetary positions. It is not presented as the user's
   * actual birth time.
   */
  localDateTime: string;

  utcDateTime: string;
  timeZone: string;
  latitude: number;
  longitude: number;
  timePrecision: "unknown";
}

export interface PartialAstrologyResultContract {
  schemaVersion: "1.0.0";
  module: "zodiac";
  calculationType: "natal-chart-partial";
  calculatedAt: string;

  input: PartialAstrologyCalculationInput;

  planets: Readonly<
    Record<AstrologyBodyCode, PlanetPosition>
  >;

  /**
   * Birth time is unknown, so these values must never
   * be inferred from the technical reference time.
   */
  ascendant: null;
  angles: null;

  moonDailyRange: MoonDailyRange;

  limitations: readonly string[];

  engine: AstrologyEngineMetadata;
}

export type ZodiacChartResult =
  | AstrologyResultContract
  | PartialAstrologyResultContract;
