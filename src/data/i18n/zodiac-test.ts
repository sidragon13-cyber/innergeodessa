import type {
  SupportedLocale,
} from "@/data/shared";

export type ZodiacTestDictionary = {
  backToZodiac: string;
  eyebrow: string;
  title: string;
  description: string;
  birthDate: string;
  year: string;
  month: string;
  day: string;
  months: readonly string[];
  birthTime: string;
  hour: string;
  minute: string;
  timeAccuracy: string;
  exactTime: string;
  approximateTime: string;
  birthCity: string;
  city: string;
  citySearchPlaceholder: string;
  noMatchingCities: string;
  timeZone: string;
  coordinates: string;
  reportLanguage: string;
  english: string;
  chinese: string;
  calculating: string;
  generateBirthChart: string;
  disclaimer: string;
  errors: {
    invalidBirthCity: string;
    chartGenerationFailed: string;
  };
};

export const zodiacTestDictionaries: Record<
  SupportedLocale,
  ZodiacTestDictionary
> = {
  en: {
    backToZodiac: "Back to Zodiac Identity",
    eyebrow: "Birth Chart Profile",
    title: "Enter your birth information",
    description:
      "Your date, local birth time, city, coordinates, and historical time zone are used to calculate your Sun, Moon, personal planets, Ascendant, and Midheaven.",
    birthDate: "Birth date",
    year: "Year",
    month: "Month",
    day: "Day",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    birthTime: "Birth time",
    hour: "Hour",
    minute: "Minute",
    timeAccuracy: "Time accuracy",
    exactTime: "Exact time",
    approximateTime: "Approximate time",
    birthCity: "Birth city",
    city: "City",
    citySearchPlaceholder:
      "Search by city, alias, or country",
    noMatchingCities: "No matching cities.",
    timeZone: "Time zone",
    coordinates: "Coordinates",
    reportLanguage: "Report language",
    english: "English",
    chinese: "中文",
    calculating: "Calculating…",
    generateBirthChart: "Generate Birth Chart",
    disclaimer:
      "Astrology content is intended for reflection, culture, and entertainment. It is not scientific, medical, legal, financial, or psychological advice.",
    errors: {
      invalidBirthCity:
        "Please select a valid birth city.",
      chartGenerationFailed:
        "The chart could not be generated.",
    },
  },

  zh: {
    backToZodiac: "返回星座首页",
    eyebrow: "出生星盘档案",
    title: "输入你的出生信息",
    description:
      "我们会根据你的出生日期、当地出生时间、城市、经纬度和历史时区，计算太阳、月亮、个人行星、上升点与天顶。",
    birthDate: "出生日期",
    year: "年",
    month: "月",
    day: "日",
    months: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    birthTime: "出生时间",
    hour: "小时",
    minute: "分钟",
    timeAccuracy: "时间准确性",
    exactTime: "准确时间",
    approximateTime: "大约时间",
    birthCity: "出生城市",
    city: "城市",
    citySearchPlaceholder: "按城市、别名或国家搜索",
    noMatchingCities: "没有匹配的城市。",
    timeZone: "时区",
    coordinates: "坐标",
    reportLanguage: "报告语言",
    english: "English",
    chinese: "中文",
    calculating: "正在计算…",
    generateBirthChart: "生成出生星盘",
    disclaimer:
      "占星内容仅用于反思、文化理解和娱乐，不构成科学、医疗、法律、财务或心理建议。",
    errors: {
      invalidBirthCity: "请选择有效的出生城市。",
      chartGenerationFailed: "星盘生成失败。",
    },
  },
};

export function getZodiacTestDictionary(
  locale: SupportedLocale,
): ZodiacTestDictionary {
  return zodiacTestDictionaries[locale];
}
