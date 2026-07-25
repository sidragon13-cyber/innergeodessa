import type { AssessmentQuestion } from "./schema";

export const assessmentQuestionTemplate: AssessmentQuestion = {
  id: "personality-example-001",
  module: "personality",
  order: 1,
  dimension: "EI",
  reverseScored: false,
  prompt: {
    en: "Replace this with the English question.",
    zh: "请将这里替换为中文题目。",
  },
  options: [
    {
      value: 1,
      label: {
        en: "Strongly disagree",
        zh: "非常不同意",
      },
    },
    {
      value: 2,
      label: {
        en: "Disagree",
        zh: "不同意",
      },
    },
    {
      value: 3,
      label: {
        en: "Neither agree nor disagree",
        zh: "既不同意也不赞同",
      },
    },
    {
      value: 4,
      label: {
        en: "Agree",
        zh: "同意",
      },
    },
    {
      value: 5,
      label: {
        en: "Strongly agree",
        zh: "非常同意",
      },
    },
  ],
  metadata: {
    contentVersion: "1.0.0",
    status: "draft",
    reviewed: false,
  },
};
