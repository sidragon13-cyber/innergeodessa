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

export const ENFP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "enfp-combination-visible-experiment",
      90,
      [
        dimension("EI", ["E"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "enfp-combination-experiment",
      "Visible Possibility and Relational Experiment",
      "Strong E and P preferences may generate possibilities through animated conversation, new relationships, and quick values-led trials. This can help people imagine movement before a complete plan exists. The risk is creating more invitations than the group can meaningfully choose or sustain. Limit concurrent experiments, make participation optional, and set a convergence point where lived value and follow-through determine what continues.",
      "可见的可能性与关系实验",
      "明显的 E 与 P 偏好可能通过生动交谈、新关系和快速的价值导向试验来生成可能性，让人们在完整计划出现前便想象行动。风险是发出的邀请超过团队能够认真选择或维持的数量。限制并行实验，确保参与可选，并设立收束点，由实际体现的价值和后续落实决定什么继续。",
    ),
    combinationRule(
      "enfp-combination-values-possibility",
      89,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("TF", ["F"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "enfp-combination-experiment",
      "Imaginative Range and Values-Led Possibility",
      "Strong N and F preferences may combine rapid possibility generation with close attention to meaning, agency, and human potential. The ENFP can connect distant experiences and help people imagine a route that feels more alive or congruent. Inspiration may still outrun consent, evidence, or practical capacity. Ask whose value is being expressed, invite affected people to reshape the idea, and choose one small experiment that shows whether the possibility improves lived experience.",
      "想象广度与价值引领的可能",
      "明显的 N 与 F 偏好可能把快速生成可能性，与对意义、能动性和人的潜能的密切关注结合。ENFP 能连接遥远经验，帮助人们想象更有生命力或更一致的路线；但灵感仍可能跑在同意、证据或实际能力前面。询问表达的是谁的价值，邀请受影响者重塑想法，并选择一个小实验，验证该可能是否改善真实体验。",
    ),
    combinationRule(
      "enfp-combination-diffusion-risk",
      88,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "enfp-combination-focus-risk",
      "Meaningful Options and Promise Diffusion",
      "Strong N and P preferences may keep many value-rich futures emotionally available at once. This supports discovery when identity or direction is uncertain, but each fresh possibility can compete with promises already made. The ENFP may experience closure as loss while collaborators absorb continuity costs. Use a time-bounded exploration window, rank options by values and relational consequence, and renegotiate or complete one promise before opening another substantial path.",
      "有意义的选项与承诺分散",
      "明显的 N 与 P 偏好可能让许多富含价值的未来同时在情感上保持开放。在身份或方向不确定时，这有助于发现；但每个新可能都会与已有承诺竞争。ENFP 可能把收束体验为损失，而合作者承担连续性成本。设定有期限的探索窗口，按价值和关系后果排序，并在开启另一条重要路径前重新协商或完成一项承诺。",
    ),
    combinationRule(
      "enfp-combination-relational-flexibility",
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
      "enfp-combination-focus-risk",
      "Context-Sensitive Dialogue",
      "Borderline or balanced EI and TF results suggest that conversational energy and decision criteria may shift substantially with trust, role, stakes, and group size. The person may dialogue visibly in one setting, process privately in another, and move between values-sensitive invitation and relational consideration without contradiction. Use that range deliberately: identify whether a conversation requires exploration, decision, support, or private synthesis before choosing how intensely to engage.",
      "对情境敏感的对话",
      "EI 与 TF 处于临界或平衡，表示交谈能量与决策标准可能随信任、角色、利害和团队规模显著改变。你可能在一种情境中公开对话，在另一种情境中独自处理，也能在价值敏感的邀请与关系考量之间切换而不矛盾。请有意识地使用这种范围：先判断谈话需要探索、决定、支持还是独立整合，再选择投入强度。",
    ),
    combinationRule(
      "enfp-combination-grounded-adaptation",
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
      "enfp-combination-adaptation",
      "Adaptive Ideas With Practical Anchors",
      "Borderline or balanced SN and JP results may support movement between imaginative alternatives, practical evidence, openness, and timely structure. The person can reframe a problem without losing contact with implementation and can stabilise an experiment when consequences require it. Make this flexibility visible by naming which outcome is fixed, which method is adjustable, and which concrete observation will determine whether the next adaptation is warranted.",
      "有现实锚点的适应性想法",
      "SN 与 JP 处于临界或平衡，可能支持你在想象性替代方案、实际证据、开放性与及时结构之间移动。你能重构问题而不脱离实施，也能在后果要求时稳定实验。明确哪个结果固定、哪种方法可调，以及哪项具体观察将决定下次调整是否有依据，让这种灵活性变得可见。",
    ),
    aggregateCombinationRule(
      "enfp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "enfp-combination-adaptation",
      "A Provisional, Blended ENFP Profile",
      "Three or more low-confidence dimensions mean the ENFP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about sociability, abstraction, values, or spontaneity would exceed the evidence. Compare interpretations with repeated real situations and retain contradictory examples instead of forcing them into one type story.",
      "暂定且混合的 ENFP 画像",
      "三个或更多低置信度维度表示 ENFP 结果应被视为高度暂定。相邻偏好可能同样可用，行为也会随文化、角色、压力、专长与信任改变。报告仍是一组有用假设，但对社交性、抽象思维、价值或自发性作确定断言会超出证据。请用反复出现的真实情境核对解读，并保留矛盾例子，不要强塞进单一类型故事。",
    ),
    combinationRule(
      "enfp-combination-private-model-building",
      84,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["N"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "enfp-combination-focus-risk",
      "Private Exploration and Deep Model Building",
      "Strong I and N preferences may shift the ENFP pattern away from a visibly dialogue-oriented stereotype. Possibilities may develop through solitary research, internal simulation, and selective exchange. This can produce depth and originality, while ideas may remain private too long to receive practical or relational invitation. Share an early model with a knowledgeable partner, specify what feedback would change it, and connect private exploration to one observable experiment.",
      "独立探索与深度建模",
      "明显的 I 与 N 偏好可能让 ENFP 偏离外显对话型的刻板印象。可能性会通过独立研究、内部模拟和选择性交换发展，既可能产生深度和原创性，也可能因想法保留过久而错失实际或关系层面的检验。与有知识的伙伴分享早期模型，说明什么反馈会改变它，并把独立探索连接到一个可观察实验。",
    ),
    combinationRule(
      "enfp-combination-values-led-innovation",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "enfp-combination-adaptation",
      "Possibility With Values and Adoption",
      "N-leaning and F-leaning results may combine possibility generation with stronger attention to values, legitimacy, and stakeholder experience. The person may challenge inherited arrangements because they constrain people as well as ideas. This does not invalidate the ENFP classification. Test whether the proposed change improves real agency, involve affected people in defining the experiment, and measure trust and sustained adoption alongside novelty or imaginative elegance.",
      "兼顾价值与采用的可能性",
      "偏 N 与偏 F 的结果可能把可能性生成，与对价值、正当性和利益相关者体验的更强关注结合。你可能质疑继承而来的安排，因为它们既限制想法也限制人；这不会使 ENFP 分类失效。检验拟议改变是否提升真实能动性，让受影响者参与定义实验，并在新颖性或想象美感之外同时衡量信任与持续采用。",
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
    personalityType: "ENFP",
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
    personalityType: "ENFP",
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
