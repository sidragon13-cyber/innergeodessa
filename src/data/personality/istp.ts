import type { PersonalityProfile } from "./types";

export const istpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ISTP",
  identity: {
    name: { en: "Virtuoso" },
    shortName: { en: "Adaptive Troubleshooter" },
    tagline: { en: "Hands-on analyst · Calm improviser · Independent craftsperson" },
    keywords: { en: ["Practicality", "Precision", "Autonomy", "Adaptability", "Mechanics", "Composure"] },
  },
  overview: {
    headline: { en: "You often understand a problem by engaging directly with how its parts behave in the real world." },
    paragraphs: { en: [
      "ISTPs tend to combine detached analysis with practical observation, especially when a situation calls for diagnosis, adjustment, or skilled action.",
      "They may value freedom, efficient tools, and the ability to respond to present conditions without unnecessary procedure.",
      "Their composure can be valuable in immediate problems, while proactive communication and longer planning help others work confidently alongside them.",
    ] },
    summary: { en: "At your best, you bring clear analysis and skilful adaptation to practical challenges that demand a direct response." },
    access: "free",
  },
  coreTraits: [
    { id: "hands-on-analysis", title: { en: "Hands-On Analysis" }, description: { en: "Learns how a system works by observing, testing, and adjusting it directly." } },
    { id: "calm-adaptation", title: { en: "Calm Adaptation" }, description: { en: "Responds to immediate change without excessive alarm or attachment to the original plan." } },
    { id: "independent-action", title: { en: "Independent Action" }, description: { en: "Prefers enough autonomy to choose an efficient method." } },
    { id: "functional-precision", title: { en: "Functional Precision" }, description: { en: "Focuses on accurate operation and removes steps that do not serve the result." } },
  ],
  strengths: [
    { id: "rapid-troubleshooting", title: { en: "Rapid Troubleshooting" }, description: { en: "Identifies practical causes and tests workable corrections." } },
    { id: "technical-learning", title: { en: "Technical Learning" }, description: { en: "Builds competence through direct use, experimentation, and feedback." } },
    { id: "crisis-composure", title: { en: "Crisis Composure" }, description: { en: "Often remains focused when an immediate problem requires action." } },
    { id: "efficient-methods", title: { en: "Efficient Methods" }, description: { en: "Simplifies processes and tools around functional needs." } },
    { id: "situational-awareness", title: { en: "Situational Awareness" }, description: { en: "Notices concrete changes and available options in the present environment." } },
    { id: "practical-independence", title: { en: "Practical Independence" }, description: { en: "Can take responsibility for specialised work with limited supervision." } },
  ],
  growthRisks: [
    { id: "long-term-underplanning", title: { en: "Underplanning the Long Term" }, description: { en: "Present flexibility may leave future dependencies insufficiently prepared." }, growthAction: { en: "Identify the next three milestones and any commitment that others need in advance." } },
    { id: "communication-gaps", title: { en: "Communication Gaps" }, description: { en: "Internal conclusions may not be shared until action is already underway." }, growthAction: { en: "Give a short update on the issue, intended action, and likely impact before proceeding." } },
    { id: "commitment-avoidance", title: { en: "Commitment Avoidance" }, description: { en: "Keeping options open may make dependable long-term agreement difficult." }, growthAction: { en: "Choose commitments deliberately and define where flexibility remains." } },
    { id: "risk-normalisation", title: { en: "Risk Normalisation" }, description: { en: "Confidence under pressure may reduce attention to cumulative or hidden risk." }, growthAction: { en: "Use a brief pre-action check for safety, downstream effects, and reversibility." } },
    { id: "emotional-distance", title: { en: "Emotional Distance" }, description: { en: "A practical response may miss another person's need for acknowledgement." }, growthAction: { en: "Recognise the person's experience before moving to diagnosis or repair." } },
    { id: "routine-disengagement", title: { en: "Routine Disengagement" }, description: { en: "Maintenance work may lose attention when no immediate challenge is present." }, growthAction: { en: "Automate checks and connect preventive maintenance to avoided future disruption." } },
  ],
  careerGroups: [
    { id: "engineering-and-maintenance", category: { en: "Engineering and Maintenance" }, description: { en: "Technical systems provide concrete problems, tools, and measurable performance." }, roles: { en: ["Mechanical Engineer", "Aircraft Technician", "Industrial Maintenance Specialist", "Field Service Engineer"] } },
    { id: "technology-and-security", category: { en: "Technology and Security" }, description: { en: "Technical response work can reward diagnosis, autonomy, and calm adaptation." }, roles: { en: ["Cybersecurity Engineer", "Network Engineer", "DevOps Specialist", "Digital Forensics Analyst"] } },
    { id: "emergency-and-field-work", category: { en: "Emergency and Field Work" }, description: { en: "Immediate operational settings can use situational awareness and practical composure." }, roles: { en: ["Paramedic", "Firefighter", "Emergency Operations Specialist", "Search and Rescue Technician"] } },
    { id: "craft-and-production", category: { en: "Craft and Production" }, description: { en: "Skilled production work can combine precision, tools, and visible outcomes." }, roles: { en: ["Industrial Designer", "Film Camera Operator", "Master Technician", "Prototype Fabricator"] } },
  ],
  careerNotice: { en: "Personality type may suggest comfortable problem-solving environments, but it does not limit career choice, responsibility, or learned expertise." },
  premiumPreview: {
    headline: { en: "Extend practical mastery into communication and long-range impact." },
    introduction: { en: "A deeper report will examine problem solving, autonomy, risk, relationships, career fit, and sustainable focus." },
    sections: [
      { id: "problem-solving-style", title: { en: "Problem-Solving Style" }, description: { en: "How direct observation and testing guide action." }, access: "premium" },
      { id: "technical-mastery", title: { en: "Technical Mastery" }, description: { en: "Conditions that support deep practical competence." }, access: "premium" },
      { id: "risk-and-response", title: { en: "Risk and Response" }, description: { en: "Balancing composure, speed, and preventive checks." }, access: "premium" },
      { id: "communication-clarity", title: { en: "Communication Clarity" }, description: { en: "Keeping others informed without unnecessary detail." }, access: "premium" },
      { id: "commitment-patterns", title: { en: "Commitment Patterns" }, description: { en: "Preserving autonomy within dependable agreements." }, access: "premium" },
      { id: "career-environment", title: { en: "Career Environment" , zh: "职业环境"}, description: { en: "Work settings that reward skill, action, and independence." }, access: "premium" },
      { id: "stress-reactions", title: { en: "Stress Reactions" }, description: { en: "Recognising withdrawal, impulsive action, and accumulated pressure." }, access: "premium" },
      { id: "long-range-growth", title: { en: "Long-Range Growth" }, description: { en: "A practical plan for extending immediate skill into durable value." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ISTP report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
