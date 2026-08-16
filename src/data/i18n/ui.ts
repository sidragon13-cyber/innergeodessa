import type {
  SupportedLocale,
} from "@/data/shared";

export type UiDictionary = {
  navigation: {
    primaryLabel: string;
    assessments: string;
    zodiac: string;
    about: string;
    pricing: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      emphasizedTitle: string;
      description: string;
      primaryAction: string;
      note: string;
      personalityLabel: string;
      careerLabel: string;
      zodiacLabel: string;
      youLabel: string;
    };
    explore: {
      eyebrow: string;
      title: string;
      description: string;
      products: {
        personality: {
          title: string;
          description: string;
          metadata: string;
          cta: string;
        };
        career: {
          title: string;
          description: string;
          metadata: string;
          cta: string;
        };
        zodiac: {
          title: string;
          description: string;
          metadata: string;
          cta: string;
        };
      };
    };
    profile: {
      eyebrow: string;
      title: string;
      emphasizedTitle: string;
      description: string;
      exampleLabel: string;
      personalityLabel: string;
      careerLabel: string;
      kidsLabel: string;
      zodiacLabel: string;
      mapTitle: string;
      mapStatus: string;
      careerExample: string;
      zodiacExample: string;
      note: string;
    };
    values: {
      eyebrow: string;
      title: string;
      description: string;
      items: readonly {
        number: string;
        title: string;
        description: string;
      }[];
      futureNote: string;
    };
    trust: {
      eyebrow: string;
      title: string;
      points: readonly string[];
    };
  };
  footer: {
    navigationLabel: string;
    tagline: string;
    personality: string;
    career: string;
    zodiac: string;
    pricing: string;
    contact: string;
    privacy: string;
    terms: string;
    refund: string;
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
      assessments: "Assessments",
      zodiac: "Zodiac",
      about: "About",
      pricing: "Pricing",
    },
    home: {
      hero: {
        eyebrow: "Understand yourself · Explore direction",
        title: "Understand Yourself.",
        emphasizedTitle: "Find Your Direction.",
        description:
          "Explore yourself through three structured assessments—Personality, Career Interests and Kids Interests—alongside an independent Zodiac Interests experience.",
        primaryAction: "Start Exploring",
        note: "InnerGeo does not make decisions for you. It helps you see yourself more clearly.",
        personalityLabel: "Personality",
        careerLabel: "Career",
        zodiacLabel: "Zodiac",
        youLabel: "You",
      },
      explore: {
        eyebrow: "Explore yourself",
        title: "Choose a Starting Point. Get to Know Yourself.",
        description:
          "Personality, Career Interests, Kids Interests and Zodiac Interests offer different ways to explore. Choose the path that feels right for you and start from here.",
        products: {
          personality: {
            title: "Personality Test",
            description:
              "Understand how you gain energy, process information, make decisions, and approach life.",
            metadata: "72 questions · 10–15 minutes",
            cta: "Start Personality Test",
          },
          career: {
            title: "Career Interest",
            description:
              "Discover the activities, environments, and fields that naturally attract you.",
            metadata: "36 questions · 5–7 minutes",
            cta: "Explore Career Interests",
          },
          zodiac: {
            title: "Zodiac Identity",
            description:
              "Begin with your birth information and explore your calculated zodiac profile.",
            metadata: "About 2–3 minutes",
            cta: "Discover Your Chart",
          },
        },
      },
      profile: {
        eyebrow: "Different explorations, connected",
        title: "Every exploration",
        emphasizedTitle: "helps you see a little more of yourself.",
        description:
          "Personality, Career Interests, Kids Interests and Zodiac Interests do not define you. Each exploration offers a new perspective, helping you connect the clues and gradually form your own Inner Map.",
        exampleLabel: "Inner Map preview",
        personalityLabel: "Personality",
        careerLabel: "Career Interests",
        kidsLabel: "Kids Interests",
        zodiacLabel: "Zodiac Interests",
        mapTitle: "Your Inner Map",
        mapStatus: "Still evolving",
        careerExample: "Investigative · Artistic",
        zodiacExample: "Scorpio",
        note:
          "Different perspectives can connect without putting you into a fixed box.",
      },
      values: {
        eyebrow: "How to use your results",
        title: "Turn results into information you can understand and use",
        description:
          "InnerGeo does more than return a type or score. Each product explains preferences, interests and exploration clues, while also showing how those results should—and should not—be interpreted.",
        items: [
          {
            number: "01",
            title: "Understand patterns and preferences",
            description:
              "Personality assessment explains preferences in energy, information processing, decision-making and approach to daily life. It helps identify patterns rather than ranking intelligence, ability or personal worth.",
          },
          {
            number: "02",
            title: "Identify interests and environments",
            description:
              "Career Interests and Kids Interests help identify activities, learning or work environments and interest areas that may be more naturally engaging, providing more specific clues for further exploration.",
          },
          {
            number: "03",
            title: "Find next-step exploration clues",
            description:
              "Results and in-depth digital reports organize patterns into directions and questions you can explore further. They support comparison and reflection, but do not make career, education or life decisions for you.",
          },
        ],
        futureNote:
          "Personality, Career Interests and Kids Interests are structured assessments. Zodiac Interests is a separate interest-exploration experience with a different methodological boundary.",
      },
      trust: {
        eyebrow: "Clear boundaries",
        title: "What InnerGeo can do—and what it cannot",
        points: [
          "Assessments and reports support self-understanding, interest discovery and direction exploration. They are not medical, psychological or mental-health diagnosis.",
          "Results describe preferences, interests and self-reported patterns. They do not measure intelligence, determine personal ability or predict future performance.",
          "Career and education content provides exploration clues and reference points. It is not a hiring decision, admissions judgment, professional qualification assessment or individualized licensed career service.",
          "Paid digital reports provide deeper interpretation and direction-oriented reference. They are not medical care, psychotherapy, legal advice, financial advice or another regulated professional service.",
        ],
      },
    },
    footer: {
      navigationLabel: "Footer navigation",
      tagline: "Self-discovery, thoughtfully mapped.",
      personality: "Personality",
      career: "Career",
      zodiac: "Zodiac",
      pricing: "Pricing",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      refund: "Refund Policy",
    },
    accessibility: {
      homeLabel: "InnerGeo home",
    },
  },

  zh: {
    navigation: {
      primaryLabel: "主要导航",
      assessments: "测评",
      zodiac: "星座",
      about: "关于",
      pricing: "价格",
    },
    home: {
      hero: {
        eyebrow: "认识自己 · 探索方向",
        title: "认识自己，",
        emphasizedTitle: "找到更适合的方向。",
        description:
          "通过人格、职业兴趣与儿童兴趣三类结构化测评，以及独立的星座兴趣探索，从不同角度理解自己、发现兴趣，并找到更清晰的方向。",
        primaryAction: "开始探索",
        note: "InnerGeo 不替你做决定，只帮助你更清楚地看见自己。",
        personalityLabel: "人格",
        careerLabel: "职业",
        zodiacLabel: "星座",
        youLabel: "你",
      },
      explore: {
        eyebrow: "探索自己",
        title: "选择一个起点，开始认识自己",
        description:
          "人格、职业兴趣、儿童兴趣与星座兴趣，提供不同的探索入口。选择适合你的方式，从这里开始。",
        products: {
          personality: {
            title: "人格类型测评",
            description:
              "了解你获取能量、处理信息、作出决定和面对生活的倾向。",
            metadata: "72题 · 约10–15分钟",
            cta: "开始人格测评",
          },
          career: {
            title: "职业兴趣测评",
            description:
              "发现更能吸引你的活动类型、工作环境与职业领域。",
            metadata: "36题 · 约5–7分钟",
            cta: "探索职业兴趣",
          },
          zodiac: {
            title: "星座身份探索",
            description:
              "从出生信息开始，探索经过计算生成的个人星盘与星座身份。",
            metadata: "约2–3分钟",
            cta: "生成个人星盘",
          },
        },
      },
      profile: {
        eyebrow: "不同探索，彼此连接",
        title: "每一次探索，",
        emphasizedTitle: "都让你多看见一点自己。",
        description:
          "人格、职业兴趣、儿童兴趣与星座兴趣不会替你定义自己。每一次探索只是提供一个新的视角，帮助你慢慢连接线索，形成属于自己的 Inner Map。",
        exampleLabel: "Inner Map 预览",
        personalityLabel: "人格探索",
        careerLabel: "职业兴趣",
        kidsLabel: "儿童兴趣",
        zodiacLabel: "星座兴趣",
        mapTitle: "你的探索地图",
        mapStatus: "仍在不断形成",
        careerExample: "研究型 · 艺术型",
        zodiacExample: "天蝎座",
        note:
          "不同的视角可以彼此连接，而不是把你放进固定的框架。",
      },
      values: {
        eyebrow: "测评结果如何使用",
        title: "把结果变成可理解、可行动的信息",
        description:
          "InnerGeo 不只返回一个类型或分数。不同产品会解释你的偏好、兴趣和探索线索，并说明这些结果适合如何使用，以及不应该被如何解读。",
        items: [
          {
            number: "01",
            title: "理解行为与偏好模式",
            description:
              "人格测评用于解释你在能量获取、信息处理、决策和生活方式上的偏好倾向，帮助你识别相对稳定的模式，而不是判断智力、能力高低或个人价值。",
          },
          {
            number: "02",
            title: "识别兴趣与环境偏好",
            description:
              "职业兴趣与儿童兴趣测评用于识别更容易引发投入的活动类型、学习或工作环境和兴趣领域，为后续探索提供更加具体的线索。",
          },
          {
            number: "03",
            title: "形成下一步探索线索",
            description:
              "结果和深入数字报告会把相关模式整理成可以继续验证的方向与问题，帮助你比较和思考不同选择，但不会替你决定职业、教育或人生道路。",
          },
        ],
        futureNote:
          "人格、职业兴趣与儿童兴趣属于结构化测评；Zodiac Interests 是独立的兴趣探索内容，两者采用不同的方法边界。",
      },
      trust: {
        eyebrow: "使用边界",
        title: "清楚说明 InnerGeo 能做什么，也说明不能做什么",
        points: [
          "测评与报告用于自我理解、兴趣发现和方向探索，不用于医学、心理或精神健康诊断。",
          "结果描述的是偏好、兴趣与自我报告形成的模式，不用于衡量智力、判断个人能力高低，也不预测未来表现。",
          "职业与教育相关内容用于提供探索线索和参考，不构成招聘决定、录取判断、职业资格评估或个别化的持牌职业咨询服务。",
          "付费数字报告提供更深入的结果解释与方向参考，不等同于医疗、心理治疗、法律、财务或其他受监管的专业服务。",
        ],
      },
    },
    footer: {
      navigationLabel: "页脚导航",
      tagline: "审慎探索自我，清晰描绘内在坐标。",
      personality: "人格测评",
      career: "职业兴趣",
      zodiac: "星座身份",
      pricing: "价格",
      contact: "联系我们",
      privacy: "隐私政策",
      terms: "服务条款",
      refund: "退款政策",
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
