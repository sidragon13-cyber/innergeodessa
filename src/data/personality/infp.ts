import type { PersonalityProfile } from "./types";

export const infpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "INFP",

  identity: {
    name: {
      en: "Mediator",
      zh: "调停者型",
    },
    shortName: {
      en: "Values-Led Idealist",
      zh: "价值驱动的理想主义者",
    },
    tagline: {
      en: "Imaginative individualist · Gentle encourager · Meaningful creator",
      zh: "富有想象力的个体主义者 · 温和的鼓励者 · 意义创造者",
    },
    keywords: {
      en: [
        "Authenticity",
        "Imagination",
        "Compassion",
        "Meaning",
        "Individuality",
        "Openness",
      ],
      zh: ["真实", "想象力", "同理心", "意义", "个体性", "开放"],
    },
  },

  overview: {
    headline: {
      en: "You often evaluate choices by whether they feel authentic, humane, and connected to a meaningful possibility.",
      zh: "你常常依据一个选择是否真实、有人情味，并与有意义的可能性相连来作出判断。",
    },
    paragraphs: {
      en: [
        "INFPs tend to bring a rich inner world, personal values, and imaginative openness to people and projects.",
        "They may be especially attentive to individuality and untapped potential, preferring room to explore rather than rigidly prescribed methods.",
        "Their sensitivity can support original and compassionate work, while practical routines help translate inspiration into visible contribution.",
      ],
      zh: [
        "INFP 通常会把丰富的内在世界、个人价值观与开放的想象力带入人与项目之中。",
        "他们往往特别关注个体差异和尚未被发掘的潜力，相比严格规定的方法，更喜欢保留探索空间。",
        "敏感而细腻的特质有助于创造富有原创性和同理心的成果，而适当的日常结构则能帮助他们把灵感转化为看得见的贡献。",
      ],
    },
    summary: {
      en: "At your best, you protect what matters while creating possibilities that allow people and ideas to grow.",
      zh: "在最佳状态下，你既能守护真正重要的事物，也能创造让人与思想持续成长的可能性。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "authentic-values",
      title: {
        en: "Authentic Values",
        zh: "真实价值观",
      },
      description: {
        en: "Uses a personal ethical compass to assess choices, relationships, and commitments.",
        zh: "依据个人内在的道德标准评估选择、关系与承诺。",
      },
    },
    {
      id: "imaginative-openness",
      title: {
        en: "Imaginative Openness",
        zh: "开放的想象力",
      },
      description: {
        en: "Explores symbolic connections, alternative futures, and distinctive forms of expression.",
        zh: "喜欢探索象征性联系、不同的未来可能以及独特的表达方式。",
      },
    },
    {
      id: "individual-empathy",
      title: {
        en: "Individual Empathy",
        zh: "个体同理心",
      },
      description: {
        en: "Often notices the unique experience and potential of each person.",
        zh: "往往能够察觉每个人独特的经历与潜力。",
      },
    },
    {
      id: "flexible-exploration",
      title: {
        en: "Flexible Exploration",
        zh: "灵活探索",
      },
      description: {
        en: "Prefers adapting to emerging meaning rather than forcing an early fixed plan.",
        zh: "更愿意随着新的意义逐渐出现而调整，而不是过早强行确定固定计划。",
      },
    },
  ],

  strengths: [
    {
      id: "creative-expression",
      title: {
        en: "Creative Expression",
        zh: "创造性表达",
      },
      description: {
        en: "Communicates nuanced feelings and ideas through original language or design.",
        zh: "能够通过原创语言或设计表达细腻的情感与思想。",
      },
    },
    {
      id: "compassionate-listening",
      title: {
        en: "Compassionate Listening",
        zh: "富有同理心的倾听",
      },
      description: {
        en: "Makes room for another person's perspective without rushing to judgement.",
        zh: "能够为他人的观点保留空间，而不会急于作出判断。",
      },
    },
    {
      id: "values-clarity",
      title: {
        en: "Values Clarity",
        zh: "价值观清晰",
      },
      description: {
        en: "Recognises when a choice aligns with or compromises important principles.",
        zh: "能够识别一个选择是在维护还是妥协重要原则。",
      },
    },
    {
      id: "possibility-imagination",
      title: {
        en: "Possibility Imagination",
        zh: "可能性想象",
      },
      description: {
        en: "Sees potential paths beyond present limitations.",
        zh: "能够看到超越当前限制的潜在路径。",
      },
    },
    {
      id: "personal-encouragement",
      title: {
        en: "Personal Encouragement",
        zh: "个性化鼓励",
      },
      description: {
        en: "Supports others by recognising individuality and meaningful aspirations.",
        zh: "通过认可个体差异与有意义的愿望来支持他人。",
      },
    },
    {
      id: "adaptive-perspective",
      title: {
        en: "Adaptive Perspective",
        zh: "灵活视角",
      },
      description: {
        en: "Can reconsider assumptions and find a more humane interpretation.",
        zh: "能够重新审视假设，并找到更有人情味的解释。",
      },
    },
  ],

  growthRisks: [
    {
      id: "idealisation",
      title: {
        en: "Idealisation",
        zh: "理想化",
      },
      description: {
        en: "An imagined possibility may overshadow current evidence or practical constraints.",
        zh: "想象中的可能性可能掩盖当前证据或现实限制。",
      },
      growthAction: {
        en: "Name the desired ideal, then list the observable facts and smallest realistic next step.",
        zh: "先明确理想目标，再列出可观察的事实以及最小且现实的下一步。",
      },
    },
    {
      id: "difficult-conversation-delay",
      title: {
        en: "Delayed Difficult Conversations",
        zh: "推迟困难对话",
      },
      description: {
        en: "Concern about hurt or misunderstanding may postpone necessary clarity.",
        zh: "担心伤害或误解，可能使必要的澄清被推迟。",
      },
      growthAction: {
        en: "Prepare one respectful statement of the issue and one specific request.",
        zh: "准备一句尊重而清晰的问题陈述，以及一个具体请求。",
      },
    },
    {
      id: "inconsistent-structure",
      title: {
        en: "Inconsistent Structure",
        zh: "结构不稳定",
      },
      description: {
        en: "Flexible working preferences may make routine follow-through uneven.",
        zh: "灵活的工作偏好可能导致日常执行缺乏稳定性。",
      },
      growthAction: {
        en: "Choose a light recurring schedule for the few actions that protect the larger purpose.",
        zh: "为少数能够保护整体目标的关键行动建立轻量且固定的节奏。",
      },
    },
    {
      id: "personalising-feedback",
      title: {
        en: "Personalising Feedback",
        zh: "把反馈个人化",
      },
      description: {
        en: "Criticism of an outcome may feel like rejection of identity or values.",
        zh: "对成果的批评，可能被感受为对自我身份或价值观的否定。",
      },
      growthAction: {
        en: "Separate the work, the method, and personal worth before deciding what feedback is useful.",
        zh: "在判断反馈是否有用之前，先区分工作成果、方法与个人价值。",
      },
    },
    {
      id: "too-many-possibilities",
      title: {
        en: "Too Many Possibilities",
        zh: "可能性过多",
      },
      description: {
        en: "Multiple meaningful directions may make commitment difficult.",
        zh: "多个有意义的方向可能让承诺和选择变得困难。",
      },
      growthAction: {
        en: "Select the option that best serves current values and capacity for a defined trial period.",
        zh: "在明确的试行周期内，选择最符合当前价值观与能力的方向。",
      },
    },
    {
      id: "quiet-burnout",
      title: {
        en: "Quiet Burnout",
        zh: "隐性耗竭",
      },
      description: {
        en: "Emotional investment may continue after energy has become depleted.",
        zh: "即使精力已经耗尽，情感投入仍可能继续。",
      },
      growthAction: {
        en: "Track energy alongside obligations and communicate limits before withdrawing.",
        zh: "在记录责任的同时关注精力状态，并在退缩之前主动表达边界。",
      },
    },
  ],

  careerGroups: [
    {
      id: "writing-and-arts",
      category: {
        en: "Writing and Arts",
        zh: "写作与艺术",
      },
      description: {
        en: "Creative work can provide space for meaning, imagination, and individual voice.",
        zh: "创造性工作能够为意义、想象力与个人表达提供空间。",
      },
      roles: {
        en: ["Writer", "Illustrator", "Film Editor", "Creative Producer"],
        zh: ["作家", "插画师", "影视剪辑师", "创意制片人"],
      },
    },
    {
      id: "counselling-and-support",
      category: {
        en: "Counselling and Support",
        zh: "咨询与支持",
      },
      description: {
        en: "One-to-one development work can reward empathy and respect for individual paths.",
        zh: "一对一成长支持工作能够充分发挥同理心以及对个体路径的尊重。",
      },
      roles: {
        en: [
          "Counsellor",
          "Career Adviser",
          "Youth Worker",
          "Student Support Specialist",
        ],
        zh: ["咨询师", "职业顾问", "青少年工作者", "学生支持专员"],
      },
    },
    {
      id: "mission-led-communication",
      category: {
        en: "Mission-Led Communication",
        zh: "使命驱动型传播",
      },
      description: {
        en: "Values-based organisations need stories that connect people with purpose.",
        zh: "价值观驱动的组织需要能够把人与使命连接起来的故事。",
      },
      roles: {
        en: [
          "Nonprofit Communications Manager",
          "Content Designer",
          "Editorial Strategist",
          "Advocacy Campaigner",
        ],
        zh: ["非营利传播经理", "内容设计师", "编辑战略师", "倡议活动策划者"],
      },
    },
    {
      id: "human-centred-design",
      category: {
        en: "Human-Centred Design",
        zh: "以人为本的设计",
      },
      description: {
        en: "Research and design can turn empathy into more thoughtful experiences.",
        zh: "研究与设计能够把同理心转化为更周到的体验。",
      },
      roles: {
        en: [
          "UX Researcher",
          "Service Designer",
          "Learning Experience Designer",
          "Community Designer",
        ],
        zh: ["用户体验研究员", "服务设计师", "学习体验设计师", "社区设计师"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type can illuminate preferences and values, but it is not a fixed boundary on career options, competence, or growth.",
    zh: "人格类型可以帮助理解偏好与价值观，但不应被视为限制职业选择、能力或成长的固定边界。",
  },

  premiumPreview: {
    headline: {
      en: "Bring your inner values into practical, sustainable expression.",
      zh: "把你的内在价值转化为现实而可持续的表达。",
    },
    introduction: {
      en: "A deeper report will explore authenticity, creativity, relationships, decisions, work fit, and follow-through.",
      zh: "完整报告将进一步分析真实自我、创造力、人际关系、决策、工作适配与持续执行。",
    },
    sections: [
      {
        id: "values-map",
        title: {
          en: "Values Map",
          zh: "价值观地图",
        },
        description: {
          en: "How personal meaning guides attention and choice.",
          zh: "分析个人意义如何引导注意力与选择。",
        },
        access: "premium",
      },
      {
        id: "creative-process",
        title: {
          en: "Creative Process",
          zh: "创造过程",
        },
        description: {
          en: "Conditions that help imagination become completed work.",
          zh: "分析哪些条件能够帮助想象力转化为完成的作品。",
        },
        access: "premium",
      },
      {
        id: "decision-clarity",
        title: {
          en: "Decision Clarity",
          zh: "决策清晰度",
        },
        description: {
          en: "Choosing among meaningful possibilities without losing flexibility.",
          zh: "在不失去灵活性的前提下，从多个有意义的可能性中作出选择。",
        },
        access: "premium",
      },
      {
        id: "relationship-needs",
        title: {
          en: "Relationship Needs",
          zh: "关系需要",
        },
        description: {
          en: "How authenticity, space, and emotional safety shape connection.",
          zh: "分析真实感、个人空间与情绪安全如何塑造关系。",
        },
        access: "premium",
      },
      {
        id: "constructive-conflict",
        title: {
          en: "Constructive Conflict",
          zh: "建设性冲突",
        },
        description: {
          en: "Expressing disagreement while preserving respect.",
          zh: "学习如何在保留尊重的同时表达分歧。",
        },
        access: "premium",
      },
      {
        id: "career-alignment",
        title: {
          en: "Career Alignment",
          zh: "职业契合度",
        },
        description: {
          en: "Work settings that support meaning and individual contribution.",
          zh: "分析哪些工作环境能够支持意义感与个人贡献。",
        },
        access: "premium",
      },
      {
        id: "stress-signals",
        title: {
          en: "Stress Signals",
          zh: "压力信号",
        },
        description: {
          en: "Recognising idealisation, withdrawal, and depleted energy.",
          zh: "识别理想化、退缩与精力耗竭的信号。",
        },
        access: "premium",
      },
      {
        id: "practical-growth",
        title: {
          en: "Practical Growth",
          zh: "实践性成长",
        },
        description: {
          en: "Small structures that protect creativity and completion.",
          zh: "建立能够保护创造力并促进完成的轻量结构。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete INFP report",
      zh: "查看完整 INFP 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
