import type {
  DimensionRuleCondition,
  ReportRuleDefinition,
} from "../../rules";

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const INFJ_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "infj-combination-private-meaning",
      90,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["N"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "infj-combination-meaning",
      "Private Synthesis and Long-Range Meaning Framework",
      "Strong I and N preferences may support concentrated internal synthesis and a strong orientation to future system patterns. The person can develop an integrated meaning framework without constant external processing. A risk is that evidence and collaborators enter only after the model is advanced. Schedule an early challenge point, share the assumptions rather than only the conclusion, and identify which operational observations could materially change the future direction.",
      "私人综合与长期意义框架",
      "较强的 I 与 N 偏好可能支持集中的内在综合，以及对未来系统模式的强烈关注。个人无需持续外部处理，也能形成整合的意义框架；风险是证据与协作者直到模型相当成熟后才进入。应尽早设置质疑点，分享假设而不只分享结论，并明确哪些运营观察会实质改变未来方向。",
    ),
    combinationRule(
      "infj-combination-structured-guidance",
      89,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "infj-combination-meaning",
      "Future Meaning Framework and Deliberate Structure",
      "Strong N and J preferences may connect a long-range system model with clear sequencing, dependencies, and closure. This can sustain complex work beyond immediate pressure. The same combination can make the chosen meaning framework resistant to contradictory detail or later learning. Version the guidance, specify which assumptions support each structural choice, and establish review triggers before implementation makes adaptation feel like failure.",
      "未来意义框架与审慎结构",
      "较强的 N 与 J 偏好可能把长期系统模型与清晰顺序、依赖关系及定案结合起来，使复杂工作超越眼前压力而持续。同一组合也可能让选定框架抗拒矛盾细节或后续学习。应对引导进行版本管理，说明每项结构选择依赖哪些假设，并在实施使调整显得像失败前建立复核触发条件。",
    ),
    combinationRule(
      "infj-combination-idealised-responsibility",
      88,
      [
        dimension("TF", ["F"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "infj-combination-isolation-risk",
      "Purpose, Care, and Idealised Responsibility",
      "Strong F and J preferences may connect care for people with a strong sense of how a meaningful outcome should unfold. Under pressure, responsibility can expand until the INFJ feels accountable for everyone's development, harmony, or understanding. Name which contribution is genuinely yours, ask others to choose their part, and accept a humane outcome that is good enough. Shared agency protects purpose better than carrying an ideal alone.",
      "使命、关怀与理想化责任",
      "较强的 F 与 J 偏好可能把对人的关怀，与有意义结果应如何展开的明确想法连接起来。压力下，责任可能扩张到 INFJ 感觉必须为所有人的成长、和谐或理解负责。应说明哪些贡献真正属于自己，让他人选择其责任，并接受足够好且人性化的结果；共享能动性比独自背负理想更能保护使命。",
    ),
    combinationRule(
      "infj-combination-contextual-collaboration",
      87,
      [
        dimension("EI", ["I", "E", "X"], [
          "borderline",
          "balanced",
        ]),
        dimension("TF", ["F", "T", "X"], [
          "borderline",
          "balanced",
        ]),
      ],
      "growth-roadmap",
      "infj-combination-isolation-risk",
      "Flexible Collaboration and Decision Values and Consequences",
      "Borderline or balanced EI and TF results suggest that social processing and decision values and consequences may change with trust, role, stakes, and expertise. The person may work privately in one context, architect through dialogue in another, and shift between impersonal standards and stakeholder consequences. Use this range deliberately by designing the evidence conversation the problem requires rather than forcing a solitary or purely reflective image of INFJ work.",
      "弹性协作与决策价值及后果",
      "EI 与 TF 处于临界或平衡状态，说明社交处理方式以及决策价值与后果会随信任、角色、利害程度和专长变化。个人可在一个情境中独自工作，在另一个情境中通过对话构建框架，并在非个人标准与相关方后果间切换。应根据问题需要设计证据对话，而不是强迫自己符合孤立或纯反思的 INFJ 形象。",
    ),
    combinationRule(
      "infj-combination-evidence-led-adaptation",
      86,
      [
        dimension("SN", ["S", "N", "X"], [
          "borderline",
          "balanced",
        ]),
        dimension("JP", ["J", "P", "X"], [
          "borderline",
          "balanced",
        ]),
      ],
      "change-and-adaptation",
      "infj-combination-adaptation",
      "Meaning Framework With Evidence-Led Revision",
      "Borderline or balanced SN and JP results may support movement between future meaning framework, present facts, structured commitment, and iterative revision. The person can preserve a coherent objective while allowing methods to change as evidence develops. Make the flexibility explicit: name the stable principles, current version, unresolved anomalies, and review date so adaptation strengthens the model rather than appearing as arbitrary change.",
      "由证据引导修正的意义框架",
      "SN 与 JP 处于临界或平衡状态，可能支持在未来意义框架、当前事实、结构化承诺与迭代修正间移动。个人可保持一致目标，同时让方法随证据发展而改变。应明确这种弹性：说出稳定原则、当前版本、未解决异常与复盘日期，使适应增强模型，而不是显得任意变化。",
    ),
    aggregateCombinationRule(
      "infj-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "infj-combination-adaptation",
      "A Provisional, Blended INFJ Profile",
      "Three or more low-confidence dimensions mean the INFJ result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about privacy, foresight, coherence, or structure would exceed the evidence. Compare interpretations with repeated situations and preserve examples that contradict the purposeful stereotype.",
      "暂定而混合的 INFJ 特征模式",
      "三个或更多低置信度维度表示 INFJ 结果应被高度暂定地理解。相邻偏好可能同样可用，行为也会随文化、角色、压力、专长与信任变化。报告仍是一组有用假设，但对私人处理、远见、一致性或结构作确定断言会超出证据。应与重复情境比较，并保留不符合使命型刻板印象的案例。",
    ),
    combinationRule(
      "infj-combination-outward-guidance",
      84,
      [
        dimension("EI", ["E"], [...NON_BALANCED_BANDS]),
        dimension("JP", ["J"], [...NON_BALANCED_BANDS]),
      ],
      "growth-roadmap",
      "infj-combination-isolation-risk",
      "Visible Guidance and Coordinated Structure",
      "E-leaning and J-leaning results may produce more visible coordination, discussion, and decision structure than an inward stereotype suggests. The person may build the model with others and mobilise execution once priorities are clear. This does not invalidate the INFJ result. Protect enough private integration to examine assumptions, and ensure visible decisiveness does not prevent specialists from challenging the meaning framework with evidence.",
      "可见引导与协调结构",
      "偏向 E 与 J 的结果可能带来比内向刻板印象更公开的协调、讨论与决策结构。个人可以与他人共同建立模型，并在优先级明确后推动执行，这不会否定 INFJ 结果。应保留足够私人整合来检查假设，并确保公开果断不会阻止专业人员用证据质疑意义框架。",
    ),
    combinationRule(
      "infj-combination-values-meaning",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "infj-combination-adaptation",
      "Long-Range Design With Values and Legitimacy",
      "N-leaning and F-leaning results may combine future systems thinking with stronger attention to values, legitimacy, and stakeholder experience. The meaning framework may define success through human sustainability as well as efficiency. This does not invalidate the INFJ classification. Include affected people in testing assumptions, identify who carries transition costs, and measure trust and adoption alongside technical performance.",
      "结合价值与正当性的长期设计",
      "偏向 N 与 F 的结果可能把未来系统思维与对价值、正当性及相关方体验的重视结合起来。意义框架会同时依据人的可持续性与效率来定义成功，这不会否定 INFJ 分类。应让受影响者参与检验假设，明确谁承担转变成本，并与技术表现一起衡量信任与采用。",
    ),
  ];

function dimension(
  dimensionCode: DimensionRuleCondition["dimension"],
  preferences: NonNullable<
    DimensionRuleCondition["preferences"]
  >,
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
    personalityType: "INFJ",
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
    personalityType: "INFJ",
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
