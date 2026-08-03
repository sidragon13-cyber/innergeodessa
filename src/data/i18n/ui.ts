import type {
  SupportedLocale,
} from "@/data/shared";

export type UiDictionary = {
  navigation: {
    primaryLabel: string;
    explore: string;
    howItWorks: string;
    about: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      emphasizedTitle: string;
      description: string;
      primaryAction: string;
      note: string;
      personalityLabel: string;
      careerLabel: string;
      zodiacLabel: string;
      youLabel: string;
    };
    explore: {
      eyebrow: string;
      title: string;
      description: string;
      products: {
        personality: {
          title: string;
          description: string;
          metadata: string;
          cta: string;
        };
        career: {
          title: string;
          description: string;
          metadata: string;
          cta: string;
        };
        zodiac: {
          title: string;
          description: string;
          metadata: string;
          cta: string;
        };
      };
    };
    profile: {
      eyebrow: string;
      title: string;
      emphasizedTitle: string;
      description: string;
      exampleLabel: string;
      personalityLabel: string;
      careerLabel: string;
      zodiacLabel: string;
      careerExample: string;
      zodiacExample: string;
      note: string;
    };
    values: {
      eyebrow: string;
      title: string;
      description: string;
      items: readonly {
        number: string;
        title: string;
        description: string;
      }[];
      futureNote: string;
    };
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      emphasizedTitle: string;
      description: string;
      primaryAction: string;
      note: string;
      personalityLabel: string;
      careerLabel: string;
      zodiacLabel: string;
      youLabel: string;
    };
  };
  footer: {
    navigationLabel: string;
    tagline: string;
    personality: string;
    career: string;
    zodiac: string;
    privacy: string;
    terms: string;
  };
  accessibility: {
    homeLabel: string;
  };
};

export const uiDictionaries: Record<
  SupportedLocale,
  UiDictionary
