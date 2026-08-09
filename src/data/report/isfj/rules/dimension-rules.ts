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

const BAND_CONTEXT: Record<Exclude<DimensionBand, "balanced">, string> = {
  borderline:
    "Because the confidence is borderline, behaviour may shift noticeably with familiarity, role expectations, energy, and environment. This is not contradictory; it suggests that the adjacent preference remains readily available.",
  moderate:
    "The moderate confidence suggests a recognisable preference without making the opposite approach unusual. Context and learned skill may still change which behaviour is most visible.",
  strong:
    "The strong confidence suggests this preference is likely to appear consistently across familiar settings. Its advantages may be dependable, while its costs deserve deliberate counterbalancing.",
  "very-strong":
    "The very strong confidence suggests a highly consistent preference. This can create a clear and reliable style, but it can also make the opposite approach feel effortful or easy to overlook under pressure.",
};

const BAND_CONTEXT_ZH: Record<Exclude<DimensionBand, "balanced">, string> = {
  borderline:
    "由于置信度处于临界范围，行为可能随熟悉程度、角色期待、精力与环境发生明显变化。这并不矛盾，而是说明相邻偏好仍然很容易被调用。",
  moderate:
    "中等置信度意味着这一偏好已经可以辨认，但采用相反方式并不罕见。情境与后天技能仍可能改变最显眼的行为。",
  strong:
    "较强置信度意味着这一偏好可能在熟悉情境中稳定出现。其优势通常较为可靠，同时也需要有意识地平衡可能的代价。",
  "very-strong":
    "很强置信度意味着偏好表现高度一致。这能形成清晰可靠的风格，但也可能使相反方式显得费力，或在压力下更容易被忽略。",
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "isfj-ei-strength",
    firstDirection:
      "An I-leaning ISFJ is more likely to process experience privately, invest in fewer dependable relationships, and express care through quiet preparation or one-to-one support. Solitude may be important for recovery, especially after sustained interpersonal responsibility. A possible cost is that needs, effort, or overload remain unseen because reflection happens internally.",
    secondDirection:
      "An E-leaning ISFJ may express support more visibly, initiate contact, and coordinate people actively around practical needs. Social engagement can make care easier to see, while structure, continuity, and trusted relationships may still matter strongly. This pattern does not invalidate the ISFJ result or imply that constant interaction is energising.",
    balancedDirection:
      "A balanced EI result suggests that social expression and private processing may both be important. Behaviour can change with trust, role, group size, and current energy: visible coordination in one setting may coexist with a strong need for quiet recovery in another. This flexibility should not be framed as inconsistency or contradiction.",
    guidance:
      "Notice which settings restore energy and which merely reward dependable performance. Make support needs explicit rather than expecting others to infer them, and plan both meaningful connection and protected private recovery.",
    firstDirectionZh:
      "偏向 I 的 ISFJ 更可能在内心处理经验，把精力投入少数可靠关系，并通过安静准备或一对一支持表达关怀。独处对恢复精力可能很重要，尤其是在长期承担人际责任之后。潜在代价是，由于反思发生在内部，个人需要、付出或过载可能无人察觉。",
    secondDirectionZh:
      "偏向 E 的 ISFJ 可能更公开地表达支持、主动联系，并围绕实际需要积极协调他人。社交参与能让关怀更容易被看见，同时结构、连续性与可信赖关系仍可能十分重要。这种表现不会否定 ISFJ 结果，也不代表持续互动必然补充精力。",
    balancedDirectionZh:
      "EI 平衡意味着社交表达与私人处理都可能很重要。行为会随信任、角色、群体规模与当前精力而变化：一个情境中的公开协调，可以与另一个情境中对安静恢复的强烈需要并存。这种弹性不应被描述为不一致或矛盾。",
    guidanceZh:
      "留意哪些环境真正恢复精力，哪些只是奖励可靠表现。明确说出支持需要，而不是期待他人自行推断；同时规划有意义的连接与受到保护的个人恢复时间。",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "isfj-sn-boundary",
    firstDirection:
      "An S-leaning ISFJ is more likely to trust concrete details, remembered experience, precedent, and evidence that can be applied operationally. This can strengthen continuity, quality, and awareness of practical consequences. The person may notice small deviations that broad conceptual discussions miss, particularly in familiar systems or relationships.",
    secondDirection:
      "An N-leaning ISFJ may show greater interest in possibilities, themes, future meaning, and connections beyond immediate facts. Responsibility and interpersonal awareness can remain central while imagination plays a larger role in how options are explored. This does not invalidate the ISFJ result or require a different type label.",
    balancedDirection:
      "A balanced SN result may combine practical grounding with pattern exploration. The person can begin with concrete evidence in high-stakes situations yet move toward themes and possibilities when there is enough context or psychological safety. Which side appears may depend on expertise, time pressure, and the clarity of the problem.",
    guidance:
      "Use both modes deliberately: name the observable evidence, then generate at least one alternative interpretation or future possibility. Small prototypes can connect imagination to the practical assurance needed for responsible action.",
    firstDirectionZh:
      "偏向 S 的 ISFJ 更可能信任具体细节、记住的经验、先例与能够实际运用的证据。这会增强连续性、质量及对实际后果的觉察，尤其在熟悉的系统或关系中，个人可能发现宽泛概念讨论容易遗漏的细微偏差。",
    secondDirectionZh:
      "偏向 N 的 ISFJ 可能更关注可能性、主题、未来意义，以及超越眼前事实的联系。责任感与人际意识仍可处于核心位置，而想象力会在探索选项时发挥更大作用。这不会否定 ISFJ 结果，也不要求改用其他类型标签。",
    balancedDirectionZh:
      "SN 平衡可能把务实基础与模式探索结合起来。面对高后果情境时，个人可以从具体证据出发；当拥有足够背景或心理安全感时，又能转向主题与可能性。哪一侧更显眼，可能取决于专业经验、时间压力与问题清晰度。",
    guidanceZh:
      "有意识地使用两种方式：先说出可观察证据，再提出至少一种替代解释或未来可能。小型原型能够把想象力与负责任行动所需的实际把握连接起来。",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "isfj-tf-boundary",
    firstDirection:
      "An F-leaning ISFJ is more likely to weigh human impact, relational responsibility, harmony, and personally meaningful values. Decisions may be judged partly by whether people feel considered and commitments remain trustworthy. A possible cost is delayed self-advocacy when protecting connection seems more urgent than stating a personal limit.",
    secondDirection:
      "A T-leaning ISFJ may use firmer logic, explicit standards, consistency, and efficiency when evaluating choices. Care for continuity and responsibility can remain present while decisions are communicated in more impersonal terms. This does not imply emotional coldness; it may reflect a preference for making expectations and trade-offs testable.",
    balancedDirection:
      "A balanced TF result suggests access to both relational and impersonal criteria. The person may appear highly considerate in close relationships and notably analytical in technical, operational, or high-accountability settings. Variation by role does not make the result contradictory; it may show deliberate movement between different forms of evidence.",
    guidance:
      "Before deciding, separate the human impact, objective evidence, and personal capacity. State which criterion is carrying the most weight so others can understand the reasoning and so your own needs are not silently excluded.",
    firstDirectionZh:
      "偏向 F 的 ISFJ 更可能权衡人的影响、关系责任、和谐及个人重视的价值。判断一个决定时，可能会考虑人们是否感到被照顾，以及承诺是否依然可信。潜在代价是，当保护关系似乎比说明个人界限更紧迫时，自我主张会被推迟。",
    secondDirectionZh:
      "偏向 T 的 ISFJ 在评估选择时，可能使用更明确的逻辑、标准、一致性与效率。即使决定以较非个人化的方式表达，对连续性与责任的关心仍可存在。这不代表情感冷漠；它可能只是更偏好让期待与取舍能够被检验。",
    balancedDirectionZh:
      "TF 平衡意味着关系标准与非个人标准都容易被调用。个人在亲密关系中可能非常体贴，在技术、运营或高责任环境中又明显偏向分析。因角色而异的表现并不矛盾，反而可能说明能够有意识地在不同证据形式之间移动。",
    guidanceZh:
      "决定前，分别审视人的影响、客观证据与个人能力。说明当前哪个标准权重最高，让他人能够理解推理，也避免自己的需要被无声排除。",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "isfj-jp-boundary",
    firstDirection:
      "A J-leaning ISFJ is more likely to value closure, planning, responsibility, and predictable follow-through. This can support preparation and trust because commitments become concrete. A possible cost is over-commitment or rigidity when plans are treated as moral obligations even after capacity, evidence, or circumstances have changed.",
    secondDirection:
      "A P-leaning ISFJ may prefer looser scheduling, situational flexibility, or keeping options open until practical information is available. Responsibility and reliable support can remain important even when the route is less predetermined. This does not imply inconsistency or mistyping; dependability can be expressed through responsiveness rather than fixed structure.",
    balancedDirection:
      "A balanced JP result may favour enough structure to protect responsibilities without excessive restriction. The person can plan carefully when consequences are significant and adapt readily when expectations remain clear. Flexibility is likely to depend on whether change threatens essential commitments or simply offers a different route to the same outcome.",
    guidance:
      "Distinguish commitments from methods. Keep deadlines, ownership, and minimum standards clear while allowing the sequence or technique to change. Review plans at agreed points instead of preserving them solely because they were made.",
    firstDirectionZh:
      "偏向 J 的 ISFJ 更可能重视定案、规划、责任与可预测的跟进。承诺变得具体后，这能支持准备与信任。潜在代价是，即使能力、证据或环境已经改变，仍把计划当作道德义务，从而过度承诺或变得僵化。",
    secondDirectionZh:
      "偏向 P 的 ISFJ 可能喜欢较宽松的安排、因情境而变的弹性，或在获得实际信息前保留选项。即使路径没有预先确定，责任与可靠支持仍可很重要。这并非不一致或类型判断错误；可靠也可以通过及时回应而不是固定结构来表达。",
    balancedDirectionZh:
      "JP 平衡可能偏好足以保护责任、却不过度限制的结构。后果重大时，个人可以谨慎规划；期待明确时，也能迅速适应。弹性程度可能取决于变化是威胁核心承诺，还是仅提供实现同一结果的不同路径。",
    guidanceZh:
      "区分承诺与方法。在允许顺序或技术变化的同时，明确截止时间、责任归属与最低标准。在约定节点复核计划，而不要仅仅因为计划已经制定就继续保留。",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ISFJ_DIMENSION_RULES: readonly ReportRuleDefinition[] =
  CONFIGS.flatMap((config) => {
    const firstRules = NON_BALANCED_BANDS.map((band, index) =>
      createDirectionalRule(
        config,
        config.firstPreference,
        band,
        160 + index * 10,
        config.firstDirection,
        config.firstDirectionZh,
      ),
    );
    const secondRules = NON_BALANCED_BANDS.map((band, index) =>
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
      id: `isfj-${config.dimension.toLowerCase()}-balanced`,
      personalityType: "ISFJ",
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
          blockId: `isfj-rule-${config.dimension.toLowerCase()}-balanced`,
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
      exclusiveGroup: `isfj-dimension-${config.dimension}`,
      tags: [
        "dimension",
        `dimension-${config.dimension}`,
        "variant-X-balanced",
      ],
    };

    return [...firstRules, balancedRule, ...secondRules];
  });

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
    id: `isfj-${dimensionId}-${preference.toLowerCase()}-${band}`,
    personalityType: "ISFJ",
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
        blockId: `isfj-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
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
    exclusiveGroup: `isfj-dimension-${config.dimension}`,
    tags: [
      "dimension",
      `dimension-${config.dimension}`,
      `variant-${preference}-${band}`,
    ],
  };
}

function bandLabelZh(band: Exclude<DimensionBand, "balanced">): string {
  return {
    borderline: "临界",
    moderate: "中等",
    strong: "较强",
    "very-strong": "很强",
  }[band];
}

function bandLabel(band: Exclude<DimensionBand, "balanced">): string {
  return band
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
