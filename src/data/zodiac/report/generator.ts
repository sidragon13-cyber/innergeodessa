import type {
  AstrologyResultContract,
  ZodiacPosition,
} from "../result-contract";

import {
  formatList,
  formatZodiacPosition,
  joinNatural,
  unique,
} from "./helpers";

import {
  getZodiacReportPointProfile,
} from "./planet-profiles";

import {
  getZodiacSignProfile,
} from "./sign-profiles";

import type {
  ZodiacReportBlock,
  ZodiacReportSection,
} from "./types";

function positionSummary(
  label: string,
  position: ZodiacPosition,
): string {
  const sign =
    getZodiacSignProfile(
      position.sign,
    );

  return (
    `${label} is positioned at ${formatZodiacPosition(position)}. ` +
    `${sign.name} is a ${sign.modality.toLowerCase()} ${sign.element.toLowerCase()} sign. ` +
    `${sign.orientation}`
  );
}

function createPointBlocks(
  code:
    | "sun"
    | "moon"
    | "mercury"
    | "venus"
    | "mars"
    | "ascendant",
  position: ZodiacPosition,
): ZodiacReportBlock[] {
  const point =
    getZodiacReportPointProfile(code);

  const sign =
    getZodiacSignProfile(
      position.sign,
    );

  return [
    {
      id: `${code}-position`,
      type: "summary",
      title: `${point.name} in ${sign.name}`,
      content:
        `${positionSummary(
          point.name,
          position,
        )}\n\n` +
        `${point.role}`,
    },
    {
      id: `${code}-constructive`,
      type: "strength",
      title:
        "Potential constructive expression",
      content:
        `${sign.constructiveExpression}\n\n` +
        `${point.constructiveExpression}\n\n` +
        formatList(
          sign.strengths,
        ),
    },
    {
      id: `${code}-tension`,
      type: "risk",
      title:
        "Possible tensions to monitor",
      content:
        `${sign.possibleTension}\n\n` +
        `${point.possibleTension}\n\n` +
        formatList(
          sign.risks,
        ),
    },
    {
      id: `${code}-growth`,
      type: "guidance",
      title:
        "Development direction",
      content:
        `${sign.growthDirection}\n\n` +
        formatList(
          point.reflectionQuestions,
        ),
    },
  ];
}

function createAngleBlock(
  code:
    | "ascendant"
    | "descendant"
    | "midheaven"
    | "imumCoeli",
  position: ZodiacPosition,
): ZodiacReportBlock {
  const point =
    getZodiacReportPointProfile(code);

  const sign =
    getZodiacSignProfile(
      position.sign,
    );

  return {
    id: `angle-${code}`,
    type: "analysis",
    title:
      `${point.name} in ${sign.name}`,
    content:
      `${positionSummary(
        point.name,
        position,
      )}\n\n` +
      `${point.role}\n\n` +
      `${sign.constructiveExpression}\n\n` +
      `Reflection prompts:\n${formatList(
        point.reflectionQuestions,
      )}`,
  };
}

