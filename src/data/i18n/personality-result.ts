import type {
  SupportedLocale,
} from "@/data/shared";

export type PersonalityResultDictionary = {
  states: {
    loading: {
      eyebrow: string;
      title: string;
      message: string;
    };
    notFound: {
      eyebrow: string;
      title: string;
      message: string;
      action: string;
    };
    notCompleted: {
      eyebrow: string;
      title: string;
      message: string;
      action: string;
    };
    error: {
      eyebrow: string;
      title: string;
      message: string;
      action: string;
    };
  };

  header: {
    eyebrow: string;
    subtitle: string;
    completed: string;
    sessionLabel: string;
  };

  sections: {
    overview: string;
    coreTraits: string;
    profileInDevelopment: string;
    scoredSuccessfully: string;
    profileInDevelopmentMessage: string;
    dimensionOverview: string;
    confidence: string;
    strengths: string;
    growthRisks: string;
    developmentFocus: string;
    careerDirections: string;
    premiumReport: string;
    premiumLaterMessage: string;
  };

  dimensions: {
    EI: string;
    SN: string;
    TF: string;
    JP: string;
  };

  premium: {
    viewCompleteReport: (
      personalityType: string,
    ) => string;
  };

  navigation: {
    retake: string;
    overview: string;
  };
};

export const personalityResultDictionaries: Record<
  SupportedLocale,
  PersonalityResultDictionary
> = {
  en: {
    states: {
      loading: {
        eyebrow: "Loading result",
        title: "Loading your personality result…",
        message:
          "Retrieving the completed assessment from the result service.",
      },
      notFound: {
        eyebrow: "Result not found",
        title: "This result could not be found.",
        message:
          "Check the result link or complete a new personality assessment.",
        action: "Start assessment",
      },
      notCompleted: {
        eyebrow: "Assessment not completed",
        title: "This assessment has not been completed.",
        message:
          "Return to the assessment and answer all questions before viewing the result.",
        action: "Continue assessment",
      },
      error: {
        eyebrow: "Unable to load result",
        title: "Your result could not be loaded.",
        message:
          "The result service is temporarily unavailable. Please try again later.",
        action: "Start assessment",
      },
    },

    header: {
      eyebrow: "InnerGeo Personality Assessment",
      subtitle: "Your personality type",
      completed: "Assessment completed",
      sessionLabel: "Session",
    },

    sections: {
      overview: "Personality Overview",
      coreTraits: "Core Personality Traits",
      profileInDevelopment: "Profile in development",
      scoredSuccessfully:
        "Your assessment has been scored successfully.",
      profileInDevelopmentMessage:
        "The detailed profile for this personality type is currently being prepared. Your dimension scores remain available below.",
      dimensionOverview: "Dimension Overview",
      confidence: "Confidence",
      strengths: "Key Strengths",
      growthRisks: "Growth Risks",
      developmentFocus: "Development focus",
      careerDirections: "Career Directions",
      premiumReport: "Premium Report",
      premiumLaterMessage:
        "Premium reports will be introduced in a later development stage.",
    },

    dimensions: {
      EI: "Extraversion — Introversion",
      SN: "Sensing — Intuition",
      TF: "Thinking — Feeling",
      JP: "Judging — Perceiving",
    },

    premium: {
      viewCompleteReport: (personalityType) =>
        `VIEW COMPLETE ${personalityType} REPORT — $7.99`,
    },

    navigation: {
      retake: "Take assessment again",
      overview: "Personality overview",
    },
  },

  zh: {
    states: {
      loading: {
        eyebrow: "正在加载结果",
        title: "正在加载你的人格测评结果…",
        message:
          "正在从结果服务中读取已完成的测评数据。",
      },
      notFound: {
        eyebrow: "未找到结果",
        title: "无法找到这份测评结果。",
        message:
          "请检查结果链接，或重新完成人格测评。",
        action: "开始测评",
      },
      notCompleted: {
        eyebrow: "测评尚未完成",
        title: "这项测评还没有完成。",
        message:
          "请返回测评并完成全部题目后再查看结果。",
        action: "继续测评",
      },
      error: {
        eyebrow: "无法加载结果",
        title: "暂时无法加载你的测评结果。",
        message:
          "结果服务暂时不可用，请稍后重试。",
        action: "开始测评",
      },
    },

    header: {
      eyebrow: "InnerGeo 人格类型测评",
      subtitle: "你的人格类型",
      completed: "测评已完成",
      sessionLabel: "会话",
    },

    sections: {
      overview: "人格概览",
      coreTraits: "核心人格特征",
      profileInDevelopment: "人格档案正在完善",
      scoredSuccessfully:
        "你的测评已经成功完成评分。",
      profileInDevelopmentMessage:
        "这一人格类型的详细档案正在准备中，你仍然可以在下方查看四个维度的评分结果。",
      dimensionOverview: "维度概览",
      confidence: "置信度",
      strengths: "主要优势",
      growthRisks: "成长风险",
      developmentFocus: "成长重点",
      careerDirections: "职业方向",
      premiumReport: "完整报告",
      premiumLaterMessage:
        "完整报告将在后续开发阶段逐步开放。",
    },

    dimensions: {
      EI: "外向 — 内向",
      SN: "实感 — 直觉",
      TF: "思考 — 情感",
      JP: "判断 — 感知",
    },

    premium: {
      viewCompleteReport: (personalityType) =>
        `查看完整 ${personalityType} 人格报告 — $7.99`,
    },

    navigation: {
      retake: "重新进行测评",
      overview: "返回人格测评首页",
    },
  },
};

export function getPersonalityResultDictionary(
  locale: SupportedLocale,
): PersonalityResultDictionary {
  return personalityResultDictionaries[locale];
}
