import type {
  ZodiacSign,
} from "@/data/zodiac";
import type {
  SupportedLocale,
} from "@/data/shared";

export type ZodiacResultPositionDetail = {
  symbol: string;
  label: string;
  category: string;
  meaning: string;
  keywords: readonly string[];
};

export type ZodiacResultDictionary = {
  signNames: Readonly<Record<ZodiacSign, string>>;
  positions: {
    sun: ZodiacResultPositionDetail;
    moon: ZodiacResultPositionDetail;
    mercury: ZodiacResultPositionDetail;
    venus: ZodiacResultPositionDetail;
    mars: ZodiacResultPositionDetail;
    ascendant: ZodiacResultPositionDetail;
    descendant: ZodiacResultPositionDetail;
    midheaven: ZodiacResultPositionDetail;
    imumCoeli: ZodiacResultPositionDetail;
  };
  state: {
    birthChartProfile: string;
    preparingTitle: string;
    preparingMessage: string;
    unavailableEyebrow: string;
    unavailableTitle: string;
    missingChartId: string;
    missingStoredChart: string;
    fallbackUnavailable: string;
    generateNewChart: string;
  };
  navigation: {
    zodiacIdentity: string;
    createAnotherChart: string;
    backToZodiacIdentity: string;
  };
  header: {
    eyebrow: string;
    description: string;
    title: {
      sun: string;
      moon: string;
      rising: string;
      separator: string;
    };
    badges: {
      sun: string;
      moon: string;
      rising: string;
    };
  };
  sections: {
    coreIdentity: string;
    coreTitle: string;
    coreDescription: string;
    personalPlanets: string;
    personalPlanetsTitle: string;
    chartAngles: string;
    chartAnglesTitle: string;
  };
  positionCard: {
    retrograde: string;
    absoluteLongitude: string;
  };
  calculation: {
    title: string;
    localBirthTime: string;
    utcTime: string;
    timeZone: string;
    coordinates: string;
    timePrecision: string;
    calculationEngine: string;
    limitations: string;
    precision: {
      exact: string;
      approximate: string;
      unknown: string;
    };
    unavailable: string;
    dateLocale: "en" | "zh-CN";
  };
  report: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
  responsibility: string;
};

export const zodiacResultDictionaries: Record<
  SupportedLocale,
  ZodiacResultDictionary
