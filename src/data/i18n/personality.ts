import type {
  SupportedLocale,
} from "@/data/shared";

export type PersonalityLandingDictionary = {
  metadata: {
    title: string;
    description: string;
  };

  contourLabel: string;

  hero: {
    eyebrow: string;
    title: string;
    description: string;
    detailsLabel: string;
    details: readonly string[];
    primaryAction: string;
    secondaryAction: string;
  };

  dimensions: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly {
      number: string;
      name: string;
      spectrum: string;
      description: string;
      initials: readonly [string, string];
    }[];
  };

  result: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly string[];
    note: string;
  };

  guidance: {
    eyebrow: string;
    title: string;
    items: readonly string[];
  };

  limitations: {
    eyebrow: string;
    title: string;
    items: readonly string[];
  };

  finalCta: {
    eyebrow: string;
    title: string;
    action: string;
    note: string;
  };
};

export const personalityLandingDictionaries: Record<
  SupportedLocale,
  PersonalityLandingDictionary
> = {
  en: {
    metadata: {
      title: "Personality Test — InnerGeo",
      description:
        "Explore four broad personality dimensions through a reflective 72-question self-discovery assessment.",
    },

    contourLabel: "Your pattern",

    hero: {
      eyebrow: "Personality",
      title:
        "Understand the patterns behind how you think, decide, and engage with the world.",
      description:
        "This reflective assessment explores four broad personality dimensions and combines them into one of sixteen descriptive profiles.",
      detailsLabel: "Assessment details",
      details: [
        "72 questions",
        "8–12 minutes",
        "No account required",
      ],
      primaryAction: "Begin the Assessment",
      secondaryAction: "How the assessment works",
    },

    dimensions: {
      eyebrow: "The framework",
      title: "Four dimensions. One profile.",
      description:
        "Each dimension describes a continuum of preferences. Neither side is better, healthier, or more capable than the other.",
      items: [
        {
          number: "01",
          name: "Energy",
          spectrum: "Extraversion — Introversion",
          description:
            "How you tend to direct and restore your energy.",
          initials: ["E", "I"],
        },
        {
          number: "02",
          name: "Information",
          spectrum: "Sensing — Intuition",
          description:
            "How you tend to notice, interpret, and connect information.",
          initials: ["S", "N"],
        },
        {
          number: "03",
          name: "Decisions",
          spectrum: "Thinking — Feeling",
          description:
            "How you tend to weigh logic, values, and human impact.",
          initials: ["T", "F"],
        },
        {
          number: "04",
          name: "Structure",
          spectrum: "Judging — Perceiving",
          description:
            "How you tend to approach planning, openness, and daily life.",
          initials: ["J", "P"],
        },
      ],
    },

    result: {
      eyebrow: "Your result",
      title: "What you will receive",
      description:
        "A clear starting point for reflection, with practical language you can carry into work, learning, and everyday life.",
      items: [
        "A four-letter personality profile",
        "A plain-language explanation of your tendencies",
        "Strengths and possible blind spots",
        "Preferred working and learning environments",
        "Career areas worth exploring",
        "A complete personality report you can review and print",
      ],
      note:
        "Your result is generated immediately after completion. No account or sign-in is required.",
    },

    guidance: {
      eyebrow: "Before you begin",
      title: "Answer as you usually are",
      items: [
        "Choose the response that reflects your typical behaviour.",
        "Do not answer according to who you think you should be.",
        "Avoid overthinking individual questions.",
        "There are no right or wrong personality types.",
      ],
    },

    limitations: {
      eyebrow: "Use with perspective",
      title: "A tool for reflection, not diagnosis.",
      items: [
        "This is an original self-exploration assessment inspired by public personality-dimension theory.",
        "It is not an official MBTI assessment. MBTI is a trademark of The Myers-Briggs Company.",
        "Results are not medical, psychological, or employment diagnoses.",
        "Treat your result as one perspective rather than a fixed identity.",
      ],
    },

    finalCta: {
      eyebrow: "Personality assessment",
      title: "Ready to explore your personality?",
      action: "Begin the Assessment",
      note: "72 questions · approximately 8–12 minutes",
    },
  },

  zh: {
    metadata: {
      title: "人格类型测评｜InnerGeo",
      description:
        "通过72道人格探索题目，了解四个主要人格维度与个人倾向。",
    },

    contourLabel: "你的模式",

    hero: {
      eyebrow: "人格类型",
      title:
        "理解你在思考、决策以及与世界互动时所表现出的内在模式。",
      description:
        "这项反思型测评探索四个主要人格维度，并将结果组合为十六种描述性人格类型之一。",
      detailsLabel: "测评信息",
      details: [
        "72道题",
        "约8–12分钟",
        "无需注册账户",
      ],
      primaryAction: "开始人格测评",
      secondaryAction: "了解测评方式",
    },

    dimensions: {
      eyebrow: "测评框架",
      title: "四个维度，一份人格档案。",
      description:
        "每个维度都代表一组连续的人格偏好。两端没有优劣、健康程度或能力高低之分。",
      items: [
        {
          number: "01",
          name: "能量方向",
          spectrum: "外向 — 内向",
          description:
            "你通常如何投入、恢复和管理自己的心理能量。",
          initials: ["E", "I"],
        },
        {
          number: "02",
          name: "信息方式",
          spectrum: "实感 — 直觉",
          description:
            "你通常如何注意、解释并连接外部信息。",
          initials: ["S", "N"],
        },
        {
          number: "03",
          name: "决策方式",
          spectrum: "思考 — 情感",
          description:
            "你通常如何衡量逻辑、价值观以及对他人的影响。",
          initials: ["T", "F"],
        },
        {
          number: "04",
          name: "生活结构",
          spectrum: "判断 — 感知",
          description:
            "你通常如何面对计划、开放性与日常生活安排。",
          initials: ["J", "P"],
        },
      ],
    },

    result: {
      eyebrow: "你的结果",
      title: "你将获得什么",
      description:
        "一份清晰的自我反思起点，并以实用语言帮助你理解工作、学习和日常生活中的个人倾向。",
      items: [
        "四字母人格类型",
        "对个人倾向的清晰解释",
        "主要优势与可能的盲点",
        "更适合的工作与学习环境",
        "值得进一步探索的职业方向",
        "可查看和打印的完整人格报告",
      ],
      note:
        "完成测评后会立即生成结果，无需注册或登录账户。",
    },

    guidance: {
      eyebrow: "开始之前",
      title: "按照你通常的真实状态作答",
      items: [
        "选择最符合你日常行为的答案。",
        "不要按照你认为自己应该成为的样子作答。",
        "避免对单个问题进行过度思考。",
        "人格类型没有正确或错误之分。",
      ],
    },

    limitations: {
      eyebrow: "保持合理视角",
      title: "用于反思，而不是医学诊断。",
      items: [
        "这是一项原创自我探索测评，参考了公开的人格维度理论。",
        "它不是官方 MBTI 测评。MBTI 是 The Myers-Briggs Company 的注册商标。",
        "测评结果不能作为医学、心理或就业诊断。",
        "请把结果视为理解自己的一个角度，而不是固定身份。",
      ],
    },

    finalCta: {
      eyebrow: "人格类型测评",
      title: "准备好探索自己的人格模式了吗？",
      action: "开始人格测评",
      note: "72道题 · 约8–12分钟",
    },
  },
};

export function getPersonalityLandingDictionary(
  locale: SupportedLocale,
): PersonalityLandingDictionary {
  return personalityLandingDictionaries[locale];
}
