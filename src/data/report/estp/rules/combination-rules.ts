import type {
  DimensionRuleCondition,
  ReportRuleDefinition,
} from "../../rules";
import { localizeEstpRule } from "../localization";

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

export const ESTP_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "estp-combination-visible-command",
      90,
      [
        dimension("EI", ["E"], ["strong", "very-strong"]),
        dimension("TF", ["T"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "estp-combination-care-adaptation",
      "Visible Direction and Rapid Coordination",
      "Strong E and T preferences may produce a visibly directive style: ideas are tested through discussion, conclusions are stated clearly, and colleagues or resources are mobilised around an objective. This tactical engagement can create momentum and make visible accountability easier to see. A possible cost is that the conclusion arrives before others understand the reasoning or contribute relevant operating evidence. State the logic and uncertainty behind the direction, then invite challenge from colleagues closest to implementation before converting alignment into action.",
    ),
    combinationRule(
      "estp-combination-tactical-action",
      89,
      [
        dimension("SN", ["S"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "estp-combination-care-adaptation",
      "Tactical Operating Evidence Into Responsive Action",
      "Strong S and J preferences may connect current facts, proven methods, ownership, and closure. The ESTP negotiator may translate a concrete requirement into priorities, real-time criteria, named responsibilities, and measurable follow-through. This tactical engagement can coordinate demanding work, but a familiar procedure may become over-centralised or resistant to operating evidence from an unusual case. Record why each control exists, give local owners real decision authority, and establish review triggers that allow the process to change when operating conditions do.",
    ),
    combinationRule(
      "estp-combination-control-risk",
      88,
      [
        dimension("TF", ["T"], ["strong", "very-strong"]),
        dimension("JP", ["P"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "estp-combination-boundary-risk",
      "Real-Time Criteria, Ownership, and Control",
      "Strong T and J preferences may support clear real-time criteria, decisive ownership, and disciplined follow-through. Under pressure, the same combination can make tighter control feel like the most rational response to uncertainty or weak action. Responsibility may be taken back from others before capability has time to develop, creating dependence and hidden workload. Separate outcomes from methods, delegate explicit decision rights, and use agreed review points so genuine risk is managed without treating personal supervision as the default source of trust.",
    ),
    combinationRule(
      "estp-combination-flexible-coordination",
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
      "estp-combination-boundary-risk",
      "Coordination That Changes With Context",
      "Borderline or balanced EI and TF results suggest that visible coordination and decision criteria may shift with role, trust, culture, group size, and current demands. The ESTP negotiator may coordinate publicly in one context, process privately in another, and move between objective real-time criteria and stakeholder consequences without contradiction. Use this flexibility consciously: name the role, operating evidence, and communication mode the situation requires rather than forcing a single image of how an ESTP should lead.",
    ),
    combinationRule(
      "estp-combination-adaptive-action",
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
      "estp-combination-change-flexibility",
      "Tactical Direction With Route Flexibility",
      "Borderline or balanced SN and JP results may combine tactical thought with meaningful situational flexibility. The ESTP negotiator can move between conceptual direction and concrete operating evidence, using adaptation where consequences require it while allowing methods to evolve. This tactical engagement can strengthen change coordination because learning does not threaten the objective. Define the stable opportunity outcome, minimum safeguards, and review date, then allow local operating evidence to reshape sequencing or technique instead of treating every adjustment as loss of control.",
    ),
    aggregateCombinationRule(
      "estp-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "estp-combination-change-flexibility",
      "A Provisional, Blended ESTP Profile",
      "Three or more low-confidence dimensions mean the ESTP result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour may vary substantially with decision authority, culture, stress, expertise, and trust. The report remains useful as a set of hypotheses, but firm claims about coordination, logic, sociability, or adaptation would exceed the operating evidence. Compare selected interpretations with repeated real situations, keep contradictory examples, and revisit the pattern if later operating evidence consistently supports a different explanation.",
    ),
    combinationRule(
      "estp-combination-private-negotiation",
      84,
      [
        dimension("JP", ["P"], ["strong", "very-strong"]),
        dimension("EI", ["I"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "estp-combination-boundary-risk",
      "Private Operating Plan and Concentrated Ownership",
      "Strong P and I preferences may support concentrated tactical work, careful private negotiation, and self-contained responsibility before visible action. The ESTP negotiator can develop a coherent direction without requiring constant external processing. A risk is that consultation, delegation, and workload remain hidden until the plan is advanced or pressure is high. Share assumptions earlier, assign ownership before action begins, and schedule a challenge point where others can materially influence the operating plan rather than merely react to a finished design.",
    ),
    combinationRule(
      "estp-combination-practical-care",
      83,
      [
        dimension("SN", ["S"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "estp-combination-change-flexibility",
      "Practical Opportunity With Stakeholder Care",
      "S-leaning and F-leaning results may combine attention to concrete requirements with stronger awareness of values, legitimacy, and stakeholder consequences. The ESTP negotiator may remain decisive and results-oriented while treating human adoption as a tactical condition rather than a secondary communication task. This does not invalidate the ESTP classification. Identify who carries implementation costs, involve affected groups in process design, and measure trust, capability, and sustained use alongside opportunity milestones.",
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
  const localized = localizeEstpRule(`${id}-block`);
  return {
    id,
    personalityType: "ESTP",
    priority,
    conditions: [{ kind: "combination", all }],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "analysis",
        title: { en: title, zh: localized.title }, content: { en: content, zh: localized.content },
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
  const localized = localizeEstpRule(`${id}-block`);
  return {
    id,
    personalityType: "ESTP",
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
        title: { en: title, zh: localized.title }, content: { en: content, zh: localized.content },
      },
    ],
    tags: ["combination"],
  };
}
