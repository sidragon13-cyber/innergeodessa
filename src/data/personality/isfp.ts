import type { PersonalityProfile } from "./types";

export const isfpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ISFP",

  identity: {
    name: {
      en: "Adventurer",
      zh: "探险家型",
    },
    shortName: {
      en: "Sensitive Creator",
      zh: "敏感型创造者",
    },
    tagline: {
      en: "Quiet individualist · Aesthetic observer · Flexible craftsperson",
      zh: "安静的个体主义者 · 审美观察者 · 灵活的实践创作者",
    },
    keywords: {
      en: [
        "Authenticity",
        "Sensitivity",
        "Beauty",
        "Flexibility",
        "Presence",
        "Craft",
      ],
      zh: [
        "真实",
        "敏感",
        "美感",
        "灵活",
        "当下感",
        "技艺",
      ],
    },
  },

  overview: {
    headline: {
      en: "You often respond to life through direct experience, personal values, and an attentive sense of what feels genuine.",
      zh: "你常常通过直接体验、个人价值观，以及对真实感受的细致觉察来回应生活。",
    },
    paragraphs: {
      en: [
        "ISFPs tend to notice sensory detail, individual feeling, and opportunities to create a more considerate or beautiful immediate experience.",
        "They may prefer freedom to work in their own way, expressing care through actions, craft, and respectful presence rather than formal direction.",
        "Their adaptability supports responsive creativity, while clearer planning and self-advocacy help personal values gain lasting practical expression.",
      ],
      zh: [
        "ISFP 通常能够察觉感官细节、个人感受，以及让当下体验变得更体贴或更美好的机会。",
        "他们往往偏好按照自己的方式自由工作，并通过行动、技艺和尊重他人的陪伴来表达关心，而不是依赖正式指令。",
        "他们的适应力有助于形成灵活而及时的创造力，而更清晰的规划和自我表达，则能帮助个人价值获得持久而现实的呈现。",
      ],
    },
    summary: {
      en: "At your best, you bring authenticity, sensitivity, and skilled attention to the people and experiences directly around you.",
      zh: "在最佳状态下，你能够把真实、敏感与熟练的关注带给身边的人和正在经历的事物。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "personal-authenticity",
      title: {
        en: "Personal Authenticity",
        zh: "个人真实感",
      },
      description: {
        en: "Evaluates choices through an individual sense of integrity and emotional truth.",
        zh: "依据个人的原则感与情感真实性评估选择。",
      },
    },
    {
      id: "sensory-awareness",
      title: {
        en: "Sensory Awareness",
        zh: "感官觉察",
      },
      description: {
        en: "Notices atmosphere, form, comfort, and subtle changes in the immediate environment.",
        zh: "能够察觉当下环境中的氛围、形式、舒适度与细微变化。",
      },
    },
    {
      id: "gentle-adaptability",
      title: {
        en: "Gentle Adaptability",
        zh: "温和适应力",
      },
      description: {
        en: "Responds flexibly without imposing a single method on others.",
        zh: "能够灵活回应变化，而不会把单一方法强加给他人。",
      },
    },
    {
      id: "practical-expression",
      title: {
        en: "Practical Expression",
        zh: "实践表达",
      },
      description: {
        en: "Often communicates values through tangible choices, care, or creative work.",
        zh: "经常通过具体选择、关怀行动或创造性工作表达价值观。",
      },
    },
  ],

  strengths: [
    {
      id: "aesthetic-judgement",
      title: {
        en: "Aesthetic Judgement",
        zh: "审美判断",
      },
      description: {
        en: "Recognises visual, sensory, and experiential qualities that shape impact.",
        zh: "能够识别影响整体效果的视觉、感官与体验品质。",
      },
    },
    {
      id: "respectful-presence",
      title: {
        en: "Respectful Presence",
        zh: "尊重式陪伴",
      },
      description: {
        en: "Allows people space to be themselves without unnecessary judgement.",
        zh: "能够给他人保留做自己的空间，而不会进行不必要的评判。",
      },
    },
    {
      id: "hands-on-creativity",
      title: {
        en: "Hands-On Creativity",
        zh: "实践型创造力",
      },
      description: {
        en: "Turns feeling and observation into tangible design, craft, or service.",
        zh: "能够把感受与观察转化为具体设计、工艺或服务。",
      },
    },
    {
      id: "situational-care",
      title: {
        en: "Situational Care",
        zh: "情境关怀",
      },
      description: {
        en: "Notices what would make the present experience more comfortable or humane.",
        zh: "能够察觉什么会让当前体验更加舒适或更有人情味。",
      },
    },
    {
      id: "flexible-response",
      title: {
        en: "Flexible Response",
        zh: "灵活回应",
      },
      description: {
        en: "Adjusts readily when conditions or individual needs change.",
        zh: "当环境或个人需要发生变化时，能够及时调整。",
      },
    },
    {
      id: "values-consistency",
      title: {
        en: "Values Consistency",
        zh: "价值观一致性",
      },
      description: {
        en: "Protects personal principles even without public recognition.",
        zh: "即使没有公开认可，也会坚持保护个人原则。",
      },
    },
  ],

  growthRisks: [
    {
      id: "self-advocacy-delay",
      title: {
        en: "Delayed Self-Advocacy",
        zh: "延迟表达自身需要",
      },
      description: {
        en: "Personal needs may remain private until frustration or withdrawal appears.",
        zh: "个人需要可能一直没有表达，直到挫败或退缩开始出现。",
      },
      growthAction: {
        en: "State a preference or limit while the situation is still manageable.",
        zh: "在情况仍然可控时，尽早表达一个具体偏好或边界。",
      },
    },
    {
      id: "future-underplanning",
      title: {
        en: "Underplanning the Future",
        zh: "未来规划不足",
      },
      description: {
        en: "Attention to present experience may leave future obligations unclear.",
        zh: "对当下体验的关注，可能让未来责任与安排缺乏清晰度。",
      },
      growthAction: {
        en: "Set one monthly planning session for deadlines, resources, and desired direction.",
        zh: "每月安排一次规划时间，检查期限、资源与期望方向。",
      },
    },
    {
      id: "criticism-sensitivity",
      title: {
        en: "Sensitivity to Criticism",
        zh: "对批评敏感",
      },
      description: {
        en: "Direct feedback may feel like rejection of personal expression.",
        zh: "直接反馈可能被感受为对个人表达的否定。",
      },
      growthAction: {
        en: "Ask which observable part of the work needs adjustment and retain ownership of the wider creative identity.",
        zh: "询问工作中哪一个可观察部分需要调整，同时保留对整体创造身份的自主判断。",
      },
    },
    {
      id: "conflict-withdrawal",
      title: {
        en: "Conflict Withdrawal",
        zh: "冲突中的退缩",
      },
      description: {
        en: "Tension may lead to disengagement before the issue is understood.",
        zh: "紧张情绪可能让你在问题尚未被理解之前就退出互动。",
      },
      growthAction: {
        en: "Request a pause, then return with one clear observation and need.",
        zh: "先请求暂停，再带着一个清晰观察和一个具体需要重新进入对话。",
      },
    },
    {
      id: "structure-avoidance",
      title: {
        en: "Structure Avoidance",
        zh: "回避结构",
      },
      description: {
        en: "Rules may be resisted even when a light structure would protect valued work.",
        zh: "即使轻量结构能够保护重要工作，也可能本能地抗拒规则。",
      },
      growthAction: {
        en: "Choose the minimum routine needed to preserve freedom and completion.",
        zh: "只建立维持自由与完成度所必需的最小日常结构。",
      },
    },
    {
      id: "impulsive-relief",
      title: {
        en: "Impulsive Relief",
        zh: "冲动寻求缓解",
      },
      description: {
        en: "Immediate comfort or novelty may temporarily replace a difficult priority.",
        zh: "即时舒适或新鲜感，可能暂时取代真正困难但重要的任务。",
      },
      growthAction: {
        en: "Complete a short defined step before choosing the rewarding alternative.",
        zh: "在选择更有吸引力的替代活动前，先完成一个明确而短小的步骤。",
      },
    },
  ],

  careerGroups: [
    {
      id: "visual-and-spatial-design",
      category: {
        en: "Visual and Spatial Design",
        zh: "视觉与空间设计",
      },
      description: {
        en: "Design work can combine sensory awareness, personal expression, and tangible outcomes.",
        zh: "设计工作能够把感官觉察、个人表达与具体成果结合起来。",
      },
      roles: {
        en: [
          "Graphic Designer",
          "Interior Designer",
          "Photographer",
          "Fashion Designer",
        ],
        zh: [
          "平面设计师",
          "室内设计师",
          "摄影师",
          "时装设计师",
        ],
      },
    },
    {
      id: "health-and-wellness",
      category: {
        en: "Health and Wellness",
        zh: "健康与身心照护",
      },
      description: {
        en: "Hands-on care can reward observation, respect, and responsiveness to individual needs.",
        zh: "实践型照护工作能够发挥观察力、尊重态度与对个人需要的及时回应。",
      },
      roles: {
        en: [
          "Occupational Therapist",
          "Massage Therapist",
          "Veterinary Technician",
          "Wellness Practitioner",
        ],
        zh: [
          "职业治疗师",
          "按摩治疗师",
          "兽医技术员",
          "身心健康从业者",
        ],
      },
    },
    {
      id: "craft-and-production",
      category: {
        en: "Craft and Production",
        zh: "工艺与制作",
      },
      description: {
        en: "Skilled making offers direct engagement with materials, detail, and quality.",
        zh: "专业制作工作能够直接接触材料、细节与质量控制。",
      },
      roles: {
        en: [
          "Artisan",
          "Culinary Specialist",
          "Set Designer",
          "Product Stylist",
        ],
        zh: [
          "手工艺人",
          "烹饪专家",
          "布景设计师",
          "产品造型师",
        ],
      },
    },
    {
      id: "environment-and-experience",
      category: {
        en: "Environment and Experience",
        zh: "环境与体验",
      },
      description: {
        en: "Experience-focused roles can improve how people encounter places, products, or nature.",
        zh: "以体验为核心的岗位能够改善人们接触空间、产品或自然环境的方式。",
      },
      roles: {
        en: [
          "Landscape Designer",
          "Museum Experience Assistant",
          "Travel Experience Designer",
          "Conservation Field Officer",
        ],
        zh: [
          "景观设计师",
          "博物馆体验助理",
          "旅行体验设计师",
          "自然保护现场专员",
        ],
      },
    },
  ],

  careerNotice: {
    en: "Personality type may suggest preferred forms of expression and work, but it does not define or restrict your career possibilities.",
    zh: "人格类型可以帮助识别偏好的表达与工作方式，但不会定义或限制你的职业可能性。",
  },

  premiumPreview: {
    headline: {
      en: "Give your values a visible form without losing flexibility.",
      zh: "在不失去灵活性的前提下，让你的价值观获得清晰可见的形式。",
    },
    introduction: {
      en: "A deeper report will explore creativity, boundaries, decisions, relationships, work fit, and sustainable structure.",
      zh: "完整报告将进一步分析创造力、边界、决策、人际关系、工作适配与可持续结构。",
    },
    sections: [
      {
        id: "authentic-expression",
        title: {
          en: "Authentic Expression",
          zh: "真实表达",
        },
        description: {
          en: "How personal values become tangible choices and work.",
          zh: "分析个人价值如何转化为具体选择与实际工作。",
        },
        access: "premium",
      },
      {
        id: "sensory-strengths",
        title: {
          en: "Sensory Strengths",
          zh: "感官优势",
        },
        description: {
          en: "Using observation, atmosphere, and detail intentionally.",
          zh: "有意识地运用观察、氛围与细节。",
        },
        access: "premium",
      },
      {
        id: "self-advocacy",
        title: {
          en: "Self-Advocacy",
          zh: "自我表达与维护",
        },
        description: {
          en: "Expressing needs before withdrawal or frustration.",
          zh: "在退缩或挫败之前表达需要。",
        },
        access: "premium",
      },
      {
        id: "planning-lightly",
        title: {
          en: "Planning Lightly",
          zh: "轻量规划",
        },
        description: {
          en: "Creating enough structure to protect freedom and completion.",
          zh: "建立足够结构，以保护自由与完成度。",
        },
        access: "premium",
      },
      {
        id: "relationship-space",
        title: {
          en: "Relationship Space",
          zh: "关系空间",
        },
        description: {
          en: "Balancing closeness, independence, and honest communication.",
          zh: "平衡亲密、独立与真实沟通。",
        },
        access: "premium",
      },
      {
        id: "career-craft",
        title: {
          en: "Career Craft",
          zh: "职业技艺",
        },
        description: {
          en: "Environments that value skill, autonomy, and human experience.",
          zh: "分析哪些环境重视技能、自主性与人的真实体验。",
        },
        access: "premium",
      },
      {
        id: "stress-responses",
        title: {
          en: "Stress Responses",
          zh: "压力反应",
        },
        description: {
          en: "Recognising avoidance, sensitivity, and impulsive relief.",
          zh: "识别回避、敏感与冲动寻求缓解的模式。",
        },
        access: "premium",
      },
      {
        id: "creative-growth",
        title: {
          en: "Creative Growth",
          zh: "创造性成长",
        },
        description: {
          en: "A practical path from private values to sustained contribution.",
          zh: "从个人价值走向持续贡献的实践路径。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ISFP report",
      zh: "查看完整 ISFP 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
