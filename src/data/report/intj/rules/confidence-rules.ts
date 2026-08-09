import type {
  ReportRuleDefinition,
} from "../../rules";

const INTJ_CONFIDENCE_I18N: Record<
  string,
  { title: string; content: string }
> = {
  "intj-confidence-average-low": {
    title: "平均置信度较低",
    content:
      "平均置信度处于 0–15 区间，因此 INTJ 结果应被视为一个暂定假设。相邻偏好可能同样容易被使用，而角色、文化、压力、经验、语言或作答方式都可能显著影响外在表现。请把报告作为检验战略思考与独立倾向的工具，而不是用来维护一个固定身份。当类型描述与现实不一致时，应优先相信长期、反复出现的真实生活证据。",
  },
  "intj-confidence-average-moderate": {
    title: "平均置信度中等",
    content:
      "平均置信度处于 16–40 区间。部分 INTJ 特征可能已经较容易识别，但相邻偏好仍然能够被自然调用。长期架构思考或个人内部加工可能在某些角色中十分明显，而当信任、权限、精力或专业经验发生变化时则不那么突出。阅读报告时应关注反复出现的倾向，而不是要求行为始终一致，并观察相反方式究竟来自情境、后天能力，还是本身同样自然。",
  },
  "intj-confidence-average-strong": {
    title: "平均置信度较强",
    content:
      "平均置信度处于 41–70 区间，说明测得的偏好可能在多个熟悉情境中较稳定地出现。因此 INTJ 主题可以作为反思框架，但稳定性并不意味着更高的智力、成熟度、战略能力或胜任力。较强偏好既可能形成可重复优势，也可能形成稳定盲点。当独立变成孤立、逻辑一致变成过早确定，或质量要求开始拖延行动时，应主动寻找反证并练习互补方式。",
  },
  "intj-confidence-average-very-strong": {
    title: "平均置信度非常强",
    content:
      "平均置信度处于 71–100 区间，因此这些偏好很可能让你感觉高度熟悉，并能够自然使用。但这并不意味着拥有更强的预见力、能力、成熟度或更高成功概率。清晰的战略风格能够支持长期专注，但过度使用也可能使协作、当前细节、情绪证据或迭代式发布更容易被忽视。在压力使个人模型显得像唯一可信路径之前，应有意识地练习互补方法。",
  },
  "intj-balanced-count-1": {
    title: "一个维度完全平衡",
    content:
      "至少有一个维度处于完全平衡状态。INTJ 模式仍然可以作为有用参考，但该维度对应的字母不应被视为固定特征。实际行为可能随着角色、信任、任务、精力或环境而变化。这种灵活性可以扩大战略和关系选择，而不是削弱测试结果。请观察什么条件会分别激活两侧偏好，再判断自己在独处、抽象思考、决策标准或结构方面的真实倾向。",
  },
  "intj-balanced-count-2": {
    title: "两个维度完全平衡",
    content:
      "至少两个维度处于完全平衡状态，因此结果很可能呈现出更混合、更依赖情境的模式。你可能根据现实需要，在内部与外部加工、抽象与具体证据、不同决策标准，以及结构与灵活性之间切换。应把 INTJ 报告作为比较和反思框架，并让长期重复行为、价值观、真实能力和具体情境证据获得比人格刻板印象更高的权重。",
  },
  "intj-balanced-count-3": {
    title: "三个或更多维度完全平衡",
    content:
      "三个或更多维度处于完全平衡状态，因此 INTJ 结果应被视为高度暂定、并且非常容易受到情境影响。多种处理方式可能同样容易被调用，少量作答变化也可能产生相邻的人格代码。这种状态可能带来更高灵活性，但也限制了我们对战略、决策、沟通或规划方式作出强结论的依据。请把每个主题都与真实生活证据进行验证，并避免仅凭类型结果作出重要决定。",
  },
};

export const INTJ_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "intj-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the INTJ result should be treated as a provisional hypothesis. Neighbouring preferences may be similarly available, and role, culture, stress, experience, language, or response style may substantially affect the visible pattern. Use the report to test questions about strategy and independence rather than defend a fixed identity. Give repeated lived evidence priority where the type-level description does not fit.",
    ),
    averageRule(
      "intj-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. Several INTJ themes may be recognisable while adjacent preferences remain readily accessible. Long-range architecture or private processing may be visible in one role and less prominent where trust, authority, energy, or expertise differs. Read the report for recurring tendencies rather than uniform behaviour, and notice whether opposite approaches reflect context, developed skill, or an equally natural option.",
    ),
    averageRule(
      "intj-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences may appear consistently across several familiar settings. INTJ themes can therefore organise reflection, but consistency is not greater intelligence, maturity, strategic ability, or competence. Strong preferences can create repeatable strengths and blind spots. Use disconfirming evidence and complementary practices when independence becomes isolation, coherence becomes certainty, or quality becomes delay.",
    ),
    averageRule(
      "intj-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly familiar and readily available. This does not mean greater foresight, competence, maturity, or success. A clear strategic style can support concentration, while overuse may make collaboration, current detail, emotional evidence, or iterative release easier to dismiss. Practise complementary approaches before pressure makes the private model feel like the only credible route.",
    ),
    balancedRule(
      "intj-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. The INTJ pattern may remain useful, but that letter should not be treated as fixed. Behaviour may change with role, trust, task, energy, or environment. This flexibility can broaden strategic and relational options rather than weaken the result. Notice which conditions draw out each side before making assumptions about privacy, abstraction, criteria, or structure.",
    ),
    balancedRule(
      "intj-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced, so the result is likely to describe a blended and context-sensitive pattern. The person may move between private and visible processing, abstract and concrete evidence, different decision criteria, or structure and flexibility depending on circumstances. Use the INTJ report as a comparison framework and give repeated behaviour, values, capability, and situational evidence more weight than stereotypes.",
    ),
    balancedRule(
      "intj-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, making the INTJ result highly provisional and sensitive to context. Multiple approaches may be similarly accessible, and small response changes could produce a neighbouring code. This may support flexibility, but it limits firm claims about how the person strategises, decides, communicates, or plans. Test each theme against lived evidence and avoid consequential choices based on the type result alone.",
    ),
  ];

function averageRule(
  id: string,
  priority: number,
  minimum: number,
  maximum: number,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "INTJ",
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
        targetSlotId: "intj-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: {
          en: title,
          zh: INTJ_CONFIDENCE_I18N[id].title,
        },
        content: {
          en: content,
          zh: INTJ_CONFIDENCE_I18N[id].content,
        },
      },
    ],
    exclusiveGroup: "intj-average-confidence",
    tags: ["confidence", "average-confidence"],
  };
}

function balancedRule(
  id: string,
  priority: number,
  minimum: number,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "INTJ",
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
        targetSlotId: "intj-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: {
          en: title,
          zh: INTJ_CONFIDENCE_I18N[id].title,
        },
        content: {
          en: content,
          zh: INTJ_CONFIDENCE_I18N[id].content,
        },
      },
    ],
    exclusiveGroup: "intj-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
