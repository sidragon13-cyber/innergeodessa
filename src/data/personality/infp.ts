import type { PersonalityProfile } from "./types";

export const infpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "INFP",
  identity: {
    name: { en: "Mediator" },
    shortName: { en: "Values-Led Idealist" },
    tagline: { en: "Imaginative individualist · Gentle encourager · Meaningful creator" },
    keywords: { en: ["Authenticity", "Imagination", "Compassion", "Meaning", "Individuality", "Openness"] },
  },
  overview: {
    headline: { en: "You often evaluate choices by whether they feel authentic, humane, and connected to a meaningful possibility." },
    paragraphs: { en: [
      "INFPs tend to bring a rich inner world, personal values, and imaginative openness to people and projects.",
      "They may be especially attentive to individuality and untapped potential, preferring room to explore rather than rigidly prescribed methods.",
      "Their sensitivity can support original and compassionate work, while practical routines help translate inspiration into visible contribution.",
    ] },
    summary: { en: "At your best, you protect what matters while creating possibilities that allow people and ideas to grow." },
    access: "free",
  },
  coreTraits: [
    { id: "authentic-values", title: { en: "Authentic Values" }, description: { en: "Uses a personal ethical compass to assess choices, relationships, and commitments." } },
    { id: "imaginative-openness", title: { en: "Imaginative Openness" }, description: { en: "Explores symbolic connections, alternative futures, and distinctive forms of expression." } },
    { id: "individual-empathy", title: { en: "Individual Empathy" }, description: { en: "Often notices the unique experience and potential of each person." } },
    { id: "flexible-exploration", title: { en: "Flexible Exploration" }, description: { en: "Prefers adapting to emerging meaning rather than forcing an early fixed plan." } },
  ],
  strengths: [
    { id: "creative-expression", title: { en: "Creative Expression" }, description: { en: "Communicates nuanced feelings and ideas through original language or design." } },
    { id: "compassionate-listening", title: { en: "Compassionate Listening" }, description: { en: "Makes room for another person's perspective without rushing to judgement." } },
    { id: "values-clarity", title: { en: "Values Clarity" }, description: { en: "Recognises when a choice aligns with or compromises important principles." } },
    { id: "possibility-imagination", title: { en: "Possibility Imagination" }, description: { en: "Sees potential paths beyond present limitations." } },
    { id: "personal-encouragement", title: { en: "Personal Encouragement" }, description: { en: "Supports others by recognising individuality and meaningful aspirations." } },
    { id: "adaptive-perspective", title: { en: "Adaptive Perspective" }, description: { en: "Can reconsider assumptions and find a more humane interpretation." } },
  ],
  growthRisks: [
    { id: "idealisation", title: { en: "Idealisation" }, description: { en: "An imagined possibility may overshadow current evidence or practical constraints." }, growthAction: { en: "Name the desired ideal, then list the observable facts and smallest realistic next step." } },
    { id: "difficult-conversation-delay", title: { en: "Delayed Difficult Conversations" }, description: { en: "Concern about hurt or misunderstanding may postpone necessary clarity." }, growthAction: { en: "Prepare one respectful statement of the issue and one specific request." } },
    { id: "inconsistent-structure", title: { en: "Inconsistent Structure" }, description: { en: "Flexible working preferences may make routine follow-through uneven." }, growthAction: { en: "Choose a light recurring schedule for the few actions that protect the larger purpose." } },
    { id: "personalising-feedback", title: { en: "Personalising Feedback" }, description: { en: "Criticism of an outcome may feel like rejection of identity or values." }, growthAction: { en: "Separate the work, the method, and personal worth before deciding what feedback is useful." } },
    { id: "too-many-possibilities", title: { en: "Too Many Possibilities" }, description: { en: "Multiple meaningful directions may make commitment difficult." }, growthAction: { en: "Select the option that best serves current values and capacity for a defined trial period." } },
    { id: "quiet-burnout", title: { en: "Quiet Burnout" }, description: { en: "Emotional investment may continue after energy has become depleted." }, growthAction: { en: "Track energy alongside obligations and communicate limits before withdrawing." } },
  ],
  careerGroups: [
    { id: "writing-and-arts", category: { en: "Writing and Arts" }, description: { en: "Creative work can provide space for meaning, imagination, and individual voice." }, roles: { en: ["Writer", "Illustrator", "Film Editor", "Creative Producer"] } },
    { id: "counselling-and-support", category: { en: "Counselling and Support" }, description: { en: "One-to-one development work can reward empathy and respect for individual paths." }, roles: { en: ["Counsellor", "Career Adviser", "Youth Worker", "Student Support Specialist"] } },
    { id: "mission-led-communication", category: { en: "Mission-Led Communication" }, description: { en: "Values-based organisations need stories that connect people with purpose." }, roles: { en: ["Nonprofit Communications Manager", "Content Designer", "Editorial Strategist", "Advocacy Campaigner"] } },
    { id: "human-centred-design", category: { en: "Human-Centred Design" }, description: { en: "Research and design can turn empathy into more thoughtful experiences." }, roles: { en: ["UX Researcher", "Service Designer", "Learning Experience Designer", "Community Designer"] } },
  ],
  careerNotice: { en: "Personality type can illuminate preferences and values, but it is not a fixed boundary on career options, competence, or growth." },
  premiumPreview: {
    headline: { en: "Bring your inner values into practical, sustainable expression." },
    introduction: { en: "A deeper report will explore authenticity, creativity, relationships, decisions, work fit, and follow-through." },
    sections: [
      { id: "values-map", title: { en: "Values Map" }, description: { en: "How personal meaning guides attention and choice." }, access: "premium" },
      { id: "creative-process", title: { en: "Creative Process" }, description: { en: "Conditions that help imagination become completed work." }, access: "premium" },
      { id: "decision-clarity", title: { en: "Decision Clarity" }, description: { en: "Choosing among meaningful possibilities without losing flexibility." }, access: "premium" },
      { id: "relationship-needs", title: { en: "Relationship Needs" }, description: { en: "How authenticity, space, and emotional safety shape connection." }, access: "premium" },
      { id: "constructive-conflict", title: { en: "Constructive Conflict" }, description: { en: "Expressing disagreement while preserving respect." }, access: "premium" },
      { id: "career-alignment", title: { en: "Career Alignment" }, description: { en: "Work settings that support meaning and individual contribution." }, access: "premium" },
      { id: "stress-signals", title: { en: "Stress Signals" }, description: { en: "Recognising idealisation, withdrawal, and depleted energy." }, access: "premium" },
      { id: "practical-growth", title: { en: "Practical Growth" }, description: { en: "Small structures that protect creativity and completion." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete INFP report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
