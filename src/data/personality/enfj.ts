import type { PersonalityProfile } from "./types";

export const enfjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ENFJ",

  identity: {
    name: {
      en: "Protagonist",
      zh: "主人公型",
    },
    shortName: {
      en: "Inspiring Facilitator",
      zh: "鼓舞型引导者",
    },
    tagline: {
      en: "People developer · Purposeful communicator · Collaborative organiser",
      zh: "人才发展者 · 使命型沟通者 · 协作组织者",
    },
    keywords: {
      en: [
        "Encouragement",
        "Leadership",
        "Connection",
        "Purpose",
        "Communication",
        "Growth",
      ],
      zh: ["鼓励", "领导力", "连接", "使命", "沟通", "成长"],
    },
  },

  overview: {
    headline: {
      en: "You often create momentum by helping people see a shared purpose and their place within it.",
      zh: "你常常通过帮助人们看见共同使命，以及自己在其中的位置来推动集体前进。",
    },
    paragraphs: {
      en: [
        "ENFJs tend to combine social awareness, future-oriented thinking, and organised effort in support of people and collective goals.",
        "They may communicate with warmth and conviction, noticing what helps a group feel included, motivated, and capable of progress.",
        "Their investment in others can be influential, while clear boundaries and room for dissent keep support from becoming over-responsibility.",
      ],
      zh: [
        "ENFJ 通常把社会觉察、面向未来的思考与有组织的行动结合起来，以支持个人成长和集体目标。",
        "他们往往以温暖而坚定的方式沟通，并能够察觉什么能让团队成员感到被接纳、受到激励并具备前进的能力。",
        "他们对他人的投入能够产生显著影响，而清晰的边界以及允许不同意见存在，则能避免支持演变为过度承担责任。",
      ],
    },
    summary: {
      en: "At your best, you align human potential with a meaningful direction and help a group move toward it together.",
      zh: "在最佳状态下，你能够把人的潜力与有意义的方向结合起来，并帮助团队共同向目标前进。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "developmental-leadership",
      title: {
        en: "Developmental Leadership",
        zh: "发展型领导力",
      },
      description: {
        en: "Looks for ways to help individuals contribute, learn, and grow within a shared effort.",
        zh: "善于寻找方法，帮助个人在共同目标中作出贡献、持续学习并实现成长。",
      },
    },
    {
      id: "social-attunement",
      title: {
        en: "Social Attunement",
        zh: "社会关系敏感度",
      },
      description: {
        en: "Reads interpersonal dynamics and adapts communication to support understanding.",
        zh: "能够察觉人际互动中的变化，并调整沟通方式以促进理解。",
      },
    },
    {
      id: "purposeful-vision",
      title: {
        en: "Purposeful Vision",
        zh: "使命型愿景",
      },
      description: {
        en: "Connects future possibilities with values that can motivate collective action.",
        zh: "能够把未来可能性与能够激励集体行动的价值观连接起来。",
      },
    },
    {
      id: "coordinated-action",
      title: {
        en: "Coordinated Action",
        zh: "协同行动",
      },
      description: {
        en: "Brings people, expectations, and timelines into a coherent plan.",
        zh: "能够把人员、期望和时间安排整合成协调一致的行动计划。",
      },
    },
  ],

  strengths: [
    {
      id: "motivating-communication",
      title: {
        en: "Motivating Communication",
        zh: "激励型沟通",
      },
      description: {
        en: "Expresses direction in a way that helps others understand why it matters.",
        zh: "能够以帮助他人理解目标意义的方式清晰表达方向。",
      },
    },
    {
      id: "relationship-building",
      title: {
        en: "Relationship Building",
        zh: "关系建立",
      },
      description: {
        en: "Creates trust through attention, encouragement, and consistent engagement.",
        zh: "通过关注、鼓励与持续互动建立信任。",
      },
    },
    {
      id: "group-facilitation",
      title: {
        en: "Group Facilitation",
        zh: "团队引导",
      },
      description: {
        en: "Helps different voices participate and move toward workable agreement.",
        zh: "帮助不同声音参与讨论，并推动团队形成可执行的共识。",
      },
    },
    {
      id: "talent-development",
      title: {
        en: "Talent Development",
        zh: "人才发展",
      },
      description: {
        en: "Recognises potential and offers feedback that supports growth.",
        zh: "能够识别潜力，并提供有助于成长的反馈。",
      },
    },
    {
      id: "values-alignment",
      title: {
        en: "Values Alignment",
        zh: "价值观协同",
      },
      description: {
        en: "Links everyday activity with broader human or organisational purpose.",
        zh: "能够把日常行动与更广泛的人本或组织使命联系起来。",
      },
    },
    {
      id: "responsible-follow-through",
      title: {
        en: "Responsible Follow-Through",
        zh: "负责任的持续执行",
      },
      description: {
        en: "Maintains structure around commitments involving other people.",
        zh: "能够为涉及他人的承诺维持清晰结构并持续跟进。",
      },
    },
  ],

  growthRisks: [
    {
      id: "over-responsibility",
      title: {
        en: "Over-Responsibility",
        zh: "过度承担责任",
      },
      description: {
        en: "Concern for group success may lead to carrying work or emotions that belong to others.",
        zh: "对团队成功的高度关注，可能使你承担本应属于他人的工作或情绪。",
      },
      growthAction: {
        en: "Clarify ownership and support people without taking over their responsibility.",
        zh: "明确责任归属，在支持他人的同时避免接管对方应承担的责任。",
      },
    },
    {
      id: "approval-sensitivity",
      title: {
        en: "Approval Sensitivity",
        zh: "对认可过度敏感",
      },
      description: {
        en: "Visible disappointment or conflict may create pressure to restore harmony too quickly.",
        zh: "他人明显的失望或冲突，可能让你急于迅速恢复和谐。",
      },
      growthAction: {
        en: "Evaluate feedback against values and evidence before changing direction.",
        zh: "在改变方向之前，先依据价值观与证据评估反馈。",
      },
    },
    {
      id: "difficult-truth-delay",
      title: {
        en: "Delayed Difficult Truths",
        zh: "推迟表达困难事实",
      },
      description: {
        en: "Protecting morale may postpone necessary corrective feedback.",
        zh: "为了保护士气，可能会推迟必要的纠正性反馈。",
      },
      growthAction: {
        en: "Deliver specific feedback early, pairing respect with a clear expectation.",
        zh: "尽早提供具体反馈，并把尊重与明确期望结合起来。",
      },
    },
    {
      id: "personal-needs-neglect",
      title: {
        en: "Neglecting Personal Needs",
        zh: "忽视个人需要",
      },
      description: {
        en: "Attention to others may leave little space for private priorities and recovery.",
        zh: "对他人的持续关注，可能让个人优先事项和恢复时间受到挤压。",
      },
      growthAction: {
        en: "Reserve non-negotiable time for reflection, rest, and personal goals.",
        zh: "为反思、休息与个人目标预留不可被占用的时间。",
      },
    },
    {
      id: "idealised-consensus",
      title: {
        en: "Idealised Consensus",
        zh: "理想化共识",
      },
      description: {
        en: "A shared vision may be assumed before genuine disagreement has been explored.",
        zh: "在真正讨论分歧之前，可能会过早假设团队已经形成共同愿景。",
      },
      growthAction: {
        en: "Invite objections explicitly and distinguish commitment from surface agreement.",
        zh: "主动邀请不同意见，并区分真正承诺与表面认同。",
      },
    },
    {
      id: "intensity-of-involvement",
      title: {
        en: "Intensity of Involvement",
        zh: "投入强度过高",
      },
      description: {
        en: "Enthusiastic guidance may feel directive to someone needing autonomy.",
        zh: "充满热情的指导，对需要自主空间的人来说可能显得过于指令化。",
      },
      growthAction: {
        en: "Ask what kind of support is welcome before offering a plan.",
        zh: "在提供方案之前，先询问对方希望获得什么形式的支持。",
      },
    },
  ],

  careerGroups: [
    {
      id: "education-and-development",
      category: {
        en: "Education and Development",
        zh: "教育与发展",
      },
      description: {
        en: "Learning environments can use encouragement, structure, and developmental insight.",
        zh: "学习环境能够充分发挥鼓励、组织结构与成长洞察能力。",
      },
      roles: {
        en: [
          "Teacher",
          "Learning and Development Manager",
          "Academic Adviser",
          "Leadership Coach",
        ],
        zh: ["教师", "学习与发展经理", "学术顾问", "领导力教练"],
      },
    },
    {
      id: "people-and-culture",
      category: {
        en: "People and Culture",
        zh: "人才与组织文化",
      },
      description: {
        en: "Organisational people work can align culture, growth, and shared purpose.",
        zh: "组织人才工作能够把文化、成长与共同使命协调起来。",
      },
      roles: {
        en: [
          "Human Resources Director",
          "Talent Development Lead",
          "Culture Programme Manager",
          "Employee Experience Manager",
        ],
        zh: [
          "人力资源总监",
          "人才发展负责人",
          "组织文化项目经理",
          "员工体验经理",
        ],
      },
    },
    {
      id: "communication-and-advocacy",
      category: {
        en: "Communication and Advocacy",
        zh: "传播与倡议",
      },
      description: {
        en: "Public communication can mobilise attention around constructive goals.",
        zh: "公共传播能够围绕建设性目标凝聚关注与行动。",
      },
      roles: {
        en: [
          "Communications Director",
          "Public Affairs Manager",
          "Campaign Director",
          "Community Engagement Lead",
        ],
        zh: ["传播总监", "公共事务经理", "活动总监", "社区参与负责人"],
      },
    },
    {
      id: "service-leadership",
      category: {
        en: "Service Leadership",
        zh: "服务型领导",
      },
      description: {
        en: "Mission-led leadership can combine operational responsibility with human impact.",
        zh: "使命驱动的领导工作能够把运营责任与人本影响结合起来。",
      },
      roles: {
        en: [
          "Nonprofit Director",
          "Programme Manager",
          "Healthcare Administrator",
          "Social Enterprise Lead",
        ],
        zh: ["非营利机构总监", "项目经理", "医疗机构管理者", "社会企业负责人"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type may highlight preferred ways of contributing, but it does not set a fixed boundary on career choices or capability.",
    zh: "人格类型可以帮助识别偏好的贡献方式，但不会为职业选择或能力设定固定边界。",
  },

  premiumPreview: {
    headline: {
      en: "Lead people with purpose, clarity, and sustainable boundaries.",
      zh: "以使命、清晰方向和可持续边界领导他人。",
    },
    introduction: {
      en: "A deeper report will explore influence, relationships, decisions, work fit, stress, and personal development.",
      zh: "完整报告将进一步分析影响力、人际关系、决策方式、工作适配、压力与个人成长。",
    },
    sections: [
      {
        id: "leadership-impact",
        title: {
          en: "Leadership Impact",
          zh: "领导影响力",
        },
        description: {
          en: "How encouragement and direction shape group performance.",
          zh: "分析鼓励与方向如何塑造团队表现。",
        },
        access: "premium",
      },
      {
        id: "communication-influence",
        title: {
          en: "Communication and Influence",
          zh: "沟通与影响力",
        },
        description: {
          en: "Using warmth and conviction without over-directing.",
          zh: "学习如何在保持温暖与坚定的同时避免过度指挥。",
        },
        access: "premium",
      },
      {
        id: "team-dynamics",
        title: {
          en: "Team Dynamics",
          zh: "团队动态",
        },
        description: {
          en: "Building inclusion while making room for disagreement.",
          zh: "在建立包容氛围的同时，为不同意见保留空间。",
        },
        access: "premium",
      },
      {
        id: "feedback-practice",
        title: {
          en: "Feedback Practice",
          zh: "反馈实践",
        },
        description: {
          en: "Combining developmental support with necessary clarity.",
          zh: "把成长支持与必要的清晰反馈结合起来。",
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
          en: "Caring for others without taking over their outcomes.",
          zh: "在关心他人的同时，避免接管对方的人生结果。",
        },
        access: "premium",
      },
      {
        id: "career-environment",
        title: {
          en: "Career Environment",
          zh: "职业环境",
        },
        description: {
          en: "Settings that reward purpose, interaction, and organised impact.",
          zh: "分析哪些环境能够奖励使命感、互动能力与有组织的影响力。",
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
          en: "Recognising approval pressure, overload, and emotional fatigue.",
          zh: "识别认可压力、过度负荷与情绪疲劳。",
        },
        access: "premium",
      },
      {
        id: "sustainable-growth",
        title: {
          en: "Sustainable Growth",
          zh: "可持续成长",
        },
        description: {
          en: "A plan for balancing contribution, autonomy, and recovery.",
          zh: "建立平衡贡献、自主性与恢复的成长计划。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ENFJ report",
      zh: "查看完整 ENFJ 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
