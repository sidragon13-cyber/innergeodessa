export type FixedReportHeadingLevel =
  | 1
  | 2
  | 3;

export type FixedReportTableAlignment =
  | "left"
  | "center"
  | "right"
  | null;

export interface FixedReportParagraphBlock {
  readonly type: "paragraph";
  readonly text: string;
}

export interface FixedReportHeadingBlock {
  readonly type: "heading";
  readonly level: FixedReportHeadingLevel;
  readonly text: string;
}

export interface FixedReportUnorderedListBlock {
  readonly type: "unordered-list";
  readonly items: readonly string[];
}

export interface FixedReportOrderedListBlock {
  readonly type: "ordered-list";
  readonly items: readonly string[];
}

export interface FixedReportBlockquoteBlock {
  readonly type: "blockquote";
  readonly text: string;
}

export interface FixedReportTableBlock {
  readonly type: "table";
  readonly header: readonly string[];
  readonly alignments:
    readonly FixedReportTableAlignment[];
  readonly rows:
    readonly (readonly string[])[];
}

export interface FixedReportDividerBlock {
  readonly type: "divider";
}

export type FixedReportRichBlock =
  | FixedReportParagraphBlock
  | FixedReportHeadingBlock
  | FixedReportUnorderedListBlock
  | FixedReportOrderedListBlock
  | FixedReportBlockquoteBlock
  | FixedReportTableBlock
  | FixedReportDividerBlock;

export interface FixedReportRichDocument {
  readonly blocks:
    readonly FixedReportRichBlock[];
}

/**
 * Deterministic parser for the audited InnerGeo fixed-report
 * Markdown grammar.
 *
 * Supported structural syntax:
 * - H1 / H2 / H3
 * - paragraph
 * - unordered list
 * - ordered list
 * - blockquote
 * - pipe table
 * - horizontal rule
 *
 * Bold / italic markers remain inside serializable text fields
 * and will be interpreted later by the dedicated inline renderer.
 *
 * This is intentionally not a general-purpose Markdown parser.
 */
export function parseFixedReportMarkdown(
  markdown: string,
): FixedReportRichDocument {
  const lines = markdown
    .replace(/\r\n?/g, "\n")
    .split("\n");

  assertSupportedSyntax(lines);

  const blocks: FixedReportRichBlock[] = [];

  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (isFenceWrapper(trimmed)) {
      index += 1;
      continue;
    }

    if (trimmed === "---") {
      blocks.push({
        type: "divider",
      });

      index += 1;
      continue;
    }

    const heading =
      trimmed.match(
        /^(#{1,3})\s+(.+)$/,
      );

    if (heading) {
      blocks.push({
        type: "heading",
        level: (
          heading[1]!.length
        ) as FixedReportHeadingLevel,
        text: heading[2]!.trim(),
      });

      index += 1;
      continue;
    }

    if (
      isTableStart(
        lines,
        index,
      )
    ) {
      const parsed = parseTable(
        lines,
        index,
      );

      blocks.push(parsed.block);
      index = parsed.nextIndex;
      continue;
    }

    if (
      trimmed.startsWith(">")
    ) {
      const parsed =
        parseBlockquote(
          lines,
          index,
        );

      blocks.push(parsed.block);
      index = parsed.nextIndex;
      continue;
    }

    if (
      isUnorderedListLine(line)
    ) {
      const parsed =
        parseUnorderedList(
          lines,
          index,
        );

      blocks.push(parsed.block);
      index = parsed.nextIndex;
      continue;
    }

    if (
      isOrderedListLine(line)
    ) {
      const parsed =
        parseOrderedList(
          lines,
          index,
        );

      blocks.push(parsed.block);
      index = parsed.nextIndex;
      continue;
    }

    const paragraphLines: string[] = [];

    while (index < lines.length) {
      const current =
        lines[index] ?? "";

      if (
        !current.trim() ||
        isStructuralStart(
          lines,
          index,
        )
      ) {
        break;
      }

      if (
        /^\s*\|.*\|\s*$/.test(
          current,
        )
      ) {
        throw new Error(
          `Malformed table row at source line ${
            index + 1
          }.`,
        );
      }

      paragraphLines.push(
        current.trimEnd(),
      );

      index += 1;
    }

    if (!paragraphLines.length) {
      throw new Error(
        `Unable to parse source line ${
          index + 1
        }: ${JSON.stringify(
          lines[index] ?? "",
        )}`,
      );
    }

    blocks.push({
      type: "paragraph",
      text: paragraphLines
        .join("\n")
        .trim(),
    });
  }

  return {
    blocks,
  };
}

