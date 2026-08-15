import {
  resolvePreferenceBandVariableForLocale,
} from "../src/data/report/shared/preference-band-locale";

const directions = [
  "I",
  "E",
  "N",
  "S",
  "T",
  "F",
  "J",
  "P",
] as const;

const cases = [
  {
    clarity: 25,
    band: "near-boundary",
    en: "Near Boundary",
    zh: "接近边界",
  },
  {
    clarity: 25.01,
    band: "moderate-preference",
    en: "Moderate Preference",
    zh: "温和偏好",
  },
  {
    clarity: 50,
    band: "moderate-preference",
    en: "Moderate Preference",
    zh: "温和偏好",
  },
  {
    clarity: 50.01,
    band: "clear-preference",
    en: "Clear Preference",
    zh: "明显偏好",
  },
  {
    clarity: 75,
    band: "clear-preference",
    en: "Clear Preference",
    zh: "明显偏好",
  },
  {
    clarity: 75.01,
    band: "highly-clear",
    en: "Highly Clear",
    zh: "高度清晰",
  },
] as const;

let boundaryChecks = 0;
let matrixChecks = 0;

for (const testCase of cases) {
  const en = resolvePreferenceBandVariableForLocale(
    "I",
    testCase.clarity,
    "en",
  );

  const zh = resolvePreferenceBandVariableForLocale(
    "I",
    testCase.clarity,
    "zh",
  );

  if (en.band !== testCase.band) {
    throw new Error(
      `EN band mismatch at ${testCase.clarity}: ` +
        `${en.band} !== ${testCase.band}`,
    );
  }

  if (zh.band !== testCase.band) {
    throw new Error(
      `ZH band mismatch at ${testCase.clarity}: ` +
        `${zh.band} !== ${testCase.band}`,
    );
  }

  if (en.bandLabel !== testCase.en) {
    throw new Error(
      `EN label mismatch at ${testCase.clarity}: ` +
        `${en.bandLabel} !== ${testCase.en}`,
    );
  }

  if (zh.bandLabel !== testCase.zh) {
    throw new Error(
      `ZH label mismatch at ${testCase.clarity}: ` +
        `${zh.bandLabel} !== ${testCase.zh}`,
    );
  }

  boundaryChecks += 2;
}

const bandSamples = [
  {
    clarity: 10,
    band: "near-boundary",
  },
  {
    clarity: 35,
    band: "moderate-preference",
  },
  {
    clarity: 65,
    band: "clear-preference",
  },
  {
    clarity: 90,
    band: "highly-clear",
  },
] as const;

for (const direction of directions) {
  for (const sample of bandSamples) {
    const en = resolvePreferenceBandVariableForLocale(
      direction,
      sample.clarity,
      "en",
    );

    const zh = resolvePreferenceBandVariableForLocale(
      direction,
      sample.clarity,
      "zh",
    );

    if (en.direction !== direction || zh.direction !== direction) {
      throw new Error(
        `Direction mismatch for ${direction}/${sample.band}`,
      );
    }

    if (en.band !== sample.band || zh.band !== sample.band) {
      throw new Error(
        `Band mismatch for ${direction}/${sample.band}`,
      );
    }

    if (!en.bandLabel.trim() || !zh.bandLabel.trim()) {
      throw new Error(
        `Missing localized label for ${direction}/${sample.band}`,
      );
    }

    if (en.content.trim().length < 120) {
      throw new Error(
        `English content too short for ${direction}/${sample.band}`,
      );
    }

    if (zh.content.trim().length < 40) {
      throw new Error(
        `Chinese content too short for ${direction}/${sample.band}`,
      );
    }

    if (en.content === zh.content) {
      throw new Error(
        `EN/ZH content unexpectedly identical for ` +
          `${direction}/${sample.band}`,
      );
    }

    matrixChecks += 2;
  }
}

console.log(`BOUNDARY_CHECKS=${boundaryChecks}`);
console.log(`LOCALE_BAND_MATRIX_CHECKS=${matrixChecks}`);
console.log("PERSONALITY_REPORT_LOCALE_BAND_CONTRACT=PASS");
