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
