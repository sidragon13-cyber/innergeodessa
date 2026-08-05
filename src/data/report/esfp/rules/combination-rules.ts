import type {
  DimensionRuleCondition,
  ReportRuleDefinition,
} from "../../rules";

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ESFP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "esfp-combination-visible-experiment",
      90,
      [
        dimension("EI", ["E"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "esfp-combination-experiment",
      "Visible Participation and Rapid Experiment",
      "Strong E and P preferences may produce a highly interactive exploratory style. Experiences are generated through conversation, environmental contact, and quick trials, allowing the ESFP participant to build momentum before a complete plan exists. The participation risk is opening more experiments than the available attention can integrate. Limit concurrent trials, state what each one is meant to learn, and schedule a convergence point where evidence determines which direction receives sustained effort.",
    ),
    combinationRule(
      "esfp-combination-values-experience",
      89,
      [
        dimension("SN", ["S"], ["strong", "very-strong"]),
        dimension("TF", ["F"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "esfp-combination-experiment",
      "Imaginative Range and Values-Led Experience",
      "Strong S and F preferences may combine rapid experience generation with close attention to meaning, agency, and human potential. The ESFP can connect distant experiences and help people imagine a route that feels more alive or congruent. Inspiration may still outrun consent, evidence, or practical capacity. Ask whose value is being expressed, invite affected people to reshape the shared experience, and choose one small experiment that shows whether the experience improves lived experience.",
    ),
    combinationRule(
      "esfp-combination-diffusion-risk",
      88,
      [
        dimension("SN", ["S"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "esfp-combination-focus-risk",
      "Experience Expansion and Diffused Commitment",
      "Strong S and P preferences may keep the option space unusually broad. This supports discovery when the problem is uncertain, but every new connection can compete with existing delivery. The ESFP participant may confuse preserving experiences with preserving freedom while collaborators absorb completion costs. Use a fixed participation window, rank options against explicit criteria, and close, transfer, or pause one commitment before opening another substantial line of work.",
    ),
    combinationRule(
      "esfp-combination-relational-flexibility",
      87,
      [
        dimension("EI", ["I", "E", "X"], [
          "borderline",
          "balanced",
        ]),
        dimension("TF", ["F", "T", "X"], [
          "borderline",
          "balanced",
        ]),
      ],
      "growth-roadmap",
      "esfp-combination-focus-risk",
      "Context-Sensitive Dialogue",
      "Borderline or balanced EI and TF results suggest that conversational energy and decision criteria may shift substantially with trust, role, stakes, and group size. The ESFP participant may dialogue visibly in one setting, process privately in another, and move between values-sensitive invitation and relational consideration without contradiction. Use that range deliberately: identify whether a conversation requires participation, decision, support, or private synthesis before choosing how intensely to engage.",
    ),
    combinationRule(
      "esfp-combination-grounded-adaptation",
      86,
      [
        dimension("SN", ["S", "N", "X"], [
          "borderline",
          "balanced",
        ]),
        dimension("JP", ["J", "P", "X"], [
          "borderline",
          "balanced",
        ]),
      ],
      "change-and-adaptation",
      "esfp-combination-adaptation",
      "Adaptive Shared Experiences With Practical Anchors",
      "Borderline or balanced SN and JP results may support movement between imaginative alternatives, practical evidence, openness, and timely structure. The ESFP participant can reframe a problem without losing contact with implementation and can stabilise an experiment when consequences require it. Make this flexibility visible by naming which outcome is fixed, which method is adjustable, and which concrete observation will determine whether the next adaptation is warranted.",
    ),
    aggregateCombinationRule(
      "esfp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "esfp-combination-adaptation",
      "A Provisional, Blended ESFP Profile",
      "Three or more low-confidence dimensions mean the ESFP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about sociability, abstraction, values, or spontaneity would exceed the evidence. Compare interpretations with repeated real situations and retain contradictory examples instead of forcing them into one type story.",
    ),
    combinationRule(
      "esfp-combination-private-model-building",
      84,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["S"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "esfp-combination-focus-risk",
      "Private Participation and Deep Model Building",
      "Strong I and N preferences may shift the ESFP pattern away from a visibly dialogue-oriented stereotype. Experiences may develop through solitary research, internal simulation, and selective exchange. This expressive participation can produce depth and originality, while shared experiences may remain private too long to receive practical or relational invitation. Share an early model with a knowledgeable partner, specify what feedback would change it, and connect private participation to one observable experiment.",
    ),
    combinationRule(
      "esfp-combination-values-led-encouragement",
      83,
      [
        dimension("SN", ["S"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "esfp-combination-adaptation",
      "Experience With Values and Adoption",
      "S-leaning and F-leaning results may combine experience generation with stronger attention to values, legitimacy, and stakeholder experience. The ESFP participant may challenge inherited arrangements because they constrain people as well as shared experiences. This does not invalidate the ESFP classification. Test whether the proposed change improves real agency, involve affected people in defining the experiment, and measure trust and sustained adoption alongside novelty or imaginative elegance.",
    ),
  ];

function dimension(
  dimensionCode: DimensionRuleCondition["dimension"],
  preferences: NonNullable<
    DimensionRuleCondition["preferences"]
  >,
  bands: NonNullable<DimensionRuleCondition["bands"]>,
): DimensionRuleCondition {
  return {
    kind: "dimension",
    dimension: dimensionCode,
    preferences,
    bands,
  };
}

function combinationRule(
  id: string,
  priority: number,
  all: DimensionRuleCondition[],
  targetSectionId: string,
  targetSlotId: string,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "ESFP",
    priority,
    conditions: [{ kind: "combination", all }],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title },
        content: { en: content },
      },
    ],
    tags: ["combination"],
  };
}

function aggregateCombinationRule(
  id: string,
  priority: number,
  metric: "low-confidence-count",
  value: number,
  targetSectionId: string,
  targetSlotId: string,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "ESFP",
    priority,
    conditions: [
      {
        kind: "aggregate",
        metric,
        operator: "gte",
        value,
      },
    ],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "guidance",
        title: { en: title },
        content: { en: content },
      },
    ],
    tags: ["combination"],
  };
}
