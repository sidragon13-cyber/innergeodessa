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
