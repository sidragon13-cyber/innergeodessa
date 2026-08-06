import type { PersonalityProfile } from "./types";

export const infjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "INFJ",

  identity: {
    name: {
      en: "Advocate",
      zh: "提倡者型",
    },
    shortName: {
      en: "Insightful Guide",
      zh: "洞察型引导者",
    },
    tagline: {
      en: "Purpose seeker · Quiet visionary · Compassionate organiser",
      zh: "使命探索者 · 安静的远见者 · 富有同理心的组织者",
    },
    keywords: {
      en: ["Insight", "Purpose", "Empathy", "Integrity", "Vision", "Depth"],
      zh: ["洞察", "使命", "同理心", "正直", "远见", "深度"],
    },
  },

  overview: {
    headline: {
      en: "You often look beneath visible behaviour for the meaning, needs, and future direction within it.",
      zh: "你常常透过表面的行为，寻找其中隐藏的意义、需要与未来方向。",
    },
    paragraphs: {
      en: [
        "INFJs tend to combine pattern-based insight with a strong concern for human development and meaningful contribution.",
        "They may prefer depth over breadth in relationships and projects, investing carefully where values and long-term purpose feel aligned.",
        "Their quiet determination can support thoughtful change, while realistic boundaries help protect energy and prevent idealism from becoming overextension.",
      ],
      zh: [
        "INFJ 通常把对模式的洞察，与对人的成长和有意义贡献的高度关注结合起来。",
        "在人际关系和项目中，他们往往更重视深度而不是广度，并会谨慎投入到符合自身价值观与长期使命的方向。",
        "安静而坚定的意志能够推动深思熟虑的改变，而现实的边界则有助于保护精力，避免理想主义演变为过度投入。",
      ],
    },
    summary: {
      en: "At your best, you translate a humane long-range vision into patient, principled action.",
      zh: "在最佳状态下，你能够把以人为本的长期愿景转化为耐心、坚定且有原则的行动。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "human-pattern-insight",
      title: {
        en: "Human Pattern Insight",
        zh: "人性模式洞察",
      },
      description: {
        en: "Notices subtle motives, themes, and developmental possibilities in people and situations.",
        zh: "能够察觉人与情境中细微的动机、主题以及潜在的发展可能。",
      },
    },
    {
      id: "values-led-vision",
      title: {
        en: "Values-Led Vision",
        zh: "价值观驱动的愿景",
      },
      description: {
        en: "Connects future possibilities with a clear internal sense of meaning and integrity.",
        zh: "能够把未来可能性与内在清晰的意义感和原则感连接起来。",
      },
    },
    {
      id: "depth-of-connection",
      title: {
        en: "Depth of Connection",
        zh: "深度连接",
      },
      description: {
        en: "Often prefers sincere, focused relationships to frequent surface-level interaction.",
        zh: "相比频繁而表面的互动，更偏好真诚、专注且具有深度的关系。",
      },
    },
    {
      id: "quiet-organisation",
      title: {
        en: "Quiet Organisation",
        zh: "安静的组织力",
      },
      description: {
        en: "Brings structure and persistence to goals that carry personal or social significance.",
        zh: "能够为具有个人或社会意义的目标带来结构、秩序与持续投入。",
      },
    },
  ],

  strengths: [
    {
      id: "empathetic-understanding",
      title: {
        en: "Empathetic Understanding",
        zh: "同理性理解",
      },
      description: {
        en: "Listens for both expressed concerns and the needs beneath them.",
        zh: "既能倾听对方表达出的关切，也能察觉其背后未被直接说出的需要。",
      },
    },
    {
      id: "long-range-guidance",
      title: {
        en: "Long-Range Guidance",
        zh: "长期引导",
      },
      description: {
        en: "Sees how present choices may shape people and systems over time.",
        zh: "能够看到当下的选择如何在长期中影响个人与系统。",
      },
    },
    {
      id: "purposeful-communication",
      title: {
        en: "Purposeful Communication",
        zh: "有目的的沟通",
      },
      description: {
        en: "Can express complex human themes with clarity and care.",
        zh: "能够以清晰而体贴的方式表达复杂的人性主题。",
      },
    },
    {
      id: "integrative-thinking",
      title: {
        en: "Integrative Thinking",
        zh: "整合性思维",
      },
      description: {
        en: "Combines emotional, ethical, and strategic information into a coherent view.",
        zh: "能够把情绪、伦理与战略信息整合成一致而完整的判断。",
      },
    },
    {
      id: "developmental-support",
      title: {
        en: "Developmental Support",
        zh: "成长支持",
      },
      description: {
        en: "Encourages growth by recognising potential and offering considered guidance.",
        zh: "通过识别他人的潜力并提供经过思考的建议，支持其持续成长。",
      },
    },
    {
      id: "principled-persistence",
      title: {
        en: "Principled Persistence",
        zh: "有原则的坚持",
      },
      description: {
        en: "Sustains effort when a goal is strongly connected to values.",
        zh: "当目标与自身价值观紧密相连时，能够长期保持投入。",
      },
    },
  ],

  growthRisks: [
    {
      id: "idealistic-overreach",
      title: {
        en: "Idealistic Overreach",
        zh: "理想主义过度扩张",
      },
      description: {
        en: "A meaningful vision may create expectations that exceed current resources.",
        zh: "具有意义的愿景可能带来超出当前资源承受能力的期望。",
      },
      growthAction: {
        en: "Translate the vision into one measurable next stage and review capacity before expanding it.",
        zh: "把愿景转化为一个可衡量的下一阶段，并在扩大投入前重新评估能力与资源。",
      },
    },
    {
      id: "absorbing-others-needs",
      title: {
        en: "Absorbing Others' Needs",
        zh: "过度吸收他人的需要",
      },
      description: {
        en: "Strong empathy may make it difficult to separate another person's distress from personal responsibility.",
        zh: "强烈的同理心可能使你难以区分他人的痛苦与自己的责任。",
      },
      growthAction: {
        en: "Offer support with explicit limits and distinguish care from ownership of the outcome.",
        zh: "在提供支持时设定明确边界，并区分关心对方与承担对方结果之间的差别。",
      },
    },
    {
      id: "conflict-avoidance",
      title: {
        en: "Conflict Avoidance",
        zh: "回避冲突",
      },
      description: {
        en: "Concern for harmony may delay a necessary direct conversation.",
        zh: "对和谐关系的重视，可能使必要的直接沟通被推迟。",
      },
      growthAction: {
        en: "State the issue early using observations, impact, and a constructive request.",
        zh: "尽早通过客观观察、实际影响和建设性请求来表达问题。",
      },
    },
    {
      id: "private-overprocessing",
      title: {
        en: "Private Overprocessing",
        zh: "过度内部消化",
      },
      description: {
        en: "Important concerns may be refined internally for too long before being shared.",
        zh: "重要的关切可能在内部反复思考过久，迟迟没有与他人分享。",
      },
      growthAction: {
        en: "Invite a trusted person into the thinking process before the conclusion feels complete.",
        zh: "在结论完全形成之前，就邀请可信任的人参与思考过程。",
      },
    },
    {
      id: "perfectionistic-purpose",
      title: {
        en: "Perfectionistic Purpose",
        zh: "使命感中的完美主义",
      },
      description: {
        en: "Work tied to identity or values may become difficult to release.",
        zh: "当工作与身份认同或价值观紧密相连时，可能很难适时结束或放手。",
      },
      growthAction: {
        en: "Define what responsible completion looks like before beginning the final refinement.",
        zh: "在进入最后完善阶段之前，先明确什么样的结果已经算是负责任地完成。",
      },
    },
    {
      id: "energy-depletion",
      title: {
        en: "Energy Depletion",
        zh: "精力耗竭",
      },
      description: {
        en: "Sustained emotional and purposeful investment may quietly exhaust available energy.",
        zh: "长期的情感投入和使命驱动，可能在不知不觉中耗尽精力。",
      },
      growthAction: {
        en: "Schedule solitude, ordinary pleasure, and recovery before fatigue becomes withdrawal.",
        zh: "在疲惫演变为退缩之前，主动安排独处、日常愉悦与恢复时间。",
      },
    },
  ],

  careerGroups: [
    {
      id: "counselling-and-development",
      category: {
        en: "Counselling and Development",
        zh: "咨询与发展",
      },
      description: {
        en: "Development-focused work can use careful listening, insight, and sustained support.",
        zh: "以成长为导向的工作能够发挥细致倾听、深入洞察与长期支持能力。",
      },
      roles: {
        en: [
          "Counsellor",
          "Career Coach",
          "Learning and Development Specialist",
          "Organisational Psychologist",
        ],
        zh: ["咨询师", "职业教练", "学习与发展专家", "组织心理学家"],
      },
    },
    {
      id: "writing-and-communication",
      category: {
        en: "Writing and Communication",
        zh: "写作与传播",
      },
      description: {
        en: "Reflective communication can translate complex experience into useful meaning.",
        zh: "具有反思性的表达，能够把复杂经历转化为有价值的意义。",
      },
      roles: {
        en: ["Writer", "Editor", "Documentary Producer", "Content Strategist"],
        zh: ["作家", "编辑", "纪录片制片人", "内容战略师"],
      },
    },
    {
      id: "social-impact",
      category: {
        en: "Social Impact",
        zh: "社会影响",
      },
      description: {
        en: "Mission-led organisations may align long-term systems work with human values.",
        zh: "使命驱动型组织能够把长期系统建设与人本价值结合起来。",
      },
      roles: {
        en: [
          "Nonprofit Programme Director",
          "Social Researcher",
          "Policy Adviser",
          "Community Development Lead",
        ],
        zh: ["非营利项目总监", "社会研究员", "政策顾问", "社区发展负责人"],
      },
    },
    {
      id: "people-and-culture",
      category: {
        en: "People and Culture",
        zh: "人才与组织文化",
      },
      description: {
        en: "Culture work can combine individual development with organisational direction.",
        zh: "组织文化工作能够把个人发展与组织方向结合起来。",
      },
      roles: {
        en: [
          "People Experience Lead",
          "Culture Consultant",
          "Mediator",
          "Talent Development Manager",
        ],
        zh: ["员工体验负责人", "组织文化顾问", "调解员", "人才发展经理"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type may clarify preferred contributions, but it does not determine your career potential or restrict future development.",
    zh: "人格类型可以帮助理解你偏好的贡献方式，但不会决定你的职业潜力，也不应限制未来发展。",
  },

  premiumPreview: {
    headline: {
      en: "Protect your depth while expanding your impact.",
      zh: "在扩大影响力的同时保护你的内在深度。",
    },
    introduction: {
      en: "A deeper report will explore vision, empathy, boundaries, communication, work fit, and sustainable growth.",
      zh: "完整报告将进一步分析你的愿景、同理心、边界、沟通方式、工作适配与可持续成长。",
    },
    sections: [
      {
        id: "inner-vision",
        title: {
          en: "Inner Vision",
          zh: "内在愿景",
        },
        description: {
          en: "How meaning and pattern recognition shape your direction.",
          zh: "分析意义感与模式识别如何塑造你的方向。",
        },
        access: "premium",
      },
      {
        id: "empathy-boundaries",
        title: {
          en: "Empathy and Boundaries",
          zh: "同理心与边界",
        },
        description: {
          en: "Supporting others without losing personal capacity.",
          zh: "学习如何在支持他人的同时保护自己的精力与能力。",
        },
        access: "premium",
      },
      {
        id: "communication-depth",
        title: {
          en: "Communication Depth",
          zh: "沟通深度",
        },
        description: {
          en: "Turning private insight into timely, useful dialogue.",
          zh: "把内在洞察转化为及时而有价值的对话。",
        },
        access: "premium",
      },
      {
        id: "purposeful-work",
        title: {
          en: "Purposeful Work",
          zh: "有使命感的工作",
        },
        description: {
          en: "Environments that connect contribution with integrity.",
          zh: "分析哪些环境能够把实际贡献与个人原则结合起来。",
        },
        access: "premium",
      },
      {
        id: "relationship-patterns",
        title: {
          en: "Relationship Patterns",
          zh: "关系模式",
        },
        description: {
          en: "How trust, depth, and expectations influence connection.",
          zh: "分析信任、关系深度与期待如何影响人际连接。",
        },
        access: "premium",
      },
      {
        id: "conflict-practice",
        title: {
          en: "Conflict Practice",
          zh: "冲突处理实践",
        },
        description: {
          en: "Approaching disagreement without abandoning values or harmony.",
          zh: "学习如何在不放弃价值观与关系和谐的前提下处理分歧。",
        },
        access: "premium",
      },
      {
        id: "stress-and-recovery",
        title: {
          en: "Stress and Recovery",
          zh: "压力与恢复",
        },
        description: {
          en: "Recognising overload, withdrawal, and restorative needs.",
          zh: "识别过度负荷、退缩反应与恢复需要。",
        },
        access: "premium",
      },
      {
        id: "impact-roadmap",
        title: {
          en: "Impact Roadmap",
          zh: "影响力路线图",
        },
        description: {
          en: "A paced plan for translating purpose into sustainable action.",
          zh: "以适当节奏把使命转化为可持续行动的计划。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete INFJ report",
      zh: "查看完整 INFJ 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
