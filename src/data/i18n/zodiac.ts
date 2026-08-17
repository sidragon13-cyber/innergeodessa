import type {
  SupportedLocale,
} from "@/data/shared";

export type ZodiacSignLandingItem = {
  code: string;
  symbol: string;
  name: string;
  secondaryName: string;
  dates: string;
  theme: string;
  qualities: readonly string[];
};

export type ZodiacLandingAnchor = {
  symbol: string;
  label: string;
  description: string;
};

export type ZodiacResponsibleUseGroup = {
  title: string;
  items: readonly string[];
};

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

  signs: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly ZodiacSignLandingItem[];
  };

  complexity: {
    eyebrow: string;
    title: string;
    description: string;
    paragraphs: readonly string[];
    anchors: readonly ZodiacLandingAnchor[];
    traditionNote: string;
  };

  profile: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly string[];
  };

  reflection: {
    eyebrow: string;
    title: string;
    description: string;
    questions: readonly string[];
  };

  culture: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
  };

  responsibleUse: {
    eyebrow: string;
    title: string;
    description: string;
    groups: readonly ZodiacResponsibleUseGroup[];
    methodologyAction: string;
  };

  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    careerAction: string;
    personalityAction: string;
  };
};

export const zodiacLandingDictionaries: Record<
  SupportedLocale,
  ZodiacLandingDictionary
