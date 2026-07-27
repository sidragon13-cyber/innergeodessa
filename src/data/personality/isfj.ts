import type { PersonalityProfile } from "./types";

export const isfjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ISFJ",
  identity: {
    name: { en: "Defender" },
    shortName: { en: "Considerate Steward" },
    tagline: { en: "Attentive supporter · Practical caregiver · Loyal organiser" },
    keywords: { en: ["Care", "Reliability", "Observation", "Loyalty", "Service", "Stability"] },
  },
  overview: {
    headline: { en: "You often support people through attentive care, practical detail, and commitments that endure." },
    paragraphs: { en: [
      "ISFJs tend to notice concrete needs and remember the details that help people feel understood, secure, and included.",
      "They may contribute quietly but consistently, preferring useful action and trusted relationships over public recognition.",
      "Their loyalty can strengthen families, teams, and services, while direct boundaries help ensure care remains sustainable and reciprocal.",
    ] },
    summary: { en: "At your best, you combine practical reliability with personal attentiveness that makes everyday systems more humane." },
    access: "free",
  },
  coreTraits: [
    { id: "attentive-care", title: { en: "Attentive Care" }, description: { en: "Notices individual preferences and practical needs that others may overlook." } },
    { id: "dependable-service", title: { en: "Dependable Service" }, description: { en: "Follows through consistently where people rely on the outcome." } },
    { id: "detailed-memory", title: { en: "Detailed Memory" }, description: { en: "Uses past experience and specific information to provide continuity." } },
    { id: "quiet-cooperation", title: { en: "Quiet Cooperation" }, description: { en: "Works patiently with others and often supports shared routines without seeking attention." } },
  ],
  strengths: [
    { id: "practical-support", title: { en: "Practical Support" }, description: { en: "Turns concern into specific, useful assistance." } },
    { id: "trust-building", title: { en: "Trust Building" }, description: { en: "Creates security through consistency, discretion, and remembered details." } },
    { id: "careful-organisation", title: { en: "Careful Organisation" }, description: { en: "Maintains schedules, information, and resources with steady attention." } },
    { id: "service-awareness", title: { en: "Service Awareness" }, description: { en: "Recognises how processes affect the real experience of individuals." } },
    { id: "patient-follow-through", title: { en: "Patient Follow-Through" }, description: { en: "Sustains necessary work even when progress is gradual." } },
    { id: "community-continuity", title: { en: "Community Continuity" }, description: { en: "Preserves helpful knowledge, rituals, and relationships over time." } },
  ],
  growthRisks: [
    { id: "needs-suppression", title: { en: "Suppressing Personal Needs" }, description: { en: "Concern for others may make personal preferences difficult to state." }, growthAction: { en: "Name one need or limit early, before support turns into resentment." } },
    { id: "overcommitment-to-help", title: { en: "Overcommitment to Help" }, description: { en: "A request may be accepted even when time and energy are insufficient." }, growthAction: { en: "Check capacity before agreeing and offer a smaller form of support when necessary." } },
    { id: "conflict-avoidance", title: { en: "Conflict Avoidance" }, description: { en: "Discomfort with tension may allow a practical problem to continue." }, growthAction: { en: "Describe the observable issue and request a concrete adjustment without assigning blame." } },
    { id: "change-anxiety", title: { en: "Change Anxiety" }, description: { en: "Unfamiliar plans may feel risky when their effect on people is uncertain." }, growthAction: { en: "Ask for a staged transition, practical examples, and a clear support plan." } },
    { id: "recognition-gap", title: { en: "Recognition Gap" }, description: { en: "Quiet contributions may remain invisible, limiting support or advancement." }, growthAction: { en: "Document outcomes and communicate contributions in factual terms." } },
    { id: "taking-feedback-personally", title: { en: "Taking Feedback Personally" }, description: { en: "Correction may feel like a judgement of loyalty or care." }, growthAction: { en: "Separate intent, behaviour, and result, then identify the useful specific change." } },
  ],
  careerGroups: [
    { id: "health-and-care", category: { en: "Health and Care" }, description: { en: "Care settings can reward practical attention, continuity, and individual support." }, roles: { en: ["Registered Nurse", "Occupational Therapy Assistant", "Patient Services Coordinator", "Community Health Worker"] } },
    { id: "education-and-support", category: { en: "Education and Support" }, description: { en: "Learning support can use patience, observation, and dependable follow-through." }, roles: { en: ["Primary School Teacher", "Special Education Assistant", "Student Services Coordinator", "School Administrator"] } },
    { id: "administration-and-service", category: { en: "Administration and Service" }, description: { en: "Service operations benefit from detailed organisation and awareness of user needs." }, roles: { en: ["Office Manager", "Customer Service Manager", "Programme Coordinator", "Library Services Officer"] } },
    { id: "people-operations", category: { en: "People Operations" }, description: { en: "Employee support roles can combine process reliability with personal attention." }, roles: { en: ["Human Resources Coordinator", "Benefits Specialist", "Onboarding Manager", "Employee Relations Adviser"] } },
  ],
  careerNotice: { en: "Personality type can describe preferred forms of contribution, but it should not be used as a fixed limit on career direction or growth." },
  premiumPreview: {
    headline: { en: "Sustain your care without disappearing inside responsibility." },
    introduction: { en: "A deeper report will explore service, boundaries, communication, work fit, relationships, and recovery." },
    sections: [
      { id: "care-patterns", title: { en: "Care Patterns" }, description: { en: "How attention and memory shape practical support." }, access: "premium" },
      { id: "boundary-practice", title: { en: "Boundary Practice" }, description: { en: "Protecting energy while remaining dependable." }, access: "premium" },
      { id: "communication-needs", title: { en: "Communication Needs" }, description: { en: "Expressing preferences and concerns with calm clarity." }, access: "premium" },
      { id: "change-support", title: { en: "Change Support" }, description: { en: "Adapting through clear steps and human consideration." }, access: "premium" },
      { id: "career-environments", title: { en: "Career Environments" }, description: { en: "Settings that value service, detail, and continuity." }, access: "premium" },
      { id: "relationship-reciprocity", title: { en: "Relationship Reciprocity" }, description: { en: "Balancing giving, receiving, and honest expectations." }, access: "premium" },
      { id: "stress-signals", title: { en: "Stress Signals" }, description: { en: "Recognising silent overload and unspoken resentment." }, access: "premium" },
      { id: "sustainable-service", title: { en: "Sustainable Service" }, description: { en: "A plan for caring effectively without sacrificing wellbeing." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ISFJ report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
