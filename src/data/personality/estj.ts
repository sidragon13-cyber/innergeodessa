import type { PersonalityProfile } from "./types";

export const estjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ESTJ",
  identity: {
    name: { en: "Executive" },
    shortName: { en: "Practical Director" },
    tagline: { en: "Decisive organiser · Accountable operator · Clear standard setter" },
    keywords: { en: ["Execution", "Order", "Responsibility", "Standards", "Directness", "Leadership"] },
  },
  overview: {
    headline: { en: "You often create progress by clarifying responsibilities, applying practical standards, and keeping commitments visible." },
    paragraphs: { en: [
      "ESTJs tend to engage directly with concrete goals, established responsibilities, and the organisation required to deliver reliable results.",
      "They may be comfortable making decisions, coordinating people, and correcting problems when expectations are unclear or performance has drifted.",
      "Their operational confidence can stabilise demanding environments, while curiosity and tact help strong standards adapt to different people and new evidence.",
    ] },
    summary: { en: "At your best, you turn shared obligations into organised action and dependable outcomes." },
    access: "free",
  },
  coreTraits: [
    { id: "operational-leadership", title: { en: "Operational Leadership" }, description: { en: "Sets practical direction and organises resources around defined responsibilities." } },
    { id: "decisive-structure", title: { en: "Decisive Structure" }, description: { en: "Prefers clear plans, timely decisions, and visible accountability." } },
    { id: "evidence-and-experience", title: { en: "Evidence and Experience" }, description: { en: "Uses concrete facts and proven practice to evaluate what will work." } },
    { id: "public-responsibility", title: { en: "Public Responsibility" }, description: { en: "Often takes an active role in maintaining standards for a team or community." } },
  ],
  strengths: [
    { id: "execution-management", title: { en: "Execution Management" }, description: { en: "Converts objectives into roles, schedules, and measurable action." } },
    { id: "clear-expectations", title: { en: "Clear Expectations" }, description: { en: "Communicates standards and responsibilities directly." } },
    { id: "resource-coordination", title: { en: "Resource Coordination" }, description: { en: "Aligns people, time, and materials with operational priorities." } },
    { id: "practical-decisions", title: { en: "Practical Decisions" }, description: { en: "Makes timely choices using available facts and experience." } },
    { id: "accountability", title: { en: "Accountability" }, description: { en: "Tracks commitments and addresses gaps rather than leaving them ambiguous." } },
    { id: "institutional-stability", title: { en: "Institutional Stability" }, description: { en: "Maintains routines and standards that support dependable service." } },
  ],
  growthRisks: [
    { id: "overdirecting", title: { en: "Overdirecting" }, description: { en: "A desire for clear execution may leave too little room for another person's method." }, growthAction: { en: "Define the required outcome and constraints, then allow appropriate autonomy in delivery." } },
    { id: "impatience-with-process", title: { en: "Impatience with Process" }, description: { en: "Discussion or exploration may seem wasteful before its value is visible." }, growthAction: { en: "Ask what uncertainty the discussion needs to resolve before setting a decision time." } },
    { id: "blunt-feedback", title: { en: "Blunt Feedback" }, description: { en: "Direct correction may reduce motivation when context and effort are ignored." }, growthAction: { en: "Describe the standard, observed gap, impact, and next step without judging the person." } },
    { id: "tradition-over-fit", title: { en: "Tradition Over Fit" }, description: { en: "An established procedure may be defended after conditions have changed." }, growthAction: { en: "Review whether the method still serves its original purpose using current evidence." } },
    { id: "emotional-underweighting", title: { en: "Underweighting Emotion" }, description: { en: "Human reactions may be treated as obstacles rather than relevant information." }, growthAction: { en: "Include trust, morale, and perceived fairness in the operational assessment." } },
    { id: "constant-responsibility", title: { en: "Constant Responsibility" }, description: { en: "Continuous oversight may crowd out recovery and strategic reflection." }, growthAction: { en: "Delegate recurring ownership and schedule time away from immediate operations." } },
  ],
  careerGroups: [
    { id: "operations-leadership", category: { en: "Operations Leadership" }, description: { en: "Operational roles reward coordination, standards, and accountable delivery." }, roles: { en: ["Operations Director", "General Manager", "Supply Chain Manager", "Programme Director"] } },
    { id: "finance-and-control", category: { en: "Finance and Control" }, description: { en: "Control environments can use practical judgement and disciplined oversight." }, roles: { en: ["Financial Controller", "Audit Manager", "Compliance Director", "Bank Manager"] } },
    { id: "public-administration", category: { en: "Public Administration" }, description: { en: "Public systems require consistent service, regulation, and resource management." }, roles: { en: ["Municipal Manager", "Public Administration Director", "Emergency Services Manager", "Regulatory Manager"] } },
    { id: "commercial-management", category: { en: "Commercial Management" }, description: { en: "Commercial teams benefit from targets, direct decisions, and performance discipline." }, roles: { en: ["Sales Director", "Retail Area Manager", "Commercial Manager", "Business Unit Leader"] } },
  ],
  careerNotice: { en: "Personality type can indicate preferred leadership and working patterns, but it does not prescribe or restrict your career path." },
  premiumPreview: {
    headline: { en: "Lead clear execution while expanding flexibility and trust." },
    introduction: { en: "A deeper report will examine standards, decisions, delegation, communication, work fit, and recovery." },
    sections: [
      { id: "leadership-standards", title: { en: "Leadership Standards" }, description: { en: "How expectations and accountability shape performance." }, access: "premium" },
      { id: "decision-tempo", title: { en: "Decision Tempo" }, description: { en: "Balancing speed with exploration and participation." }, access: "premium" },
      { id: "delegation-practice", title: { en: "Delegation Practice" }, description: { en: "Transferring real ownership without losing clarity." }, access: "premium" },
      { id: "feedback-impact", title: { en: "Feedback Impact" }, description: { en: "Making direct correction specific and constructive." }, access: "premium" },
      { id: "change-readiness", title: { en: "Change Readiness" }, description: { en: "Updating proven methods when evidence shifts." }, access: "premium" },
      { id: "career-context", title: { en: "Career Context" }, description: { en: "Environments that reward responsibility and operational authority." }, access: "premium" },
      { id: "relationship-dynamics", title: { en: "Relationship Dynamics" }, description: { en: "How directness and reliability influence trust." }, access: "premium" },
      { id: "sustainable-command", title: { en: "Sustainable Command" }, description: { en: "A plan for balancing oversight, reflection, and recovery." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ESTJ report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
