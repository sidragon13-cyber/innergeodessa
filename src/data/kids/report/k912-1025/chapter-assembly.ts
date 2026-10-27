import { K912ContentBindingError } from "./content-binding";

export type K912ChapterNumber =
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface K912Chapter1025 {
  readonly number: K912ChapterNumber;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly variableSlots: readonly {
    readonly id: string;
    readonly text: string | null;
  }[];
}

const SLOT_PLACEMENTS: Readonly<
  Record<K912ChapterNumber, readonly string[]>
> = {
  1: ["P1_RESULT", "P1_SUMMARY"],
  2: ["P3_PROFILE", "P3_EVIDENCE", "P3_RELATION"],
  3: ["P4_INTEREST"],
  4: ["P5_ACTIVITY"],
  5: ["P6_PLAN", "P7_OBSERVATION"],
  6: [],
  7: [],
  8: [],
};

export function assembleK912Chapters1025(
  fixed70: readonly string[],
  slots: Readonly<Record<string, string | null>>,
): readonly K912Chapter1025[] {
  const headings: {
    number: K912ChapterNumber;
    index: number;
    title: string;
  }[] = [];

  fixed70.forEach((text, index) => {
    const match = text.match(/^0([1-8])\s*[｜|]/);

    if (match) {
      headings.push({
        number: Number(match[1]) as K912ChapterNumber,
        index,
        title: text,
      });
    }
  });

  if (
    headings.length !== 8 ||
    headings.some((heading, index) =>
      heading.number !== index + 1
    )
  ) {
    throw new K912ContentBindingError(
      "K912-1025 eight-chapter structure invalid",
    );
  }

  // K912_SOURCE_POSITION_BINDING_V1
  // Bind variable content at the authoritative DOCX markers,
  // not at the end of each chapter.
  const expectedMarkers = new Set(
    Object.values(SLOT_PLACEMENTS).flat(),
  );

  const seenMarkers = new Set<string>();

  const chapters = headings.map((heading, index) => {
    const nextIndex =
      headings[index + 1]?.index ?? fixed70.length;

    const paragraphs = fixed70.slice(
      heading.index + 1,
      nextIndex,
    );

    const expectedForChapter =
      SLOT_PLACEMENTS[heading.number];

    const blocks: Array<
      | { kind: "paragraph"; text: string }
      | { kind: "variable"; id: string; text: string }
    > = [];

    for (const paragraph of paragraphs) {
      const marker = paragraph.match(
        /^\s*[〔\[]([A-Z0-9_]+)[〕\]]/,
      );

      if (!marker) {
        blocks.push({
          kind: "paragraph",
          text: paragraph,
        });
        continue;
      }

      const id = marker[1];

      if (!expectedMarkers.has(id)) {
        throw new K912ContentBindingError(
          `Unknown K912 source marker: ${id}`,
        );
      }

      if (!expectedForChapter.includes(id)) {
        throw new K912ContentBindingError(
          `K912 marker in wrong chapter: ${id}`,
        );
      }

      if (seenMarkers.has(id)) {
        throw new K912ContentBindingError(
          `Duplicate K912 source marker: ${id}`,
        );
      }

      if (!Object.prototype.hasOwnProperty.call(slots, id)) {
        throw new K912ContentBindingError(
          `Missing K912 source slot: ${id}`,
        );
      }

      seenMarkers.add(id);

      const value = slots[id];

      // Verified question evidence is optional.
      if (
          value === null &&
          (id === "P1_RESULT" || id === "P3_EVIDENCE")
        ) {
          continue;
        }

      if (typeof value !== "string" || !value.trim()) {
        throw new K912ContentBindingError(
          `Invalid K912 source slot: ${id}`,
        );
      }

      blocks.push({
        kind: "variable",
        id,
        text: value,
      });
    }

    return {
      number: heading.number,
      title: heading.title,
      paragraphs: blocks.map(block => block.text),
      blocks,
      variableSlots: expectedForChapter.map(id => ({
        id,
        text: slots[id],
      })),
    };
  });

  // P1 slots belong to the cover and are handled separately.
  for (const id of expectedMarkers) {
    if (id.startsWith("P1_")) continue;
    if (!seenMarkers.has(id)) {
      throw new K912ContentBindingError(
        `K912 source marker not found: ${id}`,
      );
    }
  }

  return chapters;
}
