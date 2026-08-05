import type { PersonalityProfile } from "./types";

export const intpProfile: PersonalityProfile = {
  schemaVersion: "1.0.0",
  type: "INTP",
  identity: {
    name: { en: "Logician" },
    shortName: { en: "Conceptual Analyst" },
    tagline: { en: "Curious theorist · Independent explorer · Precise problem solver" },
    keywords: { en: ["Curiosity", "Logic", "Independence", "Originality", "Analysis", "Adaptability"] },
  },
  overview: {
    headline: { en: "You are often drawn to the principles beneath complex ideas and systems." },
    paragraphs: { en: [
      "INTPs tend to explore problems by testing assumptions, connecting concepts, and searching for explanations that remain coherent under scrutiny.",
      "They often value intellectual freedom and may work best when they can investigate difficult questions without unnecessary rules or premature conclusions.",
      "Their flexibility can support inventive solutions, although sustained execution may require deliberate structure when novelty fades.",
    ] },
    summary: { en: "At your best, you combine rigorous curiosity with the freedom to discover an elegant new approach." },
    access: "free",
  },
  coreTraits: [
    { id: "conceptual-curiosity", title: { en: "Conceptual Curiosity" }, description: { en: "Enjoys examining theories, assumptions, and hidden relationships until a clearer model emerges." } },
    { id: "independent-reasoning", title: { en: "Independent Reasoning" }, description: { en: "Prefers conclusions supported by personal analysis rather than status, convention, or group pressure." } },
    { id: "adaptive-exploration", title: { en: "Adaptive Exploration" }, description: { en: "Keeps multiple possibilities open and readily revises an idea when stronger evidence appears." } },
    { id: "analytical-distance", title: { en: "Analytical Distance" }, description: { en: "Can step back from immediate reactions to examine a problem with precision and perspective." } },
  ],
  strengths: [
    { id: "model-building", title: { en: "Model Building" }, description: { en: "Creates useful conceptual frameworks for understanding complicated systems." } },
    { id: "original-solutions", title: { en: "Original Solutions" }, description: { en: "Generates unconventional options when standard methods do not fit the problem." } },
    { id: "critical-analysis", title: { en: "Critical Analysis" }, description: { en: "Identifies weak assumptions, contradictions, and gaps in reasoning." } },
    { id: "rapid-learning", title: { en: "Rapid Learning" }, description: { en: "Absorbs unfamiliar concepts quickly when a subject offers intellectual depth." } },
    { id: "intellectual-honesty", title: { en: "Intellectual Honesty" }, description: { en: "Is often willing to change position when the available evidence changes." } },
    { id: "calm-problem-solving", title: { en: "Calm Problem Solving" }, description: { en: "Can remain composed while separating a difficult issue into workable parts." } },
  ],
  growthRisks: [
    { id: "analysis-without-action", title: { en: "Analysis Without Action" }, description: { en: "Continued exploration may delay a decision after enough information is available." }, growthAction: { en: "Define a decision threshold and convert the strongest current idea into a small experiment." } },
    { id: "unfinished-execution", title: { en: "Unfinished Execution" }, description: { en: "Interest may decline once a problem becomes routine implementation." }, growthAction: { en: "Break delivery into visible milestones and reserve focused time for completion." } },
    { id: "social-withdrawal", title: { en: "Excessive Withdrawal" }, description: { en: "A preference for internal processing may reduce useful communication with others." }, growthAction: { en: "Share an early working model and invite targeted feedback before refining it alone." } },
    { id: "overcomplication", title: { en: "Overcomplication" }, description: { en: "Elegant complexity may sometimes be valued more than a simple usable answer." }, growthAction: { en: "Ask which explanation or solution is sufficient for the actual decision." } },
    { id: "emotional-blind-spots", title: { en: "Emotional Blind Spots" }, description: { en: "Logical analysis may overlook how people experience a decision." }, growthAction: { en: "Include trust, motivation, and emotional impact among the relevant system variables." } },
    { id: "routine-resistance", title: { en: "Routine Resistance" }, description: { en: "Necessary repetition can feel restrictive and invite avoidance." }, growthAction: { en: "Automate recurring work where possible and connect remaining routines to a valued outcome." } },
  ],
  careerGroups: [
    { id: "research-and-theory", category: { en: "Research and Theory" }, description: { en: "Work centred on discovery, explanation, and difficult questions can reward sustained curiosity." }, roles: { en: ["Research Scientist", "Mathematician", "Economist", "Academic Researcher"] } },
    { id: "software-and-systems", category: { en: "Software and Systems" }, description: { en: "Technical environments can provide complex systems to analyse, design, and improve." }, roles: { en: ["Software Engineer", "Systems Architect", "Data Scientist", "Cybersecurity Analyst"] } },
    { id: "analysis-and-strategy", category: { en: "Analysis and Strategy" }, description: { en: "Independent analytical roles can turn abstract reasoning into clearer decisions." }, roles: { en: ["Policy Analyst", "Quantitative Analyst", "Operations Research Analyst", "Strategy Analyst"] } },
    { id: "design-and-invention", category: { en: "Design and Invention" }, description: { en: "Open-ended creation can combine conceptual depth with practical experimentation." }, roles: { en: ["Product Designer", "Research Engineer", "Game Systems Designer", "Innovation Consultant"] } },
  ],
  careerNotice: { en: "Personality type can suggest preferred ways of working, but it should never be treated as a fixed limit on career choice or capability." },
  premiumPreview: {
    headline: { en: "Turn your curiosity into focused, useful progress." },
    introduction: { en: "A deeper report will explore how your analytical independence influences work, decisions, relationships, and follow-through." },
    sections: [
      { id: "thinking-patterns", title: { en: "Thinking Patterns" }, description: { en: "How you build models, test assumptions, and refine explanations." }, access: "premium" },
      { id: "decision-process", title: { en: "Decision Process" }, description: { en: "How to move from open exploration to a timely commitment." }, access: "premium" },
      { id: "work-environment", title: { en: "Work Environment" }, description: { en: "Conditions that support autonomy, depth, and effective delivery." }, access: "premium" },
      { id: "communication-style", title: { en: "Communication Style" , zh: "沟通风格"}, description: { en: "Ways to translate complex reasoning into accessible conversation." }, access: "premium" },
      { id: "relationship-dynamics", title: { en: "Relationship Dynamics" }, description: { en: "How independence and internal processing shape connection." }, access: "premium" },
      { id: "stress-response", title: { en: "Stress Response" }, description: { en: "Patterns that may appear when uncertainty or demands accumulate." }, access: "premium" },
      { id: "execution-practice", title: { en: "Execution Practice" }, description: { en: "Methods for completing valuable work after discovery." }, access: "premium" },
      { id: "growth-roadmap", title: { en: "Growth Roadmap" }, description: { en: "Practical experiments for balancing insight, action, and collaboration." }, access: "premium" },
    ],
    callToAction: { en: "Explore the complete INTP report" },
  },
  metadata: { assessmentModel: "MBTI_STYLE", contentVersion: "1.0.0", reviewed: true, availableLocales: ["en"] },
};
