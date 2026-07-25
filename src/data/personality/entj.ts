import type { PersonalityProfile } from "./types";

export const entjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",

  type: "ENTJ",

  identity: {
    name: {
      en: "Commander",
    },
    shortName: {
      en: "Strategic Leader",
    },
    tagline: {
      en: "Strategic thinker · Goal driver · Natural organiser",
    },
    keywords: {
      en: [
        "Strategy",
        "Leadership",
        "Efficiency",
        "Decision-making",
        "Execution",
        "Organisation",
        "Vision",
        "Growth",
      ],
    },
  },

  overview: {
    headline: {
      en:
        "Able to recognise direction, build systems, and move people toward long-term goals.",
    },

    paragraphs: {
      en: [
        "ENTJs often demonstrate strong strategic awareness, goal orientation, and leadership tendencies. They are skilled at identifying critical issues in complex environments, recognising inefficiencies, and creating clearer structures, priorities, and execution plans.",

        "They tend to focus on long-term outcomes rather than isolated tasks. When faced with ambiguity or disorder, ENTJs often take responsibility for decision-making, organise resources, assign responsibilities, and move teams toward a defined objective.",

        "ENTJs usually evaluate situations through facts, logic, and expected outcomes. They value competence, efficiency, and continuous improvement, and they are often more interested in improving systems than simply maintaining existing processes.",

        "When balanced, ENTJs can become visionary leaders, entrepreneurs, and drivers of organisational change. Under prolonged pressure, however, they may become impatient, overly forceful, or less attentive to the emotions, pace, and relationship needs of others.",
      ],
    },

    summary: {
      en:
        "The defining strength of an ENTJ is the ability to identify direction, create structure, and move people and resources toward meaningful goals.",
    },

    access: "free",
  },

  coreTraits: [
    {
      id: "strategic-vision",
      title: {
        en: "Strategic Vision",
      },
      description: {
        en:
          "Focuses on long-term possibilities and is skilled at identifying opportunities, risks, and important patterns within complex information.",
      },
    },
    {
      id: "natural-organiser",
      title: {
        en: "Natural Organiser",
      },
      description: {
        en:
          "Naturally creates structure, clarifies responsibilities, sets priorities, and brings order to uncertain or disorganised situations.",
      },
    },
    {
      id: "decisive-execution",
      title: {
        en: "Decisive Execution",
      },
      description: {
        en:
          "Prefers action and measurable progress over prolonged discussion and is often willing to make difficult decisions.",
      },
    },
    {
      id: "logical-directness",
      title: {
        en: "Logical and Direct",
      },
      description: {
        en:
          "Evaluates situations through evidence and logic and communicates with clarity, although this directness may sometimes feel intense to others.",
      },
    },
  ],

  strengths: [
    {
      id: "leadership",
      title: {
        en: "Strong Leadership",
      },
      description: {
        en:
          "Creates direction, defines standards, and moves teams forward through structure, accountability, and clear goals.",
      },
    },
    {
      id: "strategic-thinking",
      title: {
        en: "Strategic Thinking",
      },
      description: {
        en:
          "Recognises long-term opportunities, systemic relationships, and potential risks beyond immediate circumstances.",
      },
    },
    {
      id: "problem-solving",
      title: {
        en: "Complex Problem Solving",
      },
      description: {
        en:
          "Identifies root causes, breaks down difficult problems, and designs solutions that can be implemented.",
      },
    },
    {
      id: "goal-orientation",
      title: {
        en: "Goal Orientation",
      },
      description: {
        en:
          "Maintains a clear sense of direction and is willing to invest sustained effort in meaningful objectives.",
      },
    },
    {
      id: "decision-making",
      title: {
        en: "Decisive Judgement",
      },
      description: {
        en:
          "Makes timely decisions when sufficient information is available and accepts responsibility for the outcome.",
      },
    },
    {
      id: "resource-integration",
      title: {
        en: "Resource Integration",
      },
      description: {
        en:
          "Coordinates people, information, time, and capital around a shared objective.",
      },
    },
  ],

  growthRisks: [
    {
      id: "over-control",
      title: {
        en: "Over-Control",
      },
      description: {
        en:
          "When outcomes feel important, ENTJs may take control of too many details and reduce the autonomy of others.",
      },
      growthAction: {
        en:
          "Define the expected result clearly, then use scheduled reviews instead of continuous intervention.",
      },
    },
    {
      id: "emotional-neglect",
      title: {
        en: "Overlooking Emotional Context",
      },
      description: {
        en:
          "A strong focus on goals and efficiency may cause them to underestimate the role of trust, emotion, and relationships.",
      },
      growthAction: {
        en:
          "Before offering a solution, confirm the other person's concerns, feelings, and practical circumstances.",
      },
    },
    {
      id: "impatience",
      title: {
        en: "Impatience with Inefficiency",
      },
      description: {
        en:
          "Slow progress, unclear communication, or indecision may quickly become frustrating.",
      },
      growthAction: {
        en:
          "Distinguish between a skills problem, an information problem, and a motivation problem before responding.",
      },
    },
    {
      id: "overconfidence",
      title: {
        en: "Overconfidence in Judgement",
      },
      description: {
        en:
          "Strong reasoning and decision-making ability may lead to underestimating missing information or alternative viewpoints.",
      },
      growthAction: {
        en:
          "Actively search for evidence that challenges the preferred conclusion before making high-impact decisions.",
      },
    },
    {
      id: "harsh-standards",
      title: {
        en: "Excessively High Standards",
      },
      description: {
        en:
          "ENTJs may expect others to match their own pace, resilience, and level of responsibility.",
      },
      growthAction: {
        en:
          "Set expectations according to the role, experience level, and resources available to each person.",
      },
    },
    {
      id: "work-imbalance",
      title: {
        en: "Work-Life Imbalance",
      },
      description: {
        en:
          "A strong drive for progress may lead to neglecting rest, health, and important personal relationships.",
      },
      growthAction: {
        en:
          "Treat recovery as part of the performance system rather than as a reward after all work is complete.",
      },
    },
  ],

  careerGroups: [
    {
      id: "management-strategy",
      category: {
        en: "Management and Strategy",
      },
      description: {
        en:
          "Suitable for roles that require setting direction, integrating resources, taking responsibility, and leading long-term execution.",
      },
      roles: {
        en: [
          "Chief Executive Officer",
          "Chief Operating Officer",
          "General Manager",
          "Operations Director",
          "Strategy Director",
          "Management Consultant",
          "Programme Director",
          "Business Transformation Lead",
        ],
      },
    },
    {
      id: "business-finance",
      category: {
        en: "Business and Finance",
      },
      description: {
        en:
          "Suitable for measurable, decision-intensive environments that require commercial judgement and risk assessment.",
      },
      roles: {
        en: [
          "Investment Manager",
          "Financial Analyst",
          "Risk Manager",
          "Business Development Manager",
          "Sales Director",
          "Commercial Director",
          "Market Strategy Lead",
          "Mergers and Acquisitions Adviser",
        ],
      },
    },
    {
      id: "technology-entrepreneurship",
      category: {
        en: "Technology and Entrepreneurship",
      },
      description: {
        en:
          "Suitable for work that combines technology, products, organisations, and markets to turn innovation into scalable outcomes.",
      },
      roles: {
        en: [
          "Entrepreneur",
          "Product Director",
          "Technology Director",
          "Research and Development Lead",
          "Digital Transformation Lead",
          "Technical Programme Manager",
          "Innovation Director",
          "Enterprise Architect",
        ],
      },
    },
    {
      id: "law-public-affairs",
      category: {
        en: "Law and Public Affairs",
      },
      description: {
        en:
          "Suitable for roles involving logical argument, institutional design, negotiation, and long-term public influence.",
      },
      roles: {
        en: [
          "Lawyer",
          "Legal Counsel",
          "Policy Analyst",
          "Political Adviser",
          "Public Affairs Director",
          "Government Programme Lead",
          "Governance Consultant",
          "International Relations Adviser",
        ],
      },
    },
  ],

  careerNotice: {
    en:
      "Personality type alone should not determine a career decision. Career development also depends on abilities, interests, values, education, industry conditions, available resources, and personal goals.",
  },

  premiumPreview: {
    headline: {
      en: "Unlock Your Complete Personality Report",
    },

    introduction: {
      en:
        "The full report will combine your four-dimension scores, preference strength, response patterns, and future career-interest data to produce a deeper and more personalised analysis.",
    },

    sections: [
      {
        id: "deep-structure",
        title: {
          en: "Deep Personality Structure",
        },
        description: {
          en:
            "Understand the strength of each preference, your blended traits, and why your responses produced this result.",
        },
        access: "premium",
      },
      {
        id: "decision-style",
        title: {
          en: "Thinking and Decision-Making",
        },
        description: {
          en:
            "Explore how you collect information, evaluate risk, handle uncertainty, and make important decisions.",
        },
        access: "premium",
      },
      {
        id: "leadership",
        title: {
          en: "Leadership and Teamwork",
        },
        description: {
          en:
            "Analyse your leadership style, delegation habits, team strengths, and potential management blind spots.",
        },
        access: "premium",
      },
      {
        id: "communication",
        title: {
          en: "Communication and Relationships",
        },
        description: {
          en:
            "Understand your communication style, conflict patterns, and methods for building more effective relationships.",
        },
        access: "premium",
      },
      {
        id: "stress-pattern",
        title: {
          en: "Stress Patterns and Recovery",
        },
        description: {
          en:
            "Identify behavioural changes under pressure, warning signs, and recovery strategies suited to your profile.",
        },
        access: "premium",
      },
      {
        id: "career-matching",
        title: {
          en: "Career and Work Environment Fit",
        },
        description: {
          en:
            "Explore suitable roles, organisational environments, leadership levels, entrepreneurial potential, and career risks.",
        },
        access: "premium",
      },
      {
        id: "growth-plan",
        title: {
          en: "Personal Growth Plan",
        },
        description: {
          en:
            "Receive practical development recommendations across 30-day, 90-day, and one-year stages.",
        },
        access: "premium",
      },
      {
        id: "pdf-report",
        title: {
          en: "Complete PDF Report",
        },
        description: {
          en:
            "Save your complete analysis for future reference, personal development, and cross-device access.",
        },
        access: "premium",
      },
    ],

    callToAction: {
      en: "Unlock Full Report",
    },
  },

  metadata: {
    assessmentModel: "MBTI_STYLE",
    contentVersion: "1.0.0",
    reviewed: true,
    availableLocales: ["en"],
  },
};
