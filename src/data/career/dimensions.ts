import type { RiasecDimension } from "./types";

export type RiasecDimensionProfile = {
  code: RiasecDimension;
  name: string;
  chineseName: string;
  shortLabel: string;
  description: string;
};

export const RIASEC_DIMENSION_PROFILES: Record<
  RiasecDimension,
  RiasecDimensionProfile
> = {
  R: {
    code: "R",
    name: "Realistic",
    chineseName: "现实型",
    shortLabel: "Practical and hands-on",
    description:
      "You are drawn to practical activities, tools, machines, physical systems, and visible real-world outcomes.",
  },
  I: {
    code: "I",
    name: "Investigative",
    chineseName: "研究型",
    shortLabel: "Analytical and curious",
    description:
      "You are drawn to analysis, research, complex questions, evidence, data, and understanding how systems work.",
  },
  A: {
    code: "A",
    name: "Artistic",
    chineseName: "艺术型",
    shortLabel: "Creative and expressive",
    description:
      "You are drawn to imagination, original ideas, design, storytelling, expression, and flexible ways of working.",
  },
  S: {
    code: "S",
    name: "Social",
    chineseName: "社会型",
    shortLabel: "Supportive and people-focused",
    description:
      "You are drawn to helping, teaching, guiding, supporting, and improving the development or wellbeing of others.",
  },
  E: {
    code: "E",
    name: "Enterprising",
    chineseName: "企业型",
    shortLabel: "Persuasive and initiative-driven",
    description:
      "You are drawn to leadership, persuasion, business, negotiation, decision-making, and turning ideas into action.",
  },
  C: {
    code: "C",
    name: "Conventional",
    chineseName: "常规型",
    shortLabel: "Structured and detail-focused",
    description:
      "You are drawn to order, accuracy, records, procedures, planning, and reliable systems for organising information.",
  },
};

export function getRiasecDimensionProfile(
  dimension: RiasecDimension,
): RiasecDimensionProfile {
  return RIASEC_DIMENSION_PROFILES[dimension];
}
