import type { PersonalityProfile } from "./types";

export const infjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "INFJ",
  identity: {
    name: { en: "Advocate" },
    shortName: { en: "Insightful Guide" },
    tagline: { en: "Purpose seeker · Quiet visionary · Compassionate organiser" },
    keywords: { en: ["Insight", "Purpose", "Empathy", "Integrity", "Vision", "Depth"] },
  },
  overview: {
    headline: { en: "You often look beneath visible behaviour for the meaning, needs, and future direction within it." },
    paragraphs: { en: [
      "INFJs tend to combine pattern-based insight with a strong concern for human development and meaningful contribution.",
      "They may prefer depth over breadth in relationships and projects, investing carefully where values and long-term purpose feel aligned.",
      "Their quiet determination can support thoughtful change, while realistic boundaries help protect energy and prevent idealism from becoming overextension.",
    ] },
    summary: { en: "At your best, you translate a humane long-range vision into patient, principled action." },
    access: "free",
  },
  coreTraits: [
    { id: "human-pattern-insight", title: { en: "Human Pattern Insight" }, description: { en: "Notices subtle motives, themes, and developmental possibilities in people and situations." } },
    { id: "values-led-vision", title: { en: "Values-Led Vision" }, description: { en: "Connects future possibilities with a clear internal sense of meaning and integrity." } },
    { id: "depth-of-connection", title: { en: "Depth of Connection" }, description: { en: "Often prefers sincere, focused relationships to frequent surface-level interaction." } },
    { id: "quiet-organisation", title: { en: "Quiet Organisation" }, description: { en: "Brings structure and persistence to goals that carry personal or social significance." } },
  ],
  strengths: [
    { id: "empathetic-understanding", title: { en: "Empathetic Understanding" }, description: { en: "Listens for both expressed concerns and the needs beneath them." } },
    { id: "long-range-guidance", title: { en: "Long-Range Guidance" }, description: { en: "Sees how present choices may shape people and systems over time." } },
    { id: "purposeful-communication", title: { en: "Purposeful Communication" }, description: { en: "Can express complex human themes with clarity and care." } },
    { id: "integrative-thinking", title: { en: "Integrative Thinking" }, description: { en: "Combines emotional, ethical, and strategic information into a coherent view." } },
    { id: "developmental-support", title: { en: "Developmental Support" }, description: { en: "Encourages growth by recognising potential and offering considered guidance." } },
    { id: "principled-persistence", title: { en: "Principled Persistence" }, description: { en: "Sustains effort when a goal is strongly connected to values." } },
  ],
  growthRisks: [
    { id: "idealistic-overreach", title: { en: "Idealistic Overreach" }, description: { en: "A meaningful vision may create expectations that exceed current resources." }, growthAction: { en: "Translate the vision into one measurable next stage and review capacity before expanding it." } },
    { id: "absorbing-others-needs", title: { en: "Absorbing Others' Needs" }, description: { en: "Strong empathy may make it difficult to separate another person's distress from personal responsibility." }, growthAction: { en: "Offer support with explicit limits and distinguish care from ownership of the outcome." } },
    { id: "conflict-avoidance", title: { en: "Conflict Avoidance" }, description: { en: "Concern for harmony may delay a necessary direct conversation." }, growthAction: { en: "State the issue early using observations, impact, and a constructive request." } },
    { id: "private-overprocessing", title: { en: "Private Overprocessing" }, description: { en: "Important concerns may be refined internally for too long before being shared." }, growthAction: { en: "Invite a trusted person into the thinking process before the conclusion feels complete." } },
    { id: "perfectionistic-purpose", title: { en: "Perfectionistic Purpose" }, description: { en: "Work tied to identity or values may become difficult to release." }, growthAction: { en: "Define what responsible completion looks like before beginning the final refinement." } },
    { id: "energy-depletion", title: { en: "Energy Depletion" }, description: { en: "Sustained emotional and purposeful investment may quietly exhaust available energy." }, growthAction: { en: "Schedule solitude, ordinary pleasure, and recovery before fatigue becomes withdrawal." } },
  ],
  careerGroups: [
    { id: "counselling-and-development", category: { en: "Counselling and Development" }, description: { en: "Development-focused work can use careful listening, insight, and sustained support." }, roles: { en: ["Counsellor", "Career Coach", "Learning and Development Specialist", "Organisational Psychologist"] } },
    { id: "writing-and-communication", category: { en: "Writing and Communication" }, description: { en: "Reflective communication can translate complex experience into useful meaning." }, roles: { en: ["Writer", "Editor", "Documentary Producer", "Content Strategist"] } },
    { id: "social-impact", category: { en: "Social Impact" }, description: { en: "Mission-led organisations may align long-term systems work with human values." }, roles: { en: ["Nonprofit Programme Director", "Social Researcher", "Policy Adviser", "Community Development Lead"] } },
    { id: "people-and-culture", category: { en: "People and Culture" }, description: { en: "Culture work can combine individual development with organisational direction." }, roles: { en: ["People Experience Lead", "Culture Consultant", "Mediator", "Talent Development Manager"] } },
  ],
  careerNotice: { en: "Personality type may clarify preferred contributions, but it does not determine your career potential or restrict future development." },
  premiumPreview: {
    headline: { en: "Protect your depth while expanding your impact." },
    introduction: { en: "A deeper report will explore vision, empathy, boundaries, communication, work fit, and sustainable growth." },
    sections: [
      { id: "inner-vision", title: { en: "Inner Vision" }, description: { en: "How meaning and pattern recognition shape your direction." }, access: "premium" },
      { id: "empathy-boundaries", title: { en: "Empathy and Boundaries" }, description: { en: "Supporting others without losing personal capacity." }, access: "premium" },
      { id: "communication-depth", title: { en: "Communication Depth" }, description: { en: "Turning private insight into timely, useful dialogue." }, access: "premium" },
      { id: "purposeful-work", title: { en: "Purposeful Work" }, description: { en: "Environments that connect contribution with integrity." }, access: "premium" },
      { id: "relationship-patterns", title: { en: "Relationship Patterns" }, description: { en: "How trust, depth, and expectations influence connection." }, access: "premium" },
      { id: "conflict-practice", title: { en: "Conflict Practice" }, description: { en: "Approaching disagreement without abandoning values or harmony." }, access: "premium" },
      { id: "stress-and-recovery", title: { en: "Stress and Recovery" }, description: { en: "Recognising overload, withdrawal, and restorative needs." }, access: "premium" },
      { id: "impact-roadmap", title: { en: "Impact Roadmap" }, description: { en: "A paced plan for translating purpose into sustainable action." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete INFJ report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
