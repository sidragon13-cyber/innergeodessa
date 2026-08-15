import {
  readdirSync,
  readFileSync,
} from "node:fs";
import {
  dirname,
  extname,
  join,
  normalize,
  relative,
  resolve,
  sep,
} from "node:path";

type AssessmentDomain =
  | "personality"
  | "career"
  | "kids"
  | "zodiac";

interface SourceImport {
  specifier: string;
  typeOnly: boolean;
  target: string | null;
}

interface SourceModule {
  path: string;
  source: string;
  imports: readonly SourceImport[];
  clientEntry: boolean;
}

interface BoundaryViolation {
  source: string;
  target: string;
  detail: string;
}

const ROOT = process.cwd();
const SOURCE_ROOT = "src";
const SOURCE_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".mjs",
  ".mts",
  ".ts",
  ".tsx",
]);

const DOMAIN_ROOTS: Readonly<
  Record<AssessmentDomain, readonly string[]>
> = {
  personality: [
    "src/app/personality",
    "src/components/personality",
    "src/data/personality",
    "src/data/assessment/questions/personality",
    "src/data/assessment/scoring/personality",
  ],
  career: [
    "src/app/career",
    "src/components/career",
    "src/data/career",
    "src/data/assessment/questions/riasec",
  ],
  kids: [
    "src/app/kids",
    "src/components/kids",
    "src/data/kids",
  ],
  zodiac: [
    "src/app/zodiac",
    "src/components/zodiac",
    "src/data/zodiac",
  ],
};

const SERVER_FIXED_ASSET_ROOTS = [
  "src/data/report/fixed-assets/generated-report-markdown",
  "src/data/report/fixed-assets/fixed-report-resolver",
  "src/data/report/fixed-assets/fixed-report-payload",
] as const;

const modules = collectSourceModules();
const moduleByPath = new Map(
  modules.map((module) => [module.path, module]),
);

const crossAssessmentViolations =
  findCrossAssessmentImports(modules);
const clientServerAssetViolations =
  findClientServerAssetViolations(modules, moduleByPath);
const assessmentPaymentViolations =
  findAssessmentPaymentCoupling(modules);
const reportScoringViolations =
  findReportScoringCoupling(modules);

printResult(
  "DIRECT_CROSS_ASSESSMENT_IMPORTS",
  crossAssessmentViolations,
);
printResult(
  "CLIENT_SERVER_FIXED_ASSET_VIOLATIONS",
  clientServerAssetViolations,
);
printResult(
  "ASSESSMENT_PAYMENT_COUPLING",
  assessmentPaymentViolations,
);
printResult(
  "REPORT_SCORING_COUPLING",
  reportScoringViolations,
);

const violationCount =
  crossAssessmentViolations.length +
  clientServerAssetViolations.length +
  assessmentPaymentViolations.length +
  reportScoringViolations.length;

if (violationCount > 0) {
  console.log("MODULE_BOUNDARY_VALIDATION=FAIL");
  process.exitCode = 1;
} else {
  console.log("MODULE_BOUNDARY_VALIDATION=PASS");
}

function collectSourceModules(): readonly SourceModule[] {
  const sourceFiles = walkDirectory(resolve(ROOT, SOURCE_ROOT));
  const knownFiles = new Set(
    sourceFiles.map(toRepositoryPath),
  );

  return sourceFiles.map((absolutePath) => {
    const path = toRepositoryPath(absolutePath);
    const source = readFileSync(absolutePath, "utf8");

    return {
      path,
      source,
      imports: parseImports(source).map((sourceImport) => ({
        ...sourceImport,
        target: resolveLocalImport(
          path,
          sourceImport.specifier,
          knownFiles,
        ),
      })),
      clientEntry: /^\s*["']use client["'];/m.test(source),
    };
  });
}

function walkDirectory(directory: string): readonly string[] {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        return walkDirectory(path);
      }

      return entry.isFile() && SOURCE_EXTENSIONS.has(extname(entry.name))
        ? [path]
        : [];
    });
}

