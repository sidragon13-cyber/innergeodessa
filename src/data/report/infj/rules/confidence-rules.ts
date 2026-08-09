import type {
  ReportRuleDefinition,
} from "../../rules";

export const INFJ_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "infj-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the INFJ result should be treated as a provisional hypothesis. Neighbouring preferences may be similarly available, and role, culture, stress, experience, language, or response style may substantially affect the visible pattern. Use the report to test questions about guidance and independence rather than defend a fixed identity. Give repeated lived evidence priority where the type-level description does not fit.",
      "平均置信度较低",
      "平均置信度处于 0–15 范围，因此 INFJ 结果应视为暂定假设。相邻偏好可能同样容易调用，角色、文化、压力、经验、语言或作答方式也会显著影响外在模式。应使用报告检验有关引导与独立性的问题，而不是捍卫固定身份；类型描述不符合时，应优先相信反复出现的生活证据。",
    ),
    averageRule(
      "infj-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. Several INFJ themes may be recognisable while adjacent preferences remain readily accessible. Long-range meaning framework or private processing may be visible in one role and less prominent where trust, authority, energy, or expertise differs. Read the report for recurring tendencies rather than uniform behaviour, and notice whether opposite approaches reflect context, developed skill, or an equally natural option.",
      "平均置信度中等",
      "平均置信度处于 16–40 范围。若干 INFJ 主题可能可以辨认，同时相邻偏好仍容易调用。长期意义框架或私人处理在某个角色中可能明显，在信任、权限、精力或专长不同之处则较弱。阅读时应寻找重复倾向，而非期待一致行为，并判断相反方式来自情境、后天技能，还是同样自然的选择。",
    ),
    averageRule(
      "infj-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences may appear consistently across several familiar settings. INFJ themes can therefore organise reflection, but consistency is not greater intelligence, maturity, purposeful ability, or competence. Strong preferences can create repeatable strengths and blind spots. Use disconfirming evidence and complementary practices when independence becomes isolation, coherence becomes certainty, or quality becomes delay.",
      "平均置信度较强",
      "平均置信度处于 41–70 范围，说明测得偏好可能在多个熟悉情境中稳定出现。INFJ 主题可以帮助组织反思，但一致性不代表更高智力、成熟度、使命能力或胜任力。较强偏好会形成可重复的优势与盲点；当独立变成隔离、一致性变成确定性或质量变成拖延时，应主动引入反证和互补实践。",
    ),
    averageRule(
      "infj-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly familiar and readily available. This does not mean greater foresight, competence, maturity, or success. A clear purposeful style can support concentration, while overuse may make collaboration, current detail, emotional evidence, or iterative release easier to dismiss. Practise complementary approaches before pressure makes the private model feel like the only credible route.",
      "平均置信度很强",
      "平均置信度处于 71–100 范围，测得偏好可能高度熟悉且随时可用。这不代表更强远见、能力、成熟度或成功。清晰的使命风格能支持专注，过度使用却可能轻视协作、当前细节、情绪证据或迭代发布。应在压力让私人模型显得像唯一可信路径前练习互补方式。",
    ),
    balancedRule(
      "infj-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. The INFJ pattern may remain useful, but that letter should not be treated as fixed. Behaviour may change with role, trust, task, energy, or environment. This flexibility can broaden purposeful and relational options rather than weaken the result. Notice which conditions draw out each side before making assumptions about privacy, abstraction, values and consequences, or structure.",
      "一个平衡维度",
      "至少一个维度完全平衡。INFJ 模式仍可能有用，但该字母不应被视为固定。行为会随角色、信任、任务、精力或环境改变；这种弹性会拓宽使命与关系选项，而不是削弱结果。对私人处理、抽象、价值后果或结构作出假设前，应先观察哪些条件会引出每一侧。",
    ),
    balancedRule(
      "infj-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced, so the result is likely to describe a blended and context-sensitive pattern. The person may move between private and visible processing, abstract and concrete evidence, different decision values and consequences, or structure and flexibility depending on circumstances. Use the INFJ report as a comparison framework and give repeated behaviour, values, capability, and situational evidence more weight than stereotypes.",
      "两个平衡维度",
      "至少两个维度完全平衡，因此结果可能描述混合且对情境敏感的模式。个人可随环境在私人和公开处理、抽象和具体证据、不同决策价值与后果，或结构和弹性之间移动。应把 INFJ 报告作为比较框架，让重复行为、价值、能力与情境证据比刻板印象拥有更高权重。",
    ),
    balancedRule(
      "infj-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, making the INFJ result highly provisional and sensitive to context. Multiple approaches may be similarly accessible, and small response changes could produce a neighbouring code. This may support flexibility, but it limits firm claims about how the person strategises, decides, communicates, or plans. Test each theme against lived evidence and avoid consequential choices based on the type result alone.",
      "三个或更多平衡维度",
      "三个或更多维度完全平衡，使 INFJ 结果高度暂定且依赖情境。多种方式可能同样可用，作答上的小变化也会产生相邻代码。这能支持弹性，却限制对个人如何规划、决策、沟通或安排工作的确定断言。应用生活证据检验每个主题，避免只依据类型结果作出重大选择。",
    ),
  ];

function averageRule(
  id: string,
  priority: number,
  minimum: number,
  maximum: number,
  title: string,
  content: string,
  titleZh: string,
  contentZh: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "INFJ",
    priority,
    conditions: [
      {
        kind: "aggregate",
        metric: "average-confidence",
        operator: "gte",
        value: minimum,
      },
      {
        kind: "aggregate",
        metric: "average-confidence",
        operator: "lte",
        value: maximum,
      },
    ],
    content: [
      {
        targetSectionId: "dimension-results",
        targetSlotId: "infj-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    exclusiveGroup: "infj-average-confidence",
    tags: ["confidence", "average-confidence"],
  };
}

function balancedRule(
  id: string,
  priority: number,
  minimum: number,
  title: string,
  content: string,
  titleZh: string,
  contentZh: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "INFJ",
    priority,
    conditions: [
      {
        kind: "aggregate",
        metric: "balanced-count",
        operator: "gte",
        value: minimum,
      },
    ],
    content: [
      {
        targetSectionId: "core-personality-pattern",
        targetSlotId: "infj-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    exclusiveGroup: "infj-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
