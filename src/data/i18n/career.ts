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
    items: readonly string[];
  };

  disclaimer: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    source: string;
  };

  futureProfile: {
    eyebrow: string;
    title: string;
    description: string;
    labels: readonly string[];
  };

  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
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
        "Most people combine several dimensions. None is more valuable than another, and no single dimension defines your future.",
      items: [
        {
          code: "R",
          title: "Realistic",
          theme:
            "Build, operate, repair, and work with tangible systems.",
          examples: [
            "Practical activity",
            "Tools and equipment",
            "Nature and the physical world",
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
            "Independent problem-solving",
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
            "Performance",
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
            "Communication",
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
            "Influence and decisions",
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
            "Quality control",
            "Information organisation",
          ],
        },
      ],
    },

    pattern: {
      eyebrow: "Your interest pattern",
      title: "A combination, not a rigid label",
      paragraphs: [
        "The assessment highlights your strongest interest areas, supporting dimensions, preferred activities, and the environments that may feel energising—or require more deliberate effort.",
        "Combinations help widen exploration. They are starting points for questions and real-world research, not instructions about the one career you should pursue.",
      ],
      exampleLabel: "Example combinations",
      orLabel: "or",
    },

    resultPreview: {
      eyebrow: "Result preview",
      title: "What your result may include",
      description:
        "A structured overview for comparing possibilities—not a claim to identify your perfect career.",
      items: [
        "Primary and secondary interest dimensions",
        "An explanation of your RIASEC pattern",
        "Preferred tasks and environments",
        "Possible career families",
        "Education and learning directions",
        "Transferable strengths",
        "Development areas",
        "Questions for further exploration",
        "Possible links with personality and values",
        "Practical next-step recommendations",
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
      eyebrow: "Assessment guidance",
      title: "Answer from genuine interest",
      description:
        "Curiosity is different from competence. Consider what draws you in, even when you are still learning.",
      items: [
        "Answer according to genuine interest, not social expectations.",
        "Distinguish what you enjoy from what you are already good at.",
        "Avoid choosing answers only because a career seems prestigious or profitable.",
        "Think across school, work, hobbies, projects, and daily life.",
        "Use the result as evidence for reflection rather than a final decision.",
      ],
    },

    disclaimer: {
      eyebrow: "Professional context",
      title: "Exploration, not a career decision",
      paragraphs: [
        "This assessment is designed for education, self-reflection, and career exploration. It does not provide a professional psychological, educational, recruitment, or employment decision.",
        "Career choices should also consider abilities, values, qualifications, personal circumstances, labour-market conditions, and professional guidance where appropriate.",
      ],
      source:
        "Inspired by widely used RIASEC career-interest concepts. No endorsement by an external organisation is implied.",
    },

    futureProfile: {
      eyebrow: "Future InnerGeo connection",
      title: "More perspectives, brought together",
      description:
        "A future integrated profile may connect career interests with personality preferences, strengths, values, learning style, and personal goals. These connections are not yet available.",
      labels: [
        "Career",
        "Personality",
        "Strengths",
        "Values",
        "Learning",
        "Goals",
      ],
    },

    finalCta: {
      eyebrow: "Your next direction",
      title:
        "Your direction becomes clearer when you understand what draws you forward.",
      description:
        "Begin with curiosity. Explore your interests, compare possibilities, and build a direction through evidence and experience.",
      primaryAction: "Start Career Assessment",
      secondaryAction: "Explore Personality",
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
        "大多数人会同时具备多个兴趣维度。没有哪个维度更加优秀，也没有单一维度能够决定你的未来。",
      items: [
        {
          code: "R",
          title: "现实型",
          theme:
            "喜欢建造、操作、维修以及处理真实可见的事物和系统。",
          examples: [
            "实际操作",
            "工具与设备",
            "自然与物理世界",
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
            "独立解决问题",
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
            "表演",
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
            "沟通",
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
            "影响与决策",
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
            "质量控制",
            "信息整理",
          ],
        },
      ],
    },

    pattern: {
      eyebrow: "你的职业兴趣模式",
      title: "兴趣组合，而不是固定标签",
      paragraphs: [
        "测评会展示你最突出的兴趣领域、辅助维度、偏好的活动，以及哪些环境可能让你更有动力，或需要投入更多有意识的努力。",
        "兴趣组合能够拓宽职业探索范围。它们是提出问题和开展现实研究的起点，而不是规定你只能从事某一种职业。",
      ],
      exampleLabel: "兴趣组合示例",
      orLabel: "或者",
    },

    resultPreview: {
      eyebrow: "结果预览",
      title: "你的结果可能包括什么",
      description:
        "通过结构化信息帮助你比较不同可能性，而不是声称能够找出唯一完美的职业。",
      items: [
        "主要与辅助职业兴趣维度",
        "对 RIASEC 兴趣模式的解释",
        "偏好的任务和工作环境",
        "可能适合探索的职业类别",
        "教育与学习方向",
        "可迁移的优势",
        "需要发展的领域",
        "用于进一步探索的问题",
        "职业兴趣与人格、价值观的潜在联系",
        "可执行的下一步建议",
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
      eyebrow: "作答指导",
      title: "根据真实兴趣作答",
      description:
        "兴趣和能力并不完全相同。即使你仍在学习，也应考虑哪些事情能够真正吸引你。",
      items: [
        "根据真实兴趣作答，而不是迎合社会期待。",
        "区分你喜欢做的事情和你目前已经擅长的事情。",
        "不要只因为某个职业看起来体面或收入较高而选择答案。",
        "综合考虑学习、工作、兴趣爱好、个人项目和日常生活。",
        "把结果作为反思依据，而不是最终职业决定。",
      ],
    },

    disclaimer: {
      eyebrow: "专业边界",
      title: "用于探索，而不是代替职业决定",
      paragraphs: [
        "这项测评用于教育、自我反思和职业探索，不能代替专业的心理、教育、招聘或就业决策。",
        "职业选择还应综合考虑能力、价值观、学历资格、个人情况、劳动力市场条件，并在需要时寻求专业指导。",
      ],
      source:
        "本测评参考了广泛使用的 RIASEC 职业兴趣理论，但不代表任何外部机构的认可或背书。",
    },

    futureProfile: {
      eyebrow: "未来的 InnerGeo 综合连接",
      title: "将更多自我认知维度连接起来",
      description:
        "未来的综合档案可以把职业兴趣与人格偏好、优势、价值观、学习方式和个人目标连接起来。目前这些综合功能尚未开放。",
      labels: [
        "职业",
        "人格",
        "优势",
        "价值观",
        "学习",
        "目标",
      ],
    },

    finalCta: {
      eyebrow: "你的下一步方向",
      title:
        "当你理解是什么在吸引自己前进时，方向就会逐渐变得清晰。",
      description:
        "从好奇心开始，探索自己的兴趣，比较不同可能性，并通过事实和经验逐步建立发展方向。",
      primaryAction: "开始职业兴趣测评",
      secondaryAction: "探索人格类型",
    },
  },
};

export function getCareerLandingDictionary(
  locale: SupportedLocale,
): CareerLandingDictionary {
  return careerLandingDictionaries[locale];
}
