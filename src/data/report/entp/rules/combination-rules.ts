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

export const ENTP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "entp-combination-visible-experiment",
      90,
      [
        dimension("EI", ["E"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "entp-combination-experiment",
      "Visible Exploration and Rapid Experiment",
      "Strong E and P preferences may produce a highly interactive exploratory style. Possibilities are generated through conversation, environmental contact, and quick trials, allowing the person to build momentum before a complete plan exists. The risk is opening more experiments than the available attention can integrate. Limit concurrent trials, state what each one is meant to learn, and schedule a convergence point where evidence determines which direction receives sustained effort.",
      "可见的探索与快速实验",
      "明显的 E 与 P 偏好可能形成高度互动的探索风格。可能性通过交谈、接触环境和快速试验生成，让你在完整计划出现前便建立势头。风险是开启的实验超过可用注意力能够整合的数量。限制并行试验，说明每项要学习什么，并安排收束点，由证据决定哪个方向获得持续投入。",
    ),
    combinationRule(
      "entp-combination-conceptual-challenge",
      89,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("TF", ["T"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "entp-combination-experiment",
      "Conceptual Range and Analytical Challenge",
      "Strong N and T preferences may combine rapid pattern detection with rigorous testing of assumptions. The ENTP can expose contradictions, connect distant domains, and generate models that change how a problem is understood. A compelling reframe may still outrun evidence or relational context. Convert the model into a falsifiable claim, invite the strongest informed objection, and include human consequences among the variables that determine whether the idea is useful.",
      "概念广度与分析性质疑",
      "明显的 N 与 T 偏好可能把快速识别模式与严格检验假设结合。ENTP 能揭示矛盾、连接遥远领域，并生成改变问题理解方式的模型；但有说服力的重构仍可能跑在证据或关系背景前面。把模型转为可证伪主张，邀请最强的知情反对，并把对人的后果纳入判断想法是否有用的变量。",
    ),
    combinationRule(
      "entp-combination-diffusion-risk",
      88,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "entp-combination-focus-risk",
      "Possibility Expansion and Diffused Commitment",
      "Strong N and P preferences may keep the option space unusually broad. This supports discovery when the problem is uncertain, but every new connection can compete with existing delivery. The person may confuse preserving possibilities with preserving freedom while collaborators absorb completion costs. Use a fixed exploration window, rank options against explicit criteria, and close, transfer, or pause one commitment before opening another substantial line of work.",
      "可能性扩张与承诺分散",
      "明显的 N 与 P 偏好可能让选项空间异常宽广。在问题不确定时，这有助于发现；但每个新连接都会与已有交付竞争。你可能把保留可能性误认为保留自由，而合作者承担完成成本。使用固定探索窗口，按明确标准排序，并在开启另一条重要工作线前关闭、移交或暂停一项承诺。",
    ),
    combinationRule(
      "entp-combination-relational-flexibility",
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
      "entp-combination-focus-risk",
      "Context-Sensitive Dialogue",
      "Borderline or balanced EI and TF results suggest that conversational energy and decision criteria may shift substantially with trust, role, stakes, and group size. The person may debate visibly in one setting, process privately in another, and move between analytical challenge and relational consideration without contradiction. Use that range deliberately: identify whether a conversation requires exploration, decision, support, or private synthesis before choosing how intensely to engage.",
      "对情境敏感的对话",
      "EI 与 TF 处于临界或平衡，表示交谈能量与决策标准可能随信任、角色、利害和团队规模显著改变。你可能在一种情境中公开辩论，在另一种情境中独自处理，也能在分析性质疑与关系考量之间切换而不矛盾。请有意识地使用这种范围：先判断谈话需要探索、决定、支持还是独立整合，再选择投入强度。",
    ),
    combinationRule(
      "entp-combination-grounded-adaptation",
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
      "entp-combination-adaptation",
      "Adaptive Ideas With Practical Anchors",
      "Borderline or balanced SN and JP results may support movement between conceptual alternatives, practical evidence, openness, and timely structure. The person can reframe a problem without losing contact with implementation and can stabilise an experiment when consequences require it. Make this flexibility visible by naming which outcome is fixed, which method is adjustable, and which concrete observation will determine whether the next adaptation is warranted.",
      "有现实锚点的适应性想法",
      "SN 与 JP 处于临界或平衡，可能支持你在概念替代方案、实际证据、开放性与及时结构之间移动。你能重构问题而不脱离实施，也能在后果要求时稳定实验。明确哪个结果固定、哪种方法可调，以及哪项具体观察将决定下次调整是否有依据，让这种灵活性变得可见。",
    ),
    aggregateCombinationRule(
      "entp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "entp-combination-adaptation",
      "A Provisional, Blended ENTP Profile",
      "Three or more low-confidence dimensions mean the ENTP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about sociability, abstraction, logic, or spontaneity would exceed the evidence. Compare interpretations with repeated real situations and retain contradictory examples instead of forcing them into one type story.",
      "暂定且混合的 ENTP 画像",
      "三个或更多低置信度维度表示 ENTP 结果应被视为高度暂定。相邻偏好可能同样可用，行为也会随文化、角色、压力、专长与信任改变。报告仍是一组有用假设，但对社交性、抽象思维、逻辑或自发性作确定断言会超出证据。请用反复出现的真实情境核对解读，并保留矛盾例子，不要强塞进单一类型故事。",
    ),
    combinationRule(
      "entp-combination-private-model-building",
      84,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["N"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "entp-combination-focus-risk",
      "Private Exploration and Deep Model Building",
      "Strong I and N preferences may shift the ENTP pattern away from a visibly debate-oriented stereotype. Possibilities may develop through solitary research, internal simulation, and selective exchange. This can produce depth and originality, while ideas may remain private too long to receive practical or relational challenge. Share an early model with a knowledgeable partner, specify what feedback would change it, and connect private exploration to one observable experiment.",
      "独立探索与深度建模",
      "明显的 I 与 N 偏好可能让 ENTP 偏离外显辩论型的刻板印象。可能性会通过独立研究、内部模拟和选择性交换发展，既可能产生深度和原创性，也可能因想法保留过久而错失实际或关系层面的质疑。与有知识的伙伴分享早期模型，说明什么反馈会改变它，并把独立探索连接到一个可观察实验。",
    ),
    combinationRule(
      "entp-combination-values-led-innovation",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "entp-combination-adaptation",
      "Possibility With Values and Adoption",
      "N-leaning and F-leaning results may combine possibility generation with stronger attention to values, legitimacy, and stakeholder experience. The person may challenge inherited arrangements because they constrain people as well as ideas. This does not invalidate the ENTP classification. Test whether the proposed change improves real agency, involve affected people in defining the experiment, and measure trust and sustained adoption alongside novelty or conceptual elegance.",
      "兼顾价值与采用的可能性",
      "偏 N 与偏 F 的结果可能把可能性生成，与对价值、正当性和利益相关者体验的更强关注结合。你可能质疑继承而来的安排，因为它们既限制想法也限制人；这不会使 ENTP 分类失效。检验拟议改变是否提升真实能动性，让受影响者参与定义实验，并在新颖性或概念美感之外同时衡量信任与持续采用。",
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
    personalityType: "ENTP",
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
    personalityType: "ENTP",
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
