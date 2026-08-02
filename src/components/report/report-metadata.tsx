import type {
  ReactNode,
} from "react";

export interface ReportMetadataItem {
  label: ReactNode;
  value: ReactNode;
}

export interface ReportMetadataProps {
  items: readonly ReportMetadataItem[];
}

export function ReportMetadata({
  items,
}: ReportMetadataProps) {
  return (
    <dl className="grid grid-cols-[auto_auto] gap-x-5 gap-y-1 text-sm leading-6 text-[#6d746b] lg:text-right">
      {items.map((item, index) => (
        <div
          key={`${String(item.label)}-${index}`}
          className="contents"
        >
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
