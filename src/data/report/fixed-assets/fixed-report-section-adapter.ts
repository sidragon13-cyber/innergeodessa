import type {
  FixedReportRichBlock,
  FixedReportRichDocument,
} from "./fixed-report-rich-content";

export const FIXED_REPORT_SECTION_IDS = [
  "data-summary",
  "core-personality-profile",
  "thinking-decision-structure",
  "personal-dimension-structure",
  "core-traits-environment-blind-spots",
  "career-learning-relationship-fit",
  "future-environment-development",
  "opportunity-capability-map",
  "personal-future-map",
  "report-interpretation",
  "conclusion",
  "disclaimer",
  "appendix",
] as const;

export type FixedReportSectionId =
  (typeof FIXED_REPORT_SECTION_IDS)[number];

export interface FixedReportSection {
  readonly id: FixedReportSectionId;
  readonly order: number;
  readonly sourceTitle: string;
  readonly blocks:
    readonly FixedReportRichBlock[];
}

export interface FixedReportSectionDocument {
  readonly frontMatter:
    readonly FixedReportRichBlock[];
  readonly sections:
    readonly FixedReportSection[];
}

interface CanonicalSectionDefinition {
  readonly id: FixedReportSectionId;
  readonly matches: (
    title: string,
  ) => boolean;
}

const CANONICAL_SECTIONS:
  readonly CanonicalSectionDefinition[] = [
    {
      id: "data-summary",
      matches: (title) =>
        title ===
        "数据摘要｜Data Summary",
    },
    {
      id: "core-personality-profile",
      matches: (title) =>
        title.startsWith(
          "01｜核心人格画像",
        ),
    },
    {
      id: "thinking-decision-structure",
      matches: (title) =>
        title.startsWith(
          "02｜思维与决策结构",
        ),
    },
    {
      id: "personal-dimension-structure",
      matches: (title) =>
        title.startsWith(
          "03｜你的个人维度结构",
        ),
    },
    {
      id:
        "core-traits-environment-blind-spots",
      matches: (title) =>
        title.startsWith(
          "04｜核心特征、环境与潜在盲点",
        ),
    },
    {
      id:
        "career-learning-relationship-fit",
      matches: (title) =>
        title.startsWith(
          "05｜职业、学习与亲密关系适配",
        ),
    },
    {
      id:
        "future-environment-development",
      matches: (title) =>
        title.startsWith(
          "06｜未来环境与发展方向",
        ),
    },
    {
      id: "opportunity-capability-map",
      matches: (title) =>
        title.startsWith(
          "07｜机会与能力地图",
        ),
    },
    {
      id: "personal-future-map",
      matches: (title) =>
        title.startsWith(
          "08｜个人未来地图",
        ),
    },
    {
      id: "report-interpretation",
      matches: (title) =>
        title.startsWith(
          "09｜如何正确理解这份报告",
        ),
    },
    {
      id: "conclusion",
      matches: (title) =>
        title === "最终结论",
    },
    {
      id: "disclaimer",
      matches: (title) =>
        title === "免责声明",
    },
    {
      id: "appendix",
      matches: (title) =>
        title.startsWith(
          "Appendix｜",
        ),
    },
  ];

export function adaptFixedReportSections(
  document: FixedReportRichDocument,
): FixedReportSectionDocument {
  const boundaries =
    findCanonicalBoundaries(
      document.blocks,
    );

  assertCanonicalSequence(
    boundaries,
  );

  const firstBoundary =
    boundaries[0];

  if (!firstBoundary) {
    throw new Error(
      "Fixed report contains no canonical sections.",
    );
  }

  const frontMatter =
    document.blocks.slice(
      0,
      firstBoundary.blockIndex,
    );

  if (!frontMatter.length) {
    throw new Error(
      "Fixed report front matter is missing.",
    );
  }

  const sections =
    boundaries.map(
      (
        boundary,
        boundaryIndex,
      ): FixedReportSection => {
        const nextBoundary =
          boundaries[
            boundaryIndex + 1
          ];

        const endIndex =
          nextBoundary
            ? nextBoundary.blockIndex
            : document.blocks.length;

        const blocks =
          document.blocks.slice(
            boundary.blockIndex + 1,
            endIndex,
          );

        if (!blocks.length) {
          throw new Error(
            `Canonical section ${boundary.definition.id} is empty.`,
          );
        }

        return {
          id:
            boundary.definition.id,
          order:
            boundaryIndex + 1,
          sourceTitle:
            boundary.title,
          blocks,
        };
      },
    );

  assertPartitionIntegrity(
    document,
    frontMatter,
    sections,
  );

  return {
    frontMatter,
    sections,
  };
}

interface SectionBoundary {
  readonly definition:
    CanonicalSectionDefinition;
  readonly blockIndex: number;
  readonly title: string;
}

function findCanonicalBoundaries(
  blocks:
    readonly FixedReportRichBlock[],
): SectionBoundary[] {
  const boundaries:
    SectionBoundary[] = [];

  for (
    let blockIndex = 0;
    blockIndex < blocks.length;
    blockIndex += 1
  ) {
    const block =
      blocks[blockIndex];

    if (
      !block ||
      block.type !== "heading" ||
      block.level !== 1
    ) {
      continue;
    }

    const normalizedTitle =
      normalizeHeadingText(
        block.text,
      );

    const matches =
      CANONICAL_SECTIONS.filter(
        (definition) =>
          definition.matches(
            normalizedTitle,
          ),
      );

    if (matches.length > 1) {
      throw new Error(
        `Ambiguous canonical H1: ${block.text}`,
      );
    }

    const definition =
      matches[0];

    if (!definition) {
      continue;
    }

    boundaries.push({
      definition,
      blockIndex,
      title: block.text,
    });
  }

  return boundaries;
}

function assertCanonicalSequence(
  boundaries:
    readonly SectionBoundary[],
): void {
  if (
    boundaries.length !==
    CANONICAL_SECTIONS.length
  ) {
    throw new Error(
      `Expected ${CANONICAL_SECTIONS.length} canonical sections, found ${boundaries.length}.`,
    );
  }

  for (
    let index = 0;
    index <
    CANONICAL_SECTIONS.length;
    index += 1
  ) {
    const expected =
      CANONICAL_SECTIONS[index];

    const actual =
      boundaries[index];

    if (
      !expected ||
      !actual ||
      actual.definition.id !==
        expected.id
    ) {
      throw new Error(
        `Canonical section order mismatch at position ${
          index + 1
        }: expected ${
          expected?.id ??
          "unknown"
        }, found ${
          actual?.definition.id ??
          "missing"
        }.`,
      );
    }

    if (
      index > 0 &&
      actual.blockIndex <=
        boundaries[
          index - 1
        ]!.blockIndex
    ) {
      throw new Error(
        "Canonical section boundaries are not strictly increasing.",
      );
    }
  }
}

function assertPartitionIntegrity(
  document:
    FixedReportRichDocument,
  frontMatter:
    readonly FixedReportRichBlock[],
  sections:
    readonly FixedReportSection[],
): void {
  const canonicalHeadingCount =
    sections.length;

  const partitionedBlockCount =
    frontMatter.length +
    canonicalHeadingCount +
    sections.reduce(
      (
        total,
        section,
      ) =>
        total +
        section.blocks.length,
      0,
    );

  if (
    partitionedBlockCount !==
    document.blocks.length
  ) {
    throw new Error(
      `Fixed report section partition lost or duplicated blocks: source=${document.blocks.length}, partitioned=${partitionedBlockCount}.`,
    );
  }
}

function normalizeHeadingText(
  value: string,
): string {
  return value
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .trim();
}
