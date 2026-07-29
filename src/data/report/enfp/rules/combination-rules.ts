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

export const ENFP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "enfp-combination-visible-experiment",
      90,
      [
        dimension("EI", ["E"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "enfp-combination-experiment",
      "Visible Exploration and Rapid Experiment",
      "Strong E and P preferences may produce a highly interactive exploratory style. Possibilities are generated through conversation, environmental contact, and quick trials, allowing the person to build momentum before a complete plan exists. The risk is opening more experiments than the available attention can integrate. Limit concurrent trials, state what each one is meant to learn, and schedule a convergence point where evidence determines which direction receives sustained effort.",
    ),
    combinationRule(
      "enfp-combination-values-possibility",
      89,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("TF", ["F"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "enfp-combination-experiment",
      "Imaginative Range and Values-Led Possibility",
      "Strong N and F preferences may combine rapid possibility generation with close attention to meaning, agency, and human potential. The ENFP can connect distant experiences and help people imagine a route that feels more alive or congruent. Inspiration may still outrun consent, evidence, or practical capacity. Ask whose value is being expressed, invite affected people to reshape the idea, and choose one small experiment that shows whether the possibility improves lived experience.",
    ),
    combinationRule(
      "enfp-combination-diffusion-risk",
      88,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "enfp-combination-focus-risk",
      "Possibility Expansion and Diffused Commitment",
      "Strong N and P preferences may keep the option space unusually broad. This supports discovery when the problem is uncertain, but every new connection can compete with existing delivery. The person may confuse preserving possibilities with preserving freedom while collaborators absorb completion costs. Use a fixed exploration window, rank options against explicit criteria, and close, transfer, or pause one commitment before opening another substantial line of work.",
    ),
    combinationRule(
      "enfp-combination-relational-flexibility",
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
      "enfp-combination-focus-risk",
      "Context-Sensitive Dialogue",
      "Borderline or balanced EI and TF results suggest that conversational energy and decision criteria may shift substantially with trust, role, stakes, and group size. The person may dialogue visibly in one setting, process privately in another, and move between values-sensitive invitation and relational consideration without contradiction. Use that range deliberately: identify whether a conversation requires exploration, decision, support, or private synthesis before choosing how intensely to engage.",
    ),
    combinationRule(
      "enfp-combination-grounded-adaptation",
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
      "enfp-combination-adaptation",
      "Adaptive Ideas With Practical Anchors",
      "Borderline or balanced SN and JP results may support movement between imaginative alternatives, practical evidence, openness, and timely structure. The person can reframe a problem without losing contact with implementation and can stabilise an experiment when consequences require it. Make this flexibility visible by naming which outcome is fixed, which method is adjustable, and which concrete observation will determine whether the next adaptation is warranted.",
    ),
    aggregateCombinationRule(
      "enfp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "enfp-combination-adaptation",
      "A Provisional, Blended ENFP Profile",
      "Three or more low-confidence dimensions mean the ENFP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about sociability, abstraction, values, or spontaneity would exceed the evidence. Compare interpretations with repeated real situations and retain contradictory examples instead of forcing them into one type story.",
    ),
    combinationRule(
      "enfp-combination-private-model-building",
      84,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["N"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "enfp-combination-focus-risk",
      "Private Exploration and Deep Model Building",
      "Strong I and N preferences may shift the ENFP pattern away from a visibly dialogue-oriented stereotype. Possibilities may develop through solitary research, internal simulation, and selective exchange. This can produce depth and originality, while ideas may remain private too long to receive practical or relational invitation. Share an early model with a knowledgeable partner, specify what feedback would change it, and connect private exploration to one observable experiment.",
    ),
    combinationRule(
      "enfp-combination-values-led-innovation",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "enfp-combination-adaptation",
      "Possibility With Values and Adoption",
      "N-leaning and F-leaning results may combine possibility generation with stronger attention to values, legitimacy, and stakeholder experience. The person may challenge inherited arrangements because they constrain people as well as ideas. This does not invalidate the ENFP classification. Test whether the proposed change improves real agency, involve affected people in defining the experiment, and measure trust and sustained adoption alongside novelty or imaginative elegance.",
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
    personalityType: "ENFP",
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
    personalityType: "ENFP",
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
