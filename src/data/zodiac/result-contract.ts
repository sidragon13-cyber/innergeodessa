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

export interface DescendantPosition {
  point: "descendant";
  zodiac: ZodiacPosition;
}

export interface MidheavenPosition {
  point: "midheaven";
  zodiac: ZodiacPosition;
}

export interface ImumCoeliPosition {
  point: "imum-coeli";
  zodiac: ZodiacPosition;
}

export interface ChartAngles {
  ascendant: AscendantPosition;
  descendant: DescendantPosition;
  midheaven: MidheavenPosition;
  imumCoeli: ImumCoeliPosition;
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

  /**
   * Backward-compatible alias for angles.ascendant.
   */
  ascendant: AscendantPosition | null;

  angles: ChartAngles;

  limitations: readonly string[];

  engine: AstrologyEngineMetadata;
}
