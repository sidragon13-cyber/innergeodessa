import type { PersonalityProfile } from "./types";

export const istpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ISTP",

  identity: {
    name: {
      en: "Virtuoso",
      zh: "鉴赏家型",
    },
    shortName: {
      en: "Adaptive Troubleshooter",
      zh: "灵活的问题解决者",
    },
    tagline: {
      en: "Hands-on analyst · Calm improviser · Independent craftsperson",
      zh: "实践型分析者 · 冷静的应变者 · 独立的技术实践者",
    },
    keywords: {
      en: [
        "Practicality",
        "Precision",
        "Autonomy",
        "Adaptability",
        "Mechanics",
        "Composure",
      ],
      zh: ["务实", "精确", "自主", "适应力", "技术", "冷静"],
    },
  },

  overview: {
    headline: {
      en: "You often understand a problem by engaging directly with how its parts behave in the real world.",
      zh: "你往往通过直接观察各个部分在现实中的运行方式来理解问题。",
    },
    paragraphs: {
      en: [
        "ISTPs tend to combine detached analysis with practical observation, especially when a situation calls for diagnosis, adjustment, or skilled action.",
        "They may value freedom, efficient tools, and the ability to respond to present conditions without unnecessary procedure.",
        "Their composure can be valuable in immediate problems, while proactive communication and longer planning help others work confidently alongside them.",
      ],
      zh: [
        "ISTP 通常把客观分析与现实观察结合起来，尤其擅长处理需要诊断、调整或专业操作的情境。",
        "他们往往重视自由、高效工具，以及不受多余流程限制、根据当前情况及时行动的能力。",
        "他们的冷静在处理即时问题时非常有价值，而主动沟通与更长期的规划，则能帮助他人更有信心地与他们协作。",
      ],
    },
    summary: {
      en: "At your best, you bring clear analysis and skilful adaptation to practical challenges that demand a direct response.",
      zh: "在最佳状态下，你能够以清晰分析和熟练应变，解决需要直接行动的现实挑战。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "hands-on-analysis",
      title: {
        en: "Hands-On Analysis",
        zh: "实践型分析",
      },
      description: {
        en: "Learns how a system works by observing, testing, and adjusting it directly.",
        zh: "通过直接观察、测试和调整来理解系统如何运作。",
      },
    },
    {
      id: "calm-adaptation",
      title: {
        en: "Calm Adaptation",
        zh: "冷静适应",
      },
      description: {
        en: "Responds to immediate change without excessive alarm or attachment to the original plan.",
        zh: "面对即时变化时能够冷静应对，不会过度焦虑或执着于原有计划。",
      },
    },
    {
      id: "independent-action",
      title: {
        en: "Independent Action",
        zh: "独立行动",
      },
      description: {
        en: "Prefers enough autonomy to choose an efficient method.",
        zh: "偏好拥有足够自主权，以选择最高效的方法。",
      },
    },
    {
      id: "functional-precision",
      title: {
        en: "Functional Precision",
        zh: "功能性精确",
      },
      description: {
        en: "Focuses on accurate operation and removes steps that do not serve the result.",
        zh: "重视操作准确性，并会删除对结果没有实际帮助的步骤。",
      },
    },
  ],

  strengths: [
    {
      id: "rapid-troubleshooting",
      title: {
        en: "Rapid Troubleshooting",
        zh: "快速排查问题",
      },
      description: {
        en: "Identifies practical causes and tests workable corrections.",
        zh: "能够识别现实原因，并测试可行的修正方案。",
      },
    },
    {
      id: "technical-learning",
      title: {
        en: "Technical Learning",
        zh: "技术学习",
      },
      description: {
        en: "Builds competence through direct use, experimentation, and feedback.",
        zh: "通过直接使用、实验与反馈建立专业能力。",
      },
    },
    {
      id: "crisis-composure",
      title: {
        en: "Crisis Composure",
        zh: "危机中的冷静",
      },
      description: {
        en: "Often remains focused when an immediate problem requires action.",
        zh: "当即时问题需要行动时，通常能够保持专注和冷静。",
      },
    },
    {
      id: "efficient-methods",
      title: {
        en: "Efficient Methods",
        zh: "高效方法",
      },
      description: {
        en: "Simplifies processes and tools around functional needs.",
        zh: "能够围绕实际功能需要简化流程与工具。",
      },
    },
    {
      id: "situational-awareness",
      title: {
        en: "Situational Awareness",
        zh: "情境觉察",
      },
      description: {
        en: "Notices concrete changes and available options in the present environment.",
        zh: "能够察觉当前环境中的具体变化与可用选择。",
      },
    },
    {
      id: "practical-independence",
      title: {
        en: "Practical Independence",
        zh: "实践独立性",
      },
      description: {
        en: "Can take responsibility for specialised work with limited supervision.",
        zh: "能够在较少监督的情况下独立承担专业工作。",
      },
    },
  ],

  growthRisks: [
    {
      id: "long-term-underplanning",
      title: {
        en: "Underplanning the Long Term",
        zh: "长期规划不足",
      },
      description: {
        en: "Present flexibility may leave future dependencies insufficiently prepared.",
        zh: "对当前灵活性的重视，可能导致未来依赖事项准备不足。",
      },
      growthAction: {
        en: "Identify the next three milestones and any commitment that others need in advance.",
        zh: "明确接下来的三个里程碑，以及需要提前向他人作出的承诺。",
      },
    },
    {
      id: "communication-gaps",
      title: {
        en: "Communication Gaps",
        zh: "沟通缺口",
      },
      description: {
        en: "Internal conclusions may not be shared until action is already underway.",
        zh: "内部已经形成的结论，可能直到行动开始后才与他人分享。",
      },
      growthAction: {
        en: "Give a short update on the issue, intended action, and likely impact before proceeding.",
        zh: "行动前简要说明问题、计划采取的行动以及可能产生的影响。",
      },
    },
    {
      id: "commitment-avoidance",
      title: {
        en: "Commitment Avoidance",
        zh: "回避长期承诺",
      },
      description: {
        en: "Keeping options open may make dependable long-term agreement difficult.",
        zh: "持续保留所有选择，可能让稳定的长期承诺变得困难。",
      },
      growthAction: {
        en: "Choose commitments deliberately and define where flexibility remains.",
        zh: "有意识地选择需要承担的承诺，并明确哪些部分仍可保持灵活。",
      },
    },
    {
      id: "risk-normalisation",
      title: {
        en: "Risk Normalisation",
        zh: "风险正常化",
      },
      description: {
        en: "Confidence under pressure may reduce attention to cumulative or hidden risk.",
        zh: "压力下的自信，可能降低对累积风险或隐藏风险的关注。",
      },
      growthAction: {
        en: "Use a brief pre-action check for safety, downstream effects, and reversibility.",
        zh: "行动前快速检查安全性、后续影响以及是否可以逆转。",
      },
    },
    {
      id: "emotional-distance",
      title: {
        en: "Emotional Distance",
        zh: "情感距离",
      },
      description: {
        en: "A practical response may miss another person's need for acknowledgement.",
        zh: "务实的回应可能忽略他人希望自己的感受被确认的需要。",
      },
      growthAction: {
        en: "Recognise the person's experience before moving to diagnosis or repair.",
        zh: "在进入分析或解决问题之前，先确认对方的经历与感受。",
      },
    },
    {
      id: "routine-disengagement",
      title: {
        en: "Routine Disengagement",
        zh: "对常规工作失去投入",
      },
      description: {
        en: "Maintenance work may lose attention when no immediate challenge is present.",
        zh: "当没有即时挑战时，维护性工作可能难以持续获得关注。",
      },
      growthAction: {
        en: "Automate checks and connect preventive maintenance to avoided future disruption.",
        zh: "尽可能自动化检查，并把预防性维护与避免未来中断联系起来。",
      },
    },
  ],

  careerGroups: [
    {
      id: "engineering-and-maintenance",
      category: {
        en: "Engineering and Maintenance",
        zh: "工程与维护",
      },
      description: {
        en: "Technical systems provide concrete problems, tools, and measurable performance.",
        zh: "技术系统能够提供具体问题、实际工具与可衡量的表现标准。",
      },
      roles: {
        en: [
          "Mechanical Engineer",
          "Aircraft Technician",
          "Industrial Maintenance Specialist",
          "Field Service Engineer",
        ],
        zh: ["机械工程师", "航空器技术员", "工业维护专家", "现场服务工程师"],
      },
    },
    {
      id: "technology-and-security",
      category: {
        en: "Technology and Security",
        zh: "技术与安全",
      },
      description: {
        en: "Technical response work can reward diagnosis, autonomy, and calm adaptation.",
        zh: "技术响应类工作能够发挥诊断能力、自主性与冷静应变优势。",
      },
      roles: {
        en: [
          "Cybersecurity Engineer",
          "Network Engineer",
          "DevOps Specialist",
          "Digital Forensics Analyst",
        ],
        zh: ["网络安全工程师", "网络工程师", "DevOps 专家", "数字取证分析师"],
      },
    },
    {
      id: "emergency-and-field-work",
      category: {
        en: "Emergency and Field Work",
        zh: "应急与现场工作",
      },
      description: {
        en: "Immediate operational settings can use situational awareness and practical composure.",
        zh: "即时运营环境能够发挥情境觉察与现实冷静能力。",
      },
      roles: {
        en: [
          "Paramedic",
          "Firefighter",
          "Emergency Operations Specialist",
          "Search and Rescue Technician",
        ],
        zh: ["急救人员", "消防员", "应急运营专家", "搜索与救援技术员"],
      },
    },
    {
      id: "craft-and-production",
      category: {
        en: "Craft and Production",
        zh: "工艺与生产",
      },
      description: {
        en: "Skilled production work can combine precision, tools, and visible outcomes.",
        zh: "专业生产工作能够把精确操作、工具使用与可见成果结合起来。",
      },
      roles: {
        en: [
          "Industrial Designer",
          "Film Camera Operator",
          "Master Technician",
          "Prototype Fabricator",
        ],
        zh: ["工业设计师", "影视摄影师", "高级技术员", "原型制作师"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type may suggest comfortable problem-solving environments, but it does not limit career choice, responsibility, or learned expertise.",
    zh: "人格类型可以帮助识别更舒适的问题解决环境，但不会限制职业选择、责任范围或后天专业能力。",
  },

  premiumPreview: {
    headline: {
      en: "Extend practical mastery into communication and long-range impact.",
      zh: "把实践能力延伸到沟通与长期影响力。",
    },
    introduction: {
      en: "A deeper report will examine problem solving, autonomy, risk, relationships, career fit, and sustainable focus.",
      zh: "完整报告将进一步分析问题解决、自主性、风险、人际关系、职业适配与可持续专注。",
    },
    sections: [
      {
        id: "problem-solving-style",
        title: {
          en: "Problem-Solving Style",
          zh: "问题解决方式",
        },
        description: {
          en: "How direct observation and testing guide action.",
          zh: "分析直接观察与测试如何引导行动。",
        },
        access: "premium",
      },
      {
        id: "technical-mastery",
        title: {
          en: "Technical Mastery",
          zh: "技术掌握",
        },
        description: {
          en: "Conditions that support deep practical competence.",
          zh: "分析哪些条件能够支持深度实践能力。",
        },
        access: "premium",
      },
      {
        id: "risk-and-response",
        title: {
          en: "Risk and Response",
          zh: "风险与应对",
        },
        description: {
          en: "Balancing composure, speed, and preventive checks.",
          zh: "平衡冷静、速度与预防性检查。",
        },
        access: "premium",
      },
      {
        id: "communication-clarity",
        title: {
          en: "Communication Clarity",
          zh: "沟通清晰度",
        },
        description: {
          en: "Keeping others informed without unnecessary detail.",
          zh: "在避免不必要细节的同时，让他人及时了解情况。",
        },
        access: "premium",
      },
      {
        id: "commitment-patterns",
        title: {
          en: "Commitment Patterns",
          zh: "承诺模式",
        },
        description: {
          en: "Preserving autonomy within dependable agreements.",
          zh: "在可靠约定中保留适当自主性。",
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
          en: "Work settings that reward skill, action, and independence.",
          zh: "分析哪些工作环境重视技能、行动与独立性。",
        },
        access: "premium",
      },
      {
        id: "stress-reactions",
        title: {
          en: "Stress Reactions",
          zh: "压力反应",
        },
        description: {
          en: "Recognising withdrawal, impulsive action, and accumulated pressure.",
          zh: "识别退缩、冲动行动与累积压力。",
        },
        access: "premium",
      },
      {
        id: "long-range-growth",
        title: {
          en: "Long-Range Growth",
          zh: "长期成长",
        },
        description: {
          en: "A practical plan for extending immediate skill into durable value.",
          zh: "把即时技能延伸为长期价值的实践计划。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ISTP report",
      zh: "查看完整 ISTP 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