> = {
  en: {
    navigation: {
      primaryLabel: "Primary navigation",
      explore: "Explore",
      howItWorks: "How It Works",
      about: "About",
    },
    home: {
      hero: {
        eyebrow: "Your inner coordinates",
        title: "Discover who you are.",
        emphasizedTitle: "Find where you may thrive.",
        description:
          "Explore your personality, career interests, and zodiac identity through three thoughtful self-discovery experiences.",
        primaryAction: "Start Exploring",
        note: "Begin with any test. No account required.",
        personalityLabel: "Personality",
        careerLabel: "Career",
        zodiacLabel: "Zodiac",
        youLabel: "You",
      },
    },
    home: {
      hero: {
        eyebrow: "Your inner coordinates",
        title: "Discover who you are.",
        emphasizedTitle: "Find where you may thrive.",
        description:
          "Explore your personality, career interests, and zodiac identity through three thoughtful self-discovery experiences.",
        primaryAction: "Start Exploring",
        note: "Begin with any test. No account required.",
        personalityLabel: "Personality",
        careerLabel: "Career",
        zodiacLabel: "Zodiac",
        youLabel: "You",
      },
      explore: {
        eyebrow: "Explore yourself",
        title: "Three ways to understand yourself",
        description:
          "Start anywhere. Each experience offers a different lens on what makes you, you.",
        products: {
          personality: {
            title: "Personality Test",
            description:
              "Understand how you gain energy, process information, make decisions, and approach life.",
            metadata: "72 questions · 10–15 minutes",
            cta: "Start Personality Test",
          },
          career: {
            title: "Career Interest",
            description:
              "Discover the activities, environments, and fields that naturally attract you.",
            metadata: "36 questions · 5–7 minutes",
            cta: "Explore Career Interests",
          },
          zodiac: {
            title: "Zodiac Identity",
            description:
              "Begin with your birth information and explore your calculated zodiac profile.",
            metadata: "About 2–3 minutes",
            cta: "Discover Your Chart",
          },
        },
      },
      profile: {
        eyebrow: "How it comes together",
        title: "One profile.",
        emphasizedTitle: "Three dimensions.",
        description:
          "Each result becomes part of your InnerGeo identity profile, helping you understand yourself from different perspectives.",
        exampleLabel: "Example identity",
        personalityLabel: "Personality",
        careerLabel: "Career interests",
        zodiacLabel: "Zodiac",
        careerExample: "Investigative · Artistic",
        zodiacExample: "Scorpio",
        note:
          "A preview of how three perspectives can sit together. Saving profiles is not yet available.",
      },
      values: {
        eyebrow: "Thoughtful by design",
        title: "More than a label",
        description:
          "Results are starting points for reflection—not boxes to put yourself in.",
        items: [
          {
            number: "01",
            title: "Understand your patterns",
            description:
              "Notice the preferences and tendencies that shape how you move through everyday life.",
          },
          {
            number: "02",
            title: "Explore suitable directions",
            description:
              "Use your interests and natural inclinations as thoughtful starting points for what comes next.",
          },
          {
            number: "03",
            title: "Connect through shared identities",
            description:
              "See where your perspective overlaps with others as community features develop in a later phase.",
          },
        ],
        futureNote:
          "Community features are planned for a later phase.",
      },
    },
    footer: {
      navigationLabel: "Footer navigation",
      tagline: "Self-discovery, thoughtfully mapped.",
      personality: "Personality",
      career: "Career",
      zodiac: "Zodiac",
      privacy: "Privacy",
      terms: "Terms",
    },
    accessibility: {
      homeLabel: "InnerGeo home",
    },
  },

  zh: {
    navigation: {
      primaryLabel: "主要导航",
      explore: "探索",
      howItWorks: "如何运作",
      about: "关于我们",
    },
    home: {
      hero: {
        eyebrow: "你的内在坐标",
        title: "发现真实的自己。",
        emphasizedTitle: "找到可能更适合你的方向。",
        description:
          "通过人格类型、职业兴趣与星座身份三种自我探索体验，从不同角度理解自己。",
        primaryAction: "开始探索",
        note: "可从任意一项开始，无需注册账户。",
        personalityLabel: "人格",
        careerLabel: "职业",
        zodiacLabel: "星座",
        youLabel: "你",
      },
    },
    home: {
      hero: {
        eyebrow: "你的内在坐标",
        title: "发现真实的自己。",
        emphasizedTitle: "找到可能更适合你的方向。",
        description:
          "通过人格类型、职业兴趣与星座身份三种自我探索体验，从不同角度理解自己。",
        primaryAction: "开始探索",
        note: "可从任意一项开始，无需注册账户。",
        personalityLabel: "人格",
        careerLabel: "职业",
        zodiacLabel: "星座",
        youLabel: "你",
      },
      explore: {
        eyebrow: "探索自己",
        title: "从三个角度理解自己",
        description:
          "可从任意一项开始。每一种体验都会提供不同的视角，帮助你更全面地认识自己。",
        products: {
          personality: {
            title: "人格类型测评",
            description:
              "了解你获取能量、处理信息、作出决定和面对生活的倾向。",
            metadata: "72题 · 约10–15分钟",
            cta: "开始人格测评",
          },
          career: {
            title: "职业兴趣测评",
            description:
              "发现更能吸引你的活动类型、工作环境与职业领域。",
            metadata: "36题 · 约5–7分钟",
            cta: "探索职业兴趣",
          },
          zodiac: {
            title: "星座身份探索",
            description:
              "从出生信息开始，探索经过计算生成的个人星盘与星座身份。",
            metadata: "约2–3分钟",
            cta: "生成个人星盘",
          },
        },
      },
      profile: {
        eyebrow: "三种结果如何结合",
        title: "一份个人档案。",
        emphasizedTitle: "三个理解维度。",
        description:
          "每一项结果都会成为你的 InnerGeo 身份档案的一部分，帮助你从不同角度理解自己。",
        exampleLabel: "身份档案示例",
        personalityLabel: "人格类型",
        careerLabel: "职业兴趣",
        zodiacLabel: "星座身份",
        careerExample: "研究型 · 艺术型",
        zodiacExample: "天蝎座",
        note:
          "这是三种视角组合后的示例。个人档案保存功能尚未开放。",
      },
      values: {
        eyebrow: "经过审慎设计",
        title: "不只是一个标签",
        description:
          "测评结果是反思与探索的起点，而不是限制你的固定框架。",
        items: [
          {
            number: "01",
            title: "理解自己的模式",
            description:
              "观察影响你日常思考、选择与行动方式的倾向和偏好。",
          },
          {
            number: "02",
            title: "探索适合的方向",
            description:
              "把兴趣与自然倾向作为起点，审慎探索未来可能的发展方向。",
          },
          {
            number: "03",
            title: "通过共同身份建立连接",
            description:
              "随着社区功能在后续阶段逐步开放，发现你与他人在观点和身份上的交集。",
          },
        ],
        futureNote:
          "社区功能计划在后续阶段开放。",
      },
    },
    footer: {
      navigationLabel: "页脚导航",
      tagline: "审慎探索自我，清晰描绘内在坐标。",
      personality: "人格测评",
      career: "职业兴趣",
      zodiac: "星座身份",
      privacy: "隐私",
      terms: "条款",
    },
    accessibility: {
      homeLabel: "InnerGeo 首页",
    },
  },
};

export function getUiDictionary(
  locale: SupportedLocale,
): UiDictionary {
  return uiDictionaries[locale];
}
