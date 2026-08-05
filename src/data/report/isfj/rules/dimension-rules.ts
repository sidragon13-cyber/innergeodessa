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
    "Because the confidence is borderline, behaviour may shift noticeably with familiarity, role expectations, energy, and environment. This is not contradictory; it suggests that the adjacent preference remains readily available.",
  moderate:
    "The moderate confidence suggests a recognisable preference without making the opposite approach unusual. Context and learned skill may still change which behaviour is most visible.",
  strong:
    "The strong confidence suggests this preference is likely to appear consistently across familiar settings. Its advantages may be dependable, while its costs deserve deliberate counterbalancing.",
  "very-strong":
    "The very strong confidence suggests a highly consistent preference. This can create a clear and reliable style, but it can also make the opposite approach feel effortful or easy to overlook under pressure.",
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
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ISFJ_DIMENSION_RULES:
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
            },
            content: {
              en: `${config.balancedDirection} ${config.guidance}`,
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
        },
        content: {
          en: `${direction} ${BAND_CONTEXT[band]} ${config.guidance}`,
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
