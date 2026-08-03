import type {
  SupportedLocale,
} from "@/data/shared";

export type ZodiacLandingDictionary = {
  orbitLabel: string;

  hero: {
    eyebrow: string;
    title: string;
    description: string;
    detailsLabel: string;
    details: readonly string[];
    primaryAction: string;
    secondaryAction: string;
  };

  approach: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
  };
};

export const zodiacLandingDictionaries: Record<
  SupportedLocale,
  ZodiacLandingDictionary
> = {
  en: {
    orbitLabel: "Reflection",

    hero: {
      eyebrow: "Zodiac Identity",
      title:
        "Explore the stories you see in yourself.",
      description:
        "Zodiac traditions have connected people with symbols, seasons, stories, and shared identities for centuries. InnerGeo approaches them as a reflective language—not a fixed definition of who you are.",
      detailsLabel: "Experience details",
      details: [
        "Twelve zodiac identities",
        "Symbolic and story-based",
        "Reflection and entertainment",
        "No right or wrong identity",
      ],
      primaryAction: "Create Your Birth Chart",
      secondaryAction: "Meet the Twelve Signs",
    },

    approach: {
      eyebrow: "Our approach",
      title: "What zodiac identity means here",
      paragraphs: [
        "Zodiac signs can act as cultural and symbolic reference points for thinking about traits, patterns, hopes, contradictions, and relationships. A sign does not fully describe a person.",
        "You may identify with some themes and reject others. The value lies in reflection and conversation rather than certainty—playful, thoughtful, and never a scientifically proven personality classification.",
      ],
    },
  },

  zh: {
    orbitLabel: "自我映照",

    hero: {
      eyebrow: "星座身份探索",
      title: "探索你在这些故事中看见的自己。",
      description:
        "几个世纪以来，星座传统把人们与象征、季节、故事和共同身份连接起来。InnerGeo 将它们视为一种用于自我反思的语言，而不是对你是谁作出固定定义。",
      detailsLabel: "体验信息",
      details: [
        "十二种星座身份",
        "以象征和故事为基础",
        "用于反思与娱乐",
        "没有正确或错误的身份",
      ],
      primaryAction: "创建你的出生星盘",
      secondaryAction: "认识十二星座",
    },

    approach: {
      eyebrow: "我们的方式",
      title: "InnerGeo 如何理解星座身份",
      paragraphs: [
        "星座可以作为文化和象征性的参照点，帮助人们思考特质、行为模式、希望、矛盾和关系。但一个星座无法完整描述一个人。",
        "你可能认同其中一些主题，也可能拒绝另一些主题。它的价值在于反思和交流，而不是确定性；它可以轻松、有趣、富有思考，但不是经过科学证明的人格分类。",
      ],
    },
  },
};

export function getZodiacLandingDictionary(
  locale: SupportedLocale,
): ZodiacLandingDictionary {
  return zodiacLandingDictionaries[locale];
}
