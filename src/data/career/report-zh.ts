import type {
  CareerReportBlock,
  CareerReportSection,
} from "./report";
import type {
  RiasecResultContract,
} from "./result-contract";
import type {
  RiasecDimension,
} from "./types";

type ChineseDimensionDetail = {
  motivation: string;
  workStyle: string;
  environment: string;
  strengths: readonly string[];
  risks: readonly string[];
  skills: readonly string[];
  fields: readonly string[];
  roles: readonly string[];
};

const DETAILS_ZH: Record<
  RiasecDimension,
  ChineseDimensionDetail
> = {
  R: {
    motivation:
      "看得见的进展、实际问题解决、直接使用工具或物理系统，以及能够在现实中检验的成果。",
    workStyle:
      "你可能更喜欢通过实践学习，把想法放到现实条件中检验，维修或改进系统，并在明确的操作约束下工作。",
    environment:
      "具有实际产出、设备或现场活动、明确安全标准，并允许独立解决具体问题的工作环境。",
    strengths: [
      "把抽象计划转化为可执行的现实成果",
      "理解工具、设备、流程和空间关系",
      "面对实际问题时保持务实和行动导向",
      "通过观察、练习和技术反馈学习",
    ],
    risks: [
      "在理解实际价值前过早忽视沟通或理论",
      "在会议和抽象讨论占主导的工作中缺乏动力",
      "只处理眼前故障而忽视反复出现的系统原因",
    ],
    skills: [
      "技术素养",
      "安全与质量控制",
      "设备或现场方法",
      "运营故障排查",
      "项目执行",
    ],
    fields: [
      "工程与技术运营",
      "建筑与基础设施",
      "环境现场工作",
      "制造与维护",
      "农业与自然资源",
    ],
    roles: [
      "工程技术员",
      "现场运营专员",
      "环境现场工作人员",
      "建筑项目协调员",
      "技术服务专员",
      "质量与维护规划人员",
    ],
  },

  I: {
    motivation:
      "复杂问题、证据、数据、独立研究、智力挑战，以及理解系统为什么会以某种方式运行。",
    workStyle:
      "你可能自然地定义问题、收集证据、比较解释、识别规律，并在信息充分前避免过早下结论。",
    environment:
      "重视证据、能够接触信息、提供专注时间、坚持高质量推理，并允许质疑薄弱假设的组织。",
    strengths: [
      "把复杂问题拆解为可以验证的问题",
      "谨慎处理数据、证据与不同解释",
      "识别规律和结构性原因",
      "独立学习并建立深度专业能力",
    ],
    risks: [
      "在已有足够信息可以行动时继续分析",
      "没有充分表达自己认为显而易见的结论",
      "偏好有趣的智力问题而忽视紧迫的现实需要",
    ],
    skills: [
      "研究设计",
      "数据分析",
      "批判性推理",
      "科学沟通",
      "建模与问题定义",
    ],
    fields: [
      "科学与研究",
      "数据与分析",
      "技术与系统",
      "健康与实验室科学",
      "环境与地理空间分析",
    ],
    roles: [
      "研究分析师",
      "数据分析师",
      "环境科学家",
      "地理空间分析师",
      "商业智能分析师",
      "研发专员",
    ],
  },

  A: {
    motivation:
      "原创表达、想象、设计、故事、实验，以及以独特方式传递思想或创造价值的自由。",
    workStyle:
      "你可能善于提出多种方案、连接不同领域的思想、感受审美和情绪特征，并抗拒完全没有解释空间的方法。",
    environment:
      "重视原创、减少不必要一致性，并允许通过可见作品验证创意的灵活环境。",
    strengths: [
      "产生原创概念和替代方案",
      "通过设计、语言、图像、叙事或体验进行沟通",
      "识别意义、语气与审美一致性",
      "在没有唯一答案的问题中灵活调整",
    ],
    risks: [
      "执行进入重复阶段后失去动力",
      "因为结构让人感到受限而排斥有用规则",
      "形成创意后没有验证受众是否真正需要",
    ],
    skills: [
      "设计思维",
      "创意制作",
      "故事表达",
      "视觉传播",
      "概念开发",
    ],
    fields: [
      "设计与创意产业",
      "媒体与传播",
      "品牌与内容战略",
      "建筑与空间设计",
      "数字产品体验",
    ],
    roles: [
      "品牌策略师",
      "内容设计师",
      "创意制作人",
      "用户体验或产品设计师",
      "作家或编辑",
      "视觉传播专员",
    ],
  },

  S: {
    motivation:
      "帮助他人成长、教学、指导、改善福祉、建立信任，以及看到他人获得信心和能力。",
    workStyle:
      "你可能会关注他人的需要，耐心解释信息，促进合作，并把人的成长视为成功的重要组成部分。",
    environment:
      "尊重合作、重视关系、服务具有明确意义，并认可情绪劳动边界的工作环境。",
    strengths: [
      "建立信任与心理安全感",
      "解释、教学、辅导并支持成长",
      "理解利益相关者需要和人际关系",
      "连接个人关注与更大的团队目标",
    ],
    risks: [
      "替他人承担本应由对方负责的结果",
      "为了维持和谐而回避必要边界",
      "在持续承受情绪需求的岗位中耗竭",
    ],
    skills: [
      "教学与引导",
      "利益相关者沟通",
      "辅导",
      "冲突处理",
      "服务设计",
    ],
    fields: [
      "教育与培训",
      "健康与社区服务",
      "人力资源",
      "客户成功",
      "社会发展",
    ],
    roles: [
      "学习与发展专员",
      "教师或培训师",
      "客户成功经理",
      "社区项目协调员",
      "人力资源顾问",
      "职业发展顾问",
    ],
  },

  E: {
    motivation:
      "影响力、主动性、商业机会、领导、谈判、决策，以及把想法转化为协调行动。",
    workStyle:
      "你可能自然地确定方向、调动人员与资源、表达有说服力的方案，并在信息不完整时作出决定。",
    environment:
      "节奏较快、责任清晰、拥有实际决策权、成果可衡量，并允许主动发起行动的环境。",
    strengths: [
      "把机会转化为有组织的行动",
      "说服、谈判并建立利益相关者支持",
      "作出决定并对结果承担责任",
      "连接资源、人员和目标",
    ],
    risks: [
      "行动速度超过证据或执行能力",
      "过度重视可见影响力而低估安静的专业能力",
      "因为机会带来动力而同时承担过多项目",
    ],
    skills: [
      "领导力",
      "谈判",
      "商业分析",
      "战略沟通",
      "业务发展",
    ],
    fields: [
      "商业与创业",
      "管理与领导",
      "销售与商业战略",
      "咨询",
      "公共事务与组织发展",
    ],
    roles: [
      "业务发展经理",
      "创业者",
      "管理顾问",
      "商业策略师",
      "产品经理",
      "合作伙伴经理",
    ],
  },

  C: {
    motivation:
      "秩序、准确性、可靠信息、规划、设计良好的流程，以及能够稳定重复执行的系统。",
    workStyle:
      "你可能善于整理信息、监控细节、建立流程、发现不一致，并通过结构减少可以避免的错误。",
    environment:
      "标准明确、信息可靠、责任清晰，并允许改进低效流程的稳定和可问责环境。",
    strengths: [
      "准确整理复杂信息",
      "建立可靠流程与控制机制",
      "跟踪承诺、记录和运营细节",
      "在重复工作中建立一致性",
    ],
    risks: [
      "在流程已失去原有目的后仍继续维持",
      "在实验需要暂时不确定性时感到不适",
      "只关注局部准确性而忽视战略环境变化",
    ],
    skills: [
      "流程设计",
      "财务与行政素养",
      "质量保证",
      "项目协调",
      "信息管理",
    ],
    fields: [
      "财务与会计",
      "运营与行政",
      "合规与治理",
      "项目管理",
      "信息与档案管理",
    ],
    roles: [
      "运营分析师",
      "项目协调员",
      "合规专员",
      "财务分析师",
      "质量保证专员",
      "业务流程分析师",
    ],
  },
};

