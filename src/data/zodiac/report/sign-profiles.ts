import type {
  ZodiacSign,
} from "../types";

export interface ZodiacSignProfile {
  sign: ZodiacSign;
  name: string;
  element:
    | "Fire"
    | "Earth"
    | "Air"
    | "Water";
  modality:
    | "Cardinal"
    | "Fixed"
    | "Mutable";
  orientation: string;
  constructiveExpression: string;
  possibleTension: string;
  growthDirection: string;
  strengths: readonly string[];
  risks: readonly string[];
  relationshipThemes: readonly string[];
  careerThemes: readonly string[];
}

export const ZODIAC_SIGN_PROFILES:
  Readonly<
    Record<
      ZodiacSign,
      ZodiacSignProfile
    >
  > = Object.freeze({
    aries: {
      sign: "aries",
      name: "Aries",
      element: "Fire",
      modality: "Cardinal",
      orientation:
        "Aries symbolically relates to initiation, direct engagement, autonomy, courage, and the impulse to move from possibility into action.",
      constructiveExpression:
        "In constructive form, Aries energy may support decisiveness, willingness to begin, resilience after setbacks, and confidence in unfamiliar situations.",
      possibleTension:
        "Its faster pace may sometimes become impatience, unnecessary conflict, incomplete follow-through, or action before enough context has been considered.",
      growthDirection:
        "Growth may involve combining initiative with timing, listening, sustained effort, and awareness of how directness affects other people.",
      strengths: [
        "Starting difficult or uncertain work",
        "Responding quickly when action is needed",
        "Advocating for independence and clear direction",
        "Recovering momentum after setbacks",
      ],
      risks: [
        "Acting before gathering sufficient information",
        "Interpreting delay as opposition",
        "Losing interest after the initial challenge",
      ],
      relationshipThemes: [
        "Direct communication",
        "Autonomy inside partnership",
        "Shared activity and forward movement",
      ],
      careerThemes: [
        "Entrepreneurship and new initiatives",
        "Leadership under pressure",
        "Competitive or action-oriented environments",
      ],
    },

    taurus: {
      sign: "taurus",
      name: "Taurus",
      element: "Earth",
      modality: "Fixed",
      orientation:
        "Taurus symbolically relates to stability, physical reality, continuity, value, resources, patience, and the gradual building of dependable outcomes.",
      constructiveExpression:
        "In constructive form, Taurus energy may support consistency, practical judgement, loyalty, financial awareness, and the ability to improve something through repetition.",
      possibleTension:
        "Its preference for continuity may sometimes become resistance to necessary change, over-attachment to comfort, or persistence after conditions have shifted.",
      growthDirection:
        "Growth may involve distinguishing healthy stability from stagnation and learning to adapt without abandoning what remains genuinely valuable.",
      strengths: [
        "Sustaining effort over long periods",
        "Building tangible and reliable value",
        "Remaining grounded during uncertainty",
        "Recognising quality and practical durability",
      ],
      risks: [
        "Delaying change until pressure becomes unavoidable",
        "Equating familiarity with safety",
        "Holding tightly to resources or routines",
      ],
      relationshipThemes: [
        "Reliability and loyalty",
        "Physical and emotional security",
        "Shared values and stable routines",
      ],
      careerThemes: [
        "Finance, resources, and operations",
        "Design, craft, and material quality",
        "Long-term asset or product development",
      ],
    },

    gemini: {
      sign: "gemini",
      name: "Gemini",
      element: "Air",
      modality: "Mutable",
      orientation:
        "Gemini symbolically relates to curiosity, language, information, connection, comparison, mobility, and the rapid exchange of ideas.",
      constructiveExpression:
        "In constructive form, Gemini energy may support flexible thinking, communication, learning speed, networking, translation, and the ability to see several sides of a question.",
      possibleTension:
        "Its appetite for variety may sometimes become distraction, shallow processing, inconsistent attention, or difficulty remaining with one direction.",
      growthDirection:
        "Growth may involve turning information into understanding, choosing which questions deserve depth, and completing communication loops.",
      strengths: [
        "Learning and adapting quickly",
        "Connecting people and information",
        "Explaining ideas in accessible language",
        "Recognising alternative interpretations",
      ],
      risks: [
        "Collecting information without integration",
        "Changing direction too frequently",
        "Using analysis or humour to avoid emotional depth",
      ],
      relationshipThemes: [
        "Conversation and mental stimulation",
        "Flexibility and variety",
        "Clear exchange of expectations",
      ],
      careerThemes: [
        "Media, writing, and communications",
        "Education and information services",
        "Sales, research, and networked work",
      ],
    },

    cancer: {
      sign: "cancer",
      name: "Cancer",
      element: "Water",
      modality: "Cardinal",
      orientation:
        "Cancer symbolically relates to protection, belonging, emotional memory, care, home, continuity, and sensitivity to human needs.",
      constructiveExpression:
        "In constructive form, Cancer energy may support empathy, loyalty, protective leadership, social awareness, and the ability to create environments where people feel secure.",
      possibleTension:
        "Its sensitivity may sometimes become defensiveness, indirect communication, overprotection, or difficulty separating current situations from earlier emotional experiences.",
      growthDirection:
        "Growth may involve maintaining care without over-responsibility, communicating needs directly, and building boundaries that preserve emotional capacity.",
      strengths: [
        "Recognising emotional and practical needs",
        "Creating trust and belonging",
        "Protecting people, history, or shared resources",
        "Remembering important relational context",
      ],
      risks: [
        "Taking responsibility for other people’s emotions",
        "Withdrawing instead of explaining hurt",
        "Remaining attached to familiar emotional patterns",
      ],
      relationshipThemes: [
        "Emotional safety",
        "Care and mutual protection",
        "Home, family, and belonging",
      ],
      careerThemes: [
        "Care, education, and community work",
        "Hospitality and people-centred services",
        "Housing, food, history, and cultural continuity",
      ],
    },

    leo: {
      sign: "leo",
      name: "Leo",
      element: "Fire",
      modality: "Fixed",
      orientation:
        "Leo symbolically relates to creativity, visibility, self-expression, confidence, warmth, leadership, and the desire to make a recognisable contribution.",
      constructiveExpression:
        "In constructive form, Leo energy may support courage, generosity, creative direction, loyalty, motivation, and the ability to give a group a clear emotional centre.",
      possibleTension:
        "Its desire for recognition may sometimes become over-identification with status, difficulty receiving criticism, or pressure to maintain a strong public image.",
      growthDirection:
        "Growth may involve separating genuine expression from performance and using visibility to encourage contribution rather than secure constant approval.",
      strengths: [
        "Communicating conviction and creative direction",
        "Encouraging confidence in others",
        "Taking visible responsibility",
        "Building loyalty around shared purpose",
      ],
      risks: [
        "Seeking recognition instead of useful feedback",
        "Taking disagreement personally",
        "Overcommitting to protect pride or reputation",
      ],
      relationshipThemes: [
        "Warmth and appreciation",
        "Loyalty and visible affection",
        "Creative partnership",
      ],
      careerThemes: [
        "Leadership and public-facing work",
        "Creative industries and performance",
        "Brand, education, and audience development",
      ],
    },

    virgo: {
      sign: "virgo",
      name: "Virgo",
      element: "Earth",
      modality: "Mutable",
      orientation:
        "Virgo symbolically relates to analysis, refinement, service, practical intelligence, health, craft, organisation, and the improvement of systems.",
      constructiveExpression:
        "In constructive form, Virgo energy may support accuracy, responsibility, problem diagnosis, process improvement, careful learning, and useful service.",
      possibleTension:
        "Its attention to imperfections may sometimes become excessive self-criticism, over-analysis, anxiety about errors, or difficulty accepting good-enough completion.",
      growthDirection:
        "Growth may involve placing detail inside a larger purpose, distinguishing useful standards from perfectionism, and allowing iteration.",
      strengths: [
        "Identifying problems and inconsistencies",
        "Improving procedures and quality",
        "Learning through careful observation",
        "Providing practical and dependable support",
      ],
      risks: [
        "Over-focusing on flaws",
        "Delaying completion through repeated refinement",
        "Underestimating work that appears effortless",
      ],
      relationshipThemes: [
        "Practical care and reliability",
        "Clear expectations",
        "Respect for effort and competence",
      ],
      careerThemes: [
        "Analysis, quality, and operations",
        "Health and service systems",
        "Research, editing, and technical craft",
      ],
    },

    libra: {
      sign: "libra",
      name: "Libra",
      element: "Air",
      modality: "Cardinal",
      orientation:
        "Libra symbolically relates to balance, relationship, negotiation, aesthetics, reciprocity, fairness, and the effort to coordinate different perspectives.",
      constructiveExpression:
        "In constructive form, Libra energy may support diplomacy, collaboration, design awareness, mediation, and the ability to create workable agreements.",
      possibleTension:
        "Its awareness of multiple viewpoints may sometimes become indecision, conflict avoidance, dependence on external validation, or delayed boundary-setting.",
      growthDirection:
        "Growth may involve recognising that fairness does not always mean equal agreement and that clear decisions can preserve relationships.",
      strengths: [
        "Understanding competing perspectives",
        "Building cooperation and agreement",
        "Recognising aesthetic and relational balance",
        "Communicating with tact",
      ],
      risks: [
        "Avoiding decisions to maintain temporary harmony",
        "Suppressing needs until resentment develops",
        "Overvaluing appearance or social approval",
      ],
      relationshipThemes: [
        "Reciprocity and partnership",
        "Fair negotiation",
        "Shared aesthetic or social values",
      ],
      careerThemes: [
        "Law, diplomacy, and mediation",
        "Design, branding, and client work",
        "Partnerships and stakeholder management",
      ],
    },

    scorpio: {
      sign: "scorpio",
      name: "Scorpio",
      element: "Water",
      modality: "Fixed",
      orientation:
        "Scorpio symbolically relates to depth, privacy, transformation, trust, power, shared resources, emotional intensity, and investigation beneath surface appearances.",
      constructiveExpression:
        "In constructive form, Scorpio energy may support resilience, strategic insight, confidentiality, emotional courage, crisis competence, and deep commitment.",
      possibleTension:
        "Its protective intensity may sometimes become suspicion, control, secrecy, fixation, or difficulty releasing situations that have lost their purpose.",
      growthDirection:
        "Growth may involve using discernment without assuming threat, sharing power deliberately, and allowing trust to develop through evidence rather than tests.",
      strengths: [
        "Investigating hidden causes",
        "Remaining focused during crisis",
        "Handling confidential or complex matters",
        "Committing deeply to meaningful transformation",
      ],
      risks: [
        "Protecting vulnerability through excessive control",
        "Interpreting uncertainty as hidden intent",
        "Remaining attached to conflict or betrayal",
      ],
      relationshipThemes: [
        "Trust and emotional honesty",
        "Depth and loyalty",
        "Shared power and resources",
      ],
      careerThemes: [
        "Research and investigation",
        "Finance, risk, and shared assets",
        "Psychology, crisis, and transformation work",
      ],
    },

    sagittarius: {
      sign: "sagittarius",
      name: "Sagittarius",
      element: "Fire",
      modality: "Mutable",
      orientation:
        "Sagittarius symbolically relates to exploration, meaning, belief, learning, travel, possibility, truth-seeking, and the expansion of perspective.",
      constructiveExpression:
        "In constructive form, Sagittarius energy may support optimism, teaching, strategic vision, cultural curiosity, intellectual independence, and willingness to explore beyond familiar limits.",
      possibleTension:
        "Its focus on possibility may sometimes become overconfidence, restlessness, bluntness, incomplete detail, or commitment to a broad idea without enough testing.",
      growthDirection:
        "Growth may involve connecting vision to evidence, respecting local complexity, and translating enthusiasm into sustained practice.",
      strengths: [
        "Seeing wider patterns and future possibilities",
        "Learning across cultures and disciplines",
        "Communicating meaning and direction",
        "Taking constructive intellectual risks",
      ],
      risks: [
        "Overgeneralising from limited evidence",
        "Losing attention to implementation details",
        "Treating freedom as freedom from responsibility",
      ],
      relationshipThemes: [
        "Shared growth and exploration",
        "Honesty and intellectual freedom",
        "Space for individual development",
      ],
      careerThemes: [
        "Education, publishing, and communication",
        "Travel, international work, and culture",
        "Strategy, law, and purpose-led leadership",
      ],
    },

    capricorn: {
      sign: "capricorn",
      name: "Capricorn",
      element: "Earth",
      modality: "Cardinal",
      orientation:
        "Capricorn symbolically relates to structure, responsibility, discipline, authority, time, achievement, and the construction of durable results.",
      constructiveExpression:
        "In constructive form, Capricorn energy may support patience, strategic planning, accountability, realistic ambition, and the ability to work toward distant outcomes.",
      possibleTension:
        "Its emphasis on competence may sometimes become excessive pressure, emotional restraint, pessimism, overwork, or identification with status and productivity.",
      growthDirection:
        "Growth may involve allowing support, recognising progress before completion, and defining success broadly enough to include health and relationships.",
      strengths: [
        "Planning toward long-term objectives",
        "Taking responsibility under constraint",
        "Building systems and institutions",
        "Using limited resources strategically",
      ],
      risks: [
        "Equating personal worth with achievement",
        "Carrying responsibility that should be shared",
        "Delaying satisfaction indefinitely",
      ],
      relationshipThemes: [
        "Reliability and commitment",
        "Respect and shared responsibility",
        "Long-term planning",
      ],
      careerThemes: [
        "Management and institutional leadership",
        "Finance, governance, and strategy",
        "Engineering, operations, and long-term development",
      ],
    },

    aquarius: {
      sign: "aquarius",
      name: "Aquarius",
      element: "Air",
      modality: "Fixed",
      orientation:
        "Aquarius symbolically relates to systems, independence, innovation, groups, future possibilities, social patterns, and ideas that challenge established assumptions.",
      constructiveExpression:
        "In constructive form, Aquarius energy may support originality, systems thinking, intellectual independence, community vision, and willingness to question outdated structures.",
      possibleTension:
        "Its preference for objectivity may sometimes become emotional distance, contrarianism, inflexibility around ideas, or stronger loyalty to principles than human context.",
      growthDirection:
        "Growth may involve connecting innovation to lived needs, allowing emotional information into analysis, and remaining open to revising unconventional ideas.",
      strengths: [
        "Recognising social and technological patterns",
        "Developing unconventional solutions",
        "Thinking independently of group pressure",
        "Connecting ideas with collective goals",
      ],
      risks: [
        "Becoming detached from immediate human needs",
        "Rejecting useful tradition because it is traditional",
        "Treating difference as proof of correctness",
      ],
      relationshipThemes: [
        "Friendship and intellectual equality",
        "Independence within connection",
        "Shared ideals and community",
      ],
      careerThemes: [
        "Technology, science, and systems",
        "Social innovation and networks",
        "Research, policy, and future-oriented strategy",
      ],
    },

    pisces: {
      sign: "pisces",
      name: "Pisces",
      element: "Water",
      modality: "Mutable",
      orientation:
        "Pisces symbolically relates to imagination, empathy, synthesis, spirituality, art, permeability, compassion, and sensitivity to subtle experience.",
      constructiveExpression:
        "In constructive form, Pisces energy may support creativity, emotional understanding, symbolic thinking, compassion, adaptability, and the ability to connect experiences that appear separate.",
      possibleTension:
        "Its openness may sometimes become unclear boundaries, avoidance, idealisation, confusion, emotional overload, or difficulty translating intuition into action.",
      growthDirection:
        "Growth may involve giving imagination a structure, checking intuition against evidence, and protecting sensitivity through clear commitments and boundaries.",
      strengths: [
        "Understanding emotional and symbolic meaning",
        "Creating imaginative or compassionate responses",
        "Adapting to complex human situations",
        "Connecting different experiences into a larger whole",
      ],
      risks: [
        "Absorbing other people’s emotional states",
        "Avoiding difficult practical decisions",
        "Idealising people, projects, or possibilities",
      ],
      relationshipThemes: [
        "Compassion and emotional resonance",
        "Imagination and shared meaning",
        "Clear boundaries around care",
      ],
      careerThemes: [
        "Art, music, film, and storytelling",
        "Care, healing, and social support",
        "Spiritual, cultural, and humanitarian work",
      ],
    },
  });

export function getZodiacSignProfile(
  sign: ZodiacSign,
): ZodiacSignProfile {
  return ZODIAC_SIGN_PROFILES[sign];
}
