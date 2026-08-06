import type { PersonalityProfile } from "./types";

export const estjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ESTJ",

  identity: {
    name: {
      en: "Executive",
      zh: "总经理型",
    },
    shortName: {
      en: "Practical Director",
      zh: "务实型管理者",
    },
    tagline: {
      en: "Decisive organiser · Accountable operator · Clear standard setter",
      zh: "果断的组织者 · 负责的执行者 · 清晰的标准制定者",
    },
    keywords: {
      en: [
        "Execution",
        "Order",
        "Responsibility",
        "Standards",
        "Directness",
        "Leadership",
      ],
      zh: ["执行", "秩序", "责任", "标准", "直接", "领导力"],
    },
  },

  overview: {
    headline: {
      en: "You often create progress by clarifying responsibilities, applying practical standards, and keeping commitments visible.",
      zh: "你常常通过明确责任、执行务实标准并持续跟进承诺来推动进展。",
    },
    paragraphs: {
      en: [
        "ESTJs tend to engage directly with concrete goals, established responsibilities, and the organisation required to deliver reliable results.",
        "They may be comfortable making decisions, coordinating people, and correcting problems when expectations are unclear or performance has drifted.",
        "Their operational confidence can stabilise demanding environments, while curiosity and tact help strong standards adapt to different people and new evidence.",
      ],
      zh: [
        "ESTJ 通常会直接面对具体目标、既定责任，以及实现可靠成果所需要的组织工作。",
        "当期望不明确或表现偏离标准时，他们往往能够果断作出决定、协调人员并纠正问题。",
        "他们在运营管理上的自信能够稳定高要求环境，而好奇心与沟通技巧则能帮助严格标准适应不同的人和新的证据。",
      ],
    },
    summary: {
      en: "At your best, you turn shared obligations into organised action and dependable outcomes.",
      zh: "在最佳状态下，你能够把共同责任转化为有组织的行动与可靠成果。",
    },
    access: "free",
  },

  coreTraits: [
    {
      id: "operational-leadership",
      title: {
        en: "Operational Leadership",
        zh: "运营领导力",
      },
      description: {
        en: "Sets practical direction and organises resources around defined responsibilities.",
        zh: "能够设定务实方向，并围绕明确责任组织资源。",
      },
    },
    {
      id: "decisive-structure",
      title: {
        en: "Decisive Structure",
        zh: "果断且结构清晰",
      },
      description: {
        en: "Prefers clear plans, timely decisions, and visible accountability.",
        zh: "偏好清晰计划、及时决策与明确可见的责任机制。",
      },
    },
    {
      id: "evidence-and-experience",
      title: {
        en: "Evidence and Experience",
        zh: "证据与经验",
      },
      description: {
        en: "Uses concrete facts and proven practice to evaluate what will work.",
        zh: "依据具体事实与经过验证的实践判断什么方法能够奏效。",
      },
    },
    {
      id: "public-responsibility",
      title: {
        en: "Public Responsibility",
        zh: "公共责任感",
      },
      description: {
        en: "Often takes an active role in maintaining standards for a team or community.",
        zh: "通常会主动承担维护团队或群体标准的责任。",
      },
    },
  ],

  strengths: [
    {
      id: "execution-management",
      title: {
        en: "Execution Management",
        zh: "执行管理",
      },
      description: {
        en: "Converts objectives into roles, schedules, and measurable action.",
        zh: "能够把目标转化为明确角色、时间安排与可衡量行动。",
      },
    },
    {
      id: "clear-expectations",
      title: {
        en: "Clear Expectations",
        zh: "明确期望",
      },
      description: {
        en: "Communicates standards and responsibilities directly.",
        zh: "能够直接清晰地传达标准与责任。",
      },
    },
    {
      id: "resource-coordination",
      title: {
        en: "Resource Coordination",
        zh: "资源协调",
      },
      description: {
        en: "Aligns people, time, and materials with operational priorities.",
        zh: "能够根据运营优先级协调人员、时间与物资。",
      },
    },
    {
      id: "practical-decisions",
      title: {
        en: "Practical Decisions",
        zh: "务实决策",
      },
      description: {
        en: "Makes timely choices using available facts and experience.",
        zh: "能够依据现有事实与经验及时作出选择。",
      },
    },
    {
      id: "accountability",
      title: {
        en: "Accountability",
        zh: "责任落实",
      },
      description: {
        en: "Tracks commitments and addresses gaps rather than leaving them ambiguous.",
        zh: "持续跟进承诺并处理执行差距，而不是让问题保持模糊。",
      },
    },
    {
      id: "institutional-stability",
      title: {
        en: "Institutional Stability",
        zh: "组织稳定性",
      },
      description: {
        en: "Maintains routines and standards that support dependable service.",
        zh: "维护能够支持可靠服务的日常机制与标准。",
      },
    },
  ],

  growthRisks: [
    {
      id: "overdirecting",
      title: {
        en: "Overdirecting",
        zh: "过度指挥",
      },
      description: {
        en: "A desire for clear execution may leave too little room for another person's method.",
        zh: "对清晰执行的重视，可能让他人的工作方式缺少足够空间。",
      },
      growthAction: {
        en: "Define the required outcome and constraints, then allow appropriate autonomy in delivery.",
        zh: "明确必要结果与限制条件，再给予执行者适当自主权。",
      },
    },
    {
      id: "impatience-with-process",
      title: {
        en: "Impatience with Process",
        zh: "对过程缺乏耐心",
      },
      description: {
        en: "Discussion or exploration may seem wasteful before its value is visible.",
        zh: "在讨论或探索的价值尚未显现时，可能会认为这些过程是在浪费时间。",
      },
      growthAction: {
        en: "Ask what uncertainty the discussion needs to resolve before setting a decision time.",
        zh: "先明确讨论需要解决哪些不确定性，再设定作出决定的时间。",
      },
    },
    {
      id: "blunt-feedback",
      title: {
        en: "Blunt Feedback",
        zh: "反馈过于直接",
      },
      description: {
        en: "Direct correction may reduce motivation when context and effort are ignored.",
        zh: "如果忽略具体情境与已有付出，直接纠正可能降低他人的积极性。",
      },
      growthAction: {
        en: "Describe the standard, observed gap, impact, and next step without judging the person.",
        zh: "说明标准、观察到的差距、实际影响与下一步，而不要评价个人。",
      },
    },
    {
      id: "tradition-over-fit",
      title: {
        en: "Tradition Over Fit",
        zh: "过度坚持传统方法",
      },
      description: {
        en: "An established procedure may be defended after conditions have changed.",
        zh: "即使环境已经改变，也可能继续维护原有流程。",
      },
      growthAction: {
        en: "Review whether the method still serves its original purpose using current evidence.",
        zh: "依据当前证据重新评估该方法是否仍能实现原始目的。",
      },
    },
    {
      id: "emotional-underweighting",
      title: {
        en: "Underweighting Emotion",
        zh: "低估情绪因素",
      },
      description: {
        en: "Human reactions may be treated as obstacles rather than relevant information.",
        zh: "人的情绪反应可能被视为障碍，而不是有价值的信息。",
      },
      growthAction: {
        en: "Include trust, morale, and perceived fairness in the operational assessment.",
        zh: "在运营评估中加入信任、士气与公平感等因素。",
      },
    },
    {
      id: "constant-responsibility",
      title: {
        en: "Constant Responsibility",
        zh: "持续承担责任",
      },
      description: {
        en: "Continuous oversight may crowd out recovery and strategic reflection.",
        zh: "持续监督可能挤压恢复与战略思考的时间。",
      },
      growthAction: {
        en: "Delegate recurring ownership and schedule time away from immediate operations.",
        zh: "把重复性责任委派出去，并安排暂时离开日常运营的思考时间。",
      },
    },
  ],

  careerGroups: [
    {
      id: "operations-leadership",
      category: {
        en: "Operations Leadership",
        zh: "运营领导",
      },
      description: {
        en: "Operational roles reward coordination, standards, and accountable delivery.",
        zh: "运营管理岗位能够发挥协调、标准管理与责任交付能力。",
      },
      roles: {
        en: [
          "Operations Director",
          "General Manager",
          "Supply Chain Manager",
          "Programme Director",
        ],
        zh: ["运营总监", "总经理", "供应链经理", "项目总监"],
      },
    },
    {
      id: "finance-and-control",
      category: {
        en: "Finance and Control",
        zh: "金融与控制",
      },
      description: {
        en: "Control environments can use practical judgement and disciplined oversight.",
        zh: "控制与监管环境能够发挥务实判断与纪律性监督能力。",
      },
      roles: {
        en: [
          "Financial Controller",
          "Audit Manager",
          "Compliance Director",
          "Bank Manager",
        ],
        zh: ["财务控制经理", "审计经理", "合规总监", "银行经理"],
      },
    },
    {
      id: "public-administration",
      category: {
        en: "Public Administration",
        zh: "公共行政",
      },
      description: {
        en: "Public systems require consistent service, regulation, and resource management.",
        zh: "公共系统需要稳定服务、规范管理与资源协调能力。",
      },
      roles: {
        en: [
          "Municipal Manager",
          "Public Administration Director",
          "Emergency Services Manager",
          "Regulatory Manager",
        ],
        zh: ["市政经理", "公共行政总监", "应急服务经理", "监管经理"],
      },
    },
    {
      id: "commercial-management",
      category: {
        en: "Commercial Management",
        zh: "商业管理",
      },
      description: {
        en: "Commercial teams benefit from targets, direct decisions, and performance discipline.",
        zh: "商业团队能够受益于明确目标、直接决策与绩效纪律。",
      },
      roles: {
        en: [
          "Sales Director",
          "Retail Area Manager",
          "Commercial Manager",
          "Business Unit Leader",
        ],
        zh: ["销售总监", "零售区域经理", "商务经理", "业务单元负责人"],
      },
    },
  ],

  careerNotice: {
    en: "Personality type can indicate preferred leadership and working patterns, but it does not prescribe or restrict your career path.",
    zh: "人格类型可以帮助识别偏好的领导与工作方式，但不会规定或限制你的职业道路。",
  },

  premiumPreview: {
    headline: {
      en: "Lead clear execution while expanding flexibility and trust.",
      zh: "在保持清晰执行的同时提升灵活性与信任。",
    },
    introduction: {
      en: "A deeper report will examine standards, decisions, delegation, communication, work fit, and recovery.",
      zh: "完整报告将进一步分析标准、决策、授权、沟通、工作适配与恢复。",
    },
    sections: [
      {
        id: "leadership-standards",
        title: {
          en: "Leadership Standards",
          zh: "领导标准",
        },
        description: {
          en: "How expectations and accountability shape performance.",
          zh: "分析期望与责任机制如何塑造表现。",
        },
        access: "premium",
      },
      {
        id: "decision-tempo",
        title: {
          en: "Decision Tempo",
          zh: "决策节奏",
        },
        description: {
          en: "Balancing speed with exploration and participation.",
          zh: "平衡决策速度、探索过程与团队参与。",
        },
        access: "premium",
      },
      {
        id: "delegation-practice",
        title: {
          en: "Delegation Practice",
          zh: "授权实践",
        },
        description: {
          en: "Transferring real ownership without losing clarity.",
          zh: "在保持清晰责任的同时真正转移所有权。",
        },
        access: "premium",
      },
      {
        id: "feedback-impact",
        title: {
          en: "Feedback Impact",
          zh: "反馈影响",
        },
        description: {
          en: "Making direct correction specific and constructive.",
          zh: "让直接纠正变得具体而具有建设性。",
        },
        access: "premium",
      },
      {
        id: "change-readiness",
        title: {
          en: "Change Readiness",
          zh: "变化准备度",
        },
        description: {
          en: "Updating proven methods when evidence shifts.",
          zh: "当证据发生变化时及时更新既有方法。",
        },
        access: "premium",
      },
      {
        id: "career-context",
        title: {
          en: "Career Context",
          zh: "职业环境",
        },
        description: {
          en: "Environments that reward responsibility and operational authority.",
          zh: "分析哪些环境能够发挥责任意识与运营管理权限。",
        },
        access: "premium",
      },
      {
        id: "relationship-dynamics",
        title: {
          en: "Relationship Dynamics",
          zh: "关系模式",
        },
        description: {
          en: "How directness and reliability influence trust.",
          zh: "分析直接表达与可靠表现如何影响信任。",
        },
        access: "premium",
      },
      {
        id: "sustainable-command",
        title: {
          en: "Sustainable Command",
          zh: "可持续管理",
        },
        description: {
          en: "A plan for balancing oversight, reflection, and recovery.",
          zh: "建立平衡监督、反思与恢复的管理计划。",
        },
        access: "premium",
      },
    ],
    callToAction: {
      en: "Explore the complete ESTJ report",
      zh: "查看完整 ESTJ 报告",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en", "zh"],
  },
};
