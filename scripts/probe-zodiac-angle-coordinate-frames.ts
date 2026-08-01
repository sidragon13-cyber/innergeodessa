import {
  AstroTime,
  CombineRotation,
  Observer,
  RotateVector,
  Rotation_ECL_HOR,
  Rotation_ECT_EQJ,
  Rotation_EQJ_HOR,
  SiderealTime,
  Vector,
} from "astronomy-engine";

const utcDate =
  new Date("2026-07-30T12:00:00.000Z");

const observer =
  new Observer(
    -26.2041,
    28.0473,
    0,
  );

function normalize(value: number): number {
  return ((value % 360) + 360) % 360;
}

function intersections(
  rotation: ReturnType<
    typeof Rotation_ECL_HOR
  >,
  planeAxis: 1 | 2,
): readonly {
  longitude: number;
  horizon: Vector;
}[] {
  const radians = Math.atan2(
    -rotation.rot[0][planeAxis],
    rotation.rot[1][planeAxis],
  );

  const first = normalize(
    radians * 180 / Math.PI,
  );

  return [first, normalize(first + 180)]
    .map((longitude) => {
      const angle =
        longitude * Math.PI / 180;

      const candidate = new Vector(
        Math.cos(angle),
        Math.sin(angle),
        0,
        new AstroTime(utcDate),
      );

      return {
        longitude,
        horizon: RotateVector(
          rotation,
          candidate,
        ),
      };
    });
}

function selectedAngles(
  rotation: ReturnType<
    typeof Rotation_ECL_HOR
  >,
): {
  ascendant: number;
  midheaven: number;
} {
  const ascendant = intersections(
    rotation,
    2,
  ).find(({ horizon }) =>
    horizon.y < 0,
  );

  const midheaven = intersections(
    rotation,
    1,
  ).find(({ horizon }) =>
    horizon.z > 0,
  );

  if (!ascendant || !midheaven) {
    throw new Error(
      "Unable to select chart-angle intersections.",
    );
  }

  return {
    ascendant: ascendant.longitude,
    midheaven: midheaven.longitude,
  };
}

const oldRotation =
  Rotation_ECL_HOR(
    utcDate,
    observer,
  );

const ectToEqj =
  Rotation_ECT_EQJ(utcDate);

const eqjToHorizon =
  Rotation_EQJ_HOR(
    utcDate,
    observer,
  );

const fixedRotation =
  CombineRotation(
    ectToEqj,
    eqjToHorizon,
  );

const oldAngles =
  selectedAngles(oldRotation);

const fixedAngles =
  selectedAngles(fixedRotation);

console.dir({
  utc: utcDate.toISOString(),
  observer: {
    latitude: observer.latitude,
    longitude: observer.longitude,
    height: observer.height,
  },
  siderealTimeHours:
    SiderealTime(utcDate),
  frames: {
    old:
      "candidate treated as J2000 mean ecliptic (ECL) -> equatorial of date (EQD) -> horizontal (HOR)",
    fixed:
      "candidate true ecliptic of date (ECT) -> J2000 equator (EQJ) -> horizontal (HOR)",
    candidate:
      "[cos(lambda), sin(lambda), 0] in the named source ecliptic frame",
  },
  oldAngles,
  fixedAngles,
  movementDegrees: {
    ascendant:
      fixedAngles.ascendant -
      oldAngles.ascendant,
    midheaven:
      fixedAngles.midheaven -
      oldAngles.midheaven,
  },
  matrices: {
    oldEclToHorizon:
      oldRotation.rot,
    ectToEqj: ectToEqj.rot,
    eqjToHorizon:
      eqjToHorizon.rot,
    fixedEctToHorizon:
      fixedRotation.rot,
  },
}, {
  depth: null,
});
