import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const recipientNameSource = readSource(
  "src/app/personality/report/[sessionId]/report-recipient-name.tsx",
);
const reportHeaderSource = readSource(
  "src/app/personality/report/[sessionId]/report-header.tsx",
);
const reportDocumentSource = readSource(
  "src/app/personality/report/[sessionId]/report-document.tsx",
);
const globalStylesSource = readSource("src/app/globals.css");

assert(
  /["']use client["']/.test(recipientNameSource) &&
    /\bReportRecipientName\b/.test(recipientNameSource),
  "Recipient-name editing must live in an isolated Client Component.",
);

assert(
  /<label\b[^>]*\bhtmlFor\s*=\s*["'][^"']+["']/.test(
    recipientNameSource,
  ) &&
    /<input\b[^>]*\bid\s*=\s*["'][^"']+["']/.test(
      recipientNameSource,
    ) &&
    /\bautoComplete\s*=\s*["']name["']/.test(
      recipientNameSource,
    ),
  "The recipient-name input must have a real label and name autocomplete.",
);

assert(
  recipientNameSource.includes(
    "personality-report-recipient-name:",
  ) &&
    /\bsessionStorage\b/.test(recipientNameSource) &&
    /\bsessionId\b/.test(recipientNameSource),
  "Recipient names must use session-specific sessionStorage.",
);

assert(
  /\bmaxLength\s*=\s*\{\s*80\s*\}/.test(
    recipientNameSource,
  ),
  "The recipient-name input must enforce the 80-character limit.",
);

assert(
  /\bReportRecipientName\b/.test(
    `${reportHeaderSource}\n${reportDocumentSource}`,
  ) &&
    /<ReportRecipientName\b/.test(
      `${reportHeaderSource}\n${reportDocumentSource}`,
    ),
  "The reusable report header or document must render the recipient-name component.",
);

const printStyles = getPrintMediaBlock(globalStylesSource);

assert(
  /\.report-recipient-name-input[\s\S]*?display\s*:\s*none/.test(
    printStyles,
  ) &&
    /\.report-recipient-name-print[\s\S]*?display\s*:\s*block/.test(
      printStyles,
    ) &&
    /\.report-recipient-name-print[\s\S]*?border-bottom\s*:/.test(
      printStyles,
    ),
  "Print CSS must replace the input with a clean printable name line.",
);

assert(
  !/(?:mailto:|send\w*email|email\w*delivery)/i.test(
    `${recipientNameSource}\n${reportHeaderSource}\n${reportDocumentSource}`,
  ),
  "Recipient-name support must not introduce email functionality.",
);

const changedPaths = getChangedPaths();

assert(
  changedPaths.every(
    (path) =>
      !path.startsWith("src/data/report/") &&
      !path.startsWith(
        "src/data/assessment/scoring/",
      ),
  ),
  "Recipient-name support must not modify report-domain or scoring files.",
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

function getPrintMediaBlock(styles: string): string {
  const printStart = styles.search(/@media\s+print\s*\{/);

  if (printStart < 0) {
    return "";
  }

  return styles.slice(printStart);
}

function getChangedPaths(): string[] {
  const status = execFileSync(
    "git",
    ["status", "--short", "--untracked-files=all"],
    {
      cwd: process.cwd(),
      encoding: "utf8",
    },
  );

  return status
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.slice(3));
}

function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
