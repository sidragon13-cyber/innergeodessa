import type {
  SupportedLocale,
} from "@/data/shared";

export type ZodiacSignLandingItem = {
  code: string;
  name: string;
  secondaryName: string;
  dates: string;
  theme: string;
  qualities: readonly string[];
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
    paragraphs: readonly string[];
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

  geodessa: {
    eyebrow: string;
    title: string;
    description: string;
    status: string;
    conceptsLabel: string;
    concepts: readonly string[];
  };

  community: {
    eyebrow: string;
    title: string;
    description: string;
  };

  responsibleUse: {
    eyebrow: string;
    title: string;
    description: string;
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
    orbitLabel: "Reflection",

    hero: {
      eyebrow: "Zodiac Identity",
      title: "Explore the stories you see in yourself.",
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

    signs: {
      eyebrow: "Symbolic identities",
      title: "Meet the twelve signs",
      description:
        "Each sign is often associated with a family of themes. Use them as invitations to reflect, not rules about how anyone must be.",
      items: [
        {
          code: "AR",
          name: "Aries",
          secondaryName: "白羊座",
          dates: "21 March – 19 April",
          theme: "Initiative, courage, and forward movement.",
          qualities: ["Action", "Independence", "Directness", "Starting new paths"],
        },
        {
          code: "TA",
          name: "Taurus",
          secondaryName: "金牛座",
          dates: "20 April – 20 May",
          theme: "Stability, value, patience, and grounded strength.",
          qualities: ["Consistency", "Comfort", "Loyalty", "Practical creation"],
        },
        {
          code: "GE",
          name: "Gemini",
          secondaryName: "双子座",
          dates: "21 May – 20 June",
          theme: "Curiosity, connection, language, and changing perspectives.",
          qualities: ["Communication", "Adaptability", "Learning", "Multiple interests"],
        },
        {
          code: "CA",
          name: "Cancer",
          secondaryName: "巨蟹座",
          dates: "21 June – 22 July",
          theme: "Care, belonging, memory, and emotional protection.",
          qualities: ["Home", "Sensitivity", "Loyalty", "Emotional awareness"],
        },
        {
          code: "LE",
          name: "Leo",
          secondaryName: "狮子座",
          dates: "23 July – 22 August",
          theme: "Expression, confidence, creativity, and visible warmth.",
          qualities: ["Leadership", "Generosity", "Identity", "Creative presence"],
        },
        {
          code: "VI",
          name: "Virgo",
          secondaryName: "处女座",
          dates: "23 August – 22 September",
          theme: "Discernment, improvement, service, and thoughtful order.",
          qualities: ["Analysis", "Detail", "Usefulness", "Refinement"],
        },
        {
          code: "LI",
          name: "Libra",
          secondaryName: "天秤座",
          dates: "23 September – 22 October",
          theme: "Balance, relationship, beauty, and shared understanding.",
          qualities: ["Harmony", "Fairness", "Diplomacy", "Aesthetics"],
        },
        {
          code: "SC",
          name: "Scorpio",
          secondaryName: "天蝎座",
          dates: "23 October – 21 November",
          theme: "Depth, transformation, trust, and hidden strength.",
          qualities: ["Intensity", "Resilience", "Privacy", "Emotional truth"],
        },
        {
          code: "SA",
          name: "Sagittarius",
          secondaryName: "射手座",
          dates: "22 November – 21 December",
          theme: "Exploration, meaning, freedom, and expanding horizons.",
          qualities: ["Travel", "Philosophy", "Optimism", "Discovery"],
        },
        {
          code: "CP",
          name: "Capricorn",
          secondaryName: "摩羯座",
          dates: "22 December – 19 January",
          theme: "Responsibility, endurance, structure, and long-term achievement.",
          qualities: ["Discipline", "Ambition", "Reliability", "Strategic progress"],
        },
        {
          code: "AQ",
          name: "Aquarius",
          secondaryName: "水瓶座",
          dates: "20 January – 18 February",
          theme: "Originality, independence, community, and future thinking.",
          qualities: ["Innovation", "Ideals", "Unconventional thinking", "Collective change"],
        },
        {
          code: "PI",
          name: "Pisces",
          secondaryName: "双鱼座",
          dates: "19 February – 20 March",
          theme: "Imagination, empathy, intuition, and emotional openness.",
          qualities: ["Creativity", "Compassion", "Symbolism", "Inner worlds"],
        },
      ],
    },

    complexity: {
      eyebrow: "Leave room for complexity",
      title: "More than one label",
      paragraphs: [
        "Personality develops through biology, upbringing, culture, education, relationships, choices, and experience. Zodiac symbolism is only one possible reflective lens.",
        "It is normal to connect with several signs or themes—and equally normal to disagree with a description. You should never reshape yourself to fit a label.",
      ],
      traditionNote:
        "Broader traditions may discuss moon signs, rising signs, and birth charts. InnerGeo presents these as additional symbolic perspectives, not fixed definitions of a person.",
    },

    profile: {
      eyebrow: "Zodiac profile preview",
      title: "What a zodiac profile can include",
      description:
        "Reflective material for exploring stories and themes—not a promise of prediction accuracy.",
      items: [
        "Sign symbolism",
        "Identity themes",
        "Strengths to reflect on",
        "Possible blind spots",
        "Communication themes",
        "Relationship reflections",
        "Growth prompts",
        "Seasonal symbolism",
        "Cultural stories",
        "Journaling questions",
        "Connections with personality and interests",
        "A future InnerGeo guardian concept",
      ],
    },

    reflection: {
      eyebrow: "Reflection, not prediction",
      title: "Questions over fortune-telling",
      description:
        "InnerGeo does not use zodiac identity to make definitive claims about future events, health, money, employment, marriage, legal outcomes, safety, or major life decisions.",
      questions: [
        "Which themes feel familiar?",
        "Which themes do I resist?",
        "How have I changed?",
        "What qualities am I developing?",
        "Which stories help me understand myself?",
      ],
    },

    culture: {
      eyebrow: "Culture and shared stories",
      title: "Traditions shaped across time and place",
      paragraphs: [
        "Zodiac systems developed through long historical and cultural processes, changing across places and periods. Modern zodiac content often combines history, popular culture, storytelling, identity, and entertainment.",
        "InnerGeo aims to approach these traditions respectfully, without claiming that one simplified description represents every historical practice or cultural perspective.",
      ],
    },

    geodessa: {
      eyebrow: "Future Geodessa connection",
      title: "A symbolic story world, still to come",
      description:
        "Future creative concepts may connect zodiac themes with guardian stories, symbolic colours, natural elements, illustrated identities, and reflective prompts. Guardian stones would be cultural, aesthetic, and storytelling objects only—not healing or medical tools.",
      status: "All concepts shown here are future possibilities and are not yet available.",
      conceptsLabel: "Future concepts",
      concepts: [
        "Guardian stories",
        "Symbolic colours",
        "Natural elements",
        "Guardian stones",
        "Reflective prompts",
        "Illustrated identities",
        "Personal collections",
        "Shared-interest spaces",
      ],
    },

    community: {
      eyebrow: "Future community concept",
      title: "Shared signs, different stories",
      description:
        "Future users may compare interpretations, share stories, discuss identity themes, notice similarities and differences, and connect zodiac themes with personality and career interests. Community accounts, profiles, and discussion spaces are not yet available.",
    },

    responsibleUse: {
      eyebrow: "Responsible use",
      title: "A reflective experience, not evidence or advice",
      description:
        "InnerGeo zodiac content is intended for reflection, culture, storytelling, and entertainment. It is not a scientific personality assessment, psychological evaluation, medical service, financial guide, or method of predicting future events. Important personal decisions should be based on reliable evidence, individual circumstances, and qualified professional advice where appropriate.",
    },

    finalCta: {
      eyebrow: "Another reflective lens",
      title: "A symbol does not define you. It can give you another way to reflect.",
      description:
        "Explore the themes, stories, and questions connected with your sign while leaving room for everything that makes you uniquely yourself.",
      primaryAction: "Create Your Birth Chart",
      careerAction: "Explore Career Interests",
      personalityAction: "Explore Personality",
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

    signs: {
      eyebrow: "象征性的身份语言",
      title: "认识十二星座",
      description:
        "每个星座通常都与一组主题相连。请把它们视为反思的邀请，而不是规定任何人必须如何生活的规则。",
      items: [
        {
          code: "AR",
          name: "白羊座",
          secondaryName: "Aries",
          dates: "3月21日 – 4月19日",
          theme: "主动、勇气，以及向前迈进的力量。",
          qualities: ["行动力", "独立", "直接", "开辟新路"],
        },
        {
          code: "TA",
          name: "金牛座",
          secondaryName: "Taurus",
          dates: "4月20日 – 5月20日",
          theme: "稳定、价值、耐心与脚踏实地的力量。",
          qualities: ["持续性", "安定感", "忠诚", "务实创造"],
        },
        {
          code: "GE",
          name: "双子座",
          secondaryName: "Gemini",
          dates: "5月21日 – 6月20日",
          theme: "好奇、连接、语言与不断变化的视角。",
          qualities: ["沟通", "适应力", "学习", "多元兴趣"],
        },
        {
          code: "CA",
          name: "巨蟹座",
          secondaryName: "Cancer",
          dates: "6月21日 – 7月22日",
          theme: "关怀、归属、记忆与情感上的守护。",
          qualities: ["家与归属", "敏感", "忠诚", "情绪觉察"],
        },
        {
          code: "LE",
          name: "狮子座",
          secondaryName: "Leo",
          dates: "7月23日 – 8月22日",
          theme: "表达、自信、创造力与鲜明的温度。",
          qualities: ["领导力", "慷慨", "自我认同", "创造性表达"],
        },
        {
          code: "VI",
          name: "处女座",
          secondaryName: "Virgo",
          dates: "8月23日 – 9月22日",
          theme: "辨别、改善、服务与有条理的思考。",
          qualities: ["分析", "细节", "实用性", "精进"],
        },
        {
          code: "LI",
          name: "天秤座",
          secondaryName: "Libra",
          dates: "9月23日 – 10月22日",
          theme: "平衡、关系、美感与相互理解。",
          qualities: ["和谐", "公平", "协调", "审美"],
        },
        {
          code: "SC",
          name: "天蝎座",
          secondaryName: "Scorpio",
          dates: "10月23日 – 11月21日",
          theme: "深度、转化、信任与隐藏的力量。",
          qualities: ["强度", "韧性", "边界感", "情感真实"],
        },
        {
          code: "SA",
          name: "射手座",
          secondaryName: "Sagittarius",
          dates: "11月22日 – 12月21日",
          theme: "探索、意义、自由与不断拓展的视野。",
          qualities: ["远行", "思辨", "乐观", "发现"],
        },
        {
          code: "CP",
          name: "摩羯座",
          secondaryName: "Capricorn",
          dates: "12月22日 – 1月19日",
          theme: "责任、耐力、结构与长期成就。",
          qualities: ["自律", "抱负", "可靠", "策略性进展"],
        },
        {
          code: "AQ",
          name: "水瓶座",
          secondaryName: "Aquarius",
          dates: "1月20日 – 2月18日",
          theme: "原创、独立、社群意识与面向未来的思考。",
          qualities: ["创新", "理想", "非惯常思维", "共同改变"],
        },
        {
          code: "PI",
          name: "双鱼座",
          secondaryName: "Pisces",
          dates: "2月19日 – 3月20日",
          theme: "想象、共情、直觉与情感开放。",
          qualities: ["创造力", "同理心", "象征感", "内在世界"],
        },
      ],
    },

    complexity: {
      eyebrow: "为复杂性留出空间",
      title: "你不止是一个标签",
      paragraphs: [
        "人格受到生理基础、成长环境、文化、教育、关系、选择和经历的共同影响。星座象征只是众多自我反思视角中的一种。",
        "你同时对多个星座或主题产生共鸣很正常；不认同某些描述也同样正常。你不需要为了符合一个标签而改变自己。",
      ],
      traditionNote:
        "更广泛的星座传统还会谈到月亮星座、上升星座和出生星盘。InnerGeo 将它们作为额外的象征视角，而不是对一个人的固定定义。",
    },

    profile: {
      eyebrow: "星座档案预览",
      title: "一份星座档案可以包含什么",
      description:
        "这些内容用于探索故事与主题，帮助自我反思，而不是承诺预测的准确性。",
      items: [
        "星座象征",
        "身份主题",
        "值得关注的优势",
        "可能的盲点",
        "沟通主题",
        "关系反思",
        "成长提示",
        "季节象征",
        "文化故事",
        "书写与反思问题",
        "与人格和兴趣的连接",
        "未来的 InnerGeo 守护者概念",
      ],
    },

    reflection: {
      eyebrow: "重在反思，而非预测",
      title: "用问题代替算命",
      description:
        "InnerGeo 不会用星座身份对未来事件、健康、金钱、工作、婚姻、法律结果、安全或重大人生决定作出确定性判断。",
      questions: [
        "哪些主题让我感到熟悉？",
        "哪些主题会引起我的抗拒？",
        "我经历了怎样的变化？",
        "我正在培养哪些品质？",
        "哪些故事能帮助我理解自己？",
      ],
    },

    culture: {
      eyebrow: "文化与共同故事",
      title: "在不同时间与地域中形成的传统",
      paragraphs: [
        "星座体系经历了漫长的历史与文化演变，并随着地域和时代不断变化。今天的星座内容往往融合历史、大众文化、叙事、身份认同与娱乐。",
        "InnerGeo 希望以尊重的方式接近这些传统，不会宣称某一种简化描述能够代表所有历史实践或文化视角。",
      ],
    },

    geodessa: {
      eyebrow: "未来的 Geodessa 连接",
      title: "仍在孕育中的象征故事世界",
      description:
        "未来的创意概念可能会把星座主题与守护者故事、象征色彩、自然元素、插画身份和反思提示连接起来。守护石只会作为文化、美学和叙事对象，不具备疗愈或医疗用途。",
      status: "这里展示的内容都是未来设想，目前尚未开放。",
      conceptsLabel: "未来概念",
      concepts: [
        "守护者故事",
        "象征色彩",
        "自然元素",
        "守护石",
        "反思提示",
        "插画身份",
        "个人收藏",
        "共同兴趣空间",
      ],
    },

    community: {
      eyebrow: "未来社区概念",
      title: "相同星座，不同故事",
      description:
        "未来的用户或许可以比较不同解读、分享个人故事、讨论身份主题、观察彼此的相似与差异，并把星座主题与人格和职业兴趣连接起来。社区账号、个人档案和讨论空间目前尚未开放。",
    },

    responsibleUse: {
      eyebrow: "负责任地使用",
      title: "用于反思，而非证据或建议",
      description:
        "InnerGeo 的星座内容用于反思、文化、叙事和娱乐，不属于科学人格测评、心理评估、医疗服务、财务指南，也不能用于预测未来事件。重要的个人决定应以可靠证据、个人实际情况为基础，并在适当时寻求合格专业人士的建议。",
    },

    finalCta: {
      eyebrow: "另一种自我反思视角",
      title: "一个象征无法定义你，但可以提供另一种理解自己的方式。",
      description:
        "探索与你的星座相关的主题、故事和问题，同时为那些让你成为独特自己的部分保留充分空间。",
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
