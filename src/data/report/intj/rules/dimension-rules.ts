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
}

const BAND_CONTEXT: Record<
  Exclude<DimensionBand, "balanced">,
  string
> = {
  borderline:
    "Borderline confidence means the adjacent preference may be similarly accessible, so expression can change with role, trust, expertise, energy, and current demands. This variability is context rather than contradiction.",
  moderate:
    "Moderate confidence suggests a recognisable tendency without making the opposite approach unusual. Experience and situational requirements may substantially alter what others observe.",
  strong:
    "Strong confidence suggests this preference may appear consistently across familiar settings. It can support repeatable strengths, while deliberate access to the opposite approach can limit overuse.",
  "very-strong":
    "Very strong confidence suggests a highly familiar preference, not greater intelligence, strategic ability, or maturity. The usual approach may feel self-evident, making counterevidence and complementary practices especially important.",
};

const BAND_CONTEXT_ZH: Record<
  Exclude<DimensionBand, "balanced">,
  string
> = {
  borderline:
    "临界置信度意味着相邻偏好可能同样容易被调用，因此实际表现会随着角色、信任程度、专业经验、精力状态和当前任务要求而变化。这种变化反映的是情境差异，而不是人格结果自相矛盾。",
  moderate:
    "中等置信度表示这一偏好已经具有可识别的倾向，但采用相反方式仍然并不罕见。经验和具体情境要求可能显著改变他人实际观察到的表现。",
  strong:
    "较强置信度表示这一偏好可能在多个熟悉情境中稳定出现，并形成可重复的优势。同时，有意识地调用相反偏好能够减少单一方式被过度使用的风险。",
  "very-strong":
    "非常强的置信度表示这一偏好可能高度熟悉并自然出现，但并不意味着更高的智力、战略能力或成熟度。惯常方式可能显得理所当然，因此主动寻找反证并练习互补方式尤其重要。",
};

const DIMENSION_I18N: Record<
  DimensionCode,
  {
    firstDirection: string;
    secondDirection: string;
    balancedDirection: string;
    guidance: string;
  }
