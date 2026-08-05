import type {
  ZodiacReportBlockType,
  ZodiacSign,
} from "@/data/zodiac";
import type {
  SupportedLocale,
} from "@/data/shared";

export type ZodiacReportDictionary = {
  signNames: Readonly<Record<ZodiacSign, string>>;
  loading: {
    eyebrow: string;
    title: string;
    message: string;
  };
  errors: {
    missingChartId: string;
    missingStoredChart: string;
    unavailable: string;
    fallbackUnavailable: string;
  };
  header: {
    eyebrow: string;
    subtitle: string;
    sun: string;
    moon: string;
    rising: string;
    description: string;
    calculated: string;
    localBirthTime: string;
    timeZone: string;
    chart: string;
    print: string;
    printGuidance: string;
  };
  tableOfContents: {
    ariaLabel: string;
    title: string;
    description: string;
  };
  blockLabels: Readonly<Record<ZodiacReportBlockType, string>>;
  navigation: {
    backToResult: string;
    newBirthChart: string;
    backToZodiacResult: string;
    createAnotherChart: string;
  };
  footer: string;
  dateLocale: "en" | "zh-CN";
};

export const zodiacReportDictionaries: Record<
  SupportedLocale,
  ZodiacReportDictionary
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
    loading: {
      eyebrow: "Zodiac Birth Chart Report",
      title: "Preparing your detailed Zodiac report…",
      message:
        "Loading your calculated birth chart and generating the structured report.",
    },
    errors: {
      missingChartId: "The birth chart ID is missing.",
      missingStoredChart:
        "This chart is no longer available in this browser. Generate a new birth chart to continue.",
      unavailable: "Your Zodiac report could not be loaded.",
      fallbackUnavailable:
        "The calculated birth chart is unavailable.",
    },
    header: {
      eyebrow: "InnerGeo Complete Zodiac Birth Chart Report",
      subtitle: "Professional symbolic birth chart report",
      sun: " Sun",
      moon: " Moon",
      rising: " Rising",
      description:
        "A structured interpretation of your calculated planetary positions, personal planets, chart angles, potential strengths, development risks, relationship themes, career prompts, and reflection plan.",
      calculated: "Calculated",
      localBirthTime: "Local birth time",
      timeZone: "Time zone",
      chart: "Chart",
      print: "Print / Save as PDF",
      printGuidance:
        "Disable browser headers and footers for a cleaner PDF.",
    },
    tableOfContents: {
      ariaLabel: "Zodiac report table of contents",
      title: "Table of contents",
      description:
        "Navigate directly to any section of your report.",
    },
    blockLabels: {
      summary: "summary",
      analysis: "analysis",
      strength: "strength",
      risk: "risk",
      relationship: "relationship",
      career: "career",
      guidance: "guidance",
      action: "action",
      methodology: "methodology",
    },
    navigation: {
      backToResult: "Back to result",
      newBirthChart: "New birth chart",
      backToZodiacResult: "Back to Zodiac result",
      createAnotherChart: "Create another chart",
    },
    footer:
      "Astrology content is intended for reflection, culture, and entertainment. It is not scientific, medical, psychological, legal, financial, educational, or employment advice.",
    dateLocale: "en",
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
    loading: {
      eyebrow: "星座出生星盘报告",
      title: "正在准备你的详细星座报告…",
      message: "正在加载星盘并生成结构化报告。",
    },
    errors: {
      missingChartId: "缺少出生星盘 ID。",
      missingStoredChart:
        "当前浏览器中已不存在这份星盘结果。请重新生成出生星盘后继续。",
      unavailable: "星座报告无法加载。",
      fallbackUnavailable: "计算后的出生星盘结果不可用。",
    },
    header: {
      eyebrow: "InnerGeo 完整星座出生星盘报告",
      subtitle: "专业的象征性出生星盘报告",
      sun: "太阳",
      moon: "月亮",
      rising: "上升",
      description:
        "以结构化方式解读计算所得的行星位置、个人行星、星盘角点、潜在优势、发展风险、关系主题、职业提示和反思计划。",
      calculated: "计算时间",
      localBirthTime: "当地出生时间",
      timeZone: "时区",
      chart: "星盘",
      print: "打印 / 另存为 PDF",
      printGuidance: "关闭浏览器页眉和页脚可获得更整洁的 PDF。",
    },
    tableOfContents: {
      ariaLabel: "星座报告目录",
      title: "报告目录",
      description: "可直接前往报告中的任一章节。",
    },
    blockLabels: {
      summary: "总结",
      analysis: "分析",
      strength: "优势",
      risk: "风险",
      relationship: "关系",
      career: "职业",
      guidance: "建议",
      action: "行动",
      methodology: "方法",
    },
    navigation: {
      backToResult: "返回星盘结果",
      newBirthChart: "新建出生星盘",
      backToZodiacResult: "返回星座结果",
      createAnotherChart: "创建另一份星盘",
    },
    footer:
      "星座内容仅用于反思、文化和娱乐，不构成科学、医疗、心理、法律、财务、教育或就业建议。",
    dateLocale: "zh-CN",
  },
};

export function getZodiacReportDictionary(
  locale: SupportedLocale,
): ZodiacReportDictionary {
  return zodiacReportDictionaries[locale];
}
