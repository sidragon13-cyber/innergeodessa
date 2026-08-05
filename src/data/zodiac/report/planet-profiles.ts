export type ZodiacReportPointCode =
  | "sun"
  | "moon"
  | "mercury"
  | "venus"
  | "mars"
  | "ascendant"
  | "descendant"
  | "midheaven"
  | "imumCoeli";

export interface ZodiacReportPointProfile {
  code: ZodiacReportPointCode;
  name: string;
  symbol: string;
  domain: string;
  role: string;
  constructiveExpression: string;
  possibleTension: string;
  reflectionQuestions: readonly string[];
}

export const ZODIAC_REPORT_POINT_PROFILES:
  Readonly<
    Record<
      ZodiacReportPointCode,
      ZodiacReportPointProfile
    >
  > = Object.freeze({
    sun: {
      code: "sun",
      name: "Sun",
      symbol: "☉",
      domain: "Core identity and direction",
      role:
        "The Sun symbolically relates to identity, vitality, purpose, self-expression, and the process of developing a coherent centre.",
      constructiveExpression:
        "Its placement may describe qualities a person is learning to express deliberately and the kinds of contribution that can strengthen a sense of direction.",
      possibleTension:
        "Difficulties may arise when identity becomes too dependent on recognition, performance, control, or maintaining a fixed image.",
      reflectionQuestions: [
        "Where do I feel most purposeful and fully engaged?",
        "Which forms of self-expression feel authentic rather than performed?",
        "What kind of contribution would make sustained effort meaningful?",
      ],
    },

    moon: {
      code: "moon",
      name: "Moon",
      symbol: "☽",
      domain: "Emotional patterns and security",
      role:
        "The Moon symbolically relates to emotional response, instinct, memory, comfort, belonging, and the conditions that support psychological safety.",
      constructiveExpression:
        "Its placement may describe how emotional experience is processed and which forms of care, routine, or connection can restore stability.",
      possibleTension:
        "Difficulties may arise when protective habits become automatic, indirect, avoidant, overly dependent, or disconnected from present circumstances.",
      reflectionQuestions: [
        "What helps me recover emotional stability?",
        "Which habits belong to the present, and which come from earlier experience?",
        "How directly do I communicate emotional needs?",
      ],
    },

    mercury: {
      code: "mercury",
      name: "Mercury",
      symbol: "☿",
      domain: "Thinking and communication",
      role:
        "Mercury symbolically relates to perception, language, reasoning, learning, information exchange, and the way connections are formed between ideas.",
      constructiveExpression:
        "Its placement may describe preferred ways of gathering information, explaining ideas, making comparisons, and deciding what deserves attention.",
      possibleTension:
        "Difficulties may arise through overthinking, incomplete listening, excessive certainty, scattered attention, or communication that does not match the audience.",
      reflectionQuestions: [
        "How do I learn most effectively?",
        "What usually prevents other people from understanding my reasoning?",
        "Where would clearer communication reduce avoidable friction?",
      ],
    },

    venus: {
      code: "venus",
      name: "Venus",
      symbol: "♀",
      domain: "Values and relationships",
      role:
        "Venus symbolically relates to attraction, values, harmony, aesthetics, pleasure, reciprocity, and the way people recognise what feels worthwhile.",
      constructiveExpression:
        "Its placement may describe preferred forms of connection, appreciation, cooperation, beauty, and value exchange.",
      possibleTension:
        "Difficulties may arise through avoidance of necessary conflict, idealisation, external validation, unclear standards, or confusing attraction with compatibility.",
      reflectionQuestions: [
        "Which values must be present for a relationship to remain sustainable?",
        "How do I show appreciation?",
        "Where do I preserve harmony at the expense of honesty?",
      ],
    },

    mars: {
      code: "mars",
      name: "Mars",
      symbol: "♂",
      domain: "Action and motivation",
      role:
        "Mars symbolically relates to drive, assertion, effort, courage, conflict response, boundaries, and the pursuit of desired outcomes.",
      constructiveExpression:
        "Its placement may describe how energy is mobilised, how obstacles are confronted, and which conditions support decisive action.",
      possibleTension:
        "Difficulties may arise through impulsiveness, suppressed anger, inconsistent effort, unnecessary confrontation, or action without strategic direction.",
      reflectionQuestions: [
        "What reliably activates my motivation?",
        "How do I respond when progress is blocked?",
        "Where do I need clearer boundaries or more disciplined action?",
      ],
    },

    ascendant: {
      code: "ascendant",
      name: "Ascendant",
      symbol: "ASC",
      domain: "Approach and orientation",
      role:
        "The Ascendant is the zodiac point rising on the eastern horizon. Symbolically, it relates to initial approach, presentation, orientation, and the way life is first engaged.",
      constructiveExpression:
        "Its sign may describe the style through which a person enters new situations and develops practical interaction with the surrounding environment.",
      possibleTension:
        "Difficulties may arise when presentation becomes defensive, over-adapted, rigid, or disconnected from deeper needs and intentions.",
      reflectionQuestions: [
        "How do I usually enter unfamiliar situations?",
        "What first impression do I create unintentionally?",
        "Where does my outward approach support or obscure my deeper priorities?",
      ],
    },

    descendant: {
      code: "descendant",
      name: "Descendant",
      symbol: "DSC",
      domain: "Partnership and encounter",
      role:
        "The Descendant is opposite the Ascendant. Symbolically, it relates to partnership, encounter, projection, and qualities recognised through other people.",
      constructiveExpression:
        "Its sign may describe qualities sought in collaboration or developed through sustained interaction with different perspectives.",
      possibleTension:
        "Difficulties may arise when responsibility for undeveloped qualities is placed entirely on partners, colleagues, or opponents.",
      reflectionQuestions: [
        "Which qualities do I repeatedly seek in other people?",
        "What do difficult relationships reveal about my own development?",
        "How can partnership include both reciprocity and clear boundaries?",
      ],
    },

    midheaven: {
      code: "midheaven",
      name: "Midheaven",
      symbol: "MC",
      domain: "Public direction and contribution",
      role:
        "The Midheaven is the upper meridian point of the chart. Symbolically, it relates to public direction, contribution, visibility, responsibility, and long-term development.",
      constructiveExpression:
        "Its sign may describe qualities that support meaningful contribution and the way competence or public responsibility develops over time.",
      possibleTension:
        "Difficulties may arise when public image, achievement, or external expectations become disconnected from personal values and sustainable capacity.",
      reflectionQuestions: [
        "What form of contribution would justify long-term discipline?",
        "How do I define success beyond status?",
        "Which capabilities need to be developed for greater responsibility?",
      ],
    },

    imumCoeli: {
      code: "imumCoeli",
      name: "Imum Coeli",
      symbol: "IC",
      domain: "Foundations and private life",
      role:
        "The Imum Coeli is opposite the Midheaven. Symbolically, it relates to roots, private foundations, belonging, inner stability, and the base from which development occurs.",
      constructiveExpression:
        "Its sign may describe qualities associated with restoration, privacy, home, belonging, and the maintenance of a stable inner foundation.",
      possibleTension:
        "Difficulties may arise when private needs are ignored for external achievement or when inherited patterns remain unexamined.",
      reflectionQuestions: [
        "What creates a genuine sense of belonging?",
        "Which private conditions support sustainable public effort?",
        "What inherited assumptions should be examined rather than repeated?",
      ],
    },
  });

export function getZodiacReportPointProfile(
  code: ZodiacReportPointCode,
): ZodiacReportPointProfile {
  return ZODIAC_REPORT_POINT_PROFILES[code];
}
