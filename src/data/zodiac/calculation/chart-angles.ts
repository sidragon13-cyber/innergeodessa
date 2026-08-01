import {
  AstroTime,
  Observer,
  RotateVector,
  Rotation_ECL_HOR,
  Vector,
} from "astronomy-engine";

import type {
  ChartAngles,
  ImumCoeliPosition,
  MidheavenPosition,
} from "../result-contract";

import {
  normalizeLongitude,
} from "../signs";

import {
  calculateAscendant,
} from "./ascendant";

import {
  createZodiacPosition,
} from "./astronomy-engine-adapter";

const VECTOR_EPSILON = 1e-12;
const MERIDIAN_EPSILON = 1e-9;

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
 * Finds the two antipodal intersections between the ecliptic
 * and the observer's local meridian.
 *
 * Astronomy Engine horizontal coordinates:
 *
 * x = north
 * y = west
 * z = zenith
 *
 * The local meridian is therefore the plane y = 0.
 *
 * For an ecliptic unit vector:
 *
 * input = [cos λ, sin λ, 0]
 *
 * After rotation into horizontal coordinates:
 *
 * horizon.y =
 *   rot[0][1] cos λ +
 *   rot[1][1] sin λ
 *
 * Setting horizon.y = 0 gives two solutions separated by 180°.
 */
function calculateMeridianIntersections(
  rotation: ReturnType<
    typeof Rotation_ECL_HOR
  >,
): readonly [number, number] {
  const a =
    rotation.rot[0][1];

  const b =
    rotation.rot[1][1];

  if (
    Math.abs(a) <
      VECTOR_EPSILON &&
    Math.abs(b) <
      VECTOR_EPSILON
  ) {
    throw new Error(
      "Unable to determine the ecliptic-meridian intersection.",
    );
  }

  const firstRadians =
    Math.atan2(
      -a,
      b,
    );

  const firstDegrees =
    normalizeLongitude(
      firstRadians *
        180 /
        Math.PI,
    );

  return [
    firstDegrees,
    normalizeLongitude(
      firstDegrees + 180,
    ),
  ];
}

function calculateMidheaven(
  utcDate: Date,
  latitude: number,
  longitude: number,
): MidheavenPosition {
  const observer =
    new Observer(
      latitude,
      longitude,
      0,
    );

  const astroTime =
    new AstroTime(utcDate);

  const eclipticToHorizon =
    Rotation_ECL_HOR(
      utcDate,
      observer,
    );

  const candidates =
    calculateMeridianIntersections(
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
   * The Midheaven is the ecliptic-meridian intersection
   * above the geometric horizon.
   *
   * Its antipodal counterpart below the horizon is the IC.
   */
  const upperCulmination =
    evaluated.find(
      (candidate) =>
        candidate.horizon.z > 0,
    );

  if (!upperCulmination) {
    throw new Error(
      "Unable to identify the upper ecliptic-meridian intersection.",
    );
  }

  if (
    Math.abs(
      upperCulmination.horizon.y,
    ) > MERIDIAN_EPSILON
  ) {
    throw new Error(
      "Calculated Midheaven does not lie on the local meridian.",
    );
  }

  return {
    point: "midheaven",
    zodiac:
      createZodiacPosition(
        upperCulmination.longitude,
      ),
  };
}

function calculateImumCoeli(
  midheaven:
    MidheavenPosition,
): ImumCoeliPosition {
  return {
    point: "imum-coeli",
    zodiac:
      createZodiacPosition(
        midheaven.zodiac
          .absoluteLongitude +
          180,
      ),
  };
}

export function calculateChartAngles(
  utcDate: Date,
  latitude: number,
  longitude: number,
): ChartAngles {
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

  const ascendant =
    calculateAscendant(
      utcDate,
      latitude,
      longitude,
    );

  const descendant = {
    point: "descendant" as const,
    zodiac:
      createZodiacPosition(
        ascendant.zodiac
          .absoluteLongitude +
          180,
      ),
  };

  const midheaven =
    calculateMidheaven(
      utcDate,
      latitude,
      longitude,
    );

  const imumCoeli =
    calculateImumCoeli(
      midheaven,
    );

  return Object.freeze({
    ascendant,
    descendant,
    midheaven,
    imumCoeli,
  });
}
