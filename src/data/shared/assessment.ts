import type {
  LocalizedText,
  SupportedLocale,
} from "./localization";

export const assessmentModuleCodes = [
  "personality",
  "career",
  "zodiac",
] as const;

export type AssessmentModuleCode =
  (typeof assessmentModuleCodes)[number];

export type ContentAccess =
  | "free"
  | "premium";

export type AssessmentModuleDefinition = {
  id: AssessmentModuleCode;
  name: LocalizedText;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  resultLabel: LocalizedText;
  availableLocales: SupportedLocale[];
  defaultLocale: SupportedLocale;
  enabled: boolean;
};

export const assessmentModules: Record<
  AssessmentModuleCode,
  AssessmentModuleDefinition
> = {
  personality: {
    id: "personality",
    name: {
      en: "Personality Assessment",
      zh: "人格类型测评",
    },
    shortDescription: {
      en: "Explore your personality preferences and behavioural patterns.",
      zh: "探索你的人格倾向与行为模式。",
    },
    fullDescription: {
      en:
        "A structured assessment designed to explore how you gain energy, process information, make decisions, and organise your life.",
      zh:
        "一项结构化测评，用于探索你获取能量、处理信息、作出决定和组织生活的方式。",
    },
    resultLabel: {
      en: "Your Personality Profile",
      zh: "你的人格分析",
    },
    availableLocales: ["en", "zh"],
    defaultLocale: "en",
    enabled: true,
  },

  career: {
    id: "career",
    name: {
      en: "Career Interest Assessment",
      zh: "职业兴趣测评",
    },
    shortDescription: {
      en: "Discover the work environments and activities that fit your interests.",
      zh: "发现与你的兴趣更匹配的工作活动与职业环境。",
    },
    fullDescription: {
      en:
        "A RIASEC-based assessment that identifies your strongest career-interest themes and connects them with suitable work environments and career directions.",
      zh:
        "一项基于RIASEC模型的职业兴趣测评，用于识别主要职业兴趣主题，并匹配适合的工作环境和职业方向。",
    },
    resultLabel: {
      en: "Your Career Interest Profile",
      zh: "你的职业兴趣分析",
    },
    availableLocales: ["en", "zh"],
    defaultLocale: "en",
    enabled: true,
  },

  zodiac: {
    id: "zodiac",
    name: {
      en: "Zodiac Identity",
      zh: "星座身份探索",
    },
    shortDescription: {
      en: "Explore your zodiac identity through a reflective and entertaining profile.",
      zh: "通过轻量、有趣的方式探索你的星座身份。",
    },
    fullDescription: {
      en:
        "A reflective zodiac profile designed for identity exploration and entertainment. It is separate from the platform's psychometric assessments.",
      zh:
        "一项用于身份探索和娱乐体验的星座分析，与平台中的心理测量类测评相互独立。",
    },
    resultLabel: {
      en: "Your Zodiac Profile",
      zh: "你的星座分析",
    },
    availableLocales: ["en", "zh"],
    defaultLocale: "en",
    enabled: true,
  },
};
