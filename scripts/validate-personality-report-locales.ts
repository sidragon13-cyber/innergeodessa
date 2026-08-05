import {
  getCompletePersonalityReport,
} from "../src/data/report/generator/registry";

const personalityTypes = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
] as const;

const missing: string[] = [];

for (const personalityType of personalityTypes) {
  const report =
    getCompletePersonalityReport(personalityType);

  if (!report) {
    missing.push(`${personalityType}: report missing`);
    continue;
  }

  if (!report.title.zh) {
    missing.push(`${personalityType}: report title.zh`);
  }

  for (const section of report.sections) {
    if (!section.title.zh) {
      missing.push(
        `${personalityType}/${section.id}: section title.zh`,
      );
    }

    if (!section.description.zh) {
      missing.push(
        `${personalityType}/${section.id}: section description.zh`,
      );
    }

    for (const block of section.contentBlocks) {
      if (block.title && !block.title.zh) {
        missing.push(
          `${personalityType}/${section.id}/${block.id}: block title.zh`,
        );
      }

      if (!block.content.zh) {
        missing.push(
          `${personalityType}/${section.id}/${block.id}: block content.zh`,
        );
      }
    }
  }
}

if (missing.length > 0) {
  console.error(
    `FAIL — ${missing.length} Chinese personality report fields are missing.`,
  );

  for (const item of missing.slice(0, 120)) {
    console.error(`- ${item}`);
  }

  if (missing.length > 120) {
    console.error(
      `...and ${missing.length - 120} more missing fields.`,
    );
  }

  process.exit(1);
}

console.log(
  "PASS — all personality report content includes English and Chinese.",
);
