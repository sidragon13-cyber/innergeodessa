import type {
  PreferenceClarityBand,
} from "./preference-clarity";
import type {
  PreferenceDirection,
} from "./preference-band-content";

/**
 * Canonical English labels for the current Preference Clarity model.
 *
 * These labels correspond exactly to:
 * 0–25      Near Boundary
 * >25–50    Moderate Preference
 * >50–75    Clear Preference
 * >75–100   Highly Clear
 *
 * They describe preference clarity only.
 * They do not describe ability, competence, maturity,
 * intelligence, personality quality, or probability.
 */
export const PREFERENCE_CLARITY_LABEL_EN: Readonly<
  Record<PreferenceClarityBand, string>
> = {
  "near-boundary": "Near Boundary",
  "moderate-preference": "Moderate Preference",
  "clear-preference": "Clear Preference",
  "highly-clear": "Highly Clear",
};

/**
 * Shared English Preference Clarity interpretation blocks.
 *
 * 8 directions × 4 bands = 32 deterministic blocks.
 *
 * These are language assets only. They must not redefine
 * scoring, thresholds, Profile routing, or personality type.
 */
export const GLOBAL_PREFERENCE_BAND_CONTENT_EN: Readonly<
  Record<
    PreferenceDirection,
    Readonly<Record<PreferenceClarityBand, string>>
  >
