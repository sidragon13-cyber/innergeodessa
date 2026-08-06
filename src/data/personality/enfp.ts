import type { PersonalityProfile } from "./types";

export const enfpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ENFP",

  identity: {
    name: {
      en: "Campaigner",
      zh: "竞选者型",
    },
    shortName: {
      en: "Imaginative Connector",
      zh: "想象型连接者",
    },
    tagline: {
      en: "Possibility champion · Authentic communicator · Energetic encourager",
      zh: "可能性倡导者 · 真诚沟通者 · 充满活力的鼓励者",
    },
    keywords: {
      en: [
        "Enthusiasm",
        "Imagination",
        "Connection",
        "Authenticity",
        "Exploration",
        "Inspiration",
      ],
      zh: ["热情", "想象力", "连接", "真实", "探索", "启发"],
    },
  },

  overview: {
    headline: {
      en: "You often bring possibility to life by connecting ideas, people, and personal meaning.",
      zh: "你常常通过连接思想、人与个人意义，让可能性真正鲜活起来。",
    },
    paragraphs: {
      en: [
        "ENFPs tend to approach experience with curiosity, expressive energy, and an interest in what people or situations could become.",
        "They may build rapport quickly and encourage experimentation, especially when a project allows originality and values-based contribution.",
        "Their breadth of enthusiasm can be a strong catalyst, while priorities and completion routines help protect the ideas that matter most.",
      ],
      zh: [
        "ENFP 通常以好奇心、富有感染力的能量，以及对人与情境未来可能性的关注来面对生活。",
        "他们往往能够迅速建立关系并鼓励尝试，尤其是在一个允许原创表达和价值观驱动贡献的项目中。",
        "广泛的热情能够成为强大的催化剂，而清晰的优先级和完成机制，则有助于保护真正重要的想法。",
      ],
    },
    summary: {
      en: "At your best, you awaken meaningful possibility and help people move toward it with energy and authenticity.",
      zh: "在最佳状态下，你能够唤醒有意义的可能性，并以热情和真诚帮助人们向它前进。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "possibility-imagination",
      title: {
        en: "Possibility Imagination",
        zh: "可能性想象",
      },
      description: {
        en: "Notices emerging options and sees potential in people, ideas, and changing circumstances.",
        zh: "能够发现正在出现的新选择，并看见人、思想与变化情境中的潜力。",
      },
    },
    {
      id: "authentic-expression",
      title: {
        en: "Authentic Expression",
        zh: "真实表达",
      },
      description: {
        en: "Communicates with personal energy and a desire for genuine connection.",
        zh: "以鲜明的个人能量进行沟通，并渴望建立真实连接。",
      },
    },
    {
      id: "relational-curiosity",
      title: {
        en: "Relational Curiosity",
        zh: "关系好奇心",
      },
      description: {
        en: "Shows interest in individual stories, motivations, and aspirations.",
        zh: "对个人经历、内在动机与未来愿望抱有真诚兴趣。",
      },
    },
    {
      id: "spontaneous-adaptation",
      title: {
        en: "Spontaneous Adaptation",
        zh: "即时适应",
      },
      description: {
        en: "Responds flexibly as new information and opportunities emerge.",
        zh: "当新信息和新机会出现时，能够灵活调整。",
      },
    },
  ],

  strengths: [
    {
      id: "inspiring-others",
      title: {
        en: "Inspiring Others",
        zh: "激励他人",
      },
      description: {
        en: "Helps people see possibility and reconnect with motivation.",
        zh: "帮助他人看见可能性，并重新连接内在动力。",
      },
    },
    {
      id: "creative-connections",
      title: {
        en: "Creative Connections",
        zh: "创造性连接",
      },
      description: {
        en: "Combines distant ideas into fresh concepts and narratives.",
        zh: "能够把看似遥远的观点组合成新的概念和叙事。",
      },
    },
    {
      id: "rapport-building",
      title: {
        en: "Rapport Building",
        zh: "快速建立关系",
      },
      description: {
        en: "Creates an open atmosphere where people often feel able to contribute.",
        zh: "能够营造开放氛围，让人们更愿意参与和表达。",
      },
    },
    {
      id: "adaptive-communication",
      title: {
        en: "Adaptive Communication",
        zh: "灵活沟通",
      },
      description: {
        en: "Adjusts tone and framing to engage different audiences.",
        zh: "能够根据不同受众调整语气和表达方式。",
      },
    },
    {
      id: "values-advocacy",
      title: {
        en: "Values Advocacy",
        zh: "价值倡导",
      },
      description: {
        en: "Brings visible energy to causes and work that feel meaningful.",
        zh: "能够为具有意义的事业和工作注入鲜明能量。",
      },
    },
    {
      id: "experimental-learning",
      title: {
        en: "Experimental Learning",
        zh: "实验式学习",
      },
      description: {
        en: "Learns readily through exploration, conversation, and practical trials.",
        zh: "善于通过探索、交流和实际尝试进行学习。",
      },
    },
  ],

  growthRisks: [
    {
      id: "scattered-commitments",
      title: {
        en: "Scattered Commitments",
        zh: "承诺过于分散",
      },
      description: {
        en: "Many interesting directions may divide attention and weaken completion.",
        zh: "过多有吸引力的方向可能分散注意力，并削弱完成能力。",
      },
      growthAction: {
        en: "Choose three active priorities and place all other ideas in a later list.",
        zh: "只保留三个当前优先事项，把其他想法放入后续清单。",
      },
    },
    {
      id: "inspiration-dependence",
      title: {
        en: "Dependence on Inspiration",
        zh: "依赖灵感",
      },
      description: {
        en: "Routine stages may become harder once emotional excitement decreases.",
        zh: "当情绪上的兴奋感下降后，常规执行阶段可能变得困难。",
      },
      growthAction: {
        en: "Use short scheduled work blocks and visible milestones during low-novelty phases.",
        zh: "在新鲜感较低的阶段，使用短时工作区块和清晰可见的里程碑。",
      },
    },
    {
      id: "overpromising",
      title: {
        en: "Overpromising",
        zh: "承诺过多",
      },
      description: {
        en: "Enthusiasm may produce commitments before capacity is understood.",
        zh: "热情可能让你在尚未了解自身能力之前作出承诺。",
      },
      growthAction: {
        en: "Pause before agreeing and check time, energy, and existing obligations.",
        zh: "在答应之前暂停一下，检查时间、精力和已有责任。",
      },
    },
    {
      id: "feedback-sensitivity",
      title: {
        en: "Feedback Sensitivity",
        zh: "对反馈敏感",
      },
      description: {
        en: "Critical responses may feel like rejection of an idea's meaning or personal intent.",
        zh: "批评性反馈可能被感受为对想法意义或个人动机的否定。",
      },
      growthAction: {
        en: "Identify the specific behaviour or output being evaluated before interpreting the wider message.",
        zh: "先明确被评价的是哪项具体行为或成果，再理解反馈的更广泛含义。",
      },
    },
    {
      id: "conflict-deflection",
      title: {
        en: "Conflict Deflection",
        zh: "回避冲突核心",
      },
      description: {
        en: "Positive reframing may move past a disagreement before it is resolved.",
        zh: "积极重构问题有时会让对话过早绕过尚未真正解决的分歧。",
      },
      growthAction: {
        en: "Stay with the concrete concern long enough to confirm what needs to change.",
        zh: "在具体问题上停留足够时间，确认真正需要改变的内容。",
      },
    },
    {
      id: "energy-volatility",
      title: {
        en: "Energy Volatility",
        zh: "精力波动",
      },
      description: {
        en: "Intense engagement can alternate with abrupt depletion.",
        zh: "高强度投入可能与突然的精力耗竭交替出现。",
      },
      growthAction: {
        en: "Plan recovery alongside demanding social or creative commitments.",
        zh: "在安排高强度社交或创造性任务时，同步规划恢复时间。",
      },
    },
  ],

  careerGroups: [
    {
      id: "creative-communication",
      category: {
        en: "Creative Communication",
        zh: "创意传播",
      },
      description: {
        en: "Expressive work can combine ideas, audiences, and meaningful stories.",
        zh: "表达型工作能够把创意、受众与有意义的故事结合起来。",
      },
      roles: {
        en: [
          "Creative Strategist",
          "Content Producer",
          "Brand Storyteller",
          "Communications Manager",
        ],
        zh: ["创意战略师", "内容制作人", "品牌故事策划师", "传播经理"],
      },
    },
    {
      id: "people-development",
      category: {
        en: "People Development",
        zh: "人才发展",
      },
      description: {
        en: "Development roles can use encouragement, curiosity, and individual attention.",
        zh: "发展型岗位能够发挥鼓励、好奇心与对个体的关注。",
      },
      roles: {
        en: [
          "Career Coach",
          "Learning Facilitator",
          "Talent Development Specialist",
          "Student Adviser",
        ],
        zh: ["职业教练", "学习引导师", "人才发展专家", "学生顾问"],
      },
    },
    {
      id: "innovation-and-product",
      category: {
        en: "Innovation and Product",
        zh: "创新与产品",
      },
      description: {
        en: "Exploratory product settings can reward user empathy and possibility thinking.",
        zh: "探索型产品环境能够充分发挥用户同理心与可能性思维。",
      },
      roles: {
        en: [
          "Product Discovery Lead",
          "UX Researcher",
          "Innovation Consultant",
          "Community Product Manager",
        ],
        zh: ["产品探索负责人", "用户体验研究员", "创新顾问", "社区产品经理"],
      },
    },
    {
      id: "social-impact",
      category: {
        en: "Social Impact",
        zh: "社会影响",
      },
      description: {
        en: "Mission-driven initiatives can connect values, networks, and public engagement.",
        zh: "使命驱动型项目能够把价值观、关系网络与公众参与连接起来。",
      },
      roles: {
        en: [
          "Campaign Manager",
          "Community Organiser",
          "Social Enterprise Manager",
          "Fundraising Strategist",
        ],
        zh: ["活动经理", "社区组织者", "社会企业经理", "募资战略师"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type can offer useful career reflection, but it does not define what work you are capable of learning or doing well.",
    zh: "人格类型可以为职业反思提供参考，但不会定义你能够学习或胜任哪些工作。",
  },

  premiumPreview: {
    headline: {
      en: "Focus your possibilities without losing your spark.",
      zh: "在不失去活力的前提下聚焦你的可能性。",
    },
    introduction: {
      en: "A deeper report will examine motivation, relationships, communication, work fit, follow-through, and recovery.",
      zh: "完整报告将进一步分析动机、人际关系、沟通方式、工作适配、持续执行与恢复。",
    },
    sections: [
      {
        id: "motivation-map",
        title: {
          en: "Motivation Map",
          zh: "动机地图",
        },
        description: {
          en: "How meaning, novelty, and connection influence your energy.",
          zh: "分析意义感、新鲜感与连接如何影响你的精力。",
        },
        access: "premium",
      },
      {
        id: "idea-selection",
        title: {
          en: "Idea Selection",
          zh: "想法筛选",
        },
        description: {
          en: "Choosing which possibilities deserve sustained investment.",
          zh: "判断哪些可能性值得持续投入。",
        },
        access: "premium",
      },
      {
        id: "communication-energy",
        title: {
          en: "Communication Energy",
          zh: "沟通能量",
        },
        description: {
          en: "Using enthusiasm clearly across different audiences.",
          zh: "学习如何面向不同受众清晰地运用热情。",
        },
        access: "premium",
      },
      {
        id: "relationship-depth",
        title: {
          en: "Relationship Depth",
          zh: "关系深度",
        },
        description: {
          en: "Balancing broad connection with dependable presence.",
          zh: "平衡广泛连接与稳定可靠的陪伴。",
        },
        access: "premium",
      },
      {
        id: "execution-rhythm",
        title: {
          en: "Execution Rhythm",
          zh: "执行节奏",
        },
        description: {
          en: "Simple structures that carry ideas through routine stages.",
          zh: "建立帮助想法穿越常规执行阶段的简单结构。",
        },
        access: "premium",
      },
      {
        id: "career-fit",
        title: {
          en: "Career Fit",
          zh: "职业适配",
        },
        description: {
          en: "Work conditions that reward creativity and human engagement.",
          zh: "分析哪些工作条件能够发挥创造力与人际互动优势。",
        },
        access: "premium",
      },
      {
        id: "stress-recovery",
        title: {
          en: "Stress and Recovery",
          zh: "压力与恢复",
        },
        description: {
          en: "Recognising overload, disappointment, and depleted enthusiasm.",
          zh: "识别过度负荷、失望与热情耗竭。",
        },
        access: "premium",
      },
      {
        id: "focused-growth",
        title: {
          en: "Focused Growth",
          zh: "聚焦成长",
        },
        description: {
          en: "A practical plan for turning chosen possibilities into results.",
          zh: "把选定的可能性转化为实际成果的行动计划。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ENFP report",
      zh: "查看完整 ENFP 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
