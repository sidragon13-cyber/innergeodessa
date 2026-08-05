import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pageSource = readSource(
  "src/app/personality/report/[sessionId]/page.tsx",
);
const documentSource = readSource(
  "src/app/personality/report/[sessionId]/report-document.tsx",
);
const headerSource = readSource(
  "src/app/personality/report/[sessionId]/report-header.tsx",
);
const tableOfContentsSource = readSource(
  "src/app/personality/report/[sessionId]/report-table-of-contents.tsx",
);
const sectionSource = readSource(
  "src/app/personality/report/[sessionId]/report-section.tsx",
);
const contentBlockSource = readSource(
  "src/app/personality/report/[sessionId]/report-content-block.tsx",
);
const navigationSource = readSource(
  "src/app/personality/report/[sessionId]/report-navigation.tsx",
);

assert(
  /\bReportDocument\b/.test(pageSource) &&
    /<ReportDocument\b/.test(pageSource),
  "The route page must delegate completed report rendering to ReportDocument.",
);

assert(
  /\bReportSection\b/.test(documentSource) &&
    /<ReportSection\b/.test(documentSource),
  "ReportDocument must delegate section rendering to ReportSection.",
);

assert(
  /\bReportContentBlock\b/.test(sectionSource) &&
    /<ReportContentBlock\b/.test(sectionSource),
  "ReportSection must delegate content rendering to ReportContentBlock.",
);

const templateSources = [
  documentSource,
  headerSource,
  tableOfContentsSource,
  sectionSource,
  contentBlockSource,
  navigationSource,
].join("\n");

assert(
  !/\b(?:ISFJ|ENTJ)\b/.test(templateSources),
  "The reusable report template must not branch on personality-specific types.",
);

assert(
  /\bPrintReportButton\b/.test(headerSource) &&
    /<PrintReportButton\s*\/>/.test(headerSource),
  "The reusable report header must retain the print control.",
);

assert(
  /\bReportTableOfContents\b/.test(documentSource) &&
    /\bcreateReportSectionAnchor\b/.test(documentSource),
  "The reusable report document must retain the TOC and stable anchor helper.",
);

assert(
  /\bisPhaseOnePersonalityReportType\b/.test(pageSource),
  "The route must retain Phase 1 eligibility gating.",
);

const typedPropContracts = [
  [documentSource, "ReportDocumentProps"],
  [headerSource, "ReportHeaderProps"],
  [tableOfContentsSource, "ReportTableOfContentsProps"],
  [sectionSource, "ReportSectionProps"],
  [contentBlockSource, "ReportContentBlockProps"],
  [navigationSource, "ReportNavigationProps"],
] as const;

for (const [source, contractName] of typedPropContracts) {
  assert(
    new RegExp(
      `(?:export\\s+)?interface\\s+${contractName}\\b`,
    ).test(source),
    `${contractName} must define an explicit typed component contract.`,
  );
}

assert(
  lineCount(pageSource) <= 280,
  `The route page must stay at or below 280 lines; found ${lineCount(pageSource)}.`,
);

function readSource(relativePath: string): string {
  try {
    return readFileSync(
      resolve(process.cwd(), relativePath),
      "utf8",
    );
  } catch {
    return "";
  }
}

function lineCount(value: string): number {
  if (!value) {
    return 0;
  }

  return value.split(/\r?\n/).length;
}

function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
