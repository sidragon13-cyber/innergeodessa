import {
  AstroTime,
  CombineRotation,
  Rotation_ECT_EQJ,
  Rotation_EQJ_HOR,
  Vector,
} from "astronomy-engine";

import type {
  Observer,
  RotationMatrix,
} from "astronomy-engine";

/**
 * Builds the explicit frame chain used by tropical chart angles:
 *
 * true ecliptic of date (ECT) -> J2000 equator (EQJ) -> horizon (HOR).
 */
export function rotationEclipticOfDateToHorizon(
  utcDate: Date,
  observer: Observer,
): RotationMatrix {
  return CombineRotation(
    Rotation_ECT_EQJ(utcDate),
    Rotation_EQJ_HOR(
      utcDate,
      observer,
    ),
  );
}

export function eclipticOfDateVector(
  longitudeDegrees: number,
  astroTime: AstroTime,
): Vector {
  const radians =
    longitudeDegrees *
    Math.PI /
    180;

  return new Vector(
    Math.cos(radians),
    Math.sin(radians),
    0,
    astroTime,
  );
}
