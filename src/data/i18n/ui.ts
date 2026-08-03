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
