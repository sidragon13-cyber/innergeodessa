import type { PersonalityProfile } from "./types";

export const isfpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ISFP",
  identity: {
    name: { en: "Adventurer" },
    shortName: { en: "Sensitive Creator" },
    tagline: { en: "Quiet individualist · Aesthetic observer · Flexible craftsperson" },
    keywords: { en: ["Authenticity", "Sensitivity", "Beauty", "Flexibility", "Presence", "Craft"] },
  },
  overview: {
    headline: { en: "You often respond to life through direct experience, personal values, and an attentive sense of what feels genuine." },
    paragraphs: { en: [
      "ISFPs tend to notice sensory detail, individual feeling, and opportunities to create a more considerate or beautiful immediate experience.",
      "They may prefer freedom to work in their own way, expressing care through actions, craft, and respectful presence rather than formal direction.",
      "Their adaptability supports responsive creativity, while clearer planning and self-advocacy help personal values gain lasting practical expression.",
    ] },
    summary: { en: "At your best, you bring authenticity, sensitivity, and skilled attention to the people and experiences directly around you." },
    access: "free",
  },
  coreTraits: [
    { id: "personal-authenticity", title: { en: "Personal Authenticity" }, description: { en: "Evaluates choices through an individual sense of integrity and emotional truth." } },
    { id: "sensory-awareness", title: { en: "Sensory Awareness" }, description: { en: "Notices atmosphere, form, comfort, and subtle changes in the immediate environment." } },
    { id: "gentle-adaptability", title: { en: "Gentle Adaptability" }, description: { en: "Responds flexibly without imposing a single method on others." } },
    { id: "practical-expression", title: { en: "Practical Expression" }, description: { en: "Often communicates values through tangible choices, care, or creative work." } },
  ],
  strengths: [
    { id: "aesthetic-judgement", title: { en: "Aesthetic Judgement" }, description: { en: "Recognises visual, sensory, and experiential qualities that shape impact." } },
    { id: "respectful-presence", title: { en: "Respectful Presence" }, description: { en: "Allows people space to be themselves without unnecessary judgement." } },
    { id: "hands-on-creativity", title: { en: "Hands-On Creativity" }, description: { en: "Turns feeling and observation into tangible design, craft, or service." } },
    { id: "situational-care", title: { en: "Situational Care" }, description: { en: "Notices what would make the present experience more comfortable or humane." } },
    { id: "flexible-response", title: { en: "Flexible Response" }, description: { en: "Adjusts readily when conditions or individual needs change." } },
    { id: "values-consistency", title: { en: "Values Consistency" }, description: { en: "Protects personal principles even without public recognition." } },
  ],
  growthRisks: [
    { id: "self-advocacy-delay", title: { en: "Delayed Self-Advocacy" }, description: { en: "Personal needs may remain private until frustration or withdrawal appears." }, growthAction: { en: "State a preference or limit while the situation is still manageable." } },
    { id: "future-underplanning", title: { en: "Underplanning the Future" }, description: { en: "Attention to present experience may leave future obligations unclear." }, growthAction: { en: "Set one monthly planning session for deadlines, resources, and desired direction." } },
    { id: "criticism-sensitivity", title: { en: "Sensitivity to Criticism" }, description: { en: "Direct feedback may feel like rejection of personal expression." }, growthAction: { en: "Ask which observable part of the work needs adjustment and retain ownership of the wider creative identity." } },
    { id: "conflict-withdrawal", title: { en: "Conflict Withdrawal" }, description: { en: "Tension may lead to disengagement before the issue is understood." }, growthAction: { en: "Request a pause, then return with one clear observation and need." } },
    { id: "structure-avoidance", title: { en: "Structure Avoidance" }, description: { en: "Rules may be resisted even when a light structure would protect valued work." }, growthAction: { en: "Choose the minimum routine needed to preserve freedom and completion." } },
    { id: "impulsive-relief", title: { en: "Impulsive Relief" }, description: { en: "Immediate comfort or novelty may temporarily replace a difficult priority." }, growthAction: { en: "Complete a short defined step before choosing the rewarding alternative." } },
  ],
  careerGroups: [
    { id: "visual-and-spatial-design", category: { en: "Visual and Spatial Design" }, description: { en: "Design work can combine sensory awareness, personal expression, and tangible outcomes." }, roles: { en: ["Graphic Designer", "Interior Designer", "Photographer", "Fashion Designer"] } },
    { id: "health-and-wellness", category: { en: "Health and Wellness" }, description: { en: "Hands-on care can reward observation, respect, and responsiveness to individual needs." }, roles: { en: ["Occupational Therapist", "Massage Therapist", "Veterinary Technician", "Wellness Practitioner"] } },
    { id: "craft-and-production", category: { en: "Craft and Production" }, description: { en: "Skilled making offers direct engagement with materials, detail, and quality." }, roles: { en: ["Artisan", "Culinary Specialist", "Set Designer", "Product Stylist"] } },
    { id: "environment-and-experience", category: { en: "Environment and Experience" }, description: { en: "Experience-focused roles can improve how people encounter places, products, or nature." }, roles: { en: ["Landscape Designer", "Museum Experience Assistant", "Travel Experience Designer", "Conservation Field Officer"] } },
  ],
  careerNotice: { en: "Personality type may suggest preferred forms of expression and work, but it does not define or restrict your career possibilities." },
  premiumPreview: {
    headline: { en: "Give your values a visible form without losing flexibility." },
    introduction: { en: "A deeper report will explore creativity, boundaries, decisions, relationships, work fit, and sustainable structure." },
    sections: [
      { id: "authentic-expression", title: { en: "Authentic Expression" }, description: { en: "How personal values become tangible choices and work." }, access: "premium" },
      { id: "sensory-strengths", title: { en: "Sensory Strengths" }, description: { en: "Using observation, atmosphere, and detail intentionally." }, access: "premium" },
      { id: "self-advocacy", title: { en: "Self-Advocacy" }, description: { en: "Expressing needs before withdrawal or frustration." }, access: "premium" },
      { id: "planning-lightly", title: { en: "Planning Lightly" }, description: { en: "Creating enough structure to protect freedom and completion." }, access: "premium" },
      { id: "relationship-space", title: { en: "Relationship Space" }, description: { en: "Balancing closeness, independence, and honest communication." }, access: "premium" },
      { id: "career-craft", title: { en: "Career Craft" }, description: { en: "Environments that value skill, autonomy, and human experience." }, access: "premium" },
      { id: "stress-responses", title: { en: "Stress Responses" }, description: { en: "Recognising avoidance, sensitivity, and impulsive relief." }, access: "premium" },
      { id: "creative-growth", title: { en: "Creative Growth" }, description: { en: "A practical path from private values to sustained contribution." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ISFP report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
