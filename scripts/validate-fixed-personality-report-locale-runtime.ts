import assert from "node:assert/strict";

import {
  FIXED_PERSONALITY_REPORT_MARKDOWN,
} from "../src/data/report/fixed-assets/generated-report-markdown";

type RuntimeAssetRegistry = Readonly<{
  zh: Readonly<Record<string, Readonly<Record<string, {
    readonly sourcePath: string;
    readonly markdown: string;
  }>>>>;
  en: Readonly<Record<string, Readonly<Record<string, {
    readonly sourcePath: string;
    readonly markdown: string;
  }>>>>;
}>;

console.log(
  "===== FIXED PERSONALITY REPORT LOCALE RUNTIME VALIDATION =====",
);

const registry =
  FIXED_PERSONALITY_REPORT_MARKDOWN as unknown as RuntimeAssetRegistry;

assert.ok(
  registry.zh,
  "Expected fixed report registry to contain zh locale assets.",
);

assert.ok(
  registry.en,
  "Expected fixed report registry to contain en locale assets.",
);

const zh = registry.zh.INTJ?.A;
const en = registry.en.INTJ?.A;

assert.ok(
  zh,
  "Expected zh INTJ Profile A fixed report asset.",
);

assert.ok(
  en,
  "Expected en INTJ Profile A fixed report asset.",
);

assert.match(
  zh.sourcePath,
  /final-report\/intj\/InnerGeo_INTJ_Profile_A_FINAL_Customer_v1\.md$/,
);

assert.match(
  en.sourcePath,
  /final-report\/en\/intj\/InnerGeo_INTJ_Profile_A_FINAL_Customer_v1\.md$/,
);

assert.match(
  zh.markdown,
  /^# InnerGeo INTJ 专业人格报告/m,
);

assert.match(
  en.markdown,
  /^# InnerGeo INTJ Professional Personality Report/m,
);

assert.ok(
  zh.markdown.includes("{{I_BAND_CN}}"),
  "Expected Chinese fixed report to use BAND_CN.",
);

assert.ok(
  en.markdown.includes("{{I_BAND_EN}}"),
  "Expected English fixed report to use BAND_EN.",
);

assert.equal(
  /[\u3400-\u4dbf\u4e00-\u9fff]/u.test(en.markdown),
  false,
  "English fixed report asset must not contain Chinese characters.",
);

console.log("ZH_ASSET=PASS");
console.log("EN_ASSET=PASS");
console.log("RESULT=PASS");

import {
  resolveFixedPersonalityReport,
} from "../src/data/report/fixed-assets/fixed-report-resolver";

console.log("===== RESOLVER LOCALE ROUTING =====");

const dimensions = {
  EI: { confidence: 80 },
  SN: { confidence: 80 },
  TF: { confidence: 80 },
  JP: { confidence: 80 },
} as any;

const resolvedZh =
  resolveFixedPersonalityReport(
    "INTJ",
    dimensions,
    "zh",
  );

const resolvedEn =
  resolveFixedPersonalityReport(
    "INTJ",
    dimensions,
    "en",
  );

assert.match(
  resolvedZh.markdown,
  /^# InnerGeo INTJ 专业人格报告/m,
);

assert.match(
  resolvedEn.markdown,
  /^# InnerGeo INTJ Professional Personality Report/m,
);

assert.ok(
  resolvedZh.sourcePath.includes(
    "/final-report/intj/",
  ),
  "Chinese resolver must select zh source asset.",
);

assert.ok(
  resolvedEn.sourcePath.includes(
    "/final-report/en/intj/",
  ),
  "English resolver must select en source asset.",
);

assert.equal(
  /\{\{[A-Z]+_(?:SCORE|BAND_CN|BAND_EN|BAND_BLOCK)\}\}/
    .test(resolvedZh.markdown),
  false,
  "Chinese resolved report must contain no unresolved variables.",
);

assert.equal(
  /\{\{[A-Z]+_(?:SCORE|BAND_CN|BAND_EN|BAND_BLOCK)\}\}/
    .test(resolvedEn.markdown),
  false,
  "English resolved report must contain no unresolved variables.",
);

assert.equal(
  /[\u3400-\u4dbf\u4e00-\u9fff]/u
    .test(resolvedEn.markdown),
  false,
  "Resolved English report must contain no Chinese characters.",
);

console.log("ZH_RESOLVER=PASS");
console.log("EN_RESOLVER=PASS");
console.log("RESOLVER_RESULT=PASS");

import {
  buildFixedPersonalityReportPayload,
} from "../src/data/report/fixed-assets/fixed-report-payload";

console.log("===== PAYLOAD LOCALE ROUTING =====");

const zhPayload =
  buildFixedPersonalityReportPayload(
    "INTJ",
    dimensions,
    "zh",
  );

const enPayload =
  buildFixedPersonalityReportPayload(
    "INTJ",
    dimensions,
    "en",
  );

const zhExpectedSha =
  (registry.zh.INTJ.D as any).sha256;

const enExpectedSha =
  (registry.en.INTJ.D as any).sha256;

assert.equal(
  zhPayload.profile,
  "D",
  "Expected INTJ test fixture to resolve Profile D.",
);

assert.equal(
  enPayload.profile,
  "D",
  "Locale must not change Profile routing.",
);

assert.equal(
  zhPayload.sourceSha256,
  zhExpectedSha,
  "Chinese payload must use the Chinese fixed report asset.",
);

assert.equal(
  enPayload.sourceSha256,
  enExpectedSha,
  "English payload must use the English fixed report asset.",
);

assert.notEqual(
  zhPayload.sourceSha256,
  enPayload.sourceSha256,
  "Chinese and English payloads must resolve different audited source assets.",
);

console.log("ZH_PAYLOAD=PASS");
console.log("EN_PAYLOAD=PASS");
console.log("PAYLOAD_RESULT=PASS");

console.log("===== API LOCALE FORWARDING =====");

const fs =
  require("node:fs");

const accountRoute =
  fs.readFileSync(
    "src/app/api/account/personality-report/[sessionId]/route.ts",
    "utf8",
  );

const previewRoute =
  fs.readFileSync(
    "src/app/api/dev/personality-report-preview/[sessionId]/route.ts",
    "utf8",
  );

assert.doesNotMatch(
  accountRoute,
  /resultData\.language/,
  "Account report API must not read locale from PersonalityResultContract.",
);

assert.match(
  accountRoute,
  /searchParams\.get\(\s*["']locale["']\s*\)/,
  "Account report API must read locale from the report request.",
);

assert.match(
  accountRoute,
  /buildFixedPersonalityReportPayload\([\s\S]*?resultData\.type,[\s\S]*?createReportDimensions\([\s\S]*?resultData,[\s\S]*?\),[\s\S]*?reportLocale,[\s\S]*?\)/,
  "Account report API must forward reportLocale into the fixed report payload.",
);

assert.doesNotMatch(
  previewRoute,
  /input\.language/,
  "Preview report API must not read locale from PersonalityResultContract.",
);

assert.match(
  previewRoute,
  /locale/,
  "Preview report API must receive locale separately from the assessment result.",
);

assert.match(
  previewRoute,
  /buildFixedPersonalityReportPayload\([\s\S]*?createReportDimensions\([\s\S]*?reportResult[\s\S]*?\),[\s\S]*?reportLocale,[\s\S]*?\)/,
  "Preview report API must forward separate reportResult and reportLocale inputs.",
);

console.log("ACCOUNT_API_LOCALE=PASS");
console.log("PREVIEW_API_LOCALE=PASS");
console.log("API_LOCALE_RESULT=PASS");
