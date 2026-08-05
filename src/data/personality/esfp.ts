import type { PersonalityProfile } from "./types";

export const esfpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ESFP",
  identity: {
    name: { en: "Entertainer" },
    shortName: { en: "Expressive Experience Maker" },
    tagline: { en: "Warm performer · Practical encourager · Spontaneous connector" },
    keywords: { en: ["Energy", "Warmth", "Experience", "Expression", "Adaptability", "Enjoyment"] },
  },
  overview: {
    headline: { en: "You often make the present more engaging by responding warmly to people and bringing visible energy to shared experience." },
    paragraphs: { en: [
      "ESFPs tend to notice what is happening around them and respond with openness, expressiveness, and practical attention to individual enjoyment or comfort.",
      "They may thrive where they can interact, improvise, and create an immediate positive effect rather than work at a distance from the outcome.",
      "Their vitality can strengthen connection and morale, while planning and boundaries help generous spontaneity support longer-term priorities.",
    ] },
    summary: { en: "At your best, you combine human warmth with present-moment awareness to create experiences that feel alive and inclusive." },
    access: "free",
  },
  coreTraits: [
    { id: "expressive-presence", title: { en: "Expressive Presence" }, description: { en: "Engages visibly with people and brings emotion and energy into the moment." } },
    { id: "practical-empathy", title: { en: "Practical Empathy" }, description: { en: "Notices immediate personal needs and responds in a tangible way." } },
    { id: "sensory-engagement", title: { en: "Sensory Engagement" }, description: { en: "Pays attention to atmosphere, appearance, movement, and enjoyment." } },
    { id: "spontaneous-flexibility", title: { en: "Spontaneous Flexibility" }, description: { en: "Adjusts plans readily to match current people and circumstances." } },
  ],
  strengths: [
    { id: "audience-connection", title: { en: "Audience Connection" }, description: { en: "Reads immediate reactions and adapts to keep people engaged." } },
    { id: "morale-building", title: { en: "Morale Building" }, description: { en: "Brings encouragement and positive energy into shared activity." } },
    { id: "experience-design", title: { en: "Experience Design" }, description: { en: "Notices the practical details that make an occasion enjoyable and memorable." } },
    { id: "responsive-help", title: { en: "Responsive Help" }, description: { en: "Offers concrete support when a need becomes visible." } },
    { id: "adaptive-performance", title: { en: "Adaptive Performance" }, description: { en: "Responds effectively to live feedback and changing conditions." } },
    { id: "inclusive-warmth", title: { en: "Inclusive Warmth" }, description: { en: "Helps others participate by reducing distance and formality." } },
  ],
  growthRisks: [
    { id: "future-avoidance", title: { en: "Avoiding Future Constraints" }, description: { en: "Long-range planning may feel restrictive compared with present opportunities." }, growthAction: { en: "Choose one future goal and schedule the next two practical actions without overplanning." } },
    { id: "impulse-spending", title: { en: "Impulse and Reward" }, description: { en: "Immediate enjoyment may outweigh budget, time, or energy limits." }, growthAction: { en: "Create a pause rule for high-cost choices and check the effect on current priorities." } },
    { id: "difficult-feeling-avoidance", title: { en: "Avoiding Difficult Feelings" }, description: { en: "Activity or positivity may distract from an issue that needs reflection." }, growthAction: { en: "Set aside a short quiet period to name the feeling, cause, and needed conversation." } },
    { id: "overcommitting-socially", title: { en: "Social Overcommitment" }, description: { en: "A desire to participate and help may fill more time than energy allows." }, growthAction: { en: "Leave recovery space between major social or service commitments." } },
    { id: "feedback-reactivity", title: { en: "Feedback Reactivity" }, description: { en: "Critical feedback may quickly affect confidence or connection." }, growthAction: { en: "Pause and ask for one specific example and one desired adjustment." } },
    { id: "routine-follow-through", title: { en: "Routine Follow-Through" }, description: { en: "Administrative tasks may be delayed when more engaging activity appears." }, growthAction: { en: "Complete a brief daily close-out routine before choosing optional activity." } },
  ],
  careerGroups: [
    { id: "entertainment-and-media", category: { en: "Entertainment and Media" }, description: { en: "Live and creative media work can reward expression, timing, and audience connection." }, roles: { en: ["Presenter", "Performer", "Event Host", "Media Producer"] } },
    { id: "hospitality-and-experience", category: { en: "Hospitality and Experience" }, description: { en: "Guest-focused environments use warmth, sensory awareness, and practical responsiveness." }, roles: { en: ["Hospitality Manager", "Event Planner", "Travel Experience Manager", "Guest Relations Director"] } },
    { id: "sales-and-client-relations", category: { en: "Sales and Client Relations" }, description: { en: "Interactive commercial roles can reward rapport, energy, and immediate feedback." }, roles: { en: ["Account Executive", "Retail Experience Manager", "Property Consultant", "Customer Success Specialist"] } },
    { id: "health-and-community", category: { en: "Health and Community" }, description: { en: "People-facing support can combine practical care with encouragement." }, roles: { en: ["Recreation Therapist", "Fitness Coach", "Community Outreach Officer", "Youth Programme Coordinator"] } },
  ],
  careerNotice: { en: "Personality type may suggest energising environments, but it does not place a fixed limit on career choice, expertise, or future growth." },
  premiumPreview: {
    headline: { en: "Keep your vitality while building a future that can sustain it." },
    introduction: { en: "A deeper report will explore expression, relationships, decisions, planning, career fit, stress, and recovery." },
    sections: [
      { id: "social-energy", title: { en: "Social Energy" }, description: { en: "How interaction and response influence motivation." }, access: "premium" },
      { id: "experience-strengths", title: { en: "Experience Strengths" }, description: { en: "Using atmosphere, timing, and practical empathy." }, access: "premium" },
      { id: "future-planning", title: { en: "Future Planning" }, description: { en: "Creating direction without suppressing spontaneity." }, access: "premium" },
      { id: "feedback-resilience", title: { en: "Feedback Resilience" }, description: { en: "Learning from criticism without losing confidence." }, access: "premium" },
      { id: "relationship-boundaries", title: { en: "Relationship Boundaries" }, description: { en: "Balancing generosity, availability, and recovery." }, access: "premium" },
      { id: "career-stage", title: { en: "Career Stage" }, description: { en: "Work settings that value visibility, service, and adaptability." }, access: "premium" },
      { id: "stress-and-avoidance", title: { en: "Stress and Avoidance" }, description: { en: "Recognising distraction, overload, and delayed reflection." }, access: "premium" },
      { id: "sustainable-expression", title: { en: "Sustainable Expression" }, description: { en: "A plan for combining present energy with durable priorities." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ESFP report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
