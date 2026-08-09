import type {
  DimensionBand,
  DimensionCode,
  PreferenceLetter,
  ReportRuleDefinition,
} from "../../rules";

interface DimensionRuleConfig {
  dimension: DimensionCode;
  firstPreference: PreferenceLetter;
  secondPreference: PreferenceLetter;
  slotId: string;
  firstDirection: string;
  firstDirectionZh: string;
  secondDirection: string;
  secondDirectionZh: string;
  balancedDirection: string;
  balancedDirectionZh: string;
  guidance: string;
  guidanceZh: string;
}

const BAND_CONTEXT: Record<
  Exclude<DimensionBand, "balanced">,
  string
> = {
  borderline:
    "Borderline confidence means the adjacent preference may be similarly available, so expression can change with role, trust, group size, energy, expertise, and current demands. Treat that variability as context rather than contradiction.",
  moderate:
    "Moderate confidence suggests a recognisable tendency while leaving the opposite approach readily usable. Experience and situation may substantially alter which behaviour is visible.",
  strong:
    "Strong confidence suggests this preference may appear consistently across familiar settings. It can support repeatable strengths, while deliberate access to the opposite approach can reduce overuse.",
  "very-strong":
    "Very strong confidence suggests a highly familiar preference, not greater intelligence, creativity, or competence. The usual approach may feel self-evident, making active counterbalance especially useful under pressure.",
};

const BAND_CONTEXT_ZH: Record<
  Exclude<DimensionBand, "balanced">,
  string