export function generateZodiacReportSections(
  result: AstrologyResultContract,
): ZodiacReportSection[] {
  const sun =
    result.planets.sun.zodiac;

  const moon =
    result.planets.moon.zodiac;

  const mercury =
    result.planets.mercury.zodiac;

  const venus =
    result.planets.venus.zodiac;

  const mars =
    result.planets.mars.zodiac;

  const ascendant =
    result.angles.ascendant.zodiac;

  const descendant =
    result.angles.descendant.zodiac;

  const midheaven =
    result.angles.midheaven.zodiac;

  const imumCoeli =
    result.angles.imumCoeli.zodiac;

  const sunProfile =
    getZodiacSignProfile(
      sun.sign,
    );

  const moonProfile =
    getZodiacSignProfile(
      moon.sign,
    );

  const risingProfile =
    getZodiacSignProfile(
      ascendant.sign,
    );

  const mercuryProfile =
    getZodiacSignProfile(
      mercury.sign,
    );

  const venusProfile =
    getZodiacSignProfile(
      venus.sign,
    );

  const marsProfile =
    getZodiacSignProfile(
      mars.sign,
    );

  const coreStrengths =
    unique([
      ...sunProfile.strengths,
      ...moonProfile.strengths,
      ...risingProfile.strengths,
    ]);

  const coreRisks =
    unique([
      ...sunProfile.risks,
      ...moonProfile.risks,
      ...risingProfile.risks,
    ]);

  const relationshipThemes =
    unique([
      ...moonProfile
        .relationshipThemes,
      ...venusProfile
        .relationshipThemes,
      ...risingProfile
        .relationshipThemes,
    ]);

  const careerThemes =
    unique([
      ...sunProfile.careerThemes,
      ...mercuryProfile
        .careerThemes,
      ...marsProfile.careerThemes,
      ...getZodiacSignProfile(
        midheaven.sign,
      ).careerThemes,
    ]);

  return [
    {
      id: "report-overview",
      order: 1,
      title:
        "Your Birth Chart Report",
      description:
        "How to understand the symbolic framework used in this report.",
      blocks: [
        {
          id: "report-purpose",
          type: "summary",
          title:
            "A structured symbolic profile",
          content:
            `This report is based on calculated zodiac positions for the Sun, Moon, Mercury, Venus, Mars, Ascendant, Descendant, Midheaven, and Imum Coeli.\n\n` +
            "It uses astrology as a symbolic and cultural framework for reflection. It does not establish scientific personality facts, diagnose psychological conditions, predict destiny, or replace professional advice.",
        },
        {
          id: "report-core-pattern",
          type: "analysis",
          title:
            `${sunProfile.name} Sun · ${moonProfile.name} Moon · ${risingProfile.name} Rising`,
          content:
            `The report begins with three orientation points: the Sun in ${sunProfile.name}, the Moon in ${moonProfile.name}, and the Ascendant in ${risingProfile.name}.\n\n` +
            "These placements are interpreted as separate symbolic functions rather than merged into a fixed personality label.",
        },
      ],
    },

    {
      id: "core-identity",
      order: 2,
      title:
        "Core Identity Overview",
      description:
        "The relationship between central direction, emotional needs, and outward approach.",
      blocks: [
        {
          id: "core-functions",
          type: "analysis",
          title:
            "Three different chart functions",
          content:
            `Sun — ${formatZodiacPosition(
              sun,
            )}: central direction and deliberate self-expression.\n\n` +
            `Moon — ${formatZodiacPosition(
              moon,
            )}: emotional patterns and security needs.\n\n` +
            `Ascendant — ${formatZodiacPosition(
              ascendant,
            )}: initial approach and orientation toward the environment.`,
        },
        {
          id: "core-integration",
          type: "guidance",
          title:
            "Integration rather than simplification",
          content:
            "These three positions may describe different needs or modes of response. A useful reading does not force them into one stereotype. Instead, examine when each symbolic function becomes more visible and whether they support or compete with one another in real situations.",
        },
      ],
    },

    {
      id: "sun-profile",
      order: 3,
      title: "Sun Profile",
      description:
        "Central direction, identity, and purposeful self-expression.",
      blocks:
        createPointBlocks(
          "sun",
          sun,
        ),
    },

    {
      id: "moon-profile",
      order: 4,
      title: "Moon Profile",
      description:
        "Emotional processing, security, memory, and instinctive response.",
      blocks:
        createPointBlocks(
          "moon",
          moon,
        ),
    },

    {
      id: "rising-sign",
      order: 5,
      title: "Rising Sign",
      description:
        "Initial approach, presentation, and engagement with new situations.",
      blocks:
        createPointBlocks(
          "ascendant",
          ascendant,
        ),
    },

    {
      id: "mercury-profile",
      order: 6,
      title:
        "Mercury and Communication",
      description:
        "Thinking, learning, communication, and information processing.",
      blocks:
        createPointBlocks(
          "mercury",
          mercury,
        ),
    },

    {
      id: "venus-profile",
      order: 7,
      title:
        "Venus and Relationships",
      description:
        "Values, attraction, reciprocity, harmony, and relational preferences.",
      blocks:
        createPointBlocks(
          "venus",
          venus,
        ),
    },

    {
      id: "mars-profile",
      order: 8,
      title:
        "Mars and Motivation",
      description:
        "Action, drive, assertion, boundaries, and conflict response.",
      blocks:
        createPointBlocks(
          "mars",
          mars,
        ),
    },

    {
      id: "chart-angles",
      order: 9,
      title: "Chart Angles",
      description:
        "The four structural points connecting approach, partnership, public direction, and private foundations.",
      blocks: [
        createAngleBlock(
          "ascendant",
          ascendant,
        ),
        createAngleBlock(
          "descendant",
          descendant,
        ),
        createAngleBlock(
          "midheaven",
          midheaven,
        ),
        createAngleBlock(
          "imumCoeli",
          imumCoeli,
        ),
      ],
    },

    {
      id: "combined-pattern",
      order: 10,
      title:
        "Combined Core Pattern",
      description:
        "How the Sun, Moon, and Ascendant may operate as a layered symbolic pattern.",
      blocks: [
        {
          id: "combined-elements",
          type: "summary",
          title:
            "Elements and modalities",
          content:
            `The core pattern combines ${joinNatural(
              [
                `${sunProfile.name} (${sunProfile.element}, ${sunProfile.modality})`,
                `${moonProfile.name} (${moonProfile.element}, ${moonProfile.modality})`,
                `${risingProfile.name} (${risingProfile.element}, ${risingProfile.modality})`,
              ],
            )}.\n\n` +
            "Repeated elements may indicate a stronger symbolic emphasis. Contrasting elements may indicate a need to move between different styles rather than relying on one preferred mode.",
        },
        {
          id: "combined-practice",
          type: "guidance",
          title:
            "Test the pattern against experience",
          content:
            "Compare the report with observable behaviour. Note which descriptions appear consistently, which appear only in specific environments, and which do not match. Treat disagreement as useful evidence rather than forcing experience to fit the report.",
        },
      ],
    },

    {
      id: "potential-strengths",
      order: 11,
      title:
        "Potential Strengths",
      description:
        "Constructive qualities associated with the three core signs.",
      blocks: [
        {
          id: "strength-summary",
          type: "strength",
          title:
            "Themes for real-world testing",
          content:
            formatList(
              coreStrengths.slice(
                0,
                10,
              ),
            ),
        },
        {
          id: "strength-evidence",
          type: "guidance",
          title:
            "Symbolic potential is not demonstrated ability",
          content:
            "Convert any claimed strength into evidence. Look for completed work, repeated behaviour, feedback, measurable outcomes, reliable habits, or decisions maintained under real constraints.",
        },
      ],
    },

    {
      id: "development-risks",
      order: 12,
      title:
        "Development Risks",
      description:
        "Possible ways preferred styles may become unbalanced or limiting.",
      blocks: [
        {
          id: "risk-summary",
          type: "risk",
          title:
            "Patterns worth monitoring",
          content:
            formatList(
              coreRisks.slice(
                0,
                9,
              ),
            ),
        },
        {
          id: "risk-context",
          type: "guidance",
          title:
            "Context determines whether a tendency is useful",
          content:
            "A symbolic tendency is not automatically a flaw. The same quality may be constructive in one setting and limiting in another. Evaluate timing, intensity, consequences, and whether the behaviour remains flexible.",
        },
      ],
    },

    {
      id: "relationship-themes",
      order: 13,
      title:
        "Relationship Themes",
      description:
        "Symbolic themes associated with emotional safety, values, attraction, and partnership.",
      blocks: [
        {
          id: "relationship-summary",
          type: "relationship",
          title:
            "Themes for reflection",
          content:
            formatList(
              relationshipThemes,
            ),
        },
        {
          id: "relationship-guidance",
          type: "guidance",
          title:
            "Use behaviour and communication as the standard",
          content:
            "Compatibility cannot be established from sign placements alone. Sustainable relationships depend on communication, boundaries, reliability, consent, shared values, conflict repair, and the behaviour of both people over time.",
        },
      ],
    },

    {
      id: "career-contribution",
      order: 14,
      title:
        "Career and Contribution",
      description:
        "Broad symbolic themes connected with direction, communication, action, and public contribution.",
      blocks: [
        {
          id: "career-theme-list",
          type: "career",
          title:
            "Fields and modes of contribution to investigate",
          content:
            formatList(
              careerThemes,
            ),
        },
        {
          id: "career-warning",
          type: "guidance",
          title:
            "Do not choose a career from astrology alone",
          content:
            "Use these themes only as prompts. Career decisions should be tested against interests, abilities, qualifications, values, labour-market demand, financial realities, working conditions, geographic constraints, and direct experience.",
        },
      ],
    },

    {
      id: "reflection-plan",
      order: 15,
      title:
        "90-Day Reflection Plan",
      description:
        "A practical method for testing symbolic themes against lived experience.",
      blocks: [
        {
          id: "days-1-30",
          type: "action",
          title:
            "Days 1–30: observe",
          content:
            "Choose three report themes. Record situations where each theme appears, does not appear, or appears differently from the report. Focus on behaviour, context, consequences, and feedback.",
        },
        {
          id: "days-31-60",
          type: "action",
          title:
            "Days 31–60: experiment",
          content:
            "Select one constructive quality and one risk pattern. Design a small behavioural experiment—for example clearer communication, firmer boundaries, slower decisions, more consistent follow-through, or deliberate recovery time.",
        },
        {
          id: "days-61-90",
          type: "action",
          title:
            "Days 61–90: evaluate",
          content:
            "Review the evidence. Keep themes that improved understanding or action. Revise or discard themes that did not match experience. Convert useful observations into one specific habit or decision rule.",
        },
      ],
    },

    {
      id: "methodology",
      order: 16,
      title:
        "Methodology and Limitations",
      description:
        "How the chart was calculated and how the report should be interpreted.",
      blocks: [
        {
          id: "method-calculation",
          type: "methodology",
          title:
            "Calculation basis",
          content:
            `The chart used local birth time ${result.input.localDateTime}, converted to ${result.input.utcDateTime ?? "an unavailable UTC value"} using ${result.input.timeZone ?? "an unavailable time zone"}.\n\n` +
            `Coordinates: ${result.input.latitude}, ${result.input.longitude}.\n` +
            `Engine: ${result.engine.name} ${result.engine.version}.\n` +
            `Ephemeris: ${result.engine.ephemeris}.`,
        },
        {
          id: "method-scope",
          type: "methodology",
          title:
            "Current report scope",
          content:
            "This version includes the Sun, Moon, Mercury, Venus, Mars, Ascendant, Descendant, Midheaven, and Imum Coeli. It does not yet include houses, major aspects, lunar nodes, outer planets, transits, synastry, or predictive techniques.",
        },
        {
          id: "method-limitations",
          type: "risk",
          title:
            "Important limitations",
          content:
            "Astrology is not established scientific evidence for personality, mental health, compatibility, career suitability, future events, or medical outcomes. This report is intended for reflection, culture, and entertainment. Do not use it as a substitute for qualified medical, psychological, legal, financial, educational, or employment advice.",
        },
        ...(result.limitations.length > 0
          ? [
              {
                id: "calculation-limitations",
                type: "risk" as const,
                title:
                  "Chart-specific limitations",
                content:
                  formatList(
                    result.limitations,
                  ),
              },
            ]
          : []),
      ],
    },
  ];
}
