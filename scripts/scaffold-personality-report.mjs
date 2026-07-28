import fs from "node:fs";
import path from "node:path";

const rawType = process.argv[2];

if (!rawType) {
  fail(
    "Missing personality type.\n" +
    "Usage: npm run scaffold:personality -- ENTP",
  );
}

const personalityType = rawType.toUpperCase();

if (!/^[EI][NS][TF][JP]$/.test(personalityType)) {
  fail(
    `Invalid personality type: ${rawType}\n` +
    "Expected a valid MBTI code such as ENTP or INFJ.",
  );
}

if (personalityType === "ISFJ") {
  fail("ISFJ is the source template and cannot be scaffolded.");
}

const lowerType = personalityType.toLowerCase();
const pascalType =
  personalityType.charAt(0) +
  personalityType.slice(1).toLowerCase();

const root = process.cwd();

const sourceDirectory = path.join(
  root,
  "src/data/report/isfj",
);

const targetDirectory = path.join(
  root,
  `src/data/report/${lowerType}`,
);

const reportRegistryPath = path.join(
  root,
  "src/data/report/generator/registry.ts",
);

const ruleRegistryPath = path.join(
  root,
  "src/data/report/generator/rule-registry.ts",
);

if (!fs.existsSync(sourceDirectory)) {
  fail(`Missing ISFJ template directory: ${sourceDirectory}`);
}

if (fs.existsSync(targetDirectory)) {
  fail(
    `Target personality module already exists: ${targetDirectory}`,
  );
}

copyDirectory(sourceDirectory, targetDirectory);

removeCopiedRuleFiles(
  path.join(targetDirectory, "rules"),
);

replaceInDirectory(targetDirectory, [
  ["ISFJ_COMPLETE_REPORT", `${personalityType}_COMPLETE_REPORT`],
  ["ISFJ_REPORT_RULES", `${personalityType}_REPORT_RULES`],
  [
    "validateIsfjCompleteReport",
    `validate${pascalType}CompleteReport`,
  ],
  [
    "IsfjReportValidationResult",
    `${pascalType}ReportValidationResult`,
  ],
  ['"ISFJ"', `"${personalityType}"`],
  ["ISFJ", personalityType],
  ["isfj-", `${lowerType}-`],
]);

writeEmptyRuleIndex(
  path.join(targetDirectory, "rules/index.ts"),
  personalityType,
);

registerPersonality({
  filePath: reportRegistryPath,
  importSymbol: `${personalityType}_COMPLETE_REPORT`,
  importPath: `../${lowerType}`,
  registryAnchor: "const COMPLETE_REPORT_REGISTRY",
  registryEntry:
    `${personalityType}: ${personalityType}_COMPLETE_REPORT,`,
});

registerPersonality({
  filePath: ruleRegistryPath,
  importSymbol: `${personalityType}_REPORT_RULES`,
  importPath: `../${lowerType}`,
  registryAnchor: "const REPORT_RULE_REGISTRY",
  registryEntry:
    `${personalityType}: ${personalityType}_REPORT_RULES,`,
});

console.log(
  `Created personality report scaffold for ${personalityType}.`,
);
console.log(`Directory: src/data/report/${lowerType}`);
console.log("Registered complete report and rule set.");
console.log(
  "Next: review content, run typecheck, and add personality-specific validation.",
);

function copyDirectory(source, target) {
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, {
    withFileTypes: true,
  })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function removeCopiedRuleFiles(rulesDirectory) {
  if (!fs.existsSync(rulesDirectory)) {
    fs.mkdirSync(rulesDirectory, {
      recursive: true,
    });
    return;
  }

  for (const entry of fs.readdirSync(rulesDirectory, {
    withFileTypes: true,
  })) {
    const entryPath = path.join(
      rulesDirectory,
      entry.name,
    );

    if (
      entry.isFile() &&
      entry.name !== "index.ts"
    ) {
      fs.unlinkSync(entryPath);
    }

    if (entry.isDirectory()) {
      fs.rmSync(entryPath, {
        recursive: true,
        force: true,
      });
    }
  }
}

function replaceInDirectory(directory, replacements) {
  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      replaceInDirectory(entryPath, replacements);
      continue;
    }

    if (!entry.name.endsWith(".ts")) {
      continue;
    }

    let content = fs.readFileSync(
      entryPath,
      "utf8",
    );

    for (const [from, to] of replacements) {
      content = content.split(from).join(to);
    }

    fs.writeFileSync(entryPath, content);
  }
}

function writeEmptyRuleIndex(filePath, type) {
  fs.writeFileSync(
    filePath,
    `import type {
  ReportRuleDefinition,
} from "../../rules";

export const ${type}_REPORT_RULES:
  readonly ReportRuleDefinition[] = [];
`,
  );
}

function registerPersonality({
  filePath,
  importSymbol,
  importPath,
  registryAnchor,
  registryEntry,
}) {
  let content = fs.readFileSync(
    filePath,
    "utf8",
  );

  if (content.includes(importSymbol)) {
    fail(
      `${importSymbol} is already registered in ${filePath}`,
    );
  }

  const firstRelativeImport =
    content.indexOf('import {\n');

  if (firstRelativeImport === -1) {
    fail(
      `Could not locate import insertion point in ${filePath}`,
    );
  }

  const importBlock =
    `import {\n` +
    `  ${importSymbol},\n` +
    `} from "${importPath}";\n`;

  content =
    content.slice(0, firstRelativeImport) +
    importBlock +
    content.slice(firstRelativeImport);

  const registryStart =
    content.indexOf(registryAnchor);

  if (registryStart === -1) {
    fail(
      `Could not locate registry in ${filePath}`,
    );
  }

  const registryClose =
    content.indexOf("\n};", registryStart);

  if (registryClose === -1) {
    fail(
      `Could not locate registry closing brace in ${filePath}`,
    );
  }

  content =
    content.slice(0, registryClose) +
    `\n  ${registryEntry}` +
    content.slice(registryClose);

  fs.writeFileSync(filePath, content);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
