import type {
  RiasecDimension,
} from "@/data/career";
import type {
  SupportedLocale,
} from "@/data/shared";

export type CareerResultDictionary = {
  dateLocale: string;

  errors: {
    missingSession: string;
    loadResult: string;
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
      action: string;
    };
  };

  header: {
    eyebrow: string;
    title: string;
    description: string;
    codeLabel: string;
  };

  topInterests: {
    eyebrow: string;
    title: string;
    rank: (rank: number) => string;
    score: (score: number) => string;
  };

  fullProfile: {
    eyebrow: string;
    title: string;
    score: (percentage: number, score: number) => string;
    ariaLabel: (
      name: string,
      percentage: number,
    ) => string;
  };

  summary: {
    questionsAnswered: string;
    questionBankVersion: string;
    completed: string;
  };

  report: {
    eyebrow: string;
    title: (code: string) => string;
    description: string;
    action: (code: string) => string;
  };

  print: {
    savePdf: string;
    printReport: string;
  };

  navigation: {
    retake: string;
    overview: string;
  };

  dimensions: Record<
    RiasecDimension,
    {
      name: string;
      secondaryName: string;
      shortLabel: string;
      description: string;
    }
  >;
};

export const careerResultDictionaries: Record<
  SupportedLocale,
  CareerResultDictionary
