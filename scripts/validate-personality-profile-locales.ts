import path from "node:path";
import { pathToFileURL } from "node:url";

type UnknownRecord = Record<string, unknown>;

const personalityTypes = [
  "intj",
  "intp",
  "entj",
  "entp",
  "infj",
  "infp",
  "enfj",
  "enfp",
  "istj",
  "isfj",
  "estj",
  "esfj",
  "istp",
  "isfp",
  "estp",
  "esfp",
] as const;

function findProfileExport(moduleRecord: UnknownRecord): unknown {
  return Object.entries(moduleRecord).find(
    ([name, value]) =>
      name.toLowerCase().endsWith("profile") &&
      value !== null &&
      typeof value === "object",
  )?.[1];
}

function collectMissing(
  value: unknown,
  currentPath: string,
  missing: string[],
): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectMissing(item, `${currentPath}[${index}]`, missing);
    });
    return;
  }

  if (value === null || typeof value !== "object") {
    return;
  }

  const record = value as UnknownRecord;

  const hasEnglish = typeof record.en === "string" || Array.isArray(record.en);

  if (hasEnglish && !Object.hasOwn(record, "zh")) {
    missing.push(currentPath);
  }

  for (const [key, child] of Object.entries(record)) {
    if (key !== "en" && key !== "zh") {
      collectMissing(child, `${currentPath}.${key}`, missing);
    }
  }
}

async function main(): Promise<void> {
  let totalMissing = 0;

  for (const type of personalityTypes) {
    const filePath = path.resolve(`src/data/personality/${type}.ts`);

    const moduleRecord = (await import(
      pathToFileURL(filePath).href
    )) as UnknownRecord;

    const profile = findProfileExport(moduleRecord);

    if (!profile) {
      throw new Error(`${type.toUpperCase()} profile export not found`);
    }

    const missing: string[] = [];

    collectMissing(profile, `${type.toUpperCase()}_PROFILE`, missing);

    totalMissing += missing.length;

    console.log(`${type.toUpperCase()}: missing zh fields = ${missing.length}`);

    for (const item of missing) {
      console.log(`- ${item}`);
    }

    console.log("");
  }

  if (totalMissing > 0) {
    console.error(
      `FAIL — ${totalMissing} personality profile Chinese fields are missing`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    "PASS — all personality profiles include complete Chinese localization",
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
