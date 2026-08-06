import type { PersonalityProfile } from "./types";

export const esfpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ESFP",

  identity: {
    name: {
      en: "Entertainer",
      zh: "表演者型",
    },
    shortName: {
      en: "Expressive Experience Maker",
      zh: "表达型体验创造者",
    },
    tagline: {
      en: "Warm performer · Practical encourager · Spontaneous connector",
      zh: "温暖的表现者 · 务实的鼓励者 · 自然的连接者",
    },
    keywords: {
      en: [
        "Energy",
        "Warmth",
        "Experience",
        "Expression",
        "Adaptability",
        "Enjoyment",
      ],
      zh: ["活力", "温暖", "体验", "表达", "适应力", "愉悦"],
    },
  },

  overview: {
    headline: {
      en: "You often make the present more engaging by responding warmly to people and bringing visible energy to shared experience.",
      zh: "你常常通过热情回应他人，并为共同体验注入鲜明活力，让当下变得更有吸引力。",
    },
    paragraphs: {
      en: [
        "ESFPs tend to notice what is happening around them and respond with openness, expressiveness, and practical attention to individual enjoyment or comfort.",
        "They may thrive where they can interact, improvise, and create an immediate positive effect rather than work at a distance from the outcome.",
        "Their vitality can strengthen connection and morale, while planning and boundaries help generous spontaneity support longer-term priorities.",
      ],
      zh: [
        "ESFP 通常能够迅速察觉周围正在发生的事情，并以开放、富有表现力的方式回应，同时关注个人当下的愉悦与舒适。",
        "他们往往适合能够直接互动、临场应变并立即产生积极影响的环境，而不是与成果保持较远距离的工作方式。",
        "他们的活力能够增强连接与士气，而适当的规划和边界，则能帮助慷慨而自然的行动支持更长期的优先事项。",
      ],
    },
    summary: {
      en: "At your best, you combine human warmth with present-moment awareness to create experiences that feel alive and inclusive.",
      zh: "在最佳状态下，你能够把人际温暖与对当下的敏锐觉察结合起来，创造充满活力和包容感的体验。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "expressive-presence",
      title: {
        en: "Expressive Presence",
        zh: "富有表现力的存在感",
      },
      description: {
        en: "Engages visibly with people and brings emotion and energy into the moment.",
        zh: "能够积极而鲜明地与他人互动，并为当下带来情感与活力。",
      },
    },
    {
      id: "practical-empathy",
      title: {
        en: "Practical Empathy",
        zh: "务实同理心",
      },
      description: {
        en: "Notices immediate personal needs and responds in a tangible way.",
        zh: "能够察觉他人的即时需要，并通过具体行动作出回应。",
      },
    },
    {
      id: "sensory-engagement",
      title: {
        en: "Sensory Engagement",
        zh: "感官投入",
      },
      description: {
        en: "Pays attention to atmosphere, appearance, movement, and enjoyment.",
        zh: "关注氛围、外观、动态变化与实际体验。",
      },
    },
    {
      id: "spontaneous-flexibility",
      title: {
        en: "Spontaneous Flexibility",
        zh: "自然灵活性",
      },
      description: {
        en: "Adjusts plans readily to match current people and circumstances.",
        zh: "能够根据当下的人与环境迅速调整计划。",
      },
    },
  ],

  strengths: [
    {
      id: "audience-connection",
      title: {
        en: "Audience Connection",
        zh: "受众连接",
      },
      description: {
        en: "Reads immediate reactions and adapts to keep people engaged.",
        zh: "能够察觉即时反应，并调整方式以保持他人的参与感。",
      },
    },
    {
      id: "morale-building",
      title: {
        en: "Morale Building",
        zh: "提升士气",
      },
      description: {
        en: "Brings encouragement and positive energy into shared activity.",
        zh: "能够为共同活动带来鼓励与积极能量。",
      },
    },
    {
      id: "experience-design",
      title: {
        en: "Experience Design",
        zh: "体验设计",
      },
      description: {
        en: "Notices the practical details that make an occasion enjoyable and memorable.",
        zh: "能够察觉让一次活动变得愉快而难忘的现实细节。",
      },
    },
    {
      id: "responsive-help",
      title: {
        en: "Responsive Help",
        zh: "及时帮助",
      },
      description: {
        en: "Offers concrete support when a need becomes visible.",
        zh: "当需要变得清晰时，能够及时提供具体支持。",
      },
    },
    {
      id: "adaptive-performance",
      title: {
        en: "Adaptive Performance",
        zh: "灵活表现",
      },
      description: {
        en: "Responds effectively to live feedback and changing conditions.",
        zh: "能够有效回应现场反馈与变化中的条件。",
      },
    },
    {
      id: "inclusive-warmth",
      title: {
        en: "Inclusive Warmth",
        zh: "包容的温暖",
      },
      description: {
        en: "Helps others participate by reducing distance and formality.",
        zh: "通过减少距离感与过度正式感，帮助他人更自然地参与。",
      },
    },
  ],

  growthRisks: [
    {
      id: "future-avoidance",
      title: {
        en: "Avoiding Future Constraints",
        zh: "回避未来限制",
      },
      description: {
        en: "Long-range planning may feel restrictive compared with present opportunities.",
        zh: "相比眼前机会，长期规划可能让人感到受限。",
      },
      growthAction: {
        en: "Choose one future goal and schedule the next two practical actions without overplanning.",
        zh: "选择一个未来目标，并安排接下来的两个具体行动，避免过度规划。",
      },
    },
    {
      id: "impulse-spending",
      title: {
        en: "Impulse and Reward",
        zh: "冲动与即时奖励",
      },
      description: {
        en: "Immediate enjoyment may outweigh budget, time, or energy limits.",
        zh: "即时享受可能压过预算、时间或精力限制。",
      },
      growthAction: {
        en: "Create a pause rule for high-cost choices and check the effect on current priorities.",
        zh: "为高成本选择设置暂停规则，并检查它对当前优先事项的影响。",
      },
    },
    {
      id: "difficult-feeling-avoidance",
      title: {
        en: "Avoiding Difficult Feelings",
        zh: "回避困难情绪",
      },
      description: {
        en: "Activity or positivity may distract from an issue that needs reflection.",
        zh: "持续活动或保持积极，可能让你暂时绕过真正需要反思的问题。",
      },
      growthAction: {
        en: "Set aside a short quiet period to name the feeling, cause, and needed conversation.",
        zh: "安排一段短暂的安静时间，明确情绪、原因以及需要进行的对话。",
      },
    },
    {
      id: "overcommitting-socially",
      title: {
        en: "Social Overcommitment",
        zh: "社交承诺过多",
      },
      description: {
        en: "A desire to participate and help may fill more time than energy allows.",
        zh: "参与和帮助他人的愿望，可能占用超出精力承受范围的时间。",
      },
      growthAction: {
        en: "Leave recovery space between major social or service commitments.",
        zh: "在重要社交或服务承诺之间预留恢复空间。",
      },
    },
    {
      id: "feedback-reactivity",
      title: {
        en: "Feedback Reactivity",
        zh: "对反馈反应过快",
      },
      description: {
        en: "Critical feedback may quickly affect confidence or connection.",
        zh: "批评性反馈可能迅速影响自信或关系感受。",
      },
      growthAction: {
        en: "Pause and ask for one specific example and one desired adjustment.",
        zh: "先暂停反应，再询问一个具体例子和一个期望的调整方向。",
      },
    },
    {
      id: "routine-follow-through",
      title: {
        en: "Routine Follow-Through",
        zh: "常规执行不足",
      },
      description: {
        en: "Administrative tasks may be delayed when more engaging activity appears.",
        zh: "当更有吸引力的活动出现时，行政与常规任务可能被推迟。",
      },
      growthAction: {
        en: "Complete a brief daily close-out routine before choosing optional activity.",
        zh: "在选择其他可选活动之前，先完成简短的每日收尾流程。",
      },
    },
  ],

  careerGroups: [
    {
      id: "entertainment-and-media",
      category: {
        en: "Entertainment and Media",
        zh: "娱乐与媒体",
      },
      description: {
        en: "Live and creative media work can reward expression, timing, and audience connection.",
        zh: "现场与创意媒体工作能够发挥表达能力、节奏感与受众连接优势。",
      },
      roles: {
        en: ["Presenter", "Performer", "Event Host", "Media Producer"],
        zh: ["主持人", "表演者", "活动主持人", "媒体制作人"],
      },
    },
    {
      id: "hospitality-and-experience",
      category: {
        en: "Hospitality and Experience",
        zh: "酒店与体验服务",
      },
      description: {
        en: "Guest-focused environments use warmth, sensory awareness, and practical responsiveness.",
        zh: "以宾客为中心的环境能够发挥温暖沟通、感官觉察与实际响应能力。",
      },
      roles: {
        en: [
          "Hospitality Manager",
          "Event Planner",
          "Travel Experience Manager",
          "Guest Relations Director",
        ],
        zh: ["酒店服务经理", "活动策划师", "旅行体验经理", "宾客关系总监"],
      },
    },
    {
      id: "sales-and-client-relations",
      category: {
        en: "Sales and Client Relations",
        zh: "销售与客户关系",
      },
      description: {
        en: "Interactive commercial roles can reward rapport, energy, and immediate feedback.",
        zh: "互动型商业岗位能够发挥关系建立、活力与即时反馈优势。",
      },
      roles: {
        en: [
          "Account Executive",
          "Retail Experience Manager",
          "Property Consultant",
          "Customer Success Specialist",
        ],
        zh: ["客户主管", "零售体验经理", "房地产顾问", "客户成功专员"],
      },
    },
    {
      id: "health-and-community",
      category: {
        en: "Health and Community",
        zh: "健康与社区",
      },
      description: {
        en: "People-facing support can combine practical care with encouragement.",
        zh: "面向人的支持工作能够把务实照护与积极鼓励结合起来。",
      },
      roles: {
        en: [
          "Recreation Therapist",
          "Fitness Coach",
          "Community Outreach Officer",
          "Youth Programme Coordinator",
        ],
        zh: ["娱乐治疗师", "健身教练", "社区外展专员", "青少年项目协调员"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type may suggest energising environments, but it does not place a fixed limit on career choice, expertise, or future growth.",
    zh: "人格类型可以帮助识别更具活力的工作环境，但不会对职业选择、专业能力或未来成长设定固定限制。",
  },

  premiumPreview: {
    headline: {
      en: "Keep your vitality while building a future that can sustain it.",
      zh: "在保持活力的同时，建立一个能够长期支持这种活力的未来。",
    },
    introduction: {
      en: "A deeper report will explore expression, relationships, decisions, planning, career fit, stress, and recovery.",
      zh: "完整报告将进一步分析表达方式、人际关系、决策、规划、职业适配、压力与恢复。",
    },
    sections: [
      {
        id: "social-energy",
        title: {
          en: "Social Energy",
          zh: "社交能量",
        },
        description: {
          en: "How interaction and response influence motivation.",
          zh: "分析互动与回应如何影响你的动力。",
        },
        access: "premium",
      },
      {
        id: "experience-strengths",
        title: {
          en: "Experience Strengths",
          zh: "体验优势",
        },
        description: {
          en: "Using atmosphere, timing, and practical empathy.",
          zh: "运用氛围、时机与务实同理心。",
        },
        access: "premium",
      },
      {
        id: "future-planning",
        title: {
          en: "Future Planning",
          zh: "未来规划",
        },
        description: {
          en: "Creating direction without suppressing spontaneity.",
          zh: "在不压制自然灵活性的前提下建立方向。",
        },
        access: "premium",
      },
      {
        id: "feedback-resilience",
        title: {
          en: "Feedback Resilience",
          zh: "反馈韧性",
        },
        description: {
          en: "Learning from criticism without losing confidence.",
          zh: "在不失去自信的情况下从批评中学习。",
        },
        access: "premium",
      },
      {
        id: "relationship-boundaries",
        title: {
          en: "Relationship Boundaries",
          zh: "关系边界",
        },
        description: {
          en: "Balancing generosity, availability, and recovery.",
          zh: "平衡慷慨、可投入程度与恢复需要。",
        },
        access: "premium",
      },
      {
        id: "career-stage",
        title: {
          en: "Career Stage",
          zh: "职业阶段",
        },
        description: {
          en: "Work settings that value visibility, service, and adaptability.",
          zh: "分析哪些工作环境重视表现力、服务能力与适应力。",
        },
        access: "premium",
      },
      {
        id: "stress-and-avoidance",
        title: {
          en: "Stress and Avoidance",
          zh: "压力与回避",
        },
        description: {
          en: "Recognising distraction, overload, and delayed reflection.",
          zh: "识别注意力转移、过度负荷与延迟反思。",
        },
        access: "premium",
      },
      {
        id: "sustainable-expression",
        title: {
          en: "Sustainable Expression",
          zh: "可持续表达",
        },
        description: {
          en: "A plan for combining present energy with durable priorities.",
          zh: "把当下活力与长期优先事项结合起来的行动计划。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ESFP report",
      zh: "查看完整 ESFP 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
