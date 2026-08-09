import {
  getCompletePersonalityReport,
} from "../src/data/report/generator/registry";
import {
  getReportRules,
} from "../src/data/report/generator/rule-registry";

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

type PersonalityType =
  (typeof personalityTypes)[number];

type ValidationResult = {
  staticMissing: string[];
  dynamicMissing: string[];
};

const results = new Map<
  PersonalityType,
  ValidationResult
>();

for (const personalityType of personalityTypes) {
  const staticMissing: string[] = [];
  const dynamicMissing: string[] = [];

  const report =
    getCompletePersonalityReport(personalityType);

  if (!report) {
    staticMissing.push(
      `${personalityType}: report missing`,
    );
  } else {
    if (!report.title.zh) {
      staticMissing.push(
        `${personalityType}: report title.zh`,
      );
    }

    for (const section of report.sections) {
      if (!section.title.zh) {
        staticMissing.push(
          `${personalityType}/${section.id}: section title.zh`,
        );
      }

      if (!section.description.zh) {
        staticMissing.push(
          `${personalityType}/${section.id}: section description.zh`,
        );
      }

      for (const block of section.contentBlocks) {
        if (block.title && !block.title.zh) {
          staticMissing.push(
            `${personalityType}/${section.id}/${block.id}: block title.zh`,
          );
        }

        if (!block.content.zh) {
          staticMissing.push(
            `${personalityType}/${section.id}/${block.id}: block content.zh`,
          );
        }
      }
    }
  }

  const rules = getReportRules(personalityType);

  for (const rule of rules) {
    for (const content of rule.content) {
      if (content.title && !content.title.zh) {
        dynamicMissing.push(
          `${personalityType}/${rule.id}/${content.blockId}: rule title.zh`,
        );
      }

      if (!content.content.zh) {
        dynamicMissing.push(
          `${personalityType}/${rule.id}/${content.blockId}: rule content.zh`,
        );
      }
    }
  }

  results.set(personalityType, {
    staticMissing,
    dynamicMissing,
  });
}

let totalStaticMissing = 0;
let totalDynamicMissing = 0;

console.log(
  "===== PERSONALITY REPORT LOCALE SUMMARY =====",
);

console.log(
  `${"TYPE".padEnd(6)} ${"STATIC".padStart(8)} ${"DYNAMIC".padStart(9)} ${"TOTAL".padStart(8)}`,
);

console.log("-".repeat(35));

for (const personalityType of personalityTypes) {
  const result = results.get(personalityType);

  if (!result) {
    continue;
  }

  const staticCount = result.staticMissing.length;
  const dynamicCount =
    result.dynamicMissing.length;
  const total = staticCount + dynamicCount;

  totalStaticMissing += staticCount;
  totalDynamicMissing += dynamicCount;

  console.log(
    `${personalityType.padEnd(6)} ` +
      `${String(staticCount).padStart(8)} ` +
      `${String(dynamicCount).padStart(9)} ` +
      `${String(total).padStart(8)}`,
  );
}

const grandTotal =
  totalStaticMissing + totalDynamicMissing;

console.log("-".repeat(35));

console.log(
  `TOTAL  ${String(totalStaticMissing).padStart(8)} ` +
    `${String(totalDynamicMissing).padStart(9)} ` +
    `${String(grandTotal).padStart(8)}`,
);

console.log();

if (grandTotal > 0) {
  console.error(
    `FAIL — ${grandTotal} Chinese personality report fields are missing.`,
  );

  for (const personalityType of personalityTypes) {
    const result = results.get(personalityType);

    if (!result) {
      continue;
    }

    const total =
      result.staticMissing.length +
      result.dynamicMissing.length;

    if (total === 0) {
      continue;
    }

    console.error(
      `\n===== ${personalityType} =====`,
    );

    if (result.staticMissing.length > 0) {
      console.error(
        `Static missing: ${result.staticMissing.length}`,
      );

      for (
        const item of result.staticMissing.slice(
          0,
          20,
        )
      ) {
        console.error(`- ${item}`);
      }

      if (result.staticMissing.length > 20) {
        console.error(
          `...and ${
            result.staticMissing.length - 20
          } more static fields.`,
        );
      }
    }

    if (result.dynamicMissing.length > 0) {
      console.error(
        `Dynamic missing: ${result.dynamicMissing.length}`,
      );

      for (
        const item of result.dynamicMissing.slice(
          0,
          20,
        )
      ) {
        console.error(`- ${item}`);
      }

      if (result.dynamicMissing.length > 20) {
        console.error(
          `...and ${
            result.dynamicMissing.length - 20
          } more dynamic fields.`,
        );
      }
    }
  }

  process.exit(1);
}

console.log(
  "PASS — all personality report static and dynamic content includes English and Chinese.",
);
