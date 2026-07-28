import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const reportPageSource = readSource(
  "src/app/personality/report/[sessionId]/page.tsx",
);
const printButtonSource = readSource(
  "src/app/personality/report/[sessionId]/print-report-button.tsx",
);
const globalStylesSource = readSource("src/app/globals.css");

assert(
  /import\s+\{\s*PrintReportButton\s*\}\s+from\s+["']\.\/print-report-button["']/.test(
    reportPageSource,
  ) && /<PrintReportButton\s*\/>/.test(reportPageSource),
  "The complete report page must include the shared print control.",
);

assert(
  /window\s*\.\s*print\s*\(\s*\)/.test(printButtonSource),
  "The print control must call window.print().",
);

assert(
  normaliseWhitespace(printButtonSource).includes(
    "PRINT / SAVE AS PDF",
  ),
  "The print control must use the approved label.",
);

assert(
  /@media\s+print\s*\{/.test(globalStylesSource),
  "Print-specific CSS must exist.",
);

const printStyles = getPrintMediaBlock(globalStylesSource);

assert(
  /\.report-interactive-only[\s\S]*?display\s*:\s*none/.test(
    printStyles,
  ),
  "Print CSS must hide interactive-only controls.",
);

assert(
  /@page\s*\{[\s\S]*?size\s*:\s*A4(?:\s+portrait)?\s*;[\s\S]*?\}/i.test(
    globalStylesSource,
  ),
  "Print CSS must configure A4 pages.",
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
