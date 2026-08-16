import type {
  SupportedLocale,
} from "@/data/shared";

export type CareerLandingDictionary = {
  mapLabel: string;

  hero: {
    eyebrow: string;
    title: string;
    description: string;
    detailsLabel: string;
    details: readonly string[];
    primaryAction: string;
    secondaryAction: string;
  };

  context: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
  };

  dimensions: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly {
      code: string;
      title: string;
      theme: string;
      examples: readonly string[];
    }[];
  };

  pattern: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    exampleLabel: string;
    orLabel: string;
  };

  resultPreview: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly string[];
  };

  beyond: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
  };

  guidance: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly {
      title: string;
      description: string;
    }[];
  };

  disclaimer: {
    eyebrow: string;
    title: string;
    groups: readonly {
      label: string;
      description: string;
    }[];
    action: string;
  };

  finalCta: {
    eyebrow: string;
    title: string;
    primaryAction: string;
  };
};

export const careerLandingDictionaries: Record<
  SupportedLocale,
  CareerLandingDictionary
> = {
  en: {
    mapLabel: "Interests",

    hero: {
      eyebrow: "Career Interest Assessment",
      title:
        "Discover what genuinely holds your interest, then explore possible career directions.",
      description:
        "Explore your interest across different activities, problem types and work environments through a 36-question RIASEC assessment.",
      detailsLabel: "Assessment details",
      details: [
        "36 questions",
        "approximately 5–8 minutes",
        "no account required to begin",
      ],
      primaryAction: "Start Career Interest Assessment",
      secondaryAction: "Explore the Six Interest Dimensions",
    },

    context: {
      eyebrow: "Why interests matter",
      title: "Career direction starts before the job title.",
      paragraphs: [
        "Career-interest assessment focuses not on one job that is best for you, but on the activities, problems and environments that are more likely to keep you engaged.",
        "Understanding these interest signals can help you explore career fields, work environments and development paths with more direction.",
      ],
    },

    dimensions: {
      eyebrow: "The RIASEC framework",
      title: "Six dimensions of interest",
      description:
        "RIASEC dimensions describe interest directions, not ability rankings. Most people combine several dimensions, and no single dimension defines your future.",
      items: [
        {
          code: "R",
          title: "Realistic",
          theme:
            "Build, operate, repair, and work with tangible systems.",
          examples: [
            "Practical activity",
            "Tools and equipment",
            "Hands-on problem-solving",
          ],
        },
        {
          code: "I",
          title: "Investigative",
          theme:
            "Understand, analyse, research, and solve complex questions.",
          examples: [
            "Science and data",
            "Research",
            "Systems thinking",
          ],
        },
        {
          code: "A",
          title: "Artistic",
          theme:
            "Create, express, imagine, and communicate original ideas.",
          examples: [
            "Design and writing",
            "Visual communication",
            "Creative experimentation",
          ],
        },
        {
          code: "S",
          title: "Social",
          theme:
            "Support, teach, guide, connect, and develop people.",
          examples: [
            "Education",
            "Counselling",
            "Collaborative development",
          ],
        },
        {
          code: "E",
          title: "Enterprising",
          theme:
            "Lead, persuade, initiate, organise, and create momentum.",
          examples: [
            "Business and leadership",
            "Negotiation",
            "Entrepreneurship",
          ],
        },
        {
          code: "C",
          title: "Conventional",
          theme:
            "Organise, structure, maintain, and improve reliable processes.",
          examples: [
            "Planning",
            "Administration and finance",
            "Information organisation",
          ],
        },
      ],
    },

    pattern: {
      eyebrow: "Interest Pattern",
      title:
        "The most useful signal is often the pattern, not one highest score.",
      paragraphs: [
        "All six dimensions form your interest profile. The strongest two or three often provide useful clues about the activities, problems, roles and environments worth exploring further.",
        "The same career field can contain very different kinds of work, and one interest pattern can connect to many occupations. Use combinations as starting points for exploration, not as instructions about one career you must choose.",
      ],
      exampleLabel: "Example",
      orLabel: "or",
    },

    resultPreview: {
      eyebrow: "Your result",
      title: "See the structure behind your career interests.",
      description:
        "Your result does not choose a career for you. It organises the interest signals you can compare, understand and explore further.",
      items: [
        "Your RIASEC interest code",
        "A complete ranking across all six dimensions",
        "Your most prominent 2–3 interest directions",
        "Interest combinations and possible work environments",
        "Career fields worth further exploration",
        "A complete Career Interest Report for deeper review",
      ],
    },

    beyond: {
      eyebrow: "Flexible directions",
      title: "Beyond job titles",
      paragraphs: [
        "One interest pattern can connect to many occupations, and the same occupation can feel very different across industries.",
        "Work environment and role design may matter as much as the title printed on a job description.",
        "People can combine interests through portfolio careers, entrepreneurship, interdisciplinary work, and changing roles over time.",
      ],
    },

    guidance: {
      eyebrow: "Before you begin",
      title: "Answer according to what genuinely interests you.",
      description:
        "You do not need to choose the more prestigious career answer, and you do not need to judge your interests by your current skill level.",
      items: [
        {
          title: "Answer what interests you",
          description:
            "Choose based on the activities and questions that genuinely draw your attention.",
        },
        {
          title: "Do not answer what seems more prestigious",
          description:
            "Avoid shaping answers around status, income, or a career image you think you should prefer.",
        },
        {
          title: "Do not answer by current skill level",
          description:
            "Interest and current competence are different questions. You can be interested in something you are still learning.",
        },
        {
          title: "Interests can change with experience",
          description:
            "Your result reflects your current response pattern and may evolve as your experiences expand.",
        },
      ],
    },

    disclaimer: {
      eyebrow: "Responsible use",
      title: "How to use this assessment",
      groups: [
        {
          label: "Use it for",
          description:
            "Understanding your interest structure, comparing work environments, and identifying career fields worth exploring.",
        },
        {
          label: "Do not use it for",
          description:
            "Psychological diagnosis, ability ranking, recruitment, admission, or a final employment decision.",
        },
        {
          label: "Important reminder",
          description:
            "Career choices should also consider abilities, values, qualifications, opportunities, personal circumstances, labour-market conditions, and real-world experience.",
        },
      ],
      action: "Explore the full methodology and use boundaries",
    },

    finalCta: {
      eyebrow: "Start your exploration",
      title:
        "Start with your interests. Explore your career direction.",
      primaryAction: "Start Career Interest Assessment",
    },
  },

  zh: {
    mapLabel: "兴趣",

    hero: {
      eyebrow: "职业兴趣探索",
      title:
        "发现什么真正吸引你，再去探索适合的职业方向。",
      description:
        "通过 36 道职业兴趣题目，观察你对不同活动、问题类型与工作环境的兴趣倾向，形成六个 RIASEC 维度的个人兴趣结构。",
      detailsLabel: "测评信息",
      details: [
        "36 道题",
        "约 5–8 分钟",
        "无需注册即可开始",
      ],
      primaryAction: "开始职业兴趣探索",
      secondaryAction: "了解六个兴趣维度",
    },

    context: {
      eyebrow: "为什么先理解兴趣",
      title: "职业方向，不只是从职位名称开始。",
      paragraphs: [
        "职业兴趣测评关注的，不是“哪一个职业最适合你”，而是哪些活动、问题与环境更容易让你愿意持续投入。",
        "理解这些兴趣线索，可以帮助你更有方向地探索职业领域、工作环境与发展路径。",
      ],
    },

    dimensions: {
      eyebrow: "RIASEC 职业兴趣框架",
      title: "六个职业兴趣维度",
      description:
        "RIASEC 描述的是兴趣方向，而不是能力排名。大多数人会同时具备多个兴趣维度，也没有单一维度能够决定你的未来。",
      items: [
        {
          code: "R",
          title: "现实型",
          theme:
            "喜欢建造、操作、维修以及处理真实可见的事物和系统。",
          examples: [
            "实际操作",
            "工具与设备",
            "动手解决问题",
          ],
        },
        {
          code: "I",
          title: "研究型",
          theme:
            "喜欢理解、分析、研究并解决复杂的问题。",
          examples: [
            "科学与数据",
            "研究分析",
            "系统思维",
          ],
        },
        {
          code: "A",
          title: "艺术型",
          theme:
            "喜欢创造、表达、想象并传达原创思想。",
          examples: [
            "设计与写作",
            "视觉传播",
            "创意实验",
          ],
        },
        {
          code: "S",
          title: "社会型",
          theme:
            "喜欢帮助、教育、指导、连接并促进他人成长。",
          examples: [
            "教育",
            "咨询与辅导",
            "协作与发展",
          ],
        },
        {
          code: "E",
          title: "企业型",
          theme:
            "喜欢领导、说服、发起行动、组织资源并推动进展。",
          examples: [
            "商业与领导",
            "谈判",
            "创业",
          ],
        },
        {
          code: "C",
          title: "常规型",
          theme:
            "喜欢组织、建立结构、维护并改进可靠的流程。",
          examples: [
            "规划",
            "行政与财务",
            "信息整理",
          ],
        },
      ],
    },

    pattern: {
      eyebrow: "兴趣组合",
      title: "真正有价值的，不只是最高的一项兴趣。",
      paragraphs: [
        "六个维度共同构成你的兴趣结构，其中最突出的两到三个维度，往往更适合作为观察活动类型、问题类型、角色与工作环境的线索。",
        "同一个职业领域可能包含完全不同的工作内容，而同一种兴趣组合也可以连接多个职业方向。组合用于帮助你提出更好的探索问题，而不是规定唯一职业选择。",
      ],
      exampleLabel: "示例",
      orLabel: "或者",
    },

    resultPreview: {
      eyebrow: "你的结果",
      title: "完成测评后，你会看到自己的职业兴趣结构。",
      description:
        "结果不是替你选择一个职业，而是整理出可以继续理解、比较和探索的兴趣线索。",
      items: [
        "你的 RIASEC 兴趣代码",
        "六个兴趣维度的完整排序",
        "最突出的 2–3 个兴趣方向",
        "兴趣组合与可能的工作环境",
        "值得继续探索的职业领域",
        "可进一步查看的完整职业兴趣报告",
      ],
    },

    beyond: {
      eyebrow: "灵活的发展方向",
      title: "超越职业名称",
      paragraphs: [
        "同一种兴趣模式可以连接许多不同职业，而同一职业在不同产业中的实际体验也可能完全不同。",
        "工作环境与岗位设计的重要性，有时并不低于职位名称本身。",
        "人们也可以通过组合型职业、创业、跨学科工作以及不同阶段的岗位变化来结合多种兴趣。",
      ],
    },

    guidance: {
      eyebrow: "开始之前",
      title: "按照真正吸引你的活动作答。",
      description:
        "不需要选择更体面的职业答案，也不需要按照当前技能高低来判断自己的兴趣。",
      items: [
        {
          title: "回答“我感兴趣什么”",
          description:
            "依据真正能够吸引你注意力的活动、问题和体验作答。",
        },
        {
          title: "不要回答“什么职业更体面”",
          description:
            "不要因为社会地位、收入或理想职业形象而改变自己的真实答案。",
        },
        {
          title: "不要按当前技能高低作答",
          description:
            "兴趣和当前能力是不同的问题；即使仍在学习，也可能对某个方向有真实兴趣。",
        },
        {
          title: "兴趣可以随着经历变化",
          description:
            "结果反映的是你当前回答所呈现的兴趣结构，也可能随着经验增加而发生变化。",
        },
      ],
    },

    disclaimer: {
      eyebrow: "合理使用",
      title: "如何使用这项测评",
      groups: [
        {
          label: "用于",
          description:
            "理解兴趣结构、比较不同工作环境，并发现值得继续探索的职业领域。",
        },
        {
          label: "不用于",
          description:
            "心理诊断、能力评级、招聘、录取或最终就业决定。",
        },
        {
          label: "重要提醒",
          description:
            "职业选择还需要结合能力、价值观、学历资格、机会、个人情况、劳动力市场条件与现实经验。",
        },
      ],
      action: "了解完整方法与使用边界",
    },

    finalCta: {
      eyebrow: "开始探索",
      title:
        "从兴趣开始，探索你的职业方向。",
      primaryAction: "开始职业兴趣探索",
    },
  },
};

export function getCareerLandingDictionary(
  locale: SupportedLocale,
): CareerLandingDictionary {
  return careerLandingDictionaries[locale];
}
