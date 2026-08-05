import type { PersonalityProfile } from "./types";

export const estpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ESTP",
  identity: {
    name: { en: "Entrepreneur" },
    shortName: { en: "Action-Oriented Negotiator" },
    tagline: { en: "Bold responder · Practical persuader · Energetic problem solver" },
    keywords: { en: ["Action", "Adaptability", "Persuasion", "Pragmatism", "Courage", "Momentum"] },
  },
  overview: {
    headline: { en: "You often create momentum by reading the situation quickly and acting on the most practical opportunity available." },
    paragraphs: { en: [
      "ESTPs tend to engage directly with people, challenges, and immediate evidence, learning rapidly through action and response.",
      "They may be skilled at negotiation, improvisation, and staying composed when circumstances shift faster than a detailed plan can follow.",
      "Their bold pragmatism can unlock results, while long-range checks and careful commitments help immediate wins support durable outcomes.",
    ] },
    summary: { en: "At your best, you combine situational courage with practical intelligence to move a real problem forward." },
    access: "free",
  },
  coreTraits: [
    { id: "situational-action", title: { en: "Situational Action" }, description: { en: "Reads immediate conditions and moves quickly toward a workable response." } },
    { id: "pragmatic-analysis", title: { en: "Pragmatic Analysis" }, description: { en: "Focuses on what produces a tangible result under current constraints." } },
    { id: "social-boldness", title: { en: "Social Boldness" }, description: { en: "Engages readily, negotiates directly, and tolerates visible risk." } },
    { id: "adaptive-energy", title: { en: "Adaptive Energy" }, description: { en: "Changes tactics easily as feedback and opportunities emerge." } },
  ],
  strengths: [
    { id: "rapid-response", title: { en: "Rapid Response" }, description: { en: "Acts decisively when a practical problem needs immediate attention." } },
    { id: "negotiation", title: { en: "Negotiation" }, description: { en: "Reads incentives and finds workable terms in live interaction." } },
    { id: "resourcefulness", title: { en: "Resourcefulness" }, description: { en: "Uses available tools, contacts, and information creatively." } },
    { id: "pressure-composure", title: { en: "Pressure Composure" }, description: { en: "Often remains engaged and functional during uncertainty." } },
    { id: "opportunity-recognition", title: { en: "Opportunity Recognition" }, description: { en: "Notices practical openings that others may miss while planning." } },
    { id: "energising-presence", title: { en: "Energising Presence" }, description: { en: "Can increase confidence and momentum through direct involvement." } },
  ],
  growthRisks: [
    { id: "short-term-bias", title: { en: "Short-Term Bias" }, description: { en: "An attractive immediate result may obscure future costs." }, growthAction: { en: "Before committing, identify the likely effect in one week, six months, and one year." } },
    { id: "risk-escalation", title: { en: "Risk Escalation" }, description: { en: "Comfort with uncertainty may lead to increasingly exposed decisions." }, growthAction: { en: "Set a loss limit, exit condition, and independent check before acting." } },
    { id: "routine-neglect", title: { en: "Routine Neglect" }, description: { en: "Maintenance and documentation may receive less attention than visible action." }, growthAction: { en: "Complete a short close-out checklist immediately after each major action." } },
    { id: "commitment-flexing", title: { en: "Flexible Commitments" }, description: { en: "Changing conditions may be used to revise agreements too casually." }, growthAction: { en: "Communicate changes early and renegotiate explicitly rather than assuming flexibility." } },
    { id: "emotional-speed", title: { en: "Emotional Speed" }, description: { en: "Fast problem solving may move past another person's emotional processing." }, growthAction: { en: "Ask what the person needs understood before proposing the next move." } },
    { id: "stimulation-dependence", title: { en: "Stimulation Dependence" }, description: { en: "Quiet strategic work may be avoided when immediate activity is available." }, growthAction: { en: "Protect a recurring planning block before entering reactive work." } },
  ],
  careerGroups: [
    { id: "sales-and-negotiation", category: { en: "Sales and Negotiation" }, description: { en: "Commercial interaction can reward persuasion, responsiveness, and practical judgement." }, roles: { en: ["Sales Executive", "Commercial Negotiator", "Real Estate Broker", "Business Development Manager"] } },
    { id: "entrepreneurship-and-growth", category: { en: "Entrepreneurship and Growth" }, description: { en: "Fast-moving ventures can use opportunity recognition and action under uncertainty." }, roles: { en: ["Entrepreneur", "Growth Manager", "Venture Operations Lead", "Market Expansion Director"] } },
    { id: "emergency-and-operations", category: { en: "Emergency and Operations" }, description: { en: "Immediate operational work can reward composure, courage, and resourcefulness." }, roles: { en: ["Emergency Response Officer", "Operations Supervisor", "Police Officer", "Crisis Logistics Manager"] } },
    { id: "events-and-performance", category: { en: "Events and Performance" }, description: { en: "Live environments provide visible feedback, people contact, and changing demands." }, roles: { en: ["Event Producer", "Sports Coach", "Broadcast Presenter", "Hospitality Operations Manager"] } },
  ],
  careerNotice: { en: "Personality type can indicate preferred levels of action and interaction, but it does not determine or limit career capability." },
  premiumPreview: {
    headline: { en: "Convert bold action into durable strategic advantage." },
    introduction: { en: "A deeper report will explore risk, decisions, influence, commitments, career fit, relationships, and recovery." },
    sections: [
      { id: "action-patterns", title: { en: "Action Patterns" }, description: { en: "How immediate evidence and opportunity guide your moves." }, access: "premium" },
      { id: "risk-discipline", title: { en: "Risk Discipline" }, description: { en: "Preserving courage while protecting future options." }, access: "premium" },
      { id: "negotiation-style", title: { en: "Negotiation Style" }, description: { en: "Using social awareness and practical leverage responsibly." }, access: "premium" },
      { id: "commitment-practice", title: { en: "Commitment Practice" }, description: { en: "Combining flexibility with dependable agreements." }, access: "premium" },
      { id: "strategic-pause", title: { en: "Strategic Pause" }, description: { en: "Making room for planning before reactive activity." }, access: "premium" },
      { id: "career-energy", title: { en: "Career Energy" }, description: { en: "Environments that reward pace, contact, and tangible outcomes." }, access: "premium" },
      { id: "relationship-impact", title: { en: "Relationship Impact" }, description: { en: "Balancing direct problem solving with emotional timing." }, access: "premium" },
      { id: "sustainable-momentum", title: { en: "Sustainable Momentum" }, description: { en: "A plan for turning immediate wins into long-term progress." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ESTP report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
