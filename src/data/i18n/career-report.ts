import type {
  CareerReportBlockType,
  RiasecDimension,
} from "@/data/career";
import type {
  SupportedLocale,
} from "@/data/shared";

export type CareerReportDictionary = {
  dateLocale: string;

  errors: {
    loadReport: string;
  };

  states: {
    loading: {
      eyebrow: string;
      title: string;
      message: string;
    };
    error: {
      eyebrow: string;
      title: string;
      fallbackMessage: string;
    };
    actions: {
      result: string;
      newAssessment: string;
    };
  };

  header: {
    eyebrow: string;
    subtitle: string;
    description: string;
    completed: string;
    questionBank: string;
    session: string;
    print: string;
  };

  contents: {
    ariaLabel: string;
    title: string;
    description: string;
  };

  navigation: {
    result: string;
    overview: string;
  };

  blockLabels: Record<
    CareerReportBlockType,
    string
  >;

  dimensionNames: Record<
    RiasecDimension,
    string
  >;
};

export const careerReportDictionaries: Record<
  SupportedLocale,
  CareerReportDictionary
> = {
  en: {
    dateLocale: "en",

    errors: {
      loadReport:
        "The career report could not be loaded.",
    },

    states: {
      loading: {
        eyebrow: "Career Interest Report",
        title:
          "Preparing your detailed career report…",
        message:
          "Loading your completed RIASEC result and generating the report.",
      },
      error: {
        eyebrow: "Career Interest Report",
        title:
          "Your career report could not be loaded.",
        fallbackMessage:
          "The completed career result is unavailable.",
      },
      actions: {
        result: "Back to result",
        newAssessment: "New assessment",
      },
    },

    header: {
      eyebrow:
        "InnerGeo Complete Career Interest Report",
      subtitle: "RIASEC professional report",
      description:
        "A detailed interpretation of your six career-interest dimensions, preferred work environment, career fields, skills, risks, and next actions.",
      completed: "Completed",
      questionBank: "Question bank",
      session: "Session",
      print: "Print / Save as PDF",
    },

    contents: {
      ariaLabel:
        "Career report table of contents",
      title: "Table of contents",
      description:
        "Navigate directly to any section of your career report.",
    },

    navigation: {
      result: "Back to career result",
      overview: "Career overview",
    },

    blockLabels: {
      summary: "Summary",
      analysis: "Analysis",
      strength: "Strengths",
      risk: "Risks",
      guidance: "Guidance",
      action: "Action",
    },

    dimensionNames: {
      R: "Realistic",
      I: "Investigative",
      A: "Artistic",
      S: "Social",
      E: "Enterprising",
      C: "Conventional",
    },
  },

  zh: {
    dateLocale: "zh-CN",

    errors: {
      loadReport:
        "职业兴趣报告加载失败。",
    },

    states: {
      loading: {
        eyebrow: "职业兴趣报告",
        title:
          "正在生成你的完整职业兴趣报告…",
        message:
          "正在读取已完成的 RIASEC 结果并生成报告。",
      },
      error: {
        eyebrow: "职业兴趣报告",
        title:
          "暂时无法加载你的职业兴趣报告。",
        fallbackMessage:
          "已完成的职业兴趣测评结果暂时不可用。",
      },
      actions: {
        result: "返回测评结果",
        newAssessment: "重新进行测评",
      },
    },

    header: {
      eyebrow:
        "InnerGeo 完整职业兴趣报告",
      subtitle: "RIASEC 深度报告",
      description:
        "深入分析你的六个职业兴趣维度、偏好工作环境、职业领域、技能方向、潜在风险与下一步行动。",
      completed: "完成时间",
      questionBank: "题库版本",
      session: "会话",
      print: "打印 / 保存为 PDF",
    },

    contents: {
      ariaLabel: "职业兴趣报告目录",
      title: "报告目录",
      description:
        "选择任意章节，可以直接跳转到报告中的对应部分。",
    },

    navigation: {
      result: "返回职业兴趣结果",
      overview: "返回职业兴趣首页",
    },

    blockLabels: {
      summary: "总结",
      analysis: "分析",
      strength: "优势",
      risk: "风险",
      guidance: "建议",
      action: "行动",
    },

    dimensionNames: {
      R: "现实型",
      I: "研究型",
      A: "艺术型",
      S: "社会型",
      E: "企业型",
      C: "常规型",
    },
  },
};

export function getCareerReportDictionary(
  locale: SupportedLocale,
): CareerReportDictionary {
  return careerReportDictionaries[locale];
}