> = {
  borderline:
    "临界置信度表示相邻偏好可能同样可用，因此表达会随角色、信任、团队规模、精力、专长和当前要求而改变。应把这种变化理解为情境作用，而非自相矛盾。",
  moderate:
    "中等置信度表示倾向清晰可辨，但相反方法仍可随时使用。经验与情境可能显著改变外显行为。",
  strong:
    "明显置信度表示该偏好可能在熟悉情境中稳定出现，形成可重复的优势；有意识地调用相反方法有助于减少过度使用。",
  "very-strong":
    "非常明显的置信度表示这是一种高度熟悉的偏好，并不意味着更高的智力、创造力或能力。惯常方法可能显得不证自明，因此压力下尤其需要主动制衡。",
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "enfp-ei-exploration",
    firstDirection:
      "An I-leaning ENFP may explore through private research, written models, and selective conversation before offering a reframe publicly. Intellectual range can remain broad even when social energy is conserved. This does not invalidate the ENFP result or imply weaker communication; it changes where activation begins and how much external stimulation is useful.",
    firstDirectionZh:
      "偏 I 的 ENFP 可能先通过独立研究、书面模型和选择性交谈来探索，再公开提出新的框架。即使节省社交精力，思维范围仍可很广。这不会使 ENFP 结果失效，也不表示沟通较弱；它改变的是激活从何处开始，以及多少外部刺激才有帮助。",
    secondDirection:
      "An E-leaning ENFP may develop possibilities through rapid interaction, questions, verbal testing, and contact with varied people or environments. Conversation can create energy and reveal alternatives quickly. The cost may be insufficient private integration or too many externally stimulated directions. This preference describes an energy pattern, not automatic sociability or influence.",
    secondDirectionZh:
      "偏 E 的 ENFP 可能通过快速互动、提问、口头检验，以及接触不同的人或环境来发展可能性。交谈能产生能量并迅速揭示替代方案，代价可能是缺少独立整合，或被外部刺激带出过多方向。这项偏好描述能量模式，并不自动等于善于社交或富有影响力。",
    balancedDirection:
      "A balanced EI result suggests access to both interactive exploration and private imaginative work. The person may generate options publicly in one setting and withdraw for concentrated synthesis in another. Role, trust, group size, and available energy may determine which mode appears without making the overall pattern inconsistent.",
    balancedDirectionZh:
      "EI 平衡表示互动探索与独立想象工作都较容易调用。你可能在一种情境中公开生成选项，在另一种情境中退回独处以集中整合；角色、信任、团队规模和可用精力会决定哪种模式出现，而不表示整体模式矛盾。",
    guidance:
      "Match the exploration mode to the task: use conversation to widen evidence and private time to integrate, prioritise, and decide what deserves a real test.",
    guidanceZh:
      "让探索方式与任务匹配：用对话拓宽证据，用独处时间整合、排序，并决定什么值得真正测试。",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "enfp-sn-possibility",
    firstDirection:
      "An S-leaning ENFP may generate alternatives from observable facts, practical mechanisms, and direct activation. Reframing may focus on improving how something actually works rather than proposing a distant imaginative future. This does not invalidate the ENFP result or imply less imagination; it grounds inventive invitation in tangible evidence and usable detail.",
    firstDirectionZh:
      "偏 S 的 ENFP 可能从可观察事实、实际机制和直接行动中产生替代方案。重构会更关注改善事物实际如何运作，而非提出遥远的想象未来。这不会使 ENFP 结果失效，也不表示想象力较少；它让创造性的邀请落在具体证据与可用细节上。",
    secondDirection:
      "An N-leaning ENFP may notice emerging patterns, imaginative connections, and possibilities beyond the current frame with particular speed. This supports ideation and strategic reframing, while operational limits or contradictory details may be underweighted. The preference indicates where attention often starts, not proof that an idea is original, accurate, or valuable.",
    secondDirectionZh:
      "偏 N 的 ENFP 往往很快注意到正在浮现的模式、想象性连接和当前框架之外的可能。这支持构想和战略重构，但可能低估运营限制或相互矛盾的细节。偏好只表示注意力通常从哪里开始，并不能证明想法原创、准确或有价值。",
    balancedDirection:
      "A balanced SN result suggests that imaginative possibility and practical evidence may be similarly accessible. The person may move from a broad reframe into a concrete prototype, or allow hands-on findings to generate a new model. Expertise, time horizon, and consequence may determine which information receives priority.",
    balancedDirectionZh:
      "SN 平衡表示想象中的可能与实际证据可能同样容易调用。你既可能从宽广重构走向具体原型，也可能让亲手获得的发现生成新模型；专长、时间跨度和后果会决定哪类信息优先。",
    guidance:
      "For each possibility, name the pattern it proposes, the concrete fact that could disprove it, and the smallest responsible experiment that connects the two.",
    guidanceZh:
      "针对每个可能性，说明它提出的模式、能够推翻它的具体事实，以及连接两者的最小负责任实验。",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "enfp-tf-analysis",
    firstDirection:
      "An F-leaning ENFP may test possibilities through values, legitimacy, and stakeholder experience as well as imaginative coherence. Reframing can focus on creating options that people can trust and adopt. This does not invalidate the ENFP result, weaken values-sensitive ability, or guarantee empathy; it changes which consequences enter evaluation early.",
    firstDirectionZh:
      "偏 F 的 ENFP 可能同时依据价值、正当性、利益相关者体验和想象上的连贯性来检验可能。重构会关注创造人们能够信任并采用的选项。这不会使 ENFP 结果失效，不会削弱对价值的敏感，也不保证同理心；它改变的是哪些后果较早进入评估。",
    secondDirection:
      "A T-leaning ENFP may emphasise internal consistency, impersonal criteria, contradiction, and the explanatory power of competing models. This supports rigorous invitation, while emotional information or relational consequence may be treated as secondary. Values is a preferred criterion, not evidence of intelligence, objectivity, or freedom from bias.",
    secondDirectionZh:
      "偏 T 的 ENFP 可能强调内部一致性、非个人标准、矛盾，以及竞争模型的解释力。这支持严谨质疑，但情绪信息或关系后果可能被放在次要位置。价值偏好只是一种惯用标准，并非智力、客观性或不受偏见影响的证据。",
    balancedDirection:
      "A balanced TF result suggests that logical coherence and human consequences may both shape judgement without one consistently dominating. The person may test an argument precisely while also noticing whether the process preserves dignity, trust, and adoption. Different contexts can bring different criteria forward.",
    balancedDirectionZh:
      "TF 平衡表示逻辑连贯与人的后果都可能塑造判断，而没有一方持续主导。你可能精确检验论证，同时关注过程是否维护尊严、信任与采用；不同情境会让不同标准走到前台。",
    guidance:
      "Before advocating a reframe, evaluate both whether its reasoning withstands informed challenge and how its implementation will affect people, trust, incentives, and responsibility.",
    guidanceZh:
      "主张重构前，同时评估其推理能否经受知情质疑，以及实施会如何影响人、信任、激励与责任。",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "enfp-jp-flexibility",
    firstDirection:
      "A J-leaning ENFP may prefer clearer priorities, decision points, and completion structures than the common flexible stereotype suggests. Possibility generation can be channelled into organised experiments and timely selection. This does not invalidate the ENFP result; it may increase consistency while creating a risk that a preferred model closes inquiry too soon.",
    firstDirectionZh:
      "偏 J 的 ENFP 可能比常见的灵活刻板印象更偏好清楚的优先级、决策节点和完成结构。可能性生成可被导入有组织的实验与及时选择。这不会使 ENFP 结果失效；它可能提高一致性，也会带来偏爱模型过早结束探究的风险。",
    secondDirection:
      "A P-leaning ENFP may preserve optionality, revise routes as evidence changes, and resist closure while exploration remains productive. This supports adaptive learning, but too many open loops can diffuse ownership and prevent cumulative results. The preference describes an orientation to openness, not proof of spontaneity, creativity, or weak reliability.",
    secondDirectionZh:
      "偏 P 的 ENFP 可能保留选择空间，随证据变化修订路线，并在探索仍有产出时抗拒收束。这支持适应性学习，但过多未闭环事项会分散责任，阻碍成果累积。该偏好描述对开放的取向，并不证明自发、富有创造力或可靠性较弱。",
    balancedDirection:
      "A balanced JP result may let the ENFP move between open possibility and purposeful closure according to meaning, reversibility, and promises already made. The person can explore widely without treating every new option as a reason to abandon a chosen direction.",
    balancedDirectionZh:
      "JP 平衡可能使 ENFP 依据意义、可逆性和已有承诺，在开放可能与有目的的收束之间切换。你可以广泛探索，而不把每个新选项都当作放弃既定方向的理由。",
    guidance:
      "Name the value and relationship commitment that will remain stable, then define an experiment window and a clear point for choosing, pausing, or completing the current possibility.",
    guidanceZh:
      "说明将保持稳定的价值与关系承诺，再定义实验窗口，以及选择、暂停或完成当前可能性的明确节点。",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ENFP_DIMENSION_RULES:
  readonly ReportRuleDefinition[] = CONFIGS.flatMap(
    (config) => {
      const firstRules = NON_BALANCED_BANDS.map(
        (band, index) =>
          createDirectionalRule(
            config,
            config.firstPreference,
            band,
            160 + index * 10,
            config.firstDirection,
            config.firstDirectionZh,
          ),
      );
      const secondRules = NON_BALANCED_BANDS.map(
        (band, index) =>
          createDirectionalRule(
            config,
            config.secondPreference,
            band,
            120 + index * 10,
            config.secondDirection,
            config.secondDirectionZh,
          ),
      );
      const balancedRule: ReportRuleDefinition = {
        id: `enfp-${config.dimension.toLowerCase()}-balanced`,
        personalityType: "ENFP",
        priority: 200,
        conditions: [
          {
            kind: "dimension",
            dimension: config.dimension,
            preferences: ["X"],
            bands: ["balanced"],
          },
        ],
        content: [
          {
            targetSectionId: "dimension-results",
            targetSlotId: config.slotId,
            blockId: `enfp-rule-${config.dimension.toLowerCase()}-balanced`,
            blockType: "analysis",
            title: {
              en: `${config.dimension} Is Exactly Balanced`,
              zh: `${config.dimension} 维度完全平衡`,
            },
            content: {
              en: `${config.balancedDirection} ${config.guidance}`,
              zh: `${config.balancedDirectionZh} ${config.guidanceZh}`,
            },
          },
        ],
        exclusiveGroup: `enfp-dimension-${config.dimension}`,
        tags: [
          "dimension",
          `dimension-${config.dimension}`,
          "variant-X-balanced",
        ],
      };

      return [...firstRules, balancedRule, ...secondRules];
    },
  );

function createDirectionalRule(
  config: DimensionRuleConfig,
  preference: PreferenceLetter,
  band: Exclude<DimensionBand, "balanced">,
  priority: number,
  direction: string,
  directionZh: string,
): ReportRuleDefinition {
  const dimensionId = config.dimension.toLowerCase();
  const ruleId = `enfp-${dimensionId}-${preference.toLowerCase()}-${band}`;

  return {
    id: ruleId,
    personalityType: "ENFP",
    priority,
    conditions: [
      {
        kind: "dimension",
        dimension: config.dimension,
        preferences: [preference],
        bands: [band],
      },
    ],
    content: [
      {
        targetSectionId: "dimension-results",
        targetSlotId: config.slotId,
        blockId: `enfp-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
        blockType: "analysis",
        title: {
          en: `${preference} Preference · ${bandLabel(band)}`,
          zh: `${preference} 偏好 · ${bandLabelZh(band)}`,
        },
        content: {
          en: `${direction} ${BAND_CONTEXT[band]} ${config.guidance}`,
          zh: `${directionZh} ${BAND_CONTEXT_ZH[band]} ${config.guidanceZh}`,
        },
      },
    ],
    exclusiveGroup: `enfp-dimension-${config.dimension}`,
    tags: [
      "dimension",
      `dimension-${config.dimension}`,
      `variant-${preference}-${band}`,
    ],
  };
}

function bandLabelZh(
  band: Exclude<DimensionBand, "balanced">,
): string {
  return {
    borderline: "临界",
    moderate: "中等",
    strong: "明显",
    "very-strong": "非常明显",
  }[band];
}

function bandLabel(
  band: Exclude<DimensionBand, "balanced">,
): string {
  return band
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}
