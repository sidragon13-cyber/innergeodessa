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
