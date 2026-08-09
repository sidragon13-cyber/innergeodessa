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
  secondDirection: string;
  balancedDirection: string;
  guidance: string;
  firstDirectionZh: string;
  secondDirectionZh: string;
  balancedDirectionZh: string;
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
    "临界置信度表示相邻偏好可能同样可用，表现会随角色、信任、群体规模、精力、经验与当前要求而变化；这种变化是情境差异，而非自相矛盾。",
  moderate:
    "中等置信度表示该倾向较易辨认，但相反方式仍可自然使用；经历与具体情境可能明显改变外在行为。",
  strong:
    "较高置信度表示该偏好可能在熟悉情境中持续出现，既能形成稳定优势，也需要有意识地调用相反方式以避免过度使用。",
  "very-strong":
    "很高置信度表示该偏好非常熟悉，并不代表更高的智力、创造力或能力；在压力下，主动采用互补方式尤其重要。",
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "esfp-ei-participation",
    firstDirection:
      "An I-leaning ESFP may explore through private research, written models, and selective conversation before offering a reframe publicly. Intellectual range can remain broad even when social energy is conserved. This does not invalidate the ESFP result or imply weaker communication; it changes where activation begins and how much external stimulation is useful.",
    firstDirectionZh:
      "偏 I 的 ESFP 可能先通过独立研究、书面梳理与选择性对话探索，再公开提出新的理解框架。即使节省社交精力，思考范围仍可很广；这不会推翻 ESFP 结果或表示沟通较弱，只是改变了能量从何处启动以及需要多少外部刺激。",
    secondDirection:
      "An E-leaning ESFP may develop experiences through rapid interaction, questions, verbal testing, and contact with varied people or environments. Conversation can create energy and reveal alternatives quickly. The cost may be insufficient private integration or too many externally stimulated directions. This preference describes an energy pattern, not automatic sociability or influence.",
    secondDirectionZh:
      "偏 E 的 ESFP 可能通过快速互动、提问、口头试探及接触不同的人与环境来发展体验。对话能带来能量并迅速显露替代方案，但也可能减少独处整合，或产生过多由外界刺激的方向；该偏好描述能量模式，不等同于天生善交际或有影响力。",
    balancedDirection:
      "A balanced EI result suggests access to both interactive participation and private imaginative work. The ESFP participant may generate options publicly in one setting and withdraw for concentrated synthesis in another. Role, trust, group size, and available energy may determine which mode appears without making the overall pattern inconsistent.",
    balancedDirectionZh:
      "EI 平衡表示互动参与与独处想象都较易使用。ESFP 可能在一种情境中公开产生选择，在另一种情境中退后专注整合；角色、信任、群体规模与可用精力会决定当下模式，而不使整体人格显得矛盾。",
    guidance:
      "Match the participation mode to the task: use conversation to widen evidence and private time to integrate, prioritise, and decide what deserves a real test.",
    guidanceZh:
      "让参与方式匹配任务：用对话拓宽证据，用独处时间整合、排序，并决定哪些想法值得真正检验。",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "esfp-sn-experience",
    firstDirection:
      "An S-leaning ESFP may generate alternatives from observable facts, practical mechanisms, and direct activation. Reframing may focus on improving how something actually works rather than proposing a distant imaginative immediate moment. This does not invalidate the ESFP result or imply less sensory awareness; it grounds inventive invitation in tangible evidence and usable detail.",
    firstDirectionZh:
      "偏 S 的 ESFP 可能从可观察事实、实际机制与直接行动中产生替代方案，重构重点更可能是改善事物真实运作的方式，而非提出遥远设想。这不会推翻 ESFP 结果或表示感官觉察较弱，而是让创造性的邀请建立在可触及的证据和可用细节上。",
    secondDirection:
      "An N-leaning ESFP may notice emerging patterns, imaginative connections, and experiences beyond the current frame with particular speed. This supports ideation and strategic reframing, while operational limits or contradictory details may be underweighted. The preference indicates where attention often starts, not proof that a shared experience is original, accurate, or valuable.",
    secondDirectionZh:
      "偏 N 的 ESFP 可能尤其迅速地察觉新兴模式、想象性联系及当前框架之外的体验。这有利于构思与策略重构，但可能低估执行限制或矛盾细节；该偏好只说明注意力常从何处开始，并不能证明共享体验必然原创、准确或有价值。",
    balancedDirection:
      "A balanced SN result suggests that imaginative experience and practical evidence may be similarly accessible. The ESFP participant may move from a broad reframe into a concrete prototype, or allow hands-on findings to generate a new model. Expertise, time horizon, and consequence may determine which information receives priority.",
    balancedDirectionZh:
      "SN 平衡表示想象性体验与实际证据可能同样容易调用。ESFP 可以从宽广的新框架进入具体原型，也可让亲手实践的发现产生新模型；专业经验、时间跨度与后果大小会影响信息优先级。",
    guidance:
      "For each experience, name the pattern it proposes, the concrete fact that could disprove it, and the smallest responsible experiment that connects the two.",
    guidanceZh:
      "面对每个新体验，说明它提出的模式、可能推翻它的具体事实，以及连接两者的最小且负责任的实验。",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "esfp-tf-analysis",
    firstDirection:
      "An F-leaning ESFP may test experiences through values, legitimacy, and stakeholder experience as well as imaginative coherence. Reframing can focus on creating options that people can trust and adopt. This does not invalidate the ESFP result, weaken values-sensitive ability, or guarantee empathy; it changes which consequences enter evaluation early.",
    firstDirectionZh:
      "偏 F 的 ESFP 可能同时依据价值、正当性、相关方体验与想象的一致性来检验方案，重构会更关注创造人们能够信任并采用的选择。这不会推翻 ESFP 结果，也不保证同理心，只是让人的后果更早进入评估。",
    secondDirection:
      "A T-leaning ESFP may emphasise internal consistency, impersonal criteria, contradiction, and the explanatory power of competing models. This supports rigorous invitation, while emotional information or relational consequence may be treated as secondary. Values is a preferred criterion, not evidence of intelligence, objectivity, or freedom from bias.",
    secondDirectionZh:
      "偏 T 的 ESFP 可能强调内部一致性、非个人化标准、矛盾以及竞争模型的解释力。这有助于严谨检验，但情绪信息或关系后果可能被置于次要位置；思维偏好是一种判断标准，不是智力、客观性或不受偏见影响的证明。",
    balancedDirection:
      "A balanced TF result suggests that logical coherence and human consequences may both shape judgement without one consistently dominating. The ESFP participant may test an argument precisely while also noticing whether the process preserves dignity, trust, and adoption. Different contexts can bring different criteria forward.",
    balancedDirectionZh:
      "TF 平衡表示逻辑一致性与人的后果都可能影响判断，而没有一方持续占主导。ESFP 可以严密检验论点，同时关注过程是否维护尊严、信任与采用意愿；不同情境会让不同标准走到前台。",
    guidance:
      "Before advocating a reframe, evaluate both whether its reasoning withstands informed challenge and how its implementation will affect people, trust, incentives, and responsibility.",
    guidanceZh:
      "倡议新的理解框架前，同时评估其推理能否承受知情质疑，以及实施会怎样影响人、信任、激励和责任。",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "esfp-jp-flexibility",
    firstDirection:
      "A J-leaning ESFP may prefer clearer priorities, decision points, and completion structures than the common flexible stereotype suggests. Experience generation can be channelled into organised experiments and timely selection. This does not invalidate the ESFP result; it may increase consistency while creating a risk that a preferred model closes inquiry too soon.",
    firstDirectionZh:
      "偏 J 的 ESFP 可能比灵活刻板印象更偏好清楚的优先级、决策节点与完成结构，并能把体验导入有组织的实验和及时选择。这不会推翻 ESFP 结果；它可提高一致性，也可能让偏爱的模型过早终止探索。",
    secondDirection:
      "A P-leaning ESFP may preserve optionality, revise routes as evidence changes, and resist closure while participation remains productive. This supports adaptive learning, but too many open loops can diffuse ownership and prevent cumulative results. The preference describes an orientation to openness, not proof of spontaneity, creativity, or weak reliability.",
    secondDirectionZh:
      "偏 P 的 ESFP 可能保留选择、随证据变化调整路线，并在参与仍有产出时抗拒收尾。这支持适应性学习，但过多开放事项会分散责任并阻碍成果积累；该偏好描述开放取向，不证明一个人必然自发、有创造力或不可靠。",
    balancedDirection:
      "A balanced JP result suggests selective structure alongside meaningful flexibility. The ESFP participant may establish firm outcomes and review dates while keeping methods adjustable, or explore widely before committing decisively. Reversibility, consequence, and shared obligations may determine when closure is useful.",
    balancedDirectionZh:
      "JP 平衡表示选择性结构与有意义的灵活性并存。ESFP 可设定明确结果与复盘日期，同时让方法保持可调，也可先广泛探索再果断承诺；可逆性、后果与共同义务会决定何时收尾最有价值。",
    guidance:
      "Separate flexible method from stable commitment: define the outcome, experiment window, evidence threshold, and review point before opening additional experiences.",
    guidanceZh:
      "把灵活方法与稳定承诺分开：开启更多体验前，先明确结果、实验窗口、证据门槛与复盘节点。",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ESFP_DIMENSION_RULES:
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
        id: `esfp-${config.dimension.toLowerCase()}-balanced`,
        personalityType: "ESFP",
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
            blockId: `esfp-rule-${config.dimension.toLowerCase()}-balanced`,
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
        exclusiveGroup: `esfp-dimension-${config.dimension}`,
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
  const ruleId = `esfp-${dimensionId}-${preference.toLowerCase()}-${band}`;

  return {
    id: ruleId,
    personalityType: "ESFP",
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
        blockId: `esfp-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
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
    exclusiveGroup: `esfp-dimension-${config.dimension}`,
    tags: [
      "dimension",
      `dimension-${config.dimension}`,
      `variant-${preference}-${band}`,
    ],
  };
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
