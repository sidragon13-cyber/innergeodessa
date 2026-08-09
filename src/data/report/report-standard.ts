import type {
  ReportSectionDefinition,
  ReportVersion,
} from "./types";

export const COMPLETE_PERSONALITY_REPORT_VERSION: ReportVersion = {
  reportVersion: "1.0.0",
  contentVersion: "1.0.0",
  ruleVersion: "1.0.0",
};

// Personality-specific display titles, such as ISFJ "Care Patterns" or
// ENTJ "Leadership and Influence", will later map to these canonical
// categories without changing the stable canonical section IDs.
export const COMPLETE_PERSONALITY_REPORT_STANDARD:
  readonly ReportSectionDefinition[] = [
    {
      id: "report-identity",
      order: 1,
      category: "identity",
      access: "free",
      title: { en: "Report Identity", zh: "报告说明" },
      description: {
        en: "Identifies the report, personality type, and interpretation context.",
        zh: "说明报告的定位、适用范围、使用方式与重要限制。",
      },
      contentBlocks: [],
    },
    {
      id: "personality-overview",
      order: 2,
      category: "overview",
      access: "free",
      title: { en: "Personality Overview", zh: "人格概览" },
      description: {
        en: "Provides a concise overview of the personality pattern.",
        zh: "概述该人格类型的核心倾向、典型模式与可能的表现方式。",
      },
      contentBlocks: [],
    },
    {
      id: "dimension-results",
      order: 3,
      category: "dimensions",
      access: "free",
      title: { en: "Dimension Results", zh: "维度结果" },
      description: {
        en: "Summarises the four assessment dimension results.",
        zh: "解释四个人格维度的偏好、强度、平衡程度与情境差异。",
      },
      contentBlocks: [],
    },
    {
      id: "key-strengths",
      order: 4,
      category: "strengths",
      access: "free",
      title: { en: "Key Strengths", zh: "核心优势" },
      description: {
        en: "Highlights the personality pattern's key strengths.",
        zh: "分析该人格模式可能形成的优势，以及优势有效发挥所需要的条件。",
      },
      contentBlocks: [],
    },
    {
      id: "growth-risks",
      order: 5,
      category: "growth-risks",
      access: "free",
      title: { en: "Growth Risks", zh: "成长风险" },
      description: {
        en: "Introduces likely growth risks and development priorities.",
        zh: "识别优势被过度使用时可能产生的局限、盲点与发展风险。",
      },
      contentBlocks: [],
    },
    {
      id: "core-personality-pattern",
      order: 6,
      category: "core-pattern",
      access: "premium",
      title: { en: "Core Personality Pattern", zh: "核心人格模式" },
      description: {
        en: "Explains the integrated structure of the personality pattern.",
        zh: "深入分析该类型组织注意力、理解环境并形成行动方向的核心方式。",
      },
      contentBlocks: [],
    },
    {
      id: "motivation-and-needs",
      order: 7,
      category: "motivation",
      access: "premium",
      title: { en: "Motivation and Core Needs", zh: "动机与心理需要" },
      description: {
        en: "Examines recurring motivations, needs, and sources of engagement.",
        zh: "分析能够提升投入感、持续动力与心理满足的重要条件。",
      },
      contentBlocks: [],
    },
    {
      id: "information-processing",
      order: 8,
      category: "information-processing",
      access: "premium",
      title: { en: "Information Processing", zh: "信息处理方式" },
      description: {
        en: "Describes how information is noticed, organised, and interpreted.",
        zh: "分析该类型如何观察信息、识别重点、形成理解并建立判断。",
      },
      contentBlocks: [],
    },
    {
      id: "decision-making",
      order: 9,
      category: "decision-making",
      access: "premium",
      title: { en: "Decision-Making Pattern", zh: "决策方式" },
      description: {
        en: "Explores characteristic decision-making priorities and trade-offs.",
        zh: "分析该类型如何设定标准、评估证据、处理取舍并作出决定。",
      },
      contentBlocks: [],
    },
    {
      id: "communication",
      order: 10,
      category: "communication",
      access: "premium",
      title: { en: "Communication and Conflict", zh: "沟通方式" },
      description: {
        en: "Examines communication preferences and responses to conflict.",
        zh: "分析表达、倾听、解释观点及处理沟通分歧的典型模式。",
      },
      contentBlocks: [],
    },
    {
      id: "teamwork-and-leadership",
      order: 11,
      category: "teamwork-leadership",
      access: "premium",
      title: { en: "Teamwork and Leadership", zh: "团队合作与领导力" },
      description: {
        en: "Explores contributions to teams and characteristic leadership patterns.",
        zh: "分析该类型在团队中的贡献方式及其典型领导模式。",
      },
      contentBlocks: [],
    },
    {
      id: "career-environment",
      order: 12,
      category: "career",
      access: "premium",
      title: { en: "Career Environment", zh: "职业环境" },
      description: {
        en: "Describes work environments that support effective contribution.",
        zh: "分析更有利于发挥能力、保持投入并形成有效贡献的工作环境。",
      },
      contentBlocks: [],
    },
    {
      id: "relationship-dynamics",
      order: 13,
      category: "relationships",
      access: "premium",
      title: { en: "Relationship Dynamics", zh: "关系互动模式" },
      description: {
        en: "Explores recurring interpersonal needs and relationship patterns.",
        zh: "分析反复出现的人际需要、信任模式、关系期待与互动倾向。",
      },
      contentBlocks: [],
    },
    {
      id: "change-and-adaptation",
      order: 14,
      category: "change-adaptation",
      access: "premium",
      title: { en: "Change and Adaptation", zh: "变化与适应" },
      description: {
        en: "Examines responses to uncertainty, transition, and changing demands.",
        zh: "分析该类型面对不确定性、环境转变与需求变化时的反应方式。",
      },
      contentBlocks: [],
    },
    {
      id: "stress-and-recovery",
      order: 15,
      category: "stress-recovery",
      access: "premium",
      title: { en: "Stress and Recovery", zh: "压力与恢复" },
      description: {
        en: "Identifies likely stress patterns and supportive recovery practices.",
        zh: "分析压力可能产生的影响，以及恢复稳定、精力与判断力的有效方式。",
      },
      contentBlocks: [],
    },
    {
      id: "growth-roadmap",
      order: 16,
      category: "growth-roadmap",
      access: "premium",
      title: { en: "Personal Growth Roadmap", zh: "成长路线图" },
      description: {
        en: "Organises development priorities into a practical growth sequence.",
        zh: "将报告中的关键发展方向转化为循序渐进的长期成长路径。",
      },
      contentBlocks: [],
    },
    {
      id: "ninety-day-action-plan",
      order: 17,
      category: "action-plan",
      access: "premium",
      title: { en: "90-Day Action Plan" },
      description: {
        en: "Translates report insights into a focused ninety-day action plan.",
      },
      contentBlocks: [],
    },
    {
      id: "methodology",
      order: 18,
      category: "methodology",
      access: "premium",
      title: { en: "Methodology and Interpretation Notes", zh: "方法与解释原则" },
      description: {
        en: "Documents the report methodology and responsible interpretation guidance.",
        zh: "说明报告的分析方法、解释边界、证据原则与非临床定位。",
      },
      contentBlocks: [],
    },
  ];

