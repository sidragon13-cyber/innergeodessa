import type {
  SupportedLocale,
} from "@/data/shared";

export type AssessmentDictionary = {
  shell: {
    loadingEyebrow: string;
    loadingTitle: string;
    loadingMessage: string;
    errorEyebrow: string;
    errorTitle: string;
    errorFallbackMessage: string;
    questionCounter: (
      currentQuestion: number,
      itemCount: number,
    ) => string;
  };

  progress: {
    label: string;
    ariaLabel: string;
    ariaValueText: (
      currentQuestion: number,
      itemCount: number,
    ) => string;
  };

  answerScale: {
    ariaLabel: string;
  };

  navigation: {
    previous: string;
    saving: string;
    generatingResult: string;
    assessmentComplete: string;
    saveFinalAnswer: string;
    nextQuestion: string;
    answeredCount: (
      answeredCount: number,
      itemCount: number,
    ) => string;
    sessionLabel: (sessionId: string) => string;
  };

  personalityTest: {
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
};

export const assessmentDictionaries: Record<
  SupportedLocale,
  AssessmentDictionary
> = {
  en: {
    shell: {
      loadingEyebrow: "Assessment",
      loadingTitle: "Loading your assessment…",
      loadingMessage:
        "Your questions and assessment session are being prepared.",
      errorEyebrow: "Unable to continue",
      errorTitle: "The assessment could not be loaded.",
      errorFallbackMessage:
        "Please refresh the page and try again.",
      questionCounter: (
        currentQuestion,
        itemCount,
      ) => `Question ${currentQuestion} of ${itemCount}`,
    },

    progress: {
      label: "Assessment progress",
      ariaLabel: "Assessment progress",
      ariaValueText: (
        currentQuestion,
        itemCount,
      ) => `Question ${currentQuestion} of ${itemCount}`,
    },

    answerScale: {
      ariaLabel: "Answer options",
    },

    navigation: {
      previous: "Previous",
      saving: "Saving…",
      generatingResult: "Generating result…",
      assessmentComplete: "Assessment complete",
      saveFinalAnswer: "Save final answer",
      nextQuestion: "Next question",
      answeredCount: (
        answeredCount,
        itemCount,
      ) => `Answered ${answeredCount} of ${itemCount}`,
      sessionLabel: (sessionId) =>
        `Session ${sessionId.slice(0, 8)}…`,
    },

    personalityTest: {
      eyebrow: "Personality assessment",
      answerOptions: [
        {
          value: 1,
          label: "Strongly disagree",
        },
        {
          value: 2,
          label: "Disagree",
        },
        {
          value: 3,
          label: "Neither agree nor disagree",
        },
        {
          value: 4,
          label: "Agree",
        },
        {
          value: 5,
          label: "Strongly agree",
        },
      ],
      errors: {
        createSession:
          "Unable to create assessment session.",
        loadItems:
          "Unable to load assessment items.",
        incompleteQuestionBank:
          "The assessment did not return all 72 questions.",
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
  },

  zh: {
    shell: {
      loadingEyebrow: "测评",
      loadingTitle: "正在加载测评…",
      loadingMessage:
        "正在准备题目与测评会话，请稍候。",
      errorEyebrow: "暂时无法继续",
      errorTitle: "测评加载失败。",
      errorFallbackMessage:
        "请刷新页面后重试。",
      questionCounter: (
        currentQuestion,
        itemCount,
      ) => `第 ${currentQuestion} 题，共 ${itemCount} 题`,
    },

    progress: {
      label: "测评进度",
      ariaLabel: "测评进度",
      ariaValueText: (
        currentQuestion,
        itemCount,
      ) => `第 ${currentQuestion} 题，共 ${itemCount} 题`,
    },

    answerScale: {
      ariaLabel: "答案选项",
    },

    navigation: {
      previous: "上一题",
      saving: "正在保存…",
      generatingResult: "正在生成结果…",
      assessmentComplete: "测评已完成",
      saveFinalAnswer: "提交最后一题",
      nextQuestion: "下一题",
      answeredCount: (
        answeredCount,
        itemCount,
      ) => `已回答 ${answeredCount} / ${itemCount}`,
      sessionLabel: (sessionId) =>
        `会话 ${sessionId.slice(0, 8)}…`,
    },

    personalityTest: {
      eyebrow: "人格类型测评",
      answerOptions: [
        {
          value: 1,
          label: "非常不同意",
        },
        {
          value: 2,
          label: "不同意",
        },
        {
          value: 3,
          label: "既不同意也不赞同",
        },
        {
          value: 4,
          label: "同意",
        },
        {
          value: 5,
          label: "非常同意",
        },
      ],
      errors: {
        createSession:
          "无法创建测评会话。",
        loadItems:
          "无法加载测评题目。",
        incompleteQuestionBank:
          "测评没有返回完整的72道题目。",
        loadAssessment:
          "测评暂时无法加载。",
        saveAnswer:
          "答案保存失败。",
        generateResult:
          "暂时无法生成测评结果。",
      },
      completion: {
        successMessage:
          "测评已经完成，结果已成功生成。",
        eyebrow: "测评完成",
        title: "结果已成功生成",
      },
    },
  },
};

export function getAssessmentDictionary(
  locale: SupportedLocale,
): AssessmentDictionary {
  return assessmentDictionaries[locale];
}