> = {
  en: {
    orbitLabel: "Sun · Moon · Rising",

    hero: {
      eyebrow: "Zodiac Interest Exploration",
      title: "Explore your birth chart from more than one sign.",
      description:
        "Begin with your birth information to explore your Sun, Moon, Rising sign, and other calculated placements as symbolic perspectives for reflection.",
      detailsLabel: "Experience details",
      details: [
        "Calculated from birth information",
        "Sun · Moon · Rising",
        "Twelve zodiac signs",
        "Symbolic exploration, not prediction",
      ],
      primaryAction: "Create Your Birth Chart",
      secondaryAction: "Explore the 12 Signs",
    },

    approach: {
      eyebrow: "Our approach",
      title: "A symbolic perspective, not a fixed definition.",
      paragraphs: [
        "Zodiac can offer a cultural and symbolic language for reflecting on patterns, stories, relationships, and identity themes.",
        "InnerGeo treats these ideas as prompts for exploration—not as a scientific personality assessment or a complete definition of who you are.",
      ],
    },

    signs: {
      eyebrow: "The twelve signs",
      title: "Meet the 12 signs",
      description:
        "Twelve signs offer twelve symbolic starting points. Explore their themes as invitations to reflect, not rules about who you must be.",
      items: [
        {
          code: "AR",
          symbol: "♈",
          name: "Aries",
          secondaryName: "白羊座",
          dates: "21 March – 19 April",
          theme: "Initiative, courage, and forward movement.",
          qualities: ["Action", "Independence", "Directness", "Starting new paths"],
        },
        {
          code: "TA",
          symbol: "♉",
          name: "Taurus",
          secondaryName: "金牛座",
          dates: "20 April – 20 May",
          theme: "Stability, value, patience, and grounded strength.",
          qualities: ["Consistency", "Comfort", "Loyalty", "Practical creation"],
        },
        {
          code: "GE",
          symbol: "♊",
          name: "Gemini",
          secondaryName: "双子座",
          dates: "21 May – 20 June",
          theme: "Curiosity, connection, language, and changing perspectives.",
          qualities: ["Communication", "Adaptability", "Learning", "Multiple interests"],
        },
        {
          code: "CA",
          symbol: "♋",
          name: "Cancer",
          secondaryName: "巨蟹座",
          dates: "21 June – 22 July",
          theme: "Care, belonging, memory, and emotional protection.",
          qualities: ["Home", "Sensitivity", "Loyalty", "Emotional awareness"],
        },
        {
          code: "LE",
          symbol: "♌",
          name: "Leo",
          secondaryName: "狮子座",
          dates: "23 July – 22 August",
          theme: "Expression, confidence, creativity, and visible warmth.",
          qualities: ["Leadership", "Generosity", "Identity", "Creative presence"],
        },
        {
          code: "VI",
          symbol: "♍",
          name: "Virgo",
          secondaryName: "处女座",
          dates: "23 August – 22 September",
          theme: "Discernment, improvement, service, and thoughtful order.",
          qualities: ["Analysis", "Detail", "Usefulness", "Refinement"],
        },
        {
          code: "LI",
          symbol: "♎",
          name: "Libra",
          secondaryName: "天秤座",
          dates: "23 September – 22 October",
          theme: "Balance, relationship, beauty, and shared understanding.",
          qualities: ["Harmony", "Fairness", "Diplomacy", "Aesthetics"],
        },
        {
          code: "SC",
          symbol: "♏",
          name: "Scorpio",
          secondaryName: "天蝎座",
          dates: "23 October – 21 November",
          theme: "Depth, transformation, trust, and hidden strength.",
          qualities: ["Intensity", "Resilience", "Privacy", "Emotional truth"],
        },
        {
          code: "SA",
          symbol: "♐",
          name: "Sagittarius",
          secondaryName: "射手座",
          dates: "22 November – 21 December",
          theme: "Exploration, meaning, freedom, and expanding horizons.",
          qualities: ["Travel", "Philosophy", "Optimism", "Discovery"],
        },
        {
          code: "CP",
          symbol: "♑",
          name: "Capricorn",
          secondaryName: "摩羯座",
          dates: "22 December – 19 January",
          theme: "Responsibility, endurance, structure, and long-term achievement.",
          qualities: ["Discipline", "Ambition", "Reliability", "Strategic progress"],
        },
        {
          code: "AQ",
          symbol: "♒",
          name: "Aquarius",
          secondaryName: "水瓶座",
          dates: "20 January – 18 February",
          theme: "Originality, independence, community, and future thinking.",
          qualities: ["Innovation", "Ideals", "Unconventional thinking", "Collective change"],
        },
        {
          code: "PI",
          symbol: "♓",
          name: "Pisces",
          secondaryName: "双鱼座",
          dates: "19 February – 20 March",
          theme: "Imagination, empathy, intuition, and emotional openness.",
          qualities: ["Creativity", "Compassion", "Symbolism", "Inner worlds"],
        },
      ],
    },

    complexity: {
      eyebrow: "Beyond the sun sign",
      title: "Your zodiac profile is more than one sign.",
      description:
        "A birth chart brings several calculated symbolic perspectives together.",
      paragraphs: [
        "Your Sun sign is only one part of the picture. The Moon and Rising sign add different symbolic perspectives on inner responses and how you meet the world.",
      ],
      anchors: [
        {
          symbol: "☉",
          label: "Sun",
          description:
            "Core identity themes and the qualities you most consciously recognize.",
        },
        {
          symbol: "☽",
          label: "Moon",
          description:
            "Emotional patterns, instinctive responses, and the inner world.",
        },
        {
          symbol: "↑",
          label: "Rising",
          description:
            "How you approach life, present yourself, and first meet the world.",
        },
      ],
      traditionNote:
        "InnerGeo calculates these positions from your birth date, local birth time, and birth location, then presents them as symbolic perspectives for reflection.",
    },

    profile: {
      eyebrow: "Your birth chart",
      title: "What your birth chart includes",
      description:
        "See your key chart placements and complete interpretation, calculated from your birth date, time, and location.",
      items: [
        "Sun sign",
        "Moon sign",
        "Rising sign",
        "Planetary positions",
        "Birth time & location",
        "Complete chart report",
      ],
    },

    reflection: {
      eyebrow: "Reflection prompts",
      title: "Use the chart as a starting point for questions.",
      description:
        "Notice what resonates, what feels different, and what you want to explore further.",
      questions: [
        "Which themes feel familiar?",
        "What feels different from how I see myself?",
        "What would I like to explore further?",
      ],
    },

    culture: {
      eyebrow: "Symbol · Story · Culture",
      title: "A tradition shaped across time and place",
      paragraphs: [
        "Zodiac traditions have evolved across long histories, regions, and cultural contexts.",
        "InnerGeo approaches them as symbolic and cultural material for reflection, storytelling, and personal curiosity.",
      ],
    },

    responsibleUse: {
      eyebrow: "Responsible use",
      title: "Use zodiac as reflection, not evidence or advice.",
      description:
        "InnerGeo zodiac content supports symbolic exploration and personal curiosity. It does not replace evidence, professional advice, or real-world judgment.",
      groups: [
        {
          title: "Use it for",
          items: [
            "Reflection",
            "Culture and storytelling",
            "Symbolic exploration",
            "Personal curiosity",
          ],
        },
        {
          title: "Do not use it for",
          items: [
            "Psychological or medical diagnosis",
            "Financial or legal decisions",
            "Employment decisions",
            "Deterministic predictions",
          ],
        },
        {
          title: "Remember",
          items: [
            "Important decisions should consider reliable evidence, individual circumstances, and qualified professional advice where appropriate.",
          ],
        },
      ],
      methodologyAction: "Explore Methodology & Use Boundaries",
    },

    finalCta: {
      eyebrow: "Begin your chart",
      title: "Begin with your birth chart. Explore another perspective on yourself.",
      description:
        "Enter your birth information to calculate your chart and begin exploring its symbolic patterns.",
      primaryAction: "Create Your Birth Chart",
      careerAction: "Explore Career Interests",
      personalityAction: "Explore Personality",
    },
  },

  zh: {
    orbitLabel: "太阳 · 月亮 · 上升",

    hero: {
      eyebrow: "星座兴趣探索",
      title: "从出生星盘开始，看见不止一个星座。",
      description:
        "从你的出生信息出发，探索太阳、月亮、上升点及其他计算位置，把它们作为理解自己的象征性视角。",
      detailsLabel: "体验信息",
      details: [
        "根据出生信息计算",
        "太阳 · 月亮 · 上升",
        "十二星座",
        "用于象征探索，而非预测",
      ],
      primaryAction: "创建你的出生星盘",
      secondaryAction: "认识十二星座",
    },

    approach: {
      eyebrow: "我们的方式",
      title: "一种象征视角，而不是对你的固定定义。",
      paragraphs: [
        "星座可以提供一种文化与象征性的语言，帮助我们思考行为模式、故事、关系和身份主题。",
        "InnerGeo 把这些内容作为探索自己的提示，而不是科学人格测评，也不会用一个星座完整定义你是谁。",
      ],
    },

    signs: {
      eyebrow: "十二星座",
      title: "认识十二星座",
      description:
        "十二个星座提供十二个象征性的探索起点。把这些主题视为反思的邀请，而不是规定你必须成为怎样的人。",
      items: [
        {
          code: "AR",
          symbol: "♈",
          name: "白羊座",
          secondaryName: "Aries",
          dates: "3月21日 – 4月19日",
          theme: "主动、勇气，以及向前迈进的力量。",
          qualities: ["行动力", "独立", "直接", "开辟新路"],
        },
        {
          code: "TA",
          symbol: "♉",
          name: "金牛座",
          secondaryName: "Taurus",
          dates: "4月20日 – 5月20日",
          theme: "稳定、价值、耐心与脚踏实地的力量。",
          qualities: ["持续性", "安定感", "忠诚", "务实创造"],
        },
        {
          code: "GE",
          symbol: "♊",
          name: "双子座",
          secondaryName: "Gemini",
          dates: "5月21日 – 6月20日",
          theme: "好奇、连接、语言与不断变化的视角。",
          qualities: ["沟通", "适应力", "学习", "多元兴趣"],
        },
        {
          code: "CA",
          symbol: "♋",
          name: "巨蟹座",
          secondaryName: "Cancer",
          dates: "6月21日 – 7月22日",
          theme: "关怀、归属、记忆与情感上的守护。",
          qualities: ["家与归属", "敏感", "忠诚", "情绪觉察"],
        },
        {
          code: "LE",
          symbol: "♌",
          name: "狮子座",
          secondaryName: "Leo",
          dates: "7月23日 – 8月22日",
          theme: "表达、自信、创造力与鲜明的温度。",
          qualities: ["领导力", "慷慨", "自我认同", "创造性表达"],
        },
        {
          code: "VI",
          symbol: "♍",
          name: "处女座",
          secondaryName: "Virgo",
          dates: "8月23日 – 9月22日",
          theme: "辨别、改善、服务与有条理的思考。",
          qualities: ["分析", "细节", "实用性", "精进"],
        },
        {
          code: "LI",
          symbol: "♎",
          name: "天秤座",
          secondaryName: "Libra",
          dates: "9月23日 – 10月22日",
          theme: "平衡、关系、美感与相互理解。",
          qualities: ["和谐", "公平", "协调", "审美"],
        },
        {
          code: "SC",
          symbol: "♏",
          name: "天蝎座",
          secondaryName: "Scorpio",
          dates: "10月23日 – 11月21日",
          theme: "深度、转化、信任与隐藏的力量。",
          qualities: ["强度", "韧性", "边界感", "情感真实"],
        },
        {
          code: "SA",
          symbol: "♐",
          name: "射手座",
          secondaryName: "Sagittarius",
          dates: "11月22日 – 12月21日",
          theme: "探索、意义、自由与不断拓展的视野。",
          qualities: ["远行", "思辨", "乐观", "发现"],
        },
        {
          code: "CP",
          symbol: "♑",
          name: "摩羯座",
          secondaryName: "Capricorn",
          dates: "12月22日 – 1月19日",
          theme: "责任、耐力、结构与长期成就。",
          qualities: ["自律", "抱负", "可靠", "策略性进展"],
        },
        {
          code: "AQ",
          symbol: "♒",
          name: "水瓶座",
          secondaryName: "Aquarius",
          dates: "1月20日 – 2月18日",
          theme: "原创、独立、社群意识与面向未来的思考。",
          qualities: ["创新", "理想", "非惯常思维", "共同改变"],
        },
        {
          code: "PI",
          symbol: "♓",
          name: "双鱼座",
          secondaryName: "Pisces",
          dates: "2月19日 – 3月20日",
          theme: "想象、共情、直觉与情感开放。",
          qualities: ["创造力", "同理心", "象征感", "内在世界"],
        },
      ],
    },

    complexity: {
      eyebrow: "不止太阳星座",
      title: "你的星座结构，不只是太阳星座。",
      description:
        "出生星盘把多个经过计算的象征视角组合在一起。",
      paragraphs: [
        "太阳星座只是其中一部分。月亮与上升点会从内在反应、情绪模式以及你面对世界的方式提供另外的象征视角。",
      ],
      anchors: [
        {
          symbol: "☉",
          label: "太阳",
          description:
            "核心身份主题，以及你较容易主动认同和表达的特质。",
        },
        {
          symbol: "☽",
          label: "月亮",
          description:
            "情绪模式、本能反应，以及更私密的内在世界。",
        },
        {
          symbol: "↑",
          label: "上升",
          description:
            "你面对生活、呈现自己以及最初接触世界的方式。",
        },
      ],
      traditionNote:
        "InnerGeo 根据出生日期、当地出生时间和出生地点计算这些位置，并把它们作为用于自我反思的象征视角呈现。",
    },

    profile: {
      eyebrow: "你的出生星盘",
      title: "你的出生星盘包含什么",
      description:
        "根据你的出生日期、时间与地点，查看关键星盘位置及完整解读。",
      items: [
        "太阳星座",
        "月亮星座",
        "上升星座",
        "行星位置",
        "出生时间与地点",
        "完整星盘报告",
      ],
    },

    reflection: {
      eyebrow: "反思提示",
      title: "把星盘作为提出问题的起点。",
      description:
        "留意哪些内容让你产生共鸣，哪些与你对自己的理解不同，以及你还想继续探索什么。",
      questions: [
        "哪些主题让我感到熟悉？",
        "哪些内容与我对自己的理解不同？",
        "我还想进一步探索什么？",
      ],
    },

    culture: {
      eyebrow: "象征 · 故事 · 文化",
      title: "在时间与地域中不断演变的传统",
      paragraphs: [
        "星座传统经历了漫长的历史演变，并在不同地域与文化语境中形成了不同表达。",
        "InnerGeo 将它们作为文化、象征和叙事材料，用于反思、探索与个人兴趣。",
      ],
    },

    responsibleUse: {
      eyebrow: "负责任地使用",
      title: "把星座用于反思，而不是作为证据或建议。",
      description:
        "InnerGeo 的星座内容用于象征探索与个人兴趣，不替代可靠证据、专业建议或现实判断。",
      groups: [
        {
          title: "适合用于",
          items: [
            "自我反思",
            "文化与故事",
            "象征性探索",
            "个人兴趣",
          ],
        },
        {
          title: "不应作为",
          items: [
            "心理或医疗诊断",
            "财务或法律决策",
            "就业决定",
            "确定性的未来预测",
          ],
        },
        {
          title: "请记住",
          items: [
            "重要决定应结合可靠证据、个人实际情况，并在适当时寻求合格专业人士的建议。",
          ],
        },
      ],
      methodologyAction: "了解方法与使用边界",
    },

    finalCta: {
      eyebrow: "开始你的星盘",
      title: "从你的出生星盘开始，探索理解自己的另一种视角。",
      description:
        "输入出生信息，计算你的星盘，并从这些象征性结构开始继续探索。",
      primaryAction: "创建你的出生星盘",
      careerAction: "探索职业兴趣",
      personalityAction: "探索人格",
    },
  },
};

export function getZodiacLandingDictionary(
  locale: SupportedLocale,
): ZodiacLandingDictionary {
  return zodiacLandingDictionaries[locale];
}
