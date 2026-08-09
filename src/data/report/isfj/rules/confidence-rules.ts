import type { ReportRuleDefinition } from "../../rules";

export const ISFJ_CONFIDENCE_RULES: readonly ReportRuleDefinition[] = [
  averageRule(
    "isfj-confidence-average-low",
    15,
    0,
    15,
    "Low Average Confidence",
    "Average confidence falls in the 0–15 range, so the four-letter result should be interpreted cautiously. Adjacent preferences may appear often, and situational behaviour, current stress, language, or response style may have influenced the pattern. The ISFJ report can still be useful as a working hypothesis: compare each section with lived examples, retain what is consistently helpful, and treat mismatches as evidence rather than failure. Avoid forcing a rigid identity around a result whose dimensions currently show limited differentiation.",
    "平均置信度较低",
    "平均置信度处于 0–15 范围，因此应谨慎解读四字母结果。相邻偏好可能经常出现，情境行为、当前压力、语言或作答方式也可能影响这一模式。ISFJ 报告仍可作为工作假设使用：把每个章节与真实经历比较，保留持续有帮助的内容，并把不相符之处视为证据，而不是失败。当前各维度区分度有限，不宜围绕这一结果建立僵化身份。",
  ),
  averageRule(
    "isfj-confidence-average-moderate",
    25,
    16,
    40,
    "Moderate Average Confidence",
    "Average confidence falls in the 16–40 range. The ISFJ pattern is likely to be recognisable, while neighbouring preferences may remain accessible in ordinary situations. Some sections may fit strongly and others only under particular roles or relationships. Use the report to identify repeatable tendencies rather than expecting uniform behaviour. Practical reflection should ask when the preference appears, what conditions strengthen it, and whether an opposite approach is a learned skill, a contextual adaptation, or an equally natural option.",
    "平均置信度中等",
    "平均置信度处于 16–40 范围。ISFJ 模式可能已经可以辨认，而相邻偏好在日常情境中仍容易被调用。有些章节可能高度符合，另一些只在特定角色或关系中出现。应使用报告识别可重复的倾向，而不是期待行为始终一致。实际反思可询问：偏好何时出现、什么条件会加强它，以及相反方式是后天技能、情境适应，还是同样自然的选项。",
  ),
  averageRule(
    "isfj-confidence-average-strong",
    35,
    41,
    70,
    "Strong Average Confidence",
    "Average confidence falls in the 41–70 range, suggesting that the measured preferences appear with meaningful consistency. The report's ISFJ themes may therefore provide a useful organising pattern across several contexts. Consistency does not remove flexibility, and it does not indicate greater ability. Strong preferences can support dependable strengths while also making certain blind spots easier to repeat. Use opposite-preference strategies deliberately when the usual approach is producing overload, narrow evidence, or avoidable conflict.",
    "平均置信度较强",
    "平均置信度处于 41–70 范围，说明测得偏好具有明显一致性。因此，报告中的 ISFJ 主题可能在多个情境中提供有用的组织框架。一致性不会消除弹性，也不代表能力更强。较强偏好能够支持可靠优势，也可能让某些盲点反复出现。当惯常方式造成过载、证据范围狭窄或可避免的冲突时，应有意识地采用相反偏好的策略。",
  ),
  averageRule(
    "isfj-confidence-average-very-strong",
    45,
    71,
    100,
    "Very Strong Average Confidence",
    "Average confidence falls in the 71–100 range, so the measured preferences are likely to feel highly consistent and readily available. This does not mean greater ability, maturity, or a better personality result. A very clear style can make strengths dependable, but it can also increase the cost of overusing familiar strategies. Read the report for both capability and constraint: preserve what works, seek feedback about recurring blind spots, and practise opposite approaches in low-risk settings before they are required under pressure.",
    "平均置信度很强",
    "平均置信度处于 71–100 范围，因此测得偏好可能高度一致且随时可用。这不代表能力更强、更加成熟或人格结果更好。非常清晰的风格能让优势可靠，也会提高过度使用熟悉策略的代价。阅读报告时应同时关注能力与限制：保留有效做法，主动获取有关重复盲点的反馈，并在低风险环境中练习相反方式，以免直到压力下才被迫使用。",
  ),
  balancedRule(
    "isfj-balanced-count-1",
    110,
    1,
    "One Balanced Dimension",
    "At least one dimension is exactly balanced. This suggests meaningful flexibility in that area and reduces confidence in treating every letter of the four-letter code as a fixed preference. Behaviour may change with role, trust, task, or environment. Use the ISFJ pattern as a broad organising hypothesis while giving the balanced dimension its own contextual interpretation. Notice which conditions draw out each side and whether the shift is chosen, skilled, or driven by pressure.",
    "一个平衡维度",
    "至少一个维度完全平衡。这说明该领域具有明显弹性，也降低了把四字母代码中的每个字母都视为固定偏好的可信度。行为可能随角色、信任、任务或环境变化。可把 ISFJ 模式作为宽泛的组织假设，同时根据情境单独解读平衡维度。留意什么条件会引出每一侧，以及这种转换是自主选择、熟练运用，还是压力驱动。",
  ),
  balancedRule(
    "isfj-balanced-count-2",
    120,
    2,
    "Two Balanced Dimensions",
    "At least two dimensions are exactly balanced. The result may describe a blended and context-sensitive pattern rather than a sharply bounded type. This can support flexibility because several approaches are readily available, but it also means a rigid four-letter description may overstate consistency. Compare report themes with concrete settings and relationships over time. Give greater weight to repeated behaviour and personal values than to assumptions attached to any single letter.",
    "两个平衡维度",
    "至少两个维度完全平衡。结果可能描述的是混合且对情境敏感的模式，而不是边界鲜明的类型。多种方式容易被调用，能够支持弹性；但这也意味着僵化的四字母描述可能夸大一致性。应长期把报告主题与具体环境和关系比较，并赋予重复行为和个人价值观更高权重，而不是依赖任何单一字母附带的假设。",
  ),
  balancedRule(
    "isfj-balanced-count-3",
    130,
    3,
    "Three or More Balanced Dimensions",
    "Three or more dimensions are exactly balanced, so the ISFJ label should be treated as provisional and highly context-sensitive. Multiple approaches may be similarly available, and small changes in responses could produce a neighbouring type code. This flexibility can be valuable, yet it reduces the usefulness of rigid type claims. Use the report as a structured set of questions, test each theme against lived evidence, and avoid making major decisions from the four-letter result alone.",
    "三个或更多平衡维度",
    "三个或更多维度完全平衡，因此 ISFJ 标签应被视为暂定且高度依赖情境。多种方式可能同样容易调用，作答上的小变化就可能产生相邻类型代码。这种弹性具有价值，却会降低僵化类型断言的效用。把报告作为一组结构化问题，用生活证据检验每个主题，并避免只依据四字母结果作出重大决定。",
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
    personalityType: "ISFJ",
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
        targetSlotId: "isfj-overall-confidence",
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    exclusiveGroup: "isfj-average-confidence",
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
    personalityType: "ISFJ",
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
        targetSlotId: "isfj-balanced-dimensions",
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    exclusiveGroup: "isfj-balanced-count",
    tags: ["confidence", "balanced-count"],
  };
}
