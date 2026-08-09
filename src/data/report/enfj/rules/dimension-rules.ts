import type {
  DimensionBand,
  DimensionCode,
  PreferenceLetter,
  ReportRuleDefinition,
} from "../../rules";
import { localizeRule } from "../localization";

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
    "Borderline confidence means the adjacent preference may be similarly available, so behaviour may shift with role, group size, culture, trust, energy, and current demands. This variation is useful context rather than contradiction.",
  moderate:
    "Moderate confidence suggests a recognisable tendency without making the opposite approach unusual. Experience and situational demands may substantially change which behaviour is visible.",
  strong:
    "Strong confidence suggests this preference is likely to appear consistently across familiar settings. It may support repeatable strengths, while deliberate use of the opposite approach can reduce overuse.",
  "very-strong":
    "Very strong confidence suggests a highly consistent preference, not greater competence or leadership quality. The familiar approach may feel efficient, but its blind spots deserve active counterbalancing under pressure.",
};

const CONFIGS: DimensionRuleConfig[] = [
  {
    dimension: "EI",
    firstPreference: "I",
    secondPreference: "E",
    slotId: "enfj-ei-strength",
    firstDirection:
      "An I-leaning ENFJ may develop strategy through private analysis, prepare before visible action, and communicate selectively once the direction is coherent. Leadership may therefore look quieter, more deliberate, and less socially expansive while remaining structured and results-oriented. This preference does not invalidate the ENFJ classification and does not establish leadership ability.",
    secondDirection:
      "An E-leaning ENFJ may process ideas through interaction, initiate discussion, coordinate visibly, and mobilise people and relationships around a shared result. Rapid feedback can sharpen action, although constant outward engagement may produce overextension or leave too little time for private reflection. This preference describes an energy and processing tendency, not automatic influence or leadership skill.",
    balancedDirection:
      "A balanced EI result suggests access to both visible coordination and private relational work. The person may lead discussion in one setting and withdraw for independent analysis in another, depending on role, group size, trust, energy, and stakes. This flexibility is not inconsistency and does not determine ability.",
    guidance:
      "Choose the mode the work requires: schedule private synthesis before consequential decisions, and use purposeful discussion when wider evidence, alignment, or rapid feedback will improve the result.",
  },
  {
    dimension: "SN",
    firstPreference: "S",
    secondPreference: "N",
    slotId: "enfj-sn-boundary",
    firstDirection:
      "An S-leaning ENFJ may give greater weight to evidence, concrete constraints, practical sequencing, and measurable implementation. Strategy may begin with current operational reality and build through explicit milestones rather than broad abstraction. This preference does not invalidate the ENFJ classification or imply less relational ability; it changes the evidence through which direction becomes credible.",
    secondDirection:
      "An N-leaning ENFJ may focus readily on systems, future consequences, relational patterns, abstraction, and high-leverage changes. This can support long-range direction, while operational details or contradictory local evidence may receive insufficient attention. The preference indicates where attention often starts, not proof of superior vision, innovation, or relational competence.",
    balancedDirection:
      "A balanced SN result suggests that relational abstraction and practical grounding may be similarly accessible. The person may identify a long-range pattern and then test it against concrete constraints, or begin with operational evidence before reframing the system. Which mode appears can depend on expertise, time horizon, and risk.",
    guidance:
      "Connect strategy and development explicitly: state the governing pattern, identify the operational facts that could disprove it, and assign measures that reveal whether the proposed leverage point works in practice.",
  },
  {
    dimension: "TF",
    firstPreference: "F",
    secondPreference: "T",
    slotId: "enfj-tf-boundary",
    firstDirection:
      "An F-leaning ENFJ may place stronger emphasis on community experience, values, legitimacy, and relational consequences while remaining decisive and structured. Human adoption may enter the decision model earlier and carry more weight in trade-offs. This preference does not invalidate the ENFJ classification, weaken care, or guarantee interpersonal skill.",
    secondDirection:
      "A T-leaning ENFJ may favour objective criteria, trade-offs, consistency, standards, efficiency, and direct evaluation. This can make decisions and accountability easier to explain, but adoption, morale, emotional information, or contextual costs may be underweighted. Care is a preferred criterion, not evidence of intelligence, emotional absence, or sound judgement.",
    balancedDirection:
      "A balanced TF result suggests that impersonal criteria and human consequences may both influence decisions without one consistently dominating. The person may use firm standards while treating community impact as relevant evidence. Different roles can bring different criteria forward without making the overall pattern contradictory.",
    guidance:
      "For a consequential decision, record both the objective trade-offs and the human implementation evidence. Name which criterion governs the choice, who carries the cost, and what feedback would justify revision.",
  },
  {
    dimension: "JP",
    firstPreference: "J",
    secondPreference: "P",
    slotId: "enfj-jp-boundary",
    firstDirection:
      "A J-leaning ENFJ may prefer closure, structure, ownership, planning, accountability, and explicit decision deadlines. This can turn strategy into coordinated development, while strong pressure for certainty may centralise overreach or close inquiry too early. The preference describes an orientation to organisation, not proof of reliability, discipline, or management ability.",
    secondDirection:
      "A P-leaning ENFJ may retain more openness, iterate as evidence develops, and allow routes to change while preserving a relational outcome. Closure may be delayed until uncertainty falls or experimentation produces better information. This does not invalidate the ENFJ classification or imply weak development; results can remain central even when methods stay flexible.",
    balancedDirection:
      "A balanced JP result suggests selective use of structure alongside meaningful adaptability. The person may establish clear outcomes, ownership, and safeguards while allowing methods or timing to evolve with evidence. Context, reversibility, and consequence may determine when closure is useful and when it is premature.",
    guidance:
      "Separate stable outcomes from adjustable methods. Set a decision date, review trigger, and minimum safeguards so flexibility supports learning without becoming drift and structure supports delivery without becoming unnecessary overreach.",
  },
];

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ENFJ_DIMENSION_RULES:
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
        id: `enfj-${config.dimension.toLowerCase()}-balanced`,
        personalityType: "ENFJ",
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
            blockId: `enfj-rule-${config.dimension.toLowerCase()}-balanced`,
            blockType: "analysis",
            title: {
              en: `${config.dimension} Is Exactly Balanced`,
              zh: localizeRule(`enfj-${config.dimension.toLowerCase()}-balanced`).title,
            },
            content: {
              en: `${config.balancedDirection} ${config.guidance}`,
              zh: localizeRule(`enfj-${config.dimension.toLowerCase()}-balanced`).content,
            },
          },
        ],
        exclusiveGroup: `enfj-dimension-${config.dimension}`,
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
  const ruleId = `enfj-${dimensionId}-${preference.toLowerCase()}-${band}`;
  const localized = localizeRule(ruleId);

  return {
    id: ruleId,
    personalityType: "ENFJ",
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
        blockId: `enfj-rule-${dimensionId}-${preference.toLowerCase()}-${band}`,
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
    exclusiveGroup: `enfj-dimension-${config.dimension}`,
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
