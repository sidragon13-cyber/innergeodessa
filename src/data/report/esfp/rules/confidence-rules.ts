import type {
  ReportRuleDefinition,
} from "../../rules";

export const ESFP_CONFIDENCE_RULES:
  readonly ReportRuleDefinition[] = [
    averageRule(
      "esfp-confidence-average-low",
      15,
      0,
      15,
      "Low Average Confidence",
      "Average confidence falls in the 0–15 range, so the ESFP result should be treated as a provisional hypothesis. Neighbouring preferences may be similarly available, and role, culture, stress, experience, language, or response style may substantially affect the visible pattern. Use the report to generate questions about participation and commitment rather than defend a label. Compare each interpretation with repeated behaviour across settings and give lived evidence priority where the description does not fit.",
      "较低的平均置信度",
      "平均置信度处于 0–15，ESFP 结果应被视为暂定假设。相邻偏好可能同样可用，角色、文化、压力、经历、语言或作答方式都会明显影响外在表现。请用报告提出有关参与和承诺的问题，而不是维护标签；当描述不符时，应优先相信不同情境中反复出现的真实行为。",
    ),
    averageRule(
      "esfp-confidence-average-moderate",
      25,
      16,
      40,
      "Moderate Average Confidence",
      "Average confidence falls in the 16–40 range. Several ESFP themes may be recognisable while adjacent preferences remain readily accessible. Experience generation or verbal participation may appear strongly in one context and less visibly where trust, expertise, energy, or responsibility differs. Read the report for recurring tendencies rather than uniform behaviour, and notice whether opposite approaches reflect learned skill, situational adaptation, or an equally natural option.",
      "中等平均置信度",
      "平均置信度处于 16–40，一些 ESFP 主题可能较易辨认，同时相邻偏好仍能自然使用。体验创造或口头参与会随信任、专业经验、精力与责任而改变。请寻找反复倾向而非一致行为，并分辨相反方式来自后天技能、情境适应，还是同样自然的选择。",
    ),
    averageRule(
      "esfp-confidence-average-strong",
      35,
      41,
      70,
      "Strong Average Confidence",
      "Average confidence falls in the 41–70 range, suggesting that the measured preferences may appear consistently across several familiar settings. ESFP themes can therefore be a useful organising pattern, but consistency is not greater creativity, intelligence, maturity, or adaptability. Strong preferences can create repeatable strengths and blind spots. Use feedback and opposite-preference practices when participation becomes diffusion, invitation reduces trust, or flexibility weakens completion.",
      "较高的平均置信度",
      "平均置信度处于 41–70，测得偏好可能在多个熟悉情境中持续出现。ESFP 主题可作为反思框架，但一致性不代表更高的创造力、智力、成熟度或适应力。明显偏好会同时形成稳定优势与盲点；当参与变得分散、邀请削弱信任或灵活性妨碍完成时，应采用反馈和相反偏好的练习。",
    ),
    averageRule(
      "esfp-confidence-average-very-strong",
      45,
      71,
      100,
      "Very Strong Average Confidence",
      "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly familiar and readily available. This does not mean greater originality, competence, maturity, or immediate moment success. A clear exploratory style can support rapid learning, while overuse may make closure, routine evidence, emotional context, or sustained implementation easier to dismiss. Practise complementary approaches before pressure makes intellectual movement feel like the only valid response.",
      "很高的平均置信度",
      "平均置信度处于 71–100，测得偏好可能非常熟悉且容易调用。这不表示更有原创性、能力、成熟度或更容易取得即时成功。清晰的探索方式有利于快速学习，过度使用却可能轻视收尾、日常证据、情绪情境或持续实施；应在压力让思维流动显得像唯一正确反应前练习互补方式。",
    ),
    balancedRule(
      "esfp-balanced-count-1",
      110,
      1,
      "One Balanced Dimension",
      "At least one dimension is exactly balanced. The ESFP pattern may remain useful, but that letter should not be treated as fixed. Behaviour may change with role, group size, trust, task, energy, or environment. This flexibility can broaden participation and execution options rather than weaken the result. Notice which conditions draw out each side before making assumptions about sociability, abstraction, values, or spontaneity.",
      "一个平衡维度",
      "至少一个维度完全平衡。ESFP 模式仍可参考，但该字母不应被视为固定。行为会随角色、群体规模、信任、任务、精力或环境变化；这种弹性会拓宽参与和执行选择，而非削弱结果。对社交性、抽象思考、价值判断或自发性作出推断前，请观察哪些条件会带出每一侧。",
    ),
    balancedRule(
      "esfp-balanced-count-2",
      120,
      2,
      "Two Balanced Dimensions",
      "At least two dimensions are exactly balanced, so the result is likely to describe a blended and context-sensitive pattern rather than a rigid four-letter identity. The ESFP participant may shift between interactive and private participation, imaginative and concrete evidence, different decision criteria, or openness and closure. Use the ESFP report as a comparison framework and give repeated behaviour, values, skill, and context more weight than type stereotypes.",
      "两个平衡维度",
      "至少两个维度完全平衡，因此结果更可能描述混合且受情境影响的模式，而非僵化的四字母身份。ESFP 可能在互动与独处参与、想象与具体证据、不同决策标准、开放与收尾之间转换。请把报告当作比较框架，让反复行为、价值、技能和情境比类型刻板印象更有分量。",
    ),
    balancedRule(
      "esfp-balanced-count-3",
      130,
      3,
      "Three or More Balanced Dimensions",
      "Three or more dimensions are exactly balanced, making the ESFP result highly provisional and sensitive to context. Multiple approaches may be similarly accessible, and small response changes could produce a neighbouring code. This may support flexibility, but it limits firm claims about how the ESFP participant explores, decides, communicates, or completes work. Test each report theme against lived evidence and avoid consequential choices based on the type result alone.",
      "三个或更多平衡维度",
      "三个或更多维度完全平衡，使 ESFP 结果高度暂定且对情境敏感。多种方式可能同样容易使用，作答的小幅变化就可能产生相邻代码。这会支持灵活性，却限制了对探索、决策、沟通或完成工作的确定判断；应以生活证据检验每个主题，避免仅凭类型结果作出重大选择。",
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
    personalityType: "ESFP",
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
        targetSlotId: "esfp-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    exclusiveGroup: "esfp-average-confidence",
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
    personalityType: "ESFP",
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
        targetSlotId: "esfp-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    exclusiveGroup: "esfp-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
