import type {
  AstrologyResultContract,
} from "./result-contract";

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isFiniteNumber(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value)
  );
}

function isZodiacPosition(
  value: unknown,
): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.sign === "string" &&
    isFiniteNumber(
      value.absoluteLongitude,
    ) &&
    isFiniteNumber(value.degree) &&
    isFiniteNumber(value.minute) &&
    isFiniteNumber(value.second)
  );
}

function isPlanetPosition(
  value: unknown,
): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.body === "string" &&
    isRecord(value.ecliptic) &&
    isZodiacPosition(value.zodiac) &&
    typeof value.retrograde ===
      "boolean"
  );
}

function isAnglePosition(
  value: unknown,
  expectedPoint: string,
): boolean {
  return (
    isRecord(value) &&
    value.point === expectedPoint &&
    isZodiacPosition(value.zodiac)
  );
}

export function getZodiacChartStorageKey(
  chartId: string,
): string {
  return `innergeodessa-zodiac-result-${chartId}`;
}

export function isAstrologyResultContract(
  value: unknown,
): value is AstrologyResultContract {
  if (
    !isRecord(value) ||
    value.schemaVersion !== "1.0.0" ||
    value.module !== "zodiac" ||
    value.calculationType !==
      "natal-chart" ||
    typeof value.calculatedAt !==
      "string" ||
    !isRecord(value.input) ||
    !isRecord(value.planets) ||
    !isRecord(value.angles) ||
    !isRecord(value.engine) ||
    !Array.isArray(
      value.limitations,
    )
  ) {
    return false;
  }

  const input = value.input;
  const planets = value.planets;
  const angles = value.angles;
  const engine = value.engine;

  return (
    typeof input.localDateTime ===
      "string" &&
    (
      input.utcDateTime === null ||
      typeof input.utcDateTime ===
        "string"
    ) &&
    (
      input.timeZone === null ||
      typeof input.timeZone ===
        "string"
    ) &&
    (
      input.latitude === null ||
      isFiniteNumber(
        input.latitude,
      )
    ) &&
    (
      input.longitude === null ||
      isFiniteNumber(
        input.longitude,
      )
    ) &&
    typeof input.timePrecision ===
      "string" &&
    isPlanetPosition(planets.sun) &&
    isPlanetPosition(planets.moon) &&
    isPlanetPosition(
      planets.mercury,
    ) &&
    isPlanetPosition(planets.venus) &&
    isPlanetPosition(planets.mars) &&
    isAnglePosition(
      angles.ascendant,
      "ascendant",
    ) &&
    isAnglePosition(
      angles.descendant,
      "descendant",
    ) &&
    isAnglePosition(
      angles.midheaven,
      "midheaven",
    ) &&
    isAnglePosition(
      angles.imumCoeli,
      "imum-coeli",
    ) &&
    typeof engine.name === "string" &&
    typeof engine.version ===
      "string" &&
    typeof engine.ephemeris ===
      "string"
  );
}

function getBrowserStorage():
  | {
      session: Storage;
      local: Storage;
    }
  | null {
  if (
    typeof window === "undefined"
  ) {
    return null;
  }

  return {
    session:
      window.sessionStorage,
    local:
      window.localStorage,
  };
}

export function writeStoredZodiacChart(
  chartId: string,
  result: AstrologyResultContract,
): void {
  const storage =
    getBrowserStorage();

  if (!storage) {
    return;
  }

  const key =
    getZodiacChartStorageKey(
      chartId,
    );

  const serialized =
    JSON.stringify(result);

  storage.session.setItem(
    key,
    serialized,
  );

  storage.local.setItem(
    key,
    serialized,
  );
}

export function removeStoredZodiacChart(
  chartId: string,
): void {
  const storage =
    getBrowserStorage();

  if (!storage) {
    return;
  }

  const key =
    getZodiacChartStorageKey(
      chartId,
    );

  storage.session.removeItem(key);
  storage.local.removeItem(key);
}

export function readStoredZodiacChart(
  chartId: string,
): AstrologyResultContract | null {
  const storage =
    getBrowserStorage();

  if (!storage) {
    return null;
  }

  const key =
    getZodiacChartStorageKey(
      chartId,
    );

  try {
    const raw =
      storage.session.getItem(
        key,
      ) ??
      storage.local.getItem(key);

    if (!raw) {
      return null;
    }

    const parsed: unknown =
      JSON.parse(raw);

    if (
      !isAstrologyResultContract(
        parsed,
      )
    ) {
      removeStoredZodiacChart(
        chartId,
      );

      return null;
    }

    writeStoredZodiacChart(
      chartId,
      parsed,
    );

    return parsed;
  } catch {
    removeStoredZodiacChart(
      chartId,
    );

    return null;
  }
}
