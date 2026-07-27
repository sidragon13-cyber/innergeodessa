import type { PersonalityProfile } from "./types";

export const istjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ISTJ",
  identity: {
    name: { en: "Logistician" },
    shortName: { en: "Dependable Organiser" },
    tagline: { en: "Careful realist · Consistent steward · Methodical planner" },
    keywords: { en: ["Reliability", "Accuracy", "Duty", "Order", "Practicality", "Consistency"] },
  },
  overview: {
    headline: { en: "You often build trust through careful preparation, consistent standards, and dependable follow-through." },
    paragraphs: { en: [
      "ISTJs tend to focus on concrete responsibilities, proven information, and orderly methods that reduce avoidable error.",
      "They may prefer clear expectations and enough independence to complete work thoroughly, especially where continuity and accountability matter.",
      "Their steadiness can protect people and systems, while openness to changing conditions helps reliable practice remain relevant.",
    ] },
    summary: { en: "At your best, you turn responsibility into stable systems and results that others can confidently rely on." },
    access: "free",
  },
  coreTraits: [
    { id: "practical-reliability", title: { en: "Practical Reliability" }, description: { en: "Approaches commitments with realism, preparation, and a strong preference for completion." } },
    { id: "evidence-based-memory", title: { en: "Evidence-Based Memory" }, description: { en: "Draws on detailed experience and established facts when assessing a situation." } },
    { id: "structured-method", title: { en: "Structured Method" }, description: { en: "Creates order through procedures, schedules, and clear standards." } },
    { id: "independent-duty", title: { en: "Independent Duty" }, description: { en: "Often takes personal responsibility without needing frequent attention or reassurance." } },
  ],
  strengths: [
    { id: "consistent-delivery", title: { en: "Consistent Delivery" }, description: { en: "Completes agreed work carefully and predictably." } },
    { id: "detail-accuracy", title: { en: "Detail Accuracy" }, description: { en: "Notices discrepancies and maintains precise records or processes." } },
    { id: "risk-awareness", title: { en: "Risk Awareness" }, description: { en: "Anticipates practical failure points and prepares safeguards." } },
    { id: "procedural-improvement", title: { en: "Procedural Improvement" }, description: { en: "Refines established methods to make execution clearer and more dependable." } },
    { id: "responsible-judgement", title: { en: "Responsible Judgement" }, description: { en: "Weighs commitments and consequences before acting." } },
    { id: "operational-stability", title: { en: "Operational Stability" }, description: { en: "Provides continuity during busy or uncertain periods." } },
  ],
  growthRisks: [
    { id: "change-resistance", title: { en: "Change Resistance" }, description: { en: "An unfamiliar method may be dismissed before its evidence is fully considered." }, growthAction: { en: "Run a controlled trial with clear measures rather than accepting or rejecting the change in principle." } },
    { id: "rigid-standards", title: { en: "Rigid Standards" }, description: { en: "A reliable rule may be applied when the context calls for discretion." }, growthAction: { en: "Identify the purpose behind the standard and consider alternative ways to protect it." } },
    { id: "silent-overload", title: { en: "Silent Overload" }, description: { en: "Responsibility may accumulate because asking for help feels inefficient or uncomfortable." }, growthAction: { en: "Raise capacity risks early and delegate a clearly defined part of the work." } },
    { id: "possibility-underuse", title: { en: "Underusing Possibility" }, description: { en: "Attention to what is proven may reduce exploration of emerging options." }, growthAction: { en: "Reserve a short planning period to ask what could work differently in the future." } },
    { id: "blunt-correction", title: { en: "Blunt Correction" }, description: { en: "Fact-focused feedback may overlook the recipient's context or effort." }, growthAction: { en: "Acknowledge what is working before naming the specific required correction." } },
    { id: "overidentification-with-duty", title: { en: "Overidentification with Duty" }, description: { en: "Rest and personal priorities may be postponed until every obligation is resolved." }, growthAction: { en: "Treat recovery as a scheduled responsibility that supports long-term reliability." } },
  ],
  careerGroups: [
    { id: "operations-and-administration", category: { en: "Operations and Administration" }, description: { en: "Structured operations reward consistency, documentation, and accountable delivery." }, roles: { en: ["Operations Manager", "Programme Administrator", "Quality Assurance Manager", "Compliance Officer"] } },
    { id: "finance-and-audit", category: { en: "Finance and Audit" }, description: { en: "Accuracy-intensive work can use evidence, standards, and careful judgement." }, roles: { en: ["Accountant", "Auditor", "Financial Controller", "Risk Analyst"] } },
    { id: "technical-systems", category: { en: "Technical Systems" }, description: { en: "Technical maintenance and analysis benefit from methodical diagnosis and dependable procedure." }, roles: { en: ["Systems Administrator", "Database Administrator", "Civil Engineer", "Technical Support Manager"] } },
    { id: "public-service", category: { en: "Public Service" }, description: { en: "Institutional roles can value continuity, duty, and consistent application of standards." }, roles: { en: ["Public Administrator", "Records Manager", "Logistics Officer", "Regulatory Inspector"] } },
  ],
  careerNotice: { en: "Personality type may indicate comfortable working patterns, but it does not limit the careers you can pursue or the skills you can develop." },
  premiumPreview: {
    headline: { en: "Build dependable systems that remain responsive to change." },
    introduction: { en: "A deeper report will explore responsibility, decisions, communication, work fit, flexibility, and sustainable performance." },
    sections: [
      { id: "reliability-patterns", title: { en: "Reliability Patterns" }, description: { en: "How standards and preparation shape your contribution." }, access: "premium" },
      { id: "decision-evidence", title: { en: "Decision Evidence" }, description: { en: "Balancing experience, facts, and emerging information." }, access: "premium" },
      { id: "change-adaptation", title: { en: "Change Adaptation" }, description: { en: "Testing new methods without losing operational stability." }, access: "premium" },
      { id: "communication-practice", title: { en: "Communication Practice" }, description: { en: "Making precise feedback easier to receive and apply." }, access: "premium" },
      { id: "work-systems", title: { en: "Work Systems" }, description: { en: "Environments that reward focus, ownership, and consistency." }, access: "premium" },
      { id: "relationship-trust", title: { en: "Relationship Trust" }, description: { en: "How dependability and reserved expression shape connection." }, access: "premium" },
      { id: "overload-signals", title: { en: "Overload Signals" }, description: { en: "Recognising duty accumulation and inflexible coping." }, access: "premium" },
      { id: "resilient-growth", title: { en: "Resilient Growth" }, description: { en: "Practical steps for combining steadiness with adaptability." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ISTJ report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
