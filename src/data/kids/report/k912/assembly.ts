import type {
  GeneratedK912ProfessionalReport,
  K912ReportBlockKind,
  K912ReportSectionId,
} from "./generator";
import type { K912ReportLocale } from "./types";

export interface AssembledK912ReportBlock {
  readonly id: string;
  readonly kind: K912ReportBlockKind;
  readonly title?: string;
  readonly paragraphs: readonly string[];
  readonly items: readonly string[];
}

export interface AssembledK912ReportSection {
  readonly id: K912ReportSectionId;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly blocks: readonly AssembledK912ReportBlock[];
}

const splitParagraphs = (value: string): readonly string[] =>
  value
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

const splitItems = (value: string): readonly string[] =>
  value
    .split(/\n+/)
    .map((part) =>
      part
        .trim()
        .replace(/^(?:[-•*]\s*|\d+[.)、]\s*)/, ""),
    )
    .filter(Boolean);

export function assembleK912ReportSections(
  report: GeneratedK912ProfessionalReport,
  locale: K912ReportLocale,
): readonly AssembledK912ReportSection[] {
  return report.sections.map((section) => ({
    id: section.id,
    title: section.title[locale],

    paragraphs: section.paragraphs.flatMap((paragraph) =>
      splitParagraphs(paragraph[locale]),
    ),

    blocks: (section.blocks ?? []).map((block) => ({
      id: block.id,
      kind: block.kind,
      title: block.title?.[locale],

      paragraphs: (block.paragraphs ?? []).flatMap((paragraph) =>
        splitParagraphs(paragraph[locale]),
      ),

      items: (block.items ?? []).flatMap((item) =>
        splitItems(item[locale]),
      ),
    })),
  }));
}


export interface AssembledK912ReportChapter {
  readonly id: string;
  readonly title: string;
  readonly sections: readonly AssembledK912ReportSection[];
}

const K912_CHAPTERS = [
  {
    id: "report-overview",
    en: "Report Overview and Key Findings",
    zh: "报告说明与核心发现",
    indices: [1, 0],
  },
  {
    id: "interest-map",
    en: "Six-Domain Interest Map and Current Pattern",
    zh: "六维兴趣地图与当前结构",
    indices: [2, 3, 7],
  },
  {
    id: "top-three",
    en: "Top Three Interest Directions",
    zh: "前三兴趣方向专业分析",
    indices: [4],
  },
  {
    id: "facet-evidence",
    en: "Real Facet Evidence",
    zh: "真实Facet证据与个性化解释",
    indices: [5],
  },
  {
    id: "interest-combination",
    en: "Top Two Interest Combination",
    zh: "前两兴趣组合与发展方向",
    indices: [6],
  },
  {
    id: "exploration-actions",
    en: "Exploration Environments and Projects",
    zh: "探索环境与实践项目",
    indices: [8, 9],
  },
  {
    id: "parent-child-plan",
    en: "Parent and Child Action Plan",
    zh: "家长观察与孩子反思行动计划",
    indices: [10],
  },
  {
    id: "methodology",
    en: "Methodology and Interpretation Boundaries",
    zh: "方法说明与专业解释边界",
    indices: [11],
  },
] as const;

export function assembleK912ReportChapters(
  report: GeneratedK912ProfessionalReport,
  locale: K912ReportLocale,
): readonly AssembledK912ReportChapter[] {
  const sections = assembleK912ReportSections(report, locale);

  if (
    sections.length !== 12 ||
    sections[0]?.id !== "report-identity" ||
    sections[1]?.id !== "parent-child-executive-summary" ||
    sections[4]?.id !== "highlighted-interest-drivers" ||
    sections[5]?.id !== "behaviour-evidence" ||
    sections[6]?.id !== "interest-combination" ||
    sections[7]?.id !== "broader-interest-context" ||
    sections[8]?.id !== "exploration-environments" ||
    sections[9]?.id !== "what-to-explore-next" ||
    sections[10]?.id !== "parent-child-observation-plan" ||
    sections[11]?.id !== "methodology-interpretation-boundaries"
  ) {
    throw new Error("K912_CHAPTER_SOURCE_ORDER_MISMATCH");
  }

  const assignedIndices = K912_CHAPTERS.flatMap(
    (chapter) => [...chapter.indices],
  );

  if (
    assignedIndices.length !== 12 ||
    new Set(assignedIndices).size !== 12
  ) {
    throw new Error("K912_CHAPTER_MAPPING_INVALID");
  }

  return K912_CHAPTERS.map((chapter) => ({
    id: chapter.id,
    title: chapter[locale],
    sections: chapter.indices.map((index) => sections[index]),
  }));
}
