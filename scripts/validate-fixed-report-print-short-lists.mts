import {
  readFileSync,
} from "node:fs";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const renderer =
  readFileSync(
    "src/components/report/fixed-report-rich-content.tsx",
    "utf8",
  );

const css =
  readFileSync(
    "src/app/globals.css",
    "utf8",
  );

console.log(
  "===== FIXED REPORT PRINT SHORT-LIST VALIDATOR =====",
);

console.log();

assert(
  renderer.includes(
    "fixed-report-short-list",
  ),
  "RED — renderer does not yet mark compact printable short lists.",
);

assert(
  renderer.includes(
    "fixed-report-short-list-item",
  ),
  "RED — renderer does not yet identify short list items.",
);

assert(
  css.includes(
    ".personality-report .fixed-report-short-list",
  ),
  "RED — print CSS does not yet define horizontal short-list layout.",
);

assert(
  css.includes(
    "grid-template-columns",
  ),
  "RED — short-list print layout has no grid columns.",
);

console.log(
  "PASS — short-list print layout contract exists.",
);
