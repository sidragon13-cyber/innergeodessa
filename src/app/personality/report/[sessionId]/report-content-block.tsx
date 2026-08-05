import type {
  ReportContentBlock as ReportContentBlockData,
} from "@/data/report";
import {
  getLocalizedText,
  type SupportedLocale,
} from "@/data/shared";

export interface ReportContentBlockProps {
  contentBlock: Pick<
    ReportContentBlockData,
    "content" | "title" | "type"
  >;
  locale: SupportedLocale;
}

export function ReportContentBlock({
  contentBlock,
  locale,
}: ReportContentBlockProps) {
  return (
    <article className="personality-report-content-block report-print-flow-block p-7 md:p-9">
      <div className="report-print-content-heading-group">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7c684d]">
          {contentBlock.type}
        </p>

        {contentBlock.title && (
          <h3 className="mt-3 text-xl font-semibold">
            {getLocalizedText(
              contentBlock.title,
              locale,
            )}
          </h3>
        )}
      </div>

      <p className="mt-4 max-w-4xl whitespace-pre-line leading-8 text-[#596158]">
        {getLocalizedText(contentBlock.content, locale)}
      </p>
    </article>
  );
}
