// K912-1025: reusable source-table restoration.
// No preview globals, no simulated results, no production side effects.

export interface K912SourceTable {
  readonly chapter: string;
  readonly sourceTable: number;
  readonly rows: readonly (readonly string[])[];
}

export type K912SourceBlock =
  | { readonly kind: "paragraph"; readonly text: string }
  | { readonly kind: "table"; readonly rows: readonly (readonly string[])[] };

const normalize = (value: string): string =>
  value.replace(/\s+/g, "").trim();

export function restoreK912SourceTables(
  chapter: number,
  paragraphs: readonly string[],
  tables: readonly K912SourceTable[],
  verifiedSlots: Readonly<Record<string, string | null>>,
): readonly K912SourceBlock[] {
  const selected = tables.filter(
    (table) =>
      table.chapter === String(chapter) &&
      [6, 7, 9, 11].includes(table.sourceTable),
  );

  const replacements = new Map<
    number,
    { readonly length: number; readonly rows: K912SourceTable["rows"] }
  >();

  for (const table of selected) {
    const cells = table.rows.flat();
    const matches: number[] = [];

    for (let start = 0; start <= paragraphs.length - cells.length; start++) {
      if (cells.every(
        (cell, offset) =>
          normalize(paragraphs[start + offset]) === normalize(cell),
      )) {
        matches.push(start);
      }
    }

    if (matches.length !== 1) {
      throw new Error(
        `K912 source table ${table.sourceTable}: expected one exact match, got ${matches.length}`,
      );
    }

    const start = matches[0];

    for (const [otherStart, previous] of replacements) {
      if (
        start < otherStart + previous.length &&
        otherStart < start + cells.length
      ) {
        throw new Error("K912 source tables overlap");
      }
    }

    replacements.set(start, {
      length: cells.length,
      rows: table.rows,
    });
  }

  const blocks: K912SourceBlock[] = [];

  for (let index = 0; index < paragraphs.length;) {
    const table = replacements.get(index);

    if (table) {
      blocks.push({ kind: "table", rows: table.rows });
      index += table.length;
      continue;
    }

    const text = paragraphs[index++];
    const marker = text.match(/^\s*[〔\[]([A-Z0-9_]+)[〕\]]/);

    if (marker) {
      const id = marker[1];

      if (!Object.prototype.hasOwnProperty.call(verifiedSlots, id)) {
        throw new Error(`Missing verified K912 slot: ${id}`);
      }

      const value = verifiedSlots[id];

      if (value === null && id === "P3_EVIDENCE") {
        continue;
      }

      if (typeof value !== "string" || !value.trim()) {
        throw new Error(`Invalid verified K912 slot: ${id}`);
      }

      blocks.push({ kind: "paragraph", text: value });
      continue;
    }

    blocks.push({ kind: "paragraph", text });
  }

  return blocks;
}
