import type {
  DimensionRuleCondition,
  ReportRuleDefinition,
} from "../../rules";
import { localizeRule } from "../localization";

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ESFJ_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "esfj-combination-visible-guidance",
      90,
      [
        dimension("EI", ["E"], ["strong", "very-strong"]),
        dimension("TF", ["F"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "esfj-combination-care-structure",
      "Visible Encouragement and Interpersonal Momentum",
      "Strong E and F preferences may make attention to community members highly visible: needs are explored through conversation, shared contribution is articulated aloud, and energy is mobilised around shared wellbeing. This can strengthen belonging and momentum. A possible cost is that enthusiasm feels like pressure to agree or disclose. State the invitation and its limits, make dissent safe, and ask each person what practical participation they actually choose before interpreting warmth as commitment.",
    ),
    combinationRule(
      "esfj-combination-interpersonal-development",
      89,
      [
        dimension("SN", ["S"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "esfj-combination-care-structure",
      "Concrete Needs Into Dependable Support",
      "Strong S and J preferences may connect attention to present needs with routines, ownership, and reliable closure. The person may translate a visible community requirement into practical roles, schedules, and follow-through. This can make care dependable, but familiar arrangements may become over-centralised or resistant to an exception. Ask whether the routine still helps its recipients, give local participants real authority, and establish review points that allow the structure to change when circumstances do.",
    ),
    combinationRule(
      "esfj-combination-overreach-risk",
      88,
      [
        dimension("TF", ["F"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "esfj-combination-boundary-risk",
      "Care, Commitment, and Over-Responsibility",
      "Strong F and J preferences may support dependable care, coordinated development, and follow-through on promises to a community. Under pressure, the ESFJ may take responsibility for morale, growth, and agreement that properly belongs to several community members. This creates hidden workload and can limit others' agency. Separate support from ownership, ask what help is wanted, assign explicit decision rights, and allow discomfort that does not signal harm to remain part of another person's learning.",
    ),
    combinationRule(
      "esfj-combination-flexible-coordination",
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
      "esfj-combination-boundary-risk",
      "Coordination That Changes With Context",
      "Borderline or balanced EI and TF results suggest that visible coordination and decision criteria may shift with role, trust, culture, community size, and current demands. The person may coordinate publicly in one context, process privately in another, and move between objective standards and community consequences without contradiction. Use this flexibility consciously: name the role, evidence, and communication mode the situation requires rather than forcing a single image of how an ESFJ should lead.",
    ),
    combinationRule(
      "esfj-combination-adaptive-strategy",
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
      "esfj-combination-change-flexibility",
      "Interpersonal Direction With Route Flexibility",
      "Borderline or balanced SN and JP results may combine interpersonal awareness with practical situational flexibility. The person can move between shared direction and concrete evidence, using structure where consequences require it while allowing methods to evolve. This can strengthen change coordination because learning does not threaten the objective. Define the stable outcome, minimum safeguards, and review date, then allow local evidence to reshape sequencing or technique instead of treating every adjustment as loss of control.",
    ),
    aggregateCombinationRule(
      "esfj-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "esfj-combination-change-flexibility",
      "A Provisional, Blended ESFJ Profile",
      "Three or more low-confidence dimensions mean the ESFJ result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour may vary substantially with authority, culture, stress, expertise, and trust. The report remains useful as a set of hypotheses, but firm claims about coordination, care, sociability, or structure would exceed the evidence. Compare selected interpretations with repeated real situations, keep contradictory examples, and revisit the pattern if later evidence consistently supports a different explanation.",
    ),
    combinationRule(
      "esfj-combination-private-strategy",
      84,
      [
        dimension("JP", ["J"], ["strong", "very-strong"]),
        dimension("EI", ["I"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "esfj-combination-boundary-risk",
      "Private Strategy and Concentrated Ownership",
      "Strong J and I preferences may support concentrated interpersonal work, careful private planning, and self-contained responsibility before visible action. The person can develop a coherent direction without requiring constant external processing. A risk is that consultation, delegation, and workload remain hidden until the plan is advanced or pressure is high. Share assumptions earlier, assign ownership before development begins, and schedule a challenge point where others can materially influence the strategy rather than merely react to a finished design.",
    ),
    combinationRule(
      "esfj-combination-practical-belonging",
      83,
      [
        dimension("SN", ["S"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "esfj-combination-change-flexibility",
      "Practical Attention With Community Belonging",
      "S-leaning and F-leaning results may combine attention to concrete circumstances with shared values, belonging, and the lived consequences of a decision. The person may remain organised and results-oriented while treating human adoption as part of successful delivery rather than a secondary communication task. This does not invalidate the ESFJ classification. Ask who carries practical costs, involve affected communities in implementation design, and measure trust, usefulness, and sustained practical participation alongside milestones.",
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
  const localized = localizeRule(id);
  return {
    id,
    personalityType: "ESFJ",
    priority,
    conditions: [{ kind: "combination", all }],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title, zh: localized.title },
        content: { en: content, zh: localized.content },
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
  const localized = localizeRule(id);
  return {
    id,
    personalityType: "ESFJ",
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
        title: { en: title, zh: localized.title },
        content: { en: content, zh: localized.content },
      },
    ],
    tags: ["combination"],
  };
}
