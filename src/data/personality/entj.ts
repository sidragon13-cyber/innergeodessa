import type { PersonalityProfile } from "./types";

export const entjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",

  type: "ENTJ",

  identity: {
    name: {
      en: "Commander",
      zh: "指挥官型",
    },
    shortName: {
      en: "Strategic Leader",
      zh: "战略领导者",
    },
    tagline: {
      en: "Strategic thinker · Goal driver · Natural organiser",
      zh: "战略思考者 · 目标推动者 · 天生的组织者",
    },
    keywords: {
      en: [
        "Strategy",
        "Leadership",
        "Efficiency",
        "Decision-making",
        "Execution",
        "Organisation",
        "Vision",
        "Growth",
      ],
      zh: ["战略", "领导力", "效率", "决策", "执行", "组织", "愿景", "成长"],
    },
  },

  overview: {
    headline: {
      en: "Able to recognise direction, build systems, and move people toward long-term goals.",
      zh: "你能够识别方向、建立系统，并推动人员与资源朝长期目标前进。",
    },

    paragraphs: {
      en: [
        "ENTJs often demonstrate strong strategic awareness, goal orientation, and leadership tendencies. They are skilled at identifying critical issues in complex environments, recognising inefficiencies, and creating clearer structures, priorities, and execution plans.",
        "They tend to focus on long-term outcomes rather than isolated tasks. When faced with ambiguity or disorder, ENTJs often take responsibility for decision-making, organise resources, assign responsibilities, and move teams toward a defined objective.",
        "ENTJs usually evaluate situations through facts, logic, and expected outcomes. They value competence, efficiency, and continuous improvement, and they are often more interested in improving systems than simply maintaining existing processes.",
        "When balanced, ENTJs can become visionary leaders, entrepreneurs, and drivers of organisational change. Under prolonged pressure, however, they may become impatient, overly forceful, or less attentive to the emotions, pace, and relationship needs of others.",
      ],
      zh: [
        "ENTJ 通常表现出较强的战略意识、目标导向和领导倾向。他们善于在复杂环境中识别关键问题、发现低效率，并建立更清晰的结构、优先级与执行计划。",
        "他们倾向于关注长期成果，而不是孤立任务。面对模糊或混乱局面时，ENTJ 往往会主动承担决策责任、组织资源、分配职责，并推动团队朝明确目标前进。",
        "ENTJ 通常依据事实、逻辑和预期结果评估情况。他们重视能力、效率和持续改进，往往更关注如何优化系统，而不是单纯维持现有流程。",
        "在平衡状态下，ENTJ 可以成为具有远见的领导者、创业者和组织变革推动者。但在长期压力下，他们也可能变得缺乏耐心、过于强势，或较少关注他人的情绪、节奏与关系需要。",
      ],
    },

    summary: {
      en: "The defining strength of an ENTJ is the ability to identify direction, create structure, and move people and resources toward meaningful goals.",
      zh: "ENTJ 最突出的优势，是能够识别方向、建立结构，并推动人员与资源实现有意义的目标。",
    },

    access: "free",
  },

  coreTraits: [
    {
      id: "strategic-vision",
      title: {
        en: "Strategic Vision",
        zh: "战略视野",
      },
      description: {
        en: "Focuses on long-term possibilities and is skilled at identifying opportunities, risks, and important patterns within complex information.",
        zh: "关注长期可能性，善于从复杂信息中识别机会、风险和重要模式。",
      },
    },
    {
      id: "natural-organiser",
      title: {
        en: "Natural Organiser",
        zh: "天生的组织者",
      },
      description: {
        en: "Naturally creates structure, clarifies responsibilities, sets priorities, and brings order to uncertain or disorganised situations.",
        zh: "能够自然地建立结构、明确职责、设定优先级，并为不确定或混乱的局面带来秩序。",
      },
    },
    {
      id: "decisive-execution",
      title: {
        en: "Decisive Execution",
        zh: "果断执行",
      },
      description: {
        en: "Prefers action and measurable progress over prolonged discussion and is often willing to make difficult decisions.",
        zh: "相比长时间讨论，你更重视行动与可衡量的进展，也通常愿意作出困难决定。",
      },
    },
    {
      id: "logical-directness",
      title: {
        en: "Logical and Direct",
        zh: "逻辑清晰且表达直接",
      },
      description: {
        en: "Evaluates situations through evidence and logic and communicates with clarity, although this directness may sometimes feel intense to others.",
        zh: "你倾向于依据证据和逻辑评估情况，并清晰直接地表达观点，但这种直接有时可能让他人感到压力。",
      },
    },
  ],

  strengths: [
    {
      id: "leadership",
      title: {
        en: "Strong Leadership",
        zh: "强大的领导力",
      },
      description: {
        en: "Creates direction, defines standards, and moves teams forward through structure, accountability, and clear goals.",
        zh: "通过明确方向、建立标准、落实责任和设定清晰目标，推动团队持续前进。",
      },
    },
    {
      id: "strategic-thinking",
      title: {
        en: "Strategic Thinking",
        zh: "战略思维",
      },
      description: {
        en: "Recognises long-term opportunities, systemic relationships, and potential risks beyond immediate circumstances.",
        zh: "能够超越眼前情况，识别长期机会、系统关系和潜在风险。",
      },
    },
    {
      id: "problem-solving",
      title: {
        en: "Complex Problem Solving",
        zh: "复杂问题解决",
      },
      description: {
        en: "Identifies root causes, breaks down difficult problems, and designs solutions that can be implemented.",
        zh: "能够识别根本原因、拆解困难问题，并设计可以落地执行的解决方案。",
      },
    },
    {
      id: "goal-orientation",
      title: {
        en: "Goal Orientation",
        zh: "目标导向",
      },
      description: {
        en: "Maintains a clear sense of direction and is willing to invest sustained effort in meaningful objectives.",
        zh: "能够保持明确方向，并愿意为有意义的目标持续投入精力。",
      },
    },
    {
      id: "decision-making",
      title: {
        en: "Decisive Judgement",
        zh: "果断判断",
      },
      description: {
        en: "Makes timely decisions when sufficient information is available and accepts responsibility for the outcome.",
        zh: "在信息充分时能够及时作出决定，并愿意为结果承担责任。",
      },
    },
    {
      id: "resource-integration",
      title: {
        en: "Resource Integration",
        zh: "资源整合",
      },
      description: {
        en: "Coordinates people, information, time, and capital around a shared objective.",
        zh: "能够围绕共同目标协调人员、信息、时间与资本。",
      },
    },
  ],

  growthRisks: [
    {
      id: "over-control",
      title: {
        en: "Over-Control",
        zh: "过度控制",
      },
      description: {
        en: "When outcomes feel important, ENTJs may take control of too many details and reduce the autonomy of others.",
        zh: "当结果非常重要时，ENTJ 可能会控制过多细节，从而削弱他人的自主性。",
      },
      growthAction: {
        en: "Define the expected result clearly, then use scheduled reviews instead of continuous intervention.",
        zh: "明确预期结果，并通过定期复盘代替持续干预。",
      },
    },
    {
      id: "emotional-neglect",
      title: {
        en: "Overlooking Emotional Context",
        zh: "忽视情绪背景",
      },
      description: {
        en: "A strong focus on goals and efficiency may cause them to underestimate the role of trust, emotion, and relationships.",
        zh: "对目标和效率的高度关注，可能使其低估信任、情绪与关系的重要作用。",
      },
      growthAction: {
        en: "Before offering a solution, confirm the other person's concerns, feelings, and practical circumstances.",
        zh: "在提出解决方案之前，先确认对方的关切、感受和现实处境。",
      },
    },
    {
      id: "impatience",
      title: {
        en: "Impatience with Inefficiency",
        zh: "对低效率缺乏耐心",
      },
      description: {
        en: "Slow progress, unclear communication, or indecision may quickly become frustrating.",
        zh: "进展缓慢、沟通不清或迟迟无法决策，可能很快引发挫败感。",
      },
      growthAction: {
        en: "Distinguish between a skills problem, an information problem, and a motivation problem before responding.",
        zh: "在作出反应之前，先区分这是能力问题、信息问题还是动机问题。",
      },
    },
    {
      id: "overconfidence",
      title: {
        en: "Overconfidence in Judgement",
        zh: "对判断过度自信",
      },
      description: {
        en: "Strong reasoning and decision-making ability may lead to underestimating missing information or alternative viewpoints.",
        zh: "较强的推理和决策能力，可能使你低估缺失信息或其他观点的重要性。",
      },
      growthAction: {
        en: "Actively search for evidence that challenges the preferred conclusion before making high-impact decisions.",
        zh: "在作出高影响决策前，主动寻找能够挑战当前倾向性结论的证据。",
      },
    },
    {
      id: "harsh-standards",
      title: {
        en: "Excessively High Standards",
        zh: "标准过高",
      },
      description: {
        en: "ENTJs may expect others to match their own pace, resilience, and level of responsibility.",
        zh: "ENTJ 可能期待他人达到与自己相同的节奏、抗压能力和责任水平。",
      },
      growthAction: {
        en: "Set expectations according to the role, experience level, and resources available to each person.",
        zh: "根据每个人的角色、经验水平和可用资源设定合理期望。",
      },
    },
    {
      id: "work-imbalance",
      title: {
        en: "Work-Life Imbalance",
        zh: "工作与生活失衡",
      },
      description: {
        en: "A strong drive for progress may lead to neglecting rest, health, and important personal relationships.",
        zh: "强烈的进取动力可能导致忽视休息、健康和重要的人际关系。",
      },
      growthAction: {
        en: "Treat recovery as part of the performance system rather than as a reward after all work is complete.",
        zh: "把恢复视为绩效系统的一部分，而不是完成全部工作之后才能获得的奖励。",
      },
    },
  ],

  careerGroups: [
    {
      id: "management-strategy",
      category: {
        en: "Management and Strategy",
        zh: "管理与战略",
      },
      description: {
        en: "Suitable for roles that require setting direction, integrating resources, taking responsibility, and leading long-term execution.",
        zh: "适合需要设定方向、整合资源、承担责任并领导长期执行的岗位。",
      },
      roles: {
        en: [
          "Chief Executive Officer",
          "Chief Operating Officer",
          "General Manager",
          "Operations Director",
          "Strategy Director",
          "Management Consultant",
          "Programme Director",
          "Business Transformation Lead",
        ],
        zh: [
          "首席执行官",
          "首席运营官",
          "总经理",
          "运营总监",
          "战略总监",
          "管理顾问",
          "项目总监",
          "业务转型负责人",
        ],
      },
    },
    {
      id: "business-finance",
      category: {
        en: "Business and Finance",
        zh: "商业与金融",
      },
      description: {
        en: "Suitable for measurable, decision-intensive environments that require commercial judgement and risk assessment.",
        zh: "适合重视可衡量结果、决策密集，并要求商业判断与风险评估的环境。",
      },
      roles: {
        en: [
          "Investment Manager",
          "Financial Analyst",
          "Risk Manager",
          "Business Development Manager",
          "Sales Director",
          "Commercial Director",
          "Market Strategy Lead",
          "Mergers and Acquisitions Adviser",
        ],
        zh: [
          "投资经理",
          "金融分析师",
          "风险经理",
          "业务发展经理",
          "销售总监",
          "商务总监",
          "市场战略负责人",
          "并购顾问",
        ],
      },
    },
    {
      id: "technology-entrepreneurship",
      category: {
        en: "Technology and Entrepreneurship",
        zh: "技术与创业",
      },
      description: {
        en: "Suitable for work that combines technology, products, organisations, and markets to turn innovation into scalable outcomes.",
        zh: "适合将技术、产品、组织与市场结合起来，把创新转化为可规模化成果的工作。",
      },
      roles: {
        en: [
          "Entrepreneur",
          "Product Director",
          "Technology Director",
          "Research and Development Lead",
          "Digital Transformation Lead",
          "Technical Programme Manager",
          "Innovation Director",
          "Enterprise Architect",
        ],
        zh: [
          "创业者",
          "产品总监",
          "技术总监",
          "研发负责人",
          "数字化转型负责人",
          "技术项目经理",
          "创新总监",
          "企业架构师",
        ],
      },
    },
    {
      id: "law-public-affairs",
      category: {
        en: "Law and Public Affairs",
        zh: "法律与公共事务",
      },
      description: {
        en: "Suitable for roles involving logical argument, institutional design, negotiation, and long-term public influence.",
        zh: "适合涉及逻辑论证、制度设计、谈判和长期公共影响力的岗位。",
      },
      roles: {
        en: [
          "Lawyer",
          "Legal Counsel",
          "Policy Analyst",
          "Political Adviser",
          "Public Affairs Director",
          "Government Programme Lead",
          "Governance Consultant",
          "International Relations Adviser",
        ],
        zh: [
          "律师",
          "法律顾问",
          "政策分析师",
          "政治顾问",
          "公共事务总监",
          "政府项目负责人",
          "治理顾问",
          "国际关系顾问",
        ],
      },
    },
  ],

  careerNotice: {
    en: "Personality type alone should not determine a career decision. Career development also depends on abilities, interests, values, education, industry conditions, available resources, and personal goals.",
    zh: "人格类型不应单独决定职业选择。职业发展还取决于能力、兴趣、价值观、教育背景、行业环境、可用资源与个人目标。",
  },

  premiumPreview: {
    headline: {
      en: "Your Complete Personality Report",
      zh: "你的完整人格报告",
    },

    introduction: {
      en: "The full report will combine your four-dimension scores, preference strength, response patterns, and future career-interest data to produce a deeper and more personalised analysis.",
      zh: "完整报告将结合你的四个维度得分、偏好强度、作答模式以及未来的职业兴趣数据，生成更深入、更个性化的分析。",
    },

    sections: [
      {
        id: "deep-structure",
        title: {
          en: "Deep Personality Structure",
          zh: "深层人格结构",
        },
        description: {
          en: "Understand the strength of each preference, your blended traits, and why your responses produced this result.",
          zh: "了解各项偏好的强度、你的复合特征，以及作答模式为何形成这一结果。",
        },
        access: "premium",
      },
      {
        id: "decision-style",
        title: {
          en: "Thinking and Decision-Making",
          zh: "思维与决策方式",
        },
        description: {
          en: "Explore how you collect information, evaluate risk, handle uncertainty, and make important decisions.",
          zh: "分析你如何收集信息、评估风险、处理不确定性并作出重要决定。",
        },
        access: "premium",
      },
      {
        id: "leadership",
        title: {
          en: "Leadership and Teamwork",
          zh: "领导力与团队合作",
        },
        description: {
          en: "Analyse your leadership style, delegation habits, team strengths, and potential management blind spots.",
          zh: "分析你的领导风格、授权习惯、团队优势及潜在管理盲点。",
        },
        access: "premium",
      },
      {
        id: "communication",
        title: {
          en: "Communication and Relationships",
          zh: "沟通与人际关系",
        },
        description: {
          en: "Understand your communication style, conflict patterns, and methods for building more effective relationships.",
          zh: "了解你的沟通风格、冲突模式，以及建立更有效关系的方法。",
        },
        access: "premium",
      },
      {
        id: "stress-pattern",
        title: {
          en: "Stress Patterns and Recovery",
          zh: "压力模式与恢复",
        },
        description: {
          en: "Identify behavioural changes under pressure, warning signs, and recovery strategies suited to your profile.",
          zh: "识别压力下的行为变化、预警信号，以及适合你的人格恢复策略。",
        },
        access: "premium",
      },
      {
        id: "career-matching",
        title: {
          en: "Career and Work Environment Fit",
          zh: "职业与工作环境匹配",
        },
        description: {
          en: "Explore suitable roles, organisational environments, leadership levels, entrepreneurial potential, and career risks.",
          zh: "分析适合的岗位、组织环境、领导层级、创业潜力与职业风险。",
        },
        access: "premium",
      },
      {
        id: "growth-plan",
        title: {
          en: "Personal Growth Plan",
          zh: "个人成长计划",
        },
        description: {
          en: "Receive practical development recommendations across 30-day, 90-day, and one-year stages.",
          zh: "获得覆盖30天、90天和一年阶段的实际成长建议。",
        },
        access: "premium",
      },
      {
        id: "pdf-report",
        title: {
          en: "Structured Complete Report",
          zh: "结构化完整报告",
        },
        description: {
          en: "Review all personality sections, contextual insights, and personalised rule-based guidance in one complete report.",
          zh: "在一份完整报告中查看全部人格章节、情境洞察与基于规则的个性化建议。",
        },
        access: "premium",
      },
    ],

    callToAction: {
      en: "VIEW COMPLETE ENTJ REPORT",
      zh: "查看完整 ENTJ 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
