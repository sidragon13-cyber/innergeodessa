import {
  AstroTime,
  Observer,
  RotateVector,
  Rotation_ECL_HOR,
  Vector,
} from "astronomy-engine";

import {
  createZodiacPosition,
} from "./astronomy-engine-adapter";

import type {
  AscendantPosition,
} from "../result-contract";

const VECTOR_EPSILON = 1e-12;
const HORIZON_EPSILON = 1e-9;

function assertFinite(
  value: number,
  name: string,
): void {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `${name} must be a finite number.`,
    );
  }
}

function validateCoordinates(
  latitude: number,
  longitude: number,
): void {
  assertFinite(latitude, "Latitude");
  assertFinite(longitude, "Longitude");

  if (
    latitude < -90 ||
    latitude > 90
  ) {
    throw new RangeError(
      "Latitude must be between -90 and 90 degrees.",
    );
  }

  if (
    longitude < -180 ||
    longitude > 180
  ) {
    throw new RangeError(
      "Longitude must be between -180 and 180 degrees.",
    );
  }
}

function normalizeDegrees(
  value: number,
): number {
  return (
    (value % 360) +
    360
  ) % 360;
}

function eclipticVector(
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

/**
 * Astronomy Engine stores rotation coefficients so that RotateVector
 * evaluates:
 *
 * output.x =
 *   rot[0][0] * input.x +
 *   rot[1][0] * input.y +
 *   rot[2][0] * input.z
 *
 * output.z =
 *   rot[0][2] * input.x +
 *   rot[1][2] * input.y +
 *   rot[2][2] * input.z
 *
 * For an ecliptic-plane vector:
 *
 * input = [cos λ, sin λ, 0]
 *
 * The horizon condition output.z = 0 therefore becomes:
 *
 * rot[0][2] cos λ +
 * rot[1][2] sin λ = 0
 */
function calculateHorizonIntersections(
  rotation: ReturnType<
    typeof Rotation_ECL_HOR
  >,
): readonly [number, number] {
  const a =
    rotation.rot[0][2];

  const b =
    rotation.rot[1][2];

  if (
    Math.abs(a) <
      VECTOR_EPSILON &&
    Math.abs(b) <
      VECTOR_EPSILON
  ) {
    throw new Error(
      "Unable to determine the ecliptic-horizon intersection.",
    );
  }

  const firstRadians =
    Math.atan2(
      -a,
      b,
    );

  const firstDegrees =
    normalizeDegrees(
      firstRadians *
        180 /
        Math.PI,
    );

  return [
    firstDegrees,
    normalizeDegrees(
      firstDegrees + 180,
    ),
  ];
}

export function calculateAscendant(
  utcDate: Date,
  latitude: number,
  longitude: number,
): AscendantPosition {
  if (
    !(utcDate instanceof Date) ||
    Number.isNaN(
      utcDate.getTime(),
    )
  ) {
    throw new TypeError(
      "UTC calculation date must be valid.",
    );
  }

  validateCoordinates(
    latitude,
    longitude,
  );

  const astroTime =
    new AstroTime(utcDate);

  const observer =
    new Observer(
      latitude,
      longitude,
      0,
    );

  const eclipticToHorizon =
    Rotation_ECL_HOR(
      utcDate,
      observer,
    );

  const candidates =
    calculateHorizonIntersections(
      eclipticToHorizon,
    );

  const evaluated =
    candidates.map(
      (candidate) => {
        const horizon =
          RotateVector(
            eclipticToHorizon,
            eclipticVector(
              candidate,
              astroTime,
            ),
          );

        return {
          longitude:
            candidate,
          horizon,
        };
      },
    );

  /*
   * Astronomy Engine horizontal coordinates:
   *
   * x = north
   * y = west
   * z = zenith
   *
   * The eastern intersection therefore has y < 0.
   */
  const rising =
    evaluated.find(
      (candidate) =>
        candidate.horizon.y < 0,
    );

  if (!rising) {
    throw new Error(
      "Unable to identify the eastern ecliptic-horizon intersection.",
    );
  }

  if (
    Math.abs(
      rising.horizon.z,
    ) > HORIZON_EPSILON
  ) {
    throw new Error(
      "Calculated ascendant does not lie on the geometric horizon.",
    );
  }

  return {
    point: "ascendant",
    zodiac:
      createZodiacPosition(
        rising.longitude,
      ),
  };
}
