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

export const ESFP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "esfp-combination-visible-experiment",
      90,
      [
        dimension("EI", ["E"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "esfp-combination-experiment",
      "Visible Participation and Rapid Experiment",
      "Strong E and P preferences may produce a highly interactive exploratory style. Experiences are generated through conversation, environmental contact, and quick trials, allowing the ESFP participant to build momentum before a complete plan exists. The participation risk is opening more experiments than the available attention can integrate. Limit concurrent trials, state what each one is meant to learn, and schedule a convergence point where evidence determines which direction receives sustained effort.",
      "可见参与与快速实验",
      "明显的 E 与 P 偏好可能形成高度互动的探索方式。ESFP 会通过对话、环境接触和快速试验创造体验，在完整计划出现前建立动能；风险是开启的实验超过注意力所能整合的数量。应限制并行试验，说明各自要学习什么，并设置由证据决定持续投入方向的汇合节点。",
    ),
    combinationRule(
      "esfp-combination-values-experience",
      89,
      [
        dimension("SN", ["S"], ["strong", "very-strong"]),
        dimension("TF", ["F"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "esfp-combination-experiment",
      "Imaginative Range and Values-Led Experience",
      "Strong S and F preferences may combine rapid experience generation with close attention to meaning, agency, and human potential. The ESFP can connect distant experiences and help people imagine a route that feels more alive or congruent. Inspiration may still outrun consent, evidence, or practical capacity. Ask whose value is being expressed, invite affected people to reshape the shared experience, and choose one small experiment that shows whether the experience improves lived experience.",
      "想象广度与价值引导的体验",
      "明显的 S 与 F 偏好可能把快速创造体验与对意义、能动性和人的潜能的关注结合起来。ESFP 能连接相距甚远的经验，帮助他人想象更有活力或更一致的路线，但灵感仍可能跑在同意、证据或现实能力之前。应询问表达的是谁的价值，邀请受影响者重塑体验，并用一个小实验检验是否真正改善生活。",
    ),
    combinationRule(
      "esfp-combination-diffusion-risk",
      88,
      [
        dimension("SN", ["S"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "esfp-combination-focus-risk",
      "Experience Expansion and Diffused Commitment",
      "Strong S and P preferences may keep the option space unusually broad. This supports discovery when the problem is uncertain, but every new connection can compete with existing delivery. The ESFP participant may confuse preserving experiences with preserving freedom while collaborators absorb completion costs. Use a fixed participation window, rank options against explicit criteria, and close, transfer, or pause one commitment before opening another substantial line of work.",
      "体验扩展与承诺分散",
      "明显的 S 与 P 偏好可能让选择空间长期保持宽广，这在问题不确定时有助发现，但每个新连接都会与既有交付争夺资源。ESFP 可能把保留体验误当成保留自由，却让协作者承担收尾成本。应限定参与窗口，用明确标准排序，并在开启新的重要工作前关闭、移交或暂停一项承诺。",
    ),
    combinationRule(
      "esfp-combination-relational-flexibility",
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
      "esfp-combination-focus-risk",
      "Context-Sensitive Dialogue",
      "Borderline or balanced EI and TF results suggest that conversational energy and decision criteria may shift substantially with trust, role, stakes, and group size. The ESFP participant may dialogue visibly in one setting, process privately in another, and move between values-sensitive invitation and relational consideration without contradiction. Use that range deliberately: identify whether a conversation requires participation, decision, support, or private synthesis before choosing how intensely to engage.",
      "对情境敏感的对话",
      "EI 与 TF 临界或平衡表示对话能量和决策标准会随信任、角色、利害与群体规模明显变化。ESFP 可在一处公开对话，在另一处私下处理，并在价值敏感的邀请与关系考量间移动而不矛盾。投入前应先判断对话需要的是参与、决策、支持还是独处整合。",
    ),
    combinationRule(
      "esfp-combination-grounded-adaptation",
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
      "esfp-combination-adaptation",
      "Adaptive Shared Experiences With Practical Anchors",
      "Borderline or balanced SN and JP results may support movement between imaginative alternatives, practical evidence, openness, and timely structure. The ESFP participant can reframe a problem without losing contact with implementation and can stabilise an experiment when consequences require it. Make this flexibility visible by naming which outcome is fixed, which method is adjustable, and which concrete observation will determine whether the next adaptation is warranted.",
      "以现实锚点支持适应性共同体验",
      "SN 与 JP 临界或平衡可支持在想象方案、实际证据、开放探索与及时结构之间移动。ESFP 能重构问题而不脱离实施，也能在后果要求时稳定实验。应明确哪些结果固定、哪些方法可调，以及哪项具体观察会决定下一次调整是否合理。",
    ),
    aggregateCombinationRule(
      "esfp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "esfp-combination-adaptation",
      "A Provisional, Blended ESFP Profile",
      "Three or more low-confidence dimensions mean the ESFP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about sociability, abstraction, values, or spontaneity would exceed the evidence. Compare interpretations with repeated real situations and retain contradictory examples instead of forcing them into one type story.",
      "暂定且混合的 ESFP 模式",
      "三个或更多低置信度维度意味着 ESFP 结果应被高度暂定地理解。相邻偏好可能同样可用，行为会随文化、角色、压力、专业经验与信任变化。报告仍是一组有用假设，但对社交性、抽象、价值或自发性作确定判断会超出证据；应与反复出现的真实情境比较，并保留矛盾案例。",
    ),
    combinationRule(
      "esfp-combination-private-model-building",
      84,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["S"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "esfp-combination-focus-risk",
      "Private Participation and Deep Model Building",
      "Strong I and N preferences may shift the ESFP pattern away from a visibly dialogue-oriented stereotype. Experiences may develop through solitary research, internal simulation, and selective exchange. This expressive participation can produce depth and originality, while shared experiences may remain private too long to receive practical or relational invitation. Share an early model with a knowledgeable partner, specify what feedback would change it, and connect private participation to one observable experiment.",
      "私下参与与深度模型建构",
      "明显的 I 与 N 偏好可能使 ESFP 偏离公开对话的刻板印象，体验通过独立研究、内部模拟和选择性交换发展。这能产生深度与原创性，也可能让共享体验长期停留在私人空间，得不到实际或关系层面的检验。应及早与知识可靠的伙伴分享模型，说明何种反馈会改变它，并连接到一个可观察实验。",
    ),
    combinationRule(
      "esfp-combination-values-led-encouragement",
      83,
      [
        dimension("SN", ["S"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "esfp-combination-adaptation",
      "Experience With Values and Adoption",
      "S-leaning and F-leaning results may combine experience generation with stronger attention to values, legitimacy, and stakeholder experience. The ESFP participant may challenge inherited arrangements because they constrain people as well as shared experiences. This does not invalidate the ESFP classification. Test whether the proposed change improves real agency, involve affected people in defining the experiment, and measure trust and sustained adoption alongside novelty or imaginative elegance.",
      "兼顾价值与采用的体验",
      "偏 S 与偏 F 的结果可能把体验创造与对价值、正当性及相关方经验的关注结合起来。ESFP 可能挑战限制人和共同体验的既有安排，这不会推翻类型判断。应检验改变是否提升真实能动性，让受影响者共同定义实验，并在新颖或想象之美之外衡量信任与持续采用。",
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
    personalityType: "ESFP",
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
    personalityType: "ESFP",
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
