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
      eyebrow: "Personality Assessment",
      title:
        "Understand your preference patterns—not just a four-letter type.",
      description:
        "Explore preferences across energy, information processing, decision-making and approach to daily life through a 72-question reflective assessment.",
      detailsLabel: "Assessment details",
      details: [
        "72 questions",
        "Approximately 8–12 minutes",
        "No account required to begin",
      ],
      primaryAction: "Start Personality Assessment",
      secondaryAction: "Explore the Four Dimensions",
    },

    dimensions: {
      eyebrow: "The framework",
      title: "Four dimensions. One preference pattern.",
      description:
        "Each dimension describes a direction of preference rather than a level of ability. How a preference appears can remain flexible across context, experience, and life stage.",
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
        "More than a personality type, your result gives you a set of preference signals you can continue to understand and compare with real experience.",
      items: [
        "A four-letter preference result",
        "Your tendencies across all four dimensions",
        "Preference clarity and boundary interpretation",
        "Strengths and possible blind spots to reflect on",
        "Work, learning, and development areas worth exploring",
        "A complete digital report available for deeper review",
      ],
      note:
        "Your result is generated immediately after completion. You can begin without creating an account.",
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
      eyebrow: "Personality Assessment",
      title: "Ready to understand your preference patterns?",
      action: "Start Personality Assessment",
      note:
        "72 questions · approximately 8–12 minutes · no account required to begin",
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
      eyebrow: "人格探索",
      title:
        "理解你的偏好模式，而不只是得到四个字母。",
      description:
        "通过 72 道题观察你在能量获取、信息处理、决策和生活方式上的偏好，形成四个维度的个人偏好结构，并获得进一步解释。",
      detailsLabel: "测评信息",
      details: [
        "72 道题",
        "约 8–12 分钟",
        "无需注册即可开始",
      ],
      primaryAction: "开始人格探索",
      secondaryAction: "了解四个维度",
    },

    dimensions: {
      eyebrow: "测评框架",
      title: "四个维度，构成你的偏好结构",
      description:
        "四个维度描述的是偏好方向，而不是能力高低；结果可能因情境、经历与人生阶段呈现不同程度的灵活性。",
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
      title: "完成测评后，你会得到什么",
      description:
        "不只是一个人格类型，而是一组可以继续理解、并与真实经验进行比较和验证的偏好信息。",
      items: [
        "四字母偏好结果",
        "四个维度的具体倾向",
        "清晰度与边界解释",
        "优势与可能的盲点",
        "工作、学习与发展探索",
        "可进一步查看的完整数字报告",
      ],
      note:
        "完成测评后会立即生成结果，无需注册账户即可开始。",
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
      eyebrow: "人格探索",
      title: "准备好开始了解自己的偏好模式了吗？",
      action: "开始人格探索",
      note: "72 道题 · 约 8–12 分钟 · 无需注册即可开始",
    },
  },
};

export function getPersonalityLandingDictionary(
  locale: SupportedLocale,
): PersonalityLandingDictionary {
  return personalityLandingDictionaries[locale];
}