function parseBlockquote(
  lines: readonly string[],
  startIndex: number,
): {
  readonly block:
    FixedReportBlockquoteBlock;
  readonly nextIndex: number;
} {
  const quoteLines: string[] = [];

  let index = startIndex;

  while (index < lines.length) {
    const line =
      lines[index] ?? "";

    const match =
      line.match(
        /^\s*>\s?(.*)$/,
      );

    if (!match) {
      break;
    }

    quoteLines.push(
      match[1] ?? "",
    );

    index += 1;
  }

  return {
    block: {
      type: "blockquote",
      text: quoteLines
        .join("\n")
        .trim(),
    },
    nextIndex: index,
  };
}

function parseUnorderedList(
  lines: readonly string[],
  startIndex: number,
): {
  readonly block:
    FixedReportUnorderedListBlock;
  readonly nextIndex: number;
} {
  const items: string[] = [];

  let index = startIndex;

  while (
    index < lines.length &&
    isUnorderedListLine(
      lines[index] ?? "",
    )
  ) {
    const line =
      lines[index] ?? "";

    const match =
      line.match(
        /^\s*[-*+]\s+(.+)$/,
      );

    if (!match) {
      break;
    }

    items.push(
      match[1]!.trim(),
    );

    index += 1;
  }

  return {
    block: {
      type: "unordered-list",
      items,
    },
    nextIndex: index,
  };
}

function parseOrderedList(
  lines: readonly string[],
  startIndex: number,
): {
  readonly block:
    FixedReportOrderedListBlock;
  readonly nextIndex: number;
} {
  const items: string[] = [];

  let index = startIndex;

  while (
    index < lines.length &&
    isOrderedListLine(
      lines[index] ?? "",
    )
  ) {
    const line =
      lines[index] ?? "";

    const match =
      line.match(
        /^\s*\d+[.)]\s+(.+)$/,
      );

    if (!match) {
      break;
    }

    items.push(
      match[1]!.trim(),
    );

    index += 1;
  }

  return {
    block: {
      type: "ordered-list",
      items,
    },
    nextIndex: index,
  };
}

function parseTable(
  lines: readonly string[],
  startIndex: number,
): {
  readonly block:
    FixedReportTableBlock;
  readonly nextIndex: number;
} {
  const header =
    parseTableCells(
      lines[startIndex] ?? "",
    );

  const alignmentCells =
    parseTableCells(
      lines[startIndex + 1] ?? "",
    );

  if (
    header.length !==
    alignmentCells.length
  ) {
    throw new Error(
      `Table header/alignment width mismatch at source line ${
        startIndex + 1
      }.`,
    );
  }

  const alignments =
    alignmentCells.map(
      parseTableAlignment,
    );

  const rows: string[][] = [];

  let index =
    startIndex + 2;

  while (
    index < lines.length &&
    /^\s*\|.*\|\s*$/.test(
      lines[index] ?? "",
    )
  ) {
    const row =
      parseTableCells(
        lines[index] ?? "",
      );

    if (
      row.length !==
      header.length
    ) {
      throw new Error(
        `Table row width mismatch at source line ${
          index + 1
        }.`,
      );
    }

    rows.push(row);
    index += 1;
  }

  return {
    block: {
      type: "table",
      header,
      alignments,
      rows,
    },
    nextIndex: index,
  };
}

