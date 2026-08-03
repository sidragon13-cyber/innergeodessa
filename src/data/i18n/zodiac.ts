import type {
  SupportedLocale,
} from "@/data/shared";

export type ZodiacLandingDictionary = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
};

export const zodiacLandingDictionaries: Record<
  SupportedLocale,
  ZodiacLandingDictionary
> = {
  en: {
    hero: {
      eyebrow: "Zodiac Identity",
      title: "Explore the stories you see in yourself.",
      description:
        "Explore zodiac symbolism, stories, and reflective themes through InnerGeo.",
      primaryAction: "Create Your Birth Chart",
      secondaryAction: "Meet the Twelve Signs",
    },
  },

  zh: {
    hero: {
      eyebrow: "星座身份探索",
      title: "探索你在这些故事中看见的自己。",
      description:
        "通过 InnerGeo 探索星座象征、故事与自我反思主题。",
      primaryAction: "创建你的出生星盘",
      secondaryAction: "认识十二星座",
    },
  },
};

export function getZodiacLandingDictionary(
  locale: SupportedLocale,
): ZodiacLandingDictionary {
  return zodiacLandingDictionaries[locale];
}
