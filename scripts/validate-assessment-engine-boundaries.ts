import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const sharedDirectory = "src/components/assessment";
const requiredFiles = [
  "assessment-shell.tsx",
  "assessment-progress.tsx",
  "assessment-question.tsx",
  "assessment-answer-scale.tsx",
  "assessment-navigation.tsx",
  "types.ts",
  "index.ts",
] as const;

for (const fileName of requiredFiles) {
  assert(
    existsSync(resolve(process.cwd(), sharedDirectory, fileName)),
    `${sharedDirectory}/${fileName} must exist.`,
  );
}

const sharedSource = requiredFiles
  .map((fileName) => readSource(`${sharedDirectory}/${fileName}`))
  .join("\n");
const personalityAdapterSource = readSource(
  "src/app/personality/test/page.tsx",
);
const barrelSource = readSource(`${sharedDirectory}/index.ts`);

for (const forbiddenReference of [
  "fetchPersonalityResult",
  "PersonalityResultContract",
  "/personality/result",
] as const) {
  assert(
    !sharedSource.includes(forbiddenReference),
    `Shared assessment components must not reference ${forbiddenReference}.`,
  );
}

assert(
  !/(?:===|!==|>=|<=|>|<)\s*72\b|\b72\s*(?:questions?|items?)\b/i.test(
    sharedSource,
  ),
  "Shared assessment components must not hard-code a 72-question expectation.",
);

for (const exportName of [
  "AssessmentShell",
  "AssessmentProgress",
  "AssessmentQuestion",
  "AssessmentAnswerScale",
  "AssessmentNavigation",
] as const) {
  assert(
    new RegExp(`\\b${exportName}\\b`).test(barrelSource),
    `${exportName} must be exported from the assessment barrel.`,
  );
}

for (const personalityReference of [
  "fetchPersonalityResult",
  "PersonalityResultContract",
  "data.count !== 72",
  "innergeodessa-result-",
  "/personality/result/",
] as const) {
  assert(
    personalityAdapterSource.includes(personalityReference),
    `The Personality adapter must retain ${personalityReference}.`,
  );
}

const protectedRouteChanges = execFileSync(
  "git",
  [
    "diff",
    "--name-only",
    "--",
    "src/app/career",
    "src/app/zodiac",
  ],
  { encoding: "utf8" },
).trim();

assert(
  protectedRouteChanges.length === 0,
  `Career and Zodiac routes must not change in this phase: ${protectedRouteChanges}`,
);

console.log("Assessment engine boundary validation passed.");

function readSource(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
