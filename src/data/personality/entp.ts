import type { PersonalityProfile } from "./types";

export const entpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ENTP",
  identity: {
    name: { en: "Debater" },
    shortName: { en: "Inventive Challenger" },
    tagline: { en: "Idea catalyst · Agile strategist · Energetic questioner" },
    keywords: { en: ["Inventiveness", "Debate", "Possibility", "Agility", "Curiosity", "Enterprise"] },
  },
  overview: {
    headline: { en: "You often energise a situation by revealing possibilities others have not considered." },
    paragraphs: { en: [
      "ENTPs tend to engage with the world through ideas, experimentation, and lively examination of accepted assumptions.",
      "They may enjoy connecting people and concepts, testing arguments, and improvising when a changing situation rewards mental agility.",
      "Their appetite for novelty can open valuable paths, while consistent priorities and thoughtful listening help turn possibility into durable impact.",
    ] },
    summary: { en: "At your best, you challenge limits constructively and convert fresh connections into workable opportunities." },
    access: "free",
  },
  coreTraits: [
    { id: "possibility-seeking", title: { en: "Possibility Seeking" }, description: { en: "Quickly notices alternative interpretations, emerging opportunities, and unconventional routes forward." } },
    { id: "intellectual-play", title: { en: "Intellectual Play" }, description: { en: "Uses questions and debate to explore an idea rather than simply to defend a fixed position." } },
    { id: "adaptive-energy", title: { en: "Adaptive Energy" }, description: { en: "Responds readily to change and often gains momentum from dynamic environments." } },
    { id: "entrepreneurial-thinking", title: { en: "Entrepreneurial Thinking" }, description: { en: "Connects unmet needs, available resources, and novel concepts into potential ventures." } },
  ],
  strengths: [
    { id: "idea-generation", title: { en: "Idea Generation" }, description: { en: "Produces a broad range of options when a problem appears constrained." } },
    { id: "persuasive-framing", title: { en: "Persuasive Framing" }, description: { en: "Can make a new possibility vivid and invite others into exploration." } },
    { id: "strategic-improvisation", title: { en: "Strategic Improvisation" }, description: { en: "Adjusts plans quickly as new information or openings appear." } },
    { id: "pattern-connection", title: { en: "Pattern Connection" }, description: { en: "Links ideas across fields and sees combinations with practical potential." } },
    { id: "constructive-challenge", title: { en: "Constructive Challenge" }, description: { en: "Questions established methods and can expose assumptions that need review." } },
    { id: "opportunity-building", title: { en: "Opportunity Building" }, description: { en: "Mobilises conversations, experiments, and networks around promising concepts." } },
  ],
  growthRisks: [
    { id: "novelty-chasing", title: { en: "Novelty Chasing" }, description: { en: "A new possibility may pull attention away from a valuable existing commitment." }, growthAction: { en: "Use a visible priority limit and finish one meaningful milestone before adding another initiative." } },
    { id: "argument-over-connection", title: { en: "Argument Over Connection" }, description: { en: "Exploratory debate may feel personal or exhausting to someone seeking understanding." }, growthAction: { en: "Clarify whether the other person wants exploration, support, or a decision before challenging the idea." } },
    { id: "detail-neglect", title: { en: "Detail Neglect" }, description: { en: "Broad strategic energy may overlook operational requirements." }, growthAction: { en: "Pair every concept with an owner, next action, deadline, and success measure." } },
    { id: "premature-pivoting", title: { en: "Premature Pivoting" }, description: { en: "A workable path may be abandoned before evidence has had time to emerge." }, growthAction: { en: "Define the experiment period and decision criteria before starting." } },
    { id: "overcommitment", title: { en: "Overcommitment" }, description: { en: "Enthusiasm can create more promises than available time can support." }, growthAction: { en: "Review capacity and remove a commitment whenever a major new one is accepted." } },
    { id: "restless-focus", title: { en: "Restless Focus" }, description: { en: "Extended concentration on repetitive execution may become difficult." }, growthAction: { en: "Create short delivery cycles with visible outcomes and scheduled opportunities for exploration." } },
  ],
  careerGroups: [
    { id: "entrepreneurship-and-ventures", category: { en: "Entrepreneurship and Ventures" }, description: { en: "Fast-moving environments can reward opportunity recognition, persuasion, and experimentation." }, roles: { en: ["Entrepreneur", "Venture Builder", "Business Development Director", "Innovation Lead"] } },
    { id: "product-and-technology", category: { en: "Product and Technology" }, description: { en: "Product work can combine user problems, emerging technology, and iterative strategy." }, roles: { en: ["Product Manager", "Solutions Architect", "Technology Strategist", "Growth Product Lead"] } },
    { id: "consulting-and-strategy", category: { en: "Consulting and Strategy" }, description: { en: "Varied strategic problems can provide room for analysis, challenge, and fresh framing." }, roles: { en: ["Management Consultant", "Innovation Consultant", "Brand Strategist", "Organisational Strategist"] } },
    { id: "communication-and-ideas", category: { en: "Communication and Ideas" }, description: { en: "Public-facing idea work can use verbal agility and audience awareness." }, roles: { en: ["Creative Director", "Journalist", "Public Affairs Consultant", "Podcast Producer"] } },
  ],
  careerNotice: { en: "Personality type is one source of career insight, not a fixed rule about which roles you can pursue or master." },
  premiumPreview: {
    headline: { en: "Channel inventive energy into sustained influence." },
    introduction: { en: "A deeper report will examine how you explore, persuade, collaborate, commit, and recover under pressure." },
    sections: [
      { id: "opportunity-patterns", title: { en: "Opportunity Patterns" }, description: { en: "How you recognise and evaluate emerging possibilities." }, access: "premium" },
      { id: "debate-and-influence", title: { en: "Debate and Influence" }, description: { en: "How to challenge ideas while preserving trust." }, access: "premium" },
      { id: "decision-discipline", title: { en: "Decision Discipline" }, description: { en: "Methods for choosing among many attractive options." }, access: "premium" },
      { id: "execution-system", title: { en: "Execution System" }, description: { en: "Structures that support follow-through without suppressing creativity." }, access: "premium" },
      { id: "team-contribution", title: { en: "Team Contribution" }, description: { en: "How your energy can stimulate learning and innovation." }, access: "premium" },
      { id: "relationship-awareness", title: { en: "Relationship Awareness" }, description: { en: "Balancing intellectual challenge with emotional context." }, access: "premium" },
      { id: "stress-and-restlessness", title: { en: "Stress and Restlessness" }, description: { en: "Recognising scattered effort and reactive pivots." }, access: "premium" },
      { id: "venture-roadmap", title: { en: "Venture Roadmap" }, description: { en: "Practical steps for turning a compelling idea into durable value." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ENTP report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