function parseTableCells(
  line: string,
): string[] {
  let value = line.trim();

  if (
    value.startsWith("|")
  ) {
    value = value.slice(1);
  }

  if (
    value.endsWith("|")
  ) {
    value = value.slice(0, -1);
  }

  return value
    .split("|")
    .map((cell) =>
      cell.trim(),
    );
}

function parseTableAlignment(
  value: string,
): FixedReportTableAlignment {
  const trimmed =
    value.trim();

  if (
    !/^:?-{3,}:?$/.test(
      trimmed,
    )
  ) {
    throw new Error(
      `Unsupported Markdown table alignment cell: ${JSON.stringify(
        value,
      )}`,
    );
  }

  const left =
    trimmed.startsWith(":");

  const right =
    trimmed.endsWith(":");

  if (left && right) {
    return "center";
  }

  if (right) {
    return "right";
  }

  if (left) {
    return "left";
  }

  return null;
}

function isTableStart(
  lines: readonly string[],
  index: number,
): boolean {
  const header =
    lines[index] ?? "";

  const delimiter =
    lines[index + 1] ?? "";

  if (
    !/^\s*\|.*\|\s*$/.test(
      header,
    ) ||
    !/^\s*\|.*\|\s*$/.test(
      delimiter,
    )
  ) {
    return false;
  }

  const cells =
    parseTableCells(
      delimiter,
    );

  return (
    cells.length > 0 &&
    cells.every((cell) =>
      /^:?-{3,}:?$/.test(
        cell.trim(),
      ),
    )
  );
}

function isUnorderedListLine(
  line: string,
): boolean {
  return /^\s*[-*+]\s+/.test(
    line,
  );
}

function isOrderedListLine(
  line: string,
): boolean {
  return /^\s*\d+[.)]\s+/.test(
    line,
  );
}

function isStructuralStart(
  lines: readonly string[],
  index: number,
): boolean {
  const line =
    lines[index] ?? "";

  const trimmed =
    line.trim();

  return (
    isFenceWrapper(trimmed) ||
    trimmed === "---" ||
    /^#{1,3}\s+/.test(
      trimmed,
    ) ||
    isTableStart(
      lines,
      index,
    ) ||
    trimmed.startsWith(">") ||
    isUnorderedListLine(line) ||
    isOrderedListLine(line)
  );
}

function isFenceWrapper(
  trimmed: string,
): boolean {
  return /^`{1,3}(?:text)?\s*$/i.test(
    trimmed,
  );
}

function assertSupportedSyntax(
  lines: readonly string[],
): void {
  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    const line =
      lines[index] ?? "";

    const trimmed =
      line.trim();

    if (
      /^#{4,6}\s+/.test(
        trimmed,
      )
    ) {
      throw new Error(
        `Unsupported H4–H6 heading at source line ${
          index + 1
        }.`,
      );
    }

    if (
      /!\[[^\]]*\]\([^)]+\)/.test(
        line,
      )
    ) {
      throw new Error(
        `Markdown images are not supported at source line ${
          index + 1
        }.`,
      );
    }

    if (
      /\[[^\]]+\]\([^)]+\)/.test(
        line,
      )
    ) {
      throw new Error(
        `Markdown links are not supported at source line ${
          index + 1
        }.`,
      );
    }

    if (
      /<[A-Za-z][^>]*>/.test(
        line,
      )
    ) {
      throw new Error(
        `Raw HTML is not supported at source line ${
          index + 1
        }.`,
      );
    }

    if (
      /^\s{2,}[-*+]\s+/.test(
        line,
      )
    ) {
      throw new Error(
        `Nested lists are not supported at source line ${
          index + 1
        }.`,
      );
    }

    if (
      line.includes("`") &&
      !isFenceWrapper(
        trimmed,
      )
    ) {
      throw new Error(
        `Inline/code Markdown is not supported at source line ${
          index + 1
        }.`,
      );
    }
  }
}