function parseImports(source: string): readonly Omit<SourceImport, "target">[] {
  const imports: Omit<SourceImport, "target">[] = [];
  const staticPattern =
    /(?:^|\n)\s*((?:import|export)\s+(?:type\s+)?(?:[^"'`;]*?\s+from\s+)?["']([^"']+)["'])/g;
  const runtimePattern =
    /\b(?:import|require)\s*\(\s*["']([^"']+)["']\s*\)/g;
  let match: RegExpExecArray | null;

  while ((match = staticPattern.exec(source)) !== null) {
    const statement = match[1] ?? "";
    const specifier = match[2];

    if (specifier) {
      imports.push({
        specifier,
        typeOnly: /^(?:import|export)\s+type\b/.test(statement.trim()),
      });
    }
  }

  while ((match = runtimePattern.exec(source)) !== null) {
    const specifier = match[1];

    if (specifier) {
      imports.push({ specifier, typeOnly: false });
    }
  }

  return imports;
}

function resolveLocalImport(
  sourcePath: string,
  specifier: string,
  knownFiles: ReadonlySet<string>,
): string | null {
  let unresolved: string;

  if (specifier.startsWith("@/")) {
    unresolved = `src/${specifier.slice(2)}`;
  } else if (specifier.startsWith(".")) {
    unresolved = toPosixPath(
      normalize(join(dirname(sourcePath), specifier)),
    );
  } else {
    return null;
  }

  for (const candidate of localImportCandidates(unresolved)) {
    if (knownFiles.has(candidate)) {
      return candidate;
    }
  }

  return unresolved;
}

function localImportCandidates(path: string): readonly string[] {
  if (SOURCE_EXTENSIONS.has(extname(path))) {
    return [path];
  }

  return [
    path,
    ...[...SOURCE_EXTENSIONS].map((extension) => `${path}${extension}`),
    ...[...SOURCE_EXTENSIONS].map(
      (extension) => `${path}/index${extension}`,
    ),
  ];
}

function findCrossAssessmentImports(
  sourceModules: readonly SourceModule[],
): readonly BoundaryViolation[] {
  return sourceModules.flatMap((module) => {
    const sourceDomain = getAssessmentDomain(module.path);

    if (!sourceDomain) {
      return [];
    }

    return module.imports.flatMap((sourceImport) => {
      const targetDomain = sourceImport.target
        ? getAssessmentDomain(sourceImport.target)
        : null;

      if (!targetDomain || targetDomain === sourceDomain) {
        return [];
      }

      return [{
        source: module.path,
        target: sourceImport.target ?? sourceImport.specifier,
        detail: `${sourceDomain} imports ${targetDomain}`,
      }];
    });
  });
}

function findClientServerAssetViolations(
  sourceModules: readonly SourceModule[],
  modulesByPath: ReadonlyMap<string, SourceModule>,
): readonly BoundaryViolation[] {
  const clientReachable = new Set<string>();
  const pending = sourceModules
    .filter((module) => module.clientEntry)
    .map((module) => module.path);

  while (pending.length > 0) {
    const path = pending.pop();

    if (!path || clientReachable.has(path)) {
      continue;
    }

    clientReachable.add(path);
    const module = modulesByPath.get(path);

    module?.imports.forEach((sourceImport) => {
      if (
        !sourceImport.typeOnly &&
        sourceImport.target &&
        modulesByPath.has(sourceImport.target) &&
        !clientReachable.has(sourceImport.target)
      ) {
        pending.push(sourceImport.target);
      }
    });
  }

  return [...clientReachable].flatMap((sourcePath) => {
    const module = modulesByPath.get(sourcePath);

    if (!module) {
      return [];
    }

    return module.imports.flatMap((sourceImport) => {
      if (
        sourceImport.typeOnly ||
        !sourceImport.target ||
        !isUnderAnyRoot(sourceImport.target, SERVER_FIXED_ASSET_ROOTS)
      ) {
        return [];
      }

      return [{
        source: sourcePath,
        target: sourceImport.target,
        detail: "client-reachable module imports a server-only fixed Premium asset",
      }];
    });
  });
}

function findAssessmentPaymentCoupling(
  sourceModules: readonly SourceModule[],
): readonly BoundaryViolation[] {
  return sourceModules.flatMap((module) => {
    if (!isAssessmentBusinessSource(module.path)) {
      return [];
    }

    return module.imports.flatMap((sourceImport) => {
      const providerImport =
        sourceImport.specifier.startsWith("@paddle/") ||
        sourceImport.specifier.includes("/api/paddle") ||
        (sourceImport.target !== null &&
          isUnderAnyRoot(sourceImport.target, [
            "src/app/api/paddle",
            "src/components/payment/paddle-checkout-button",
          ]));

      return providerImport
        ? [{
            source: module.path,
            target: sourceImport.target ?? sourceImport.specifier,
            detail: "assessment business module imports payment-provider implementation",
          }]
        : [];
    });
  });
}

function findReportScoringCoupling(
  sourceModules: readonly SourceModule[],
): readonly BoundaryViolation[] {
  return sourceModules.flatMap((module) => {
    if (!isReportRenderer(module.path)) {
      return [];
    }

    return module.imports.flatMap((sourceImport) =>
      sourceImport.target &&
      isUnderRoot(sourceImport.target, "src/data/assessment/scoring")
        ? [{
            source: module.path,
            target: sourceImport.target,
            detail: "report renderer imports assessment scoring implementation",
          }]
        : [],
    );
  });
}

function getAssessmentDomain(path: string): AssessmentDomain | null {
  for (const domain of Object.keys(DOMAIN_ROOTS) as AssessmentDomain[]) {
    if (isUnderAnyRoot(path, DOMAIN_ROOTS[domain])) {
      return domain;
    }
  }

  return null;
}

function isAssessmentBusinessSource(path: string): boolean {
  return (
    path.startsWith("src/data/") &&
    getAssessmentDomain(path) !== null
  );
}

function isReportRenderer(path: string): boolean {
  return (
    isUnderRoot(path, "src/components/report") ||
    /\/[^/]*report-document\.[cm]?[jt]sx?$/.test(path)
  );
}

function isUnderAnyRoot(
  path: string,
  roots: readonly string[],
): boolean {
  return roots.some((root) => isUnderRoot(path, root));
}

function isUnderRoot(path: string, root: string): boolean {
  return path === root || path.startsWith(`${root}/`) || path.startsWith(`${root}.`);
}

function printResult(
  label: string,
  violations: readonly BoundaryViolation[],
): void {
  console.log(`${label}=${violations.length}`);

  violations.forEach((violation) => {
    console.log(
      `  ${violation.source} -> ${violation.target} (${violation.detail})`,
    );
  });
}

function toRepositoryPath(absolutePath: string): string {
  return toPosixPath(relative(ROOT, absolutePath));
}

function toPosixPath(path: string): string {
  return path.split(sep).join("/");
}
