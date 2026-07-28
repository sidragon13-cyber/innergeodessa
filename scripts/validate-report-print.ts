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
const sectionStyles = getCssDeclarations(
  printStyles,
  ".personality-report-section",
);
const sectionHeadingGroupStyles = getCssDeclarations(
  printStyles,
  ".report-print-section-heading-group",
);
const flowBlockStyles = getCssDeclarations(
  printStyles,
  ".report-print-flow-block",
);

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

assert(
  !/break-inside\s*:\s*avoid(?:-page)?/.test(sectionStyles) &&
    !/page-break-inside\s*:\s*avoid/.test(sectionStyles),
  "Long report sections must be allowed to flow across pages.",
);

assert(
  reportPageSource.includes(
    "report-print-section-heading-group",
  ),
  "The report page must define a dedicated print section-heading group.",
);

assert(
  /break-inside\s*:\s*avoid(?:-page)?/.test(
    sectionHeadingGroupStyles,
  ) &&
    /break-after\s*:\s*avoid-page/.test(
      sectionHeadingGroupStyles,
    ) &&
    /page-break-after\s*:\s*avoid/.test(
      sectionHeadingGroupStyles,
    ),
  "The print section-heading group must stay together and with following content.",
);

assert(
  reportPageSource.includes("report-print-flow-block") &&
    !/break-inside\s*:\s*avoid(?:-page)?/.test(
      flowBlockStyles,
    ) &&
    !/page-break-inside\s*:\s*avoid/.test(flowBlockStyles),
  "Long content blocks must be explicitly allowed to flow across pages.",
);

assert(
  normaliseWhitespace(reportPageSource).includes(
    "For a clean PDF, disable browser headers and footers in the print dialog.",
  ) &&
    /report-interactive-only[^"]*report-print-guidance|report-print-guidance[^"]*report-interactive-only/.test(
      reportPageSource,
    ),
  "The screen-only print guidance must be present and hidden during print.",
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

function getCssDeclarations(
  styles: string,
  selector: string,
): string {
  for (const match of styles.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = (match[1] ?? "")
      .split(",")
      .map((value) => value.trim());

    if (selectors.includes(selector)) {
      return match[2] ?? "";
    }
  }

  return "";
}

function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
