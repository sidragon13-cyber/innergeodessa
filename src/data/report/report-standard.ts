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
      title: { en: "Report Identity" },
      description: {
        en: "Identifies the report, personality type, and interpretation context.",
      },
      contentBlocks: [],
    },
    {
      id: "personality-overview",
      order: 2,
      category: "overview",
      access: "free",
      title: { en: "Personality Overview" },
      description: {
        en: "Provides a concise overview of the personality pattern.",
      },
      contentBlocks: [],
    },
    {
      id: "dimension-results",
      order: 3,
      category: "dimensions",
      access: "free",
      title: { en: "Dimension Results" },
      description: {
        en: "Summarises the four assessment dimension results.",
      },
      contentBlocks: [],
    },
    {
      id: "key-strengths",
      order: 4,
      category: "strengths",
      access: "free",
      title: { en: "Key Strengths" },
      description: {
        en: "Highlights the personality pattern's key strengths.",
      },
      contentBlocks: [],
    },
    {
      id: "growth-risks",
      order: 5,
      category: "growth-risks",
      access: "free",
      title: { en: "Growth Risks" },
      description: {
        en: "Introduces likely growth risks and development priorities.",
      },
      contentBlocks: [],
    },
    {
      id: "core-personality-pattern",
      order: 6,
      category: "core-pattern",
      access: "premium",
      title: { en: "Core Personality Pattern" },
      description: {
        en: "Explains the integrated structure of the personality pattern.",
      },
      contentBlocks: [],
    },
    {
      id: "motivation-and-needs",
      order: 7,
      category: "motivation",
      access: "premium",
      title: { en: "Motivation and Core Needs" },
      description: {
        en: "Examines recurring motivations, needs, and sources of engagement.",
      },
      contentBlocks: [],
    },
    {
      id: "information-processing",
      order: 8,
      category: "information-processing",
      access: "premium",
      title: { en: "Information Processing" },
      description: {
        en: "Describes how information is noticed, organised, and interpreted.",
      },
      contentBlocks: [],
    },
    {
      id: "decision-making",
      order: 9,
      category: "decision-making",
      access: "premium",
      title: { en: "Decision-Making Pattern" },
      description: {
        en: "Explores characteristic decision-making priorities and trade-offs.",
      },
      contentBlocks: [],
    },
    {
      id: "communication",
      order: 10,
      category: "communication",
      access: "premium",
      title: { en: "Communication and Conflict" },
      description: {
        en: "Examines communication preferences and responses to conflict.",
      },
      contentBlocks: [],
    },
    {
      id: "teamwork-and-leadership",
      order: 11,
      category: "teamwork-leadership",
      access: "premium",
      title: { en: "Teamwork and Leadership" },
      description: {
        en: "Explores contributions to teams and characteristic leadership patterns.",
      },
      contentBlocks: [],
    },
    {
      id: "career-environment",
      order: 12,
      category: "career",
      access: "premium",
      title: { en: "Career Environment" },
      description: {
        en: "Describes work environments that support effective contribution.",
      },
      contentBlocks: [],
    },
    {
      id: "relationship-dynamics",
      order: 13,
      category: "relationships",
      access: "premium",
      title: { en: "Relationship Dynamics" },
      description: {
        en: "Explores recurring interpersonal needs and relationship patterns.",
      },
      contentBlocks: [],
    },
    {
      id: "change-and-adaptation",
      order: 14,
      category: "change-adaptation",
      access: "premium",
      title: { en: "Change and Adaptation" },
      description: {
        en: "Examines responses to uncertainty, transition, and changing demands.",
      },
      contentBlocks: [],
    },
    {
      id: "stress-and-recovery",
      order: 15,
      category: "stress-recovery",
      access: "premium",
      title: { en: "Stress and Recovery" },
      description: {
        en: "Identifies likely stress patterns and supportive recovery practices.",
      },
      contentBlocks: [],
    },
    {
      id: "growth-roadmap",
      order: 16,
      category: "growth-roadmap",
      access: "premium",
      title: { en: "Personal Growth Roadmap" },
      description: {
        en: "Organises development priorities into a practical growth sequence.",
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
      title: { en: "Methodology and Interpretation Notes" },
      description: {
        en: "Documents the report methodology and responsible interpretation guidance.",
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
