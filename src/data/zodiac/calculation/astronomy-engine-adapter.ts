import {
  Body,
  Ecliptic,
  EclipticGeoMoon,
  GeoVector,
} from "astronomy-engine";

import {
  longitudeToZodiacSign,
  normalizeLongitude,
} from "../signs";

import type {
  EclipticPosition,
  PlanetPosition,
  ZodiacPosition,
} from "../result-contract";

import type {
  AstrologyBodyCode,
} from "../types";

const BODY_MAP: Readonly<
  Record<AstrologyBodyCode, Body>
> = Object.freeze({
  sun: Body.Sun,
  moon: Body.Moon,
  mercury: Body.Mercury,
  venus: Body.Venus,
  mars: Body.Mars,
});

const RETROGRADE_CAPABLE_BODIES =
  new Set<AstrologyBodyCode>([
    "mercury",
    "venus",
    "mars",
  ]);

const RETROGRADE_SAMPLE_HOURS = 12;

function vectorDistance(
  vector: {
    x: number;
    y: number;
    z: number;
  },
): number {
  return Math.sqrt(
    vector.x ** 2 +
      vector.y ** 2 +
      vector.z ** 2,
  );
}

function splitDegree(
  value: number,
): {
  degree: number;
  minute: number;
  second: number;
} {
  const degree = Math.floor(value);
  const minuteValue = (value - degree) * 60;
  const minute = Math.floor(minuteValue);

  let second = Math.round(
    (minuteValue - minute) * 60,
  );

  let normalizedDegree = degree;
  let normalizedMinute = minute;

  if (second === 60) {
    second = 0;
    normalizedMinute += 1;
  }

  if (normalizedMinute === 60) {
    normalizedMinute = 0;
    normalizedDegree += 1;
  }

  if (normalizedDegree === 30) {
    normalizedDegree = 0;
  }

  return {
    degree: normalizedDegree,
    minute: normalizedMinute,
    second,
  };
}

export function createZodiacPosition(
  longitude: number,
): ZodiacPosition {
  const absoluteLongitude =
    normalizeLongitude(longitude);

  const degreeWithinSign =
    absoluteLongitude % 30;

  const {
    degree,
    minute,
    second,
  } = splitDegree(degreeWithinSign);

  return {
    sign: longitudeToZodiacSign(
      absoluteLongitude,
    ),
    absoluteLongitude,
    degree,
    minute,
    second,
  };
}

export function calculateEclipticPosition(
  body: AstrologyBodyCode,
  date: Date,
): EclipticPosition {
  if (
    Number.isNaN(date.getTime())
  ) {
    throw new TypeError(
      "Calculation date must be valid.",
    );
  }

  if (body === "moon") {
    const moon = EclipticGeoMoon(date);

    return {
      longitude: normalizeLongitude(
        moon.lon,
      ),
      latitude: moon.lat,
      distanceAu: moon.dist,
    };
  }

  const vector = GeoVector(
    BODY_MAP[body],
    date,
    true,
  );

  const ecliptic = Ecliptic(vector);

  return {
    longitude: normalizeLongitude(
      ecliptic.elon,
    ),
    latitude: ecliptic.elat,
    distanceAu: vectorDistance(vector),
  };
}

/**
 * Returns the shortest signed angular movement.
 *
 * Positive means direct motion.
 * Negative means retrograde motion.
 */
export function signedAngularDifference(
  fromLongitude: number,
  toLongitude: number,
): number {
  const from =
    normalizeLongitude(fromLongitude);

  const to =
    normalizeLongitude(toLongitude);

  return (
    ((to - from + 540) % 360) - 180
  );
}

export function calculateRetrogradeStatus(
  body: AstrologyBodyCode,
  date: Date,
): boolean {
  if (
    !RETROGRADE_CAPABLE_BODIES.has(body)
  ) {
    return false;
  }

  const sampleMilliseconds =
    RETROGRADE_SAMPLE_HOURS *
    60 *
    60 *
    1000;

  const before = new Date(
    date.getTime() - sampleMilliseconds,
  );

  const after = new Date(
    date.getTime() + sampleMilliseconds,
  );

  const beforePosition =
    calculateEclipticPosition(
      body,
      before,
    );

  const afterPosition =
    calculateEclipticPosition(
      body,
      after,
    );

  const movement =
    signedAngularDifference(
      beforePosition.longitude,
      afterPosition.longitude,
    );

  return movement < 0;
}

export function calculatePlanetPosition(
  body: AstrologyBodyCode,
  date: Date,
): PlanetPosition {
  const ecliptic =
    calculateEclipticPosition(
      body,
      date,
    );

  return {
    body,
    ecliptic,
    zodiac: createZodiacPosition(
      ecliptic.longitude,
    ),
    retrograde:
      calculateRetrogradeStatus(
        body,
        date,
      ),
  };
}

export function calculateCorePlanetPositions(
  date: Date,
): Readonly<
  Record<
    AstrologyBodyCode,
    PlanetPosition
  >
> {
  return Object.freeze({
    sun: calculatePlanetPosition(
      "sun",
      date,
    ),
    moon: calculatePlanetPosition(
      "moon",
      date,
    ),
    mercury: calculatePlanetPosition(
      "mercury",
      date,
    ),
    venus: calculatePlanetPosition(
      "venus",
      date,
    ),
    mars: calculatePlanetPosition(
      "mars",
      date,
    ),
  });
}
