import type { PersonalityProfile } from "./types";

export const entpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ENTP",

  identity: {
    name: {
      en: "Debater",
      zh: "辩论家型",
    },
    shortName: {
      en: "Inventive Challenger",
      zh: "创新挑战者",
    },
    tagline: {
      en: "Idea catalyst · Agile strategist · Energetic questioner",
      zh: "创意催化者 · 灵活战略家 · 充满活力的提问者",
    },
    keywords: {
      en: [
        "Inventiveness",
        "Debate",
        "Possibility",
        "Agility",
        "Curiosity",
        "Enterprise",
      ],
      zh: ["创新", "辩论", "可能性", "灵活", "好奇", "开拓"],
    },
  },

  overview: {
    headline: {
      en: "You often energise a situation by revealing possibilities others have not considered.",
      zh: "你常常能够发现他人尚未注意到的可能性，为局面注入新的活力。",
    },
    paragraphs: {
      en: [
        "ENTPs tend to engage with the world through ideas, experimentation, and lively examination of accepted assumptions.",
        "They may enjoy connecting people and concepts, testing arguments, and improvising when a changing situation rewards mental agility.",
        "Their appetite for novelty can open valuable paths, while consistent priorities and thoughtful listening help turn possibility into durable impact.",
      ],
      zh: [
        "ENTP 通常通过创意、实验以及对既有假设的积极审视与外部世界互动。",
        "他们喜欢连接人与概念、检验观点，并在不断变化且需要快速思考的环境中灵活应对。",
        "对新鲜事物的强烈兴趣能够打开有价值的新路径，而稳定的优先级和认真倾听则有助于把可能性转化为持久影响。",
      ],
    },
    summary: {
      en: "At your best, you challenge limits constructively and convert fresh connections into workable opportunities.",
      zh: "在最佳状态下，你能够以建设性的方式挑战边界，并把新的联系转化为可执行的机会。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "possibility-seeking",
      title: {
        en: "Possibility Seeking",
        zh: "探索可能性",
      },
      description: {
        en: "Quickly notices alternative interpretations, emerging opportunities, and unconventional routes forward.",
        zh: "能够迅速发现不同的解释、新出现的机会以及非常规的前进路径。",
      },
    },
    {
      id: "intellectual-play",
      title: {
        en: "Intellectual Play",
        zh: "思维探索",
      },
      description: {
        en: "Uses questions and debate to explore an idea rather than simply to defend a fixed position.",
        zh: "通过提问和辩论探索观点，而不仅仅是维护一个固定立场。",
      },
    },
    {
      id: "adaptive-energy",
      title: {
        en: "Adaptive Energy",
        zh: "灵活适应力",
      },
      description: {
        en: "Responds readily to change and often gains momentum from dynamic environments.",
        zh: "能够迅速应对变化，并经常从充满变化的环境中获得动力。",
      },
    },
    {
      id: "entrepreneurial-thinking",
      title: {
        en: "Entrepreneurial Thinking",
        zh: "创业型思维",
      },
      description: {
        en: "Connects unmet needs, available resources, and novel concepts into potential ventures.",
        zh: "能够把尚未满足的需求、现有资源与新颖概念连接起来，形成潜在的商业机会。",
      },
    },
  ],

  strengths: [
    {
      id: "idea-generation",
      title: {
        en: "Idea Generation",
        zh: "创意生成",
      },
      description: {
        en: "Produces a broad range of options when a problem appears constrained.",
        zh: "当问题看似受到限制时，能够提出多种不同的选择和解决方向。",
      },
    },
    {
      id: "persuasive-framing",
      title: {
        en: "Persuasive Framing",
        zh: "说服性表达",
      },
      description: {
        en: "Can make a new possibility vivid and invite others into exploration.",
        zh: "能够生动呈现新的可能性，并吸引他人共同参与探索。",
      },
    },
    {
      id: "strategic-improvisation",
      title: {
        en: "Strategic Improvisation",
        zh: "战略应变",
      },
      description: {
        en: "Adjusts plans quickly as new information or openings appear.",
        zh: "当新信息或新机会出现时，能够迅速调整计划。",
      },
    },
    {
      id: "pattern-connection",
      title: {
        en: "Pattern Connection",
        zh: "模式连接",
      },
      description: {
        en: "Links ideas across fields and sees combinations with practical potential.",
        zh: "能够连接不同领域的观点，并发现具有实际潜力的组合方式。",
      },
    },
    {
      id: "constructive-challenge",
      title: {
        en: "Constructive Challenge",
        zh: "建设性挑战",
      },
      description: {
        en: "Questions established methods and can expose assumptions that need review.",
        zh: "敢于质疑既有方法，并能够发现需要重新审视的假设。",
      },
    },
    {
      id: "opportunity-building",
      title: {
        en: "Opportunity Building",
        zh: "机会构建",
      },
      description: {
        en: "Mobilises conversations, experiments, and networks around promising concepts.",
        zh: "能够围绕有潜力的概念组织讨论、实验与合作网络。",
      },
    },
  ],

  growthRisks: [
    {
      id: "novelty-chasing",
      title: {
        en: "Novelty Chasing",
        zh: "追逐新鲜感",
      },
      description: {
        en: "A new possibility may pull attention away from a valuable existing commitment.",
        zh: "新的可能性可能会把注意力从已有的重要承诺上转移开。",
      },
      growthAction: {
        en: "Use a visible priority limit and finish one meaningful milestone before adding another initiative.",
        zh: "设置清晰可见的优先事项上限，在新增项目之前先完成一个有意义的里程碑。",
      },
    },
    {
      id: "argument-over-connection",
      title: {
        en: "Argument Over Connection",
        zh: "重辩论轻连接",
      },
      description: {
        en: "Exploratory debate may feel personal or exhausting to someone seeking understanding.",
        zh: "对于希望得到理解的人来说，探索性的辩论有时可能显得针对个人或令人疲惫。",
      },
      growthAction: {
        en: "Clarify whether the other person wants exploration, support, or a decision before challenging the idea.",
        zh: "在挑战对方观点之前，先确认对方需要的是共同探索、情感支持还是明确决策。",
      },
    },
    {
      id: "detail-neglect",
      title: {
        en: "Detail Neglect",
        zh: "忽视细节",
      },
      description: {
        en: "Broad strategic energy may overlook operational requirements.",
        zh: "宏观战略热情可能会忽略具体的执行要求。",
      },
      growthAction: {
        en: "Pair every concept with an owner, next action, deadline, and success measure.",
        zh: "为每个概念明确负责人、下一步行动、期限与成功标准。",
      },
    },
    {
      id: "premature-pivoting",
      title: {
        en: "Premature Pivoting",
        zh: "过早转向",
      },
      description: {
        en: "A workable path may be abandoned before evidence has had time to emerge.",
        zh: "一个可行方向可能在证据尚未充分出现之前就被放弃。",
      },
      growthAction: {
        en: "Define the experiment period and decision criteria before starting.",
        zh: "在开始之前先明确实验周期和决策标准。",
      },
    },
    {
      id: "overcommitment",
      title: {
        en: "Overcommitment",
        zh: "承诺过多",
      },
      description: {
        en: "Enthusiasm can create more promises than available time can support.",
        zh: "过度热情可能导致承诺数量超过实际可用时间所能支持的范围。",
      },
      growthAction: {
        en: "Review capacity and remove a commitment whenever a major new one is accepted.",
        zh: "每当接受一项新的重要承诺时，都重新评估能力并取消一项较低优先级的承诺。",
      },
    },
    {
      id: "restless-focus",
      title: {
        en: "Restless Focus",
        zh: "难以持续专注",
      },
      description: {
        en: "Extended concentration on repetitive execution may become difficult.",
        zh: "长时间专注于重复性执行可能会变得困难。",
      },
      growthAction: {
        en: "Create short delivery cycles with visible outcomes and scheduled opportunities for exploration.",
        zh: "建立具有清晰成果的短周期交付机制，并安排固定的探索时间。",
      },
    },
  ],

  careerGroups: [
    {
      id: "entrepreneurship-and-ventures",
      category: {
        en: "Entrepreneurship and Ventures",
        zh: "创业与新业务",
      },
      description: {
        en: "Fast-moving environments can reward opportunity recognition, persuasion, and experimentation.",
        zh: "快速变化的环境能够充分发挥机会识别、说服沟通与实验能力。",
      },
      roles: {
        en: [
          "Entrepreneur",
          "Venture Builder",
          "Business Development Director",
          "Innovation Lead",
        ],
        zh: ["创业者", "新事业构建者", "业务发展总监", "创新负责人"],
      },
    },
    {
      id: "product-and-technology",
      category: {
        en: "Product and Technology",
        zh: "产品与技术",
      },
      description: {
        en: "Product work can combine user problems, emerging technology, and iterative strategy.",
        zh: "产品工作可以把用户问题、新兴技术与持续迭代的战略结合起来。",
      },
      roles: {
        en: [
          "Product Manager",
          "Solutions Architect",
          "Technology Strategist",
          "Growth Product Lead",
        ],
        zh: ["产品经理", "解决方案架构师", "技术战略师", "增长产品负责人"],
      },
    },
    {
      id: "consulting-and-strategy",
      category: {
        en: "Consulting and Strategy",
        zh: "咨询与战略",
      },
      description: {
        en: "Varied strategic problems can provide room for analysis, challenge, and fresh framing.",
        zh: "多样化的战略问题能够提供分析、挑战和重新定义问题的空间。",
      },
      roles: {
        en: [
          "Management Consultant",
          "Innovation Consultant",
          "Brand Strategist",
          "Organisational Strategist",
        ],
        zh: ["管理顾问", "创新顾问", "品牌战略师", "组织战略顾问"],
      },
    },
    {
      id: "communication-and-ideas",
      category: {
        en: "Communication and Ideas",
        zh: "传播与创意",
      },
      description: {
        en: "Public-facing idea work can use verbal agility and audience awareness.",
        zh: "面向公众的创意工作能够发挥语言灵活性与受众洞察力。",
      },
      roles: {
        en: [
          "Creative Director",
          "Journalist",
          "Public Affairs Consultant",
          "Podcast Producer",
        ],
        zh: ["创意总监", "记者", "公共事务顾问", "播客制作人"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type is one source of career insight, not a fixed rule about which roles you can pursue or master.",
    zh: "人格类型只是理解职业偏好的一项参考，而不是规定你能够从事或掌握哪些职业的固定规则。",
  },

  premiumPreview: {
    headline: {
      en: "Channel inventive energy into sustained influence.",
      zh: "把创新能量转化为持续影响力。",
    },
    introduction: {
      en: "A deeper report will examine how you explore, persuade, collaborate, commit, and recover under pressure.",
      zh: "完整报告将进一步分析你如何探索机会、说服他人、开展协作、保持承诺并在压力下恢复状态。",
    },
    sections: [
      {
        id: "opportunity-patterns",
        title: {
          en: "Opportunity Patterns",
          zh: "机会识别模式",
        },
        description: {
          en: "How you recognise and evaluate emerging possibilities.",
          zh: "分析你如何发现并评估新出现的可能性。",
        },
        access: "premium",
      },
      {
        id: "debate-and-influence",
        title: {
          en: "Debate and Influence",
          zh: "辩论与影响力",
        },
        description: {
          en: "How to challenge ideas while preserving trust.",
          zh: "理解如何在挑战观点的同时保持信任。",
        },
        access: "premium",
      },
      {
        id: "decision-discipline",
        title: {
          en: "Decision Discipline",
          zh: "决策纪律",
        },
        description: {
          en: "Methods for choosing among many attractive options.",
          zh: "学习如何在众多有吸引力的选择中作出决定。",
        },
        access: "premium",
      },
      {
        id: "execution-system",
        title: {
          en: "Execution System",
          zh: "执行系统",
        },
        description: {
          en: "Structures that support follow-through without suppressing creativity.",
          zh: "建立既能保证持续执行又不会压制创造力的结构。",
        },
        access: "premium",
      },
      {
        id: "team-contribution",
        title: {
          en: "Team Contribution",
          zh: "团队贡献",
        },
        description: {
          en: "How your energy can stimulate learning and innovation.",
          zh: "分析你的活力如何促进团队学习与创新。",
        },
        access: "premium",
      },
      {
        id: "relationship-awareness",
        title: {
          en: "Relationship Awareness",
          zh: "关系觉察",
        },
        description: {
          en: "Balancing intellectual challenge with emotional context.",
          zh: "平衡思维挑战与关系中的情绪背景。",
        },
        access: "premium",
      },
      {
        id: "stress-and-restlessness",
        title: {
          en: "Stress and Restlessness",
          zh: "压力与躁动",
        },
        description: {
          en: "Recognising scattered effort and reactive pivots.",
          zh: "识别精力分散与被动转向的模式。",
        },
        access: "premium",
      },
      {
        id: "venture-roadmap",
        title: {
          en: "Venture Roadmap",
          zh: "事业发展路线图",
        },
        description: {
          en: "Practical steps for turning a compelling idea into durable value.",
          zh: "把有吸引力的想法转化为持久价值的实践步骤。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ENTP report",
      zh: "查看完整 ENTP 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
