import type { PersonalityProfile } from "./types";

export const enfjProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "ENFJ",
  identity: {
    name: { en: "Protagonist" },
    shortName: { en: "Inspiring Facilitator" },
    tagline: { en: "People developer · Purposeful communicator · Collaborative organiser" },
    keywords: { en: ["Encouragement", "Leadership", "Connection", "Purpose", "Communication", "Growth"] },
  },
  overview: {
    headline: { en: "You often create momentum by helping people see a shared purpose and their place within it." },
    paragraphs: { en: [
      "ENFJs tend to combine social awareness, future-oriented thinking, and organised effort in support of people and collective goals.",
      "They may communicate with warmth and conviction, noticing what helps a group feel included, motivated, and capable of progress.",
      "Their investment in others can be influential, while clear boundaries and room for dissent keep support from becoming over-responsibility.",
    ] },
    summary: { en: "At your best, you align human potential with a meaningful direction and help a group move toward it together." },
    access: "free",
  },
  coreTraits: [
    { id: "developmental-leadership", title: { en: "Developmental Leadership" }, description: { en: "Looks for ways to help individuals contribute, learn, and grow within a shared effort." } },
    { id: "social-attunement", title: { en: "Social Attunement" }, description: { en: "Reads interpersonal dynamics and adapts communication to support understanding." } },
    { id: "purposeful-vision", title: { en: "Purposeful Vision" }, description: { en: "Connects future possibilities with values that can motivate collective action." } },
    { id: "coordinated-action", title: { en: "Coordinated Action" }, description: { en: "Brings people, expectations, and timelines into a coherent plan." } },
  ],
  strengths: [
    { id: "motivating-communication", title: { en: "Motivating Communication" }, description: { en: "Expresses direction in a way that helps others understand why it matters." } },
    { id: "relationship-building", title: { en: "Relationship Building" }, description: { en: "Creates trust through attention, encouragement, and consistent engagement." } },
    { id: "group-facilitation", title: { en: "Group Facilitation" }, description: { en: "Helps different voices participate and move toward workable agreement." } },
    { id: "talent-development", title: { en: "Talent Development" }, description: { en: "Recognises potential and offers feedback that supports growth." } },
    { id: "values-alignment", title: { en: "Values Alignment" }, description: { en: "Links everyday activity with broader human or organisational purpose." } },
    { id: "responsible-follow-through", title: { en: "Responsible Follow-Through" }, description: { en: "Maintains structure around commitments involving other people." } },
  ],
  growthRisks: [
    { id: "over-responsibility", title: { en: "Over-Responsibility" }, description: { en: "Concern for group success may lead to carrying work or emotions that belong to others." }, growthAction: { en: "Clarify ownership and support people without taking over their responsibility." } },
    { id: "approval-sensitivity", title: { en: "Approval Sensitivity" }, description: { en: "Visible disappointment or conflict may create pressure to restore harmony too quickly." }, growthAction: { en: "Evaluate feedback against values and evidence before changing direction." } },
    { id: "difficult-truth-delay", title: { en: "Delayed Difficult Truths" }, description: { en: "Protecting morale may postpone necessary corrective feedback." }, growthAction: { en: "Deliver specific feedback early, pairing respect with a clear expectation." } },
    { id: "personal-needs-neglect", title: { en: "Neglecting Personal Needs" }, description: { en: "Attention to others may leave little space for private priorities and recovery." }, growthAction: { en: "Reserve non-negotiable time for reflection, rest, and personal goals." } },
    { id: "idealised-consensus", title: { en: "Idealised Consensus" }, description: { en: "A shared vision may be assumed before genuine disagreement has been explored." }, growthAction: { en: "Invite objections explicitly and distinguish commitment from surface agreement." } },
    { id: "intensity-of-involvement", title: { en: "Intensity of Involvement" }, description: { en: "Enthusiastic guidance may feel directive to someone needing autonomy." }, growthAction: { en: "Ask what kind of support is welcome before offering a plan." } },
  ],
  careerGroups: [
    { id: "education-and-development", category: { en: "Education and Development" }, description: { en: "Learning environments can use encouragement, structure, and developmental insight." }, roles: { en: ["Teacher", "Learning and Development Manager", "Academic Adviser", "Leadership Coach"] } },
    { id: "people-and-culture", category: { en: "People and Culture" }, description: { en: "Organisational people work can align culture, growth, and shared purpose." }, roles: { en: ["Human Resources Director", "Talent Development Lead", "Culture Programme Manager", "Employee Experience Manager"] } },
    { id: "communication-and-advocacy", category: { en: "Communication and Advocacy" }, description: { en: "Public communication can mobilise attention around constructive goals." }, roles: { en: ["Communications Director", "Public Affairs Manager", "Campaign Director", "Community Engagement Lead"] } },
    { id: "service-leadership", category: { en: "Service Leadership" }, description: { en: "Mission-led leadership can combine operational responsibility with human impact." }, roles: { en: ["Nonprofit Director", "Programme Manager", "Healthcare Administrator", "Social Enterprise Lead"] } },
  ],
  careerNotice: { en: "Personality type may highlight preferred ways of contributing, but it does not set a fixed boundary on career choices or capability." },
  premiumPreview: {
    headline: { en: "Lead people with purpose, clarity, and sustainable boundaries." },
    introduction: { en: "A deeper report will explore influence, relationships, decisions, work fit, stress, and personal development." },
    sections: [
      { id: "leadership-impact", title: { en: "Leadership Impact" }, description: { en: "How encouragement and direction shape group performance." }, access: "premium" },
      { id: "communication-influence", title: { en: "Communication and Influence" }, description: { en: "Using warmth and conviction without over-directing." }, access: "premium" },
      { id: "team-dynamics", title: { en: "Team Dynamics" }, description: { en: "Building inclusion while making room for disagreement." }, access: "premium" },
      { id: "feedback-practice", title: { en: "Feedback Practice" }, description: { en: "Combining developmental support with necessary clarity." }, access: "premium" },
      { id: "relationship-boundaries", title: { en: "Relationship Boundaries" }, description: { en: "Caring for others without taking over their outcomes." }, access: "premium" },
      { id: "career-environment", title: { en: "Career Environment" , zh: "职业环境"}, description: { en: "Settings that reward purpose, interaction, and organised impact." }, access: "premium" },
      { id: "stress-patterns", title: { en: "Stress Patterns" , zh: "压力模式"}, description: { en: "Recognising approval pressure, overload, and emotional fatigue." }, access: "premium" },
      { id: "sustainable-growth", title: { en: "Sustainable Growth" }, description: { en: "A plan for balancing contribution, autonomy, and recovery." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete ENFJ report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
