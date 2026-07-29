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
    "Borderline confidence means the adjacent preference may be similarly available, so expression can change with role, trust, group size, energy, expertise, and current demands. Treat that variability as context rather than contradiction.",
  moderate:
    "Moderate confidence suggests a recognisable tendency while leaving the opposite approach readily usable. Experience and situation may substantially alter which behaviour is visible.",
  strong:
    "Strong confidence suggests this preference may appear consistently across familiar settings. It can support repeatable strengths, while deliberate access to the opposite approach can reduce overuse.",
  "very-strong":
    "Very strong confidence suggests a highly familiar preference, not greater intelligence, creativity, or competence. The usual approach may feel self-evident, making active counterbalance especially useful under pressure.",
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "entp-ei-exploration",
    firstDirection:
      "An I-leaning ENTP may explore through private research, written models, and selective conversation before offering a reframe publicly. Intellectual range can remain broad even when social energy is conserved. This does not invalidate the ENTP result or imply weaker communication; it changes where experimentation begins and how much external stimulation is useful.",
    secondDirection:
      "An E-leaning ENTP may develop possibilities through rapid interaction, questions, verbal testing, and contact with varied people or environments. Conversation can create energy and reveal alternatives quickly. The cost may be insufficient private integration or too many externally stimulated directions. This preference describes an energy pattern, not automatic sociability or influence.",
    balancedDirection:
      "A balanced EI result suggests access to both interactive exploration and private conceptual work. The person may generate options publicly in one setting and withdraw for concentrated synthesis in another. Role, trust, group size, and available energy may determine which mode appears without making the overall pattern inconsistent.",
    guidance:
      "Match the exploration mode to the task: use conversation to widen evidence and private time to integrate, prioritise, and decide what deserves a real test.",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "entp-sn-possibility",
    firstDirection:
      "An S-leaning ENTP may generate alternatives from observable facts, practical mechanisms, and direct experimentation. Reframing may focus on improving how something actually works rather than proposing a distant conceptual future. This does not invalidate the ENTP result or imply less imagination; it grounds inventive challenge in tangible evidence and usable detail.",
    secondDirection:
      "An N-leaning ENTP may notice emerging patterns, conceptual connections, and possibilities beyond the current frame with particular speed. This supports ideation and strategic reframing, while operational limits or contradictory details may be underweighted. The preference indicates where attention often starts, not proof that an idea is original, accurate, or valuable.",
    balancedDirection:
      "A balanced SN result suggests that conceptual possibility and practical evidence may be similarly accessible. The person may move from a broad reframe into a concrete prototype, or allow hands-on findings to generate a new model. Expertise, time horizon, and consequence may determine which information receives priority.",
    guidance:
      "For each possibility, name the pattern it proposes, the concrete fact that could disprove it, and the smallest responsible experiment that connects the two.",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "entp-tf-analysis",
    firstDirection:
      "An F-leaning ENTP may test possibilities through values, legitimacy, and stakeholder experience as well as conceptual coherence. Reframing can focus on creating options that people can trust and adopt. This does not invalidate the ENTP result, weaken analytical ability, or guarantee empathy; it changes which consequences enter evaluation early.",
    secondDirection:
      "A T-leaning ENTP may emphasise internal consistency, impersonal criteria, contradiction, and the explanatory power of competing models. This supports rigorous challenge, while emotional information or relational consequence may be treated as secondary. Logic is a preferred criterion, not evidence of intelligence, objectivity, or freedom from bias.",
    balancedDirection:
      "A balanced TF result suggests that logical coherence and human consequences may both shape judgement without one consistently dominating. The person may challenge an argument precisely while also noticing whether the process preserves dignity, trust, and adoption. Different contexts can bring different criteria forward.",
    guidance:
      "Before advocating a reframe, evaluate both whether it withstands logical challenge and how its implementation will affect people, trust, incentives, and responsibility.",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "entp-jp-flexibility",
    firstDirection:
      "A J-leaning ENTP may prefer clearer priorities, decision points, and completion structures than the common flexible stereotype suggests. Possibility generation can be channelled into organised experiments and timely selection. This does not invalidate the ENTP result; it may increase consistency while creating a risk that a preferred model closes inquiry too soon.",
    secondDirection:
      "A P-leaning ENTP may preserve optionality, revise routes as evidence changes, and resist closure while exploration remains productive. This supports adaptive learning, but too many open loops can diffuse ownership and prevent cumulative results. The preference describes an orientation to openness, not proof of spontaneity, creativity, or weak reliability.",
    balancedDirection:
      "A balanced JP result suggests selective structure alongside meaningful flexibility. The person may establish firm outcomes and review dates while keeping methods adjustable, or explore widely before committing decisively. Reversibility, consequence, and shared obligations may determine when closure is useful.",
    guidance:
      "Separate flexible method from stable commitment: define the outcome, experiment window, evidence threshold, and review point before opening additional possibilities.",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ENTP_DIMENSION_RULES:
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
        id: `entp-${config.dimension.toLowerCase()}-balanced`,
        personalityType: "ENTP",
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
            blockId: `entp-rule-${config.dimension.toLowerCase()}-balanced`,
            blockType: "analysis",
            title: {
              en: `${config.dimension} Is Exactly Balanced`,
            },
            content: {
              en: `${config.balancedDirection} ${config.guidance}`,
            },
          },
        ],
        exclusiveGroup: `entp-dimension-${config.dimension}`,
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
    id: `entp-${dimensionId}-${preference.toLowerCase()}-${band}`,
    personalityType: "ENTP",
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
        blockId: `entp-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
        blockType: "analysis",
        title: {
          en: `${preference} Preference · ${bandLabel(band)}`,
        },
        content: {
          en: `${direction} ${BAND_CONTEXT[band]} ${config.guidance}`,
        },
      },
    ],
    exclusiveGroup: `entp-dimension-${config.dimension}`,
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
