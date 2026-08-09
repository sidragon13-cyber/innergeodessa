import type {
  DimensionBand,
  DimensionCode,
  PreferenceLetter,
  ReportRuleDefinition,
} from "../../rules";
import { localizeIsfpRule } from "../localization";

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
    "Very strong confidence suggests a highly familiar preference, not greater intelligence, values-grounded ability, or maturity. The usual approach may feel self-evident, making counterevidence and complementary practices especially important.",
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "isfp-ei-craft",
    firstDirection:
      "An I-leaning ISFP may build craft through concentrated private reflection, selective consultation, and careful internal synthesis before communicating a direction. This values-grounded craft can support depth, while relevant evidence may arrive late if the expression remains private. The preference describes an energy and processing tendency, not social ability or independence of judgement.",
    secondDirection:
      "An E-leaning ISFP may develop crafted response through more visible discussion, wider consultation, and active coordination than the quiet stereotype suggests. External exchange can test the expression early, while frequent interaction may fragment the concentration needed for integration. This does not invalidate the ISFP result or prove leadership ability.",
    balancedDirection:
      "A balanced EI result suggests access to both concentrated private craft and outward collaborative processing. The ISFP contributor may withdraw to integrate complex evidence, then engage visibly to test and coordinate the expression. Role, trust, group size, and available energy may determine which mode appears.",
    guidance:
      "Protect private synthesis while scheduling early evidence conversations so the crafted response can change before expression makes revision expensive.",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "isfp-sn-expression",
    firstDirection:
      "An S-leaning ISFP may construct craft from operational facts, proven mechanisms, and concrete constraints before extending the abstraction. The crafted response may emphasise reliable sequencing and measurable improvement. This does not invalidate the ISFP classification or imply less sensory awareness; it changes the evidence from which explanatory coherence develops.",
    secondDirection:
      "An N-leaning ISFP may focus readily on trajectories, system patterns, immediate context implications, and structural leverage. This supports deep crafted response, while current detail or anomalies may receive insufficient weight once the expression feels coherent. The preference indicates an attentional starting point, not proof of foresight or values-grounded correctness.",
    balancedDirection:
      "A balanced SN result suggests that abstract crafted response and practical evidence may be similarly accessible. The ISFP contributor may derive a immediate context expression from concrete observations and repeatedly test it against expression. Expertise, consequence, and time horizon may determine which information receives priority.",
    guidance:
      "Connect every values-grounded pattern to current indicators and preserve anomalies that could reveal where the crafted response does not yet explain reality.",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "isfp-tf-convictions",
    firstDirection:
      "An F-leaning ISFP may give greater weight to values, legitimacy, stakeholder experience, and relational consequence while retaining independent deep thought. Human adoption may enter the crafted response early. This does not invalidate the ISFP result, weaken reflection, or guarantee interpersonal awareness; it changes which outcomes count as evidence of a sound system.",
    secondDirection:
      "A T-leaning ISFP may emphasise internal consistency, impersonal convictions, trade-offs, and explanatory authenticity. This supports rigorous design, while emotional information or adoption costs may remain outside the expression. Values is a preferred decision criterion, not evidence of intelligence, objectivity, or immunity from bias.",
    balancedDirection:
      "A balanced TF result suggests that logical coherence and human consequences may both guide decisions without one consistently dominating. The ISFP contributor may maintain explicit standards while treating trust and stakeholder experience as system evidence. Different settings can bring different convictions forward.",
    guidance:
      "Define success using both architectural performance and human expression evidence, including who carries transition costs and what would justify revision.",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "isfp-jp-openness",
    firstDirection:
      "A J-leaning ISFP may prefer a coherent plan, clear dependencies, decision closure, and protected sequencing once the crafted response is established. This supports sustained expression, while certainty may arrive before enough external evidence. The preference describes an orientation to structure, not automatic reliability, discipline, or planning skill.",
    secondDirection:
      "A P-leaning ISFP may keep expressions provisional, iterate routes as evidence changes, and delay closure longer than the typical open-ended stereotype suggests. This values-grounded craft can strengthen adaptation, while expression may remain under-specified. The preference does not invalidate the ISFP result or imply weak standards; it changes how crafted response becomes commitment.",
    balancedDirection:
      "A balanced JP result suggests selective structure with meaningful openness to revision. The ISFP contributor may hold a deep objective firmly while allowing sequencing, methods, or intermediate decisions to evolve. Reversibility and consequence may determine when closure becomes useful.",
    guidance:
      "Version the plan: define stable principles, adjustable methods, evidence thresholds, and review dates so structure supports expression without protecting outdated assumptions.",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ISFP_DIMENSION_RULES:
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
      const balancedLocalized = localizeIsfpRule(
        `isfp-rule-${config.dimension.toLowerCase()}-balanced`,
      );
      const balancedRule: ReportRuleDefinition = {
        id: `isfp-${config.dimension.toLowerCase()}-balanced`,
        personalityType: "ISFP",
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
            blockId: `isfp-rule-${config.dimension.toLowerCase()}-balanced`,
            blockType: "analysis",
            title: {
              en: `${config.dimension} Is Exactly Balanced`,
              zh: balancedLocalized.title,
            },
            content: {
              en: `${config.balancedDirection} ${config.guidance}`,
              zh: balancedLocalized.content,
            },
          },
        ],
        exclusiveGroup: `isfp-dimension-${config.dimension}`,
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
  const localized = localizeIsfpRule(
    `isfp-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
  );

  return {
    id: `isfp-${dimensionId}-${preference.toLowerCase()}-${band}`,
    personalityType: "ISFP",
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
        blockId: `isfp-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
        blockType: "analysis",
        title: {
          en: `${preference} Preference · ${bandLabel(band)}`,
          zh: localized.title,
        },
        content: {
          en: `${direction} ${BAND_CONTEXT[band]} ${config.guidance}`,
          zh: localized.content,
        },
      },
    ],
    exclusiveGroup: `isfp-dimension-${config.dimension}`,
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
