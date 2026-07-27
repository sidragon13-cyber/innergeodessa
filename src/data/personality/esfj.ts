import type { PersonalityProfile } from "./types";

export const esfjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ESFJ",
  identity: {
    name: { en: "Consul" },
    shortName: { en: "Community Builder" },
    tagline: { en: "Warm coordinator · Practical host · Loyal contributor" },
    keywords: { en: ["Community", "Care", "Cooperation", "Reliability", "Warmth", "Tradition"] },
  },
  overview: {
    headline: { en: "You often strengthen a community by noticing practical needs and helping people feel welcomed, supported, and connected." },
    paragraphs: { en: [
      "ESFJs tend to invest actively in relationships, shared responsibilities, and the routines that help groups function well.",
      "They may express care through organisation, communication, and tangible support, often remembering preferences and important occasions.",
      "Their responsiveness can create belonging, while boundaries and openness to different values help care remain balanced rather than approval-driven.",
    ] },
    summary: { en: "At your best, you turn social awareness into dependable action that helps people participate and belong." },
    access: "free",
  },
  coreTraits: [
    { id: "community-attunement", title: { en: "Community Attunement" }, description: { en: "Notices inclusion, morale, and practical needs within a group." } },
    { id: "expressive-care", title: { en: "Expressive Care" }, description: { en: "Communicates appreciation and concern through visible, concrete action." } },
    { id: "social-organisation", title: { en: "Social Organisation" }, description: { en: "Coordinates details and people to support shared occasions or responsibilities." } },
    { id: "loyal-participation", title: { en: "Loyal Participation" }, description: { en: "Invests consistently in relationships and institutions that matter." } },
  ],
  strengths: [
    { id: "welcoming-connection", title: { en: "Welcoming Connection" }, description: { en: "Helps people feel noticed and included." } },
    { id: "practical-coordination", title: { en: "Practical Coordination" }, description: { en: "Organises schedules, resources, and communication around group needs." } },
    { id: "service-responsiveness", title: { en: "Service Responsiveness" }, description: { en: "Responds quickly when someone needs concrete assistance." } },
    { id: "relationship-maintenance", title: { en: "Relationship Maintenance" }, description: { en: "Sustains contact and shared traditions over time." } },
    { id: "clear-cooperation", title: { en: "Clear Cooperation" }, description: { en: "Encourages participation through visible expectations and encouragement." } },
    { id: "morale-awareness", title: { en: "Morale Awareness" }, description: { en: "Recognises changes in group atmosphere and works to restore connection." } },
  ],
  growthRisks: [
    { id: "approval-dependence", title: { en: "Approval Dependence" }, description: { en: "Negative reactions may carry more weight than personal judgement or evidence." }, growthAction: { en: "Clarify your own values and the objective facts before adjusting to another person's response." } },
    { id: "boundary-difficulty", title: { en: "Boundary Difficulty" }, description: { en: "A desire to be helpful may produce unsustainable availability." }, growthAction: { en: "Offer support within a specific time, task, or capacity limit." } },
    { id: "conflict-personalisation", title: { en: "Personalising Conflict" }, description: { en: "Disagreement may feel like rejection of the relationship." }, growthAction: { en: "Separate the issue under discussion from the overall value of the relationship." } },
    { id: "difference-discomfort", title: { en: "Discomfort with Difference" }, description: { en: "Unfamiliar choices may be judged against local expectations too quickly." }, growthAction: { en: "Ask what value or circumstance makes the different approach meaningful to that person." } },
    { id: "unspoken-expectations", title: { en: "Unspoken Expectations" }, description: { en: "Generous effort may create expectations of reciprocity that were never discussed." }, growthAction: { en: "State what you need directly rather than relying on others to infer it." } },
    { id: "social-overload", title: { en: "Social Overload" }, description: { en: "Frequent involvement may leave insufficient private recovery time." }, growthAction: { en: "Protect regular low-demand periods even when social opportunities remain available." } },
  ],
  careerGroups: [
    { id: "health-and-wellbeing", category: { en: "Health and Wellbeing" }, description: { en: "People-facing care work can reward responsiveness and practical coordination." }, roles: { en: ["Nurse", "Patient Experience Manager", "Dietitian", "Healthcare Practice Manager"] } },
    { id: "education-and-community", category: { en: "Education and Community" }, description: { en: "Community learning roles can use warmth, organisation, and visible encouragement." }, roles: { en: ["Teacher", "School Counsellor", "Community Programme Coordinator", "Parent Engagement Officer"] } },
    { id: "hospitality-and-events", category: { en: "Hospitality and Events" }, description: { en: "Hospitality environments reward anticipation of needs and coordinated service." }, roles: { en: ["Event Manager", "Hotel Manager", "Guest Experience Director", "Conference Coordinator"] } },
    { id: "people-and-client-service", category: { en: "People and Client Service" }, description: { en: "Relationship-centred operations can combine service standards with ongoing contact." }, roles: { en: ["Customer Success Manager", "Human Resources Manager", "Account Manager", "Client Services Director"] } },
  ],
  careerNotice: { en: "Personality type may suggest satisfying forms of service and interaction, but it is not a fixed limitation on career choice or achievement." },
  premiumPreview: {
    headline: { en: "Create belonging while protecting your own direction and energy." },
    introduction: { en: "A deeper report will explore care, communication, boundaries, work fit, conflict, and sustainable connection." },
    sections: [
      { id: "community-role", title: { en: "Community Role" }, description: { en: "How you create inclusion and practical support." }, access: "premium" },
      { id: "approval-and-values", title: { en: "Approval and Values" }, description: { en: "Balancing social feedback with personal judgement." }, access: "premium" },
      { id: "boundary-setting", title: { en: "Boundary Setting" }, description: { en: "Remaining generous without becoming overextended." }, access: "premium" },
      { id: "conflict-communication", title: { en: "Conflict Communication" }, description: { en: "Addressing differences without treating them as rejection." }, access: "premium" },
      { id: "relationship-reciprocity", title: { en: "Relationship Reciprocity" }, description: { en: "Making needs and expectations visible." }, access: "premium" },
      { id: "career-fit", title: { en: "Career Fit" }, description: { en: "Environments that value people, service, and organisation." }, access: "premium" },
      { id: "stress-and-overload", title: { en: "Stress and Overload" }, description: { en: "Recognising social fatigue and unmet personal needs." }, access: "premium" },
      { id: "balanced-contribution", title: { en: "Balanced Contribution" }, description: { en: "A plan for sustaining care alongside personal growth." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ESFJ report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