> = {
  I: {
    "near-boundary":
      "Your I preference currently sits near the E/I boundary. Although this result still points toward I, the distinction between internal processing and external interaction is relatively small. Across different tasks, environments, or relationships, either approach may feel natural. This describes preference clarity only; it does not measure social ability, independent thinking, or communication skill.",
    "moderate-preference":
      "Your I preference currently falls within the Moderate Preference range. The result shows a recognisable tendency toward internal processing, independent organisation of ideas, and forming a personal view before expressing it, while still leaving meaningful room for situational flexibility. In settings that benefit from discussion, immediate feedback, or active interaction, the opposite approach may also feel natural. This describes preference clarity only; it does not measure social ability, independent thinking, or communication skill.",
    "clear-preference":
      "Your I preference currently falls within the Clear Preference range. Internal processing, independent organisation of ideas, and forming a personal view before expression appear as relatively clear preferences in this assessment. In situations requiring concentration or complex information processing, this approach may often become a natural starting point. This describes preference clarity only; it does not measure social ability, independent thinking, or communication skill.",
    "highly-clear":
      "Your I preference currently falls within the Highly Clear range. In this assessment, internal processing, independent organisation of ideas, and forming a personal view before expression were expressed very clearly and may frequently serve as natural starting points for processing information. Highly Clear does not mean that you lack the ability to engage externally, nor does it indicate stronger independent thinking, social ability, or communication skill.",
  },

  E: {
    "near-boundary":
      "Your E preference currently sits near the E/I boundary. Although this result still points toward E, the distinction between processing information through external interaction and immediate exchange versus internal organisation and independent reflection is relatively small. Across different tasks, environments, or relationships, either approach may feel natural. This describes preference clarity only; it does not measure sociability, communication skill, confidence, or leadership ability.",
    "moderate-preference":
      "Your E preference currently falls within the Moderate Preference range. The result shows a recognisable tendency toward external interaction, immediate exchange, and using feedback to move thinking forward, while still leaving meaningful room for situational flexibility. In settings that require independent reflection, internal organisation, or sustained concentration, the opposite approach may also feel natural. This describes preference clarity only; it does not measure sociability, communication skill, confidence, or leadership ability.",
    "clear-preference":
      "Your E preference currently falls within the Clear Preference range. Using external interaction, immediate exchange, and environmental feedback to process information appears as a relatively clear preference in this assessment. In situations involving discussion, collaboration, or rapid information exchange, this approach may often become a natural starting point. This describes preference clarity only; it does not measure sociability, communication skill, confidence, or leadership ability.",
    "highly-clear":
      "Your E preference currently falls within the Highly Clear range. In this assessment, processing information and developing ideas through external interaction, immediate exchange, and environmental feedback were expressed very clearly and may frequently serve as natural starting points. Highly Clear does not mean that you lack the ability to think independently or process information internally, nor does it indicate stronger social, communication, or leadership ability.",
  },

  N: {
    "near-boundary":
      "Your N preference currently sits near the S/N boundary. Although this result still points toward N, the distinction between attending to patterns, connections, and possibilities versus concrete facts and direct experience is relatively small. Across different tasks or situations, either information-processing approach may feel natural. This describes preference clarity only; it does not measure creativity, strategic ability, intelligence, or predictive ability.",
    "moderate-preference":
      "Your N preference currently falls within the Moderate Preference range. The result shows a recognisable tendency toward pattern recognition, conceptual connections, and possibilities, while still leaving meaningful room for situational flexibility. When concrete facts, practical details, or direct experience are especially important, the opposite approach may also feel natural. This describes preference clarity only; it does not measure creativity, strategic ability, intelligence, or predictive ability.",
    "clear-preference":
      "Your N preference currently falls within the Clear Preference range. Attention to patterns, connections, concepts, and emerging possibilities appears as a relatively clear information-processing preference in this assessment. When facing complex information, longer-term questions, or open-ended issues, this approach may often become a natural starting point. This describes preference clarity only; it does not measure creativity, strategic ability, intelligence, or predictive ability.",
    "highly-clear":
      "Your N preference currently falls within the Highly Clear range. In this assessment, attention to patterns, connections, concepts, and longer-term possibilities was expressed very clearly and may frequently serve as a natural starting point for understanding information and organising problems. Highly Clear does not mean that you lack the ability to work with concrete facts or practical details, nor does it indicate greater creativity, strategic ability, or intelligence.",
  },

  S: {
    "near-boundary":
      "Your S preference currently sits near the S/N boundary. Although this result still points toward S, the distinction between attending to concrete facts, direct experience, and present information versus patterns, connections, and possibilities is relatively small. Across different tasks or situations, either information-processing approach may feel natural. This describes preference clarity only; it does not measure observation, memory, practical ability, or intelligence.",
    "moderate-preference":
      "Your S preference currently falls within the Moderate Preference range. The result shows a recognisable tendency toward concrete facts, direct experience, and practical detail, while still leaving meaningful room for situational flexibility. When concepts, patterns, connections, or future possibilities are especially important, the opposite approach may also feel natural. This describes preference clarity only; it does not measure observation, memory, practical ability, or intelligence.",
    "clear-preference":
      "Your S preference currently falls within the Clear Preference range. Attention to concrete facts, direct experience, observable information, and present conditions appears as a relatively clear information-processing preference in this assessment. When dealing with practical problems or clearly defined information, this approach may often become a natural starting point. This describes preference clarity only; it does not measure observation, memory, practical ability, or intelligence.",
    "highly-clear":
      "Your S preference currently falls within the Highly Clear range. In this assessment, attention to concrete facts, direct experience, observable information, and present conditions was expressed very clearly and may frequently serve as a natural starting point for understanding information and organising problems. Highly Clear does not mean that you lack the ability to think abstractly or explore possibilities, nor does it indicate stronger observation, practical ability, or intelligence.",
  },

  T: {
    "near-boundary":
      "Your T preference currently sits near the T/F boundary. Although this result still points toward T, the distinction between judging through logic, standards, and consistency versus values, relationships, and contextual impact is relatively small. Across different problems or relationship contexts, either decision approach may feel natural. This describes preference clarity only; it does not measure logical ability, emotional intelligence, rationality, or decision quality.",
    "moderate-preference":
      "Your T preference currently falls within the Moderate Preference range. The result shows a recognisable tendency toward logical standards, consistency, and principle-based judgement, while still leaving meaningful room for situational flexibility. In questions involving relationships, values, or human impact, the opposite decision approach may also participate naturally. This describes preference clarity only; it does not measure logical ability, emotional intelligence, rationality, or decision quality.",
    "clear-preference":
      "Your T preference currently falls within the Clear Preference range. Organising judgement around logic, standards, and consistency appears as a relatively clear decision preference in this assessment. When analysing problems, comparing options, or handling principle-based questions, this approach may often become a natural starting point. This describes preference clarity only; it does not measure logical ability, emotional intelligence, rationality, or decision quality.",
    "highly-clear":
      "Your T preference currently falls within the Highly Clear range. In this assessment, using logic, standards, consistency, and principles as primary decision criteria was expressed very clearly and may frequently serve as a natural starting point for evaluating problems and organising decisions. Highly Clear does not mean that you lack empathy or awareness of relationships, nor does it indicate stronger logic, rationality, or decision quality.",
  },

  F: {
    "near-boundary":
      "Your F preference currently sits near the T/F boundary. Although this result still points toward F, the distinction between considering values, relationships, and contextual impact versus judging through logic, standards, and consistency is relatively small. Across different problems or relationship contexts, either decision approach may feel natural. This describes preference clarity only; it does not measure emotional intelligence, empathy, emotional sensitivity, or decision quality.",
    "moderate-preference":
      "Your F preference currently falls within the Moderate Preference range. The result shows a recognisable tendency to include values, relationships, and contextual impact in judgement, while still leaving meaningful room for situational flexibility. When principles, standards, or logical consistency are especially important, the opposite decision approach may also participate naturally. This describes preference clarity only; it does not measure emotional intelligence, empathy, emotional sensitivity, or decision quality.",
    "clear-preference":
      "Your F preference currently falls within the Clear Preference range. Including values, relationships, human impact, and context in judgement appears as a relatively clear decision preference in this assessment. In situations involving cooperation, communication, or stakeholder impact, this approach may often become a natural starting point. This describes preference clarity only; it does not measure emotional intelligence, empathy, emotional sensitivity, or decision quality.",
    "highly-clear":
      "Your F preference currently falls within the Highly Clear range. In this assessment, using values, relationships, human impact, and context as important decision criteria was expressed very clearly and may frequently serve as a natural starting point for evaluating problems and organising decisions. Highly Clear does not mean that you lack logic or principled judgement, nor does it indicate stronger emotional intelligence, empathy, or decision quality.",
  },

  J: {
    "near-boundary":
      "Your J preference currently sits near the J/P boundary. Although this result still points toward J, the distinction between structure, planning, and closure versus openness, flexibility, and continued adjustment is relatively small. Across different tasks and life situations, either action approach may feel natural. This describes preference clarity only; it does not measure execution, self-discipline, management ability, efficiency, or reliability.",
    "moderate-preference":
      "Your J preference currently falls within the Moderate Preference range. The result shows a recognisable tendency toward structure, planning, and completion, while still leaving meaningful room for situational flexibility. When rapid adaptation, keeping options open, or revising plans in response to new information is important, the opposite approach may also feel natural. This describes preference clarity only; it does not measure execution, self-discipline, management ability, efficiency, or reliability.",
    "clear-preference":
      "Your J preference currently falls within the Clear Preference range. Establishing structure, forming plans, and moving activity toward a defined outcome appears as a relatively clear action preference in this assessment. When goals are clear or complex tasks require organisation, this approach may often become a natural starting point. This describes preference clarity only; it does not measure execution, self-discipline, management ability, efficiency, or reliability.",
    "highly-clear":
      "Your J preference currently falls within the Highly Clear range. In this assessment, preference for structure, planning, explicit arrangements, and closure was expressed very clearly and may frequently serve as a natural starting point for organising action and tasks. Highly Clear does not mean that you lack flexibility, nor does it indicate stronger execution, self-discipline, management ability, or efficiency.",
  },

  P: {
    "near-boundary":
      "Your P preference currently sits near the J/P boundary. Although this result still points toward P, the distinction between openness, flexibility, and continued adjustment versus structure, planning, and closure is relatively small. Across different tasks and life situations, either action approach may feel natural. This describes preference clarity only; it does not measure adaptability, execution, self-discipline, efficiency, or reliability.",
    "moderate-preference":
      "Your P preference currently falls within the Moderate Preference range. The result shows a recognisable tendency toward openness, keeping options available, and adjusting in response to new information, while still leaving meaningful room for situational flexibility. When clear planning, stronger structure, or deliberate completion is important, the opposite approach may also feel natural. This describes preference clarity only; it does not measure adaptability, execution, self-discipline, efficiency, or reliability.",
    "clear-preference":
      "Your P preference currently falls within the Clear Preference range. Maintaining openness, preserving room for adjustment, and revising action as new information appears is a relatively clear action preference in this assessment. In changing environments, evolving information, or exploratory work, this approach may often become a natural starting point. This describes preference clarity only; it does not measure adaptability, execution, self-discipline, efficiency, or reliability.",
    "highly-clear":
      "Your P preference currently falls within the Highly Clear range. In this assessment, preference for keeping options open, preserving room for adjustment, and changing action as new information appears was expressed very clearly and may frequently serve as a natural starting point for organising action and tasks. Highly Clear does not mean that you lack planning or structural ability, nor does it indicate stronger adaptability, execution, or efficiency.",
  },
};
