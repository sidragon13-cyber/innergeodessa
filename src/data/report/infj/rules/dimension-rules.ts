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
    "Borderline confidence means the adjacent preference may be similarly accessible, so expression can change with role, trust, expertise, energy, and current demands. This variability is context rather than contradiction.",
  moderate:
    "Moderate confidence suggests a recognisable tendency without making the opposite approach unusual. Experience and situational requirements may substantially alter what others observe.",
  strong:
    "Strong confidence suggests this preference may appear consistently across familiar settings. It can support repeatable strengths, while deliberate access to the opposite approach can limit overuse.",
  "very-strong":
    "Very strong confidence suggests a highly familiar preference, not greater intelligence, purposeful ability, or maturity. The usual approach may feel self-evident, making counterevidence and complementary practices especially important.",
};

const BAND_CONTEXT_ZH: Record<
  Exclude<DimensionBand, "balanced">,
  string
> = {
  borderline:
    "临界置信度意味着相邻偏好可能同样容易调用，因此表现会随角色、信任、专长、精力与当前要求变化。这种变化来自情境，而非矛盾。",
  moderate:
    "中等置信度表示倾向已可辨认，但采用相反方式并不罕见。经验与情境要求会显著改变他人观察到的表现。",
  strong:
    "较强置信度表示这一偏好可能在熟悉情境中稳定出现并形成可重复优势；有意识地使用相反方式能够限制过度使用。",
  "very-strong":
    "很强置信度表示这一偏好高度熟悉，并不代表更高智力、使命能力或成熟度。惯常方式可能显得理所当然，因此反证与互补实践尤其重要。",
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "infj-ei-guidance",
    firstDirection:
      "An I-leaning INFJ may build guidance through concentrated private analysis, selective consultation, and careful internal synthesis before communicating a direction. This can support depth, while relevant evidence may arrive late if the model remains private. The preference describes an energy and processing tendency, not social ability or independence of judgement.",
    secondDirection:
      "An E-leaning INFJ may develop meaning framework through more visible discussion, wider consultation, and active coordination than the quiet stereotype suggests. External exchange can test the model early, while frequent interaction may fragment the concentration needed for integration. This does not invalidate the INFJ result or prove leadership ability.",
    balancedDirection:
      "A balanced EI result suggests access to both concentrated private guidance and outward collaborative processing. The person may withdraw to integrate complex evidence, then engage visibly to test and coordinate the model. Role, trust, group size, and available energy may determine which mode appears.",
    guidance:
      "Protect private synthesis while scheduling early evidence conversations so the meaning framework can change before implementation makes revision expensive.",
    firstDirectionZh:
      "偏向 I 的 INFJ 可能先通过集中的私人分析、选择性咨询与谨慎的内在综合形成引导，再对外沟通方向。这有助于深度，但若模型长期留在内部，相关证据可能进入过晚。该偏好描述精力与处理倾向，而非社交能力或判断独立性。",
    secondDirectionZh:
      "偏向 E 的 INFJ 可能通过比安静刻板印象更公开的讨论、更广泛咨询与积极协调来发展意义框架。外部交流能及早检验模型，频繁互动也可能打断整合所需的专注。这不会否定 INFJ 结果或证明领导能力。",
    balancedDirectionZh:
      "EI 平衡表示既能使用集中的私人引导，也能使用外向协作处理。个人可能先退回内部整合复杂证据，再公开参与以检验和协调模型；角色、信任、群体规模与可用精力会决定哪种方式出现。",
    guidanceZh:
      "保护私人综合，同时安排较早的证据对话，使意义框架能在实施让修正变得昂贵之前改变。",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "infj-sn-meaning",
    firstDirection:
      "An S-leaning INFJ may construct guidance from operational facts, proven mechanisms, and concrete constraints before extending the time horizon. Meaning Framework may emphasise reliable sequencing and measurable improvement. This does not invalidate the INFJ classification or imply less vision; it changes the evidence from which long-range coherence develops.",
    secondDirection:
      "An N-leaning INFJ may focus readily on trajectories, system patterns, future implications, and structural leverage. This supports long-range meaning framework, while current detail or anomalies may receive insufficient weight once the model feels coherent. The preference indicates an attentional starting point, not proof of foresight or purposeful correctness.",
    balancedDirection:
      "A balanced SN result suggests that abstract meaning framework and practical evidence may be similarly accessible. The person may derive a future model from concrete observations and repeatedly test it against implementation. Expertise, consequence, and time horizon may determine which information receives priority.",
    guidance:
      "Connect every purposeful pattern to current indicators and preserve anomalies that could reveal where the meaning framework does not yet explain reality.",
    firstDirectionZh:
      "偏向 S 的 INFJ 可能先从运营事实、已验证机制与具体限制构建引导，再延伸时间跨度。意义框架会更强调可靠顺序与可衡量改进。这不否定 INFJ 或代表缺乏愿景，而是改变长期一致性所依据的证据起点。",
    secondDirectionZh:
      "偏向 N 的 INFJ 可能自然关注发展轨迹、系统模式、未来影响与结构杠杆。这支持长期意义框架，但模型显得一致后，当前细节或异常可能权重不足。该偏好只是注意力起点，不证明远见或使命判断必然正确。",
    balancedDirectionZh:
      "SN 平衡表示抽象意义框架与实际证据可能同样容易调用。个人可从具体观察形成未来模型，并反复用实施检验；专长、后果与时间跨度会决定信息优先级。",
    guidanceZh:
      "把每个使命模式连接到当前指标，并保留可能揭示意义框架尚未解释现实之处的异常。",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "infj-tf-values",
    firstDirection:
      "An F-leaning INFJ may give greater weight to values, legitimacy, stakeholder experience, and relational consequence while retaining independent long-range thought. Human adoption may enter the meaning framework early. This does not invalidate the INFJ result, weaken analysis, or guarantee interpersonal awareness; it changes which outcomes count as evidence of a sound system.",
    secondDirection:
      "A T-leaning INFJ may emphasise internal consistency, impersonal values and consequences, trade-offs, and explanatory precision. This supports rigorous design, while emotional information or adoption costs may remain outside the model. Coherence is a preferred decision criterion, not evidence of intelligence, objectivity, or immunity from bias.",
    balancedDirection:
      "A balanced TF result suggests that coherenceal coherence and human consequences may both guide decisions without one consistently dominating. The person may maintain explicit standards while treating trust and stakeholder experience as system evidence. Different settings can bring different values and consequences forward.",
    guidance:
      "Define success using both architectural performance and human implementation evidence, including who carries transition costs and what would justify revision.",
    firstDirectionZh:
      "偏向 F 的 INFJ 可能在保持独立长期思考的同时，更重视价值、正当性、相关方体验与关系后果，让人的采用更早进入意义框架。这不否定结果、削弱分析或保证人际觉察，而是改变哪些结果被视为健全系统的证据。",
    secondDirectionZh:
      "偏向 T 的 INFJ 可能强调内部一致性、非个人化的价值与后果、取舍及解释精度。这支持严谨设计，但情绪信息或采用成本可能留在模型之外。一致性只是偏好的决策标准，并不证明智力、客观性或免于偏见。",
    balancedDirectionZh:
      "TF 平衡表示逻辑一致性与人的后果都能指导决定，而不会始终由一方主导。个人可维持明确标准，同时把信任与相关方体验视为系统证据；不同环境会让不同价值与后果居于前景。",
    guidanceZh:
      "用架构表现与人的实施证据共同定义成功，包括谁承担转变成本，以及什么证据足以支持修正。",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "infj-jp-structure",
    firstDirection:
      "A J-leaning INFJ may prefer a coherent plan, clear dependencies, decision closure, and protected sequencing once the meaning framework is established. This supports sustained execution, while certainty may arrive before enough external evidence. The preference describes an orientation to structure, not automatic reliability, discipline, or planning skill.",
    secondDirection:
      "A P-leaning INFJ may keep models provisional, iterate routes as evidence changes, and delay closure longer than the typical structured stereotype suggests. This can strengthen adaptation, while execution may remain under-specified. The preference does not invalidate the INFJ result or imply weak standards; it changes how meaning framework becomes commitment.",
    balancedDirection:
      "A balanced JP result may let the INFJ alternate between protecting a purposeful direction and revising the route as people and evidence change. Closure can be useful for coordinated care, while openness preserves room for new meaning and consent.",
    guidance:
      "Name the purpose and relational commitments that remain stable, then set review points where affected people can reshape methods before structure becomes an unquestioned promise.",
    firstDirectionZh:
      "偏向 J 的 INFJ 在意义框架形成后，可能偏好一致计划、清晰依赖、决策定案与受到保护的顺序。这支持持续执行，但确定感可能早于足够外部证据。该偏好描述结构取向，不自动代表可靠、自律或规划技能。",
    secondDirectionZh:
      "偏向 P 的 INFJ 可能让模型保持暂定，随证据变化迭代路径，并比结构化刻板印象更晚定案。这能增强适应，但执行也可能定义不足。它不否定 INFJ 或代表标准薄弱，只是改变意义框架成为承诺的方式。",
    balancedDirectionZh:
      "JP 平衡让 INFJ 能在保护使命方向与随人员和证据变化修正路径之间交替。定案有助于协调关怀，开放则保留新意义与同意的空间。",
    guidanceZh:
      "说明保持稳定的使命与关系承诺，再设置让受影响者能够重塑方法的复盘点，避免结构成为未经质疑的承诺。",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const INFJ_DIMENSION_RULES:
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
        id: `infj-${config.dimension.toLowerCase()}-balanced`,
        personalityType: "INFJ",
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
            blockId: `infj-rule-${config.dimension.toLowerCase()}-balanced`,
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
        exclusiveGroup: `infj-dimension-${config.dimension}`,
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

  return {
    id: `infj-${dimensionId}-${preference.toLowerCase()}-${band}`,
    personalityType: "INFJ",
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
        blockId: `infj-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
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
    exclusiveGroup: `infj-dimension-${config.dimension}`,
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
    strong: "较强",
    "very-strong": "很强",
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