> = {
  EI: {
    firstDirection:
      "偏向 I 的 INTJ 可能主要通过高度集中的个人分析、选择性咨询以及充分的内部整合来形成战略，然后才对外表达方向。这种方式有助于保持思考深度，但如果模型长期停留在个人内部，重要证据也可能进入得过晚。这一偏好描述的是能量使用和信息处理倾向，而不是社交能力或独立判断能力。",
    secondDirection:
      "偏向 E 的 INTJ 可能比传统的安静型刻板印象表现出更多公开讨论、更广泛咨询以及主动协调。外部交流能够更早检验模型，但过多互动也可能打断形成整体架构所需要的专注。这并不会否定 INTJ 结果，也不能自动证明更强的领导能力。",
    balancedDirection:
      "EI 完全平衡意味着，你可能既能够通过安静而集中的个人思考形成战略，也能够通过外部讨论和协作加工信息。你可能先独处整合复杂证据，再进入公开交流以检验和协调模型。具体采用哪种方式，往往取决于角色、信任程度、团队规模以及当时可用的精力。",
    guidance:
      "保留必要的个人整合空间，同时主动安排较早的证据交流节点，使系统架构能够在实施成本变高之前接受现实检验并发生调整。",
  },

  SN: {
    firstDirection:
      "偏向 S 的 INTJ 可能首先从运营事实、经过验证的机制以及具体约束条件出发建立战略，然后再逐步延伸时间跨度。系统架构可能更强调可靠的实施顺序和可衡量的改进。这并不会否定 INTJ 分类，也不意味着缺乏愿景；它只是改变了长期一致性所依据的证据起点。",
    secondDirection:
      "偏向 N 的 INTJ 可能更自然地关注发展趋势、系统模式、未来影响以及结构性杠杆。这有助于形成长期架构，但当模型已经显得足够一致时，当前细节或异常信息可能得不到足够权重。这种偏好说明的是注意力的起点，而不是对未来具有必然正确的预见能力。",
    balancedDirection:
      "SN 完全平衡意味着抽象架构与具体证据可能同样容易被调用。你可能从实际观察中形成未来模型，并不断回到实施过程检验它。专业经验、后果的重要程度以及时间跨度，可能决定某一时刻哪类信息获得更高优先级。",
    guidance:
      "把每一个战略模式都连接到当前可以观察的指标，并保留无法被模型解释的异常现象，因为这些异常可能揭示当前架构仍未正确解释现实的位置。",
  },

  TF: {
    firstDirection:
      "偏向 F 的 INTJ 可能在保持独立长期思考的同时，更重视价值观、正当性、相关方体验以及关系后果。人的接受程度可能更早进入系统架构。这不会否定 INTJ 结果，也不意味着分析能力更弱或必然具有更强的人际洞察；它只是改变了哪些结果会被视为一个系统真正有效的证据。",
    secondDirection:
      "偏向 T 的 INTJ 可能更强调内部逻辑一致性、非个人化标准、取舍分析和解释精度。这有助于形成严谨设计，但情绪信息或实际采用成本也可能被排除在模型之外。逻辑只是偏好的决策标准，并不是智力、绝对客观性或免于认知偏差的证明。",
    balancedDirection:
      "TF 完全平衡意味着逻辑一致性与人的实际后果都可能影响决策，而且通常不会有一方持续占据绝对优势。你可能同时坚持明确标准，并把信任和相关方体验视为系统证据。不同环境可能使不同判断标准暂时获得更高权重。",
    guidance:
      "定义成功时同时纳入系统架构表现与人的实施证据，包括谁承担转型成本，以及出现什么证据时应当重新审视原有决定。",
  },

  JP: {
    firstDirection:
      "偏向 J 的 INTJ 在架构建立之后，可能更喜欢明确计划、清晰依赖关系、及时形成决定以及受到保护的实施顺序。这有助于保持长期执行，但也可能在获得足够外部证据之前过早形成确定性。这一偏好描述的是对结构的倾向，而不是自动代表可靠、自律或具有更高规划能力。",
    secondDirection:
      "偏向 P 的 INTJ 可能更愿意让模型保持暂定状态，在证据变化时持续迭代路径，并比传统的结构化 INTJ 刻板印象更晚形成最终决定。这有助于增强适应性，但执行方式也可能因此缺乏足够明确的定义。这不会否定 INTJ 结果，也不意味着标准较低；它改变的是系统架构如何逐步转化为实际承诺。",
    balancedDirection:
      "JP 完全平衡意味着你可能选择性地使用结构，同时仍然保留真正的修正空间。长期目标可以保持稳定，但具体顺序、方法或中间决定允许随着现实而变化。一个决定是否需要尽早固定，可能取决于它的可逆性以及潜在后果。",
    guidance:
      "对计划进行版本化管理：明确哪些原则保持稳定、哪些方法可以调整、什么证据会触发改变，以及何时进行复盘，使结构真正服务于执行，而不是保护已经过时的假设。",
  },
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "intj-ei-strategy",
    firstDirection:
      "An I-leaning INTJ may build strategy through concentrated private analysis, selective consultation, and careful internal synthesis before communicating a direction. This can support depth, while relevant evidence may arrive late if the model remains private. The preference describes an energy and processing tendency, not social ability or independence of judgement.",
    secondDirection:
      "An E-leaning INTJ may develop architecture through more visible discussion, wider consultation, and active coordination than the quiet stereotype suggests. External exchange can test the model early, while frequent interaction may fragment the concentration needed for integration. This does not invalidate the INTJ result or prove leadership ability.",
    balancedDirection:
      "A balanced EI result suggests access to both concentrated private strategy and outward collaborative processing. The person may withdraw to integrate complex evidence, then engage visibly to test and coordinate the model. Role, trust, group size, and available energy may determine which mode appears.",
    guidance:
      "Protect private synthesis while scheduling early evidence conversations so the architecture can change before implementation makes revision expensive.",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "intj-sn-architecture",
    firstDirection:
      "An S-leaning INTJ may construct strategy from operational facts, proven mechanisms, and concrete constraints before extending the time horizon. Architecture may emphasise reliable sequencing and measurable improvement. This does not invalidate the INTJ classification or imply less vision; it changes the evidence from which long-range coherence develops.",
    secondDirection:
      "An N-leaning INTJ may focus readily on trajectories, system patterns, future implications, and structural leverage. This supports long-range architecture, while current detail or anomalies may receive insufficient weight once the model feels coherent. The preference indicates an attentional starting point, not proof of foresight or strategic correctness.",
    balancedDirection:
      "A balanced SN result suggests that abstract architecture and practical evidence may be similarly accessible. The person may derive a future model from concrete observations and repeatedly test it against implementation. Expertise, consequence, and time horizon may determine which information receives priority.",
    guidance:
      "Connect every strategic pattern to current indicators and preserve anomalies that could reveal where the architecture does not yet explain reality.",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "intj-tf-criteria",
    firstDirection:
      "An F-leaning INTJ may give greater weight to values, legitimacy, stakeholder experience, and relational consequence while retaining independent long-range thought. Human adoption may enter the architecture early. This does not invalidate the INTJ result, weaken analysis, or guarantee interpersonal awareness; it changes which outcomes count as evidence of a sound system.",
    secondDirection:
      "A T-leaning INTJ may emphasise internal consistency, impersonal criteria, trade-offs, and explanatory precision. This supports rigorous design, while emotional information or adoption costs may remain outside the model. Logic is a preferred decision criterion, not evidence of intelligence, objectivity, or immunity from bias.",
    balancedDirection:
      "A balanced TF result suggests that logical coherence and human consequences may both guide decisions without one consistently dominating. The person may maintain explicit standards while treating trust and stakeholder experience as system evidence. Different settings can bring different criteria forward.",
    guidance:
      "Define success using both architectural performance and human implementation evidence, including who carries transition costs and what would justify revision.",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "intj-jp-structure",
    firstDirection:
      "A J-leaning INTJ may prefer a coherent plan, clear dependencies, decision closure, and protected sequencing once the architecture is established. This supports sustained execution, while certainty may arrive before enough external evidence. The preference describes an orientation to structure, not automatic reliability, discipline, or planning skill.",
    secondDirection:
      "A P-leaning INTJ may keep models provisional, iterate routes as evidence changes, and delay closure longer than the typical structured stereotype suggests. This can strengthen adaptation, while execution may remain under-specified. The preference does not invalidate the INTJ result or imply weak standards; it changes how architecture becomes commitment.",
    balancedDirection:
      "A balanced JP result suggests selective structure with meaningful openness to revision. The person may hold a long-range objective firmly while allowing sequencing, methods, or intermediate decisions to evolve. Reversibility and consequence may determine when closure becomes useful.",
    guidance:
      "Version the plan: define stable principles, adjustable methods, evidence thresholds, and review dates so structure supports execution without protecting outdated assumptions.",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const INTJ_DIMENSION_RULES:
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
          ),
      );
      const balancedRule: ReportRuleDefinition = {
        id: `intj-${config.dimension.toLowerCase()}-balanced`,
        personalityType: "INTJ",
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
            blockId: `intj-rule-${config.dimension.toLowerCase()}-balanced`,
            blockType: "analysis",
            title: {
              en: `${config.dimension} Is Exactly Balanced`,
              zh: `${config.dimension} 完全平衡`,
            },
            content: {
              en: `${config.balancedDirection} ${config.guidance}`,
              zh: `${DIMENSION_I18N[config.dimension].balancedDirection} ${DIMENSION_I18N[config.dimension].guidance}`,
            },
          },
        ],
        exclusiveGroup: `intj-dimension-${config.dimension}`,
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
): ReportRuleDefinition {
  const dimensionId = config.dimension.toLowerCase();

  return {
    id: `intj-${dimensionId}-${preference.toLowerCase()}-${band}`,
    personalityType: "INTJ",
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
        blockId: `intj-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
        blockType: "analysis",
        title: {
          en: `${preference} Preference · ${bandLabel(band)}`,
          zh: `${preference} 偏好 · ${bandLabelZh(band)}`,
        },
        content: {
          en: `${direction} ${BAND_CONTEXT[band]} ${config.guidance}`,
          zh: `${
            preference === config.firstPreference
              ? DIMENSION_I18N[config.dimension].firstDirection
              : DIMENSION_I18N[config.dimension].secondDirection
          } ${BAND_CONTEXT_ZH[band]} ${DIMENSION_I18N[config.dimension].guidance}`,
        },
      },
    ],
    exclusiveGroup: `intj-dimension-${config.dimension}`,
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
  const labels: Record<
    Exclude<DimensionBand, "balanced">,
    string
  > = {
    borderline: "临界",
    moderate: "中等",
    strong: "强",
    "very-strong": "非常强",
  };

  return labels[band];
}
