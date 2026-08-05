import type {
  SupportedLocale,
} from "@/data/shared";

export type CareerTestDictionary = {
  eyebrow: string;

  answerOptions: readonly {
    value: number;
    label: string;
  }[];

  errors: {
    createSession: string;
    loadItems: string;
    incompleteQuestionBank: string;
    loadAssessment: string;
    saveAnswer: string;
    generateResult: string;
  };

  completion: {
    successMessage: string;
    eyebrow: string;
    title: string;
  };
};

export const careerTestDictionaries: Record<
  SupportedLocale,
  CareerTestDictionary
> = {
  en: {
    eyebrow: "Career interest assessment",

    answerOptions: [
      {
        value: 1,
        label: "Strongly dislike",
      },
      {
        value: 2,
        label: "Dislike",
      },
      {
        value: 3,
        label: "Neutral",
      },
      {
        value: 4,
        label: "Like",
      },
      {
        value: 5,
        label: "Strongly like",
      },
    ],

    errors: {
      createSession:
        "Unable to create assessment session.",
      loadItems:
        "Unable to load assessment items.",
      incompleteQuestionBank:
        "The assessment did not return all 36 questions.",
      loadAssessment:
        "The assessment could not be loaded.",
      saveAnswer:
        "The answer could not be saved.",
      generateResult:
        "The assessment result could not be generated.",
    },

    completion: {
      successMessage:
        "Assessment completed and result generated successfully.",
      eyebrow: "Assessment Complete",
      title: "Result generated successfully",
    },
  },

  zh: {
    eyebrow: "职业兴趣测评",

    answerOptions: [
      {
        value: 1,
        label: "非常不喜欢",
      },
      {
        value: 2,
        label: "不喜欢",
      },
      {
        value: 3,
        label: "一般",
      },
      {
        value: 4,
        label: "喜欢",
      },
      {
        value: 5,
        label: "非常喜欢",
      },
    ],

    errors: {
      createSession:
        "无法创建测评会话。",
      loadItems:
        "无法加载职业兴趣题目。",
      incompleteQuestionBank:
        "测评没有返回完整的36道题目。",
      loadAssessment:
        "职业兴趣测评暂时无法加载。",
      saveAnswer:
        "答案保存失败。",
      generateResult:
        "暂时无法生成职业兴趣结果。",
    },

    completion: {
      successMessage:
        "职业兴趣测评已经完成，结果已成功生成。",
      eyebrow: "测评完成",
      title: "结果已成功生成",
    },
  },
};

export function getCareerTestDictionary(
  locale: SupportedLocale,
): CareerTestDictionary {
  return careerTestDictionaries[locale];
}
