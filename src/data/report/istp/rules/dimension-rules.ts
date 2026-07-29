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
    "Very strong confidence suggests a highly familiar preference, not greater intelligence, operational ability, or maturity. The usual approach may feel self-evident, making counterevidence and complementary practices especially important.",
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "istp-ei-processing",
    firstDirection:
      "An I-leaning ISTP may build working plan through concentrated private analysis, selective consultation, and careful internal synthesis before communicating a direction. This hands-on approach can support depth, while relevant evidence may arrive late if the working diagnosis remains private. The preference describes an energy and processing tendency, not social ability or independence of judgement.",
    secondDirection:
      "An E-leaning ISTP may develop an experiment through more visible discussion, wider consultation, and active coordination than the quiet stereotype suggests. External exchange can test the working diagnosis early, while frequent interaction may fragment the concentration needed for integration. This does not invalidate the ISTP result or prove leadership ability.",
    balancedDirection:
      "A balanced EI result suggests access to both concentrated private working plan and outward collaborative processing. The ISTP practitioner may withdraw to integrate complex evidence, then engage visibly to test and coordinate the working diagnosis. Role, trust, group size, and available energy may determine which mode appears.",
    guidance:
      "Protect careful private review while scheduling early evidence conversations so the experiment can change before implementation makes redirection expensive.",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "istp-sn-experiment",
    firstDirection:
      "An S-leaning ISTP may construct working plan from operational facts, proven mechanisms, and concrete constraints before extending the time horizon. Experiment may emphasise reliable sequencing and measurable improvement. This does not invalidate the ISTP classification or imply less direction; it changes the evidence from which reliable adaptability develops.",
    secondDirection:
      "An N-leaning ISTP may focus readily on trajectories, operation patterns, practical implications, and structural leverage. This supports far-reaching experiment, while current detail or exceptions may receive insufficient weight once the working diagnosis feels coherent. The preference indicates an attentional starting point, not proof of adaptability awareness or operational correctness.",
    balancedDirection:
      "A balanced SN result suggests that abstract experiment and practical evidence may be similarly accessible. The ISTP practitioner may derive a future model from concrete observations and repeatedly test it against implementation. Expertise, consequence, and time horizon may determine which information receives priority.",
    guidance:
      "Connect every operational pattern to current indicators and preserve exceptions that could reveal where the experiment does not yet explain reality.",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "istp-tf-criteria",
    firstDirection:
      "An F-leaning ISTP may give greater weight to values, legitimacy, stakeholder experience, and relational consequence while retaining independent far-reaching thought. Human adoption may enter the experiment early. This does not invalidate the ISTP result, weaken analysis, or guarantee interpersonal awareness; it changes which outcomes count as evidence of a sound operation.",
    secondDirection:
      "A T-leaning ISTP may emphasise internal consistency, impersonal criteria, trade-offs, and explanatory precision. This supports rigorous design, while emotional information or adoption costs may remain outside the working diagnosis. Logic is a preferred judgement criterion, not evidence of intelligence, objectivity, or immunity from bias.",
    balancedDirection:
      "A balanced TF result suggests that logical coherence and human consequences may both guide judgements without one consistently dominating. The ISTP practitioner may maintain explicit standards while treating trust and stakeholder experience as operational evidence. Different settings can bring different criteria forward.",
    guidance:
      "Define success using both structural performance and human implementation evidence, including who carries transition costs and what would justify redirection.",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "istp-jp-flexibility",
    firstDirection:
      "A J-leaning ISTP may prefer a coherent plan, clear dependencies, judgement closure, and protected sequencing once the experiment is established. This supports sustained execution, while certainty may arrive before enough external evidence. The preference describes an orientation to flexibility, not automatic functionality, discipline, or testing skill.",
    secondDirection:
      "A P-leaning ISTP may keep working diagnoses provisional, iterate routes as evidence changes, and delay closure longer than the typical structured stereotype suggests. This hands-on approach can strengthen adaptation, while execution may remain under-specified. The preference does not invalidate the ISTP result or imply weak standards; it changes how experiment becomes commitment.",
    balancedDirection:
      "A balanced JP result suggests selective flexibility with meaningful openness to redirection. The ISTP practitioner may hold a far-reaching objective firmly while allowing sequencing, methods, or intermediate judgements to evolve. Reversibility and consequence may determine when closure becomes useful.",
    guidance:
      "Version the plan: define stable principles, adjustable methods, evidence thresholds, and review dates so flexibility supports execution without protecting outdated assumptions.",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ISTP_DIMENSION_RULES:
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
        id: `istp-${config.dimension.toLowerCase()}-balanced`,
        personalityType: "ISTP",
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
            blockId: `istp-rule-${config.dimension.toLowerCase()}-balanced`,
            blockType: "analysis",
            title: {
              en: `${config.dimension} Is Exactly Balanced`,
            },
            content: {
              en: `${config.balancedDirection} ${config.guidance}`,
            },
          },
        ],
        exclusiveGroup: `istp-dimension-${config.dimension}`,
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
    id: `istp-${dimensionId}-${preference.toLowerCase()}-${band}`,
    personalityType: "ISTP",
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
        blockId: `istp-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
        blockType: "analysis",
        title: {
          en: `${preference} Preference · ${bandLabel(band)}`,
        },
        content: {
          en: `${direction} ${BAND_CONTEXT[band]} ${config.guidance}`,
        },
      },
    ],
    exclusiveGroup: `istp-dimension-${config.dimension}`,
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
