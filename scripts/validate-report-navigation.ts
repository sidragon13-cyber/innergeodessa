import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  createReportSectionAnchor,
} from "../src/app/personality/report/[sessionId]/section-navigation";

const reportDocumentSource = readSource(
  "src/app/personality/report/[sessionId]/report-document.tsx",
);
const reportSectionSource = readSource(
  "src/app/personality/report/[sessionId]/report-section.tsx",
);
const tableOfContentsSource = readSource(
  "src/app/personality/report/[sessionId]/report-table-of-contents.tsx",
);
const globalStylesSource = readSource("src/app/globals.css");

const sampleAnchor = createReportSectionAnchor(
  2,
  "Personality Overview",
);

assert(
  sampleAnchor === "report-section-02-personality-overview" &&
    createReportSectionAnchor(
      2,
      "Personality Overview",
    ) === sampleAnchor &&
    /^[a-z0-9-]+$/.test(sampleAnchor),
  "Report section anchors must be deterministic, zero-padded, and fragment-safe.",
);

assert(
  /<nav\b[^>]*\bid\s*=\s*["']report-table-of-contents["'][^>]*\baria-label\s*=\s*["']Report table of contents["']|<nav\b[^>]*\baria-label\s*=\s*["']Report table of contents["'][^>]*\bid\s*=\s*["']report-table-of-contents["']/.test(
    tableOfContentsSource,
  ),
  "The report must contain a semantic, accessibly labelled table of contents.",
);

assert(
  /id\s*=\s*\{\s*anchor\s*\}/.test(reportSectionSource),
  "Each report section must use its generated anchor as its HTML id.",
);

assert(
  /href\s*=\s*\{\s*`#\$\{(?:item\.)?anchor\}`\s*\}/.test(
    tableOfContentsSource,
  ),
  "Each table-of-contents item must link to its matching section anchor.",
);

assert(
  /href\s*=\s*["']#report-table-of-contents["']/.test(
    reportSectionSource,
  ) &&
    normaliseWhitespace(reportSectionSource).includes(
      "Back to contents",
    ),
  "Each rendered section must include a back-to-contents link.",
);

assert(
  /\bcreateReportSectionAnchor\b/.test(
    reportDocumentSource,
  ) &&
    /<ReportTableOfContents\b/.test(
      reportDocumentSource,
    ) &&
    /<ReportSection\b/.test(reportDocumentSource),
  "ReportDocument must share stable anchors with the TOC and rendered sections.",
);

const printStyles = getPrintMediaBlock(globalStylesSource);

assert(
  /\.report-back-to-contents[\s\S]*?display\s*:\s*none/.test(
    printStyles,
  ),
  "Print CSS must hide back-to-contents links.",
);

assert(
  !/scroll-behavior\s*:\s*smooth/.test(globalStylesSource) ||
    /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)[\s\S]*?scroll-behavior\s*:\s*auto/.test(
      globalStylesSource,
    ),
  "Smooth scrolling must respect reduced-motion preferences.",
);

function readSource(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

function normaliseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function getPrintMediaBlock(styles: string): string {
  const printStart = styles.search(/@media\s+print\s*\{/);

  if (printStart < 0) {
    return "";
  }

  return styles.slice(printStart);
}

function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
