import type { PersonalityProfile } from "./types";

export const enfpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ENFP",
  identity: {
    name: { en: "Campaigner" },
    shortName: { en: "Imaginative Connector" },
    tagline: { en: "Possibility champion · Authentic communicator · Energetic encourager" },
    keywords: { en: ["Enthusiasm", "Imagination", "Connection", "Authenticity", "Exploration", "Inspiration"] },
  },
  overview: {
    headline: { en: "You often bring possibility to life by connecting ideas, people, and personal meaning." },
    paragraphs: { en: [
      "ENFPs tend to approach experience with curiosity, expressive energy, and an interest in what people or situations could become.",
      "They may build rapport quickly and encourage experimentation, especially when a project allows originality and values-based contribution.",
      "Their breadth of enthusiasm can be a strong catalyst, while priorities and completion routines help protect the ideas that matter most.",
    ] },
    summary: { en: "At your best, you awaken meaningful possibility and help people move toward it with energy and authenticity." },
    access: "free",
  },
  coreTraits: [
    { id: "possibility-imagination", title: { en: "Possibility Imagination" }, description: { en: "Notices emerging options and sees potential in people, ideas, and changing circumstances." } },
    { id: "authentic-expression", title: { en: "Authentic Expression" }, description: { en: "Communicates with personal energy and a desire for genuine connection." } },
    { id: "relational-curiosity", title: { en: "Relational Curiosity" }, description: { en: "Shows interest in individual stories, motivations, and aspirations." } },
    { id: "spontaneous-adaptation", title: { en: "Spontaneous Adaptation" }, description: { en: "Responds flexibly as new information and opportunities emerge." } },
  ],
  strengths: [
    { id: "inspiring-others", title: { en: "Inspiring Others" }, description: { en: "Helps people see possibility and reconnect with motivation." } },
    { id: "creative-connections", title: { en: "Creative Connections" }, description: { en: "Combines distant ideas into fresh concepts and narratives." } },
    { id: "rapport-building", title: { en: "Rapport Building" }, description: { en: "Creates an open atmosphere where people often feel able to contribute." } },
    { id: "adaptive-communication", title: { en: "Adaptive Communication" }, description: { en: "Adjusts tone and framing to engage different audiences." } },
    { id: "values-advocacy", title: { en: "Values Advocacy" }, description: { en: "Brings visible energy to causes and work that feel meaningful." } },
    { id: "experimental-learning", title: { en: "Experimental Learning" }, description: { en: "Learns readily through exploration, conversation, and practical trials." } },
  ],
  growthRisks: [
    { id: "scattered-commitments", title: { en: "Scattered Commitments" }, description: { en: "Many interesting directions may divide attention and weaken completion." }, growthAction: { en: "Choose three active priorities and place all other ideas in a later list." } },
    { id: "inspiration-dependence", title: { en: "Dependence on Inspiration" }, description: { en: "Routine stages may become harder once emotional excitement decreases." }, growthAction: { en: "Use short scheduled work blocks and visible milestones during low-novelty phases." } },
    { id: "overpromising", title: { en: "Overpromising" }, description: { en: "Enthusiasm may produce commitments before capacity is understood." }, growthAction: { en: "Pause before agreeing and check time, energy, and existing obligations." } },
    { id: "feedback-sensitivity", title: { en: "Feedback Sensitivity" }, description: { en: "Critical responses may feel like rejection of an idea's meaning or personal intent." }, growthAction: { en: "Identify the specific behaviour or output being evaluated before interpreting the wider message." } },
    { id: "conflict-deflection", title: { en: "Conflict Deflection" }, description: { en: "Positive reframing may move past a disagreement before it is resolved." }, growthAction: { en: "Stay with the concrete concern long enough to confirm what needs to change." } },
    { id: "energy-volatility", title: { en: "Energy Volatility" }, description: { en: "Intense engagement can alternate with abrupt depletion." }, growthAction: { en: "Plan recovery alongside demanding social or creative commitments." } },
  ],
  careerGroups: [
    { id: "creative-communication", category: { en: "Creative Communication" }, description: { en: "Expressive work can combine ideas, audiences, and meaningful stories." }, roles: { en: ["Creative Strategist", "Content Producer", "Brand Storyteller", "Communications Manager"] } },
    { id: "people-development", category: { en: "People Development" }, description: { en: "Development roles can use encouragement, curiosity, and individual attention." }, roles: { en: ["Career Coach", "Learning Facilitator", "Talent Development Specialist", "Student Adviser"] } },
    { id: "innovation-and-product", category: { en: "Innovation and Product" }, description: { en: "Exploratory product settings can reward user empathy and possibility thinking." }, roles: { en: ["Product Discovery Lead", "UX Researcher", "Innovation Consultant", "Community Product Manager"] } },
    { id: "social-impact", category: { en: "Social Impact" }, description: { en: "Mission-driven initiatives can connect values, networks, and public engagement." }, roles: { en: ["Campaign Manager", "Community Organiser", "Social Enterprise Manager", "Fundraising Strategist"] } },
  ],
  careerNotice: { en: "Personality type can offer useful career reflection, but it does not define what work you are capable of learning or doing well." },
  premiumPreview: {
    headline: { en: "Focus your possibilities without losing your spark." },
    introduction: { en: "A deeper report will examine motivation, relationships, communication, work fit, follow-through, and recovery." },
    sections: [
      { id: "motivation-map", title: { en: "Motivation Map" }, description: { en: "How meaning, novelty, and connection influence your energy." }, access: "premium" },
      { id: "idea-selection", title: { en: "Idea Selection" }, description: { en: "Choosing which possibilities deserve sustained investment." }, access: "premium" },
      { id: "communication-energy", title: { en: "Communication Energy" }, description: { en: "Using enthusiasm clearly across different audiences." }, access: "premium" },
      { id: "relationship-depth", title: { en: "Relationship Depth" }, description: { en: "Balancing broad connection with dependable presence." }, access: "premium" },
      { id: "execution-rhythm", title: { en: "Execution Rhythm" }, description: { en: "Simple structures that carry ideas through routine stages." }, access: "premium" },
      { id: "career-fit", title: { en: "Career Fit" }, description: { en: "Work conditions that reward creativity and human engagement." }, access: "premium" },
      { id: "stress-recovery", title: { en: "Stress and Recovery" }, description: { en: "Recognising overload, disappointment, and depleted enthusiasm." }, access: "premium" },
      { id: "focused-growth", title: { en: "Focused Growth" }, description: { en: "A practical plan for turning chosen possibilities into results." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ENFP report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
