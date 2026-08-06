import type { PersonalityProfile } from "./types";

export const esfjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ESFJ",

  identity: {
    name: {
      en: "Consul",
      zh: "执政官型",
    },
    shortName: {
      en: "Community Builder",
      zh: "社群建设者",
    },
    tagline: {
      en: "Warm coordinator · Practical host · Loyal contributor",
      zh: "温暖的协调者 · 务实的组织者 · 忠诚的贡献者",
    },
    keywords: {
      en: [
        "Community",
        "Care",
        "Cooperation",
        "Reliability",
        "Warmth",
        "Tradition",
      ],
      zh: ["社群", "关怀", "合作", "可靠", "温暖", "传统"],
    },
  },

  overview: {
    headline: {
      en: "You often strengthen a community by noticing practical needs and helping people feel welcomed, supported, and connected.",
      zh: "你常常通过察觉现实需要，并帮助人们感到被欢迎、被支持和彼此连接，来增强一个群体。",
    },
    paragraphs: {
      en: [
        "ESFJs tend to invest actively in relationships, shared responsibilities, and the routines that help groups function well.",
        "They may express care through organisation, communication, and tangible support, often remembering preferences and important occasions.",
        "Their responsiveness can create belonging, while boundaries and openness to different values help care remain balanced rather than approval-driven.",
      ],
      zh: [
        "ESFJ 通常会积极投入人际关系、共同责任，以及帮助群体顺利运作的日常机制。",
        "他们往往通过组织安排、沟通交流和实际支持表达关心，并能够记住他人的偏好与重要时刻。",
        "他们积极回应他人的能力能够营造归属感，而清晰边界和对不同价值观的开放，则有助于让关怀保持平衡，而不是被认可需求所驱动。",
      ],
    },
    summary: {
      en: "At your best, you turn social awareness into dependable action that helps people participate and belong.",
      zh: "在最佳状态下，你能够把社会觉察转化为可靠行动，帮助人们参与其中并获得归属感。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "community-attunement",
      title: {
        en: "Community Attunement",
        zh: "社群敏感度",
      },
      description: {
        en: "Notices inclusion, morale, and practical needs within a group.",
        zh: "能够察觉群体中的包容程度、士气变化与现实需要。",
      },
    },
    {
      id: "expressive-care",
      title: {
        en: "Expressive Care",
        zh: "主动表达关怀",
      },
      description: {
        en: "Communicates appreciation and concern through visible, concrete action.",
        zh: "通过清晰可见的具体行动表达欣赏与关心。",
      },
    },
    {
      id: "social-organisation",
      title: {
        en: "Social Organisation",
        zh: "社交组织力",
      },
      description: {
        en: "Coordinates details and people to support shared occasions or responsibilities.",
        zh: "能够协调人员与细节，支持共同活动或责任。",
      },
    },
    {
      id: "loyal-participation",
      title: {
        en: "Loyal Participation",
        zh: "忠诚参与",
      },
      description: {
        en: "Invests consistently in relationships and institutions that matter.",
        zh: "能够持续投入重要的人际关系与组织。",
      },
    },
  ],

  strengths: [
    {
      id: "welcoming-connection",
      title: {
        en: "Welcoming Connection",
        zh: "营造欢迎感",
      },
      description: {
        en: "Helps people feel noticed and included.",
        zh: "帮助他人感到被看见、被关注并被接纳。",
      },
    },
    {
      id: "practical-coordination",
      title: {
        en: "Practical Coordination",
        zh: "务实协调",
      },
      description: {
        en: "Organises schedules, resources, and communication around group needs.",
        zh: "能够围绕群体需要组织时间安排、资源与沟通。",
      },
    },
    {
      id: "service-responsiveness",
      title: {
        en: "Service Responsiveness",
        zh: "服务响应力",
      },
      description: {
        en: "Responds quickly when someone needs concrete assistance.",
        zh: "当他人需要具体帮助时，能够迅速作出回应。",
      },
    },
    {
      id: "relationship-maintenance",
      title: {
        en: "Relationship Maintenance",
        zh: "关系维护",
      },
      description: {
        en: "Sustains contact and shared traditions over time.",
        zh: "能够长期维持联系与共同传统。",
      },
    },
    {
      id: "clear-cooperation",
      title: {
        en: "Clear Cooperation",
        zh: "清晰合作",
      },
      description: {
        en: "Encourages participation through visible expectations and encouragement.",
        zh: "通过明确期望和积极鼓励促进他人参与。",
      },
    },
    {
      id: "morale-awareness",
      title: {
        en: "Morale Awareness",
        zh: "士气觉察",
      },
      description: {
        en: "Recognises changes in group atmosphere and works to restore connection.",
        zh: "能够察觉群体氛围的变化，并主动恢复彼此连接。",
      },
    },
  ],

  growthRisks: [
    {
      id: "approval-dependence",
      title: {
        en: "Approval Dependence",
        zh: "依赖认可",
      },
      description: {
        en: "Negative reactions may carry more weight than personal judgement or evidence.",
        zh: "他人的负面反应可能比个人判断或客观证据产生更大的影响。",
      },
      growthAction: {
        en: "Clarify your own values and the objective facts before adjusting to another person's response.",
        zh: "在根据他人的反应进行调整之前，先明确自己的价值观与客观事实。",
      },
    },
    {
      id: "boundary-difficulty",
      title: {
        en: "Boundary Difficulty",
        zh: "边界设定困难",
      },
      description: {
        en: "A desire to be helpful may produce unsustainable availability.",
        zh: "希望帮助他人的愿望，可能导致长期处于无法持续的随时待命状态。",
      },
      growthAction: {
        en: "Offer support within a specific time, task, or capacity limit.",
        zh: "在明确的时间、任务或能力范围内提供支持。",
      },
    },
    {
      id: "conflict-personalisation",
      title: {
        en: "Personalising Conflict",
        zh: "把冲突个人化",
      },
      description: {
        en: "Disagreement may feel like rejection of the relationship.",
        zh: "分歧可能被感受为对整段关系的否定。",
      },
      growthAction: {
        en: "Separate the issue under discussion from the overall value of the relationship.",
        zh: "把当前讨论的问题与整段关系的整体价值区分开。",
      },
    },
    {
      id: "difference-discomfort",
      title: {
        en: "Discomfort with Difference",
        zh: "对差异感到不适",
      },
      description: {
        en: "Unfamiliar choices may be judged against local expectations too quickly.",
        zh: "面对陌生选择时，可能会过快地依据周围环境的期待作出判断。",
      },
      growthAction: {
        en: "Ask what value or circumstance makes the different approach meaningful to that person.",
        zh: "询问是什么价值观或现实情况，让这种不同方法对对方具有意义。",
      },
    },
    {
      id: "unspoken-expectations",
      title: {
        en: "Unspoken Expectations",
        zh: "未表达的期待",
      },
      description: {
        en: "Generous effort may create expectations of reciprocity that were never discussed.",
        zh: "慷慨付出可能形成从未明确讨论过的回报期待。",
      },
      growthAction: {
        en: "State what you need directly rather than relying on others to infer it.",
        zh: "直接表达自己的需要，而不是依赖他人自行猜测。",
      },
    },
    {
      id: "social-overload",
      title: {
        en: "Social Overload",
        zh: "社交超负荷",
      },
      description: {
        en: "Frequent involvement may leave insufficient private recovery time.",
        zh: "频繁参与社交与群体事务，可能导致个人恢复时间不足。",
      },
      growthAction: {
        en: "Protect regular low-demand periods even when social opportunities remain available.",
        zh: "即使仍有社交机会，也要固定保留低负荷的个人时间。",
      },
    },
  ],

  careerGroups: [
    {
      id: "health-and-wellbeing",
      category: {
        en: "Health and Wellbeing",
        zh: "健康与福祉",
      },
      description: {
        en: "People-facing care work can reward responsiveness and practical coordination.",
        zh: "面向人的照护工作能够发挥响应力与务实协调能力。",
      },
      roles: {
        en: [
          "Nurse",
          "Patient Experience Manager",
          "Dietitian",
          "Healthcare Practice Manager",
        ],
        zh: ["护士", "患者体验经理", "营养师", "医疗机构运营经理"],
      },
    },
    {
      id: "education-and-community",
      category: {
        en: "Education and Community",
        zh: "教育与社区",
      },
      description: {
        en: "Community learning roles can use warmth, organisation, and visible encouragement.",
        zh: "社区学习岗位能够发挥温暖沟通、组织能力与积极鼓励优势。",
      },
      roles: {
        en: [
          "Teacher",
          "School Counsellor",
          "Community Programme Coordinator",
          "Parent Engagement Officer",
        ],
        zh: ["教师", "学校辅导员", "社区项目协调员", "家长参与专员"],
      },
    },
    {
      id: "hospitality-and-events",
      category: {
        en: "Hospitality and Events",
        zh: "酒店与活动管理",
      },
      description: {
        en: "Hospitality environments reward anticipation of needs and coordinated service.",
        zh: "酒店与活动环境能够发挥需求预判和协调服务能力。",
      },
      roles: {
        en: [
          "Event Manager",
          "Hotel Manager",
          "Guest Experience Director",
          "Conference Coordinator",
        ],
        zh: ["活动经理", "酒店经理", "宾客体验总监", "会议协调员"],
      },
    },
    {
      id: "people-and-client-service",
      category: {
        en: "People and Client Service",
        zh: "人才与客户服务",
      },
      description: {
        en: "Relationship-centred operations can combine service standards with ongoing contact.",
        zh: "以关系为核心的运营工作能够把服务标准与持续沟通结合起来。",
      },
      roles: {
        en: [
          "Customer Success Manager",
          "Human Resources Manager",
          "Account Manager",
          "Client Services Director",
        ],
        zh: ["客户成功经理", "人力资源经理", "客户经理", "客户服务总监"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type may suggest satisfying forms of service and interaction, but it is not a fixed limitation on career choice or achievement.",
    zh: "人格类型可以帮助识别更令人满意的服务与互动方式，但不会成为职业选择或成就的固定限制。",
  },

  premiumPreview: {
    headline: {
      en: "Create belonging while protecting your own direction and energy.",
      zh: "在创造归属感的同时，保护自己的方向与精力。",
    },
    introduction: {
      en: "A deeper report will explore care, communication, boundaries, work fit, conflict, and sustainable connection.",
      zh: "完整报告将进一步分析关怀方式、沟通、边界、工作适配、冲突与可持续关系。",
    },
    sections: [
      {
        id: "community-role",
        title: {
          en: "Community Role",
          zh: "社群角色",
        },
        description: {
          en: "How you create inclusion and practical support.",
          zh: "分析你如何创造包容感并提供实际支持。",
        },
        access: "premium",
      },
      {
        id: "approval-and-values",
        title: {
          en: "Approval and Values",
          zh: "认可与价值观",
        },
        description: {
          en: "Balancing social feedback with personal judgement.",
          zh: "平衡社会反馈与个人判断。",
        },
        access: "premium",
      },
      {
        id: "boundary-setting",
        title: {
          en: "Boundary Setting",
          zh: "边界设定",
        },
        description: {
          en: "Remaining generous without becoming overextended.",
          zh: "在保持慷慨的同时避免过度消耗。",
        },
        access: "premium",
      },
      {
        id: "conflict-communication",
        title: {
          en: "Conflict Communication",
          zh: "冲突沟通",
        },
        description: {
          en: "Addressing differences without treating them as rejection.",
          zh: "处理分歧，而不把它们视为关系否定。",
        },
        access: "premium",
      },
      {
        id: "relationship-reciprocity",
        title: {
          en: "Relationship Reciprocity",
          zh: "关系互惠",
        },
        description: {
          en: "Making needs and expectations visible.",
          zh: "让需要与期待变得清晰可见。",
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
          en: "Environments that value people, service, and organisation.",
          zh: "分析哪些环境重视人员、服务与组织能力。",
        },
        access: "premium",
      },
      {
        id: "stress-and-overload",
        title: {
          en: "Stress and Overload",
          zh: "压力与超负荷",
        },
        description: {
          en: "Recognising social fatigue and unmet personal needs.",
          zh: "识别社交疲劳与尚未满足的个人需要。",
        },
        access: "premium",
      },
      {
        id: "balanced-contribution",
        title: {
          en: "Balanced Contribution",
          zh: "平衡贡献",
        },
        description: {
          en: "A plan for sustaining care alongside personal growth.",
          zh: "在持续关怀他人的同时支持个人成长的计划。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ESFJ report",
      zh: "查看完整 ESFJ 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
