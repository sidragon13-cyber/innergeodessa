import type { PersonalityProfile } from "./types";

export const intjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",

  type: "INTJ",

  identity: {
    name: {
      en: "Architect",
      zh: "建筑师型",
    },

    shortName: {
      en: "Strategic Architect",
      zh: "战略架构师",
    },

    tagline: {
      en: "Independent thinker · Long-range planner · Systems builder",
      zh: "独立思考者 · 长期规划者 · 系统构建者",
    },

    keywords: {
      en: [
        "Independent",
        "Strategic",
        "Analytical",
        "Future-oriented",
        "Systems-minded",
      ],
      zh: ["独立", "战略", "理性分析", "面向未来", "系统思维"],
    },
  },

  overview: {
    access: "free",

    headline: {
      en: "You are driven to understand complex systems and improve how they work.",
      zh: "你渴望理解复杂系统，并不断改进它们的运行方式。",
    },

    paragraphs: {
      en: [
        "INTJs tend to approach life through long-range thinking, internal analysis, and deliberate planning.",
        "They often prefer to understand the structure behind a problem before taking action and are motivated by competence, independence, and meaningful progress.",
      ],
      zh: [
        "INTJ 通常以长期思考、内部分析与审慎规划的方式面对生活。",
        "他们往往会先理解问题背后的结构，再采取行动，并受到专业能力、独立自主与有意义进展的驱动。",
      ],
    },

    summary: {
      en: "At your best, you combine strategic vision with disciplined execution.",
      zh: "在最佳状态下，你能够把战略远见与有纪律的执行结合起来。",
    },
  },

  coreTraits: [
    {
      id: "strategic-thinking",
      title: {
        en: "Strategic Thinking",
        zh: "战略思维",
      },
      description: {
        en: "You naturally look beyond immediate events and consider long-term patterns, consequences, and opportunities.",
        zh: "你通常会超越眼前事件，思考长期趋势、潜在后果与未来机会。",
      },
    },
    {
      id: "independence",
      title: {
        en: "Independent Judgment",
        zh: "独立判断",
      },
      description: {
        en: "You prefer to evaluate ideas through your own reasoning rather than relying automatically on convention or group opinion.",
        zh: "你倾向于依据自己的推理评估观点，而不是自动依赖惯例或群体意见。",
      },
    },
    {
      id: "systems-thinking",
      title: {
        en: "Systems Orientation",
        zh: "系统导向",
      },
      description: {
        en: "You are often interested in how different parts connect and how an entire system can be made more effective.",
        zh: "你经常关注不同部分如何相互连接，以及如何提升整个系统的运行效率。",
      },
    },
    {
      id: "high-standards",
      title: {
        en: "High Standards",
        zh: "高标准",
      },
      description: {
        en: "You value competence and may hold yourself and others to demanding standards of quality and logic.",
        zh: "你重视能力、质量与逻辑，也可能对自己和他人提出较高要求。",
      },
    },
  ],

  strengths: [
    {
      id: "planning",
      title: {
        en: "Long-range planning",
        zh: "长期规划",
      },
      description: {
        en: "You can identify future implications and build structured plans around complex goals.",
        zh: "你能够识别未来影响，并围绕复杂目标建立结构清晰的长期计划。",
      },
    },
    {
      id: "problem-solving",
      title: {
        en: "Complex problem solving",
        zh: "复杂问题解决",
      },
      description: {
        en: "You are comfortable analysing difficult problems and developing original solutions.",
        zh: "你擅长分析困难问题，并提出具有原创性的解决方案。",
      },
    },
    {
      id: "focus",
      title: {
        en: "Focused execution",
        zh: "专注执行",
      },
      description: {
        en: "Once committed to a meaningful objective, you can work with persistence and concentration.",
        zh: "一旦确定有意义的目标，你通常能够保持专注并持续推进。",
      },
    },
    {
      id: "systems-thinking",
      title: {
        en: "Systems thinking",
        zh: "系统思考",
      },
      description: {
        en: "You naturally examine how different parts of a system interact and where structural improvements can create lasting results.",
        zh: "你会自然地分析系统各部分如何互动，并寻找能够产生长期效果的结构性改进。",
      },
    },
    {
      id: "independent-learning",
      title: {
        en: "Independent learning",
        zh: "独立学习",
      },
      description: {
        en: "You can develop deep expertise through self-directed research, experimentation, and continuous refinement.",
        zh: "你能够通过自主研究、实践试验与持续优化，逐步建立深度专业能力。",
      },
    },
    {
      id: "strategic-objectivity",
      title: {
        en: "Strategic objectivity",
        zh: "战略客观性",
      },
      description: {
        en: "You can step back from immediate pressure and evaluate decisions according to evidence, priorities, and long-term consequences.",
        zh: "你能够暂时跳出眼前压力，根据证据、优先级和长期后果评估决策。",
      },
    },
  ],

  growthRisks: [
    {
      id: "overanalysis",
      title: {
        en: "Overanalysis",
        zh: "过度分析",
      },
      description: {
        en: "You may continue refining a plan after enough information already exists to take action.",
        zh: "即使已经掌握足够信息，你仍可能继续完善计划，从而推迟实际行动。",
      },
      growthAction: {
        en: "Define a clear decision deadline and act once the most important evidence is available.",
        zh: "设定明确的决策期限，在关键证据已经充分时立即采取行动。",
      },
    },
    {
      id: "emotional-distance",
      title: {
        en: "Emotional distance",
        zh: "情感距离",
      },
      description: {
        en: "Your direct and analytical style may sometimes make others feel unheard or underestimated.",
        zh: "直接而理性的表达方式，有时可能让他人感到自己的情绪或意见没有被充分重视。",
      },
      growthAction: {
        en: "Pause to acknowledge emotional concerns before moving into analysis or solutions.",
        zh: "在进入分析或提出方案之前，先停下来确认并回应对方的情绪和关切。",
      },
    },
    {
      id: "perfectionism",
      title: {
        en: "Perfectionism",
        zh: "完美主义",
      },
      description: {
        en: "High internal standards can make delegation, experimentation, or imperfect progress difficult.",
        zh: "较高的内部标准可能使授权、试验或接受不完美的阶段性成果变得困难。",
      },
      growthAction: {
        en: "Separate tasks that require excellence from tasks that only require a useful first version.",
        zh: "区分必须追求卓越的任务，以及只需要先完成一个可用版本的任务。",
      },
    },
    {
      id: "low-tolerance-for-inefficiency",
      title: {
        en: "Low tolerance for inefficiency",
        zh: "对低效率容忍度较低",
      },
      description: {
        en: "Slow processes, unclear thinking, or repeated mistakes may cause frustration and make collaboration more difficult.",
        zh: "缓慢的流程、模糊的思考或重复错误可能让你感到挫败，并增加协作难度。",
      },
      growthAction: {
        en: "Distinguish between genuine structural problems and normal differences in experience, pace, or working style.",
        zh: "区分真正的结构性问题，以及由经验、节奏或工作方式不同所产生的正常差异。",
      },
    },
    {
      id: "excessive-independence",
      title: {
        en: "Excessive independence",
        zh: "过度独立",
      },
      description: {
        en: "You may try to solve too much alone and delay asking for input that could improve the outcome.",
        zh: "你可能倾向于独自解决过多问题，从而延迟获取本可以改善结果的意见和支持。",
      },
      growthAction: {
        en: "Identify the decisions where early collaboration would reduce blind spots without weakening your autonomy.",
        zh: "识别哪些决策适合尽早协作，在不削弱自主性的同时减少认知盲点。",
      },
    },
    {
      id: "rigidity",
      title: {
        en: "Strategic rigidity",
        zh: "战略僵化",
      },
      description: {
        en: "Once a model or plan appears logically sound, you may resist changing direction when new human or practical factors emerge.",
        zh: "当一个模型或计划在逻辑上看似成立时，即使出现新的现实或人员因素，你也可能不愿改变方向。",
      },
      growthAction: {
        en: "Schedule deliberate review points where assumptions, evidence, and stakeholder feedback can be reconsidered.",
        zh: "设置明确的复盘节点，重新检查假设、证据和相关方反馈。",
      },
    },
  ],

  careerGroups: [
    {
      id: "strategy",
      category: {
        en: "Strategy and Leadership",
        zh: "战略与领导",
      },
      description: {
        en: "Roles involving long-term planning, complex decisions, and organisational design may suit your strengths.",
        zh: "涉及长期规划、复杂决策与组织设计的工作，可能更适合发挥你的优势。",
      },
      roles: {
        en: [
          "Strategy Consultant",
          "Business Architect",
          "Product Strategist",
          "Operations Director",
        ],
        zh: ["战略顾问", "商业架构师", "产品战略师", "运营总监"],
      },
    },
    {
      id: "technology",
      category: {
        en: "Technology and Systems",
        zh: "技术与系统",
      },
      description: {
        en: "You may enjoy work that requires systems design, technical analysis, and structured problem solving.",
        zh: "需要系统设计、技术分析与结构化问题解决的工作，可能更容易让你保持投入。",
      },
      roles: {
        en: [
          "Software Architect",
          "Data Scientist",
          "Systems Analyst",
          "AI Engineer",
        ],
        zh: ["软件架构师", "数据科学家", "系统分析师", "人工智能工程师"],
      },
    },
    {
      id: "research",
      category: {
        en: "Research and Analysis",
        zh: "研究与分析",
      },
      description: {
        en: "Research environments may appeal when they offer independence, intellectual depth, and meaningful questions.",
        zh: "能够提供独立空间、思考深度和有意义问题的研究环境，可能更符合你的偏好。",
      },
      roles: {
        en: [
          "Research Scientist",
          "Policy Analyst",
          "Economist",
          "Academic Researcher",
        ],
        zh: ["研究科学家", "政策分析师", "经济学家", "学术研究员"],
      },
    },
    {
      id: "design-and-innovation",
      category: {
        en: "Design and Innovation",
        zh: "设计与创新",
      },
      description: {
        en: "You may perform well in roles that combine original thinking, structured design, and the creation of better products or systems.",
        zh: "结合原创思考、结构化设计以及产品或系统改进的岗位，可能有利于你发挥能力。",
      },
      roles: {
        en: [
          "Product Designer",
          "Innovation Consultant",
          "Service Designer",
          "Research and Development Manager",
        ],
        zh: ["产品设计师", "创新顾问", "服务设计师", "研发经理"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type should be used as one source of insight rather than as a fixed limit on career choices.",
    zh: "人格类型应作为理解职业偏好的参考之一，而不应被视为限制职业选择的固定边界。",
  },

  premiumPreview: {
    headline: {
      en: "Build a deeper understanding of your strategic personality.",
      zh: "深入理解你的战略型人格模式。",
    },

    introduction: {
      en: "A future premium report will provide more detailed guidance on work style, relationships, leadership, decision-making, and personal development.",
      zh: "完整报告将进一步分析你的工作方式、人际关系、领导风格、决策模式与个人成长路径。",
    },

    sections: [
      {
        id: "leadership",
        title: {
          en: "Leadership Style",
          zh: "领导风格",
        },
        description: {
          en: "How you organise people, decisions, and long-term objectives.",
          zh: "分析你如何组织人员、制定决策并推动长期目标。",
        },
        access: "premium",
      },
      {
        id: "relationships",
        title: {
          en: "Relationship Patterns",
          zh: "关系模式",
        },
        description: {
          en: "How independence, trust, and communication shape your relationships.",
          zh: "理解独立性、信任与沟通方式如何影响你的人际关系。",
        },
        access: "premium",
      },
      {
        id: "development",
        title: {
          en: "Development Plan",
          zh: "成长计划",
        },
        description: {
          en: "Practical guidance for balancing strategic strength with flexibility and emotional awareness.",
          zh: "提供平衡战略优势、灵活性与情绪觉察的实践建议。",
        },
        access: "premium",
      },
      {
        id: "career",
        title: {
          en: "Career Environment",
          zh: "职业环境",
        },
        description: {
          en: "The responsibilities, cultures, and challenges most likely to support your performance.",
          zh: "分析哪些职责、组织文化与工作挑战更有利于你的长期表现。",
        },
        access: "premium",
      },
      {
        id: "decision-making",
        title: {
          en: "Decision-Making Style",
          zh: "决策风格",
        },
        description: {
          en: "How you evaluate evidence, manage uncertainty, and decide when a plan is ready for action.",
          zh: "理解你如何评估证据、处理不确定性并判断何时采取行动。",
        },
        access: "premium",
      },
      {
        id: "communication",
        title: {
          en: "Communication Style",
          zh: "沟通风格",
        },
        description: {
          en: "How your direct, structured communication affects collaboration, influence, and mutual understanding.",
          zh: "分析直接而结构化的表达方式如何影响协作、影响力与相互理解。",
        },
        access: "premium",
      },
      {
        id: "stress-patterns",
        title: {
          en: "Stress Patterns",
          zh: "压力模式",
        },
        description: {
          en: "How pressure may affect your thinking, behaviour, energy, and relationships.",
          zh: "分析压力如何影响你的思维、行为、精力与人际关系。",
        },
        access: "premium",
      },
      {
        id: "personal-strategy",
        title: {
          en: "Personal Strategy",
          zh: "个人策略",
        },
        description: {
          en: "A practical framework for applying your strengths while improving flexibility, connection, and execution.",
          zh: "建立发挥优势并提升灵活性、连接能力与执行力的实践框架。",
        },
        access: "premium",
      },
    ],

    callToAction: {
      en: "Premium report coming soon",
      zh: "查看完整 INTJ 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
