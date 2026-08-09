import type { DimensionRuleCondition, ReportRuleDefinition } from "../../rules";

export const ISFJ_COMBINATION_RULES: readonly ReportRuleDefinition[] = [
  combinationRule(
    "isfj-combination-quiet-support",
    90,
    [
      dimension("EI", ["I"], ["strong", "very-strong"]),
      dimension("TF", ["F"], ["strong", "very-strong"]),
    ],
    "core-personality-pattern",
    "isfj-combination-care-structure",
    "Quiet Support and Private Needs",
    "Strong I and F preferences can combine into a quiet support pattern: the person may process privately, notice relational needs, and express care through thoughtful action rather than public discussion. This can create deep trust in a small number of dependable relationships. A possible cost is that personal needs remain unspoken while attention stays focused on others. Schedule private recovery before overload, and translate one internal concern into a direct request while it is still specific and manageable.",
    "安静支持与个人需要",
    "较强的 I 与 F 偏好可能结合成安静支持模式：个人在内心处理经验、注意关系需要，并通过用心行动而不是公开讨论表达关怀。这能在少数可靠关系中建立深厚信任。潜在代价是，注意力持续放在他人身上，个人需要却没有说出口。应在过载前安排独处恢复，并趁一项内在顾虑仍具体可控时，把它转化为直接请求。",
  ),
  combinationRule(
    "isfj-combination-care-structure",
    89,
    [
      dimension("SN", ["S"], ["strong", "very-strong"]),
      dimension("JP", ["J"], ["strong", "very-strong"]),
    ],
    "core-personality-pattern",
    "isfj-combination-care-structure",
    "Continuity Through Detail and Structure",
    "Strong S and J preferences can support dependable execution through concrete evidence, remembered precedent, planning, and follow-through. The person may be especially effective at preserving service quality and preventing practical details from being lost. The same combination can turn established duties into rigid obligations, even when conditions have changed. Keep the desired outcome stable while reviewing whether the current routine remains necessary, fairly owned, and supported by current evidence over time.",
    "通过细节与结构维持连续性",
    "较强的 S 与 J 偏好能够借助具体证据、记住的先例、规划与跟进来支持可靠执行。个人可能尤其擅长维护服务质量，并防止实际细节遗失。同一组合也可能把既有职责变成僵化义务，即使条件已经改变。可保持期望结果稳定，同时定期检查当前常规是否仍有必要、责任分配是否公平，以及是否仍得到当前证据支持。",
  ),
  combinationRule(
    "isfj-combination-boundary-risk",
    88,
    [
      dimension("TF", ["F"], ["strong", "very-strong"]),
      dimension("JP", ["J"], ["strong", "very-strong"]),
    ],
    "growth-roadmap",
    "isfj-combination-boundary-risk",
    "Responsibility Toward People",
    "Strong F and J preferences may make relational responsibility feel both personally meaningful and morally binding. The person can become highly dependable because care is translated into plans and completed commitments. Risk rises when disappointing someone feels worse than exceeding personal capacity, leading to over-commitment or delayed limits. Before agreeing, separate compassion from ownership: confirm what the other person needs, what you can sustainably provide, and which responsibility should be shared or declined.",
    "对人的责任",
    "较强的 F 与 J 偏好，可能使关系责任既具有个人意义，又像一种道德约束。关怀被转化为计划与完成的承诺，因此个人会非常可靠。当让他人失望比超出自身能力更难承受时，过度承诺或延后设限的风险就会上升。答应之前，应区分同理心与责任归属：确认对方需要什么、自己能持续提供什么，以及哪些责任应共同承担或拒绝。",
  ),
  combinationRule(
    "isfj-combination-flexible-social-decisions",
    87,
    [
      dimension("EI", ["I", "E", "X"], ["borderline", "balanced"]),
      dimension("TF", ["F", "T", "X"], ["borderline", "balanced"]),
    ],
    "growth-roadmap",
    "isfj-combination-boundary-risk",
    "Flexible Style by Role and Trust",
    "Borderline or balanced EI and TF results suggest that both social expression and decision criteria may shift with role, trust, and context. The person may coordinate visibly in one setting, process privately in another, and move between relational and analytical reasoning without contradiction. This flexibility is useful when it is conscious. Name which role and criterion are active before a difficult decision so adaptation does not become automatic accommodation or leave personal preferences unclear.",
    "随角色与信任变化的弹性风格",
    "EI 与 TF 处于临界或平衡状态，意味着社交表达和决策标准都可能随角色、信任与情境变化。个人可以在一个环境中公开协调，在另一个环境中独自处理，并在关系推理与分析推理之间自然移动。这种弹性在有意识使用时最有价值。困难决策前，应说清当前角色与判断标准，避免适应变成自动迁就，或让个人偏好始终不明确。",
  ),
  combinationRule(
    "isfj-combination-situational-structure",
    86,
    [
      dimension("SN", ["S", "N", "X"], ["borderline", "balanced"]),
      dimension("JP", ["J", "P", "X"], ["borderline", "balanced"]),
    ],
    "change-and-adaptation",
    "isfj-combination-change-flexibility",
    "Practical and Situationally Adaptable",
    "Borderline or balanced SN and JP results may combine practical grounding with situational flexibility. The person can use concrete evidence without insisting on precedent and can add structure when consequences require it without organising every task in advance. This supports adaptation, especially when expectations and minimum standards remain clear. Use explicit decision points: define what must stay reliable, what can remain open, and when new evidence will trigger a change in approach.",
    "务实且能因情境调整",
    "SN 与 JP 处于临界或平衡状态，可能把务实基础与情境弹性结合起来。个人能够使用具体证据而不坚持先例，也能在后果需要时增加结构，却不必预先安排每项任务。这有利于适应，尤其当期待与最低标准保持清晰时。应设置明确决策点：界定什么必须可靠、什么可以保持开放，以及新证据何时触发方法变化。",
  ),
  aggregateCombinationRule(
    "isfj-combination-provisional-profile",
    85,
    "low-confidence-count",
    3,
    "change-and-adaptation",
    "isfj-combination-change-flexibility",
    "A Provisional, Blended Profile",
    "Three or more low-confidence dimensions indicate that the type result should be read as provisional and blended. Situational behaviour, response style, or genuinely accessible neighbouring preferences may be shaping the code. The report remains useful when treated as a set of hypotheses rather than a fixed portrait. Compare selected rules with repeated real-world examples, avoid using the result to close options, and revisit interpretation if later evidence consistently supports a different pattern.",
    "暂定而混合的特征模式",
    "三个或更多低置信度维度表示，这一类型结果应被理解为暂定且混合。情境行为、作答方式或确实容易调用的相邻偏好，都可能影响类型代码。只要把报告视为一组假设而非固定画像，它仍具有价值。应将选中的规则与反复出现的现实案例比较，避免用结果关闭选项；如果后续证据持续支持不同模式，就重新审视解读。",
  ),
  combinationRule(
    "isfj-combination-private-planning",
    84,
    [
      dimension("JP", ["J"], ["strong", "very-strong"]),
      dimension("EI", ["I"], ["strong", "very-strong"]),
    ],
    "growth-roadmap",
    "isfj-combination-boundary-risk",
    "Private Planning and Self-Contained Duty",
    "Strong J and I preferences may support careful private planning and self-contained responsibility. The person can prepare thoroughly and sustain commitments without requiring frequent external direction. A risk is waiting too long to request help because the plan, concern, and workload remain internal. Make ownership visible before execution begins, schedule a check-in before the pressure point, and ask for a specific contribution rather than presenting a problem only after every independent option has been exhausted.",
    "私人规划与独自承担责任",
    "较强的 J 与 I 偏好可能支持细致的私人规划和独立承担责任。个人无需频繁外部指导，也能充分准备并维持承诺。风险在于计划、顾虑与工作量都留在内部，因此过晚才求助。执行前应让责任归属可见，在压力临界点前安排沟通，并具体请求一项贡献，而不是直到所有独立方案耗尽后才提出问题。",
  ),
  combinationRule(
    "isfj-combination-possibility-adaptation",
    83,
    [
      dimension(
        "SN",
        ["N"],
        ["borderline", "moderate", "strong", "very-strong"],
      ),
      dimension(
        "JP",
        ["P"],
        ["borderline", "moderate", "strong", "very-strong"],
      ),
    ],
    "change-and-adaptation",
    "isfj-combination-change-flexibility",
    "Possibility and Adaptation Within Responsibility",
    "N-leaning and P-leaning results may bring greater openness to themes, possibilities, and changing routes within a responsibility-oriented ISFJ profile. The person may preserve commitment to people and outcomes while experimenting more readily with how those outcomes are achieved. This does not imply mistyping. The practical opportunity is to pair exploration with clear minimum standards, short review cycles, and evidence about who benefits over time, so flexibility remains purposeful rather than diffuse.",
    "在责任框架中探索可能与调整",
    "偏向 N 与 P 的结果，可能让以责任为核心的 ISFJ 模式对主题、可能性与变化路径更加开放。个人可以继续承诺于人和结果，同时更愿意试验不同实现方式。这不代表类型判断错误。实际机会在于，让探索配合清晰的最低标准、较短复盘周期，以及长期谁会受益的证据，使弹性保持明确目的而不至于分散。",
  ),
];

function dimension(
  dimensionCode: DimensionRuleCondition["dimension"],
  preferences: NonNullable<DimensionRuleCondition["preferences"]>,
  bands: NonNullable<DimensionRuleCondition["bands"]>,
): DimensionRuleCondition {
  return {
    kind: "dimension",
    dimension: dimensionCode,
    preferences,
    bands,
  };
}

function combinationRule(
  id: string,
  priority: number,
  all: DimensionRuleCondition[],
  targetSectionId: string,
  targetSlotId: string,
  title: string,
  content: string,
  titleZh: string,
  contentZh: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "ISFJ",
    priority,
    conditions: [{ kind: "combination", all }],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    tags: ["combination"],
  };
}

function aggregateCombinationRule(
  id: string,
  priority: number,
  metric: "low-confidence-count",
  value: number,
  targetSectionId: string,
  targetSlotId: string,
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
        metric,
        operator: "gte",
        value,
      },
    ],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title, zh: titleZh },
        content: { en: content, zh: contentZh },
      },
    ],
    tags: ["combination"],
  };
}