> = {
  en: {
    signNames: {
      aries: "Aries",
      taurus: "Taurus",
      gemini: "Gemini",
      cancer: "Cancer",
      leo: "Leo",
      virgo: "Virgo",
      libra: "Libra",
      scorpio: "Scorpio",
      sagittarius: "Sagittarius",
      capricorn: "Capricorn",
      aquarius: "Aquarius",
      pisces: "Pisces",
    },
    positions: {
      sun: {
        symbol: "☉",
        label: "Sun",
        category: "Core Identity",
        meaning:
          "The Sun represents identity, purpose, vitality, and the direction through which a person develops a stronger sense of self.",
        keywords: [
          "Identity",
          "Purpose",
          "Vitality",
          "Self-expression",
        ],
      },
      moon: {
        symbol: "☽",
        label: "Moon",
        category: "Inner World",
        meaning:
          "The Moon represents emotional patterns, instinctive responses, security needs, memory, and the private inner world.",
        keywords: [
          "Emotion",
          "Instinct",
          "Security",
          "Inner needs",
        ],
      },
      mercury: {
        symbol: "☿",
        label: "Mercury",
        category: "Personal Planet",
        meaning:
          "Mercury represents thinking, communication, learning, perception, reasoning, and the exchange of information.",
        keywords: [
          "Thinking",
          "Communication",
          "Learning",
          "Perception",
        ],
      },
      venus: {
        symbol: "♀",
        label: "Venus",
        category: "Personal Planet",
        meaning:
          "Venus represents attraction, values, relationships, aesthetics, pleasure, and the way harmony is created.",
        keywords: [
          "Values",
          "Relationships",
          "Attraction",
          "Harmony",
        ],
      },
      mars: {
        symbol: "♂",
        label: "Mars",
        category: "Personal Planet",
        meaning:
          "Mars represents action, drive, courage, assertion, effort, conflict response, and the pursuit of desired outcomes.",
        keywords: [
          "Action",
          "Drive",
          "Courage",
          "Assertion",
        ],
      },
      ascendant: {
        symbol: "ASC",
        label: "Ascendant",
        category: "Chart Angle",
        meaning:
          "The Ascendant is the zodiac point rising on the eastern horizon. It relates to approach, presentation, orientation, and first engagement with life.",
        keywords: [
          "Approach",
          "Presentation",
          "Orientation",
          "First impression",
        ],
      },
      descendant: {
        symbol: "DSC",
        label: "Descendant",
        category: "Chart Angle",
        meaning:
          "The Descendant is opposite the Ascendant. It relates symbolically to partnership, encounter, projection, and qualities recognised through others.",
        keywords: [
          "Partnership",
          "Encounter",
          "Others",
          "Projection",
        ],
      },
      midheaven: {
        symbol: "MC",
        label: "Midheaven",
        category: "Chart Angle",
        meaning:
          "The Midheaven is the upper meridian point of the chart. It relates symbolically to public direction, contribution, visibility, and long-term development.",
        keywords: [
          "Direction",
          "Contribution",
          "Visibility",
          "Public role",
        ],
      },
      imumCoeli: {
        symbol: "IC",
        label: "Imum Coeli",
        category: "Chart Angle",
        meaning:
          "The Imum Coeli is opposite the Midheaven. It relates symbolically to foundations, private life, belonging, roots, and the inner base of development.",
        keywords: [
          "Foundations",
          "Roots",
          "Belonging",
          "Private life",
        ],
      },
    },
    state: {
      birthChartProfile: "Birth Chart Profile",
      preparingTitle: "Preparing your chart…",
      preparingMessage:
        "Your planetary positions and chart angles are being loaded.",
      unavailableEyebrow: "Chart unavailable",
      unavailableTitle:
        "We could not load this birth chart.",
      missingChartId: "The birth chart ID is missing.",
      missingStoredChart:
        "This chart is no longer available in this browser. Generate a new birth chart to continue.",
      fallbackUnavailable:
        "The calculated birth chart is unavailable.",
      generateNewChart: "Generate a new chart",
    },
    navigation: {
      zodiacIdentity: "Zodiac Identity",
      createAnotherChart: "Create another chart",
      backToZodiacIdentity: "Back to Zodiac Identity",
    },
    header: {
      eyebrow: "Your Birth Chart",
      description:
        "This page presents the astronomical positions used by the InnerGeo Zodiac system. Interpretive reports build on these verified chart coordinates.",
      title: {
        sun: " Sun",
        moon: " Moon",
        rising: " Rising",
        separator: ", ",
      },
      badges: {
        sun: "Sun",
        moon: "Moon",
        rising: "Rising",
      },
    },
    sections: {
      coreIdentity: "Core Identity",
      coreTitle: "Your central chart pattern",
      coreDescription:
        "The Sun, Moon, and Ascendant are often used as the first orientation points when reading a natal chart.",
      personalPlanets: "Personal Planets",
      personalPlanetsTitle:
        "Thinking, relating, and taking action",
      chartAngles: "Chart Angles",
      chartAnglesTitle: "The four structural axes",
    },
    positionCard: {
      retrograde: "Retrograde",
      absoluteLongitude: "Absolute longitude",
    },
    calculation: {
      title: "Calculation Details",
      localBirthTime: "Local birth time",
      utcTime: "UTC time",
      timeZone: "Time zone",
      coordinates: "Coordinates",
      timePrecision: "Time precision",
      calculationEngine: "Calculation engine",
      limitations: "Calculation limitations",
      precision: {
        exact: "exact",
        approximate: "approximate",
        unknown: "Unavailable",
      },
      unavailable: "Unavailable",
      dateLocale: "en",
    },
    report: {
      eyebrow: "Complete Report",
      title: "Continue to your detailed Zodiac report.",
      description:
        "The complete report combines these calculated positions into sixteen structured sections covering identity, emotional patterns, communication, relationships, motivation, chart angles, strengths, development risks, career themes, and a 90-day reflection plan.",
      action: "View complete Zodiac report",
    },
    responsibility:
      "Astrology content is intended for reflection, culture, and entertainment. It is not scientific, medical, legal, financial, or psychological advice.",
  },

  zh: {
    signNames: {
      aries: "白羊座",
      taurus: "金牛座",
      gemini: "双子座",
      cancer: "巨蟹座",
      leo: "狮子座",
      virgo: "处女座",
      libra: "天秤座",
      scorpio: "天蝎座",
      sagittarius: "射手座",
      capricorn: "摩羯座",
      aquarius: "水瓶座",
      pisces: "双鱼座",
    },
    positions: {
      sun: {
        symbol: "☉",
        label: "太阳",
        category: "核心身份",
        meaning:
          "太阳象征身份认同、人生目的、生命力，以及一个人逐渐建立更清晰自我感的方向。",
        keywords: [
          "身份认同",
          "人生目的",
          "生命力",
          "自我表达",
        ],
      },
      moon: {
        symbol: "☽",
        label: "月亮",
        category: "内在世界",
        meaning:
          "月亮象征情绪模式、本能反应、安全感需求、记忆，以及较为私密的内在世界。",
        keywords: [
          "情绪",
          "本能",
          "安全感",
          "内在需求",
        ],
      },
      mercury: {
        symbol: "☿",
        label: "水星",
        category: "个人行星",
        meaning:
          "水星象征思考、沟通、学习、感知、推理，以及信息的理解与交流方式。",
        keywords: [
          "思考",
          "沟通",
          "学习",
          "感知",
        ],
      },
      venus: {
        symbol: "♀",
        label: "金星",
        category: "个人行星",
        meaning:
          "金星象征吸引力、价值观、关系、审美、愉悦，以及创造和谐的方式。",
        keywords: [
          "价值观",
          "关系",
          "吸引力",
          "和谐",
        ],
      },
      mars: {
        symbol: "♂",
        label: "火星",
        category: "个人行星",
        meaning:
          "火星象征行动、驱动力、勇气、主张、付出、应对冲突的方式，以及追求目标的动力。",
        keywords: [
          "行动",
          "驱动力",
          "勇气",
          "主张",
        ],
      },
      ascendant: {
        symbol: "ASC",
        label: "上升点",
        category: "星盘角点",
        meaning:
          "上升点是黄道在东方地平线上升起的位置，象征面对生活的方式、外在呈现、基本取向和初次接触世界时的状态。",
        keywords: [
          "处世方式",
          "外在呈现",
          "基本取向",
          "第一印象",
        ],
      },
      descendant: {
        symbol: "DSC",
        label: "下降点",
        category: "星盘角点",
        meaning:
          "下降点与上升点相对，在象征层面关联伙伴关系、相遇、投射，以及通过他人认识到的特质。",
        keywords: [
          "伙伴关系",
          "相遇",
          "他人",
          "投射",
        ],
      },
      midheaven: {
        symbol: "MC",
        label: "中天",
        category: "星盘角点",
        meaning:
          "中天是星盘上方的子午线点，在象征层面关联公共方向、个人贡献、可见度和长期发展。",
        keywords: [
          "方向",
          "贡献",
          "可见度",
          "公共角色",
        ],
      },
      imumCoeli: {
        symbol: "IC",
        label: "天底",
        category: "星盘角点",
        meaning:
          "天底与中天相对，在象征层面关联根基、私人生活、归属感、根源，以及支持个人发展的内在基础。",
        keywords: [
          "根基",
          "根源",
          "归属感",
          "私人生活",
        ],
      },
    },
    state: {
      birthChartProfile: "出生星盘档案",
      preparingTitle: "正在准备你的星盘…",
      preparingMessage: "正在加载行星位置和星盘角点。",
      unavailableEyebrow: "星盘不可用",
      unavailableTitle: "无法加载这份出生星盘。",
      missingChartId: "缺少出生星盘 ID。",
      missingStoredChart:
        "当前浏览器中已不存在这份星盘结果。请重新生成出生星盘后继续。",
      fallbackUnavailable: "计算后的出生星盘结果不可用。",
      generateNewChart: "生成新星盘",
    },
    navigation: {
      zodiacIdentity: "星座身份",
      createAnotherChart: "创建另一份星盘",
      backToZodiacIdentity: "返回星座首页",
    },
    header: {
      eyebrow: "你的出生星盘",
      description:
        "本页呈现 InnerGeo Zodiac 系统所使用的天文位置。后续解读报告将以这些经过验证的星盘坐标为基础。",
      title: {
        sun: "太阳",
        moon: "月亮",
        rising: "上升",
        separator: "、",
      },
      badges: {
        sun: "太阳",
        moon: "月亮",
        rising: "上升",
      },
    },
    sections: {
      coreIdentity: "核心身份",
      coreTitle: "你的核心星盘模式",
      coreDescription:
        "太阳、月亮和上升点通常是阅读出生星盘时最先参考的三个定位点。",
      personalPlanets: "个人行星",
      personalPlanetsTitle: "思考、建立关系与采取行动",
      chartAngles: "星盘角点",
      chartAnglesTitle: "四个结构性轴点",
    },
    positionCard: {
      retrograde: "逆行",
      absoluteLongitude: "黄道绝对经度",
    },
    calculation: {
      title: "计算详情",
      localBirthTime: "当地出生时间",
      utcTime: "UTC 时间",
      timeZone: "时区",
      coordinates: "坐标",
      timePrecision: "时间精度",
      calculationEngine: "计算引擎",
      limitations: "计算限制",
      precision: {
        exact: "准确",
        approximate: "大约",
        unknown: "不可用",
      },
      unavailable: "不可用",
      dateLocale: "zh-CN",
    },
    report: {
      eyebrow: "完整报告",
      title: "继续查看你的详细星座报告。",
      description:
        "完整报告会把这些计算位置整合为十六个结构化章节，涵盖身份认同、情绪模式、沟通、关系、动力、星盘角点、优势、发展风险、职业主题和 90 天反思计划。",
      action: "查看完整星座报告",
    },
    responsibility:
      "占星内容仅用于反思、文化理解和娱乐，不构成科学、医疗、法律、财务或心理建议。",
  },
};

export function getZodiacResultDictionary(
  locale: SupportedLocale,
): ZodiacResultDictionary {
  return zodiacResultDictionaries[locale];
}