export interface ReportStandardValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateCompletePersonalityReportStandard(
  sections: readonly ReportSectionDefinition[] =
    COMPLETE_PERSONALITY_REPORT_STANDARD,
): ReportStandardValidationResult {
  const errors: string[] = [];
  const ids = new Set<string>();
  const orders = new Set<number>();
  const categories = new Set<string>();

  if (sections.length !== 18) {
    errors.push(
      `Report standard must contain exactly 18 sections; found ${sections.length}.`,
    );
  }

  sections.forEach((section, index) => {
    if (ids.has(section.id)) {
      errors.push(`Section ${index + 1} has duplicate section id "${section.id}".`);
    }
    ids.add(section.id);

    if (orders.has(section.order)) {
      errors.push(`Section ${section.id} has duplicate order ${section.order}.`);
    }
    orders.add(section.order);

    if (categories.has(section.category)) {
      errors.push(
        `Section ${section.id} has duplicate category "${section.category}".`,
      );
    }
    categories.add(section.category);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id)) {
      errors.push(
        `Section id "${section.id}" must use lowercase kebab-case.`,
      );
    }

    const expectedAccess = section.order <= 5 ? "free" : "premium";
    if (section.access !== expectedAccess) {
      errors.push(
        `Section ${section.id} must have ${expectedAccess} access.`,
      );
    }

    if (!section.title.en?.trim()) {
      errors.push(`Section ${section.id} title.en must not be empty.`);
    }
    if (!section.description.en?.trim()) {
      errors.push(
        `Section ${section.id} description.en must not be empty.`,
      );
    }
  });

  const sortedOrders = [...orders].sort((left, right) => left - right);
  const ordersAreContinuous =
    sortedOrders.length === sections.length &&
    sortedOrders.every((order, index) => order === index + 1);
  if (!ordersAreContinuous) {
    errors.push("Section order numbers must be continuous from 1.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