const NAME_ZH: Record<
  RiasecDimension,
  string
> = {
  R: "现实型",
  I: "研究型",
  A: "艺术型",
  S: "社会型",
  E: "企业型",
  C: "常规型",
};

function list(items: readonly string[]): string {
  return items.map((item) => `• ${item}`).join("\n");
}

function unique(
  items: readonly string[],
): string[] {
  return [...new Set(items)];
}

function block(
  id: string,
  type: CareerReportBlock["type"],
  title: string,
  content: string,
): CareerReportBlock {
  return {
    id,
    type,
    title,
    content,
  };
}

export function generateCareerReportSectionsZh(
  result: RiasecResultContract,
): CareerReportSection[] {
  const [
    primary,
    secondary,
    tertiary,
    fourth,
  ] = result.ranking;

  if (
    !primary ||
    !secondary ||
    !tertiary ||
    !fourth
  ) {
    throw new Error(
      "生成职业报告需要完整的六维排名。",
    );
  }

  const topThree = [
    primary,
    secondary,
    tertiary,
  ];

  const fields = unique(
    topThree.flatMap(
      (dimension) =>
        DETAILS_ZH[dimension].fields,
    ),
  );
  const roles = unique(
    topThree.flatMap(
      (dimension) =>
        DETAILS_ZH[dimension].roles,
    ),
  );
  const skills = unique(
    topThree.flatMap(
      (dimension) =>
        DETAILS_ZH[dimension].skills,
    ),
  );
  const strengths = unique(
    topThree.flatMap(
      (dimension) =>
        DETAILS_ZH[dimension].strengths,
    ),
  );
  const risks = unique(
    topThree.flatMap(
      (dimension) =>
        DETAILS_ZH[dimension].risks,
    ),
  );

  const answered = Object.values(
    result.answered,
  ).reduce(
    (total, value) => total + value,
    0,
  );

  const rankingText = result.ranking
    .map(
      (dimension, index) =>
        `${index + 1}. ${
          NAME_ZH[dimension]
        }（${dimension}）— ${Math.round(
          result.percentages[dimension],
        )}% · 得分 ${
          result.scores[dimension]
        }`,
    )
    .join("\n");

  return [
    {
      id: "report-identity",
      order: 1,
      title: "你的职业兴趣报告",
      description:
        "如何理解并合理使用你的 RIASEC 结果。",
      blocks: [
        block(
          "identity-summary",
          "summary",
          `${result.code}：你当前的职业兴趣模式`,
          `你的结果由${NAME_ZH[primary]}（${primary}）、${NAME_ZH[secondary]}（${secondary}）和${NAME_ZH[tertiary]}（${tertiary}）组成。\n\n这个代码描述的是目前能够吸引你的活动、问题、人员、环境和成果类型。它不是诊断，也不是智力测量，更不是限制你只能从事少数职业的规则。`,
        ),
      ],
    },

    {
      id: "result-profile",
      order: 2,
      title: "结果档案",
      description:
        "从数量角度理解你的六个职业兴趣维度。",
      blocks: [
        block(
          "result-ranking",
          "analysis",
          "完整兴趣排名",
          rankingText,
        ),
        block(
          "result-differentiation",
          "analysis",
          "如何理解维度之间的差距",
          "第一和第二维度之间的差距反映主导兴趣是否明显；第三和第四维度之间的差距反映三字母代码的边界是否清晰。分数接近时，应把结果理解为混合模式，而不是强行选择一个唯一主导维度。",
        ),
      ],
    },

    {
      id: "code-overview",
      order: 3,
      title: "理解你的 RIASEC 代码",
      description:
        "第一、第二和第三个字母分别发挥什么作用。",
      blocks: topThree.map(
        (dimension, index) =>
          block(
            `code-${dimension.toLowerCase()}`,
            "analysis",
            `${
              index === 0
                ? "主要兴趣"
                : index === 1
                  ? "辅助兴趣"
                  : "第三兴趣"
            }：${NAME_ZH[dimension]}`,
            `${DETAILS_ZH[dimension].motivation}\n\n${DETAILS_ZH[dimension].workStyle}`,
          ),
      ),
    },

    {
      id: "combination-analysis",
      order: 4,
      title: "你的兴趣组合",
      description:
        "三个领先兴趣维度如何共同影响职业选择。",
      blocks: [
        block(
          "combination-narrative",
          "summary",
          `${result.code} 作为一个综合模式`,
          `你的兴趣组合同时包含${NAME_ZH[primary]}、${NAME_ZH[secondary]}和${NAME_ZH[tertiary]}。\n\n合适的职业通常不是由职位名称决定，而是取决于日常任务和组织环境是否允许这些兴趣共同发挥作用。`,
        ),
        block(
          "combination-tension",
          "guidance",
          "管理兴趣组合中的张力",
          "混合代码可能包含有价值的内部张力：一个维度重视速度，另一个重视证据；一个追求灵活，另一个需要秩序。不要把这些差异视为矛盾，而应根据具体情境选择合适的工作模式。",
        ),
      ],
    },

    {
      id: "work-style",
      order: 5,
      title: "可能偏好的工作方式",
      description:
        "你可能如何处理任务、责任和问题。",
      blocks: topThree.map(
        (dimension, index) =>
          block(
            `work-style-${dimension.toLowerCase()}`,
            "analysis",
            `${index + 1}. ${NAME_ZH[dimension]}的作用`,
            DETAILS_ZH[dimension].workStyle,
          ),
      ),
    },

    {
      id: "work-environment",
      order: 6,
      title: "偏好的工作环境",
      description:
        "哪些条件可能支持长期动力与稳定表现。",
      blocks: [
        block(
          "environment-fit",
          "summary",
          "工作环境与职业名称同样重要",
          topThree
            .map(
              (dimension) =>
                `${NAME_ZH[dimension]}：${DETAILS_ZH[dimension].environment}`,
            )
            .join("\n\n"),
        ),
        block(
          "environment-check",
          "guidance",
          "接受岗位前值得提出的问题",
          "• 每周有多少时间用于真正吸引我的活动？\n• 岗位包含多少自主性、结构、合作和不确定性？\n• 六个月和十二个月后的成功标准是什么？\n• 组织是否奖励我希望作出的贡献？\n• 职位描述中最吸引人的部分在日常工作中实际出现多少？",
        ),
      ],
    },

    {
      id: "strengths",
      order: 7,
      title: "潜在职业优势",
      description:
        "你的兴趣模式可能推动你发展的能力。",
      blocks: [
        block(
          "strength-list",
          "strength",
          "容易自然投入的领域",
          list(strengths.slice(0, 10)),
        ),
        block(
          "strength-limitation",
          "guidance",
          "兴趣不等于能力",
          "较高的兴趣分数意味着你更可能愿意投入注意力和练习，但不能保证已经具备技能。应通过项目、资格、作品、可量化成果和真实反馈，把潜在优势转化为证据。",
        ),
      ],
    },

    {
      id: "development-risks",
      order: 8,
      title: "发展风险与盲点",
      description:
        "偏好方式在什么情况下可能变成限制。",
      blocks: [
        block(
          "risk-list",
          "risk",
          "需要关注的风险",
          list(risks.slice(0, 9)),
        ),
        block(
          "risk-balance",
          "guidance",
          "把排名较低的维度发展为支持能力",
          `排名较低的维度是${result.ranking
            .slice(3)
            .map(
              (dimension) =>
                NAME_ZH[dimension],
            )
            .join("、")}。排名较低不代表没有能力，这些维度可以帮助平衡领先兴趣，并提升可靠性、合作、沟通、创造、证据意识或执行能力。`,
        ),
      ],
    },

    {
      id: "career-fields",
      order: 9,
      title: "值得探索的职业领域",
      description:
        "领先兴趣可能出现在哪些广泛领域。",
      blocks: [
        block(
          "field-list",
          "summary",
          "相关职业类别",
          list(fields),
        ),
        block(
          "field-guidance",
          "guidance",
          "先探索领域，再选择职位名称",
          "先从广泛职业领域开始，再研究具体岗位中的真实任务。同一个职位名称在不同产业和组织中，可能代表完全不同的日常工作。",
        ),
      ],
    },

    {
      id: "role-options",
      order: 10,
      title: "示例岗位",
      description:
        "可能包含你领先兴趣元素的职业。",
      blocks: [
        block(
          "role-list",
          "summary",
          "用于进一步研究的岗位",
          list(roles.slice(0, 15)),
        ),
        block(
          "role-warning",
          "guidance",
          "这些岗位用于探索，而不是直接推荐",
          "不要只因为某个职业出现在报告中就作出选择。还应核实入职要求、当地市场需求、收入范围、工作条件、晋升路径、自动化风险、地理限制和真实日常任务。",
        ),
      ],
    },

    {
      id: "skills-roadmap",
      order: 11,
      title: "技能与学习路线图",
      description:
        "把兴趣转化为可就业价值所需要的能力。",
      blocks: [
        block(
          "skill-list",
          "summary",
          "优先发展能力",
          list(skills),
        ),
        block(
          "skill-plan",
          "action",
          "建立能力证据，而不只是积累知识",
          "为每项优先技能建立一个可以展示的成果，例如作品集项目、分析报告、设计、技术成果、演示、流程改进、现场报告、案例研究、证书或可衡量的工作结果。",
        ),
      ],
    },

    {
      id: "decision-framework",
      order: 12,
      title: "职业决策框架",
      description:
        "用结构化方法比较不同机会。",
      blocks: [
        block(
          "decision-scorecard",
          "guidance",
          "从六个因素为每个选项评分",
          "用1–5分评价每个职业选项：\n\n1. 兴趣匹配——工作会多频繁地使用你的领先 RIASEC 维度？\n2. 能力匹配——你是否具备或能够现实地建立所需技能？\n3. 价值观匹配——工作是否支持你重视的结果？\n4. 环境匹配——节奏、结构、人员和条件是否适合你？\n5. 机会——是否存在真实需求、收入潜力和发展空间？\n6. 可行性——你是否能够满足时间、成本、资格和地点要求？",
        ),
      ],
    },

    {
      id: "ninety-day-plan",
      order: 13,
      title: "90天职业行动计划",
      description:
        "把报告转化为证据和实际决定。",
      blocks: [
        block(
          "days-1-30",
          "action",
          "第1–30天：调查",
          "选择三个职业领域和五个岗位，阅读至少十份真实招聘信息，识别反复出现的要求，并与两位相关从业者交流。记录哪些日常任务会增强或降低你的兴趣。",
        ),
        block(
          "days-31-60",
          "action",
          "第31–60天：测试",
          "完成一个模拟真实工作的实践项目，尽可能使用真实工具或数据。获取外部反馈，并评价自己是否喜欢实际过程，而不只是喜欢职业的概念或社会地位。",
        ),
        block(
          "days-61-90",
          "action",
          "第61–90天：决定并建设",
          "确定一个主要方向和一个备用方向，明确下一项资格、技能、作品证明、申请目标或工作实验，并设定可衡量的六个月里程碑。",
        ),
      ],
    },

    {
      id: "methodology",
      order: 14,
      title: "方法与局限",
      description:
        "测评衡量什么，以及应如何解释报告。",
      blocks: [
        block(
          "methodology-scoring",
          "analysis",
          "结果如何生成",
          `本次测评共回答 ${answered} 道题，覆盖六个 RIASEC 维度。每个维度被转换为百分比并进行排序，排名前三的维度组成 ${result.code} 代码。分数相同时，系统按照固定维度顺序处理，以保证结果稳定一致。`,
        ),
        block(
          "methodology-limitations",
          "risk",
          "重要局限",
          "本报告不是临床诊断、心理治疗、能力测试、职业成功保证，也不能替代专业教育或就业建议。结果可能受到当前经验、语言、职业接触程度、社会期待、情绪和个人理解方式影响。",
        ),
        block(
          "methodology-review",
          "guidance",
          "把结果视为需要验证的工作假设",
          "只有在获得重要新经验后才有必要重新测评，不要反复测试以寻找自己偏好的代码。最有力的验证来自长期现实行为：你持续选择、练习、完成、承受并在新鲜感消失后仍愿意继续的事情。",
        ),
      ],
    },
  ];
}
