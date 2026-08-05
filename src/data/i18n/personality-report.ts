import type {
  SupportedLocale,
} from "@/data/shared";

export type PersonalityReportDictionary = {
  states: {
    actions: {
      result: string;
      overview: string;
    };
    loading: {
      label: string;
      title: string;
      message: string;
    };
    notFound: {
      label: string;
      title: string;
      message: string;
    };
    notCompleted: {
      label: string;
      title: string;
      message: string;
    };
    error: {
      label: string;
      title: string;
      message: string;
    };
    unavailable: {
      label: string;
      title: (personalityType: string) => string;
      message: string;
    };
    generationError: {
      label: string;
      title: string;
      message: string;
    };
  };

  header: {
    eyebrow: string;
    subtitle: string;
    description: string;
    printGuidance: string;
  };

  recipient: {
    label: string;
    inputAriaLabel: string;
  };

  metadata: {
    report: string;
    content: string;
    rules: string;
    appliedRules: string;
    generated: string;
    dateLocale: string;
  };

  print: {
    label: string;
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

  labels: {
    free: string;
    premium: string;
    paragraph: string;
    list: string;
    callout: string;
    table: string;
    quote: string;
    actionPlan: string;
    fallback: (value: string) => string;
  };
};

export const personalityReportDictionaries: Record<
  SupportedLocale,
  PersonalityReportDictionary
> = {
  en: {
    states: {
      actions: {
        result: "Free result",
        overview: "Personality overview",
      },
      loading: {
        label: "Loading report",
        title: "Loading your complete personality report…",
        message:
          "Retrieving the completed assessment from the result service.",
      },
      notFound: {
        label: "Result not found",
        title: "This report could not be found.",
        message:
          "Check the result link or complete a new personality assessment.",
      },
      notCompleted: {
        label: "Assessment not completed",
        title: "This assessment has not been completed.",
        message:
          "Return to the assessment and answer all questions before viewing the report.",
      },
      error: {
        label: "Unable to load report",
        title: "Your report could not be loaded.",
        message:
          "The result service is temporarily unavailable. Please try again later.",
      },
      unavailable: {
        label: "Complete report unavailable",
        title: (personalityType) =>
          `${personalityType} complete reports are not available in Phase 1.`,
        message:
          "Your free personality result remains available. Complete reports currently support ISFJ and ENTJ while the remaining personality reports complete validation.",
      },
      generationError: {
        label: "Unable to generate report",
        title: "Your complete report could not be generated.",
        message:
          "Your persisted free result is still available. Please try the complete report again later.",
      },
    },

    header: {
      eyebrow: "InnerGeo Complete Personality Report",
      subtitle: "Premium report",
      description:
        "A contextual report generated from your persisted dimension scores and confidence pattern.",
      printGuidance:
        "For a clean PDF, disable browser headers and footers in the print dialog.",
    },

    recipient: {
      label: "Prepared for",
      inputAriaLabel: "Report recipient name",
    },

    metadata: {
      report: "Report",
      content: "Content",
      rules: "Rules",
      appliedRules: "Applied rules",
      generated: "Generated",
      dateLocale: "en",
    },

    print: {
      label: "Print / Save as PDF",
    },

    contents: {
      ariaLabel: "Report table of contents",
      title: "Table of contents",
      description:
        "Navigate directly to any section of your report.",
    },

    navigation: {
      result: "Back to free result",
      overview: "Personality overview",
    },

    labels: {
      free: "Free",
      premium: "Premium",
      paragraph: "Overview",
      list: "Key points",
      callout: "Important",
      table: "Details",
      quote: "Reflection",
      actionPlan: "Action plan",
      fallback: (value) => value,
    },
  },

  zh: {
    states: {
      actions: {
        result: "查看基础结果",
        overview: "返回人格测评首页",
      },
      loading: {
        label: "正在加载报告",
        title: "正在加载你的完整人格报告…",
        message:
          "正在从结果服务中读取已完成的人格测评。",
      },
      notFound: {
        label: "未找到结果",
        title: "无法找到这份人格报告。",
        message:
          "请检查报告链接，或重新完成人格类型测评。",
      },
      notCompleted: {
        label: "测评尚未完成",
        title: "这项人格测评还没有完成。",
        message:
          "请返回测评并完成全部题目后再查看报告。",
      },
      error: {
        label: "无法加载报告",
        title: "暂时无法加载你的人格报告。",
        message:
          "结果服务暂时不可用，请稍后重试。",
      },
      unavailable: {
        label: "完整报告尚未开放",
        title: (personalityType) =>
          `${personalityType} 完整人格报告目前尚未开放。`,
        message:
          "你仍然可以查看基础人格结果。当前完整报告仅支持已完成内容验证的人格类型，其余报告正在继续完善。",
      },
      generationError: {
        label: "无法生成报告",
        title: "暂时无法生成你的完整人格报告。",
        message:
          "已经保存的基础人格结果仍然可用，请稍后重新尝试生成完整报告。",
      },
    },

    header: {
      eyebrow: "InnerGeo 完整人格报告",
      subtitle: "深度报告",
      description:
        "根据你已保存的四个人格维度评分与置信度模式生成的情境化分析报告。",
      printGuidance:
        "为了获得更整洁的 PDF，请在打印设置中关闭浏览器页眉和页脚。",
    },

    recipient: {
      label: "报告对象",
      inputAriaLabel: "报告对象姓名",
    },

    metadata: {
      report: "报告版本",
      content: "内容版本",
      rules: "规则版本",
      appliedRules: "已应用规则",
      generated: "生成时间",
      dateLocale: "zh-CN",
    },

    print: {
      label: "打印 / 保存为 PDF",
    },

    contents: {
      ariaLabel: "人格报告目录",
      title: "报告目录",
      description:
        "选择目录中的任意部分，可以直接跳转到对应报告章节。",
    },

    navigation: {
      result: "返回基础结果",
      overview: "返回人格测评首页",
    },

    labels: {
      free: "基础",
      premium: "深度",
      paragraph: "概览",
      list: "关键要点",
      callout: "重点提示",
      table: "详细信息",
      quote: "反思",
      actionPlan: "行动计划",
      fallback: (value) => value,
    },
  },
};

export function getPersonalityReportDictionary(
  locale: SupportedLocale,
): PersonalityReportDictionary {
  return personalityReportDictionaries[locale];
}
