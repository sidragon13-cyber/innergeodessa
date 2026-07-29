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
    "Strong confidence suggests this preference may appear consistently across familiar settings. It can support repeatable strengths, while open-ended access to the opposite approach can limit overuse.",
  "very-strong":
    "Very strong confidence suggests a highly familiar preference, not greater intelligence, conceptual ability, or maturity. The usual approach may feel self-evident, making counterevidence and complementary practices especially important.",
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "intp-ei-inquiry",
    firstDirection:
      "An I-leaning INTP may build inquiry through concentrated private analysis, selective consultation, and careful internal synthesis before communicating a direction. This can support depth, while relevant evidence may arrive late if the model remains private. The preference describes an energy and processing tendency, not social ability or independence of judgement.",
    secondDirection:
      "An E-leaning INTP may develop conceptual model through more visible discussion, wider consultation, and active coordination than the quiet stereotype suggests. External exchange can test the model early, while frequent interaction may fragment the concentration needed for integration. This does not invalidate the INTP result or prove leadership ability.",
    balancedDirection:
      "A balanced EI result suggests access to both concentrated private inquiry and outward collaborative processing. The person may withdraw to integrate complex evidence, then engage visibly to test and coordinate the model. Role, trust, group size, and available energy may determine which mode appears.",
    guidance:
      "Protect private synthesis while scheduling early evidence conversations so the conceptual model can change before application makes revision expensive.",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "intp-sn-model",
    firstDirection:
      "An S-leaning INTP may construct inquiry from operational facts, proven mechanisms, and concrete constraints before extending the abstraction. The conceptual model may emphasise reliable sequencing and measurable improvement. This does not invalidate the INTP classification or imply less imagination; it changes the evidence from which explanatory coherence develops.",
    secondDirection:
      "An N-leaning INTP may focus readily on trajectories, system patterns, future implications, and structural leverage. This supports deep conceptual model, while current detail or anomalies may receive insufficient weight once the model feels coherent. The preference indicates an attentional starting point, not proof of foresight or conceptual correctness.",
    balancedDirection:
      "A balanced SN result suggests that abstract conceptual model and practical evidence may be similarly accessible. The person may derive a future model from concrete observations and repeatedly test it against application. Expertise, consequence, and time horizon may determine which information receives priority.",
    guidance:
      "Connect every conceptual pattern to current indicators and preserve anomalies that could reveal where the conceptual model does not yet explain reality.",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "intp-tf-criteria",
    firstDirection:
      "An F-leaning INTP may give greater weight to values, legitimacy, stakeholder experience, and relational consequence while retaining independent deep thought. Human adoption may enter the conceptual model early. This does not invalidate the INTP result, weaken analysis, or guarantee interpersonal awareness; it changes which outcomes count as evidence of a sound system.",
    secondDirection:
      "A T-leaning INTP may emphasise internal consistency, impersonal criteria, trade-offs, and explanatory precision. This supports rigorous design, while emotional information or adoption costs may remain outside the model. Logic is a preferred decision criterion, not evidence of intelligence, objectivity, or immunity from bias.",
    balancedDirection:
      "A balanced TF result suggests that logical coherence and human consequences may both guide decisions without one consistently dominating. The person may maintain explicit standards while treating trust and stakeholder experience as system evidence. Different settings can bring different criteria forward.",
    guidance:
      "Define success using both architectural performance and human application evidence, including who carries transition costs and what would justify revision.",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "intp-jp-openness",
    firstDirection:
      "A J-leaning INTP may prefer a coherent plan, clear dependencies, decision closure, and protected sequencing once the conceptual model is established. This supports sustained application, while certainty may arrive before enough external evidence. The preference describes an orientation to structure, not automatic reliability, discipline, or planning skill.",
    secondDirection:
      "A P-leaning INTP may keep models provisional, iterate routes as evidence changes, and delay closure longer than the typical open-ended stereotype suggests. This can strengthen adaptation, while application may remain under-specified. The preference does not invalidate the INTP result or imply weak standards; it changes how conceptual model becomes commitment.",
    balancedDirection:
      "A balanced JP result suggests selective structure with meaningful openness to revision. The person may hold a deep objective firmly while allowing sequencing, methods, or intermediate decisions to evolve. Reversibility and consequence may determine when closure becomes useful.",
    guidance:
      "Version the plan: define stable principles, adjustable methods, evidence thresholds, and review dates so structure supports application without protecting outdated assumptions.",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const INTP_DIMENSION_RULES:
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
        id: `intp-${config.dimension.toLowerCase()}-balanced`,
        personalityType: "INTP",
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
            blockId: `intp-rule-${config.dimension.toLowerCase()}-balanced`,
            blockType: "analysis",
            title: {
              en: `${config.dimension} Is Exactly Balanced`,
            },
            content: {
              en: `${config.balancedDirection} ${config.guidance}`,
            },
          },
        ],
        exclusiveGroup: `intp-dimension-${config.dimension}`,
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
    id: `intp-${dimensionId}-${preference.toLowerCase()}-${band}`,
    personalityType: "INTP",
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
        blockId: `intp-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
        blockType: "analysis",
        title: {
          en: `${preference} Preference · ${bandLabel(band)}`,
        },
        content: {
          en: `${direction} ${BAND_CONTEXT[band]} ${config.guidance}`,
        },
      },
    ],
    exclusiveGroup: `intp-dimension-${config.dimension}`,
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
