import type { PersonalityProfile } from "./types";

export const estpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ESTP",

  identity: {
    name: {
      en: "Entrepreneur",
      zh: "企业家型",
    },
    shortName: {
      en: "Action-Oriented Negotiator",
      zh: "行动型谈判者",
    },
    tagline: {
      en: "Bold responder · Practical persuader · Energetic problem solver",
      zh: "大胆的行动者 · 务实的说服者 · 充满活力的问题解决者",
    },
    keywords: {
      en: [
        "Action",
        "Adaptability",
        "Persuasion",
        "Pragmatism",
        "Courage",
        "Momentum",
      ],
      zh: ["行动", "适应力", "说服力", "务实", "勇气", "推动力"],
    },
  },

  overview: {
    headline: {
      en: "You often create momentum by reading the situation quickly and acting on the most practical opportunity available.",
      zh: "你常常通过快速判断局势，并抓住当前最现实的机会采取行动来推动进展。",
    },
    paragraphs: {
      en: [
        "ESTPs tend to engage directly with people, challenges, and immediate evidence, learning rapidly through action and response.",
        "They may be skilled at negotiation, improvisation, and staying composed when circumstances shift faster than a detailed plan can follow.",
        "Their bold pragmatism can unlock results, while long-range checks and careful commitments help immediate wins support durable outcomes.",
      ],
      zh: [
        "ESTP 通常会直接面对人、挑战与即时证据，并通过行动与反馈快速学习。",
        "他们往往擅长谈判、临场应变，并能在环境变化速度超过详细计划时保持冷静。",
        "他们大胆而务实的风格能够迅速推动结果，而长期检查与谨慎承诺，则有助于让眼前胜利转化为持久成果。",
      ],
    },
    summary: {
      en: "At your best, you combine situational courage with practical intelligence to move a real problem forward.",
      zh: "在最佳状态下，你能够把情境勇气与务实智慧结合起来，推动现实问题向前解决。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "situational-action",
      title: {
        en: "Situational Action",
        zh: "情境行动力",
      },
      description: {
        en: "Reads immediate conditions and moves quickly toward a workable response.",
        zh: "能够迅速判断当前条件，并快速采取可行行动。",
      },
    },
    {
      id: "pragmatic-analysis",
      title: {
        en: "Pragmatic Analysis",
        zh: "务实分析",
      },
      description: {
        en: "Focuses on what produces a tangible result under current constraints.",
        zh: "关注在当前限制条件下，什么方法能够产生实际结果。",
      },
    },
    {
      id: "social-boldness",
      title: {
        en: "Social Boldness",
        zh: "社交果断",
      },
      description: {
        en: "Engages readily, negotiates directly, and tolerates visible risk.",
        zh: "能够主动参与、直接谈判，并接受清晰可见的风险。",
      },
    },
    {
      id: "adaptive-energy",
      title: {
        en: "Adaptive Energy",
        zh: "灵活能量",
      },
      description: {
        en: "Changes tactics easily as feedback and opportunities emerge.",
        zh: "随着反馈与机会出现，能够迅速调整策略。",
      },
    },
  ],

  strengths: [
    {
      id: "rapid-response",
      title: {
        en: "Rapid Response",
        zh: "快速响应",
      },
      description: {
        en: "Acts decisively when a practical problem needs immediate attention.",
        zh: "当现实问题需要即时处理时，能够果断采取行动。",
      },
    },
    {
      id: "negotiation",
      title: {
        en: "Negotiation",
        zh: "谈判能力",
      },
      description: {
        en: "Reads incentives and finds workable terms in live interaction.",
        zh: "能够判断各方动机，并在现场互动中找到可执行的条件。",
      },
    },
    {
      id: "resourcefulness",
      title: {
        en: "Resourcefulness",
        zh: "资源整合能力",
      },
      description: {
        en: "Uses available tools, contacts, and information creatively.",
        zh: "能够创造性地利用现有工具、人脉与信息。",
      },
    },
    {
      id: "pressure-composure",
      title: {
        en: "Pressure Composure",
        zh: "压力下的冷静",
      },
      description: {
        en: "Often remains engaged and functional during uncertainty.",
        zh: "在不确定环境中通常仍能保持投入并正常发挥。",
      },
    },
    {
      id: "opportunity-recognition",
      title: {
        en: "Opportunity Recognition",
        zh: "机会识别",
      },
      description: {
        en: "Notices practical openings that others may miss while planning.",
        zh: "能够发现他人在规划过程中可能忽略的现实机会。",
      },
    },
    {
      id: "energising-presence",
      title: {
        en: "Energising Presence",
        zh: "带动氛围",
      },
      description: {
        en: "Can increase confidence and momentum through direct involvement.",
        zh: "能够通过直接参与增强他人的信心与行动动力。",
      },
    },
  ],

  growthRisks: [
    {
      id: "short-term-bias",
      title: {
        en: "Short-Term Bias",
        zh: "短期偏向",
      },
      description: {
        en: "An attractive immediate result may obscure future costs.",
        zh: "有吸引力的即时结果，可能掩盖未来成本。",
      },
      growthAction: {
        en: "Before committing, identify the likely effect in one week, six months, and one year.",
        zh: "作出承诺前，分别评估一周后、六个月后和一年后的可能影响。",
      },
    },
    {
      id: "risk-escalation",
      title: {
        en: "Risk Escalation",
        zh: "风险升级",
      },
      description: {
        en: "Comfort with uncertainty may lead to increasingly exposed decisions.",
        zh: "对不确定性的适应，可能让决策逐渐暴露在更高风险中。",
      },
      growthAction: {
        en: "Set a loss limit, exit condition, and independent check before acting.",
        zh: "行动前设定损失上限、退出条件和独立检查机制。",
      },
    },
    {
      id: "routine-neglect",
      title: {
        en: "Routine Neglect",
        zh: "忽视常规工作",
      },
      description: {
        en: "Maintenance and documentation may receive less attention than visible action.",
        zh: "相比看得见的行动，维护与文档工作可能得到较少关注。",
      },
      growthAction: {
        en: "Complete a short close-out checklist immediately after each major action.",
        zh: "每次重要行动完成后，立即执行一份简短的收尾清单。",
      },
    },
    {
      id: "commitment-flexing",
      title: {
        en: "Flexible Commitments",
        zh: "承诺过度灵活",
      },
      description: {
        en: "Changing conditions may be used to revise agreements too casually.",
        zh: "环境变化可能被用来过于随意地修改约定。",
      },
      growthAction: {
        en: "Communicate changes early and renegotiate explicitly rather than assuming flexibility.",
        zh: "尽早说明变化，并明确重新协商，而不是默认对方会接受调整。",
      },
    },
    {
      id: "emotional-speed",
      title: {
        en: "Emotional Speed",
        zh: "情绪处理过快",
      },
      description: {
        en: "Fast problem solving may move past another person's emotional processing.",
        zh: "快速解决问题的方式，可能跳过他人的情绪处理过程。",
      },
      growthAction: {
        en: "Ask what the person needs understood before proposing the next move.",
        zh: "提出下一步方案前，先询问对方希望哪些感受或情况被理解。",
      },
    },
    {
      id: "stimulation-dependence",
      title: {
        en: "Stimulation Dependence",
        zh: "依赖刺激感",
      },
      description: {
        en: "Quiet strategic work may be avoided when immediate activity is available.",
        zh: "当眼前有即时活动时，可能会回避安静的战略工作。",
      },
      growthAction: {
        en: "Protect a recurring planning block before entering reactive work.",
        zh: "在进入被动响应型工作前，固定保留一段规划时间。",
      },
    },
  ],

  careerGroups: [
    {
      id: "sales-and-negotiation",
      category: {
        en: "Sales and Negotiation",
        zh: "销售与谈判",
      },
      description: {
        en: "Commercial interaction can reward persuasion, responsiveness, and practical judgement.",
        zh: "商业互动能够发挥说服力、快速响应与务实判断能力。",
      },
      roles: {
        en: [
          "Sales Executive",
          "Commercial Negotiator",
          "Real Estate Broker",
          "Business Development Manager",
        ],
        zh: ["销售主管", "商务谈判代表", "房地产经纪人", "业务发展经理"],
      },
    },
    {
      id: "entrepreneurship-and-growth",
      category: {
        en: "Entrepreneurship and Growth",
        zh: "创业与增长",
      },
      description: {
        en: "Fast-moving ventures can use opportunity recognition and action under uncertainty.",
        zh: "快速发展的企业能够发挥机会识别与不确定环境下的行动能力。",
      },
      roles: {
        en: [
          "Entrepreneur",
          "Growth Manager",
          "Venture Operations Lead",
          "Market Expansion Director",
        ],
        zh: ["创业者", "增长经理", "创业项目运营负责人", "市场拓展总监"],
      },
    },
    {
      id: "emergency-and-operations",
      category: {
        en: "Emergency and Operations",
        zh: "应急与运营",
      },
      description: {
        en: "Immediate operational work can reward composure, courage, and resourcefulness.",
        zh: "即时运营工作能够发挥冷静、勇气与资源整合能力。",
      },
      roles: {
        en: [
          "Emergency Response Officer",
          "Operations Supervisor",
          "Police Officer",
          "Crisis Logistics Manager",
        ],
        zh: ["应急响应专员", "运营主管", "警务人员", "危机物流经理"],
      },
    },
    {
      id: "events-and-performance",
      category: {
        en: "Events and Performance",
        zh: "活动与现场表现",
      },
      description: {
        en: "Live environments provide visible feedback, people contact, and changing demands.",
        zh: "现场环境能够提供即时反馈、人际互动与不断变化的要求。",
      },
      roles: {
        en: [
          "Event Producer",
          "Sports Coach",
          "Broadcast Presenter",
          "Hospitality Operations Manager",
        ],
        zh: ["活动制作人", "体育教练", "广播电视主持人", "酒店运营经理"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type can indicate preferred levels of action and interaction, but it does not determine or limit career capability.",
    zh: "人格类型可以帮助识别偏好的行动与互动强度，但不会决定或限制职业能力。",
  },

  premiumPreview: {
    headline: {
      en: "Convert bold action into durable strategic advantage.",
      zh: "把大胆行动转化为持久的战略优势。",
    },
    introduction: {
      en: "A deeper report will explore risk, decisions, influence, commitments, career fit, relationships, and recovery.",
      zh: "完整报告将进一步分析风险、决策、影响力、承诺、职业适配、人际关系与恢复。",
    },
    sections: [
      {
        id: "action-patterns",
        title: {
          en: "Action Patterns",
          zh: "行动模式",
        },
        description: {
          en: "How immediate evidence and opportunity guide your moves.",
          zh: "分析即时证据与机会如何引导你的行动。",
        },
        access: "premium",
      },
      {
        id: "risk-discipline",
        title: {
          en: "Risk Discipline",
          zh: "风险纪律",
        },
        description: {
          en: "Preserving courage while protecting future options.",
          zh: "在保持勇气的同时保护未来选择。",
        },
        access: "premium",
      },
      {
        id: "negotiation-style",
        title: {
          en: "Negotiation Style",
          zh: "谈判风格",
        },
        description: {
          en: "Using social awareness and practical leverage responsibly.",
          zh: "负责任地运用社会觉察与现实筹码。",
        },
        access: "premium",
      },
      {
        id: "commitment-practice",
        title: {
          en: "Commitment Practice",
          zh: "承诺实践",
        },
        description: {
          en: "Combining flexibility with dependable agreements.",
          zh: "把灵活性与可靠约定结合起来。",
        },
        access: "premium",
      },
      {
        id: "strategic-pause",
        title: {
          en: "Strategic Pause",
          zh: "战略暂停",
        },
        description: {
          en: "Making room for planning before reactive activity.",
          zh: "在进入被动响应前，为规划保留空间。",
        },
        access: "premium",
      },
      {
        id: "career-energy",
        title: {
          en: "Career Energy",
          zh: "职业能量",
        },
        description: {
          en: "Environments that reward pace, contact, and tangible outcomes.",
          zh: "分析哪些环境重视节奏、人际互动与实际成果。",
        },
        access: "premium",
      },
      {
        id: "relationship-impact",
        title: {
          en: "Relationship Impact",
          zh: "关系影响",
        },
        description: {
          en: "Balancing direct problem solving with emotional timing.",
          zh: "平衡直接解决问题与他人的情绪节奏。",
        },
        access: "premium",
      },
      {
        id: "sustainable-momentum",
        title: {
          en: "Sustainable Momentum",
          zh: "可持续推动力",
        },
        description: {
          en: "A plan for turning immediate wins into long-term progress.",
          zh: "把即时胜利转化为长期进展的行动计划。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ESTP report",
      zh: "查看完整 ESTP 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
