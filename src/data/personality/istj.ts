import type { PersonalityProfile } from "./types";

export const istjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ISTJ",

  identity: {
    name: {
      en: "Logistician",
      zh: "物流师型",
    },
    shortName: {
      en: "Dependable Organiser",
      zh: "可靠的组织者",
    },
    tagline: {
      en: "Careful realist · Consistent steward · Methodical planner",
      zh: "谨慎的现实主义者 · 稳定的责任承担者 · 有条理的规划者",
    },
    keywords: {
      en: [
        "Reliability",
        "Accuracy",
        "Duty",
        "Order",
        "Practicality",
        "Consistency",
      ],
      zh: ["可靠", "准确", "责任", "秩序", "务实", "稳定"],
    },
  },

  overview: {
    headline: {
      en: "You often build trust through careful preparation, consistent standards, and dependable follow-through.",
      zh: "你常常通过充分准备、稳定标准与可靠执行来建立信任。",
    },
    paragraphs: {
      en: [
        "ISTJs tend to focus on concrete responsibilities, proven information, and orderly methods that reduce avoidable error.",
        "They may prefer clear expectations and enough independence to complete work thoroughly, especially where continuity and accountability matter.",
        "Their steadiness can protect people and systems, while openness to changing conditions helps reliable practice remain relevant.",
      ],
      zh: [
        "ISTJ 通常关注具体责任、经过验证的信息，以及能够减少可避免错误的有序方法。",
        "他们往往偏好清晰的期望与足够的独立空间，以便彻底完成工作，尤其是在重视连续性与责任落实的环境中。",
        "他们的稳定性能够保护人员与系统，而对变化保持开放，则有助于让可靠的实践持续适应现实需要。",
      ],
    },
    summary: {
      en: "At your best, you turn responsibility into stable systems and results that others can confidently rely on.",
      zh: "在最佳状态下，你能够把责任转化为稳定的系统，以及他人可以放心依赖的成果。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "practical-reliability",
      title: {
        en: "Practical Reliability",
        zh: "务实可靠",
      },
      description: {
        en: "Approaches commitments with realism, preparation, and a strong preference for completion.",
        zh: "以现实态度、充分准备和强烈的完成意识对待承诺。",
      },
    },
    {
      id: "evidence-based-memory",
      title: {
        en: "Evidence-Based Memory",
        zh: "基于证据的经验判断",
      },
      description: {
        en: "Draws on detailed experience and established facts when assessing a situation.",
        zh: "在评估情况时，善于依据具体经验与已确认的事实作出判断。",
      },
    },
    {
      id: "structured-method",
      title: {
        en: "Structured Method",
        zh: "结构化方法",
      },
      description: {
        en: "Creates order through procedures, schedules, and clear standards.",
        zh: "通过流程、时间安排与清晰标准建立秩序。",
      },
    },
    {
      id: "independent-duty",
      title: {
        en: "Independent Duty",
        zh: "独立责任感",
      },
      description: {
        en: "Often takes personal responsibility without needing frequent attention or reassurance.",
        zh: "通常能够独立承担个人责任，而不需要频繁关注或确认。",
      },
    },
  ],

  strengths: [
    {
      id: "consistent-delivery",
      title: {
        en: "Consistent Delivery",
        zh: "稳定交付",
      },
      description: {
        en: "Completes agreed work carefully and predictably.",
        zh: "能够谨慎而稳定地完成约定工作。",
      },
    },
    {
      id: "detail-accuracy",
      title: {
        en: "Detail Accuracy",
        zh: "细节准确",
      },
      description: {
        en: "Notices discrepancies and maintains precise records or processes.",
        zh: "能够发现差异，并维持准确的记录与流程。",
      },
    },
    {
      id: "risk-awareness",
      title: {
        en: "Risk Awareness",
        zh: "风险意识",
      },
      description: {
        en: "Anticipates practical failure points and prepares safeguards.",
        zh: "能够预见现实中的潜在失败点，并提前建立防护措施。",
      },
    },
    {
      id: "procedural-improvement",
      title: {
        en: "Procedural Improvement",
        zh: "流程改进",
      },
      description: {
        en: "Refines established methods to make execution clearer and more dependable.",
        zh: "能够优化现有方法，使执行更加清晰可靠。",
      },
    },
    {
      id: "responsible-judgement",
      title: {
        en: "Responsible Judgement",
        zh: "负责任的判断",
      },
      description: {
        en: "Weighs commitments and consequences before acting.",
        zh: "在行动前认真权衡承诺与后果。",
      },
    },
    {
      id: "operational-stability",
      title: {
        en: "Operational Stability",
        zh: "运营稳定性",
      },
      description: {
        en: "Provides continuity during busy or uncertain periods.",
        zh: "在繁忙或不确定时期保持工作的连续性。",
      },
    },
  ],

  growthRisks: [
    {
      id: "change-resistance",
      title: {
        en: "Change Resistance",
        zh: "抗拒变化",
      },
      description: {
        en: "An unfamiliar method may be dismissed before its evidence is fully considered.",
        zh: "在充分评估证据之前，可能会过早否定陌生方法。",
      },
      growthAction: {
        en: "Run a controlled trial with clear measures rather than accepting or rejecting the change in principle.",
        zh: "与其原则性接受或拒绝改变，不如设置明确指标并进行小范围可控试验。",
      },
    },
    {
      id: "rigid-standards",
      title: {
        en: "Rigid Standards",
        zh: "标准僵化",
      },
      description: {
        en: "A reliable rule may be applied when the context calls for discretion.",
        zh: "即使情境需要灵活判断，也可能继续机械套用可靠规则。",
      },
      growthAction: {
        en: "Identify the purpose behind the standard and consider alternative ways to protect it.",
        zh: "明确标准背后的真正目的，并考虑其他能够保护该目的的方法。",
      },
    },
    {
      id: "silent-overload",
      title: {
        en: "Silent Overload",
        zh: "默默超负荷",
      },
      description: {
        en: "Responsibility may accumulate because asking for help feels inefficient or uncomfortable.",
        zh: "由于觉得求助效率不高或令人不适，责任可能不断累积。",
      },
      growthAction: {
        en: "Raise capacity risks early and delegate a clearly defined part of the work.",
        zh: "尽早提出能力与负荷风险，并委派边界清晰的部分工作。",
      },
    },
    {
      id: "possibility-underuse",
      title: {
        en: "Underusing Possibility",
        zh: "忽视新的可能性",
      },
      description: {
        en: "Attention to what is proven may reduce exploration of emerging options.",
        zh: "过度关注已经验证的方法，可能减少对新兴选择的探索。",
      },
      growthAction: {
        en: "Reserve a short planning period to ask what could work differently in the future.",
        zh: "预留一段短时间，思考未来有哪些不同的方法可能有效。",
      },
    },
    {
      id: "blunt-correction",
      title: {
        en: "Blunt Correction",
        zh: "纠正方式过于直接",
      },
      description: {
        en: "Fact-focused feedback may overlook the recipient's context or effort.",
        zh: "只关注事实的反馈，可能忽略对方的处境与付出。",
      },
      growthAction: {
        en: "Acknowledge what is working before naming the specific required correction.",
        zh: "在指出需要纠正的具体问题之前，先确认已经做得好的部分。",
      },
    },
    {
      id: "overidentification-with-duty",
      title: {
        en: "Overidentification with Duty",
        zh: "过度认同责任角色",
      },
      description: {
        en: "Rest and personal priorities may be postponed until every obligation is resolved.",
        zh: "可能会把休息与个人优先事项推迟到所有责任都完成之后。",
      },
      growthAction: {
        en: "Treat recovery as a scheduled responsibility that supports long-term reliability.",
        zh: "把恢复视为一项需要安排的责任，因为它能支持长期可靠表现。",
      },
    },
  ],

  careerGroups: [
    {
      id: "operations-and-administration",
      category: {
        en: "Operations and Administration",
        zh: "运营与行政",
      },
      description: {
        en: "Structured operations reward consistency, documentation, and accountable delivery.",
        zh: "结构清晰的运营环境能够发挥稳定性、文档管理与责任交付优势。",
      },
      roles: {
        en: [
          "Operations Manager",
          "Programme Administrator",
          "Quality Assurance Manager",
          "Compliance Officer",
        ],
        zh: ["运营经理", "项目行政主管", "质量保证经理", "合规专员"],
      },
    },
    {
      id: "finance-and-audit",
      category: {
        en: "Finance and Audit",
        zh: "金融与审计",
      },
      description: {
        en: "Accuracy-intensive work can use evidence, standards, and careful judgement.",
        zh: "高度重视准确性的工作能够发挥证据意识、标准意识与谨慎判断能力。",
      },
      roles: {
        en: ["Accountant", "Auditor", "Financial Controller", "Risk Analyst"],
        zh: ["会计师", "审计师", "财务控制经理", "风险分析师"],
      },
    },
    {
      id: "technical-systems",
      category: {
        en: "Technical Systems",
        zh: "技术系统",
      },
      description: {
        en: "Technical maintenance and analysis benefit from methodical diagnosis and dependable procedure.",
        zh: "技术维护与分析工作能够受益于系统诊断与可靠流程。",
      },
      roles: {
        en: [
          "Systems Administrator",
          "Database Administrator",
          "Civil Engineer",
          "Technical Support Manager",
        ],
        zh: ["系统管理员", "数据库管理员", "土木工程师", "技术支持经理"],
      },
    },
    {
      id: "public-service",
      category: {
        en: "Public Service",
        zh: "公共服务",
      },
      description: {
        en: "Institutional roles can value continuity, duty, and consistent application of standards.",
        zh: "机构型岗位通常重视连续性、责任感与标准的稳定执行。",
      },
      roles: {
        en: [
          "Public Administrator",
          "Records Manager",
          "Logistics Officer",
          "Regulatory Inspector",
        ],
        zh: ["公共行政人员", "档案管理经理", "物流专员", "监管检查员"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type may indicate comfortable working patterns, but it does not limit the careers you can pursue or the skills you can develop.",
    zh: "人格类型可以帮助识别更舒适的工作模式，但不会限制你能够选择的职业或可以发展的技能。",
  },

  premiumPreview: {
    headline: {
      en: "Build dependable systems that remain responsive to change.",
      zh: "建立既可靠又能回应变化的系统。",
    },
    introduction: {
      en: "A deeper report will explore responsibility, decisions, communication, work fit, flexibility, and sustainable performance.",
      zh: "完整报告将进一步分析责任感、决策方式、沟通、工作适配、灵活性与可持续表现。",
    },
    sections: [
      {
        id: "reliability-patterns",
        title: {
          en: "Reliability Patterns",
          zh: "可靠性模式",
        },
        description: {
          en: "How standards and preparation shape your contribution.",
          zh: "分析标准与准备如何塑造你的贡献方式。",
        },
        access: "premium",
      },
      {
        id: "decision-evidence",
        title: {
          en: "Decision Evidence",
          zh: "决策证据",
        },
        description: {
          en: "Balancing experience, facts, and emerging information.",
          zh: "平衡经验、事实与新出现的信息。",
        },
        access: "premium",
      },
      {
        id: "change-adaptation",
        title: {
          en: "Change Adaptation",
          zh: "变化适应",
        },
        description: {
          en: "Testing new methods without losing operational stability.",
          zh: "在不失去运营稳定性的前提下测试新方法。",
        },
        access: "premium",
      },
      {
        id: "communication-practice",
        title: {
          en: "Communication Practice",
          zh: "沟通实践",
        },
        description: {
          en: "Making precise feedback easier to receive and apply.",
          zh: "让精确反馈更容易被理解和执行。",
        },
        access: "premium",
      },
      {
        id: "work-systems",
        title: {
          en: "Work Systems",
          zh: "工作系统",
        },
        description: {
          en: "Environments that reward focus, ownership, and consistency.",
          zh: "分析哪些环境能够奖励专注、责任与稳定表现。",
        },
        access: "premium",
      },
      {
        id: "relationship-trust",
        title: {
          en: "Relationship Trust",
          zh: "关系信任",
        },
        description: {
          en: "How dependability and reserved expression shape connection.",
          zh: "分析可靠性与克制表达如何影响关系连接。",
        },
        access: "premium",
      },
      {
        id: "overload-signals",
        title: {
          en: "Overload Signals",
          zh: "超负荷信号",
        },
        description: {
          en: "Recognising duty accumulation and inflexible coping.",
          zh: "识别责任累积与僵化应对方式。",
        },
        access: "premium",
      },
      {
        id: "resilient-growth",
        title: {
          en: "Resilient Growth",
          zh: "韧性成长",
        },
        description: {
          en: "Practical steps for combining steadiness with adaptability.",
          zh: "把稳定性与适应力结合起来的实践步骤。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ISTJ report",
      zh: "查看完整 ISTJ 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
