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
  },
};

export function getAssessmentDictionary(
  locale: SupportedLocale,
): AssessmentDictionary {
  return assessmentDictionaries[locale];
}
