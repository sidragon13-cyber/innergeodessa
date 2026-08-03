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
