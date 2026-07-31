import type {
  AstrologyBodyCode,
  BirthTimePrecision,
  ZodiacSign,
} from "./types";

export interface EclipticPosition {
  longitude: number;
  latitude: number;
  distanceAu: number | null;
}

export interface ZodiacPosition {
  sign: ZodiacSign;

  /**
   * Absolute longitude within the 0°–360° zodiac.
   */
  absoluteLongitude: number;

  /**
   * Position within the current sign.
   */
  degree: number;
  minute: number;
  second: number;
}

export interface PlanetPosition {
  body: AstrologyBodyCode;
  ecliptic: EclipticPosition;
  zodiac: ZodiacPosition;
  retrograde: boolean;
}

export interface AscendantPosition {
  point: "ascendant";
  zodiac: ZodiacPosition;
}

export interface AstrologyCalculationInput {
  localDateTime: string;
  utcDateTime: string | null;
  timeZone: string | null;
  latitude: number | null;
  longitude: number | null;
  timePrecision: BirthTimePrecision;
}

export interface AstrologyEngineMetadata {
  name: string;
  version: string;
  ephemeris: string;
}

export interface AstrologyResultContract {
  schemaVersion: "1.0.0";
  module: "zodiac";
  calculationType: "natal-chart";
  calculatedAt: string;

  input: AstrologyCalculationInput;

  planets: Readonly<
    Record<AstrologyBodyCode, PlanetPosition>
  >;

  ascendant: AscendantPosition | null;

  limitations: readonly string[];

  engine: AstrologyEngineMetadata;
}
