import type {
  ReportRuleDefinition,
} from "../../rules";

export const ENTP_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "entp-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the ENTP result should be treated as a provisional hypothesis. Neighbouring preferences may be similarly available, and role, culture, stress, experience, language, or response style may substantially affect the visible pattern. Use the report to generate questions about exploration and commitment rather than defend a label. Compare each interpretation with repeated behaviour across settings and give lived evidence priority where the description does not fit.",
      "平均置信度低",
      "平均置信度处于 0–15，因此应把 ENTP 结果视为暂定假设。相邻偏好可能同样可用，角色、文化、压力、经验、语言或作答方式都可能显著影响外显模式。请用报告生成有关探索与承诺的问题，而不是捍卫标签；以不同情境中反复出现的行为核对每项解读，描述不符时优先相信生活证据。",
    ),
    averageRule(
      "entp-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. Several ENTP themes may be recognisable while adjacent preferences remain readily accessible. Possibility generation or verbal exploration may appear strongly in one context and less visibly where trust, expertise, energy, or responsibility differs. Read the report for recurring tendencies rather than uniform behaviour, and notice whether opposite approaches reflect learned skill, situational adaptation, or an equally natural option.",
      "平均置信度中等",
      "平均置信度处于 16–40。若干 ENTP 主题可能清晰可辨，但相邻偏好仍容易调用。可能性生成或口头探索会在某些情境中明显，在信任、专长、精力或责任不同的情境中较不显眼。阅读时寻找反复倾向而非一致行为，并辨别相反方法来自习得技能、情境适应，还是同样自然的选择。",
    ),
    averageRule(
      "entp-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences may appear consistently across several familiar settings. ENTP themes can therefore be a useful organising pattern, but consistency is not greater creativity, intelligence, maturity, or adaptability. Strong preferences can create repeatable strengths and blind spots. Use feedback and opposite-preference practices when exploration becomes diffusion, challenge reduces trust, or flexibility weakens completion.",
      "平均置信度明显",
      "平均置信度处于 41–70，表示所测偏好可能在多个熟悉情境中稳定出现，因此 ENTP 主题可作为有用的组织框架。但一致性不等于更高的创造力、智力、成熟度或适应力。明显偏好会形成可重复优势与盲点；当探索变得分散、挑战削弱信任，或灵活性妨碍完成时，请运用反馈和相反偏好的练习。",
    ),
    averageRule(
      "entp-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly familiar and readily available. This does not mean greater originality, competence, maturity, or future success. A clear exploratory style can support rapid learning, while overuse may make closure, routine evidence, emotional context, or sustained implementation easier to dismiss. Practise complementary approaches before pressure makes intellectual movement feel like the only valid response.",
      "平均置信度非常明显",
      "平均置信度处于 71–100，因此所测偏好很可能在不同情境中都高度熟悉、随时可用。这不表示更高的原创性、能力、成熟度或未来成功。清晰的探索风格能支持快速学习，过度使用却会让人更容易忽视收束、日常证据、情感背景或持续实施。在压力使思想移动看似唯一有效回应前，练习互补方法。",
    ),
    balancedRule(
      "entp-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. The ENTP pattern may remain useful, but that letter should not be treated as fixed. Behaviour may change with role, group size, trust, task, energy, or environment. This flexibility can broaden exploration and execution options rather than weaken the result. Notice which conditions draw out each side before making assumptions about sociability, abstraction, logic, or spontaneity.",
      "一个维度完全平衡",
      "至少一个维度完全平衡。ENTP 模式仍可能有用，但该字母不应被视为固定。行为会随角色、团队规模、信任、任务、精力或环境改变；这种灵活性能拓宽探索与执行选项，而非削弱结果。在对社交性、抽象思维、逻辑或自发性作出推断前，先观察什么条件会引出每一侧。",
    ),
    balancedRule(
      "entp-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced, so the result is likely to describe a blended and context-sensitive pattern rather than a rigid four-letter identity. The person may shift between interactive and private exploration, conceptual and concrete evidence, different decision criteria, or openness and closure. Use the ENTP report as a comparison framework and give repeated behaviour, values, skill, and context more weight than type stereotypes.",
      "两个维度完全平衡",
      "至少两个维度完全平衡，因此结果更可能描述混合且情境敏感的模式，而非僵化的四字母身份。你可能在互动与独立探索、概念与具体证据、不同决策标准，或开放与收束之间切换。请把 ENTP 报告当作比较框架，让重复行为、价值、技能和情境比类型刻板印象拥有更高权重。",
    ),
    balancedRule(
      "entp-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, making the ENTP result highly provisional and sensitive to context. Multiple approaches may be similarly accessible, and small response changes could produce a neighbouring code. This may support flexibility, but it limits firm claims about how the person explores, decides, communicates, or completes work. Test each report theme against lived evidence and avoid consequential choices based on the type result alone.",
      "三个或更多维度完全平衡",
      "三个或更多维度完全平衡，使 ENTP 结果高度暂定且对情境敏感。多种方法可能同样可用，作答稍有变化便可能得到相邻代码。这会支持灵活性，却限制了对你如何探索、决定、沟通或完成工作的确定断言。请以生活证据检验每项报告主题，避免仅凭类型结果作出影响重大的选择。",
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
    personalityType: "ENTP",
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
        targetSlotId: "entp-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    exclusiveGroup: "entp-average-confidence",
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
    personalityType: "ENTP",
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
        targetSlotId: "entp-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    exclusiveGroup: "entp-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
