import type { PersonalityProfile } from "./types";

export const intpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "INTP",

  identity: {
    name: {
      en: "Logician",
      zh: "逻辑学家型",
    },
    shortName: {
      en: "Conceptual Analyst",
      zh: "概念分析者",
    },
    tagline: {
      en: "Curious theorist · Independent explorer · Precise problem solver",
      zh: "好奇的理论探索者 · 独立研究者 · 精确的问题解决者",
    },
    keywords: {
      en: [
        "Curiosity",
        "Logic",
        "Independence",
        "Originality",
        "Analysis",
        "Adaptability",
      ],
      zh: ["好奇", "逻辑", "独立", "原创", "分析", "适应力"],
    },
  },

  overview: {
    headline: {
      en: "You are often drawn to the principles beneath complex ideas and systems.",
      zh: "你往往会被复杂思想与系统背后的基本原理所吸引。",
    },
    paragraphs: {
      en: [
        "INTPs tend to explore problems by testing assumptions, connecting concepts, and searching for explanations that remain coherent under scrutiny.",
        "They often value intellectual freedom and may work best when they can investigate difficult questions without unnecessary rules or premature conclusions.",
        "Their flexibility can support inventive solutions, although sustained execution may require deliberate structure when novelty fades.",
      ],
      zh: [
        "INTP 通常通过检验假设、连接不同概念，并寻找经得起深入审视的解释来探索问题。",
        "他们重视思想自由，在不受多余规则或过早结论限制的情况下研究困难问题时，往往能够发挥得更好。",
        "灵活开放的思维有助于产生创新方案，但当新鲜感逐渐消退时，持续执行通常需要有意识地建立结构和节奏。",
      ],
    },
    summary: {
      en: "At your best, you combine rigorous curiosity with the freedom to discover an elegant new approach.",
      zh: "在最佳状态下，你能够把严谨的好奇心与自由探索结合起来，发现简洁而优雅的新方法。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "conceptual-curiosity",
      title: {
        en: "Conceptual Curiosity",
        zh: "概念好奇心",
      },
      description: {
        en: "Enjoys examining theories, assumptions, and hidden relationships until a clearer model emerges.",
        zh: "喜欢持续研究理论、假设与隐藏关系，直到形成更加清晰的理解模型。",
      },
    },
    {
      id: "independent-reasoning",
      title: {
        en: "Independent Reasoning",
        zh: "独立推理",
      },
      description: {
        en: "Prefers conclusions supported by personal analysis rather than status, convention, or group pressure.",
        zh: "更愿意相信经过个人分析支持的结论，而不是权威地位、传统惯例或群体压力。",
      },
    },
    {
      id: "adaptive-exploration",
      title: {
        en: "Adaptive Exploration",
        zh: "灵活探索",
      },
      description: {
        en: "Keeps multiple possibilities open and readily revises an idea when stronger evidence appears.",
        zh: "倾向于保留多种可能性，并在出现更有力证据时及时修正原有观点。",
      },
    },
    {
      id: "analytical-distance",
      title: {
        en: "Analytical Distance",
        zh: "分析距离",
      },
      description: {
        en: "Can step back from immediate reactions to examine a problem with precision and perspective.",
        zh: "能够暂时跳出即时反应，以更加精确和客观的视角审视问题。",
      },
    },
  ],

  strengths: [
    {
      id: "model-building",
      title: {
        en: "Model Building",
        zh: "模型构建",
      },
      description: {
        en: "Creates useful conceptual frameworks for understanding complicated systems.",
        zh: "能够建立有用的概念框架，帮助理解复杂系统。",
      },
    },
    {
      id: "original-solutions",
      title: {
        en: "Original Solutions",
        zh: "原创解决方案",
      },
      description: {
        en: "Generates unconventional options when standard methods do not fit the problem.",
        zh: "当常规方法不适用时，能够提出非传统而具有创造性的解决方案。",
      },
    },
    {
      id: "critical-analysis",
      title: {
        en: "Critical Analysis",
        zh: "批判性分析",
      },
      description: {
        en: "Identifies weak assumptions, contradictions, and gaps in reasoning.",
        zh: "能够识别薄弱假设、逻辑矛盾与推理漏洞。",
      },
    },
    {
      id: "rapid-learning",
      title: {
        en: "Rapid Learning",
        zh: "快速学习",
      },
      description: {
        en: "Absorbs unfamiliar concepts quickly when a subject offers intellectual depth.",
        zh: "当一个主题具有足够的思想深度时，能够快速理解并吸收陌生概念。",
      },
    },
    {
      id: "intellectual-honesty",
      title: {
        en: "Intellectual Honesty",
        zh: "思想诚实",
      },
      description: {
        en: "Is often willing to change position when the available evidence changes.",
        zh: "当现有证据发生变化时，通常愿意调整自己的立场。",
      },
    },
    {
      id: "calm-problem-solving",
      title: {
        en: "Calm Problem Solving",
        zh: "冷静解决问题",
      },
      description: {
        en: "Can remain composed while separating a difficult issue into workable parts.",
        zh: "面对困难问题时能够保持冷静，并将其拆解为可以处理的部分。",
      },
    },
  ],

  growthRisks: [
    {
      id: "analysis-without-action",
      title: {
        en: "Analysis Without Action",
        zh: "只分析而不行动",
      },
      description: {
        en: "Continued exploration may delay a decision after enough information is available.",
        zh: "在信息已经充分之后，持续探索仍可能导致决策被推迟。",
      },
      growthAction: {
        en: "Define a decision threshold and convert the strongest current idea into a small experiment.",
        zh: "设定明确的决策门槛，并把当前最有价值的想法转化为一个小规模实验。",
      },
    },
    {
      id: "unfinished-execution",
      title: {
        en: "Unfinished Execution",
        zh: "执行未完成",
      },
      description: {
        en: "Interest may decline once a problem becomes routine implementation.",
        zh: "当问题进入常规执行阶段后，兴趣可能迅速下降。",
      },
      growthAction: {
        en: "Break delivery into visible milestones and reserve focused time for completion.",
        zh: "把交付过程拆分为清晰可见的里程碑，并预留专门时间完成收尾工作。",
      },
    },
    {
      id: "social-withdrawal",
      title: {
        en: "Excessive Withdrawal",
        zh: "过度退缩",
      },
      description: {
        en: "A preference for internal processing may reduce useful communication with others.",
        zh: "偏好在内部独立处理问题，可能减少与他人之间有价值的沟通。",
      },
      growthAction: {
        en: "Share an early working model and invite targeted feedback before refining it alone.",
        zh: "在独自继续完善之前，先分享早期模型并主动获取有针对性的反馈。",
      },
    },
    {
      id: "overcomplication",
      title: {
        en: "Overcomplication",
        zh: "过度复杂化",
      },
      description: {
        en: "Elegant complexity may sometimes be valued more than a simple usable answer.",
        zh: "有时可能过度重视优雅而复杂的解释，忽略简单且可用的答案。",
      },
      growthAction: {
        en: "Ask which explanation or solution is sufficient for the actual decision.",
        zh: "明确当前决策真正需要什么程度的解释或方案，避免不必要的复杂化。",
      },
    },
    {
      id: "emotional-blind-spots",
      title: {
        en: "Emotional Blind Spots",
        zh: "情绪盲点",
      },
      description: {
        en: "Logical analysis may overlook how people experience a decision.",
        zh: "逻辑分析有时可能忽略他人如何感受和体验一个决定。",
      },
      growthAction: {
        en: "Include trust, motivation, and emotional impact among the relevant system variables.",
        zh: "把信任、动机与情绪影响纳入需要评估的系统变量。",
      },
    },
    {
      id: "routine-resistance",
      title: {
        en: "Routine Resistance",
        zh: "抗拒重复性工作",
      },
      description: {
        en: "Necessary repetition can feel restrictive and invite avoidance.",
        zh: "必要的重复性工作可能让你感到受限，从而产生回避倾向。",
      },
      growthAction: {
        en: "Automate recurring work where possible and connect remaining routines to a valued outcome.",
        zh: "尽可能自动化重复任务，并把无法避免的日常工作与重要成果联系起来。",
      },
    },
  ],

  careerGroups: [
    {
      id: "research-and-theory",
      category: {
        en: "Research and Theory",
        zh: "研究与理论",
      },
      description: {
        en: "Work centred on discovery, explanation, and difficult questions can reward sustained curiosity.",
        zh: "以发现、解释和解决困难问题为核心的工作，能够充分发挥持续的好奇心。",
      },
      roles: {
        en: [
          "Research Scientist",
          "Mathematician",
          "Economist",
          "Academic Researcher",
        ],
        zh: ["研究科学家", "数学家", "经济学家", "学术研究员"],
      },
    },
    {
      id: "software-and-systems",
      category: {
        en: "Software and Systems",
        zh: "软件与系统",
      },
      description: {
        en: "Technical environments can provide complex systems to analyse, design, and improve.",
        zh: "技术环境能够提供需要分析、设计与持续改进的复杂系统。",
      },
      roles: {
        en: [
          "Software Engineer",
          "Systems Architect",
          "Data Scientist",
          "Cybersecurity Analyst",
        ],
        zh: ["软件工程师", "系统架构师", "数据科学家", "网络安全分析师"],
      },
    },
    {
      id: "analysis-and-strategy",
      category: {
        en: "Analysis and Strategy",
        zh: "分析与战略",
      },
      description: {
        en: "Independent analytical roles can turn abstract reasoning into clearer decisions.",
        zh: "独立分析类岗位能够把抽象推理转化为更加清晰的决策。",
      },
      roles: {
        en: [
          "Policy Analyst",
          "Quantitative Analyst",
          "Operations Research Analyst",
          "Strategy Analyst",
        ],
        zh: ["政策分析师", "量化分析师", "运筹分析师", "战略分析师"],
      },
    },
    {
      id: "design-and-invention",
      category: {
        en: "Design and Invention",
        zh: "设计与发明",
      },
      description: {
        en: "Open-ended creation can combine conceptual depth with practical experimentation.",
        zh: "开放式创造能够把概念深度与实践试验结合起来。",
      },
      roles: {
        en: [
          "Product Designer",
          "Research Engineer",
          "Game Systems Designer",
          "Innovation Consultant",
        ],
        zh: ["产品设计师", "研究工程师", "游戏系统设计师", "创新顾问"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type can suggest preferred ways of working, but it should never be treated as a fixed limit on career choice or capability.",
    zh: "人格类型可以帮助理解偏好的工作方式，但不应被视为限制职业选择或个人能力的固定边界。",
  },

  premiumPreview: {
    headline: {
      en: "Turn your curiosity into focused, useful progress.",
      zh: "把你的好奇心转化为专注而有价值的进展。",
    },
    introduction: {
      en: "A deeper report will explore how your analytical independence influences work, decisions, relationships, and follow-through.",
      zh: "完整报告将进一步分析你的独立思考如何影响工作、决策、关系与持续执行。",
    },
    sections: [
      {
        id: "thinking-patterns",
        title: {
          en: "Thinking Patterns",
          zh: "思维模式",
        },
        description: {
          en: "How you build models, test assumptions, and refine explanations.",
          zh: "分析你如何建立模型、检验假设并不断完善解释。",
        },
        access: "premium",
      },
      {
        id: "decision-process",
        title: {
          en: "Decision Process",
          zh: "决策过程",
        },
        description: {
          en: "How to move from open exploration to a timely commitment.",
          zh: "理解如何从开放探索转向及时而明确的决定。",
        },
        access: "premium",
      },
      {
        id: "work-environment",
        title: {
          en: "Work Environment",
          zh: "工作环境",
        },
        description: {
          en: "Conditions that support autonomy, depth, and effective delivery.",
          zh: "分析哪些条件有助于保持自主、深度与有效交付。",
        },
        access: "premium",
      },
      {
        id: "communication-style",
        title: {
          en: "Communication Style",
          zh: "沟通风格",
        },
        description: {
          en: "Ways to translate complex reasoning into accessible conversation.",
          zh: "学习如何把复杂推理转化为他人容易理解的交流方式。",
        },
        access: "premium",
      },
      {
        id: "relationship-dynamics",
        title: {
          en: "Relationship Dynamics",
          zh: "关系互动模式",
        },
        description: {
          en: "How independence and internal processing shape connection.",
          zh: "分析独立性与内部思考方式如何影响人际连接。",
        },
        access: "premium",
      },
      {
        id: "stress-response",
        title: {
          en: "Stress Response",
          zh: "压力反应",
        },
        description: {
          en: "Patterns that may appear when uncertainty or demands accumulate.",
          zh: "识别在不确定性或任务压力累积时可能出现的行为模式。",
        },
        access: "premium",
      },
      {
        id: "execution-practice",
        title: {
          en: "Execution Practice",
          zh: "执行实践",
        },
        description: {
          en: "Methods for completing valuable work after discovery.",
          zh: "探索如何在发现和思考之后完成真正有价值的工作。",
        },
        access: "premium",
      },
      {
        id: "growth-roadmap",
        title: {
          en: "Growth Roadmap",
          zh: "成长路线图",
        },
        description: {
          en: "Practical experiments for balancing insight, action, and collaboration.",
          zh: "通过实践方法平衡洞察、行动与协作。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete INTP report",
      zh: "查看完整 INTP 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
