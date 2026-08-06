import type { PersonalityProfile } from "./types";

export const isfjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ISFJ",

  identity: {
    name: {
      en: "Defender",
      zh: "守卫者型",
    },
    shortName: {
      en: "Considerate Steward",
      zh: "体贴的守护者",
    },
    tagline: {
      en: "Attentive supporter · Practical caregiver · Loyal organiser",
      zh: "细致的支持者 · 务实的照顾者 · 忠诚的组织者",
    },
    keywords: {
      en: [
        "Care",
        "Reliability",
        "Observation",
        "Loyalty",
        "Service",
        "Stability",
      ],
      zh: ["关怀", "可靠", "观察", "忠诚", "服务", "稳定"],
    },
  },

  overview: {
    headline: {
      en: "You often support people through attentive care, practical detail, and commitments that endure.",
      zh: "你常常通过细致关怀、务实行动和持久承诺来支持他人。",
    },
    paragraphs: {
      en: [
        "ISFJs tend to notice concrete needs and remember the details that help people feel understood, secure, and included.",
        "They may contribute quietly but consistently, preferring useful action and trusted relationships over public recognition.",
        "Their loyalty can strengthen families, teams, and services, while direct boundaries help ensure care remains sustainable and reciprocal.",
      ],
      zh: [
        "ISFJ 通常能够察觉具体需要，并记住那些能让人感到被理解、安全和被接纳的细节。",
        "他们可能以安静但持续的方式作出贡献，相比公开认可，更重视有用的行动和可信赖的关系。",
        "他们的忠诚能够增强家庭、团队与服务体系，而清晰直接的边界则有助于让关怀保持可持续和相互平衡。",
      ],
    },
    summary: {
      en: "At your best, you combine practical reliability with personal attentiveness that makes everyday systems more humane.",
      zh: "在最佳状态下，你能够把务实可靠与细致关怀结合起来，让日常系统变得更有人情味。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "attentive-care",
      title: {
        en: "Attentive Care",
        zh: "细致关怀",
      },
      description: {
        en: "Notices individual preferences and practical needs that others may overlook.",
        zh: "能够察觉他人可能忽略的个人偏好与现实需要。",
      },
    },
    {
      id: "dependable-service",
      title: {
        en: "Dependable Service",
        zh: "可靠服务",
      },
      description: {
        en: "Follows through consistently where people rely on the outcome.",
        zh: "在他人依赖结果的情况下，能够持续而可靠地完成责任。",
      },
    },
    {
      id: "detailed-memory",
      title: {
        en: "Detailed Memory",
        zh: "细节记忆",
      },
      description: {
        en: "Uses past experience and specific information to provide continuity.",
        zh: "能够运用过去经验与具体信息，维持工作的连续性。",
      },
    },
    {
      id: "quiet-cooperation",
      title: {
        en: "Quiet Cooperation",
        zh: "安静协作",
      },
      description: {
        en: "Works patiently with others and often supports shared routines without seeking attention.",
        zh: "能够耐心与他人合作，并在不寻求关注的情况下支持共同事务。",
      },
    },
  ],

  strengths: [
    {
      id: "practical-support",
      title: {
        en: "Practical Support",
        zh: "务实支持",
      },
      description: {
        en: "Turns concern into specific, useful assistance.",
        zh: "能够把关心转化为具体而有用的帮助。",
      },
    },
    {
      id: "trust-building",
      title: {
        en: "Trust Building",
        zh: "建立信任",
      },
      description: {
        en: "Creates security through consistency, discretion, and remembered details.",
        zh: "通过稳定表现、谨慎态度和对细节的记忆建立安全感。",
      },
    },
    {
      id: "careful-organisation",
      title: {
        en: "Careful Organisation",
        zh: "细致组织",
      },
      description: {
        en: "Maintains schedules, information, and resources with steady attention.",
        zh: "能够持续细致地管理时间安排、信息与资源。",
      },
    },
    {
      id: "service-awareness",
      title: {
        en: "Service Awareness",
        zh: "服务意识",
      },
      description: {
        en: "Recognises how processes affect the real experience of individuals.",
        zh: "能够意识到流程如何影响个人的真实体验。",
      },
    },
    {
      id: "patient-follow-through",
      title: {
        en: "Patient Follow-Through",
        zh: "耐心执行",
      },
      description: {
        en: "Sustains necessary work even when progress is gradual.",
        zh: "即使进展缓慢，也能持续完成必要工作。",
      },
    },
    {
      id: "community-continuity",
      title: {
        en: "Community Continuity",
        zh: "群体延续性",
      },
      description: {
        en: "Preserves helpful knowledge, rituals, and relationships over time.",
        zh: "能够长期保存有价值的知识、习惯和关系。",
      },
    },
  ],

  growthRisks: [
    {
      id: "needs-suppression",
      title: {
        en: "Suppressing Personal Needs",
        zh: "压抑个人需要",
      },
      description: {
        en: "Concern for others may make personal preferences difficult to state.",
        zh: "对他人的关心，可能使你难以表达自己的偏好与需要。",
      },
      growthAction: {
        en: "Name one need or limit early, before support turns into resentment.",
        zh: "在支持逐渐转化为不满之前，尽早表达一个具体需要或边界。",
      },
    },
    {
      id: "overcommitment-to-help",
      title: {
        en: "Overcommitment to Help",
        zh: "过度承诺帮助",
      },
      description: {
        en: "A request may be accepted even when time and energy are insufficient.",
        zh: "即使时间与精力不足，也可能仍然接受他人的请求。",
      },
      growthAction: {
        en: "Check capacity before agreeing and offer a smaller form of support when necessary.",
        zh: "答应之前先检查自己的能力和精力，必要时提供规模更小的支持。",
      },
    },
    {
      id: "conflict-avoidance",
      title: {
        en: "Conflict Avoidance",
        zh: "回避冲突",
      },
      description: {
        en: "Discomfort with tension may allow a practical problem to continue.",
        zh: "对紧张气氛的不适，可能让现实问题持续存在。",
      },
      growthAction: {
        en: "Describe the observable issue and request a concrete adjustment without assigning blame.",
        zh: "描述可以观察到的问题，并提出具体调整要求，而不是责备对方。",
      },
    },
    {
      id: "change-anxiety",
      title: {
        en: "Change Anxiety",
        zh: "变化焦虑",
      },
      description: {
        en: "Unfamiliar plans may feel risky when their effect on people is uncertain.",
        zh: "当一个陌生计划对人的影响尚不确定时，可能会让你感到风险较高。",
      },
      growthAction: {
        en: "Ask for a staged transition, practical examples, and a clear support plan.",
        zh: "要求采用分阶段过渡、提供现实案例，并建立清晰的支持计划。",
      },
    },
    {
      id: "recognition-gap",
      title: {
        en: "Recognition Gap",
        zh: "贡献缺乏认可",
      },
      description: {
        en: "Quiet contributions may remain invisible, limiting support or advancement.",
        zh: "安静而低调的贡献可能不容易被看见，从而限制获得支持或晋升的机会。",
      },
      growthAction: {
        en: "Document outcomes and communicate contributions in factual terms.",
        zh: "记录具体成果，并用客观事实说明自己的贡献。",
      },
    },
    {
      id: "taking-feedback-personally",
      title: {
        en: "Taking Feedback Personally",
        zh: "把反馈个人化",
      },
      description: {
        en: "Correction may feel like a judgement of loyalty or care.",
        zh: "纠正性反馈可能被感受为对忠诚或关怀的否定。",
      },
      growthAction: {
        en: "Separate intent, behaviour, and result, then identify the useful specific change.",
        zh: "区分动机、行为和结果，再识别真正有用的具体改进。",
      },
    },
  ],

  careerGroups: [
    {
      id: "health-and-care",
      category: {
        en: "Health and Care",
        zh: "健康与照护",
      },
      description: {
        en: "Care settings can reward practical attention, continuity, and individual support.",
        zh: "照护环境能够充分发挥务实关注、持续服务与个人支持能力。",
      },
      roles: {
        en: [
          "Registered Nurse",
          "Occupational Therapy Assistant",
          "Patient Services Coordinator",
          "Community Health Worker",
        ],
        zh: ["注册护士", "职业治疗助理", "患者服务协调员", "社区健康工作者"],
      },
    },
    {
      id: "education-and-support",
      category: {
        en: "Education and Support",
        zh: "教育与支持",
      },
      description: {
        en: "Learning support can use patience, observation, and dependable follow-through.",
        zh: "学习支持工作能够发挥耐心、观察力与可靠执行能力。",
      },
      roles: {
        en: [
          "Primary School Teacher",
          "Special Education Assistant",
          "Student Services Coordinator",
          "School Administrator",
        ],
        zh: ["小学教师", "特殊教育助理", "学生服务协调员", "学校行政人员"],
      },
    },
    {
      id: "administration-and-service",
      category: {
        en: "Administration and Service",
        zh: "行政与服务",
      },
      description: {
        en: "Service operations benefit from detailed organisation and awareness of user needs.",
        zh: "服务运营工作能够受益于细致组织能力与用户需求意识。",
      },
      roles: {
        en: [
          "Office Manager",
          "Customer Service Manager",
          "Programme Coordinator",
          "Library Services Officer",
        ],
        zh: ["办公室经理", "客户服务经理", "项目协调员", "图书馆服务专员"],
      },
    },
    {
      id: "people-operations",
      category: {
        en: "People Operations",
        zh: "人才运营",
      },
      description: {
        en: "Employee support roles can combine process reliability with personal attention.",
        zh: "员工支持岗位能够把可靠流程与个人关怀结合起来。",
      },
      roles: {
        en: [
          "Human Resources Coordinator",
          "Benefits Specialist",
          "Onboarding Manager",
          "Employee Relations Adviser",
        ],
        zh: ["人力资源协调员", "员工福利专员", "入职管理经理", "员工关系顾问"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type can describe preferred forms of contribution, but it should not be used as a fixed limit on career direction or growth.",
    zh: "人格类型可以描述偏好的贡献方式，但不应被用作限制职业方向或成长的固定边界。",
  },

  premiumPreview: {
    headline: {
      en: "Sustain your care without disappearing inside responsibility.",
      zh: "在持续关怀他人的同时，不要让自己消失在责任之中。",
    },
    introduction: {
      en: "A deeper report will explore service, boundaries, communication, work fit, relationships, and recovery.",
      zh: "完整报告将进一步分析服务方式、边界、沟通、工作适配、人际关系与恢复。",
    },
    sections: [
      {
        id: "care-patterns",
        title: {
          en: "Care Patterns",
          zh: "关怀模式",
        },
        description: {
          en: "How attention and memory shape practical support.",
          zh: "分析关注力与记忆如何塑造务实支持。",
        },
        access: "premium",
      },
      {
        id: "boundary-practice",
        title: {
          en: "Boundary Practice",
          zh: "边界实践",
        },
        description: {
          en: "Protecting energy while remaining dependable.",
          zh: "在保持可靠的同时保护自己的精力。",
        },
        access: "premium",
      },
      {
        id: "communication-needs",
        title: {
          en: "Communication Needs",
          zh: "沟通需要",
        },
        description: {
          en: "Expressing preferences and concerns with calm clarity.",
          zh: "以平静清晰的方式表达偏好与关切。",
        },
        access: "premium",
      },
      {
        id: "change-support",
        title: {
          en: "Change Support",
          zh: "变化支持",
        },
        description: {
          en: "Adapting through clear steps and human consideration.",
          zh: "通过清晰步骤与人本关怀适应变化。",
        },
        access: "premium",
      },
      {
        id: "career-environments",
        title: {
          en: "Career Environments",
          zh: "职业环境",
        },
        description: {
          en: "Settings that value service, detail, and continuity.",
          zh: "分析哪些环境重视服务、细节与连续性。",
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
          en: "Balancing giving, receiving, and honest expectations.",
          zh: "平衡付出、接受与真实期待。",
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
          en: "Recognising silent overload and unspoken resentment.",
          zh: "识别无声超负荷与未表达的不满。",
        },
        access: "premium",
      },
      {
        id: "sustainable-service",
        title: {
          en: "Sustainable Service",
          zh: "可持续服务",
        },
        description: {
          en: "A plan for caring effectively without sacrificing wellbeing.",
          zh: "在不牺牲自身健康的情况下有效关怀他人的计划。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "VIEW COMPLETE ISFJ REPORT",
      zh: "查看完整 ISFJ 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
