export const RIASEC_DIMENSIONS = [
  "R",
  "I",
  "A",
  "S",
  "E",
  "C",
] as const;

export type RiasecDimension =
  (typeof RIASEC_DIMENSIONS)[number];

export type RiasecScores = Record<
  RiasecDimension,
  number
>;

export type RiasecPercentages = Record<
  RiasecDimension,
  number
>;

export type RiasecAnswer = {
  questionId: string;
  dimension: RiasecDimension;
  value: number;
  order: number;
};

export type RiasecRankedDimension = {
  dimension: RiasecDimension;
  score: number;
  percentage: number;
  rank: number;
};

export type RiasecScoreGaps = {
  firstToSecond: number;
  secondToThird: number;
  thirdToFourth: number;
};

export type RiasecResult = {
  code: string;
  scores: RiasecScores;
  percentages: RiasecPercentages;
  ranking: RiasecRankedDimension[];
  primary: RiasecDimension;
  secondary: RiasecDimension;
  tertiary: RiasecDimension;
  scoreGaps: RiasecScoreGaps;
  answeredCount: number;
  completedAt: string;
  questionBankVersion: string;
};

export type ScoreRiasecInput = {
  answers: readonly RiasecAnswer[];
  questionBankVersion: string;
  completedAt?: string;
};
