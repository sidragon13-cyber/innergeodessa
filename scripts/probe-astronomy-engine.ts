import {
  Body,
  Ecliptic,
  EclipticGeoMoon,
  GeoVector,
} from "astronomy-engine";

const calculationTime =
  new Date("2026-07-30T12:00:00.000Z");

const planetBodies = [
  Body.Sun,
  Body.Mercury,
  Body.Venus,
  Body.Mars,
] as const;

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

console.log(
  "Calculation time:",
  calculationTime.toISOString(),
);

for (const body of planetBodies) {
  const vector = GeoVector(
    body,
    calculationTime,
    true,
  );

  const ecliptic = Ecliptic(vector);

  console.log(body, {
    longitude: ecliptic.elon,
    latitude: ecliptic.elat,
    distanceAu: vectorDistance(vector),
  });
}

const moon = EclipticGeoMoon(calculationTime);

console.log(Body.Moon, {
  longitude: moon.lon,
  latitude: moon.lat,
  distanceAu: moon.dist,
});
