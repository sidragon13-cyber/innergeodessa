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
    description: string;
    items: readonly {
      title: string;
      description: string;
    }[];
  };

  limitations: {
    eyebrow: string;
    title: string;
    groups: readonly {
      label: string;
      description: string;
    }[];
    action: string;
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
      description:
        "There is no better answer to choose, and you do not need to guess which response belongs to a particular personality type.",
      items: [
        {
          title: "Answer from your usual state",
          description:
            "Choose the response that most closely reflects how you typically behave.",
        },
        {
          title: "Do not answer who you should be",
          description:
            "Respond from your actual tendencies rather than an ideal version of yourself.",
        },
        {
          title: "Avoid overthinking one question",
          description:
            "Use your usual experience instead of searching for a correct answer.",
        },
        {
          title: "There are no better personality types",
          description:
            "Each dimension describes preference, not value, ability, or maturity.",
        },
      ],
    },

    limitations: {
      eyebrow: "Responsible use",
      title: "How to use this assessment",
      groups: [
        {
          label: "Use it for",
          description:
            "Understanding preferences, noticing recurring patterns, and forming questions worth exploring further.",
        },
        {
          label: "Do not use it for",
          description:
            "Medical or psychological diagnosis, intelligence testing, ability ranking, hiring, or admission decisions.",
        },
        {
          label: "Important reminder",
          description:
            "Your result reflects the preference structure shown by your current self-report answers. It is not a fixed identity.",
        },
      ],
      action: "Explore the full methodology and use boundaries",
    },

    finalCta: {
      eyebrow: "Personality Assessment",
      title: "Start here to understand yourself more clearly.",
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
      title: "按照你通常的状态作答",
      description:
        "不需要选择“更好”的答案，也不需要猜测哪一种答案对应某个人格类型。",
      items: [
        {
          title: "按通常状态回答",
          description:
            "选择最接近日常行为的答案。",
        },
        {
          title: "不要回答“我应该是什么样”",
          description:
            "回答实际倾向，而不是理想形象。",
        },
        {
          title: "避免过度分析单道题",
          description:
            "依据通常经验作答，而不是寻找“正确答案”。",
        },
        {
          title: "没有好坏人格类型",
          description:
            "每个维度描述偏好，而不是价值、能力或成熟度。",
        },
      ],
    },

    limitations: {
      eyebrow: "合理使用",
      title: "如何使用这项测评",
      groups: [
        {
          label: "用于",
          description:
            "理解偏好、观察重复模式、形成进一步探索的问题。",
        },
        {
          label: "不用于",
          description:
            "医学或心理诊断、智力测试、能力评级、招聘或录取决定。",
        },
        {
          label: "重要提醒",
          description:
            "人格结果反映的是当前回答所呈现的偏好结构，不代表固定不变的身份。",
        },
      ],
      action: "了解完整方法与使用边界",
    },

    finalCta: {
      eyebrow: "人格探索",
      title: "从这里开始，更清楚地理解自己。",
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
