import { readFileSync } from "node:fs";

const savePath =
  "src/components/account/save-assessment-result.tsx";

const resultPath =
  "src/app/personality/result/[sessionId]/page.tsx";

const saveSource =
  readFileSync(savePath, "utf8");

const resultSource =
  readFileSync(resultPath, "utf8");

const checks = [
  {
    name: "SAVE_COMPONENT_EXPOSES_ON_SAVED_CALLBACK",
    pass:
      /onSaved\?\s*:\s*\(\)\s*=>\s*void/.test(
        saveSource,
      ),
  },
  {
    name: "SAVE_COMPONENT_INVOKES_ON_SAVED_AFTER_SUCCESS",
    pass:
      /onSaved\?\.\(\)/.test(saveSource),
  },
  {
    name: "RESULT_PAGE_HAS_ACCESS_REFRESH_REVISION",
    pass:
      /premiumAccessRevision/.test(resultSource) &&
      /setPremiumAccessRevision/.test(resultSource),
  },
  {
    name: "PREMIUM_ACCESS_EFFECT_DEPENDS_ON_REFRESH_REVISION",
    pass:
      /\[\s*isPreviewSession\s*,\s*sessionId\s*,\s*premiumAccessRevision\s*,?\s*\]/s.test(
        resultSource,
      ),
  },
  {
    name: "RESULT_WIRES_SAVE_SUCCESS_TO_ACCESS_REFRESH",
    pass:
      /<SaveAssessmentResult[\s\S]*?onSaved=\{[\s\S]*?setPremiumAccessRevision[\s\S]*?\}[\s\S]*?\/>/m.test(
        resultSource,
      ),
  },
];

let failures = 0;

console.log(
  "===== PERSONALITY RESULT ACCESS REFRESH CONTRACT =====",
);

for (const check of checks) {
  if (check.pass) {
    console.log(`${check.name}=PASS`);
  } else {
    console.log(`${check.name}=FAIL`);
    failures += 1;
  }
}

console.log(`FAILURES=${failures}`);

if (failures === 0) {
  console.log(
    "PERSONALITY_RESULT_ACCESS_REFRESH=PASS",
  );
  process.exit(0);
}

console.log(
  "PERSONALITY_RESULT_ACCESS_REFRESH=FAIL",
);

process.exit(1);