> = {
  en: {
    dateLocale: "en",

    errors: {
      missingSession:
        "The assessment session ID is missing.",
      loadResult:
        "The career result could not be loaded.",
    },

    states: {
      loading: {
        eyebrow: "Career Interest Assessment",
        title: "Preparing your result…",
        message:
          "Your six career-interest dimensions are being loaded.",
      },
      error: {
        eyebrow: "Result unavailable",
        title:
          "We could not load this career result.",
        fallbackMessage:
          "The completed career result is unavailable.",
        action: "Start a new assessment",
      },
    },

    header: {
      eyebrow: "Career Interest Assessment",
      title: "Your Career Interest Code",
      description:
        "Your result reflects the activities, environments, and kinds of work that currently attract your interest.",
      codeLabel: "RIASEC code",
    },

    topInterests: {
      eyebrow: "Your strongest interests",
      title: "Top three dimensions",
      rank: (rank) => `Rank ${rank}`,
      score: (score) => `Score ${score}`,
    },

    fullProfile: {
      eyebrow: "Full profile",
      title: "All six interest dimensions",
      score: (percentage, score) =>
        `${percentage}% · Score ${score}`,
      ariaLabel: (name, percentage) =>
        `${name}: ${percentage}%`,
    },

    summary: {
      questionsAnswered: "Questions answered",
      questionBankVersion:
        "Question bank version",
      completed: "Completed",
    },

    report: {
      eyebrow: "Detailed Career Report",
      title: (code) =>
        `Explore your complete ${code} career profile`,
      description:
        "Review your interest combination, work style, preferred environment, strengths, development risks, career fields, example roles, skills roadmap, and 90-day action plan.",
      action: (code) =>
        `View complete ${code} career report`,
    },

    print: {
      savePdf: "Save as PDF",
      printReport: "Print report",
    },

    navigation: {
      retake: "Retake assessment",
      overview: "Back to career overview",
    },

    dimensions: {
      R: {
        name: "Realistic",
        secondaryName: "现实型",
        shortLabel: "Practical and hands-on",
        description:
          "You are drawn to practical activities, tools, machines, physical systems, and visible real-world outcomes.",
      },
      I: {
        name: "Investigative",
        secondaryName: "研究型",
        shortLabel: "Analytical and curious",
        description:
          "You are drawn to analysis, research, complex questions, evidence, data, and understanding how systems work.",
      },
      A: {
        name: "Artistic",
        secondaryName: "艺术型",
        shortLabel: "Creative and expressive",
        description:
          "You are drawn to imagination, original ideas, design, storytelling, expression, and flexible ways of working.",
      },
      S: {
        name: "Social",
        secondaryName: "社会型",
        shortLabel: "Supportive and people-focused",
        description:
          "You are drawn to helping, teaching, guiding, supporting, and improving the development or wellbeing of others.",
      },
      E: {
        name: "Enterprising",
        secondaryName: "企业型",
        shortLabel:
          "Persuasive and initiative-driven",
        description:
          "You are drawn to leadership, persuasion, business, negotiation, decision-making, and turning ideas into action.",
      },
      C: {
        name: "Conventional",
        secondaryName: "常规型",
        shortLabel:
          "Structured and detail-focused",
        description:
          "You are drawn to order, accuracy, records, procedures, planning, and reliable systems for organising information.",
      },
    },
  },

  zh: {
    dateLocale: "zh-CN",

    errors: {
      missingSession:
        "缺少测评会话编号。",
      loadResult:
        "职业兴趣测评结果加载失败。",
    },

    states: {
      loading: {
        eyebrow: "职业兴趣测评",
        title: "正在准备你的测评结果…",
        message:
          "正在加载六个职业兴趣维度的评分结果。",
      },
      error: {
        eyebrow: "结果暂时不可用",
        title:
          "无法加载这份职业兴趣测评结果。",
        fallbackMessage:
          "已完成的职业兴趣测评结果暂时不可用。",
        action: "重新开始测评",
      },
    },

    header: {
      eyebrow: "职业兴趣测评",
      title: "你的职业兴趣代码",
      description:
        "这份结果反映了目前能够吸引你的活动、工作环境以及工作类型。",
      codeLabel: "RIASEC 代码",
    },

    topInterests: {
      eyebrow: "你最突出的职业兴趣",
      title: "排名前三的兴趣维度",
      rank: (rank) => `第 ${rank} 位`,
      score: (score) => `得分 ${score}`,
    },

    fullProfile: {
      eyebrow: "完整兴趣档案",
      title: "六个职业兴趣维度",
      score: (percentage, score) =>
        `${percentage}% · 得分 ${score}`,
      ariaLabel: (name, percentage) =>
        `${name}：${percentage}%`,
    },

    summary: {
      questionsAnswered: "已回答题目",
      questionBankVersion: "题库版本",
      completed: "完成时间",
    },

    report: {
      eyebrow: "完整职业兴趣报告",
      title: (code) =>
        `深入了解你的 ${code} 职业兴趣档案`,
      description:
        "查看你的兴趣组合、工作方式、偏好环境、主要优势、发展风险、职业领域、示例岗位、技能路线图以及90天行动计划。",
      action: (code) =>
        `查看完整 ${code} 职业兴趣报告`,
    },

    print: {
      savePdf: "保存为 PDF",
      printReport: "打印结果",
    },

    navigation: {
      retake: "重新进行测评",
      overview: "返回职业兴趣首页",
    },

    dimensions: {
      R: {
        name: "现实型",
        secondaryName: "Realistic",
        shortLabel: "重视实践与动手操作",
        description:
          "你容易被实际活动、工具、机器、物理系统以及可以清楚看见的现实成果所吸引。",
      },
      I: {
        name: "研究型",
        secondaryName: "Investigative",
        shortLabel: "重视分析与探索",
        description:
          "你容易被分析、研究、复杂问题、证据、数据以及理解系统运行方式所吸引。",
      },
      A: {
        name: "艺术型",
        secondaryName: "Artistic",
        shortLabel: "重视创造与表达",
        description:
          "你容易被想象、原创思想、设计、故事表达以及更加灵活的工作方式所吸引。",
      },
      S: {
        name: "社会型",
        secondaryName: "Social",
        shortLabel: "重视帮助与人的发展",
        description:
          "你容易被帮助、教育、指导、支持他人以及促进他人成长或福祉的活动所吸引。",
      },
      E: {
        name: "企业型",
        secondaryName: "Enterprising",
        shortLabel: "重视领导、影响与行动",
        description:
          "你容易被领导、说服、商业、谈判、决策以及把想法转化为行动的过程所吸引。",
      },
      C: {
        name: "常规型",
        secondaryName: "Conventional",
        shortLabel: "重视结构与细节",
        description:
          "你容易被秩序、准确性、记录、流程、规划以及可靠的信息管理系统所吸引。",
      },
    },
  },
};

export function getCareerResultDictionary(
  locale: SupportedLocale,
): CareerResultDictionary {
  return careerResultDictionaries[locale];
}
