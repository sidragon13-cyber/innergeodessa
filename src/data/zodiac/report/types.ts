export type ZodiacReportBlockType =
  | "summary"
  | "analysis"
  | "strength"
  | "risk"
  | "relationship"
  | "career"
  | "guidance"
  | "action"
  | "methodology";

export interface ZodiacReportBlock {
  id: string;
  type: ZodiacReportBlockType;
  title: string;
  content: string;
}

export interface ZodiacReportSection {
  id: string;
  order: number;
  title: string;
  description: string;
  blocks: ZodiacReportBlock[];
}
