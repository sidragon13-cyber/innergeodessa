import type {
  AssessmentOption,
  AssessmentQuestion,
} from "../schema";

const RIASEC_CONTENT_VERSION = "0.1.0";

const interestOptions: readonly AssessmentOption[] = Object.freeze([
  Object.freeze({
    value: 1,
    label: {
      en: "Strongly dislike",
      zh: "非常不喜欢",
    },
  }),
  Object.freeze({
    value: 2,
    label: {
      en: "Dislike",
      zh: "不喜欢",
    },
  }),
  Object.freeze({
    value: 3,
    label: {
      en: "Neutral",
      zh: "一般",
    },
  }),
  Object.freeze({
    value: 4,
    label: {
      en: "Like",
      zh: "喜欢",
    },
  }),
  Object.freeze({
    value: 5,
    label: {
      en: "Strongly like",
      zh: "非常喜欢",
    },
  }),
]);

type RiasecDimension = "R" | "I" | "A" | "S" | "E" | "C";

type RiasecQuestionDefinition = {
  id: string;
  order: number;
  dimension: RiasecDimension;
  en: string;
  zh: string;
};

const questionDefinitions: readonly RiasecQuestionDefinition[] = [
  // Cycle 1
  {
    id: "riasec-r-01",
    order: 1,
    dimension: "R",
    en: "Build or assemble a physical object.",
    zh: "制作或组装一个实体物品。",
  },
  {
    id: "riasec-i-01",
    order: 2,
    dimension: "I",
    en: "Investigate why a system or process is not working.",
    zh: "研究一个系统或流程为什么没有正常运作。",
  },
  {
    id: "riasec-a-01",
    order: 3,
    dimension: "A",
    en: "Create an original visual design.",
    zh: "创作一个原创视觉设计。",
  },
  {
    id: "riasec-s-01",
    order: 4,
    dimension: "S",
    en: "Help someone understand a difficult idea.",
    zh: "帮助他人理解一个较难的概念。",
  },
  {
    id: "riasec-e-01",
    order: 5,
    dimension: "E",
    en: "Persuade people to support an idea or project.",
    zh: "说服他人支持一个想法或项目。",
  },
  {
    id: "riasec-c-01",
    order: 6,
    dimension: "C",
    en: "Organise information into a clear and reliable system.",
    zh: "将信息整理成清晰可靠的系统。",
  },

  // Cycle 2
  {
    id: "riasec-r-02",
    order: 7,
    dimension: "R",
    en: "Use tools or equipment to complete a practical task.",
    zh: "使用工具或设备完成一项实际任务。",
  },
  {
    id: "riasec-i-02",
    order: 8,
    dimension: "I",
    en: "Analyse data to identify patterns or explanations.",
    zh: "分析数据以寻找规律或解释。",
  },
  {
    id: "riasec-a-02",
    order: 9,
    dimension: "A",
    en: "Write a story, article, script, or other creative text.",
    zh: "创作故事、文章、剧本或其他创意文字。",
  },
  {
    id: "riasec-s-02",
    order: 10,
    dimension: "S",
    en: "Listen to someone and help them work through a problem.",
    zh: "倾听他人的问题并帮助其寻找解决办法。",
  },
  {
    id: "riasec-e-02",
    order: 11,
    dimension: "E",
    en: "Lead a team toward a challenging goal.",
    zh: "带领团队实现一个具有挑战性的目标。",
  },
  {
    id: "riasec-c-02",
    order: 12,
    dimension: "C",
    en: "Check records carefully for errors or inconsistencies.",
    zh: "仔细检查记录中的错误或不一致之处。",
  },

  // Cycle 3
  {
    id: "riasec-r-03",
    order: 13,
    dimension: "R",
    en: "Repair or improve a machine, device, or physical structure.",
    zh: "维修或改进机器、设备或实体结构。",
  },
  {
    id: "riasec-i-03",
    order: 14,
    dimension: "I",
    en: "Research a complex question before reaching a conclusion.",
    zh: "在得出结论前深入研究一个复杂问题。",
  },
  {
    id: "riasec-a-03",
    order: 15,
    dimension: "A",
    en: "Experiment with new ways to express an idea.",
    zh: "尝试用新的方式表达一个想法。",
  },
  {
    id: "riasec-s-03",
    order: 16,
    dimension: "S",
    en: "Teach or demonstrate a skill to another person.",
    zh: "向他人教授或示范一项技能。",
  },
  {
    id: "riasec-e-03",
    order: 17,
    dimension: "E",
    en: "Negotiate an agreement between people with different priorities.",
    zh: "在诉求不同的人之间协商达成一致。",
  },
  {
    id: "riasec-c-03",
    order: 18,
    dimension: "C",
    en: "Follow a detailed procedure to complete work accurately.",
    zh: "按照详细流程准确完成工作。",
  },

  // Cycle 4
  {
    id: "riasec-r-04",
    order: 19,
    dimension: "R",
    en: "Work outdoors with land, plants, animals, or natural resources.",
    zh: "在户外与土地、植物、动物或自然资源打交道。",
  },
  {
    id: "riasec-i-04",
    order: 20,
    dimension: "I",
    en: "Compare several possible explanations for an event.",
    zh: "比较一个事件的多种可能解释。",
  },
  {
    id: "riasec-a-04",
    order: 21,
    dimension: "A",
    en: "Develop the style, appearance, or creative direction of a project.",
    zh: "设计一个项目的风格、外观或创意方向。",
  },
  {
    id: "riasec-s-04",
    order: 22,
    dimension: "S",
    en: "Support a group in communicating and working together.",
    zh: "帮助一个团队更好地沟通与合作。",
  },
  {
    id: "riasec-e-04",
    order: 23,
    dimension: "E",
    en: "Present a proposal to clients, investors, or decision-makers.",
    zh: "向客户、投资者或决策者介绍一项方案。",
  },
  {
    id: "riasec-c-04",
    order: 24,
    dimension: "C",
    en: "Create schedules, records, or plans that keep work on track.",
    zh: "制定日程、记录或计划，使工作有序推进。",
  },

  // Cycle 5
  {
    id: "riasec-r-05",
    order: 25,
    dimension: "R",
    en: "Test a physical product to see whether it works correctly.",
    zh: "测试一个实体产品是否能够正常工作。",
  },
  {
    id: "riasec-i-05",
    order: 26,
    dimension: "I",
    en: "Use scientific or logical methods to solve a problem.",
    zh: "使用科学或逻辑方法解决问题。",
  },
  {
    id: "riasec-a-05",
    order: 27,
    dimension: "A",
    en: "Produce music, photography, video, illustration, or performance.",
    zh: "创作音乐、摄影、视频、插画或表演作品。",
  },
  {
    id: "riasec-s-05",
    order: 28,
    dimension: "S",
    en: "Guide someone in making a learning or career decision.",
    zh: "指导他人作出学习或职业方面的决定。",
  },
  {
    id: "riasec-e-05",
    order: 29,
    dimension: "E",
    en: "Start a new project, service, campaign, or business activity.",
    zh: "发起一个新项目、服务、活动或商业行动。",
  },
  {
    id: "riasec-c-05",
    order: 30,
    dimension: "C",
    en: "Manage budgets, transactions, inventories, or operational records.",
    zh: "管理预算、交易、库存或运营记录。",
  },

  // Cycle 6
  {
    id: "riasec-r-06",
    order: 31,
    dimension: "R",
    en: "Solve a practical problem by working directly with materials.",
    zh: "通过直接使用材料解决一个实际问题。",
  },
  {
    id: "riasec-i-06",
    order: 32,
    dimension: "I",
    en: "Explore how technology, nature, or human systems operate.",
    zh: "探索技术、自然或人类系统如何运作。",
  },
  {
    id: "riasec-a-06",
    order: 33,
    dimension: "A",
    en: "Turn an abstract concept into a distinctive creative work.",
    zh: "将一个抽象概念转化为独特的创意作品。",
  },
  {
    id: "riasec-s-06",
    order: 34,
    dimension: "S",
    en: "Work in a role focused on people's growth or wellbeing.",
    zh: "从事以促进他人成长或福祉为重点的工作。",
  },
  {
    id: "riasec-e-06",
    order: 35,
    dimension: "E",
    en: "Make decisions and take responsibility for achieving results.",
    zh: "作出决定并对实现结果承担责任。",
  },
  {
    id: "riasec-c-06",
    order: 36,
    dimension: "C",
    en: "Improve a process so that it becomes more orderly and efficient.",
    zh: "改进一个流程，使其更加有序和高效。",
  },
];

export const riasecQuestionBank: readonly AssessmentQuestion[] =
  Object.freeze(
    questionDefinitions.map((question) =>
      Object.freeze({
        id: question.id,
        module: "riasec" as const,
        order: question.order,
        dimension: question.dimension,
        reverseScored: false,
        prompt: {
          en: question.en,
          zh: question.zh,
        },
        options: interestOptions,
        metadata: {
          contentVersion: RIASEC_CONTENT_VERSION,
          status: "draft" as const,
          reviewed: false,
          notes:
            "Exploratory MVP item. Not yet psychometrically validated.",
        },
      }),
    ),
  );
