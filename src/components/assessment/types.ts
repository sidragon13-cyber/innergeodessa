export interface AssessmentDisplayItem {
  item_id: string;
  wording: string;
  master_order: number;
}

export interface AssessmentAnswerOption {
  value: number;
  label: string;
}

export interface AssessmentAnswerRecord {
  value: number;
  responseTimeMs: number;
}

export type AssessmentViewStatus = "loading" | "ready" | "error";
